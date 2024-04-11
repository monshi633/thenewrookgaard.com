<?php
include ('variables.php');

// Ensure this script is only accessible via POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    exit;
}

// Parse the incoming JSON data
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

if (!$data) {
    file_put_contents('payments_errors.log', 'Missing data', FILE_APPEND);
    exit;
}

// Log incoming data
$message = print_r($data, true);
file_put_contents('ipn.log', $message, FILE_APPEND);

// For each operation there are 8 POST requests made
// Here we are taking the last one only (code == 1006) and exiting on the others
$invoiceId = null;
if (isset($data['event']['code']) && $data['event']['code'] == 1006 && isset($data['data']['id'])) {
    $invoiceId = $data['data']['id'];
    file_put_contents('invoiceId.log', $invoiceId, FILE_APPEND);
} else {
    exit;
}

// API Key is stored in variables.php
if (!$apiKey) {
    file_put_contents('payments_errors.log', 'Missing API Key', FILE_APPEND);
    exit;
}

// Send a GET request to retrieve invoice details
$url = "https://btcpay.davidcoen.it/invoices/$invoiceId";
$curl = curl_init();

curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); // TODO NOT FOR PRODUCTION
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Basic ' . base64_encode($apiKey)
]);

$response = curl_exec($curl);
if (curl_errno($curl)) {
    file_put_contents('payments_errors.log', 'CURL error' . curl_error($curl), FILE_APPEND);
} else {
    $responseData = json_decode($response, true);
    
    $status = $responseData['data']['status']; // 'complete'
    $itemCode = $responseData['data']['itemCode'];
    $orderId = $responseData['data']['orderId'];
    $buyer = $responseData['data']['buyer']['email'];

    if (isset($status) && $status == 'complete' && isset($itemCode) && isset($orderId) && isset($buyer)) {
        file_put_contents('payments_success.log', $itemCode . ' ' . $orderId . ' ' . $buyer, FILE_APPEND);
    }
}

curl_close($curl);
?>