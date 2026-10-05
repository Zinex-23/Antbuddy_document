# FR-AUT-019: Đăng ký và thực thi Kịch bản chăm sóc

| Mục | Nội dung |
| --- | --- |
| Mục đích | Đăng ký khách hàng vào Kịch bản chăm sóc, thực thi các bước theo lịch và cung cấp trạng thái vận hành. |
| Trong phạm vi | Nhận yêu cầu đăng ký hoặc hủy đăng ký; ngăn đăng ký trùng; lập lịch bước; gửi nội dung; xử lý retry; dừng khi không còn hợp lệ; ghi nhận trạng thái và thống kê. |
| Ngoài phạm vi | Không tạo hoặc đổi tên kịch bản; không biên tập bước hay nội dung; không định nghĩa quy tắc của trình soạn tin. Các nội dung này thuộc FR-AUT-017, FR-AUT-018 và các FR dùng chung. |
| Đối tượng liên quan | Admin; Quản lý; hệ thống Automation; khách hàng nhận tin. |
| Pre-conditions | Kịch bản đang bật, có ít nhất một bước hợp lệ; khách hàng và kênh gửi đáp ứng điều kiện vận hành. |
| Điều kiện kích hoạt | Một tác nhân hợp lệ yêu cầu đăng ký khách hàng vào kịch bản; hoặc đến thời điểm chạy bước đã được lập lịch. |
| Luồng xử lý chính | 1. Hệ thống nhận yêu cầu đăng ký và kiểm tra kịch bản, khách hàng, kênh gửi.<br>2. Hệ thống tạo bản ghi tham gia và xác định bước đầu tiên.<br>3. Đến thời điểm thực thi, hệ thống kiểm tra lại trạng thái trước khi gửi.<br>4. Hệ thống gửi nội dung của bước và ghi kết quả.<br>5. Nếu còn bước tiếp theo, hệ thống lập lịch theo thời gian chờ đã cấu hình.<br>6. Khi hoàn tất, bị hủy hoặc gặp điều kiện dừng, hệ thống cập nhật trạng thái cuối.<br>7. Số liệu được tổng hợp cho màn hình theo dõi. |
| Ngoại lệ | 1. Khách hàng đã tham gia cùng kịch bản: xử lý theo chính sách đăng ký trùng và không tạo bản ghi ngoài ý muốn.<br>2. Kịch bản hoặc kênh bị tắt trước thời điểm gửi: dừng bước và ghi rõ nguyên nhân.<br>3. Gửi thất bại tạm thời: retry theo chính sách; quá số lần thì đánh dấu thất bại.<br>4. Khách hàng không còn đủ điều kiện nhận tin: dừng hoặc bỏ qua theo chính sách kênh.<br>5. Cấu hình tham chiếu bị hỏng: không gửi và phát sinh cảnh báo vận hành. |
| Kết quả | Mỗi lượt tham gia có trạng thái và lịch sử bước rõ ràng; số liệu gửi, thành công, thất bại, đang chạy và hoàn tất được cập nhật. |
| Dữ liệu sở hữu | `sequenceEnrollment`, `scheduledStep`, `executionAttempt`, `executionStatus`, `deliveryResult`, `sequenceMetrics`. |
| Giao diện | Màn hình theo dõi lượt tham gia, trạng thái từng khách hàng, lịch sử bước, bộ lọc và số liệu tổng hợp; không chứa trình biên tập cấu hình. |
| Quy tắc nghiệp vụ | `BR-AUT-019-01`, `BR-AUT-019-02`, `BR-AUT-019-03`, `BR-AUT-019-04`, `BR-AUT-019-05` |
| Tiêu chí chấp nhận | `AC-AUT-019-01`, `AC-AUT-019-02`, `AC-AUT-019-03`, `AC-AUT-019-04`, `AC-AUT-019-05` |
| Yêu cầu phi chức năng | Thực thi idempotent; không gửi trùng do retry; lưu đầy đủ log; dữ liệu thống kê có thể trễ theo SLA được công bố. |
| Dependency | FR-AUT-017 cung cấp trạng thái kịch bản; FR-AUT-018 cung cấp cấu trúc bước; dịch vụ kênh chịu trách nhiệm chuyển phát thực tế. |
