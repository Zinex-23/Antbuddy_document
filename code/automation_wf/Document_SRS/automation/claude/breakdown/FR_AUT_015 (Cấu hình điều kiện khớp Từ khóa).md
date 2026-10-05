# FR-AUT-015: Cấu hình điều kiện khớp Từ khóa

| Mục | Nội dung |
|---|---|
| Mục đích | Tạo biểu thức match rõ ràng cho một keyword. |
| Trong phạm vi | Chọn phạm vi match; nhập nhóm Có chứa/Không chứa/Bắt đầu/Kết thúc/Chính xác; normalize; validate; chuyển sang cấu hình response. |
| Ngoài phạm vi | Không quản lý danh sách/order (FR-AUT-014); không gửi response (FR-AUT-016). |
| Đối tượng liên quan | Admin; Quản lý; keyword matcher. |
| Pre-conditions | Keyword mới hoặc hiện có được mở từ FR-AUT-014. |
| Điều kiện kích hoạt | Bấm Thêm mới hoặc sửa điều kiện keyword. |
| Luồng xử lý chính | 1. Chọn đúng một phạm vi match.<br>2. Hệ thống hiển thị đúng các ô cần nhập.<br>3. Nhập các giá trị; hệ thống trim/normalize.<br>4. Hiển thị rõ quan hệ AND giữa ô và OR trong một ô.<br>5. Lưu biểu thức hợp lệ.<br>6. Mở FR-AUT-002/016 để cấu hình response. |
| Ngoại lệ | AF-1: Thiếu phạm vi hoặc ô bắt buộc → báo lỗi.<br>AF-2: Mục vượt giới hạn → chặn.<br>AF-3: Giá trị trùng → normalize thành một.<br>AF-4: Đổi phạm vi làm mất dữ liệu → xác nhận.<br>AF-5: Biểu thức trùng → cảnh báo/chặn theo policy. |
| Kết quả | Keyword có một biểu thức match deterministic. |
| Dữ liệu sở hữu | `keywordExpression`: scope, groups, operator, normalizedValues. |
| Giao diện | Popup Nội dung từ khóa; danh sách phạm vi; các ô động; mô tả AND/OR; Lưu/Hủy. |
| Quy tắc nghiệp vụ | `BR-AUT-015-01`, `BR-AUT-015-02`, `BR-AUT-015-03`, `BR-AUT-015-04` |
| Tiêu chí chấp nhận | `AC-AUT-015-01`, `AC-AUT-015-02`, `AC-AUT-015-03`, `AC-AUT-015-04` |
| Yêu cầu phi chức năng | Matcher deterministic; match dưới 50 ms P95; normalize Unicode nhất quán. |
| Dependency | FR-AUT-014; FR-AUT-016. |

