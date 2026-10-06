<?php
require '../database/connect.php';
session_start();

if (isset($_POST['username_dn']) && isset($_POST['password_dn'])) {
    $username = mysqli_real_escape_string($connect, $_POST['username_dn']);
    $password_input = $_POST['password_dn'];
    $usernameluu = $_POST['username_luu'];
    $passwordluu = $_POST['password_luu'];

    $sql = "SELECT * FROM taikhoan WHERE tendangnhap = '$username'";
    $result = mysqli_query($connect, $sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        $stored_password = $row['matkhau'];

        // Kiểm tra nếu mật khẩu đã mã hóa (bắt đầu bằng $2y$ hoặc $argon2)
        if (
            (str_starts_with($stored_password, '$2y$') || str_starts_with($stored_password, '$argon2')) &&
            password_verify($password_input, $stored_password)
        ) {
            // Đăng nhập thành công với mật khẩu đã mã hóa
            $_SESSION['username'] = $row['tendangnhap'];
            $_SESSION['maquyen'] = $row['maquyen'];
            $_SESSION['login_time'] = time();
            // session_regenerate_id(true); // Gọi ngay sau khi xác thực
            // lưu thông tin ràng buộc
            $_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
            $_SESSION['ua'] = $_SERVER['HTTP_USER_AGENT'];
            $_SESSION['authenticated'] = true;

            // setcookie("username", $username, time() + (86400 * 1), '/');
            if ($usernameluu !== "" && $passwordluu !== "") {
                setcookie("user", $usernameluu, time() + (86400 * 7), '/');
                setcookie("pass", $passwordluu, time() + (86400 * 7), '/');
            }

            echo json_encode(['status' => 'success']);
        }
        // Nếu mật khẩu chưa mã hóa → so sánh trực tiếp
        else if ($password_input === $stored_password) {
            // Đăng nhập thành công với mật khẩu thô
            $_SESSION['username'] = $row['tendangnhap'];
            $_SESSION['maquyen'] = $row['maquyen'];
            $_SESSION['login_time'] = time();
            // session_regenerate_id(true); // Gọi ngay sau khi xác thực
            // lưu thông tin ràng buộc
            $_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
            $_SESSION['ua'] = $_SERVER['HTTP_USER_AGENT'];
            $_SESSION['authenticated'] = true;

            // setcookie("username", $username, time() + (86400 * 1), '/');
            if ($usernameluu !== "" && $passwordluu !== "") {
                setcookie("user", $usernameluu, time() + (86400 * 7), '/');
                setcookie("pass", $passwordluu, time() + (86400 * 7), '/');
            }

            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'fail', 'message' => 'Sai mật khẩu']);
        }
    } else {
        echo json_encode(['status' => 'fail', 'message' => 'Tài khoản không tồn tại']);
    }
} else {
    echo json_encode(['status' => 'fail', 'message' => 'Thiếu thông tin đăng nhập']);
}

mysqli_close($connect);
?>
