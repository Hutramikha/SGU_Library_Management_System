document.addEventListener("DOMContentLoaded", () => {

    /* Các nút hành động */
    const btn_delete = document.querySelector('.btn-delete-taikhoan');
    const btn_edit = document.querySelector('.btn-edit-taikhoan');
    const btn_save = document.querySelector('.btn-save-taikhoan');
    const btn_cancel = document.querySelector('.btn-cancel-taikhoan');
    const btn_reset = document.querySelector('.btn-reset-taikhoan');

    const input_search = document.querySelector('.search-input-taikhoan');

    const input_username_tk = document.querySelector('.input-username_tk');
    const input_password_tk = document.querySelector('.input-password_tk');
    const select_quyen_tk = document.querySelector('.select-quyen_tk');
    const input_ngaytao_tk = document.querySelector('.input-ngaytao_tk');

    function ableInput() {
        // input_username_tk.disabled = false;
        // input_password_tk.disabled = false;
        select_quyen_tk.disabled = false;
        // input_ngaytao_tk.disabled = false;
    }

    function disableInput() {
        // input_username_tk.disabled = true;
        // input_password_tk.disabled = true;
        select_quyen_tk.disabled = true;
        // input_ngaytao_tk.disabled = true;
    }

    function resetInput() {
        input_username_tk.value = '';
        input_password_tk.value = '';
        input_ngaytao_tk.value = '';

        select_quyen_tk.selectedIndex = 0;
    }

    btn_edit.addEventListener('click', () => {
        // btn_add.disabled = true;
        btn_delete.disabled = true;
        btn_save.disabled = false;
        btn_cancel.disabled = false;

        ableInput();
    });

    btn_cancel.addEventListener('click', () => {
        // btn_add.disabled = true;
        btn_delete.disabled = false;
        btn_save.disabled = true;
        btn_cancel.disabled = true;

        resetInput();
        disableInput();
    });

    btn_reset.addEventListener('click', () => {
        input_search.value = '';

        // btn_add.disabled = true;
        btn_edit.disabled = false;
        btn_delete.disabled = false;
        btn_save.disabled = true;
        btn_cancel.disabled = true;

        resetInput();
        disableInput();

        reset_table_taikhoan();
        reset_select_quyen();
    });

    btn_delete.addEventListener('click', () => {

    });

    $(document).ready(function () {
        // Fetch dữ liệu từ server
        $.ajax({
            url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Hiển thị dữ liệu cho danh sách tài khoản độc giả
                $.each(data.list_taikhoan_docgia, function (index, tk_docgia) {
                    let trangThaiHTMLdg;
                    // Kiểm tra trạng thái
                    if (tk_docgia.trangthai == 0) {
                        trangThaiHTMLdg = '<button class="btn-lock" onclick="closetk(\'' + tk_docgia.tendangnhap + '\')">Khóa</button>';
                    } else {
                        trangThaiHTMLdg = '<button class="btn-unlock" onclick="opentk(\'' + tk_docgia.tendangnhap + '\')">Mở khóa</button>';
                    }

                    $('.table-taikhoan_docgia tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + tk_docgia.tendangnhap + '</td>' +
                        '<td>' + tk_docgia.matkhau + '</td>' +
                        '<td>' + tk_docgia.maquyen + '</td>' +
                        '<td>' + tk_docgia.ngaytao + '</td>' +
                        '<td>' + trangThaiHTMLdg + '</td>' +
                        '</tr>'
                    );
                    console.log(tk_docgia.trangthai);
                });

                // Hiển thị dữ liệu cho danh sách tài khoản nhân viên
                $.each(data.list_taikhoan_nhanvien, function (index, tk_nhanvien) {
                    let trangThaiHTMLnv;
                    // Kiểm tra trạng thái
                    if (tk_nhanvien.trangthai == 0) {
                        trangThaiHTMLnv = '<button class="btn-lock" onclick="closetk(\'' + tk_nhanvien.tendangnhap + '\')">Khóa</button>';
                    } else {
                        trangThaiHTMLnv = '<button class="btn-unlock" onclick="opentk(\'' + tk_nhanvien.tendangnhap + '\')">Mở khóa</button>';
                    }

                    $('.table-taikhoan_nhanvien tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + tk_nhanvien.tendangnhap + '</td>' +
                        '<td>' + tk_nhanvien.matkhau + '</td>' +
                        '<td>' + tk_nhanvien.maquyen + '</td>' +
                        '<td>' + tk_nhanvien.ngaytao + '</td>' +
                        '<td>' + trangThaiHTMLnv + '</td>' +
                        '</tr>'
                    );
                });

                // Đổ các option quyền
                $.each(data.list_quyen, function (index, quyen) {
                    $('.select-quyen_tk').append(
                        '<option value=' + '"' + quyen.maquyen + '"' + '>' +
                        quyen.maquyen + '-' + quyen.tenquyen + '</option>'
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error('Lỗi:', error);
            }
        });
    });

    function reset_table_taikhoan() {
        $(document).ready(function () {
            $('.table-taikhoan_docgia tbody').empty();
            $('.table-taikhoan_nhanvien tbody').empty();
            // Fetch dữ liệu từ server
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Hiển thị dữ liệu cho danh sách tài khoản độc giả
                    $.each(data.list_taikhoan_docgia, function (index, tk_docgia) {
                        let trangThaiHTMLdg;
                        // Kiểm tra trạng thái
                        if (tk_docgia.trangthai == 0) {
                            trangThaiHTMLdg = '<button class="btn-lock" onclick="closetk(\'' + tk_docgia.tendangnhap + '\')">Khóa</button>';
                        } else {
                            trangThaiHTMLdg = '<button class="btn-unlock" onclick="opentk(\'' + tk_docgia.tendangnhap + '\')">Mở khóa</button>';
                        }

                        $('.table-taikhoan_docgia tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + tk_docgia.tendangnhap + '</td>' +
                            '<td>' + tk_docgia.matkhau + '</td>' +
                            '<td>' + tk_docgia.maquyen + '</td>' +
                            '<td>' + tk_docgia.ngaytao + '</td>' +
                            '<td>' + trangThaiHTMLdg + '</td>' +
                            '</tr>'
                        );
                        console.log(tk_docgia.trangthai);
                    });

                    // Hiển thị dữ liệu cho danh sách tài khoản nhân viên
                    $.each(data.list_taikhoan_nhanvien, function (index, tk_nhanvien) {
                        let trangThaiHTMLnv;
                        // Kiểm tra trạng thái
                        if (tk_nhanvien.trangthai == 0) {
                            trangThaiHTMLnv = '<button class="btn-lock" onclick="closetk(\'' + tk_nhanvien.tendangnhap + '\')">Khóa</button>';
                        } else {
                            trangThaiHTMLnv = '<button class="btn-unlock" onclick="opentk(\'' + tk_nhanvien.tendangnhap + '\')">Mở khóa</button>';
                        }

                        $('.table-taikhoan_nhanvien tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + tk_nhanvien.tendangnhap + '</td>' +
                            '<td>' + tk_nhanvien.matkhau + '</td>' +
                            '<td>' + tk_nhanvien.maquyen + '</td>' +
                            '<td>' + tk_nhanvien.ngaytao + '</td>' +
                            '<td>' + trangThaiHTMLnv + '</td>' +
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

    function reset_select_quyen() {
        $(document).ready(function () {
            var option0 = $('.select-quyen_tk option[value="-1"]').clone();
            $('.select-quyen_tk').empty();
            // Fetch dữ liệu từ server
            $('.select-quyen_tk').append(option0);
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Đổ các option quyền
                    $.each(data.list_quyen, function (index, quyen) {
                        $('.select-quyen_tk').append(
                            '<option value=' + '"' + quyen.maquyen + '"' + '>' +
                            quyen.maquyen + '-' + quyen.tenquyen + '</option>'
                        );
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    }


    //=========================== Tìm kiếm tài khoản
    $(document).ready(function () {
        // Hàm tìm kiếm tài khoản
        function searchTaiKhoan() {
            const searchQuery = $('.search-input-taikhoan').val(); // Lấy giá trị từ ô input tìm kiếm

            if (searchQuery.trim() === '') {
                $('.table-taikhoan_docgia tbody').empty();
                $('.table-taikhoan_nhanvien tbody').empty();
                $('.table-taikhoan_docgia tbody').append('<tr><td colspan="6">Không tìm thấy tài khoản độc giả nào.</td></tr>');
                $('.table-taikhoan_nhanvien tbody').append('<tr><td colspan="6">Không tìm thấy tài khoản nhân viên nào.</td></tr>');
                return;
            }

            // Gửi yêu cầu AJAX
            $.ajax({
                url: '../DAO/database/fetch_data.php',
                method: 'GET',
                dataType: 'json',
                data: { search_tk: searchQuery },
                success: function (data) {
                    // Xóa kết quả cũ trong bảng
                    $('.table-taikhoan_docgia tbody').empty();
                    $('.table-taikhoan_nhanvien tbody').empty();

                    // Kiểm tra và hiển thị dữ liệu cho danh sách tài khoản độc giả
                    if (data.list_timkiem_tk_docgia.length > 0) {
                        $.each(data.list_timkiem_tk_docgia, function (index, tk_docgia) {
                            let trangThaiHTMLdg = tk_docgia.trangthai == 0
                                ? '<button class="btn-lock" onclick="closetk(\'' + tk_docgia.tendangnhap + '\')">Khóa</button>'
                                : '<button class="btn-unlock" onclick="opentk(\'' + tk_docgia.tendangnhap + '\')">Mở khóa</button>';

                            $('.table-taikhoan_docgia tbody').append(
                                '<tr>' +
                                '<td>' + (index + 1) + '</td>' +
                                '<td>' + tk_docgia.tendangnhap + '</td>' +
                                '<td>' + tk_docgia.matkhau + '</td>' +
                                '<td>' + tk_docgia.maquyen + '</td>' +
                                '<td>' + tk_docgia.ngaytao + '</td>' +
                                '<td>' + trangThaiHTMLdg + '</td>' +
                                '</tr>'
                            );
                        });
                    } else {
                        $('.table-taikhoan_docgia tbody').append('<tr><td colspan="6">Không tìm thấy tài khoản độc giả nào.</td></tr>');
                    }

                    // Kiểm tra và hiển thị dữ liệu cho danh sách tài khoản nhân viên
                    if (data.list_timkiem_tk_nhanvien.length > 0) {
                        $.each(data.list_timkiem_tk_nhanvien, function (index, tk_nhanvien) {
                            let trangThaiHTMLnv = tk_nhanvien.trangthai == 0
                                ? '<button class="btn-lock" onclick="closetk(\'' + tk_nhanvien.tendangnhap + '\')">Khóa</button>'
                                : '<button class="btn-unlock" onclick="opentk(\'' + tk_nhanvien.tendangnhap + '\')">Mở khóa</button>';

                            $('.table-taikhoan_nhanvien tbody').append(
                                '<tr>' +
                                '<td>' + (index + 1) + '</td>' +
                                '<td>' + tk_nhanvien.tendangnhap + '</td>' +
                                '<td>' + tk_nhanvien.matkhau + '</td>' +
                                '<td>' + tk_nhanvien.maquyen + '</td>' +
                                '<td>' + tk_nhanvien.ngaytao + '</td>' +
                                '<td>' + trangThaiHTMLnv + '</td>' +
                                '</tr>'
                            );
                        });
                    } else {
                        $('.table-taikhoan_nhanvien tbody').append('<tr><td colspan="6">Không tìm thấy tài khoản nhân viên nào.</td></tr>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        }

        // Tìm kiếm khi nhấn nút
        $('.btn-search-taikhoan').on('click', function () {
            searchTaiKhoan();
        });

        // Tìm kiếm khi nhấn phím Enter
        $('.search-input-taikhoan').on('keypress', function (e) {
            if (e.which === 13) { // Kiểm tra phím Enter
                searchTaiKhoan();
                return false; // Ngăn chặn hành vi mặc định của Enter
            }
        });
    });


    $(document).ready(function () {
        // Gán sự kiện click cho các dòng của bảng với delegation
        $('.table-taikhoan_docgia tbody').on('click', 'tr', function () {
            // Lấy dữ liệu từ các cột

            const cells = $(this).children('td');

            const tendangnhap_for_input = $(cells[1]).text();
            const matkhau_for_input = $(cells[2]).text();

            tendangnhap_toancuc = tendangnhap_for_input;

            const quyen_for_select = $(cells[3]).text();
            const ngaytao_for_input = $(cells[4]).text();

            maquyen_tk_toancuc = quyen_for_select;

            // Chuyển đổi định dạng ngày nếu cần
            const formattedDate = formatDate(ngaytao_for_input);

            // Đổ dữ liệu vào các input và select
            $('.input-username_tk').val(tendangnhap_for_input);
            $('.input-password_tk').val(matkhau_for_input);
            $('.select-quyen_tk').val(quyen_for_select);
            $('.input-ngaytao_tk').val(formattedDate);
        });

        $('.table-taikhoan_nhanvien tbody').on('click', 'tr', function () {
            // Lấy dữ liệu từ các cột
            const cells = $(this).children('td');

            const tendangnhap_for_input = $(cells[1]).text();
            const matkhau_for_input = $(cells[2]).text();

            tendangnhap_toancuc = tendangnhap_for_input;

            const quyen_for_select = $(cells[3]).text(); // Cột Tên
            const ngaytao_for_input = $(cells[4]).text(); // Cột Giới tính

            maquyen_tk_toancuc = quyen_for_select;
            // Chuyển đổi định dạng ngày nếu cần
            const formattedDate = formatDate(ngaytao_for_input);

            // Đổ dữ liệu vào các input và select
            $('.input-username_tk').val(tendangnhap_for_input);
            $('.input-password_tk').val(matkhau_for_input);
            $('.select-quyen_tk').val(quyen_for_select);
            $('.input-ngaytao_tk').val(formattedDate);
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

    //===== Xóa tài khoản ======>
    $(document).ready(function () {
        $('.btn-delete-taikhoan').on('click', function () {
            if (tendangnhap_toancuc) {
                // Gửi yêu cầu xóa đến server
                const confirmMessage = `Bạn có chắc chắn muốn xóa tài khoản ?`;
                if (!confirm(confirmMessage)) {
                    return; // Nếu người dùng không xác nhận, dừng lại
                }
                $.ajax({
                    url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP xử lý xóa
                    method: 'POST',
                    data: { tendangnhap_xoa: tendangnhap_toancuc }, // Gửi masach
                    dataType: 'json',
                    success: function (data) {
                        $.each(data.list_xoa_taikhoan, function (index, taikhoan) {
                            if (taikhoan.status === "success") {
                                alert(taikhoan.message);
                                resetInput();
                                reset_table_taikhoan();
                            } else {
                                alert(taikhoan.message);
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


    //===== Sửa quyền tài khoản ======>
    $(document).ready(function () {
        $('.btn-save-taikhoan').on('click', function () {
            console.log("Bạn đã chọn sửa quyền tài khoản.");

            // Lấy dữ liệu từ form
            const tendangnhap = tendangnhap_toancuc;
            const maquyentk = $('.select-quyen_tk').val(); // Mã quyền mới

            console.log(maquyen_tk_toancuc);

            // Kiểm tra các ô input không được rỗng
            if (!tendangnhap) {
                alert('Vui lòng nhập tên đăng nhập.');
                return; // Dừng lại nếu ô tên đăng nhập rỗng
            } else if (maquyentk == -1) {
                alert('Vui lòng chọn mã quyền.');
                return; // Dừng lại nếu mã quyền không hợp lệ
            }

            if (maquyentk === maquyen_tk_toancuc) {
                alert('Mã quyền không thay đổi. Vui lòng chọn mã quyền khác.');
                return; // Dừng lại nếu không có sự thay đổi
            }

            const confirmMessage = `Bạn có chắc chắn muốn thay đổi quyền tài khoản ?`;
            if (!confirm(confirmMessage)) {
                return; // Nếu người dùng không xác nhận, dừng lại
            }

            // Tạo FormData để gửi dữ liệu
            const formData = new FormData();
            formData.append('action', 'updateMaQuyentk');
            formData.append('tendangnhap', tendangnhap); // Tên đăng nhập
            formData.append('maquyen', maquyentk); // Mã quyền mới
            
            // Gửi dữ liệu đến máy chủ
            $.ajax({
                url: '../DAO/database/fetch_data.php', // URL đến file PHP xử lý
                type: 'POST',
                data: formData,
                processData: false, // Đặt false để jQuery không xử lý dữ liệu
                contentType: false, // Đặt false để jQuery không tự động thêm header Content-Type
                dataType: 'json', // Chỉ định kiểu dữ liệu là JSON
                success: function (data) {
                    if (data.list_sua_maquyen_tk && data.list_sua_maquyen_tk.length > 0) {
                        $.each(data.list_sua_maquyen_tk, function (index, result) {
                            if (result.status === "success") {
                                alert(result.message);
                                resetInput();
                                reset_table_taikhoan();
                            } else {
                                alert(result.message);
                            }
                        });
                    } else {
                        alert("Có lỗi hoặc không có quyền nào được cập nhật.");
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                    console.log('Phản hồi từ máy chủ:', xhr.responseText); // In ra phản hồi
                }
            });
        });
    });


    // function reset_select_chucnang() {
    //     $(document).ready(function () {
    //         var option0 = $('.select-chucnang_tk option[value="-1"]').clone();
    //         $('.select-chucnang_tk').empty();
    //         // Fetch dữ liệu từ server
    //         $('.select-chucnang_tk').append(option0);
    //         $.ajax({
    //             url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
    //             method: 'GET',
    //             dataType: 'json',
    //             success: function (data) {
    //                 // Đổ các option chức năng
    //                 $.each(data.list_quyen, function (index, chucnang) {
    //                     $('.select-chucnang_tk').append(
    //                             '<option value=' + '"' + chucnang.machucnang + '"' + '>' +
    //                             chucnang.machucnang + '-' + chucnang.tenchucnang + '</option>'
    //                             );
    //                 });
    //             },
    //             error: function (xhr, status, error) {
    //                 console.error('Lỗi:', error);
    //             }
    //         });
    //     });
    // }

    $(document).ready(function () {
        window.reset_select_quyen = reset_select_quyen;
        // window.reset_select_chucnang = reset_select_chucnang;
        window.reset_table_taikhoan = reset_table_taikhoan;
    });

    // Nhớ thêm hàm reset_select_quyen() bên ql quyền

    // $(document).ready(function() {
    //     reset_select_quyen();
    // });  

});

let tendangnhap_toancuc = null;

let maquyen_tk_toancuc = null;


function opentk(tendangnhap) {
    console.log(tendangnhap);
    const confirmMessage = `Bạn có chắc chắn muốn mở khóa ?`;
    if (!confirm(confirmMessage)) {
        return; // Nếu người dùng không xác nhận, dừng lại
    }
    $.ajax({
        type: "POST",
        url: "../DAO/database/fetch_data.php", // Đường dẫn đến file PHP
        data: {
            tendangnhap: tendangnhap,
            trangthai: 0 // Mở khóa
        },
        dataType: 'json',
        success: function (data) {
            $.each(data.list_open_close_taikhoan, function (index, item) {
                if (item.status === 'success') {
                    alert('Mở khóa thành công');
                    $(document).ready(function () {
                        reset_table_taikhoan();
                    });
                } else {
                    alert('Mở khóa thất bại');
                }
            });
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error: ", status, error); // Ghi log thông tin lỗi
            alert("Có lỗi xảy ra khi mở khóa tài khoản.");
        }
    });
}

function closetk(tendangnhap) {
    console.log(tendangnhap);
    const confirmMessage = `Bạn có chắc chắn muốn khóa ?`;
    if (!confirm(confirmMessage)) {
        return; // Nếu người dùng không xác nhận, dừng lại
    }
    $.ajax({
        type: "POST",
        url: "../DAO/database/fetch_data.php", // Đường dẫn đến file PHP
        data: {
            tendangnhap: tendangnhap,
            trangthai: 1 // Khóa
        },
        dataType: 'json',
        success: function (data) {
            $.each(data.list_open_close_taikhoan, function (index, item) {
                if (item.status === 'success') {
                    alert('Khóa thành công');
                    $(document).ready(function () {
                        reset_table_taikhoan();
                    });
                } else {
                    alert('Khóa thất bại');
                }
            });
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error: ", status, error); // Ghi log thông tin lỗi
            alert("Có lỗi xảy ra khi khóa tài khoản.");
        }
    });
}