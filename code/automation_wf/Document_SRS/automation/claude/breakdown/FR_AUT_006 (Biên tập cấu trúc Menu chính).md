# FR-AUT-006: Biên tập cấu trúc Menu chính

| Mục | Nội dung |
|---|---|
| Mục đích | Thêm, sửa, xóa và sắp xếp các mục của một menu. |
| Trong phạm vi | Danh sách tối đa 20 mục; tên hiển thị; thứ tự; cấu hình action qua FR-AUT-003; cấu hình chuyển menu; Preview. |
| Ngoài phạm vi | Không quản lý danh mục menu (FR-AUT-005); không thực thi action/chuyển menu (FR-AUT-007); không sở hữu lifecycle draft/publish (FR-AUT-004). |
| Đối tượng liên quan | Admin; Quản lý. |
| Pre-conditions | Menu được chọn từ FR-AUT-005; có quyền chỉnh sửa. |
| Điều kiện kích hoạt | Bấm `Chỉnh sửa` menu. |
| Luồng xử lý chính | 1. Hiển thị `CÁC MỤC MENU` và counter `N/20`.<br>2. Thêm mới hoặc chọn một mục.<br>3. Nhập tên tối đa 30 ký tự.<br>4. Chọn action bằng FR-AUT-003.<br>5. Nếu bật `Chuyển menu sau khi nhấn`, chọn Menu đích published.<br>6. Lưu popup để cập nhật draft state.<br>7. Kéo thả để đổi thứ tự.<br>8. Xóa mục qua xác nhận.<br>9. Lưu/publish qua FR-AUT-004. |
| Ngoại lệ | AF-1: Đủ 20 mục → vô hiệu hóa thêm mới.<br>AF-2: Tên rỗng → báo `Tên hiển thị là bắt buộc.`.<br>AF-3: Action không hợp lệ → hiển thị lỗi từ FR-AUT-003.<br>AF-4: Chuyển menu bật nhưng target không hợp lệ → chặn lưu.<br>AF-5: Xóa/sắp xếp chỉ đổi draft trước khi publish. |
| Kết quả | Draft menu có danh sách mục hợp lệ và thứ tự liên tục. |
| Dữ liệu sở hữu | `menuItems`: id, menuId, title, order, actionPayload, shouldSwitchMenu, targetMenuId. |
| Giao diện | Danh sách kéo thả; counter; popup `Hiệu chỉnh nút`; trường Menu đích; dialog xóa; Mobile Preview. |
| Quy tắc nghiệp vụ | `BR-AUT-006-01`, `BR-AUT-006-02`, `BR-AUT-006-03`, `BR-AUT-006-04`, `BR-AUT-006-05` |
| Tiêu chí chấp nhận | `AC-AUT-006-01`, `AC-AUT-006-02`, `AC-AUT-006-03`, `AC-AUT-006-04`, `AC-AUT-006-05` |
| Yêu cầu phi chức năng | Drag-drop và Preview dưới 50 ms; state không mất khi validation lỗi. |
| Dependency | FR-AUT-003; FR-AUT-004; FR-AUT-005; FR-AUT-007. |

