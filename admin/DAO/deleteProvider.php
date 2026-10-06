<?php

include './database/connect.php';
header('Content-Type: application/json');
$conn = $connect;

$response = ['success' => false];

if (isset($_POST['mancc'])) {
    $provider_id = $_POST['mancc']; // Lấy mã nhà cung cấp từ yêu cầu

    // Tạo câu lệnh SQL để xóa nhà cung cấp
    $query = "DELETE FROM nhacungcap WHERE mancc = ?";
    $stmt = $conn->prepare($query);
    
    // Kiểm tra nếu câu lệnh chuẩn bị bị lỗi
    if ($stmt === false) {
        $response['error'] = 'Failed to prepare statement';
        echo json_encode($response);
        exit();
    }

    // Liên kết tham số và thực thi câu lệnh
    $stmt->bind_param("i", $provider_id);
    
    // Thực thi câu lệnh
    if ($stmt->execute()) {
        $response['success'] = $stmt->affected_rows > 0; // Kiểm tra số hàng bị ảnh hưởng (xóa thành công)
    } else {
        $response['error'] = 'Failed to execute query';
    }

    // Đóng statement
    $stmt->close();
} else {
    $response['error'] = 'Provider ID not provided';
}

// Trả về kết quả JSON
echo json_encode($response);

$conn->close();
?>
