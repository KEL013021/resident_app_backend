<?php
header("Content-Type: application/json"); // move this to the top!
ini_set('display_errors', 0); // disable display of warnings
error_reporting(0);           // suppress warnings

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'brygo';

$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]);
    exit;
}

$conn->set_charset("utf8");
?>
