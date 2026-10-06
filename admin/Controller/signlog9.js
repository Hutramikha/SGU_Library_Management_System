function setupFormLogin() {
    const inputUsername = document.getElementById('input_username_login');
    const labelUsername = document.getElementById('label_username_login');
    const inputPassword = document.getElementById('input_password_login');
    const labelPassword = document.getElementById('label_password_login');

    checkInputValue(inputUsername, labelUsername);
    checkInputValue(inputPassword, labelPassword);

    inputUsername.addEventListener('focus', function () {
        labelUsername.style.top = '-5px';
    });

    inputUsername.addEventListener('blur', function () {
        if (inputUsername.value === '') {
            labelUsername.style.top = '50%';
        }
    });

    inputPassword.addEventListener('focus', function () {
        labelPassword.style.top = '-5px';
    });

    inputPassword.addEventListener('blur', function () {
        if (inputPassword.value === '') {
            labelPassword.style.top = '50%';
        }
    });
}

function checkInputValue(input, label) {
    if (input.value !== '') {
        label.style.top = '-5px';
    } else {
        label.style.top = '50%';
    }
}


function setupFormRegister() {
    const inputUsername = document.getElementById('input_username_regis');
    const labelUsername = document.getElementById('label_username_regis');
    const inputPassword = document.getElementById('input_password_regis');
    const labelPassword = document.getElementById('label_password_regis');
    const inputEmail = document.getElementById('input_email_regis');
    const labelEmail = document.getElementById('label_email_regis');
    const inputrePassword = document.getElementById('input_repassword_regis');
    const labelrePassword = document.getElementById('label_repassword_regis');

    inputUsername.addEventListener('focus', function () {
        labelUsername.style.top = '-5px';
    });

    inputUsername.addEventListener('blur', function () {
        if (inputUsername.value === '') {
            labelUsername.style.top = '50%';
        }
    });

    inputPassword.addEventListener('focus', function () {
        labelPassword.style.top = '-5px';
    });

    inputPassword.addEventListener('blur', function () {
        if (inputPassword.value === '') {
            labelPassword.style.top = '50%';
        }
    });

    inputEmail.addEventListener('focus', function () {
        labelEmail.style.top = '-5px';
    });

    inputEmail.addEventListener('blur', function () {
        if (inputEmail.value === '') {
            labelEmail.style.top = '50%';
        }
    });

    inputrePassword.addEventListener('focus', function () {
        labelrePassword.style.top = '-5px';
    });

    inputrePassword.addEventListener('blur', function () {
        if (inputrePassword.value === '') {
            labelrePassword.style.top = '50%';
        }
    });
}

function goTo() {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');

    registerLink.addEventListener('click', () => {
        resetInputDN();
        wrapper.classList.add('active');
    })

    loginLink.addEventListener('click', () => {
        // resetInputDK();
        wrapper.classList.remove('active');
    })
}

function showPass() {
    const inputPasswordLogin = document.getElementById('input_password_login');
    const inputPasswordRegis = document.getElementById('input_password_regis');
    const inputrePasswordRegis = document.getElementById('input_repassword_regis');

    document.getElementById('show-pass-login').addEventListener('click', () => {
        if (inputPasswordLogin.type === 'password') {
            inputPasswordLogin.type = 'text';
            document.getElementById('show-pass-login').innerHTML = '<ion-icon name="lock-open"></ion-icon>';
            console.log('nhannnnn');
        } else {
            inputPasswordLogin.type = 'password';
            document.getElementById('show-pass-login').innerHTML = '<ion-icon name="lock-closed">';
        }
    })

    document.getElementById('show-pass-regis').addEventListener('click', () => {
        if (inputPasswordRegis.type === 'password') {
            inputPasswordRegis.type = 'text';
            document.getElementById('show-pass-regis').innerHTML = '<ion-icon name="lock-open"></ion-icon>';
            console.log('nhannnnn');
        } else {
            inputPasswordRegis.type = 'password';
            document.getElementById('show-pass-regis').innerHTML = '<ion-icon name="lock-closed">';
            console.log('nhannnnn');
        }
    })

    document.getElementById('show-repass-regis').addEventListener('click', () => {
        if (inputrePasswordRegis.type === 'password') {
            inputrePasswordRegis.type = 'text';
            document.getElementById('show-repass-regis').innerHTML = '<ion-icon name="lock-open"></ion-icon>';
            console.log('nhannnnn');
        } else {
            inputrePasswordRegis.type = 'password';
            document.getElementById('show-repass-regis').innerHTML = '<ion-icon name="lock-closed">';
            console.log('nhannnnn');
        }
    })
}


