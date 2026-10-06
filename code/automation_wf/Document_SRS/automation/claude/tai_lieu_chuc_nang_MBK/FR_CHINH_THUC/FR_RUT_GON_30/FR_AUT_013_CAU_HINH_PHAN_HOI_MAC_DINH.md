# FR-AUT-013: Cấu hình phản hồi mặc định

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép cấu hình nội dung được dùng khi bot không tìm được câu trả lời, cùng trạng thái bật tắt, khoảng nghỉ và độ trễ gửi. |
| Đối tượng liên quan | **Người quản trị:** cấu hình phản hồi.<br>**Khách hàng:** nhận hướng dẫn dự phòng.<br>**Hệ thống:** lưu cấu hình cho FR-AUT-014. |
| Pre-conditions | Người dùng có quyền; kênh đang hoạt động; nội dung hoặc luồng được chọn còn hiệu lực. |
| Điều kiện kích hoạt | Người dùng mở **Phản hồi mặc định** hoặc thay đổi nội dung và thiết lập gửi. |
| Luồng xử lý chính | 1. Hệ thống hiển thị cấu hình hiện tại.<br>2. Người dùng chọn hoặc tạo một luồng tin nhắn; nếu cần AI thì thêm bước AI vào chính luồng này.<br>3. Người dùng chọn tần suất và độ trễ.<br>4. Người dùng xem thử.<br>5. Hệ thống kiểm tra và lưu.<br>6. Người dùng bật chức năng. |
| Post-condition | Cấu hình hợp lệ được lưu và sẵn sàng để FR-AUT-014 sử dụng. |
| Luồng thay thế | - Thiếu nội dung hoặc thiết lập ngoài giới hạn: không cho bật.<br>- Đối tượng được chọn bị xóa: hiển thị **Cần cấu hình lại**.<br>- Kênh mất kết nối: cho lưu nháp nhưng không áp dụng.<br>- Tắt chức năng: không gửi cho các tin chưa xử lý. |
| Sub-flow | **Nội dung:** cấu hình luôn trỏ tới một luồng nhiều bước; AI là một bước trong luồng, không phải kiểu phản hồi mặc định riêng.<br>**Tần suất:** Không giới hạn, Chỉ 1 lần cho mỗi khách/kênh hoặc mỗi X phút/giờ/ngày; X từ 1 phút đến 30 ngày, mặc định 24 giờ.<br>**Độ trễ:** gửi ngay hoặc sau tối đa 24 giờ.<br>**Xem thử:** không bắt đầu khoảng nghỉ và không ghi số liệu thật. |
| Giao diện hệ thống | Công tắc bật tắt; lựa chọn nội dung; trường khoảng nghỉ và độ trễ; trình biên soạn; xem trước; trạng thái bản nháp; nút lưu. |
| Yêu cầu phi chức năng | Nội dung đã lưu không bị mất; dữ liệu từng kênh được tách biệt; xem thử không ảnh hưởng hoạt động thật; thay đổi có lịch sử. |
| AC tương ứng | - **AC-AUT-013-01:** Thiếu nội dung hoặc thiết lập sai thì không thể bật.<br>- **AC-AUT-013-02:** Cấu hình hợp lệ được lưu cho đúng kênh.<br>- **AC-AUT-013-03:** Đối tượng bị xóa làm cấu hình hiển thị **Cần cấu hình lại**.<br>- **AC-AUT-013-04:** Xem thử không tạo lần gửi hoặc khoảng nghỉ thật. |
| BR tương ứng | - **BR-AUT-013-01:** Mỗi kênh có tối đa một cấu hình phản hồi mặc định đang áp dụng và cấu hình phải trỏ tới một luồng hợp lệ.<br>- **BR-AUT-013-02:** AI chỉ được dùng qua bước AI trong luồng; chỉ cấu hình đầy đủ và đang bật mới được dùng.<br>- **BR-AUT-013-03:** Tần suất tính theo khách và kênh; “Chỉ 1 lần” có hiệu lực suốt vòng đời khách trên kênh.<br>- **BR-AUT-013-04:** Khoảng nghỉ từ 1 phút đến 30 ngày; độ trễ từ 0 đến 24 giờ; mặc định 24 giờ và gửi ngay.<br>- **BR-AUT-013-05:** Tắt chức năng không xóa nội dung đã lưu. |
