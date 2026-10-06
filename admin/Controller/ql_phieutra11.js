document.addEventListener("DOMContentLoaded", () => {

    /* Các nút hành động */
    const btn_start_ct_pt = document.querySelector('.btn-start-ct-phieu_tra');
    const btn_save_ct_pt = document.querySelector('.btn-save-ct-phieu_tra');
    const btn_create_pt = document.querySelector('.btn-create-pt');
    const btn_cancel = document.querySelector('.btn-cancel-ct-phieu_tra');
    const btn_reset = document.querySelector('.btn-reset-phieu_tra');

    const btn_edit_ct_pt = document.querySelector('.btn-edit-ct-phieu_tra');

    const input_search = document.querySelector('.search-input-phieu_tra');

    const input_mavach_sach = document.querySelector('.input-mavach_sach_pt');
    const input_ma_phieu_muon = document.querySelector('.input-ma_phieu_muon_pt');
    const select_tinhtrang_sach_pt = document.querySelector('.select-tinhtrang_sach_pt');
    const input_vitri_sach_pt = document.querySelector('.input-vitri_sach_pt');
    const select_phat_sach = document.querySelector('.select-phat_sach');
    const input_phiphat_sach = document.querySelector('.input-phiphat_sach');

    function ableInput() {
        select_tinhtrang_sach_pt.disabled = false;
        select_phat_sach.disabled = false;
    }

    function disableInput() {
        select_tinhtrang_sach_pt.disabled = true;
        select_phat_sach.disabled = true;
    }

    function resetInput() {
        input_mavach_sach.value = '';
        input_ma_phieu_muon.value = '';
        input_vitri_sach_pt.value = '';
        input_phiphat_sach.value = '';

        select_tinhtrang_sach_pt.selectedIndex = 0;
        select_phat_sach.selectedIndex = 0;
    }

    btn_start_ct_pt.addEventListener('click', () => {
        btn_edit_ct_pt.disabled = true;
        btn_save_ct_pt.disabled = false;
        btn_create_pt.disabled = false;
        btn_cancel.disabled = false;

        ableInput();
        resetInput();

        save_for_ct_pt = 1;
    });

    btn_edit_ct_pt.addEventListener('click', () => {
        btn_start_ct_pt.disabled = true;
        btn_save_ct_pt.disabled = false;
        btn_create_pt.disabled = false;
        btn_cancel.disabled = false;

        save_for_ct_pt = 2;

        ableInput();
    });

    btn_cancel.addEventListener('click', () => {
        btn_start_ct_pt.disabled = false;
        btn_edit_ct_pt.disabled = false;
        btn_save_ct_pt.disabled = true;
        btn_create_pt.disabled = true;
        btn_cancel.disabled = true;

        resetInput();
        disableInput();
        reset_select_hinhthucphat();
        reset_select_tinhtrang_pt();
    });


    btn_reset.addEventListener('click', () => {
        input_search.value = '';

        btn_start_ct_pt.disabled = false;
        btn_edit_ct_pt.disabled = false;
        btn_save_ct_pt.disabled = true;
        btn_create_pt.disabled = true;
        btn_cancel.disabled = true;

        document.querySelector('.input-mavach_sach_pt').value = '';
        document.querySelector('.input-ma_phieu_muon_pt').value = '';
        document.querySelector('.input-vitri_sach_pt').value = '';
        document.querySelector('.input-phiphat_sach').value = '';

        document.querySelector('.select-tinhtrang_sach_pt').selectedIndex = -1;
        // document.querySelector('.select-phat_sach').selectedIndex = 0;

        resetInput();
        disableInput();
        reset_table_phieutra();
        reset_select_hinhthucphat();
        reset_select_tinhtrang_pt();

        selectedProducts_pt = [];

        console.log(USERNAME);
    });

    btn_save_ct_pt.addEventListener('click', () => {

    });

    // FETCH DATA=========================================
    $(document).ready(function () {
        // Fetch dữ liệu từ server
        $.ajax({
            url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Hiển thị dữ liệu cho danh sách chi tiết sách đã mượn
                $.each(data.list_chitiet_sach_da_muon, function (index, chitiet_sach_da_muon) {
                    $('.table-ct-sach_da_muon tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + chitiet_sach_da_muon.mavach + '</td>' +
                        '<td>' + chitiet_sach_da_muon.mapm + '</td>' +
                        '<td>' + chitiet_sach_da_muon.madg + '-' + chitiet_sach_da_muon.ten_docgia + '</td>' +
                        '<td>' + chitiet_sach_da_muon.manv + '-' + chitiet_sach_da_muon.ten_nhanvien + '</td>' +
                        '<td>' + chitiet_sach_da_muon.matinhtrang + '</td>' +
                        '<td>' + chitiet_sach_da_muon.khu + '</td>' +
                        '</tr>'
                    );
                });

                // Hiển thị dữ liệu cho danh sách phiếu trả
                $.each(data.list_phieutra, function (index, phieutra) {
                    $('.table-phieu_tra tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + phieutra.mapt + '</td>' +
                        '<td>' + phieutra.ngaytra + '</td>' +
                        '<td>' + phieutra.mapm + '</td>' +
                        '<td>' + phieutra.madg + '-' + phieutra.ten_docgia + '</td>' +
                        '<td>' + phieutra.manv + '-' + phieutra.ten_nhanvien + '</td>' +
                        '<td>' + phieutra.tongphiphat + '</td>' +
                        '</tr>'
                    );
                });

                // Đổ các option hình thức phạt
                $.each(data.list_hinhthucphat, function (index, hinhthucphat) {
                    $('.select-phat_sach').append(
                        '<option value=' + '"' + hinhthucphat.maphat + '"' + '>' +
                        hinhthucphat.lydophat + '</option>'
                    );
                });

                // Đổ các option tình trạng sách
                $.each(data.list_tinhtrangsach, function (index, tinhtrangsach) {
                    $('.select-tinhtrang_sach_pt').append(
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

    // sự kiện click vào bảng sách để xem chi tiết phiếu trả
    $(document).ready(function () {
        $('.table-phieu_tra tbody').on('click', 'tr', function () {
            var ma_phieu_tra = $(this).find('td').eq(1).text(); // Lấy giá trị từ ô <td> thứ hai
            console.log(ma_phieu_tra);
            $('.table-ct-phieu_tra tbody').empty();
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP xử lý
                method: 'POST',
                data: { ma_phieu_tra: ma_phieu_tra },
                dataType: 'json',
                success: function (data) {
                    $.each(data.list_chitiet_phieu_tra_xem, function (index, chitietphieutra_xem) {
                        $('.table-ct-phieu_tra tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + chitietphieutra_xem.mapt + '</td>' +
                            '<td>' + chitietphieutra_xem.mavach + '</td>' +
                            '<td>' + chitietphieutra_xem.maphat + '</td>' +
                            '<td>' + chitietphieutra_xem.phiphat + '</td>' +
                            '</tr>'
                        );
                        console.log(chitietphieutra_xem.mapt);
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    });

    //===================== Sự kiện click đổ dữ liệu
    $(document).ready(function () {
        // Gán sự kiện click cho từng dòng
        $('.table-ct-sach_da_muon tbody').on('click', 'tr', function () {
            // Lấy dữ liệu từ các cột
            const cells = $(this).children('td');

            const mavach_for_input = $(cells[1]).text(); // Cột Mã vạch
            const mapm_for_input = $(cells[2]).text(); // Cột Mã PM

            const madg_for_input = $(cells[3]).text().split('-')[0]; // Cột Mã ĐG
            const manv_for_input = $(cells[4]).text().split('-')[0]; // Cột Mã NV

            madocgia_pt = madg_for_input;

            const matinhtrang_for_select = $(cells[5]).text(); // Cột Mã Tình Trạng
            const khu_for_input = $(cells[6]).text(); // Cột Khu

            // Đổ dữ liệu vào các input
            $('.input-mavach_sach_pt').val(mavach_for_input);
            $('.input-ma_phieu_muon_pt').val(mapm_for_input);

            $('.select-tinhtrang_sach_pt').val(matinhtrang_for_select);
            $('.input-vitri_sach_pt').val(khu_for_input);
        });
    });


    function reset_table_phieutra() {
        $(document).ready(function () {
            $('.table-ct-sach_da_muon tbody').empty();
            $('.table-phieu_tra tbody').empty();
            $('.table-ct-sach_tra tbody').empty();
            $('.table-ct-phieu_tra tbody').empty();
            // Fetch dữ liệu từ server
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Hiển thị dữ liệu cho danh sách chi tiết sách đã mượn
                    // Hiển thị dữ liệu cho danh sách chi tiết sách đã mượn
                    $.each(data.list_chitiet_sach_da_muon, function (index, chitiet_sach_da_muon) {
                        $('.table-ct-sach_da_muon tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + chitiet_sach_da_muon.mavach + '</td>' +
                            '<td>' + chitiet_sach_da_muon.mapm + '</td>' +
                            '<td>' + chitiet_sach_da_muon.madg + '-' + chitiet_sach_da_muon.ten_docgia + '</td>' +
                            '<td>' + chitiet_sach_da_muon.manv + '-' + chitiet_sach_da_muon.ten_nhanvien + '</td>' +
                            '<td>' + chitiet_sach_da_muon.matinhtrang + '</td>' +
                            '<td>' + chitiet_sach_da_muon.khu + '</td>' +
                            '</tr>'
                        );
                    });

                    // Hiển thị dữ liệu cho danh sách phiếu trả
                    $.each(data.list_phieutra, function (index, phieutra) {
                        $('.table-phieu_tra tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + phieutra.mapt + '</td>' +
                            '<td>' + phieutra.ngaytra + '</td>' +
                            '<td>' + phieutra.mapm + '</td>' +
                            '<td>' + phieutra.madg + '-' + phieutra.ten_docgia + '</td>' +
                            '<td>' + phieutra.manv + '-' + phieutra.ten_nhanvien + '</td>' +
                            '<td>' + phieutra.tongphiphat + '</td>' +
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

    function reset_select_tinhtrang_pt() {
        $(document).ready(function () {
            var option0 = $('.select-tinhtrang_sach_pt option[value="-1"]').clone();
            $('.select-tinhtrang_sach_pt').empty();
            // Fetch dữ liệu từ server
            $('.select-tinhtrang_sach_pt').append(option0);
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Đổ các option tình trạng sách
                    $.each(data.list_tinhtrangsach, function (index, tinhtrangsach) {
                        $('.select-tinhtrang_sach_pt').append(
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

    function reset_select_hinhthucphat() {
        $(document).ready(function () {
            var option0 = $('.select-phat_sach option[value="-1"]').clone();
            $('.select-phat_sach').empty();
            // Fetch dữ liệu từ server
            $('.select-phat_sach').append(option0);
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Đổ các option loại độc giả
                    $.each(data.list_hinhthucphat, function (index, hinhthucphat) {
                        $('.select-phat_sach').append(
                            '<option value=' + '"' + hinhthucphat.maphat + '"' + '>' +
                            hinhthucphat.lydophat + '</option>'
                        );
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    }

    //=============================== Tìm kiếm phiếu trả
    $(document).ready(function () {
        // Hàm để tải dữ liệu
        function SearchPhieuTra() {
            const searchQuery = $('.search-input-phieu_tra').val(); // Lấy giá trị từ ô tìm kiếm

            if (searchQuery.trim() === '') {
                $('.table-ct-sach_da_muon tbody').empty();
                $('.table-phieu_tra tbody').empty();
                $('.table-ct-sach_da_muon tbody').append('<tr><td colspan="7">Không có dữ liệu.</td></tr>');
                $('.table-phieu_tra tbody').append('<tr><td colspan="7">Không có dữ liệu.</td></tr>');
                return;
            }

            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                data: { search_phieutra: searchQuery }, // Truyền tham số tìm kiếm
                dataType: 'json',
                success: function (data) {
                    // Xóa dữ liệu cũ trước khi thêm dữ liệu mới
                    $('.table-ct-sach_da_muon tbody').empty();
                    $('.table-phieu_tra tbody').empty();

                    // Kiểm tra và hiển thị dữ liệu cho danh sách chi tiết sách đã mượn
                    if (data.list_timkiem_ct_sach_da_muon.length > 0) {
                        $.each(data.list_timkiem_ct_sach_da_muon, function (index, chitiet_sach_da_muon) {
                            $('.table-ct-sach_da_muon tbody').append(
                                '<tr>' +
                                '<td>' + (index + 1) + '</td>' +
                                '<td>' + chitiet_sach_da_muon.mavach + '</td>' +
                                '<td>' + chitiet_sach_da_muon.mapm + '</td>' +
                                '<td>' + chitiet_sach_da_muon.madg + '-' + chitiet_sach_da_muon.ten_docgia + '</td>' +
                                '<td>' + chitiet_sach_da_muon.manv + '-' + chitiet_sach_da_muon.ten_nhanvien + '</td>' +
                                '<td>' + chitiet_sach_da_muon.matinhtrang + '</td>' +
                                '<td>' + chitiet_sach_da_muon.khu + '</td>' +
                                '</tr>'
                            );
                        });
                    } else {
                        $('.table-ct-sach_da_muon tbody').append('<tr><td colspan="7">Không có dữ liệu.</td></tr>');
                    }

                    // Kiểm tra và hiển thị dữ liệu cho danh sách phiếu trả
                    if (data.list_timkiem_phieutra.length > 0) {
                        $.each(data.list_timkiem_phieutra, function (index, phieutra) {
                            $('.table-phieu_tra tbody').append(
                                '<tr>' +
                                '<td>' + (index + 1) + '</td>' +
                                '<td>' + phieutra.mapt + '</td>' +
                                '<td>' + phieutra.ngaytra + '</td>' +
                                '<td>' + phieutra.mapm + '</td>' +
                                '<td>' + phieutra.madg + '-' + phieutra.ten_docgia + '</td>' +
                                '<td>' + phieutra.manv + '-' + phieutra.ten_nhanvien + '</td>' +
                                '<td>' + phieutra.tongphiphat + '</td>' +
                                '</tr>'
                            );
                        });
                    } else {
                        $('.table-phieu_tra tbody').append('<tr><td colspan="7">Không có dữ liệu.</td></tr>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        }

        // Sự kiện nhấn nút tìm kiếm
        $('.btn-search-phieu_tra').click(function () {
            SearchPhieuTra();
        });

        // Sự kiện nhấn phím Enter trong ô nhập liệu
        $('.search-input-phieu_tra').keypress(function (e) {
            if (e.which === 13) { // phím Enter
                SearchPhieuTra();
                return false; // Ngăn chặn hành vi mặc định của Enter
            }
        });
    });



    $(document).ready(function () {
        window.reset_select_hinhthucphat = reset_select_hinhthucphat; // Gán hàm vào window
        window.reset_select_tinhtrang_pt = reset_select_tinhtrang_pt;
    });

    // $(document).ready(function() {
    //     reset_select_hinhthucphat();
    //     reset_select_tinhtrang_pt();
    // });  



});


let selectedProducts_pt = [];

let groupedProducts = [];

let save_for_ct_pt = 0;


let bookId_check_pt;
let mapm_check;
let hinhthucphat_check;
let vitri_check;
let tinhtrang_check;

let madocgia_pt;



$(document).ready(function () {


    $(document).ready(function () {
        // Gán sự kiện click cho các hàng trong tbody
        $('.table-ct-sach_tra tbody').on('click', 'tr', function (event) {
            // Kiểm tra xem click có phải vào cột "Xóa" không
            const clickedColumn = $(event.target).closest('td'); // Lấy phần tử td đã nhấp

            // Kiểm tra nếu cột click không phải là cột "Xóa"
            if (clickedColumn.index() !== 7) { // 5 là chỉ số của cột "Xóa"
                // Lấy dữ liệu từ hàng được nhấp
                const row = $(this);
                const bookId = row.find('td:nth-child(2)').text(); // Mã sách
                const mapm = row.find('td:nth-child(3)').text(); // Giá nhập
                const tinhtrang = row.find('td:nth-child(4)').text(); // Số lượng
                const vitri = row.find('td:nth-child(5)').text(); // Thành tiền
                const hinhthucphat = row.find('td:nth-child(6)').text(); // Thành tiền
                const phiphat = row.find('td:nth-child(7)').text(); // Thành tiền

                hinhthucphat_check = hinhthucphat;
                tinhtrang_check = tinhtrang;

                // Cập nhật dữ liệu vào các ô nhập liệu
                $('.input-mavach_sach_pt').val(bookId);
                $('.input-ma_phieu_muon_pt').val(mapm);
                $('.select-tinhtrang_sach_pt').val(tinhtrang);
                $('.input-vitri_sach_pt').val(vitri);
                $('.select-phat_sach').val(hinhthucphat);
                $('.input-phiphat_sach').val(phiphat);

            }
        });
    });


    function getPriceByIdphat(idphat) {
        return $.ajax({
            url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP lấy giá nhập
            method: 'POST',
            data: { idphat: idphat },
            dataType: 'json'
        });
    }

    // Cập nhật phí phạt khi chọn hình thức phạt
    $('.select-phat_sach').change(function () {
        const idphat = $(this).val();
        if (idphat != -1) {
            getPriceByIdphat(idphat).done(function (data) {
                if (data.list_layphiphat_sach && data.list_layphiphat_sach.length > 0) {
                    $('.input-phiphat_sach').val(data.list_layphiphat_sach[0]); // Cập nhật giá nhập
                } else {
                    $('.input-phiphat_sach').val(''); // Reset nếu không có giá nhập
                }
            }).fail(function () {
                $('.input-phiphat_sach').val(''); // Reset giá nhập nếu có lỗi
                alert('Có lỗi xảy ra khi lấy phí phạt.');
            });
        } else {
            $('.input-phiphat_sach').val(''); // Reset nếu không chọn sách
        }
    });


    // Thêm sản phẩm vào bảng chi tiết phiếu trả
    function addProductToTablePT(mavach, mapm, tinhtrang, vitri, hinhthucphat, phiphat) {
        const rowCount = $('.table-ct-sach_tra tbody tr').length;

        // Kiểm tra xem sản phẩm đã tồn tại trong selectedProducts_pt với cùng mapm và mavach chưa
        let existingProduct = selectedProducts_pt.find(product => product.mapm === mapm && product.mavach === mavach);

        if (existingProduct) {
            // Nếu sản phẩm đã tồn tại, thông báo lỗi cho người dùng
            alert(`Sản phẩm với mã vạch ${mavach} đã tồn tại trong danh sách chờ. Không thể thêm lại.`);
            console.error(`Sản phẩm với mã vạch ${mavach} đã tồn tại trong phiếu mượn ${mapm}.`);
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới vào bảng và mảng
            const newRow = `<tr>
            <td>${rowCount + 1}</td>
            <td>${mavach}</td>
            <td>${mapm}</td>
            <td>${tinhtrang}</td>
            <td>${vitri}</td>
            <td>${hinhthucphat}</td>
            <td>${phiphat}</td>
            <td><button class="btn-delete btn-remove-ct-pt">Xóa</button></td>
        </tr>`;

            $('.table-ct-sach_tra tbody').append(newRow);

            // Thêm mới vào mảng selectedProducts_pt
            selectedProducts_pt.push({ mavach, mapm, tinhtrang, vitri, hinhthucphat, phiphat });

            // Cập nhật nhóm sản phẩm
            updateGroupedProducts();
        }
    }

    // Cập nhật nhóm sản phẩm theo mapm
    function updateGroupedProducts() {
        groupedProducts = selectedProducts_pt.reduce((acc, product) => {
            if (!acc[product.mapm]) {
                acc[product.mapm] = []; // Khởi tạo mảng cho mapm mới
            }
            acc[product.mapm].push(product); // Thêm sản phẩm vào mảng
            return acc;
        }, {});

        console.log(groupedProducts); // In ra nhóm sản phẩm
    }

    // Xóa sản phẩm khỏi bảng
$('.table-ct-sach_tra').on('click', '.btn-remove-ct-pt', function () {
    const row = $(this).closest('tr'); // Lấy hàng được nhấp
    const bookId = row.find('td:nth-child(2)').text(); // Lấy mã sách từ cột tương ứng

    // Xóa hàng khỏi bảng
    row.remove();

    // Cập nhật lại STT
    $('.table-ct-sach_tra tbody tr').each(function (index) {
        $(this).find('td:first').text(index + 1);
    });

    // Xóa sản phẩm khỏi selectedProducts_pt
    const indexToRemove = selectedProducts_pt.findIndex(product => product.mavach == bookId); // Tìm chỉ số sản phẩm

    if (indexToRemove !== -1) {
        selectedProducts_pt.splice(indexToRemove, 1); // Xóa sản phẩm khỏi mảng
        console.log(`Sản phẩm ID: ${bookId} đã được xóa khỏi mảng.`);
    } else {
        console.log(`Sản phẩm ID: ${bookId} không tồn tại trong mảng.`);
    }

    // Xóa sản phẩm khỏi groupedProducts
    for (const key in groupedProducts) {
        const products = groupedProducts[key];
        const indexInGroup = products.findIndex(product => product.mavach == bookId); // Tìm chỉ số trong nhóm

        if (indexInGroup !== -1) {
            products.splice(indexInGroup, 1); // Xóa sản phẩm khỏi nhóm

            // Kiểm tra nếu nhóm rỗng và xóa nhóm khỏi groupedProducts
            if (products.length === 0) {
                delete groupedProducts[key];
                console.log(`Nhóm ${key} đã bị xóa do không còn sản phẩm nào.`);
            }
            console.log(`Sản phẩm ID: ${bookId} đã được xóa khỏi nhóm ${key}.`);
            break; // Thoát khỏi vòng lặp sau khi tìm thấy
        }
    }

    // Kiểm tra lại groupedProducts
    console.log(selectedProducts_pt); // In ra mảng đã cập nhật
    console.log(groupedProducts); // In ra groupedProducts đã cập nhật
});


    // Nút lưu sản phẩm
    $('.btn-save-ct-phieu_tra').click(function () {
        switch (save_for_ct_pt) {
            case 1:
                const bookId = $('.input-mavach_sach_pt').val();
                const mapm = $('.input-ma_phieu_muon_pt').val();
                const tinhtrang = $('.select-tinhtrang_sach_pt').val();
                const vitri = $('.input-vitri_sach_pt').val();
                const hinhthucphat = $('.select-phat_sach').val();

                let phiphat = parseInt($('.input-phiphat_sach').val()) || 0;


                if (!bookId || parseInt(bookId) <= 0) {
                    alert('Vui lòng chọn sách.');
                    return;
                } else if (!mapm || parseInt(mapm) <= 0) {
                    alert('Thiếu mã phiếu mượn.');
                    return;
                } else if (tinhtrang == -1) {
                    alert('Vui lòng chọn tình trạng');
                    return;
                } else if (hinhthucphat == -1) {
                    alert('Vui lòng chọn hình thức phạt');
                    return;
                }

                console.log("HELLO LẦN Phiếu trả " + manv_for_pn);

                if (bookId !== "0" && tinhtrang != -1) {
                    addProductToTablePT(bookId, mapm, tinhtrang, vitri, hinhthucphat, phiphat);
                    $('.input-mavach_sach_pt').val('');
                    $('.input-ma_phieu_muon_pt').val('');
                    $('.input-vitri_sach_pt').val('');
                    $('.select-tinhtrang_sach_pt').val('-1');
                    $('.select-phat_sach').val('0');
                    $('.input-phiphat_sach').val('');
                } else {
                    alert("Vui lòng chọn sách hoặc tình trạng sách");
                }

                console.log(selectedProducts_pt);
                break;

            case 2:
                console.log("2");
                // Các giá trị mới cần cập nhật
                const bookIdnew = $('.input-mavach_sach_pt').val();
                const mapmnew = $('.input-ma_phieu_muon_pt').val();
                const tinhtrangnew = $('.select-tinhtrang_sach_pt').val();
                const vitrinew = $('.input-vitri_sach_pt').val();
                const hinhthucphatnew = $('.select-phat_sach').val();

                const phiphatnew = $('.input-phiphat_sach').val();

                let isChanged_ctpn = false;

                // Kiểm tra xem có thay đổi hay không
                if (tinhtrangnew !== tinhtrang_check) isChanged_ctpn = true;
                if (hinhthucphatnew !== hinhthucphat_check) isChanged_ctpn = true;

                if (!isChanged_ctpn) {
                    alert("Không có thay đổi nào để sửa.");
                    return; // Dừng lại nếu không có thay đổi
                }

                // Tìm sản phẩm trong mảng selectedProducts_pt dựa trên bookId
                for (let y = 0; y < selectedProducts_pt.length; y++) {
                    if (selectedProducts_pt[y].mavach === bookIdnew) {

                        selectedProducts_pt[y].tinhtrang = tinhtrangnew;
                        selectedProducts_pt[y].hinhthucphat = hinhthucphatnew;
                        selectedProducts_pt[y].phiphat = phiphatnew;

                        console.log(selectedProducts_pt);
                        // Cập nhật hiển thị trên bảng
                        const row = $('.table-ct-sach_tra tbody tr').eq(y); // Lấy hàng tương ứng trong bảng
                        row.find('td:nth-child(4)').text(tinhtrangnew); // Cập nhật giá nhập
                        row.find('td:nth-child(6)').text(hinhthucphatnew); // Cập nhật số lượng
                        row.find('td:nth-child(7)').text(phiphatnew); // Cập nhật thành tiền

                        // Reset các ô nhập liệu
                        $('.input-mavach_sach_pt').val('');
                        $('.input-ma_phieu_muon_pt').val('');
                        $('.select-tinhtrang_sach_pt').val('-1');
                        $('.input-vitri_sach_pt').val('');
                        $('.select-phat_sach').val('0');
                        $('.input-phiphat_sach').val('');

                        alert('Đã sửa');
                        console.log(selectedProducts_pt); // In ra mảng đã cập nhật
                        updateGroupedProducts();
                        break; // Thoát khỏi vòng lặp sau khi cập nhật
                    }
                }

                break;

            default:
                alert("Trường hợp không hợp lệ. Vui lòng chọn 1 hoặc 2.");
                break;
        }

    });


    $('.btn-create-pt').click(function () {
        // Kiểm tra nếu groupedProducts không rỗng
        if (Object.keys(groupedProducts).length > 0) {
            const confirmMessage = `Bạn có chắc chắn muốn tạo phiếu trả ?`;
            if (!confirm(confirmMessage)) {
                return; // Nếu người dùng không xác nhận, dừng lại
            }
            createReturnReceipts(groupedProducts);
            alert("Tạo phiếu trả thành công");
        } else {
            alert("Không có sản phẩm nào để tạo phiếu trả."); // Thông báo khi không có sản phẩm
        }
    });

    function createReturnReceipts(groupedProducts) {
        // let length = groupedProducts.length; // Lấy độ dài của mảng
        // console.log(length);
        Object.keys(groupedProducts).forEach(mapm => {
            const products = groupedProducts[mapm];
            console.log(products);
            // Tính tổng phí phạt cho nhóm này
            const totalFine = Number(products.reduce((sum, product) => sum + product.phiphat, 0));
            // Tạo phiếu trả mới
            $.ajax({
                url: '../DAO/database/fetch_data.php',
                method: 'POST',
                data: { mapm: mapm, tongphiphat: totalFine, madocgia_pt: madocgia_pt, manv_pt: manv_for_pn },
                dataType: 'json',
                success: function (data) {
                    $('.table-phieu_nhap tbody').empty(); // Xóa kết quả cũ
                    if (data.list_tao_pt && data.list_tao_pt.length > 0) {
                        $.each(data.list_tao_pt, function (index, pt) {
                            if (pt.status === "success") {
                                length = length - 1;
                                console.log(pt.message);
                                products.forEach(product => {
                                    // if (product.hinhthucphat == 0) {
                                    //     product.phiphat = 0;
                                    // }
                                    $.ajax({
                                        url: '../DAO/database/fetch_data.php',
                                        method: 'POST',
                                        data: {
                                            mapt: pt.maphieutra,
                                            mavach: product.mavach,
                                            maphat: product.hinhthucphat,
                                            phiphat: product.phiphat,
                                            tinhtrangsach: product.tinhtrang
                                        },
                                        dataType: 'json',
                                        success: function (data) {
                                            if (data.list_them_ct_pt.length > 0) {
                                                $.each(data.list_them_ct_pt, function (index, ctpt) {
                                                    if (ctpt.status === "success") {
                                                        console.log(ctpt.message);
                                                        reset_table_phieutra2();
                                                    }
                                                })
                                            }
                                        }
                                    });
                                });
                            }
                        })
                    }
                },
                error: function () {
                    console.error('Lỗi khi tạo phiếu trả.');
                }
            });
        });
    }

});

function reset_table_phieutra2() {
    $(document).ready(function () {
        $('.table-ct-sach_da_muon tbody').empty();
        $('.table-phieu_tra tbody').empty();
        $('.table-ct-sach_tra tbody').empty();
        $('.table-ct-phieu_tra tbody').empty();
        // Fetch dữ liệu từ server
        $.ajax({
            url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Hiển thị dữ liệu cho danh sách chi tiết sách đã mượn
                // Hiển thị dữ liệu cho danh sách chi tiết sách đã mượn
                $.each(data.list_chitiet_sach_da_muon, function (index, chitiet_sach_da_muon) {
                    $('.table-ct-sach_da_muon tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + chitiet_sach_da_muon.mavach + '</td>' +
                        '<td>' + chitiet_sach_da_muon.mapm + '</td>' +
                        '<td>' + chitiet_sach_da_muon.madg + '-' + chitiet_sach_da_muon.ten_docgia + '</td>' +
                        '<td>' + chitiet_sach_da_muon.manv + '-' + chitiet_sach_da_muon.ten_nhanvien + '</td>' +
                        '<td>' + chitiet_sach_da_muon.matinhtrang + '</td>' +
                        '<td>' + chitiet_sach_da_muon.khu + '</td>' +
                        '</tr>'
                    );
                });

                // Hiển thị dữ liệu cho danh sách phiếu trả
                $.each(data.list_phieutra, function (index, phieutra) {
                    $('.table-phieu_tra tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + phieutra.mapt + '</td>' +
                        '<td>' + phieutra.ngaytra + '</td>' +
                        '<td>' + phieutra.mapm + '</td>' +
                        '<td>' + phieutra.madg + '-' + phieutra.ten_docgia + '</td>' +
                        '<td>' + phieutra.manv + '-' + phieutra.ten_nhanvien + '</td>' +
                        '<td>' + phieutra.tongphiphat + '</td>' +
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