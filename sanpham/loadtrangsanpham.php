<?php
try {
    $dsn = "mysql:host=localhost;port=3307;dbname=thuvien;charset=utf8";
    $username = "root";
    $password = ""; // nếu bạn không đặt mật khẩu

    $db = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die("Lỗi kết nối CSDL: " . $e->getMessage());
}
$theLoaiSach_sql = $db->prepare("SELECT * FROM theloai");
$theLoaiSach_sql->execute();
$theLoaiSach = $theLoaiSach_sql->fetchAll(PDO::FETCH_ASSOC);
$tacGia_sql = $db->prepare("SELECT * FROM tacgia");
$tacGia_sql->execute();
$tacGia = $tacGia_sql->fetchAll(PDO::FETCH_ASSOC);

?>

<div class="filter">
    <nav class="navbar navbar-expand navbar-light bg-light mb-4">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown" id="locYeuThichDropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                    role="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="true">
                    Được yêu thích
                </a>
                <div class="dropdown-menu" id="locYeuThichMenu" aria-labelledby="navbarDropdown">
                    <a href="#" class="dropdown-item" id="showAll">Tất cả</a>
                    <a href="#" class="dropdown-item" id="showWellLiked">Được yêu thích</a>
                </div>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown" id="locTheLoaiDropdown" >
                <div class="nav-link dropdown-toggle" id="navbarDropdown"
                    role="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="true">
                    Thể loại
                </div>
                <div class="dropdown-menu"
                    style=" width: 300x; height: 200px; max-height: 200px; overflow-y: auto" id="locTheLoaiMenu">
                    <!-- thêm lớp show vào class  -->
                    <?php
                    foreach ($theLoaiSach as $item) {
                        extract($item);
                        echo '<div class="dropdown-item">
                                            <input type="checkbox" filter="locTheLoai" value="' . $matl . '">
                                            <label style="margin-left: 0.5rem;">' . $tentl . '</label>
                                        </div>';
                    }
                    ?>
                    <div class="button-container">
                        <button class="book-details-button" onclick="xoaBoLoc('locTheLoai')"> xóa bộ lọc </button>
                        <button class="borrow-button" id="locTheLoaiClose" onclick="locSanPham('locTheLoai')"> áp dụng </button>
                    </div>
                </div>
            </li>
        </ul>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown" id="locTacGiaDropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown"
                    role="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="true">
                    Tác giả
                </a>
                <div class="dropdown-menu" id="locTacGiaMenu" style=" width: 300x; height: 130px; max-height: 200px; overflow-y: auto">
                    <?php
                    foreach ($tacGia as $item) {
                        extract($item);
                        echo '<div class="dropdown-item">
                                            <input type="checkbox" filter="locTacGia" value="' . $matg . '">
                                            <label style="margin-left: 0.5rem;">' . $tentg . '</label>
                                        </div>';
                    }
                    ?>
                    <div class="button-container">
                        <button class="book-details-button" onclick="xoaBoLoc('locTacGia')"> xóa bộ lọc </button>
                        <button class="borrow-button" id="locTacGiaClose" onclick="locSanPham('locTacGia')"> áp dụng </button>
                    </div>

                </div>

            </li>
        </ul>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const genreArr = JSON.parse(localStorage.getItem('genreCheckedList')) || [];
                const authorArr = JSON.parse(localStorage.getItem('authorCheckedList')) || [];

                genreArr.forEach(function(genre) {
                    const checkbox = document.querySelector(`input[type="checkbox"][filter="locTheLoai"][value="${genre}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });

                authorArr.forEach(function(author) {
                    const checkbox = document.querySelector(`input[type="checkbox"][filter="locTacGia"][value="${author}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });

            });


            function locSanPham(boLoc) {
                if (boLoc == 'locTheLoai') {
                    const genreCheckedList = Array.from(document.querySelectorAll(`input[type="checkbox"][filter="locTheLoai"]:checked`))
                        .map(item => item.value.trim());
                    localStorage.setItem('genreCheckedList', JSON.stringify(genreCheckedList));

                } else if (boLoc == 'locTacGia') {
                    const authorCheckedList = Array.from(document.querySelectorAll(`input[type="checkbox"][filter="locTacGia"]:checked`))
                        .map(item => item.value.trim());
                    localStorage.setItem('authorCheckedList', JSON.stringify(authorCheckedList));
                }

                const genreArr = JSON.parse(localStorage.getItem('genreCheckedList')) || [];
                const authorArr = JSON.parse(localStorage.getItem('authorCheckedList')) || [];

                var genreFilterUrl = '';
                if (genreArr.length !== 0) {
                    genreFilterUrl = '&genre=' + genreArr.join(',');
                }

                var authorFilterUrl = '';
                if (authorArr.length !== 0) {
                    authorFilterUrl = '&author=' + authorArr.join(',');
                }

                var url = window.location.href; //  URL hiện tại
                const encodeFavoStatus = encodeURIComponent(url.charAt(url.indexOf("favo=") + 5)); // kiểm tra xem có đang ở trang yêu thích hay không 
                const searchInput = $('#search-input').val().trim();
                localStorage.setItem('searchInput', searchInput);
                const newUrl = `index.php?act=danhSachSanPham&currentPage=1&favo=${encodeFavoStatus}&searchInput='${searchInput}'` + genreFilterUrl + authorFilterUrl;
                window.location.href = newUrl;
                genreArr.forEach(function(genre) {
                    const checkbox = document.querySelector(`input[type="checkbox"][filter="locTheLoai"][value="${genre}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });

                authorArr.forEach(function(author) {
                    const checkbox = document.querySelector(`input[type="checkbox"][filter="locTacGia"][value="${author}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }

            const dropdownTheLoai = document.getElementById('locTheLoaiDropdown');
            const dropdownMenuTheLoai = document.getElementById('locTheLoaiMenu');
            const closeButtonTheLoai = document.getElementById('locTheLoaiClose');
            const dropdownTacGia = document.getElementById('locTacGiaDropdown');
            const dropdownMenuTacGia = document.getElementById('locTacGiaMenu');
            const closeButtonTacGia = document.getElementById('locTacGiaClose');

            dropdownTheLoai.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdownMenuTheLoai.classList.toggle('show');
            });

            dropdownTacGia.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdownMenuTacGia.classList.toggle('show');
            });

            closeButtonTheLoai.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdownMenuTheLoai.classList.remove('show');
            });

            closeButtonTacGia.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdownMenuTacGia.classList.remove('show');
            });

            document.addEventListener('click', (event) => {

            });

            dropdownMenuTheLoai.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            dropdownMenuTacGia.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            const dropdownYeuThich = document.getElementById('locYeuThichDropdown');
            const dropdownMenuYeuThich = document.getElementById('locYeuThichMenu');
            const navbarDropdownLink = document.getElementById('navbarDropdown');

            dropdownYeuThich.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdownMenuYeuThich.classList.toggle('show');
            });

            dropdownMenuYeuThich.addEventListener('click', (event) => {
                event.stopPropagation();
            });

            document.getElementById('showAll').addEventListener('click', (event) => {
                event.preventDefault();
                navbarDropdownLink.textContent = 'Tất cả';
                dropdownMenuYeuThich.classList.remove('show');
            });

            document.getElementById('showWellLiked').addEventListener('click', (event) => {
                event.preventDefault();
                navbarDropdownLink.textContent = 'Được yêu thích';
                dropdownMenuYeuThich.classList.remove('show');
            });


            document.addEventListener('click', (event) => {});
        </script>
    </nav>
