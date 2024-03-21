<?php
// Set response header to indicate SSE (Server-Sent Events) content
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

// Connect to SQLite database
$db = new SQLite3('C:/The-new-rook/server/schemas/otxserver.s3db');

// Define the query
$query = $_GET['query'];

// Infinite loop to continuously send updates
while (true) {
    // Execute the query
    $result = $db->query($query);

    // Fetch results and send as SSE updates
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        echo "data: " . json_encode($row) . "\n\n";
        ob_flush();
        flush();
    }

    // Sleep for a short duration before sending the next update
    sleep(1);
}

// Close the database connection (this code will never be reached in this script)
$db->close();
?>