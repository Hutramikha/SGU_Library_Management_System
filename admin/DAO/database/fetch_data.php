<?php 
require './connect.php';
session_start();

// ================================================ HÀM  ============================================================ 


function generateRandomBarcode($length = 8) {
    $digits = '0123456789';
    $barcode = '';

    for ($i = 0; $i < $length; $i++) {
        $barcode .= $digits[rand(0, strlen($digits) - 1)];
    }

    return $barcode;
}

// Hàm random cho tạo tài khoản
function random_string($length, $type) {
    if ($type == 'numbers') {
        $chars = '0123456789';
    } elseif ($type == 'lowercase') {
        $chars = 'abcdefghijklmnopqrstuvwxyz';
    } elseif ($type == 'uppercase') {
        $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    } elseif ($type == 'special') {
        $chars = '@#$%&*!';
    } else {
        return '';
    }

    $result = '';
    for ($i = 0; $i < $length; $i++) {
        $result .= $chars[rand(0, strlen($chars) - 1)];
    }
    return $result;
}

// Hàm tạo tài khoản
function capTaikhoan($manv, $connect, &$list_tao_taikhoan_nv) {
    // Tạo tên đăng nhập
    $tendangnhap = 'ttda' . random_string(4, 'numbers');

    // Tạo mật khẩu
    $matkhau = random_string(5, 'numbers') . random_string(1, 'lowercase') . random_string(1, 'uppercase') . random_string(1, 'special');

    // Maquyen là 1
    $maquyen = 1;

    // Ngày tạo
    $ngaytao = date('Y-m-d');

    // Chèn dữ liệu vào bảng taikhoan
    $stmt = $connect->prepare("INSERT INTO taikhoan (tendangnhap, matkhau, maquyen, ngaytao, trangthai) VALUES (?, ?, ?, ?, ?)");
    $trangthai = 0;
    $stmt->bind_param("ssisi", $tendangnhap, $matkhau, $maquyen, $ngaytao, $trangthai);

    if ($stmt->execute()) {
        // Cập nhật matk trong bảng nhanvien
        $stmt2 = $connect->prepare("UPDATE nhanvien SET matk = ? WHERE manv = ?");
        $stmt2->bind_param("si", $tendangnhap, $manv);
        $stmt2->execute();
        $stmt2->close();
        
        $list_tao_taikhoan_nv[] = array(
            "status" => "success",
            "message" => "Tài khoản đã được tạo thành công: $tendangnhap"
        );
    } else {
        $list_tao_taikhoan_nv[] = array(
            "status" => "error",
            "message" => "Lỗi: " . $stmt->error
        );
    }
}


// ================================================ Fetch Data ============================================================ 
// Sách
$sql_sach = 'SELECT * FROM sach';
$result_sach = $connect->query($sql_sach);

$list_sach = array();

if ($result_sach->num_rows > 0) {
    while ($row = $result_sach->fetch_assoc()) {
        $list_sach[] = $row;
    }
}

//  độc giả
$sql_dg = 'SELECT *
            FROM docgia
            LEFT JOIN loaidocgia ON docgia.maloaidocgia = loaidocgia.maloaidocgia;';
$result_dg = $connect->query($sql_dg);

$list_docgia = array();

if ($result_dg->num_rows > 0) {
    while ($row = $result_dg->fetch_assoc()) {
        $list_docgia[] = $row;
    }
}

//  nhân viên
$sql_nv = 'SELECT * FROM nhanvien';
$result_nv = $connect->query($sql_nv);

$list_nhanvien = array();

if ($result_nv->num_rows > 0) {
    while ($row = $result_nv->fetch_assoc()) {
        $list_nhanvien[] = $row;
    }
}

// tài khoản nhân viên
$sql_tk_nv = 'SELECT *
              FROM taikhoan tk
              JOIN nhanvien nv ON tk.tendangnhap = nv.matk;';
$result_tk_nv = $connect->query($sql_tk_nv);

$list_taikhoan_nhanvien = array();

if ($result_tk_nv->num_rows > 0) {
    while ($row = $result_tk_nv->fetch_assoc()) {
        $list_taikhoan_nhanvien[] = $row;
    }
}

// tài khoản độc giả
$sql_tk_dg = 'SELECT *
              FROM taikhoan tk
              JOIN docgia dg ON tk.tendangnhap = dg.matk;';
$result_tk_dg = $connect->query($sql_tk_dg);

$list_taikhoan_docgia = array();

if ($result_tk_dg->num_rows > 0) {
    while ($row = $result_tk_dg->fetch_assoc()) {
        $list_taikhoan_docgia[] = $row;
    }
}

// Thể loại
$sql_tl = 'SELECT * FROM theloai';
$result_tl = $connect->query($sql_tl);

$list_theloai = array();

if ($result_tl->num_rows > 0) {
    while ($row = $result_tl->fetch_assoc()) {
        $list_theloai[] = $row;
    }
}

// Nhà xuất bản
$sql_nxb = 'SELECT * FROM nhaxuatban';
$result_nxb = $connect->query($sql_nxb);

$list_nhaxuatban = array();

if ($result_nxb->num_rows > 0) {
    while ($row = $result_nxb->fetch_assoc()) {
        $list_nhaxuatban[] = $row;
    }
}

// Tác giả
$sql_tg = 'SELECT * FROM tacgia';
$result_tg = $connect->query($sql_tg);

$list_tacgia = array();

if ($result_tg->num_rows > 0) {
    while ($row = $result_tg->fetch_assoc()) {
        $list_tacgia[] = $row;
    }
}

// Tình trạng sách
$sql_tts = 'SELECT * FROM tinhtrangsach';
$result_tts = $connect->query($sql_tts);

$list_tinhtrangsach = array();

if ($result_tts->num_rows > 0) {
    while ($row = $result_tts->fetch_assoc()) {
        $list_tinhtrangsach[] = $row;
    }
}

// Loại độc giả
$sql_ldg = 'SELECT * FROM loaidocgia';
$result_ldg = $connect->query($sql_ldg);

$list_loaidocgia = array();

if ($result_ldg->num_rows > 0) {
    while ($row = $result_ldg->fetch_assoc()) {
        $list_loaidocgia[] = $row;
    }
}

// Hình thức phạt
$sql_htp = 'SELECT * FROM hinhthucphat';
$result_htp = $connect->query($sql_htp);

$list_hinhthucphat = array();

if ($result_htp->num_rows > 0) {
    while ($row = $result_htp->fetch_assoc()) {
        $list_hinhthucphat[] = $row;
    }
}

// Nhà cung cấp
$sql_ncc = 'SELECT * FROM nhacungcap';
$result_ncc = $connect->query($sql_ncc);

$list_nhacungcap = array();

if ($result_ncc->num_rows > 0) {
    while ($row = $result_ncc->fetch_assoc()) {
        $list_nhacungcap[] = $row;
    }
}

// Phiếu nhập
$sql_pn = 'SELECT *
            FROM phieunhap pn
            LEFT JOIN nhacungcap ncc ON pn.mancc = ncc.mancc;';
$result_pn = $connect->query($sql_pn);

$list_phieunhap = array();

if ($result_pn->num_rows > 0) {
    while ($row = $result_pn->fetch_assoc()) {
        $list_phieunhap[] = $row;
    }
}

// Phiếu nhập từ ngày tới ngày
$fromDate_pn = $_GET['fromDate_pn'] ?? '';
$toDate_pn = $_GET['toDate_pn'] ?? '';
$sql_pn1 = "SELECT *
            FROM phieunhap pn
            LEFT JOIN nhacungcap ncc ON pn.mancc = ncc.mancc";

if (!empty($fromDate_pn) && !empty($toDate_pn)) {
    $sql_pn1 .= " WHERE pn.ngaynhap BETWEEN '$fromDate_pn' AND '$toDate_pn'";
}
$result_pn1 = $connect->query($sql_pn1);
$list_phieunhap = array();
if ($result_pn1->num_rows > 0) {
    while ($row = $result_pn1->fetch_assoc()) {
        $list_phieunhap[] = $row;
    }
}

// Phiếu mượn
$sql_pm = 'SELECT * , dg.ten AS ten_docgia, nv.ten AS ten_nhanvien
        FROM phieumuon pm
        LEFT JOIN docgia dg ON pm.madg = dg.madg
        LEFT JOIN nhanvien nv ON pm.manv = nv.manv;';
$result_pm = $connect->query($sql_pm);

$list_phieumuon = array();

if ($result_pm->num_rows > 0) {
    while ($row = $result_pm->fetch_assoc()) {
        $list_phieumuon[] = $row;
    }
}

// Phiếu mượn từ ngày tới ngày
$fromDate_pm = $_GET['fromDate_pm'] ?? '';
$toDate_pm = $_GET['toDate_pm'] ?? '';

$sql_pm1 = "SELECT *, dg.ten AS ten_docgia, nv.ten AS ten_nhanvien
           FROM phieumuon pm
           LEFT JOIN docgia dg ON pm.madg = dg.madg
           LEFT JOIN nhanvien nv ON pm.manv = nv.manv";

if (!empty($fromDate_pm) && !empty($toDate_pm)) {
    $sql_pm1 .= " WHERE pm.ngaymuon BETWEEN '$fromDate_pm' AND '$toDate_pm'";
}

$result_pm1 = $connect->query($sql_pm1);

$list_phieumuon = array();

if ($result_pm1->num_rows > 0) {
    while ($row = $result_pm1->fetch_assoc()) {
        $list_phieumuon[] = $row;
    }
}

// Phiếu trả
$sql_pt = 'SELECT * , dg.ten AS ten_docgia, nv.ten AS ten_nhanvien
        FROM phieutra pt
        LEFT JOIN docgia dg ON pt.madg = dg.madg
        LEFT JOIN nhanvien nv ON pt.manv = nv.manv;';
$result_pt = $connect->query($sql_pt);

$list_phieutra = array();

if ($result_pt->num_rows > 0) {
    while ($row = $result_pt->fetch_assoc()) {
        $list_phieutra[] = $row;
    }
}

// Phiếu trả từ ngày tới ngày
$fromDate_pt = $_GET['fromDate_pt'] ?? '';
$toDate_pt = $_GET['toDate_pt'] ?? '';

$sql_pt1 = "SELECT pt.*, dg.ten AS ten_docgia, nv.ten AS ten_nhanvien
           FROM phieutra pt
           LEFT JOIN docgia dg ON pt.madg = dg.madg
           LEFT JOIN nhanvien nv ON pt.manv = nv.manv";

if (!empty($fromDate_pt) && !empty($toDate_pt)) {
    $sql_pt1 .= " WHERE pt.ngaytra BETWEEN '$fromDate_pt' AND '$toDate_pt'";
}

$result_pt1 = $connect->query($sql_pt1);

$list_phieutra = array();

if ($result_pt1->num_rows > 0) {
    while ($row = $result_pt1->fetch_assoc()) {
        $list_phieutra[] = $row;
    }
}

