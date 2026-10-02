# FR-AUT-012: Gửi và thống kê Tin nhắn mặc định

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-004: Thiết lập tin nhắn mặc định`. |
| Mô tả | Thực thi Tin nhắn mặc định khi bot không xử lý được tin nhắn đến, áp dụng giới hạn tần suất và ghi thống kê theo bước cùng toàn luồng. |
| Đối tượng liên quan | Runtime AntBot; khách hàng; connector; analytics; Admin hoặc Quản lý xem số liệu. |
| Pre-conditions | Cấu hình hợp lệ; `Kích hoạt` và `Mặc định` đều bật; kênh đang hoạt động. |
| Điều kiện kích hoạt | Tin nhắn đến không khớp keyword, FAQ, intent hoặc automation ưu tiên cao hơn. |
| Luồng xử lý chính | 1. Runtime nhận event và chạy cơ chế phân tuyến.<br>2. Khi không có handler phù hợp, kiểm tra trạng thái cấu hình và lần gửi gần nhất.<br>3. Nếu khách chưa nhận trong 24 giờ, chọn bước phù hợp với cửa sổ 24 giờ và capability kênh.<br>4. Gửi bước `BẮT ĐẦU`, sau đó thực thi graph theo next step và tương tác khách.<br>5. Đánh dấu tần suất sau khi gửi thành công.<br>6. Ghi thống kê gửi, thành công, đọc, click, chưa thành công/thất bại và KH để lại SĐT.<br>7. Tổng hợp số liệu theo bước và toàn cấu hình. |
| Luồng thay thế và ngoại lệ | AF-1: Đã gửi trong 24 giờ → không gửi lại.<br>AF-2: Kích hoạt hoặc Mặc định tắt → không gửi.<br>AF-3: Keyword/intent/FAQ đã xử lý event → không chạy default.<br>AF-4: Loại ngoài 24 giờ không được connector hỗ trợ → bỏ qua bước, ghi reason.<br>AF-5: Gửi lỗi → không thay thế cấu hình; ghi thất bại và retry theo connector.<br>AF-6: Reference hỏng → dừng an toàn, cảnh báo cấu hình. |
| Post-condition | Tin nhắn mặc định được gửi tối đa theo tần suất; không chồng với response khác; analytics thuộc đúng version và step. |
| Giao diện hệ thống | Vùng `Thống kê luồng`: loại tin nhắn, số người được gửi, Thành công, Đã đọc, Đã click, Chưa thành công, KH để lại SĐT. Vùng tổng dùng nhãn Thất bại cho cùng metric thất bại. |
| Quy tắc nghiệp vụ | `BR-AUT-012-01`, `BR-AUT-012-02`, `BR-AUT-012-03`, `BR-AUT-012-04`, `BR-AUT-012-05` |
| Yêu cầu phi chức năng | Quyết định fallback dưới 100 ms P95; event idempotent; có correlation ID; chống gửi trùng khi retry; analytics eventual consistency có timestamp. |
| Tiêu chí chấp nhận | `AC-AUT-012-01`, `AC-AUT-012-02`, `AC-AUT-012-03`, `AC-AUT-012-04`, `AC-AUT-012-05` |
| Dependency | FR-AUT-010; FR-AUT-011; keyword/intent router; connector; analytics. |
