# Hệ thống quản lý mượn sách

Ứng dụng web hỗ trợ thư viện quản lý sách, độc giả, nhân viên và các hoạt động mượn trả sách. Dự án được xây dựng nhằm số hóa các quy trình nghiệp vụ cơ bản của thư viện, giúp việc tra cứu, lập phiếu mượn, theo dõi trạng thái sách và quản lý dữ liệu thuận tiện hơn.

## 1. Tổng quan

Hệ thống phục vụ hai nhóm người dùng chính:

- **Độc giả:** tra cứu sách, lọc sách theo thể loại hoặc tác giả, xem chi tiết sách, thêm sách yêu thích, thêm sách vào giỏ mượn, gửi yêu cầu mượn và theo dõi lịch sử mượn.
- **Nhân viên thư viện và quản trị viên:** quản lý sách, độc giả, nhân viên, tài khoản, phiếu nhập, phiếu mượn, phiếu trả, tác giả, nhà xuất bản, nhà cung cấp, thể loại, trạng thái sách, hình thức phạt, phân quyền và thống kê.

## 2. Chức năng chính

### Dành cho độc giả

- Tìm kiếm sách theo tên sách hoặc tác giả.
- Lọc danh sách sách theo thể loại và tác giả.
- Xem thông tin chi tiết và trạng thái của sách.
- Thêm hoặc xóa sách khỏi danh sách yêu thích.
- Thêm hoặc xóa sách khỏi giỏ mượn.
- Gửi phiếu yêu cầu mượn sách.
- Xem danh sách sách đang mượn.
- Xem lịch sử mượn sách.

### Dành cho nhân viên và quản trị viên

- Quản lý thông tin sách và chi tiết từng quyển sách.
- Quản lý độc giả, nhân viên và tài khoản.
- Quản lý phiếu mượn, xem chi tiết và xử lý phiếu mượn.
- Quản lý phiếu trả và cập nhật trạng thái sách sau khi trả.
- Quản lý phiếu nhập sách.
- Quản lý tác giả, nhà xuất bản, nhà cung cấp và thể loại.
- Quản lý trạng thái sách và hình thức phạt.
- Quản lý chức năng và phân quyền người dùng.
- Tra cứu dữ liệu và hiển thị thống kê phục vụ quản lý thư viện.

## 3. Quy trình nghiệp vụ tiêu biểu

### Quy trình mượn sách

1. Độc giả tìm kiếm và chọn sách cần mượn.
2. Độc giả thêm sách vào giỏ mượn và gửi yêu cầu mượn.
3. Nhân viên xem thông tin phiếu mượn và kiểm tra yêu cầu.
4. Nhân viên xử lý phiếu mượn, cập nhật thông tin giao dịch và trạng thái sách.
5. Hệ thống lưu lại thông tin phiếu mượn để phục vụ theo dõi và tra cứu.

### Quy trình trả sách

1. Nhân viên tiếp nhận sách được trả.
2. Hệ thống kiểm tra thông tin mượn và thời hạn trả.
3. Nhân viên cập nhật tình trạng sách và thông tin phiếu trả.
4. Hệ thống ghi nhận phí phạt nếu phát sinh.
5. Trạng thái sách được cập nhật để có thể tiếp tục quản lý và cho mượn.

## 4. Công nghệ sử dụng

- **PHP:** xử lý logic phía máy chủ, điều hướng trang, xử lý biểu mẫu và các chức năng nghiệp vụ.
- **MySQL:** lưu trữ dữ liệu sách, độc giả, nhân viên, tài khoản và giao dịch thư viện.
- **HTML/CSS:** xây dựng cấu trúc và định dạng giao diện.
- **JavaScript:** xử lý tương tác phía trình duyệt và cập nhật giao diện động.
- **jQuery và AJAX:** gửi yêu cầu không đồng bộ giữa giao diện và các API PHP.
- **Bootstrap 4 và SB Admin 2:** xây dựng layout, bảng dữ liệu, biểu mẫu và giao diện quản trị.
- **Font Awesome:** cung cấp biểu tượng cho giao diện.

## 5. Cấu trúc thư mục chính

