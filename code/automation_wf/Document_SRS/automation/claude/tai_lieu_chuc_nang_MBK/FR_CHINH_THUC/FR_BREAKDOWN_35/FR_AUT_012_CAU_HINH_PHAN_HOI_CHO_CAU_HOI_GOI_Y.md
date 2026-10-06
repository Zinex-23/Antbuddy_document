# FR-AUT-012: Cấu hình phản hồi cho câu hỏi gợi ý

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép chọn hành động chính và, nếu sản phẩm hỗ trợ, các hành động bổ sung khi khách chọn một câu hỏi gợi ý. Chức năng không dò câu hỏi trong văn bản khách tự nhập. |
| Đối tượng liên quan | **Người quản trị:** chọn phản hồi/hành động.<br>**Khách hàng:** bấm câu hỏi và nhận kết quả.<br>**Hệ thống:** thực hiện các hành động đúng thứ tự và một lần. |
| Pre-conditions | Câu hỏi đã tồn tại trong bản nháp; người dùng có quyền; hành động đích thuộc đúng doanh nghiệp/kênh và còn hiệu lực. |
| Điều kiện kích hoạt | Người dùng mở cấu hình phản hồi của câu hỏi; hoặc khách bấm câu hỏi thuộc bản đang áp dụng. |
| Luồng xử lý chính | 1. Người dùng chọn một hành động chính.<br>2. Hệ thống hiển thị trường bắt buộc theo loại hành động.<br>3. Người dùng có thể thêm và sắp xếp hành động bổ sung nếu được hỗ trợ.<br>4. Hệ thống kiểm tra toàn bộ đối tượng đích và lưu vào bản nháp.<br>5. Khi khách chọn, hệ thống thực hiện hành động chính rồi các hành động bổ sung theo thứ tự đã phê duyệt. |
| Post-condition | Câu hỏi có phản hồi hợp lệ; một lượt chọn của khách tạo đúng chuỗi kết quả đã cấu hình. |
| Luồng thay thế | - Thiếu hành động chính hoặc thông tin bắt buộc: chặn lưu.<br>- Đối tượng đích bị xóa: đánh dấu **Cần cấu hình lại** và chặn xuất bản.<br>- Một hành động bổ sung lỗi: thực hiện tiếp hay dừng theo chính sách được cấu hình.<br>- Dữ liệu lựa chọn đã cũ hoặc bị giả mạo: không chạy hành động.<br>- Nhận lại cùng một lượt chọn: không tạo tác động trùng. |
| Sub-flow | **Hành động chính đề xuất:** tạo/chọn luồng hoặc yêu cầu khách đăng ký nhận thông báo nếu kênh hỗ trợ.<br>**Hành động bổ sung:** phải có danh mục, giới hạn và thứ tự rõ ràng.<br>**[Cần xác nhận]**: “Tạo tin nhắn mới” là tạo mới hay chọn khối có sẵn; danh sách đầy đủ hành động bổ sung và cách xử lý khi một hành động lỗi. |
| Giao diện hệ thống | Bộ chọn hành động chính; trường tham số; danh sách hành động bổ sung kéo thả; lỗi tại hành động; bản tóm tắt thứ tự thực hiện; nút lưu/hủy. |
| Yêu cầu phi chức năng | Một lượt chọn chỉ xử lý một lần; dữ liệu đầu vào được kiểm tra; xem trước không chạy hành động; kết quả từng hành động có thể truy vết. |
| AC tương ứng | - **AC-AUT-012-01:** Câu hỏi thiếu hành động chính không thể hoàn tất hoặc xuất bản.<br>- **AC-AUT-012-02:** Khi khách chọn câu hỏi hợp lệ, hành động chính chạy trước và hành động bổ sung chạy đúng thứ tự.<br>- **AC-AUT-012-03:** Đối tượng đích bị xóa làm câu hỏi hiển thị **Cần cấu hình lại**.<br>- **AC-AUT-012-04:** Lượt chọn cũ/lặp không tạo hành động không hợp lệ hoặc trùng. |
| BR tương ứng | - **BR-AUT-012-01:** Mỗi câu hỏi có đúng một hành động chính.<br>- **BR-AUT-012-02:** Số và loại hành động bổ sung phải thuộc danh mục được phê duyệt.<br>- **BR-AUT-012-03:** Các hành động được thực hiện lần lượt theo thứ tự hiển thị và phải có cách xử lý lỗi rõ ràng.<br>- **BR-AUT-012-04:** Lựa chọn từ Câu hỏi thường gặp là dữ liệu do hệ thống tạo, không được đưa qua chức năng dò Từ khóa. |
