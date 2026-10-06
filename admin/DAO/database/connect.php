<?php
$server = 'localhost';
$user = 'root';
$pass = '';
$database = 'thuvien';
$port = 3307; // Thêm dòng này

$connect = mysqli_connect($server, $user, $pass, $database, $port);
if (!$connect) {
    die("Connection failed: " . mysqli_connect_error());
} else {
    // echo "Đã kết nối thành công";
}
?>
