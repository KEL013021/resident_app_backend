<?php
include('config.php');
header('Content-Type: application/json');

try {
    // Decode JSON input
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['user_id'])) {
        echo json_encode(['success' => false, 'message' => 'Missing user_id']);
        exit;
    }

    $user_id = intval($data['user_id']);

    // Step 1: Fetch resident_id based on user_id
    $stmt = $conn->prepare("SELECT id FROM residents WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if (!$resident = $result->fetch_assoc()) {
        echo json_encode(['success' => false, 'message' => 'Resident not found']);
        exit;
    }

    $resident_id = $resident['id'];

    // Step 2: Fetch requests made by this resident
    $stmt2 = $conn->prepare("
        SELECT 
            r.id AS request_id, 
            s.service_name, 
            r.status, 
            r.request_date 
        FROM requests r
        JOIN services s ON r.service_id = s.id
        WHERE r.resident_id = ?
        ORDER BY r.request_date DESC
    ");
    $stmt2->bind_param("i", $resident_id);
    $stmt2->execute();
    $result2 = $stmt2->get_result();

    $requests = [];
    while ($row = $result2->fetch_assoc()) {
        $requests[] = $row;
    }

    echo json_encode([
        'success' => true,
        'requests' => $requests
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Server error',
        'error' => $e->getMessage()
    ]);
}
