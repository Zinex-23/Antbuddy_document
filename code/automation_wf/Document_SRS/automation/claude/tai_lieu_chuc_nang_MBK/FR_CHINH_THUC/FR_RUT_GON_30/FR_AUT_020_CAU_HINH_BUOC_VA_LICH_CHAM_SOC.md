# FR-AUT-020: Cấu hình bước và lịch chăm sóc

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép cấu hình các bước tin nhắn hoặc hành động, thời điểm thực hiện, khung giờ gửi và điều kiện áp dụng trong một kịch bản chăm sóc. |
| Đối tượng liên quan | **Người quản trị:** cấu hình bước, lịch và điều kiện.<br>**Khách hàng:** nhận nội dung hoặc tác động khi đủ điều kiện.<br>**Hệ thống:** tính lịch và cung cấp cấu hình cho FR-AUT-022. |
| Pre-conditions | Kịch bản tồn tại; người dùng có quyền; nội dung, hành động và trường điều kiện còn hiệu lực. |
| Điều kiện kích hoạt | Người dùng thêm, sửa, sao chép, xóa, sắp xếp hoặc bật tắt một bước. |
| Luồng xử lý chính | 1. Người dùng chọn bước **Tin nhắn** hoặc **Hành động**.<br>2. Người dùng cấu hình nội dung hoặc hành động.<br>3. Người dùng chọn thực hiện ngay, sau một khoảng thời gian hoặc vào ngày giờ cố định.<br>4. Người dùng đặt múi giờ, khung giờ và điều kiện nếu cần.<br>5. Hệ thống hiển thị thời điểm dự kiến và kiểm tra dữ liệu.<br>6. Người dùng lưu và sắp xếp bước. |
| Post-condition | Mỗi bước có loại, nội dung, thứ tự, trạng thái, lịch và điều kiện rõ ràng. |
| Luồng thay thế | - Bước thiếu thông tin: đánh dấu **Chưa hoàn tất**.<br>- Thời gian hoặc khung giờ sai: không cho lưu.<br>- Đối tượng đích bị xóa: hiển thị **Cần cấu hình lại**.<br>- Mốc thực hiện đã qua hoặc ngoài khung giờ: xử lý theo quyết định đã xác nhận. |
| Sub-flow | **Sao chép:** tạo bước mới có cùng nội dung, lịch và điều kiện.<br>**Phiên bản:** khách đang tham gia giữ cấu hình đã đăng ký.<br>**[Cần xác nhận]**: danh sách hành động; mốc bắt đầu của “Sau X”; cách xử lý ngoài giờ, mốc đã qua và đổi giờ mùa hè. |
| Giao diện hệ thống | Danh sách hoặc dòng thời gian các bước; loại bước; trình biên soạn; trường lịch, múi giờ, khung giờ và điều kiện; thời điểm dự kiến; trạng thái lỗi. |
| Yêu cầu phi chức năng | Lịch không bị mất khi hệ thống gián đoạn; chỉnh sửa không âm thầm đổi lịch của khách đang chạy phiên bản cũ; một bước không tạo tác động trùng. |
| AC tương ứng | - **AC-AUT-020-01:** Thêm bước hiển thị đúng trường theo loại đã chọn.<br>- **AC-AUT-020-02:** Bước thiếu nội dung hoặc lịch không thể bật.<br>- **AC-AUT-020-03:** Lịch hợp lệ hiển thị đúng thời điểm dự kiến theo múi giờ.<br>- **AC-AUT-020-04:** Sửa bản mới không đổi lịch của khách đang chạy bản cũ.<br>- **AC-AUT-020-05:** Tắt bước ngăn việc chưa chạy nhưng không hoàn tác việc đã hoàn tất. |
| BR tương ứng | - **BR-AUT-020-01:** Mỗi bước có đúng một loại và một quy tắc thời điểm.<br>- **BR-AUT-020-02:** Bước chưa hoàn tất hoặc cần cấu hình lại không được thực hiện.<br>- **BR-AUT-020-03:** Lịch dùng múi giờ đã chọn và kiểm tra điều kiện khi đến hạn.<br>- **BR-AUT-020-04:** Thay đổi chỉ áp dụng cho phiên bản được lưu sau thay đổi.<br>- **BR-AUT-020-05:** Cách xử lý ngoài giờ phải được công bố, không dùng mặc định ngầm. |
