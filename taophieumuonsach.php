<?php
$userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';
$list_prd_id = isset($_GET['list_prd_id']) ? $_GET['list_prd_id'] : '';

function sanPhamTrongGioMuon($userId, $list_prd_id)
{
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
    $stmt = $db->prepare("SELECT sach.masach AS maSach, sach.tensach AS tenSach, sach.img, sach.phimuon, sach.tomtat, 
      tacgia.tentg AS tacGia, 
      nhaxuatban.tennxb AS nhaXuatBan, 
      theloai.tentl AS theLoai
      FROM sach 
      INNER JOIN tacgia ON sach.matg = tacgia.matg
      INNER JOIN nhaxuatban ON sach.manxb = nhaxuatban.manxb
      INNER JOIN theloai ON sach.matl = theloai.matl 
      INNER JOIN giomuontamthoi ON sach.masach = giomuontamthoi.masach
      WHERE giomuontamthoi.madocgia = :userId AND giomuontamthoi.masach IS NOT NULL
      AND giomuontamthoi.masach IN(" . $list_prd_id . ")");
    $stmt->bindParam(':userId', $userId);
    $stmt->execute();
    $danhsach = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $danhsach;
}

function tinhTongPhiMuon($userId, $list_prd_id)
{
    $danhsach = sanPhamTrongGioMuon($userId, $list_prd_id);
    $tongPhiMuon = 0;
    foreach ($danhsach as $sach) {
        $tongPhiMuon += $sach['phimuon'];
    }
    return $tongPhiMuon;
}

function layThongTinDocGia($userId)
{
    $db = new PDO("mysql:host=localhost;dbname=thuvien;charset=utf8", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $db->prepare("SELECT docgia.madg, docgia.ten, docgia.ngaysinh, docgia.gioitinh, docgia.sdt, docgia.diachi, 
      loaidocgia.tenloaidocgia, loaidocgia.soluongsachtoida
      FROM docgia 
      INNER JOIN loaidocgia ON docgia.maloaidocgia = loaidocgia.maloaidocgia
      WHERE docgia.madg = :userId
      ");
    $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
    $stmt->execute();
    $docgia = $stmt->fetch(PDO::FETCH_ASSOC);
    return $docgia;
}

$thongTinDocGia = layThongTinDocGia($userId);
$dsSanPhamTrongGioMuon = sanPhamTrongGioMuon($userId, $list_prd_id);
$tongPhiMuonFormat = number_format(tinhTongPhiMuon($userId, $list_prd_id), 0, ',', '.') . '₫';
$ngayHomNay = date("d/m/Y");

echo '<div class="container-fluid">
    <div class="card position-relative" style="border: 2px solid #e3e6f0;  transform: scale(1.03);">
        <div class="card-header py-3" style="display: flex;">
            <h4 class="m-0 font-weight-bold text-primary"> Xem trước phiếu mượn </h4>
            <button class="back-button">
                <h4 class="m-0 font-weight-bold text-primary"><i class="fa-solid fa-arrow-left"></i> <a href="index.php?act=xemGioMuon&userId=' . $userId . '" style="text-decoration: none; "> Quay lại giỏ mượn </a> </h4>
            </button>
        </div>
        <div class="card-body">
          <div class="popup" id="popup">
                            
            </div>
            <div class="list-prd-in-cart" style="flex-direction: column;  max-height: 800px; overflow-y: auto; color: #63656f">
                <h4><strong>Thông tin bạn đọc </strong></h4> 
                <div class="reader-info" style="line-height: 2; font-size: 17px;">
                    Tên: ' . $thongTinDocGia['ten'] . '<br>
                    Ngày sinh: ' . $thongTinDocGia['ngaysinh'] . '<br>
                    Giới tính: ' . $thongTinDocGia['gioitinh'] . '<br>
                    Bạn đang là: ' . $thongTinDocGia['tenloaidocgia'] . '<br>
                    Số điện thoại: ' . $thongTinDocGia['sdt'] . '<br>
                    Địa chỉ: ' . $thongTinDocGia['diachi'] . '<br><br>
                </div>
                <h4><strong> Chi tiết sách mượn </strong></h4> <br>
                <ul id="loanList">';
foreach ($dsSanPhamTrongGioMuon as $item) {
    extract($item);
    $phiMuon = number_format($item['phimuon'], 0, ',', '.') . '₫';

    echo '          <div class="book-details" style="color: #4e73df; height: 3cm; align-items: center;">
                        <div class="book-details__img"><img src="img/' . $item['img'] . '" alt="" style="height: 2.7cm;"></div>
                        <div class="book-details__info" style="font-size: 16px;">
                            Tên sách: ' . $item['tenSach'] . ' <br>
                            Tác giả: ' . $item['tacGia'] . ' <br>
                            Phí mượn: ' . $phiMuon . '<br>
                            Thời hạn mượn: 7 ngày <br>
                        </div>
                    </div> <br>';
}

echo '          </ul>
                <div style="display: flex; flex-direction: row;  align-items: center;">
                    <div style="display: flex; flex-direction: column; width: 65%;"> 
                        <p><strong>Số lượng: ' . count($dsSanPhamTrongGioMuon) . ' cuốn </strong> </p>
                        <p><strong>Tổng phí mượn: ' . $tongPhiMuonFormat . ' </strong> </p>
                        <p><strong>Ngày mượn: ' . $ngayHomNay . '</strong> </p>
                        <p><strong>Ngày trả dự kiến:</strong> </p>
                    </div>
                    <button class="borrow-button" id="submitLoanRequest" style="width: 30%; height: 3rem; font-size: 20px;" onclick="clickGuiPhieuMuon()">Gửi yêu cầu mượn sách</button>
                </div>
                <br>
                <p style="width: 80%;">*Lưu ý: Bạn đọc có thể trả từng cuốn sách vào các ngày khác nhau (trước hạn). Áp dụng phí phạt nếu bạn đọc trả sách quá hạn hoặc làm hỏng/mất sách. Xem quy định <a href="index.php?act=blank"> tại đây</a></p>
            </div>
        </div>
    </div>
</div>';

?>
<?php
$conn = mysqli_connect("localhost", "root", "", "thuvien");

if ($conn) {
    $request_user_id = isset($_GET['userId']) ? $_GET['userId'] : '';
    $list_request_prd_id = isset($_GET['list_prd_id']) ? explode(',', $_GET['list_prd_id']) : []; // Tách chuỗi thành mảng
    $sql_loaiDocGia = "SELECT ld.soluongsachtoida FROM docgia d
                       INNER JOIN loaidocgia ld ON d.maloaidocgia = ld.maloaidocgia
                       WHERE d.madg = '" . mysqli_real_escape_string($conn, $request_user_id) . "'";
    $result_loaiDocGia = mysqli_query($conn, $sql_loaiDocGia);

    if ($result_loaiDocGia && mysqli_num_rows($result_loaiDocGia) > 0) {
        $row = mysqli_fetch_assoc($result_loaiDocGia);
        $soluongsachtoida = $row['soluongsachtoida'];

        // So sánh số lượng sách yêu cầu với soluongsachtoida
        if (count($list_request_prd_id) > $soluongsachtoida) {
            $thongbao = "Không được mượn";
        } else {
            $thongbao = "Được mượn";
        }
    } else {
        $thongbao = "Không tìm thấy thông tin độc giả";
    }
} else {
    $thongbao = "Lỗi kết nối cơ sở dữ liệu";
}
?>

<script>
    function clickGuiPhieuMuon() {
        var url = window.location.href;
        var urlObj = new URL(url);
        var list_request_prd_id = urlObj.searchParams.get("list_prd_id");
        var request_user_id = urlObj.searchParams.get("userId");
        console.log("list_request_prd_id:", list_request_prd_id);
        console.log("user_id:", request_user_id);

        var tbao = "<?php echo addslashes($thongbao); ?>"; // Sử dụng addslashes để tránh lỗi
        // console.log(tbao);
        if (tbao === "Không được mượn") {
            const popup = document.getElementById('popup');
            popup.style.display = 'block';
            popup.innerHTML = '';
            popup.innerHTML = 'Bạn chỉ được mượn 2 cuốn';

            setTimeout(() => {
                popup.style.transform = 'translate(-50%, -50%) scale(1.4)';
            }, 10);

            setTimeout(() => {
                popup.style.display = 'none';
                popup.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 2000);
        } else if (tbao === "Được mượn") {
            $.ajax({
                url: "phieumuon/insert.php",
                type: "GET",
                data: {
                    list_request_prd_id: list_request_prd_id,
                    request_user_id: request_user_id
                },
                success: function(status) {
                    var maHinhHienTai = document.querySelector('.card-body');
                    maHinhHienTai.innerHTML = '';
                    if (status === "thành công") {
                        maHinhHienTai.innerHTML = `<h1> <b>Gửi yêu cầu mượn sách thành công <i class="fa-regular fa-circle-check" style="margin-left: 1rem; font-size: 3rem"></i> </b></h1>`;
                    } else {
                        maHinhHienTai.innerHTML = `<h1> <b>Gửi yêu cầu mượn sách không thành công  </b></h1>`;
                    }
                }
            });
        }
    }
</script>