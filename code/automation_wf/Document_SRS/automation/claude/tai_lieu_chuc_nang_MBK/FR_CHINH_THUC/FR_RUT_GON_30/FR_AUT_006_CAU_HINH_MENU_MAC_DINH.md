# FR-AUT-006: Cấu hình menu mặc định

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép cấu hình menu được dùng khi khách chưa được gán menu riêng. Mỗi mục menu có tên, thứ tự và hành động khi khách bấm. |
| Đối tượng liên quan | **Người quản trị:** cấu hình menu.<br>**Khách hàng:** xem và bấm menu.<br>**Hệ thống:** hiển thị menu và chạy hành động. |
| Pre-conditions | Người dùng có quyền; kênh đã kết nối và hỗ trợ menu; hành động được chọn còn hiệu lực. |
| Điều kiện kích hoạt | Người dùng mở **Menu mặc định** hoặc khách bấm một mục menu đang áp dụng. |
| Luồng xử lý chính | 1. Hệ thống hiển thị bản nháp và bản đang áp dụng.<br>2. Người dùng thêm mục, nhập tên và chọn hành động.<br>3. Người dùng sắp xếp các mục.<br>4. Hệ thống kiểm tra dữ liệu và giới hạn của kênh.<br>5. Người dùng lưu bản nháp và áp dụng qua FR-AUT-008.<br>6. Khách không có menu riêng sẽ thấy menu này. |
| Post-condition | Bản nháp được lưu; sau khi áp dụng thành công, khách đủ điều kiện thấy menu mới. |
| Luồng thay thế | - Mục thiếu tên hoặc hành động: không cho áp dụng.<br>- Hành động bị xóa: hiển thị **Cần cấu hình lại**.<br>- Kênh mất kết nối: cho lưu nháp nhưng không cho áp dụng.<br>- Chưa có bản áp dụng: không hiển thị menu cho khách. |
| Sub-flow | **Chọn menu:** ưu tiên menu riêng của khách; nếu không có thì dùng menu mặc định.<br>**Bản nháp:** không ảnh hưởng menu khách đang thấy.<br>**[Cần xác nhận]**: số mục và danh sách hành động của từng kênh. |
| Giao diện hệ thống | Danh sách mục menu; trường tên và hành động; kéo thả sắp xếp; bộ đếm; xem trước; trạng thái bản nháp và bản áp dụng; nút lưu và áp dụng. |
| Yêu cầu phi chức năng | Dữ liệu các kênh không bị dùng lẫn; lưu nháp không bị mất khi áp dụng lỗi; một lượt bấm chỉ được xử lý một lần; thay đổi có lịch sử. |
| AC tương ứng | - **AC-AUT-006-01:** Người dùng thêm, sửa, xóa và sắp xếp được mục menu.<br>- **AC-AUT-006-02:** Mục thiếu thông tin hoặc vượt giới hạn bị chặn.<br>- **AC-AUT-006-03:** Lưu nháp không đổi menu khách đang thấy.<br>- **AC-AUT-006-04:** Khách không có menu riêng thấy đúng menu mặc định đã áp dụng. |
| BR tương ứng | - **BR-AUT-006-01:** Mỗi kênh có đúng một menu mặc định.<br>- **BR-AUT-006-02:** Mỗi mục có một tên, một vị trí và một hành động hợp lệ.<br>- **BR-AUT-006-03:** Chỉ bản áp dụng thành công gần nhất được hiển thị cho khách.<br>- **BR-AUT-006-04:** Menu riêng hợp lệ luôn được ưu tiên hơn menu mặc định. |
