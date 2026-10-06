<?php
include './database/connect.php';
header('Content-Type: application/json');
$conn = $connect;

$response = ['success' => false];

// Retrieve data from AJAX request
$categoryName = isset($_POST['categoryName']) ? $_POST['categoryName'] : null;

if (!empty($categoryName)) {
    
    // AUTO_CREMENT không hoạt động như ý muốn, add id auto qua php 13-31
    $result = $conn->query('select matl from theloai order by matl asc');
    if($result === false){
        $reponse['error'] = "Failed to fetch ids";
        echo json_encode($reponse);
        exit();
    }
    
    $existingId = [];
    while($row = $result -> fetch_assoc()){
        $existingId[] = $row['matl'];
    }
    
    $categoryCode = null;
    for ($i=1;$i<=count($existingId)+1;$i++){
        if(!in_array($i, $existingId)){
            $categoryCode = $i;
            break;
        }
    }
    
    $stmt = $conn->prepare("INSERT INTO theloai (matl,tentl) VALUES (?,?)");

    if ($stmt === false) {
        $response['error'] = 'Failed to prepare statement';
        echo json_encode($response);
        exit();
    }

    $stmt->bind_param("is", $categoryCode, $categoryName);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Thể loại được thêm thành công!";
    } else {
        $response['error'] = $stmt->error;
    }
    $stmt->close();
} else {
    $response['error'] = "Hãy cung cấp tên thể loại!";
}

$conn->close();

echo json_encode($response);
?>
