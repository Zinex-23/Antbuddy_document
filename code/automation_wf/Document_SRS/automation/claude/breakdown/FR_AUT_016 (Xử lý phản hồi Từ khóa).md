# FR-AUT-016: Xử lý phản hồi Từ khóa

| Mục | Nội dung |
|---|---|
| Mục đích | Gắn response cho keyword và thực thi keyword ưu tiên cao nhất khi message match. |
| Trong phạm vi | Soạn/chọn response qua FR-AUT-002; hoàn tất/bật keyword; đánh giá theo order; gửi response; ghi lượt khớp. |
| Ngoài phạm vi | Không quản lý danh sách/import (FR-AUT-014) hoặc biểu thức (FR-AUT-015). |
| Đối tượng liên quan | Admin; Quản lý; runtime; khách hàng; connector. |
| Pre-conditions | Keyword có biểu thức hợp lệ. |
| Điều kiện kích hoạt | Cấu hình response hoặc runtime nhận message đúng direction. |
| Luồng xử lý chính | 1. Người dùng tạo/chọn response bằng FR-AUT-002.<br>2. Lưu response làm keyword complete.<br>3. Runtime lấy keyword active theo order.<br>4. Đánh giá biểu thức bằng FR-AUT-015.<br>5. Chọn keyword match đầu tiên.<br>6. Gửi response đúng một lần.<br>7. Ghi lượt match/kết quả. |
| Ngoại lệ | AF-1: Chưa có response → không bật được.<br>AF-2: Nhiều keyword match → chỉ chọn order cao nhất.<br>AF-3: FAQ/handler ưu tiên đã nhận event → không chạy keyword.<br>AF-4: Response reference hỏng → tự tắt/đánh dấu cần sửa.<br>AF-5: Gửi lỗi → retry idempotent, không chạy keyword thứ hai. |
| Kết quả | Một message tạo tối đa một keyword response; lượt match chính xác. |
| Dữ liệu sở hữu | `keywordResponseRef`, match/execution events và aggregates. |
| Giao diện | Dùng FR-AUT-002; danh sách hiển thị response, trạng thái và lượt match. |
| Quy tắc nghiệp vụ | `BR-AUT-016-01`, `BR-AUT-016-02`, `BR-AUT-016-03`, `BR-AUT-016-04` |
| Tiêu chí chấp nhận | `AC-AUT-016-01`, `AC-AUT-016-02`, `AC-AUT-016-03`, `AC-AUT-016-04` |
| Yêu cầu phi chức năng | Match+select dưới 100 ms P95; idempotent; log keywordId/version/eventId. |
| Dependency | FR-AUT-002; FR-AUT-014; FR-AUT-015; runtime router. |
