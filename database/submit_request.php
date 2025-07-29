<?php
include('config.php');

// Get POST JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if user_id and service_id and purpose are provided
if (!isset($data['user_id'], $data['service_id'], $data['purpose'])) {
    echo json_encode(['success' => false, 'message' => 'Missing fields.']);
    exit;
}

$user_id = $data['user_id'];
$service_id = $data['service_id'];
$purpose = mysqli_real_escape_string($conn, $data['purpose']); // sanitize
date_default_timezone_set('Asia/Manila');
$request_date = date('Y-m-d H:i:s');
$status = 'Pending';

// Fetch resident_id based on user_id
$residentQuery = "SELECT id FROM residents WHERE user_id = '$user_id' LIMIT 1";
$residentResult = mysqli_query($conn, $residentQuery);

if ($residentRow = mysqli_fetch_assoc($residentResult)) {
    $resident_id = $residentRow['id'];

    // ✅ Insert including purpose
    $insertQuery = "INSERT INTO requests (resident_id, service_id, purpose, request_date, status)
                    VALUES ('$resident_id', '$service_id', '$purpose', '$request_date', '$status')";

    if (mysqli_query($conn, $insertQuery)) {
        $request_id = mysqli_insert_id($conn);

        // Get service name for confirmation
        $serviceQuery = "SELECT service_name FROM services WHERE id = '$service_id'";
        $serviceResult = mysqli_query($conn, $serviceQuery);
        $serviceRow = mysqli_fetch_assoc($serviceResult);

        echo json_encode([
            'success' => true,
            'request_id' => $request_id,
            'service_name' => $serviceRow['service_name']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Insert request failed.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Resident not found for given user ID.']);
}
?>
