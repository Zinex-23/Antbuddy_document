# AC-AUT-010 — Cấu hình phản hồi câu hỏi gợi ý

> FR tham chiếu: FR-AUT-010  
> BR kiểm chứng: BR-AUT-010, 012, 021, 023–025

| Mục | Nội dung |
| --- | --- |
| Given | Một câu hỏi hợp lệ có phản hồi chính và các hành động bổ sung. |
| When | Khách chọn câu hỏi và phản hồi chính được kênh chấp nhận; một hành động bổ sung ở giữa danh sách bị lỗi. |
| Then | Hệ thống xử lý lựa chọn như sự kiện FAQ, thực hiện phản hồi chính rồi chạy các hành động bổ sung theo thứ tự. |
| And | Hệ thống không dò lựa chọn như Từ khóa, ghi lỗi nhưng không hoàn tác phần đã xong và tiếp tục các hành động còn lại; sự kiện lặp không chạy lại. |
