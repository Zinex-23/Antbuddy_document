# FR-AUT-028: Tạo và quản lý quy luật tự động

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép xem, tìm kiếm, tạo, đổi tên, sao chép, xóa và bật/tắt Quy luật tự động. Quy luật mới chỉ trở thành hoạt động sau khi có sự kiện, điều kiện và hành động hợp lệ. |
| Đối tượng liên quan | **Người quản trị:** quản lý danh sách quy luật.<br>**Hệ thống:** duy trì trạng thái và kiểm tra tính hoàn tất.<br>**Khách hàng:** chịu tác động khi quy luật đang bật và đủ điều kiện. |
| Pre-conditions | Người dùng có quyền; kênh hoạt động; dữ liệu quy luật thuộc đúng doanh nghiệp/kênh. |
| Điều kiện kích hoạt | Người dùng mở Automation → Quy luật hoặc thao tác tạo/đổi tên/sao chép/xóa/bật tắt. |
| Luồng xử lý chính | 1. Hệ thống hiển thị danh sách, trạng thái và tóm tắt KHI–NẾU–THÌ.<br>2. Người dùng tạo quy luật và nhập tên; hệ thống tạo bản tắt/chưa hoàn tất.<br>3. Người dùng cấu hình tại FR-AUT-029 và FR-AUT-030.<br>4. Khi bật, hệ thống kiểm tra toàn bộ đối tượng và vòng lặp có thể nhận biết.<br>5. Người dùng có thể đổi tên, sao chép hoặc xóa sau xác nhận.<br>6. Hệ thống áp dụng trạng thái cho sự kiện phát sinh sau thời điểm thay đổi. |
| Post-condition | Danh sách và trạng thái quy luật được cập nhật; chỉ quy luật hoàn tất, đang bật mới tham gia FR-AUT-031. |
| Luồng thay thế | - Tên trống/trùng: chặn tạo/đổi tên.<br>- Quy luật thiếu sự kiện/hành động/tham số: không cho bật.<br>- Sao chép: tạo mã mới, tên phân biệt và trạng thái tắt.<br>- Xóa/tắt khi đang thực hiện: không hoàn tác hành động đã xong; kiểm tra trước hành động tiếp theo.<br>- Quy luật được tham chiếu: cảnh báo ảnh hưởng. |
| Sub-flow | **Xem nhanh:** hiển thị sự kiện, nhóm điều kiện, hành động, tần suất và trạng thái.<br>**Sao chép:** không sao chép lịch sử hoặc trạng thái “đã chạy một lần”.<br>**Xóa:** giữ lịch sử thực hiện theo chính sách lưu trữ. |
| Giao diện hệ thống | Danh sách có tìm kiếm/lọc, tên, trạng thái, tóm tắt, lần cập nhật; công tắc; menu xem nhanh/đổi tên/sao chép/xóa; trạng thái **Chưa hoàn tất/Cần cấu hình lại**. |
| Yêu cầu phi chức năng | Thao tác có lịch sử; danh sách lớn phân trang; trạng thái cập nhật nhất quán; dữ liệu giữa các kênh tách biệt; xóa không làm mất lịch sử cần kiểm toán. |
| AC tương ứng | - **AC-AUT-028-01:** Tên hợp lệ tạo quy luật tắt/chưa hoàn tất; tên trùng bị chặn.<br>- **AC-AUT-028-02:** Quy luật thiếu cấu hình không thể bật.<br>- **AC-AUT-028-03:** Sao chép tạo quy luật mới tắt và không sao chép lịch sử/tần suất đã dùng.<br>- **AC-AUT-028-04:** Tắt/xóa không hoàn tác hành động đã hoàn tất. |
| BR tương ứng | - **BR-AUT-028-01:** Tên quy luật là duy nhất trong kênh sau khi chuẩn hóa.<br>- **BR-AUT-028-02:** Quy luật mới và bản sao bắt đầu ở trạng thái tắt.<br>- **BR-AUT-028-03:** Chỉ quy luật hoàn tất, đang bật và không có tham chiếu lỗi được thực hiện.<br>- **BR-AUT-028-04:** Xóa quy luật không xóa lịch sử thực hiện đã phát sinh. |
