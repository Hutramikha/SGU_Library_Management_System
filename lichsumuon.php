<?php
$userId =  isset($_GET['userId']) ? $_GET['userId'] : '';
?>

<div class="container-fluid">
    <div class="card position-relative" style="border: 2px solid #e3e6f0;  transform: scale(1.03);">
        <div class="card-header py-3" style="display: flex;">
            <h4 class="m-0 font-weight-bold text-primary"> Lịch sử mượn </h4>

        </div>
        <div class="card-body" style="position: relative;">
            <div class="list-prd-in-cart" style="flex-direction: column;  max-height: 1200px; overflow-y: auto;">
                <?php
                $db = new PDO("mysql:host=localhost;port=3307;dbname=thuvien;charset=utf8", "root", "");
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $stmt = $db->prepare("SELECT sach.masach, sach.tensach, sach.img, sach.phimuon, sach.tomtat, 
                      tacgia.tentg AS tacGia, 
                      nhaxuatban.tennxb AS nhaXuatBan, 
                      theloai.tentl AS theLoai,
                      phieumuon.ngaymuon AS ngayMuon,
                      phieumuon.hantra AS hanTra,
                      chitietphieutra.mavach AS maVach,
                      hinhthucphat.lydophat AS lydophat,
                      hinhthucphat.phiphat AS phiPhat
                      FROM sach 
                      INNER JOIN tacgia ON sach.matg = tacgia.matg
                      INNER JOIN nhaxuatban ON sach.manxb = nhaxuatban.manxb
                      INNER JOIN theloai ON sach.matl = theloai.matl 
                      INNER JOIN chitietphieutra ON chitietphieutra.mavach = chitietsach.mavach
                      INNER JOIN chitietsach ON sach.masach = chitietsach.masach
                      INNER JOIN phieumuon ON chitietphieumuon.mapm = phieumuon.mapm
                      INNER JOIN hinhthucphat ON chitietphieutra.maphat = hinhthucphat.maphat
                      INNER JOIN phieumuon ON phieutra.mapm = phieumuon.mapm
                      WHERE  phieumuon.madg = :userId 
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
                        // $ngayMuonDateTime = DateTime::createFromFormat('Y-m-d', $ngayMuon);
                        // $ngayTraDuKien = '0000-00-00';
                        // $ngayHomNay = date('Y-m-d');
                        // if ($ngayMuonDateTime === false) {
                        //     echo "Lỗi: Ngày mượn không hợp lệ.";
                        // } else {
                            $ngayTra = $ngayMuonDateTime->modify("+$hanTra days");
                            $ngayTraDuKien = $ngayTra->format('Y-m-d');
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