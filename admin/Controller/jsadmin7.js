document.addEventListener("DOMContentLoaded", () => {

    const toggleMenu = document.querySelector(".toggle-menu");
    const sidebar = document.querySelector(".admin_sidebar");
    const submenu = document.querySelector(".sub-menu-show");

    const profileImage = document.getElementById("profile-img");
    const profileDetails = document.querySelector(".profile-details");
    const arrowicon = toggleMenu.querySelector('.arrow_menu');

    if (sidebar.classList.contains("close")) {
        if (profileImage.style.maxHeight === "50px") {
            profileImage.style.maxHeight = "60px"; // Trở về kích thước ban đầu
            profileImage.style.maxWidth = "60px";  // Trở về kích thước ban đầu
            profileDetails.style.background = "#09025e"; // Trở về màu nền ban đầu
            arrowicon.classList.remove('bxs-right-arrow-square');
            arrowicon.classList.add('bxs-left-arrow-square');
        } else {
            profileImage.style.maxHeight = "50px"; // Thay đổi kích thước ảnh
            profileImage.style.maxWidth = "50px";  // Thay đổi kích thước ảnh
            profileDetails.style.background = "#060244"; // Thay đổi màu nền
            arrowicon.classList.remove('bxs-left-arrow-square');
            arrowicon.classList.add('bxs-right-arrow-square');
        }
    } else { }

    toggleMenu.addEventListener("click", () => {
        if (subMenu.classList.contains('show')) {
            closeSubMenu();
        } else { }
        sidebar.classList.toggle("close");

        if (profileImage.style.maxHeight === "50px") {
            profileImage.style.maxHeight = "60px"; // Trở về kích thước ban đầu
            profileImage.style.maxWidth = "60px";  // Trở về kích thước ban đầu
            profileDetails.style.background = "#09025e"; // Trở về màu nền ban đầu
            arrowicon.classList.remove('bxs-right-arrow-square');
            arrowicon.classList.add('bxs-left-arrow-square');
        } else {
            profileImage.style.maxHeight = "50px"; // Thay đổi kích thước ảnh
            profileImage.style.maxWidth = "50px";  // Thay đổi kích thước ảnh
            profileDetails.style.background = "#060244"; // Thay đổi màu nền
            arrowicon.classList.remove('bxs-left-arrow-square');
            arrowicon.classList.add('bxs-right-arrow-square');
        }
    })

    function opensidebar() {
        if (sidebar.classList.contains("close")) {
            sidebar.classList.toggle("close");
            if (profileImage.style.maxHeight === "50px") {
                profileImage.style.maxHeight = "60px"; // Trở về kích thước ban đầu
                profileImage.style.maxWidth = "60px";  // Trở về kích thước ban đầu
                profileDetails.style.background = "#09025e"; // Trở về màu nền ban đầu
                arrowicon.classList.remove('bxs-right-arrow-square');
                arrowicon.classList.add('bxs-left-arrow-square');
            } else {
                profileImage.style.maxHeight = "50px"; // Thay đổi kích thước ảnh
                profileImage.style.maxWidth = "50px";  // Thay đổi kích thước ảnh
                profileDetails.style.background = "#060244"; // Thay đổi màu nền
                arrowicon.classList.remove('bxs-left-arrow-square');
                arrowicon.classList.add('bxs-right-arrow-square');
            }
        } else {
            console.log("oke");
        }
    }


    const toggleButton = document.querySelector(".sub-menu-show");
    const subMenu = document.querySelector(".sub-menu");
    const toggleArrow = document.querySelector('.toggle-arrow');


    toggleButton.addEventListener("click", () => {
        if (subMenu.classList.contains('show')) {
            closeSubMenu();
        } else {
            openSubMenu();
        }
    });


    function openSubMenu() {
        subMenu.style.display = 'block'; // Hiện submenu trước khi áp dụng hiệu ứng
        setTimeout(() => {
            opensidebar();
            subMenu.style.opacity = 1; // Áp dụng độ mờ sau khi hiển thị
            subMenu.classList.add('show'); // Thêm class 'show'
            toggleArrow.classList.remove('bx-chevron-down'); // Đổi thành mũi tên hướng lên
            toggleArrow.classList.add('bx-chevron-up');
        }, 5);
    }

    function closeSubMenu() {
        subMenu.style.opacity = 0; // Đặt độ mờ về 0
        setTimeout(() => {
            subMenu.classList.remove('show');
            subMenu.style.display = 'none'; // Ẩn submenu ngay lập tức sau khi độ mờ về 0
            toggleArrow.classList.remove('bx-chevron-up'); // Đổi thành mũi tên hướng xuống
            toggleArrow.classList.add('bx-chevron-down');
        }, 20); // Thời gian trễ phải giống với thời gian của transition
    }


    // Ẩn hiện các trang quản lý
    const btn_qlsach = document.querySelector(".btn-qlsach");
    const btn_qlnhanvien = document.querySelector(".btn-qlnhanvien");
    const btn_qldocgia = document.querySelector(".btn-qldocgia");
    const btn_qlmuonsach = document.querySelector(".btn-muonsach");
    const btn_qltrasach = document.querySelector(".btn-trasach");
    const btn_qlphieunhap = document.querySelector(".btn-qlphieunhap");
    const btn_qltaikhoan = document.querySelector(".btn-qltaikhoan");
    const btn_thongke = document.querySelector(".btn-thongke");
    const btn_thongtincanhan = document.querySelector(".btn-thongtincanhan");
    const btn_qlphanquyen = document.querySelector(".btn-qlphanquyen");

    // Hàm để ẩn tất cả các trang
    function hideAllPages() {
        const pages = document.querySelectorAll('.quanlysach, .quanlynhanvien, .quanlydocgia, .quanlymuonsach, .quanlytrasach, .quanlyphieunhap, .quanlytaikhoan, .thongke, .thongtincanhan,.quanlyphanquyen');
        pages.forEach(page => {
            if (page.classList.contains('showpage')) {
                page.style.opacity = '0'; // Mờ đi
                setTimeout(() => {
                    page.classList.remove('showpage'); // Xóa class showpage sau khi hiệu ứng hoàn tất
                }, 150); // Thời gian trễ bằng thời gian hiệu ứng
            }
        });
    }

    // Hàm để hiển thị trang tương ứng
    function showPage(pageClass) {
        const page = document.querySelector(pageClass);
        hideAllPages(); // Đầu tiên ẩn tất cả các trang
        page.classList.add('showpage'); // Thêm class showpage
        setTimeout(() => {
            page.style.opacity = '1'; // Hiện rõ
        }, 10); // Thời gian trễ nhỏ để kích hoạt hiệu ứng
    }

    btn_qlsach.addEventListener("click", () => showPage('.quanlysach'));
    btn_qlnhanvien.addEventListener("click", () => showPage('.quanlynhanvien'));
    btn_qldocgia.addEventListener("click", () => showPage('.quanlydocgia'));
    btn_qlmuonsach.addEventListener("click", () => showPage('.quanlymuonsach'));
    btn_qltrasach.addEventListener("click", () => showPage('.quanlytrasach'));
    btn_qlphieunhap.addEventListener("click", () => showPage('.quanlyphieunhap'));
    btn_qltaikhoan.addEventListener("click", () => showPage('.quanlytaikhoan'));
    btn_thongke.addEventListener("click", () => showPage('.thongke'));
    btn_thongtincanhan.addEventListener("click", () => showPage('.thongtincanhan'));
    btn_qlphanquyen.addEventListener("click", () => showPage('.quanlyphanquyen'));

    //-----------------Chức năng thể loại
    const openCatForm = document.querySelector('.btn-theloai');
    const closeCatForm = document.querySelector('.btn-close-cat-form');
    const updatecat = document.querySelector('.updatebtn-cat');
    const addcategory = document.querySelector('.addbtn-cat');
    const closecategory = document.querySelector('.cancelcatsubmit');
    const addcatSubmit = document.querySelector('.addcatsubmit');
    const catsearchinput = document.querySelector('.search-cat');
    const catrefresh = document.getElementById('catrefresh');
    catrefresh.addEventListener('click', () => {
        catsearchinput.value = "";
        cancelCatEdit();
    });
    addcategory.addEventListener('click', () => addCategory());
    closecategory.addEventListener('click', () => closeCategory());
    addcatSubmit.addEventListener('click', () => submitCategory());
    updatecat.addEventListener('click', () => catEditTable());
    openCatForm.addEventListener("click", () => CategoryBTN());
    closeCatForm.addEventListener("click", () => CategoryFormExit());
    var countswitchcat = 0;
    // Mở Form Cat
    function CategoryBTN() {
        document.querySelector('.Category').style.display = "flex";
        document.getElementById('book-overlay').style.display = "block";

    }
    // Thoát Form Cat
    function CategoryFormExit() {
        catsearchinput.value = "";
        cancelCatEdit();
        document.querySelector('.Category').style.display = "none";
        document.getElementById('book-overlay').style.display = "none";
    }

    // Load DataFrame Thể Loại
    function fetchTableDataCategory() {
        countswitchcat = 0;
        updatecat.style.backgroundColor = 'orange';
        updatecat.innerText = 'Sửa';

        // Nếu search bar có giá trị fetch.php => fetch?search=$(giá trị mã hóa)
        let url = '../DAO/fetchdataCategory.php';
        if (catsearchinput.value.trim()) {
            url += `?search=${encodeURIComponent(catsearchinput.value.trim())}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Debugging
                const tableBody = document.querySelector('.cat-table-body');
                tableBody.innerHTML = ""; // Clear existing table rows

                data.forEach(row => {
                    const tableRow = document.createElement('tr');
                    tableRow.style.textAlign = "center";
                    tableRow.setAttribute('cat-data-id', row.matl); // Set row's data-id for later reference
                    tableRow.innerHTML = `
                        <td style="" class="text_center">${row.matl}</td>
                        <td style="" class="text_center">${row.tentl}</td>
                        <td><button type="button" class="delete-cat-btn text_center" cat-data-id="${row.matl}" style="background-color:red">Xóa</button></td>
                    `;
                    tableBody.appendChild(tableRow);
                });

                // Add event listeners cho nút xóa ngay sau khi data được truyền vào
                document.querySelectorAll('.delete-cat-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const categoryId = this.getAttribute('cat-data-id');
                        deleteCategory(categoryId);
                    });
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    window.onload = fetchTableDataCategory();

    // Xóa thể loại
    function deleteCategory(category_id) {
        if (confirm(`Xóa thể loại mã: "${category_id}"`)) {
            console.log('Attempting to delete category with ID:', category_id);
            fetch('../DAO/deleteCategory.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `matl=${category_id}`
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Delete response:', data); // Log response (check trong console)
                    if (data.success) {
                        $(document).ready(function () {
                            reset_select_theloai();
                        });
                        // Tìm và xóa row mà không reload page (edit trực tiếp trên html ko đụng đến cái j khác)
                        const rowToDelete = document.querySelector(`tr[cat-data-id="${category_id}"]`);
                        if (rowToDelete) {
                            rowToDelete.remove();
                        }
                    } else {
                        alert("Error deleting category: " + (data.error || "Unknown error"));
                    }
                })
                .catch(error => {
                    console.error('Error deleting category:', error); 
                    alert("Có lỗi xảy ra. Vui lòng thử lại.");
                });
        } else {
            return;
        }
    }


    // Thêm Thể loại
    function addCategory() {
        document.querySelector('.addcat-input').style.display = 'flex';
        document.getElementById('addcat-overlay').style.display = 'block';
    }
    function closeCategory() {
        document.querySelector('.addcat-input').style.display = 'none';
        document.getElementById('addcat-overlay').style.display = 'none';
        document.getElementById('cat-warning').style.color = "none";
        document.getElementById('cat-warning').innerHTML = "";
    }
    function submitCategory() {
        // values từ input
        var categoryName = document.getElementById('input-tentl').value;

        // valid input?
        if (categoryName) {
            document.getElementById('cat-warning').style.color = "none";
            document.getElementById('cat-warning').innerHTML = "";
            //            Sử dụng AJAX để gửi data đến server web
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../DAO/addCategory.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);

                    if (response.success) {
                        $(document).ready(function () {
                            reset_select_theloai();
                        });
                        alert(response.message); // "Thể loại được thêm thành công!"
                        // Clear the inputs after adding
                        document.getElementById('input-tentl').value = '';
                        fetchTableDataCategory();
                    } else {
                        alert("An error occurred: " + (response.error || "Unknown error"));
                    }
                }
            };

            xhr.send("&categoryName=" + encodeURIComponent(categoryName));
        } else {
            document.getElementById('cat-warning').style.color = "red";
            document.getElementById('cat-warning').innerHTML = "Hãy điền đầy đủ thông tin";
        }
    }

    //  Cập nhật thể loại
    function catEditTable() {
        console.log(countswitchcat);
        if (countswitchcat === 1) {
            cancelCatEdit();
            countswitchcat = 0;
        } else {
            document.querySelectorAll('.cat-table-body tr').forEach(row => {
                updatecat.style.backgroundColor = 'Red';
                updatecat.innerText = 'Hủy';

                // Enable editable 'tentl'
                const nameCell = row.querySelector('td:nth-child(2)'); // Name cell
                nameCell.contentEditable = 'true';

                // Tạo nút save
                const saveButton = document.createElement('button');
                saveButton.type = "button";
                saveButton.textContent = 'Lưu'; // Save
                saveButton.classList.add('cat-save-btn');

                // Add mỗi row
                const actionCell = row.querySelector('td:nth-child(3)'); // Action cell
                actionCell.appendChild(saveButton);

                // Add event listeners cho Save
                saveButton.addEventListener('click', () => saveCatEdit(row));
                countswitchcat = 1;
            });
        }
    }

    // Function save the edit
    function saveCatEdit(row) {
        const nameCell = row.querySelector('td:nth-child(2)');
        const categoryId = row.getAttribute('cat-data-id');
        const updatedValue = nameCell.textContent;

        updateCatData(categoryId, 'tentl', updatedValue);
    }

    function cancelCatEdit() {
        const table = document.querySelector('.df-cat');
        const rows = table.querySelectorAll('.cat-table-body tr'); // Chỉ chọn những row trong table
        rows.forEach(row => {
            const nameCell = row.querySelector('td:nth-child(2)');
            nameCell.contentEditable = 'false';
        });
        fetchTableDataCategory();
        removeCatEditButtons();
    }

    // Function remove save và support đổi edit mode
    function removeCatEditButtons() {
        document.querySelectorAll('.cat-save-btn').forEach(button => button.remove());
        updatecat.style.backgroundColor = 'orange';
        updatecat.innerText = 'Sửa';
    }

    // Function for handling data update
    function updateCatData(id, column, value) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../DAO/updateCategory.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (xhr.status === 200 && xhr.responseText.trim() === "success") {
                $(document).ready(function () {
                    reset_select_theloai();
                });
                alert("Cập nhật thành công!");
            }
        };
        xhr.send("id=" + encodeURIComponent(id) + "&column=" + encodeURIComponent(column) + "&value=" + encodeURIComponent(value));
    }

    // Thay vì tìm hiểu nguyên do vì sao mỗi input là enter lại gây lỗi thì thêm dòng này để vá lỗi =))
    document.getElementById('input-tentl').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    catsearchinput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchTableDataCategory(); // Lấy search input value rồi lấy data dựa trên input value đấy
        }
    });


    //----------------- Chức năng hình thức phạt
    const openPenForm = document.querySelector('.btn-hinhthucphat');
    const closePenForm = document.querySelector('.btn-close-pen-form');
    const updatepen = document.querySelector('.updatebtn-pen');
    const addpenalty = document.querySelector('.addbtn-pen');
    const closepenalty = document.querySelector('.cancelpensubmit');
    const addpenSubmit = document.querySelector('.addpensubmit');
    const pensearchinput = document.querySelector('.search-pen');
    const penrefresh = document.getElementById('penrefresh');
    penrefresh.addEventListener('click', () => {
        pensearchinput.value = "";
        cancelPenEdit();
    });
    addpenalty.addEventListener('click', () => addPenalty());
    closepenalty.addEventListener('click', () => closePenalty());
    addpenSubmit.addEventListener('click', () => submitPenalty());
    updatepen.addEventListener('click', () => penEditTable());
    openPenForm.addEventListener("click", () => PenaltyBTN());
    closePenForm.addEventListener("click", () => PenaltyFormExit());
    var countswitchpen = 0;
    // Mở Form Pen
    function PenaltyBTN() {
        document.querySelector('.Penalty').style.display = "flex";
        document.getElementById('return-overlay').style.display = "block";
    }
    // Thoát Form Pen
    function PenaltyFormExit() {
        pensearchinput.value = "";
        cancelPenEdit();
        document.querySelector('.Penalty').style.display = "none";
        document.getElementById('return-overlay').style.display = "none";
    }

    // Load DataFrame hình thức phạt
    function fetchTableDataPenalty() {
        countswitchpen = 0;
        updatepen.style.backgroundColor = 'orange';
        updatepen.innerText = 'Sửa';

        // Nếu search bar có giá trị fetch.php => fetch?search=$(giá trị mã hóa)
        let url = '../DAO/fetchdataPenalty.php';
        if (pensearchinput.value.trim()) {
            url += `?search=${encodeURIComponent(pensearchinput.value.trim())}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Debugging
                const tableBody = document.querySelector('.pen-table-body');
                tableBody.innerHTML = ""; // Clear existing table rows

                data.forEach(row => {
                    const tableRow = document.createElement('tr');
                    tableRow.style.textAlign = "center";
                    tableRow.setAttribute('pen-data-id', row.maphat); // Set row's data-id for later reference
                    tableRow.innerHTML = `
                        <td style="" class="text_center">${row.maphat}</td>
                        <td style="" class="text_center">${row.lydophat}</td>
                        <td style="" class="text_center">${row.phiphat}</td>
                        <td><button type="button" class="delete-pen-btn text_center" pen-data-id="${row.maphat}" style="background-color:red">Xóa</button></td>
                    `;
                    tableBody.appendChild(tableRow);
                });

                // Add event listeners cho nút xóa ngay sau khi data được truyền vào
                document.querySelectorAll('.delete-pen-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const penaltyId = this.getAttribute('pen-data-id');
                        deletePenalty(penaltyId);
                    });
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    window.onload = fetchTableDataPenalty();

    // Xóa hình thức phạt
    function deletePenalty(penalty_id) {
        if (confirm(`Xóa hình thức phạt mã: "${penalty_id}"`)) {
            console.log('Attempting to delete penalty with ID:', penalty_id);
            fetch('../DAO/deletePenalty.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `maphat=${penalty_id}`
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Delete response:', data); // Log response (check trong console)
                    if (data.success) {
                        // Tìm và xóa row mà không reload page (edit trực tiếp trên html ko đụng đến cái j khác)
                        const rowToDelete = document.querySelector(`tr[pen-data-id="${penalty_id}"]`);
                        if (rowToDelete) {
                            rowToDelete.remove();
                            $(document).ready(function () {
                                reset_select_hinhthucphat();
                            });
                        }
                    } else {
                        alert("Error deleting penalty: " + (data.error || "Unknown error"));
                    }
                })
                .catch(error => {
                    console.error('Error deleting penalty:', error); 
                    alert("Có lỗi xảy ra. Vui lòng thử lại.");
                });
        } else {
            return;
        }
    }


    // Thêm hình thức phạt
    function addPenalty() {
        document.querySelector('.addpen-input').style.display = 'flex';
        document.getElementById('addpen-overlay').style.display = 'block';
    }
    function closePenalty() {
        document.querySelector('.addpen-input').style.display = 'none';
        document.getElementById('addpen-overlay').style.display = 'none';
        document.getElementById('pen-warning').style.color = "none";
        document.getElementById('pen-warning').innerHTML = "";
    }
    function submitPenalty() {
        // values từ input
        var penaltyReason = document.getElementById('input-lido').value;
        var penaltyPrice = document.getElementById('input-phiphat').value;


        // valid input?
        if (penaltyReason && penaltyPrice) {
            document.getElementById('pen-warning').style.color = "none";
            document.getElementById('pen-warning').innerHTML = "";
            //            Sử dụng AJAX để gửi data đến server web
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../DAO/addPenalty.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);

                    if (response.success) {
                        $(document).ready(function () {
                            reset_select_hinhthucphat();
                        });
                        alert(response.message); // "Hình thức phạt được thêm thành công!"
                        // Clear the inputs after adding
                        document.getElementById('input-lido').value = '';
                        document.getElementById('input-phiphat').value = '';
                        fetchTableDataPenalty();
                    } else {
                        alert("An error occurred: " + (response.error || "Unknown error"));
                    }
                }
            };

            xhr.send("&penaltyReason=" + encodeURIComponent(penaltyReason) + "&penaltyPrice=" + encodeURIComponent(penaltyPrice));
        } else {
            document.getElementById('pen-warning').style.color = "red";
            document.getElementById('pen-warning').innerHTML = "Hãy điền đầy đủ thông tin";
        }
    }

    //  Cập nhật hình thức phạt
    function penEditTable() {
        console.log(countswitchpen);
        if (countswitchpen === 1) {
            cancelPenEdit();
            countswitchpen = 0;
        } else {
            document.querySelectorAll('.pen-table-body tr').forEach(row => {
                updatepen.style.backgroundColor = 'Red';
                updatepen.innerText = 'Hủy';

                // Enable editable 'lí do phạt'
                const reasonCell = row.querySelector('td:nth-child(2)'); // Reason cell
                reasonCell.contentEditable = 'true';

                // Enable editable 'phí phạt'
                const priceCell = row.querySelector('td:nth-child(3)'); // Price cell
                priceCell.contentEditable = 'true';

                // Tạo nút save
                const saveButton = document.createElement('button');
                saveButton.type = "button";
                saveButton.textContent = 'Lưu'; // Save
                saveButton.classList.add('pen-save-btn');

                // Add mỗi row
                const actionCell = row.querySelector('td:nth-child(4)'); // Action cell
                actionCell.appendChild(saveButton);

                // Add event listeners cho Save
                saveButton.addEventListener('click', () => savePenEdit(row));
                countswitchpen = 1;
            });
        }
    }

    // Function save the edit
    function savePenEdit(row) {
        const reasonCell = row.querySelector('td:nth-child(2)');
        const priceCell = row.querySelector('td:nth-child(3)');
        const penaltyId = row.getAttribute('pen-data-id');
        const updatedReason = reasonCell.textContent;
        const updatedPrice = priceCell.textContent;

        updatePenData(penaltyId, 'lydophat', updatedReason, 'phiphat', updatedPrice);
    }

    function cancelPenEdit() {
        const table = document.querySelector('.df-pen');
        const rows = table.querySelectorAll('.pen-table-body tr'); // Chỉ chọn những row trong table
        rows.forEach(row => {
            const reasonCell = row.querySelector('td:nth-child(2)');
            const priceCell = row.querySelector('td:nth-child(3)');
            reasonCell.contentEditable = 'false';
            priceCell.contentEditable = 'false';
        });
        fetchTableDataPenalty();
        removePenEditButtons();
    }

    // Function remove save và support đổi edit mode
    function removePenEditButtons() {
        document.querySelectorAll('.pen-save-btn').forEach(button => button.remove());
        updatepen.style.backgroundColor = 'orange';
        updatepen.innerText = 'Sửa';
    }

    // Function for handling data update
    function updatePenData(id, column1, value1, column2, value2) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../DAO/updatePenalty.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (xhr.status === 200 && xhr.responseText.trim() === "success") {
                alert("Cập nhật thành công!");
                $(document).ready(function () {
                    reset_select_hinhthucphat();
                });
            }
        };
        xhr.send("id=" + encodeURIComponent(id) + "&column1=" + encodeURIComponent(column1) + "&value1=" + encodeURIComponent(value1) + "&column2=" + encodeURIComponent(column2) + "&value2=" + encodeURIComponent(value2));
    }

    // Thay vì tìm hiểu nguyên do vì sao mỗi input là enter lại gây lỗi thì thêm dòng này để vá lỗi =))
    document.getElementById('input-lido').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    document.getElementById('input-phiphat').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    pensearchinput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchTableDataPenalty(); // Lấy search input value rồi lấy data dựa trên input value đấy
        }
    });

    //-----------------Chức năng tình trạng sách
    const openStatForm = document.querySelector('.btn-tinhtrangsach');
    const closeStatForm = document.querySelector('.btn-close-stat-form');
    const updatestat = document.querySelector('.updatebtn-stat');
    const addstatus = document.querySelector('.addbtn-stat');
    const closestatus = document.querySelector('.cancelstatsubmit');
    const addstatSubmit = document.querySelector('.addstatsubmit');
    const statsearchinput = document.querySelector('.search-stat');
    const statrefresh = document.getElementById('statrefresh');
    statrefresh.addEventListener('click', () => {
        statsearchinput.value = "";
        cancelStatEdit();
    });
    addstatus.addEventListener('click', () => addStatus());
    closestatus.addEventListener('click', () => closeStatus());
    addstatSubmit.addEventListener('click', () => submitStatus());
    updatestat.addEventListener('click', () => statEditTable());
    openStatForm.addEventListener("click", () => StatusBTN());
    closeStatForm.addEventListener("click", () => StatusFormExit());
    var countswitchstat = 0;
    // Mở Form Stat
    function StatusBTN() {
        document.querySelector('.Status').style.display = "flex";
        document.getElementById('book-overlay').style.display = "block";

    }
    // Thoát Form Stat
    function StatusFormExit() {
        statsearchinput.value = "";
        cancelStatEdit();
        document.querySelector('.Status').style.display = "none";
        document.getElementById('book-overlay').style.display = "none";
    }

    // Load DataFrame Tình Trạng
    function fetchTableDataStatus() {
        countswitchstat = 0;
        updatestat.style.backgroundColor = 'orange';
        updatestat.innerText = 'Sửa';

        // Nếu search bar có giá trị fetch.php => fetch?search=$(giá trị mã hóa)
        let url = '../DAO/fetchdataStatus.php';
        if (statsearchinput.value.trim()) {
            url += `?search=${encodeURIComponent(statsearchinput.value.trim())}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Debugging
                const tableBody = document.querySelector('.stat-table-body');
                tableBody.innerHTML = ""; // Clear existing table rows

                data.forEach(row => {
                    const tableRow = document.createElement('tr');
                    tableRow.style.textAlign = "center";
                    tableRow.setAttribute('stat-data-id', row.matinhtrang); // Set row's data-id for later reference
                    tableRow.innerHTML = `
                        <td style="" class="text_center">${row.matinhtrang}</td>
                        <td style="" class="text_center">${row.motatinhtrang}</td>
                        <td><button type="button" class="delete-stat-btn text_center" stat-data-id="${row.matinhtrang}" style="background-color:red">Xóa</button></td>
                    `;
                    tableBody.appendChild(tableRow);
                });

                // Add event listeners cho nút xóa ngay sau khi data được truyền vào
                document.querySelectorAll('.delete-stat-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const statusId = this.getAttribute('stat-data-id');
                        deleteStatus(statusId);
                    });
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    window.onload = fetchTableDataStatus();

    // Xóa Tình Trạng
    function deleteStatus(status_id) {
        if (confirm(`Xóa tình trạng sách mã: "${status_id}"`)) {
            console.log('Attempting to delete status with ID:', status_id);
            fetch('../DAO/deleteStatus.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `matinhtrang=${status_id}`
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Delete response:', data); // Log response (check trong console)
                    if (data.success) {
                        // Tìm và xóa row mà không reload page (edit trực tiếp trên html ko đụng đến cái j khác)
                        const rowToDelete = document.querySelector(`tr[stat-data-id="${status_id}"]`);
                        if (rowToDelete) {
                            $(document).ready(function () {
                                reset_select_tinhtrang_pt();
                                reset_select_tinhtrangsach_sach();
                            });
                            rowToDelete.remove();
                        }
                    } else {
                        alert("Error deleting status: " + (data.error || "Unknown error"));
                    }
                })
                .catch(error => {
                    console.error('Error deleting status:', error); 
                    alert("Có lỗi xảy ra. Vui lòng thử lại.");
                });
        } else {
            return;
        }
    }


    // Thêm Tình Trạng
    function addStatus() {
        document.querySelector('.addstat-input').style.display = 'flex';
        document.getElementById('addstat-overlay').style.display = 'block';
    }
    function closeStatus() {
        document.querySelector('.addstat-input').style.display = 'none';
        document.getElementById('addstat-overlay').style.display = 'none';
        document.getElementById('stat-warning').style.color = "none";
        document.getElementById('stat-warning').innerHTML = "";
    }
    function submitStatus() {
        // values từ input
        var statusDesc = document.getElementById('input-mota').value;

        // valid input?
        if (statusDesc) {
            document.getElementById('stat-warning').style.color = "none";
            document.getElementById('stat-warning').innerHTML = "";
            //            Sử dụng AJAX để gửi data đến server web
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../DAO/addStatus.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);

                    //                    if (response.error === "Mã đã tồn tại") {
                    //                        document.getElementById('matt-warning').style.color = "red";
                    //                        document.getElementById('matt-warning').innerHTML = "Mã đã tồn tại";
                    if (response.success) {
                        $(document).ready(function () {
                            reset_select_tinhtrang_pt();
                            reset_select_tinhtrangsach_sach();
                        });
                        alert(response.message); // "Tình trạng được thêm thành công!"
                        // Clear the inputs after adding
                        //                        document.getElementById('input-matt').value = '';
                        document.getElementById('input-mota').value = '';
                        fetchTableDataStatus();
                    } else {
                        alert("An error occurred: " + (response.error || "Unknown error"));
                    }
                }
            };

            xhr.send("&statusDesc=" + encodeURIComponent(statusDesc));
        } else {
            document.getElementById('stat-warning').style.color = "red";
            document.getElementById('stat-warning').innerHTML = "Hãy điền đầy đủ thông tin";
        }
    }

    //  Cập nhật tình trạng
    function statEditTable() {
        console.log(countswitchstat);
        if (countswitchstat === 1) {
            cancelStatEdit();
            countswitchstat = 0;
        } else {
            document.querySelectorAll('.stat-table-body tr').forEach(row => {
                updatestat.style.backgroundColor = 'Red';
                updatestat.innerText = 'Hủy';

                // Enable editable 'mota'
                const nameCell = row.querySelector('td:nth-child(2)'); // Name cell
                nameCell.contentEditable = 'true';

                // Tạo nút save
                const saveButton = document.createElement('button');
                saveButton.type = "button";
                saveButton.textContent = 'Lưu'; // Save
                saveButton.classList.add('stat-save-btn');

                // Add mỗi row
                const actionCell = row.querySelector('td:nth-child(3)'); // Action cell
                actionCell.appendChild(saveButton);

                // Add event listeners cho Save
                saveButton.addEventListener('click', () => saveStatEdit(row));
                countswitchstat = 1;
            });
        }
    }

    // Function save the edit
    function saveStatEdit(row) {
        const descCell = row.querySelector('td:nth-child(2)');
        const statusId = row.getAttribute('stat-data-id');
        const updatedValue = descCell.textContent;

        updateStatData(statusId, 'motatinhtrang', updatedValue);
    }

    function cancelStatEdit() {
        const table = document.querySelector('.df-stat');
        const rows = table.querySelectorAll('.stat-table-body tr'); // Chỉ chọn những row trong table
        rows.forEach(row => {
            const nameCell = row.querySelector('td:nth-child(2)');
            nameCell.contentEditable = 'false';
        });
        fetchTableDataStatus();
        removeStatEditButtons();
    }

    // Function remove save và support đổi edit mode
    function removeStatEditButtons() {
        document.querySelectorAll('.stat-save-btn').forEach(button => button.remove());
        updatestat.style.backgroundColor = 'orange';
        updatestat.innerText = 'Sửa';
    }

    // Function for handling data update
    function updateStatData(id, column, value) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../DAO/updateStatus.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (xhr.status === 200 && xhr.responseText.trim() === "success") {
                $(document).ready(function () {
                    reset_select_tinhtrang_pt();
                    reset_select_tinhtrangsach_sach();
                });
                alert("Update successful!");
            }
        };
        xhr.send("id=" + encodeURIComponent(id) + "&column=" + encodeURIComponent(column) + "&value=" + encodeURIComponent(value));
    }

    // Thay vì tìm hiểu nguyên do vì sao mỗi input là enter lại gây lỗi thì thêm dòng này để vá lỗi =))
    document.getElementById('input-mota').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    statsearchinput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchTableDataStatus(); // Lấy search input value rồi lấy data dựa trên input value đấy
        }
    });

    //----------------- Chức năng loại độc giả
    const openRCForm = document.querySelector('.btn-loaidg');
    const closeRCForm = document.querySelector('.btn-close-rc-form');
    const updaterc = document.querySelector('.updatebtn-rc');
    const addrc = document.querySelector('.addbtn-rc');
    const closerc = document.querySelector('.cancelrcsubmit');
    const addrcSubmit = document.querySelector('.addrcsubmit');
    const rcsearchinput = document.querySelector('.search-rc');
    const rcrefresh = document.getElementById('rcrefresh');
    rcrefresh.addEventListener('click', () => {
        rcsearchinput.value = "";
        cancelRCEdit();
    });
    addrc.addEventListener('click', () => addRC());
    closerc.addEventListener('click', () => closeRC());
    addrcSubmit.addEventListener('click', () => submitRC());
    updaterc.addEventListener('click', () => rcEditTable());
    openRCForm.addEventListener("click", () => RCBTN());
    closeRCForm.addEventListener("click", () => RCFormExit());
    var countswitchrc = 0;
    // Mở Form RC
    function RCBTN() {
        document.querySelector('.ReaderCategory').style.display = "flex";
        document.getElementById('reader-overlay').style.display = "block";
    }
    // Thoát Form RC
    function RCFormExit() {
        rcsearchinput.value = "";
        cancelRCEdit();
        document.querySelector('.ReaderCategory').style.display = "none";
        document.getElementById('reader-overlay').style.display = "none";
    }

    // Load DataFrame loại độc giả
    function fetchTableDataRC() {
        countswitchrc = 0;
        updaterc.style.backgroundColor = 'orange';
        updaterc.innerText = 'Sửa';

        // Nếu search bar có giá trị fetch.php => fetch?search=$(giá trị mã hóa)
        let url = '../DAO/fetchdataReaderCategory.php';
        if (rcsearchinput.value.trim()) {
            url += `?search=${encodeURIComponent(rcsearchinput.value.trim())}`;
        }
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Debugging
                const tableBody = document.querySelector('.rc-table-body');
                tableBody.innerHTML = ""; // Clear existing table rows

                data.forEach(row => {
                    const tableRow = document.createElement('tr');
                    tableRow.style.textAlign = "center";
                    tableRow.setAttribute('rc-data-id', row.maloaidocgia); // Set row's data-id for later reference
                    tableRow.innerHTML = `
                        <td style="" class="text_center">${row.maloaidocgia}</td>
                        <td style="" class="text_center">${row.tenloaidocgia}</td>
                        <td style="" class="text_center">${row.soluongsachtoida}</td>
                        <td><button type="button" class="delete-rc-btn text_center" rc-data-id="${row.maloaidocgia}" style="background-color:red">Xóa</button></td>
                    `;
                    tableBody.appendChild(tableRow);
                });

                // Add event listeners cho nút xóa ngay sau khi data được truyền vào
                document.querySelectorAll('.delete-rc-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const rcId = this.getAttribute('rc-data-id');
                        deleteRC(rcId);
                    });
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    window.onload = fetchTableDataRC();

    // Xóa loại độc giả
    function deleteRC(rc_id) {
        if (confirm(`Xóa loại độc giả mã: "${rc_id}"`)) {
            console.log('Attempting to delete reader-category with ID:', rc_id);
            fetch('../DAO/deleteReaderCategory.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `maloaidocgia=${rc_id}`
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Delete response:', data); // Log response (check trong console)
                    if (data.success) {
                        // Tìm và xóa row mà không reload page (edit trực tiếp trên html ko đụng đến cái j khác)
                        const rowToDelete = document.querySelector(`tr[rc-data-id="${rc_id}"]`);
                        if (rowToDelete) {
                            rowToDelete.remove();
                            $(document).ready(function () {
                                reset_select_loaidocgia();
                            });
                        }
                    } else {
                        alert("Error deleting reader-category: " + (data.error || "Unknown error"));
                    }
                })
                .catch(error => {
                    console.error('Error deleting reader-category:', error); 
                    alert("Có lỗi xảy ra. Vui lòng thử lại.");
                });
        } else {
            return;
        }
    }


    // Thêm loại độc giả
    function addRC() {
        document.querySelector('.addrc-input').style.display = 'flex';
        document.getElementById('addrc-overlay').style.display = 'block';
    }
    function closeRC() {
        document.querySelector('.addrc-input').style.display = 'none';
        document.getElementById('addrc-overlay').style.display = 'none';
        document.getElementById('rc-warning').style.color = "none";
        document.getElementById('rc-warning').innerHTML = "";
    }
    function submitRC() {
        // values từ input
        var RCName = document.getElementById('input-tenldg').value;
        var maxRCbook = document.getElementById('input-sl').value;


        // valid input?
        if (RCName && maxRCbook) {
            document.getElementById('rc-warning').style.color = "none";
            document.getElementById('rc-warning').innerHTML = "";
            //            Sử dụng AJAX để gửi data đến server web
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../DAO/addReaderCategory.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);

                    if (response.success) {
                        $(document).ready(function () {
                            reset_select_loaidocgia();
                        });
                        alert(response.message); // "loại độc giả được thêm thành công!"  
                        // Clear the inputs after adding
                        document.getElementById('input-tenldg').value = '';
                        document.getElementById('input-sl').value = '';
                        fetchTableDataRC();
                    } else {
                        alert("An error occurred: " + (response.error || "Unknown error"));
                    }
                }
            };

            xhr.send("&RCName=" + encodeURIComponent(RCName) + "&maxRCbook=" + encodeURIComponent(maxRCbook));
        } else {
            document.getElementById('rc-warning').style.color = "red";
            document.getElementById('rc-warning').innerHTML = "Hãy điền đầy đủ thông tin";
        }
    }

    //  Cập nhật loại độc giả
    function rcEditTable() {
        console.log(countswitchrc);
        if (countswitchrc === 1) {
            cancelRCEdit();
            countswitchrc = 0;
        } else {
            document.querySelectorAll('.rc-table-body tr').forEach(row => {
                updaterc.style.backgroundColor = 'Red';
                updaterc.innerText = 'Hủy';

                // Enable editable 'tên loại độc giả'
                const reasonCell = row.querySelector('td:nth-child(2)'); // Reason cell
                reasonCell.contentEditable = 'true';

                // Enable editable 'phí phạt'
                const priceCell = row.querySelector('td:nth-child(3)'); // Price cell
                priceCell.contentEditable = 'true';

                // Tạo nút save
                const saveButton = document.createElement('button');
                saveButton.type = "button";
                saveButton.textContent = 'Lưu'; // Save
                saveButton.classList.add('rc-save-btn');

                // Add mỗi row
                const actionCell = row.querySelector('td:nth-child(4)'); // Action cell
                actionCell.appendChild(saveButton);

                // Add event listeners cho Save
                saveButton.addEventListener('click', () => saveRCEdit(row));
                countswitchrc = 1;
            });
        }
    }

    // Function save the edit
    function saveRCEdit(row) {
        const nameCell = row.querySelector('td:nth-child(2)');
        const maxrcbookCell = row.querySelector('td:nth-child(3)');
        const RCId = row.getAttribute('rc-data-id');
        const updatedName = nameCell.textContent;
        const updatedMaxrcbook = maxrcbookCell.textContent;

        updateRCData(RCId, 'tenloaidocgia', updatedName, 'soluongsachtoida', updatedMaxrcbook);
    }

    function cancelRCEdit() {
        const table = document.querySelector('.df-rc');
        const rows = table.querySelectorAll('.rc-table-body tr'); // Chỉ chọn những row trong table
        rows.forEach(row => {
            const nameCell = row.querySelector('td:nth-child(2)');
            const maxrcbookCell = row.querySelector('td:nth-child(3)');
            nameCell.contentEditable = 'false';
            maxrcbookCell.contentEditable = 'false';
        });
        fetchTableDataRC();
        removeRCEditButtons();
    }

    // Function remove save và support đổi edit mode
    function removeRCEditButtons() {
        document.querySelectorAll('.rc-save-btn').forEach(button => button.remove());
        updaterc.style.backgroundColor = 'orange';
        updaterc.innerText = 'Sửa';
    }

    // Function for handling data update
    function updateRCData(id, column1, value1, column2, value2) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../DAO/updateReaderCategory.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (xhr.status === 200 && xhr.responseText.trim() === "success") {
                alert("Update successful!");
                $(document).ready(function () {
                    reset_select_loaidocgia();
                });
            }
        };
        xhr.send("id=" + encodeURIComponent(id) + "&column1=" + encodeURIComponent(column1) + "&value1=" + encodeURIComponent(value1) + "&column2=" + encodeURIComponent(column2) + "&value2=" + encodeURIComponent(value2));
    }

    // Thay vì tìm hiểu nguyên do vì sao mỗi input là enter lại gây lỗi thì thêm dòng này để vá lỗi =))
    document.getElementById('input-tenldg').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    document.getElementById('input-sl').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    rcsearchinput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchTableDataRC(); // Lấy search input value rồi lấy data dựa trên input value đấy
        }
    });
    //-----------------Chức năng Nhà xuất bản
    const openPublishForm = document.querySelector('.btn-nxb');
    const closePublishForm = document.querySelector('.btn-close-publish-form');
    const updatepublish = document.querySelector('.updatebtn-publish');
    const addpublish = document.querySelector('.addbtn-publish');
    const closepublish = document.querySelector('.cancelpublishsubmit');
    const addpublishSubmit = document.querySelector('.addpublishsubmit');
    const publishsearchinput = document.querySelector('.search-publish');
    const publishrefresh = document.getElementById('publishrefresh');
    publishrefresh.addEventListener('click', () => {
        publishsearchinput.value = "";
        cancelPublishEdit();
    });
    addpublish.addEventListener('click', () => addPublish());
    closepublish.addEventListener('click', () => closePublish());
    addpublishSubmit.addEventListener('click', () => submitPublish());
    updatepublish.addEventListener('click', () => publishEditTable());
    openPublishForm.addEventListener("click", () => PublishBTN());
    closePublishForm.addEventListener("click", () => PublishFormExit());
    var countswitchpublish = 0;
    // Mở Form Publish
    function PublishBTN() {
        document.querySelector('.Publisher').style.display = "flex";
        document.getElementById('book-overlay').style.display = "block";

    }
    // Thoát Form Publish
    function PublishFormExit() {
        publishsearchinput.value = "";
        cancelPublishEdit();
        document.querySelector('.Publisher').style.display = "none";
        document.getElementById('book-overlay').style.display = "none";
    }

    // Load DataFrame Nhà xuất bản
    function fetchTableDataPublisher() {
        countswitchpublish = 0;
        updatepublish.style.backgroundColor = 'orange';
        updatepublish.innerText = 'Sửa';

        // Nếu search bar có giá trị fetch.php => fetch?search=$(giá trị mã hóa)
        let url = '../DAO/fetchdataPublisher.php';
        if (publishsearchinput.value.trim()) {
            url += `?search=${encodeURIComponent(publishsearchinput.value.trim())}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Debugging
                const tableBody = document.querySelector('.publish-table-body');
                tableBody.innerHTML = ""; // Clear existing table rows

                data.forEach(row => {
                    const tableRow = document.createElement('tr');
                    tableRow.style.textAlign = "center";
                    tableRow.setAttribute('publish-data-id', row.manxb); // Set row's data-id for later reference
                    tableRow.innerHTML = `
                        <td style="" class="text_center">${row.manxb}</td>
                        <td style="" class="text_center">${row.tennxb}</td>
                        <td><button type="button" class="delete-publish-btn text_center" publish-data-id="${row.manxb}" style="background-color:red">Xóa</button></td>
                    `;
                    tableBody.appendChild(tableRow);
                });

                // Add event listeners cho nút xóa ngay sau khi data được truyền vào
                document.querySelectorAll('.delete-publish-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const publisherId = this.getAttribute('publish-data-id');
                        deletePublisher(publisherId);
                    });
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    window.onload = fetchTableDataPublisher();

    // Xóa nhà xuất bản
    function deletePublisher(publisher_id) {
        if (confirm(`Xóa nhà sản xuất mã: "${publisher_id}"`)) {
            console.log('Attempting to delete publisher with ID:', publisher_id);
            fetch('../DAO/deletePublisher.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `manxb=${publisher_id}`
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Delete response:', data); // Log response (check trong console)
                    if (data.success) {
                        // Tìm và xóa row mà không reload page (edit trực tiếp trên html ko đụng đến cái j khác)
                        const rowToDelete = document.querySelector(`tr[publish-data-id="${publisher_id}"]`);
                        if (rowToDelete) {
                            $(document).ready(function () {
                                reset_select_nhaxuatban();
                            });
                            rowToDelete.remove();
                        }
                    } else {
                        alert("Error deleting publisher: " + (data.error || "Unknown error"));
                    }
                })
                .catch(error => {
                    console.error('Error deleting publisher:', error); 
                    alert("Có lỗi xảy ra. Vui lòng thử lại.");
                });
        } else {
            return;
        }
    }


    // Thêm Nhà xuất bản
    function addPublish() {
        document.querySelector('.addpublish-input').style.display = 'flex';
        document.getElementById('addpublish-overlay').style.display = 'block';
    }
    function closePublish() {
        document.querySelector('.addpublish-input').style.display = 'none';
        document.getElementById('addpublish-overlay').style.display = 'none';
        document.getElementById('publish-warning').style.color = "none";
        document.getElementById('publish-warning').innerHTML = "";
    }
    function submitPublish() {
        // values từ input
        var publisherName = document.getElementById('input-tennxb').value;

        // valid input?
        if (publisherName) {
            document.getElementById('publish-warning').style.color = "none";
            document.getElementById('publish-warning').innerHTML = "";
            //            Sử dụng AJAX để gửi data đến server web
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../DAO/addPublisher.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);

                    if (response.success) {
                        $(document).ready(function () {
                            reset_select_nhaxuatban();
                        });
                        alert(response.message); // "NXB được thêm thành công!"
                        // Clear the inputs after adding
                        document.getElementById('input-tennxb').value = '';
                        fetchTableDataPublisher();
                    } else {
                        alert("An error occurred: " + (response.error || "Unknown error"));
                    }
                }
            };

            xhr.send("&publisherName=" + encodeURIComponent(publisherName));
        } else {
            document.getElementById('publish-warning').style.color = "red";
            document.getElementById('publish-warning').innerHTML = "Hãy điền đầy đủ thông tin";
        }
    }

    //  Cập nhật nhà xuất bản
    function publishEditTable() {
        console.log(countswitchpublish);
        if (countswitchpublish === 1) {
            cancelPublishEdit();
            countswitchpublish = 0;
        } else {
            document.querySelectorAll('.publish-table-body tr').forEach(row => {
                updatepublish.style.backgroundColor = 'Red';
                updatepublish.innerText = 'Hủy';

                // Enable editable 'tennxb'
                const nameCell = row.querySelector('td:nth-child(2)'); // Name cell
                nameCell.contentEditable = 'true';

                // Tạo nút save
                const saveButton = document.createElement('button');
                saveButton.type = "button";
                saveButton.textContent = 'Lưu'; // Save
                saveButton.classList.add('publish-save-btn');

                // Add mỗi row
                const actionCell = row.querySelector('td:nth-child(3)'); // Action cell
                actionCell.appendChild(saveButton);

                // Add event listeners cho Save
                saveButton.addEventListener('click', () => savePublishEdit(row));
                countswitchpublish = 1;
            });
        }
    }

    // Function save the edit
    function savePublishEdit(row) {
        const nameCell = row.querySelector('td:nth-child(2)');
        const publisherId = row.getAttribute('publish-data-id');
        const updatedValue = nameCell.textContent;

        updatePublishData(publisherId, 'tennxb', updatedValue);
    }

    function cancelPublishEdit() {
        const table = document.querySelector('.df-publish');
        const rows = table.querySelectorAll('.publish-table-body tr'); // Chỉ chọn những row trong table
        rows.forEach(row => {
            const nameCell = row.querySelector('td:nth-child(2)');
            nameCell.contentEditable = 'false';
        });
        fetchTableDataPublisher();
        removePublishEditButtons();
    }

    // Function remove save và support đổi edit mode
    function removePublishEditButtons() {
        document.querySelectorAll('.publish-save-btn').forEach(button => button.remove());
        updatepublish.style.backgroundColor = 'orange';
        updatepublish.innerText = 'Sửa';
    }

    // Function for handling data update
    function updatePublishData(id, column, value) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "../DAO/updatePublisher.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (xhr.status === 200 && xhr.responseText.trim() === "success") {
                $(document).ready(function () {
                    reset_select_nhaxuatban();
                });
                alert("Cập nhật thành công!");
            }
        };
        xhr.send("id=" + encodeURIComponent(id) + "&column=" + encodeURIComponent(column) + "&value=" + encodeURIComponent(value));
    }

    // Thay vì tìm hiểu nguyên do vì sao mỗi input là enter lại gây lỗi thì thêm dòng này để vá lỗi =))
    document.getElementById('input-tennxb').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    publishsearchinput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchTableDataPublisher(); // Lấy search input value rồi lấy data dựa trên input value đấy
        }
    });




