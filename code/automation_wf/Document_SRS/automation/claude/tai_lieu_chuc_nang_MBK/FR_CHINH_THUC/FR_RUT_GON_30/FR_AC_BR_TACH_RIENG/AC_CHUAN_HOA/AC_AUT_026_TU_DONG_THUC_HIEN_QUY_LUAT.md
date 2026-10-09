# AC-AUT-026 — Tự động thực hiện quy luật

> FR tham chiếu: FR-AUT-026  
> BR kiểm chứng: BR-AUT-012, BR-AUT-052, BR-AUT-056, BR-AUT-057

| Mục | Nội dung |
| --- | --- |
| Given | Một sự kiện làm nhiều quy luật cùng đủ điều kiện và quy luật trước cập nhật dữ liệu dùng bởi quy luật sau. |
| When | Hệ thống nhận sự kiện, chốt danh sách/thứ tự/phiên bản và chạy các quy luật. |
| Then | Hệ thống chạy tuần tự; quy luật sau đọc dữ liệu mới đã lưu, lần ghi sau quyết định trạng thái cuối và lỗi một quy luật không chặn quy luật kế tiếp. |
| And | Sự kiện lặp không tạo lượt mới; cùng quy luật không chạy lại trong một chuỗi nguyên nhân và chuỗi sâu hơn 5 cấp bị chặn, ghi log. |
