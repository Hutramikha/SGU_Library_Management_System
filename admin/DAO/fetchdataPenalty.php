<?php

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */

include './database/connect.php';

header('Content-Type: application/json');
$conn = $connect;

$searchItem = isset($_GET['search']) ? $_GET['search'] : '';

$query = "select maphat, lydophat, phiphat from hinhthucphat";
if(!empty($searchItem)){
    $query .= " where maphat like ? or lydophat like ? or phiphat like ?";
}
$stmt = $conn->prepare($query);

if (!empty($searchItem)) {
    $searchTerm = "%$searchItem%";
    $stmt->bind_param("sss", $searchTerm, $searchTerm, $searchTerm);
}

$stmt->execute();
$result = $stmt->get_result();

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
$stmt->close();
$conn->close();


?>
