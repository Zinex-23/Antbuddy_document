# FR-AUT-014: Cấu hình tin nhắn mở đầu

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép chọn luồng có sẵn hoặc biên soạn nội dung lời chào của một kênh và bật/tắt chức năng. Nội dung sử dụng FR-AUT-001 đến FR-AUT-005; điều kiện gửi thực tế thuộc FR-AUT-015. |
| Đối tượng liên quan | **Người quản trị:** cấu hình, xem thử và kích hoạt.<br>**Hệ thống:** kiểm tra nội dung và duy trì phiên bản.<br>**Khách hàng:** nhận bản đã áp dụng khi đủ điều kiện. |
| Pre-conditions | Người dùng có quyền; kênh đang hoạt động; nội dung đáp ứng chính sách kênh; trình biên soạn dùng chung khả dụng. |
| Điều kiện kích hoạt | Người dùng mở Automation → Tin nhắn mở đầu, chọn tạo mới/chọn luồng có sẵn hoặc thay đổi công tắc. |
| Luồng xử lý chính | 1. Hệ thống hiển thị cấu hình hiện hành và số liệu tóm tắt nếu có.<br>2. Người dùng chọn luồng có sẵn hoặc tạo nội dung qua trình biên soạn.<br>3. Người dùng xem trước/xem thử.<br>4. Hệ thống kiểm tra toàn bộ bước và đối tượng đích.<br>5. Người dùng lưu/áp dụng và bật hoặc tắt.<br>6. Cấu hình hợp lệ được FR-AUT-015 sử dụng cho các phiên mới đủ điều kiện. |
| Post-condition | Kênh có tối đa một cấu hình Tin nhắn mở đầu đã áp dụng, với nội dung và trạng thái bật/tắt rõ ràng. |
| Luồng thay thế | - Thiếu nội dung/bước lỗi: chặn bật hoặc áp dụng.<br>- Luồng được chọn bị xóa: chuyển **Cần cấu hình lại** và ngừng gửi mới.<br>- Kênh mất kết nối: lưu nháp được nhưng không áp dụng.<br>- Tắt chức năng: không gửi cho sự kiện chưa xử lý; không thu hồi tin đã gửi.<br>- Công tắc có hiệu lực ngay hay sau lưu: **[Cần xác nhận và thống nhất giao diện.]** |
| Sub-flow | **Tạo mới:** dùng trình biên soạn chung.<br>**Chọn có sẵn:** giữ tham chiếu hoặc sao chép theo quyết định sản phẩm.<br>**Phiên bản:** phiên đã bắt đầu không tự đổi nội dung khi có bản mới.<br>**Thống kê:** chỉ đọc từ FR-AUT-035. |
| Giao diện hệ thống | Trạng thái rỗng/đã cấu hình; công tắc kích hoạt; nút tạo/chọn/chỉnh sửa nội dung; bản xem trước; nút lưu/áp dụng; trạng thái bản nháp/bản áp dụng và khối thống kê. |
| Yêu cầu phi chức năng | Lưu không mất nội dung; xem thử không gửi thật; quyền bật/tắt có thể tách khỏi quyền sửa; dữ liệu cá nhân trong bản thử được che. |
| AC tương ứng | - **AC-AUT-014-01:** Khi chưa có nội dung, hệ thống hiển thị trạng thái rỗng và không cho bật.<br>- **AC-AUT-014-02:** Nội dung hợp lệ được lưu hoặc áp dụng mà không ảnh hưởng kênh khác.<br>- **AC-AUT-014-03:** Luồng đích bị xóa làm cấu hình ngừng gửi mới và hiển thị **Cần cấu hình lại**.<br>- **AC-AUT-014-04:** Xem trước hoặc xem thử không tạo lần gửi thực tế. |
| BR tương ứng | - **BR-AUT-014-01:** Mỗi kênh có tối đa một cấu hình Tin nhắn mở đầu đang áp dụng.<br>- **BR-AUT-014-02:** Chỉ nội dung hoàn chỉnh, đã áp dụng và đang bật mới được FR-AUT-015 sử dụng.<br>- **BR-AUT-014-03:** Tắt/sửa cấu hình không hoàn tác tin đã gửi.<br>- **BR-AUT-014-04:** Nội dung và các bước tuân theo quy tắc của trình biên soạn dùng chung. |
