<?php
include './database/connect.php';
header('Content-Type: application/json');
$conn = $connect;

$response = ['success' => false];

// Retrieve data from AJAX request
$functionName = isset($_POST['functionName']) ? $_POST['functionName'] : null;

if (!empty($functionName)) {
    
    // AUTO_CREMENT không hoạt động như ý muốn, add id auto qua php 13-31
    $result = $conn->query('select machucnang from chucnang order by machucnang asc');
    if($result === false){
        $reponse['error'] = "Failed to fetch ids";
        echo json_encode($reponse);
        exit();
    }
    
    $existingId = [];
    while($row = $result -> fetch_assoc()){
        $existingId[] = $row['machucnang'];
    }
    
    $functionCode = null;
    for ($i=1;$i<=count($existingId)+1;$i++){
        if(!in_array($i, $existingId)){
            $functionCode = $i;
            break;
        }
    }
    
    $stmt = $conn->prepare("INSERT INTO chucnang (machucnang,tenchucnang) VALUES (?,?)");

    if ($stmt === false) {
        $response['error'] = 'Failed to prepare statement';
        echo json_encode($response);
        exit();
    }

    $stmt->bind_param("is", $functionCode, $functionName);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Chức năng được thêm thành công!";
    } else {
        $response['error'] = $stmt->error;
    }
    $stmt->close();
} else {
    $response['error'] = "Hãy cung cấp tên chức năng!";
}

$conn->close();

echo json_encode($response);
?>
