# FR-AUT-025: Cấu hình hành động và tần suất

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép xác định hệ thống sẽ làm gì khi quy luật khớp, thứ tự hành động và số lần được phép thực hiện. |
| Đối tượng liên quan | **Người quản trị:** chọn và sắp xếp hành động.<br>**Hệ thống:** kiểm tra và cung cấp danh sách hành động cho FR-AUT-026. |
| Pre-conditions | Quy luật đã tồn tại; người dùng có quyền; các đối tượng được hành động sử dụng còn hiệu lực. |
| Điều kiện kích hoạt | Người dùng mở phần **Hành động** hoặc **Tần suất** của quy luật. |
| Luồng xử lý chính | 1. Người dùng thêm một hành động.<br>2. Người dùng nhập thông tin bắt buộc.<br>3. Người dùng thêm và sắp xếp các hành động khác nếu cần.<br>4. Người dùng chọn **Luôn được thực hiện** hoặc **Chỉ thực hiện 1 lần**.<br>5. Hệ thống kiểm tra dữ liệu và xung đột.<br>6. Người dùng lưu cấu hình. |
| Post-condition | Quy luật có danh sách hành động theo thứ tự và tần suất rõ ràng. |
| Luồng thay thế | - Thiếu thông tin hành động: đánh dấu **Chưa hoàn tất**.<br>- Đối tượng đích bị xóa: hiển thị **Cần cấu hình lại**.<br>- Hành động xung đột: cảnh báo và chặn bật.<br>- Tần suất ngoài giới hạn: không cho lưu. |
| Sub-flow | **8 hành động:** Gửi luồng tin nhắn, Gắn nhãn, Gỡ nhãn, Đăng ký kịch bản, Hủy kịch bản, Cập nhật một trường khách hàng, Chuyển menu và Bật/Tắt bot.<br>**Tần suất:** chỉ có **Luôn được thực hiện** hoặc **Chỉ thực hiện 1 lần** cho mỗi khách + quy luật.<br>**Một lần:** được ghi nhận ngay khi hệ thống tạo lần chạy hợp lệ, trước hành động đầu tiên; lỗi không làm khách được chạy lại bởi sự kiện mới. Người quản trị chỉ được thử lại lần chạy cũ.<br>**Lỗi:** mỗi hành động lỗi tạm thời được thử lại tối đa 3 lần; sau lỗi cuối thì dừng các hành động còn lại. |
| Giao diện hệ thống | Danh sách hành động; trường theo loại; kéo thả sắp xếp; lựa chọn tần suất; cảnh báo xung đột; thông báo lỗi. |
| Yêu cầu phi chức năng | Thứ tự hành động được lưu ổn định; dữ liệu nhạy cảm được che; thay đổi không ảnh hưởng lần chạy đã bắt đầu. |
| AC tương ứng | - **AC-AUT-025-01:** Chọn hành động hiển thị đúng thông tin bắt buộc.<br>- **AC-AUT-025-02:** Hành động thiếu hoặc có đích bị xóa không thể bật.<br>- **AC-AUT-025-03:** Thứ tự hành động được lưu đúng.<br>- **AC-AUT-025-04:** Tần suất được hiển thị và kiểm tra rõ ràng. |
| BR tương ứng | - **BR-AUT-025-01:** Quy luật phải có ít nhất một trong 8 hành động đã công bố.<br>- **BR-AUT-025-02:** Mọi hành động chạy tuần tự theo thứ tự đã lưu; lỗi cuối dừng chuỗi và không hoàn tác hành động đã xong.<br>- **BR-AUT-025-03:** Tần suất chỉ gồm Luôn thực hiện hoặc Chỉ 1 lần, tính theo khách + quy luật; chế độ một lần được đánh dấu trước hành động đầu tiên.<br>- **BR-AUT-025-04:** Một hành động Cập nhật thông tin chỉ ghi một trường và không được sửa dữ liệu ngoài phạm vi đã cấu hình. |
