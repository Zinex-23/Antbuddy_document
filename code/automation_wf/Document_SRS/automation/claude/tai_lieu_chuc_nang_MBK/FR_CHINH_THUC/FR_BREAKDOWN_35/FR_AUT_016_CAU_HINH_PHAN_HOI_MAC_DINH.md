# FR-AUT-016: Cấu hình phản hồi mặc định

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép chọn hoặc biên soạn phản hồi mặc định của một kênh, cấu hình trạng thái kích hoạt, khoảng nghỉ và thiết lập gửi. Nội dung sử dụng trình biên soạn chung; quyết định khi nào gửi thuộc FR-AUT-017. |
| Đối tượng liên quan | **Người quản trị:** cấu hình nội dung và thiết lập gửi.<br>**Hệ thống:** kiểm tra, áp dụng và cung cấp cấu hình cho FR-AUT-017.<br>**Khách hàng:** nhận phản hồi khi đủ điều kiện. |
| Pre-conditions | Người dùng có quyền; kênh hoạt động; nội dung và chính sách gửi phù hợp nền tảng. |
| Điều kiện kích hoạt | Người dùng mở Automation → Tin nhắn mặc định hoặc thay đổi nội dung, khoảng nghỉ, thời điểm gửi hay công tắc. |
| Luồng xử lý chính | 1. Hệ thống hiển thị cấu hình hiện hành.<br>2. Người dùng chọn luồng có sẵn, tạo nội dung mới hoặc chọn trợ lý AI nếu phương án đó được phê duyệt.<br>3. Người dùng đặt khoảng nghỉ, tần suất, độ trễ và trạng thái bật/tắt.<br>4. Người dùng xem thử.<br>5. Hệ thống kiểm tra và lưu hoặc áp dụng.<br>6. FR-AUT-017 dùng đúng bản đã áp dụng và đang bật. |
| Post-condition | Kênh có một cấu hình phản hồi mặc định hợp lệ, với nội dung, trạng thái và thiết lập gửi rõ ràng. |
| Luồng thay thế | - Thiếu nội dung hoặc thiết lập ngoài giới hạn: chặn áp dụng hoặc bật.<br>- Luồng hoặc trợ lý AI đích bị xóa: ngừng sử dụng và hiển thị **Cần cấu hình lại**.<br>- Kênh mất kết nối: cho phép lưu nháp nhưng không cho áp dụng.<br>- Tắt chức năng: không gửi cho sự kiện chưa xử lý.<br>- Rời màn hình khi chưa lưu: yêu cầu xác nhận. |
| Sub-flow | **[Cần xác nhận]**: phản hồi mặc định là luồng nhiều bước, trợ lý AI hay hỗ trợ cả hai; ý nghĩa công tắc “Mặc định”; đơn vị và giới hạn tần suất/độ trễ.<br>**Xem thử:** không bắt đầu khoảng nghỉ hoặc tạo số liệu thật.<br>**Thống kê:** chỉ đọc từ FR-AUT-035. |
| Giao diện hệ thống | Công tắc kích hoạt; lựa chọn tạo/chọn luồng hoặc trợ lý AI; trường tần suất, khoảng nghỉ và độ trễ; trình biên soạn; bản xem trước; trạng thái bản nháp/bản áp dụng; nút lưu/áp dụng. |
| Yêu cầu phi chức năng | Nội dung đã lưu không bị mất; dữ liệu từng kênh được tách biệt; xem thử không ảnh hưởng hoạt động thực tế; mọi thay đổi cấu hình đều có lịch sử thao tác. |
| AC tương ứng | - **AC-AUT-016-01:** Thiếu nội dung hoặc thiết lập ngoài giới hạn thì không thể áp dụng hoặc bật.<br>- **AC-AUT-016-02:** Nội dung hợp lệ được lưu cho đúng kênh và không ảnh hưởng kênh khác.<br>- **AC-AUT-016-03:** Đối tượng nội dung bị xóa làm cấu hình hiển thị **Cần cấu hình lại** và không gửi mới.<br>- **AC-AUT-016-04:** Xem thử không tạo lần gửi, khoảng nghỉ hoặc số liệu thực tế. |
| BR tương ứng | - **BR-AUT-016-01:** Mỗi kênh có tối đa một cấu hình phản hồi mặc định đang áp dụng.<br>- **BR-AUT-016-02:** Chỉ bản đã áp dụng, đang bật và có nội dung hợp lệ mới được FR-AUT-017 dùng.<br>- **BR-AUT-016-03:** Tắt/sửa cấu hình không thu hồi tin đã gửi.<br>- **BR-AUT-016-04:** Khoảng nghỉ, tần suất và độ trễ phải là thiết lập hiển thị, không dùng giá trị ngầm. |
