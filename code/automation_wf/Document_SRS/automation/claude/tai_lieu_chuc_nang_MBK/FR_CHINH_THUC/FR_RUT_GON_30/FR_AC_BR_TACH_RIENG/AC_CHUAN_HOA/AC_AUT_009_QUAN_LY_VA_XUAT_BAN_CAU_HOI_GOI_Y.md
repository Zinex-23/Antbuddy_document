# AC-AUT-009 — Quản lý và xuất bản câu hỏi gợi ý

> FR tham chiếu: FR-AUT-009  
> BR kiểm chứng: BR-AUT-006, 010, 021, 022

| Mục | Nội dung |
| --- | --- |
| Given | Kênh đã kết nối và người dùng có quyền quản lý FAQ. |
| When | Người dùng tạo tối đa 4 câu hỏi không trùng, mỗi câu tối đa 45 ký tự, cấu hình phản hồi rồi xuất bản; sau đó thử xuất bản danh sách rỗng. |
| Then | Hệ thống chỉ đưa bản hợp lệ lên kênh sau khi kênh xác nhận; danh sách rỗng chỉ gỡ toàn bộ sau khi người dùng xác nhận. |
| And | Câu trùng sau chuẩn hóa, quá giới hạn hoặc thiếu phản hồi bị chặn; xuất bản lỗi giữ nguyên bản khách đang thấy. |

