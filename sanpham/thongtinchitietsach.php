<?php
$userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';
$id_prd = isset($_GET['id']) ? $_GET['id'] : 0;
$currentPage = isset($_GET['currentPage']) ? $_GET['currentPage'] : 0;
$favo = isset($_GET['favo']) ? $_GET['favo'] : 0;
$searchInput = isset($_GET['searchInput']) ? $_GET['searchInput'] : 0;
$wellLiked = isset($_GET['wellLiked']) ? $_GET['wellLiked'] : 0;
$author = isset($_GET['author']) ? $_GET['author'] : '';
$genre = isset($_GET['genre']) ? $_GET['genre'] : '';

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
$stmt = $db->prepare("SELECT sach.masach, sach.tensach, sach.img, sach.phimuon, sach.tomtat, 
                      tacgia.tentg AS tacGia, 
                      nhaxuatban.tennxb AS nhaXuatBan, 
                      theloai.tentl AS theLoai
                      FROM sach 
                      INNER JOIN tacgia ON sach.matg = tacgia.matg
                      INNER JOIN nhaxuatban ON sach.manxb = nhaxuatban.manxb
                      INNER JOIN theloai ON sach.matl = theloai.matl
                      WHERE sach.masach = :id");
$stmt->bindParam(':id', $id_prd, PDO::PARAM_INT);
$stmt->execute();
$thongtinchitiet = $stmt->fetch(PDO::FETCH_ASSOC);

if ($thongtinchitiet) {
    extract($thongtinchitiet);
    $phimuon = number_format($phimuon, 0, ',', '.') . '₫';
    $tomtat = nl2br($tomtat);
    // check sản phẩm đã thêm vào yêu thích hay chưa                         
    $sql_tonTaiYeuThich = "SELECT masach FROM sachyeuthich WHERE madocgia = :userId AND masach = :masach";
    $stmtCheckYeuThich = $db->prepare($sql_tonTaiYeuThich);
    $stmtCheckYeuThich->bindParam(':userId', $userId);
    $stmtCheckYeuThich->bindParam(':masach', $ma);
    $stmtCheckYeuThich->execute();

    // check sản phẩm đã thêm vào giỏ mượn hay chưa                         
    $sql_tonTaiGioMuon = "SELECT masach FROM giomuontamthoi WHERE madocgia = :userId AND masach = :masach AND trangthai = 0";
    $stmtCheckGioMuon = $db->prepare($sql_tonTaiGioMuon);
    $stmtCheckGioMuon->bindParam(':userId', $userId);
    $stmtCheckGioMuon->bindParam(':masach', $ma);
    $stmtCheckGioMuon->execute();

    // check sản phẩm có đang yêu cầu mượn hay chưa                      
    $sql_dangMuon = "SELECT masach FROM giomuontamthoi WHERE madocgia = :userId AND masach = :masach  AND trangthai = 1";
    $stmt_dangMuon = $db->prepare($sql_dangMuon);
    $stmt_dangMuon->bindParam(':userId', $userId);
    $stmt_dangMuon->bindParam(':masach', $masach);
    $stmt_dangMuon->execute();

    if ($genre != '') {
        $genreUrl = "&genre=" . $genre;
    } else {
        $genreUrl = "";
    }

    if ($author != '') {
        $authorUrl = "&author=" . $author;
    } else {
        $authorUrl = "";
    }


    $quayLaiTrangSanPham = "index.php?act=danhSachSanPham&userId=" . $userId . "&currentPage=" . $currentPage . "&favo=" . $favo . "&searchInput=" . $searchInput . $genreUrl . $authorUrl;
    echo '
<div class="container-fluid divDetails" id="product-details">
   <div class="card position-relative" style="border: 2px solid #e3e6f0;">
        <div class="card-header py-3" style="display: flex;">
            <h4 class="m-0 font-weight-bold text-primary">Thông tin chi tiết</h4>
            <button class="back-button">
                <h4 class="m-0 font-weight-bold text-primary"><i class="fa-solid fa-arrow-left"></i> <a href="' . $quayLaiTrangSanPham . '" style = "text-decoration: none;">  Quay lại </a>   </h4>
            </button>
        </div>
        <div class="card-body">
            <div class="book-details">
                <div class="popup" id="popup">
                    Thêm vào giỏ hàng thành công
                </div>

                <div class="book-details__img"><img src="admin/img/' . $img . '" alt=""></div>
                <div class="book-details__info">
                    <h4>Tiêu đề: ' . $tensach . '</h4>
                    <p>Tác giả: ' . $tacGia . ' <br>Thể loại: ' . $theLoai . ' <br>Nhà xuất bản: ' . $nhaXuatBan . '</p>
                    <details>
                        <summary>Xem bản tóm tắt</summary>
                        <p>' . $tomtat . '</p>
                    </details>
                    <b>Phí mượn: ' . $phimuon . '</b>
                    <div class="button-container" style="width: 480px; margin-top: 1.5rem;">';
    if ($stmtCheckYeuThich->rowCount() > 0) {
        echo '
                            <button class="save-favorite-button2" style="width: 15rem; height: 2.8rem; font-size: 17px; background-color: #e4efff" onclick="themXoaSachYeuThich(' . $masach . ',' . $userId . ')"> 
                                <i class="fa-solid fa-star" style="margin-right: 0.5rem;"></i> Đã thêm vào yêu thích
                            </button>';
    } else {
        echo '
                            <button class="save-favorite-button2" style="width: 15rem; height: 2.8rem; font-size: 17px; background-color: #fff" onclick="themXoaSachYeuThich(' . $masach . ',' . $userId . ')"> 
                                <i class="fa-regular fa-star" style="margin-right: 0.5rem;"></i> Thêm vào yêu thích
                            </button>';
    }


    if ($stmt_dangMuon->rowCount() > 0) {
        echo '<button class="borrow-button brbtn2_ style="width: 12rem; height: 2.8rem; font-size: 17px; background-color: transparent; color: #4e73df;"> Đang yêu cầu mượn </button>';;
    } else {
        if ($stmtCheckGioMuon->rowCount() > 0) {
            echo ' <button class="borrow-button brbtn2_' . $masach . '"   style="width: 12rem; height: 2.8rem; font-size: 17px;" onclick="themXoaGioMuon2(' . $masach . ',' . $userId . ')"> <i class="fa-solid fa-minus" style="margin-right: 0.5rem"></i> Xóa khỏi giỏ mượn </button>';
        } else {
            echo ' <button class="borrow-button brbtn2_' . $masach . '" style="width: 12rem; height: 2.8rem; font-size: 17px;"  onclick="themXoaGioMuon2(' . $masach . ',' . $userId . ')"> <i class="fa-solid fa-plus"  style="margin-right: 0.5rem"></i>Thêm vào giỏ mượn</button>';
        }
    }
    echo '            </div>
                </div>
            </div>
        </div>
    </div>
</div>';
} else {
    echo '<h1>Không thấy sản phẩm</h1>';
}
