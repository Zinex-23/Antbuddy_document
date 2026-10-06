# FR-AUT-017: Nhập Từ khóa từ tệp

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép nhập nhiều quy tắc Từ khóa từ một tệp mẫu, kiểm tra dữ liệu trước khi xác nhận và tải báo cáo kết quả. |
| Đối tượng liên quan | **Người quản trị:** chuẩn bị và tải tệp.<br>**Hệ thống:** kiểm tra, xử lý dữ liệu trùng và tạo quy tắc. |
| Pre-conditions | Người dùng có quyền nhập; đã chọn kênh; tệp đúng định dạng, không vượt giới hạn và an toàn. |
| Điều kiện kích hoạt | Người dùng chọn **Tải tệp mẫu** hoặc **Nhập từ tệp**. |
| Luồng xử lý chính | 1. Người dùng tải tệp mẫu.<br>2. Người dùng điền dữ liệu và tải tệp lên.<br>3. Hệ thống kiểm tra cấu trúc và từng dòng.<br>4. Hệ thống hiển thị số dòng tạo mới, cập nhật, bỏ qua và lỗi.<br>5. Người dùng chọn cách xử lý dữ liệu trùng rồi xác nhận.<br>6. Hệ thống nhập dòng hợp lệ và tạo báo cáo. |
| Post-condition | Các dòng hợp lệ được tạo hoặc cập nhật; các dòng lỗi được ghi rõ trong báo cáo. |
| Luồng thay thế | - Tệp sai định dạng: từ chối toàn bộ và nêu lỗi.<br>- Dòng lỗi: nêu số dòng, cột và lý do.<br>- Tệp vượt giới hạn: từ chối và nêu giới hạn.<br>- Quá trình bị gián đoạn: thử lại không tạo quy tắc trùng. |
| Sub-flow | **Dữ liệu trùng:** cho phép bỏ qua, cập nhật hoặc từ chối theo lựa chọn.<br>**Trạng thái sau nhập:** mặc định tắt nếu quy tắc chưa đầy đủ.<br>**[Cần xác nhận]**: hỗ trợ tệp CSV, Excel hay cả hai; các cột và giới hạn chính thức. |
| Giao diện hệ thống | Nút tải mẫu và tải tệp lên; vùng kéo thả; thanh tiến độ; bảng xem trước lỗi; lựa chọn xử lý dữ liệu trùng; báo cáo tải xuống. |
| Yêu cầu phi chức năng | Tệp được quét an toàn; tệp lớn được xử lý nền và có tiến độ; dữ liệu nhạy cảm không được ghi vào nhật ký; chỉ người có quyền được xem báo cáo. |
| AC tương ứng | - **AC-AUT-017-01:** Tệp mẫu có đủ cột và hướng dẫn giá trị.<br>- **AC-AUT-017-02:** Dòng lỗi hiển thị đúng dòng, cột và lý do trước khi nhập.<br>- **AC-AUT-017-03:** Chỉ dòng hợp lệ được nhập.<br>- **AC-AUT-017-04:** Nhập lại cùng tệp không tạo quy tắc trùng ngoài lựa chọn đã xác nhận. |
| BR tương ứng | - **BR-AUT-017-01:** Chỉ tệp đúng định dạng và trong giới hạn được xử lý.<br>- **BR-AUT-017-02:** Mỗi dòng dùng cùng quy tắc kiểm tra như nhập thủ công.<br>- **BR-AUT-017-03:** Quy tắc chưa đầy đủ phải ở trạng thái tắt.<br>- **BR-AUT-017-04:** Báo cáo phải phân biệt tạo mới, cập nhật, bỏ qua và lỗi. |
