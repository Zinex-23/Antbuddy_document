# FR-AUT-009: Hiển thị và xử lý Câu hỏi thường gặp

| Mục | Nội dung |
|---|---|
| Mục đích | Hiển thị FAQ published cho khách và xử lý action khi khách bấm. |
| Trong phạm vi | Tải published FAQ; hiển thị đúng thứ tự; xử lý click một lần; chạy action chính/bổ sung; analytics. |
| Ngoài phạm vi | Không quản lý câu hỏi hoặc action configuration; không publish cấu hình. |
| Đối tượng liên quan | Khách hàng; runtime; connector; analytics. |
| Pre-conditions | FAQ đã published và kênh hỗ trợ hiển thị. |
| Điều kiện kích hoạt | Khung chat cần hiển thị FAQ hoặc khách click một câu hỏi. |
| Luồng xử lý chính | 1. Runtime lấy FAQ published của trang.<br>2. Hiển thị các câu theo order.<br>3. Nhận click kèm eventId và faqItemId.<br>4. Thực hiện action chính; nếu thành công thì chạy action bổ sung theo thứ tự.<br>5. Ghi lượt hiển thị/click/kết quả. |
| Ngoại lệ | AF-1: Không có FAQ published → không hiển thị vùng FAQ.<br>AF-2: Reference action hỏng → không chạy action đó, ghi lỗi cấu hình.<br>AF-3: Event click trùng → không thực thi hai lần.<br>AF-4: Click FAQ không đồng thời kích hoạt Tin nhắn mở đầu, Từ khóa hay Tin nhắn mặc định cho cùng event. |
| Kết quả | Một click tạo tối đa một chuỗi action; analytics gắn đúng FAQ version. |
| Dữ liệu sở hữu | FAQ interaction events và aggregates; không sở hữu cấu hình FAQ. |
| Giao diện | Các nút gợi ý trong khung chat; không có màn quản trị riêng. |
| Quy tắc nghiệp vụ | `BR-AUT-009-01`, `BR-AUT-009-02`, `BR-AUT-009-03`, `BR-AUT-009-04` |
| Tiêu chí chấp nhận | `AC-AUT-009-01`, `AC-AUT-009-02`, `AC-AUT-009-03`, `AC-AUT-009-04` |
| Yêu cầu phi chức năng | Idempotent theo eventId; xử lý click dưới 100 ms trước thời gian connector; log correlation. |
| Dependency | FR-AUT-003; FR-AUT-004; FR-AUT-008; runtime router. |
