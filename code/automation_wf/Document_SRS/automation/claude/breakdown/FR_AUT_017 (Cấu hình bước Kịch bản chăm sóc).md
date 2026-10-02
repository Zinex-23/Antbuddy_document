# FR-AUT-017: Cấu hình bước Kịch bản chăm sóc

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-006: Kịch bản chăm sóc`. |
| Mô tả | Cho phép thêm, sửa, sao chép, xóa và bật tắt các bước Tin nhắn hoặc Hành động; cấu hình lịch gửi và điều kiện lọc cho từng bước. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot. |
| Pre-conditions | Kịch bản tồn tại; người dùng có quyền ghi; action/content catalog sẵn sàng. |
| Điều kiện kích hoạt | Mở Cài đặt kịch bản từ FR-AUT-016 và bấm `Thêm mới` hoặc sửa một bước. |
| Luồng xử lý chính | 1. Hiển thị bảng bước với Kích hoạt, thời điểm gửi, nội dung, Đã gửi, Khách để lại thông tin và menu ngữ cảnh.<br>2. Bấm `Thêm mới`, chọn `Tin nhắn` hoặc `Hành động`.<br>3. Popup `Cài đặt gửi tin` cấu hình mốc thời gian sau đăng ký, giờ gửi và điều kiện lọc.<br>4. Lưu schedule hợp lệ.<br>5. Với Tin nhắn, mở editor nội dung để cấu hình text, media, nút và trả lời nhanh rồi `Cập nhật`.<br>6. Với Hành động, mở `Thêm hành động`, chọn đúng một action và nhập tham số rồi `Lưu`.<br>7. Bước hoàn tất được lưu và quay về bảng.<br>8. Người dùng có thể bật tắt bước, sửa schedule, sao chép hoặc xóa qua menu dòng. |
| Luồng thay thế và ngoại lệ | AF-1: Thời điểm âm, thiếu đơn vị hoặc giờ gửi sai → báo lỗi.<br>AF-2: Filter thiếu field/operator/value → chặn lưu.<br>AF-3: Tin nhắn hoặc action chưa hoàn tất → bước giữ tắt và gắn trạng thái cần cấu hình.<br>AF-4: Reference action/flow/tag bị xóa → tự tắt bước và đánh dấu.<br>AF-5: Xóa bước đã có lịch → hủy job tương lai của bước; giữ lịch sử đã chạy.<br>AF-6: Sửa schedule khi có subscriber → tính lại chỉ các job chưa chạy theo policy, không chạy lại bước đã hoàn tất.<br>AF-7: Bật bước lỗi → rollback toggle. |
| Post-condition | Bước hợp lệ được lưu với loại, schedule, filter, payload và trạng thái; bảng sắp xếp theo thời điểm gửi tăng dần. |
| Giao diện hệ thống | Bảng bước; menu chọn loại; popup `Cài đặt gửi tin`; editor Tin nhắn; popup `Thêm hành động`; toggle `Kích hoạt`; menu ba chấm. |
| Quy tắc nghiệp vụ | `BR-AUT-017-01`, `BR-AUT-017-02`, `BR-AUT-017-03`, `BR-AUT-017-04`, `BR-AUT-017-05`, `BR-AUT-017-06` |
| Yêu cầu phi chức năng | Cập nhật bước dưới 1,5 giây P95; reschedule idempotent; validate dependency; audit old/new schedule và state. |
| Tiêu chí chấp nhận | `AC-AUT-017-01`, `AC-AUT-017-02`, `AC-AUT-017-03`, `AC-AUT-017-04`, `AC-AUT-017-05`, `AC-AUT-017-06` |
| Dependency | FR-AUT-016; FR-AUT-018; content editor; shared action catalog; scheduler. |

