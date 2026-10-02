# FR-AUT-001: Danh mục Menu chính

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-001: Menu chính`. |
| Mô tả | Cho phép Admin hoặc Quản lý xem và quản lý danh mục menu của từng trang hoặc kênh. Danh mục gồm đúng một Menu mặc định và nhiều Menu tùy chỉnh. Chức năng này chỉ quản lý cấp menu; cấu hình các mục bên trong thuộc FR-AUT-002. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot. |
| Pre-conditions | Người dùng đã đăng nhập; có quyền trên trang; trang đã kết nối; dữ liệu menu của trang tải thành công. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Menu chính. |
| Luồng xử lý chính | 1. Hệ thống tải Menu mặc định và toàn bộ Menu tùy chỉnh của trang đang chọn.<br>2. Mặc định chọn Menu mặc định và hiển thị viền chọn.<br>3. Người dùng chọn một menu; hệ thống cập nhật tên menu, Mobile Preview và thống kê mà không mở màn chỉnh sửa.<br>4. Người dùng bấm `Tạo mới`; hệ thống mở form tạo Menu tùy chỉnh.<br>5. Người dùng nhập tên hợp lệ và xác nhận; hệ thống tạo menu ở trạng thái bản nháp.<br>6. Người dùng có thể mở `Chỉnh sửa`, hoặc mở menu ngữ cảnh gồm `Đổi tên`, `Nhân bản`, `Xóa` đối với Menu tùy chỉnh.<br>7. Khi đổi trang quản lý, hệ thống tải lại danh mục và chọn Menu mặc định của trang mới. |
| Luồng thay thế và ngoại lệ | AF-1: Tên rỗng, quá giới hạn hoặc trùng trong cùng trang → báo lỗi tại trường tên, không tạo hoặc đổi tên.<br>AF-2: Nhân bản → tạo ID mới, sao chép cấu hình mục, không sao chép người dùng được gán hoặc số liệu; menu mới ở trạng thái nháp.<br>AF-3: Xóa Menu tùy chỉnh → hiển thị xác nhận và phạm vi ảnh hưởng; sau xác nhận, khách đang dùng quay về Menu mặc định và tham chiếu chuyển menu đến menu bị xóa được gỡ.<br>AF-4: Không cho đổi tên hoặc xóa Menu mặc định.<br>AF-5: Đổi trang khi có thay đổi chưa lưu ở editor → thực hiện cảnh báo bỏ thay đổi trước khi đổi. |
| Post-condition | Danh mục menu của đúng trang được cập nhật; thao tác tạo, đổi tên, nhân bản và xóa được ghi audit log; Menu mặc định luôn còn tồn tại. |
| Giao diện hệ thống | Bộ chọn trang; thẻ `Menu mặc định`; thẻ `Menu tùy chỉnh`; `Tạo mới`; các dòng menu với `Chỉnh sửa` và menu ngữ cảnh; trạng thái được chọn; vùng Preview và thống kê chỉ đọc. |
| Quy tắc nghiệp vụ | `BR-AUT-001-01`, `BR-AUT-001-02`, `BR-AUT-001-03`, `BR-AUT-001-04`, `BR-AUT-001-05` |
| Yêu cầu phi chức năng | Phân quyền tại UI và API; cô lập dữ liệu theo tenant và trang; tải danh mục theo P95 không quá 1,5 giây; mọi thay đổi có audit log. |
| Tiêu chí chấp nhận | `AC-AUT-001-01`, `AC-AUT-001-02`, `AC-AUT-001-03`, `AC-AUT-001-04`, `AC-AUT-001-05`, `AC-AUT-001-06` |
| Dependency | FR-AUT-002; FR-AUT-003. |

