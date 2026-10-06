document.addEventListener("DOMContentLoaded", () => {

    /* Các nút hành động */
    const btn_reset = document.querySelector('.btn-reset-phieu_muon');

    const input_search = document.querySelector('.search-input-phieu_muon');

    btn_reset.addEventListener('click', () => {
        input_search.value = '';

        reset_table_phieumuon();
    });

    // FETCH DATA=========================================
    $(document).ready(function () {
        // Fetch dữ liệu từ server
        $.ajax({
            url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Hiển thị dữ liệu cho danh sách tài khoản độc giả
                $.each(data.list_phieumuon, function (index, phieumuon) {
                    let trangThaiHTML;
                    let trangThaiHTML_Xoa;

                    // Kiểm tra trạng thái
                    if (phieumuon.trangthai == 0) {
                        trangThaiHTML = '<button class="btn-xu-ly" onclick="xuLyPhieuMuon(' + phieumuon.mapm + ')">Xử Lý</button>';
                        trangThaiHTML_Xoa = '<button class="btn-lock" onclick="deletePM(\'' + phieumuon.mapm + '\')">Xóa</button>';
                    } else {
                        trangThaiHTML = '<span class="da-xu-ly">Đã Xử Lý</span>';
                        trangThaiHTML_Xoa = '<button class="btn-lock" style ="background-color: #ccc; cursor: not-allowed; " onclick="deletePM(\'' + phieumuon.mapm + '\')" disabled>Xóa</button>'
                    }

                    // Thêm dòng vào bảng
                    $('.table-phieu_muon tbody').append(
                        '<tr>' +
                        '<td>' + (index + 1) + '</td>' +
                        '<td>' + phieumuon.mapm + '</td>' +
                        '<td>' + phieumuon.ngaymuon + '</td>' +
                        '<td>' + phieumuon.hantra + '</td>' +
                        '<td>' + phieumuon.madg + '-' + phieumuon.ten_docgia + '</td>' +
                        '<td>' + phieumuon.manv + '-' + phieumuon.ten_nhanvien + '</td>' +
                        '<td>' + phieumuon.tongphimuon + '</td>' +
                        '<td>' + trangThaiHTML + '</td>' +
                        '<td> ' + trangThaiHTML_Xoa + ' </td>' +
                        '</tr>'
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error('Lỗi:', error);
            }
        });
    });

    // sự kiện click vào bảng sách để xem chi tiết phiêu mượn
    $(document).ready(function () {
        $('.table-phieu_muon tbody').on('click', 'tr', function (event) {
            // Lấy chỉ số cột mà người dùng click
            var columnIndex = $(event.target).index();

            // Kiểm tra nếu click vào cột 7 hoặc cột 8 (chỉ số 6 và 7)
            if (columnIndex === 7 || columnIndex === 8) {
                return; // Không làm gì và dừng lại nếu là cột 7 hoặc 8
            }

            var ma_phieu_muon = $(this).find('td').eq(1).text(); // Lấy giá trị từ ô <td> thứ hai
            console.log(ma_phieu_muon);
            $('.table-ct-phieu_muon tbody').empty();

            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP xử lý
                method: 'POST',
                data: { ma_phieu_muon: ma_phieu_muon },
                dataType: 'json',
                success: function (data) {
                    $.each(data.list_chitiet_phieu_muon_xem, function (index, chitietphieumuon_xem) {
                        $('.table-ct-phieu_muon tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + chitietphieumuon_xem.mapm + '</td>' +
                            '<td>' + chitietphieumuon_xem.mavach + '</td>' +
                            '<td>' + chitietphieumuon_xem.tinhtrangmuon + '</td>' +
                            '<td>' + chitietphieumuon_xem.phimuon + '</td>' +
                            '</tr>'
                        );
                        console.log(chitietphieumuon_xem.mapm);
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        });
    });

    function reset_table_phieumuon() {
        $(document).ready(function () {
            $('.table-ct-phieu_muon tbody').empty();
            $('.table-phieu_muon tbody').empty();
            // Fetch dữ liệu từ server
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Hiển thị dữ liệu cho danh sách tài khoản độc giả
                    $.each(data.list_phieumuon, function (index, phieumuon) {
                        let trangThaiHTML_Xoa;

                        // Kiểm tra trạng thái
                        if (phieumuon.trangthai == 0) {
                            trangThaiHTML = '<button class="btn-xu-ly" onclick="xuLyPhieuMuon(' + phieumuon.mapm + ')">Xử Lý</button>';
                            trangThaiHTML_Xoa = '<button class="btn-lock" onclick="deletePM(\'' + phieumuon.mapm + '\')">Xóa</button>';
                        } else {
                            trangThaiHTML = '<span class="da-xu-ly">Đã Xử Lý</span>';
                            trangThaiHTML_Xoa = '<button class="btn-lock" style ="background-color: #ccc; cursor: not-allowed; "  onclick="deletePM(\'' + phieumuon.mapm + '\')" disabled>Xóa</button>'
                        }

                        // Thêm dòng vào bảng
                        $('.table-phieu_muon tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + phieumuon.mapm + '</td>' +
                            '<td>' + phieumuon.ngaymuon + '</td>' +
                            '<td>' + phieumuon.hantra + '</td>' +
                            '<td>' + phieumuon.madg + '-' + phieumuon.ten_docgia + '</td>' +
                            '<td>' + phieumuon.manv + '-' + phieumuon.ten_nhanvien + '</td>' +
                            '<td>' + phieumuon.tongphimuon + '</td>' +
                            '<td>' + trangThaiHTML + '</td>' +
                            '<td> '+ trangThaiHTML_Xoa + ' </td>' +
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


    // ========================== Tìm kiếm phiếu mượn
    $(document).ready(function () {
        // Hàm tìm kiếm phiếu mượn
        function searchPhieuMuon() {
            const searchQuery = $('.search-input-phieu_muon').val(); // Lấy giá trị từ ô tìm kiếm

            if (searchQuery.trim() === '') {
                $('.table-phieu_muon tbody').empty();
                $('.table-phieu_muon tbody').append('<tr><td colspan="8">Không tìm thấy phiếu mượn nào.</td></tr>');
                return;
            }

            // Gửi yêu cầu AJAX để tìm kiếm
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Thay thế bằng đường dẫn đến tệp PHP xử lý
                method: 'GET',
                dataType: 'json',
                data: { search_phieumuon: searchQuery },
                success: function (data) {
                    // Xóa kết quả cũ trong bảng
                    $('.table-phieu_muon tbody').empty();

                    // Kiểm tra và hiển thị dữ liệu cho danh sách phiếu mượn
                    if (data.list_timkiem_phieumuon.length > 0) {
                        $.each(data.list_timkiem_phieumuon, function (index, phieumuon) {
                            let trangThaiHTML;

                            // Kiểm tra trạng thái
                            if (phieumuon.trangthai == 0) {
                                trangThaiHTML = '<button class="btn-xu-ly" onclick="xuLyPhieuMuon(' + phieumuon.mapm + ')">Xử Lý</button>';
                            } else {
                                trangThaiHTML = '<span class="da-xu-ly">Đã Xử Lý</span>';
                            }
                            $('.table-phieu_muon tbody').append(
                                '<tr>' +
                                '<td>' + (index + 1) + '</td>' +
                                '<td>' + phieumuon.mapm + '</td>' +
                                '<td>' + phieumuon.ngaymuon + '</td>' +
                                '<td>' + phieumuon.hantra + '</td>' +
                                '<td>' + phieumuon.madg + '-' + phieumuon.ten_docgia + '</td>' +
                                '<td>' + phieumuon.manv + '-' + phieumuon.ten_nhanvien + '</td>' +
                                '<td>' + phieumuon.tongphimuon + '</td>' +
                                '<td>' + trangThaiHTML + '</td>' +
                                '</tr>'
                            );
                        });
                    } else {
                        $('.table-phieu_muon tbody').append('<tr><td colspan="8">Không tìm thấy phiếu mượn nào.</td></tr>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Lỗi:', error);
                }
            });
        }

        // Tìm kiếm khi nhấn nút
        $('.btn-search-phieu_muon').on('click', function () {
            searchPhieuMuon();
        });

        // Tìm kiếm khi nhấn phím Enter
        $('.search-input-phieu_muon').on('keypress', function (e) {
            if (e.which === 13) { // Kiểm tra phím Enter
                searchPhieuMuon();
                return false; // Ngăn chặn hành vi mặc định của Enter
            }
        });
    });


    $(document).ready(function () {
        window.reset_table_phieumuon = reset_table_phieumuon; // Gán hàm vào window
    });

});


function deletePM(ma) {

    if (!confirm("Bạn có chắc chắn muốn xóa phiếu mượn này không?")) {
        return;
    }
    // Gửi yêu cầu xóa đến server
    $.ajax({
        url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP xử lý
        method: 'POST',
        data: { mapm_xoa: ma },
        dataType: 'json',
        success: function (data) {
            if (data.list_xoa_pmuon.length > 0) {
                $.each(data.list_xoa_pmuon, function (index, pmuon) {
                    if (pmuon.status === "success") {
                        alert(pmuon.message);
                        $(document).ready(function () {
                            reset_table_phieumuon();
                        });
                    } else {
                        alert(pmuon.message);
                    }
                }
                )
            }
        },
        error: function (xhr, status, error) {
            console.error('Lỗi:', error);
            console.log(xhr)
            alert("Đã xảy ra lỗi khi xóa phiếu mượn.");
        }
    });
}



function xuLyPhieuMuon(ma) {
    if (!confirm("Bạn có chắc chắn muốn xử lý phiếu mượn này không?")) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "../DAO/database/fetch_data.php", // Đường dẫn đến file PHP
        data: { ma_xuly_pm: ma },
        dataType: "json",
        success: function (data) {
            $.each(data.list_xuly_phieumuon, function (index, phieumuon) {
                if (phieumuon.status === 'success') {
                    $(document).ready(function () {
                        reset_table_phieumuon();
                    });
                    alert(phieumuon.message);
                } else {
                    alert(phieumuon.message);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('Lỗi:', error);
        }
    });
}