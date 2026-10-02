# FR-AUT-015: Phản hồi và vận hành Từ khóa

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-005: Thiết lập từ khóa`. |
| Mô tả | Cấu hình phản hồi cho keyword, bật tắt keyword và thực thi keyword có ưu tiên cao nhất khi message match. |
| Đối tượng liên quan | Admin; Quản lý; runtime AntBot; khách hàng. |
| Pre-conditions | Biểu thức keyword do FR-AUT-014 tạo; trang và connector hoạt động. |
| Điều kiện kích hoạt | Sau khi lưu nội dung keyword; sửa phản hồi; runtime nhận inbound hoặc outbound message phù hợp tab. |
| Luồng xử lý chính | 1. Hệ thống mở editor phản hồi cho keyword.<br>2. Người dùng tạo nội dung mới hoặc chọn nội dung/flow có sẵn theo capability.<br>3. Cấu hình text, media, nút, trả lời nhanh và action cần thiết.<br>4. `Xem thử` cập nhật Preview mà không gửi thật.<br>5. Người dùng lưu phản hồi; keyword hoàn tất có thể bật `Kích hoạt`.<br>6. Runtime lấy keyword active của đúng tab theo order.<br>7. Matcher đánh giá lần lượt; keyword đầu tiên match được chọn.<br>8. Runtime gửi response hoặc chạy action đúng một lần và ghi lượt khớp. |
| Luồng thay thế và ngoại lệ | AF-1: Chưa có phản hồi hợp lệ → keyword ở trạng thái chưa hoàn tất, không bật được.<br>AF-2: Target response bị xóa/inactive → tự tắt hoặc đánh dấu cần cấu hình lại.<br>AF-3: Nhiều keyword match → chỉ keyword ưu tiên cao nhất chạy.<br>AF-4: FAQ/intent đã sở hữu event theo orchestration → không chạy trùng.<br>AF-5: Gửi phản hồi lỗi → ghi lỗi, retry idempotent; không chạy keyword thứ hai như fallback trừ khi policy quy định.<br>AF-6: Preview → không tăng lượt khớp. |
| Post-condition | Keyword hoàn tất có response hợp lệ; event match tạo tối đa một lần thực thi; số lượt khớp được cập nhật. |
| Giao diện hệ thống | Editor nội dung dùng chung; `Xem thử`; `Lưu` hoặc `Cập nhật`; toggle `Kích hoạt`; cột phản hồi và lượt khớp ở danh sách. |
| Quy tắc nghiệp vụ | `BR-AUT-015-01`, `BR-AUT-015-02`, `BR-AUT-015-03`, `BR-AUT-015-04`, `BR-AUT-015-05`, `BR-AUT-015-06` |
| Yêu cầu phi chức năng | Runtime idempotent; quyết định match và chọn response dưới 100 ms P95; logging có keywordId, version, eventId; không lộ dữ liệu giữa trang. |
| Tiêu chí chấp nhận | `AC-AUT-015-01`, `AC-AUT-015-02`, `AC-AUT-015-03`, `AC-AUT-015-04`, `AC-AUT-015-05`, `AC-AUT-015-06` |
| Dependency | FR-AUT-013; FR-AUT-014; content editor; runtime router; connector. |
