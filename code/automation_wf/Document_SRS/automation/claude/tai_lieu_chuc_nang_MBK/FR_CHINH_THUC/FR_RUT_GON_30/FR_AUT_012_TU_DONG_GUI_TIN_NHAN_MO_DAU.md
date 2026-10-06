# FR-AUT-012: Tự động gửi tin nhắn mở đầu

| Mục | Nội dung |
| --- | --- |
| Mô tả | Tự động gửi lời chào khi khách bắt đầu một hội thoại hoặc phiên mới và ngăn gửi lặp trong cùng phiên. |
| Đối tượng liên quan | **Khách hàng:** bắt đầu hội thoại và nhận lời chào.<br>**Hệ thống:** kiểm tra điều kiện, gửi và ghi nhận kết quả.<br>**Nhân viên:** có thể tiếp quản hội thoại. |
| Pre-conditions | FR-AUT-011 đã được bật; kênh đang hoạt động; khách đủ điều kiện nhận tin; hội thoại chưa được nhân viên tiếp quản. |
| Điều kiện kích hoạt | Hệ thống nhận biết khách bắt đầu một phiên hội thoại mới. |
| Luồng xử lý chính | 1. Hệ thống nhận sự kiện bắt đầu phiên.<br>2. Hệ thống loại sự kiện lặp.<br>3. Hệ thống kiểm tra cấu hình, trạng thái hội thoại và lịch sử gửi.<br>4. Nếu đủ điều kiện, hệ thống gửi lời chào một lần.<br>5. Hệ thống lưu kết quả gửi cho FR-AUT-030. |
| Post-condition | Khách đủ điều kiện nhận một lời chào; kết quả được lưu để tránh gửi lại và phục vụ thống kê. |
| Luồng thay thế | - Cấu hình tắt hoặc lỗi: không gửi và ghi lý do.<br>- Nhân viên đã tiếp quản hoặc bot tạm dừng: không gửi.<br>- Sự kiện được nhận lại: trả kết quả cũ, không gửi thêm.<br>- Kênh chưa trả kết quả: kiểm tra trạng thái trước khi thử lại. |
| Sub-flow | **[Cần xác nhận]**: phiên mới được tính khi khách bấm Bắt đầu, gửi tin đầu tiên hay quay lại sau thời gian im lặng; thời lượng phiên và cách xử lý tin đầu tiên. |
| Giao diện hệ thống | Không có màn hình riêng; trạng thái gửi và lý do bỏ qua được hiển thị trong lịch sử hoạt động và thống kê. |
| Yêu cầu phi chức năng | Cùng một phiên không nhận hai lời chào; yêu cầu gửi không bị mất khi hệ thống gián đoạn; dữ liệu nhạy cảm không được ghi vào nhật ký. |
| AC tương ứng | - **AC-AUT-012-01:** Phiên đủ điều kiện nhận đúng một lời chào.<br>- **AC-AUT-012-02:** Sự kiện lặp không tạo thêm lời chào.<br>- **AC-AUT-012-03:** Hội thoại do nhân viên tiếp quản không nhận lời chào của bot.<br>- **AC-AUT-012-04:** Gửi lỗi hoặc bỏ qua đều có lý do rõ ràng. |
| BR tương ứng | - **BR-AUT-012-01:** Chỉ sự kiện bắt đầu phiên đã được định nghĩa mới kích hoạt lời chào.<br>- **BR-AUT-012-02:** Mỗi phiên đủ điều kiện chỉ được gửi một lần.<br>- **BR-AUT-012-03:** Nhân viên tiếp quản hoặc bot tạm dừng có ưu tiên hơn lời chào.<br>- **BR-AUT-012-04:** Tin nhắn mở đầu không thay thế phản hồi mặc định. |
