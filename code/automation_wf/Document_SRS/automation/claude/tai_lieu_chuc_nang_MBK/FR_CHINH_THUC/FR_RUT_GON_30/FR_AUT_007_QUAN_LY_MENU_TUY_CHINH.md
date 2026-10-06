# FR-AUT-007: Quản lý menu tùy chỉnh

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép tạo các menu riêng, cấu hình mục và hành động, sau đó gán menu phù hợp cho từng khách. |
| Đối tượng liên quan | **Người quản trị:** tạo, sửa, sao chép, xóa và gán menu.<br>**Khách hàng:** sử dụng menu được gán.<br>**Hệ thống:** lưu menu và quan hệ giữa khách với menu. |
| Pre-conditions | Người dùng có quyền; kênh hỗ trợ menu; menu mặc định đã tồn tại; khách và menu thuộc cùng kênh. |
| Điều kiện kích hoạt | Người dùng quản lý menu tùy chỉnh, gán menu cho khách hoặc khách bấm một mục menu. |
| Luồng xử lý chính | 1. Người dùng tạo menu và đặt tên.<br>2. Người dùng thêm, sắp xếp các mục và chọn hành động.<br>3. Hệ thống kiểm tra tên, nội dung và giới hạn.<br>4. Người dùng lưu rồi áp dụng qua FR-AUT-008.<br>5. Người dùng gán menu đã áp dụng cho khách.<br>6. Khi gỡ menu riêng, khách trở về menu mặc định. |
| Post-condition | Menu và các mục được lưu; khách được gán thấy đúng menu, khách không còn menu riêng thấy menu mặc định. |
| Luồng thay thế | - Tên menu trùng hoặc mục chưa hợp lệ: không cho lưu hoặc áp dụng.<br>- Gán menu nháp, sai kênh hoặc đã xóa: từ chối và giữ menu cũ.<br>- Xóa menu đang có khách dùng: cảnh báo và yêu cầu xác nhận.<br>- Gán lại cùng menu: không tạo thay đổi trùng. |
| Sub-flow | **Giới hạn:** không đặt giới hạn nghiệp vụ về số menu tùy chỉnh; mỗi menu có tối đa 20 mục và tên mục tối đa 30 ký tự.<br>**4 hành động:** Tạo tin nhắn mới, Chọn luồng tin nhắn, Nhận thông báo (Opt-in) và Mở trang web; có thể chuyển menu sau khi hành động chính thành công.<br>**Sao chép:** tạo menu mới có cùng nội dung nhưng chưa có khách sử dụng.<br>**Xóa:** khách đang dùng được trả về menu mặc định; nơi tham chiếu menu bị xóa hiển thị **Cần cấu hình lại**. |
| Giao diện hệ thống | Danh sách menu; tìm kiếm; trạng thái; số khách đang dùng; màn hình chỉnh sửa mục; nút sao chép và xóa; ô chọn menu trên hồ sơ khách. |
| Yêu cầu phi chức năng | Tên trùng bị chặn ngay cả khi nhiều người cùng thao tác; mỗi khách có tối đa một menu riêng trên một kênh; dữ liệu không bị dùng lẫn giữa các kênh. |
| AC tương ứng | - **AC-AUT-007-01:** Người dùng tạo được menu có tên và các mục hợp lệ.<br>- **AC-AUT-007-02:** Sao chép tạo menu mới nhưng không sao chép khách đang dùng.<br>- **AC-AUT-007-03:** Gán menu đã áp dụng làm khách thấy đúng menu đó.<br>- **AC-AUT-007-04:** Gỡ menu riêng đưa khách về menu mặc định.<br>- **AC-AUT-007-05:** Menu nháp hoặc sai kênh không thể gán cho khách. |
| BR tương ứng | - **BR-AUT-007-01:** Tên menu phải là duy nhất trong một kênh; số menu tùy chỉnh không bị giới hạn nghiệp vụ.<br>- **BR-AUT-007-02:** Mỗi menu có tối đa 20 mục; mỗi mục có tên tối đa 30 ký tự và đúng một trong 4 hành động hợp lệ.<br>- **BR-AUT-007-03:** Tạo hoặc áp dụng menu không tự gán menu cho khách.<br>- **BR-AUT-007-04:** Mỗi khách có tối đa một menu tùy chỉnh trên một kênh.<br>- **BR-AUT-007-05:** Chỉ menu không rỗng, đã áp dụng, cùng kênh và còn hiệu lực mới được gán. |
