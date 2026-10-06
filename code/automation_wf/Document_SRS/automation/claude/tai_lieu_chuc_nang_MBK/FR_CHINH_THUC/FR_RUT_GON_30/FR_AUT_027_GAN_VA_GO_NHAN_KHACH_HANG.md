# FR-AUT-027: Gắn và gỡ nhãn khách hàng

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép luồng, kịch bản hoặc quy luật gắn và gỡ nhãn để phân loại khách hàng. |
| Đối tượng liên quan | **Người quản trị:** chọn nhãn trong cấu hình.<br>**Nhân viên:** gắn hoặc gỡ thủ công nếu có quyền.<br>**Khách hàng:** được phân loại.<br>**Hệ thống:** cập nhật và lưu nguồn thay đổi. |
| Pre-conditions | Khách và nhãn tồn tại trong cùng phạm vi; nhãn đang sử dụng; bên yêu cầu có quyền. |
| Điều kiện kích hoạt | Một bước hoặc người dùng yêu cầu gắn hay gỡ nhãn. |
| Luồng xử lý chính | 1. Hệ thống nhận yêu cầu.<br>2. Hệ thống kiểm tra khách, nhãn và quyền.<br>3. Hệ thống gắn hoặc gỡ nhãn.<br>4. Hệ thống lưu nguồn, thời gian và kết quả.<br>5. Hệ thống trả kết quả cho chức năng đã gọi. |
| Post-condition | Quan hệ giữa khách và nhãn được cập nhật; thay đổi có lịch sử. |
| Luồng thay thế | - Gắn nhãn khách đã có hoặc gỡ nhãn khách không có: trả thành công nhưng không đổi dữ liệu.<br>- Nhãn bị xóa hoặc sai phạm vi: từ chối.<br>- Vượt giới hạn nhãn: từ chối và nêu lý do.<br>- Hai yêu cầu cùng lúc: không tạo nhãn trùng. |
| Sub-flow | **Danh mục nhãn:** được quản lý ở chức năng riêng; FR này không tự tạo, đổi tên hoặc xóa nhãn.<br>**Xóa nhãn:** cấu hình đang tham chiếu hiển thị **Cần cấu hình lại**. |
| Giao diện hệ thống | Hành động **Gắn nhãn** và **Gỡ nhãn**; ô tìm và chọn nhãn; cảnh báo nhãn lỗi; lịch sử nhãn trên hồ sơ khách. |
| Yêu cầu phi chức năng | Thao tác lặp không tạo dữ liệu trùng; thay đổi được nhìn thấy sau khi tải lại; quyền sử dụng nhãn được kiểm tra; dữ liệu khách được bảo vệ. |
| AC tương ứng | - **AC-AUT-027-01:** Gắn nhãn hợp lệ làm nhãn xuất hiện trên hồ sơ khách.<br>- **AC-AUT-027-02:** Gỡ nhãn hợp lệ làm nhãn biến mất.<br>- **AC-AUT-027-03:** Yêu cầu lặp không tạo lỗi hoặc dữ liệu trùng.<br>- **AC-AUT-027-04:** Nhãn sai phạm vi hoặc bị xóa bị từ chối. |
| BR tương ứng | - **BR-AUT-027-01:** Một khách không có hai quan hệ với cùng một nhãn.<br>- **BR-AUT-027-02:** FR này chỉ sử dụng nhãn có sẵn và còn hiệu lực.<br>- **BR-AUT-027-03:** Mỗi thay đổi phải lưu nguồn và thời gian.<br>- **BR-AUT-027-04:** Gắn hoặc gỡ nhãn không được tự thay đổi danh mục nhãn. |
