<?php
session_start();
$conn = mysqli_connect("localhost", "root", "", "thuvien");
if ($conn) {
    $list_request_prd_id = isset($_GET['list_request_prd_id']) ? $_GET['list_request_prd_id'] : '';
    $request_user_id = isset($_GET['request_user_id']) ? $_GET['request_user_id'] : '';

    if (!empty($list_request_prd_id) && !empty($request_user_id)) {
        $ngayMuon = date('Y-m-d');
        $sql_themPhieuMuon = "INSERT INTO phieumuon(ngaymuon, hantra, madg, manv, tongphimuon, trangthai) VALUES('$ngayMuon', 7 , $request_user_id, NULL , 0, 0)";
        $result_themPhieuMuon = mysqli_query($conn, $sql_themPhieuMuon);
        if ($result_themPhieuMuon) {
            $maPhieuMuon = mysqli_insert_id($conn);
            $tongPhiMuon = 0;
            $list_prd_id_array = explode(',', $list_request_prd_id);
            foreach ($list_prd_id_array as $prd_id) {
                $sql_phiMuon = "SELECT phimuon FROM sach WHERE masach = $prd_id";
                $result_phiMuon = mysqli_query($conn, $sql_phiMuon);
                if ($result_phiMuon) {
                    $row = mysqli_fetch_assoc($result_phiMuon);
                    if ($row) {
                        $phiMuon = $row['phimuon']; // Lấy giá trị phiMuon

                        $sql_maVach = "SELECT mavach FROM chitietsach 
                                WHERE masach =  $prd_id
                                AND matinhtrang = 0 
                                AND trangthai = 0 
                                LIMIT 1";
                        $result_maVach = mysqli_query($conn, $sql_maVach);
                        if ($result_maVach && mysqli_num_rows($result_maVach) > 0) {
                            $row_maVach = mysqli_fetch_assoc($result_maVach);
                            $mavach = $row_maVach['mavach'];
                        } else {
                            $mavach = 4321; // Nếu không tìm thấy, gán null cho $mavach
                        }

                        $sql_chiTietPhieuMuon = "INSERT INTO chitietphieumuon(mapm, mavach, tinhtrangmuon, phimuon, masach) VALUES($maPhieuMuon, $mavach, 0, $phiMuon, $prd_id)";
                        mysqli_query($conn, $sql_chiTietPhieuMuon);
                        $sql_updateTongPhiMuon = "UPDATE phieumuon SET tongphimuon = tongphimuon + $phiMuon 
                        WHERE mapm = $maPhieuMuon";
                        mysqli_query($conn, $sql_updateTongPhiMuon);
                        $sql_updateGioMuon = "UPDATE giomuontamthoi SET trangthai = 1 
                                                       WHERE masach = $prd_id AND madocgia = $request_user_id";
                        mysqli_query($conn, $sql_updateGioMuon);
                        $sql_updateTrangThaiChiTietSach = "UPDATE chitietsach SET trangthai = 1
                        WHERE mavach = $mavach";
                        mysqli_query($conn, $sql_updateTrangThaiChiTietSach);
                    }
                }
            }
        }
        $status = "thành công";
    } else {
        $status = "không thành công";
    }
    echo ($status);
    mysqli_close($conn);
}
