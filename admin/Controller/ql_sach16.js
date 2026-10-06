document.addEventListener("DOMContentLoaded", () => {

    /* Các nút hành động */
    const btn_add = document.querySelector('.btn-add-sach');
    const btn_delete = document.querySelector('.btn-delete-sach');
    const btn_edit = document.querySelector('.btn-edit-sach');
    const btn_save = document.querySelector('.btn-save-sach');
    const btn_cancel = document.querySelector('.btn-cancel-sach');
    const btn_reset = document.querySelector('.btn-reset-sach');

    const input_search = document.querySelector('.search-input-sach');

    const img = document.querySelector('.image-sach');

    const input_ten_sach = document.querySelector('.input-ten_sach');
    const select_theloai_sach = document.querySelector('.select-theloai_sach');
    const input_tomtat_sach = document.querySelector('.input-tomtat_sach');
    const select_nhaxuatban_sach = document.querySelector('.select-nhaxuatban_sach');
    const select_tacgia_sach = document.querySelector('.select-tacgia_sach');
    const input_phimuon_sach = document.querySelector('.input-phimuon_sach');
    const input_gianhap_sach = document.querySelector('.input-gianhap_sach');
    const input_soluong_sach = document.querySelector('.input-soluong_sach');
    const input_img_sach = document.querySelector('.input-img_sach');
    const select_tinhtrang_sach = document.querySelector('.select-tinhtrang_sach');

    function ableInput() {
        input_ten_sach.disabled = false;
        select_theloai_sach.disabled = false;
        input_tomtat_sach.disabled = false;
        select_nhaxuatban_sach.disabled = false;
        select_tacgia_sach.disabled = false;
        input_phimuon_sach.disabled = false;
        input_gianhap_sach.disabled = false;
        // input_soluong_sach.disabled = false;
        input_img_sach.disabled = false;
        // select_tinhtrang_sach.disabled = false;
    };

    function disavailInput() {
        input_ten_sach.disabled = true;
        select_theloai_sach.disabled = true;
        input_tomtat_sach.disabled = true;
        select_nhaxuatban_sach.disabled = true;
        select_tacgia_sach.disabled = true;
        input_phimuon_sach.disabled = true;
        input_gianhap_sach.disabled = false;
        // input_soluong_sach.disabled = true;
        input_img_sach.disabled = true;
        // select_tinhtrang_sach.disabled = true;
    };

    function resetIMG() {
        img.src = '../img/noimages.png';
    };

    function resetInput() {
        input_ten_sach.value = '';
        input_tomtat_sach.value = '';
        input_phimuon_sach.value = '';
        input_img_sach.value = '';
        input_gianhap_sach.value = '';

        select_theloai_sach.selectedIndex = 0;
        select_nhaxuatban_sach.selectedIndex = 0;
        select_tacgia_sach.selectedIndex = 0;
        // select_tinhtrang_sach.selectedIndex = 0;
    }

    btn_add.addEventListener('click', () => {
        btn_delete.disabled = true;
        btn_edit.disabled = true;
        btn_save.disabled = false;
        btn_cancel.disabled = false;
        resetInput();
        ableInput();

        resetIMG();

        save_for = 1;

    });

    btn_edit.addEventListener('click', () => {
        btn_add.disabled = true;
        btn_delete.disabled = true;
        btn_save.disabled = false;
        btn_cancel.disabled = false;
        ableInput();

        save_for = 2;
    });

    btn_cancel.addEventListener('click', () => {
        img.src = '../img/noimages.png';

        btn_save.disabled = true;
        btn_cancel.disabled = true;

        btn_add.disabled = false;
        btn_edit.disabled = false;
        btn_delete.disabled = false;

        save_for = 0

        resetInput();
        disavailInput();

        reset_select_theloai();
        reset_select_nhaxuatban();
        reset_select_tacgia();
        reset_select_tinhtrangsach_sach();

        currentValue_phimuon = 0;
        currentValue_gianhap = 0;
    });

    btn_reset.addEventListener('click', () => {
        input_search.value = '';

        img.src = '../img/noimages.png';

        btn_save.disabled = true;
        btn_cancel.disabled = true;

        btn_add.disabled = false;
        btn_edit.disabled = false;
        btn_delete.disabled = false;

        save_for = 0

        resetInput();
        disavailInput();
        reset_table_sach();

        reset_select_theloai();
        reset_select_nhaxuatban();
        reset_select_tacgia();
        reset_select_tinhtrangsach_sach();

        currentValue_phimuon = 0;
        currentValue_gianhap = 0;
    });

    $(document).ready(function () {
        // Fetch dữ liệu từ server
        $.ajax({
            url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Hiển thị dữ liệu cho danh sách sách
                $.each(data.list_sach, function (index, sach) {
                    $('.table-sach tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + sach.masach + '</td>' +
                        '<td>' + sach.tensach + '</td>' +
                        '<td>' + sach.tomtat + '</td>' +
                        '<td>' + sach.matl + '</td>' +
                        '<td>' + sach.manxb + '</td>' +
                        '<td>' + sach.matg + '</td>' +
                        '<td>' + sach.soluong + '</td>' +
                        '<td>' + sach.phimuon + '</td>' +
                        '<td>' + sach.gianhap + '</td>' +
                        '</tr>'
                    );
                });

                // Đổ các option thể loại
                $.each(data.list_theloai, function (index, theloai) {
                    $('.select-theloai_sach').append(
                        '<option value=' + '"' + theloai.matl + '"' + '>' +
                        theloai.matl + '-' + theloai.tentl + '</option>'
                    );
                });

                // Đổ các option nhà xuất bản
                $.each(data.list_nhaxuatban, function (index, nhaxuatban) {
                    $('.select-nhaxuatban_sach').append(
                        '<option value=' + '"' + nhaxuatban.manxb + '"' + '>' +
                        nhaxuatban.manxb + '-' + nhaxuatban.tennxb + '</option>'
                    );
                });

                // Đổ các option tác giả
                $.each(data.list_tacgia, function (index, tacgia) {
                    $('.select-tacgia_sach').append(
                        '<option value=' + '"' + tacgia.matg + '"' + '>' +
                        tacgia.matg + '-' + tacgia.tentg + '</option>'
                    );
                });

                // Đổ các option tình trạng sách
                $.each(data.list_tinhtrangsach, function (index, tinhtrangsach) {
                    $('.select-tinhtrang_sach').append(
                        '<option value=' + '"' + tinhtrangsach.matinhtrang + '"' + '>' +
                        tinhtrangsach.motatinhtrang + '</option>'
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error('Lỗi:', error);
            }
        });
    });


    function reset_table_sach() {
        $(document).ready(function () {
            $('.table-sach tbody').empty();
            $('.table-ct-sach tbody').empty();
            // Fetch dữ liệu từ server
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Hiển thị dữ liệu cho danh sách sách
                    $.each(data.list_sach, function (index, sach) {
                        $('.table-sach tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + sach.masach + '</td>' +
                            '<td>' + sach.tensach + '</td>' +
                            '<td>' + sach.tomtat + '</td>' +
                            '<td>' + sach.matl + '</td>' +
                            '<td>' + sach.manxb + '</td>' +
                            '<td>' + sach.matg + '</td>' +
                            '<td>' + sach.soluong + '</td>' +
                            '<td>' + sach.phimuon + '</td>' +
                            '<td>' + sach.gianhap + '</td>' +
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

    // sự kiện click vào bảng sách để xem chi tiết sách và đổ dữ liệu
    $(document).ready(function () {
        $('.table-sach tbody').on('click', 'tr', function () {
            const cells = $(this).children('td');

            const masach_for_input = $(cells[1]).text(); // Cột Mã sách
            console.log(masach_for_input);
            const tensach_for_input = $(cells[2]).text(); // Cột Tên sách
            const tomtat_for_input = $(cells[3]).text(); // Cột Tóm tắt
            const matl_for_select = $(cells[4]).text(); // Cột Mã TL
            const manxb_for_select = $(cells[5]).text(); // Cột Mã NXB
            const matg_for_select = $(cells[6]).text(); // Cột Mã TG
            const soluong_for_input = $(cells[7]).text(); // Cột Số lượng
            const phimuon_for_input = $(cells[8]).text(); // Cột Phí mượn
            const gianhap_for_input = $(cells[9]).text(); // Cột Giá nhập

            masach_check = $(cells[1]).text(); // Cột Mã sách
            tensach_check = $(cells[2]).text(); // Cột Tên sách
            tomtat_check = $(cells[3]).text(); // Cột Tóm tắt
            matl_check = $(cells[4]).text(); // Cột Mã TL
            manxb_check = $(cells[5]).text(); // Cột Mã NXB
            matg_check = $(cells[6]).text(); // Cột Mã TG
            soluong_check = $(cells[7]).text(); // Cột Số lượng
            phimuon_check = $(cells[8]).text(); // Cột Phí mượn
            gianhap_check = $(cells[9]).text(); // Cột Giá nhập


            $('.input-ten_sach').val(tensach_for_input);
            $('.input-tomtat_sach').val(tomtat_for_input);
            $('.select-theloai_sach').val(matl_for_select);
            $('.select-nhaxuatban_sach').val(manxb_for_select);
            $('.select-tacgia_sach').val(matg_for_select);
            $('.input-soluong_sach').val(soluong_for_input);
            $('.input-phimuon_sach').val(phimuon_for_input);
            $('.input-gianhap_sach').val(gianhap_for_input);

            $.ajax({
                url: '../DAO/database/fetch_data.php', // URL đến file PHP xử lý
                type: 'POST',
                data: { masach_timAnh: masach_for_input }, // Gửi mã sách
                dataType: 'json',
                success: function (data) {
                    if (data.list_tim_anh_sach.length > 0) {
                        // Lấy giá trị từ phần tử đầu tiên trong danh sách
                        const img = data.list_tim_anh_sach[0];
                        if (img.status === 'success') {
                            if (img.img !== null) {
                                // Nếu có hình ảnh, cập nhật thẻ img với đường dẫn hình ảnh
                                $('.image-sach').attr('src', '../img/' + img.img);
                                imageFile_check = img.img;
                            } else {
                                // Nếu không có hình ảnh, hiển thị hình ảnh mặc định
                                $('.image-sach').attr('src', '../img/noimages.png'); // Đường dẫn đến hình ảnh mặc định
                                imageFile_check = img.img; // Hoặc có thể không cần lưu giá trị này
                            }
                        }
                    } else {
                        alert("Không có ảnh"); // Thông báo lỗi nếu không có dữ liệu
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });

            var masach = $(this).find('td').eq(1).text(); // Lấy giá trị từ ô <td> thứ hai
            ma_sach_toancuc = masach;
            console.log(masach);
            console.log(ma_sach_toancuc);
            $('.table-ct-sach tbody').empty();
            // Thực hiện truy vấn AJAX để lấy chitietsach với masach
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP xử lý
                method: 'POST',
                data: { masach_xemchitiet: masach },
                dataType: 'json',
                success: function (data) {
                    $.each(data.list_chitiet_sach_xem, function (index, chitietsach_xem) {
                        $('.table-ct-sach tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + chitietsach_xem.mavach + '</td>' +
                            '<td>' + chitietsach_xem.masach + '</td>' +
                            '<td>' + chitietsach_xem.matinhtrang + '</td>' +
                            '<td>' + chitietsach_xem.trangthai + '</td>' +
                            '<td>' + (chitietsach_xem.khu === null ?
                                '<button class="btn-sap-xep" onclick="xuLySapXep(' + chitietsach_xem.mavach + ')">Sắp xếp</button>' :
                                chitietsach_xem.khu) +
                            '</td>' +
                            '<td>' +
                            '<button class="btn-xoa_chitiet_sach" onclick="xoactSach(' + chitietsach_xem.mavach + ')">Xóa</button>' +
                            '</td>' +
                            '</tr>'
                        );
                        console.log(chitietsach_xem.mavach);
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                    alert("Có lỗi xảy ra khi tải chi tiết sách.");
                }
            });
        });
    });

    //===== Xóa sách ======>
    $(document).ready(function () {
        $('.btn-delete-sach').on('click', function () {
            if (ma_sach_toancuc) {
                // Gửi yêu cầu xóa đến server
                const confirmMessage = `Bạn có chắc chắn muốn xóa sách này ?`;
                if (!confirm(confirmMessage)) {
                    return; // Nếu người dùng không xác nhận, dừng lại
                }
                $.ajax({
                    url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP xử lý xóa
                    method: 'POST',
                    data: { masach_xoa: ma_sach_toancuc }, // Gửi masach
                    dataType: 'json',
                    success: function (data) {
                        $.each(data.list_xoa_sach, function (index, masach) {
                            if (masach.status === "success") {
                                alert(masach.message);
                                resetInput();
                                resetIMG();
                                reset_table_sach();
                            } else {
                                alert(masach.message);
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

    function reset_select_theloai() {
        $(document).ready(function () {
            var option0 = $('.select-theloai_sach option[value="0"]').clone();
            $('.select-theloai_sach').empty();
            // Fetch dữ liệu từ server
            $('.select-theloai_sach').append(option0);
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Đổ các option thể loại
                    $.each(data.list_theloai, function (index, theloai) {
                        $('.select-theloai_sach').append(
                            '<option value=' + '"' + theloai.matl + '"' + '>' +
                            theloai.matl + '-' + theloai.tentl + '</option>'
                        );
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    }

    function reset_select_nhaxuatban() {
        $(document).ready(function () {
            var option0 = $('.select-nhaxuatban_sach option[value="0"]').clone();
            $('.select-nhaxuatban_sach').empty();
            // Fetch dữ liệu từ server
            $('.select-nhaxuatban_sach').append(option0);
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Đổ các option nhà xuất bản
                    $.each(data.list_nhaxuatban, function (index, nhaxuatban) {
                        $('.select-nhaxuatban_sach').append(
                            '<option value=' + '"' + nhaxuatban.manxb + '"' + '>' +
                            nhaxuatban.manxb + '-' + nhaxuatban.tennxb + '</option>'
                        );
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    }

    function reset_select_tacgia() {
        $(document).ready(function () {
            var option0 = $('.select-tacgia_sach option[value="0"]').clone();
            $('.select-tacgia_sach').empty();
            // Fetch dữ liệu từ server
            $('.select-tacgia_sach').append(option0);
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Đổ các option tác giả
                    $.each(data.list_tacgia, function (index, tacgia) {
                        $('.select-tacgia_sach').append(
                            '<option value=' + '"' + tacgia.matg + '"' + '>' +
                            tacgia.matg + '-' + tacgia.tentg + '</option>'
                        );
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    }

    function reset_select_tinhtrangsach_sach() {
        $(document).ready(function () {
            var option0 = $('.select-tinhtrang_sach option[value="-1"]').clone();
            $('.select-tinhtrang_sach').empty();
            // Fetch dữ liệu từ server
            $('.select-tinhtrang_sach').append(option0);
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Đổ các option tình trạng sách
                    $.each(data.list_tinhtrangsach, function (index, tinhtrangsach) {
                        $('.select-tinhtrang_sach').append(
                            '<option value=' + '"' + tinhtrangsach.matinhtrang + '"' + '>' +
                            tinhtrangsach.motatinhtrang + '</option>'
                        );
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    }


    // Thực hiện tăng giảm giá trị bằng nút mũi tên
    $(document).ready(function () {
        const incrementValue = 1000;
        const incrementValue_gianhap = 10000;

        // Cập nhật input hiển thị giá trị
        function updateInputPhimuon() {
            $('.input-phimuon_sach').val(currentValue_phimuon);
        }
        function updateInputGianhap() {
            $('.input-gianhap_sach').val(currentValue_gianhap);
        }

        // Sự kiện khi nhấn nút tăng
        $('#increment').on('click', function () {
            currentValue_phimuon += incrementValue;
            updateInputPhimuon();
        });
        $('#incrementGianhap').on('click', function () {
            currentValue_gianhap += incrementValue_gianhap;
            console.log("oke");
            updateInputGianhap();
        });

        // Sự kiện khi nhấn nút giảm
        $('#decrement').on('click', function () {
            if (currentValue_phimuon > 0) { // Đảm bảo không giảm xuống dưới 0
                currentValue_phimuon -= incrementValue;
                updateInputPhimuon();
            }
        });
        $('#decrementGianhap').on('click', function () {
            if (currentValue_gianhap > 0) { // Đảm bảo không giảm xuống dưới 0
                currentValue_gianhap -= incrementValue_gianhap;
                updateInputGianhap();
            }
        });
    });

    //======================================Tìm kiếm sách
    $(document).ready(function () {
        // Hàm tìm kiếm
        function searchBooks() {
            const searchQuery = $('.search-input-sach').val();

            if (searchQuery.trim() === '') {
                $('.table-sach tbody').empty();
                $('.table-sach tbody').append('<tr><td colspan="10">Không tìm thấy sách nào.</td></tr>');
                return;
            }

            $.ajax({
                url: '../DAO/database/fetch_data.php', // Tập tin PHP xử lý tìm kiếm
                method: 'GET',
                dataType: 'json', // Định dạng dữ liệu trả về là JSON
                data: { search_sach: searchQuery },
                success: function (data) {
                    $('.table-sach tbody').empty(); // Xóa kết quả cũ
                    if (data.list_timkiem_sach.length > 0) {
                        $.each(data.list_timkiem_sach, function (index, sach) {
                            $('.table-sach tbody').append(
                                '<tr>' +
                                '<td>' + (index + 1) + '</td>' +
                                '<td>' + sach.masach + '</td>' +
                                '<td>' + sach.tensach + '</td>' +
                                '<td>' + sach.tomtat + '</td>' +
                                '<td>' + sach.matl + '</td>' +
                                '<td>' + sach.manxb + '</td>' +
                                '<td>' + sach.matg + '</td>' +
                                '<td>' + sach.soluong + '</td>' +
                                '<td>' + sach.phimuon + '</td>' +
                                '<td>' + sach.gianhap + '</td>' +
                                '</tr>'
                            );
                        });
                    } else {
                        $('.table-sach tbody').append('<tr><td colspan="10">Không tìm thấy sách nào.</td></tr>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        }

        // Tìm kiếm khi nhấn nút
        $('.btn-search-sach').on('click', function () {
            console.log("btn");
            searchBooks();
        });

        // Tìm kiếm khi nhấn phím Enter
        $('.search-input-sach').on('keypress', function (e) {
            if (e.which === 13) { // Kiểm tra phím Enter
                console.log("enter");
                searchBooks();
                return false; // Ngăn chặn hành vi mặc định của Enter
            }
        });
    });


    // Chức năng thêm và sửa
    $(document).ready(function () {
        $('.btn-save-sach').click(function () {

            switch (save_for) {
                case 1:
                    console.log("Bạn đã chọn trường hợp 1.");
                    $(document).ready(function () {

                        // Kiểm tra các ô input cụ thể
                        const tenSach = $('.input-ten_sach').val();
                        const theLoai = $('.select-theloai_sach').val();
                        const giaNhap = $('.input-gianhap_sach').val();
                        const tomTat = $('.input-tomtat_sach').val();
                        const nhaXuatBan = $('.select-nhaxuatban_sach').val();
                        const tacGia = $('.select-tacgia_sach').val();
                        const phiMuon = $('.input-phimuon_sach').val();
                        const imageFile = $('.input-img_sach')[0].files[0]; // Lấy tệp hình ảnh

                        let imageName = null;
                        if (imageFile) {
                            imageName = imageFile.name; // Lấy tên tệp hình ảnh
                            console.log(imageName); // In ra tên tệp hình ảnh
                        } else {
                            console.log("Không có tệp hình ảnh nào được chọn.");
                        }

                        let isValid = true;

                        // Kiểm tra nếu các ô input không rỗng
                        if (!tenSach) {
                            alert('Vui lòng nhập tên sách.');
                            isValid = false;
                        } else if (parseInt(theLoai) <= 0) { // Kiểm tra thể loại
                            alert('Vui lòng chọn thể loại hợp lệ.');
                            isValid = false;
                        } else if (!giaNhap || isNaN(giaNhap)) { // Kiểm tra giá nhập
                            alert('Giá nhập phải là một số hợp lệ.');
                            isValid = false;
                        } else if (!tomTat) {
                            alert('Vui lòng nhập tóm tắt.');
                            isValid = false;
                        } else if (parseInt(nhaXuatBan) <= 0) { // Kiểm tra nhà xuất bản
                            alert('Vui lòng chọn nhà xuất bản hợp lệ.');
                            isValid = false;
                        } else if (parseInt(tacGia) <= 0) { // Kiểm tra tác giả
                            alert('Vui lòng chọn tác giả hợp lệ.');
                            isValid = false;
                        } else if (!phiMuon || isNaN(phiMuon)) { // Kiểm tra phí mượn
                            alert('Phí mượn phải là một số hợp lệ.');
                            isValid = false;
                        } else if (!imageFile) { // Kiểm tra file hình ảnh
                            alert('Vui lòng chọn hình ảnh.');
                            isValid = false;
                        }

                        if (!isValid) {
                            return; // Dừng lại nếu không hợp lệ
                        }

                        const confirmMessage = `Bạn có chắc chắn muốn thêm sách ?`;
                        if (!confirm(confirmMessage)) {
                            return; // Nếu người dùng không xác nhận, dừng lại
                        }

                        // Tạo FormData để gửi dữ liệu
                        const formData = new FormData();
                        formData.append('action', 'addSach');
                        formData.append('tensach', $('.input-ten_sach').val());
                        formData.append('matl', $('.select-theloai_sach').val());
                        formData.append('gianhap', $('.input-gianhap_sach').val());
                        formData.append('tomtat', $('.input-tomtat_sach').val());
                        formData.append('manxb', $('.select-nhaxuatban_sach').val());
                        formData.append('matg', $('.select-tacgia_sach').val());
                        formData.append('phimuon', $('.input-phimuon_sach').val());
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
                                if (data.list_them_sach && data.list_them_sach.length > 0) {
                                    $.each(data.list_them_sach, function (index, sach) {
                                        if (sach.status === "success") {
                                            alert(sach.message);
                                            resetIMG();
                                            resetInput();
                                            reset_table_sach();
                                            currentValue_phimuon = 0;
                                            currentValue_gianhap = 0;
                                        } else {
                                            alert(sach.message);
                                        }
                                    });
                                } else {
                                    alert("Có lỗi hoặc không có sách nào được thêm.");
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

                        // Lấy dữ liệu từ form
                        const tensach = $('.input-ten_sach').val();
                        const theLoai = $('.select-theloai_sach').val();
                        const giaNhap = $('.input-gianhap_sach').val();
                        const tomTat = $('.input-tomtat_sach').val();
                        const nhaXuatBan = $('.select-nhaxuatban_sach').val();
                        const tacGia = $('.select-tacgia_sach').val();
                        const phiMuon = $('.input-phimuon_sach').val();
                        const imageFile = $('.input-img_sach')[0].files[0]; // Lấy tệp hình ảnh

                        let isChanged = false;

                        // Kiểm tra xem có thay đổi hay không
                        if (tensach !== tensach_check) isChanged = true;
                        if (theLoai !== matl_check) isChanged = true;
                        if (giaNhap !== gianhap_check) isChanged = true;
                        if (tomTat !== tomtat_check) isChanged = true;
                        if (nhaXuatBan !== manxb_check) isChanged = true;
                        if (tacGia !== matg_check) isChanged = true;
                        if (phiMuon !== phimuon_check) isChanged = true;
                        if (imageFile && imageFile.name !== imageFile_check) isChanged = true;

                        if (!isChanged) {
                            alert("Không có thay đổi nào để cập nhật.");
                            return; // Dừng lại nếu không có thay đổi
                        }

                        // Kiểm tra các ô input không được rỗng
                        if (!tensach) {
                            alert('Vui lòng nhập tên sách.');
                            return; // Dừng lại nếu ô tên sách rỗng
                        } else if (!theLoai || parseInt(theLoai) <= 0) {
                            alert('Vui lòng chọn thể loại hợp lệ.');
                            return; // Dừng lại nếu thể loại không hợp lệ
                        } else if (!giaNhap || isNaN(giaNhap)) {
                            alert('Giá nhập phải là một số hợp lệ.');
                            return; // Dừng lại nếu giá nhập không hợp lệ
                        } else if (!tomTat) {
                            alert('Vui lòng nhập tóm tắt.');
                            return; // Dừng lại nếu ô tóm tắt rỗng
                        } else if (!nhaXuatBan || parseInt(nhaXuatBan) <= 0) {
                            alert('Vui lòng chọn nhà xuất bản hợp lệ.');
                            return; // Dừng lại nếu nhà xuất bản không hợp lệ
                        } else if (!tacGia || parseInt(tacGia) <= 0) {
                            alert('Vui lòng chọn tác giả hợp lệ.');
                            return; // Dừng lại nếu tác giả không hợp lệ
                        } else if (!phiMuon || isNaN(phiMuon)) {
                            alert('Phí mượn phải là một số hợp lệ.');
                            return; // Dừng lại nếu phí mượn không hợp lệ
                        }

                        const confirmMessage = `Bạn có chắc chắn muốn sửa sách ?`;
                        if (!confirm(confirmMessage)) {
                            return; // Nếu người dùng không xác nhận, dừng lại
                        }

                        // Tạo FormData để gửi dữ liệu
                        const formData = new FormData();
                        formData.append('action', 'updateSach');
                        formData.append('masach', masach_check); // Mã sách cần sửa
                        formData.append('tensach', tensach);
                        formData.append('matl', theLoai);
                        formData.append('gianhap', giaNhap);
                        formData.append('tomtat', tomTat);
                        formData.append('manxb', nhaXuatBan);
                        formData.append('matg', tacGia);
                        formData.append('phimuon', phiMuon);
                        formData.append('soluong', soluong_check); // Giữ nguyên số lượng cũ, nếu không cần sửa
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
                                if (data.list_sua_sach && data.list_sua_sach.length > 0) {
                                    $.each(data.list_sua_sach, function (index, sach) {
                                        if (sach.status === "success") {
                                            alert(sach.message);
                                            resetIMG();
                                            resetInput();
                                            reset_table_sach();
                                            currentValue_phimuon = 0;
                                            currentValue_gianhap = 0;
                                        } else {
                                            alert(sach.message);
                                        }
                                    });
                                } else {
                                    alert("Có lỗi hoặc không có sách nào được cập nhật.");
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
        window.reset_table_sach = reset_table_sach;
        window.reset_select_theloai = reset_select_theloai;
        window.reset_select_nhaxuatban = reset_select_nhaxuatban;
        window.reset_select_tacgia = reset_select_tacgia;
        window.reset_select_tinhtrangsach_sach = reset_select_tinhtrangsach_sach;
    });

    // Nhớ thêm hàm reset_select_nhacc() bên nhà cc

    // $(document).ready(function() {
    //     reset_select_nhacc();
    // }); 

});




let save_for = 0;

let masach_check;
let tensach_check;
let tomtat_check;
let matl_check;
let manxb_check;
let matg_check;
let soluong_check;
let phimuon_check;
let gianhap_check;
let imageFile_check;

console.log(masach_check);

let currentValue_phimuon = 0;
let currentValue_gianhap = 0;

let ma_sach_toancuc = null;

function reset_table_ct_sach(ma_sach_toancuc, event) {
    $('.table-ct-sach tbody').empty();
    $.ajax({
        url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP xử lý
        method: 'POST',
        data: { masach_xemchitiet: ma_sach_toancuc },
        dataType: 'json',
        success: function (data) {
            $.each(data.list_chitiet_sach_xem, function (index, chitietsach_xem) {
                $('.table-ct-sach tbody').append(
                    '<tr>' +
                    '<td>' + (index + 1) + '</td>' +
                    '<td>' + chitietsach_xem.mavach + '</td>' +
                    '<td>' + chitietsach_xem.masach + '</td>' +
                    '<td>' + chitietsach_xem.matinhtrang + '</td>' +
                    '<td>' + chitietsach_xem.trangthai + '</td>' +
                    '<td>' + (chitietsach_xem.khu === null ?
                        '<button class="btn-sap-xep" onclick="xuLySapXep(' + chitietsach_xem.mavach + ')">Sắp xếp</button>' :
                        chitietsach_xem.khu) +
                    '</td>' +
                    '<td>' +
                    '<button class="btn-xoa_chitiet_sach" onclick="xoactSach(' + chitietsach_xem.mavach + ')">Xóa</button>' +
                    '</td>' +
                    '</tr>'
                );
                console.log(chitietsach_xem.mavach);
            });
        },
        error: function (xhr, status, error) {
            console.error('Lỗi:', error);
        }
    });
}

// Hàm xóa chi tiết sách
function xoactSach(mavach) {
    // Gửi yêu cầu xóa chi tiết sách đến server
    const confirmMessage = `Bạn có chắc chắn muốn xóa chi tiết sách ?`;
    if (!confirm(confirmMessage)) {
        return; // Nếu người dùng không xác nhận, dừng lại
    }
    $.ajax({
        url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
        method: 'POST',
        data: { mavach_xoa: mavach },
        dataType: 'json', // Thiết lập loại dữ liệu trả về
        success: function (data) {
            $.each(data.list_xoa_ct_sach, function (index, ctSach) {
                if (ctSach.status === "success") {
                    alert(ctSach.message);
                    reset_table_sach2();
                    reset_table_ct_sach(ma_sach_toancuc);
                }
                else {
                    alert(ctSach.message);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('Lỗi:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
            console.log(xhr);
        }
    });
}

// Hàm sắp xếp chi tiết sách
function xuLySapXep(mavach) {
    // Xử lý sắp xếp sách, có thể thực hiện AJAX hoặc xử lý khác
    console.log("Xử lý sắp xếp cho mã vạch: " + mavach);
}

// Hàm chọn ảnh
let imagePathSach;

function previewImageSach(event) {
    const input = event.target;
    const imagePreview = document.querySelector('.image-sach');

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result; // Cập nhật src của img với dữ liệu hình ảnh
        }
        reader.readAsDataURL(input.files[0]); // Đọc tệp hình ảnh
    }
}

function reset_table_sach2() {
    $(document).ready(function () {
        $('.table-sach tbody').empty();
        $('.table-ct-sach tbody').empty();
        // Fetch dữ liệu từ server
        $.ajax({
            url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Hiển thị dữ liệu cho danh sách sách
                $.each(data.list_sach, function (index, sach) {
                    $('.table-sach tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + sach.masach + '</td>' +
                        '<td>' + sach.tensach + '</td>' +
                        '<td>' + sach.tomtat + '</td>' +
                        '<td>' + sach.matl + '</td>' +
                        '<td>' + sach.manxb + '</td>' +
                        '<td>' + sach.matg + '</td>' +
                        '<td>' + sach.soluong + '</td>' +
                        '<td>' + sach.phimuon + '</td>' +
                        '<td>' + sach.gianhap + '</td>' +
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
