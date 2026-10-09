# AC-AUT-006 — Cấu hình menu mặc định

> FR tham chiếu: FR-AUT-006  
> BR kiểm chứng: BR-AUT-001, BR-AUT-010, BR-AUT-012, BR-AUT-016, BR-AUT-017, BR-AUT-018, BR-AUT-019

| Mục | Nội dung |
| --- | --- |
| Given | Kênh đã kết nối và có đúng một menu mặc định. |
| When | Người dùng cấu hình 1–20 mục hợp lệ, áp dụng menu rồi khách chưa có menu riêng bấm một mục; kênh gửi lại cùng mã lượt bấm. |
| Then | Hệ thống hiển thị bản đã áp dụng gần nhất và thực hiện hành động của mục; khách có menu riêng vẫn thấy menu riêng. |
| And | Hệ thống không cho xóa menu mặc định, không cho lưu menu rỗng/quá 20 mục, vượt giới hạn thấp hơn của kênh, URL sai hoặc đích đã mất hiệu lực; chuyển menu chỉ xảy ra sau hành động chính và lượt bấm lặp không chạy lại. |
