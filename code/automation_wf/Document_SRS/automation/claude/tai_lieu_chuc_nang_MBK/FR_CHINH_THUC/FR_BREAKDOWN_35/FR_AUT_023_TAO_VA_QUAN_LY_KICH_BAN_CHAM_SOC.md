# FR-AUT-023: Tạo và quản lý kịch bản chăm sóc

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép xem, tìm kiếm, tạo, đổi tên, nhân bản, bật/tắt và xóa Kịch bản chăm sóc của từng kênh. Mỗi kịch bản là chuỗi bước dành cho khách đã đăng ký. |
| Đối tượng liên quan | **Người quản trị:** quản lý danh sách kịch bản.<br>**Hệ thống:** duy trì trạng thái, phiên bản và ảnh hưởng.<br>**Khách hàng:** chỉ tham gia khi được đăng ký qua FR-AUT-026. |
| Pre-conditions | Người dùng có quyền; kênh hoạt động; dữ liệu kịch bản thuộc đúng doanh nghiệp/kênh. |
| Điều kiện kích hoạt | Người dùng mở Automation → Kịch bản chăm sóc hoặc thao tác tạo/đổi tên/nhân bản/bật/tắt/xóa. |
| Luồng xử lý chính | 1. Hệ thống hiển thị danh sách, số bước và số khách đang tham gia.<br>2. Người dùng tạo kịch bản và nhập tên.<br>3. Hệ thống kiểm tra tên; tạo kịch bản nháp/tắt.<br>4. Người dùng cấu hình nội dung, lịch và điều kiện của các bước tại FR-AUT-024.<br>5. Khi bật, hệ thống kiểm tra toàn bộ kịch bản.<br>6. Khi xóa, hệ thống hiển thị khách, lịch và quy luật tham chiếu trước khi xác nhận. |
| Post-condition | Danh sách và trạng thái kịch bản được cập nhật; chỉ kịch bản hoàn chỉnh đang bật nhận đăng ký mới. |
| Luồng thay thế | - Tên trống/trùng: chặn tạo/đổi tên.<br>- Kịch bản chưa có bước hợp lệ: không cho bật.<br>- Nhân bản: tạo mã mới, tắt, không sao chép khách/lịch sử/số liệu.<br>- Xóa kịch bản đang có khách: yêu cầu chọn cách xử lý và cảnh báo.<br>- Xóa lỗi một phần: hiển thị tiến độ và cho thử lại. |
| Sub-flow | **Tắt:** ngăn đăng ký mới; khách đang tham gia xử lý theo quyết định FR-AUT-026.<br>**Xóa:** hủy lịch chưa chạy theo chính sách và đánh dấu nơi tham chiếu **Cần cấu hình lại**.<br>**[Cần xác nhận]**: “Số tin nhắn” đếm bước tin nhắn hay mọi bước; hành vi xóa với khách đang tham gia. |
| Giao diện hệ thống | Ô tìm kiếm, nút **Kịch bản mới**, bảng tên/trạng thái/số bước/số khách/lần cập nhật, menu đổi tên/nhân bản/xóa, công tắc bật/tắt và cửa sổ ảnh hưởng. |
| Yêu cầu phi chức năng | Danh sách lớn phân trang; thao tác có lịch sử; tên trùng bị chặn đồng thời; xóa lớn có tiến độ; dữ liệu từng kênh tách biệt. |
| AC tương ứng | - **AC-AUT-023-01:** Tên hợp lệ tạo kịch bản tắt; tên trùng bị chặn.<br>- **AC-AUT-023-02:** Kịch bản thiếu bước/lịch/đối tượng hợp lệ không thể bật.<br>- **AC-AUT-023-03:** Nhân bản không sao chép khách tham gia, lịch sử hoặc số liệu.<br>- **AC-AUT-023-04:** Xóa hiển thị đúng ảnh hưởng và không để lịch mồ côi. |
| BR tương ứng | - **BR-AUT-023-01:** Tên kịch bản là duy nhất trong kênh sau khi chuẩn hóa.<br>- **BR-AUT-023-02:** Kịch bản mới/bản sao bắt đầu ở trạng thái tắt.<br>- **BR-AUT-023-03:** Chỉ kịch bản hoàn chỉnh, đang bật mới nhận đăng ký.<br>- **BR-AUT-023-04:** Xóa/tắt không hoàn tác bước đã thực hiện. |
