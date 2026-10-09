# AC-AUT-015 — Cấu hình quy tắc Từ khóa

> FR tham chiếu: FR-AUT-015  
> BR kiểm chứng: BR-AUT-010, 029, 033–035

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng có quyền cấu hình và có một phản hồi đích hợp lệ. |
| When | Người dùng chọn phạm vi, cách khớp, nhập một hoặc nhiều từ khóa, đặt tần suất/độ trễ rồi lưu và thử tin mẫu. |
| Then | Hệ thống dùng cùng cách chuẩn hóa/so khớp cho tin mẫu và tin thật, lưu quy tắc khi đủ dữ liệu. |
| And | Hệ thống chặn quy tắc trùng theo kênh + phạm vi + cách khớp + tập từ khóa chuẩn hóa, từ khóa rỗng, đích hỏng, X ngoài giới hạn hoặc độ trễ trên 24 giờ. |

