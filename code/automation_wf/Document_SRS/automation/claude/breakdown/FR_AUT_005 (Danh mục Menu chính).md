# FR-AUT-005: Danh mục Menu chính

| Mục | Nội dung |
|---|---|
| Mục đích | Quản lý danh sách Menu mặc định và Menu tùy chỉnh của một trang. |
| Trong phạm vi | Xem/chọn menu; tạo Menu tùy chỉnh; đổi tên; nhân bản; xóa; mở editor; hiển thị Preview và thống kê của menu được chọn. |
| Ngoài phạm vi | Không sửa các mục bên trong menu (FR-AUT-006); không gán menu cho khách hoặc xử lý click (FR-AUT-007); không định nghĩa publish (FR-AUT-004). |
| Đối tượng liên quan | Admin; Quản lý. |
| Pre-conditions | Page context và quyền hợp lệ theo FR-AUT-001. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Menu chính. |
| Luồng xử lý chính | 1. Tải đúng một Menu mặc định và các Menu tùy chỉnh.<br>2. Chọn Menu mặc định ban đầu.<br>3. Khi chọn menu khác, chỉ đổi Preview và thống kê.<br>4. `Tạo mới` tạo Menu tùy chỉnh rỗng.<br>5. Menu ngữ cảnh cho phép Đổi tên, Nhân bản, Xóa.<br>6. `Chỉnh sửa` mở FR-AUT-006. |
| Ngoại lệ | AF-1: Tên rỗng/trùng/quá giới hạn → chặn lưu.<br>AF-2: Không cho đổi tên hoặc xóa Menu mặc định.<br>AF-3: Xóa Menu tùy chỉnh → xác nhận phạm vi ảnh hưởng; việc fallback do FR-AUT-007 xử lý.<br>AF-4: Nhân bản → ID mới, không copy assignment hoặc thống kê. |
| Kết quả | Danh mục menu của trang được cập nhật; chưa thay đổi menu khách đang thấy nếu chưa publish. |
| Dữ liệu sở hữu | Menu metadata: `menuId`, `pageId`, `type`, `name`; không sở hữu menu items hoặc customer assignment. |
| Giao diện | Thẻ Menu mặc định; thẻ Menu tùy chỉnh; `Tạo mới`; dòng menu; `Chỉnh sửa`; menu ngữ cảnh; Preview/thống kê chỉ đọc. |
| Quy tắc nghiệp vụ | `BR-AUT-005-01`, `BR-AUT-005-02`, `BR-AUT-005-03`, `BR-AUT-005-04` |
| Tiêu chí chấp nhận | `AC-AUT-005-01`, `AC-AUT-005-02`, `AC-AUT-005-03`, `AC-AUT-005-04` |
| Yêu cầu phi chức năng | Danh sách tải dưới 1,5 giây P95; audit mutation; cô lập theo trang. |
| Dependency | FR-AUT-001; FR-AUT-004; FR-AUT-006; FR-AUT-007. |