//------ajax đăng xuất-------
    $(document).ready(function () {
        // Thêm sự kiện click cho nút đăng xuất
        $('.btn-logout').on('click', function (event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định

            // Hiển thị hộp thoại xác nhận
            const xacNhan = confirm("Bạn có chắc chắn muốn đăng xuất không?");
            if (!xacNhan) {
                return; // Nếu người dùng chọn Cancel → không làm gì cả
            }

            console.log("đã nhấn");
            $.ajax({
                url: '../DAO/dn_dk/logout.php',
                type: 'POST',
                success: function (response) {
                    try {
                        const data = typeof response === 'string' ? JSON.parse(response) : response;
                        if (data.status === 'success') {
                            localStorage.removeItem('username');
                            console.log("ĐÃ Đăng Xuất");
                            window.location.replace('/SGU_Library_Management_System/index.php?act=danhSachSanPham');
                        }
                    } catch (e) {
                        console.error("Lỗi khi xử lý phản hồi:", e);
                    }
                },
                error: function () {
                    console.error("Lỗi AJAX khi gọi logout.php");
                }
            });
        });
    });
//--------kết thúc-----------

    //-----------------Chức năng chức năng
//    const openFuncForm = document.querySelector('.btn-chucnang');
//    const closeFuncForm = document.querySelector('.btn-close-func-form');
//    const updatefunc = document.querySelector('.updatebtn-func');
//    const addfunction = document.querySelector('.addbtn-func');
//    const closefunction = document.querySelector('.cancelfuncsubmit');
//    const addfuncSubmit = document.querySelector('.addfuncsubmit');
//    const funcsearchinput = document.querySelector('.search-func');
//    const funcrefresh = document.getElementById('funcrefresh');
//    funcrefresh.addEventListener('click', () => {
//        funcsearchinput.value = "";
//        cancelFuncEdit();
//    });
//    addfunction.addEventListener('click', () => addFunction());
//    closefunction.addEventListener('click', () => closeFunction());
//    addfuncSubmit.addEventListener('click', () => submitFunction());
//    updatefunc.addEventListener('click', () => funcEditTable());
//    openFuncForm.addEventListener("click", () => FunctionBTN());
//    closeFuncForm.addEventListener("click", () => FunctionFormExit());
//    var countswitchfunc = 0;
//    // Mở Form Func
//    function FunctionBTN() {
//        document.querySelector('.Function').style.display = "flex";
//        document.getElementById('account-overlay').style.display = "block";
//
//    }
//    // Thoát Form Func
//    function FunctionFormExit() {
//        funcsearchinput.value = "";
//        cancelFuncEdit();
//        document.querySelector('.Function').style.display = "none";
//        document.getElementById('account-overlay').style.display = "none";
//    }
//
//    // Load DataFrame Chức Năng
//    function fetchTableDataFunction() {
//        countswitchfunc = 0;
//        updatefunc.style.backgroundColor = 'orange';
//        updatefunc.innerText = 'Sửa';
//
//        // Nếu search bar có giá trị fetch.php => fetch?search=$(giá trị mã hóa)
//        let url = '../DAO/fetchdataFunction.php';
//        if (funcsearchinput.value.trim()) {
//            url += `?search=${encodeURIComponent(funcsearchinput.value.trim())}`;
//        }
//
//        fetch(url)
//            .then(response => {
//                if (!response.ok) {
//                    throw new Error('Network response was not ok');
//                }
//                return response.json();
//            })
//            .then(data => {
//                console.log(data); // Debugging
//                const tableBody = document.querySelector('.func-table-body');
//                tableBody.innerHTML = ""; // Clear existing table rows
//
//                data.forEach(row => {
//                    const tableRow = document.createElement('tr');
//                    tableRow.style.textAlign = "center";
//                    tableRow.setAttribute('func-data-id', row.machucnang); // Set row's data-id for later reference
//                    tableRow.innerHTML = `
//                        <td style="" class="text_center">${row.machucnang}</td>
//                        <td style="" class="text_center">${row.tenchucnang}</td>
//                        <td><button type="button" class="delete-func-btn text_center" func-data-id="${row.machucnang}" style="background-color:red">Xóa</button></td>
//                    `;
//                    tableBody.appendChild(tableRow);
//                });
//
//                // Add event listeners cho nút xóa ngay sau khi data được truyền vào
//                document.querySelectorAll('.delete-func-btn').forEach(button => {
//                    button.addEventListener('click', function () {
//                        const functionId = this.getAttribute('func-data-id');
//                        deleteFunction(functionId);
//                    });
//                });
//            })
//            .catch(error => console.error('Error fetching data:', error));
//    }
//    window.onload = fetchTableDataFunction();
//
//    // Xóa Chức Năng
//    function deleteFunction(function_id) {
//        if (confirm(`Xóa chức năng mã: "${function_id}"`)) {
//            console.log('Attempting to delete function with ID:', function_id);
//            fetch('../DAO/deleteFunction.php', {
//                method: 'POST',
//                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//                body: `machucnang=${function_id}`
//            })
//                .then(response => response.json())
//                .then(data => {
//                    console.log('Delete response:', data); // Log response (check trong console)
//                    if (data.success) {
//                        $(document).ready(function () {
//                            reset_select_chucnang();
//                        });
//                        // Tìm và xóa row mà không reload page (edit trực tiếp trên html ko đụng đến cái j khác)
//                        const rowToDelete = document.querySelector(`tr[func-data-id="${function_id}"]`);
//                        if (rowToDelete) {
//                            rowToDelete.remove();
//                        }
//                    } else {
//                        alert("Error deleting function: " + (data.error || "Unknown error"));
//                    }
//                })
//            	  .catch(error => {
//                    console.error('Error deleting function:', error); 
//                    alert("Có lỗi xảy ra. Vui lòng thử lại.");
//            	  });
//        } else {
//            return;
//        }
//    }
//
//
//    // Thêm Chức Năng
//    function addFunction() {
//        document.querySelector('.addfunc-input').style.display = 'flex';
//        document.getElementById('addfunc-overlay').style.display = 'block';
//    }
//    function closeFunction() {
//        document.querySelector('.addfunc-input').style.display = 'none';
//        document.getElementById('addfunc-overlay').style.display = 'none';
//        document.getElementById('func-warning').style.color = "none";
//        document.getElementById('func-warning').innerHTML = "";
//    }
//    function submitFunction() {
//        // values từ input
//        var functionName = document.getElementById('input-tencn').value;
//
//        // valid input?
//        if (functionName) {
//            document.getElementById('func-warning').style.color = "none";
//            document.getElementById('func-warning').innerHTML = "";
//            //            Sử dụng AJAX để gửi data đến server web
//            var xhr = new XMLHttpRequest();
//            xhr.open("POST", "../DAO/addFunction.php", true);
//            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//
//            xhr.onreadystatechange = function () {
//                if (xhr.readyState === 4 && xhr.status === 200) {
//                    const response = JSON.parse(xhr.responseText);
//
//                    if (response.success) {
//                        $(document).ready(function () {
//                            reset_select_chucnang();
//                        });
//                        alert(response.message); // "Chức Năng được thêm thành công!"
//                        // Clear the inputs after adding
//                        document.getElementById('input-tencn').value = '';
//                        fetchTableDataFunction();
//                    } else {
//                        alert("An error occurred: " + (response.error || "Unknown error"));
//                    }
//                }
//            };
//
//            xhr.send("&functionName=" + encodeURIComponent(functionName));
//        } else {
//            document.getElementById('func-warning').style.color = "red";
//            document.getElementById('func-warning').innerHTML = "Hãy điền đầy đủ thông tin";
//        }
//    }
//
//    //  Cập nhật Chức Năng
//    function funcEditTable() {
//        console.log(countswitchfunc);
//        if (countswitchfunc === 1) {
//            cancelFuncEdit();
//            countswitchfunc = 0;
//        } else {
//            document.querySelectorAll('.func-table-body tr').forEach(row => {
//                updatefunc.style.backgroundColor = 'Red';
//                updatefunc.innerText = 'Hủy';
//
//                // Enable editable 'tencn'
//                const nameCell = row.querySelector('td:nth-child(2)'); // Name cell
//                nameCell.contentEditable = 'true';
//
//                // Tạo nút save
//                const saveButton = document.createElement('button');
//                saveButton.type = "button";
//                saveButton.textContent = 'Lưu'; // Save
//                saveButton.classList.add('func-save-btn');
//
//                // Add mỗi row
//                const actionCell = row.querySelector('td:nth-child(3)'); // Action cell
//                actionCell.appendChild(saveButton);
//
//                // Add event listeners cho Save
//                saveButton.addEventListener('click', () => saveFuncEdit(row));
//                countswitchfunc = 1;
//            });
//        }
//    }
//
//    // Function save the edit
//    function saveFuncEdit(row) {
//        const nameCell = row.querySelector('td:nth-child(2)');
//        const functionId = row.getAttribute('func-data-id');
//        const updatedValue = nameCell.textContent;
//
//        updateFuncData(functionId, 'tenchucnang', updatedValue);
//    }
//
//    function cancelFuncEdit() {
//        const table = document.querySelector('.df-func');
//        const rows = table.querySelectorAll('.func-table-body tr'); // Chỉ chọn những row trong table
//        rows.forEach(row => {
//            const nameCell = row.querySelector('td:nth-child(2)');
//            nameCell.contentEditable = 'false';
//        });
//        fetchTableDataFunction();
//        removeFuncEditButtons();
//    }
//
//    // Function remove save và support đổi edit mode
//    function removeFuncEditButtons() {
//        document.querySelectorAll('.func-save-btn').forEach(button => button.remove());
//        updatefunc.style.backgroundColor = 'orange';
//        updatefunc.innerText = 'Sửa';
//    }
//
//    // Function for handling data update
//    function updateFuncData(id, column, value) {
//        let xhr = new XMLHttpRequest();
//        xhr.open("POST", "../DAO/updateFunction.php", true);
//        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//        xhr.onload = function () {
//            if (xhr.status === 200 && xhr.responseText.trim() === "success") {
//                $(document).ready(function () {
//                    reset_select_chucnang();
//                });
//                alert("Cập nhật thành công!");
//            }
//        };
//        xhr.send("id=" + encodeURIComponent(id) + "&column=" + encodeURIComponent(column) + "&value=" + encodeURIComponent(value));
//    }
//
//    // Thay vì tìm hiểu nguyên do vì sao mỗi input là enter lại gây lỗi thì thêm dòng này để vá lỗi
//    document.getElementById('input-tencn').addEventListener('keydown', function (event) {
//        if (event.key === 'Enter') {
//            event.preventDefault();
//        }
//    });
//    funcsearchinput.addEventListener('keydown', function (event) {
//        if (event.key === 'Enter') {
//            event.preventDefault();
//            fetchTableDataFunction(); // Lấy search input value rồi lấy data dựa trên input value đấy
//        }
//    });

   

});

