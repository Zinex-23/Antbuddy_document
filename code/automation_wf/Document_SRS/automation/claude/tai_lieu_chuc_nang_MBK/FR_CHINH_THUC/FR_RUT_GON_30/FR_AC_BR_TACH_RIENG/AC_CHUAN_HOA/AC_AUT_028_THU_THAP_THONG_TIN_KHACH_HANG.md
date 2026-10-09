# AC-AUT-028 — Thu thập thông tin khách hàng

> FR tham chiếu: FR-AUT-028  
> BR kiểm chứng: BR-AUT-030, BR-AUT-060, BR-AUT-061, BR-AUT-062

| Mục | Nội dung |
| --- | --- |
| Given | Luồng đã gửi một câu hỏi Văn bản/Email/Số điện thoại và đang chờ câu trả lời trong 24 giờ. |
| When | Khách gửi Menu/FAQ, câu trả lời sai, câu trả lời đúng hoặc lệnh /huy; một lần lưu hợp lệ gặp lỗi tạm thời. |
| Then | Hệ thống ưu tiên xử lý tin văn bản tại bước Thu thập, không tính Menu/FAQ là câu trả lời, kiểm tra định dạng và lưu câu đúng vào trường đã chọn. |
| And | Mỗi câu văn bản đặt lại thời hạn 24 giờ; sau 3 lần sai chuyển nhánh thất bại; /huy kết thúc; lỗi lưu giữ câu đúng để thử lại mà không yêu cầu nhập lại. |
