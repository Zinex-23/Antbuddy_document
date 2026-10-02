# FR-AUT-010: Quản lý Tin nhắn mặc định

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-004: Thiết lập tin nhắn mặc định`. |
| Mô tả | Quản lý cấu hình Tin nhắn mặc định của từng trang ở cấp tổng quan: xem chi tiết, chọn bước, bật tắt `Kích hoạt`, quản lý cờ `Mặc định` và mở chỉnh sửa. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot. |
| Pre-conditions | Người dùng đã đăng nhập; trang được chọn và kết nối. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Tin nhắn mặc định. |
| Luồng xử lý chính | 1. Hệ thống tải cấu hình, trạng thái, tần suất và thống kê.<br>2. Hiển thị `Kích hoạt`, `Gửi 1 lần trong 24 giờ`, `Gửi ngay lập tức`, `Mặc định`, `Chỉnh sửa`, cột luồng, hai vùng thống kê và Preview.<br>3. Người dùng chọn bước để xem nội dung, thống kê bước và Preview.<br>4. Gạt `Kích hoạt` để bật hoặc tắt runtime; thay đổi có hiệu lực ngay sau validation.<br>5. Bấm `Chỉnh sửa` để mở FR-AUT-011.<br>6. Cờ `Mặc định` được chỉnh trong editor và chỉ lưu khi cập nhật.<br>7. Đổi trang sẽ tải cấu hình của trang mới. |
| Luồng thay thế và ngoại lệ | AF-1: Bật Kích hoạt khi chưa có nội dung → từ chối và báo `Chưa có nội dung tin nhắn mặc định`.<br>AF-2: Lưu toggle lỗi → rollback trạng thái.<br>AF-3: Trang hoặc connector không hỗ trợ → chỉ xem và giải thích nguyên nhân.<br>AF-4: Đổi trang khi có dirty state → cảnh báo bỏ thay đổi. |
| Post-condition | Trạng thái kích hoạt đúng trang được lưu; thao tác xem không thay đổi cấu hình; audit log ghi thay đổi. |
| Giao diện hệ thống | Thanh công cụ; cột `Luồng`; `Thống kê luồng`; `Thống kê Tin nhắn mặc định`; Mobile Preview; `Chỉnh sửa`. |
| Quy tắc nghiệp vụ | `BR-AUT-010-01`, `BR-AUT-010-02`, `BR-AUT-010-03`, `BR-AUT-010-04` |
| Yêu cầu phi chức năng | Toggle dưới 1,5 giây P95; audit đầy đủ; rollback khi lỗi; cô lập dữ liệu theo trang. |
| Tiêu chí chấp nhận | `AC-AUT-010-01`, `AC-AUT-010-02`, `AC-AUT-010-03`, `AC-AUT-010-04`, `AC-AUT-010-05` |
| Dependency | FR-AUT-011; FR-AUT-012. |

