<?php
session_start();
$conn = mysqli_connect("localhost", "root", "", "thuvien",3307);

if ($conn) {
    $userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';
    $prd_id = isset($_GET['prd_id']) ? intval($_GET['prd_id']) : '';

    $sql_select = "SELECT masach FROM giomuontamthoi WHERE madocgia = $userId AND masach = $prd_id AND trangthai = 0";
    $select_result = mysqli_query($conn, $sql_select);

    if ($select_result) {
        if (mysqli_num_rows($select_result) > 0) {
            $sql = "DELETE FROM giomuontamthoi WHERE masach = '$prd_id' AND madocgia = '$userId'";
            $status = "remove";
        } else {
            $sql = "INSERT INTO giomuontamthoi(masach, trangthai, madocgia) VALUES('$prd_id', '', '$userId')";
            $status = "add";
        }
        
        $result = mysqli_query($conn, $sql);
        
        // Kiểm tra kết quả truy vấn
        if (!$result) {
            echo "Error: " . mysqli_error($conn);
        }
    } else {
        echo "Error: " . mysqli_error($conn);
    }
    
    echo $status;
    mysqli_close($conn);
} else {
    echo "Connection failed: " . mysqli_connect_error();
}