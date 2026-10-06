document.addEventListener("DOMContentLoaded", () => {

    /* Các nút hành động */
    const btn_edit = document.querySelector('.btn-edit-info_admin');
    const btn_save = document.querySelector('.btn-save-info_admin');
    const btn_cancel = document.querySelector('.btn-cancel-info_admin');

    const img = document.querySelector('.image-nv-info');

    const input_img_admin_info = document.querySelector('.hidden-file');
    const label_input_img_admin_info = document.querySelector('.label_img');
    
    const ten = document.querySelector(".info_admin-ten");
    const gioitinh = document.querySelector(".info_admin-gioitinh");
    const ngaysinh = document.querySelector(".info_admin-ngaysinh");
    const email = document.querySelector(".info_admin-email");
    const sdt = document.querySelector(".info_admin-sdt");
    const diachi = document.querySelector(".info_admin-diachi");


    function ableInput() {
        ten.disabled = false;
        gioitinh.disabled = false;
        ngaysinh.disabled = false;
        email.disabled = false;
        sdt.disabled = false;
        diachi.disabled = false;

        // Bật input file
        input_img_admin_info.disabled = false;
        input_img_admin_info.style.cursor = 'pointer';

        // Cập nhật style cho label
        label_input_img_admin_info.style.cursor = 'pointer';
        label_input_img_admin_info.style.backgroundColor = '#2196F3';
    }

    function disableInput() {
        ten.disabled = true;
        gioitinh.disabled = true;
        ngaysinh.disabled = true;
        email.disabled = true;
        sdt.disabled = true;
        diachi.disabled = true;

        // Bật input file
        input_img_admin_info.disabled = true;
        input_img_admin_info.style.cursor = 'not-allowed';

        // Cập nhật style cho label
        label_input_img_admin_info.style.cursor = 'not-allowed';
        label_input_img_admin_info.style.backgroundColor = '#ccc';
    }

    btn_edit.addEventListener('click', () => {
        btn_edit.disabled = true; 
        btn_save.disabled = false;
        btn_cancel.disabled = false;  

        ableInput();
    });

    btn_cancel.addEventListener('click', () => {
        btn_edit.disabled = false; 
        btn_save.disabled = true;
        btn_cancel.disabled = true; 

        input_img_admin_info.value = '';
        
        img.src = '../img/noimages.png';

        getUserInfo(matk_reset)
        disableInput();
    });
    
});



// Biến lưu giá trị ban đầu để kiểm tra thay đổi
let ten_check = "";
let gioitinh_check = "";
let ngaysinh_check = "";
let email_check = "";
let sdt_check = "";
let diachi_check = "";
let image_check = "";

let matk_reset = null;

