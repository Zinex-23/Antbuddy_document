# FR-AUT-030: Theo dõi thống kê tự động hóa

| Mục | Nội dung |
| --- | --- |
| Mô tả | Tổng hợp kết quả của luồng, tin nhắn, Từ khóa, Câu hỏi thường gặp, Kịch bản và Quy luật để người dùng theo dõi hiệu quả. |
| Đối tượng liên quan | **Người quản trị, quản lý hoặc người xem:** xem và xuất số liệu theo quyền.<br>**Các chức năng tự động hóa và kênh chat:** cung cấp kết quả.<br>**Hệ thống thống kê:** tính và hiển thị. |
| Pre-conditions | Người dùng có quyền xem; nguồn dữ liệu đã ghi nhận kết quả; khoảng thời gian và kênh hợp lệ. |
| Điều kiện kích hoạt | Người dùng mở màn hình thống kê, thay đổi bộ lọc hoặc xuất tệp. |
| Luồng xử lý chính | 1. Hệ thống nhận kết quả từ các chức năng.<br>2. Hệ thống loại dữ liệu lặp và dữ liệu xem thử.<br>3. Hệ thống tính chỉ số theo định nghĩa.<br>4. Người dùng chọn thời gian, kênh và loại chức năng.<br>5. Hệ thống hiển thị số liệu và thời điểm cập nhật.<br>6. Người dùng xem chi tiết hoặc xuất tệp. |
| Post-condition | Màn hình và tệp xuất hiển thị số liệu nhất quán theo cùng bộ lọc và thời điểm dữ liệu. |
| Luồng thay thế | - Chưa có dữ liệu: hiển thị trạng thái rỗng.<br>- Một chỉ số không được kênh hỗ trợ: ghi rõ **Không được hỗ trợ**.<br>- Dữ liệu đang cập nhật: hiển thị thời điểm gần nhất.<br>- Xuất tệp lỗi: thông báo và cho thử lại. |
| Sub-flow | **Số khách:** mỗi khách chỉ được tính một lần trong cùng nguồn và phiên bản.<br>**Số lượt:** có thể lớn hơn số khách vì một khách thực hiện nhiều lần.<br>**Đặt lại:** chỉ tạo mốc báo cáo mới, không xóa lịch sử. |
| Giao diện hệ thống | Bộ lọc; thẻ chỉ số; biểu đồ xu hướng; bảng chi tiết; giải thích công thức; thời điểm cập nhật; trạng thái tải, rỗng và lỗi; nút xuất tệp. |
| Yêu cầu phi chức năng | Việc ghi nhận không làm chậm luồng chính; dữ liệu được cập nhật theo thời gian mục tiêu; số liệu giữa màn hình và tệp xuất phải nhất quán; dữ liệu được tách biệt và bảo vệ. |
| AC tương ứng | - **AC-AUT-030-01:** Một khách bấm nhiều lần chỉ tăng số khách đã bấm một lần.<br>- **AC-AUT-030-02:** Dữ liệu xem thử không xuất hiện trong số liệu thật.<br>- **AC-AUT-030-03:** Chỉ số không được kênh hỗ trợ hiển thị rõ trạng thái.<br>- **AC-AUT-030-04:** Màn hình và tệp xuất cho cùng kết quả khi dùng cùng bộ lọc.<br>- **AC-AUT-030-05:** Đặt lại không xóa dữ liệu lịch sử. |
| BR tương ứng | - **BR-AUT-030-01:** Mỗi chỉ số phải có định nghĩa và cách tính rõ ràng.<br>- **BR-AUT-030-02:** Đã gửi, đã nhận và đã đọc là các trạng thái khác nhau.<br>- **BR-AUT-030-03:** Dữ liệu xem thử không được tính vào số liệu thật.<br>- **BR-AUT-030-04:** Đặt lại chỉ tạo mốc báo cáo, không xóa lịch sử.<br>- **BR-AUT-030-05:** Dữ liệu của các kênh và doanh nghiệp phải được tách biệt. |
