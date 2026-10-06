<?php
session_start();

// Xóa session
if (isset($_SESSION['mySession'])) {
    unset($_SESSION['mySession']);
}
if (isset($_SESSION['username'])) {
    unset($_SESSION['username']);
}
if (isset($_SESSION['maquyen'])) {
    unset($_SESSION['maquyen']);
}
session_unset();
session_destroy();

// Xóa cookie
setcookie('mySession', '', time() - 3600, '/');
setcookie("username", "", time() - 3600, '/');
setcookie("user", "", time() - 3600, '/');
setcookie("pass", "", time() - 3600, '/');

// Chuyển hướng về trang chủ
echo json_encode(['status' => 'success']);
exit();
?>
