# FR-AUT-002: Biên tập mục Menu chính

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-001: Menu chính`. |
| Mô tả | Cho phép biên tập danh sách mục của một menu: thêm, sửa, xóa, kéo thả và cấu hình hành động khi khách bấm. Mọi thay đổi trước khi lưu chỉ tồn tại trong state chỉnh sửa. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot. |
| Pre-conditions | Một menu thuộc trang hiện tại đã được mở ở chế độ chỉnh sửa; người dùng có quyền ghi. |
| Điều kiện kích hoạt | Từ FR-AUT-001, bấm `Chỉnh sửa` một menu. |
| Luồng xử lý chính | 1. Hệ thống hiển thị `CÁC MỤC MENU`, counter `N/20 mục`, danh sách kéo thả và Mobile Preview.<br>2. Người dùng bấm `Thêm mục menu` hoặc chọn mục có sẵn; popup `Hiệu chỉnh nút` mở.<br>3. Người dùng nhập `Tên hiển thị`; counter `N/30` và Preview cập nhật theo thời gian thực.<br>4. Người dùng chọn đúng một action: `Tạo tin nhắn mới`, `Chọn luồng tin nhắn`, `Nhận thông báo`, `Mở trang web`.<br>5. Hệ thống hiển thị trường tương ứng và chỉ validate action đang chọn.<br>6. Người dùng có thể bật `Chuyển menu sau khi nhấn` và chọn `Menu đích` đã xuất bản.<br>7. Bấm `Lưu`; nếu hợp lệ, popup đóng và state nháp được cập nhật.<br>8. Người dùng kéo thả mục; hệ thống đánh lại `order` liên tục và cập nhật Preview.<br>9. Người dùng có thể xóa mục qua dialog xác nhận. |
| Luồng thay thế và ngoại lệ | AF-1: Đủ 20 mục → hiển thị `20/20 mục`, vô hiệu hóa thêm mới.<br>AF-2: Tên rỗng → `Tên hiển thị là bắt buộc.`; tên không vượt 30 ký tự.<br>AF-3: Tin nhắn rỗng → `Nội dung tin nhắn là bắt buộc.`.<br>AF-4: Flow không active → `Vui lòng chọn một luồng đang hoạt động.`.<br>AF-5: Thiếu mẫu Opt-in → `Vui lòng chọn mẫu Opt-in.`.<br>AF-6: URL không có `http://` hoặc `https://` → báo lỗi URL.<br>AF-7: Bật chuyển menu nhưng target không hợp lệ → `Vui lòng chọn một menu đã xuất bản.`.<br>AF-8: Đóng popup khi có thay đổi chưa lưu → yêu cầu xác nhận. |
| Post-condition | State nháp chứa tối đa 20 mục hợp lệ, có thứ tự liên tục; phiên bản khách đang dùng chưa thay đổi. |
| Giao diện hệ thống | Màn chỉnh sửa với danh sách mục và Preview; popup `Hiệu chỉnh nút`; dialog `Xóa mục menu?`. Placeholder gồm `Nhập tên mục...`, `Nhập nội dung phản hồi...`, `https://example.com`. |
| Quy tắc nghiệp vụ | `BR-AUT-002-01`, `BR-AUT-002-02`, `BR-AUT-002-03`, `BR-AUT-002-04`, `BR-AUT-002-05`, `BR-AUT-002-06`, `BR-AUT-002-07` |
| Yêu cầu phi chức năng | Counter, drag-drop và Preview phản hồi dưới 50 ms ở client; hỗ trợ bàn phím; không mất dữ liệu khi validation lỗi. |
| Tiêu chí chấp nhận | `AC-AUT-002-01`, `AC-AUT-002-02`, `AC-AUT-002-03`, `AC-AUT-002-04`, `AC-AUT-002-05`, `AC-AUT-002-06` |
| Dependency | FR-AUT-001 cung cấp menu; FR-AUT-003 chịu trách nhiệm lưu và xuất bản. |

