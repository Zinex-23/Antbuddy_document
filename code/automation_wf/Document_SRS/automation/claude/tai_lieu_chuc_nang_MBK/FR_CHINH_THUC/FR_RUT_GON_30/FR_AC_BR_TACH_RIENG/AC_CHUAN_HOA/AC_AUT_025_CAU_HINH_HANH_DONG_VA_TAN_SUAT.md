# AC-AUT-025 — Cấu hình hành động và tần suất

> FR tham chiếu: FR-AUT-025  
> BR kiểm chứng: BR-AUT-010, 053–055

| Mục | Nội dung |
| --- | --- |
| Given | Quy luật có sự kiện hợp lệ và người dùng có các đối tượng đích còn hiệu lực. |
| When | Người dùng sắp xếp nhiều hành động, chọn Luôn thực hiện hoặc Chỉ một lần rồi bật quy luật; một hành động giữa chuỗi gặp lỗi tạm thời. |
| Then | Hệ thống chạy tuần tự, giữ chỗ Chỉ một lần khi tạo lượt hợp lệ và chỉ thử lại hành động lỗi sau 1, 5, 15 phút. |
| And | Hệ thống chặn xung đột nhận biết được và hành động cập nhật nhiều trường; sau lỗi cuối dừng phần còn lại, không chạy lại/hoàn tác phần đã thành công. |

