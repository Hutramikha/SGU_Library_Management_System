<?php

include './database/connect.php';
header('Content-Type: application/json');
$conn = $connect;

$response = ['success' => false];

if (isset($_POST['manxb'])) {
    $status_id = $_POST['manxb'];
    $query = "delete from nhaxuatban where manxb = ?";
    $stmt = $conn->prepare($query);
    
    // Debug
    if ($stmt === false) {
        $response['error'] = 'Failed to prepare statement';
        echo json_encode($response);
        exit();
    }

    $stmt->bind_param("i", $status_id);
    
    // Execute the query
    if ($stmt->execute()) {
        $response['success'] = $stmt->affected_rows > 0;
    } else {
        $response['error'] = 'Failed to execute query';
    }

    $stmt->close();
} else {
    $response['error'] = 'Publisher ID not provided';
}

echo json_encode($response); // Return the response JSON

$conn->close();
?>
