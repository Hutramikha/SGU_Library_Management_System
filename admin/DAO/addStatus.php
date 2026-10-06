<?php
include './database/connect.php';
header('Content-Type: application/json');
$conn = $connect;

$response = ['success' => false];

// Retrieve data from AJAX request
$statusDesc = isset($_POST['statusDesc']) ? $_POST['statusDesc'] : null;

if (!empty($statusDesc)) {
    // AUTO_CREMENT không hoạt động như ý muốn, add id auto qua php 13-31
    $result = $conn->query('select matinhtrang from tinhtrangsach order by matinhtrang asc');
    if($result === false){
        $reponse['error'] = "Failed to fetch ids";
        echo json_encode($reponse);
        exit();
    }
    
    $existingId = [];
    while($row = $result -> fetch_assoc()){
        $existingId[] = $row['matinhtrang'];
    }
    
    $statusCode = null;
    for ($i=1;$i<=count($existingId)+1;$i++){
        if(!in_array($i, $existingId)){
            $statusCode = $i;
            break;
        }
    }
    
    $stmt = $conn->prepare("insert into tinhtrangsach (matinhtrang, motatinhtrang) values (?, ?)");

    if ($stmt === false) {
        $response['error'] = 'Failed to prepare statement';
        echo json_encode($response);
        exit();
    }

    $stmt->bind_param("is", $statusCode, $statusDesc);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Tình trạng được thêm thành công!";
    } else {
        $response['error'] = $stmt->error;
    }
    $stmt->close();
} else {
    $response['error'] = "Hãy cung cấp mô tả!";
}

$conn->close();

echo json_encode($response);
?>
