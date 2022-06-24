# TKPM - PHẦN MỀM QUẢN LÝ HỌC SINH CẤP 3


## Phần mềm cài đặt
1. IDE: Visual Studio Code.
2. Database: PostgreSQL.
3. Browse: Microsoft Edge.
4. Cài đặt NodeJS tại https://nodejs.org/

## Tạo database
1. Tạo database rỗng "QuanLyHocSinh".
2. Restore với file script SQL "QuanLyHocSinhCap3.sql" trong folder "sql" ([linky](sql/QuanLyHocSinhCap3.sql#section))

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
