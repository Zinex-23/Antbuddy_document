# FR-AUT-018: Cấu hình bước Kịch bản chăm sóc

| Mục | Nội dung |
| --- | --- |
| Mục đích | Cho phép người dùng xây dựng chuỗi bước chăm sóc theo thứ tự, thời gian chờ và nội dung gửi. |
| Trong phạm vi | Thêm, sửa, xóa, sao chép và sắp xếp bước; cấu hình thời gian chờ; chọn loại bước; gắn nội dung hoặc hành động dùng chung; kiểm tra cấu hình trước khi lưu. |
| Ngoài phạm vi | Không quản lý danh mục kịch bản; không đăng ký khách hàng; không điều phối lịch chạy; không tính thống kê gửi. Các nội dung này thuộc FR-AUT-017 và FR-AUT-019. |
| Đối tượng liên quan | Admin; Quản lý có quyền chỉnh sửa Automation. |
| Pre-conditions | Một kịch bản hợp lệ đã được chọn từ FR-AUT-017; người dùng có quyền chỉnh sửa. |
| Điều kiện kích hoạt | Người dùng chọn Chỉnh sửa tại một Kịch bản chăm sóc. |
| Luồng xử lý chính | 1. Hệ thống tải các bước theo đúng thứ tự đã lưu.<br>2. Người dùng thêm bước mới hoặc chọn bước hiện có.<br>3. Người dùng chọn loại bước, cấu hình thời gian chờ và nội dung tương ứng.<br>4. Với nội dung tin nhắn, hệ thống sử dụng trình soạn tại FR-AUT-002; với nút hoặc hành động, hệ thống sử dụng FR-AUT-003.<br>5. Người dùng thay đổi thứ tự, sao chép hoặc xóa bước khi cần.<br>6. Hệ thống kiểm tra dữ liệu và lưu bản cấu hình. |
| Ngoại lệ | 1. Bước thiếu loại, thời gian hoặc nội dung bắt buộc: đánh dấu lỗi và không lưu.<br>2. Thời gian chờ ngoài giới hạn: hiển thị lỗi tại trường thời gian.<br>3. Hành động tham chiếu không còn tồn tại: đánh dấu bước không hợp lệ và yêu cầu chọn lại.<br>4. Xóa bước: yêu cầu xác nhận nếu thao tác làm thay đổi luồng đang dùng.<br>5. Lưu thất bại: giữ dữ liệu người dùng đang nhập và cho phép thử lại. |
| Kết quả | Cấu trúc phiên bản nháp của kịch bản được lưu; chưa có khách hàng nào được đăng ký hoặc nhận tin chỉ bởi thao tác này. |
| Dữ liệu sở hữu | `sequence.steps[]`, `step.id`, `step.order`, `step.type`, `step.delay`, `step.contentRef`, `step.actionRefs`. |
| Giao diện | Vùng danh sách bước theo thứ tự; vùng cấu hình chi tiết bước; trình soạn nội dung; điều khiển thêm, sao chép, xóa và sắp xếp. |
| Quy tắc nghiệp vụ | `BR-AUT-018-01`, `BR-AUT-018-02`, `BR-AUT-018-03`, `BR-AUT-018-04`, `BR-AUT-018-05` |
| Tiêu chí chấp nhận | `AC-AUT-018-01`, `AC-AUT-018-02`, `AC-AUT-018-03`, `AC-AUT-018-04`, `AC-AUT-018-05` |
| Yêu cầu phi chức năng | Thay đổi trạng thái UI phản hồi trong 50 ms; lưu cấu hình trong 1,5 giây ở điều kiện bình thường; chống mất dữ liệu khi lỗi mạng. |
| Dependency | FR-AUT-002 sở hữu quy tắc soạn tin; FR-AUT-003 sở hữu quy tắc nút và hành động; FR-AUT-019 thực thi cấu hình đã hợp lệ. |