</div>




<div class="container-fluid divList">

    <div class="product-list-container" id="product-list" style="background-color: #f7f7f7;">
        <!-- hiển thị danh sách sản phẩm -->
    </div>


    <!-- thanh phân trang -->
    <div class="row" style="margin-top: 1.5rem;">
        <div class="col-sm-12 col-md-5">
            <div class="dataTables_info" id="dataTable_info" role="status" aria-live="polite"></div>
        </div>
        <div class="col-sm-12 col-md-7">
            <div class="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                <ul class="pagination">
                    <!-- hiển thị các nút phân trang -->
                </ul>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            var sortBy = 'sach.masach';
            var sortType = 'asc';
            var currentPage = <?= isset($currentPage) ? $currentPage : 1; ?>;
            var favo = <?= isset($favo) ? $favo : 1; ?>;
            var totalProducts = <?= isset($totalProducts) ? $totalProducts : 1; ?>;
            var searchInput = <?= isset($searchInput) ? $searchInput : 1; ?>;
            var userId = <?= isset($userId) ? $userId : 1; ?>;

            // ------------------
            var author = <?= isset($author) ? json_encode($author) : "''"; ?>;
            var genre = <?= isset($genre) ? json_encode($genre) : "''"; ?>;
            // -------------------


            loadSP(currentPage);

            function loadSP(currentPage) {
                var productsPerPage = 15; // Số sản phẩm trên 1 trang
                var totalPages = Math.ceil(<?= $totalProducts ?> / productsPerPage);
                if (totalPages > 1) {
                    for (var i = 1; i <= totalPages; i++) {
                        $('.pagination').append('<li class="paginate_button page-item" data-page="' + i + '"> <button class="page-link page-number" data-page="' + i + '">' + i + '</button></li>');
                    }
                }
                loadPage(currentPage, sortBy, sortType, favo, searchInput, author, genre, userId);
                doiMauNutPhanTrang(currentPage);
            }

            // Xử lý click nút phân trang
            $('.pagination').on('click', '.page-link', function(e) {
                e.preventDefault();
                currentPage = $(this).data('page');
                loadPage(currentPage, sortBy, sortType, favo, searchInput, author, genre, userId);
                doiMauNutPhanTrang(currentPage);
            });

            // Hàm load một trang sản phẩm
            function loadPage(page, sortBy, sortType, favo, searchInput, author, genre, userId) {
                $.ajax({
                    url: 'sanpham/thongtinsach.php',
                    type: 'GET',
                    data: {
                        page: page,
                        sortBy: sortBy,
                        sortType: sortType,
                        favo: favo,
                        searchInput: searchInput,
                        author: author,
                        genre: genre,
                        userId: userId,

                    },
                    success: function(response) {
                        $('#product-list').html(response);
                        document.getElementById("content").scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });

                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log(textStatus, errorThrown);
                    }
                });
            }

            function doiMauNutPhanTrang(page_num) {
                $('.paginate_button.page-item').removeClass('active').filter(`[data-page="${page_num}"]`).addClass('active');
            }

        });
    </script>

</div>