//Chức năng nhà cung cấp
const openProForm = document.querySelector('.btn_action.btn-manage.btn-ncc');
const closeProForm = document.querySelector('.btn-close-pro-form');
const updatepro = document.querySelector('.updatebtn-pro');
const addprovider = document.querySelector('.addbtn-pro');
const closeprovider = document.querySelector('.cancelprosubmit');
const addproSubmit = document.querySelector('.addprosubmit');
const searchinput = document.querySelector('.search-pro');
const penrefresh = document.getElementById('penrefresh');
penrefresh.addEventListener('click', () => {
    searchinput.value = "";
    cancelProEdit();
});
addprovider.addEventListener('click', () => addProvider());
closeprovider.addEventListener('click', () => closeProvider());
addproSubmit.addEventListener('click', () => submitProvider());
updatepro.addEventListener('click', () => proEditTable());
openProForm.addEventListener("click", () => ProviderBTN());
closeProForm.addEventListener("click", () => ProviderFormExit());
var countswitch = 0;
// Mở Form Pro
function ProviderBTN() {
    document.querySelector('.Provider').style.display = "flex";
    document.getElementById('pro-overlay').style.display = "block";

}
// Thoát Form Pro
function ProviderFormExit() {
    searchinput.value = "";
    cancelProEdit();
    document.querySelector('.Provider').style.display = "none";
    document.getElementById('pro-overlay').style.display = "none";
}

