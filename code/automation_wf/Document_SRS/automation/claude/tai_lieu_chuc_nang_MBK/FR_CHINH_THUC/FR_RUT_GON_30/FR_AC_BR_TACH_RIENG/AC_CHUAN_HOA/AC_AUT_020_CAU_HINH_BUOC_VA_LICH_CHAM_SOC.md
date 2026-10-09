# AC-AUT-020 — Cấu hình bước và lịch chăm sóc

> FR tham chiếu: FR-AUT-020  
> BR kiểm chứng: BR-AUT-010, 042–044

| Mục | Nội dung |
| --- | --- |
| Given | Kịch bản đang ở bản nháp, có múi giờ kênh và khung gửi mặc định 08:30–18:00. |
| When | Người dùng thêm bước với thời điểm Sau X hoặc mốc cố định, điều kiện và loại hành động, rồi phát hành phiên bản mới. |
| Then | Hệ thống tính Sau X từ lúc đăng ký, bỏ mốc cố định đã qua và dời mốc ngoài khung đến đầu khung hợp lệ kế tiếp. |
| And | Khách cũ giữ phiên bản đã đăng ký; tắt bước chỉ ảnh hưởng phiên bản mới, xử lý DST không gửi hai lần và đối tượng đích hỏng làm bước Cần cấu hình lại. |