// Quyền
$sql_quyen = 'SELECT * FROM quyen';
$result_quyen = $connect->query($sql_quyen);

$list_quyen = array();

if ($result_quyen->num_rows > 0) {
    while ($row = $result_quyen->fetch_assoc()) {
        $list_quyen[] = $row;
    }
}

// Chức năng
$sql_chucnang = 'SELECT * FROM chucnang';
$result_chucnang = $connect->query($sql_chucnang);

$list_chucnang = array();

if ($result_chucnang->num_rows > 0) {
    while ($row = $result_chucnang->fetch_assoc()) {
        $list_chucnang[] = $row;
    }
}

// ======================================================== Fetch có Điều kiện ====================================================================

//  nhân viên ko tài khoản
$sql_nv_ko_tk = 'SELECT *
                FROM nhanvien
                WHERE matk IS NULL;';
$result_nv_ko_tk = $connect->query($sql_nv_ko_tk);

$list_nhanvien_ko_tk = array();

if ($result_nv_ko_tk->num_rows > 0) {
    while ($row = $result_nv_ko_tk->fetch_assoc()) {
        $list_nhanvien_ko_tk[] = $row;
    }
}

//  chi tiết sách đã mượn
$sql_chitiet_sach_da_muon = 'SELECT * , dg.ten AS ten_docgia, nv.ten AS ten_nhanvien
                            FROM chitietsach cs
                            JOIN chitietphieumuon cpm ON cs.mavach = cpm.mavach
                            JOIN phieumuon pm ON cpm.mapm = pm.mapm
                            JOIN docgia dg ON pm.madg = dg.madg
                            JOIN nhanvien nv ON pm.manv = nv.manv
                            WHERE cs.trangthai = 1;';
$result_chitiet_sach_da_muon = $connect->query($sql_chitiet_sach_da_muon);

$list_chitiet_sach_da_muon = array();

if ($result_chitiet_sach_da_muon->num_rows > 0) {
    while ($row = $result_chitiet_sach_da_muon->fetch_assoc()) {
        $list_chitiet_sach_da_muon[] = $row;
    }
}

//  chi tiết sách (chưa sắp xếp)
$list_chitiet_sach_xem = array();
if(isset($_POST['masach_xemchitiet'])) {
$masach_xemchitiet = $_POST['masach_xemchitiet'];

$stmt = $connect->prepare("SELECT * FROM chitietsach WHERE masach = ?");
$stmt->bind_param("i", $masach_xemchitiet); // 'i' cho kiểu integer
$stmt->execute();
$result_masach_xemchitiet = $stmt->get_result();

if ($result_masach_xemchitiet->num_rows > 0) {
    while ($row = $result_masach_xemchitiet->fetch_assoc()) {
        $list_chitiet_sach_xem[] = $row;
    }
}
}

//  chi tiết phiếu nhập
$list_chitiet_phieu_nhap_xem = array();
if(isset($_POST['ma_phieu_nhap'])) {
$ma_phieu_nhap = $_POST['ma_phieu_nhap'];

$stmt = $connect->prepare("SELECT * FROM chitietphieunhap WHERE mapn = ?");
$stmt->bind_param("i", $ma_phieu_nhap); // 'i' cho kiểu integer
$stmt->execute();
$result_ma_phieu_nhap = $stmt->get_result();

if ($result_ma_phieu_nhap->num_rows > 0) {
    while ($row = $result_ma_phieu_nhap->fetch_assoc()) {
        $list_chitiet_phieu_nhap_xem[] = $row;
    }
}
}

//  chi tiết phiếu mượn
$list_chitiet_phieu_muon_xem = array();
if(isset($_POST['ma_phieu_muon'])) {
$ma_phieu_muon = $_POST['ma_phieu_muon'];

$stmt = $connect->prepare("SELECT * FROM chitietphieumuon WHERE mapm = ?");
$stmt->bind_param("i", $ma_phieu_muon); // 'i' cho kiểu integer
$stmt->execute();
$result_ma_phieu_muon = $stmt->get_result();

if ($result_ma_phieu_muon->num_rows > 0) {
    while ($row = $result_ma_phieu_muon->fetch_assoc()) {
        $list_chitiet_phieu_muon_xem[] = $row;
    }
}
}

//  chi tiết phiếu trả
$list_chitiet_phieu_tra_xem = array();
if(isset($_POST['ma_phieu_tra'])) {
$ma_phieu_tra = $_POST['ma_phieu_tra'];

$stmt = $connect->prepare("SELECT * FROM chitietphieutra WHERE mapt = ?");
$stmt->bind_param("i", $ma_phieu_tra); // 'i' cho kiểu integer
$stmt->execute();
$result_ma_phieu_tra = $stmt->get_result();

if ($result_ma_phieu_tra->num_rows > 0) {
    while ($row = $result_ma_phieu_tra->fetch_assoc()) {
        $list_chitiet_phieu_tra_xem[] = $row;
    }
}
}

// ======================================================== Fetch cho tìm kiếm ====================================================================

// =========================== Tìm kiếm Sách ===>
$search_sach = isset($_GET['search_sach']) ? $_GET['search_sach'] : '';

if (is_numeric($search_sach)) {
    // Nếu là số, sử dụng truy vấn tìm kiếm chính xác
    $sql_timkiem_sach = "SELECT * FROM sach WHERE masach = ?"; // So sánh chính xác
    $stmt = $connect->prepare($sql_timkiem_sach);
    $stmt->bind_param('i', $search_sach); // 'i' cho kiểu integer
} else {
    // Nếu không phải là số, sử dụng LIKE cho chuỗi
    $sql_timkiem_sach = "SELECT * FROM sach WHERE tensach LIKE ?"; // Tìm kiếm theo tên sách
    $stmt = $connect->prepare($sql_timkiem_sach);
    $search_sach_param = "%$search_sach%";
    $stmt->bind_param('s', $search_sach_param); // 's' cho kiểu string
}
$stmt->execute();
$result_timkiem_sach = $stmt->get_result();

$list_timkiem_sach = array();

if ($result_timkiem_sach->num_rows > 0) {
    while ($row = $result_timkiem_sach->fetch_assoc()) {
        $list_timkiem_sach[] = $row;
    }
}


// =========================== Tìm kiếm nhân viên ===>
$search_nhanvien = isset($_GET['search_nhanvien']) ? $_GET['search_nhanvien'] : '';

if (is_numeric($search_nhanvien)) {
    // Nếu là số, tìm kiếm theo manv
    $sql_timkiem_nhanvien = "SELECT * FROM nhanvien WHERE manv = ?";
    $stmt = $connect->prepare($sql_timkiem_nhanvien);
    $stmt->bind_param('i', $search_nhanvien); // 'i' cho integer
} else {
    // Nếu không phải là số, tìm kiếm theo matk và ten
    $sql_timkiem_nhanvien = "SELECT * FROM nhanvien WHERE matk LIKE ? OR ten LIKE ?";
    $stmt = $connect->prepare($sql_timkiem_nhanvien);
    $search_nhanvien_param = "%$search_nhanvien%"; // Thêm % cho chuỗi
    $stmt->bind_param('ss', $search_nhanvien_param, $search_nhanvien_param); // 'ss' cho string
}

$stmt->execute();
$result_timkiem_nhanvien = $stmt->get_result();

$list_timkiem_nhanvien = array();

if ($result_timkiem_nhanvien->num_rows > 0) {
    while ($row = $result_timkiem_nhanvien->fetch_assoc()) {
        $list_timkiem_nhanvien[] = $row;
    }
}

// =========================== Tìm kiếm quyền ===>
$list_timkiem_quyen = array();

if (isset($_GET['search_quyen'])) {
    $search_quyen = $_GET['search_quyen'];

    if (is_numeric($search_quyen)) {
        // Nếu là số, tìm kiếm theo mã quyền (maquyen)
        $sql_timkiem_quyen = "SELECT * FROM quyen WHERE maquyen = ?";
        $stmt = $connect->prepare($sql_timkiem_quyen);
        $stmt->bind_param('i', $search_quyen); // 'i' cho integer
    } else {
        // Nếu không phải là số, tìm kiếm theo tên quyền (tenquyen)
        $sql_timkiem_quyen = "SELECT * FROM quyen WHERE tenquyen LIKE ?";
        $stmt = $connect->prepare($sql_timkiem_quyen);
        $search_quyen_param = "%$search_quyen%"; // Thêm % cho chuỗi
        $stmt->bind_param('s', $search_quyen_param); // 's' cho string
    }

    // Thực thi câu lệnh và xử lý kết quả
    $stmt->execute();
    $result_timkiem_quyen = $stmt->get_result();

    if ($result_timkiem_quyen->num_rows > 0) {
        while ($row = $result_timkiem_quyen->fetch_assoc()) {
            $list_timkiem_quyen[] = $row;
        }
    }
}

// =========================== Tìm kiếm độc giả ===>
$search_docgia = isset($_GET['search_docgia']) ? $_GET['search_docgia'] : '';

if (is_numeric($search_docgia)) {
    // Nếu là số, tìm kiếm theo madg
    $sql_timkiem_docgia = "SELECT docgia.*, loaidocgia.tenloaidocgia 
                            FROM docgia 
                            LEFT JOIN loaidocgia ON docgia.maloaidocgia = loaidocgia.maloaidocgia 
                            WHERE docgia.madg = ?";
    $stmt = $connect->prepare($sql_timkiem_docgia);
    $stmt->bind_param('i', $search_docgia); // 'i' cho integer
} else {
    // Nếu không phải là số, tìm kiếm theo matk và ten
    $sql_timkiem_docgia = "SELECT docgia.*, loaidocgia.tenloaidocgia 
                            FROM docgia 
                            LEFT JOIN loaidocgia ON docgia.maloaidocgia = loaidocgia.maloaidocgia 
                            WHERE docgia.matk LIKE ? OR docgia.ten LIKE ?";
    $stmt = $connect->prepare($sql_timkiem_docgia);
    $search_docgia_param = "%$search_docgia%"; // Thêm % cho chuỗi
    $stmt->bind_param('ss', $search_docgia_param, $search_docgia_param); // 'ss' cho string
}

$stmt->execute();
$result_timkiem_docgia = $stmt->get_result();

$list_timkiem_docgia = array();

if ($result_timkiem_docgia->num_rows > 0) {
    while ($row = $result_timkiem_docgia->fetch_assoc()) {
        $list_timkiem_docgia[] = $row;
    }
}

// =========================== Tìm kiếm Phiếu nhập ===>
$search_phieunhap = isset($_GET['search_phieunhap']) ? $_GET['search_phieunhap'] : '';

$sql_timkiem_phieunhap = "SELECT *
                          FROM phieunhap pn
                          LEFT JOIN nhacungcap ncc ON pn.mancc = ncc.mancc
                          WHERE pn.mapn LIKE ? OR ncc.mancc LIKE ?";

$stmt = $connect->prepare($sql_timkiem_phieunhap);

