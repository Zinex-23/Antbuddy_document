# FR-AUT-030: Cấu hình hành động và tần suất thực hiện

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép định nghĩa phần **THÌ**: các hành động bot cần yêu cầu, thứ tự thực hiện, tần suất một lần/nhiều lần và cách xử lý khi một hành động lỗi. |
| Đối tượng liên quan | **Người quản trị:** chọn hành động, tham số, thứ tự và tần suất.<br>**Hệ thống:** gọi chức năng chịu trách nhiệm và ghi từng kết quả.<br>**Khách hàng:** nhận tác động. |
| Pre-conditions | Quy luật có ít nhất một sự kiện; người dùng có quyền; danh mục hành động và đối tượng đích khả dụng. |
| Điều kiện kích hoạt | Người dùng mở phần **Hành động của Bot/THÌ**; hoặc FR-AUT-031 bắt đầu thực hiện quy luật đạt điều kiện. |
| Luồng xử lý chính | 1. Người dùng thêm ít nhất một hành động.<br>2. Hệ thống hiển thị tham số bắt buộc theo loại.<br>3. Người dùng nhập tham số và sắp xếp thứ tự.<br>4. Người dùng chọn tần suất và cách tiếp tục/dừng khi lỗi.<br>5. Hệ thống kiểm tra đối tượng, quyền và nguy cơ vòng lặp có thể phát hiện.<br>6. Hệ thống lưu cấu hình; khi chạy, từng hành động được gọi theo thứ tự. |
| Post-condition | Quy luật có chuỗi hành động hợp lệ, tần suất và chính sách lỗi rõ ràng. |
| Luồng thay thế | - Thiếu hành động/tham số: không cho bật quy luật.<br>- Đối tượng đích bị xóa: tự tắt và **Cần cấu hình lại**.<br>- Hành động lỗi: tiếp tục hoặc dừng theo cấu hình.<br>- Hành động không phản hồi: kiểm tra kết quả trước khi thử lại.<br>- Thay đổi tần suất không xóa lịch sử đã chạy. |
| Sub-flow | **Tần suất:** luôn thực hiện, một lần cho mỗi khách/quy luật hoặc khoảng nghỉ nếu được phê duyệt.<br>**Hành động:** gắn/gỡ nhãn, đăng ký/hủy kịch bản, cập nhật trường, bật/tắt bot hoặc hành động khác trong danh mục.<br>**[Cần xác nhận]**: danh mục đầy đủ, tần suất và thời điểm ghi nhận “đã chạy một lần”. |
| Giao diện hệ thống | Khung **Hành động của Bot**; bộ chọn hành động; thẻ tham số; kéo thả thứ tự; tần suất; chính sách lỗi; cảnh báo vòng lặp; bản tóm tắt. |
| Yêu cầu phi chức năng | Tham số nhạy cảm được che; mỗi lời gọi có thể truy vết; thử lại không tạo tác động trùng; danh mục hành động có phiên bản và phân quyền. |
| AC tương ứng | - **AC-AUT-030-01:** Thiếu hành động/tham số bắt buộc làm quy luật không thể bật.<br>- **AC-AUT-030-02:** Hành động được lưu và thực hiện đúng thứ tự hiển thị.<br>- **AC-AUT-030-03:** Chính sách tiếp tục/dừng cho kết quả đúng khi hành động giữa chuỗi lỗi.<br>- **AC-AUT-030-04:** Chế độ một lần không bị đặt lại khi sửa phiên bản cùng quy luật. |
| BR tương ứng | - **BR-AUT-030-01:** Quy luật có ít nhất một hành động hợp lệ.<br>- **BR-AUT-030-02:** Hành động chạy tuần tự theo thứ tự đã lưu.<br>- **BR-AUT-030-03:** Mỗi hành động phải gọi chức năng sở hữu dữ liệu, không tự ghi dữ liệu của chức năng đó.<br>- **BR-AUT-030-04:** Tần suất và chính sách lỗi phải được cấu hình/hiển thị, không dùng giá trị ngầm. |
