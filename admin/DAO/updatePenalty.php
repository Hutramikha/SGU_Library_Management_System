<?php

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */
include './database/connect.php';
header('Content-Type: application/json');
$conn = $connect;

if (isset($_POST['id'], 
        $_POST['column1'], $_POST['value1'], 
        $_POST['column2'], $_POST['value2'])) {
    $id = $_POST['id'];
    $column1 = $_POST['column1'];
    $value1 = $_POST['value1'];
    $column2 = $_POST['column2'];
    $value2 = $_POST['value2'];

    // Validate column name to prevent SQL injection
    $allowed_columns = ['lydophat', 'phiphat'];
    if (!in_array($column1, $allowed_columns)) {
        echo "error1";
        exit();
    }
    if (!in_array($column2, $allowed_columns)) {
        echo "error2";
        exit();
    }

    // Prepare và execute SQL update statement
    $stmt = $conn->prepare("update hinhthucphat set $column1 = ?, $column2 = ? where maphat = ?");
    $stmt->bind_param("ssi", $value1, $value2, $id);
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