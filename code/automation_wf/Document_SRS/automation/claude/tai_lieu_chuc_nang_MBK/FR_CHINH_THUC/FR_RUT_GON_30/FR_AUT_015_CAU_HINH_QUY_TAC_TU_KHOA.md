# FR-AUT-015: Cấu hình quy tắc Từ khóa

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép xác định tin nhắn nào được xem là khớp Từ khóa và nội dung hoặc luồng sẽ được gửi khi khớp. |
| Đối tượng liên quan | **Người quản trị:** cấu hình điều kiện và phản hồi.<br>**Khách hàng hoặc nhân viên:** gửi tin thuộc phạm vi cho phép.<br>**Hệ thống:** kiểm tra quy tắc cho FR-AUT-018. |
| Pre-conditions | Người dùng có quyền; kênh đang hoạt động; loại nội dung và cách so khớp được hỗ trợ; phản hồi còn hiệu lực. |
| Điều kiện kích hoạt | Người dùng tạo hoặc sửa quy tắc Từ khóa. |
| Luồng xử lý chính | 1. Người dùng chọn phạm vi nguồn tin.<br>2. Người dùng chọn cách so khớp và nhập từ hoặc cụm từ.<br>3. Người dùng chọn nội dung hoặc luồng phản hồi.<br>4. Người dùng đặt tần suất và độ trễ nếu cần.<br>5. Hệ thống kiểm tra điều kiện, phản hồi và giới hạn.<br>6. Người dùng thử với tin mẫu rồi lưu. |
| Post-condition | Quy tắc có điều kiện và phản hồi rõ ràng, sẵn sàng được bật tại FR-AUT-016 và chạy tại FR-AUT-018. |
| Luồng thay thế | - Từ khóa trống, trùng hoặc điều kiện mâu thuẫn: không cho lưu.<br>- Thiếu phản hồi: quy tắc ở trạng thái **Chưa hoàn tất**.<br>- Đối tượng phản hồi bị xóa: hiển thị **Cần cấu hình lại**.<br>- Tần suất hoặc độ trễ ngoài giới hạn: chặn lưu. |
| Sub-flow | **Chuẩn hóa:** bỏ khoảng trắng thừa và không phân biệt chữ hoa, chữ thường nếu được cấu hình.<br>**Loại nội dung:** có thể gồm văn bản, ảnh, video hoặc loại được kênh hỗ trợ.<br>**[Cần xác nhận]**: các cách so khớp, phạm vi nguồn tin, cách tính “một lần” và giới hạn độ trễ. |
| Giao diện hệ thống | Trường phạm vi; cách so khớp; từ khóa; loại nội dung; lựa chọn phản hồi; tần suất; độ trễ; vùng thử tin mẫu; thông báo lỗi. |
| Yêu cầu phi chức năng | Cùng đầu vào và phiên bản phải cho cùng kết quả; lịch gửi trễ không bị mất; nội dung tin khách không được lưu ngoài chính sách. |
| AC tương ứng | - **AC-AUT-015-01:** Mỗi cách so khớp hiển thị đúng trường cần nhập.<br>- **AC-AUT-015-02:** Điều kiện lỗi hoặc thiếu phản hồi không thể bật.<br>- **AC-AUT-015-03:** Tin mẫu cho biết rõ có khớp và phản hồi nào sẽ được dùng.<br>- **AC-AUT-015-04:** Tần suất và độ trễ được lưu đúng cấu hình. |
| BR tương ứng | - **BR-AUT-015-01:** Mỗi quy tắc có ít nhất một điều kiện và đúng một phản hồi hợp lệ.<br>- **BR-AUT-015-02:** Việc thử tin mẫu phải dùng cùng cách so khớp như xử lý thật.<br>- **BR-AUT-015-03:** Tần suất và độ trễ phải được hiển thị rõ.<br>- **BR-AUT-015-04:** Tin do bot hoặc chức năng tự động hóa gửi mặc định không được dò Từ khóa. |
