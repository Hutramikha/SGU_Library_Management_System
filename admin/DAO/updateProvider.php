<?php
include './database/connect.php';
header('Content-Type: application/json');

$conn = $connect;

if (isset($_POST['id'], $_POST['column1'], $_POST['value1'],
        $_POST['column2'], $_POST['value2'],
        $_POST['column3'], $_POST['value3'])) {
    $id = $_POST['id'];
    $column1 = $_POST['column1'];
    $value1 = $_POST['value1'];
    $column2 = $_POST['column2'];
    $value2 = $_POST['value2'];
    $column3 = $_POST['column3'];
    $value3 = $_POST['value3'];

    // Danh sách các cột được phép cập nhật để ngăn ngừa SQL Injection
    $allowed_columns = ['ten', 'sdt', 'diachi'];
    if (!in_array($column1, $allowed_columns)) {
        echo "error";
        exit();
    }
    if (!in_array($column2, $allowed_columns)) {
        echo "error";
        exit();
    }
    if (!in_array($column3, $allowed_columns)) {
        echo "error";
        exit();
    }

    // Chuẩn bị và thực thi câu lệnh SQL để cập nhật
    $stmt = $conn->prepare("UPDATE nhacungcap SET $column1 = ?, $column2 = ?, $column3 = ? WHERE mancc = ?");
    $stmt->bind_param("sisi", $value1, $value2, $value3, $id);
    $stmt->execute();

    // Kiểm tra xem có hàng nào bị ảnh hưởng không
    if ($stmt->affected_rows > 0) {
        echo "success";
    } else {
        echo "error";
    }

    $stmt->close();
} else {
    echo "error";
}
$conn->close();
?>
