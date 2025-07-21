<?php
header("Content-Type: application/json");
ini_set('display_errors', 0);
error_reporting(0);

include("config.php");

if (isset($_GET['gmail'])) {
    $gmail = $_GET['gmail'];

    $stmt = $conn->prepare("SELECT * FROM residents WHERE email_address = ?");
    if ($stmt === false) {
        echo json_encode(["error" => "Prepare failed"]);
        exit;
    }

    $stmt->bind_param("s", $gmail);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "No profile found"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Missing gmail parameter"]);
}
$conn->close();
?>