// Load DataFrame Nhà cung cấp
function fetchTableDataNcc() {
    countswitch = 0;
    updatepro.style.backgroundColor = 'orange';
    updatepro.innerText = 'Sửa';

    // Nếu search bar có giá trị fetch.php => fetch?search=$(giá trị mã hóa)
    let url = '../DAO/fetchdataProvider.php';  // Gửi type là 'provider' để lấy nhà cung cấp
    if (searchinput.value.trim()) {
        url += `&search=${encodeURIComponent(searchinput.value.trim())}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Debugging
            const tableBody = document.querySelector('.pro-table-body');
            tableBody.innerHTML = ""; // Clear existing table rows

            data.forEach(row => {
                const tableRow = document.createElement('tr');
                tableRow.style.textAlign = "center";
                tableRow.setAttribute('pro-data-id', row.mancc); // Set row's data-id for later reference
                tableRow.innerHTML = `
                    <td>${row.mancc}</td>
                    <td>${row.ten}</td>
                    <td>${row.sdt}</td>
                    <td>${row.diachi}</td>
                    <td><button type="button" class="delete-pro-btn" pro-data-id="${row.mancc}" style="background-color:red">Xóa</button></td>
                `;
                tableBody.appendChild(tableRow);
            });

            // Add event listeners cho nút xóa ngay sau khi data được truyền vào
            document.querySelectorAll('.delete-pro-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const providerId = this.getAttribute('pro-data-id');
                    deleteProvider(providerId);  // Thay đổi hàm deleteCategory thành deleteProvider
                });
            });
        })
        .catch(/*error => console.error(error)*/);
}

window.onload = fetchTableDataNcc();

// Xóa nhà cung cấp
function deleteProvider(provider_id) {
    console.log('Attempting to delete provider with ID:', provider_id);
    if (confirm(`Xóa nhà cung cấp mã: "${provider_id}"`)) {
        fetch('../DAO/deleteProvider.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `mancc=${provider_id}`
        })
            .then(response => response.json())
            .then(data => {
                console.log('Delete response:', data); // Log response (check trong console)
                if (data.success) {
                    // Tìm và xóa row mà không reload page (edit trực tiếp trên html ko đụng đến cái j khác)
                    const rowToDelete = document.querySelector(`tr[pro-data-id="${provider_id}"]`);
                    if (rowToDelete) {
                        rowToDelete.remove();
                        $(document).ready(function() {
                            reset_select_nhacc();
                        });  
                    }
                } else {
                    alert("Error deleting provider: " + (data.error || "Unknown error"));
                }
            })
            .catch(error => {
                console.error('Error deleting provider:', error); 
                alert("Có lỗi xảy ra. Vui lòng thử lại.");
            });
    } else {
        return;
    }
}


// Thêm nhà cung cấp
function addProvider() {
    // Hiển thị form thêm nhà cung cấp
    document.querySelector('.addpro-input').style.display = 'flex';
    document.getElementById('addpro-overlay').style.display = 'block';
}

function closeProvider() {
    // Ẩn form và reset cảnh báo
    document.querySelector('.addpro-input').style.display = 'none';
    document.getElementById('addpro-overlay').style.display = 'none';
    document.getElementById('pro-warning').style.color = "none";
    document.getElementById('pro-warning').innerHTML = "";
}

// Hàm kiểm tra độ dài và định dạng của số điện thoại
function isValidPhoneNumber(phone) {
    return /^\d{10}$/.test(phone) && phone.startsWith("0");
}

function submitProvider() {

    // Lấy giá trị từ các input
    const providerName = document.getElementById('input-tenncc').value.trim();
    const providerPhone = document.getElementById('input-sdtncc').value.trim();
    const providerAddress = document.getElementById('input-dcncc').value.trim();

    // Kiểm tra dữ liệu đầu vào
    if (!providerName || !providerPhone || !providerAddress) {
        document.getElementById('pro-warning').style.color = "red";
        document.getElementById('pro-warning').innerHTML = "Hãy điền đầy đủ thông tin.";
        return;
    }

    // Giới hạn độ dài của tên và địa chỉ
    if (providerName.length > 50 || providerAddress.length > 50) {
        document.getElementById('pro-warning').style.color = "red";
        document.getElementById('pro-warning').innerHTML = "Tên và địa chỉ tối đa 50 ký tự.";
        return;
    }

    // Kiểm tra định dạng số điện thoại
    if (!isValidPhoneNumber(providerPhone)) {
        document.getElementById('pro-warning').style.color = "red";
        document.getElementById('pro-warning').innerHTML = "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.";
        return;
    }

    // Sử dụng AJAX để gửi dữ liệu đến server
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../DAO/addProvider.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        alert(response.message); // "Nhà cung cấp được thêm thành công!"
                        // Xóa dữ liệu input sau khi thêm thành công
                        $(document).ready(function() {
                            reset_select_nhacc();
                        });  
                        document.getElementById('input-tenncc').value = '';
                        document.getElementById('input-sdtncc').value = '';
                        document.getElementById('input-dcncc').value = '';
                        fetchTableDataNcc(); // Cập nhật bảng dữ liệu
                    } else {
                        alert("Lỗi: " + (response.error || "Lỗi không xác định"));
                    }
                } catch (e) {
                    console.error("Lỗi phân tích JSON: ", e);
                    alert("Đã xảy ra lỗi khi xử lý phản hồi từ server.");
                }
            } else {
                alert("Đã xảy ra lỗi khi kết nối đến server.");
            }
        }
    };

    // Chuẩn bị dữ liệu để gửi
    const data = `providerName=${encodeURIComponent(providerName)}&providerPhone=${encodeURIComponent(providerPhone)}&providerAddress=${encodeURIComponent(providerAddress)}`;
    xhr.send(data);
}


//  Cập nhật nhà cung cấp
function proEditTable() {
    console.log(countswitch);
    if (countswitch === 1) {
        cancelProEdit();
        countswitch = 0;
    } else {
        document.querySelectorAll('.pro-table-body tr').forEach(row => {
            updatepro.style.backgroundColor = 'Red';
            updatepro.innerText = 'Hủy';

            // Enable editable 'tentl'
            const nameCell = row.querySelector('td:nth-child(2)'); // Name cell
            nameCell.contentEditable = 'true';

            const nameCell2 = row.querySelector('td:nth-child(3)'); // Name cell
            nameCell2.contentEditable = 'true';

            const nameCell3 = row.querySelector('td:nth-child(4)'); // Name cell
            nameCell3.contentEditable = 'true';

            // Tạo nút save
            const saveButton = document.createElement('button');
            saveButton.type = "button";
            saveButton.textContent = 'Lưu'; // Save
            saveButton.classList.add('pro-save-btn');

            // Add mỗi row
            const actionCell = row.querySelector('td:nth-child(5)'); // Action cell
            actionCell.appendChild(saveButton);

            // Add event listeners cho Save
            saveButton.addEventListener('click', () => saveProEdit(row));
            countswitch = 1;
        });
    }
}

function saveProEdit(row) {
    const nameCell = row.querySelector('td:nth-child(2)');
    const nameCell2 = row.querySelector('td:nth-child(3)');
    const nameCell3 = row.querySelector('td:nth-child(4)');
    const providerId = row.getAttribute('pro-data-id');
    const providerName = nameCell.textContent;
    const providerPhone = nameCell2.textContent;
    const providerAddress = nameCell3.textContent;

    if (!providerName || providerName.length > 50 || !providerAddress || providerAddress.length > 50) {
        alert("Tên và địa chỉ tối đa 50 ký tự.");
        return;
    }

    if (!/^\d{10}$/.test(providerPhone) || !providerPhone.startsWith("0")) {
        alert("Số điện thoại phải có đúng 10 chữ số và bắt đầu bằng số 0.");
        return;
    }

    updateProData(providerId, 'ten', providerName, 'sdt', providerPhone, 'diachi', providerAddress);
}

function cancelProEdit() {
    const table = document.querySelector('.df-pro');
    const rows = table.querySelectorAll('.pro-table-body tr'); // Chỉ chọn những row trong table
    rows.forEach(row => {
        const nameCell = row.querySelector('td:nth-child(2)');
        nameCell.contentEditable = 'false';
        const nameCell2 = row.querySelector('td:nth-child(3)');
        nameCell.contentEditable = 'false';
        const nameCell3 = row.querySelector('td:nth-child(4)');
        nameCell.contentEditable = 'false';
    });
    fetchTableDataNcc();
    removeProEditButtons();
}

// Function remove save và support đổi edit mode
function removeProEditButtons() {
    document.querySelectorAll('.pro-save-btn').forEach(button => button.remove());
    updatepro.style.backgroundColor = 'orange';
    updatepro.innerText = 'Sửa';
}

// Function for handling data update
function updateProData(id, column1, value1, column2, value2, column3, value3) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../DAO/updateProvider.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200 && xhr.responseText.trim() === "success") {
            alert("Cập nhật thành công!");
            $(document).ready(function() {
                reset_select_nhacc();
            });  
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.send("id=" + encodeURIComponent(id) + "&column1=" + encodeURIComponent(column1) + "&value1=" + encodeURIComponent(value1)
        + "&column2=" + encodeURIComponent(column2) + "&value2=" + encodeURIComponent(value2)
        + "&column3=" + encodeURIComponent(column3) + "&value3=" + encodeURIComponent(value3));
}

// Thay vì tìm hiểu nguyên do vì sao mỗi input là enter lại gây lỗi thì thêm dòng này để vá lỗi =))
document.getElementById('input-tenncc').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});
document.getElementById('input-sdtncc').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});
document.getElementById('input-dcncc').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});
searchinput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        fetchTableDataNcc(); // Lấy search input value rồi lấy data dựa trên input value đấy
    }
});

//-----------------Chức năng Tác Giả
const openAuthorForm = document.querySelector('.btn-tacgia');
const closeauthorForm = document.querySelector('.btn-close-author-form');
const updateauthor = document.querySelector('.updatebtn-author');
const addauthor = document.querySelector('.addbtn-author');
const closeauthor = document.querySelector('.cancelauthorsubmit');
const addsubmitAuthor = document.querySelector('.addauthorsubmit');
const searchinputAuthor = document.querySelector('.search-author');
const refreshuuthor = document.getElementById('refresh-author');
refreshuuthor.addEventListener('click', () => {
    searchinputAuthor.value = "";
    cancelAuthorEdit();
});
addauthor.addEventListener('click', () => addAuthor());
closeauthor.addEventListener('click', () => closeAuthor());
addsubmitAuthor.addEventListener('click', () => submitAuthor());
updateauthor.addEventListener('click', () => authorEditTable());
openAuthorForm.addEventListener("click", () => AuthorBTN());
closeauthorForm.addEventListener("click", () => AuthorFormExit());
var countswitchauthor = 0;
// Mở Form Tác Giả
function AuthorBTN() {
    document.querySelector('.Author').style.display = "flex";
    document.getElementById('book-overlay').style.display = "block";
}

// Thoát Form Tác Giả
function AuthorFormExit() {
    searchinputAuthor.value = "";
    cancelAuthorEdit();
    document.querySelector('.Author').style.display = "none";
    document.getElementById('book-overlay').style.display = "none";
}

// Tải Dữ Liệu Tác Giả
function fetchTableDataAuthor() {
    countswitchauthor = 0;
    updateauthor.style.backgroundColor = 'orange';
    updateauthor.innerText = 'Sửa';

    // Nếu thanh tìm kiếm có giá trị thì thêm tham số tìm kiếm vào URL
    let url = '../DAO/fetchdataAuthor.php';
    if (searchinputAuthor.value.trim()) {
        url += `?search=${encodeURIComponent(searchinputAuthor.value.trim())}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Lỗi kết nối mạng');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Debugging
            const tableBody = document.querySelector('.table-body-author');
            tableBody.innerHTML = ""; // Xóa các dòng bảng hiện tại

            data.forEach(row => {
                const tableRow = document.createElement('tr');
                tableRow.style.textAlign = "center";
                tableRow.setAttribute('author-data-id', row.matg); // Gán data-id cho dòng để tham chiếu sau
                tableRow.innerHTML = `
                    <td style="" class="text_center">${row.matg}</td>
                    <td style="" class="text_center">${row.tentg}</td>
                    <td><button type="button" class="delete-author-btn text_center" author-data-id="${row.matg}" style="background-color:red">Xóa</button></td>
                `;
                tableBody.appendChild(tableRow);
            });

            // Thêm sự kiện cho nút xóa ngay sau khi dữ liệu được thêm vào
            document.querySelectorAll('.delete-author-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const authorId = this.getAttribute('author-data-id');
                    deleteAuthor(authorId);
                });
            });
        })
        .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
}
window.onload = fetchTableDataAuthor();

