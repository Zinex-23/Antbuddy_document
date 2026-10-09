# BR-AUT-025 — Cấu hình hành động và tần suất

> FR tham chiếu: FR-AUT-025

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-025-01 | Quy luật phải có ít nhất một trong 8 hành động được hỗ trợ. |
| BR-AUT-025-02 | Các hành động trong cùng quy luật chạy tuần tự theo thứ tự đã lưu. |
| BR-AUT-025-03 | Xung đột có thể nhận biết giữa các hành động trong cùng quy luật phải được cảnh báo và chặn bật; xung đột giữa nhiều quy luật xử lý tại FR-AUT-026. |
| BR-AUT-025-04 | Tần suất chỉ gồm Luôn thực hiện hoặc Chỉ 1 lần, tính theo khách + quy luật. |
| BR-AUT-025-05 | Chỉ 1 lần được ghi nhận khi tạo lần chạy hợp lệ và trước hành động đầu tiên; lỗi không cho sự kiện mới tạo thêm lần chạy. |
| BR-AUT-025-06 | Thử lại chỉ thực hiện hành động đang lỗi; hành động đã thành công không được chạy lại. |
| BR-AUT-025-07 | Mỗi hành động Cập nhật thông tin chỉ ghi một trường. |
| BR-AUT-025-08 | Nguồn hiện tại quy định tối đa 3 lần thử lại cho hành động lỗi tạm thời; sau lỗi cuối dừng các hành động còn lại và không hoàn tác hành động đã xong. |
| BR-AUT-025-09 | **[CẦN XÁC NHẬN]** Khoảng thời gian giữa 3 lần thử lại của hành động Quy luật là bao nhiêu? Không dùng lịch 1/5/15 phút của Kịch bản nếu chưa có quyết định riêng. |

