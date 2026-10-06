<?php
include './database/connect.php'; // Kiểm tra đường dẫn đến connect.php
header('Content-Type: application/json');
$conn = $connect;

$response = ['success' => false];

// Lấy dữ liệu từ yêu cầu AJAX
$providerName = isset($_POST['providerName']) ? $_POST['providerName'] : null;
$providerPhone = isset($_POST['providerPhone']) ? $_POST['providerPhone'] : null;
$providerAddress = isset($_POST['providerAddress']) ? $_POST['providerAddress'] : null;

// Kiểm tra xem các trường có rỗng hay không
if (empty($providerName) || empty($providerPhone) || empty($providerAddress)) {
    $response['error'] = "Hãy cung cấp đầy đủ tên, số điện thoại và địa chỉ!";
    echo json_encode($response);
    exit();
}

// Kiểm tra định dạng số điện thoại (10 chữ số, bắt đầu bằng 0)
if (!preg_match('/^0\d{9}$/', $providerPhone)) {
    $response['error'] = "Số điện thoại không hợp lệ! Số điện thoại phải có 10 chữ số và bắt đầu bằng 0.";
    echo json_encode($response);
    exit();
}

// Tạo câu lệnh INSERT 
$stmt = $conn->prepare("INSERT INTO nhacungcap (mancc, ten, sdt, diachi) VALUES (?, ?, ?, ?)");

// AUTO_CREMENT không hoạt động như ý muốn, add id auto qua php 13-31
$result = $conn->query('select mancc from nhacungcap order by mancc asc');
    if($result === false){
        $reponse['error'] = "Failed to fetch ids";
        echo json_encode($reponse);
        exit();
    }
    
    $existingId = [];
    while($row = $result -> fetch_assoc()){
        $existingId[] = $row['mancc'];
    }
    
    $providerCode = null;
    for ($i=1;$i<=count($existingId)+1;$i++){
        if(!in_array($i, $existingId)){
            $providerCode = $i;
            break;
        }
    }


if ($stmt === false) {
    $response['error'] = 'Failed to prepare statement';
    echo json_encode($response);
    exit();
}

$stmt->bind_param("ssss", $providerCode, $providerName, $providerPhone, $providerAddress);

if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = "Nhà cung cấp được thêm thành công!";
} else {
    $response['error'] = $stmt->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
