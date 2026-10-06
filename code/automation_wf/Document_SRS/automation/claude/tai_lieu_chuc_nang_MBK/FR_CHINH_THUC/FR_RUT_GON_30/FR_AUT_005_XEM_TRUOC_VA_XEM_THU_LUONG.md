# FR-AUT-005: Xem trước và xem thử luồng

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép kiểm tra nội dung, các lựa chọn và đường đi của luồng trước khi áp dụng cho khách. |
| Đối tượng liên quan | **Người quản trị:** thực hiện kiểm tra.<br>**Hệ thống:** mô phỏng nội dung và kết quả.<br>**Khách thử nghiệm:** nhận tin thử nếu chức năng này được cho phép. |
| Pre-conditions | Luồng đã có ít nhất một bước; người dùng có quyền xem thử; dữ liệu mẫu đã sẵn sàng. |
| Điều kiện kích hoạt | Người dùng chọn **Xem trước** hoặc **Xem thử**. |
| Luồng xử lý chính | 1. Người dùng chọn thiết bị hoặc kênh cần xem.<br>2. Hệ thống hiển thị nội dung bằng dữ liệu mẫu.<br>3. Người dùng bấm nút hoặc trả lời để đi qua các nhánh.<br>4. Hệ thống cho biết bước và điều kiện đã được chọn.<br>5. Người dùng đặt lại phiên thử hoặc quay về chỉnh sửa. |
| Post-condition | Người dùng xác định được nội dung và luồng hoạt động đúng hay cần chỉnh sửa; dữ liệu thật không bị thay đổi. |
| Luồng thay thế | - Có bước lỗi: dừng tại bước đó và chỉ rõ nguyên nhân.<br>- Thiếu dữ liệu cho biến: dùng giá trị mẫu và cảnh báo.<br>- Hành động làm thay đổi dữ liệu: chỉ mô phỏng kết quả.<br>- Gửi thử thất bại: hiển thị lỗi nhưng không làm thay đổi bản nháp. |
| Sub-flow | **Xem trước:** chỉ kiểm tra cách hiển thị.<br>**Xem thử:** cho phép tương tác và theo dõi nhánh.<br>**Gửi thử:** chỉ dùng cho người hoặc tài khoản được phép. |
| Giao diện hệ thống | Khung mô phỏng thiết bị; dữ liệu mẫu; nút tương tác; tên bước hiện tại; lịch sử đường đi; nút đặt lại và quay về chỉnh sửa. |
| Yêu cầu phi chức năng | Dữ liệu thử được tách khỏi dữ liệu thật; thông tin cá nhân thật được che; phiên thử không gửi hành động hoặc ghi nhận số liệu thực tế. |
| AC tương ứng | - **AC-AUT-005-01:** Xem trước hiển thị đúng nội dung và thứ tự đã lưu.<br>- **AC-AUT-005-02:** Tương tác trong xem thử đi đúng nhánh đã cấu hình.<br>- **AC-AUT-005-03:** Bước lỗi được hiển thị rõ và không làm hỏng phiên thử.<br>- **AC-AUT-005-04:** Xem thử không thay đổi dữ liệu hoặc thống kê thực tế. |
| BR tương ứng | - **BR-AUT-005-01:** Xem trước và xem thử dùng đúng bản nháp được chọn.<br>- **BR-AUT-005-02:** Hành động thay đổi dữ liệu phải được mô phỏng.<br>- **BR-AUT-005-03:** Dữ liệu thử không được tính vào số liệu thực tế.<br>- **BR-AUT-005-04:** Gửi thử không thay thế việc áp dụng hoặc xuất bản. |
