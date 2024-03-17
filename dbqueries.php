<?php
// Connect to SQLite database
$db = new SQLite3('programacion/the-new-rookgaard/server/schemas/otxserver.s3db');

// Handle incoming query
$query = $_GET['query'];

// Execute the query
$result = $db->query($query);

// Fetch results and send back as JSON
$rows = array();
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $rows[] = $row;
}
echo json_encode($rows);

// Close the database connection
$db->close();
?>
