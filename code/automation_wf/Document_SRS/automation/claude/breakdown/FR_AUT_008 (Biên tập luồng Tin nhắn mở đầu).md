# FR-AUT-008: Biên tập luồng Tin nhắn mở đầu

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-003: Tin nhắn mở đầu`. |
| Mô tả | Cho phép xây dựng luồng nhiều bước của Tin nhắn mở đầu, bao gồm nội dung, media, nút, trả lời nhanh, bước tiếp theo, ghi chú và Preview. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot. |
| Pre-conditions | Editor được mở từ FR-AUT-007; tài nguyên media, flow và action catalog sẵn sàng. |
| Điều kiện kích hoạt | Bấm `Thêm mới` hoặc `Chỉnh sửa` Tin nhắn mở đầu. |
| Luồng xử lý chính | 1. Hệ thống mở editor với bước `BẮT ĐẦU` hoặc bản đã lưu.<br>2. Người dùng chọn hoặc đổi tên bước.<br>3. Chọn loại tin nhắn trong hoặc ngoài 24 giờ.<br>4. Nhập văn bản tối đa 640 ký tự; có thể chèn emoji và biến khách hàng.<br>5. Thêm các khối Văn bản, Hình ảnh, Nhóm ảnh, Bộ sưu tập, Templates, Video, Audio hoặc Nhiều hơn.<br>6. Thêm nút và trả lời nhanh; tiêu đề tối đa 20 ký tự; gán action hợp lệ.<br>7. Tạo bước tiếp theo hoặc liên kết bước có sẵn; chọn `Kết thúc` nếu không gửi tiếp.<br>8. Mobile Preview cập nhật theo state hiện tại.<br>9. `Xem thử` mô phỏng toàn luồng.<br>10. Bấm `Lưu`; hệ thống validate graph và nội dung rồi lưu cấu hình. |
| Luồng thay thế và ngoại lệ | AF-1: Văn bản vượt 640 hoặc tiêu đề vượt 20 → chặn ký tự thêm.<br>AF-2: Bước không có nội dung → đánh dấu bước, chặn lưu.<br>AF-3: Action của nút hoặc trả lời nhanh thiếu target → báo lỗi tại phần tử.<br>AF-4: Bước tiếp theo tự trỏ hoặc tạo vòng lặp → từ chối liên kết.<br>AF-5: Reference media, flow hoặc target bị xóa → đánh dấu cần cấu hình lại.<br>AF-6: Rời editor có dirty state → xác nhận bỏ thay đổi.<br>AF-7: Lưu lỗi → giữ toàn bộ state. |
| Post-condition | Một graph luồng hợp lệ được lưu; Preview và bản xem thử không tạo dữ liệu runtime. |
| Giao diện hệ thống | Breadcrumb; cột bước; editor nội dung; counter `N/640` và `N/20`; khu thêm khối; nút; trả lời nhanh; chọn bước tiếp theo; `Xem thử`; `Lưu`; Mobile Preview. |
| Quy tắc nghiệp vụ | `BR-AUT-008-01`, `BR-AUT-008-02`, `BR-AUT-008-03`, `BR-AUT-008-04`, `BR-AUT-008-05`, `BR-AUT-008-06` |
| Yêu cầu phi chức năng | Autosave state cục bộ để tránh mất dữ liệu; Preview dưới 50 ms cho thay đổi text; kiểm tra media theo tenant; editor dùng được bằng bàn phím. |
| Tiêu chí chấp nhận | `AC-AUT-008-01`, `AC-AUT-008-02`, `AC-AUT-008-03`, `AC-AUT-008-04`, `AC-AUT-008-05`, `AC-AUT-008-06` |
| Dependency | FR-AUT-007; FR-AUT-009; media service; flow/action catalog. |

