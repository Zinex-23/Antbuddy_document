# FR-AUT-028: Thu thập thông tin khách hàng

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép hỏi một thông tin, kiểm tra câu trả lời và chuyển giá trị hợp lệ sang trường khách hàng đã chọn. |
| Đối tượng liên quan | **Người quản trị:** cấu hình câu hỏi và trường lưu.<br>**Khách hàng:** trả lời câu hỏi.<br>**Hệ thống:** chờ, kiểm tra và chuyển giá trị.<br>**Nhân viên:** tiếp quản khi cần. |
| Pre-conditions | Câu hỏi và trường lưu đã được cấu hình; trường còn hiệu lực; khách đang ở bước thu thập thông tin. |
| Điều kiện kích hoạt | Luồng chạy tới bước thu thập thông tin hoặc khách gửi câu trả lời khi hệ thống đang chờ. |
| Luồng xử lý chính | 1. Hệ thống gửi câu hỏi.<br>2. Hệ thống đánh dấu đang chờ câu trả lời cho khách và trường cụ thể.<br>3. Hệ thống nhận tin tiếp theo của khách.<br>4. Hệ thống kiểm tra kiểu dữ liệu và quy tắc nhập.<br>5. Nếu hợp lệ, hệ thống chuyển giá trị cho FR-AUT-029 lưu.<br>6. Hệ thống chuyển sang bước tiếp theo. |
| Post-condition | Giá trị hợp lệ được lưu; phiên thu thập hoàn thành, bị hủy, hết thời gian hoặc chuyển cho nhân viên. |
| Luồng thay thế | - Câu trả lời sai: hướng dẫn khách nhập lại.<br>- Hết số lần thử hoặc thời gian: hủy hoặc chuyển cho nhân viên theo cấu hình.<br>- Lưu lỗi tạm thời: thử lưu lại, không yêu cầu khách nhập lại ngay.<br>- Khách yêu cầu hủy: kết thúc phiên và không lưu giá trị chưa hợp lệ. |
| Sub-flow | **Ưu tiên:** khi đang chờ, câu trả lời được xử lý trước Từ khóa và AI.<br>**Kiểu dữ liệu:** văn bản, số, email, điện thoại, ngày hoặc lựa chọn nếu được hỗ trợ.<br>**[Cần xác nhận]**: số lần thử, thời gian chờ, lệnh hủy và cách xử lý khi khách bấm Menu hoặc Câu hỏi thường gặp. |
| Giao diện hệ thống | Trường câu hỏi; trường lưu đích; kiểu dữ liệu; hướng dẫn khi sai; số lần thử; thời gian chờ; xem thử; cảnh báo trường bị xóa. |
| Yêu cầu phi chức năng | Thông tin cá nhân được mã hóa và che theo quyền; một tin chỉ được xử lý một lần; xem thử không dùng dữ liệu thật; thời hạn chờ không bị mất khi hệ thống gián đoạn. |
| AC tương ứng | - **AC-AUT-028-01:** Hệ thống gửi câu hỏi và chờ đúng trường đã cấu hình.<br>- **AC-AUT-028-02:** Câu trả lời hợp lệ được lưu và chuyển bước.<br>- **AC-AUT-028-03:** Câu trả lời sai được hướng dẫn nhập lại và không được lưu.<br>- **AC-AUT-028-04:** Tin trả lời không bị chức năng Từ khóa hoặc phản hồi mặc định xử lý trước. |
| BR tương ứng | - **BR-AUT-028-01:** Mỗi phiên chỉ chờ một câu trả lời cụ thể tại một thời điểm.<br>- **BR-AUT-028-02:** Chỉ giá trị qua kiểm tra mới được chuyển sang lưu.<br>- **BR-AUT-028-03:** Một tin trả lời chỉ được tiêu thụ một lần.<br>- **BR-AUT-028-04:** Hết phiên phải giải phóng tin mới cho các chức năng xử lý khác. |
