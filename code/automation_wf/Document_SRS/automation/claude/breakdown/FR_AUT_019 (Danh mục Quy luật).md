# FR-AUT-019: Danh mục Quy luật

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-007: Quy luật`. |
| Mô tả | Quản lý danh mục quy tắc tự động của từng trang: tạo, xem nhanh, mở chi tiết, đổi tên, tạo bản sao, xóa và bật tắt. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot. |
| Pre-conditions | Người dùng đã đăng nhập; trang được chọn; có quyền đọc hoặc ghi rule. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Quy luật. |
| Luồng xử lý chính | 1. Hệ thống hiển thị bảng `Kích hoạt`, `Tên quy tắc`, xem nhanh, menu ngữ cảnh và `Thêm mới`.<br>2. Người dùng tạo mới bằng tên hợp lệ; rule được tạo ở trạng thái tắt và `Chưa hoàn tất`.<br>3. Hệ thống mở màn Chi tiết để cấu hình tại FR-AUT-020/021.<br>4. Xem nhanh hiển thị summary trigger, filter, action và tần suất mà không chỉnh sửa.<br>5. Menu ngữ cảnh cho phép Sửa tên, Tạo bản sao và Xóa.<br>6. Toggle chỉ bật rule đã complete và không có reference hỏng.<br>7. Rule mới xếp cuối theo thứ tự tạo. |
| Luồng thay thế và ngoại lệ | AF-1: Tên rỗng, quá 50 ký tự hoặc trùng → báo lỗi.<br>AF-2: Bật rule chưa hoàn tất hoặc cần cấu hình lại → không bật, thông báo `Quy tắc chưa hoàn tất cấu hình`.<br>AF-3: Bản sao → copy trigger/filter/action/frequency, tạo ID mới, mặc định tắt, không copy execution history.<br>AF-4: Xóa → xác nhận; không hoàn tác action đã chạy.<br>AF-5: Toggle API lỗi → rollback UI.<br>AF-6: Reference bị xóa → tự tắt và gắn `Cần cấu hình lại`. |
| Post-condition | Danh mục rule đúng trang được cập nhật; rule chỉ active khi complete; audit log ghi mutation. |
| Giao diện hệ thống | Bảng danh sách; toggle; tên; nhãn `Chưa hoàn tất`/`Cần cấu hình lại`; xem nhanh; menu `Hành động khác`; popup tạo/đổi tên; `Thêm mới`. |
| Quy tắc nghiệp vụ | `BR-AUT-019-01`, `BR-AUT-019-02`, `BR-AUT-019-03`, `BR-AUT-019-04`, `BR-AUT-019-05` |
| Yêu cầu phi chức năng | Danh sách dưới 1,5 giây P95; toggle idempotent; audit actor và old/new state; kiểm tra quyền API. |
| Tiêu chí chấp nhận | `AC-AUT-019-01`, `AC-AUT-019-02`, `AC-AUT-019-03`, `AC-AUT-019-04`, `AC-AUT-019-05`, `AC-AUT-019-06` |
| Dependency | FR-AUT-020; FR-AUT-021. |

