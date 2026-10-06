# FR-AUT-029: Tự động cập nhật thông tin khách hàng

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép luồng hoặc quy luật gán và cập nhật giá trị vào trường thông tin khách hàng mà không cần hỏi khách. |
| Đối tượng liên quan | **Người quản trị:** chọn trường, giá trị và cách ghi.<br>**Hệ thống:** kiểm tra, chuyển đổi và lưu.<br>**Khách hàng:** có hồ sơ được cập nhật. |
| Pre-conditions | Khách và trường đích tồn tại; trường cho phép cập nhật; bên yêu cầu có quyền; giá trị nguồn đã sẵn sàng. |
| Điều kiện kích hoạt | Một bước, quy luật hoặc FR-AUT-028 yêu cầu cập nhật thông tin khách. |
| Luồng xử lý chính | 1. Hệ thống nhận trường đích, giá trị và cách ghi.<br>2. Hệ thống kiểm tra quyền và kiểu dữ liệu.<br>3. Hệ thống chuẩn hóa giá trị nếu cần.<br>4. Hệ thống ghi theo cách đã chọn.<br>5. Hệ thống lưu giá trị trước và sau cùng nguồn thay đổi.<br>6. Hệ thống trả kết quả cho chức năng đã gọi. |
| Post-condition | Trường thông tin được cập nhật hoặc yêu cầu bị từ chối với lý do rõ ràng. |
| Luồng thay thế | - Sai kiểu dữ liệu: từ chối và nêu lỗi.<br>- Trường bị xóa hoặc chỉ đọc: không cập nhật.<br>- Giá trị giống hiện tại: trả thành công nhưng không tạo thay đổi trùng.<br>- Hai yêu cầu cùng lúc: xử lý theo cách ghi đã chọn và giữ lịch sử. |
| Sub-flow | **Phạm vi:** mỗi hành động chỉ cập nhật một trường; muốn cập nhật nhiều trường phải tạo nhiều hành động và chạy theo thứ tự.<br>**2 cách ghi:** **Ghi đè** giá trị hiện tại hoặc **Chỉ khi trống**. Không hỗ trợ nối thêm hoặc tăng/giảm tự động trong phiên bản này.<br>**Nguồn giá trị:** giá trị cố định, biến khách/sự kiện hoặc kết quả từ Thu thập thông tin, AI hay API.<br>**Chuyển đổi:** loại khoảng trắng thừa, đổi định dạng số/ngày và đối chiếu danh mục trước khi ghi. |
| Giao diện hệ thống | Ô chọn trường; giá trị cố định hoặc biến thông tin; cách ghi; xem trước giá trị; thông báo lỗi; lịch sử thay đổi trên hồ sơ khách. |
| Yêu cầu phi chức năng | Thông tin cá nhân được mã hóa và che theo quyền; yêu cầu lặp không ghi trùng; dữ liệu doanh nghiệp này không được truy cập bởi doanh nghiệp khác. |
| AC tương ứng | - **AC-AUT-029-01:** Giá trị hợp lệ được ghi vào đúng trường của đúng khách.<br>- **AC-AUT-029-02:** Sai kiểu dữ liệu hoặc trường chỉ đọc bị từ chối.<br>- **AC-AUT-029-03:** Cách ghi **Chỉ khi trống** không ghi đè giá trị đã có.<br>- **AC-AUT-029-04:** Lịch sử hiển thị giá trị trước, sau và nguồn thay đổi. |
| BR tương ứng | - **BR-AUT-029-01:** Mỗi hành động cập nhật đúng một trường còn hiệu lực và cho phép ghi; nhiều trường phải dùng nhiều hành động tuần tự.<br>- **BR-AUT-029-02:** Giá trị từ nguồn được hỗ trợ phải phù hợp kiểu dữ liệu của trường.<br>- **BR-AUT-029-03:** Chỉ hỗ trợ **Ghi đè** và **Chỉ khi trống**; cách ghi được kiểm tra tại thời điểm cập nhật.<br>- **BR-AUT-029-04:** Mỗi thay đổi phải có lịch sử gồm giá trị trước, sau, nguồn và thời gian. |
