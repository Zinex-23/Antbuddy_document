# FR-AUT-019: Quản lý kịch bản chăm sóc

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép tìm kiếm, tạo, đổi tên, sao chép, bật tắt và xóa kịch bản chăm sóc khách hàng. |
| Đối tượng liên quan | **Người quản trị:** quản lý danh sách kịch bản.<br>**Hệ thống:** lưu trạng thái và kiểm tra nơi đang sử dụng kịch bản. |
| Pre-conditions | Người dùng có quyền quản lý kịch bản và đã chọn đúng kênh hoặc phạm vi. |
| Điều kiện kích hoạt | Người dùng mở danh sách kịch bản hoặc chọn một thao tác quản lý. |
| Luồng xử lý chính | 1. Hệ thống hiển thị tên, trạng thái, số bước và số khách đang tham gia.<br>2. Người dùng tạo mới hoặc chọn một kịch bản.<br>3. Người dùng đổi tên, sao chép hoặc chỉnh sửa bước tại FR-AUT-020.<br>4. Hệ thống kiểm tra kịch bản đã đầy đủ trước khi bật.<br>5. Người dùng xác nhận bật, tắt hoặc xóa.<br>6. Hệ thống lưu và cập nhật danh sách. |
| Post-condition | Danh sách kịch bản và trạng thái được cập nhật; thao tác có lịch sử. |
| Luồng thay thế | - Tên trống hoặc trùng: không cho lưu.<br>- Kịch bản chưa có bước hợp lệ: không cho bật.<br>- Kịch bản còn khách đang tham gia: không cho xóa và hiển thị số khách cần hủy theo dõi trước.<br>- Kịch bản đang được sửa: yêu cầu tải lại trước khi ghi đè. |
| Sub-flow | **Sao chép:** tạo kịch bản mới có cùng cấu hình nhưng không sao chép khách và kết quả.<br>**Tắt:** ngăn đăng ký mới nhưng khách đang tham gia vẫn chạy theo phiên bản đã đăng ký.<br>**Xóa:** chỉ cho phép khi không còn tiến trình đang hoạt động; dữ liệu cấu hình bị ẩn/xóa nhưng lịch sử đã thực hiện vẫn được giữ. |
| Giao diện hệ thống | Danh sách kịch bản; tìm kiếm; trạng thái; số bước và số khách; nút tạo, sao chép, bật tắt và xóa; cửa sổ xác nhận. |
| Yêu cầu phi chức năng | Tên trùng bị chặn khi nhiều người cùng thao tác; xóa số lượng lớn có tiến độ; thay đổi có lịch sử và không làm mất số liệu cũ. |
| AC tương ứng | - **AC-AUT-019-01:** Người dùng tạo được kịch bản có tên hợp lệ.<br>- **AC-AUT-019-02:** Sao chép không mang theo khách hoặc số liệu.<br>- **AC-AUT-019-03:** Kịch bản chưa hoàn tất không thể bật.<br>- **AC-AUT-019-04:** Xóa kịch bản có ảnh hưởng phải cảnh báo trước. |
| BR tương ứng | - **BR-AUT-019-01:** Tên kịch bản phải là duy nhất trong phạm vi.<br>- **BR-AUT-019-02:** Kịch bản chỉ được bật khi có ít nhất một bước hợp lệ.<br>- **BR-AUT-019-03:** Tắt kịch bản ngăn đăng ký mới nhưng không dừng khách đang tham gia.<br>- **BR-AUT-019-04:** Chỉ được xóa kịch bản khi không còn tiến trình hoạt động; xóa không xóa lịch sử thực hiện. |
