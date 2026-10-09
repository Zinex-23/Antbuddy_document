# AC-AUT-013 — Cấu hình phản hồi mặc định

> FR tham chiếu: FR-AUT-013  
> BR kiểm chứng: BR-AUT-003, 010, 014, 029, 032

| Mục | Nội dung |
| --- | --- |
| Given | Kênh đã kết nối và người dùng có quyền cấu hình phản hồi mặc định. |
| When | Người dùng chọn nội dung hợp lệ, đặt tần suất/độ trễ trong giới hạn, bật chức năng rồi chỉnh sửa nội dung. |
| Then | Hệ thống lưu một cấu hình cho kênh và giữ nguyên lịch sử Chỉ một lần khi chỉnh sửa hoặc bật/tắt. |
| And | Hệ thống chặn nội dung/đích hỏng, X ngoài giới hạn hoặc độ trễ trên 24 giờ; tắt chức năng không xóa cấu hình và lịch sử. |

