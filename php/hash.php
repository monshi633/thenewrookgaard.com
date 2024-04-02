<?php
// Yes, I know that SHA1 is not safe
// Yes, I know that you can add security adding a random salt
// Yes, I know that using SHA256 is much better
// But the game uses SHA1 and I couldn't yet get it to work with SHA256

// Retrieve input data from POST request
$inputData = $_POST['data'];

// Hash the input data using SHA-1
$hashedData = sha1($inputData);

// Send the hashed data back as JSON response
echo json_encode(['hashedData' => $hashedData]);
?>