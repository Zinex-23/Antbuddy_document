# AC-AUT-002 — Cấu hình nút trong tin nhắn

> FR tham chiếu: FR-AUT-002  
> BR kiểm chứng: BR-AUT-001, 004, 010, 012

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang sửa một tin nhắn hợp lệ và có các hành động đích còn hiệu lực. |
| When | Người dùng thêm tối đa 3 nút, đặt tên tối đa 20 ký tự, chọn một hành động cho mỗi nút rồi lưu và bấm thử một nút. |
| Then | Hệ thống lưu các nút đúng thứ tự và thực hiện đúng một lần hành động của nút được bấm. |
| And | Hệ thống chặn nút thiếu tên/hành động, nút thứ 4, tên quá dài hoặc đích không hợp lệ; sự kiện bấm bị gửi lặp không làm hành động chạy lại. |

