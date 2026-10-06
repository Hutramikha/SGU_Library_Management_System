<?php

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */

include './database/connect.php';

header('Content-Type: application/json');

// Sử dụng biến kết nối từ file connect.php
$conn = $connect;

// Lấy thông tin từ tham số search (nếu có)
$searchItem = isset($_GET['search']) ? $_GET['search'] : '';

// Câu lệnh truy vấn cơ sở dữ liệu
$query = "SELECT mancc, ten, sdt, diachi FROM nhacungcap";
if (!empty($searchItem)) {
    $query .= " WHERE mancc LIKE ? OR ten LIKE ? OR sdt LIKE ? OR diachi LIKE ?";
}

$stmt = $conn->prepare($query);

// Gán giá trị cho tham số truy vấn nếu có từ khóa tìm kiếm
if (!empty($searchItem)) {
    $searchTerm = "%$searchItem%";
    $stmt->bind_param("ssss", $searchTerm, $searchTerm, $searchTerm, $searchTerm);
}

// Thực thi câu lệnh và lấy kết quả
$stmt->execute();
$result = $stmt->get_result();

// Chuyển kết quả thành mảng
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Trả dữ liệu dạng JSON về client
echo json_encode($data);

// Đóng kết nối
$stmt->close();
$conn->close();

?>
