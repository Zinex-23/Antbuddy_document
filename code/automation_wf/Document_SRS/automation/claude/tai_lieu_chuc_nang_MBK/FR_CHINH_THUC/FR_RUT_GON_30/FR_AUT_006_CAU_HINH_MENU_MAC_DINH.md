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
| Sub-flow | **Giới hạn:** mỗi kênh có đúng 1 menu mặc định, tối đa 20 mục; tên mục tối đa 30 ký tự.<br>**4 hành động:** Tạo tin nhắn mới, Chọn luồng tin nhắn, Nhận thông báo (Opt-in) và Mở trang web. Có thể cấu hình chuyển sang một menu tùy chỉnh đã áp dụng sau khi hành động chính thành công.<br>**Chọn menu:** ưu tiên menu riêng của khách; nếu không có thì dùng menu mặc định. Bản nháp không ảnh hưởng menu khách đang thấy. |
| Giao diện hệ thống | Danh sách mục menu; trường tên và hành động; kéo thả sắp xếp; bộ đếm; xem trước; trạng thái bản nháp và bản áp dụng; nút lưu và áp dụng. |
| Yêu cầu phi chức năng | Dữ liệu các kênh không bị dùng lẫn; lưu nháp không bị mất khi áp dụng lỗi; một lượt bấm chỉ được xử lý một lần; thay đổi có lịch sử. |
| AC tương ứng | - **AC-AUT-006-01:** Người dùng thêm, sửa, xóa và sắp xếp được mục menu.<br>- **AC-AUT-006-02:** Mục thiếu thông tin hoặc vượt giới hạn bị chặn.<br>- **AC-AUT-006-03:** Lưu nháp không đổi menu khách đang thấy.<br>- **AC-AUT-006-04:** Khách không có menu riêng thấy đúng menu mặc định đã áp dụng. |
| BR tương ứng | - **BR-AUT-006-01:** Mỗi kênh có đúng một menu mặc định; menu này không được xóa.<br>- **BR-AUT-006-02:** Menu có tối đa 20 mục; mỗi mục có tên tối đa 30 ký tự, một vị trí và một trong 4 hành động hợp lệ.<br>- **BR-AUT-006-03:** Không được áp dụng menu rỗng; chỉ bản áp dụng thành công gần nhất được hiển thị cho khách.<br>- **BR-AUT-006-04:** Menu riêng hợp lệ luôn được ưu tiên hơn menu mặc định.<br>- **BR-AUT-006-05:** Chuyển menu chỉ chạy sau khi hành động chính thành công và menu đích thuộc cùng kênh, đã được áp dụng. |
