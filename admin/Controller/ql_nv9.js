document.addEventListener("DOMContentLoaded", () => {

    /* Các nút hành động */
    const btn_add_nv = document.querySelector('.btn-add-nv');
    const btn_delete_nv = document.querySelector('.btn-delete-nv');
    const btn_edit_nv = document.querySelector('.btn-edit-nv');
    const btn_save_nv = document.querySelector('.btn-save-nv');
    const btn_cancel_nv = document.querySelector('.btn-cancel-nv');
    const btn_reset_nv = document.querySelector('.btn-reset-nv');

    const input_search = document.querySelector('.search-input-nv');

    const img = document.querySelector('.image-nv');

    const input_ten_nv = document.querySelector('.input-ten_nv');
    const select_gioitinh_nv = document.querySelector('.select-gioitinh_nv');
    const input_ngaysinh_nv = document.querySelector('.input-ngaysinh_nv');
    const input_email_nv = document.querySelector('.input-email_nv');
    const input_sdt_nv = document.querySelector('.input-sdt_nv');
    const input_diachi_nv = document.querySelector('.input-diachi_nv');
    const input_img_nv = document.querySelector('.input-img_nv');

    function ableInput() {
        input_ten_nv.disabled = false;
        select_gioitinh_nv.disabled = false;
        input_ngaysinh_nv.disabled = false;
        input_email_nv.disabled = false;
        input_sdt_nv.disabled = false;
        input_diachi_nv.disabled = false;
        input_img_nv.disabled = false;
    }

    function disableInput() {
        input_ten_nv.disabled = true;
        select_gioitinh_nv.disabled = true;
        input_ngaysinh_nv.disabled = true;
        input_email_nv.disabled = true;
        input_sdt_nv.disabled = true;
        input_diachi_nv.disabled = true;
        input_img_nv.disabled = true;
    }

    function resetInput() {
        input_ten_nv.value = '';
        input_ngaysinh_nv.value = '';
        input_email_nv.value = '';
        input_sdt_nv.value = '';
        input_diachi_nv.value = '';
        input_img_nv.value = '';

        select_gioitinh_nv.selectedIndex = 0;
    }

    function resetIMG() {
        img.src = '../img/noimages.png';
    };

    btn_add_nv.addEventListener('click', () => {
        btn_delete_nv.disabled = true;
        btn_edit_nv.disabled = true;
        btn_save_nv.disabled = false;
        btn_cancel_nv.disabled = false;

        resetInput();
        ableInput();

        resetIMG();

        save_for_nv = 1;
    });

    btn_edit_nv.addEventListener('click', () => {
        btn_add_nv.disabled = true;
        btn_delete_nv.disabled = true;
        btn_save_nv.disabled = false;
        btn_cancel_nv.disabled = false;

        save_for_nv = 2;

        ableInput();
    });

    btn_delete_nv.addEventListener('click', () => {

    });

    btn_cancel_nv.addEventListener('click', () => {
        img.src = '../img/noimages.png';

        btn_add_nv.disabled = false;
        btn_edit_nv.disabled = false;
        btn_delete_nv.disabled = false;
        btn_save_nv.disabled = true;
        btn_cancel_nv.disabled = true;

        disableInput();
        resetInput();
    });

    btn_reset_nv.addEventListener('click', () => {
        input_search.value = '';

        img.src = '../img/noimages.png';

        btn_add_nv.disabled = false;
        btn_edit_nv.disabled = false;
        btn_delete_nv.disabled = false;
        btn_save_nv.disabled = true;
        btn_cancel_nv.disabled = true;

        save_for_nv = 0

        disableInput();
        resetInput();
        reset_table_nhanvien();
    });

    // FETCH DATA=========================================
    $(document).ready(function () {
        // Fetch dữ liệu từ server
        $.ajax({
            url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Hiển thị dữ liệu cho danh sách nhân viên
                $.each(data.list_nhanvien, function (index, nhanvien) {
                    $('.table-nhanvien tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + nhanvien.manv + '</td>' +
                        '<td>' + nhanvien.matk + '</td>' +
                        '<td>' + nhanvien.ten + '</td>' +
                        '<td>' + nhanvien.gioitinh + '</td>' +
                        '<td>' + nhanvien.ngaysinh + '</td>' +
                        '<td>' + nhanvien.email + '</td>' +
                        '<td>' + nhanvien.sdt + '</td>' +
                        '<td>' + nhanvien.diachi + '</td>' +
                        '</tr>'
                    );
                });

                // Hiển thị dữ liệu cho danh sách nhân viên chưa có tài khoản
                $.each(data.list_nhanvien_ko_tk, function (index, nhanvien_ko_tk) {
                    $('.table-nhanvien_taikhoan tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + nhanvien_ko_tk.manv + '</td>' +
                        '<td>' + '<button id="capTaiKhoanBtn" class="btn-cap-tai-khoan" onclick="capTaiKhoan(' + nhanvien_ko_tk.manv + ')">Cấp Tài Khoản</button>' + '</td>' +
                        '</tr>'
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error('Lỗi:', error);
            }
        });
    });

    function reset_table_nhanvien() {
        $(document).ready(function () {
            $('.table-nhanvien tbody').empty();
            $('.table-nhanvien_taikhoan tbody').empty();
            // Fetch dữ liệu từ server
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Hiển thị dữ liệu cho danh sách nhân viên
                    $.each(data.list_nhanvien, function (index, nhanvien) {
                        $('.table-nhanvien tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + nhanvien.manv + '</td>' +
                            '<td>' + nhanvien.matk + '</td>' +
                            '<td>' + nhanvien.ten + '</td>' +
                            '<td>' + nhanvien.gioitinh + '</td>' +
                            '<td>' + nhanvien.ngaysinh + '</td>' +
                            '<td>' + nhanvien.email + '</td>' +
                            '<td>' + nhanvien.sdt + '</td>' +
                            '<td>' + nhanvien.diachi + '</td>' +
                            '</tr>'
                        );
                    });

                    // Hiển thị dữ liệu cho danh sách nhân viên chưa có tài khoản
                    $.each(data.list_nhanvien_ko_tk, function (index, nhanvien_ko_tk) {
                        $('.table-nhanvien_taikhoan tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + nhanvien_ko_tk.manv + '</td>' +
                            '<td>' + '<button id="capTaiKhoanBtn" class="btn-cap-tai-khoan" onclick="capTaiKhoan(' + nhanvien_ko_tk.manv + ')">Cấp Tài Khoản</button>' + '</td>' +
                            '</tr>'
                        );
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    }


    //======================================Tìm kiếm nhân viên
    $(document).ready(function () {
        // Hàm tìm kiếm nhân viên
        function searchEmployees() {
            const searchQuery = $('.search-input-nv').val();

            if (searchQuery.trim() === '') {
                $('.table-nhanvien tbody').empty(); // Nếu không có từ khóa, xóa kết quả
                $('.table-nhanvien tbody').append('<tr><td colspan="9">Không tìm thấy nhân viên nào.</td></tr>');
                return;
            }

            $.ajax({
                url: '../DAO/database/fetch_data.php', // Tập tin PHP xử lý tìm kiếm
                method: 'GET',
                dataType: 'json', // Định dạng dữ liệu trả về là JSON
                data: { search_nhanvien: searchQuery },
                success: function (data) {
                    $('.table-nhanvien tbody').empty(); // Xóa kết quả cũ
                    if (data.list_timkiem_nhanvien.length > 0) {
                        $.each(data.list_timkiem_nhanvien, function (index, nhanvien) {
                            $('.table-nhanvien tbody').append(
                                '<tr>' +
                                '<td>' + (index + 1) + '</td>' +
                                '<td>' + nhanvien.manv + '</td>' +
                                '<td>' + nhanvien.matk + '</td>' +
                                '<td>' + nhanvien.ten + '</td>' +
                                '<td>' + nhanvien.gioitinh + '</td>' +
                                '<td>' + nhanvien.ngaysinh + '</td>' +
                                '<td>' + nhanvien.email + '</td>' +
                                '<td>' + nhanvien.sdt + '</td>' +
                                '<td>' + nhanvien.diachi + '</td>' +
                                '</tr>'
                            );
                        });
                    } else {
                        $('.table-nhanvien tbody').append('<tr><td colspan="9">Không tìm thấy nhân viên nào.</td></tr>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        }

        // Tìm kiếm khi nhấn nút
        $('.btn-search-nv').on('click', function () {
            searchEmployees();
        });

        // Tìm kiếm khi nhấn phím Enter
        $('.search-input-nv').on('keypress', function (e) {
            if (e.which === 13) { // Kiểm tra phím Enter
                searchEmployees();
                return false; // Ngăn chặn hành vi mặc định của Enter
            }
        });
    });

    // Sự kiện click đổ dữ liệu
    $(document).ready(function () {
        // Gán sự kiện click cho các dòng của bảng với delegation
        $('.table-nhanvien tbody').on('click', 'tr', function () {
            // Lấy dữ liệu từ các cột
            const cells = $(this).children('td');

            const manv_for_input = $(cells[1]).text(); // Cột Mã NV
            const matk_for_input = $(cells[2]).text(); // Cột Mã TK

            manv_check = manv_for_input;
            ma_nv_toancuc = manv_for_input;

            const ten_for_input = $(cells[3]).text(); // Cột Tên
            const gioitinh_for_select = $(cells[4]).text(); // Cột Giới tính
            const ngaysinh_for_input = $(cells[5]).text(); // Cột Ngày sinh
            const email_for_input = $(cells[6]).text(); // Cột Email
            const sdt_for_input = $(cells[7]).text(); // Cột SĐT
            const diachi_for_input = $(cells[8]).text(); // Cột Địa chỉ

            tennv_check = $(cells[3]).text();
            gioitinhnv_check = $(cells[4]).text();
            ngaysinhnv_check = $(cells[5]).text();
            emailnv_check = $(cells[6]).text();
            sdtnv_check = $(cells[7]).text();
            diachinv_check = $(cells[8]).text();

            // Chuyển đổi định dạng ngày nếu cần
            const formattedDate = formatDate(ngaysinh_for_input);

            // Đổ dữ liệu vào các input và select
            $('.input-ten_nv').val(ten_for_input);
            $('.select-gioitinh_nv').val(gioitinh_for_select);
            $('.input-ngaysinh_nv').val(formattedDate); // Gán giá trị đã định dạng
            $('.input-email_nv').val(email_for_input);
            $('.input-sdt_nv').val(sdt_for_input);
            $('.input-diachi_nv').val(diachi_for_input);


            $.ajax({
                url: '../DAO/database/fetch_data.php', // URL đến file PHP xử lý
                type: 'POST',
                data: { manv_timAnh_nv: manv_for_input }, // Gửi mã sách
                dataType: 'json',
                success: function (data) {
                    if (data.list_tim_anh_nv.length > 0) {
                        // Lấy giá trị từ phần tử đầu tiên trong danh sách
                        const img = data.list_tim_anh_nv[0];
                        if (img.img !== null) {
                            // Nếu có hình ảnh, cập nhật thẻ img với đường dẫn hình ảnh
                            $('.image-nv').attr('src', '../avatar/' + img.img);
                            imageFile_check_nv = img.img;
                        } else {
                            // Nếu không có hình ảnh, có thể ẩn thẻ img hoặc hiển thị hình ảnh mặc định
                            $('.image-nv').attr('src', '../img/noimages.png'); // Đường dẫn đến hình ảnh mặc định
                            imageFile_check_nv = img.img; // Hoặc có thể không cần lưu giá trị này
                        }
                    } else {
                        alert("Không có ảnh"); // Thông báo lỗi nếu không có dữ liệu
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });

        });

        // Hàm để chuyển đổi định dạng ngày
        function formatDate(dateString) {
            const dateParts = dateString.split('/');
            if (dateParts.length === 3) {
                // Giả sử định dạng ban đầu là DD/MM/YYYY
                return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Chuyển sang YYYY-MM-DD
            }
            return dateString; // Trả về giá trị gốc nếu không đúng định dạng
        }
    });

    //===== Xóa nhân viên ======>
    $(document).ready(function () {
        $('.btn-delete-nv').on('click', function () {
            if (ma_nv_toancuc) {
                // Gửi yêu cầu xóa đến server
                // Xác nhận trước khi gửi dữ liệu
                const confirmMessage = `Bạn có chắc chắn muốn xóa nhân viên ?`;
                if (!confirm(confirmMessage)) {
                    return; // Nếu người dùng không xác nhận, dừng lại
                }
                $.ajax({
                    url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP xử lý xóa
                    method: 'POST',
                    data: { manv_xoa: ma_nv_toancuc }, // Gửi masach
                    dataType: 'json',
                    success: function (data) {
                        $.each(data.list_xoa_nhanvien, function (index, manv) {
                            if (manv.status === "success") {
                                alert(manv.message);
                                resetInput();
                                resetIMG();
                                reset_table_nhanvien();
                            } else {
                                alert(manv.message);
                            }
                        })
                    },
                    error: function (xhr, status, error) {
                        console.error('Lỗi:', error);
                        alert('Có lỗi xảy ra. Vui lòng thử lại.');
                    }
                });
            } else {
                alert('Vui lòng chọn để xóa.');
            }
        });
    });

    // Chức năng thêm và sửa
    $(document).ready(function () {
        $('.btn-save-nv').click(function () {

            switch (save_for_nv) {
                case 1:
                    console.log("Bạn đã chọn trường hợp 1.");
                    $(document).ready(function () {
                        // Đặt lại biến isValid_nv mỗi lần nhấn nút
                        let isValid_nv = true;

                        // Kiểm tra các ô input cụ thể
                        const ten = $('.input-ten_nv').val();
                        const gioitinh = $('.select-gioitinh_nv').val();
                        const ngaysinh = $('.input-ngaysinh_nv').val();
                        const email = $('.input-email_nv').val();
                        const sdt = $('.input-sdt_nv').val();
                        const diachi = $('.input-diachi_nv').val();
                        const imageFile = $('.input-img_nv')[0].files[0]; // Lấy tệp hình ảnh

                        let imageName_nv = null;
                        if (imageFile) {
                            imageName_nv = imageFile.name; // Lấy tên tệp hình ảnh
                            console.log(imageName_nv); // In ra tên tệp hình ảnh
                        } else {
                            console.log("Không có tệp hình ảnh nào được chọn.");
                        }

                        // Kiểm tra nếu các ô input không rỗng
                        if (!ten) {
                            alert('Vui lòng nhập tên nhân viên.');
                            isValid_nv = false;
                        } else if (!ngaysinh) { // Kiểm tra ngày sinh
                            alert('Vui lòng nhập ngày sinh.');
                            isValid_nv = false;
                        } else if (!email || !validateEmail(email)) { // Kiểm tra email
                            alert('Vui lòng nhập email hợp lệ (có chứa @ và .com).');
                            isValid_nv = false;
                        } else if (!sdt || !validatePhone(sdt)) { // Kiểm tra số điện thoại
                            alert('Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.');
                            isValid_nv = false;
                        } else if (!diachi) { // Kiểm tra địa chỉ
                            alert('Vui lòng nhập địa chỉ.');
                            isValid_nv = false;
                        } else if (!imageFile) { // Kiểm tra file hình ảnh
                            alert('Vui lòng chọn hình ảnh.');
                            isValid_nv = false;
                        }

                        // Nếu không hợp lệ, dừng lại
                        if (!isValid_nv) {
                            return; // Dừng lại nếu không hợp lệ
                        }

                        // Xác nhận trước khi gửi dữ liệu
                        const confirmMessage = `Bạn có chắc chắn muốn thêm nhân viên ?`;
                        if (!confirm(confirmMessage)) {
                            return; // Nếu người dùng không xác nhận, dừng lại
                        }

                        // Tạo FormData để gửi dữ liệu
                        const formData = new FormData();
                        formData.append('action', 'addNhanVien');
                        formData.append('ten', ten);
                        formData.append('gioitinh', gioitinh);
                        formData.append('ngaysinh', ngaysinh);
                        formData.append('email', email);
                        formData.append('sdt', sdt);
                        formData.append('diachi', diachi);
                        formData.append('img', imageFile); // Thêm tệp hình ảnh vào FormData

                        // Gửi dữ liệu đến máy chủ
                        $.ajax({
                            url: '../DAO/database/fetch_data.php', // URL đến file PHP xử lý
                            type: 'POST',
                            data: formData,
                            processData: false, // Đặt false để jQuery không xử lý dữ liệu
                            contentType: false, // Đặt false để jQuery không tự động thêm header Content-Type
                            dataType: 'json', // Chỉ định kiểu dữ liệu là JSON
                            success: function (data) {
                                if (data.list_them_nhanvien && data.list_them_nhanvien.length > 0) {
                                    $.each(data.list_them_nhanvien, function (index, nhanvien) {
                                        if (nhanvien.status === "success") {
                                            alert(nhanvien.message);
                                            resetIMG();
                                            resetInput();
                                            reset_table_nhanvien();
                                        } else {
                                            alert(nhanvien.message);
                                        }
                                    });
                                } else {
                                    alert("Có lỗi hoặc không có nhân viên nào được thêm.");
                                }
                            },
                            error: function (xhr, status, error) {
                                console.error('Lỗi:', error);
                                console.log('Phản hồi từ máy chủ:', xhr.responseText); // In ra phản hồi
                            }
                        });
                    });
                    break;

                case 2:
                    console.log("Bạn đã chọn trường hợp 2.");
                    $(document).ready(function () {
                        console.log("Bạn đã chọn sửa nhân viên.");

                        // Lấy dữ liệu từ form
                        const tennv = $('.input-ten_nv').val();
                        const gioitinh = $('.select-gioitinh_nv').val();
                        const ngaysinh = $('.input-ngaysinh_nv').val();
                        const email = $('.input-email_nv').val();
                        const sdt = $('.input-sdt_nv').val();
                        const diachi = $('.input-diachi_nv').val();
                        const imageFile = $('.input-img_nv')[0].files[0]; // Lấy tệp hình ảnh

                        let isChangednv = false;

                        // Kiểm tra xem có thay đổi hay không
                        if (tennv !== tennv_check) isChangednv = true;
                        if (gioitinh !== gioitinhnv_check) isChangednv = true;
                        if (ngaysinh !== ngaysinhnv_check) isChangednv = true;
                        if (email !== emailnv_check) isChangednv = true;
                        if (sdt !== sdtnv_check) isChangednv = true;
                        if (diachi !== diachinv_check) isChangednv = true;
                        if (imageFile && imageFile.name !== imageFile_check) isChangednv = true;

                        if (!isChangednv) {
                            alert("Không có thay đổi nào để cập nhật.");
                            return; // Dừng lại nếu không có thay đổi
                        }

                        // Kiểm tra các ô input không được rỗng
                        if (!tennv) {
                            alert('Vui lòng nhập tên nhân viên.');
                            return; // Dừng lại nếu ô tên nhân viên rỗng
                        } else if (!gioitinh) {
                            alert('Vui lòng chọn giới tính.');
                            return; // Dừng lại nếu giới tính không hợp lệ
                        } else if (!ngaysinh) {
                            alert('Vui lòng nhập ngày sinh.');
                            return; // Dừng lại nếu ô ngày sinh rỗng
                        } else if (!email || !validateEmail(email)) {
                            alert('Vui lòng nhập email hợp lệ.');
                            return; // Dừng lại nếu email không hợp lệ
                        } else if (!sdt || !validatePhone(sdt)) {
                            alert('Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.');
                            return; // Dừng lại nếu số điện thoại không hợp lệ
                        } else if (!diachi) {
                            alert('Vui lòng nhập địa chỉ.');
                            return; // Dừng lại nếu ô địa chỉ rỗng
                        }

                        // Xác nhận trước khi gửi dữ liệu
                        const confirmMessage = `Bạn có chắc chắn muốn sửa nhân viên ?`;
                        if (!confirm(confirmMessage)) {
                            return; // Nếu người dùng không xác nhận, dừng lại
                        }

                        // Tạo FormData để gửi dữ liệu
                        const formData = new FormData();
                        formData.append('action', 'updateNhanVien');
                        formData.append('manv', manv_check); // Mã nhân viên cần sửa
                        formData.append('ten', tennv);
                        formData.append('gioitinh', gioitinh);
                        formData.append('ngaysinh', ngaysinh);
                        formData.append('email', email);
                        formData.append('sdt', sdt);
                        formData.append('diachi', diachi);
                        formData.append('img', imageFile); // Thêm tệp hình ảnh vào FormData

                        // Gửi dữ liệu đến máy chủ
                        $.ajax({
                            url: '../DAO/database/fetch_data.php', // URL đến file PHP xử lý
                            type: 'POST',
                            data: formData,
                            processData: false, // Đặt false để jQuery không xử lý dữ liệu
                            contentType: false, // Đặt false để jQuery không tự động thêm header Content-Type
                            dataType: 'json', // Chỉ định kiểu dữ liệu là JSON
                            success: function (data) {
                                if (data.list_sua_nv && data.list_sua_nv.length > 0) {
                                    $.each(data.list_sua_nv, function (index, nhanvien) {
                                        if (nhanvien.status === "success") {
                                            alert(nhanvien.message);
                                            resetInput(); // Gọi hàm reset input nếu có
                                            resetIMG(); // Gọi hàm reset hình ảnh nếu có
                                            reset_table_nhanvien();
                                        } else {
                                            alert(nhanvien.message);
                                        }
                                    });
                                } else {
                                    alert("Có lỗi hoặc không có nhân viên nào được cập nhật.");
                                }
                            },
                            error: function (xhr, status, error) {
                                console.error('Lỗi:', error);
                                console.log('Phản hồi từ máy chủ:', xhr.responseText); // In ra phản hồi
                            }
                        });
                    });
                    break;

                default:
                    alert("Trường hợp không hợp lệ. Vui lòng chọn 1 hoặc 2.");
                    break;
            }
        });
    });




    $(document).ready(function () {
        window.reset_table_nhanvien = reset_table_nhanvien;
    });

});


let save_for_nv = 0;

let ma_nv_toancuc = null;

let manv_check;

let imageFile_check_nv;
let tennv_check;
let gioitinhnv_check;
let ngaysinhnv_check;
let emailnv_check;
let sdtnv_check;
let diachinv_check;

// Hàm chọn ảnh
let imagePathnv;

function previewImageNV(event) {
    const input = event.target;
    const imagePreview = document.querySelector('.image-nv');

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result; // Cập nhật src của img với dữ liệu hình ảnh
        }
        reader.readAsDataURL(input.files[0]); // Đọc tệp hình ảnh
    }
}

function capTaiKhoan(manv) {
    console.log(manv);
    $.ajax({
        url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
        type: 'POST',
        data: { manvtaotk: manv },
        dataType: 'json',
        success: function (data) {
            console.log(data.list_tao_taikhoan_nv);
            $.each(data.list_tao_taikhoan_nv, function (index, item) {
                if (item.status === 'success') {
                    alert(item.message);
                    $(document).ready(function () {
                        reset_table_nhanvien();
                    });
                } else {
                    alert(item.message);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error: ", status, error);
            alert("Có lỗi xảy ra khi tạo tài khoản.");
        }
    });
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