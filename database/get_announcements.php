<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
error_reporting(0);
ini_set('display_errors', 0);

include_once 'config.php'; // Make sure this exists and works

if (!$conn) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$sql = "SELECT id, title, content, image, date_posted FROM announcements ORDER BY date_posted DESC";
$result = $conn->query($sql);

$announcements = [];

while ($row = $result->fetch_assoc()) {
    $row['image'] = $row['image'] ? "http://192.168.1.17/BRGY/BRGYGO/image/announcement/" . $row['image'] : null;
    $announcements[] = $row;
}

echo json_encode($announcements);
?>
