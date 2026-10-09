# AC-AUT-001 — Biên soạn nội dung tin nhắn

> FR tham chiếu: FR-AUT-001

## AC-AUT-001-01: Lưu nội dung hợp lệ

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng có quyền chỉnh sửa và bước tin nhắn có ít nhất một khối hợp lệ. |
| When | Người dùng lưu bản nháp. |
| Then | Hệ thống lưu đúng nội dung và thứ tự các khối. |
| And | Bản nháp không được gửi cho khách. |

## AC-AUT-001-02: Văn bản 1.200 ký tự không có nút

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn không có nút và phần văn bản có đúng 1.200 ký tự. |
| When | Người dùng lưu nội dung. |
| Then | Hệ thống chấp nhận nội dung. |
| And | Bộ đếm hiển thị đã đạt giới hạn. |

## AC-AUT-001-03: Chặn văn bản 1.201 ký tự không có nút

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn không có nút và phần văn bản có 1.201 ký tự. |
| When | Người dùng lưu nội dung. |
| Then | Hệ thống chặn lưu và chỉ rõ lỗi vượt giới hạn. |
| And | Nội dung đang soạn được giữ nguyên để chỉnh sửa. |

## AC-AUT-001-04: Văn bản 640 ký tự có nút

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn có ít nhất một nút và phần văn bản có đúng 640 ký tự. |
| When | Người dùng lưu nội dung. |
| Then | Hệ thống chấp nhận nội dung. |
| And | Nút và văn bản vẫn giữ đúng cấu hình. |

## AC-AUT-001-05: Chặn văn bản 641 ký tự có nút

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn có ít nhất một nút và phần văn bản có 641 ký tự. |
| When | Người dùng lưu nội dung. |
| Then | Hệ thống chặn lưu và chỉ rõ giới hạn 640 ký tự. |
| And | Nội dung đang soạn không bị mất. |

## AC-AUT-001-06: Kiểm tra giới hạn ảnh

| Mục | Nội dung |
| --- | --- |
| Given | Kênh cho phép ảnh 5 MB hoặc lớn hơn. |
| When | Người dùng tải ảnh đúng 5 MB rồi tải ảnh lớn hơn 5 MB. |
| Then | Hệ thống chấp nhận ảnh 5 MB và từ chối ảnh vượt 5 MB. |
| And | Nếu giới hạn kênh thấp hơn 5 MB thì hệ thống áp dụng giới hạn thấp hơn. |

## AC-AUT-001-07: Kiểm tra giới hạn video, âm thanh và tệp

| Mục | Nội dung |
| --- | --- |
| Given | Kênh cho phép tệp 25 MB hoặc lớn hơn. |
| When | Người dùng tải tệp đúng 25 MB rồi tải tệp lớn hơn 25 MB. |
| Then | Hệ thống chấp nhận tệp 25 MB và từ chối tệp vượt 25 MB. |
| And | Nếu giới hạn kênh thấp hơn 25 MB thì hệ thống áp dụng giới hạn thấp hơn. |

## AC-AUT-001-08: Xem thử biến thông tin

| Mục | Nội dung |
| --- | --- |
| Given | Nội dung có biến thông tin còn hiệu lực. |
| When | Người dùng mở xem thử. |
| Then | Hệ thống hiển thị giá trị mẫu thay cho biến. |
| And | Hệ thống không dùng dữ liệu khách thật và không ghi thống kê thật. |

