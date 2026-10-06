# FR-AUT-002: Cấu hình nút trong tin nhắn

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép thêm nút vào một khối tin nhắn, đặt tiêu đề và chọn hành động khi khách bấm. Nút là thành phần gắn với tin nhắn và khác với mục Menu chính hoặc Trả lời nhanh. |
| Đối tượng liên quan | **Người quản trị:** thêm, sửa và xóa nút.<br>**Khách hàng:** nhìn thấy và bấm nút.<br>**Hệ thống:** kiểm tra hành động và chuyển yêu cầu đến chức năng đích. |
| Pre-conditions | Người dùng có quyền chỉnh sửa; bước có loại nội dung cho phép gắn nút; kênh hỗ trợ loại nút và hành động được chọn. |
| Điều kiện kích hoạt | Người dùng chọn **Thêm nút** hoặc mở một nút hiện có; hoặc khách bấm nút thuộc tin nhắn đã gửi. |
| Luồng xử lý chính | 1. Hệ thống mở cửa sổ cấu hình nút.<br>2. Người dùng nhập tiêu đề và chọn một hành động được hỗ trợ.<br>3. Hệ thống hiển thị các trường bắt buộc của đúng hành động đó.<br>4. Người dùng nhập đủ thông tin và lưu.<br>5. Hệ thống kiểm tra, gắn nút vào khối tin nhắn và cập nhật bản nháp.<br>6. Khi khách bấm nút hợp lệ, hệ thống thực hiện đúng hành động một lần. |
| Post-condition | Nút hợp lệ xuất hiện đúng vị trí trong tin nhắn; lượt bấm của khách được chuyển đến đúng hành động. |
| Luồng thay thế | - Thiếu tiêu đề, hành động hoặc thông tin bắt buộc: không đóng cửa sổ và chỉ rõ trường lỗi.<br>- Vượt số nút hoặc độ dài tiêu đề: chặn thêm hoặc lưu.<br>- Đối tượng đích bị xóa: đánh dấu **Cần cấu hình lại** và không hiển thị nút cho khách ở bản phát hành tiếp theo.<br>- Địa chỉ web hoặc số điện thoại sai định dạng: từ chối lưu.<br>- Nhận lại cùng một lượt bấm: không thực hiện hành động lần hai. |
| Sub-flow | **Hành động:** có thể gồm mở địa chỉ web, gọi điện, chạy nội dung/luồng hoặc hành động khác được nghiệp vụ phê duyệt; mỗi loại phải nêu rõ thông tin bắt buộc và kết quả.<br>**Sắp xếp:** người dùng thay đổi thứ tự nút trong giới hạn kênh.<br>**[Cần xác nhận]**: danh mục 13 hành động và giới hạn tối đa 3 nút có áp dụng cho mọi kênh hay chỉ Messenger. |
| Giao diện hệ thống | Nút **Thêm nút**; danh sách nút có kéo thả; cửa sổ gồm tiêu đề, bộ đếm, loại hành động, trường theo hành động, **Lưu**, **Hủy**, **Xóa**; lỗi hiển thị ngay dưới trường. |
| Yêu cầu phi chức năng | Danh mục hành động phải được lọc theo kênh; địa chỉ web và dữ liệu đầu vào phải được kiểm tra an toàn; một lượt bấm chỉ được xử lý một lần; thao tác xem thử không thực hiện hành động thật. |
| AC tương ứng | - **AC-AUT-002-01:** Khi nhập đủ tiêu đề và tham số, nút được lưu và hiển thị đúng trong bản xem trước.<br>- **AC-AUT-002-02:** Khi thiếu trường bắt buộc, hệ thống chặn lưu và chỉ đúng trường lỗi.<br>- **AC-AUT-002-03:** Khi đạt giới hạn nút của kênh, hệ thống không cho thêm nút tiếp theo.<br>- **AC-AUT-002-04:** Khi khách bấm một nút hợp lệ, đúng một hành động được thực hiện; lượt bấm lặp không tạo tác động trùng. |
| BR tương ứng | - **BR-AUT-002-01:** Mỗi nút có một tiêu đề và đúng một hành động.<br>- **BR-AUT-002-02:** Giới hạn số nút và độ dài tiêu đề tuân theo kênh và loại nội dung.<br>- **BR-AUT-002-03:** Chỉ hành động đích còn hiệu lực, đúng doanh nghiệp/kênh mới được áp dụng.<br>- **BR-AUT-002-04:** Nút trong bản nháp hoặc xem thử không tạo tác động thật. |
