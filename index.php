<?php
session_set_cookie_params([
    'lifetime' => 0,                // session tồn tại đến khi đóng trình duyệt
    'path' => '/',
    'domain' => '',                 // để trống = chỉ domain hiện tại
    'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
    'httponly' => true,             // ngăn JavaScript truy cập cookie
    'samesite' => 'Strict'          // không gửi cookie khi request từ site khác
]);

session_start();

// Nếu đã đăng nhập thì kiểm tra IP và User-Agent
if (isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true) {
    if ($_SESSION['ip'] !== $_SERVER['REMOTE_ADDR'] ||
        $_SESSION['ua'] !== $_SERVER['HTTP_USER_AGENT']) {
        // Nếu không khớp thì hủy session
        session_unset();
        session_destroy();
    }
}

require 'admin/DAO/database/connect.php';
$session_timeout = 150;

// Kiểm tra timeout trước
if (isset($_SESSION['login_time']) && isset($session_timeout) && isset($_SESSION['username'])) {
    if (time() - $_SESSION['login_time'] > $session_timeout) {
        session_unset();
        session_destroy();
        echo "<script>
            alert('Phiên đăng nhập đã hết hạn. Bạn sẽ được chuyển về trang chủ.');
            window.location.href = '/SGU_Library_Management_System/index.php';
        </script>";
        exit();
    }
}

$usernameluu = $_COOKIE['user'] ?? "";
$passwordluu = $_COOKIE['pass'] ?? "";

$usernameKH = 'Đăng nhập / Đăng ký';

if (isset($_SESSION['username'])) {
    $username = mysqli_real_escape_string($connect, $_SESSION['username']);

    // Truy vấn quyền nếu chưa có
    if (!isset($_SESSION['maquyen'])) {
        $sql = "SELECT maquyen FROM taikhoan WHERE tendangnhap = '$username'";
        $result = mysqli_query($connect, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $_SESSION['maquyen'] = $row['maquyen'];
        } else {
            $_SESSION['maquyen'] = -1;
        }
    }

    // Kiểm tra quyền và chuyển trang
    if ($_SESSION['maquyen'] == 0 || $_SESSION['maquyen'] == 1) {
        header("Location: /SGU_Library_Management_System/admin/GUI/trangadmin.php");
        exit();
    } elseif ($_SESSION['maquyen'] == 2) {
        $usernameSession = $_SESSION['username'];

        // Kết nối database
        $sql = "SELECT ten,madg FROM docgia WHERE matk = ?";
        $stmt = $connect->prepare($sql);
        $stmt->bind_param("s", $usernameSession);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($row = $result->fetch_assoc()) {
            // Nếu 'ten' có giá trị thì gán, nếu null thì dùng username từ session
            $usernameKH = $row['ten'] !== null ? $row['ten'] : $usernameSession;
            $userid_dg = $row['madg'];
            $_SESSION['idDocGia'] = $userid_dg;
        } else {
            // Không tìm thấy dòng nào, dùng username từ session
            $usernameKH = $usernameSession;
            $userid_dg = $row['madg'];
            $_SESSION['idDocGia'] = $userid_dg;
        }

        $stmt->close();
    }
}

mysqli_close($connect);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="admin/GUI/style/signlog1.css">
</head>
<body>
    <div id="div_overlay"> </div>
    
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
        <script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</body>
</html>

<script>
    function updateSession() {
        fetch('/SGU_Library_Management_System/update_session.php');
    }

    // Lắng nghe các thao tác người dùng
    document.addEventListener('click', updateSession);
    document.addEventListener('scroll', updateSession);
    document.addEventListener('keydown', updateSession);
</script>

<?php if (isset($_SESSION['login_time']) && isset($session_timeout) && isset($_SESSION['username'])) : ?>
<script>
const timeout = <?php echo $session_timeout; ?> * 1000;
let reloadTimer = null;
let expiredHandled = false; // tránh reload nhiều lần

