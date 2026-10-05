# FR-AUT-011: Gửi và đo lường Tin nhắn mở đầu

| Mục | Nội dung |
|---|---|
| Mục đích | Gửi Tin nhắn mở đầu đúng một lần khi khách bắt đầu phiên hội thoại mới và ghi thống kê. |
| Trong phạm vi | Xác định session mới; kiểm tra cấu hình enabled/published; gửi content graph; chống gửi trùng; thống kê bước và tổng. |
| Ngoài phạm vi | Không sửa nội dung hoặc publish. |
| Đối tượng liên quan | Khách hàng; runtime; connector; session service; analytics. |
| Pre-conditions | FR-AUT-010 có published config đang bật. |
| Điều kiện kích hoạt | Tin nhắn đầu tiên của một session mới. |
| Luồng xử lý chính | 1. Xác định session mới.<br>2. Kiểm tra chưa gửi Welcome trong session.<br>3. Kiểm tra event chưa được FAQ/Keyword/automation ưu tiên xử lý.<br>4. Gửi bước đầu và đi theo content graph.<br>5. Đánh dấu đã gửi cho session.<br>6. Ghi gửi, thành công, đọc, click, thất bại và để lại SĐT. |
| Ngoại lệ | AF-1: Cấu hình tắt/không published → không gửi.<br>AF-2: Đã gửi trong session → không gửi lại.<br>AF-3: Event do click FAQ hoặc trigger chuyên biệt → không gửi chồng.<br>AF-4: Connector lỗi → retry idempotent.<br>AF-5: Content reference hỏng → dừng an toàn và báo cấu hình. |
| Kết quả | Mỗi session nhận tối đa một Welcome; analytics đúng version. |
| Dữ liệu sở hữu | `welcomeDelivery`, session sent marker, interaction events và aggregates. |
| Giao diện | Cung cấp thống kê theo bước và toàn Welcome cho FR-AUT-010. |
| Quy tắc nghiệp vụ | `BR-AUT-011-01`, `BR-AUT-011-02`, `BR-AUT-011-03`, `BR-AUT-011-04` |
| Tiêu chí chấp nhận | `AC-AUT-011-01`, `AC-AUT-011-02`, `AC-AUT-011-03`, `AC-AUT-011-04` |
| Yêu cầu phi chức năng | Trigger decision dưới 100 ms P95; idempotent; correlation ID; thống kê eventual consistency. |
| Dependency | FR-AUT-009; FR-AUT-010; FR-AUT-016; session service; connector. |

