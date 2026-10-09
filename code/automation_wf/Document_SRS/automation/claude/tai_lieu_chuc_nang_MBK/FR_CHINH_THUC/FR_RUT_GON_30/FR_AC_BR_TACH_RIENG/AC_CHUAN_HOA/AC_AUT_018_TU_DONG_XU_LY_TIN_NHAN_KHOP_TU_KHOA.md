# AC-AUT-018 — Tự động xử lý tin nhắn khớp Từ khóa

> FR tham chiếu: FR-AUT-018  
> BR kiểm chứng: BR-AUT-025, 030, 039, 040

| Mục | Nội dung |
| --- | --- |
| Given | Một tin khách khớp nhiều quy tắc; quy tắc đầu đã hết tần suất, quy tắc kế tiếp đủ điều kiện. |
| When | Hệ thống xét danh sách theo thứ tự ưu tiên và xử lý tin. |
| Then | Hệ thống bỏ qua quy tắc hết tần suất, chọn đúng một quy tắc đủ điều kiện đầu tiên và gửi phản hồi của quy tắc đó. |
| And | Nếu quy tắc đã chọn gửi lỗi, hệ thống chỉ thử lại quy tắc này; nếu không có quy tắc đủ điều kiện thì chuyển AI rồi phản hồi mặc định; tin trong phiên Thu thập thông tin và lựa chọn FAQ không được dò Từ khóa. |

