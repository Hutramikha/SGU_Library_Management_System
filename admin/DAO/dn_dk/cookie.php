<?php
session_start();

$response = [];

$response['cookie_user'] = isset($_COOKIE['user']) ? $_COOKIE['user'] : '';
$response['cookie_pass'] = isset($_COOKIE['pass']) ? $_COOKIE['pass'] : '';
$response['session_username'] = isset($_SESSION['username']) ? $_SESSION['username'] : '';
$response['session_maquyen'] = isset($_SESSION['maquyen']) ? $_SESSION['maquyen'] : '';

echo json_encode($response);
?>
