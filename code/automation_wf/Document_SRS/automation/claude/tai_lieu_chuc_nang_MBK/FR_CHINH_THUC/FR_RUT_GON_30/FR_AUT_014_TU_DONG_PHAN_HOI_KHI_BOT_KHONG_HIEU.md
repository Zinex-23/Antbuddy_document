# FR-AUT-014: Tự động phản hồi khi bot không hiểu

| Mục | Nội dung |
| --- | --- |
| Mô tả | Tự động gửi phản hồi mặc định khi tin của khách không được chức năng ưu tiên nào xử lý. |
| Đối tượng liên quan | **Khách hàng:** gửi tin và nhận phản hồi.<br>**Hệ thống:** kiểm tra các chức năng theo thứ tự và gửi một lần.<br>**Nhân viên:** có thể tiếp quản hội thoại. |
| Pre-conditions | FR-AUT-013 đã được bật; bot không tạm dừng; hội thoại chưa được nhân viên tiếp quản; tin chưa được xử lý. |
| Điều kiện kích hoạt | Hệ thống nhận một tin nhắn mới từ khách. |
| Luồng xử lý chính | 1. Lượt bấm Menu/FAQ được xử lý theo hành động của chính thành phần đó và không đi vào luồng văn bản.<br>2. Với tin văn bản, hệ thống ưu tiên phiên thu thập thông tin tại FR-AUT-028 nếu đang chờ câu trả lời.<br>3. Nếu không, hệ thống kiểm tra Từ khóa qua FR-AUT-018 rồi AI/NLU.<br>4. Chỉ khi cả ba lớp trên không xử lý được, hệ thống kiểm tra tần suất và độ trễ của phản hồi mặc định.<br>5. Nếu đủ điều kiện, hệ thống gửi phản hồi một lần và bắt đầu khoảng nghỉ sau khi gửi thành công.<br>6. Hệ thống ghi kết quả cho FR-AUT-030. |
| Post-condition | Tin chưa được xử lý nhận một phản hồi mặc định hoặc được ghi rõ lý do bỏ qua. |
| Luồng thay thế | - Đang trong khoảng nghỉ: không gửi.<br>- Hai tin đến cùng lúc: chỉ một tin được quyền gửi.<br>- Cấu hình tắt hoặc lỗi: không gửi và ghi lý do.<br>- Tin do bot, chức năng tự động hóa hoặc nhân viên gửi: bỏ qua. |
| Sub-flow | **Thứ tự chính thức:** Menu/FAQ riêng biệt → Thu thập thông tin → Từ khóa → AI/NLU → Phản hồi mặc định.<br>**Vai trò chu kỳ:** chu kỳ chỉ chống gửi lặp; khách quay lại không tự nhận phản hồi mặc định nếu tin của họ đã được lớp ưu tiên xử lý.<br>**Khoảng nghỉ:** bắt đầu tại thời điểm kênh xác nhận gửi phản hồi mặc định thành công. |
| Giao diện hệ thống | Không có màn hình riêng; lịch sử hội thoại hiển thị phản hồi và lý do gửi hoặc bỏ qua. |
| Yêu cầu phi chức năng | Một tin chỉ nhận tối đa một phản hồi mặc định; yêu cầu gửi không bị mất khi hệ thống gián đoạn; nội dung tin khách được bảo vệ theo chính sách. |
| AC tương ứng | - **AC-AUT-014-01:** Tin đã được chức năng khác xử lý không nhận phản hồi mặc định.<br>- **AC-AUT-014-02:** Tin chưa được xử lý và ngoài khoảng nghỉ nhận một phản hồi.<br>- **AC-AUT-014-03:** Nhiều tin trong khoảng nghỉ không tạo nhiều phản hồi.<br>- **AC-AUT-014-04:** Tin do bot hoặc nhân viên gửi không kích hoạt chức năng. |
| BR tương ứng | - **BR-AUT-014-01:** Thứ tự xử lý văn bản là Thu thập thông tin, Từ khóa, AI/NLU rồi phản hồi mặc định; lượt bấm Menu/FAQ không được dò Từ khóa.<br>- **BR-AUT-014-02:** Một tin khách có tối đa một lần gửi phản hồi mặc định.<br>- **BR-AUT-014-03:** Khoảng nghỉ được tính theo khách và kênh từ lần gửi thành công gần nhất; chu kỳ không phải sự kiện tự gửi.<br>- **BR-AUT-014-04:** Tin từ bot/tự động hóa/nhân viên, bot tạm dừng hoặc nhân viên tiếp quản không kích hoạt phản hồi. |