// Xóa tác giả
function deleteAuthor(author_id) {
    if (confirm(`Xóa tác giả mã: "${author_id}"`)) {
        console.log('Đang cố gắng xóa tác giả với ID:', author_id);
        fetch('../DAO/deleteAuthor.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `matg=${author_id}`
        })
            .then(response => response.json())
            .then(data => {
                console.log('Phản hồi xóa:', data); // In ra phản hồi (kiểm tra trong console)
                if (data.success) {
                    // Tìm và xóa dòng mà không cần tải lại trang (sửa trực tiếp trên HTML)
                    const rowToDelete = document.querySelector(`tr[author-data-id="${author_id}"]`);
                    if (rowToDelete) {
                        $(document).ready(function () {
                            reset_select_tacgia();
                        });
                        rowToDelete.remove();
                    }
                } else {
                    alert("Lỗi khi xóa tác giả: " + (data.error || "Lỗi không xác định"));
                }
            })
            .catch(error => {
                console.error('Error deleting author:', error); 
                alert("Có lỗi xảy ra. Vui lòng thử lại.");
            });
    } else {
        return;
    }
}

// Thêm Tác giả
function addAuthor() {
    document.querySelector('.addauthor-input').style.display = 'flex';
    document.getElementById('addauthor-overlay').style.display = 'block';
}
function closeAuthor() {
    document.querySelector('.addauthor-input').style.display = 'none';
    document.getElementById('addauthor-overlay').style.display = 'none';
    document.getElementById('author-warning').style.color = "none";
    document.getElementById('author-warning').innerHTML = "";
}
function submitAuthor() {
    // Lấy giá trị từ input
    var authorName = document.getElementById('input-tentg').value;

    // Kiểm tra tính hợp lệ của input
    if (authorName) {
        document.getElementById('author-warning').style.color = "none";
        document.getElementById('author-warning').innerHTML = "";
        // Sử dụng AJAX để gửi dữ liệu đến server
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../DAO/addAuthor.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                if (response.success) {
                    $(document).ready(function () {
                        reset_select_tacgia();
                    });
                    alert(response.message); // "Tác giả được thêm thành công!"
                    // Xóa các giá trị trong input sau khi thêm
                    document.getElementById('input-tentg').value = '';
                    fetchTableDataAuthor();
                } else {
                    alert("Đã xảy ra lỗi: " + (response.error || "Lỗi không xác định"));
                }
            }
        };

        xhr.send("&authorName=" + encodeURIComponent(authorName));
    } else {
        document.getElementById('author-warning').style.color = "red";
        document.getElementById('author-warning').innerHTML = "Hãy điền đầy đủ thông tin";
    }
}

