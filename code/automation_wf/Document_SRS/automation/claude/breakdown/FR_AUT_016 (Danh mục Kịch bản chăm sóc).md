# FR-AUT-016: Danh mục Kịch bản chăm sóc

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-006: Kịch bản chăm sóc`. |
| Mô tả | Quản lý danh mục các kịch bản chăm sóc của một trang: xem, tìm kiếm, tạo, đổi tên, sao chép trong trang, sao chép sang trang khác và xóa. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot trên trang nguồn và trang đích. |
| Pre-conditions | Người dùng đã đăng nhập; có ít nhất một trang; quyền đọc hoặc ghi đúng phạm vi. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Kịch bản chăm sóc. |
| Luồng xử lý chính | 1. Hệ thống hiển thị tìm kiếm, `Kịch bản mới`, bảng tên, số tin nhắn, người đăng ký, menu ngữ cảnh và phân trang.<br>2. Nếu rỗng, hiển thị `Bạn chưa có kịch bản nào` và `Kịch bản mới`.<br>3. Người dùng tạo mới bằng tên hợp lệ; hệ thống tạo kịch bản rỗng và mở cài đặt.<br>4. Tìm kiếm lọc theo tên.<br>5. Menu ngữ cảnh cho phép Đổi tên, Sao chép, Sao chép sang trang khác và Xóa.<br>6. Bấm tên kịch bản mở danh sách bước thuộc FR-AUT-017. |
| Luồng thay thế và ngoại lệ | AF-1: Tên rỗng, quá 50 ký tự hoặc trùng trong trang → báo lỗi.<br>AF-2: Sao chép cùng trang → tên `[Tên gốc] (bản sao)` và thêm số nếu trùng; không copy subscriber hay stats.<br>AF-3: Sao chép sang trang khác → kiểm tra quyền và dependency; target không tương thích phải được map hoặc báo lỗi.<br>AF-4: Xóa kịch bản có subscriber → yêu cầu xác nhận phạm vi; dừng lịch tương lai, không hoàn tác bước đã chạy.<br>AF-5: Không đủ quyền trang đích → không cho sao chép. |
| Post-condition | Danh mục đúng trang được cập nhật; bản sao là cấu hình độc lập; audit log ghi mọi mutation. |
| Giao diện hệ thống | Empty state; bảng danh sách; tìm kiếm; `Kịch bản mới`; popup tạo/đổi tên; menu ba chấm; tổng số và phân trang 10 mục/trang. |
| Quy tắc nghiệp vụ | `BR-AUT-016-01`, `BR-AUT-016-02`, `BR-AUT-016-03`, `BR-AUT-016-04`, `BR-AUT-016-05` |
| Yêu cầu phi chức năng | Danh sách và tìm kiếm dưới 1,5 giây P95; phân trang server-side; audit; thao tác sao chép idempotent. |
| Tiêu chí chấp nhận | `AC-AUT-016-01`, `AC-AUT-016-02`, `AC-AUT-016-03`, `AC-AUT-016-04`, `AC-AUT-016-05`, `AC-AUT-016-06` |
| Dependency | FR-AUT-017; FR-AUT-018. |

