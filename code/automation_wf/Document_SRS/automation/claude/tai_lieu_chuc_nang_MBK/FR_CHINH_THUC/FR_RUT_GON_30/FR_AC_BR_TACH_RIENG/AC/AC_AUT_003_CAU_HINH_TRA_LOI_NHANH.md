# AC-AUT-003 — Cấu hình trả lời nhanh

> FR tham chiếu: FR-AUT-003

## AC-AUT-003-01: Lưu 13 trả lời nhanh

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn đã có 12 trả lời nhanh hợp lệ. |
| When | Người dùng thêm lựa chọn thứ 13 và lưu. |
| Then | Hệ thống chấp nhận danh sách 13 lựa chọn. |
| And | Danh sách xem trước giữ đúng thứ tự. |

## AC-AUT-003-02: Chặn lựa chọn thứ 14

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn đã có 13 trả lời nhanh. |
| When | Người dùng chọn thêm lựa chọn thứ 14. |
| Then | Hệ thống chặn thao tác và nêu giới hạn 13. |
| And | Mười ba lựa chọn hiện có không bị thay đổi. |

## AC-AUT-003-03: Kiểm tra tên 20 và 21 ký tự

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang cấu hình trả lời nhanh. |
| When | Người dùng lần lượt nhập tên 20 ký tự và 21 ký tự. |
| Then | Tên 20 ký tự được chấp nhận; tên 21 ký tự bị chặn. |
| And | Hệ thống chỉ rõ giới hạn tại trường tên. |

## AC-AUT-003-04: Chỉ xử lý lựa chọn hợp lệ đầu tiên

| Mục | Nội dung |
| --- | --- |
| Given | Một tin nhắn có danh sách trả lời nhanh còn hiệu lực. |
| When | Khách chọn một lựa chọn hợp lệ rồi chọn lựa chọn khác trong cùng danh sách. |
| Then | Hệ thống chỉ chạy kết quả của lựa chọn đầu tiên. |
| And | Lựa chọn sau không tạo tác động. |

## AC-AUT-003-05: Từ chối lựa chọn sai tin nhắn hoặc hết hiệu lực

| Mục | Nội dung |
| --- | --- |
| Given | Khách có nhiều tin nhắn chứa trả lời nhanh hoặc danh sách đã hết hiệu lực. |
| When | Hệ thống nhận lựa chọn không thuộc đúng tin nhắn hoặc lựa chọn cũ. |
| Then | Hệ thống không chạy kết quả. |
| And | Lý do từ chối được ghi nhận. |

## AC-AUT-003-06: Không xử lý lại sự kiện lặp

| Mục | Nội dung |
| --- | --- |
| Given | Một lựa chọn hợp lệ đã được xử lý. |
| When | Hệ thống nhận lại cùng mã sự kiện lựa chọn. |
| Then | Hệ thống trả kết quả cũ và không chạy lại hành động. |
| And | Thống kê không tăng thêm lượt. |

