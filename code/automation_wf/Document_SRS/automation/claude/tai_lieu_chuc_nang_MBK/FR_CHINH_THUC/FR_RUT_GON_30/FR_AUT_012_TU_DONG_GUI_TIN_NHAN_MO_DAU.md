# FR-AUT-012: Tự động gửi tin nhắn mở đầu

| Mục | Nội dung |
| --- | --- |
| Mô tả | Tự động gửi lời chào khi kênh báo khách bấm **Bắt đầu/Get Started** và ngăn gửi lặp cho cùng sự kiện. |
| Đối tượng liên quan | **Khách hàng:** bắt đầu hội thoại và nhận lời chào.<br>**Hệ thống:** kiểm tra điều kiện, gửi và ghi nhận kết quả.<br>**Nhân viên:** có thể tiếp quản hội thoại. |
| Pre-conditions | FR-AUT-011 đã được bật; kênh đang hoạt động; khách đủ điều kiện nhận tin; hội thoại chưa được nhân viên tiếp quản. |
| Điều kiện kích hoạt | Kênh gửi sự kiện **Bắt đầu/Get Started**. Nếu kênh không có sự kiện này, chỉ tin đến đầu tiên của khách chưa từng tương tác được dùng làm sự kiện thay thế. |
| Luồng xử lý chính | 1. Hệ thống nhận sự kiện Bắt đầu.<br>2. Hệ thống loại sự kiện lặp.<br>3. Hệ thống kiểm tra cấu hình, trạng thái hội thoại và lịch sử gửi.<br>4. Nếu đủ điều kiện, hệ thống gửi lời chào một lần.<br>5. Nếu sự kiện thay thế đi kèm tin đầu tiên, tin đó vẫn tiếp tục được xử lý theo thứ tự tại FR-AUT-014.<br>6. Hệ thống lưu kết quả gửi cho FR-AUT-030. |
| Post-condition | Khách đủ điều kiện nhận một lời chào; kết quả được lưu để tránh gửi lại và phục vụ thống kê. |
| Luồng thay thế | - Cấu hình tắt hoặc lỗi: không gửi và ghi lý do.<br>- Nhân viên đã tiếp quản hoặc bot tạm dừng: không gửi.<br>- Sự kiện được nhận lại: trả kết quả cũ, không gửi thêm.<br>- Kênh chưa trả kết quả: kiểm tra trạng thái trước khi thử lại. |
| Sub-flow | **Không dùng thời lượng phiên:** quay lại sau một thời gian im lặng không làm gửi lại lời chào.<br>**Gửi lại:** chỉ gửi khi kênh phát sinh một sự kiện Bắt đầu mới hợp lệ; cùng mã sự kiện chỉ gửi một lần.<br>**Tin đầu tiên:** không bị lời chào tiêu thụ và vẫn được xét Thu thập thông tin, Từ khóa, AI rồi phản hồi mặc định. |
| Giao diện hệ thống | Không có màn hình riêng; trạng thái gửi và lý do bỏ qua được hiển thị trong lịch sử hoạt động và thống kê. |
| Yêu cầu phi chức năng | Cùng một phiên không nhận hai lời chào; yêu cầu gửi không bị mất khi hệ thống gián đoạn; dữ liệu nhạy cảm không được ghi vào nhật ký. |
| AC tương ứng | - **AC-AUT-012-01:** Mỗi sự kiện Bắt đầu hợp lệ nhận đúng một lời chào.<br>- **AC-AUT-012-02:** Sự kiện lặp hoặc khách chỉ quay lại sau im lặng không tạo thêm lời chào.<br>- **AC-AUT-012-03:** Hội thoại do nhân viên tiếp quản không nhận lời chào của bot.<br>- **AC-AUT-012-04:** Tin đầu tiên vẫn được chuyển cho chức năng xử lý tiếp theo.<br>- **AC-AUT-012-05:** Gửi lỗi hoặc bỏ qua đều có lý do rõ ràng. |
| BR tương ứng | - **BR-AUT-012-01:** Sự kiện chính là Bắt đầu/Get Started; chỉ dùng tin đầu tiên của khách chưa từng tương tác khi kênh không cung cấp sự kiện này.<br>- **BR-AUT-012-02:** Không dùng khoảng im lặng để tạo phiên mới; mỗi mã sự kiện chỉ được gửi một lần.<br>- **BR-AUT-012-03:** Nhân viên tiếp quản hoặc bot tạm dừng có ưu tiên hơn lời chào.<br>- **BR-AUT-012-04:** Tin nhắn mở đầu không thay thế và không ngăn xử lý tin đầu tiên. |
