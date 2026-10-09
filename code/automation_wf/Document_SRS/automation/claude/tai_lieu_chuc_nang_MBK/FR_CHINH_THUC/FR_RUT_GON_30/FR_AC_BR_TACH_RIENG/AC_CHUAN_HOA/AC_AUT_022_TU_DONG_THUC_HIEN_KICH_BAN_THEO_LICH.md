# AC-AUT-022 — Tự động thực hiện kịch bản theo lịch

> FR tham chiếu: FR-AUT-022  
> BR kiểm chứng: BR-AUT-001, 010, 012, 043, 047–049

| Mục | Nội dung |
| --- | --- |
| Given | Khách có tiến trình hoạt động và một bước hợp lệ đến hạn trong khung gửi. |
| When | Hệ thống kiểm tra điều kiện; lần thực hiện gặp lỗi tạm thời, một mốc thử lại rơi ngoài khung và cuối cùng thành công hoặc hết lần thử. |
| Then | Hệ thống chỉ thực hiện khi tiến trình/phiên bản/điều kiện/chính sách kênh còn hợp lệ; thử lại sau 1, 5, 15 phút tính từ lần lỗi trước. |
| And | Mốc ngoài khung được dời mà chưa tính lần thử; yêu cầu lặp không chạy lại; lỗi cuối xử lý theo loại bước, còn khách chặn/từ chối nhận tin làm hủy tiến trình. |

