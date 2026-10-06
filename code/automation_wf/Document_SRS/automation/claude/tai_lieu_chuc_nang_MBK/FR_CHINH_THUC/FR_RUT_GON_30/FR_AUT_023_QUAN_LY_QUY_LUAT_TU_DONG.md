# FR-AUT-023: Quản lý quy luật tự động

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép tạo, đổi tên, sao chép, bật tắt và xóa các quy luật tự động. |
| Đối tượng liên quan | **Người quản trị:** quản lý danh sách quy luật.<br>**Hệ thống:** lưu trạng thái và cung cấp quy luật cho FR-AUT-026. |
| Pre-conditions | Người dùng có quyền quản lý quy luật và đã chọn đúng kênh hoặc phạm vi. |
| Điều kiện kích hoạt | Người dùng mở danh sách Quy luật hoặc chọn một thao tác quản lý. |
| Luồng xử lý chính | 1. Hệ thống hiển thị tên, trạng thái và lần cập nhật.<br>2. Người dùng tạo mới hoặc chọn một quy luật.<br>3. Người dùng cấu hình sự kiện tại FR-AUT-024 và hành động tại FR-AUT-025.<br>4. Hệ thống kiểm tra quy luật đã đầy đủ.<br>5. Người dùng bật, tắt, sao chép hoặc xóa.<br>6. Hệ thống lưu và cập nhật danh sách. |
| Post-condition | Danh sách và trạng thái quy luật được cập nhật; thay đổi có lịch sử. |
| Luồng thay thế | - Tên trống hoặc trùng: không cho lưu.<br>- Thiếu sự kiện, điều kiện hoặc hành động: không cho bật.<br>- Xóa quy luật đang chạy: ngăn lần chạy mới và để lần đang chạy kết thúc an toàn.<br>- Có thay đổi mới hơn: yêu cầu tải lại trước khi ghi đè. |
| Sub-flow | **Sao chép:** tạo quy luật mới ở trạng thái tắt và không sao chép lịch sử.<br>**Tắt:** ngăn xử lý sự kiện mới.<br>**Xóa:** không xóa kết quả đã ghi nhận. |
| Giao diện hệ thống | Danh sách quy luật; tìm kiếm; trạng thái; nút tạo, sao chép, bật tắt và xóa; cảnh báo quy luật chưa hoàn tất. |
| Yêu cầu phi chức năng | Tên trùng bị chặn khi nhiều người thao tác; thay đổi có lịch sử; tắt hoặc xóa không làm hỏng lần chạy đang hoàn tất. |
| AC tương ứng | - **AC-AUT-023-01:** Người dùng tạo được quy luật có tên hợp lệ.<br>- **AC-AUT-023-02:** Sao chép tạo quy luật mới ở trạng thái tắt.<br>- **AC-AUT-023-03:** Quy luật chưa đầy đủ không thể bật.<br>- **AC-AUT-023-04:** Tắt quy luật ngăn xử lý sự kiện mới. |
| BR tương ứng | - **BR-AUT-023-01:** Tên quy luật phải là duy nhất trong phạm vi.<br>- **BR-AUT-023-02:** Quy luật chỉ được bật khi có sự kiện và ít nhất một hành động hợp lệ.<br>- **BR-AUT-023-03:** Bản sao không mang theo lịch sử thực hiện.<br>- **BR-AUT-023-04:** Xóa quy luật không xóa số liệu lịch sử. |