// Cập nhật tác giả
function authorEditTable() {
    console.log(countswitchauthor);
    if (countswitchauthor === 1) {
        cancelAuthorEdit();
        countswitchauthor = 0;
    } else {
        document.querySelectorAll('.table-body-author tr').forEach(row => {
            updateauthor.style.backgroundColor = 'Red';
            updateauthor.innerText = 'Hủy';

            // Bật chế độ chỉnh sửa cho 'tentl'
            const nameCell = row.querySelector('td:nth-child(2)'); // Ô tên tác giả
            nameCell.contentEditable = 'true';

            // Tạo nút lưu
            const saveButton = document.createElement('button');
            saveButton.type = "button";
            saveButton.textContent = 'Lưu'; // Lưu
            saveButton.classList.add('author-save-btn');

            // Thêm vào mỗi dòng
            const actionCell = row.querySelector('td:nth-child(3)'); // Ô hành động
            actionCell.appendChild(saveButton);

            // Thêm sự kiện cho nút Lưu
            saveButton.addEventListener('click', () => saveAuthorEdit(row));
            countswitchauthor = 1;
        });
    }
}

// Hàm lưu khi chỉnh sửa
function saveAuthorEdit(row) {
    const nameCell = row.querySelector('td:nth-child(2)');
    const authorId = row.getAttribute('author-data-id');
    const updatedValue = nameCell.textContent;

    updateAuthorData(authorId, 'tentg', updatedValue);
}

