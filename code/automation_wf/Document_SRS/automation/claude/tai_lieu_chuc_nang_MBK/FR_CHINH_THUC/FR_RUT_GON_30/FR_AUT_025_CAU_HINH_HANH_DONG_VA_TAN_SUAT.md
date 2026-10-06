# FR-AUT-025: Cấu hình hành động và tần suất

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép xác định hệ thống sẽ làm gì khi quy luật khớp, thứ tự hành động và số lần được phép thực hiện. |
| Đối tượng liên quan | **Người quản trị:** chọn và sắp xếp hành động.<br>**Hệ thống:** kiểm tra và cung cấp danh sách hành động cho FR-AUT-026. |
| Pre-conditions | Quy luật đã tồn tại; người dùng có quyền; các đối tượng được hành động sử dụng còn hiệu lực. |
| Điều kiện kích hoạt | Người dùng mở phần **Hành động** hoặc **Tần suất** của quy luật. |
| Luồng xử lý chính | 1. Người dùng thêm một hành động.<br>2. Người dùng nhập thông tin bắt buộc.<br>3. Người dùng thêm và sắp xếp các hành động khác nếu cần.<br>4. Người dùng chọn chạy một lần, nhiều lần hoặc theo khoảng nghỉ.<br>5. Hệ thống kiểm tra dữ liệu và xung đột.<br>6. Người dùng lưu cấu hình. |
| Post-condition | Quy luật có danh sách hành động theo thứ tự và tần suất rõ ràng. |
| Luồng thay thế | - Thiếu thông tin hành động: đánh dấu **Chưa hoàn tất**.<br>- Đối tượng đích bị xóa: hiển thị **Cần cấu hình lại**.<br>- Hành động xung đột: cảnh báo và chặn bật.<br>- Tần suất ngoài giới hạn: không cho lưu. |
| Sub-flow | **Hành động:** có thể gồm gửi nội dung, gắn nhãn, đăng ký kịch bản hoặc cập nhật thông tin nếu được hỗ trợ.<br>**[Cần xác nhận]**: danh mục hành động, cách xử lý khi một hành động lỗi và thời điểm ghi nhận “đã chạy một lần”. |
| Giao diện hệ thống | Danh sách hành động; trường theo loại; kéo thả sắp xếp; lựa chọn tần suất; cảnh báo xung đột; thông báo lỗi. |
| Yêu cầu phi chức năng | Thứ tự hành động được lưu ổn định; dữ liệu nhạy cảm được che; thay đổi không ảnh hưởng lần chạy đã bắt đầu. |
| AC tương ứng | - **AC-AUT-025-01:** Chọn hành động hiển thị đúng thông tin bắt buộc.<br>- **AC-AUT-025-02:** Hành động thiếu hoặc có đích bị xóa không thể bật.<br>- **AC-AUT-025-03:** Thứ tự hành động được lưu đúng.<br>- **AC-AUT-025-04:** Tần suất được hiển thị và kiểm tra rõ ràng. |
| BR tương ứng | - **BR-AUT-025-01:** Quy luật phải có ít nhất một hành động hợp lệ.<br>- **BR-AUT-025-02:** Hành động chạy theo thứ tự đã lưu, trừ loại được phép chạy song song.<br>- **BR-AUT-025-03:** Tần suất được tính theo khách và quy luật.<br>- **BR-AUT-025-04:** Hành động không được tự sửa dữ liệu ngoài phạm vi đã cấu hình. |
