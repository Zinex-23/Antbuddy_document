# FR-AUT-011: Biên tập luồng Tin nhắn mặc định

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-004: Thiết lập tin nhắn mặc định`. |
| Mô tả | Cho phép xây dựng và cập nhật luồng nhiều bước của Tin nhắn mặc định, bao gồm nội dung, media, nút, trả lời nhanh, bước tiếp theo và ghi chú. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot. |
| Pre-conditions | Editor được mở từ FR-AUT-010; action catalog và tài nguyên liên quan tải thành công. |
| Điều kiện kích hoạt | Bấm `Chỉnh sửa` Tin nhắn mặc định. |
| Luồng xử lý chính | 1. Mở breadcrumb `Tin nhắn mặc định → Chỉnh sửa`, cột bước, editor và Preview.<br>2. Người dùng chọn hoặc đổi tên bước.<br>3. Chọn loại `Trong khoảng 24 giờ` hoặc `Ngoài khoảng 24 giờ`.<br>4. Nhập văn bản tối đa 640 ký tự và thêm các khối media hỗ trợ.<br>5. Thêm nút hoặc trả lời nhanh; tiêu đề tối đa 20 ký tự; chọn một trong các action được kênh hỗ trợ.<br>6. Chọn bước tiếp theo hoặc tạo `Nội dung #N`; mặc định là `Kết thúc`.<br>7. Bật `Thêm ghi chú` và nhập ghi chú nội bộ nếu cần.<br>8. Preview cập nhật tức thời; `Xem thử` mô phỏng toàn luồng.<br>9. Chọn cờ `Mặc định` nếu cần và bấm `Cập nhật`.<br>10. Hệ thống validate graph, lưu cấu hình và áp dụng cho event đến sau. |
| Luồng thay thế và ngoại lệ | AF-1: Text vượt 640 hoặc title vượt 20 → chặn nhập thêm.<br>AF-2: Bước không có nội dung → chặn cập nhật và đánh dấu bước.<br>AF-3: Action thiếu target hoặc URL sai → báo lỗi tại popup.<br>AF-4: Next step hỏng hoặc tạo cycle → từ chối cập nhật.<br>AF-5: Reference bị xóa/inactive → đánh dấu cần cấu hình lại.<br>AF-6: Đóng popup hoặc rời editor có thay đổi → cảnh báo.<br>AF-7: Cập nhật thất bại → giữ state, cấu hình đang áp dụng không đổi. |
| Post-condition | Luồng hợp lệ và cờ Mặc định được lưu; cấu hình mới áp dụng cho event sau thời điểm cập nhật. |
| Giao diện hệ thống | Breadcrumb; cột bước; radio loại tin nhắn; editor text `N/640`; media blocks; nút; trả lời nhanh `N/20`; next step; ghi chú; `Xem thử`; `Cập nhật`; Preview. |
| Quy tắc nghiệp vụ | `BR-AUT-011-01`, `BR-AUT-011-02`, `BR-AUT-011-03`, `BR-AUT-011-04`, `BR-AUT-011-05`, `BR-AUT-011-06` |
| Yêu cầu phi chức năng | Preview dưới 50 ms cho text; upload media an toàn; state không mất khi lỗi; update dưới 1,5 giây P95. |
| Tiêu chí chấp nhận | `AC-AUT-011-01`, `AC-AUT-011-02`, `AC-AUT-011-03`, `AC-AUT-011-04`, `AC-AUT-011-05`, `AC-AUT-011-06` |
| Dependency | FR-AUT-010; FR-AUT-012; media, flow và action services. |

