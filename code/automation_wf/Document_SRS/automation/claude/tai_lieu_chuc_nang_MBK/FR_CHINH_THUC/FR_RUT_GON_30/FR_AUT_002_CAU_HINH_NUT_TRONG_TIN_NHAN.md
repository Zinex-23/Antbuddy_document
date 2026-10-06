# FR-AUT-002: Cấu hình nút trong tin nhắn

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép thêm nút vào tin nhắn, đặt tên nút và chọn hành động xảy ra khi khách bấm. |
| Đối tượng liên quan | **Người quản trị:** cấu hình nút.<br>**Khách hàng:** bấm nút trong tin nhắn.<br>**Hệ thống:** kiểm tra và thực hiện hành động. |
| Pre-conditions | Đã có bước tin nhắn; kênh hỗ trợ nút; người dùng có quyền chỉnh sửa. |
| Điều kiện kích hoạt | Người dùng chọn **Thêm nút** hoặc chỉnh sửa một nút đã có. |
| Luồng xử lý chính | 1. Người dùng nhập tên nút.<br>2. Người dùng chọn hành động, như mở trang web, gọi điện hoặc chạy một luồng.<br>3. Người dùng nhập thông tin mà hành động yêu cầu.<br>4. Hệ thống kiểm tra dữ liệu và giới hạn của kênh.<br>5. Người dùng lưu và xem trước. |
| Post-condition | Nút hợp lệ được lưu đúng vị trí và sẵn sàng hoạt động khi tin nhắn được gửi. |
| Luồng thay thế | - Thiếu tên, hành động hoặc thông tin bắt buộc: không cho lưu.<br>- Địa chỉ web hoặc số điện thoại sai: đánh dấu trường lỗi.<br>- Đối tượng đích bị xóa: hiển thị **Cần cấu hình lại**.<br>- Lượt bấm được nhận lại: không thực hiện hành động lần hai. |
| Sub-flow | **Sắp xếp:** người dùng có thể đổi thứ tự nút.<br>**Hành động:** chỉ hiển thị các hành động được kênh hỗ trợ.<br>**[Cần xác nhận]**: số nút, độ dài tên và danh mục hành động của từng kênh. |
| Giao diện hệ thống | Danh sách nút; trường tên; danh sách hành động; các trường theo hành động; kéo thả sắp xếp; xem trước; lỗi tại từng trường. |
| Yêu cầu phi chức năng | Dữ liệu đầu vào được kiểm tra an toàn; một lượt bấm chỉ được xử lý một lần; xem thử không thực hiện hành động thật. |
| AC tương ứng | - **AC-AUT-002-01:** Người dùng tạo được nút có tên và hành động hợp lệ.<br>- **AC-AUT-002-02:** Thiếu thông tin hoặc vượt giới hạn thì không thể lưu.<br>- **AC-AUT-002-03:** Thứ tự nút trong xem trước giống thứ tự đã lưu.<br>- **AC-AUT-002-04:** Một lượt bấm không tạo tác động trùng. |
| BR tương ứng | - **BR-AUT-002-01:** Mỗi nút có đúng một tên và một hành động.<br>- **BR-AUT-002-02:** Hành động phải được kênh hỗ trợ và còn hiệu lực.<br>- **BR-AUT-002-03:** Số lượng và độ dài tên nút tuân theo giới hạn của kênh.<br>- **BR-AUT-002-04:** Nút không hợp lệ không được phát hành cho khách. |
