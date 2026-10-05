# FR-AUT-012: Cấu hình Tin nhắn mặc định

| Mục | Nội dung |
|---|---|
| Mục đích | Quản lý cấu hình fallback message của một trang. |
| Trong phạm vi | Bật/tắt; cờ Mặc định; tần suất hiển thị; mở FR-AUT-002 để soạn; Preview; lưu/publish qua FR-AUT-004. |
| Ngoài phạm vi | Không quyết định khi nào fallback chạy hoặc gửi tin (FR-AUT-013). |
| Đối tượng liên quan | Admin; Quản lý. |
| Pre-conditions | Page context hợp lệ. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Tin nhắn mặc định. |
| Luồng xử lý chính | 1. Tải cấu hình và trạng thái.<br>2. Hiển thị Kích hoạt, Mặc định, tần suất và chi tiết bước.<br>3. Chọn bước chỉ đổi Preview/thống kê.<br>4. `Chỉnh sửa` mở FR-AUT-002 với owner Default Message.<br>5. Nhận content graph và cập nhật cờ Mặc định.<br>6. Lưu/publish qua FR-AUT-004.<br>7. Toggle Kích hoạt chỉ bật với published content hợp lệ. |
| Ngoại lệ | AF-1: Bật khi chưa có content → từ chối.<br>AF-2: Content/capability lỗi → chặn publish.<br>AF-3: Toggle API lỗi → rollback.<br>AF-4: Rời màn có dirty state → xác nhận. |
| Kết quả | Trang có một fallback config published rõ ràng và trạng thái enabled/default. |
| Dữ liệu sở hữu | `defaultMessageConfig`: pageId, contentGraphId, enabled, isDefault, frequency; không sở hữu delivery events. |
| Giao diện | Kích hoạt; tần suất; Mặc định; Chỉnh sửa; cột bước; Preview; hai vùng thống kê chỉ đọc. |
| Quy tắc nghiệp vụ | `BR-AUT-012-01`, `BR-AUT-012-02`, `BR-AUT-012-03`, `BR-AUT-012-04` |
| Tiêu chí chấp nhận | `AC-AUT-012-01`, `AC-AUT-012-02`, `AC-AUT-012-03`, `AC-AUT-012-04` |
| Yêu cầu phi chức năng | Toggle dưới 1,5 giây P95; audit; cô lập theo page. |
| Dependency | FR-AUT-001; FR-AUT-002; FR-AUT-004; FR-AUT-013. |

