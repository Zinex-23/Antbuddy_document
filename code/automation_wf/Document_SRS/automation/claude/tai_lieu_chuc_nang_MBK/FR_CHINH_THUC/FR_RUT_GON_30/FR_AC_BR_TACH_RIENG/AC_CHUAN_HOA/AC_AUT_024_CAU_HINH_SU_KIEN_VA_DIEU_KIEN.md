# AC-AUT-024 — Cấu hình sự kiện và điều kiện

> FR tham chiếu: FR-AUT-024  
> BR kiểm chứng: BR-AUT-010, BR-AUT-051, BR-AUT-052

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang sửa một quy luật và các trường điều kiện còn hiệu lực. |
| When | Người dùng chọn nhiều sự kiện, cấu hình nhóm Tất cả/Bất kỳ và các phép so sánh phù hợp kiểu dữ liệu rồi lưu. |
| Then | Hệ thống kết hợp các sự kiện theo HOẶC, đánh giá đúng nhóm điều kiện và không yêu cầu giá trị cho Trống/Không trống. |
| And | Hệ thống chặn phép so sánh sai kiểu, điều kiện thiếu dữ liệu hoặc tham chiếu hỏng; khi chạy, danh sách/phiên bản quy luật được chốt lúc nhận sự kiện và dữ liệu điều kiện được đọc lại trước từng quy luật. |
