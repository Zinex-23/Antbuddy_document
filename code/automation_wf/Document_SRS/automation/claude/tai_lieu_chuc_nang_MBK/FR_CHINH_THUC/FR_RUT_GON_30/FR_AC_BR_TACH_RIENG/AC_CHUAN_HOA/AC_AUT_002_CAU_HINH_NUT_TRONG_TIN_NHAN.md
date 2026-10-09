# AC-AUT-002 — Cấu hình nút trong tin nhắn

> FR tham chiếu: FR-AUT-002  
> BR kiểm chứng: BR-AUT-001, BR-AUT-002, BR-AUT-004, BR-AUT-010, BR-AUT-012

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang sửa tin nhắn có văn bản tại biên 640/641 ký tự và có các hành động đích còn hiệu lực. |
| When | Người dùng thêm tối đa 3 nút, đặt tên tối đa 20 ký tự, chọn một hành động cho mỗi nút rồi lưu và bấm thử một nút. |
| Then | Hệ thống chấp nhận văn bản 640 ký tự, lưu các nút đúng thứ tự và thực hiện đúng một lần hành động của nút được bấm. |
| And | Hệ thống chặn văn bản 641 ký tự, nút thiếu tên/hành động, nút thứ 4, tên quá dài, đích không hợp lệ hoặc giới hạn thấp hơn của kênh; sự kiện bấm lặp không chạy lại hành động. |
