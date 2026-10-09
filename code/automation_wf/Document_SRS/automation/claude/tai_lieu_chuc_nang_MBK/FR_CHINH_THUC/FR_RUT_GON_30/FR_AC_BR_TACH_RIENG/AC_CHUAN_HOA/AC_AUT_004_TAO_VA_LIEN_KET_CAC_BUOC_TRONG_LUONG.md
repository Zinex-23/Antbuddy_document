# AC-AUT-004 — Tạo và liên kết các bước trong luồng

> FR tham chiếu: FR-AUT-004  
> BR kiểm chứng: BR-AUT-008, BR-AUT-009, BR-AUT-010

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng có quyền sửa luồng và các đối tượng được tham chiếu còn hiệu lực. |
| When | Người dùng tạo luồng có một bước bắt đầu, tối đa 30 bước, nối các bước/nhánh và cấu hình một vòng quay lại có đường thoát. |
| Then | Hệ thống lưu luồng hợp lệ và chuyển bước theo đúng nhánh; bước chờ khách chỉ đi tiếp khi có tương tác phù hợp. |
| And | Hệ thống chặn loại bước không hỗ trợ, thiếu đích/điều kiện, nhiều bước bắt đầu, vòng lặp không có lối thoát; một bước bị dừng sau lần chạy thứ 5 trong cùng lượt. |
