# FR-AUT-010: Đồng bộ menu lên kênh chat

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép áp dụng một bản menu đã lưu lên nền tảng nhắn tin, theo dõi trạng thái và thử lại khi lỗi. Bản khách đang thấy chỉ thay đổi sau khi nền tảng xác nhận thành công. |
| Đối tượng liên quan | **Người quản trị:** yêu cầu áp dụng và theo dõi kết quả.<br>**Hệ thống/kênh chat:** kiểm tra, đồng bộ và trả kết quả.<br>**Khách hàng:** thấy bản mới sau khi thành công. |
| Pre-conditions | Người dùng có quyền áp dụng; kênh đang kết nối; menu và tất cả mục/hành động hợp lệ; không có lỗi **Cần cấu hình lại**. |
| Điều kiện kích hoạt | Người dùng bấm **Áp dụng/Đồng bộ** hoặc **Thử lại**. |
| Luồng xử lý chính | 1. Hệ thống kiểm tra toàn bộ menu theo giới hạn kênh.<br>2. Hệ thống lưu ảnh chụp phiên bản cần đồng bộ và chuyển trạng thái **Đang đồng bộ**.<br>3. Hệ thống gửi đúng phiên bản lên kênh.<br>4. Khi kênh xác nhận thành công, trạng thái chuyển **Đã áp dụng** và khách thấy bản mới.<br>5. Hệ thống lưu người thực hiện, thời điểm và kết quả. |
| Post-condition | Phiên bản mới trở thành bản đang áp dụng hoặc bản cũ tiếp tục hoạt động nếu đồng bộ không thành công. |
| Luồng thay thế | - Kênh mất kết nối: chặn đồng bộ nhưng giữ bản nháp.<br>- Đồng bộ lỗi hoặc hết thời gian: hiển thị lỗi, giữ bản áp dụng cũ và cho thử lại.<br>- Có bản nháp mới trong lúc đang đồng bộ: kết quả cũ không được ghi đè trạng thái của bản mới; mỗi yêu cầu phải gắn với đúng phiên bản.<br>- Không có thay đổi: vô hiệu hóa nút áp dụng.<br>- **[Cần xác nhận]** Menu rỗng được áp dụng để gỡ menu hay phải chặn đồng bộ. |
| Sub-flow | **Thử lại:** dùng đúng phiên bản thất bại, không tạo mục hoặc phiên bản trùng.<br>**Nhiều yêu cầu:** xử lý theo phiên bản; kết quả đến muộn không được thay thế bản mới hơn đã thành công.<br>**Đối soát:** khi chưa rõ kết quả, hỏi lại kênh trước khi gửi lại. |
| Giao diện hệ thống | Trạng thái **Đã lưu/Đang đồng bộ/Đã áp dụng/Thất bại**; thời điểm áp dụng; thông báo lỗi; nút **Áp dụng**, **Thử lại**; chỉ báo phiên bản bản nháp và bản đang áp dụng. |
| Yêu cầu phi chức năng | Đồng bộ phải có thể truy vết; lỗi không làm mất bản nháp; thử lại không tạo thay đổi trùng; trạng thái nhiều phiên bản phải nhất quán; thông tin kết nối được bảo vệ. |
| AC tương ứng | - **AC-AUT-010-01:** Menu hợp lệ được đồng bộ đúng kênh và chỉ hiển thị sau xác nhận thành công.<br>- **AC-AUT-010-02:** Đồng bộ lỗi giữ nguyên bản khách đang thấy và giữ bản nháp.<br>- **AC-AUT-010-03:** Thử lại cùng phiên bản không tạo mục/phiên bản trùng.<br>- **AC-AUT-010-04:** Kết quả đến muộn của bản cũ không ghi đè bản mới đã áp dụng. |
| BR tương ứng | - **BR-AUT-010-01:** Chỉ menu không có lỗi và đáp ứng giới hạn kênh mới được đồng bộ.<br>- **BR-AUT-010-02:** Bản áp dụng chỉ đổi khi kênh xác nhận thành công.<br>- **BR-AUT-010-03:** Mỗi yêu cầu đồng bộ gắn với một phiên bản bất biến.<br>- **BR-AUT-010-04:** Thử lại và đối soát không được tạo bản menu logic thứ hai. |
