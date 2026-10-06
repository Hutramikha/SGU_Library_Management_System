<?php
include './database/connect.php';
header('Content-Type: application/json');
$conn = $connect;

$response = ['success' => false];

// Retrieve data from AJAX request
$penaltyReason = isset($_POST['penaltyReason']) ? $_POST['penaltyReason'] : null;
$penaltyPrice = isset($_POST['penaltyPrice']) ? $_POST['penaltyPrice'] : null;

if (!empty($penaltyReason) && !empty($penaltyPrice)) {
// AUTO_CREMENT không hoạt động như ý muốn, add id auto qua php 13-31
    $result = $conn->query('select maphat from hinhthucphat order by maphat asc');
    if($result === false){
        $reponse['error'] = "Failed to fetch ids";
        echo json_encode($reponse);
        exit();
    }
    
    $existingId = [];
    while($row = $result -> fetch_assoc()){
        $existingId[] = $row['maphat'];
    }
    
    $penaltyCode = null;
    for ($i=1;$i<=count($existingId)+1;$i++){
        if(!in_array($i, $existingId)){
            $penaltyCode = $i;
            break;
        }
    }
    
    $stmt = $conn->prepare("insert into hinhthucphat (maphat, lydophat, phiphat) VALUES (?, ?, ?)");

    if ($stmt === false) {
        $response['error'] = 'Failed to prepare statement';
        echo json_encode($response);
        exit();
    }

    $stmt->bind_param("iss", $penaltyCode, $penaltyReason, $penaltyPrice);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Hình thức phạt được thêm thành công!";
    } else {
        $response['error'] = $stmt->error;
    }
    $stmt->close();
} else {
    $response['error'] = "Hãy cung cấp lí do, phí phạt!";
}
$conn->close();

echo json_encode($response);
?>
