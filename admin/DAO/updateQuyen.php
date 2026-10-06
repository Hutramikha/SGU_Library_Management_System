<?php

// Kết nối cơ sở dữ liệu
include './database/connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $maquyen = $_POST['maquyen'] ?? null;
    $tenquyen = $_POST['tenquyen'] ?? null;

    if (!$maquyen || !$tenquyen) {
        header("Location: form.html?error=Dữ liệu không hợp lệ.");
        exit;
    }

    try {
        $conn = $connect;
        
        // Lệnh INSERT hoặc UPDATE
        $query = "
        INSERT INTO quyen (maquyen, tenquyen)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE 
        tenquyen = VALUES(tenquyen);
        ";

        $stmt = $conn->prepare($query);

        if (!$stmt) {
            throw new Exception("Lỗi chuẩn bị câu lệnh: " . $conn->error);
        }

        // Liên kết các tham số với câu lệnh SQL
        $stmt->bind_param("is", $maquyen, $tenquyen);

        // Thực thi câu lệnh
        $stmt->execute();

        // Kiểm tra số dòng bị ảnh hưởng (affected rows)
        if ($stmt->affected_rows > 0) {
            header("Location: form.html?message=Thêm/Cập nhật thành công.");
        } else {
            throw new Exception("Không thể thực hiện hành động.");
        }
    } catch (Exception $e) {
        header("Location: form.html?error=Lỗi: " . $e->getMessage());
    } finally {
        $conn->close();
    }
} else {
    header("Location: form.html?error=Phương thức không hợp lệ.");
}
