# AC-AUT-014 — Tự động phản hồi khi bot không hiểu

> FR tham chiếu: FR-AUT-014  
> BR kiểm chứng: BR-AUT-028, 030–032

| Mục | Nội dung |
| --- | --- |
| Given | Phản hồi mặc định đang bật và một tin khách chưa được lớp xử lý nào giải quyết. |
| When | Khi tin đi lần lượt qua Thu thập thông tin, Từ khóa, AI rồi được xếp lịch phản hồi mặc định; trước giờ gửi, một nhân viên trả lời khách. |
| Then | Hệ thống chỉ xếp phản hồi khi ba lớp trước không xử lý và hủy phản hồi đang chờ vì nhân viên đã tiếp quản. |
| And | Hệ thống không xử lý tin bot/automation/nhân viên; chỉ lần gửi thành công mới bắt đầu khoảng nghỉ và tin đồng thời không tạo hai phản hồi. |