// Thay đổi kiểu tham số từ 'ii' thành 'ss' vì chúng ta đang sử dụng chuỗi
$search_phieunhap_param = "%$search_phieunhap%";
$stmt->bind_param('ss', $search_phieunhap_param, $search_phieunhap_param); // 'ss' cho chuỗi
$stmt->execute();
$result_timkiem_phieunhap = $stmt->get_result();

$list_timkiem_phieunhap = array();

if ($result_timkiem_phieunhap->num_rows > 0) {
    while ($row = $result_timkiem_phieunhap->fetch_assoc()) {
        $list_timkiem_phieunhap[] = $row;
    }
}

// =========================== Tìm kiếm Phiếu mượn ===>
$search_phieumuon = isset($_GET['search_phieumuon']) ? $_GET['search_phieumuon'] : '';

if (is_numeric($search_phieumuon)) {
    $sql_timkiem_pm = "SELECT *, dg.ten AS ten_docgia, nv.ten AS ten_nhanvien
                       FROM phieumuon pm
                       LEFT JOIN docgia dg ON pm.madg = dg.madg
                       LEFT JOIN nhanvien nv ON pm.manv = nv.manv
                      WHERE pm.mapm = ? OR dg.madg = ? OR nv.manv = ?";
    $stmt = $connect->prepare($sql_timkiem_pm);
    $stmt->bind_param('iii',$search_phieumuon,$search_phieumuon,$search_phieumuon);
} else {
    $sql_timkiem_pm = "SELECT *, dg.ten AS ten_docgia, nv.ten AS ten_nhanvien
                       FROM phieumuon pm
                       LEFT JOIN docgia dg ON pm.madg = dg.madg
                       LEFT JOIN nhanvien nv ON pm.manv = nv.manv
                       WHERE dg.ten LIKE ? OR nv.ten LIKE ?";
    $stmt = $connect->prepare($sql_timkiem_pm);
    $search_phieumuon_param = "%$search_phieumuon%";
    $stmt->bind_param('ss',$search_phieumuon_param,$search_phieumuon_param);
}

$stmt->execute();
$result_timkiem_phieumuon = $stmt->get_result();

$list_timkiem_phieumuon = array();

if ($result_timkiem_phieumuon->num_rows > 0) {
    while ($row = $result_timkiem_phieumuon->fetch_assoc()) {
        $list_timkiem_phieumuon[] = $row;
    }
}

// =========================== Tìm kiếm Phiếu trả ===>
// Tìm kiếm phiếu trả
$search_phieutra = isset($_GET['search_phieutra']) ? $_GET['search_phieutra'] : '';

if (is_numeric($search_phieutra)) {
    // Tìm kiếm theo mã phiếu trả, mã độc giả, hoặc mã nhân viên
    $sql_timkiem_pt = "SELECT *, dg.ten AS ten_docgia, nv.ten AS ten_nhanvien
                       FROM phieutra pt
                       LEFT JOIN docgia dg ON pt.madg = dg.madg
                       LEFT JOIN nhanvien nv ON pt.manv = nv.manv
                       WHERE pt.mapt = ? OR pt.madg = ? OR pt.manv = ?";
    
    $stmt = $connect->prepare($sql_timkiem_pt);
    $stmt->bind_param('iii', $search_phieutra, $search_phieutra, $search_phieutra);
} else {
    // Tìm kiếm theo tên độc giả hoặc tên nhân viên
    $sql_timkiem_pt = "SELECT *, dg.ten AS ten_docgia, nv.ten AS ten_nhanvien
                       FROM phieutra pt
                       LEFT JOIN docgia dg ON pt.madg = dg.madg
                       LEFT JOIN nhanvien nv ON pt.manv = nv.manv
                       WHERE dg.ten LIKE ? OR nv.ten LIKE ?";
    
    $stmt = $connect->prepare($sql_timkiem_pt);
    $search_phieutra_param = "%$search_phieutra%";
    $stmt->bind_param('ss', $search_phieutra_param, $search_phieutra_param);
}

$stmt->execute();
$result_timkiem_phieutra = $stmt->get_result();

$list_timkiem_phieutra = array();

if ($result_timkiem_phieutra->num_rows > 0) {
    while ($row = $result_timkiem_phieutra->fetch_assoc()) {
        $list_timkiem_phieutra[] = $row;
    }
}

//========================= Tìm kiếm chi tiết sách đã mượn ========>
$search_ct_sach_damuon = isset($_GET['search_phieutra']) ? $_GET['search_phieutra'] : '';

if (is_numeric($search_ct_sach_damuon)) {
    // Tìm kiếm theo mã vạch, mã phiếu mượn hoặc mã độc giả
    $sql_timkiem_chitiet_sach_da_muon = "SELECT *, dg.ten AS ten_docgia, nv.ten AS ten_nhanvien
                                          FROM chitietsach cs
                                          JOIN chitietphieumuon cpm ON cs.mavach = cpm.mavach
                                          JOIN phieumuon pm ON cpm.mapm = pm.mapm
                                          JOIN docgia dg ON pm.madg = dg.madg
                                          JOIN nhanvien nv ON pm.manv = nv.manv
                                          WHERE cs.trangthai = 1 
                                          AND (cs.mavach = ? OR pm.mapm = ? OR pm.madg = ? OR pm.manv = ?)";
    
    $stmt = $connect->prepare($sql_timkiem_chitiet_sach_da_muon);
    $stmt->bind_param('iiii', $search_ct_sach_damuon, $search_ct_sach_damuon, $search_ct_sach_damuon, $search_ct_sach_damuon);
} else {
    // Tìm kiếm theo tên độc giả hoặc tên nhân viên
    $sql_timkiem_chitiet_sach_da_muon = "SELECT *, dg.ten AS ten_docgia, nv.ten AS ten_nhanvien
                                          FROM chitietsach cs
                                          JOIN chitietphieumuon cpm ON cs.mavach = cpm.mavach
                                          JOIN phieumuon pm ON cpm.mapm = pm.mapm
                                          JOIN docgia dg ON pm.madg = dg.madg
                                          JOIN nhanvien nv ON pm.manv = nv.manv
                                          WHERE cs.trangthai = 1 
                                          AND (dg.ten LIKE ? OR nv.ten LIKE ?)";
    
    $stmt = $connect->prepare($sql_timkiem_chitiet_sach_da_muon);
    $search_ct_sach_damuon_param = "%$search_ct_sach_damuon%"; // Thêm % cho chuỗi
    $stmt->bind_param('ss', $search_ct_sach_damuon_param, $search_ct_sach_damuon_param);
}

$stmt->execute();
$result_timkiem_ct_sach_damuon = $stmt->get_result();

$list_timkiem_ct_sach_da_muon = array();

if ($result_timkiem_ct_sach_damuon->num_rows > 0) {
    while ($row = $result_timkiem_ct_sach_damuon->fetch_assoc()) {
        $list_timkiem_ct_sach_da_muon[] = $row;
    }
}

// =========================== Tìm kiếm tài khoản ===>
// Tìm TK nhân viên
$search_tk_nhanvien = isset($_GET['search_tk']) ? $_GET['search_tk'] : '';

$sql_timkiem_tk_nhanvien = "SELECT *
              FROM taikhoan tk
              JOIN nhanvien nv ON tk.tendangnhap = nv.matk
              WHERE tk.tendangnhap LIKE ?";

$stmt = $connect->prepare($sql_timkiem_tk_nhanvien);

$search_tk_nhanvien_param = "%$search_tk_nhanvien%";
$stmt->bind_param('s', $search_tk_nhanvien_param);
$stmt->execute();
$result_timkiem_tk_nhanvien = $stmt->get_result();

$list_timkiem_tk_nhanvien = array();

if ($result_timkiem_tk_nhanvien->num_rows > 0) {
    while ($row = $result_timkiem_tk_nhanvien->fetch_assoc()) {
        $list_timkiem_tk_nhanvien[] = $row;
    }
}

// Tìm TK độc giả
$search_tk_docgia = isset($_GET['search_tk']) ? $_GET['search_tk'] : '';

$sql_timkiem_tk_docgia = "SELECT *
              FROM taikhoan tk
              JOIN docgia dg ON tk.tendangnhap = dg.matk
              WHERE tk.tendangnhap LIKE ?";

$stmt = $connect->prepare($sql_timkiem_tk_docgia);

$search_tk_docgia_param = "%$search_tk_docgia%";
$stmt->bind_param('s', $search_tk_docgia_param);
$stmt->execute();
$result_timkiem_tk_docgia = $stmt->get_result();

$list_timkiem_tk_docgia = array();

if ($result_timkiem_tk_docgia->num_rows > 0) {
    while ($row = $result_timkiem_tk_docgia->fetch_assoc()) {
        $list_timkiem_tk_docgia[] = $row;
    }
}

// ================================================= ADD ==============================================================

// Gọi hàm capTaikhoan nếu có manv được gửi : Tạo Tài Khoản nhân viên
$list_tao_taikhoan_nv = array();
if (isset($_POST['manvtaotk'])) {
    $manv = $_POST['manvtaotk'];
    capTaikhoan($manv, $connect, $list_tao_taikhoan_nv);
}

//==== Thêm sách ====>
$list_them_sach = array();
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'addSach') {
        // Lấy dữ liệu từ form
        $tensach = $_POST['tensach'];
        $matl = $_POST['matl'];
        $gianhap = $_POST['gianhap'];
        $tomtat = $_POST['tomtat'];
        $manxb = $_POST['manxb'];
        $matg = $_POST['matg'];
        $phimuon = $_POST['phimuon'];
        $soluong = 0;

        // Xử lý hình ảnh
        $image = null; // Khởi tạo biến hình ảnh
        if (isset($_FILES['img']['name'])) {
            $image = $_FILES['img']['name'];
            $uploadDir = "../../img/"; // Thư mục lưu trữ hình ảnh
            // $uploadDir2 = "img/"; // Thư mục lưu trữ hình ảnh
            $hinhanhpath = basename($_FILES['img']['name']);
            $uploadFile = $uploadDir . $hinhanhpath;
            // $uploadFile2 = $uploadDir2 . $hinhanhpath;

            move_uploaded_file($_FILES['img']['tmp_name'], $uploadFile);
            // move_uploaded_file($_FILES['img']['tmp_name'], $uploadFile2);    
        }
         
        // Chuẩn bị câu lệnh thêm sách
        $sql = "INSERT INTO sach (tensach, matl, gianhap, tomtat, manxb, matg, phimuon, soluong, img) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $connect->prepare($sql);
        if ($stmt === false) {
            die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
        }

        $stmt->bind_param("sissiisis", $tensach, $matl, $gianhap, $tomtat, $manxb, $matg, $phimuon, $soluong, $image);

        if ($stmt->execute()) {
            $list_them_sach[] = array(
                "status" => "success",
                "message" => "Thêm sách thành công!",
            );
        } else {
            $list_them_sach[] = array(
                "status" => "fail",
                "message" => "Lỗi: " . $stmt->error,
            );
        }
    }
}


