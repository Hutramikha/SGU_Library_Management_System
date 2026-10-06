<?php
$userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';
?>

<div class="container-fluid">
    <div class="card position-relative" style="border: 2px solid #e3e6f0;  transform: scale(1.03);">
        <div class="card-header py-3" style="display: flex;">
            <h4 class="m-0 font-weight-bold text-primary"> Lịch sử mượn </h4>

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
                      pm1.ngaymuon AS ngayMuon,
                      pm2.hantra AS hanTra,
                      chitietphieutra.mavach AS maVach,
                      hinhthucphat.lydophat AS lydophat,
                      hinhthucphat.phiphat AS phiPhat
                      FROM sach 
                    INNER JOIN tacgia ON sach.matg = tacgia.matg
                    INNER JOIN nhaxuatban ON sach.manxb = nhaxuatban.manxb
                    INNER JOIN theloai ON sach.matl = theloai.matl 
                    INNER JOIN chitietsach ON sach.masach = chitietsach.masach
                    INNER JOIN chitietphieutra ON chitietphieutra.mavach = chitietsach.mavach
                    INNER JOIN chitietphieumuon ON chitietsach.mavach = chitietphieumuon.mavach
                    INNER JOIN phieumuon pm1 ON chitietphieumuon.mapm = pm1.mapm
                    INNER JOIN phieutra ON chitietphieutra.mapt = phieutra.mapt
                    INNER JOIN phieumuon pm2 ON phieutra.mapm = pm2.mapm
                    INNER JOIN hinhthucphat ON chitietphieutra.maphat = hinhthucphat.maphat
                    WHERE pm1.madg = :userId
                      ");
                $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
                $stmt->execute();
                $danhsach = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (empty($danhsach)) {
                    echo "<h2> Bạn chưa có lịch sử mượn sách </h2>";
                } else {
                    foreach ($danhsach as $item) {
                        extract($item);
                        $phiMuon = number_format($phimuon, 0, ',', '.') . '₫';

                        $ngayTraDuKien = '0000-00-00';
                        $ngayHomNay = date('Y-m-d');

                        $ngayMuonDateTime = DateTime::createFromFormat('Y-m-d', $ngayMuon);

                        if ($ngayMuonDateTime === false) {
                            echo "Lỗi: Ngày mượn không hợp lệ.";
                        } else {
                            $ngayTra = $ngayMuonDateTime->modify("+$hanTra days");
                            $ngayTraDuKien = $ngayTra->format('Y-m-d');
                        }

                            echo '
                         <div class="prd-in-cart" style="margin-bottom: 1.3rem; border: 1px solid #e3e6f0; border-radius: 1rem;">
                   
                    <div class="book-details" style="height: 100%; width: 60%; color: #4e73df; transform: scale(0.93);">
                        <div class="book-details__img"><img src="thuvien/img/' . $img . '" alt="" style="transform: scale(0.9);"></div>
                        <div class="book-details__info" style="font-size: 16px;">
                            Tên sách: ' . $tensach . ' <br>
                            Tác giả: ' . $tacGia . ' <br>
                            Phí mượn: ' . $phiMuon . '<br>
                            Ngày mượn: ' . $ngayMuon . ' <br>
                            Ngày trả dự kiến: ' . $ngayMuon . ' <br>
                            Ngày trả: ' . $ngayMuon . ' <br>
                        </div>
                    </div>
                    <div class="book-details" style="height: 100%; width: 40%; color: #4e73df; transform: scale(0.93);">
                        <div class="book-details__info" style="font-size: 16px;">
                           Tình trạng trả sách: Trong hạn, sách nguyên vẹn <br>
                           Phí phạt áp dụng: <b> 0đ </b><br>
                        </div>
                    </div>
                    
                </div>';
                        // }
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