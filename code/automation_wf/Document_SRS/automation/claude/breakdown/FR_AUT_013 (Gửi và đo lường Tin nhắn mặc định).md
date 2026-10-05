# FR-AUT-013: Gửi và đo lường Tin nhắn mặc định

| Mục | Nội dung |
|---|---|
| Mục đích | Gửi fallback message khi không chức năng nào khác xử lý tin nhắn đến. |
| Trong phạm vi | Orchestration fallback; giới hạn tần suất; chọn bước theo cửa sổ 24 giờ; gửi graph; thống kê. |
| Ngoài phạm vi | Không cấu hình nội dung hoặc publish. |
| Đối tượng liên quan | Khách hàng; runtime; connector; analytics. |
| Pre-conditions | Published config đang bật và là Mặc định. |
| Điều kiện kích hoạt | Inbound message không match FAQ, Keyword, intent hoặc rule phản hồi. |
| Luồng xử lý chính | 1. Router xác nhận không handler ưu tiên nào nhận event.<br>2. Kiểm tra enabled/default và lần gửi gần nhất.<br>3. Chọn bước phù hợp cửa sổ 24 giờ/capability.<br>4. Gửi content graph.<br>5. Sau thành công, cập nhật mốc chống gửi lại.<br>6. Ghi thống kê theo bước và toàn cấu hình. |
| Ngoại lệ | AF-1: Đã gửi trong 24 giờ → bỏ qua.<br>AF-2: Handler khác đã xử lý → không gửi.<br>AF-3: Connector không hỗ trợ loại bước → bỏ qua và ghi reason.<br>AF-4: Gửi lỗi → retry idempotent, không cập nhật mốc thành công.<br>AF-5: Reference hỏng → dừng và cảnh báo. |
| Kết quả | Fallback chỉ gửi khi cần và không gửi lặp ngoài chính sách. |
| Dữ liệu sở hữu | `defaultDelivery`, frequency marker, interaction events và aggregates. |
| Giao diện | Cung cấp thống kê bước và tổng cho FR-AUT-012. |
| Quy tắc nghiệp vụ | `BR-AUT-013-01`, `BR-AUT-013-02`, `BR-AUT-013-03`, `BR-AUT-013-04` |
| Tiêu chí chấp nhận | `AC-AUT-013-01`, `AC-AUT-013-02`, `AC-AUT-013-03`, `AC-AUT-013-04` |
| Yêu cầu phi chức năng | Fallback decision dưới 100 ms P95; idempotent; không gửi trùng; metrics có timestamp/version. |
| Dependency | FR-AUT-009; FR-AUT-011; FR-AUT-012; FR-AUT-016; runtime router. |

