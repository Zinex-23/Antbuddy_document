# BR-AUT-029 — Tự động cập nhật thông tin khách hàng

> FR tham chiếu: FR-AUT-029

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-029-01 | Mỗi hành động cập nhật đúng một trường còn hiệu lực và cho phép ghi; nhiều trường phải dùng nhiều hành động tuần tự. |
| BR-AUT-029-02 | Nguồn giá trị được hỗ trợ gồm giá trị cố định, biến khách/sự kiện và kết quả từ Thu thập thông tin, AI hoặc API. |
| BR-AUT-029-03 | Giá trị phải phù hợp kiểu dữ liệu sau khi chuẩn hóa; trường bị xóa hoặc chỉ đọc không được cập nhật. |
| BR-AUT-029-04 | Chỉ hỗ trợ Ghi đè và Chỉ khi trống; cách ghi được kiểm tra tại thời điểm cập nhật. |
| BR-AUT-029-05 | Mỗi thay đổi thật phải có lịch sử gồm giá trị trước, sau, nguồn và thời gian. |
| BR-AUT-029-06 | Chính sách dừng hoặc tiếp tục sau lỗi thuộc chức năng gọi, không được áp một chính sách chung tại FR này. |
| BR-AUT-029-07 | **[CẦN XÁC NHẬN]** Giá trị trống theo từng kiểu dữ liệu được định nghĩa thế nào: null, chuỗi rỗng, chuỗi chỉ có khoảng trắng, danh sách rỗng hoặc số 0? |
| BR-AUT-029-08 | **[CẦN XÁC NHẬN]** Ghi cùng giá trị hiện tại có phát sinh sự kiện Trường khách hàng thay đổi cho Quy luật hay chỉ trả thành công không thay đổi? |

