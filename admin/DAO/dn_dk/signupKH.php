<?php
require '../database/connect.php';

if (isset($_POST['username_dk']) && isset($_POST['password_dk']) && isset($_POST['email'])) {
    $id = "";
    $tttk = 0;
    $username = mysqli_real_escape_string($connect, $_POST['username_dk']);
    $password_raw = $_POST['password_dk'];
    $email = mysqli_real_escape_string($connect, $_POST['email']);
    $ngaytao = date('Y-m-d');
    $maquyen = 2;
    $maloaidg = 1;

    // Mã hóa mật khẩu
    $password = password_hash($password_raw, PASSWORD_DEFAULT);

    // Kiểm tra tên đăng nhập đã tồn tại
    $sql_check_username = "SELECT * FROM taikhoan WHERE tendangnhap = '$username'";
    $result_check_username = mysqli_query($connect, $sql_check_username);
    if (mysqli_num_rows($result_check_username) > 0) {
        echo json_encode(['status' => 'fail', 'message' => '* Tên đăng nhập đã tồn tại']);
        exit;
    }

    // Thực hiện lưu thông tin đăng ký
    $sql1 = "INSERT INTO docgia (madg, matk, email, maloaidocgia) VALUES ('$id', '$username', '$email', '$maloaidg')";
    $sql2 = "INSERT INTO taikhoan (tendangnhap, matkhau, maquyen, ngaytao) VALUES ('$username', '$password','$maquyen','$ngaytao')";

    $result2 = mysqli_query($connect, $sql2);
    $result1 = mysqli_query($connect, $sql1);

    if ($result1 && $result2 && mysqli_affected_rows($connect) > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Đăng ký thành công']);
    } else {
        echo json_encode(['status' => 'fail', 'message' => 'Đăng ký thất bại']);
    }
} else {
    echo json_encode(['status' => 'fail', 'message' => 'Đăng ký thất bại']);
}

mysqli_close($connect);
?>
