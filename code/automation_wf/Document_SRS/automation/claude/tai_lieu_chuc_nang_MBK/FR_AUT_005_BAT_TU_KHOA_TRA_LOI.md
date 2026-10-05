# FR-AUT-005: Bắt từ khóa trả lời ngay (Keyword Auto-Reply)

| Mục | Nội dung |
|---|---|
| **Mô tả** | Tự động nhận diện từ khóa trong tin nhắn của khách để trả lời đúng nội dung đã cài trước:<br>- Hỗ trợ 2 kiểu khớp thông dụng: **Khớp chính xác** (khách gõ đúng 100% từ đó) hoặc **Khớp chứa từ** (câu khách gõ có chứa từ đó).<br>- Hỗ trợ cài nhiều từ khóa đồng nghĩa (ví dụ: "giá", "báo giá", "bao nhieu tien" chung 1 câu trả lời).<br>- Tự động phân xử khi trùng: Từ khóa dài hơn sẽ thắng từ khóa ngắn hơn (ví dụ: "vay tiền mặt" sẽ thắng từ khóa "vay").<br>- Phản hồi có thể là một đoạn tin nhắn hoặc một kịch bản bot có sẵn. |
| **Đối tượng liên quan** | Admin, Quản lý shop |
| **Pre-conditions** | Fanpage đã kết nối và đang hoạt động. |
| **Điều kiện kích hoạt** | Khách hàng nhắn tin có chứa từ khóa đang được BẬT trong hệ thống. |
| **Luồng xử lý chính** | **1. Thêm từ khóa**: Bấm "Tạo từ khóa mới" ➔ Nhập các từ khóa (cách nhau bằng dấu phẩy hoặc enter).<br>**2. Chọn kiểu khớp**: Chọn "Khớp chính xác" hoặc "Chứa từ khóa".<br>**3. Gán phản hồi**: Soạn tin nhắn trả lời (chữ, ảnh, nút bấm) hoặc chọn 1 luồng bot có sẵn.<br>**4. Bật/Tắt**: Bật công tắc để kích hoạt từ khóa.<br>**5. Bot chạy thực tế**: Khách nhắn tin ➔ Bot quét nội dung ➔ Khớp từ khóa ➔ Trả lời ngay lập tức cho khách. |
| **Post-condition** | Khách hàng nhận được câu trả lời tức thì cho thắc mắc của mình trong vòng 1 giây. |
| **Luồng thay thế** | - **AF-1 (Khớp nhiều từ khóa cùng lúc)**: Câu của khách chứa cả từ khóa A ("áo") và từ khóa B ("áo thun nam") ➔ Bot chọn từ khóa dài hơn ("áo thun nam") để trả lời chính xác hơn.<br>- **AF-2 (Tắt từ khóa)**: Từ khóa đang tắt công tắc ➔ Khách gõ từ đó bot sẽ không phản hồi.<br>- **AF-3 (Trùng từ khóa đã có)**: Cảnh báo trùng lặp và không cho lưu. |
| **Sub-flow** | - **SF-01 (Chuẩn hóa từ khóa)**: Tự động chuyển về chữ thường, bỏ khoảng trắng thừa đầu cuối và bỏ dấu chấm câu cơ bản trước khi so sánh. |
| **Giao diện hệ thống** | - Bảng danh sách từ khóa: Cột từ khóa, cột kiểu khớp, cột phản hồi gán kèm, công tắc Bật/Tắt, nút Sửa/Xóa, ô tìm kiếm từ khóa.<br>- Popup tạo/sửa từ khóa: Ô nhập từ khóa, bộ chọn kiểu khớp, vùng soạn tin nhắn trả lời, nút Lưu. |
| **Yêu cầu phi chức năng** | - Thời gian quét từ khóa và gửi tin phản hồi ≤ 200ms.<br>- Hỗ trợ không giới hạn số lượng từ khóa trong một trang. |
| **AC tương ứng** | - **AC-01**: Khách gõ "shop ở đâu" (có từ khóa chứa từ "ở đâu") ➔ Bot trả lời ngay địa chỉ cửa hàng.<br>- **AC-02**: Cài từ khóa A = "học phí", B = "học phí tiếng anh". Khách gõ "học phí tiếng anh bao nhiêu" ➔ Bot kích hoạt đúng phản hồi của từ khóa B.<br>- **AC-03**: Gạt tắt từ khóa ➔ Khách gõ từ đó bot không kích hoạt phản hồi.<br>- **AC-04**: Khách gõ hoa/thường ("GIÁ", "Giá", "giá") ➔ Bot đều nhận diện chính xác như nhau. |
| **BR tương ứng** | - **BR-01**: Từ khóa kiểu Khớp chính xác không phân biệt hoa thường.<br>- **BR-02**: Khi trùng nhiều từ khóa, quy tắc ưu tiên: Khớp chính xác thắng Khớp chứa từ; Từ khóa dài hơn thắng Từ khóa ngắn hơn.<br>- **BR-03**: Chỉ các từ khóa đang BẬT mới được bot đem ra so khớp. |
