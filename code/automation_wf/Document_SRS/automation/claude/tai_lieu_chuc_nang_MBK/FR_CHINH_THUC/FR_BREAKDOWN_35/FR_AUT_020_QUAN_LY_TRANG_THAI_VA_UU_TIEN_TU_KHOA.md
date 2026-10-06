# FR-AUT-020: Quản lý trạng thái và ưu tiên từ khóa

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép xem, tìm kiếm, bật/tắt, sắp xếp mức ưu tiên, xóa và thao tác hàng loạt các quy tắc Từ khóa. Thứ tự ưu tiên được FR-AUT-022 dùng khi nhiều quy tắc cùng khớp. |
| Đối tượng liên quan | **Người quản trị:** quản lý danh sách và trạng thái.<br>**Hệ thống:** kiểm tra cấu hình đã đầy đủ và cung cấp danh sách ưu tiên khi xử lý tin nhắn thực tế. |
| Pre-conditions | Người dùng có quyền; đã chọn kênh và phạm vi nguồn tin; các quy tắc thuộc đúng kênh. |
| Điều kiện kích hoạt | Người dùng mở danh sách Từ khóa hoặc thao tác bật/tắt/sắp xếp/xóa/hàng loạt. |
| Luồng xử lý chính | 1. Hệ thống hiển thị danh sách theo kênh/phạm vi, trạng thái, điều kiện, phản hồi, tần suất và độ trễ.<br>2. Người dùng tìm kiếm/lọc.<br>3. Người dùng bật/tắt một hoặc nhiều quy tắc; hệ thống kiểm tra tính hoàn tất.<br>4. Người dùng kéo thả thứ tự ưu tiên và lưu.<br>5. Người dùng xóa sau khi xác nhận.<br>6. Hệ thống cập nhật danh sách mà FR-AUT-022 sử dụng. |
| Post-condition | Trạng thái, thứ tự và danh sách Từ khóa được cập nhật nhất quán; chỉ quy tắc đủ điều kiện tham gia xử lý. |
| Luồng thay thế | - Quy tắc Chưa hoàn tất/Cần cấu hình lại: không cho bật.<br>- Thao tác hàng loạt có mục lỗi: bỏ qua mục không đủ điều kiện và báo số lượng/lý do.<br>- Xóa quy tắc đang có công việc gửi trễ: ngăn công việc chưa gửi.<br>- Hai người sắp xếp đồng thời: không ghi đè âm thầm; yêu cầu tải lại.<br>- Nhận yêu cầu bật/tắt lặp: không tạo lịch sử giả. |
| Sub-flow | **Ưu tiên:** thứ tự riêng theo từng kênh và phạm vi nguồn.<br>**Nhân bản:** nếu có, bản sao bắt đầu tắt và có mã mới.<br>**Chọn nhiều:** hiển thị số mục thành công, bỏ qua, thất bại và lý do. |
| Giao diện hệ thống | Hai tab/phạm vi nếu được hỗ trợ; ô tìm kiếm, bộ lọc, công tắc, kéo thả, chọn nhiều, menu sửa/xóa/nhân bản, trạng thái **Chưa hoàn tất/Cần cấu hình lại**. |
| Yêu cầu phi chức năng | Thay đổi trạng thái phải có hiệu lực nhất quán; danh sách lớn phân trang; mọi bật/tắt/xóa/sắp xếp có lịch sử; không làm gián đoạn xử lý tin đang chạy. |
| AC tương ứng | - **AC-AUT-020-01:** Quy tắc hoàn tất được bật/tắt; quy tắc lỗi bị chặn và nêu lý do.<br>- **AC-AUT-020-02:** Thứ tự lưu thành công được FR-AUT-022 sử dụng nhất quán.<br>- **AC-AUT-020-03:** Thao tác hàng loạt báo đúng số thành công/bỏ qua/thất bại.<br>- **AC-AUT-020-04:** Xóa quy tắc ngăn phản hồi chưa gửi và không thu hồi phản hồi đã gửi. |
| BR tương ứng | - **BR-AUT-020-01:** Chỉ quy tắc hoàn tất, đang bật và có đối tượng đích hợp lệ được tham gia.<br>- **BR-AUT-020-02:** Mỗi kênh/phạm vi có một thứ tự ưu tiên rõ ràng.<br>- **BR-AUT-020-03:** Thao tác hàng loạt không được tự bật mục bị bỏ qua.<br>- **BR-AUT-020-04:** Tắt/xóa không hoàn tác phản hồi đã gửi. |
