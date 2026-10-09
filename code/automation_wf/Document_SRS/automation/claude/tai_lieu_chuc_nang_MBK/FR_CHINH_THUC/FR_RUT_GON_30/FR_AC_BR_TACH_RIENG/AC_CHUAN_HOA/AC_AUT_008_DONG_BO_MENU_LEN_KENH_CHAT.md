# AC-AUT-008 — Đồng bộ menu lên kênh chat

> FR tham chiếu: FR-AUT-008  
> BR kiểm chứng: BR-AUT-001, 012, 016, 020

| Mục | Nội dung |
| --- | --- |
| Given | Menu hợp lệ có một bản đang áp dụng và một bản nháp mới. |
| When | Người dùng đồng bộ bản nháp; kênh lần đầu trả trạng thái chưa rõ hoặc lỗi, sau đó người dùng thử lại. |
| Then | Hệ thống kiểm tra kết quả lần cũ trước; nếu cần thử lại thì dùng đúng phiên bản đã lỗi và chỉ đổi bản áp dụng khi kênh xác nhận thành công. |
| And | Kết quả đến muộn của phiên bản cũ không ghi đè bản mới, không làm mất bản nháp và yêu cầu lặp không tạo thêm lần đồng bộ. |

