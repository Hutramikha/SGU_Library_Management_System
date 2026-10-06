<?php
include './database/connect.php';
header('Content-Type: application/json');
$conn = $connect;

$response = ['success' => false];

// Retrieve data from AJAX request
$RCName = isset($_POST['RCName']) ? $_POST['RCName'] : null;
$maxRCbook = isset($_POST['maxRCbook']) ? $_POST['maxRCbook'] : null;

if (!empty($RCName) && !empty($maxRCbook)) {
// AUTO_CREMENT không hoạt động như ý muốn, add id auto qua php 13-31
    $result = $conn->query('select maloaidocgia from loaidocgia order by maloaidocgia asc');
    if($result === false){
        $reponse['error'] = "Failed to fetch ids";
        echo json_encode($reponse);
        exit();
    }
    
    $existingId = [];
    while($row = $result -> fetch_assoc()){
        $existingId[] = $row['maloaidocgia'];
    }
    
    $RCCode = null;
    for ($i=1;$i<=count($existingId)+1;$i++){
        if(!in_array($i, $existingId)){
            $RCCode = $i;
            break;
        }
    }
    
    $stmt = $conn->prepare("insert into loaidocgia (maloaidocgia, tenloaidocgia, soluongsachtoida) VALUES (?, ?, ?)");

    if ($stmt === false) {
        $response['error'] = 'Failed to prepare statement';
        echo json_encode($response);
        exit();
    }

    $stmt->bind_param("iss", $RCCode, $RCName, $maxRCbook);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Loại độc giả được thêm thành công!";
    } else {
        $response['error'] = $stmt->error;
    }
    $stmt->close();
} else {
    $response['error'] = "Hãy cung cấp tên, số lượng!";
}
$conn->close();

echo json_encode($response);
?>
