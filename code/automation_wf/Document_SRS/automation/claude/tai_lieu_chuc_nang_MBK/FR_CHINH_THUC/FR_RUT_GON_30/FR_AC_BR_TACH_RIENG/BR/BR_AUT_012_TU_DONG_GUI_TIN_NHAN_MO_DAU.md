# BR-AUT-012 — Tự động gửi tin nhắn mở đầu

> FR tham chiếu: FR-AUT-012

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-012-01 | Sự kiện chính là Bắt đầu/Get Started; chỉ dùng tin đầu tiên của khách chưa từng tương tác khi kênh không cung cấp sự kiện này. |
| BR-AUT-012-02 | Cùng mã sự kiện chỉ được gửi một lần; một sự kiện Get Started mới có mã mới được xử lý như tương tác mới. |
| BR-AUT-012-03 | Khách quay lại sau im lặng không tự tạo sự kiện gửi lời chào. |
| BR-AUT-012-04 | Nhân viên tiếp quản, bot tạm dừng hoặc cấu hình tắt có ưu tiên hơn việc gửi lời chào. |
| BR-AUT-012-05 | Tin đầu tiên dùng làm sự kiện thay thế vẫn tiếp tục qua các lớp xử lý tin nhắn sau lời chào. |
| BR-AUT-012-06 | **[CẦN XÁC NHẬN]** Nếu trạng thái bot hoặc nhân viên tiếp quản thay đổi sau khi xếp lịch nhưng trước khi gửi: hủy lời chào đang chờ hay vẫn gửi theo trạng thái lúc nhận sự kiện? |

