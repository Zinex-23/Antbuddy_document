# AC-AUT-007 — Quản lý menu tùy chỉnh

> FR tham chiếu: FR-AUT-007  
> BR kiểm chứng: BR-AUT-006, 010, 015–019

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng có quyền quản lý menu và kênh đã có menu mặc định. |
| When | Người dùng tạo, sao chép, áp dụng và gán một menu tùy chỉnh cho khách, sau đó xóa menu đó. |
| Then | Hệ thống tạo menu có tên duy nhất, bản sao có mã mới ở bản nháp, và tại một thời điểm khách chỉ dùng một menu riêng. |
| And | Hệ thống chặn tên trùng sau chuẩn hóa và menu sai kênh/chưa áp dụng; khi menu riêng bị xóa, khách trở về menu mặc định còn lịch sử cũ vẫn được giữ. |