//==== Thêm nhân viên ====>
$list_them_nhanvien = array();
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'addNhanVien') {
        // Lấy dữ liệu từ form
        $ten = $_POST['ten'];
        $gioitinh = $_POST['gioitinh'];
        $ngaysinh = $_POST['ngaysinh'];
        $email = $_POST['email'];
        $sdt = $_POST['sdt'];
        $diachi = $_POST['diachi'];
        
        // Xử lý hình ảnh
        $image = null; // Khởi tạo biến hình ảnh
        if (isset($_FILES['img']['name']) && $_FILES['img']['name'] != '') {
            $image = $_FILES['img']['name'];
            $uploadDir = "../../img/"; // Thư mục lưu trữ hình ảnh
            $hinhanhpath = basename($_FILES['img']['name']);
            $uploadFile = $uploadDir . $hinhanhpath;

            move_uploaded_file($_FILES['img']['tmp_name'], $uploadFile);  
        }

        // Chuẩn bị câu lệnh thêm nhân viên
        $sql = "INSERT INTO nhanvien (matk, ten, gioitinh, ngaysinh, email, sdt, diachi, img) 
                VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $connect->prepare($sql);
        if ($stmt === false) {
            die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
        }

        $stmt->bind_param("sssssss", $ten, $gioitinh, $ngaysinh, $email, $sdt, $diachi, $image);

        if ($stmt->execute()) {
            $list_them_nhanvien[] = array(
                "status" => "success",
                "message" => "Thêm nhân viên thành công!",
            );
        } else {
            $list_them_nhanvien[] = array(
                "status" => "fail",
                "message" => "Lỗi: " . $stmt->error,
            );
        }
    }
}

//=== Xử lý THÊM QUYỀN ===>
$list_them_quyen = array(); // Khởi tạo mảng kết quả

if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'addQuyen') {
        // Lấy dữ liệu từ form
        $maquyen = $_POST['maquyen'];
        $tenquyen = $_POST['tenquyen'];
        $mota = $_POST['mota'];

        // Kiểm tra nếu mã quyền đã tồn tại
        $check_sql = "SELECT * FROM quyen WHERE maquyen = ?";
        $check_stmt = $connect->prepare($check_sql);
        $check_stmt->bind_param("i", $maquyen);
        $check_stmt->execute();
        $result = $check_stmt->get_result();

        if ($result->num_rows > 0) {
            // Mã quyền đã tồn tại
            $list_them_quyen[] = array(
                "status" => "fail",
                "message" => "Mã quyền đã tồn tại!"
            );
        } else {
            // Câu lệnh INSERT để thêm quyền
            $sql = "INSERT INTO quyen (maquyen, tenquyen, mota) VALUES (?, ?, ?)";
            $stmt = $connect->prepare($sql);
            
            if ($stmt === false) {
                die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
            }

            // Gắn giá trị vào câu lệnh
            $stmt->bind_param("iss", $maquyen, $tenquyen, $mota);

            // Thực thi câu lệnh và trả kết quả
            if ($stmt->execute()) {
                $list_them_quyen[] = array(
                    "status" => "success",
                );
            } else {
                $list_them_quyen[] = array(
                    "status" => "fail",
                    "message" => "Lỗi: " . $stmt->error
                );
            }

            $sql_chitiet = "INSERT INTO chitietquyen (maquyen, machucnang, hanhdong, hoatdong) VALUES 
            (?, 1, 'Truy cập', true),
            (?, 1, 'Thêm, sửa, xóa', true),
            (?, 2, 'Truy cập', true),
            (?, 2, 'Thêm, sửa, xóa', true),
            (?, 3, 'Truy cập', true),
            (?, 3, 'Sửa, xóa', true),
            (?, 4, 'Truy cập', true),
            (?, 5, 'Truy cập', true),
            (?, 5, 'Thêm, sửa', true),
            (?, 6, 'Truy cập', true),
            (?, 6, 'Thêm, sửa', true),
            (?, 7, 'Truy cập', true),
            (?, 7, 'Sửa, xóa', true),
            (?, 8, 'Truy cập', true),
            (?, 8, 'Thêm, sửa, xóa', true),
            (?, 9, 'Truy cập', true)";

        $stmt_chitiet = $connect->prepare($sql_chitiet);

        $stmt_chitiet->bind_param("iiiiiiiiiiiiiiii", $maquyen, $maquyen, $maquyen, $maquyen, $maquyen, $maquyen, $maquyen, $maquyen, $maquyen, $maquyen, $maquyen, $maquyen, $maquyen, $maquyen, $maquyen, $maquyen);

        if ($stmt_chitiet->execute()) {
            $list_them_quyen[] = array(
                "status" => "success",
                "message" => "Thêm quyền và chi tiết quyền thành công!"
            );
        } else {
            $list_them_quyen[] = array(
                "status" => "error",
                "message" => "Thêm quyền thành công nhưng không thể thêm chi tiết quyền: " . $stmt_chitiet->error
            );
        }
        }
    } else {
        $list_them_quyen[] = array(
            "status" => "fail",
            "message" => "Hành động không hợp lệ!"
        );
    }
} else {
    $list_them_quyen[] = array(
        "status" => "fail",
        "message" => "Dữ liệu gửi lên không đầy đủ!"
    );
}

// ================================================ UPDATE ============================================================

$list_sua_maquyen_tk = array();
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'updateMaQuyentk') {
        // Lấy dữ liệu từ form
        $tendangnhap = $_POST['tendangnhap']; // Tên đăng nhập của tài khoản
        $maquyen_moi = $_POST['maquyen']; // Mã quyền mới

        // Chuẩn bị câu lệnh cập nhật mã quyền
        $sql_update = "UPDATE taikhoan SET maquyen = ? WHERE tendangnhap = ?";
        $stmt = $connect->prepare($sql_update);

        if ($stmt === false) {
            die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
        }

        // Bind các tham số
        $stmt->bind_param("is", $maquyen_moi, $tendangnhap); // "i" cho số nguyên, "s" cho chuỗi

        if ($stmt->execute()) {
            $list_sua_maquyen_tk[] = array(
                "status" => "success",
                "message" => "Cập nhật mã quyền thành công!"
            );
        } else {
            $list_sua_maquyen_tk[] = array(
                "status" => "error",
                "message" => "Lỗi khi cập nhật mã quyền: " . $stmt->error
            );
        }
    }
} else {
    $list_sua_maquyen_tk[] = array(
        "status" => "error",
        "message" => "Không có hành động nào được chỉ định."
    );
}


//==== Sửa sách ====>
$list_sua_sach = array();
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'updateSach') {
        // Lấy dữ liệu từ form
        $masach = $_POST['masach']; // Mã sách cần cập nhật
        $tensach = $_POST['tensach'];
        $matl = $_POST['matl'];
        $gianhap = $_POST['gianhap'];
        $tomtat = $_POST['tomtat'];
        $manxb = $_POST['manxb'];
        $matg = $_POST['matg'];
        $phimuon = $_POST['phimuon'];
        $soluong = $_POST['soluong'];

        // Xử lý hình ảnh
        $imageFile = null;
        if (isset($_FILES['img']['name']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
            $imageFile = $_FILES['img']['name'];
            $uploadDir = "../../img/"; // Thư mục lưu trữ hình ảnh
            $hinhanhpath = basename($_FILES['img']['name']);
            $image = $uploadDir . $hinhanhpath;

            // Di chuyển tệp hình ảnh
            if (!move_uploaded_file($_FILES['img']['tmp_name'], $image)) {
                $image = null; // Không cập nhật nếu không di chuyển được
            }
        }

        // Chuẩn bị câu lệnh cập nhật sách
        if ($imageFile != null) {
            $sql = "UPDATE sach SET tensach=?, matl=?, gianhap=?, tomtat=?, manxb=?, matg=?, phimuon=?, soluong=?, img=? WHERE masach=?";
        } else {
            $sql = "UPDATE sach SET tensach=?, matl=?, gianhap=?, tomtat=?, manxb=?, matg=?, phimuon=?, soluong=? WHERE masach=?";
        }

        $stmt = $connect->prepare($sql);
        if ($stmt === false) {
            die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
        }

        // Bind các tham số
        if ($imageFile != null) {
            $stmt->bind_param("sissiisisi", $tensach, $matl, $gianhap, $tomtat, $manxb, $matg, $phimuon, $soluong, $imageFile, $masach);
        } else {
            // Nếu không có hình ảnh mới, không cập nhật trường img
            $stmt->bind_param("sissiisii", $tensach, $matl, $gianhap, $tomtat, $manxb, $matg, $phimuon, $soluong, $masach);
        }

        if ($stmt->execute()) {
            $list_sua_sach[] = array(
                "status" => "success",
                "message" => "Cập nhật sách thành công!",
            );
        } else {
            $list_sua_sach[] = array(
                "status" => "fail",
                "message" => "Lỗi: " . $stmt->error,
            );
        }
    }
}


//==== Sửa nhân viên ====>
$list_sua_nv = array();
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'updateNhanVien') {
        // Lấy dữ liệu từ form
        $manv = $_POST['manv']; // Mã nhân viên cần cập nhật
        $ten = $_POST['ten'];
        $gioitinh = $_POST['gioitinh'];
        $ngaysinh = $_POST['ngaysinh'];
        $email = $_POST['email'];
        $sdt = $_POST['sdt'];
        $diachi = $_POST['diachi'];

        // Xử lý hình ảnh
        $imageFile = null;
        if (isset($_FILES['img']['name']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
            $imageFile = $_FILES['img']['name'];
            $uploadDir = "../../avatar/"; // Thư mục lưu trữ hình ảnh
            $hinhanhpath = basename($_FILES['img']['name']);
            $image = $uploadDir . $hinhanhpath;

            // Di chuyển tệp hình ảnh
            if (!move_uploaded_file($_FILES['img']['tmp_name'], $image)) {
                $image = null; // Không cập nhật nếu không di chuyển được
            }
        }

        // Chuẩn bị câu lệnh cập nhật nhân viên
        if ($imageFile != null) {
            $sql = "UPDATE nhanvien SET ten=?, gioitinh=?, ngaysinh=?, email=?, sdt=?, diachi=?, img=? WHERE manv=?";
        } else {
            $sql = "UPDATE nhanvien SET ten=?, gioitinh=?, ngaysinh=?, email=?, sdt=?, diachi=? WHERE manv=?";
        }

        $stmt = $connect->prepare($sql);
        if ($stmt === false) {
            die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
        }

        // Bind các tham số
        if ($imageFile != null) {
            $stmt->bind_param("sssssssi", $ten, $gioitinh, $ngaysinh, $email, $sdt, $diachi, $imageFile, $manv);
        } else {
            // Nếu không có hình ảnh mới, không cập nhật trường img
            $stmt->bind_param("ssssssi", $ten, $gioitinh, $ngaysinh, $email, $sdt, $diachi, $manv);
        }

        if ($stmt->execute()) {
            $list_sua_nv[] = array(
                "status" => "success",
                "message" => "Cập nhật nhân viên thành công!",
            );
        } else {
            $list_sua_nv[] = array(
                "status" => "fail",
                "message" => "Lỗi: " . $stmt->error,
            );
        }
    }
}