function scheduleReload() {
    fetch('/SGU_Library_Management_System/get_session.php')
        .then(res => res.text())
        .then(loginTimeStr => {
            const loginTime = parseInt(loginTimeStr) * 1000;

            // Nếu chưa login thì bỏ qua
            if (!loginTime || loginTime === 0) return;

            const now = Date.now();
            const remaining = (loginTime + timeout) - now;

            if (reloadTimer) clearTimeout(reloadTimer);

            if (remaining > 0) {
                // đặt hẹn reload một lần duy nhất
                reloadTimer = setTimeout(() => {
                    location.reload();
                }, remaining);
            } else {
                // hết hạn thì reload ngay, nhưng chỉ một lần
                if (!expiredHandled) {
                    expiredHandled = true;
                    location.reload();
                }
            }
        });
}

scheduleReload();
</script>
<?php endif; ?>



<?php
include "./model/pdo.php";
include "header.php";

try {
    $dsn = "mysql:host=localhost;port=3307;dbname=thuvien;charset=utf8";
    $username = "root";
    $password = ""; // nếu bạn không đặt mật khẩu

    $db = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die("Lỗi kết nối CSDL: " . $e->getMessage());
}

$action = isset($_GET['act']) ? $_GET['act'] : 'danhSachSanPham';
$searchInput = isset($_GET['searchInput']) ? $_GET['searchInput'] : '';
switch ($action) {
    case 'danhSachSanPham':
        $favo = isset($_GET['favo']) ? $_GET['favo'] : 0;
        $searchInput = isset($_GET['searchInput']) ? $_GET['searchInput'] : '';
        $searchInputTemp = strtolower(trim($searchInput, "'"));
        $genre = isset($_GET['genre']) ? $_GET['genre'] : '';
        $author = isset($_GET['author']) ? $_GET['author'] : '';
        $currentPage = isset($_GET['currentPage']) ? $_GET['currentPage'] : 0;
        $userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : null;

        // Xử lý điều kiện lọc
        $genreSql = !empty($genre) ? " AND sach.matl IN(" . $genre . ")" : "";
        $authorSql = !empty($author) ? " AND sach.matg IN(" . $author . ")" : "";

        // Nếu chưa đăng nhập mà chọn chế độ yêu thích → fallback về chế độ thường
        if ($favo == 1 && empty($userId)) {
            $favo = 0;
        }

        if ($favo == 0) {
            $stmt = $db->prepare("SELECT COUNT(*) AS totalProducts
                FROM sach 
                INNER JOIN tacgia ON sach.matg = tacgia.matg
                INNER JOIN nhaxuatban ON sach.manxb = nhaxuatban.manxb
                INNER JOIN theloai ON sach.matl = theloai.matl
                WHERE (LOWER(sach.tensach) LIKE :searchInputTemp OR LOWER(tacgia.tentg) LIKE :searchInputTemp)"
                . $genreSql . $authorSql);

            $stmt->bindValue(':searchInputTemp', '%' . $searchInputTemp . '%', PDO::PARAM_STR);
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
                AND (LOWER(sach.tensach) LIKE :searchInputTemp OR LOWER(tacgia.tentg) LIKE :searchInputTemp)"
                . $genreSql . $authorSql);

            $stmt->bindValue(':userId', $userId, PDO::PARAM_INT);
            $stmt->bindValue(':searchInputTemp', '%' . $searchInputTemp . '%', PDO::PARAM_STR);
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
        $userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';


        include 'sanpham/thongtinchitietsach.php';
        break;
    case 'xemGioMuon':
        // $userId = isset($_GET['userId']) ? $_GET['userId'] : '';
        $userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';
        include 'xemgiomuon.php';
        break;
    case 'blank':
        echo "<h1> Blank page </h1>";
        break;
    case 'taoPhieuMuonSach':
        // $userId = isset($_GET['userId']) ? $_GET['userId'] : '';
        $userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';
        $list_prd_id = isset($_GET['list_prd_id']) ? $_GET['list_prd_id'] : '';
        include 'taophieumuonsach.php';
        break;
    case 'xemSachDangMuon':
        // $userId = isset($_GET['userId']) ? $_GET['userId'] : '';
        $userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';
        include 'sachdangmuon.php';
        break;
    case 'xemLichSuMuon':
        // $userId = isset($_GET['userId']) ? $_GET['userId'] : '';
        $userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';
        include 'lichsumuon.php';
        break;

    default:
        break;
}

include "footer.php";
?>
