# FR-AUT-004: Quản lý danh sách Câu hỏi thường gặp

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-002: Câu hỏi thường gặp`. |
| Mô tả | Cho phép quản lý bản nháp danh sách câu hỏi gợi ý của một trang: xem trạng thái rỗng, thêm, sửa và xóa câu hỏi. Phạm vi không gồm chi tiết action và publish. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot. |
| Pre-conditions | Người dùng đã đăng nhập; trang đã được chọn; có quyền ghi cấu hình. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Câu hỏi thường gặp. |
| Luồng xử lý chính | 1. Hệ thống tải bản nháp; nếu chưa có thì khởi tạo từ bản đã xuất bản.<br>2. Nếu danh sách rỗng, hiển thị empty state và `Thêm mới`.<br>3. Người dùng bấm `Thêm mới`; popup `Hiệu chỉnh nút` mở với câu hỏi trống.<br>4. Người dùng nhập câu hỏi, chọn action theo FR-AUT-005 và bấm `Lưu`.<br>5. Hệ thống thêm câu hỏi vào cuối danh sách, cập nhật Mobile Preview và đánh dấu có thay đổi chưa xuất bản.<br>6. Người dùng bấm một dòng để sửa hoặc dùng thao tác xóa để loại câu hỏi khỏi bản nháp. |
| Luồng thay thế và ngoại lệ | AF-1: Đã có 4 câu hỏi → ẩn hoặc vô hiệu hóa `Thêm mới`.<br>AF-2: Câu hỏi rỗng, quá 80 ký tự hoặc trùng sau trim và case-fold → báo lỗi, popup không đóng.<br>AF-3: Xóa → yêu cầu xác nhận; chỉ xóa trong draft.<br>AF-4: Đóng popup hoặc rời trang khi có thay đổi chưa lưu → yêu cầu xác nhận.<br>AF-5: Lưu draft lỗi → giữ dữ liệu nhập để thử lại. |
| Post-condition | Bản nháp chứa từ 0 đến 4 câu hỏi hợp lệ; bản published chưa đổi. |
| Giao diện hệ thống | Breadcrumb `Câu hỏi thường gặp → Chỉnh sửa`; danh sách câu hỏi; trạng thái rỗng; `Thêm mới`; popup `Hiệu chỉnh nút`; Mobile Preview. |
| Quy tắc nghiệp vụ | `BR-AUT-004-01`, `BR-AUT-004-02`, `BR-AUT-004-03`, `BR-AUT-004-04` |
| Yêu cầu phi chức năng | Cập nhật Preview dưới 50 ms; kiểm tra quyền UI/API; giữ dữ liệu khi validation hoặc API lỗi; hỗ trợ bàn phím cho popup. |
| Tiêu chí chấp nhận | `AC-AUT-004-01`, `AC-AUT-004-02`, `AC-AUT-004-03`, `AC-AUT-004-04`, `AC-AUT-004-05` |
| Dependency | FR-AUT-005 cấu hình action; FR-AUT-006 publish và runtime. |

