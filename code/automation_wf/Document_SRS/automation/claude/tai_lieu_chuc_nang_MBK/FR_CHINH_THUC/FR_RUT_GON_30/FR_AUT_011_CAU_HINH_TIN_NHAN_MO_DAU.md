# FR-AUT-011: Cấu hình tin nhắn mở đầu

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép chọn hoặc soạn nội dung chào khách khi bắt đầu hội thoại và bật hoặc tắt chức năng này. |
| Đối tượng liên quan | **Người quản trị:** cấu hình nội dung và trạng thái.<br>**Khách hàng:** nhận lời chào.<br>**Hệ thống:** lưu và cung cấp cấu hình cho FR-AUT-012. |
| Pre-conditions | Người dùng có quyền; kênh đang hoạt động; nội dung được chọn còn hiệu lực. |
| Điều kiện kích hoạt | Người dùng mở **Tin nhắn mở đầu**, thay đổi nội dung hoặc trạng thái bật tắt. |
| Luồng xử lý chính | 1. Hệ thống hiển thị cấu hình hiện tại.<br>2. Người dùng chọn luồng có sẵn hoặc tạo nội dung qua FR-AUT-001 đến FR-AUT-005.<br>3. Người dùng xem thử.<br>4. Hệ thống kiểm tra nội dung.<br>5. Người dùng lưu và bật chức năng. |
| Post-condition | Cấu hình hợp lệ được lưu cho đúng kênh và sẵn sàng để FR-AUT-012 sử dụng. |
| Luồng thay thế | - Chưa có nội dung: không cho bật.<br>- Luồng được chọn bị xóa: hiển thị **Cần cấu hình lại** và ngừng gửi mới.<br>- Kênh mất kết nối: cho lưu nháp nhưng không áp dụng.<br>- Rời màn hình khi chưa lưu: yêu cầu xác nhận. |
| Sub-flow | **Soạn mới:** dùng trình biên soạn chung.<br>**Chọn có sẵn:** chỉ chọn nội dung cùng kênh và còn hiệu lực.<br>**Xem thử:** không tạo lần gửi thật. |
| Giao diện hệ thống | Công tắc bật tắt; lựa chọn tạo mới hoặc dùng luồng có sẵn; trình biên soạn; xem trước; trạng thái bản nháp; nút lưu và áp dụng. |
| Yêu cầu phi chức năng | Nội dung đã lưu không bị mất; dữ liệu từng kênh được tách biệt; thay đổi cấu hình có lịch sử; xem thử không ghi số liệu thật. |
| AC tương ứng | - **AC-AUT-011-01:** Không có nội dung thì không thể bật chức năng.<br>- **AC-AUT-011-02:** Nội dung hợp lệ được lưu cho đúng kênh.<br>- **AC-AUT-011-03:** Luồng bị xóa làm cấu hình hiển thị **Cần cấu hình lại**.<br>- **AC-AUT-011-04:** Xem thử không tạo lần gửi thực tế. |
| BR tương ứng | - **BR-AUT-011-01:** Mỗi kênh có tối đa một cấu hình tin nhắn mở đầu đang áp dụng.<br>- **BR-AUT-011-02:** Chỉ nội dung hợp lệ mới được bật.<br>- **BR-AUT-011-03:** Tắt chức năng không xóa nội dung đã lưu.<br>- **BR-AUT-011-04:** Nội dung phải tuân theo trình biên soạn dùng chung. |
