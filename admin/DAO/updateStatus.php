<?php

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */
include './database/connect.php';
header('Content-Type: application/json');
$conn = $connect;

if (isset($_POST['id'], $_POST['column'], $_POST['value'])) {
    $id = $_POST['id'];
    $column = $_POST['column'];
    $value = $_POST['value'];

    // Validate column name to prevent SQL injection
    $allowed_columns = ['motatinhtrang'];
    if (!in_array($column, $allowed_columns)) {
        echo "error";
        exit();
    }

    // Prepare và execute SQL update statement
    $stmt = $conn->prepare("update tinhtrangsach set $column = ? where matinhtrang = ?");
    $stmt->bind_param("si", $value, $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "success";
    } else {
        echo "error";
    }

    $stmt->close();
} else {
    echo "error";
}
$conn->close();

?>