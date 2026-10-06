<?php

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */
    $server='localhost';
    $user='root';
    $pass='';
    $database='thuvien';
    $port=3307;
    $connect = mysqli_connect($server,$user,$pass,$database,$port);
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    } else {
        // echo "Đã kết nối thành công";
    }
?>