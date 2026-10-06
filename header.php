<?php
require 'admin/DAO/database/connect.php';

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="stylesheet" href="admin/GUI/style/signlog1.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">


    <title>Document</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/newstyle.css" rel="stylesheet">
    <link href="css/sb-admin-2.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <script src="js/sb-admin-2.min.js"></script>
    <script src="xuli.js"></script>
</head>







<!-- FORM ĐĂNG NHẬP ĐĂNG KÝ -->

<div class="user__signup__login">
   <div class="form_cover">
    
    <div class="wrapper">
        <span id="icon-close">
            <ion-icon name="close"></ion-icon>
        </span>

        <div class="form-box form-box_login">
            <h2>Đăng nhập</h2>
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post" name="form_dn" id="loginForm">
                <div class="input-box">
                    <span class="icon"><ion-icon name="person"></ion-icon></span>
                    <input type="text" name="username_dn" id="input_username_login" value="<?php echo $usernameluu; ?>">
                    <label id="label_username_login">Tên đăng nhập:</label>
                    <label style="font-size: 0.8em ;top: 120%;color: red ; position: absolute;" class = "error_username_login">* Vui lòng điền thông tin</label>
                </div>
                <div class="input-box">
                    <span class="icon" id="show-pass-login" style="cursor: pointer;"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password" name="password_dn" id="input_password_login" value="<?php echo $passwordluu; ?>">
                    <label id="label_password_login">Mật khẩu:</label>
                    <label style="font-size: 0.8em ;top: 120%;color: red ; position: absolute;" class = "error_password_login">* Vui lòng điền thông tin</label>
                </div>
                <div class="error_login">* Tên đăng nhập hoặc mật khẩu không chính xác</div>
                <div id="remember-forget">
                    <label><input type="checkbox" name="remember" id="remember-checkbox">Ghi nhớ đăng nhập</label>
                    <a href="#">Quên mật khẩu ?</a>
                </div>
                <button type="submit" class="btn btn_login" name="dangnhap" style="background-color: #1a38bc; color: white">Đăng nhập</button>
                <div class="login_To_register">
                    <p>Bạn chưa có tài khoản ? <a href="#" id="register-link">Đăng ký</a></p>
                </div>
            </form>
        </div>

        <div class="form-box form-box_register">
            <h2>Đăng ký</h2>
            <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post" name="form_dk" id="regisForm">
                <div class="input-box">
                    <span class="icon"><ion-icon name="person"></ion-icon></span>
                    <input type="text" name="username_dk" id="input_username_regis">
                    <label id="label_username_regis">Tên đăng nhập:</label>
                    <label style="font-size: 0.8em ;top: 120%;color: red ; position: absolute;" class = "error_username_regis">* Vui lòng điền thông tin</label>
                </div>
                <div class="input-box">
                    <span class="icon"><ion-icon name="mail"></ion-icon></span>
                    <input type="text" name="email" id="input_email_regis">
                    <label id="label_email_regis">Email:</label>
                    <label style="font-size: 0.8em ;top: 120%;color: red ; position: absolute;" class = "error_email_regis">* Vui lòng điền thông tin</label>
                </div>
                <div class="input-box">
                    <span class="icon" id="show-pass-regis" style="cursor: pointer;"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password" name="password_dk" id="input_password_regis">
                    <label id="label_password_regis">Mật khẩu:</label>
                    <label style="font-size: 0.8em ;top: 120%;color: red ; position: absolute;" class = "error_password_regis">* Vui lòng điền thông tin</label>
                </div>
                <div class="input-box">
                    <span class="icon" id="show-repass-regis" style="cursor: pointer;"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password" name="repassword_dk" id="input_repassword_regis">
                    <label id="label_repassword_regis">Xác nhận mật khẩu:</label>
                    <label style="font-size: 0.8em ;top: 120%;color: red ; position: absolute;" class = "error_repasssword_regis">* Vui lòng điền thông tin</label>
                </div>
                <div id="agree-with">
                    <label><input type="checkbox" id="checkbox_regis">Tôi đồng ý với các <a href="#">điều khoản</a>và<a href="#">dịch vụ</a></label>
                </div>
                <div class="error_regis">* Vui lòng đồng ý với các điều khoản và dịch vụ</div>
                <button type="submit" class="btn btn_regis" name="dangky" style="background-color: #1a38bc; color: white">Đăng ký</button>
                <div class="register_To_login">
                    <p>Tôi đã có tài khoản <a href="#" id="login-link">Đăng nhập</a></p>
                </div>
            </form>
        </div>
    </div>
