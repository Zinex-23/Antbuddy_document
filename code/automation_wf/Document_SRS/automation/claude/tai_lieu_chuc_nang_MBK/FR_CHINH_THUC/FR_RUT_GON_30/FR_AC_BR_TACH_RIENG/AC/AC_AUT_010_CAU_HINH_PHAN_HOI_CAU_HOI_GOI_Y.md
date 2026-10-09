# AC-AUT-010 — Cấu hình phản hồi câu hỏi gợi ý

> FR tham chiếu: FR-AUT-010

## AC-AUT-010-01: Cấu hình phản hồi chính

| Mục | Nội dung |
| --- | --- |
| Given | Câu hỏi đã tồn tại và người dùng có quyền. |
| When | Người dùng chọn một trong 3 phản hồi chính, nhập đủ dữ liệu và lưu. |
| Then | Hệ thống lưu phản hồi cho đúng câu hỏi. |
| And | Câu hỏi đủ điều kiện để xuất bản. |

## AC-AUT-010-02: Không chạy bổ sung khi phản hồi chính lỗi

| Mục | Nội dung |
| --- | --- |
| Given | Câu hỏi có phản hồi chính và các hành động bổ sung. |
| When | Khách chọn câu hỏi nhưng phản hồi chính lỗi. |
| Then | Hệ thống dừng xử lý câu hỏi. |
| And | Không hành động bổ sung nào được thực hiện. |

## AC-AUT-010-03: Không dò Từ khóa với lượt chọn FAQ

| Mục | Nội dung |
| --- | --- |
| Given | Một câu hỏi đã xuất bản có nội dung trùng với một Từ khóa đang bật. |
| When | Khách bấm câu hỏi gợi ý. |
| Then | Hệ thống chạy phản hồi của FAQ. |
| And | Quy tắc Từ khóa không được kích hoạt bởi lượt bấm này. |

## AC-AUT-010-04: Không xử lý lại lượt chọn lặp

| Mục | Nội dung |
| --- | --- |
| Given | Một lượt chọn FAQ đã được xử lý. |
| When | Hệ thống nhận lại cùng mã sự kiện. |
| Then | Hệ thống trả kết quả cũ và không chạy lại phản hồi. |
| And | Hành động bổ sung và thống kê không tăng thêm. |
