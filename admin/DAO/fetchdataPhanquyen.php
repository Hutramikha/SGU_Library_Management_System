<?php

// Kết nối cơ sở dữ liệu
include './database/connect.php';

header('Content-Type: application/json');

// Sử dụng biến kết nối từ file connect.php
$conn = $connect;

// Lấy thông tin tìm kiếm (nếu có)
$searchItem = isset($_GET['search']) ? $_GET['search'] : '';
$maquyen = isset($_GET['maquyen']) ? $_GET['maquyen'] : '';
error_log("Giá trị maquyen nhận được: " . $maquyen);

// Kiểm tra tham số maquyen
if (!isset($maquyen)) {
    echo json_encode([
        'error' => true,
        'message' => 'Missing required parameter: maquyen'
    ]);
    exit;
}

// Câu lệnh truy vấn cơ sở dữ liệu
$query = "SELECT chitietquyen.maquyen, chucnang.tenchucnang, chitietquyen.hanhdong, chitietquyen.hoatdong
          FROM chitietquyen
          INNER JOIN chucnang ON chitietquyen.machucnang = chucnang.machucnang
          WHERE chitietquyen.maquyen = ?";

$stmt = $conn->prepare($query);
if (!empty($searchItem)) {
    $query .= " AND (chucnang.tenchucnang LIKE ? OR chitietquyen.hanhdong LIKE ? )";
    $stmt = $conn->prepare($query);
    $searchTerm = "%$searchItem%";
    $stmt->bind_param("ss", $maquyen, $searchTerm);
} else {
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $maquyen);
}


// Thực thi câu lệnh và lấy kết quả
$stmt->execute();
$result = $stmt->get_result();

$data = [];
$counter = 1; 

while ($row = $result->fetch_assoc()) {
    $data[] = [
        'stt' => $counter++, 
        'id' => $row['maquyen'],
        'tenchucnang' => $row['tenchucnang'],
        'hanhdong' => $row['hanhdong'],
        'hoatdong' => (bool)$row['hoatdong']
    ];
}


// Trả dữ liệu dạng JSON về client
echo json_encode($data);

// Đóng kết nối
$stmt->close();
$conn->close();
