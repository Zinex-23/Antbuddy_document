# AC-AUT-021 — Đăng ký và hủy theo dõi kịch bản

> FR tham chiếu: FR-AUT-021  
> BR kiểm chứng: BR-AUT-013, BR-AUT-044, BR-AUT-045, BR-AUT-046

| Mục | Nội dung |
| --- | --- |
| Given | Kịch bản đang bật và hoàn tất; khách chưa có tiến trình đang hoạt động. |
| When | Hệ thống đăng ký khách, nhận lại yêu cầu đăng ký trùng, sau đó người dùng hủy và đăng ký lại. |
| Then | Hệ thống tạo một tiến trình theo phiên bản hiện hành; yêu cầu trùng giữ lịch cũ; hủy ngăn bước tương lai và đăng ký lại bắt đầu từ đầu bằng phiên bản mới. |
| And | Kịch bản tắt không nhận đăng ký mới nhưng vẫn cho hủy; không có Tạm dừng/Tiếp tục và mọi thay đổi lưu nguồn cùng thời gian. |
