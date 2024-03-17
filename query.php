<?php
// Connect to SQLite database
$db = new SQLite3('C:/the-new-rook/server/schemas/otxserver.s3db');

// Handle incoming query
$query = $_GET['query'];

// Execute the query
$result = $db->query($query);

// Fetch results and send back as JSON
$rows = array();
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $rows[] = $row;
}

// Close the database connection
$db->close();

// Set response header to indicate JSON content
header('Content-Type: application/json');

// Return results as JSON
echo json_encode($rows);
?>