function cancelAuthorEdit() {
    const table = document.querySelector('.df-author');
    const rows = table.querySelectorAll('.table-body-author tr'); // Chỉ chọn các dòng trong bảng
    rows.forEach(row => {
        const nameCell = row.querySelector('td:nth-child(2)');
        nameCell.contentEditable = 'false';
    });
    fetchTableDataAuthor();
    removeAuthorEditButtons();
}

// Hàm xóa các nút lưu và hỗ trợ chuyển đổi chế độ chỉnh sửa
function removeAuthorEditButtons() {
    document.querySelectorAll('.author-save-btn').forEach(button => button.remove());
    updateauthor.style.backgroundColor = 'orange';
    updateauthor.innerText = 'Sửa';
}

// Hàm xử lý cập nhật dữ liệu
function updateAuthorData(id, column, value) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../DAO/updateAuthor.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200 && xhr.responseText.trim() === "success") {
            $(document).ready(function () {
                reset_select_tacgia();
            });
            alert("Cập nhật thành công!");
        }
    };
    xhr.send("id=" + encodeURIComponent(id) + "&column=" + encodeURIComponent(column) + "&value=" + encodeURIComponent(value));
}

// Thay vì tìm hiểu nguyên do vì sao mỗi input khi nhấn enter lại gây lỗi, thì thêm dòng này để khắc phục lỗi 
document.getElementById('input-tentg').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});
searchinputAuthor.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        fetchTableDataAuthor(); // Lấy giá trị từ ô tìm kiếm và lấy dữ liệu dựa trên giá trị đó
    }
});

