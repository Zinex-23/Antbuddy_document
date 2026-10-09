# AC-AUT-016 — Quản lý trạng thái và ưu tiên Từ khóa

> FR tham chiếu: FR-AUT-016  
> BR kiểm chứng: BR-AUT-014, BR-AUT-036

| Mục | Nội dung |
| --- | --- |
| Given | Danh sách có các quy tắc hoàn tất, chưa hoàn tất và đang tắt. |
| When | Người dùng sắp xếp ưu tiên, bật/tắt hoặc thao tác hàng loạt rồi xóa một quy tắc. |
| Then | Hệ thống chỉ bật quy tắc hoàn tất, dùng thứ tự danh sách làm ưu tiên và báo kết quả riêng cho từng quy tắc. |
| And | Quy tắc tắt/xóa không tham gia tin mới; thao tác không hợp lệ bị bỏ qua có lý do, còn lịch sử và thống kê cũ được giữ. |
