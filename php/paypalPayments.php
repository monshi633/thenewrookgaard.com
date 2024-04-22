<?php
// include ('credentials.php');

// ALL CREDENTIALS ARE SANDBOX, NEED TO BE REPLACED FOR LIVE CREDENTIALS STORED IN credentials.php AFTER TESTING

// PayPal webhook listener endpoint
$webhookSecret = 'EJGJPW5Sxpi5Za8kju9R4InbO-hRHRb_z4oaYs54KKikDBNeF2hwFtaw0ySBezqSXyGKLd5CYTFmr0FX';
$requestBody = file_get_contents('php://input');
$headerSignature = isset($_SERVER['HTTP_PAYPAL_SIGNATURE']) ? $_SERVER['HTTP_PAYPAL_SIGNATURE'] : '';

// Verify and process the webhook
verifyWebhookSignature($requestBody, $headerSignature, $webhookSecret);

function verifyWebhookSignature($requestBody, $headerSignature, $webhookSecret) {
    $signatureVerification = openssl_verify($requestBody, base64_decode($headerSignature), $webhookSecret, 'sha256');
    
    if ($signatureVerification !== 1) {
        http_response_code(400);
        die('Webhook signature verification failed.');
    }
    
    // Webhook signature verified, process the webhook data
    $webhookData = json_decode($requestBody);
    
    // Handle different event types
    switch ($webhookData->event_type) {
        case 'PAYMENT.CAPTURE.COMPLETED':
            $paymentId = $webhookData->resource->id;
            file_put_contents('paypal.log', $paymentId . PHP_EOL, FILE_APPEND);
            break;
    }
    
    // Send a 200 response back to PayPal to acknowledge receipt of the webhook
    http_response_code(200);
    echo 'Webhook processed successfully';
}
?>
