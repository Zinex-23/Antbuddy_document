# AC-AUT-017 — Nhập Từ khóa từ tệp

> FR tham chiếu: FR-AUT-017  
> BR kiểm chứng: BR-AUT-010, 012, 034, 037, 038

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng có tệp XLSX/CSV UTF-8 đúng mẫu, gồm dòng mới, dòng trùng, dòng lỗi và dòng thiếu phản hồi. |
| When | Người dùng nhập tệp không quá 10 MB/10.000 dòng và chọn Bỏ qua hoặc Cập nhật dữ liệu trùng. |
| Then | Hệ thống xử lý tối đa một lần cho mỗi yêu cầu, nhập dòng hợp lệ và trả báo cáo kết quả theo từng dòng. |
| And | Dòng lỗi bị bỏ; dòng thiếu phản hồi ở trạng thái tắt; Cập nhật giữ mã, lịch sử tần suất và thống kê, chỉ ghi các cột cấu hình có trong tệp. |

