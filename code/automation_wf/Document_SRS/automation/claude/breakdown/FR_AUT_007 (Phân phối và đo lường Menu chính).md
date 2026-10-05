# FR-AUT-007: Phân phối và đo lường Menu chính

| Mục | Nội dung |
|---|---|
| Mục đích | Xác định menu nào khách nhìn thấy, thực thi click mục menu và cung cấp thống kê theo menu. |
| Trong phạm vi | Customer assignment; fallback Menu mặc định; click action; chuyển menu sau click; xử lý menu bị xóa; thống kê menu. |
| Ngoài phạm vi | Không tạo/sửa menu (FR-AUT-005/006); không định nghĩa action schema (FR-AUT-003); không publish (FR-AUT-004). |
| Đối tượng liên quan | Khách hàng; runtime AntBot; connector; analytics; Admin/Quản lý xem số liệu. |
| Pre-conditions | Có published snapshot menu hợp lệ. |
| Điều kiện kích hoạt | Khách mở chat, click mục menu, hoặc hệ thống nhận action gán/hủy menu. |
| Luồng xử lý chính | 1. Tìm assignment published của khách.<br>2. Nếu có, hiển thị Menu tùy chỉnh; nếu không, hiển thị Menu mặc định.<br>3. Khi click, chạy action chính từ FR-AUT-003.<br>4. Nếu action thành công và mục yêu cầu chuyển menu, cập nhật assignment của đúng khách.<br>5. Ghi sự kiện gửi, đọc, click, thất bại và để lại SĐT.<br>6. Màn danh mục tải thống kê theo menu được chọn. |
| Ngoại lệ | AF-1: Assignment hỏng → gỡ và fallback Menu mặc định.<br>AF-2: Không có Menu mặc định published → ẩn menu, chat vẫn hoạt động.<br>AF-3: Action click lỗi → không chuyển menu.<br>AF-4: Menu đích không còn published → không chuyển và ghi lỗi.<br>AF-5: Xóa menu → khách fallback và tham chiếu target được gỡ. |
| Kết quả | Mỗi khách có tối đa một menu hiệu lực; click được xử lý idempotent; thống kê gắn đúng menu/version. |
| Dữ liệu sở hữu | `customerMenuAssignment`, menu interaction events và aggregate analytics. |
| Giao diện | Không có màn runtime; cung cấp số người dùng, Thành công, Đã đọc, Đã click, Thất bại, KH để lại SĐT cho FR-AUT-005. |
| Quy tắc nghiệp vụ | `BR-AUT-007-01`, `BR-AUT-007-02`, `BR-AUT-007-03`, `BR-AUT-007-04` |
| Tiêu chí chấp nhận | `AC-AUT-007-01`, `AC-AUT-007-02`, `AC-AUT-007-03`, `AC-AUT-007-04` |
| Yêu cầu phi chức năng | Runtime idempotent; quyết định menu dưới 100 ms P95; analytics không trộn tenant/page. |
| Dependency | FR-AUT-003; FR-AUT-004; FR-AUT-005; FR-AUT-006. |

