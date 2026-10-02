# FR-AUT-005: Cấu hình hành động Câu hỏi thường gặp

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-002: Câu hỏi thường gặp`. |
| Mô tả | Cho phép gán đúng một hành động chính và các hành động bổ sung tùy chọn cho một câu hỏi thường gặp. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot. |
| Pre-conditions | Popup `Hiệu chỉnh nút` được mở từ FR-AUT-004; dữ liệu flow, khối tin nhắn và action catalog đã tải. |
| Điều kiện kích hoạt | Thêm mới hoặc sửa một câu hỏi. |
| Luồng xử lý chính | 1. Người dùng chọn một action chính.<br>2. `Tạo tin nhắn mới` → mở editor soạn nội dung mới, sau khi lưu trả kết quả về câu hỏi.<br>3. `Chọn luồng tin nhắn` → mở popup `Chọn khối tin nhắn`, người dùng chọn nội dung có sẵn.<br>4. `Nhận thông báo` nếu được kênh hỗ trợ → chọn hoặc cấu hình Opt-in theo capability.<br>5. Hệ thống chỉ hiển thị và validate trường của action đang chọn.<br>6. Người dùng có thể thêm action bổ sung từ action catalog dùng chung.<br>7. Bấm `Lưu`; hệ thống trả cấu hình action hợp lệ cho FR-AUT-004. |
| Luồng thay thế và ngoại lệ | AF-1: Chưa chọn action hoặc thiếu target → viền đỏ trường tương ứng, không đóng popup.<br>AF-2: Flow hoặc khối tin nhắn đã xóa hay inactive → đánh dấu cần cấu hình lại, chặn publish.<br>AF-3: Đổi loại action → bỏ validation của action cũ; không gửi field không còn liên quan.<br>AF-4: Action bổ sung thiếu tham số → đánh dấu đúng action và chặn lưu.<br>AF-5: Capability kênh không hỗ trợ action → không cho chọn và nêu lý do. |
| Post-condition | Câu hỏi có đúng một action chính hợp lệ và không hoặc nhiều action bổ sung hợp lệ. |
| Giao diện hệ thống | Popup `Hiệu chỉnh nút`; bộ chọn action dạng một lựa chọn; trường động; vùng `Hành động bổ sung`; popup chọn khối tin nhắn hoặc editor nội dung. |
| Quy tắc nghiệp vụ | `BR-AUT-005-01`, `BR-AUT-005-02`, `BR-AUT-005-03`, `BR-AUT-005-04`, `BR-AUT-005-05` |
| Yêu cầu phi chức năng | Action catalog tải dưới 1,5 giây P95; lỗi reference phải truy vết được; kiểm soát quyền truy cập target. |
| Tiêu chí chấp nhận | `AC-AUT-005-01`, `AC-AUT-005-02`, `AC-AUT-005-03`, `AC-AUT-005-04`, `AC-AUT-005-05` |
| Dependency | FR-AUT-004; message editor; action catalog; connector capability. |

