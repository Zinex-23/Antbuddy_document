# AC-AUT-008 — Đồng bộ menu lên kênh chat

> FR tham chiếu: FR-AUT-008  
> BR kiểm chứng: BR-AUT-001, BR-AUT-010, BR-AUT-012, BR-AUT-016, BR-AUT-020

| Mục | Nội dung |
| --- | --- |
| Given | Menu có một bản đang áp dụng; bộ dữ liệu gồm bản nháp hợp lệ và bản nháp rỗng/quá giới hạn/có đích mất hiệu lực. |
| When | Người dùng đồng bộ bản nháp; kênh lần đầu trả trạng thái chưa rõ hoặc lỗi, sau đó người dùng thử lại. |
| Then | Hệ thống kiểm tra kết quả lần cũ trước; nếu cần thử lại thì dùng đúng phiên bản đã lỗi và chỉ đổi bản áp dụng khi kênh xác nhận thành công. |
| And | Hệ thống không gửi bản nháp rỗng, quá 20 mục, vượt giới hạn kênh hoặc có đích mất hiệu lực; kết quả cũ không ghi đè bản mới và yêu cầu lặp không tạo thêm lần đồng bộ. |