//=== Xử lý SỬA QUYỀN ===>
$list_sua_quyen = array(); // Khởi tạo mảng kết quả

if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'suaQuyen') {
        // Lấy dữ liệu từ form
        $maquyen = $_POST['maquyen']; // Mã quyền cần cập nhật
        $tenquyen = $_POST['tenquyen']; // Tên quyền mới
        $mota = $_POST['mota'];

        // Kiểm tra xem mã quyền có tồn tại trong cơ sở dữ liệu không
        $check_sql = "SELECT * FROM quyen WHERE maquyen = ?";
        $check_stmt = $connect->prepare($check_sql);
        $check_stmt->bind_param("i", $maquyen);
        $check_stmt->execute();
        $result = $check_stmt->get_result();

        if ($result->num_rows > 0) {
            // Câu lệnh UPDATE để sửa quyền
            $sql = "UPDATE quyen SET tenquyen = ?, mota = ? WHERE maquyen = ?";
            $stmt = $connect->prepare($sql);

            if ($stmt === false) {
                die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
            }

            // Gắn giá trị vào câu lệnh
            $stmt->bind_param("ssi", $tenquyen, $mota,  $maquyen);

            // Thực thi câu lệnh và trả kết quả
            if ($stmt->execute()) {
                $list_sua_quyen[] = array(
                    "status" => "success",
                    "message" => "Cập nhật quyền thành công!"
                );
            } else {
                $list_sua_quyen[] = array(
                    "status" => "fail",
                    "message" => "Lỗi: " . $stmt->error
                );
            }
        } else {
            // Mã quyền không tồn tại
            $list_sua_quyen[] = array(
                "status" => "fail",
                "message" => "Mã quyền không tồn tại!"
            );
        }
    } else {
        $list_sua_quyen[] = array(
            "status" => "fail",
            "message" => "Hành động không hợp lệ!"
        );
    }
} else {
    $list_sua_quyen[] = array(
        "status" => "fail",
        "message" => "Dữ liệu gửi lên không đầy đủ!"
    );
}

//==== Sửa độc giả ====>
$list_sua_dg = array();
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'updateDocGia') {
        // Lấy dữ liệu từ form
        $madg = intval($_POST['madg']); // Mã độc giả cần cập nhật
        $ten = trim($_POST['ten']);
        $gioitinh = trim($_POST['gioitinh']);
        $ngaysinh = trim($_POST['ngaysinh']);
        $sdt = trim($_POST['sdt']);
        $diachi = trim($_POST['diachi']);
        $email = trim($_POST['email']);
        $imageFileName = null;

        // Xử lý hình ảnh
        if (isset($_FILES['img']['name']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = "../../avatar/"; // Thư mục lưu trữ hình ảnh
            
            // Kiểm tra thư mục tồn tại
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            $imageFileName = basename($_FILES['img']['name']);
            $imagePath = $uploadDir . $imageFileName;

            // Di chuyển tệp hình ảnh
            if (!move_uploaded_file($_FILES['img']['tmp_name'], $imagePath)) {
                $imageFileName = null; // Không cập nhật nếu không di chuyển được
            }
        }

        // Chuẩn bị câu lệnh cập nhật độc giả
        if ($imageFileName != null) {
            $sql = "UPDATE docgia SET ten=?, gioitinh=?, ngaysinh=?, email=?, sdt=?, diachi=?, img=? WHERE madg=?";
            $stmt = $connect->prepare($sql);
            if ($stmt === false) {
                die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
            }
            // 7 string (ten, gioitinh, ngaysinh, email, sdt, diachi, img) + 1 integer (madg)
            $stmt->bind_param("sssssssi", $ten, $gioitinh, $ngaysinh, $email, $sdt, $diachi, $imageFileName, $madg);
        } else {
            $sql = "UPDATE docgia SET ten=?, gioitinh=?, ngaysinh=?, email=?, sdt=?, diachi=? WHERE madg=?";
            $stmt = $connect->prepare($sql);
            if ($stmt === false) {
                die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
            }
            // 6 string (ten, gioitinh, ngaysinh, email, sdt, diachi) + 1 integer (madg)
            $stmt->bind_param("ssssssi", $ten, $gioitinh, $ngaysinh, $email, $sdt, $diachi, $madg);
        }

        if ($stmt->execute()) {
            $connect->commit(); // Commit transaction
            $list_sua_dg[] = array(
                "status" => "success",
                "message" => "Cập nhật độc giả thành công!",
            );
        } else {
            $connect->rollback(); // Rollback nếu lỗi
            $list_sua_dg[] = array(
                "status" => "fail",
                "message" => "Lỗi: " . $stmt->error,
            );
        }
        $stmt->close();
    }
}



$list_sua_loaidocgia = array();
if (isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action == 'updateLoaiDocGia') {
        // Lấy dữ liệu từ form
        $madg = $_POST['madg']; // Mã độc giả cần cập nhật
        $maloaidocgia = $_POST['maloaidocgia']; // Mã loại độc giả mới

        // Chuẩn bị câu lệnh cập nhật loại độc giả
        $sql = "UPDATE docgia SET maloaidocgia=? WHERE madg=?";

        $stmt = $connect->prepare($sql);
        if ($stmt === false) {
            die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
        }

        // Bind các tham số
        $stmt->bind_param("ii", $maloaidocgia, $madg);

        if ($stmt->execute()) {
            $list_sua_loaidocgia[] = array(
                "status" => "success",
                "message" => "Cập nhật loại độc giả thành công!",
            );
        } else {
            $list_sua_loaidocgia[] = array(
                "status" => "fail",
                "message" => "Lỗi: " . $stmt->error,
            );
        }
    }
}


// Khóa : Mở tài khoản
if (isset($_POST['tendangnhap']) && isset($_POST['trangthai'])) {
    $tendangnhap = $_POST['tendangnhap'];
    $trangthai = $_POST['trangthai'];

    $stmt = $connect->prepare("UPDATE taikhoan SET trangthai = ? WHERE tendangnhap = ?");
    $stmt->bind_param("is", $trangthai, $tendangnhap);

    $list_open_close_taikhoan = array();

    if ($stmt->execute()) {
        $list_open_close_taikhoan[] = array(
            "status" => "success",
        );
    } else {
        $list_open_close_taikhoan[] = array(
            "status" => "error",
        );
    }
} else {
    $list_open_close_taikhoan[] = array(
        "status" => "error",
    );
}

// Xử lý phiếu mượn (cập nhật trạng thái)
if (isset($_POST['ma_xuly_pm'])) {
    $ma_xuly_pm = $_POST['ma_xuly_pm'];

    // Cập nhật trạng thái phiếu mượn
    $stmt = $connect->prepare("UPDATE phieumuon SET trangthai = 1 WHERE mapm = ?");
    $stmt->bind_param("i", $ma_xuly_pm);

    $list_xuly_phieumuon = array();

    if ($stmt->execute()) {
        // Truy xuất chi tiết phiếu mượn
        $stmt_details = $connect->prepare("SELECT mavach FROM chitietphieumuon WHERE mapm = ?");
        $stmt_details->bind_param("i", $ma_xuly_pm);
        $stmt_details->execute();
        $result_details = $stmt_details->get_result();

        // Cập nhật trạng thái cho từng chi tiết sách
        while ($row = $result_details->fetch_assoc()) {
            $mavach = $row['mavach'];

            // Cập nhật trạng thái chi tiết sách
            $stmt_update = $connect->prepare("UPDATE chitietsach SET trangthai = 1 WHERE mavach = ?");
            $stmt_update->bind_param("i", $mavach);

            if (!$stmt_update->execute()) {
                $list_xuly_phieumuon[] = array(
                    "status" => "error",
                    "message" => "Không thể cập nhật trạng thái cho mã vạch: " . $mavach,
                );
            }
        }

        $list_xuly_phieumuon[] = array(
            "status" => "success",
            "message" => "Cập nhật phiếu mượn thành công và trạng thái sách đã được cập nhật."
        );
    } else {
        $list_xuly_phieumuon[] = array(
            "status" => "error",
            "message" => "Không thể cập nhật phiếu mượn."
        );
    }
} else {
    $list_xuly_phieumuon[] = array(
        "status" => "error",
        "message" => "Không có mã phiếu mượn được gửi."
    );
}

// ================================================ DELETE ===========================================================

//==== Xóa phiếu mượn chưa đc xử lý ===>
$list_xoa_pmuon = array();
if (isset($_POST['mapm_xoa'])) {
$mapm = $_POST['mapm_xoa'];
$stmt = $connect->prepare("DELETE FROM phieumuon WHERE mapm = ?");
$stmt->bind_param("i", $mapm);

// Thực hiện câu lệnh
if ($stmt->execute()) {
    $list_xoa_pmuon[] = array(
        "status" => "success",
        "message" => "Xóa phiếu mượn thành công"
    );
} else {
    $list_xoa_pmuon[] = array(
        "status" => "success",
        "message" => "Xóa phiếu mượn thành công"
    );
}

}

//=== Xử lý XÓA sách ===>
if (isset($_POST['masach_xoa'])) {
    $masach = $_POST['masach_xoa']; // Lấy giá trị masach từ input

    // Chuẩn bị câu lệnh xóa
    $sql = "DELETE FROM sach WHERE masach = ?";
    $stmt = $connect->prepare($sql);
    $stmt->bind_param("i", $masach);

    $list_xoa_sach = array();

    if ($stmt->execute()) {
        $list_xoa_sach[] = array(
            "status" => "success",
            "message" => "Xóa sách thành công"
        );
    } else {
        $list_xoa_sach[] = array(
            "status" => "error",
            "message" => "Lỗi: " . $stmt->error
        );
    }
} else {
    $list_xoa_sach[] = array(
        "status" => "error",
        "message" => "Mã sách không hợp lệ"
    );
}


