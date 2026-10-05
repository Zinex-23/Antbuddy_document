# FR-AUT-004: Tin nhắn khi bot không hiểu (Tin mặc định Fallback)

| Mục | Nội dung |
|---|---|
| **Mô tả** | Phản hồi dự phòng khi khách hàng gõ câu lạ mà bot không hiểu và không có tính năng nào khác tiếp nhận:<br>- Bot gửi tin nhắn hướng dẫn nhẹ nhàng (ví dụ: "Dạ em chưa hiểu ý anh/chị, anh/chị bấm vào menu dưới đây hoặc để lại số điện thoại để nhân viên hỗ trợ nhé!").<br>- **Có bộ giới hạn tần suất chống spam (Rate Limiting)**: Cài đặt gửi tối đa 1 lần trong vòng X phút (mặc định 15 phút). Nếu khách gõ liên tục 5 câu bot không hiểu, bot chỉ gửi tin này đúng 1 lần, không spam tin liên tục.<br>- Có công tắc Bật/Tắt hoạt động. |
| **Đối tượng liên quan** | Admin, Quản lý shop |
| **Pre-conditions** | Fanpage đã kết nối và đang hoạt động. |
| **Điều kiện kích hoạt** | Khách gửi tin nhắn văn bản nhưng không khớp Từ khóa, không phải Lời chào, không có kịch bản nào đang chờ. |
| **Luồng xử lý chính** | **1. Cấu hình tin nhắn**: Bấm "Chỉnh sửa" ➔ Soạn nội dung tin nhắn hướng dẫn (kèm nút xem menu hoặc nút gọi nhân viên) ➔ Bấm Lưu.<br>**2. Cài đặt tần suất**: Nhập số phút giãn cách (ví dụ: 15 phút).<br>**3. Bật/Tắt**: Gạt công tắc BẬT để kích hoạt tính năng.<br>**4. Bot chạy thực tế**: Khách gõ câu lạ ➔ Hệ thống kiểm tra: Nếu trong 15 phút qua khách này chưa nhận tin mặc định ➔ Gửi tin mặc định cho khách; nếu đã nhận rồi ➔ Im lặng bỏ qua. |
| **Post-condition** | Khách hàng nhận được hướng dẫn khi bot không hiểu, không bị cảm giác bot ngớ ngẩn spam tin liên tục. |
| **Luồng thay thế** | - **AF-1 (Khách nhắn liên tục nhiều câu lạ)**: Khách nhắn "123", "abc", "xyz" trong vòng 10 giây ➔ Bot chỉ gửi tin mặc định ở câu đầu tiên; 2 câu sau im lặng không gửi thêm.<br>- **AF-2 (Tắt công tắc)**: Công tắc đang TẮT ➔ Khi bot không hiểu, bot im lặng hoàn toàn, không gửi tin nhắn nào. |
| **Sub-flow** | - **SF-01 (Đếm thời gian giãn cách Cooldown)**: Lưu mốc `last_fallback_time` của từng khách hàng vào cache; nếu thời gian từ lần gửi trước đến nay < số phút cài đặt ➔ Chặn không gửi. |
| **Giao diện hệ thống** | - Màn hình chính: Công tắc Bật/Tắt, ô nhập số phút tần suất (mặc định 15 phút), nút "Chỉnh sửa nội dung", khung xem trước Preview, bảng thống kê. |
| **Yêu cầu phi chức năng** | - Kiểm tra điều kiện và quyết định gửi tin trong ≤ 100ms.<br>- Cache tần suất hoạt động chính xác cả khi có nhiều nhân viên cùng trực. |
| **AC tương ứng** | - **AC-01**: Khách nhắn câu không hiểu ➔ Bot gửi tin nhắn mặc định.<br>- **AC-02**: Trong vòng 5 phút sau đó khách nhắn tiếp câu không hiểu ➔ Bot không gửi thêm tin mặc định nào nữa.<br>- **AC-03**: Sau 20 phút (hết hạn 15 phút giãn cách) khách lại nhắn câu không hiểu ➔ Bot gửi lại tin mặc định lần hai.<br>- **AC-04**: Gạt tắt công tắc ➔ Khách nhắn câu không hiểu, bot không phản hồi gì. |
| **BR tương ứng** | - **BR-01**: Mỗi fanpage chỉ có duy nhất 1 Tin nhắn mặc định.<br>- **BR-02**: Tin nhắn mặc định là lựa chọn cuối cùng sau khi Từ khóa và Lời chào không tiếp nhận.<br>- **BR-03**: Bắt buộc phải tuân thủ số phút giãn cách chống spam. |