</div>
</div>
    
<div id="signup_alert"></div>

<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
        <script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="admin/Controller/signlog9.js"></script>


<!---------------------------------- FORM ĐĂNG NHẬP ĐĂNG KÝ -------------------------------------->






<body id="page-top">
    <div id="wrapper">

        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.php?act=danhSachSanPham&userId=9&currentPage=1&favo=0&searchInput=''">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-book"></i>
                </div>
                <div class="sidebar-brand-text mx-1"> DiagonAlley.com </div>
            </a>

            <hr class="sidebar-divider my-0">

            <li class="nav-item active">
                <a class="nav-link" href="index.php?act=danhSachSanPham&userId=9&currentPage=1&favo=0&searchInput=''">
                    <i class="fas fa-home"></i>
                    <span> Trang chủ </span>
                </a>
            </li>

            <hr class="sidebar-divider">

            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo" onclick="setActiveMenuBar(this, 'parent')">
                    <i class="fas fa-book-open"></i>
                    <span> Hoạt động </span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <a class="collapse-item" href="index.php?act=xemGioMuon&userId=9" onclick="setActiveMenuBar(this, 'child')"> Giỏ mượn của tôi </a>
                        <a class="collapse-item" href="index.php?act=xemSachDangMuon&userId=9" onclick="setActiveMenuBar(this, 'child')"> Đang mượn </a>
                        <a class="collapse-item" href="index.php?act=xemLichSuMuon&userId=9" onclick="setActiveMenuBar(this, 'child')"> Lịch sử mượn </a>
                    </div>
                </div>
            </li>

            <!-- <li class="nav-item">
                <a class="nav-link" href="index.php?act=blank" onclick="setActiveMenuBar(this, 'single')">
                    <i class="fas fa-clock"></i>
                    <span> Gia hạn sách </span>
                </a>
            </li> -->
            <li class="nav-item">
                <a class="nav-link" href="index.php?act=danhSachSanPham&userId=9&currentPage=1&favo=1&searchInput=''" onclick="setActiveMenuBar(this, 'single')">
                    <i class="fas fa-heart"></i>
                    <span> Sách yêu thích của tôi </span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="index.php?act=blank" onclick="setActiveMenuBar(this, 'single')">
                    <i class="fas fa-clipboard-list"></i>
                    <span> Quy định sử dụng dịch vụ </span>
                </a>
            </li>

            <script>

            </script>
        </ul>

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <div id="content">
                <nav class="navbar navbar-expand navbar-light topbar mb-4 static-top shadow" style="background-color: #e0e4f0ff; border-bottom: 2px solid #404142;">
                    <form
                        class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small" id="search-input"
                                placeholder="Tìm kiếm sách..." aria-label="Search" aria-describedby="basic-addon2">
                            <script>
                                document.addEventListener('DOMContentLoaded', function() {
                                    const savedSearchInput = localStorage.getItem('searchInput');
                                    if (savedSearchInput) {
                                        document.querySelector('#search-input').value = savedSearchInput;
                                    } else {
                                        document.querySelector('#search-input').value = '';
                                    }
                                    localStorage.removeItem('searchInput');
                                });
                            </script>
                            <div class="input-group-append">
                                <button style="width: 100%" class="btn btn-primary" type="button" id="submit-search-btn" onclick="timKiemSanPham()">
                                    <i class="fas fa-search fa-sm"> </i>
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- Lớp phủ mờ toàn màn hình -->
                    <div id="overlay_blur"></div>

                    <!-- Form tài khoản căn giữa -->
                    <div id="form_profile_index">
                        
                        <!-- Nút X đóng form -->
                        <button id="btn_close_form" class="close-icon" aria-label="Đóng">
                            <i class="fas fa-times"></i>
                        </button>

                        <h4 class="mb-4 text-center">Thông tin tài khoản</h4>
                            
                        <div style="margin-bottom: 10px;">
                            <label for="username_index" class="form-label">Tên tài khoản:</label>
                            <input type="text" id="username_index" class="form-control" disabled>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <label for="gender_index" class="form-label">Giới tính:</label>
                            <select id="gender_index" class="form-select" disabled>
                                <option value="">-- Chọn giới tính --</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <label for="reader_type_index" class="form-label">Loại độc giả:</label>
                            <input type="text" id="reader_type_index" class="form-control" disabled>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <label for="dob_index" class="form-label">Ngày sinh:</label>
                            <input type="date" id="dob_index" class="form-control" disabled>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <label for="phone_index" class="form-label">Số điện thoại:</label>
                            <input type="text" id="phone_index" class="form-control" disabled>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <label for="email_index" class="form-label">Email:</label>
                            <input type="email" id="email_index" class="form-control" disabled>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <label for="address_index" class="form-label">Địa chỉ:</label>
                            <input type="email" id="address_index" class="form-control" disabled>
                        </div>

                        <div class="d-flex justify-content-center gap-2 align-items-center">
                            <button id="btn_edit_index" class="btn btn-primary">Thay đổi</button>
                            <button id="btn_save_index" class="btn btn-success d-none" style="margin-right: 5%;">Lưu</button>
                            <button id="btn_cancel_index" class="btn btn-danger d-none">Hủy</button>
                        </div>
                    </div>

                    <style>
                        #form_profile_index {
                            display: none; /* Ẩn mặc định, bạn sẽ bật bằng JS */
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background-color: #fff;
                            padding: 30px;
                            border-radius: 12px;
                            max-width: 500px;
                            width: 90%;
                            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                            z-index: 1050;
                        }


                        #overlay_blur {
                            display: none;
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100vw;
                            height: 100vh;
                            backdrop-filter: blur(4px);
                            z-index: 1040;
                        }

                        /* Nút X */
                        .close-icon {
                            position: absolute;
                            top: 12px;
                            right: 12px;
                            background: none;
                            border: none;
                            font-size: 1.2rem;
                            color: #333;
                            cursor: pointer;
                            z-index: 1060;
                        }

                        .close-icon i {
                            font-size: 20px;
                        }

                        .close-icon:hover i {
                            color: #dc3545;
                            transform: scale(1.2);
                            transition: all 0.2s ease;
                        }

                        #gender_index {
                            border: 1px solid #ced4da;
                            border-radius: 6px;
                            padding: 8px 12px;
                            font-size: 15px;
                            background-color: #fdfdfd;
                            transition: border-color 0.2s ease;
                        }

                        #gender_index:focus {
                            border-color: #0d6efd;
                            box-shadow: 0 0 0 0.15rem rgba(13, 110, 253, 0.25);
                        }

                        #gender_index:disabled {
                            background-color: #f8f9fa;
                            color: #6c757d;
                        }

                    </style>

                    <script>
                    document.addEventListener("DOMContentLoaded", function () {
                        const btnUser = document.getElementById("btn_user_logged");
                        const menu = document.getElementById("account_menu_index");
                        const btnProfile = document.getElementById("btn_open_profile");
                        const formProfile = document.getElementById("form_profile_index");
                        const formProfile_overlay = document.getElementById("overlay_blur");

                        // Hover hiển thị menu
                        if (btnUser && menu) {
                            btnUser.addEventListener("mouseenter", () => {
                                menu.style.display = "block";
                            });

                            btnUser.addEventListener("mouseleave", () => {
                                setTimeout(() => {
                                    if (!menu.matches(":hover")) {
                                        menu.style.display = "none";
                                    }
                                }, 300);
                            });

                            menu.addEventListener("mouseleave", () => {
                                menu.style.display = "none";
                            });

                            menu.addEventListener("mouseenter", () => {
                                menu.style.display = "block";
                            });
                        }

                        // Mở form tài khoản
                        if (btnProfile && formProfile) {
                            btnProfile.addEventListener("click", () => {
                                formProfile.style.display = "block";
                                formProfile_overlay.style.display = "block";
                                getUserInfoKH(<?php echo json_encode($_SESSION['username'] ?? ''); ?>);
                            });
                        }

                        document.getElementById("btn_close_form").addEventListener("click", () => {
                            formProfile.style.display = "none";
                            formProfile_overlay.style.display = "none";
                        });

                        document.getElementById("btn_edit_index").addEventListener("click", () => {
                            document.querySelectorAll("#form_profile_index input, #form_profile_index select").forEach(field => {
                                if (field.id !== "reader_type_index") {
                                    field.disabled = false;
                                }
                            });

                            document.getElementById("btn_edit_index").classList.add("d-none");
                            document.getElementById("btn_save_index").classList.remove("d-none");
                            document.getElementById("btn_cancel_index").classList.remove("d-none");
                        });


                        document.getElementById("btn_cancel_index").addEventListener("click", () => {
                            getUserInfoKH(<?php echo json_encode($_SESSION['username'] ?? ''); ?>);
                            document.querySelectorAll("#form_profile_index input, #form_profile_index select").forEach(field => {
                                if (field.id !== "reader_type_index") {
                                    field.disabled = true;
                                }
                            });

                            document.getElementById("btn_edit_index").classList.remove("d-none");
                            document.getElementById("btn_save_index").classList.add("d-none");
                            document.getElementById("btn_cancel_index").classList.add("d-none");
                        });
                    });

                        //------ajax đăng xuất-------
                        $(document).ready(function () {
                            // Thêm sự kiện click cho nút đăng xuất
                            $('.logout_btn_index').on('click', function (event) {
                                event.preventDefault(); // Ngăn chặn hành động mặc định

                                // Hiển thị hộp thoại xác nhận
                                const xacNhan = confirm("Bạn có chắc chắn muốn đăng xuất không?");
                                if (!xacNhan) {
                                    return; // Nếu người dùng chọn Cancel → không làm gì cả
                                }

                                console.log("đã nhấn");
                                $.ajax({
                                    url: '/SGU_Library_Management_System/admin/DAO/dn_dk/logout.php',
                                    type: 'POST',
                                    success: function (response) {
                                        try {
                                            const data = typeof response === 'string' ? JSON.parse(response) : response;
                                            if (data.status === 'success') {
                                                localStorage.removeItem('username');
                                                console.log("ĐÃ Đăng Xuất");
                                                window.location.replace('/SGU_Library_Management_System/index.php');
                                            }
                                        } catch (e) {
                                            console.error("Lỗi khi xử lý phản hồi:", e);
                                        }
                                    },
                                    error: function () {
                                        console.error("Lỗi AJAX khi gọi logout.php");
                                    }
                                });
                            });
                        });
                    //--------kết thúc-----------

                    // Biến lưu giá trị ban đầu để kiểm tra thay đổi
                    let ten_check_docgia = "";
                    let gioitinh_check_docgia = "";
                    let ngaysinh_check_docgia = "";
                    let email_check_docgia = "";
                    let sdt_check_docgia = "";
                    let diachi_check_docgia = "";
                    let reader_type_check_docgia = "";
                    // let image_check_docgia = "";

                    let matk_reset_docgia = null;

                    function getUserInfoKH(matk) {
                        $.ajax({
                                    url: '/SGU_Library_Management_System/admin/DAO/database/fetch_data.php',
                            type: 'POST',
                            data: { matk_info: matk },
                            dataType: 'json',
                            success: function (data) {
                                console.log('Phản hồi từ server:', data.list_thongtin_taikhoan);
                                if (data.list_thongtin_taikhoan && Object.keys(data.list_thongtin_taikhoan).length > 0) {
                                    // Gán dữ liệu vào input
                                    $('#username_index').val(data.list_thongtin_taikhoan.ten);
                                    $('#gender_index').val(data.list_thongtin_taikhoan.gioitinh);
                                    $('#dob_index').val(data.list_thongtin_taikhoan.ngaysinh);
                                    $('#email_index').val(data.list_thongtin_taikhoan.email);
                                    $('#phone_index').val(data.list_thongtin_taikhoan.sdt);
                                    $('#address_index').val(data.list_thongtin_taikhoan.diachi);
                                    $('#reader_type_index').val(data.list_thongtin_taikhoan.tenloaidocgia);

                                    // Gán giá trị ban đầu để kiểm tra thay đổi
                                    matk_reset_docgia = matk;
                                    matk_check_docgia = matk;
                                    console.log('MATK CHECK DOCGIA: ' + matk_check_docgia);
                                    ten_check_docgia = data.list_thongtin_taikhoan.ten;
                                    gioitinh_check_docgia = data.list_thongtin_taikhoan.gioitinh;
                                    ngaysinh_check_docgia = data.list_thongtin_taikhoan.ngaysinh;
                                    email_check_docgia = data.list_thongtin_taikhoan.email;
                                    sdt_check_docgia = data.list_thongtin_taikhoan.sdt;
                                    diachi_check_docgia = data.list_thongtin_taikhoan.diachi;
                                    reader_type_check_docgia = data.list_thongtin_taikhoan.tenloaidocgia;

                                    // Gán mã nhân viên hoặc độc giả
                                    if (data.list_thongtin_taikhoan.manv) {
                                        manv_for_pn = data.list_thongtin_taikhoan.manv;
                                    } else {
                                        manv_for_pn = data.list_thongtin_taikhoan.dg;
                                    }

                                    // Gán ảnh đại diện
                                    // if (data.list_thongtin_taikhoan.img !== null && data.list_thongtin_taikhoan.img !== "") {
                                    //     const imagePath = '../avatar/' + data.list_thongtin_taikhoan.img;
                                    //     $('.image-nv-info').attr('src', imagePath);
                                    //     $('#profile-img').attr('src', imagePath);
                                    //     image_check = data.list_thongtin_taikhoan.img; //Gán tên ảnh gốc
                                    // } else {
                                    //     $('.image-nv-info').attr('src', '../img/noimages.png');
                                    //     $('#profile-img').attr('src', '../img/hacker2.png');
                                    //     image_check = ""; //Không có ảnh ban đầu
                                    // }

                                    console.log('HELOO ' + manv_for_pn);
                                } else {
                                    console.log(data.message || "Không có thông tin tài khoản.");
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.error('Lỗi khi gửi yêu cầu:', textStatus, errorThrown);
                            }
                        });
                    }


                    $(document).ready(function () {
                        $('#btn_save_index').on('click', function () {
                            console.log("Bạn đã chọn lưu thông tin cá nhân.");

                            // Lấy dữ liệu từ form
                            const ten = $('#username_index').val();
                            const gioitinh = $('#gender_index').val();
                            const ngaysinh = $('#dob_index').val();
                            const email = $('#email_index').val();
                            const sdt = $('#phone_index').val();
                            const diachi = $('#address_index').val();
                            // const imageFile = $('#image-upload_info_admin')[0].files[0]; // Lấy tệp hình ảnh

                            let isChanged = false;

                            // So sánh với dữ liệu ban đầu (biến gốc bạn phải gán trước đó)
                            if (ten !== ten_check_docgia) isChanged = true;
                            if (gioitinh !== gioitinh_check_docgia) isChanged = true;
                            if (ngaysinh !== ngaysinh_check_docgia) isChanged = true;
                            if (email !== email_check_docgia) isChanged = true;
                            if (sdt !== sdt_check_docgia) isChanged = true;
                            if (diachi !== diachi_check_docgia) isChanged = true;

                            if (!isChanged) {
                                alert("Không có thay đổi nào để cập nhật.");
                                return;
                            }

                            // Kiểm tra hợp lệ
                            if (email && !validateEmail(email)) {
                                alert('Vui lòng nhập email hợp lệ.');
                                return;
                            } else if (sdt && !validatePhone(sdt)) {
                                alert('Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.');
                                return;
                            }

                            // Xác nhận
                            if (!confirm("Bạn có chắc chắn muốn cập nhật thông tin cá nhân?")) {
                                return;
                            }

                            // Tạo FormData
                            const formData = new FormData();
                            formData.append('action', 'updateTaiKhoan'); // Hành động cập nhật
                            formData.append('matk', matk_check_docgia); // Mã tài khoản cần sửa
                            formData.append('ten', ten);
                            formData.append('gioitinh', gioitinh);
                            formData.append('ngaysinh', ngaysinh);
                            formData.append('email', email);
                            formData.append('sdt', sdt);
                            formData.append('diachi', diachi);
                            // formData.append('img', imageFile);

                            // Gửi AJAX
                            $.ajax({
                                url: '/SGU_Library_Management_System/admin/DAO/database/fetch_data.php',
                                type: 'POST',
                                data: formData,
                                processData: false,
                                contentType: false,
                                dataType: 'json',
                                success: function (data) {
                                    if (data.list_sua_taikhoan && data.list_sua_taikhoan.length > 0) {
                                        $.each(data.list_sua_taikhoan, function (index, taikhoan) {
                                            if (taikhoan.status === "success") {
                                                alert(taikhoan.message);
                                                getUserInfoKH(matk_reset_docgia);
                                            } else {
                                                alert(taikhoan.message);
                                            }
                                        });
                                    } else {
                                        alert("Có lỗi hoặc không có tài khoản nào được cập nhật.");
                                    }
                                },
                                error: function (xhr, status, error) {
                                    console.error('Lỗi:', error);
                                    console.log('Phản hồi từ máy chủ:', xhr.responseText);
                                }
                            });
                        });
                    });

                    // Hàm kiểm tra email hợp lệ
                    function validateEmail(email) {
                        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy cho email
                        return regex.test(email);
                    }

                    // Hàm kiểm tra số điện thoại hợp lệ
                    function validatePhone(sdt) {
                        const regex = /^0[0-9]{9}$/; // Biểu thức chính quy cho số điện thoại (10 chữ số, bắt đầu bằng 0)
                        return regex.test(sdt);
                    }

                    </script>

                    <div style="margin-right: 1%"> 
                        <?php if (!empty($usernameKH)) echo htmlspecialchars($usernameKH); ?>
                    </div>
                        
                    <div style="position: relative; display: inline-block;">
                        <?php if (!isset($_SESSION['username'])): ?>
                            <!-- Nút khi chưa đăng nhập -->
                            <button id="btn_form_dn_dk" style="background-color: #4e73df; color: white; border-radius: 5px; border: #4e73df 5px solid; padding: 4%">
                                <i class="fa fa-user"></i>
                            </button>
                        <?php else: ?>
                            <!-- Nút khi đã đăng nhập -->
                            <button id="btn_user_logged" style="background-color: #4e73df; color: white; border-radius: 5px; border: #4e73df 5px solid; padding: 4%">
                                <i class="fa fa-user"></i>
                            </button>

                            <!-- Menu tài khoản -->
                            <div id="account_menu_index" style="display: none; position: absolute; top: 125%; right: -10%; background-color: white; border: 1px solid #ccc; border-radius: 5px; min-width: 180px; z-index: 1000;">
                                <a href="#" id="btn_open_profile" style="display: block; padding: 10px; text-decoration: none; color: #333;">
                                    <i class="fas fa-user-circle me-2"></i> Tài khoản
                                </a>
                                <a href="logout.php" style="display: block; padding: 10px; text-decoration: none; color: #333;" class="logout_btn_index">
                                    <i class="fas fa-sign-out-alt me-2"></i> Đăng xuất
                                </a>
                            </div>
                            
                            <style>
                                #btn_open_profile:hover, .logout_btn_index:hover {
                                    background-color: #bfc6ddff;
                                }
                                
                                #account_menu_index a:hover {
                                    background-color: #f5f5f5;
                                    color: #000;
                                    transition: all 0.2s ease;
                                }

                                #account_menu_index i {
                                    color: #555;
                                    margin-right: 7%;
                                }

                                #account_menu_index::before {
                                    content: "";
                                    position: absolute;
                                    top: -10px;
                                    right: 2%; /* chỉnh vị trí tam giác */
                                    width: 0;
                                    height: 0;
                                    border-left: 8px solid transparent;
                                    border-right: 8px solid transparent;
                                    border-bottom: 10px solid white; /* màu nền menu */
                                    z-index: 1001; /* cao hơn menu để không bị che */
                                }


                            </style>
                        <?php endif; ?>
                    </div>
                    
                </nav>
            </div>

            