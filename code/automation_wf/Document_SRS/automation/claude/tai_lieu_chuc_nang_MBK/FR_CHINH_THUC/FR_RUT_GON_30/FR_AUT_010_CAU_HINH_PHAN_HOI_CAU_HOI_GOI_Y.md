# FR-AUT-010: Cấu hình phản hồi câu hỏi gợi ý

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép xác định hệ thống sẽ làm gì khi khách chọn một câu hỏi gợi ý. |
| Đối tượng liên quan | **Người quản trị:** chọn phản hồi và hành động bổ sung.<br>**Khách hàng:** chọn câu hỏi.<br>**Hệ thống:** chạy các hành động theo thứ tự. |
| Pre-conditions | Câu hỏi đã tồn tại; người dùng có quyền; nội dung hoặc luồng được chọn còn hiệu lực. |
| Điều kiện kích hoạt | Người dùng mở phần phản hồi của câu hỏi hoặc khách chọn câu hỏi đã xuất bản. |
| Luồng xử lý chính | 1. Người dùng chọn một phản hồi chính, như gửi nội dung hoặc chạy luồng.<br>2. Người dùng thêm hành động bổ sung nếu được hỗ trợ.<br>3. Người dùng sắp xếp thứ tự hành động.<br>4. Hệ thống kiểm tra thông tin bắt buộc.<br>5. Người dùng lưu và xem thử.<br>6. Khi khách chọn câu hỏi, hệ thống chạy đúng phản hồi. |
| Post-condition | Câu hỏi có phản hồi hợp lệ và sẵn sàng được xuất bản tại FR-AUT-009. |
| Luồng thay thế | - Thiếu phản hồi chính: không cho lưu hoặc xuất bản.<br>- Đối tượng đích bị xóa: hiển thị **Cần cấu hình lại**.<br>- Hành động bổ sung lỗi: xử lý theo chính sách đã cấu hình.<br>- Lựa chọn cũ hoặc không hợp lệ: không chạy phản hồi. |
| Sub-flow | **3 phản hồi chính:** Tạo tin nhắn mới, Chọn luồng tin nhắn hoặc Nhận thông báo (Opt-in); mỗi câu hỏi chỉ có một phản hồi chính.<br>**Hành động bổ sung:** Gắn nhãn, Gỡ nhãn, Cập nhật một trường khách hàng, Đăng ký/Hủy kịch bản chăm sóc hoặc Chuyển menu. Hành động chạy lần lượt theo thứ tự đã lưu.<br>**Xử lý lỗi:** phản hồi chính lỗi thì dừng; hành động bổ sung lỗi được ghi nhận rồi hệ thống tiếp tục hành động kế tiếp. |
| Giao diện hệ thống | Ô chọn phản hồi chính; danh sách hành động bổ sung; kéo thả sắp xếp; cảnh báo đối tượng bị xóa; xem thử; nút lưu. |
| Yêu cầu phi chức năng | Một lượt chọn chỉ được xử lý một lần; dữ liệu lựa chọn giả mạo không được chạy hành động; xem thử không tạo tác động thật. |
| AC tương ứng | - **AC-AUT-010-01:** Người dùng cấu hình được một phản hồi chính cho câu hỏi.<br>- **AC-AUT-010-02:** Thiếu thông tin bắt buộc thì không thể lưu hoặc xuất bản.<br>- **AC-AUT-010-03:** Khách chọn câu hỏi nhận đúng phản hồi và thứ tự hành động.<br>- **AC-AUT-010-04:** Lựa chọn lặp không tạo tác động trùng. |
| BR tương ứng | - **BR-AUT-010-01:** Mỗi câu hỏi có đúng một trong 3 phản hồi chính hợp lệ.<br>- **BR-AUT-010-02:** Phản hồi chính phải thành công trước khi chạy hành động bổ sung.<br>- **BR-AUT-010-03:** Hành động bổ sung chỉ thuộc danh mục đã công bố, chạy tuần tự; lỗi một hành động không hoàn tác hành động đã xong và không chặn hành động sau.<br>- **BR-AUT-010-04:** Lựa chọn câu hỏi không được xử lý như tin nhắn từ khóa. |
