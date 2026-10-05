# FR-AUT-014: Danh mục và nhập Từ khóa

| Mục | Nội dung |
|---|---|
| Mục đích | Quản lý danh sách keyword theo hai tab và hỗ trợ import/bulk action/sắp xếp. |
| Trong phạm vi | Tab Cho khách hàng/Cho trang; empty state; tìm kiếm; import; bật/tắt hàng loạt; kéo thả ưu tiên; mở cấu hình keyword. |
| Ngoài phạm vi | Không định nghĩa biểu thức match (FR-AUT-015) hoặc chạy response (FR-AUT-016). |
| Đối tượng liên quan | Admin; Quản lý. |
| Pre-conditions | Page context hợp lệ. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Từ khóa. |
| Luồng xử lý chính | 1. Tải danh sách riêng của tab hiện tại.<br>2. Tìm kiếm/lọc danh sách.<br>3. Thêm mới mở FR-AUT-015.<br>4. Import file, xem kết quả và xác nhận.<br>5. Chọn dòng để bật/tắt hàng loạt.<br>6. Kéo thả để đổi ưu tiên.<br>7. Chọn dòng để sửa keyword/response. |
| Ngoại lệ | AF-1: File sai định dạng/kích thước/số dòng → từ chối.<br>AF-2: Import lỗi một phần → báo từng dòng.<br>AF-3: Bulk lỗi một phần → hiển thị từng kết quả.<br>AF-4: Keyword chưa hoàn tất → không bật được. |
| Kết quả | Danh sách và order đúng page/tab được cập nhật. |
| Dữ liệu sở hữu | Keyword metadata: id, pageId, direction, enabled, order, completionStatus. |
| Giao diện | Hai tab; tìm kiếm; Tải lên; Thêm mới; bảng; checkbox; toggle; drag handle; bulk bar. |
| Quy tắc nghiệp vụ | `BR-AUT-014-01`, `BR-AUT-014-02`, `BR-AUT-014-03`, `BR-AUT-014-04` |
| Tiêu chí chấp nhận | `AC-AUT-014-01`, `AC-AUT-014-02`, `AC-AUT-014-03`, `AC-AUT-014-04` |
| Yêu cầu phi chức năng | Danh sách 1.000 dòng vẫn phản hồi; import có progress; audit bulk action. |
| Dependency | FR-AUT-001; FR-AUT-015; FR-AUT-016. |

