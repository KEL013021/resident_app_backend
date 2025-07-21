<?php
header("Content-Type: application/json");
include 'config.php'; // your DB connection

$data = json_decode(file_get_contents("php://input"), true);

$gmail = $data["gmail"];
$password = $data["password"];

$sql = "SELECT * FROM user WHERE gmail = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $gmail);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        echo json_encode([
            "success" => true,
            "user_id" => $row["user_id"],
            "message" => "Login successful"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Wrong password."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Account does not exist."
    ]);
}
?>
