# BR-AUT-028 — Thu thập thông tin khách hàng

> FR tham chiếu: FR-AUT-028

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-028-01 | Mỗi phiên chỉ chờ một câu trả lời thuộc một trong ba kiểu Văn bản, Email, Số điện thoại tại một thời điểm. |
| BR-AUT-028-02 | Chỉ giá trị qua kiểm tra mới được chuyển sang lưu; tối đa 3 câu trả lời sai. |
| BR-AUT-028-03 | Sau lần sai thứ 3 hoặc hết 24 giờ, hệ thống chuyển nhánh thất bại; nếu không có nhánh thì kết thúc phiên. |
| BR-AUT-028-04 | Khi đang chờ, tin văn bản được xử lý tại đây trước Từ khóa, AI và phản hồi mặc định; một tin chỉ được tiêu thụ một lần. |
| BR-AUT-028-05 | Menu/FAQ không phải câu trả lời, không tính là lần sai và không bị tiêu thụ như câu trả lời. |
| BR-AUT-028-06 | Lệnh chính xác /huy kết thúc phiên; Bỏ qua chỉ có hiệu lực khi cấu hình cho phép. |
| BR-AUT-028-07 | Lỗi lưu tạm thời không bắt khách nhập lại; hệ thống giữ câu trả lời hợp lệ để thử lưu lại. |
| BR-AUT-028-08 | Thời gian chờ 24 giờ bắt đầu từ lúc gửi câu hỏi. Nếu thời hạn được tính lại theo tương tác thì loại tương tác phải được chốt tại BR-AUT-028-09. |
| BR-AUT-028-09 | **[CẦN XÁC NHẬN]** Tương tác nào đặt lại thời hạn 24 giờ: chỉ câu trả lời hợp lệ, mọi tin văn bản, hay cả Menu/FAQ? Hiện cụm từ tương tác hợp lệ chưa đủ rõ. |
