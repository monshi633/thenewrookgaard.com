<?php
// Yes, I know that SHA1 is not safe
// Yes, I know that you can add security adding a random salt
// Yes, I know that using SHA256 is much better
// But the game uses SHA1 and I couldn't yet get it to work with SHA256

// Retrieve input data from POST request
$account = $_POST['account'];
$password = $_POST['password'];

// Connect to SQLite database
$db = new SQLite3('C:/the-new-rook/server/schemas/otxserver.s3db');

// Prepare query
$query = "SELECT salt FROM accounts WHERE name = '$account'";

// Execute the query
$result = $db->query($query);

// Retrieve salt from db
if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        $salt = $row["salt"];
    }
} else {
    $salt = ""; // Set default value if no data found
}

// concatenate salt + password
$fullPassword = $salt . $password;

// Hash using SHA-1
$hashedData = sha1($fullPassword);

// Close the database connection
$db->close();

// Send the hashed data back as JSON response
echo json_encode(['hashedData' => $hashedData]);
?>