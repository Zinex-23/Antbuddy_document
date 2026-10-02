# FR-AUT-007: Quản lý Tin nhắn mở đầu

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-003: Tin nhắn mở đầu`. |
| Mô tả | Quản lý cấu hình Tin nhắn mở đầu của từng trang ở cấp vòng đời: trạng thái rỗng, xem chi tiết, tạo mới, bật tắt và mở chỉnh sửa. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot. |
| Pre-conditions | Người dùng đã đăng nhập; trang được chọn và đã kết nối. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Tin nhắn mở đầu. |
| Luồng xử lý chính | 1. Hệ thống tải cấu hình của trang.<br>2. Nếu chưa có, hiển thị trạng thái rỗng và `Thêm mới`.<br>3. Nếu đã có, hiển thị trạng thái kích hoạt, danh sách bước, nội dung bước đang chọn, thống kê và `Chỉnh sửa`.<br>4. Người dùng chọn bước để xem; nội dung, thống kê bước và Preview đổi theo bước.<br>5. Người dùng bật hoặc tắt `Kích hoạt`; hệ thống kiểm tra cấu hình trước khi bật.<br>6. Người dùng bấm `Thêm mới` hoặc `Chỉnh sửa` để mở FR-AUT-008.<br>7. Đổi trang sẽ tải cấu hình tương ứng của trang mới. |
| Luồng thay thế và ngoại lệ | AF-1: Bật khi chưa có nội dung hợp lệ → không bật và thông báo lỗi.<br>AF-2: Lưu trạng thái kích hoạt thất bại → khôi phục toggle và thông báo.<br>AF-3: Đổi trang khi editor có thay đổi chưa lưu → cảnh báo bỏ thay đổi.<br>AF-4: Không đủ quyền → chỉ xem, không có thao tác ghi. |
| Post-condition | Trạng thái kích hoạt của đúng trang được lưu; thao tác xem không thay đổi dữ liệu; audit log ghi thay đổi toggle. |
| Giao diện hệ thống | Empty state; màn Chi tiết với `Kích hoạt`, `Chỉnh sửa`, cột bước, nội dung chỉ đọc, thống kê luồng, thống kê tổng và Mobile Preview. |
| Quy tắc nghiệp vụ | `BR-AUT-007-01`, `BR-AUT-007-02`, `BR-AUT-007-03`, `BR-AUT-007-04` |
| Yêu cầu phi chức năng | Toggle phản hồi dưới 1,5 giây P95; cô lập tenant; audit actor, page, old state, new state; hỗ trợ trạng thái loading và rollback. |
| Tiêu chí chấp nhận | `AC-AUT-007-01`, `AC-AUT-007-02`, `AC-AUT-007-03`, `AC-AUT-007-04`, `AC-AUT-007-05` |
| Dependency | FR-AUT-008; FR-AUT-009. |

