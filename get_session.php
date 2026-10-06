<?php
session_start();
echo isset($_SESSION['login_time']) ? $_SESSION['login_time'] : 0;
?>