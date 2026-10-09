# AC-AUT-029 — Tự động cập nhật thông tin khách hàng

> FR tham chiếu: FR-AUT-029  
> BR kiểm chứng: BR-AUT-010, 013, 063, 064

| Mục | Nội dung |
| --- | --- |
| Given | Một trường còn hiệu lực, cho phép ghi và có kiểu dữ liệu xác định. |
| When | Hành động cập nhật trường bằng hằng số/biến/kết quả, lần lượt theo chế độ Ghi đè và Chỉ khi trống; có trường hợp giá trị mới bằng giá trị cũ. |
| Then | Hệ thống chuẩn hóa đúng kiểu, cập nhật đúng một trường và lưu trước/sau khi dữ liệu thật sự thay đổi. |
| And | Null, chuỗi trắng và danh sách rỗng được coi là trống; 0, false và ngày hợp lệ không trống; ghi cùng giá trị thành công nhưng không tạo lịch sử hay sự kiện thay đổi. |