function show_close_Form() {
    // nút mở form đăng nhập - đăng ký
    const btn_show = document.getElementById('btn_form_dn_dk');

    const wrapper = document.querySelector('.wrapper');
    const btn_close = document.getElementById('icon-close');
    const overlay = document.getElementById('div_overlay');

    var cover = document.querySelector('.user__signup__login');

    btn_show.addEventListener('click', () => {
        cover.classList.add('active');
        setTimeout(() => {
            wrapper.classList.add('active_form');
            overlay.style.display = "block";
        }, 30);
    })

    btn_close.addEventListener('click', () => {
        resetInputDN();
        resetInputDK();
        resetError();
        wrapper.classList.remove('active_form');
        wrapper.classList.remove('active');
        overlay.style.display = "none";
        setTimeout(() => {
            cover.classList.remove('active');
        }, 250);
    })
}


function resetInputDN() {
    document.getElementById('input_username_login').value = '';
    document.getElementById('input_password_login').value = '';
    document.getElementById('label_username_login').style.top = '50%';
    document.getElementById('label_password_login').style.top = '50%';

    document.getElementById('input_password_login').type = 'password';
    document.getElementById('show-pass-login').innerHTML = '<ion-icon name="lock-closed">';
}

function resetInputDK() {
    document.getElementById('input_username_regis').value = '';
    document.getElementById('input_password_regis').value = '';
    document.getElementById('input_email_regis').value = '';
    document.getElementById('input_repassword_regis').value = '';
    document.getElementById('label_username_regis').style.top = '50%';
    document.getElementById('label_password_regis').style.top = '50%';
    document.getElementById('label_email_regis').style.top = '50%';
    document.getElementById('label_repassword_regis').style.top = '50%';

    document.getElementById('input_password_regis').type = 'password';
    document.getElementById('show-pass-regis').innerHTML = '<ion-icon name="lock-closed">';
    document.getElementById('input_repassword_regis').type = 'password';
    document.getElementById('show-repass-regis').innerHTML = '<ion-icon name="lock-closed">';

    document.querySelector('.wrapper').classList.remove('active');
}

function SignupAlert() {
    var s = '';
    s += '<div style="text-align: center;">' + '<img style="height: 60px; border-radius: 50px;" src="img/tick.webp" alt="">' + '</div>' +
        '<div id="add__mess" style="font-size: 1.2rem; color: #fff;">' + 'Đăng ký thành công' + '</div>';
    document.getElementById("signup_alert").innerHTML = s;
    var x = document.getElementById("signup_alert");
    x.classList.add('show');
    setTimeout(function () {
        x.classList.remove('show');
    }, 2000);
}

function closeForm() {
    console.log('kkk');
    const wrapper = document.querySelector('.wrapper');
    const overlay = document.getElementById('div_overlay');
    wrapper.classList.remove('active_form');
    wrapper.classList.remove('active');
    overlay.style.display = "none";
}

