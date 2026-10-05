# FR-AUT-017: Danh mục Kịch bản chăm sóc

| Mục | Nội dung |
| --- | --- |
| Mục đích | Cho phép người dùng tạo và quản lý danh sách Kịch bản chăm sóc trước khi cấu hình các bước gửi. |
| Trong phạm vi | Hiển thị danh sách; tìm kiếm; tạo mới; đổi tên; sao chép; bật hoặc tắt; xóa kịch bản. |
| Ngoài phạm vi | Không cấu hình nội dung từng bước; không đăng ký khách hàng; không thực thi gửi tin; không tính số liệu vận hành. Các nội dung này thuộc FR-AUT-018 và FR-AUT-019. |
| Đối tượng liên quan | Admin; Quản lý có quyền quản trị Automation. |
| Pre-conditions | Người dùng đã đăng nhập, có quyền truy cập Automation và đã chọn trang hợp lệ theo FR-AUT-001. |
| Điều kiện kích hoạt | Người dùng vào AntBot → Kịch bản chăm sóc. |
| Luồng xử lý chính | 1. Hệ thống tải danh sách kịch bản của trang đang chọn.<br>2. Người dùng tìm kiếm hoặc chọn một kịch bản.<br>3. Người dùng tạo mới, đổi tên, sao chép, bật hoặc tắt kịch bản.<br>4. Người dùng chọn Chỉnh sửa để chuyển sang FR-AUT-018.<br>5. Người dùng chọn Xóa; hệ thống kiểm tra ràng buộc và yêu cầu xác nhận trước khi xóa. |
| Ngoại lệ | 1. Không có dữ liệu: hiển thị trạng thái trống và hành động tạo mới.<br>2. Tên không hợp lệ hoặc trùng theo quy tắc hệ thống: không lưu và hiển thị lỗi tại trường tên.<br>3. Kịch bản đang có khách hàng hoạt động: không cho xóa; hướng dẫn người dùng dừng đăng ký hoặc tắt kịch bản.<br>4. Tải danh sách thất bại: hiển thị lỗi và cho phép thử lại. |
| Kết quả | Danh mục kịch bản được cập nhật; việc chỉnh sửa cấu trúc và vận hành chưa được thực hiện trong FR này. |
| Dữ liệu sở hữu | `sequence.id`, `sequence.name`, `sequence.status`, `sequence.createdAt`, `sequence.updatedAt`. |
| Giao diện | Trang danh sách gồm bộ tìm kiếm, bảng hoặc danh sách kịch bản, trạng thái, menu thao tác và nút tạo mới; dialog xác nhận xóa. |
| Quy tắc nghiệp vụ | `BR-AUT-017-01`, `BR-AUT-017-02`, `BR-AUT-017-03`, `BR-AUT-017-04` |
| Tiêu chí chấp nhận | `AC-AUT-017-01`, `AC-AUT-017-02`, `AC-AUT-017-03`, `AC-AUT-017-04` |
| Yêu cầu phi chức năng | Danh sách phản hồi trong 1,5 giây ở điều kiện bình thường; thao tác thay đổi phải được phân quyền và ghi audit log. |
| Dependency | FR-AUT-001 cung cấp ngữ cảnh trang và quyền. FR-AUT-018 nhận kịch bản được chọn để cấu hình bước. FR-AUT-019 sử dụng kịch bản đã bật để vận hành. |
