# FR-AUT-004: Tạo và liên kết các bước trong luồng

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép tạo các bước và xác định bước tiếp theo để hình thành một luồng hội thoại hoàn chỉnh. |
| Đối tượng liên quan | **Người quản trị:** tạo và nối các bước.<br>**Khách hàng:** đi qua luồng theo tương tác của mình.<br>**Hệ thống:** chọn đúng bước tiếp theo. |
| Pre-conditions | Người dùng có quyền chỉnh sửa và đã mở một luồng. Các bước được tham chiếu phải còn tồn tại. |
| Điều kiện kích hoạt | Người dùng thêm bước, nối hai bước hoặc thay đổi điều kiện chuyển bước. |
| Luồng xử lý chính | 1. Người dùng thêm một bước và chọn loại bước.<br>2. Người dùng cấu hình nội dung hoặc hành động của bước.<br>3. Người dùng chọn bước tiếp theo.<br>4. Nếu có nhiều nhánh, người dùng đặt điều kiện cho từng nhánh.<br>5. Hệ thống kiểm tra bước thiếu, nhánh không có đích và vòng lặp không hợp lệ.<br>6. Người dùng lưu luồng. |
| Post-condition | Luồng được lưu với các bước, liên kết và điều kiện rõ ràng. |
| Luồng thay thế | - Bước chưa hoàn tất: không cho áp dụng luồng.<br>- Nhánh không có bước đích: đánh dấu lỗi.<br>- Bước đích bị xóa: hiển thị **Cần cấu hình lại**.<br>- Phát hiện vòng lặp không được phép: chặn lưu liên kết. |
| Sub-flow | **5 loại bước:** Tin nhắn, AI, Hành động, Smart Delay và Điều kiện.<br>**Bước tự chạy:** chuyển tiếp sau khi hoàn thành; bước chờ khách chỉ chuyển khi nhận đúng tương tác.<br>**Giới hạn:** tối đa 30 bước/luồng. Cho phép liên kết quay lại nếu có đường thoát; một bước chỉ được thực hiện tối đa 5 lần trong cùng một lượt chạy. Đến lần thứ 6, hệ thống dừng luồng và ghi lỗi vòng lặp. |
| Giao diện hệ thống | Vùng thiết kế luồng; danh sách loại bước; đường nối; điều kiện nhánh; cảnh báo bước thiếu hoặc không thể đi tới; nút lưu. |
| Yêu cầu phi chức năng | Luồng lớn vẫn có thể chỉnh sửa ổn định; thay đổi chưa lưu không bị mất ngoài ý muốn; kiểm tra vòng lặp không làm treo giao diện. |
| AC tương ứng | - **AC-AUT-004-01:** Người dùng tạo được bước và nối tới bước tiếp theo.<br>- **AC-AUT-004-02:** Nhánh có điều kiện chọn đúng bước khi xem thử.<br>- **AC-AUT-004-03:** Bước thiếu đích hoặc vòng lặp không hợp lệ bị chặn.<br>- **AC-AUT-004-04:** Xóa bước làm các nơi tham chiếu hiển thị **Cần cấu hình lại**. |
| BR tương ứng | - **BR-AUT-004-01:** Mỗi luồng có một bước bắt đầu, tối đa 30 bước và chỉ dùng 5 loại bước đã công bố.<br>- **BR-AUT-004-02:** Mỗi nhánh phải có điều kiện và bước đích rõ ràng.<br>- **BR-AUT-004-03:** Bước chờ khách không được tự chuyển khi chưa có tương tác phù hợp.<br>- **BR-AUT-004-04:** Liên kết quay lại phải có đường thoát; mỗi bước được chạy tối đa 5 lần trong một lượt chạy. |