function resetError() {
    var errorUsername = document.querySelector('.error_username_login');
    var errorPassword = document.querySelector('.error_password_login');
    var errorUsernameDK = document.querySelector('.error_username_regis');
    var errorEmailDK = document.querySelector('.error_email_regis');
    var errorPassDK = document.querySelector('.error_password_regis');
    var errorRePassDK = document.querySelector('.error_repasssword_regis');

    errorUsername.classList.remove('active');
    errorPassword.classList.remove('active');
    errorUsernameDK.classList.remove('active');
    errorEmailDK.classList.remove('active');
    errorPassDK.classList.remove('active');
    errorRePassDK.classList.remove('active');

    document.querySelector('.error_login').classList.remove('active');
    document.querySelector('.error_regis').classList.remove('active');
}




// --------ajax đăng nhập-----------
$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault(); // Ngăn chặn form submit mặc định
        var username = $('#input_username_login').val();
        var password = $('#input_password_login').val();

        var usernameLuu = $('#remember-checkbox').prop('checked') ? username : "";
        var passwordLuu = $('#remember-checkbox').prop('checked') ? password : "";

        var errorUsername = document.querySelector('.error_username_login');
        var errorPassword = document.querySelector('.error_password_login');

        if (username === '') {
            errorUsername.classList.add('active');
            return;
        }

        if (password === '') {
            errorPassword.classList.add('active');
            return;
        }

        if (username !== '' && password !== '') {
            $.ajax({
                url: 'admin/DAO/dn_dk/checktk.php',
                type: 'POST',
                dataType: 'json',
                data: { usernamekk: username },
                success: function (response) {
                    console.log('Phản hồi từ checktk:', response); // Kiểm tra phản hồi
                    if (response.tttk === 'success') {
                        $.ajax({
                            url: 'admin/DAO/dn_dk/login.php',
                            type: 'POST',
                            data: { username_dn: username, password_dn: password, username_luu: usernameLuu, password_luu: passwordLuu },
                            dataType: 'json',
                            success: function (response) {
                                console.log('Phản hồi từ login:', response); // Kiểm tra phản hồi
                                if (response.status === 'success') {
                                    console.log("Đăng nhập thành công");
                                    localStorage.setItem('username', response.username);
                                    resetInputDN();
                                    closeForm();
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 250);
                                } else {
                                    document.querySelector('.error_login').classList.add('active');
                                    document.querySelector('.error_login').innerHTML = '* Tên đăng nhập hoặc mật khẩu không chính xác';
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.error('Lỗi khi gửi yêu cầu đăng nhập:', textStatus, errorThrown);
                            }
                        });
                    } else {
                        document.querySelector('.error_login').classList.add('active');
                        document.querySelector('.error_login').innerHTML = '* Tên đăng nhập hoặc mật khẩu không chính xác';
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('Lỗi khi gửi yêu cầu kiểm tra tài khoản:', textStatus, errorThrown);
                }
            });
        }
    });

    $('#input_username_login').on('input', function () {
        var errorElement = document.querySelector('.error_username_login');
        if (this.value !== '') {
            errorElement.classList.remove('active');
        }
    });

    $('#input_password_login').on('input', function () {
        var errorElement = document.querySelector('.error_password_login');
        if (this.value !== '') {
            errorElement.classList.remove('active');
        }
    });
});
//--------kết thúc-----------