//=== Xử lý XÓA nhân viên ===>
if (isset($_POST['manv_xoa'])) {
    $manv = $_POST['manv_xoa']; // Lấy giá trị manv từ input

    // Lấy tên đăng nhập (tendangnhap) của nhân viên để xóa tài khoản
    $sql_get_account = "SELECT tendangnhap FROM taikhoan WHERE tendangnhap = (SELECT matk FROM nhanvien WHERE manv = ?)";
    $stmt_get_account = $connect->prepare($sql_get_account);
    $stmt_get_account->bind_param("i", $manv);
    $stmt_get_account->execute();
    $result = $stmt_get_account->get_result();
    $tendangnhap = null;

    if ($row = $result->fetch_assoc()) {
        $tendangnhap = $row['tendangnhap'];
    }
    // Đóng câu lệnh lấy tên đăng nhập
    $stmt_get_account->close();

    $sql_delete_nhanvien = "DELETE FROM nhanvien WHERE manv = ?";
    $stmt_delete_nhanvien = $connect->prepare($sql_delete_nhanvien);
    $stmt_delete_nhanvien->bind_param("i", $manv);

    $list_xoa_nhanvien = array();

    if ($stmt_delete_nhanvien->execute()) {
        // Nếu xóa nhân viên thành công, xóa tài khoản
        if ($tendangnhap) {
            $sql_delete_account = "DELETE FROM taikhoan WHERE tendangnhap = ?";
            $stmt_delete_account = $connect->prepare($sql_delete_account);
            $stmt_delete_account->bind_param("s", $tendangnhap);
            $stmt_delete_account->execute();
            $stmt_delete_account->close();
        }

        $list_xoa_nhanvien[] = array(
            "status" => "success",
            "message" => "Xóa nhân viên và tài khoản thành công"
        );
    } else {
        $list_xoa_nhanvien[] = array(
            "status" => "error",
            "message" => "Lỗi khi xóa nhân viên: " . $stmt_delete_nhanvien->error
        );
    }

    // Đóng câu lệnh xóa nhân viên
    $stmt_delete_nhanvien->close();
} else {
    $list_xoa_nhanvien[] = array(
        "status" => "error",
        "message" => "Mã nhân viên không hợp lệ"
    );
}

//=== Xử lý XÓA quyền ===>
if (isset($_POST['mapq_xoa'])) {
    $maquyen = $_POST['mapq_xoa']; // Lấy mã quyền cần xóa từ POST

    $list_xoa_quyen = array();

    // Kiểm tra nếu mã quyền là 0 (Admin) thì không cho xóa
    if ($maquyen == 0) {
        $list_xoa_quyen[] = array(
            "status" => "error",
            "message" => "Bạn không thể xóa quyền admin!"
        );
    } else {
        // Kiểm tra nếu quyền đang được sử dụng trong bảng taikhoan
        $sql_check_taikhoan = "SELECT COUNT(*) AS total FROM taikhoan WHERE maquyen = ?";
        $stmt_check = $connect->prepare($sql_check_taikhoan);
        $stmt_check->bind_param("i", $maquyen);
        $stmt_check->execute();
        $result_check = $stmt_check->get_result();
        $row = $result_check->fetch_assoc();
        
        if ($row['total'] > 0) {
            // Quyền đang được sử dụng, không thể xóa
            $list_xoa_quyen[] = array(
                "status" => "error",
                "message" => "Quyền đang được sử dụng trong tài khoản, không thể xóa!"
            );
            return;
        }
        // Xóa chi tiết quyền trước
        $sql_chitiet = "DELETE FROM chitietquyen WHERE maquyen = ?";
        $stmt_chitiet = $connect->prepare($sql_chitiet);
        $stmt_chitiet->bind_param("i", $maquyen);

        if ($stmt_chitiet->execute()) {
            // Sau khi xóa chi tiết quyền thành công, tiến hành xóa quyền
            $sql_quyen = "DELETE FROM quyen WHERE maquyen = ?";
            $stmt_quyen = $connect->prepare($sql_quyen);
            $stmt_quyen->bind_param("i", $maquyen);

            // Thực thi câu lệnh xóa quyền
            if ($stmt_quyen->execute()) {
                // Trả về kết quả thành công
                $list_xoa_quyen[] = array(
                    "status" => "success",
                    "message" => "Xóa quyền và chi tiết quyền thành công!"
                );
            } else {
                // Lỗi khi xóa quyền
                $list_xoa_quyen[] = array(
                    "status" => "error",
                    "message" => "Lỗi khi xóa quyền: " . $stmt_quyen->error
                );
            }
        } else {
            // Lỗi khi xóa chi tiết quyền
            $list_xoa_quyen[] = array(
                "status" => "error",
                "message" => "Lỗi khi xóa chi tiết quyền: " . $stmt_chitiet->error
            );
        }
    }
} else {
    // Trường hợp không nhận được mã quyền
    $list_xoa_quyen[] = array(
        "status" => "error",
        "message" => "Mã quyền không hợp lệ!"
    );
}


//=== Xử lý XÓA độc giả ===>
if (isset($_POST['madg_xoa'])) {
    $madg = $_POST['madg_xoa'];

    // Lấy tên đăng nhập (tendangnhap) của độc giả để xóa tài khoản
    $sql_get_account = "SELECT tendangnhap FROM taikhoan WHERE tendangnhap = (SELECT matk FROM docgia WHERE madg = ?)";
    $stmt_get_account = $connect->prepare($sql_get_account);
    $stmt_get_account->bind_param("i", $madg);
    $stmt_get_account->execute();
    $result = $stmt_get_account->get_result();
    $tendangnhap = null;

    if ($row = $result->fetch_assoc()) {
        $tendangnhap = $row['tendangnhap'];
    }

    // Đóng câu lệnh lấy tên đăng nhập
    $stmt_get_account->close();

    // Chuẩn bị câu lệnh xóa độc giả
    $sql_delete_docgia = "DELETE FROM docgia WHERE madg = ?";
    $stmt_delete_docgia = $connect->prepare($sql_delete_docgia);
    $stmt_delete_docgia->bind_param("i", $madg);

    $list_xoa_docgia = array();

    // Thực thi câu lệnh xóa độc giả
    if ($stmt_delete_docgia->execute()) {
        // Nếu xóa độc giả thành công, xóa tài khoản
        if ($tendangnhap) {
            $sql_delete_account = "DELETE FROM taikhoan WHERE tendangnhap = ?";
            $stmt_delete_account = $connect->prepare($sql_delete_account);
            $stmt_delete_account->bind_param("s", $tendangnhap);
            $stmt_delete_account->execute();
            $stmt_delete_account->close();
        }

        $list_xoa_docgia[] = array(
            "status" => "success",
            "message" => "Xóa độc giả và tài khoản thành công"
        );
    } else {
        $list_xoa_docgia[] = array(
            "status" => "error",
            "message" => "Lỗi khi xóa độc giả: " . $stmt_delete_docgia->error
        );
    }

    // Đóng câu lệnh xóa độc giả
    $stmt_delete_docgia->close();
} else {
    $list_xoa_docgia[] = array(
        "status" => "error",
        "message" => "Mã độc giả không hợp lệ"
    );
}


//=== Xử lý XÓA tài khoản ===>
if (isset($_POST['tendangnhap_xoa'])) {
    $tendangnhap = $_POST['tendangnhap_xoa']; // Lấy giá trị tendangnhap từ input

    // Kiểm tra tài khoản là của độc giả hay nhân viên
    $sql_check_account = "SELECT * FROM docgia WHERE matk = ?";

    $stmt_check = $connect->prepare($sql_check_account);
    $stmt_check->bind_param("s", $tendangnhap);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    $list_xoa_taikhoan = array();

    if ($result->num_rows > 0) {
        // Nếu tài khoản là của độc giả, không xóa
        $list_xoa_taikhoan[] = array(
            "status" => "error",
            "message" => "Không thể xóa tài khoản độc giả."
        );
    } else {
        // Tài khoản không phải độc giả, có thể xóa
        $sql_delete_account = "DELETE FROM taikhoan WHERE tendangnhap = ?";
        $stmt_delete_account = $connect->prepare($sql_delete_account);
        $stmt_delete_account->bind_param("s", $tendangnhap);

        if ($stmt_delete_account->execute()) {
            $list_xoa_taikhoan[] = array(
                "status" => "success",
                "message" => "Xóa tài khoản thành công."
            );
        } else {
            $list_xoa_taikhoan[] = array(
                "status" => "error",
                "message" => "Lỗi khi xóa tài khoản: " . $stmt_delete_account->error
            );
        }

        // Đóng câu lệnh xóa tài khoản
        $stmt_delete_account->close();
    }

    // Đóng câu lệnh kiểm tra
    $stmt_check->close();
} else {
    $list_xoa_taikhoan[] = array(
        "status" => "error",
        "message" => "Tên đăng nhập không hợp lệ."
    );
}

//=== Xử lý XÓA chi tiết sách ===>
$list_xoa_ct_sach = array(); // Mảng để chứa kết quả

if (isset($_POST['mavach_xoa'])) {
    $mavach = $_POST['mavach_xoa']; // Lấy giá trị mavach từ input

    // Bước 1: Tìm mã sách từ bảng chitietsach
    $sql_find = "SELECT masach FROM chitietsach WHERE mavach = ?";
    $stmtFind = $connect->prepare($sql_find);
    
    if ($stmtFind === false) {
        die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
    }

    $stmtFind->bind_param("i", $mavach); // Sử dụng "i" vì mavach là số nguyên
    $stmtFind->execute();
    $resultFind = $stmtFind->get_result();

    if ($resultFind->num_rows > 0) {
        $row = $resultFind->fetch_assoc();
        $masach = $row['masach']; // Lấy mã sách

        // Bước 2: Cập nhật số lượng sách
        $sql_update = "UPDATE sach SET soluong = soluong - 1 WHERE masach = ?";
        $stmtUpdate = $connect->prepare($sql_update);
        $stmtUpdate->bind_param("i", $masach);

        if ($stmtUpdate->execute()) {
            // Bước 3: Xóa chi tiết sách
            $sql_delete = "DELETE FROM chitietsach WHERE mavach = ?";
            $stmtDelete = $connect->prepare($sql_delete);

            if ($stmtDelete === false) {
                die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
            }

            $stmtDelete->bind_param("i", $mavach); // Sử dụng "i" vì mavach là số nguyên

            if ($stmtDelete->execute()) {
                $list_xoa_ct_sach[] = array(
                    "status" => "success",
                    "message" => "Xóa chi tiết sách thành công và cập nhật số lượng sách."
                );
            } else {
                $list_xoa_ct_sach[] = array(
                    "status" => "error",
                    "message" => "Lỗi khi xóa chi tiết sách: " . $stmtDelete->error
                );
            }

            // Đóng câu lệnh xóa
            $stmtDelete->close();
        } else {
            $list_xoa_ct_sach[] = array(
                "status" => "error",
                "message" => "Lỗi khi cập nhật số lượng sách: " . $stmtUpdate->error
            );
        }

        // Đóng câu lệnh cập nhật
        $stmtUpdate->close();
    } else {
        $list_xoa_ct_sach[] = array(
            "status" => "error",
            "message" => "Mã vạch không tồn tại."
        );
    }

    // Đóng câu lệnh tìm
    $stmtFind->close();
} else {
    $list_xoa_ct_sach[] = array(
        "status" => "error",
        "message" => "Mã vạch không hợp lệ."
    );
}

// ================================================ Tìm ảnh ===========================================================

