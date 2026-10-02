# FR-AUT-009: Gửi và thống kê Tin nhắn mở đầu

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-003: Tin nhắn mở đầu`. |
| Mô tả | Xác định phiên hội thoại mới, gửi Tin nhắn mở đầu đúng một lần mỗi phiên và ghi nhận thống kê tổng cùng thống kê theo bước. |
| Đối tượng liên quan | Runtime hội thoại; khách hàng; dịch vụ thống kê; Admin hoặc Quản lý xem số liệu. |
| Pre-conditions | Cấu hình do FR-AUT-008 lưu hợp lệ và đang `Kích hoạt`; kênh hoạt động. |
| Điều kiện kích hoạt | Khách bắt đầu một phiên hội thoại mới; người quản trị mở thống kê. |
| Luồng xử lý chính | 1. Runtime nhận tin nhắn đầu vào và xác định có phải phiên mới.<br>2. Kiểm tra Tin nhắn mở đầu đang kích hoạt và chưa gửi trong phiên.<br>3. Chọn bước đầu phù hợp capability và cửa sổ 24 giờ.<br>4. Gửi bước `BẮT ĐẦU`, sau đó đi theo graph dựa trên action và bước tiếp theo.<br>5. Đánh dấu đã gửi cho session để chống gửi trùng.<br>6. Ghi nhận gửi, thành công, đọc, click, thất bại và khách để lại SĐT theo step/version.<br>7. Màn Chi tiết tổng hợp số liệu theo bước đang chọn và toàn luồng. |
| Luồng thay thế và ngoại lệ | AF-1: Cấu hình tắt hoặc chưa hợp lệ → không gửi.<br>AF-2: Event bắt đầu từ click FAQ hoặc một trigger ưu tiên cao hơn → không gửi trùng Tin nhắn mở đầu trong cùng event.<br>AF-3: Gửi thất bại → ghi thất bại, không đánh dấu thành công; retry theo chính sách connector.<br>AF-4: Bước tiếp theo/reference hỏng → dừng an toàn và ghi lỗi.<br>AF-5: Event trùng → idempotency ngăn gửi lần hai. |
| Post-condition | Khách nhận tối đa một Tin nhắn mở đầu trong một session; số liệu được gắn đúng trang, version và bước. |
| Giao diện hệ thống | Thống kê luồng của bước được chọn; thống kê tổng Tin nhắn mở đầu; Mobile Preview chỉ đọc. |
| Quy tắc nghiệp vụ | `BR-AUT-009-01`, `BR-AUT-009-02`, `BR-AUT-009-03`, `BR-AUT-009-04`, `BR-AUT-009-05` |
| Yêu cầu phi chức năng | Runtime idempotent; quyết định trigger dưới 100 ms P95 chưa tính connector; observability có correlation ID; không trộn dữ liệu giữa tenant và trang. |
| Tiêu chí chấp nhận | `AC-AUT-009-01`, `AC-AUT-009-02`, `AC-AUT-009-03`, `AC-AUT-009-04`, `AC-AUT-009-05` |
| Dependency | FR-AUT-007; FR-AUT-008; session service; connector; analytics. |
