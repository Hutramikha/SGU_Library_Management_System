<?php
$userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';

?>

<div class="container-fluid">
    <div class="card position-relative" style="border: 2px solid #e3e6f0;  transform: scale(1.03);">
        <div class="card-header py-3" style="display: flex;">
            <h4 class="m-0 font-weight-bold text-primary"> Sách đang mượn </h4>

        </div>
        <div class="card-body" style="position: relative;">
            <div class="list-prd-in-cart" style="flex-direction: column;  max-height: 1200px; overflow-y: auto;">
                <?php
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
                      theloai.tentl AS theLoai,
                      phieumuon.ngaymuon AS ngayMuon,
                      phieumuon.hantra AS hanTra,
                      chitietphieumuon.tinhtrangmuon AS tinhTrangMuon
                      FROM sach 
                      INNER JOIN tacgia ON sach.matg = tacgia.matg
                      INNER JOIN nhaxuatban ON sach.manxb = nhaxuatban.manxb
                      INNER JOIN theloai ON sach.matl = theloai.matl
                      INNER JOIN chitietsach ON sach.masach = chitietsach.masach
                      INNER JOIN chitietphieumuon ON chitietsach.mavach = chitietphieumuon.mavach
                      INNER JOIN phieumuon ON chitietphieumuon.mapm = phieumuon.mapm
                      WHERE  phieumuon.madg = :userId
                      ");
                $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
                $stmt->execute();
                $danhsach = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (empty($danhsach)) {
                    echo "<h2> Bạn chưa có sản phẩm nào trong giỏ mượn </h2>";
                } else {
                    foreach ($danhsach as $item) {
                        extract($item);
                        if($tinhTrangMuon == 0){
                            $hienThiTrangThai = "Đang chờ duyệt yêu cầu mượn sách";
                        } else if ($tinhTrangMuon == 1){
                            $hienThiTrangThai = "Bạn đang trong thời gian mượn sách";
                        }
                        $phiMuon = number_format($phimuon, 0, ',', '.') . '₫';
                        $ngayMuonDateTime = DateTime::createFromFormat('Y-m-d', $ngayMuon);
                        $ngayTraDuKien = '0000-00-00';
                        if ($ngayMuonDateTime === false) {
                            echo "Lỗi: Ngày mượn không hợp lệ.";
                        } else {
                            $ngayTra = $ngayMuonDateTime->modify("+$hanTra days");
                            $ngayTraDuKien = $ngayTra->format('Y-m-d');
                            echo '
                         <div class="prd-in-cart" style="margin-bottom: 1.3rem; border: 1px solid #e3e6f0; border-radius: 1rem;">
                   
                    <div class="book-details" style="height: 100%; width: 70%; color: #4e73df; transform: scale(0.93);">
                        <div class="book-details__img"><img src="thuvien/img/' . $img . '" alt="" style="transform: scale(0.9);"></div>
                        <div class="book-details__info" >
                            Tên sách: ' . $tensach . ' <br>
                            Tác giả: ' . $tacGia . ' <br>
                            Phí mượn: ' . $phiMuon . '<br>
                            Ngày mượn: ' . $ngayMuon . ' <br>
                            Ngày trả dự kiến: ' . $ngayTraDuKien . ' <br>
                        </div>
                    </div>
   <div class="button-container" style="width: 30%; height: 100%; flex-direction: column; justify-content: center; align-item: center;">
                        
                       <b> ' . $hienThiTrangThai . '</b>
                    </div>
                </div>';
                        }
                    }
                }

                echo '
            </div>
        </div>
    </div>
</div>';

                ?>
                <script>

                </script>