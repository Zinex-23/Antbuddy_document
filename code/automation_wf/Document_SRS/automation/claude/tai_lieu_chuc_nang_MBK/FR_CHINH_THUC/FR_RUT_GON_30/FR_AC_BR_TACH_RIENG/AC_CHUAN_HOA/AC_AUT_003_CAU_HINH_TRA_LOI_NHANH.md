# AC-AUT-003 — Cấu hình trả lời nhanh

> FR tham chiếu: FR-AUT-003  
> BR kiểm chứng: BR-AUT-001, BR-AUT-005, BR-AUT-006, BR-AUT-007, BR-AUT-010, BR-AUT-012

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang sửa tin nhắn và có các kết quả trả lời nhanh còn hiệu lực. |
| When | Người dùng thêm tối đa 11 lựa chọn, đặt tên tối đa 20 ký tự, lưu rồi khách chọn một lựa chọn. |
| Then | Hệ thống lưu các lựa chọn đúng thứ tự và chỉ xử lý lượt chọn hợp lệ đầu tiên của đúng tin nhắn. |
| And | Hệ thống chặn lựa chọn thứ 12 hoặc giới hạn thấp hơn của kênh, tên trùng sau khi chuẩn hóa, thiếu kết quả hoặc đích không hợp lệ; lượt chọn cũ/lặp không chạy thêm hành động. |
