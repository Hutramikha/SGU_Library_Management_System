<?php
$page = $_GET['page'];
$products_per_page = 15;
$offset = ($page - 1) * $products_per_page;
$sortBy = $_GET['sortBy'];
$sortType = $_GET['sortType'];
$userId = isset($_GET['userId']) ? $_GET['userId'] : '';
$favo = $_GET['favo'];
$searchInput = $_GET['searchInput'];
$author = isset($_GET['author']) ? $_GET['author'] : '';
$genre = isset($_GET['genre']) ? $_GET['genre'] : '';

if (!empty($genre)) {
    $genreSql = " AND sach.matl IN(" . $genre . ") ";
} else {
    $genreSql = "";
}

if (!empty($author)) {
    $authorSql = " AND sach.matg IN(" . $author . ") ";
} else {
    $authorSql = "";
}


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

// Xây dựng câu truy vấn SQL với điều kiện tìm kiếm
if ($favo == 0) {
    $stmt = $db->prepare("SELECT sach.masach, sach.tensach, sach.img, sach.phimuon, sach.tomtat, 
                      tacgia.tentg AS tacGia, 
                      nhaxuatban.tennxb AS nhaXuatBan, 
                      theloai.tentl AS theLoai
                      FROM sach 
                      INNER JOIN tacgia ON sach.matg = tacgia.matg
                      INNER JOIN nhaxuatban ON sach.manxb = nhaxuatban.manxb
                      INNER JOIN theloai ON sach.matl = theloai.matl
                      WHERE (LOWER(sach.tensach) LIKE :searchInput OR LOWER(tacgia.tentg) LIKE :searchInput)"
        . $genreSql . $authorSql .
        "ORDER BY $sortBy $sortType
                      LIMIT :offset, :limit");
} else if ($favo == 1) {
    $stmt = $db->prepare("SELECT sach.masach, sach.tensach, sach.img, sach.phimuon, sach.tomtat, 
                      tacgia.tentg AS tacGia, 
                      nhaxuatban.tennxb AS nhaXuatBan, 
                      theloai.tentl AS theLoai
                      FROM sach 
                    INNER JOIN sachyeuthich ON sachyeuthich.masach = sach.masach
                    INNER JOIN tacgia ON sach.matg = tacgia.matg
                    INNER JOIN nhaxuatban ON sach.manxb = nhaxuatban.manxb
                    INNER JOIN theloai ON sach.matl = theloai.matl
                    WHERE sachyeuthich.madocgia = :userId 
                    AND (LOWER(sach.tensach) LIKE :searchInput OR LOWER(tacgia.tentg) LIKE :searchInput)"
        . $genreSql . $authorSql .
        "ORDER BY $sortBy $sortType
                    LIMIT :offset, :limit");
    $stmt->bindParam(':userId', $userId);
}

// Gán giá trị cho tham số tìm kiếm
$stmt->bindValue(':searchInput', '%' . $searchInput . '%', PDO::PARAM_STR);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->bindParam(':limit', $products_per_page, PDO::PARAM_INT);
$stmt->execute();
$danhsach = $stmt->fetchAll(PDO::FETCH_ASSOC);
// Hiển thị div sản phẩm trên trang danh sách 
if (empty($danhsach)) {
    echo "<h2>Không tìm thấy sách </h2>";
} else {
    foreach ($danhsach as $item) {
        extract($item);
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

        $xemThongTinChiTiet = "index.php?act=xemThongTinChiTiet&userId=" . $userId . "&id=" . $masach . "&currentPage=" . $page . "&favo=" . $favo . "&searchInput='" . $searchInput . "'" . $genreUrl . $authorUrl;


        // Check sản phẩm đã thêm vào yêu thích hay chưa 
        $sql_tonTaiYeuThich = "SELECT masach FROM sachyeuthich WHERE madocgia = :userId AND masach = :masach";
        $stmtCheckYeuThich = $db->prepare($sql_tonTaiYeuThich);
        $stmtCheckYeuThich->bindParam(':userId', $userId);
        $stmtCheckYeuThich->bindParam(':masach', $masach);
        $stmtCheckYeuThich->execute();

        // check sản phẩm đã thêm vào giỏ mượn hay chưa                         
        $sql_tonTaiGioMuon = "SELECT masach FROM giomuontamthoi WHERE madocgia = :userId AND masach = :masach AND trangthai = 0";
        $stmtCheckGioMuon = $db->prepare($sql_tonTaiGioMuon);
        $stmtCheckGioMuon->bindParam(':userId', $userId);
        $stmtCheckGioMuon->bindParam(':masach', $masach);
        $stmtCheckGioMuon->execute();

        // check sản phẩm có đang yêu cầu mượn hay chưa                      
        $sql_dangMuon = "SELECT masach FROM giomuontamthoi WHERE madocgia = :userId AND masach = :masach  AND trangthai = 1";
        $stmt_dangMuon = $db->prepare($sql_dangMuon);
        $stmt_dangMuon->bindParam(':userId', $userId);
        $stmt_dangMuon->bindParam(':masach', $masach);
        $stmt_dangMuon->execute();

        echo '<div class="item-container">
            <img src="admin/img/' . $img . '" class="book-image">
            <div class="save-favorite-button">';
        if ($stmtCheckYeuThich->rowCount() > 0) {
            echo '<i class="fa-solid fa-star"></i>';
        } else {
            echo '<i class="fa-regular fa-star"></i>';
        }

        echo '</div>
            <div class="book-info">
                <p class="book-title">' . $tensach .  '</p>
                <p class="book-author"> Tác giả: ' . $tacGia . '</p>
                <div class="button-container">
                    <button class="book-details-button">  <a href="' . $xemThongTinChiTiet . '" style="text-decoration: none;"> <b>Xem chi tiết </b></a> </button>';


        if ($stmt_dangMuon->rowCount() > 0) {
            echo '<button class="borrow-button brbtn1_" style="background-color: transparent; color: #4e73df;"> <b>Đang yêu cầu mượn</b> </button>';
        } else {
            if ($stmtCheckGioMuon->rowCount() > 0) {
                echo '<button class="borrow-button brbtn1_' . $masach . '" onclick="themXoaGioMuon1(' . $masach . ',' . $userId . ')"> <i class="fa-solid fa-minus"  style="margin-right: 0.3rem"></i> Xóa khỏi giỏ mượn</button>';
            } else {
                echo '<button class="borrow-button brbtn1_' . $masach . '" onclick="themXoaGioMuon1(' . $masach . ',' . $userId . ')"> <i class="fa-solid fa-plus"   style="margin-right: 0.3rem;"></i> Thêm vào giỏ mượn</button>';
            }
        }

        echo '
                </div>
                <div class="popup" id="popup">
                    Thêm vào giỏ hàng thành công
                </div>
            </div>
        </div>';
    }
}
