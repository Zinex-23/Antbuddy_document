# FR-AUT-001: Biên soạn nội dung tin nhắn

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép tạo nội dung tin nhắn gồm văn bản, emoji, biến thông tin, ảnh, video, âm thanh và các khối nội dung được kênh hỗ trợ. |
| Đối tượng liên quan | **Người quản trị:** soạn và chỉnh sửa nội dung.<br>**Khách hàng:** nhận nội dung sau khi cấu hình được áp dụng.<br>**Hệ thống:** kiểm tra, lưu và hiển thị nội dung. |
| Pre-conditions | Người dùng đã đăng nhập, có quyền chỉnh sửa và đã chọn kênh hoặc luồng cần cấu hình. |
| Điều kiện kích hoạt | Người dùng tạo mới hoặc mở một bước tin nhắn để chỉnh sửa. |
| Luồng xử lý chính | 1. Hệ thống mở trình biên soạn.<br>2. Người dùng thêm và sắp xếp nội dung.<br>3. Người dùng chèn biến thông tin nếu cần.<br>4. Hệ thống kiểm tra định dạng và giới hạn của kênh.<br>5. Người dùng xem trước và lưu bản nháp. |
| Post-condition | Nội dung hợp lệ được lưu vào đúng bước tin nhắn; bản nháp chưa được gửi cho khách. |
| Luồng thay thế | - Nội dung trống hoặc vượt giới hạn: không cho lưu và nêu rõ lỗi.<br>- Tệp không hợp lệ: từ chối tải lên.<br>- Biến thông tin đã bị xóa: đánh dấu **Cần cấu hình lại**.<br>- Lưu lỗi: giữ nội dung đang nhập để người dùng thử lại. |
| Sub-flow | **Biến thông tin:** khi xem thử dùng dữ liệu mẫu; khi gửi dùng dữ liệu của khách.<br>**Giới hạn văn bản:** tối đa 1.200 ký tự nếu không có nút và 640 ký tự nếu có ít nhất một nút.<br>**Tệp:** ảnh tối đa 5 MB; video, âm thanh và tệp đính kèm khác tối đa 25 MB/tệp.<br>**Khối hỗ trợ:** văn bản/emoji/biến, ảnh, video, âm thanh, bộ sưu tập, tệp đính kèm, trì hoãn, thu thập thông tin, AI, API, điều kiện và hành động. Khối không được kênh đích hỗ trợ sẽ bị chặn khi áp dụng. |
| Giao diện hệ thống | Vùng soạn thảo; nút emoji, biến thông tin và tải tệp; danh sách khối; bộ đếm giới hạn; thông báo lỗi; nút xem trước và lưu. |
| Yêu cầu phi chức năng | Nội dung đang soạn không bị mất khi lưu lỗi; tệp tải lên được kiểm tra an toàn; dữ liệu các kênh không bị dùng lẫn; giao diện dùng được bằng bàn phím. |
| AC tương ứng | - **AC-AUT-001-01:** Người dùng thêm, sửa, xóa và sắp xếp được các nội dung được hỗ trợ.<br>- **AC-AUT-001-02:** Nội dung không hợp lệ bị chặn và hiển thị đúng lỗi.<br>- **AC-AUT-001-03:** Biến thông tin hiển thị dữ liệu mẫu khi xem thử.<br>- **AC-AUT-001-04:** Lưu bản nháp không gửi tin cho khách. |
| BR tương ứng | - **BR-AUT-001-01:** Một bước tin nhắn phải có ít nhất một nội dung hợp lệ.<br>- **BR-AUT-001-02:** Văn bản tối đa 1.200 ký tự khi không có nút và 640 ký tự khi có nút.<br>- **BR-AUT-001-03:** Ảnh tối đa 5 MB; video, âm thanh và tệp khác tối đa 25 MB/tệp; giới hạn thấp hơn của kênh luôn được ưu tiên.<br>- **BR-AUT-001-04:** Biến thông tin chỉ được dùng khi còn hiệu lực và đúng phạm vi.<br>- **BR-AUT-001-05:** Bản nháp không tác động đến khách.<br>- **BR-AUT-001-06:** Tệp không an toàn hoặc loại khối không được kênh hỗ trợ không được phát hành. |
