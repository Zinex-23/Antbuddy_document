# FR-AUT-021: Nhập từ khóa từ tệp

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép tải tệp mẫu và nhập hàng loạt quy tắc Từ khóa, kiểm tra từng dòng, xem trước thay đổi và nhận báo cáo kết quả. Việc nhập không tự bật quy tắc nếu phản hồi chưa hoàn tất. |
| Đối tượng liên quan | **Người quản trị:** chuẩn bị và tải tệp.<br>**Hệ thống:** kiểm tra, xử lý dữ liệu trùng và tạo hoặc cập nhật bản nháp. |
| Pre-conditions | Người dùng có quyền nhập; đã chọn kênh và phạm vi; tệp đúng định dạng, không vượt giới hạn và không chứa mã độc. |
| Điều kiện kích hoạt | Người dùng bấm **Tải tệp mẫu** hoặc **Nhập từ tệp** và chọn tệp cần nhập. |
| Luồng xử lý chính | 1. Người dùng tải tệp mẫu có mô tả từng cột.<br>2. Người dùng điền dữ liệu và tải tệp lên.<br>3. Hệ thống kiểm tra định dạng, các cột bắt buộc, từng dòng, dữ liệu trùng và đối tượng được tham chiếu.<br>4. Hệ thống hiển thị số dòng sẽ được tạo mới, cập nhật, bỏ qua hoặc báo lỗi.<br>5. Người dùng chọn cách xử lý dữ liệu trùng và xác nhận.<br>6. Hệ thống nhập các dòng hợp lệ, giữ trạng thái an toàn và tạo báo cáo. |
| Post-condition | Các dòng hợp lệ được tạo/cập nhật theo lựa chọn; dòng lỗi không làm hỏng dữ liệu hợp lệ và có báo cáo chi tiết. |
| Luồng thay thế | - Sai loại tệp hoặc cấu trúc: từ chối toàn bộ và nêu lỗi.<br>- Dòng lỗi: đánh dấu số dòng, cột và lý do.<br>- Dữ liệu trùng: bỏ qua, cập nhật hoặc từ chối theo lựa chọn.<br>- Tệp vượt giới hạn: từ chối và nêu rõ giới hạn.<br>- Quá trình bị gián đoạn: khi thử lại không tạo dòng trùng và phải thông báo phần đã hoàn thành. |
| Sub-flow | **Tệp mẫu:** gồm cột bắt buộc, ví dụ và danh mục giá trị.<br>**Xử lý trùng:** so sánh theo phạm vi và điều kiện đã chuẩn hóa.<br>**[Cần xác nhận]**: hỗ trợ tệp CSV, Excel hay cả hai; cách mã hóa tiếng Việt; giới hạn số dòng/dung lượng; các cột chính thức và trạng thái từ khóa sau khi nhập. |
| Giao diện hệ thống | Nút tải tệp mẫu/tải tệp lên; vùng kéo thả tệp; thanh tiến độ; bảng xem trước có số dòng, cột và lỗi; lựa chọn cách xử lý dữ liệu trùng; nút xác nhận; báo cáo có thể tải xuống. |
| Yêu cầu phi chức năng | Tệp được quét an toàn; tệp lớn được xử lý nền và hiển thị tiến độ; dữ liệu nhạy cảm không được ghi vào nhật ký; thử lại không tạo bản ghi trùng; chỉ người có quyền được xem báo cáo. |
| AC tương ứng | - **AC-AUT-021-01:** Tệp mẫu chứa đủ cột bắt buộc và hướng dẫn giá trị.<br>- **AC-AUT-021-02:** Tệp có dòng lỗi phải hiển thị đúng dòng, cột và lý do trước khi người dùng xác nhận.<br>- **AC-AUT-021-03:** Sau khi xác nhận, chỉ dòng hợp lệ được nhập và hệ thống không tự bật quy tắc chưa có phản hồi.<br>- **AC-AUT-021-04:** Nhập lại cùng một tệp không tạo quy tắc trùng ngoài lựa chọn xử lý trùng. |
| BR tương ứng | - **BR-AUT-021-01:** Chỉ tệp đúng định dạng và trong giới hạn được xử lý.<br>- **BR-AUT-021-02:** Mỗi dòng được kiểm tra bằng cùng quy tắc như nhập thủ công.<br>- **BR-AUT-021-03:** Quy tắc mới từ tệp mặc định ở trạng thái tắt cho đến khi hoàn tất phản hồi, trừ khi nghiệp vụ phê duyệt khác.<br>- **BR-AUT-021-04:** Báo cáo phải phân biệt tạo mới, cập nhật, bỏ qua và lỗi. |