```text
.
├── index.php                 # Điểm vào chính của giao diện độc giả
├── header.php                # Thành phần đầu trang và menu
├── footer.php                # Thành phần cuối trang
├── model/                    # Các hàm kết nối và truy vấn cơ sở dữ liệu
├── sanpham/                  # Chức năng danh sách và chi tiết sách
├── thuvien/
│   ├── Controller/           # JavaScript điều khiển các màn hình quản trị
│   ├── DAO/                  # Các PHP endpoint thao tác dữ liệu
│   ├── GUI/                  # Giao diện đăng nhập và quản trị
│   └── img/                  # Hình ảnh sử dụng trong giao diện thư viện
├── phieumuon/                # Xử lý dữ liệu phiếu mượn
├── css/                      # CSS của ứng dụng
├── js/                       # JavaScript dùng chung và thư viện giao diện
├── scss/                     # Mã nguồn SCSS tùy chỉnh giao diện
├── vendor/                   # Các thư viện phía giao diện
└── QLTV_img_sach/            # Hình ảnh và dữ liệu phân loại sách
```

## 6. Yêu cầu môi trường

- PHP 7.4 trở lên.
- MySQL hoặc MariaDB.
- Apache hoặc một web server tương thích PHP, có thể sử dụng XAMPP.
- Trình duyệt web hiện đại.

## 7. Cài đặt và chạy dự án

1. Clone hoặc tải dự án về thư mục web server, ví dụ thư mục `htdocs` của XAMPP.

	```bash
	git clone <dia-chi-repository>
	```

2. Khởi động Apache và MySQL trong XAMPP.

3. Tạo cơ sở dữ liệu có tên `thuvien` trong MySQL.

4. Kiểm tra thông tin kết nối cơ sở dữ liệu trong các file PHP kết nối dữ liệu, đặc biệt là:

	- `model/pdo.php`
	- `thuvien/DAO/database/connect.php`

	Thông tin mặc định của dự án đang sử dụng máy chủ `localhost`, tài khoản `root`, mật khẩu rỗng và cơ sở dữ liệu `thuvien`. Cần điều chỉnh lại nếu môi trường máy local có cấu hình khác.

5. Truy cập giao diện người dùng tại địa chỉ tương ứng, ví dụ:

	```text
	http://localhost/SGU_Book_Borrow_System/
	```

6. Truy cập giao diện quản trị thông qua trang quản trị trong thư mục `thuvien/GUI/` sau khi cấu hình tài khoản và dữ liệu cần thiết.

> Lưu ý: Dự án cần có cấu trúc bảng và dữ liệu tương ứng trong cơ sở dữ liệu `thuvien` trước khi các chức năng truy vấn và quản lý có thể hoạt động đầy đủ.

## 8. Định hướng phân tích và thiết kế

Trong quá trình thực hiện dự án, nhóm đã phân tích các quy trình nghiệp vụ của hệ thống quản lý thư viện và mô hình hóa chúng bằng nhiều loại sơ đồ, gồm:

- Sơ đồ chức năng nghiệp vụ (BFD).
- Sơ đồ Use Case.
- Sơ đồ Sequence.
- Sơ đồ Activity.
- Sơ đồ luồng dữ liệu (DFD).
- Sơ đồ thực thể liên kết (ERD).
- Sơ đồ Class.

Các mô hình này được sử dụng để làm rõ yêu cầu, luồng xử lý, dữ liệu và mối liên hệ giữa các chức năng trước khi triển khai hệ thống.

## 9. Vai trò cá nhân trong dự án

- Phân tích và đặc tả phần lớn yêu cầu nghiệp vụ của hệ thống.
- Trực tiếp xây dựng phần lớn Use Case Diagram, Sequence Diagram và BFD.
- Hướng dẫn các thành viên phân tích và xây dựng ERD, Class Diagram, DFD và Activity Diagram.
- Phối hợp với các thành viên để đảm bảo sự thống nhất giữa yêu cầu nghiệp vụ, mô hình hệ thống và chức năng triển khai.

## Mục tiêu học tập

Dự án giúp nhóm thực hành quy trình phân tích, thiết kế và triển khai một hệ thống thông tin, đồng thời rèn luyện các kỹ năng thu thập yêu cầu, mô hình hóa nghiệp vụ, thiết kế cơ sở dữ liệu, làm việc nhóm và phát triển ứng dụng web.

