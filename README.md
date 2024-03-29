# TKPM - PHẦN MỀM QUẢN LÝ HỌC SINH CẤP 3
## Tổng quan
Đây là phần mềm quản lý học sinh cấp 3 với các chức năng như sau:
1. Tiếp nhận học sinh (Thêm | Xóa | Sửa).
2. Lập danh sách lớp (Thêm | Xóa | Sửa).
3. Tra cứu học sinh.
4. Nhập bảng điểm môn.
5. Lập báo cáo tổng kết (Học kỳ | Môn học).
6. Thay đổi quy định.

## Phần mềm cài đặt
1. IDE: Visual Studio Code.
2. Database: PostgreSQL.
3. Browse: Microsoft Edge.
4. Cài đặt NodeJS tại https://nodejs.org/

## Tạo database
1. Tạo database rỗng "QuanLyHocSinh".
2. Restore với file script SQL ["QuanLyHocSinhCap3.sql"](sql/QuanLyHocSinhCap3.sql#section) trong folder "sql"

## Run application
1. Mở bẳng Visual Studio Code
2. Tạo file ".env" (nằm cùng mức với "index.js") và nhập các biến sau và giá trị của chúng:
   - PORT (cổng của ứng dụng)
   - PGHOST (tên host của database)
   - PGUSER (tên user của database)
   - PGPASSWORD (mật khẩu truy cập database)
   - PGDATABASE (tên của database)
   - PGPORT (cổng kết nối với database)
3. Mở terminal và nhập command line "npm install".
4. Nhập command line "npm start" để build và chạy chương trình.
