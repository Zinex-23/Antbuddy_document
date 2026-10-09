# AC-AUT-010 — Cấu hình phản hồi câu hỏi gợi ý

> FR tham chiếu: FR-AUT-010  
> BR kiểm chứng: BR-AUT-003, BR-AUT-010, BR-AUT-012, BR-AUT-021, BR-AUT-023, BR-AUT-024, BR-AUT-025

| Mục | Nội dung |
| --- | --- |
| Given | Một câu hỏi hợp lệ có phản hồi chính đầy đủ, đích còn hiệu lực và các hành động bổ sung. |
| When | Khách chọn câu hỏi và phản hồi chính được kênh chấp nhận; một hành động bổ sung ở giữa danh sách bị lỗi. |
| Then | Hệ thống xử lý lựa chọn như sự kiện FAQ, thực hiện phản hồi chính rồi chạy các hành động bổ sung theo thứ tự. |
| And | Nội dung rỗng hoặc đích mất hiệu lực bị chặn; hệ thống không dò lựa chọn như Từ khóa, không hoàn tác phần đã xong, tiếp tục sau lỗi bổ sung và không chạy lại sự kiện lặp. |
