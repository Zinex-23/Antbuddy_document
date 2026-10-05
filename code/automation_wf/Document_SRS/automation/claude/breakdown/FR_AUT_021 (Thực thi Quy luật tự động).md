# FR-AUT-021: Thực thi Quy luật tự động

| Mục | Nội dung |
| --- | --- |
| Mục đích | Tiếp nhận sự kiện, xác định quy luật phù hợp và thực thi hành động một cách kiểm soát, có thể truy vết. |
| Trong phạm vi | Nhận và chống trùng sự kiện; tải phiên bản quy luật đang bật; đánh giá điều kiện; chạy hành động theo thứ tự; xử lý lỗi và retry; ghi log; tổng hợp trạng thái thực thi. |
| Ngoài phạm vi | Không tạo hoặc chỉnh sửa quy luật; không thay đổi trigger, điều kiện hay hành động; không định nghĩa giao diện cấu hình. Các nội dung này thuộc FR-AUT-020. |
| Đối tượng liên quan | Hệ thống Automation; Admin hoặc Quản lý xem lịch sử; các dịch vụ phát sinh sự kiện và dịch vụ thực thi hành động. |
| Pre-conditions | Sự kiện có định danh hợp lệ; quy luật đang bật và có phiên bản cấu hình hợp lệ; các dịch vụ phụ thuộc sẵn sàng. |
| Điều kiện kích hoạt | Hệ thống nhận một sự kiện thuộc loại trigger đã được hỗ trợ. |
| Luồng xử lý chính | 1. Hệ thống tiếp nhận và kiểm tra định danh sự kiện để chống xử lý trùng.<br>2. Hệ thống tìm các quy luật đang bật có trigger tương ứng.<br>3. Với từng quy luật, hệ thống cố định phiên bản cấu hình dùng cho lần chạy.<br>4. Hệ thống đánh giá cây điều kiện trên dữ liệu sự kiện.<br>5. Nếu thỏa điều kiện, hệ thống chạy các hành động theo thứ tự và ghi kết quả từng hành động.<br>6. Hệ thống áp dụng retry với lỗi tạm thời nhưng không lặp lại hành động đã thành công ngoài ý muốn.<br>7. Hệ thống chốt trạng thái lần chạy và cập nhật số liệu theo dõi. |
| Ngoại lệ | 1. Sự kiện trùng: trả về kết quả đã xử lý hoặc bỏ qua an toàn.<br>2. Không có quy luật phù hợp: ghi nhận và kết thúc mà không chạy hành động.<br>3. Điều kiện không thỏa: đánh dấu bỏ qua.<br>4. Một hành động thất bại: xử lý theo chính sách dừng hoặc tiếp tục được cấu hình; ghi rõ nguyên nhân.<br>5. Dịch vụ phụ thuộc tạm thời không sẵn sàng: retry theo chính sách; quá giới hạn thì chuyển trạng thái thất bại. |
| Kết quả | Mỗi sự kiện và mỗi quy luật có một bản ghi thực thi truy vết được; hành động không bị chạy trùng do cơ chế retry. |
| Dữ liệu sở hữu | `automationEvent`, `ruleExecution`, `actionExecution`, `idempotencyKey`, `executionStatus`, `executionLog`, `ruleMetrics`. |
| Giao diện | Màn hình lịch sử chạy gồm bộ lọc, trạng thái, thời gian, quy luật, sự kiện và chi tiết từng hành động; không chứa chức năng sửa cấu hình. |
| Quy tắc nghiệp vụ | `BR-AUT-021-01`, `BR-AUT-021-02`, `BR-AUT-021-03`, `BR-AUT-021-04`, `BR-AUT-021-05` |
| Tiêu chí chấp nhận | `AC-AUT-021-01`, `AC-AUT-021-02`, `AC-AUT-021-03`, `AC-AUT-021-04`, `AC-AUT-021-05` |
| Yêu cầu phi chức năng | Xử lý idempotent; log có correlation ID; bảo toàn thứ tự khi nghiệp vụ yêu cầu; giám sát được tỷ lệ thành công, lỗi và độ trễ. |
| Dependency | FR-AUT-020 cung cấp phiên bản cấu hình; hệ thống sự kiện cung cấp trigger; các dịch vụ đích thực hiện hành động tương ứng. |
