# FR-AUT-014: Cấu hình và so khớp Từ khóa

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-005: Thiết lập từ khóa`. |
| Mô tả | Cho phép tạo hoặc sửa một biểu thức từ khóa bằng cách chọn phạm vi khớp và nhập các nhóm giá trị. Chuẩn hóa thuật toán match để runtime và QA có cùng cách hiểu. |
| Đối tượng liên quan | Admin; Quản lý; dịch vụ keyword matcher. |
| Pre-conditions | Đúng trang và tab đã được chọn; người dùng có quyền ghi. |
| Điều kiện kích hoạt | Bấm `Thêm mới` hoặc sửa một dòng trong FR-AUT-013. |
| Luồng xử lý chính | 1. Popup `Nội dung từ khóa` mở.<br>2. Người dùng chọn đúng một phạm vi khớp.<br>3. Hệ thống render đúng số ô `Có chứa`, `Không chứa`, `Bắt đầu bằng`, `Kết thúc bằng`, `Khớp chính xác` hoặc phạm vi không cần nội dung.<br>4. Người dùng nhập một hoặc nhiều giá trị, mỗi giá trị được trim và normalize.<br>5. Bấm `Lưu`; hệ thống validate và tạo biểu thức match.<br>6. Keyword mới chuyển đến FR-AUT-015 để cấu hình phản hồi.<br>7. Với bản sửa, hệ thống cập nhật biểu thức nhưng giữ response và trạng thái nếu vẫn hợp lệ. |
| Luồng thay thế và ngoại lệ | AF-1: Chưa chọn phạm vi → báo lỗi.<br>AF-2: Ô bắt buộc rỗng hoặc mỗi mục vượt 100 ký tự → chặn lưu.<br>AF-3: Giá trị trùng trong cùng nhóm → normalize và chỉ giữ một.<br>AF-4: Biểu thức trùng hoàn toàn với keyword khác trong cùng tab → cảnh báo hoặc chặn theo policy duy nhất.<br>AF-5: Đổi phạm vi → xác nhận nếu làm mất dữ liệu các ô cũ.<br>AF-6: Đóng popup có thay đổi → cảnh báo. |
| Post-condition | Một biểu thức match hợp lệ được lưu cho đúng trang và phạm vi sender. |
| Giao diện hệ thống | Popup `Nội dung từ khóa`; danh sách `Phạm vi`; các ô động; thông tin logic `và`/`hoặc`; `Hủy`; `Lưu`. |
| Quy tắc nghiệp vụ | `BR-AUT-014-01`, `BR-AUT-014-02`, `BR-AUT-014-03`, `BR-AUT-014-04`, `BR-AUT-014-05`, `BR-AUT-014-06` |
| Yêu cầu phi chức năng | Matcher quyết định dưới 50 ms P95 với danh sách trong giới hạn; thuật toán deterministic; lưu biểu thức có version. |
| Tiêu chí chấp nhận | `AC-AUT-014-01`, `AC-AUT-014-02`, `AC-AUT-014-03`, `AC-AUT-014-04`, `AC-AUT-014-05`, `AC-AUT-014-06` |
| Dependency | FR-AUT-013; FR-AUT-015. |

