<?php
include('config.php');

// Fetch all services with name and fee
$query = "SELECT id, service_name, service_fee FROM services";
$result = mysqli_query($conn, $query);

$services = [];
while ($row = mysqli_fetch_assoc($result)) {
    $services[] = $row;
}

header('Content-Type: application/json');
echo json_encode($services);
?>
