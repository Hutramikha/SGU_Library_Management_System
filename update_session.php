<?php
session_start();
$_SESSION['login_time'] = time();
echo $_SESSION['login_time'];
?>