# FR-AUT-010: Cấu hình Tin nhắn mở đầu

| Mục | Nội dung |
|---|---|
| Mục đích | Quản lý cấu hình Tin nhắn mở đầu của một trang. |
| Trong phạm vi | Empty state; bật/tắt; xem chi tiết; mở FR-AUT-002 để soạn nội dung; Preview; lưu/publish qua FR-AUT-004. |
| Ngoài phạm vi | Không định nghĩa editor dùng chung; không xác định session mới hoặc gửi tin (FR-AUT-011). |
| Đối tượng liên quan | Admin; Quản lý. |
| Pre-conditions | Page context hợp lệ. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Tin nhắn mở đầu. |
| Luồng xử lý chính | 1. Tải cấu hình của trang.<br>2. Nếu rỗng, hiển thị `Thêm mới`.<br>3. Nếu có, hiển thị trạng thái, các bước và thống kê do FR-AUT-011 cung cấp.<br>4. `Thêm mới`/`Chỉnh sửa` mở FR-AUT-002 với owner là Welcome Message.<br>5. Nhận content graph hợp lệ và cập nhật draft.<br>6. Lưu/publish qua FR-AUT-004.<br>7. Toggle `Kích hoạt` chỉ bật khi có published content hợp lệ. |
| Ngoại lệ | AF-1: Bật khi chưa có nội dung → từ chối.<br>AF-2: Content graph lỗi → chặn publish.<br>AF-3: Toggle lỗi → rollback.<br>AF-4: Rời trang có dirty state → xác nhận. |
| Kết quả | Trang có tối đa một cấu hình Tin nhắn mở đầu và trạng thái kích hoạt rõ ràng. |
| Dữ liệu sở hữu | `welcomeMessageConfig`: pageId, contentGraphId, enabled; không sở hữu session hoặc event gửi. |
| Giao diện | Empty state; `Kích hoạt`; `Thêm mới`/`Chỉnh sửa`; danh sách bước chỉ đọc; Preview; thống kê chỉ đọc. |
| Quy tắc nghiệp vụ | `BR-AUT-010-01`, `BR-AUT-010-02`, `BR-AUT-010-03`, `BR-AUT-010-04` |
| Tiêu chí chấp nhận | `AC-AUT-010-01`, `AC-AUT-010-02`, `AC-AUT-010-03`, `AC-AUT-010-04` |
| Yêu cầu phi chức năng | Toggle dưới 1,5 giây P95; audit; state không mất khi editor lỗi. |
| Dependency | FR-AUT-001; FR-AUT-002; FR-AUT-004; FR-AUT-011. |

