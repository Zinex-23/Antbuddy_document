# AC-AUT-019 — Quản lý kịch bản chăm sóc

> FR tham chiếu: FR-AUT-019  
> BR kiểm chứng: BR-AUT-006, 014, 015, 041, 044

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng có quyền quản lý và có một kịch bản gồm ít nhất một bước hợp lệ. |
| When | Người dùng tạo, bật, sao chép rồi tắt kịch bản khi đã có khách tham gia. |
| Then | Hệ thống yêu cầu tên duy nhất, tạo bản sao mã mới không có tiến trình/thống kê và ngăn khách mới sau khi tắt. |
| And | Khách đang tham gia tiếp tục theo phiên bản đã đăng ký; chỉ xóa được khi không còn tiến trình hoạt động và lịch sử cũ luôn được giữ. |

