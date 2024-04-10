<?php
// Ensure this script is only accessible via POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    exit;
}

// Parse the incoming JSON data
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

if (!$data || !isset($data['id'])) {
    http_response_code(400); // Bad Request
    exit;
}

// Extract relevant payment information
$invoiceId = $data['id'];

// Retrieve API key from environment variable
$apiKey = getenv('BTCPAY_LEGACY_API_KEY');

if (!$apiKey) {
    http_response_code(500);
    exit;
}

// Send a GET request to retrieve invoice details
$invoiceUrl = "https://thenewrookgaard.com/payments/{$invoiceId}";
$authorizationHeader = "Authorization: Basic " . base64_encode($apiKey);

$curl = curl_init($invoiceUrl);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    $authorizationHeader
]);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

curl_close($curl);

if ($httpCode === 200) {
    // Invoice details retrieved successfully
    $invoiceDetails = json_decode($response, true);

    // Process invoice details as needed (e.g., update database, handle order fulfillment)
    // Example:
    if (isset($invoiceDetails['orderId'], $invoiceDetails['price'], $invoiceDetails['status']) &&
        $invoiceDetails['status'] === 'settled') {
        // Verify orderId from your backend, check price, and handle order fulfillment
        // Update database, mark order as paid, ship the product, etc.
        echo "Ready to interact with database";
        // $orderId = $invoiceDetails['orderId'];
        // $price = $invoiceDetails['price'];

        // Respond to BTCPay Server with HTTP status 200 (OK)
        http_response_code(200);
    } else {
        http_response_code(400); // Bad Request (if invoice details are incomplete or status is not settled)
    }
} else {
    // Failed to retrieve invoice details
    http_response_code($httpCode); // Forward HTTP status code from BTCPay Server response
}
?>