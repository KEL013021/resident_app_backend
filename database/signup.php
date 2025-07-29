<?php
header("Content-Type: application/json");
include("config.php");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->gmail) || !isset($data->password) || !isset($data->toa)) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

$gmail = $data->gmail;
$password = password_hash($data->password, PASSWORD_DEFAULT); // Secure password hashing
$toa = $data->toa; // Type of Account (Resident or Official)

// Step 1: Check if the email already exists in `user` table
$checkUser = $conn->prepare("SELECT * FROM user WHERE gmail = ?");
$checkUser->bind_param("s", $gmail);
$checkUser->execute();
$userResult = $checkUser->get_result();

if ($userResult->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already registered"]);
    exit;
}

// Step 2: Insert into `user` table
$insertUser = $conn->prepare("INSERT INTO user (gmail, password, toa, status) VALUES (?, ?, ?, 'resident')");
$insertUser->bind_param("sss", $gmail, $password, $toa);

if ($insertUser->execute()) {
    $user_id = $insertUser->insert_id;

    // Step 3: Check if email exists in `residents`
    $checkResident = $conn->prepare("SELECT id FROM residents WHERE email_address = ?");
    $checkResident->bind_param("s", $gmail);
    $checkResident->execute();
    $resResult = $checkResident->get_result();

    if ($resResult->num_rows > 0) {
        // Step 4a: Update existing resident with user_id
        $update = $conn->prepare("UPDATE residents SET user_id = ? WHERE email_address = ?");
        $update->bind_param("is", $user_id, $gmail);
        $update->execute();
    } else {
        // Step 4b: Insert minimal profile into residents
        $insertRes = $conn->prepare("INSERT INTO residents (user_id, email_address) VALUES (?, ?)");
        $insertRes->bind_param("is", $user_id, $gmail);
        $insertRes->execute();
    }

    echo json_encode(["success" => true, "message" => "Signup successful", "user_id" => $user_id]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to register user"]);
}

$conn->close();
?>
