# FR-AUT-018: Đăng ký và thực thi Kịch bản chăm sóc

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-006: Kịch bản chăm sóc`. |
| Mô tả | Quản lý việc khách đăng ký hoặc hủy kịch bản, lập lịch các bước, thực thi điều kiện và cập nhật thống kê. |
| Đối tượng liên quan | Runtime Automation; scheduler; connector; khách hàng; Admin hoặc Quản lý xem số liệu. |
| Pre-conditions | Kịch bản và bước do FR-AUT-016/017 cung cấp; customer thuộc đúng trang; hành động đăng ký có quyền thực thi. |
| Điều kiện kích hoạt | Action `Đăng ký theo dõi kịch bản`; action hủy đăng ký; job đến hạn. |
| Luồng xử lý chính | 1. Nhận yêu cầu đăng ký gồm customer, sequence và source.<br>2. Tạo subscription duy nhất theo policy và snapshot các bước active.<br>3. Lập job cho từng bước theo offset và giờ gửi.<br>4. Khi job đến hạn, kiểm tra subscription còn active, bước còn active, điều kiện lọc và capability 24 giờ.<br>5. Nếu đủ điều kiện, gửi tin hoặc chạy action.<br>6. Ghi kết quả, chống chạy trùng và lập trạng thái bước tiếp theo.<br>7. Hủy đăng ký sẽ hủy toàn bộ job chưa chạy.<br>8. Danh sách hiển thị số subscriber; từng bước hiển thị Đã gửi và tỷ lệ khách để lại thông tin. |
| Luồng thay thế và ngoại lệ | AF-1: Đăng ký lặp → không tạo job trùng; trả kết quả idempotent.<br>AF-2: Filter không đạt → đánh dấu skipped theo policy, không gửi.<br>AF-3: Bước tắt hoặc bị xóa trước giờ chạy → hủy job đó.<br>AF-4: Gửi/action lỗi → retry theo policy; không ghi thành công hai lần.<br>AF-5: Kịch bản bị xóa → hủy subscription và job tương lai.<br>AF-6: Trang mất kết nối → hoãn hoặc fail theo connector policy, có reason.<br>AF-7: Customer không còn hợp lệ → đóng subscription. |
| Post-condition | Mỗi subscription có lịch và kết quả nhất quán; job chạy tối đa một lần thành công; thống kê được cập nhật. |
| Giao diện hệ thống | Cột Người đăng ký ở danh sách kịch bản; cột Đã gửi và Khách hàng để lại thông tin ở bảng bước; không yêu cầu màn runtime riêng. |
| Quy tắc nghiệp vụ | `BR-AUT-018-01`, `BR-AUT-018-02`, `BR-AUT-018-03`, `BR-AUT-018-04`, `BR-AUT-018-05` |
| Yêu cầu phi chức năng | Scheduler durable; exactly-once effect qua idempotency key; retry có backoff; quan sát được toàn bộ lifecycle; dữ liệu lịch sử không trộn tenant. |
| Tiêu chí chấp nhận | `AC-AUT-018-01`, `AC-AUT-018-02`, `AC-AUT-018-03`, `AC-AUT-018-04`, `AC-AUT-018-05`, `AC-AUT-018-06` |
| Dependency | FR-AUT-016; FR-AUT-017; scheduler; connector; customer service; analytics. |