// -------ajax đăng ký Khách Hàng--------
$(document).ready(function () {
    $('#regisForm').submit(function (event) {
        event.preventDefault();
        var username = $('#input_username_regis').val();
        var password = $('#input_password_regis').val();
        var email = $('#input_email_regis').val();
        var repassword = $('#input_repassword_regis').val();

        console.log(username);
        console.log(email);
        console.log(password);
        console.log(repassword);

        var errorUsernameDK = document.querySelector('.error_username_regis');
        var errorEmailDK = document.querySelector('.error_email_regis');
        var errorPassDK = document.querySelector('.error_password_regis');
        var errorRePassDK = document.querySelector('.error_repasssword_regis');


        if (username === '') {
            errorUsernameDK.classList.add('active');
            return;
        }

        if (email === '') {
            errorEmailDK.classList.add('active');
            return;
        }

        // Kiểm tra tính hợp lệ của email
        if (!validateEmail(email)) {
            errorEmailDK.innerHTML = '* Email không hợp lệ';
            errorEmailDK.classList.add('active');
            return;
        }

        if (password === '') {
            errorPassDK.classList.add('active');
            return;
        }

        // Kiểm tra mật khẩu
        if (!validatePassword(password)) {
            errorPassDK.innerHTML = '* Ít nhất 8 ký tự (có: chữ in hoa, ký tự đặc biệt, số)'
            errorPassDK.classList.add('active');
            return;
        }

        if (repassword === '') {
            errorRePassDK.classList.add('active');
            return;
        }

        // Kiểm tra mật khẩu và mật khẩu nhập lại có khớp hay không
        if (password !== repassword) {
            errorRePassDK.innerHTML = '* Mật khẩu xác nhận không trùng khớp';
            errorRePassDK.classList.add('active');
            return;
        }

        // Kiểm tra checkbox
        var agreementCheckbox = document.getElementById('checkbox_regis');
        if (!agreementCheckbox.checked) {
            document.querySelector('.error_regis').classList.add('active');
            return;
        }

        // Gửi dữ liệu đăng ký lên server
        $.ajax({
            type: 'POST',
            url: 'admin/DAO/dn_dk/signupKH.php',
            data: { username_dk: username, email: email, password_dk: password, repassword_dk: repassword },
            dataType: 'json',
            success: function (response) {
                console.log(response.status);
                if (response.status === 'success') {
                    resetInputDK();
                    SignupAlert();
                    console.log('oke');
                } else {
                    console.log('not oke');
                    errorUsernameDK.innerHTML = response.message;
                    errorUsernameDK.classList.add('active');
                }
            },
        });
    });

    $('#input_username_regis').on('input', function () {
        var errorElement = document.querySelector('.error_username_regis');
        if (this.value !== '') {
            errorElement.classList.remove('active');
        }
    });

    $('#input_password_regis').on('input', function () {
        var errorElement = document.querySelector('.error_password_regis');
        if (this.value !== '') {
            errorElement.classList.remove('active');
        }
    });

    $('#input_email_regis').on('input', function () {
        var errorElement = document.querySelector('.error_email_regis');
        if (this.value !== '') {
            errorElement.classList.remove('active');
        }
    });

    $('#input_repassword_regis').on('input', function () {
        var errorElement = document.querySelector('.error_repasssword_regis');
        if (this.value !== '') {
            errorElement.classList.remove('active');
        }
    });

    $('#checkbox_regis').on('click', function () {
        var errorElement = document.querySelector('.error_regis');
        if (this.checked) {
            errorElement.classList.remove('active');
        }
    });

});
//--------kết thúc-----------


// Hàm kiểm tra tính hợp lệ của email
function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Hàm kiểm tra mật khẩu đủ 8 ký tự, chứa ít nhất một ký tự viết hoa và một ký tự đặc biệt và một số
function validatePassword(password) {
    var regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*?])(?=.*\d)[A-Za-z\d!@#$%^&*?]{8,}$/;
    return regex.test(password);
}
//--------kết thúc-----------

$(document).ready(function () {
    $.ajax({
        url: "admin/DAO/dn_dk/cookie.php",
        type: "POST",
        success: function (response) {
            console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});





// $(document).ready(function () {
//     $('#menu__bar').on('click',function (event) {
//         var username = localStorage.getItem('username');
//         $.ajax({
//             type: 'POST',
//             url: 'phpForm/toadminbtn.php',
//             data: {
//               username: username,
//             },
//             success: function(data) {
//                 document.querySelector('.toAdim_btn').style.display="block";
//             },
//             error: function(xhr, status, error) {
//               // Xử lý lỗi
//               console.error(error);
//             }
//           });
//     })
//   });





window.addEventListener('DOMContentLoaded', (event) => {
    setupFormLogin();
    setupFormRegister();
    goTo();
    show_close_Form();
    showPass();
});

