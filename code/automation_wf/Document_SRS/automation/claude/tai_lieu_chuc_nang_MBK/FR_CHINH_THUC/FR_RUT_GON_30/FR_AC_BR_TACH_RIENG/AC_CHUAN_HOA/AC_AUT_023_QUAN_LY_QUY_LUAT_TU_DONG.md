# AC-AUT-023 — Quản lý quy luật tự động

> FR tham chiếu: FR-AUT-023  
> BR kiểm chứng: BR-AUT-006, BR-AUT-010, BR-AUT-014, BR-AUT-015, BR-AUT-050

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng có quyền quản lý Quy luật. |
| When | Người dùng tạo quy luật có tên, sự kiện và hành động hợp lệ; sau đó sao chép, tắt và xóa quy luật. |
| Then | Hệ thống chỉ cho bật quy luật hoàn tất, tạo bản sao mã mới ở trạng thái tắt và ngăn lượt chạy mới sau khi tắt/xóa. |
| And | Tên trùng sau chuẩn hóa bị chặn; đích bị xóa làm quy luật Cần cấu hình lại và không tạo lượt mới; lượt đã bắt đầu dùng phiên bản đã chốt, phần đã xong không bị hoàn tác và lịch sử được giữ. |
