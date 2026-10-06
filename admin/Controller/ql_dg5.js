document.addEventListener("DOMContentLoaded", () => {

    /* Các nút hành động */
    // const btn_add = document.querySelector('.btn-add-dg');
    const btn_delete = document.querySelector('.btn-delete-dg');
    const btn_edit = document.querySelector('.btn-edit-dg');
    const btn_save = document.querySelector('.btn-save-dg');
    const btn_cancel = document.querySelector('.btn-cancel-dg');
    const btn_reset = document.querySelector('.btn-reset-dg');

    const input_search = document.querySelector('.search-input-dg');

    const img = document.querySelector('.image-dg');

    const input_ten_dg = document.querySelector('.input-ten_dg');
    const select_gioitinh_dg = document.querySelector('.select-gioitinh_dg');
    const select_loai_dg = document.querySelector('.select-loai_dg');
    const input_ngaysinh_dg = document.querySelector('.input-ngaysinh_dg');
    const input_email_dg = document.querySelector('.input-email_dg');
    const input_sdt_dg = document.querySelector('.input-sdt_dg');
    const input_diachi_dg = document.querySelector('.input-diachi_dg');

    function ableInput() {
        select_loai_dg.disabled = false;
    }

    function disableInput() {
        select_loai_dg.disabled = true;
    }

    function resetIMG() {
        img.src = '../img/noimages.png';
    };

    function resetInput() {
        input_ten_dg.value = '';
        input_ngaysinh_dg.value = '';
        input_email_dg.value = '';
        input_sdt_dg.value = '';
        input_diachi_dg.value = '';

        select_gioitinh_dg.selectedIndex = 0;
        select_loai_dg.selectedIndex = 0;
    }

    // btn_add.addEventListener('click', () => {
    //     btn_delete.disabled = true;
    //     btn_edit.disabled = true;
    //     btn_save.disabled = false;
    //     btn_cancel.disabled = false;  
    // });

    btn_edit.addEventListener('click', () => {
        // btn_add.disabled = true;
        btn_delete.disabled = true;
        btn_save.disabled = false;
        btn_cancel.disabled = false;

        ableInput();
    });

    btn_delete.addEventListener('click', () => {

    });

    btn_cancel.addEventListener('click', () => {
        img.src = '../img/noimages.png';

        // btn_add.disabled = true;
        btn_delete.disabled = false;
        btn_edit.disabled = false;
        btn_save.disabled = true;
        btn_cancel.disabled = true;

        resetInput();
        disableInput();
    });

    btn_reset.addEventListener('click', () => {
        input_search.value = '';

        img.src = '../img/noimages.png';

        // btn_add.disabled = true;
        btn_delete.disabled = false;
        btn_edit.disabled = false;
        btn_save.disabled = true;
        btn_cancel.disabled = true;

        resetInput();
        disableInput();

        reset_table_docgia();
        reset_select_loaidocgia();
    });


    // FETCH DATA=========================================
    $(document).ready(function () {
        // Fetch dữ liệu từ server
        $.ajax({
            url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Hiển thị dữ liệu cho danh sách độc giả
                $.each(data.list_docgia, function (index, docgia) {
                    $('.table-docgia tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + docgia.madg + '</td>' +
                        '<td>' + docgia.matk + '</td>' +
                        '<td>' + docgia.ten + '</td>' +
                        '<td>' + docgia.gioitinh + '</td>' +
                        '<td>' + docgia.maloaidocgia + '-' + docgia.tenloaidocgia + '</td>' +
                        '<td>' + docgia.ngaysinh + '</td>' +
                        '<td>' + docgia.email + '</td>' +
                        '<td>' + docgia.sdt + '</td>' +
                        '<td>' + docgia.diachi + '</td>' +
                        '</tr>'
                    );
                });

                // Đổ các option loại độc giả
                $.each(data.list_loaidocgia, function (index, loaidocgia) {
                    $('.select-loai_dg').append(
                        '<option value=' + '"' + loaidocgia.maloaidocgia + '"' + '>' +
                        loaidocgia.tenloaidocgia + '-' + loaidocgia.soluongsachtoida + ' quyển' + '</option>'
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error('Lỗi:', error);
            }
        });
    });

    function reset_table_docgia() {
        $(document).ready(function () {
            $('.table-docgia tbody').empty();
            // Fetch dữ liệu từ server
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Hiển thị dữ liệu cho danh sách độc giả
                    $.each(data.list_docgia, function (index, docgia) {
                        $('.table-docgia tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + docgia.madg + '</td>' +
                            '<td>' + docgia.matk + '</td>' +
                            '<td>' + docgia.ten + '</td>' +
                            '<td>' + docgia.gioitinh + '</td>' +
                            '<td>' + docgia.maloaidocgia + '-' + docgia.tenloaidocgia + '</td>' +
                            '<td>' + docgia.ngaysinh + '</td>' +
                            '<td>' + docgia.email + '</td>' +
                            '<td>' + docgia.sdt + '</td>' +
                            '<td>' + docgia.diachi + '</td>' +
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

    function reset_select_loaidocgia() {
        $(document).ready(function () {
            var option0 = $('.select-loai_dg option[value="0"]').clone();
            $('.select-loai_dg').empty();
            // Fetch dữ liệu từ server
            $('.select-loai_dg').append(option0);
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Đổ các option loại độc giả
                    $.each(data.list_loaidocgia, function (index, loaidocgia) {
                        $('.select-loai_dg').append(
                            '<option value=' + '"' + loaidocgia.maloaidocgia + '"' + '>' +
                            loaidocgia.tenloaidocgia + '-' + loaidocgia.soluongsachtoida + ' quyển' + '</option>'
                        );
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    }

    //======================================Tìm kiếm độc giả
    $(document).ready(function () {
        // Hàm tìm kiếm độc giả
        function searchReaders() {
            const searchQuery = $('.search-input-dg').val();

            if (searchQuery.trim() === '') {
                $('.table-docgia tbody').empty(); // Nếu không có từ khóa, xóa kết quả
                $('.table-docgia tbody').append('<tr><td colspan="10">Không tìm thấy độc giả nào.</td></tr>');
                return;
            }

            $.ajax({
                url: '../DAO/database/fetch_data.php', // Tập tin PHP xử lý tìm kiếm
                method: 'GET',
                dataType: 'json', // Định dạng dữ liệu trả về là JSON
                data: { search_docgia: searchQuery },
                success: function (data) {
                    $('.table-docgia tbody').empty(); // Xóa kết quả cũ
                    if (data.list_timkiem_docgia.length > 0) {
                        $.each(data.list_timkiem_docgia, function (index, docgia) {
                            $('.table-docgia tbody').append(
                                '<tr>' +
                                '<td>' + (index + 1) + '</td>' +
                                '<td>' + docgia.madg + '</td>' +
                                '<td>' + docgia.matk + '</td>' +
                                '<td>' + docgia.ten + '</td>' +
                                '<td>' + docgia.gioitinh + '</td>' +
                                '<td>' + docgia.maloaidocgia + '-' + docgia.tenloaidocgia + '</td>' +
                                '<td>' + docgia.ngaysinh + '</td>' +
                                '<td>' + docgia.email + '</td>' +
                                '<td>' + docgia.sdt + '</td>' +
                                '<td>' + docgia.diachi + '</td>' +
                                '</tr>'
                            );
                        });
                    } else {
                        $('.table-docgia tbody').append('<tr><td colspan="10">Không tìm thấy độc giả nào.</td></tr>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        }

        // Tìm kiếm khi nhấn nút
        $('.btn-search-dg').on('click', function () {
            searchReaders();
        });

        // Tìm kiếm khi nhấn phím Enter
        $('.search-input-dg').on('keypress', function (e) {
            if (e.which === 13) { // Kiểm tra phím Enter
                searchReaders();
                return false; // Ngăn chặn hành vi mặc định của Enter
            }
        });
    });


    $(document).ready(function () {
        // Gán sự kiện click cho từng dòng
        $('.table-docgia tbody').on('click', 'tr', function () {
            // Lấy dữ liệu từ các cột
            const cells = $(this).children('td');

            const madg_for_input = $(cells[1]).text(); // Cột Mã ĐG
            const matk_for_input = $(cells[2]).text(); // Cột Mã TK

            const ten_for_input = $(cells[3]).text(); // Cột Tên
            const gioitinh_for_select = $(cells[4]).text(); // Cột Giới tính
            const loaidocgia_for_select = $(cells[5]).text().split('-')[0]; // Cột Loại ĐG
            const ngaysinh_for_input = $(cells[6]).text(); // Cột Ngày sinh
            const email_for_input = $(cells[7]).text(); // Cột Email
            const sdt_for_input = $(cells[8]).text(); // Cột SĐT
            const diachi_for_input = $(cells[9]).text(); // Cột Địa chỉ

            // Chuyển đổi định dạng ngày nếu cần
            const formattedDate = formatDate(ngaysinh_for_input);

            ma_dg_toancuc = madg_for_input;

            // Đổ dữ liệu vào các input và select
            $('.input-ten_dg').val(ten_for_input);
            $('.select-gioitinh_dg').val(gioitinh_for_select);
            $('.select-loai_dg').val(loaidocgia_for_select); // Chọn loại độc giả
            $('.input-ngaysinh_dg').val(formattedDate);
            $('.input-email_dg').val(email_for_input);
            $('.input-sdt_dg').val(sdt_for_input);
            $('.input-diachi_dg').val(diachi_for_input);
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


    //===== Xóa độc giả ======>
    $(document).ready(function () {
        $('.btn-delete-dg').on('click', function () {
            if (ma_dg_toancuc) {
                // Gửi yêu cầu xóa đến server
                const confirmMessage = `Bạn có chắc chắn muốn xóa độc giả ?`;
                if (!confirm(confirmMessage)) {
                    return; // Nếu người dùng không xác nhận, dừng lại
                }
                $.ajax({
                    url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP xử lý xóa
                    method: 'POST',
                    data: { madg_xoa: ma_dg_toancuc }, // Gửi masach
                    dataType: 'json',
                    success: function (data) {
                        $.each(data.list_xoa_docgia, function (index, madg) {
                            if (madg.status === "success") {
                                alert(madg.message);
                                resetInput();
                                resetIMG();
                                reset_table_docgia();
                            } else {
                                alert(madg.message);
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


    //===== Sửa loại độc giả ======>
    $(document).ready(function () {
        $('.btn-save-dg').on('click', function () {
            console.log("Bạn đã chọn sửa loại độc giả.");

            // Lấy dữ liệu từ form
            const madg = ma_dg_toancuc;
            const maloaidocgia = $('.select-loai_dg').val(); // Mã loại độc giả mới

            if (maloaidocgia == 0) {
                alert('Vui lòng chọn loại độc giả.');
                return; // Dừng lại nếu loại độc giả không hợp lệ
            }

            const confirmMessage = `Bạn có chắc chắn muốn sửa loại độc giả ?`;
            if (!confirm(confirmMessage)) {
                return; // Nếu người dùng không xác nhận, dừng lại
            }

            // Tạo FormData để gửi dữ liệu
            const formData = new FormData();
            formData.append('action', 'updateLoaiDocGia');
            formData.append('madg', madg); // Mã độc giả cần sửa
            formData.append('maloaidocgia', maloaidocgia); // Mã loại độc giả mới

            // Gửi dữ liệu đến máy chủ
            $.ajax({
                url: '../DAO/database/fetch_data.php', // URL đến file PHP xử lý
                type: 'POST',
                data: formData,
                processData: false, // Đặt false để jQuery không xử lý dữ liệu
                contentType: false, // Đặt false để jQuery không tự động thêm header Content-Type
                dataType: 'json', // Chỉ định kiểu dữ liệu là JSON
                success: function (data) {
                    if (data.list_sua_loaidocgia && data.list_sua_loaidocgia.length > 0) {
                        $.each(data.list_sua_loaidocgia, function (index, result) {
                            if (result.status === "success") {
                                alert(result.message);
                                resetInput();
                                resetIMG();
                                reset_table_docgia();
                            } else {
                                alert(result.message);
                            }
                        });
                    } else {
                        alert("Có lỗi hoặc không có loại độc giả nào được cập nhật.");
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                    console.log('Phản hồi từ máy chủ:', xhr.responseText); // In ra phản hồi
                }
            });
        });
    });


    $(document).ready(function () {
        window.reset_select_loaidocgia = reset_select_loaidocgia; // Gán hàm vào window
    });

});

let ma_dg_toancuc = null;