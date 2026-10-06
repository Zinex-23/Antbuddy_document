# FR-AUT-029: Cấu hình sự kiện và điều kiện kích hoạt

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép định nghĩa phần **KHI/NẾU** của quy luật: sự kiện nào khiến quy luật được xét và khách nào đáp ứng các điều kiện lọc. Nhiều sự kiện và nhiều nhóm điều kiện phải có cách kết hợp hiển thị rõ. |
| Đối tượng liên quan | **Người quản trị:** chọn sự kiện và điều kiện.<br>**Hệ thống:** kiểm tra dữ liệu sự kiện và đánh giá điều kiện.<br>**Khách hàng:** là đối tượng được xét. |
| Pre-conditions | Quy luật tồn tại; người dùng có quyền; danh mục sự kiện/trường/toán tử khả dụng; đối tượng tham chiếu cùng doanh nghiệp/kênh. |
| Điều kiện kích hoạt | Người dùng mở phần **Áp dụng khi/KHI–NẾU** của quy luật; hoặc FR-AUT-031 nhận một sự kiện. |
| Luồng xử lý chính | 1. Người dùng thêm ít nhất một sự kiện.<br>2. Hệ thống hiển thị tham số của sự kiện.<br>3. Người dùng thêm điều kiện lọc theo trường, toán tử và giá trị.<br>4. Người dùng chọn nhóm **Tất cả** hoặc **Bất kỳ**.<br>5. Hệ thống kiểm tra kiểu dữ liệu, tham chiếu và cấu trúc nhóm.<br>6. Hệ thống lưu và cung cấp bản tóm tắt dễ đọc. |
| Post-condition | Quy luật có điều kiện kích hoạt xác định được; cùng dữ liệu đầu vào cho kết quả đánh giá ổn định. |
| Luồng thay thế | - Thiếu sự kiện: quy luật chưa hoàn tất.<br>- Trường/nhãn bị xóa: hiển thị **Cần cấu hình lại** và tự tắt quy luật.<br>- Giá trị sai kiểu: chặn lưu tại điều kiện.<br>- Sự kiện không đúng cấu trúc khi chạy: không đoán dữ liệu; ghi lỗi.<br>- Cấu trúc nhóm rỗng/mâu thuẫn: chặn lưu. |
| Sub-flow | **Nhiều sự kiện:** mặc định đề xuất kết hợp “hoặc”; điều kiện trong từng nhóm dùng **Tất cả/Bất kỳ**.<br>**Dữ liệu dùng để kiểm tra:** sử dụng dữ liệu của khách tại đúng thời điểm xảy ra sự kiện.<br>**[Cần xác nhận]**: danh mục sự kiện, thông tin của từng sự kiện, phép so sánh và việc điều kiện thuộc từng sự kiện hay toàn quy luật. |
| Giao diện hệ thống | Khung **Áp dụng khi**; thẻ sự kiện; nút thêm/xóa; bộ chọn trường/toán tử/giá trị; nhóm Tất cả/Bất kỳ; thu gọn/mở rộng; bản tóm tắt câu tự nhiên; lỗi tại thẻ. |
| Yêu cầu phi chức năng | Trong ít nhất 95% trường hợp, việc kiểm tra sự kiện và điều kiện hoàn tất trong 200 mili giây; dữ liệu nhạy cảm được che; cấu trúc dữ liệu sự kiện có phiên bản; dữ liệu lỗi không làm chạy hành động. |
| AC tương ứng | - **AC-AUT-029-01:** Thiếu sự kiện hoặc tham số bắt buộc làm quy luật không thể bật.<br>- **AC-AUT-029-02:** Nhóm Tất cả chỉ đạt khi mọi điều kiện đúng; nhóm Bất kỳ đạt khi ít nhất một điều kiện đúng.<br>- **AC-AUT-029-03:** Một trong nhiều sự kiện khớp sẽ đưa quy luật sang bước đánh giá điều kiện tương ứng.<br>- **AC-AUT-029-04:** Tham chiếu bị xóa làm quy luật tự tắt và chỉ rõ điều kiện lỗi. |
| BR tương ứng | - **BR-AUT-029-01:** Quy luật có ít nhất một sự kiện hợp lệ.<br>- **BR-AUT-029-02:** Cách kết hợp sự kiện/điều kiện phải được lưu và hiển thị rõ, không dùng thứ tự ngầm.<br>- **BR-AUT-029-03:** Điều kiện phải dùng đúng kiểu dữ liệu và phạm vi kênh/doanh nghiệp.<br>- **BR-AUT-029-04:** Dữ liệu sự kiện thiếu/sai không được tự suy diễn để chạy quy luật. |
