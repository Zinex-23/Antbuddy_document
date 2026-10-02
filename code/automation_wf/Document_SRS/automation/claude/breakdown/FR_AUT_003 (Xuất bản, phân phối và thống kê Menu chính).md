# FR-AUT-003: Xuất bản, phân phối và thống kê Menu chính

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-001: Menu chính`. |
| Mô tả | Quản lý vòng đời bản nháp và phiên bản áp dụng của menu, đồng bộ menu lên kênh, xác định menu hiệu lực cho từng khách hàng và cung cấp thống kê theo menu. |
| Đối tượng liên quan | Admin; Quản lý; dịch vụ kênh; dịch vụ thống kê; runtime hội thoại. |
| Pre-conditions | Menu tồn tại; cấu hình mục do FR-AUT-002 cung cấp; trang và connector hỗ trợ menu. |
| Điều kiện kích hoạt | Người dùng bấm `Lưu nháp` hoặc `Xuất bản`; runtime nhận yêu cầu lấy menu hoặc click mục; người dùng chọn menu để xem thống kê. |
| Luồng xử lý chính | 1. `Lưu nháp` ghi cấu hình nhưng giữ nguyên phiên bản đang phục vụ khách.<br>2. `Xuất bản` validate toàn bộ menu, quyền và trạng thái kết nối.<br>3. Hệ thống tạo version, đồng bộ đúng kênh và chỉ chuyển `PUBLISHED` sau khi thành công.<br>4. Khi khách mở chat, runtime tìm assignment Menu tùy chỉnh đã xuất bản; nếu không có thì dùng Menu mặc định đã xuất bản.<br>5. Khi khách bấm mục, runtime thực hiện action chính; nếu cấu hình chuyển menu hợp lệ thì cập nhật assignment của đúng khách.<br>6. Khi người dùng chọn menu ở tổng quan, hệ thống tải số người dùng, Thành công, Đã đọc, Đã click, Thất bại, KH để lại SĐT. |
| Luồng thay thế và ngoại lệ | AF-1: Kênh mất kết nối → cho lưu nháp, chặn xuất bản.<br>AF-2: Validation lỗi hoặc reference hỏng → đánh dấu đúng mục, chặn xuất bản.<br>AF-3: Đồng bộ lỗi → giữ phiên bản đang hoạt động và bản nháp để thử lại.<br>AF-4: Assignment trỏ menu không còn published → gỡ assignment và fallback Menu mặc định.<br>AF-5: Không có Menu mặc định published → ẩn menu, không chặn hội thoại.<br>AF-6: Version conflict → không ghi đè, yêu cầu tải lại.<br>AF-7: Rời trang có thay đổi chưa lưu → cảnh báo xác nhận. |
| Post-condition | Bản nháp hoặc phiên bản mới được lưu đúng trạng thái; khách chỉ thấy version đã xuất bản; assignment và thống kê thuộc đúng trang, menu và khách hàng. |
| Giao diện hệ thống | Trạng thái `Có thay đổi chưa lưu`, `Bản nháp đã lưu`, `Đã xuất bản`; nút `Lưu nháp`, `Xuất bản`; khối thống kê theo menu. |
| Quy tắc nghiệp vụ | `BR-AUT-003-01`, `BR-AUT-003-02`, `BR-AUT-003-03`, `BR-AUT-003-04`, `BR-AUT-003-05`, `BR-AUT-003-06` |
| Yêu cầu phi chức năng | Lưu hoặc publish phản hồi dưới 1,5 giây P95, không tính xử lý bất đồng bộ của kênh; có retry an toàn; audit log gồm actor, tenant, channel, menu, version cũ và mới. |
| Tiêu chí chấp nhận | `AC-AUT-003-01`, `AC-AUT-003-02`, `AC-AUT-003-03`, `AC-AUT-003-04`, `AC-AUT-003-05`, `AC-AUT-003-06`, `AC-AUT-003-07` |
| Dependency | FR-AUT-001; FR-AUT-002; connector kênh; hệ thống analytics. |
