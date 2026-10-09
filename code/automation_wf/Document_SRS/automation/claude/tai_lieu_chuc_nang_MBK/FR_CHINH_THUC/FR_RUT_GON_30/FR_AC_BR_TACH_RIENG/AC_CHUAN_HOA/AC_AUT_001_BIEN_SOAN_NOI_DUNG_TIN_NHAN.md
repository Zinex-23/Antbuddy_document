# AC-AUT-001 — Biên soạn nội dung tin nhắn

> FR tham chiếu: FR-AUT-001  
> BR kiểm chứng: BR-AUT-001, BR-AUT-002, BR-AUT-003

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng có quyền sửa và đang soạn một tin cho kênh đã chọn; bộ dữ liệu kiểm thử gồm nội dung ở đúng giới hạn và nội dung vượt giới hạn sau khi thay biến. |
| When | Người dùng thêm văn bản, emoji, biến hoặc tệp rồi bấm Lưu/Xuất bản. |
| Then | Hệ thống lưu nội dung hợp lệ, giữ đúng thứ tự khối và hiển thị bản xem trước theo dữ liệu mẫu. |
| And | Hệ thống chặn khối rỗng, biến sai phạm vi, tệp không an toàn/không hỗ trợ, tệp trên 25 MB hoặc văn bản vượt 1.200 ký tự không nút/640 ký tự có nút; nếu kênh có giới hạn thấp hơn thì dùng giới hạn của kênh và không tự cắt nội dung. |
