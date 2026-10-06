<?php
session_start();
$conn = mysqli_connect("localhost", "root", "", "thuvien",3307);

if ($conn) {
    // $user_id = $_SESSION['user_id']; 
    $userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';
    $prd_id = $_GET['prd_id'];

    // Kiểm tra kết nối và truy vấn
    $sql_select = "SELECT masach FROM sachyeuthich WHERE madocgia = '" . mysqli_real_escape_string($conn, $user_id) . "' AND masach = '" . mysqli_real_escape_string($conn, $prd_id) . "'";
    $select_result = mysqli_query($conn, $sql_select);

    if ($select_result) {
        if (mysqli_num_rows($select_result) > 0) {
            $sql = "DELETE FROM sachyeuthich WHERE masach = '" . mysqli_real_escape_string($conn, $prd_id) . "' AND madocgia = '" . mysqli_real_escape_string($conn, $user_id) . "'";
            $status = "remove";
        } else {
            $sql = "INSERT INTO sachyeuthich(masach, madocgia) VALUES('" . mysqli_real_escape_string($conn, $prd_id) . "', '" . mysqli_real_escape_string($conn, $user_id) . "')";
            $status = "add";
        }

        $result = mysqli_query($conn, $sql);
        
        // Kiểm tra kết quả truy vấn
        if (!$result) {
            echo "Error: " . mysqli_error($conn);
            exit; // Dừng thực thi nếu có lỗi
        }
    } else {
        echo "Error: " . mysqli_error($conn);
        exit; // Dừng thực thi nếu có lỗi
    }

    echo $status;
    mysqli_close($conn);
} else {
    echo "Connection failed: " . mysqli_connect_error();
}