// ===== Tìm ảnh sách ====>
$list_tim_anh_sach = array();
if (isset($_POST['masach_timAnh'])) {
    $masach = $_POST['masach_timAnh'];

    // Chuẩn bị câu lệnh truy vấn để lấy đường dẫn hình ảnh
    $sql = "SELECT img FROM sach WHERE masach = ?";
    $stmt = $connect->prepare($sql);
    if ($stmt === false) {
        die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
    }

    $stmt->bind_param("s", $masach);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $img_path = $row['img'];
        $list_tim_anh_sach[] = array(
            "status" => "success",
            "img" => $img_path
        );
    } else {
        $list_tim_anh_sach[] = array(
            "status" => "fail",
            "message" => "Không tìm thấy hình ảnh cho mã sách"
        );
    }
} else {
    $list_tim_anh_sach[] = array(
        "status" => "fail",
        "message" => "Mã sách không được cung cấp."
    );
}

// ===== Tìm ảnh nhân viên ====>
$list_tim_anh_nv = array();
if (isset($_POST['manv_timAnh_nv'])) {
    $masach = $_POST['manv_timAnh_nv'];

    // Chuẩn bị câu lệnh truy vấn để lấy đường dẫn hình ảnh
    $sql = "SELECT img FROM nhanvien WHERE manv = ?";
    $stmt = $connect->prepare($sql);
    if ($stmt === false) {
        die('Lỗi chuẩn bị câu lệnh: ' . $connect->error);
    }

    $stmt->bind_param("s", $masach);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $img_path = $row['img'];
        $list_tim_anh_nv[] = array(
            "status" => "success",
            "img" => $img_path
        );
    } else {
        $list_tim_anh_nv[] = array(
            "status" => "fail",
            "message" => "Không tìm thấy hình ảnh cho mã nhân viên"
        );
    }
} else {
    $list_tim_anh_nv[] = array(
        "status" => "fail",
        "message" => "Mã nhân viên không được cung cấp."
    );
}


// ================================================ Hiện thông tin tài khoản ============================================================

// Kiểm tra xem có gửi dữ liệu không
$list_thongtin_taikhoan = array();

if (isset($_POST['matk_info'])) {
    $matk = $_POST['matk_info']; // Lấy mã tài khoản từ POST

    // Kiểm tra trong bảng nhân viên
    $sql_nhanvien = "SELECT * FROM nhanvien WHERE matk = ?";
    $stmt_nhanvien = $connect->prepare($sql_nhanvien);
    $stmt_nhanvien->bind_param("s", $matk); // "s" vì matk là chuỗi

    if ($stmt_nhanvien->execute()) {
        $result_nhanvien = $stmt_nhanvien->get_result();
        if ($result_nhanvien->num_rows > 0) {
            // Nếu tìm thấy thông tin nhân viên
            $list_thongtin_taikhoan = $result_nhanvien->fetch_assoc();
        } else {
            // Nếu không tìm thấy, kiểm tra bảng độc giả
            $sql_docgia = "SELECT d.*, l.tenloaidocgia 
                            FROM docgia d
                            LEFT JOIN loaidocgia l ON d.maloaidocgia = l.maloaidocgia
                            WHERE d.matk = ?";
            $stmt_docgia = $connect->prepare($sql_docgia);
            $stmt_docgia->bind_param("s", $matk);

            if ($stmt_docgia->execute()) {
                $result_docgia = $stmt_docgia->get_result();
                if ($result_docgia->num_rows > 0) {
                    // Nếu tìm thấy thông tin độc giả
                    $list_thongtin_taikhoan = $result_docgia->fetch_assoc();
                } else {
                    // Không tìm thấy thông tin
                    $list_thongtin_taikhoan['status'] = 'error';
                    $list_thongtin_taikhoan['message'] = 'Không tìm thấy tài khoản.';
                }
            } else {
                $list_thongtin_taikhoan['status'] = 'error';
                $list_thongtin_taikhoan['message'] = 'Lỗi khi truy vấn bảng độc giả: ' . $stmt_docgia->error;
            }

            // Đóng câu lệnh truy vấn độc giả
            $stmt_docgia->close();
        }
    } else {
        $list_thongtin_taikhoan['status'] = 'error';
        $list_thongtin_taikhoan['message'] = 'Lỗi khi truy vấn bảng nhân viên: ' . $stmt_nhanvien->error;
    }

    // Đóng câu lệnh truy vấn nhân viên
    $stmt_nhanvien->close();
} else {
    $list_thongtin_taikhoan['status'] = 'error';
    $list_thongtin_taikhoan['message'] = 'Mã tài khoản không hợp lệ.';
}


// Cập nhật thông tin tài khoản
$list_sua_taikhoan = array();

if (isset($_POST['action']) && $_POST['action'] === 'updateTaiKhoan') {
    $matk = $_POST['matk'];
    $ten = $_POST['ten'];
    $gioitinh = $_POST['gioitinh'];
    $ngaysinh = $_POST['ngaysinh'];
    $email = $_POST['email'];
    $sdt = $_POST['sdt'];
    $diachi = $_POST['diachi'];

    // Xử lý hình ảnh
    $imageFile = null;
    if (isset($_FILES['img']['name']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
        $imageFile = $_FILES['img']['name'];
        $uploadDir = "../../avatar/";
        $hinhanhpath = basename($_FILES['img']['name']);
        $image = $uploadDir . $hinhanhpath;

        if (!move_uploaded_file($_FILES['img']['tmp_name'], $image)) {
            $imageFile = null;
        }
    }

    // Kiểm tra loại tài khoản từ session
    if (isset($_SESSION['maquyen']) && ($_SESSION['maquyen'] == 0 || $_SESSION['maquyen'] == 1)) {
        // Là nhân viên
        $sql_check_nv = "SELECT manv FROM nhanvien WHERE matk = ?";
        $stmt_check_nv = $connect->prepare($sql_check_nv);
        $stmt_check_nv->bind_param("i", $matk);
        $stmt_check_nv->execute();
        $result_nv = $stmt_check_nv->get_result();

        if ($result_nv->num_rows > 0) {
            $row = $result_nv->fetch_assoc();
            $manv = $row['manv'];

            if ($imageFile != null) {
                $sql = "UPDATE nhanvien SET ten=?, gioitinh=?, ngaysinh=?, email=?, sdt=?, diachi=?, img=? WHERE manv=?";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("sssssssi", $ten, $gioitinh, $ngaysinh, $email, $sdt, $diachi, $imageFile, $manv);
            } else {
                $sql = "UPDATE nhanvien SET ten=?, gioitinh=?, ngaysinh=?, email=?, sdt=?, diachi=? WHERE manv=?";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("ssssssi", $ten, $gioitinh, $ngaysinh, $email, $sdt, $diachi, $manv);
            }

            if ($stmt->execute()) {
                $list_sua_taikhoan[] = array("status" => "success", "message" => "Cập nhật nhân viên thành công!");
            } else {
                $list_sua_taikhoan[] = array("status" => "fail", "message" => "Lỗi: " . $stmt->error);
            }
        } else {
            $list_sua_taikhoan[] = array("status" => "fail", "message" => "Không tìm thấy nhân viên.");
        }

    } elseif (isset($_SESSION['maquyen']) && $_SESSION['maquyen'] == 2) {
        // Là độc giả
        $sql_check_dg = "SELECT madg FROM docgia WHERE matk = ?";
        $stmt_check_dg = $connect->prepare($sql_check_dg);
        $stmt_check_dg->bind_param("s", $matk);
        $stmt_check_dg->execute();
        $result_dg = $stmt_check_dg->get_result();

        if ($result_dg->num_rows > 0) {
            $row = $result_dg->fetch_assoc();
            $madg = $row['madg'];

            if ($imageFile != null) {
                $sql = "UPDATE docgia SET ten=?, gioitinh=?, ngaysinh=?, email=?, sdt=?, diachi=?, img=? WHERE madg=?";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("sssssssi", $ten, $gioitinh, $ngaysinh, $email, $sdt, $diachi, $imageFile, $madg);
            } else {
                $sql = "UPDATE docgia SET ten=?, gioitinh=?, ngaysinh=?, email=?, sdt=?, diachi=? WHERE madg=?";
                $stmt = $connect->prepare($sql);
                $stmt->bind_param("ssssssi", $ten, $gioitinh, $ngaysinh, $email, $sdt, $diachi, $madg);
            }

            if ($stmt->execute()) {
                $list_sua_taikhoan[] = array("status" => "success", "message" => "Cập nhật độc giả thành công!");
            } else {
                $list_sua_taikhoan[] = array("status" => "fail", "message" => "Lỗi: " . $stmt->error);
            }
        } else {
            $list_sua_taikhoan[] = array("status" => "fail", "message" => "Không tìm thấy độc giả.");
        }

    } else {
        $list_sua_taikhoan[] = array("status" => "fail", "message" => "Không xác định được loại tài khoản.");
    }
}




// ================================================ Lấy ra giá nhập sách và phí phạt sách ============================================================
$list_gianhap_sach = array(); // Khởi tạo mảng giá nhập
if (isset($_POST['masach_gianhap'])) {
    $bookId = $_POST['masach_gianhap'];

    // Truy vấn giá nhập từ bảng sach
    $query = "SELECT gianhap FROM sach WHERE masach = ?";
    $stmt = $connect->prepare($query);
    $stmt->bind_param("i", $bookId);
    $stmt->execute();
    $result = $stmt->get_result();


    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $list_gianhap_sach[] = $row['gianhap']; // Thêm giá nhập vào mảng
        }
    } else {
        $list_gianhap_sach['status'] = 'fail';
    }
}

$list_layphiphat_sach = array(); // Khởi tạo mảng giá nhập
if (isset($_POST['idphat'])) {
    $idphat = $_POST['idphat'];

    // Truy vấn giá nhập từ bảng sach
    $query = "SELECT phiphat FROM hinhthucphat WHERE maphat = ?";
    $stmt = $connect->prepare($query);
    $stmt->bind_param("i", $idphat);
    $stmt->execute();
    $result = $stmt->get_result();


    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $list_layphiphat_sach[] = $row['phiphat']; // Thêm giá nhập vào mảng
        }
    } else {
        $list_layphiphat_sach['status'] = 'fail';
    }
}

