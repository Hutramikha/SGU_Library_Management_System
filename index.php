<?php
session_start();

// if (isset($_SESSION['username']) && isset($_SESSION['password'])) {
// include "./model/pdo.php";
// $db = new PDO("mysql:host=localhost;port=3307;dbname=thuvien;charset=utf8", "root", "");
// $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// $action = isset($_GET['act']) ? $_GET['act'] : 'danhSachSanPham';
// $searchInput = isset($_GET['searchInput']) ? $_GET['searchInput'] : '';
// $tentk = $_SESSION['username'];
// $matkhau = $_SESSION['password'];
// $stmt = $db->prepare("SELECT d.madg 
//                        FROM docgia d 
//                        INNER JOIN taikhoan t ON d.matk = t.tendangnhap 
//                        WHERE t.tendangnhap = :tentk");
// $stmt->bindValue(':tentk', $tentk, PDO::PARAM_STR);
// $stmt->execute();
// $madg = $stmt->fetchColumn();


include "./model/pdo.php";
include "header.php";
$db = new PDO("mysql:host=localhost;port=3307;dbname=thuvien;charset=utf8", "root", "");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$action = isset($_GET['act']) ? $_GET['act'] : 'danhSachSanPham';
$searchInput = isset($_GET['searchInput']) ? $_GET['searchInput'] : '';
switch ($action) {
    case 'danhSachSanPham':
        $favo = isset($_GET['favo']) ? $_GET['favo'] : 0;
        $searchInput = isset($_GET['searchInput']) ? $_GET['searchInput'] : '';
        $searchInputTemp = strtolower(trim($_GET['searchInput']));
        $searchInputTemp = trim($searchInputTemp, "'");
        $genre = isset($_GET['genre']) ? $_GET['genre'] : '';
        $author = isset($_GET['author']) ? $_GET['author'] : '';
        $currentPage = isset($_GET['currentPage']) ? $_GET['currentPage'] : 0;
        $userId = 9;
        if (!empty($genre)) {
            $genreSql = " AND sach.matl IN(" . $genre . ")";
        } else {
            $genreSql = "";
        }
        if (!empty($author)) {
            $authorSql = " AND sach.matg IN(" . $author . ")";
        } else {
            $authorSql = "";
        }

        if ($favo == 0) {
            $stmt = $db->prepare("SELECT COUNT(*) AS totalProducts
                                          FROM sach 
                                          INNER JOIN tacgia ON sach.matg = tacgia.matg
                                          INNER JOIN nhaxuatban ON sach.manxb = nhaxuatban.manxb
                                          INNER JOIN theloai ON sach.matl = theloai.matl
                                          WHERE (LOWER(sach.tensach) LIKE :searchInputTemp OR LOWER(tacgia.tentg) LIKE :searchInputTemp)" . $genreSql . $authorSql);

            $stmt->bindValue(':searchInputTemp', '%' . strtolower($searchInputTemp) . '%', PDO::PARAM_STR);
            $stmt->execute();
            $totalProducts = $stmt->fetchColumn();
        } else if ($favo == 1) {
            $stmt = $db->prepare("SELECT COUNT(*) AS totalProducts
                                          FROM sachyeuthich 
                                          INNER JOIN sach ON sachyeuthich.masach = sach.masach
                                          INNER JOIN tacgia ON sach.matg = tacgia.matg
                                          INNER JOIN nhaxuatban ON sach.manxb = nhaxuatban.manxb
                                          INNER JOIN theloai ON sach.matl = theloai.matl
                                          WHERE sachyeuthich.madocgia = :userId 
                                          AND (LOWER(sach.tensach) LIKE :searchInputTemp OR LOWER(tacgia.tentg) LIKE :searchInputTemp)"  . $genreSql . $authorSql);

            $stmt->bindValue(':userId', $userId, PDO::PARAM_INT);
            $stmt->bindValue(':searchInputTemp', '%' . strtolower($searchInputTemp) . '%', PDO::PARAM_STR);
            $stmt->execute();
            $totalProducts = $stmt->fetchColumn();
        }
        include 'sanpham/loadtrangsanpham.php';
        break;

    case 'xemThongTinChiTiet':
        $id_prd = isset($_GET['id']) ? $_GET['id'] : 0;
        $currentPage = isset($_GET['currentPage']) ? $_GET['currentPage'] : 0;
        $favo = isset($_GET['favo']) ? $_GET['favo'] : 0;
        $searchInput = isset($_GET['searchInput']) ? $_GET['searchInput'] : 0;
        $genre = isset($_GET['genre']) ? $_GET['genre'] : '';
        $author = isset($_GET['author']) ? $_GET['author'] : '';
        // $userId = isset($_GET['userId']) ? $_GET['userId'] : '';
        $userId = 9;


        include 'sanpham/thongtinchitietsach.php';
        break;
    case 'xemGioMuon':
        // $userId = isset($_GET['userId']) ? $_GET['userId'] : '';
        $userId = 9;
        include 'xemgiomuon.php';
        break;
    case 'blank':
        echo "<h1> Blank page </h1>";
        break;
    case 'taoPhieuMuonSach':
        // $userId = isset($_GET['userId']) ? $_GET['userId'] : '';
        $userId = 9;
        $list_prd_id = isset($_GET['list_prd_id']) ? $_GET['list_prd_id'] : '';
        include 'taophieumuonsach.php';
        break;
    case 'xemSachDangMuon':
        // $userId = isset($_GET['userId']) ? $_GET['userId'] : '';
        $userId = 9;
        include 'sachdangmuon.php';
        break;
    case 'xemLichSuMuon':
        // $userId = isset($_GET['userId']) ? $_GET['userId'] : '';
        $userId = 9;
        include 'lichsumuon.php';
        break;

    default:
        break;
}

include "footer.php";
