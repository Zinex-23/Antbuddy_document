# FR-AUT-011: Form hỏi đáp lấy SĐT & Email (Lead Form / User Input)

| Mục | Nội dung |
|---|---|
| **Mô tả** | Tính năng giúp bot tự động xin thông tin khách hàng (Lead Capture) qua các câu hỏi ngắn trực tiếp trong chat:<br>- Bot gửi câu hỏi và **chờ khách gõ câu trả lời** (ví dụ: "Dạ bạn cho shop xin số điện thoại để tư vấn nhé!").<br>- **Tự động kiểm tra đúng định dạng (Validate)**: Nhận diện đúng Số điện thoại (10 chữ số) hoặc Email. Nếu khách nhập linh tinh, bot sẽ lịch sự yêu cầu nhập lại (tối đa 3 lần).<br>- **Tự động lưu vào CRM**: Khi khách nhập đúng số, hệ thống tự động bóc tách và lưu vào hồ sơ khách hàng.<br>- Sau khi lấy xong thông tin ➔ Tự động chuyển sang câu hỏi tiếp theo hoặc thông báo thành công. |
| **Đối tượng liên quan** | Admin, Nhân viên trực chat, Sale |
| **Pre-conditions** | Fanpage đã kết nối và đang hoạt động. |
| **Điều kiện kích hoạt** | Kích hoạt khi chạy một kịch bản Luồng (Flow) có chứa bước Thu thập thông tin. |
| **Luồng xử lý chính** | **1. Thêm bước hỏi thông tin**: Trong luồng kịch bản, thêm khối "Thu thập thông tin".<br>**2. Cài đặt loại dữ liệu**: Chọn cần hỏi Số điện thoại (Phone) hoặc Email hoặc Họ tên.<br>**3. Soạn câu hỏi & Câu báo lỗi**: Soạn câu hỏi ("Cho shop xin SĐT...") và câu báo lỗi khi nhập sai ("Số điện thoại chưa đúng, bạn nhập lại giúp shop nhé").<br>**4. Chọn trường lưu**: Gán vào trường `customer.phone` trên CRM.<br>**5. Bot chạy thực tế**: Bot gửi câu hỏi ➔ Khách gõ "0912345678" ➔ Bot kiểm tra thấy đúng 10 số ➔ Lưu vào hồ sơ khách ➔ Gửi lời cảm ơn và chuyển bước tiếp. |
| **Post-condition** | Số điện thoại hoặc Email của khách được điền tự động vào hệ thống CRM mà nhân viên không cần phải gõ tay. |
| **Luồng thay thế** | - **AF-1 (Khách nhập sai)**: Khách gõ chữ "không có" khi bot hỏi SĐT ➔ Bot gửi câu nhắc lỗi yêu cầu nhập lại số điện thoại.<br>- **AF-2 (Nhập sai quá 3 lần)**: Khách cố tình gõ sai 3 lần ➔ Bot tự dừng luồng, chuyển cuộc trò chuyện cho nhân viên hỗ trợ.<br>- **AF-3 (Khách im lặng không trả lời)**: Sau 24 giờ khách không nhắn lại ➔ Tự động kết thúc trạng thái chờ của form. |
| **Sub-flow** | - **SF-01 (Bộ lọc kiểm tra SĐT Việt Nam)**: Tự động loại bỏ dấu chấm, dấu cách; kiểm tra có đúng 10 chữ số và bắt đầu bằng các đầu số di động hợp lệ (03, 05, 07, 08, 09). |
| **Giao diện hệ thống** | - Khối cấu hình câu hỏi: Dropdown chọn loại dữ liệu (SĐT, Email, Tên, Chữ tự do), ô chọn trường lưu CRM, ô nhập câu hỏi, ô nhập câu báo lỗi.<br>- Lịch sử hội thoại của khách: Hiển thị icon đánh dấu câu trả lời đã được lưu vào CRM. |
| **Yêu cầu phi chức năng** | - Kiểm tra định dạng dữ liệu trong ≤ 50ms.<br>- Lưu dữ liệu vào CRM ngay lập tức khi khách nhập đúng. |
| **AC tương ứng** | - **AC-01**: Khách gõ "0987654321" ➔ Hồ sơ khách hàng trên CRM cập nhật đúng số điện thoại này.<br>- **AC-02**: Khách gõ "12345" ➔ Bot báo lỗi và yêu cầu nhập lại, không lưu số rác vào CRM.<br>- **AC-03**: Khách gõ sai 3 lần liên tiếp ➔ Bot dừng hỏi và gắn thẻ `Can_Nhan_Vien_Ho_Tro`. |
| **BR tương ứng** | - **BR-01**: Giới hạn số lần nhắc lại khi nhập sai tối đa là 3 lần.<br>- **BR-02**: Trong lúc khách đang trong trạng thái chờ trả lời form, các bộ lọc từ khóa thông thường tạm thời bị khóa. |
