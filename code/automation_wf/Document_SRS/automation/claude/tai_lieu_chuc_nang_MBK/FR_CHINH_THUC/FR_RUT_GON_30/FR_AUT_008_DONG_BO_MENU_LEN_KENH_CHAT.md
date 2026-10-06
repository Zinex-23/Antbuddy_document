# FR-AUT-008: Đồng bộ menu lên kênh chat

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép đưa bản menu đã lưu lên kênh chat, theo dõi kết quả và thử lại khi có lỗi. |
| Đối tượng liên quan | **Người quản trị:** yêu cầu áp dụng và theo dõi kết quả.<br>**Kênh chat:** tiếp nhận cấu hình menu.<br>**Hệ thống:** kiểm tra, gửi và lưu trạng thái. |
| Pre-conditions | Menu có thay đổi hợp lệ; kênh đang kết nối; người dùng có quyền áp dụng. |
| Điều kiện kích hoạt | Người dùng bấm **Áp dụng**, **Đồng bộ** hoặc **Thử lại**. |
| Luồng xử lý chính | 1. Hệ thống kiểm tra toàn bộ menu.<br>2. Hệ thống tạo một phiên bản cố định để áp dụng.<br>3. Người dùng xác nhận.<br>4. Hệ thống gửi phiên bản lên kênh chat.<br>5. Khi kênh báo thành công, hệ thống đánh dấu phiên bản đang áp dụng.<br>6. Hệ thống hiển thị kết quả và thời điểm cập nhật. |
| Post-condition | Nếu thành công, khách thấy phiên bản menu mới; nếu thất bại, phiên bản cũ vẫn được giữ. |
| Luồng thay thế | - Menu còn lỗi: chặn áp dụng và chỉ rõ vị trí.<br>- Kênh mất kết nối: giữ bản nháp và cho thử lại sau.<br>- Hết thời gian chờ: kiểm tra kết quả trước khi gửi lại.<br>- Có bản nháp mới trong lúc đồng bộ: kết quả cũ không được ghi đè bản mới.<br>- **[Cần xác nhận]** Menu rỗng được dùng để gỡ menu hay bị chặn. |
| Sub-flow | **Thử lại:** dùng đúng phiên bản đã thất bại.<br>**Khôi phục:** khi áp dụng lỗi, tiếp tục dùng bản thành công gần nhất.<br>**Lịch sử:** lưu người thực hiện, thời gian, phiên bản và kết quả. |
| Giao diện hệ thống | Nút áp dụng và thử lại; cửa sổ xác nhận; trạng thái đang xử lý, thành công hoặc lỗi; chi tiết lỗi; thời điểm đồng bộ gần nhất. |
| Yêu cầu phi chức năng | Gửi lại cùng yêu cầu không tạo nhiều phiên bản; kết quả đến muộn không ghi đè phiên bản mới hơn; dữ liệu xác thực kênh được bảo vệ. |
| AC tương ứng | - **AC-AUT-008-01:** Menu lỗi không thể áp dụng và hiển thị đúng nguyên nhân.<br>- **AC-AUT-008-02:** Áp dụng thành công làm phiên bản mới trở thành bản khách thấy.<br>- **AC-AUT-008-03:** Áp dụng thất bại giữ nguyên phiên bản cũ.<br>- **AC-AUT-008-04:** Thử lại không tạo menu hoặc phiên bản trùng. |
| BR tương ứng | - **BR-AUT-008-01:** Chỉ menu hợp lệ mới được gửi lên kênh.<br>- **BR-AUT-008-02:** Mỗi lần áp dụng gắn với một phiên bản cố định.<br>- **BR-AUT-008-03:** Chỉ xác nhận thành công từ kênh mới đổi bản đang áp dụng.<br>- **BR-AUT-008-04:** Thử lại phải dùng đúng phiên bản đã thất bại. |
