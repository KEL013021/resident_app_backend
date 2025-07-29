<?php
$DB_HOST = getenv('DB_HOST');
$DB_PORT = getenv('DB_PORT');
$DB_USER = getenv('DB_USER');
$DB_PASS = getenv('DB_PASS');
$DB_NAME = getenv('DB_NAME');

$dsn = "mysql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME;charset=utf8mb4";

try {
    $conn = new PDO($dsn, $DB_USER, $DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Connected to Aiven using Render environment variables!";
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
