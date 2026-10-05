# FR-AUT-020: Cấu hình Quy luật tự động

| Mục | Nội dung |
| --- | --- |
| Mục đích | Cho phép người dùng tạo một quy luật tự động hoàn chỉnh gồm sự kiện kích hoạt, điều kiện lọc và danh sách hành động. |
| Trong phạm vi | Danh sách quy luật; tạo, đổi tên, sao chép, bật hoặc tắt, xóa; chọn trigger; cấu hình nhóm điều kiện; cấu hình và sắp xếp hành động; kiểm tra tính hợp lệ trước khi lưu. |
| Ngoài phạm vi | Không lắng nghe sự kiện thực tế; không đánh giá điều kiện lúc runtime; không chạy hành động; không sở hữu chi tiết chuẩn hóa của từng loại hành động dùng chung. Runtime thuộc FR-AUT-021; hành động dùng chung thuộc FR-AUT-003. |
| Đối tượng liên quan | Admin; Quản lý có quyền quản trị Automation. |
| Pre-conditions | Người dùng có quyền chỉnh sửa; trang đang chọn hợp lệ; các tài nguyên được tham chiếu đang tồn tại. |
| Điều kiện kích hoạt | Người dùng vào AntBot → Quy luật và chọn tạo mới hoặc chỉnh sửa một quy luật. |
| Luồng xử lý chính | 1. Hệ thống tải danh sách hoặc chi tiết quy luật.<br>2. Người dùng nhập thông tin nhận diện và chọn một sự kiện kích hoạt.<br>3. Người dùng thêm các điều kiện và chọn quan hệ logic giữa chúng.<br>4. Người dùng thêm, cấu hình và sắp xếp các hành động; cấu hình hành động dùng chung tuân theo FR-AUT-003.<br>5. Hệ thống kiểm tra trường bắt buộc, kiểu dữ liệu và tham chiếu.<br>6. Người dùng lưu cấu hình; chỉ quy luật hợp lệ mới được phép bật.<br>7. Người dùng có thể sao chép, tắt hoặc xóa quy luật từ danh sách. |
| Ngoại lệ | 1. Thiếu trigger hoặc hành động: không cho bật và hiển thị lỗi tại khối tương ứng.<br>2. Điều kiện sai kiểu dữ liệu: không lưu giá trị sai.<br>3. Tài nguyên tham chiếu bị xóa: đánh dấu cấu hình không hợp lệ và yêu cầu chọn lại.<br>4. Quy luật đang xử lý sự kiện: thao tác xóa tuân theo chính sách an toàn và yêu cầu xác nhận.<br>5. Lưu thất bại: giữ dữ liệu đang nhập và cho phép thử lại. |
| Kết quả | Một cấu hình quy luật hợp lệ được lưu với phiên bản và trạng thái rõ ràng; không có hành động runtime nào được chạy trong FR này. |
| Dữ liệu sở hữu | `rule.id`, `rule.name`, `rule.status`, `rule.trigger`, `rule.conditionTree`, `rule.actions[]`, `rule.version`. |
| Giao diện | Trang danh sách quy luật; màn hình hoặc drawer cấu hình gồm khối trigger, điều kiện, hành động và vùng lỗi; dialog xác nhận xóa. |
| Quy tắc nghiệp vụ | `BR-AUT-020-01`, `BR-AUT-020-02`, `BR-AUT-020-03`, `BR-AUT-020-04`, `BR-AUT-020-05` |
| Tiêu chí chấp nhận | `AC-AUT-020-01`, `AC-AUT-020-02`, `AC-AUT-020-03`, `AC-AUT-020-04`, `AC-AUT-020-05` |
| Yêu cầu phi chức năng | UI phản hồi trong 50 ms; lưu trong 1,5 giây ở điều kiện bình thường; thay đổi trạng thái phải được phân quyền, ghi phiên bản và audit log. |
| Dependency | FR-AUT-001 cung cấp ngữ cảnh trang và quyền; FR-AUT-003 sở hữu các loại hành động dùng chung; FR-AUT-021 thực thi quy luật đã bật. |
