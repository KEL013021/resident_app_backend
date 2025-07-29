<?php
include('config.php'); // make sure your DB connection is working

header('Content-Type: application/json');

// Check if user_id is provided
if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

    // SQL query to fetch all data from residents based on user_id
    $query = "SELECT 
        image_url, first_name, middle_name, last_name, gender, date_of_birth, 
        pob_country, pob_province, pob_city, pob_barangay, civil_status, nationality, religion, 
        country, province, city, barangay, zipcode, house_number, zone_purok, residency_date, 
        years_of_residency, residency_type, previous_address, father_name, mother_name, 
        spouse_name, number_of_family_members, household_number, relationship_to_head, 
        house_position, educational_attainment, current_school, occupation, monthly_income, 
        mobile_number, telephone_number, email_address, emergency_contact_person, 
        emergency_contact_number, pwd_status, pwd_id_number, senior_citizen_status, 
        senior_id_number, solo_parent_status, is_4ps_member, blood_type, voter_status 
        FROM residents 
        WHERE user_id = '$user_id'";

    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);

        // Create a full name field for frontend
        $row['full_name'] = trim($row['first_name'] . ' ' . $row['middle_name'] . ' ' . $row['last_name']);

        echo json_encode($row);
    } else {
        echo json_encode(['error' => 'No profile found.']);
    }
} else {
    echo json_encode(['error' => 'Missing user_id parameter.']);
}
?>
