<?php
include ('credentials.php');

// Ensure this script is only accessible via POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    exit;
}

// Parse the incoming JSON data
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

if (!$data) {
    file_put_contents('payments_errors.log', 'Missing data' . PHP_EOL, FILE_APPEND);
    exit;
}

// Log incoming data
$message = print_r($data, true);
file_put_contents('ipn.log', $message . PHP_EOL, FILE_APPEND);

// For each operation there are 8 POST requests made
// Here we are taking the last one only (code == 1006) and exiting on the others
$invoiceId = null;
if (isset($data['event']['code']) && $data['event']['code'] == 1006 && isset($data['data']['id'])) {
    $invoiceId = $data['data']['id'];
    file_put_contents('invoiceId.log', $invoiceId . PHP_EOL, FILE_APPEND);
} else {
    exit;
}

// API Key is stored in credentials.php
if (!$apiKey || $apiKey == '') {
    file_put_contents('payments_errors.log', 'Missing API Key' . PHP_EOL, FILE_APPEND);
    exit;
}

// Store ID is stored in credentials.php
if (!$storeId || $storeId == '') {
    file_put_contents('payments_errors.log', 'Missing storeId' . PHP_EOL, FILE_APPEND);
    exit;
}

// Send a GET request to retrieve invoice details
$url = "https://btcpay.davidcoen.it/api/v1/stores/$storeId/invoices/$invoiceId";
$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: token ' . $apiKey
]);
curl_setopt($curl, CURLOPT_CAINFO, __DIR__ . '/cacert.pem');

$response = curl_exec($curl);

if (curl_errno($curl)) {
    file_put_contents('payments_errors.log', 'CURL error' . curl_error($curl) . PHP_EOL, FILE_APPEND);
} else {
    $responseData = json_decode($response, true);

    $status = $responseData['status']; // 'Settled'
    $orderId = $responseData['metadata']['orderId'];
    $itemCode = $responseData['metadata']['itemCode'];
    $buyerEmail = $responseData['metadata']['buyerEmail'];
    
    if (isset($status) && $status == 'Settled' && isset($itemCode) && isset($orderId) && isset($buyerEmail)) {
        file_put_contents('payments_success.log', $orderId . ' ' . $buyerEmail . ' ' . $itemCode . PHP_EOL, FILE_APPEND);
        $updateDb = addPremiumDays($buyerEmail, $itemCode);
        if ($updateDb) {
            file_put_contents('payments_success.log', 'Updated DB for order ' . $orderId . PHP_EOL, FILE_APPEND);
        } else {
            file_put_contents('payments_errors.log', 'Failed to update DB for order ' . $orderId . '(most likely due to email not set)' . PHP_EOL, FILE_APPEND);
        }
    } else {
        $message = print_r($responseData, true);
        file_put_contents('payments_errors.log', 'Response was OK but data doesnt match with what was expected: '. $message . PHP_EOL, FILE_APPEND);
    }
}

curl_close($curl);

function addPremiumDays($buyerEmail, $itemCode) {
    // Define pattern to extract premium days from $itemCode
    $pattern = '/^(\d+)-/';
    
    if (preg_match($pattern, $itemCode, $matches)) {
        $extractedNumber = $matches[1];
    } else {
        return false;
    }
    
    // Connect to SQLite database
    $db = new SQLite3('C:/the-new-rook/server/schemas/otxserver.s3db');
    $statement = $db->prepare($query);

    // Get id and premdays with email
    $statement = $db->prepare("SELECT id, premdays FROM accounts WHERE email = :email");
    $statement->bindValue(':email', $buyerEmail, SQLITE3_TEXT);

    // Execute the query
    $result = $statement->execute();

    // Fetch results
    $row = $result->fetchArray(SQLITE3_ASSOC);
    if (!$row) {
        return false;
    }
    // Retrieve data from db
    $id = $row['id'];
    $premdays = $row['premdays'] + $extractedNumber;
    if (isset($id)) {
        // Give reward
        $statement = $db->prepare("UPDATE accounts SET premdays = :premdays WHERE id = :id");
        $statement->bindValue(':premdays', $premdays, SQLITE3_INTEGER);
        $statement->bindValue(':id', $id, SQLITE3_TEXT);
        $statement->execute();
        return true;
    } else {
        return false;
    }
}
?>