// Chức năng phân quyền
const openCtqForm = document.querySelector('.btn_action.btn-manage.btn-ctq');
const closeCtqForm = document.querySelector('.btn-close-ctq-form');
const searchinputctq = document.querySelector('.search-ctq');

openCtqForm.addEventListener("click", () => PhanquyenBTN());
closeCtqForm.addEventListener("click", () => PhanquyenFormExit());
closeCtqForm.addEventListener("click", () => submitPhanquyen());
var countswitch = 0;
// Mở Form Ctq
function PhanquyenBTN() {
    document.querySelector('.Phanquyen').style.display = "flex";
    document.getElementById('ctq-overlay').style.display = "block";
}
// Thoát Form Ctq
function PhanquyenFormExit() {
    searchinputctq.value = "";
    document.querySelector('.Phanquyen').style.display = "none";
    document.getElementById('ctq-overlay').style.display = "none";
}

// Load DataFrame Phân quyền
function submitPhanquyen() {
    const data = []; // Khởi tạo mảng dữ liệu cần gửi

    // Lấy mã quyền từ bảng .table-quyen (dựa trên hàng đã chọn)
    const selectedRow = document.querySelector('.table-quyen tbody tr.selected');
    if (!selectedRow) {
        alert("Hãy chọn một dòng trong bảng quyền trước.");
        return;
    }
    const maquyen = selectedRow.querySelector('td:first-child').textContent.trim();

    // Thu thập dữ liệu từ bảng chi tiết quyền
    const rows = document.querySelectorAll('.ctq-table-body tr');
    rows.forEach(row => {
        const tenchucnang = row.cells[1].textContent.trim();
        const hanhdong = row.cells[2].textContent.trim();
        const hoatdong = row.cells[3].querySelector('input[type="checkbox"]').checked;

        data.push({
            maquyen: maquyen,
            tenchucnang: tenchucnang,
            hanhdong: hanhdong,
            hoatdong: hoatdong
        });
    });

    // Kiểm tra nếu không có dữ liệu
    if (data.length === 0) {
        alert("Không có dữ liệu để lưu.");
        return;
    }

    // Gửi dữ liệu tới server
    fetch('../DAO/updatePhanquyen.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert(result.message);
            } else {
                alert("Lỗi: " + result.message);
            }
        })
        .catch(error => {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Đã xảy ra lỗi khi gửi dữ liệu.");
        });
}

// Gắn sự kiện click để chọn hàng trong bảng .table-quyen
$(document).ready(function () {
    $('.table-quyen tbody').on('click', 'tr', function () {
        $('.table-quyen tbody tr').removeClass('selected');
        $(this).addClass('selected');
    });
});



// Function for handling data update
function updateCtqData(id, column1, value1, column2, value2, column3, value3) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../DAO/updatePhanquyen.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200 && xhr.responseText.trim() === "success") {
            alert("Cập nhật thành công!");
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.send("id=" + encodeURIComponent(id) + "&column1=" + encodeURIComponent(column1) + "&value1=" + encodeURIComponent(value1)
        + "&column2=" + encodeURIComponent(column2) + "&value2=" + encodeURIComponent(value2)
        + "&column3=" + encodeURIComponent(column3) + "&value3=" + encodeURIComponent(value3));
}

searchinput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        fetchTableDataCtq(); // Lấy search input value rồi lấy data dựa trên input value đấy
    }
});


function fetchChiTietQuyen(maquyen) {
    countswitch = 0;
    updatepro.style.backgroundColor = 'orange';
    updatepro.innerText = 'Sửa';

    // Nếu search bar có giá trị fetch.php => fetch?search=$(giá trị mã hóa)
    let url = '../DAO/fetchdataPhanquyen.php';  // Đường dẫn tới file PHP xử lý
    if (searchinput.value.trim()) {
        url += `&search=${encodeURIComponent(searchinput.value.trim())}`;
    }

    // Gửi yêu cầu AJAX để lấy dữ liệu
    $.ajax({
        url: url, // Đường dẫn tới file PHP xử lý
        method: 'GET',
        data: { maquyen: maquyen }, // Gửi mã quyền
        success: function (response) {
            console.log(response);  // In ra dữ liệu response để kiểm tra

            // Kiểm tra xem dữ liệu đã là đối tượng hay chưa, nếu chưa thì parse JSON
            if (typeof response === 'string') {
                try {
                    response = JSON.parse(response);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    return;
                }
            }

            const tableBody = document.querySelector('.ctq-table-body');
            tableBody.innerHTML = ""; // Clear existing table rows

            let stt = 1;
            response.forEach(row => {
                const tableRow = document.createElement('tr');
                tableRow.style.textAlign = "center";
                tableRow.setAttribute('ctq-data-id', row.maquyen); // Set row's data-id for later reference
                tableRow.innerHTML = `
                    <td>${stt++}</td>
                    <td>${row.tenchucnang}</td>
                    <td>${row.hanhdong}</td>
                    <td><input type="checkbox" ${row.hoatdong ? 'checked' : ''}></td>
                `;
                tableBody.appendChild(tableRow);
            });
        },
        error: function (err) {
            console.error('Error fetching data:', err);
        }
    });
}

// Gọi hàm khi trang được tải
window.onload = function() {
    // Chẳng hạn truyền giá trị maquyen là 1 để kiểm tra
    fetchChiTietQuyen(1);
};
