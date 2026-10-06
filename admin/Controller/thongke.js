// JavaScript xử lý chuyển tab
document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các tab buttons và nội dung tab
    const tabButtons_tk = document.querySelectorAll('.tab-button-tk');
    const tabPanes_tk = document.querySelectorAll('.tab-pane-tk');

    // Gán sự kiện click cho từng tab button
    tabButtons_tk.forEach(button => {
        button.addEventListener('click', function () {
            // Xóa class active khỏi tất cả các tab buttons và tab panes
            tabButtons_tk.forEach(btn => btn.classList.remove('active'));
            tabPanes_tk.forEach(pane => pane.classList.remove('active'));

            // Thêm class active cho tab được chọn
            this.classList.add('active');
            const targetTab = this.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btn_reset = document.querySelector('.btn-reset-thongke');

    const input_search = document.querySelector('.search-input-thongke');

    function resetInput() {
        select_thongke.selectedIndex = 0;

        input_thongke_tu_ngay_pn.value = '';
        input_thongke_den_ngay_pn.value = '';
        input_thongke_tu_ngay_pm.value = '';
        input_thongke_den_ngay_pm.value = '';
        input_thongke_tu_ngay_pt.value = '';
        input_thongke_den_ngay_pt.value = '';

        input_search.value = '';
    }

    btn_reset.addEventListener('click', () => {
        resetInput();

    });

    const btn_submit_pn = document.querySelector('.btn-tk_pn');

    btn_submit_pn.addEventListener('click', () => {
        const fromDate_pn = document.querySelector('.input_thongke_tu_ngay_pn').value;
        const toDate_pn = document.querySelector('.input_thongke_den_ngay_pn').value;
        console.log('From Date:', fromDate_pn);
        console.log('To Date:', toDate_pn);
    
        if (fromDate_pn && toDate_pn) {
            // Gửi yêu cầu AJAX đến server với các tham số ngày
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                data: {
                    fromDate_pn: fromDate_pn,
                    toDate_pn: toDate_pn
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data); // In dữ liệu trả về từ server để kiểm tra
    
                    // Làm mới nội dung bảng
                    $('.table-phieu_nhap-tk tbody').empty(); // Xóa các dòng cũ trong bảng
    
                    // Khai báo biến để tính tổng tiền
                    let totalMoney = 0;
                    let totalRecords = 0;
                    let averageRecord =0;
    
                    // Hiển thị dữ liệu mới từ server
                    $.each(data.list_phieunhap, function (index, phieunhap) {
                        $('.table-phieu_nhap-tk tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + phieunhap.mapn + '</td>' +
                            '<td>' + phieunhap.mancc + '-' + phieunhap.ten + '</td>' +
                            '<td>' + phieunhap.manv + '</td>' +
                            '<td>' + phieunhap.ngaynhap + '</td>' +
                            '<td>' + phieunhap.tongtien + '</td>' +
                            '</tr>'
                        );
    
                        // Cộng tổng tiền
                        totalMoney += parseFloat(phieunhap.tongtien);
                        totalRecords++;
                    });
                    averageRecord = totalRecords > 0 ? totalMoney / totalRecords : 0;
                    $('#average-records-pn').text(averageRecord.toFixed(2))
                    $('#total-money-pn').text(totalMoney.toFixed(0));
                    $('#total-records-pn').text(totalRecords);
                },
                error: function(xhr, status, error) {
                    console.log("Error: " + error);
                }
            });
        } else {
            alert("Vui lòng chọn đầy đủ phạm vi ngày.");
        }
    });

    const btn_submit_pm = document.querySelector('.btn-tk_pm');

    btn_submit_pm.addEventListener('click', () => {
        const fromDate_pm = document.querySelector('.input_thongke_tu_ngay_pm').value;
        const toDate_pm = document.querySelector('.input_thongke_den_ngay_pm').value;
        
        console.log(fromDate_pm);
        console.log(toDate_pm);
        
        if (fromDate_pm && toDate_pm) {
            // Gửi yêu cầu AJAX đến server với các tham số ngày
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                data: {
                    fromDate_pm: fromDate_pm,
                    toDate_pm: toDate_pm
                },
                dataType: 'json',
                success: function (data) {
                    // Làm mới nội dung bảng
                    $('.table-phieu_muon-tk tbody').empty(); // Xóa các dòng cũ trong bảng

                    let totalFee = 0;
                    let recordCount = 0;
                    let averageRecord = 0;

                    // Hiển thị dữ liệu mới từ server
                    $.each(data.list_phieumuon, function (index, phieumuon) {
                        $('.table-phieu_muon-tk tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + phieumuon.mapm + '</td>' +
                            '<td>' + phieumuon.ngaymuon + '</td>' +
                            '<td>' + phieumuon.hantra + '</td>' +
                            '<td>' + phieumuon.madg + '</td>' +
                            '<td>' + phieumuon.manv + '</td>' +
                            '<td>' + phieumuon.tongphimuon + '</td>' +
                            '</tr>'
                        );
                        
                        // Tính tổng phí mượn và số lượng bản ghi
                        totalFee += parseFloat(phieumuon.tongphimuon) || 0;
                        recordCount++;
                    });
                    averageRecord = recordCount > 0 ? totalFee / recordCount : 0;
                    $('#average-records-pm').text(averageRecord.toFixed(2));
                    $('#total-fee').text(totalFee);
                    $('#total-records-pm').text(recordCount);
                }
            });
        } else {
            alert("Vui lòng chọn đầy đủ phạm vi ngày.");
        }
    });

    const btn_submit_pt = document.querySelector('.btn-tk_pt');

    btn_submit_pt.addEventListener('click', () => {
        const fromDate_pt = document.querySelector('.input_thongke_tu_ngay_pt').value;
        const toDate_pt = document.querySelector('.input_thongke_den_ngay_pt').value;

        if (fromDate_pt && toDate_pt) {
            // Gửi yêu cầu AJAX đến server
            $.ajax({
                url: '../DAO/database/fetch_data.php', // Đường dẫn đến file PHP
                method: 'GET',
                data: {
                    fromDate_pt: fromDate_pt,
                    toDate_pt: toDate_pt
                },
                dataType: 'json',
                success: function (data) {
                    // Làm mới nội dung bảng
                    $('.table-phieu_tra-tk tbody').empty();

                    // Hiển thị dữ liệu mới từ server
                    let totalFee = 0;
                    let recordCount = 0;
                    let averageRecord = 0;
                    $.each(data.list_phieutra, function (index, phieutra) {
                        $('.table-phieu_tra-tk tbody').append(
                            '<tr>' +
                            '<td>' + (index + 1) + '</td>' +
                            '<td>' + phieutra.mapt + '</td>' +
                            '<td>' + phieutra.ngaytra + '</td>' +
                            '<td>' + phieutra.mapm + '</td>' +
                            '<td>' + phieutra.madg + '</td>' +
                            '<td>' + phieutra.manv + '</td>' +
                            '<td>' + phieutra.tongphiphat + '</td>' +
                            '</tr>'
                        );
                        totalFee += parseFloat(phieutra.tongphiphat);
                        recordCount++;
                    });
                    averageRecord = recordCount > 0 ? totalFee / recordCount : 0;
                    $('#average-records-pt').text(averageRecord.toFixed(2));
                    $('#total-fee-pt').text(totalFee);
                    $('#total-records-pt').text(recordCount);
                }
            });
        } else {
            alert("Vui lòng chọn đầy đủ phạm vi ngày.");
        }
    });

});