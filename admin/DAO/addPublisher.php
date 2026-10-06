<?php
include './database/connect.php';
header('Content-Type: application/json');
$conn = $connect;

$response = ['success' => false];

// Retrieve data from AJAX request
$publisherName = isset($_POST['publisherName']) ? $_POST['publisherName'] : null;

if (!empty($publisherName)) {
    
    // AUTO_CREMENT không hoạt động như ý muốn, add id auto qua php 13-31
    $result = $conn->query('select manxb from nhaxuatban order by manxb asc');
    if($result === false){
        $reponse['error'] = "Failed to fetch ids";
        echo json_encode($reponse);
        exit();
    }
    
    $existingId = [];
    while($row = $result -> fetch_assoc()){
        $existingId[] = $row['manxb'];
    }
    
    $publisherCode = null;
    for ($i=1;$i<=count($existingId)+1;$i++){
        if(!in_array($i, $existingId)){
            $publisherCode = $i;
            break;
        }
    }
    
    $stmt = $conn->prepare("INSERT INTO nhaxuatban (manxb,tennxb) VALUES (?,?)");

    if ($stmt === false) {
        $response['error'] = 'Failed to prepare statement';
        echo json_encode($response);
        exit();
    }

    $stmt->bind_param("is", $publisherCode, $publisherName);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Nhà xuất bản được thêm thành công!";
    } else {
        $response['error'] = $stmt->error;
    }
    $stmt->close();
} else {
    $response['error'] = "Hãy cung cấp tên!";
}

$conn->close();

echo json_encode($response);
?>
