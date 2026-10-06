# FR-AUT-003: Cấu hình trả lời nhanh

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép tạo các lựa chọn ngắn để khách bấm trả lời và xác định kết quả của từng lựa chọn. |
| Đối tượng liên quan | **Người quản trị:** tạo và sắp xếp lựa chọn.<br>**Khách hàng:** chọn câu trả lời.<br>**Hệ thống:** ghi nhận lựa chọn và chạy kết quả tương ứng. |
| Pre-conditions | Đã có bước tin nhắn; kênh hỗ trợ trả lời nhanh; người dùng có quyền chỉnh sửa. |
| Điều kiện kích hoạt | Người dùng chọn **Thêm trả lời nhanh** hoặc sửa một lựa chọn đã có. |
| Luồng xử lý chính | 1. Người dùng nhập tên lựa chọn.<br>2. Người dùng chọn kết quả khi khách bấm.<br>3. Người dùng sắp xếp các lựa chọn.<br>4. Hệ thống kiểm tra tên trùng và giới hạn của kênh.<br>5. Người dùng lưu và xem trước. |
| Post-condition | Danh sách trả lời nhanh hợp lệ được lưu cùng tin nhắn. |
| Luồng thay thế | - Tên trống, trùng hoặc quá dài: không cho lưu.<br>- Kết quả chưa được cấu hình: đánh dấu lỗi.<br>- Lựa chọn đã hết hiệu lực: không chạy hành động.<br>- Hệ thống nhận lại cùng lựa chọn: không xử lý lần hai. |
| Sub-flow | **Sau khi chọn:** lựa chọn có thể ẩn theo cách hoạt động của kênh.<br>**Thu thập thông tin:** lựa chọn có thể được dùng làm câu trả lời nếu bước thu thập cho phép.<br>**[Cần xác nhận]**: số lượng tối đa và thời hạn của lựa chọn. |
| Giao diện hệ thống | Danh sách lựa chọn; trường tên; trường kết quả; kéo thả sắp xếp; bộ đếm; xem trước; thông báo lỗi. |
| Yêu cầu phi chức năng | Một lựa chọn chỉ được xử lý một lần; dữ liệu lựa chọn không hợp lệ không được chạy hành động; giao diện hỗ trợ bàn phím. |
| AC tương ứng | - **AC-AUT-003-01:** Người dùng thêm, sửa, xóa và sắp xếp được trả lời nhanh.<br>- **AC-AUT-003-02:** Tên trùng hoặc vượt giới hạn bị chặn.<br>- **AC-AUT-003-03:** Khách bấm lựa chọn nào thì hệ thống chạy đúng kết quả đó.<br>- **AC-AUT-003-04:** Lựa chọn lặp hoặc hết hiệu lực không tạo tác động trùng. |
| BR tương ứng | - **BR-AUT-003-01:** Mỗi trả lời nhanh có một tên và một kết quả rõ ràng.<br>- **BR-AUT-003-02:** Tên không được trùng trong cùng tin nhắn.<br>- **BR-AUT-003-03:** Giới hạn số lượng và độ dài theo từng kênh.<br>- **BR-AUT-003-04:** Lựa chọn chỉ có hiệu lực trong tin nhắn đã gửi. |