// ================================================ Tạo phiếu trả ============================================================
$list_tao_pt = array(); // Mảng để lưu trữ kết quả
if (isset($_POST['mapm']) && isset($_POST['tongphiphat']) && isset($_POST['madocgia_pt']) && isset($_POST['manv_pt'])) {
    $mapm = $_POST['mapm'];
    $tongphiphat = $_POST['tongphiphat'];
    $madg = $_POST['madocgia_pt'];
    $manv = $_POST['manv_pt'];
    $ngaytra = date('Y-m-d');
    
    // Truy vấn để thêm phiếu trả mới
    $stmt = $connect->prepare("INSERT INTO phieutra (ngaytra, mapm, madg, manv, tongphiphat) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("siiis",$ngaytra ,$mapm, $madg, $manv, $tongphiphat);
    
    if ($stmt->execute()) {
         // Lấy mã phiếu trả mới
        $mapt = $stmt->insert_id; // Mã phiếu trả tự tăng
        $list_tao_pt[] = array(
            "status" => "success",
            "message" => "Tạo phiếu trả thành công.",
            "maphieutra" => $mapt
        );
    } else {
        $list_tao_pt[] = array(
            "status" => "fail",
            "message" => "Không có sản phẩm nào được gửi."
     );
    }
}


$list_them_ct_pt = array(); // Mảng để lưu trữ kết quả
if (isset($_POST['mapt']) && isset($_POST['tinhtrangsach']) && isset($_POST['mavach']) && isset($_POST['maphat']) && isset($_POST['phiphat'])) {
    $mapt = $_POST['mapt'];
    $mavach = $_POST['mavach'];
    $maphat = $_POST['maphat'];
    $phiphat = $_POST['phiphat'];

    $tinhtrangsach = $_POST['tinhtrangsach'];

    // Truy vấn để thêm chi tiết phiếu trả
    $stmt = $connect->prepare("INSERT INTO chitietphieutra (mapt, mavach, maphat, phiphat) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiis", $mapt, $mavach, $maphat, $phiphat);
    if ($stmt->execute()) {
       $list_them_ct_pt[] = array(
           "status" => "success",
           "message" => "Thêm chi tiết phiếu trả thành công.",
           "maphieutra" => $mapt
       );
       $stmt_up_cts = $connect->prepare("UPDATE chitietsach SET matinhtrang = ?, trangthai = 0 WHERE mavach = ?");
       $stmt_up_cts->bind_param("ii", $tinhtrangsach, $mavach);

       $stmt_up_cts->execute();
       $stmt_up_cts->close();
   } else {
       $list_them_ct_pt[] = array(
           "status" => "fail",
           "message" => "Thêm chi tiết phiếu trả thất bại."
    );
   }
}



// ================================================ Tạo phiếu nhập ============================================================
$list_tao_pn = array(); // Mảng để lưu trữ kết quả
if (isset($_POST['mancc_pn']) && isset($_POST['manv_pn'])) {
    // Bước 1: Tạo phiếu nhập mới
    $sql = "INSERT INTO phieunhap (mancc, manv, ngaynhap, tongtien) VALUES (?, ?, ?, ?)";
    $stmt = $connect->prepare($sql);
    $mancc = $_POST['mancc_pn'];
    $manv = $_POST['manv_pn'];
    $ngaynhap = date('Y-m-d');
    $tongtien = 0; // Tính tổng tiền từ các sản phẩm
    $stmt->bind_param("iiss", $mancc, $manv, $ngaynhap, $tongtien);

    if ($stmt->execute()) {
        $mapn = $connect->insert_id;
        $list_tao_pn[] = array(
        "status" => "success",
        "message" => "Tạo phiếu nhập thành công.",
        "maphieunhap" => $mapn
    );
    } else {
        $list_tao_pn[] = array(
            "status" => "fail",
            "message" => "Không có sản phẩm nào được gửi."
     );
    }
}


$list_them_ct_pn = array(); // Mảng để lưu trữ kết quả
if (isset($_POST['masach']) && isset($_POST['gianhap']) && isset($_POST['soluong']) && isset($_POST['maphieunhap']) && isset($_POST['thanhtien_pn'])) {
    $masach = $_POST['masach'];
    $gianhap = $_POST['gianhap'];
    $soluong = $_POST['soluong'];
    $maphieunhap = $_POST['maphieunhap'];
    $thanhtien = $_POST['thanhtien_pn'];

    // Thêm chi tiết phiếu nhập
    $sql_ct = "INSERT INTO chitietphieunhap (mapn, masach, gianhap, soluong, thanhtien) VALUES (?, ?, ?, ?, ?)";
    $stmt = $connect->prepare($sql_ct);
    $stmt->bind_param("iisis", $maphieunhap, $masach, $gianhap, $soluong, $thanhtien);

    if ($stmt->execute()) {
        $list_them_ct_pn[] = array(
            "status" => "success",
            "message" => "Tạo chi tiết phiếu nhập thành công.",
        );

        // Bắt đầu thêm chi tiết sách
        for ($i = 0; $i < $soluong; $i++) {
            $mavach = generateRandomBarcode(); // Giả sử bạn có một hàm để sinh mã vạch
            $matinhtrang = 0;
            $khu = null; // Giá trị khu là NULL
            $trangthai = 0;

            // Thêm chi tiết sách
            $sql_chitiet = "INSERT INTO chitietsach (mavach, masach, matinhtrang, khu, trangthai) VALUES (?, ?, ?, ?, ?)";
            $stmtChitiet = $connect->prepare($sql_chitiet);
            $stmtChitiet->bind_param("iiiii", $mavach, $masach, $matinhtrang, $khu, $trangthai);

            $stmtChitiet->execute();
        }

        // Cập nhật lại số lượng sách
        $sql_update_sl_sach = "UPDATE sach SET soluong = soluong + ? WHERE masach = ?";
        $stmtUpdate = $connect->prepare($sql_update_sl_sach);
        $stmtUpdate->bind_param("ii", $soluong, $masach);

        $stmtUpdate->execute();

        // Đóng câu lệnh cập nhật
        $stmtUpdate->close();

    } else {
        $list_them_ct_pn[] = array(
            "status" => "fail",
            "message" => "Lỗi khi tạo chi tiết phiếu nhập: " . $stmt->error,
        );
    }

    // Đóng câu lệnh chi tiết
    if (isset($stmtChitiet)) {
        $stmtChitiet->close();
    }
} else {
    $list_them_ct_pn[] = array(
        "status" => "fail",
        "message" => "Không có sản phẩm nào được gửi."
    );
}



$list_sua_tongtien_pn = array(); // Mảng để lưu trữ kết quả
if (isset($_POST['tongtien_pn']) && isset($_POST['maphieunhap_tt'])) {
    
    $tongtien_pn = $_POST['tongtien_pn'];
    $maphieunhap_tt = $_POST['maphieunhap_tt'];

    $sql = "UPDATE phieunhap SET tongtien = ? WHERE mapn = ?";
    $stmt = $connect->prepare($sql);
    $stmt->bind_param("si", $tongtien_pn, $maphieunhap_tt);

    if ($stmt->execute()) {
        $list_sua_tongtien_pn[] = array(
        "status" => "success",
        "message" => "Tạo phiếu nhập thành công",
    );
    } else {
        $list_sua_tongtien_pn[] = array(
            "status" => "fail",
            "message" => "Tạo phiếu nhập thất bại."
     );
    }
}

// ================================================ echo json encode ============================================================

$response = array(
    'list_tao_pn' => $list_tao_pn,
    'list_them_ct_pn' => $list_them_ct_pn,
    'list_sua_tongtien_pn' => $list_sua_tongtien_pn,
    'list_sach' =>  $list_sach,
    'list_theloai' =>  $list_theloai,
    'list_nhaxuatban' =>  $list_nhaxuatban,
    'list_tacgia' =>  $list_tacgia,
    'list_tinhtrangsach' =>  $list_tinhtrangsach,
    'list_docgia' =>  $list_docgia,
    'list_loaidocgia' =>  $list_loaidocgia,
    'list_nhanvien' =>  $list_nhanvien,
    'list_nhanvien_ko_tk' => $list_nhanvien_ko_tk,
    'list_taikhoan_nhanvien' =>  $list_taikhoan_nhanvien,
    'list_taikhoan_docgia' =>  $list_taikhoan_docgia,
    'list_hinhthucphat' =>  $list_hinhthucphat,
    'list_nhacungcap' =>  $list_nhacungcap,
    'list_phieunhap' =>  $list_phieunhap,
    'list_phieumuon' =>  $list_phieumuon,
    'list_phieutra' =>  $list_phieutra,
    'list_quyen' =>  $list_quyen,
    'list_chucnang' =>  $list_chucnang,
    'list_chitiet_sach_da_muon' => $list_chitiet_sach_da_muon,
    'list_chitiet_sach_xem' => $list_chitiet_sach_xem,
    'list_chitiet_phieu_nhap_xem' => $list_chitiet_phieu_nhap_xem,
    'list_chitiet_phieu_muon_xem' => $list_chitiet_phieu_muon_xem,
    'list_chitiet_phieu_tra_xem' => $list_chitiet_phieu_tra_xem,
    'list_timkiem_sach' => $list_timkiem_sach,
    'list_timkiem_docgia' => $list_timkiem_docgia,
    'list_timkiem_nhanvien' => $list_timkiem_nhanvien,
    'list_timkiem_phieunhap' => $list_timkiem_phieunhap,
    'list_timkiem_tk_nhanvien' => $list_timkiem_tk_nhanvien,
    'list_timkiem_tk_docgia' => $list_timkiem_tk_docgia,
    'list_timkiem_phieumuon' => $list_timkiem_phieumuon,
    'list_timkiem_phieutra' => $list_timkiem_phieutra,
    'list_timkiem_ct_sach_da_muon' => $list_timkiem_ct_sach_da_muon,
    'list_open_close_taikhoan' => $list_open_close_taikhoan,
    'list_tao_taikhoan_nv' => $list_tao_taikhoan_nv,
    'list_xuly_phieumuon' => $list_xuly_phieumuon,
    'list_xoa_sach' => $list_xoa_sach,
    'list_xoa_nhanvien' => $list_xoa_nhanvien,
    'list_xoa_quyen' => $list_xoa_quyen,
    'list_xoa_docgia' => $list_xoa_docgia,
    'list_xoa_ct_sach' => $list_xoa_ct_sach,
    'list_xoa_taikhoan' => $list_xoa_taikhoan,
    'list_them_sach' => $list_them_sach,
    'list_tim_anh_sach' => $list_tim_anh_sach,
    'list_sua_sach' => $list_sua_sach,
    'list_them_nhanvien' => $list_them_nhanvien,
    'list_timkiem_quyen' => $list_timkiem_quyen,
    'list_them_quyen' => $list_them_quyen,
    'list_tim_anh_nv' => $list_tim_anh_nv,
    'list_sua_nv' => $list_sua_nv,
    'list_sua_quyen' => $list_sua_quyen,
    'list_sua_dg' => $list_sua_dg,
    'list_sua_loaidocgia' => $list_sua_loaidocgia,
    'list_sua_maquyen_tk' => $list_sua_maquyen_tk,
    'list_thongtin_taikhoan' => $list_thongtin_taikhoan,
    'list_gianhap_sach' => $list_gianhap_sach,
    'list_layphiphat_sach' => $list_layphiphat_sach,
    'list_tao_pt' => $list_tao_pt,
    'list_them_ct_pt' => $list_them_ct_pt,
    'list_xoa_pmuon' => $list_xoa_pmuon,
    "list_sua_taikhoan" => $list_sua_taikhoan,
);

echo json_encode($response);

$stmt->close();
$connect->close();

?>