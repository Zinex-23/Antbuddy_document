# AC-AUT-012 — Tự động gửi tin nhắn mở đầu

> FR tham chiếu: FR-AUT-012  
> BR kiểm chứng: BR-AUT-001, 012, 027, 028

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn mở đầu đang bật và khách chưa từng bắt đầu cuộc trò chuyện trên kênh. |
| When | Kênh gửi sự kiện Bắt đầu/Get Started; sau đó cùng sự kiện được gửi lặp và một khách cũ quay lại. |
| Then | Hệ thống gửi lời chào một lần cho khách mới và không gửi lại cho sự kiện trùng hoặc khách quay lại. |
| And | Ngay trước khi gửi, nếu cấu hình bị tắt, bot tạm dừng hoặc nhân viên tiếp quản thì hệ thống hủy gửi và ghi rõ lý do. |

