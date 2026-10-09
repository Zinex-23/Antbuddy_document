# AC-AUT-006 — Cấu hình menu mặc định

> FR tham chiếu: FR-AUT-006  
> BR kiểm chứng: BR-AUT-001, 010, 016–019

| Mục | Nội dung |
| --- | --- |
| Given | Kênh đã kết nối và có đúng một menu mặc định. |
| When | Người dùng cấu hình 1–20 mục hợp lệ, áp dụng menu rồi khách chưa có menu riêng bấm một mục. |
| Then | Hệ thống hiển thị bản đã áp dụng gần nhất và thực hiện hành động của mục; khách có menu riêng vẫn thấy menu riêng. |
| And | Hệ thống không cho xóa menu mặc định, không cho lưu menu rỗng/quá 20 mục hoặc mục sai định dạng; chuyển menu chỉ xảy ra sau khi hệ thống chấp nhận hành động chính. |

