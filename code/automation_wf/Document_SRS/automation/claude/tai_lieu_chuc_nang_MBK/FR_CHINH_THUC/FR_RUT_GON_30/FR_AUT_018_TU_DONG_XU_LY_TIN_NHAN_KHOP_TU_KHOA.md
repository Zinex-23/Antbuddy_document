# FR-AUT-018: Tự động xử lý tin nhắn khớp Từ khóa

| Mục | Nội dung |
| --- | --- |
| Mô tả | Tự động tìm quy tắc Từ khóa phù hợp với tin nhắn và gửi đúng phản hồi theo thứ tự ưu tiên. |
| Đối tượng liên quan | **Khách hàng hoặc nhân viên:** gửi tin thuộc phạm vi.<br>**Hệ thống:** tìm quy tắc, chọn một quy tắc và gửi phản hồi. |
| Pre-conditions | Tin đến từ nguồn được phép; bot đang hoạt động; không có FR-AUT-028 đang chờ câu trả lời; danh sách quy tắc đã sẵn sàng. |
| Điều kiện kích hoạt | Hệ thống nhận một tin nhắn mới thuộc phạm vi dò Từ khóa. |
| Luồng xử lý chính | 1. Hệ thống loại tin lặp và tin do bot gửi.<br>2. Hệ thống chuẩn hóa nội dung.<br>3. Hệ thống lấy các quy tắc đang bật, đúng kênh và phạm vi.<br>4. Hệ thống tìm tất cả quy tắc khớp.<br>5. Nếu có nhiều kết quả, hệ thống chọn quy tắc đứng trước theo FR-AUT-016.<br>6. Hệ thống kiểm tra tần suất, độ trễ và gửi phản hồi của FR-AUT-015 một lần. |
| Post-condition | Một quy tắc được chọn và phản hồi được gửi hoặc hệ thống chuyển tin sang chức năng xử lý tiếp theo. |
| Luồng thay thế | - Không có quy tắc khớp: chuyển sang AI hoặc FR-AUT-014 theo thứ tự đã xác nhận.<br>- Quy tắc bị tắt trước khi gửi: không gửi.<br>- Phản hồi bị lỗi: ghi lỗi và xử lý theo chính sách đã xác nhận.<br>- Tin đang thuộc phiên thu thập: FR-AUT-028 xử lý trước. |
| Sub-flow | **Nhiều quy tắc khớp:** chọn theo thứ tự đã lưu và giải thích được lý do.<br>**[Cần xác nhận]**: có ưu tiên cách so khớp trước thứ tự danh sách hay không; khi quy tắc được chọn lỗi có xét quy tắc tiếp theo không. |
| Giao diện hệ thống | Không có màn hình riêng; chức năng mô phỏng Từ khóa hiển thị quy tắc được chọn và lý do. |
| Yêu cầu phi chức năng | Cùng tin nhắn và phiên bản luôn chọn cùng một quy tắc; một tin chỉ được xử lý một lần; cập nhật danh sách không làm gián đoạn xử lý. |
| AC tương ứng | - **AC-AUT-018-01:** Tin khớp một quy tắc nhận đúng phản hồi.<br>- **AC-AUT-018-02:** Tin khớp nhiều quy tắc chọn đúng quy tắc ưu tiên.<br>- **AC-AUT-018-03:** Tin lặp không tạo phản hồi trùng.<br>- **AC-AUT-018-04:** Tin không khớp được chuyển sang chức năng tiếp theo. |
| BR tương ứng | - **BR-AUT-018-01:** Mỗi tin có tối đa một quy tắc Từ khóa được chọn.<br>- **BR-AUT-018-02:** Chỉ quy tắc đang bật, đầy đủ và đúng phạm vi được xét.<br>- **BR-AUT-018-03:** Thứ tự chọn phải ổn định và giải thích được.<br>- **BR-AUT-018-04:** Tin do bot hoặc chức năng tự động hóa gửi không được dò Từ khóa. |
