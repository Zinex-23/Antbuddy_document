# FR-AUT-003: Cấu hình trả lời nhanh

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép thêm các lựa chọn trả lời nhanh vào tin nhắn để khách chọn thay vì tự nhập. Mỗi lựa chọn có tiêu đề và một hành động hoặc giá trị trả về đã cấu hình. Trả lời nhanh khác với nút cố định và mục Menu chính. |
| Đối tượng liên quan | **Người quản trị:** cấu hình lựa chọn.<br>**Khách hàng:** chọn một trả lời nhanh.<br>**Hệ thống:** ghi nhận lựa chọn và chuyển đến bước/hành động tương ứng. |
| Pre-conditions | Người dùng có quyền; loại tin nhắn và kênh hỗ trợ trả lời nhanh; bước/hành động đích tồn tại. |
| Điều kiện kích hoạt | Người dùng chọn **Thêm trả lời nhanh**; hoặc khách chọn một trả lời nhanh thuộc tin nhắn đang có hiệu lực. |
| Luồng xử lý chính | 1. Người dùng thêm lựa chọn, nhập tiêu đề và chọn kết quả khi khách chọn.<br>2. Hệ thống kiểm tra số lượng, độ dài và đối tượng đích.<br>3. Người dùng sắp xếp các lựa chọn và lưu vào bản nháp.<br>4. Khi tin được gửi, khách thấy các lựa chọn theo đúng thứ tự.<br>5. Khi khách chọn, hệ thống ghi nhận lựa chọn và thực hiện đúng hành động một lần. |
| Post-condition | Danh sách trả lời nhanh được lưu; khách có thể chọn một phương án và luồng tiếp tục theo cấu hình. |
| Luồng thay thế | - Tiêu đề trống/trùng hoặc vượt giới hạn: chặn lưu.<br>- Đạt số lượng tối đa: khóa thao tác thêm.<br>- Đối tượng đích mất hiệu lực: đánh dấu **Cần cấu hình lại**.<br>- Lựa chọn cũ đã hết hiệu lực: bỏ qua an toàn và không chạy hành động.<br>- Khách tự nhập thay vì chọn: chuyển tin nhắn theo thứ tự xử lý hội thoại đã cấu hình. |
| Sub-flow | **Giá trị trả về:** có thể dùng làm câu trả lời cho bước thu thập thông tin nếu được cấu hình rõ.<br>**Ẩn lựa chọn:** tuân theo hành vi của từng nền tảng sau khi khách chọn.<br>**[Cần xác nhận]**: giới hạn 13 trả lời nhanh, khả năng cho phép nhiều lựa chọn và hành vi khi lựa chọn hết hạn. |
| Giao diện hệ thống | Nút **Thêm trả lời nhanh**; danh sách lựa chọn kéo thả; trường tiêu đề và kết quả; bộ đếm giới hạn; thông báo mục lỗi; bản xem trước. |
| Yêu cầu phi chức năng | Một lượt chọn chỉ được xử lý một lần; dữ liệu lựa chọn không hợp lệ không được chạy hành động; giao diện hỗ trợ sắp xếp bằng bàn phím; xem trước không tạo sự kiện thật. |
| AC tương ứng | - **AC-AUT-003-01:** Khi lưu các lựa chọn hợp lệ, bản xem trước hiển thị đúng nội dung và thứ tự.<br>- **AC-AUT-003-02:** Khi tiêu đề trống/trùng hoặc quá giới hạn, hệ thống chặn tại đúng lựa chọn.<br>- **AC-AUT-003-03:** Khi khách chọn một lựa chọn hợp lệ, hệ thống thực hiện đúng kết quả một lần.<br>- **AC-AUT-003-04:** Khi nhận lựa chọn cũ hoặc giả mạo, hệ thống không thực hiện hành động. |
| BR tương ứng | - **BR-AUT-003-01:** Mỗi trả lời nhanh có một tiêu đề và một kết quả đã xác định.<br>- **BR-AUT-003-02:** Số lượng và độ dài tuân theo khả năng của kênh.<br>- **BR-AUT-003-03:** Các tiêu đề không trùng trong cùng một tin sau khi chuẩn hóa.<br>- **BR-AUT-003-04:** Trả lời nhanh chỉ có hiệu lực trong tin nhắn đã gửi; nếu kênh trả về dữ liệu lựa chọn có cấu trúc thì không được coi dữ liệu đó là văn bản khách tự nhập. |
