<?php
$userId = isset($_SESSION['idDocGia']) ? $_SESSION['idDocGia'] : '';

?>

<div class="container-fluid">
    <div class="card position-relative" style="border: 2px solid #e3e6f0;  transform: scale(1.03);">
        <div class="card-header py-3" style="display: flex;">
            <h4 class="m-0 font-weight-bold text-primary"> Giỏ mượn của tôi </h4>
            <button class="create-ticket-button" onclick="moManHinhMuonSach(<?php echo($userId)?>)">
                <h4 class="m-0 font-weight-bold text-primary"><i class="fa-solid fa-arrow-right"></i> Tạo phiếu mượn sách </h4>
            </button>
        </div>
        <div class="card-body" style="position: relative;">
            <label class="cart-checkbox cart-checkbox-all" style="padding-left: 80%;">
                <b style="color: #4e73df; font-size: 20px; padding-right: 1.5rem;"> Chọn tất cả </b>
                <input type="checkbox" id="cartCheckedAll">
                <span class="checkmark"></span>
            </label>
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
                      theloai.tentl AS theLoai
                      FROM sach 
                      INNER JOIN tacgia ON sach.matg = tacgia.matg
                      INNER JOIN nhaxuatban ON sach.manxb = nhaxuatban.manxb
                      INNER JOIN theloai ON sach.matl = theloai.matl 
                      INNER JOIN giomuontamthoi ON sach.masach = giomuontamthoi.masach
                      WHERE giomuontamthoi.trangthai = '' AND giomuontamthoi.madocgia = :userId AND giomuontamthoi.masach IS NOT NULL
                      ");
                $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
                $stmt->execute();
                $danhsach = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (empty($danhsach)) {
                    echo "<h2> Bạn chưa có sản phẩm nào trong giỏ mượn </h2>";
                } else {
                    foreach ($danhsach as $item) {
                        extract($item);
                        $phiMuon = number_format($phimuon, 0, ',', '.') . '₫';

                        echo '
                         <div class="popup" id="popup">
                            
                        </div>
                         <div class="prd-in-cart" style="margin-bottom: 1.3rem; border: 1px solid #e3e6f0; border-radius: 1rem;">
                    <button class="remove-fr-cart" onclick="themXoaGioMuon3(' . $masach . ',' . $userId . ')" style="border: none; background-color: transparent; margin: 1.5rem;">
                        <i class="fa-regular fa-trash-can" style="color: #4e73df; font-size: 24px;" ></i>
                    </button>
                    <div class="book-details" style="height: 100%; width: 85%; color: #4e73df; transform: scale(0.93);">
                        <div class="book-details__img"><img src="thuvien/img/' . $img . '" alt="" style="transform: scale(0.9);"></div>
                        <div class="book-details__info" >
                            Tên sách: ' . $tensach . ' <br>
                            Tác giả: ' . $tacGia . ' <br>
                            Phí mượn: ' . $phiMuon . '<br>
                            Thời hạn mượn: 7 ngày <br>
                        </div>
                    </div>
                    <div class="button-container" style="width: 10%; height: 50%; flex-direction: column; ">
                        <label class="cart-checkbox">
                            <input type="checkbox" class= "prd-in-cart-check" id="' . $masach . '">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>';
                    }
                }

                echo '
            </div>
        </div>
    </div>
</div>';
                ?>
                <script>
                    const cartCheck = document.querySelectorAll('input[type="checkbox"].prd-in-cart-check');
                    const cartCheckCount = cartCheck.length;
                    const selectAllCheckbox = document.getElementById('cartCheckedAll');

                    if (cartCheckCount === 0) {
                        document.querySelector('.cart-checkbox.cart-checkbox-all').style.display = "none"; 
                    } else {
                        document.querySelector('.cart-checkbox.cart-checkbox-all').style.display = "inline-flex;"; 
                    }

                    function updateButtonVisibility() {
                        const checkedCount = Array.from(cartCheck).filter(cb => cb.checked).length;
                        if (checkedCount >= 1) {
                            document.querySelector('.create-ticket-button').style.display = "flex";
                        } else {
                            document.querySelector('.create-ticket-button').style.display = "none";
                        }
                    }

                    cartCheck.forEach(a => {
                        a.addEventListener('change', function() {
                            updateButtonVisibility();
                            const checkedCount = Array.from(cartCheck).filter(cb => cb.checked).length;
                            if (checkedCount < cartCheckCount) {
                                selectAllCheckbox.checked = false;
                            }
                        });
                    });

                    selectAllCheckbox.addEventListener('change', function() {
                        cartCheck.forEach(checkbox => {
                            checkbox.checked = selectAllCheckbox.checked;
                        });
                        updateButtonVisibility();
                    });

                    updateButtonVisibility();
                </script>