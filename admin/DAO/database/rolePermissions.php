<?php
include './connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $username = $_GET['username'] ?? null;

    if (!$username) {
        echo json_encode(['error' => 'Username không hợp lệ.']);
        exit;
    }

    try {
        // Truy vấn lấy quyền của người dùng
        $query = "
            SELECT rp.machucnang, rp.hanhdong, rp.hoatdong
            FROM taikhoan ur
            JOIN chitietquyen rp 
                ON ur.maquyen = rp.maquyen
            WHERE ur.tendangnhap = ?
        ";

        $stmt = $connect->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        // Khai báo mảng để lưu kết quả
        $permissions = [];
        $accessPermissions = [];

        while ($row = $result->fetch_assoc()) {
            $machucnang = $row['machucnang'];
            $hanhdong = strtolower(trim($row['hanhdong'])); // Đưa về chữ thường và xóa khoảng trắng
            $hoatdong = (bool)$row['hoatdong'];

            // Phân quyền 'Truy cập'
            if ($hanhdong === 'truy cập') {
                if ($hoatdong) {
                    $accessPermissions[] = $machucnang;
                }
            } else {
                // Tách hành động nếu có nhiều giá trị ngăn cách bởi dấu phẩy
                $actions = explode(',', $row['hanhdong']);

                // Khởi tạo mặc định nếu chưa tồn tại
                if (!isset($permissions[$machucnang])) {
                    $permissions[$machucnang] = [
                        'add' => false,
                        'edit' => false,
                        'delete' => false
                    ];
                }

                // Xử lý từng hành động
                foreach ($actions as $action) {
                    $action = strtolower(trim($action)); // Chuẩn hóa hành động
                    
                    switch ($action) {
                        case 'thêm':
                            $permissions[$machucnang]['add'] = $hoatdong;
                            break;
                        case 'sửa':
                            $permissions[$machucnang]['edit'] = $hoatdong;
                            break;
                        case 'xóa':
                            $permissions[$machucnang]['delete'] = $hoatdong;
                            break;
                    }
                }
            }
        }

        // Trả về kết quả JSON
        echo json_encode([
            'accessPermissions' => $accessPermissions,
            'actionPermissions' => $permissions
        ]);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    } finally {
        $stmt->close();
        $connect->close();
    }
}
?>
