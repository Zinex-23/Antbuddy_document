# FR-AUT-032: Gắn và gỡ nhãn khách hàng

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cung cấp hành động gắn hoặc gỡ một nhãn đã có cho khách trong luồng, Kịch bản chăm sóc hoặc Quy luật. Chức năng này không quản lý toàn bộ danh mục nhãn; nơi quản lý danh mục phải được dẫn chiếu riêng. Tạo nhãn không đồng nghĩa gắn nhãn cho khách. |
| Đối tượng liên quan | **Người quản trị:** chọn nhãn trong cấu hình tự động hóa.<br>**Nhân viên:** gắn/gỡ thủ công nếu có quyền.<br>**Hệ thống:** cập nhật quan hệ giữa khách và nhãn, sau đó trả kết quả.<br>**Khách hàng:** được phân loại. |
| Pre-conditions | Nhãn tồn tại, đang hoạt động và cùng doanh nghiệp/kênh với khách; nguồn yêu cầu có quyền; khách tồn tại. |
| Điều kiện kích hoạt | Bước Hành động hoặc Quy luật yêu cầu gắn/gỡ nhãn; hoặc người dùng thao tác thủ công được hỗ trợ. |
| Luồng xử lý chính | 1. Hệ thống nhận khách, nhãn, thao tác và nguồn yêu cầu.<br>2. Hệ thống kiểm tra quyền, phạm vi, trạng thái và giới hạn nhãn của khách.<br>3. Với gắn, hệ thống thêm quan hệ nếu chưa có.<br>4. Với gỡ, hệ thống xóa quan hệ nếu đang có.<br>5. Hệ thống lưu nguồn/lý do và chỉ phát kết quả thay đổi khi dữ liệu thật sự đổi. |
| Post-condition | Hồ sơ khách có trạng thái nhãn đúng; thao tác lặp không tạo quan hệ hoặc sự kiện trùng. |
| Luồng thay thế | - Gắn nhãn khách đã có hoặc gỡ nhãn khách không có: trả kết quả thành công nhưng không thay đổi dữ liệu.<br>- Nhãn bị xóa, sai kênh hoặc đang ngừng sử dụng: từ chối và không tự tạo nhãn.<br>- Vượt giới hạn: từ chối gắn và nêu lý do.<br>- Hai yêu cầu đồng thời: vẫn chỉ có một quan hệ giữa khách và nhãn.<br>- Xóa nhãn khỏi danh mục: cấu hình tự động hóa liên quan hiển thị **Cần cấu hình lại**. |
| Sub-flow | **Ảnh hưởng kịch bản:** gắn/gỡ nhãn không tự đăng ký/hủy kịch bản trừ khi một Quy luật riêng lắng nghe sự kiện đó.<br>**Lịch sử:** giữ tên nhãn tại thời điểm thay đổi.<br>**Danh mục:** dẫn chiếu chức năng quản lý nhãn ngoài phạm vi FR này. |
| Giao diện hệ thống | Trong màn hình tạo luồng: hành động **Gắn nhãn/Gỡ nhãn**, ô tìm và chọn nhãn, trạng thái nhãn lỗi. Khi thao tác thủ công: ô chọn nhãn trên hồ sơ khách và lịch sử nguồn thay đổi. |
| Yêu cầu phi chức năng | Trong ít nhất 95% trường hợp, thao tác gắn/gỡ hoàn tất trong 500 mili giây; khi tải lại phải thấy thay đổi; thao tác đồng thời không tạo nhãn trùng; quyền gắn/gỡ tách khỏi quyền quản lý danh mục; dữ liệu khách được bảo vệ. |
| AC tương ứng | - **AC-AUT-032-01:** Gắn nhãn hợp lệ làm hồ sơ có đúng một quan hệ và ghi đúng nguồn.<br>- **AC-AUT-032-02:** Gắn/gỡ lặp không tạo thay đổi hoặc sự kiện giả.<br>- **AC-AUT-032-03:** Nhãn sai kênh/bị xóa bị từ chối và không tự tạo nhãn mới.<br>- **AC-AUT-032-04:** Gắn nhãn không tự đăng ký Kịch bản chăm sóc nếu không có Quy luật riêng. |
| BR tương ứng | - **BR-AUT-032-01:** Một khách có tối đa một quan hệ với cùng một nhãn.<br>- **BR-AUT-032-02:** Chỉ nhãn đang hoạt động, cùng doanh nghiệp/kênh mới được gắn/gỡ.<br>- **BR-AUT-032-03:** Chỉ phát sự kiện khi quan hệ thực sự thay đổi và đã lưu thành công.<br>- **BR-AUT-032-04:** Hành vi phát sinh từ nhãn phải được cấu hình bằng Quy luật, không mặc định ngầm. |
