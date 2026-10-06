# FR-AUT-014: Tự động phản hồi khi bot không hiểu

| Mục | Nội dung |
| --- | --- |
| Mô tả | Tự động gửi phản hồi mặc định khi tin của khách không được chức năng ưu tiên nào xử lý. |
| Đối tượng liên quan | **Khách hàng:** gửi tin và nhận phản hồi.<br>**Hệ thống:** kiểm tra các chức năng theo thứ tự và gửi một lần.<br>**Nhân viên:** có thể tiếp quản hội thoại. |
| Pre-conditions | FR-AUT-013 đã được bật; bot không tạm dừng; hội thoại chưa được nhân viên tiếp quản; tin chưa được xử lý. |
| Điều kiện kích hoạt | Hệ thống nhận một tin nhắn mới từ khách. |
| Luồng xử lý chính | 1. Hệ thống ưu tiên phiên thu thập thông tin tại FR-AUT-028 nếu đang chờ câu trả lời.<br>2. Nếu không, hệ thống kiểm tra Từ khóa qua FR-AUT-018 rồi chức năng AI.<br>3. Nếu vẫn chưa có chức năng xử lý, hệ thống kiểm tra khoảng nghỉ.<br>4. Nếu đủ điều kiện, hệ thống gửi phản hồi mặc định một lần.<br>5. Hệ thống ghi kết quả cho FR-AUT-030. |
| Post-condition | Tin chưa được xử lý nhận một phản hồi mặc định hoặc được ghi rõ lý do bỏ qua. |
| Luồng thay thế | - Đang trong khoảng nghỉ: không gửi.<br>- Hai tin đến cùng lúc: chỉ một tin được quyền gửi.<br>- Cấu hình tắt hoặc lỗi: không gửi và ghi lý do.<br>- Tin do bot, chức năng tự động hóa hoặc nhân viên gửi: bỏ qua. |
| Sub-flow | **[Cần xác nhận]**: thứ tự Thu thập thông tin, Từ khóa, AI và phản hồi mặc định; Botcake dùng phản hồi này khi không hiểu hay theo chu kỳ khách quay lại; thời điểm bắt đầu khoảng nghỉ. |
| Giao diện hệ thống | Không có màn hình riêng; lịch sử hội thoại hiển thị phản hồi và lý do gửi hoặc bỏ qua. |
| Yêu cầu phi chức năng | Một tin chỉ nhận tối đa một phản hồi mặc định; yêu cầu gửi không bị mất khi hệ thống gián đoạn; nội dung tin khách được bảo vệ theo chính sách. |
| AC tương ứng | - **AC-AUT-014-01:** Tin đã được chức năng khác xử lý không nhận phản hồi mặc định.<br>- **AC-AUT-014-02:** Tin chưa được xử lý và ngoài khoảng nghỉ nhận một phản hồi.<br>- **AC-AUT-014-03:** Nhiều tin trong khoảng nghỉ không tạo nhiều phản hồi.<br>- **AC-AUT-014-04:** Tin do bot hoặc nhân viên gửi không kích hoạt chức năng. |
| BR tương ứng | - **BR-AUT-014-01:** Phản hồi mặc định chỉ chạy sau các chức năng ưu tiên.<br>- **BR-AUT-014-02:** Một tin khách có tối đa một lần gửi phản hồi mặc định.<br>- **BR-AUT-014-03:** Khoảng nghỉ được tính theo khách và kênh.<br>- **BR-AUT-014-04:** Nhân viên tiếp quản hoặc bot tạm dừng có ưu tiên cao hơn. |
