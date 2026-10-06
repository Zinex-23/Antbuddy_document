# FR-AUT-009: Quản lý và xuất bản câu hỏi gợi ý

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép thêm, sửa, xóa, sắp xếp và xuất bản các câu hỏi gợi ý để khách lựa chọn. |
| Đối tượng liên quan | **Người quản trị:** quản lý và xuất bản câu hỏi.<br>**Khách hàng:** xem và chọn câu hỏi.<br>**Hệ thống và kênh chat:** lưu bản nháp và hiển thị bản đã xuất bản. |
| Pre-conditions | Người dùng có quyền; kênh hỗ trợ câu hỏi gợi ý; mỗi câu hỏi có phản hồi hợp lệ tại FR-AUT-010. |
| Điều kiện kích hoạt | Người dùng mở danh sách câu hỏi, thay đổi nội dung hoặc chọn **Xuất bản**. |
| Luồng xử lý chính | 1. Hệ thống hiển thị bản nháp và bản đã xuất bản.<br>2. Người dùng thêm, sửa, xóa hoặc sắp xếp câu hỏi.<br>3. Hệ thống kiểm tra nội dung và giới hạn.<br>4. Người dùng cấu hình phản hồi tại FR-AUT-010.<br>5. Người dùng xem trước và bấm **Xuất bản**.<br>6. Khi kênh xác nhận thành công, khách thấy danh sách mới. |
| Post-condition | Bản nháp được lưu hoặc phiên bản mới được xuất bản; nếu lỗi, khách vẫn thấy phiên bản cũ. |
| Luồng thay thế | - Câu hỏi trống, trùng, quá 45 ký tự hoặc thiếu phản hồi: chặn xuất bản.<br>- Kênh mất kết nối: giữ bản nháp và cho thử lại.<br>- Không có thay đổi: vô hiệu hóa nút xuất bản.<br>- Danh sách rỗng được phép xuất bản để gỡ toàn bộ câu hỏi gợi ý; hệ thống phải yêu cầu xác nhận trước khi gỡ. |
| Sub-flow | **Giới hạn:** tối đa 4 câu hỏi/kênh, mỗi câu tối đa 45 ký tự.<br>**Vị trí:** hiển thị dưới dạng nút gợi ý khi khách mở hội thoại lần đầu; kênh có thể ẩn sau khi khách bắt đầu nhắn.<br>**Sắp xếp:** cập nhật ngay trong xem trước. **Thử lại:** dùng đúng phiên bản đã thất bại. |
| Giao diện hệ thống | Danh sách kéo thả; trường câu hỏi; bộ đếm; nút thêm và xóa; xem trước; trạng thái bản nháp và đã xuất bản; nút xuất bản và thử lại. |
| Yêu cầu phi chức năng | Bản nháp không bị mất khi xuất bản lỗi; thử lại không tạo phiên bản trùng; dữ liệu từng kênh được tách biệt; mọi lần xuất bản có lịch sử. |
| AC tương ứng | - **AC-AUT-009-01:** Người dùng thêm, sửa, xóa và sắp xếp được câu hỏi trong bản nháp.<br>- **AC-AUT-009-02:** Câu hỏi lỗi hoặc thiếu phản hồi bị chặn tại đúng vị trí.<br>- **AC-AUT-009-03:** Khách chỉ thấy danh sách mới sau khi xuất bản thành công.<br>- **AC-AUT-009-04:** Xuất bản lỗi giữ nguyên bản khách đang thấy. |
| BR tương ứng | - **BR-AUT-009-01:** Mỗi kênh có tối đa 4 câu hỏi; mỗi câu tối đa 45 ký tự và không được trùng sau khi chuẩn hóa.<br>- **BR-AUT-009-02:** Mỗi câu hỏi phải có phản hồi hợp lệ trước khi xuất bản.<br>- **BR-AUT-009-03:** Chỉnh sửa bản nháp không ảnh hưởng bản khách đang thấy.<br>- **BR-AUT-009-04:** Xuất bản lỗi giữ nguyên bản đang áp dụng.<br>- **BR-AUT-009-05:** Xuất bản danh sách rỗng là thao tác gỡ toàn bộ câu hỏi và phải được xác nhận. |
