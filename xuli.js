
function themXoaSachYeuThich(prd_id, userId) {
    $.ajax({
        url: "themvaoyeuthich.php",
        type: "GET",
        data: {
            prd_id: prd_id,
            userId: userId
        },
        success: function (status) {
            console.log(status);
            if (status == "add") {
                document.querySelector('.save-favorite-button2').innerHTML = '';
                document.querySelector('.save-favorite-button2').innerHTML = '<i class="fa-solid fa-star" style="margin-right: 0.5rem;"></i> Đã thêm vào yêu thích';
                document.querySelector('.save-favorite-button2').style.backgroundColor = '#e4efff';

            } else if (status == "remove") {
                document.querySelector('.save-favorite-button2').innerHTML = '';
                document.querySelector('.save-favorite-button2').innerHTML = '<i class="fa-regular fa-star" style="margin-right: 0.5rem;"></i> Thêm vào yêu thích';
                document.querySelector('.save-favorite-button2').style.backgroundColor = '#fff';
            }
        }
    });
}

function themXoaGioMuon1(prd_id, userId) {
    $.ajax({
        url: "themvaogiomuon.php",
        type: "GET",
        data: {
            prd_id: prd_id,
            userId: userId
        },
        success: function (status) {
            console.log(status);
            if (status == "add") {
                document.querySelector(`.borrow-button.brbtn1_${prd_id}`).innerHTML = '';
                document.querySelector(`.borrow-button.brbtn1_${prd_id}`).innerHTML = '<i class="fa-solid fa-minus"  style="margin-right: 0.3rem"></i>Xóa khỏi giỏ mượn';
                const popup = document.getElementById('popup');
                popup.style.display = 'block';
                popup.innerHTML = '';
                popup.innerHTML = 'Đã thêm vào giỏ mượn';

                setTimeout(() => {
                    popup.style.transform = 'translate(-50%, -50%) scale(1.4)';
                }, 10);

                setTimeout(() => {
                    popup.style.display = 'none';
                    popup.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 1000);
            } else if (status == "remove") {
                document.querySelector(`.borrow-button.brbtn1_${prd_id}`).innerHTML = '';
                document.querySelector(`.borrow-button.brbtn1_${prd_id}`).innerHTML = '<i class="fa-solid fa-plus"   style="margin-right: 0.3rem"></i>Thêm vào giỏ mượn';
                const popup = document.getElementById('popup');
                popup.style.display = 'block';
                popup.innerHTML = '';
                popup.innerHTML = 'Đã xóa khỏi giỏ mượn';

                setTimeout(() => {
                    popup.style.transform = 'translate(-50%, -50%) scale(1.4)';
                }, 10);

                setTimeout(() => {
                    popup.style.display = 'none';
                    popup.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 1000);

            }
        }
    });
}

function themXoaGioMuon2(prd_id, userId) {
    $.ajax({
        url: "themvaogiomuon.php",
        type: "GET",
        data: {
            prd_id: prd_id,
            userId: userId
        },
        success: function (status) {
            console.log(status);
            if (status == "add") {
                document.querySelector(`.borrow-button.brbtn2_${prd_id}`).innerHTML = '';
                document.querySelector(`.borrow-button.brbtn2_${prd_id}`).innerHTML = '<i class="fa-solid fa-minus"  style="margin-right: 0.5rem"></i>Xóa khỏi giỏ mượn';
                const popup = document.getElementById('popup');
                popup.style.display = 'block';
                popup.innerHTML = '';
                popup.innerHTML = 'Đã thêm vào giỏ mượn';

                setTimeout(() => {
                    popup.style.transform = 'translate(-50%, -50%) scale(1.4)';
                }, 10);

                setTimeout(() => {
                    popup.style.display = 'none';
                    popup.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 1000);

            } else if (status == "remove") {
                document.querySelector(`.borrow-button.brbtn2_${prd_id}`).innerHTML = '';
                document.querySelector(`.borrow-button.brbtn2_${prd_id}`).innerHTML = '<i class="fa-solid fa-plus"   style="margin-right: 0.5rem"></i>Thêm vào giỏ mượn';
                const popup = document.getElementById('popup');
                popup.style.display = 'block';
                popup.innerHTML = '';
                popup.innerHTML = 'Đã xóa khỏi giỏ mượn';

                setTimeout(() => {
                    popup.style.transform = 'translate(-50%, -50%) scale(1.4)';
                }, 10);

                setTimeout(() => {
                    popup.style.display = 'none';
                    popup.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 1000);
            }
        }
    });

}

function themXoaGioMuon3(prd_id, userId) {
    $.ajax({
        url: "themvaogiomuon.php",
        type: "GET",
        data: {
            prd_id: prd_id,
            userId: userId
        },
        success: function () {
            const popup = document.getElementById('popup');
            popup.style.display = 'block';
            popup.innerHTML = 'Đã xóa khỏi giỏ mượn';

            setTimeout(() => {
                popup.style.transform = 'translate(-50%, -50%) scale(1.4)';
            }, 10);

            setTimeout(() => {
                popup.style.display = 'none';
                popup.style.transform = 'translate(-50%, -50%) scale(1)';
                location.reload();
            }, 1000);
        }
    });
}




function timKiemSanPham() {
    var url = window.location.href; //  URL hiện tại
    const encodeFavoStatus = url.charAt(url.indexOf("favo=") + 5);  // kiểm tra xem có đang ở trang yêu thích hay không 
    const searchInput = $('#search-input').val().trim();
    localStorage.setItem('searchInput', searchInput);
    const newUrl = `index.php?act=danhSachSanPham&currentPage=1&favo=${encodeFavoStatus}&searchInput='${searchInput}'`;
    window.location.href = newUrl;
    console.log(searchInput);
}


function xoaBoLoc(boLoc) {
    const checkedInputs = document.querySelectorAll(`input[type="checkbox"][filter="${boLoc}"]:checked`);
    checkedInputs.forEach(input => {
        input.checked = false;
    });
}

function moManHinhMuonSach(userId) {
    const cartCheckedList = Array.from(document.querySelectorAll(`input[type="checkbox"].prd-in-cart-check:checked`))
        .map(item => item.id.trim());

    var cartCheckedListUrl = '&list_prd_id=' + cartCheckedList.join(',');
    var userIdUrl = '&userId=' + userId;
    console.log(cartCheckedListUrl);  
    window.location.href = `index.php?act=taoPhieuMuonSach${cartCheckedListUrl}${userIdUrl}` ;
}

function clickGuiPhieuMuon() {
    var maHinhHienTai = document.querySelector('.card-body');
    maHinhHienTai.innerHTML = '';
    maHinhHienTai.innerHTML = `<h3> <b>Gửi yêu cầu mượn sách thành công <i class="fa-regular fa-circle-check" style="margin-left: 1rem; font-size: 2rem"></i> </b></h3>`;
    var url = window.location.href; //  URL hiện tại
     
}



function setActiveMenuBar(element, type) {
    $('.collapse-item.active').removeClass('active');
    if (type === 'parent') {
        $('.nav-item.active').removeClass('active');
        $(element).closest('.nav-item').addClass('active');
        $(element).addClass('collapsed');
        $('#collapseTwo').collapse('show');
    } else if (type === 'child') {
        $(element).addClass('active');
        $(element).closest('.nav-item').addClass('active');
    } else if (type === 'single') {
        $('.nav-item.active').removeClass('active');
        $('.collapse-item.active').removeClass('active');
        $('.nav-link.collapsed').removeClass('collapsed');
        $('#collapseTwo').collapse('hide');
    }
}


