# AC-AUT-002 — Cấu hình nút trong tin nhắn

> FR tham chiếu: FR-AUT-002

## AC-AUT-002-01: Lưu ba nút

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn có văn bản hợp lệ và đã có 2 nút hợp lệ. |
| When | Người dùng thêm nút thứ 3 rồi lưu. |
| Then | Hệ thống chấp nhận đủ 3 nút. |
| And | Thứ tự nút trong xem trước giống thứ tự đã lưu. |

## AC-AUT-002-02: Chặn nút thứ tư

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn đã có 3 nút. |
| When | Người dùng chọn thêm nút thứ 4. |
| Then | Hệ thống chặn thao tác và nêu giới hạn 3 nút. |
| And | Ba nút hiện có không bị thay đổi. |

## AC-AUT-002-03: Tên nút 20 ký tự

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang cấu hình một nút hợp lệ. |
| When | Người dùng nhập tên đúng 20 ký tự và lưu. |
| Then | Hệ thống chấp nhận tên nút. |
| And | Tên hiển thị đầy đủ trong xem trước. |

## AC-AUT-002-04: Chặn tên nút 21 ký tự

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang cấu hình một nút. |
| When | Người dùng nhập tên 21 ký tự. |
| Then | Hệ thống chặn lưu và chỉ rõ giới hạn 20 ký tự. |
| And | Các trường khác của nút được giữ nguyên. |

## AC-AUT-002-05: Thêm nút khi văn bản vượt 640 ký tự

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn chưa có nút và văn bản dài hơn 640 ký tự. |
| When | Người dùng chọn thêm nút đầu tiên. |
| Then | Hệ thống chặn thêm nút. |
| And | Nội dung văn bản đang soạn được giữ nguyên. |

## AC-AUT-002-06: Phân biệt sự kiện lặp và lượt bấm mới

| Mục | Nội dung |
| --- | --- |
| Given | Một lượt bấm đã được xử lý và lưu mã sự kiện. |
| When | Hệ thống nhận lại cùng mã sự kiện rồi nhận một lượt bấm mới có mã khác. |
| Then | Sự kiện lặp không chạy lại hành động; lượt bấm mới được xử lý. |
| And | Mỗi kết quả được ghi đúng mã sự kiện tương ứng. |

