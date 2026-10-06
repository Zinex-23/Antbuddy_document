# FR-AUT-016: Quản lý trạng thái và ưu tiên Từ khóa

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép tìm kiếm, bật tắt, sắp xếp ưu tiên, xóa và thao tác hàng loạt các quy tắc Từ khóa. |
| Đối tượng liên quan | **Người quản trị:** quản lý danh sách quy tắc.<br>**Hệ thống:** kiểm tra quy tắc và cung cấp thứ tự cho FR-AUT-018. |
| Pre-conditions | Người dùng có quyền; kênh đã được chọn; các quy tắc tồn tại trong đúng phạm vi. |
| Điều kiện kích hoạt | Người dùng mở danh sách Từ khóa hoặc thực hiện một thao tác quản lý. |
| Luồng xử lý chính | 1. Hệ thống hiển thị danh sách, trạng thái và thứ tự.<br>2. Người dùng tìm kiếm hoặc lọc.<br>3. Người dùng bật, tắt, sắp xếp hoặc chọn nhiều quy tắc.<br>4. Hệ thống kiểm tra quy tắc đã hoàn tất trước khi bật.<br>5. Người dùng xác nhận thao tác.<br>6. Hệ thống lưu thay đổi và cập nhật danh sách xử lý. |
| Post-condition | Danh sách Từ khóa có trạng thái và thứ tự ưu tiên mới, sẵn sàng cho FR-AUT-018. |
| Luồng thay thế | - Quy tắc chưa hoàn tất: không cho bật.<br>- Quy tắc đang được người khác sửa: yêu cầu tải lại trước khi ghi đè.<br>- Xóa quy tắc: yêu cầu xác nhận.<br>- Một phần thao tác hàng loạt lỗi: hiển thị rõ mục thành công và thất bại. |
| Sub-flow | **Bật:** chỉ áp dụng cho quy tắc đầy đủ.<br>**Sắp xếp:** thứ tự mới quyết định ưu tiên khi nhiều quy tắc cùng khớp.<br>**Xóa:** không xóa lịch sử thống kê đã có. |
| Giao diện hệ thống | Danh sách quy tắc; tìm kiếm và bộ lọc; công tắc trạng thái; kéo thả thứ tự; ô chọn nhiều dòng; nút xóa; thông báo kết quả. |
| Yêu cầu phi chức năng | Thao tác đồng thời không làm mất thay đổi; danh sách lớn vẫn tìm kiếm và sắp xếp ổn định; mọi thay đổi trạng thái có lịch sử. |
| AC tương ứng | - **AC-AUT-016-01:** Người dùng tìm kiếm và lọc được quy tắc.<br>- **AC-AUT-016-02:** Quy tắc chưa hoàn tất không thể bật.<br>- **AC-AUT-016-03:** Thứ tự mới được lưu và dùng khi xử lý tin.<br>- **AC-AUT-016-04:** Thao tác hàng loạt hiển thị kết quả từng quy tắc. |
| BR tương ứng | - **BR-AUT-016-01:** Chỉ quy tắc đầy đủ mới được bật.<br>- **BR-AUT-016-02:** Quy tắc đang tắt không tham gia dò Từ khóa.<br>- **BR-AUT-016-03:** Thứ tự trong danh sách là căn cứ ưu tiên chính thức.<br>- **BR-AUT-016-04:** Xóa quy tắc không xóa số liệu lịch sử. |
