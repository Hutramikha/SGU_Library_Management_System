<?php
include './database/connect.php';
header('Content-Type: application/json');
$conn = $connect;

$response = ['success' => false];

// Retrieve data from AJAX request
$authorName = isset($_POST['authorName']) ? $_POST['authorName'] : null;

if (!empty($authorName)) {
    
    // AUTO_CREMENT không hoạt động như ý muốn, add id auto qua php 13-31
    $result = $conn->query('select matg from tacgia order by matg asc');
    if($result === false){
        $reponse['error'] = "Failed to fetch ids";
        echo json_encode($reponse);
        exit();
    }
    
    $existingId = [];
    while($row = $result -> fetch_assoc()){
        $existingId[] = $row['matg'];
    }
    
    $authorCode = null;
    for ($i=1;$i<=count($existingId)+1;$i++){
        if(!in_array($i, $existingId)){
            $authorCode = $i;
            break;
        }
    }
    
    $stmt = $conn->prepare("INSERT INTO tacgia (matg,tentg) VALUES (?,?)");

    if ($stmt === false) {
        $response['error'] = 'Failed to prepare statement';
        echo json_encode($response);
        exit();
    }

    $stmt->bind_param("is", $authorCode, $authorName);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Tác giả được thêm thành công!";
    } else {
        $response['error'] = $stmt->error;
    }
    $stmt->close();
} else {
    $response['error'] = "Hãy cung cấp tên tác giả!";
}

$conn->close();

echo json_encode($response);
?>