function getUserInfo(matk) {
    $.ajax({
        url: '../DAO/database/fetch_data.php',
        type: 'POST',
        data: { matk_info: matk },
        dataType: 'json',
        success: function (data) {
            console.log('Phản hồi từ server:', data.list_thongtin_taikhoan);
            if (data.list_thongtin_taikhoan && Object.keys(data.list_thongtin_taikhoan).length > 0) {
                // Gán dữ liệu vào input
                $('.info_admin-ten').val(data.list_thongtin_taikhoan.ten);
                $('.info_admin-gioitinh').val(data.list_thongtin_taikhoan.gioitinh);
                $('.info_admin-ngaysinh').val(data.list_thongtin_taikhoan.ngaysinh);
                $('.info_admin-email').val(data.list_thongtin_taikhoan.email);
                $('.info_admin-sdt').val(data.list_thongtin_taikhoan.sdt);
                $('.info_admin-diachi').val(data.list_thongtin_taikhoan.diachi);

                // Gán giá trị ban đầu để kiểm tra thay đổi
                matk_reset = matk;
                matk_check = matk;
                ten_check = data.list_thongtin_taikhoan.ten;
                gioitinh_check = data.list_thongtin_taikhoan.gioitinh;
                ngaysinh_check = data.list_thongtin_taikhoan.ngaysinh;
                email_check = data.list_thongtin_taikhoan.email;
                sdt_check = data.list_thongtin_taikhoan.sdt;
                diachi_check = data.list_thongtin_taikhoan.diachi;

                // Gán mã nhân viên hoặc độc giả
                if (data.list_thongtin_taikhoan.manv) {
                    manv_for_pn = data.list_thongtin_taikhoan.manv;
                } else {
                    manv_for_pn = data.list_thongtin_taikhoan.dg;
                }

                // Gán ảnh đại diện
                if (data.list_thongtin_taikhoan.img !== null && data.list_thongtin_taikhoan.img !== "") {
                    const imagePath = '../avatar/' + data.list_thongtin_taikhoan.img;
                    $('.image-nv-info').attr('src', imagePath);
                    $('#profile-img').attr('src', imagePath);
                    image_check = data.list_thongtin_taikhoan.img; //Gán tên ảnh gốc
                } else {
                    $('.image-nv-info').attr('src', '../img/noimages.png');
                    $('#profile-img').attr('src', '../img/hacker2.png');
                    image_check = ""; //Không có ảnh ban đầu
                }

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
    $('.btn-save-info_admin').on('click', function () {
        console.log("Bạn đã chọn lưu thông tin cá nhân.");

        // Lấy dữ liệu từ form
        const ten = $('.info_admin-ten').val();
        const gioitinh = $('.info_admin-gioitinh').val();
        const ngaysinh = $('.info_admin-ngaysinh').val();
        const email = $('.info_admin-email').val();
        const sdt = $('.info_admin-sdt').val();
        const diachi = $('.info_admin-diachi').val();
        const imageFile = $('#image-upload_info_admin')[0].files[0]; // Lấy tệp hình ảnh

        let isChanged = false;

        // So sánh với dữ liệu ban đầu (biến gốc bạn phải gán trước đó)
        if (ten !== ten_check) isChanged = true;
        if (gioitinh !== gioitinh_check) isChanged = true;
        if (ngaysinh !== ngaysinh_check) isChanged = true;
        if (email !== email_check) isChanged = true;
        if (sdt !== sdt_check) isChanged = true;
        if (diachi !== diachi_check) isChanged = true;
        if (imageFile && imageFile.name !== image_check) isChanged = true;

        if (!isChanged) {
            alert("Không có thay đổi nào để cập nhật.");
            return;
        }

        // Kiểm tra hợp lệ
        if (!ten) {
            alert('Vui lòng nhập tên.');
            return;
        } else if (!gioitinh || gioitinh === "0") {
            alert('Vui lòng chọn giới tính.');
            return;
        } else if (!ngaysinh) {
            alert('Vui lòng nhập ngày sinh.');
            return;
        } else if (!email || !validateEmail(email)) {
            alert('Vui lòng nhập email hợp lệ.');
            return;
        } else if (!sdt || !validatePhone(sdt)) {
            alert('Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.');
            return;
        } else if (!diachi) {
            alert('Vui lòng nhập địa chỉ.');
            return;
        }

        // Xác nhận
        if (!confirm("Bạn có chắc chắn muốn cập nhật thông tin cá nhân?")) {
            return;
        }

        // Tạo FormData
        const formData = new FormData();
        formData.append('action', 'updateTaiKhoan'); // Hành động cập nhật
        formData.append('matk', matk_check); // Mã tài khoản cần sửa
        formData.append('ten', ten);
        formData.append('gioitinh', gioitinh);
        formData.append('ngaysinh', ngaysinh);
        formData.append('email', email);
        formData.append('sdt', sdt);
        formData.append('diachi', diachi);
        formData.append('img', imageFile);

        // Gửi AJAX
        $.ajax({
            url: '../DAO/database/fetch_data.php',
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
                            getUserInfo(matk_reset);
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







    function getUserNAME(matk) {
        USERNAME = matk;
    }   
    
    // Gọi hàm với mã tài khoản cụ thể
    // getUserInfo('ttda0864');






// Hàm chọn ảnh
let imagePathNVinfo;
function previewImageNVinfo(event) {
    const input = event.target;
    const imagePreview = document.querySelector('.image-nv-info');

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result; // Cập nhật src của img với dữ liệu hình ảnh
        }
        reader.readAsDataURL(input.files[0]); // Đọc tệp hình ảnh
    }
}

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

let USERNAME = null;