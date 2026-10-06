
document.addEventListener("DOMContentLoaded", () => {

    /* Các nút hành động */
    const btn_start_add_ct = document.querySelector('.btn-start-ct-phieu_nhap');
    const btn_save_ct = document.querySelector('.btn-save-ct-phieu_nhap');
    const btn_cancel = document.querySelector('.btn-cancel-ct-phieu_nhap');
    const btn_reset = document.querySelector('.btn-reset-phieu_nhap');
    const btn_edit_ct = document.querySelector('.btn-edit-ct-phieu_nhap');

    const btn_add_pn = document.querySelector('.btn-create-pn');

    const input_search = document.querySelector('.search-input-phieu_nhap');

    const select_ten_sach_pn = document.querySelector('.select-ten_sach_pn');
    const input_soluong_sach_pn = document.querySelector('.input-soluong_sach_pn');
    const input_gianhap_sach_pn = document.querySelector('.input-gianhap_sach_pn');
    const input_thanhtien_sach_pn = document.querySelector('.input-thanhtien_sach_pn');

    const select_ncc_sach_pn = document.querySelector('.select-ncc_sach_pn');

    const table_ct_phieu_nhap_xem = document.querySelector('.table-ct-phieu_nhap-xem');
    const table_ct_phieu_nhap = document.querySelector('.table-ct-phieu_nhap');

    function ableInput() {
        select_ten_sach_pn.disabled = false;
        input_soluong_sach_pn.disabled = false;
        // input_gianhap_sach_pn.disabled = false;
        // input_thanhtien_sach_pn.disabled = false;
        select_ncc_sach_pn.disabled = false;
    }

    function disableInput() {
        select_ten_sach_pn.disabled = true;
        input_soluong_sach_pn.disabled = true;
        // input_gianhap_sach_pn.disabled = true;
        // input_thanhtien_sach_pn.disabled = true;
        select_ncc_sach_pn.disabled = true;
    }

    function resetInput() {
        input_soluong_sach_pn.value = '';
        input_gianhap_sach_pn.value = '';
        input_thanhtien_sach_pn.value = '';

        select_ten_sach_pn.selectedIndex = 0;
        select_ncc_sach_pn.selectedIndex = 0;
    }

    btn_edit_ct.addEventListener('click', () => {
        btn_start_add_ct.disabled = true;
        btn_save_ct.disabled = false;
        btn_cancel.disabled = false;

        btn_add_pn.disabled = false;

        table_ct_phieu_nhap_xem.style.display = 'none';
        table_ct_phieu_nhap.style.display = 'table';

        save_for_ct_pn = 2;

        ableInput();
        select_ten_sach_pn.disabled = true;
    });

    btn_start_add_ct.addEventListener('click', () => {
        btn_save_ct.disabled = false;
        btn_cancel.disabled = false;
        btn_edit_ct.disabled = true;

        btn_add_pn.disabled = false;

        save_for_ct_pn = 1;

        table_ct_phieu_nhap_xem.style.display = 'none';
        table_ct_phieu_nhap.style.display = 'table';

        ableInput();
        resetInput();
    });

    btn_cancel.addEventListener('click', () => {
        btn_start_add_ct.disabled = false;
        btn_save_ct.disabled = true;
        btn_cancel.disabled = true;
        btn_edit_ct.disabled = false;

        btn_add_pn.disabled = true;

        // table_ct_phieu_nhap_xem.style.display = 'table';
        // table_ct_phieu_nhap.style.display = 'none';

        resetInput();
        disableInput();
        reset_select_nhacc();
        reset_select_sach_pn();

        currentValue_soluong = 0;
    });

    btn_reset.addEventListener('click', () => {
        btn_start_add_ct.disabled = false;
        btn_save_ct.disabled = true;
        btn_cancel.disabled = true;
        btn_edit_ct.disabled = false;

        btn_add_pn.disabled = true;

        input_search.value = '';

        table_ct_phieu_nhap_xem.style.display = 'table';
        table_ct_phieu_nhap.style.display = 'none';

        resetInput();
        disableInput();
        reset_table_phieu_nhap();
        reset_select_nhacc();
        reset_select_sach_pn();

        currentValue_soluong = 0;

        selectedProducts = [];
        $('.table-ct-phieu_nhap tbody').empty();
    });

    $(document).ready(function () {
        // Fetch dữ liệu từ server
        $.ajax({
            url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Hiển thị dữ liệu cho danh sách phiếu nhập
                $.each(data.list_phieunhap, function (index, phieunhap) {
                    $('.table-phieu_nhap tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + phieunhap.mapn + '</td>' +
                        '<td>' + phieunhap.mancc + '-' + phieunhap.ten + '</td>' +
                        '<td>' + phieunhap.manv + '</td>' +
                        '<td>' + phieunhap.ngaynhap + '</td>' +
                        '<td>' + phieunhap.tongtien + '</td>' +
                        '</tr>'
                    );
                });

                // Đổ các option nhà cung cấp
                $.each(data.list_nhacungcap, function (index, nhacc) {
                    $('.select-ncc_sach_pn').append(
                        '<option value=' + '"' + nhacc.mancc + '"' + '>' +
                        nhacc.ten + '</option>'
                    );
                });

                // Đổ các option sách
                $.each(data.list_sach, function (index, sach) {
                    $('.select-ten_sach_pn').append(
                        '<option value=' + '"' + sach.masach + '"' + '>' +
                        sach.masach + '-' + sach.tensach + '</option>'
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error('Lỗi:', error);
            }
        });
    });

    // sự kiện click vào bảng sách để xem chi tiết phiêu nhập
    $(document).ready(function () {
        $('.table-phieu_nhap tbody').on('click', 'tr', function () {
            var maphieunhap = $(this).find('td').eq(1).text(); // Lấy giá trị từ ô <td> thứ hai
            console.log(maphieunhap);
            $('.table-ct-phieu_nhap-xem tbody').empty();
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP xử lý
                method: 'POST',
                data: { ma_phieu_nhap: maphieunhap },
                dataType: 'json',
                success: function (data) {
                    $.each(data.list_chitiet_phieu_nhap_xem, function (index, chitietphieunhap_xem) {
                        $('.table-ct-phieu_nhap-xem tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + chitietphieunhap_xem.mapn + '</td>' +
                            '<td>' + chitietphieunhap_xem.masach + '</td>' +
                            '<td>' + chitietphieunhap_xem.gianhap + '</td>' +
                            '<td>' + chitietphieunhap_xem.soluong + '</td>' +
                            '<td>' + chitietphieunhap_xem.thanhtien + '</td>' +
                            '</tr>'
                        );
                        console.log(chitietphieunhap_xem.mapn);
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    });

    function reset_table_phieu_nhap() {
        $(document).ready(function () {
            $('.table-ct-phieu_nhap-xem tbody').empty();
            $('.table-phieu_nhap tbody').empty();
            // Fetch dữ liệu từ server
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Hiển thị dữ liệu cho danh sách phiếu nhập
                    $.each(data.list_phieunhap, function (index, phieunhap) {
                        $('.table-phieu_nhap tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + phieunhap.mapn + '</td>' +
                            '<td>' + phieunhap.mancc + '-' + phieunhap.ten + '</td>' +
                            '<td>' + phieunhap.manv + '</td>' +
                            '<td>' + phieunhap.ngaynhap + '</td>' +
                            '<td>' + phieunhap.tongtien + '</td>' +
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

    function reset_select_nhacc() {
        $(document).ready(function () {
            var option0 = $('.select-ncc_sach_pn option[value="0"]').clone();
            $('.select-ncc_sach_pn').empty();
            // Fetch dữ liệu từ server
            $('.select-ncc_sach_pn').append(option0);
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Đổ các option nhà cung cấp
                    $.each(data.list_nhacungcap, function (index, nhacc) {
                        $('.select-ncc_sach_pn').append(
                            '<option value=' + '"' + nhacc.mancc + '"' + '>' +
                            nhacc.ten + '</option>'
                        );
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    }

    function reset_select_sach_pn() {
        $(document).ready(function () {
            var option0 = $('.select-ten_sach_pn option[value="0"]').clone();
            $('.select-ten_sach_pn').empty();
            // Fetch dữ liệu từ server
            $('.select-ten_sach_pn').append(option0);
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Đổ các option sách
                    $.each(data.list_sach, function (index, sach) {
                        $('.select-ten_sach_pn').append(
                            '<option value=' + '"' + sach.masach + '"' + '>' +
                            sach.masach + '-' + sach.tensach + '</option>'
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
        const incrementValue = 10000;
        const incrementValue_soluong = 1;

        // Cập nhật input hiển thị giá trị
        function updateInputSoluong() {
            $('.input-soluong_sach_pn').val(currentValue_soluong);
        }

        // Sự kiện khi nhấn nút tăng
        $('#increment_soluong_phieunhap').on('click', function () {
            currentValue_soluong += incrementValue_soluong;
            updateInputSoluong();
            updateTotalPrice();
        });

        // Sự kiện khi nhấn nút giảm
        $('#decrement_soluong_phieunhap').on('click', function () {
            if (currentValue_soluong > 1) { // Đảm bảo không giảm xuống dưới 0
                currentValue_soluong -= incrementValue_soluong;
                updateInputSoluong();
                updateTotalPrice();
            }
        });
    });


    //====================== Tìm kiếm phiếu nhập
    $(document).ready(function () {
        // Hàm tìm kiếm phiếu nhập
        function searchPhieuNhap() {
            const searchQuery = $('.search-input-phieu_nhap').val(); // Lấy giá trị từ ô input tìm kiếm

            if (searchQuery.trim() === '') {
                $('.table-phieu_nhap tbody').empty(); // Nếu không có từ khóa, xóa kết quả
                $('.table-phieu_nhap tbody').append('<tr><td colspan="6">Không tìm thấy phiếu nhập nào.</td></tr>');
                return;
            }

            // Gửi yêu cầu AJAX
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Thay thế bằng đường dẫn đến tệp PHP xử lý
                method: 'GET',
                dataType: 'json', // Định dạng dữ liệu trả về là JSON
                data: { search_phieunhap: searchQuery },
                success: function (data) {
                    $('.table-phieu_nhap tbody').empty(); // Xóa kết quả cũ
                    if (data.list_timkiem_phieunhap.length > 0) {
                        $.each(data.list_timkiem_phieunhap, function (index, phieunhap) {
                            $('.table-phieu_nhap tbody').append(
                                '<tr>' +
                                '<td>' + (index + 1) + '</td>' +
                                '<td>' + phieunhap.mapn + '</td>' +
                                '<td>' + phieunhap.mancc + '-' + phieunhap.ten + '</td>' +
                                '<td>' + phieunhap.manv + '</td>' +
                                '<td>' + phieunhap.ngaynhap + '</td>' +
                                '<td>' + phieunhap.tongtien + '</td>' +
                                '</tr>'
                            );
                        });
                    } else {
                        $('.table-phieu_nhap tbody').append('<tr><td colspan="6">Không tìm thấy phiếu nhập nào.</td></tr>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        }

        // Tìm kiếm khi nhấn nút
        $('.btn-search-phieu_nhap').on('click', function () {
            searchPhieuNhap();
        });

        // Tìm kiếm khi nhấn phím Enter
        $('.search-input-phieu_nhap').on('keypress', function (e) {
            if (e.which === 13) { // Kiểm tra phím Enter
                searchPhieuNhap();
                return false; // Ngăn chặn hành vi mặc định của Enter
            }
        });
    });


    $(document).ready(function () {
        window.reset_select_nhacc = reset_select_nhacc; // Gán hàm vào window
    });

    // Nhớ thêm hàm reset_select_nhacc() bên nhà cc

    // $(document).ready(function() {
    //     reset_select_nhacc();
    // });  

    // Nút tạo phiếu nhập
    $('.btn-create-pn').click(function () {
        mancc_for_pn = $('.select-ncc_sach_pn').val();
        if (selectedProducts.length > 0) {
            dem_tt = selectedProducts.length;
            console.log(dem_tt);
            if (mancc_for_pn > 0) {
                const confirmMessage = `Bạn có chắc chắn muốn tạo phiếu nhập ?`;
                if (!confirm(confirmMessage)) {
                    return; // Nếu người dùng không xác nhận, dừng lại
                }
                console.log("kê");
                console.log(selectedProducts);
                $.ajax({
                    url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP để tạo phiếu nhập
                    method: 'POST',
                    data: {
                        mancc_pn: mancc_for_pn,
                        manv_pn: manv_for_pn
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.list_tao_pn.length > 0) {
                            $.each(data.list_tao_pn, function (index, pn) {
                                if (pn.status === "success") {
                                    $('.table-ct-phieu_nhap tbody').empty();
                                    reset_select_nhacc();
                                    reset_select_sach_pn();
                                    alert(pn.message);
                                    let mapnmoi = pn.maphieunhap;
                                    currentValue_soluong = 0;
                                    // Có thể thêm logic để reset lại bảng và danh sách sản phẩm
                                    mancc_for_pn = 0;
                                    for (let i = 0; i < selectedProducts.length; i++) {
                                        dem_tt = dem_tt - 1;
                                        let thanhtien_pn = selectedProducts[i].price * selectedProducts[i].quantity;
                                        totalPrice += thanhtien_pn;
                                        console.log(thanhtien_pn);
                                        $.ajax({
                                            url: '../DAO/database/fetch_data.php',
                                            method: 'POST',
                                            data: {
                                                masach: selectedProducts[i].id,
                                                gianhap: selectedProducts[i].price,
                                                soluong: selectedProducts[i].quantity,
                                                maphieunhap: mapnmoi,
                                                thanhtien_pn: thanhtien_pn,
                                            },
                                            dataType: 'json',
                                            success: function (data) {
                                                if (data.list_them_ct_pn.length > 0) {
                                                    $.each(data.list_them_ct_pn, function (index, ctpn) {
                                                        if (ctpn.status === "success") {
                                                            console.log(ctpn.message);
                                                            if (dem_tt == 0) {
                                                                $.ajax({
                                                                    url: '../DAO/database/fetch_data.php',
                                                                    method: 'POST',
                                                                    data: {
                                                                        tongtien_pn: totalPrice,
                                                                        maphieunhap_tt: mapnmoi,
                                                                    },
                                                                    dataType: 'json',
                                                                    success: function (data) {
                                                                        if (data.list_sua_tongtien_pn.length > 0) {
                                                                            $.each(data.list_sua_tongtien_pn, function (index, ttpn) {
                                                                                if (ttpn.status === "success") {
                                                                                    console.log(ttpn.message);
                                                                                    reset_table_phieu_nhap();
                                                                                } else {
                                                                                    console.log(ttpn.message);
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        } else {
                                                            console.log(ctpn.message);
                                                        }
                                                    })
                                                }
                                            }
                                        });
                                    }
                                } else {
                                    alert(pn.message);
                                }
                            });
                        }
                    }
                });
            } else {
                alert('Vui lòng chọn nhà cung cấp');
            }
        } else {
            alert('Vui lòng thêm sản phẩm trước khi tạo phiếu nhập.');
        }
    });



    $(document).ready(function () {
        // Gán sự kiện click cho các hàng trong tbody
        $('.table-ct-phieu_nhap tbody').on('click', 'tr', function (event) {
            // Kiểm tra xem click có phải vào cột "Xóa" không
            const clickedColumn = $(event.target).closest('td'); // Lấy phần tử td đã nhấp

            // Kiểm tra nếu cột click không phải là cột "Xóa"
            if (clickedColumn.index() !== 5) { // 5 là chỉ số của cột "Xóa"
                // Lấy dữ liệu từ hàng được nhấp
                const row = $(this);
                const bookId = row.find('td:nth-child(2)').text(); // Mã sách
                const price = row.find('td:nth-child(3)').text(); // Giá nhập
                const quantity = row.find('td:nth-child(4)').text(); // Số lượng
                const total = row.find('td:nth-child(5)').text(); // Thành tiền

                // Cập nhật dữ liệu vào các ô nhập liệu
                $('.select-ten_sach_pn').val(bookId);
                $('.input-soluong_sach_pn').val(quantity);
                $('.input-gianhap_sach_pn').val(price);
                $('.input-thanhtien_sach_pn').val(total); // Cập nhật thành tiền
            }
        });
    });

});

let bookId_check;
let price_check;
let quantity_check;
let total_check;

let currentValue_soluong = 0;

let save_for_ct_pn = 0;

let manv_for_pn = 0;

let mancc_for_pn = 0;

let selectedProducts = [];

let totalPrice = 0;

let dem_tt = -1;


$(document).ready(function () {

    // Hàm để lấy giá nhập dựa vào mã sách
    function getPriceByBookId(bookId) {
        return $.ajax({
            url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP lấy giá nhập
            method: 'POST',
            data: { masach_gianhap: bookId },
            dataType: 'json'
        });
    }

    // Cập nhật giá nhập khi chọn sách
    $('.select-ten_sach_pn').change(function () {
        const bookId = $(this).val();
        if (bookId !== "0") {
            $('.input-soluong_sach_pn').val('1');
            currentValue_soluong = 1;
            getPriceByBookId(bookId).done(function (data) {
                if (data.list_gianhap_sach && data.list_gianhap_sach.length > 0) {
                    $('.input-gianhap_sach_pn').val(data.list_gianhap_sach[0]); // Cập nhật giá nhập
                    updateTotalPrice(); // Cập nhật thành tiền
                } else {
                    $('.input-gianhap_sach_pn').val(''); // Reset nếu không có giá nhập
                }
            }).fail(function () {
                $('.input-gianhap_sach_pn').val(''); // Reset giá nhập nếu có lỗi
                alert('Có lỗi xảy ra khi lấy giá nhập.');
            });
        } else {
            $('.input-gianhap_sach_pn').val(''); // Reset nếu không chọn sách
        }
    });

    // Cập nhật thành tiền khi thay đổi số lượng
    $('.input-soluong_sach_pn').on('input', function () {
        updateTotalPrice();
    });

    // Thêm sản phẩm vào bảng chi tiết phiếu nhập
    function addProductToTable(bookId, price, quantity, totalPrice) {
        const rowCount = $('.table-ct-phieu_nhap tbody tr').length;
        const newRow = `<tr>
            <td>${rowCount + 1}</td>
            <td>${bookId}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>${totalPrice}</td>
            <td><button class="btn-delete btn-remove-ct-pn">Xóa</button></td>
        </tr>`;
        $('.table-ct-phieu_nhap tbody').append(newRow);
        selectedProducts.push({ id: bookId, price: price, quantity: quantity });
    }

    // Nút lưu sản phẩm
    $('.btn-save-ct-phieu_nhap').click(function () {
        switch (save_for_ct_pn) {
            case 1:
                const bookId = $('.select-ten_sach_pn').val();
                const price = parseFloat($('.input-gianhap_sach_pn').val()) || 0;
                const quantity = parseInt($('.input-soluong_sach_pn').val()) || 0;
                const thanhtien_input = quantity * price;


                if (!bookId || parseInt(bookId) <= 0) {
                    alert('Vui lòng chọn sách.');
                    return; // Dừng lại nếu ô tên sách rỗng
                } else if (!price || parseInt(price) <= 0) {
                    alert('Giá nhập phải là một số hợp lệ.');
                    return; // Dừng lại nếu thể loại không hợp lệ
                } else if (!quantity || parseInt(quantity) <= 0) {
                    alert('Số lượng phải là một số hợp lệ.');
                    return; // Dừng lại nếu giá nhập không hợp lệ
                }

                console.log("HELLO LẦN Hai " + manv_for_pn);

                if (bookId !== "0" && quantity > 0) {
                    addProductToTable(bookId, price, quantity, thanhtien_input);
                    $('.input-soluong_sach_pn').val(''); // Reset số lượng
                    $('.input-gianhap_sach_pn').val(''); // Reset giá nhập
                    $('.input-thanhtien_sach_pn').val(''); // Reset thành tiền
                    $('.select-ten_sach_pn').val('0'); // Reset chọn sách
                } else {
                    alert("Số lượng phải lớn hơn 0");
                }
                currentValue_soluong = 0;
                console.log(selectedProducts);
                break;
            case 2:
                // Các giá trị mới cần cập nhật
                const bookIdnew = $('.select-ten_sach_pn').val();
                const newPrice = parseFloat($('.input-gianhap_sach_pn').val()) || 0; // Giá mới
                const newQuantity = parseInt($('.input-soluong_sach_pn').val()) || 0; // Số lượng mới

                let isChanged_ctpn = false;

                // Kiểm tra xem có thay đổi hay không
                if (newPrice !== price_check) isChanged_ctpn = true;
                if (newQuantity !== quantity_check) isChanged_ctpn = true;

                if (!isChanged_ctpn) {
                    alert("Không có thay đổi nào để sửa.");
                    return; // Dừng lại nếu không có thay đổi
                }

                // Tìm sản phẩm trong mảng selectedProducts dựa trên bookId
                for (let i = 0; i < selectedProducts.length; i++) {
                    if (selectedProducts[i].id === bookIdnew) {
                        // Cập nhật giá và số lượng
                        selectedProducts[i].price = newPrice;
                        selectedProducts[i].quantity = newQuantity;

                        // Tính toán thành tiền mới
                        let thanhtien_new = newPrice * newQuantity;

                        // Cập nhật hiển thị trên bảng
                        const row = $('.table-ct-phieu_nhap tbody tr').eq(i); // Lấy hàng tương ứng trong bảng
                        row.find('td:nth-child(3)').text(newPrice); // Cập nhật giá nhập
                        row.find('td:nth-child(4)').text(newQuantity); // Cập nhật số lượng
                        row.find('td:nth-child(5)').text(thanhtien_new); // Cập nhật thành tiền

                        // Reset các ô nhập liệu
                        $('.input-soluong_sach_pn').val(''); // Reset số lượng
                        $('.input-gianhap_sach_pn').val(''); // Reset giá nhập
                        $('.input-thanhtien_sach_pn').val(''); // Reset thành tiền
                        $('.select-ten_sach_pn').val('0'); // Reset chọn sách

                        alert('Đã sửa');
                        console.log(selectedProducts); // In ra mảng đã cập nhật
                        break; // Thoát khỏi vòng lặp sau khi cập nhật
                    }
                }
                currentValue_soluong = 0;
                break;
            default:
                alert("Trường hợp không hợp lệ. Vui lòng chọn 1 hoặc 2.");
                break;
        }

    });

    // Xóa sản phẩm khỏi bảng
    $('.table-ct-phieu_nhap').on('click', '.btn-remove-ct-pn', function () {
        const row = $(this).closest('tr'); // Lấy hàng được nhấp
        const bookId = row.find('td:nth-child(2)').text(); // Lấy mã sách từ cột tương ứng

        // Xóa hàng khỏi bảng
        row.remove();

        // Cập nhật lại STT
        $('.table-ct-phieu_nhap tbody tr').each(function (index) {
            $(this).find('td:first').text(index + 1);
        });

        // Xóa sản phẩm khỏi mảng selectedProducts
        const indexToRemove = selectedProducts.findIndex(product => product.id == bookId); // Tìm chỉ số sản phẩm

        if (indexToRemove !== -1) {
            selectedProducts.splice(indexToRemove, 1); // Xóa sản phẩm khỏi mảng
            console.log(`Sản phẩm ID: ${bookId} đã được xóa khỏi mảng.`);
        } else {
            console.log(`Sản phẩm ID: ${bookId} không tồn tại trong mảng.`);
        }

        console.log(selectedProducts); // In ra mảng đã cập nhật
    });


});


// Hàm để cập nhật thành tiền
function updateTotalPrice() {
    const quantity = parseInt($('.input-soluong_sach_pn').val()) || 0;
    const price = parseFloat($('.input-gianhap_sach_pn').val()) || 0;
    const thanhtien_inputtt = quantity * price;
    $('.input-thanhtien_sach_pn').val(thanhtien_inputtt); // Định dạng thành tiền
}