# Hướng dẫn cấu hình Supabase cho BLUE TRACE

Tài liệu này hướng dẫn từng bước để ảnh và video bạn upload từ trang quản trị `/admin` hiển thị công khai cho tất cả mọi người khi truy cập website, đồng thời ngăn người lạ chỉnh sửa hoặc xóa dữ liệu.

## Bước 1. Tạo Supabase Project
1. Truy cập https://supabase.com/dashboard và đăng nhập.
2. Chọn **New Project**, đặt tên dự án (ví dụ `blue-trace`), chọn khu vực gần Việt Nam (Singapore) và tạo mật khẩu Database.

## Bước 2. Tạo Storage Buckets
Bạn có thể chạy file `supabase/schema.sql` ở Bước 3 (đã tự động tạo 2 bucket), hoặc tạo thủ công trong **Storage -> New bucket**:
- `blue-trace-images` (bật **Public bucket** để mọi người xem được ảnh công khai).
- `blue-trace-videos` (bật **Public bucket** để phát video công khai).

## Bước 3. Chạy SQL khởi tạo Database & RLS
1. Mở **SQL Editor -> New query** trong Supabase Dashboard.
2. Sao chép toàn bộ nội dung file `supabase/schema.sql` trong dự án và nhấn **Run**.
3. Lệnh này sẽ tạo:
   - Bảng `media_items`, `articles`, `quiz_questions`, `admin_users`.
   - Bật **Row Level Security (RLS)** cho toàn bộ bảng và Storage.

## Bước 4. Tạo tài khoản Quản trị viên & Thiết lập Policies
1. Vào **Authentication -> Users -> Add user -> Create new user**.
2. Nhập Email và Mật khẩu dùng để đăng nhập vào trang `/admin`.
3. Sao chép **User UID** vừa tạo, mở lại **SQL Editor** và chạy:
   ```sql
   insert into public.admin_users (user_id, email)
   values ('DAN_USER_UID_CUA_BAN', 'email-admin@example.com');
   ```
4. Nhờ policy `is_blue_trace_admin()`, chỉ tài khoản có trong `admin_users` mới upload, sửa, ẩn/hiện hoặc xóa dữ liệu. Khách truy cập công khai chỉ có quyền đọc các mục đã xuất bản (`is_published = true`).

## Bước 5. Điền thông tin kết nối
1. Vào **Project Settings -> API** trên Supabase.
2. Sao chép **Project URL** và **anon / public key** (tuyệt đối KHÔNG dùng `service_role` key ở frontend).
3. Tạo file `.env` ở thư mục gốc dự án (dựa theo `.env.example`):
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
   ```

## Bước 6. Khởi chạy website
Chạy `npm install` (nếu chưa cài) rồi `npm run dev` (hoặc build `npm run build` để triển khai).

## Bước 7. Kiểm tra upload từ trang Quản trị
1. Truy cập đường dẫn `/admin` (hoặc nhấn liên kết **Quản trị** ở cuối trang).
2. Đăng nhập bằng Email và Mật khẩu quản trị viên đã tạo ở Bước 4.
3. Tải lên ảnh và video thực tế, chỉnh tiêu đề, chú thích, thứ tự và bật trạng thái **Xuất bản**.

## Bước 8. Kiểm tra truy cập công khai từ thiết bị khác
Mở link công khai của website trên một điện thoại khác hoặc trình duyệt ẩn danh (không đăng nhập) và vào Chương 02 (Nhật ký): toàn bộ ảnh và video đã xuất bản sẽ hiển thị ngay cho mọi người xem.
