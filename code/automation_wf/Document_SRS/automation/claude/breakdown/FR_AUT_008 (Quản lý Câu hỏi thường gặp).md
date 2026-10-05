# FR-AUT-008: Quản lý Câu hỏi thường gặp

| Mục | Nội dung |
|---|---|
| Mục đích | Tạo và quản lý tối đa 4 câu hỏi gợi ý của một trang. |
| Trong phạm vi | Empty state; thêm/sửa/xóa câu hỏi; nội dung câu hỏi; gán action bằng FR-AUT-003; Preview; lưu/publish bằng FR-AUT-004. |
| Ngoài phạm vi | Không thực thi click FAQ hoặc ghi thống kê (FR-AUT-009); không tự định nghĩa action/editor. |
| Đối tượng liên quan | Admin; Quản lý. |
| Pre-conditions | Page context hợp lệ; người dùng có quyền ghi. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Câu hỏi thường gặp. |
| Luồng xử lý chính | 1. Tải draft hoặc khởi tạo từ published version.<br>2. Hiển thị empty state nếu chưa có câu hỏi.<br>3. Thêm mới hoặc chọn câu hỏi để sửa.<br>4. Nhập nội dung tối đa 80 ký tự.<br>5. Chọn action chính và action bổ sung qua FR-AUT-003.<br>6. Lưu popup để cập nhật draft.<br>7. Xóa câu hỏi qua xác nhận.<br>8. Xuất bản qua FR-AUT-004. |
| Ngoại lệ | AF-1: Đủ 4 câu → không cho thêm.<br>AF-2: Nội dung rỗng/trùng/quá 80 → báo lỗi.<br>AF-3: Action lỗi → chặn lưu/publish.<br>AF-4: Publish lỗi → giữ version cũ cho khách.<br>AF-5: Rời trang có dirty state → xác nhận. |
| Kết quả | Draft/published FAQ chứa 0-4 câu hợp lệ theo thứ tự hiển thị. |
| Dữ liệu sở hữu | `faqItems`: id, pageId, question, order, actionPayload. |
| Giao diện | Danh sách câu hỏi; `Thêm mới`; popup; Mobile Preview; trạng thái và nút publish dùng FR-AUT-004. |
| Quy tắc nghiệp vụ | `BR-AUT-008-01`, `BR-AUT-008-02`, `BR-AUT-008-03`, `BR-AUT-008-04` |
| Tiêu chí chấp nhận | `AC-AUT-008-01`, `AC-AUT-008-02`, `AC-AUT-008-03`, `AC-AUT-008-04` |
| Yêu cầu phi chức năng | Preview dưới 50 ms; danh sách tải dưới 1,5 giây P95; audit publish. |
| Dependency | FR-AUT-001; FR-AUT-003; FR-AUT-004; FR-AUT-009. |

