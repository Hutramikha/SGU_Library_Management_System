<?php

// Kết nối cơ sở dữ liệu
include './database/connect.php';

// Thiết lập header JSON
header('Content-Type: application/json');
$conn = $connect;

// Lấy dữ liệu từ yêu cầu POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Kiểm tra dữ liệu đầu vào
if (!$data || !is_array($data)) {
    echo json_encode([
        'success' => false,
        'message' => 'Dữ liệu không hợp lệ.'
    ]);
    exit;
}

// Kết nối cơ sở dữ liệu
$conn = $connect;

try {
    $conn->begin_transaction(); // Bắt đầu transaction

    foreach ($data as $entry) {
        // Lấy dữ liệu từ từng mục
        $maquyen = $entry['maquyen'] ?? null;
        $tenchucnang = $entry['tenchucnang'] ?? null;
        $hanhdong = $entry['hanhdong'] ?? null;
        $hoatdong = isset($entry['hoatdong']) && $entry['hoatdong'] ? 1 : 0;

        // Kiểm tra tính hợp lệ
        if (!$maquyen || !$tenchucnang || !$hanhdong) {
            throw new Exception("");
        }

        // Lệnh INSERT hoặc UPDATE
        $query = "
        INSERT INTO chitietquyen (maquyen, machucnang, hanhdong, hoatdong)
        VALUES (?, (SELECT machucnang FROM chucnang WHERE tenchucnang = ?), ?, ?)
        ON DUPLICATE KEY UPDATE 
        hoatdong = VALUES(hoatdong);
        ";
    
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            throw new Exception("Lỗi chuẩn bị câu lệnh: " . $conn->error);
        }

        // Gắn tham số và thực thi
        $stmt->bind_param("issi", $maquyen, $tenchucnang, $hanhdong, $hoatdong);
        $stmt->execute();

        if ($stmt->error) {
            throw new Exception("Lỗi thực thi câu lệnh: " . $stmt->error);
        }
    }

    $conn->commit(); // Hoàn thành transaction

    // Phản hồi thành công
    echo json_encode([
        'success' => true,
        'message' => 'Dữ liệu chi tiết quyền đã được cập nhật thành công.'
    ]);

} catch (Exception $e) {
    $conn->rollback(); // Khôi phục nếu có lỗi

    // Phản hồi lỗi
    echo json_encode([
        'success' => false,
        'message' => 'Không thể thay đổi dữ liệu của Admin! ' . $e->getMessage()
    ]);
} finally {
    // Đóng kết nối
    $conn->close();
}

?>
