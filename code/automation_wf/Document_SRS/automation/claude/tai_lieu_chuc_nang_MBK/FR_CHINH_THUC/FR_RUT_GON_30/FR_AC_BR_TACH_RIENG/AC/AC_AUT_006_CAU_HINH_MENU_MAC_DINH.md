# AC-AUT-006 — Cấu hình menu mặc định

> FR tham chiếu: FR-AUT-006

## AC-AUT-006-01: Lưu menu 20 mục

| Mục | Nội dung |
| --- | --- |
| Given | Menu mặc định đã có 19 mục hợp lệ. |
| When | Người dùng thêm mục thứ 20 và lưu. |
| Then | Hệ thống chấp nhận bản nháp. |
| And | Bộ đếm hiển thị đủ 20 mục. |

## AC-AUT-006-02: Chặn mục thứ 21

| Mục | Nội dung |
| --- | --- |
| Given | Menu mặc định đã có 20 mục. |
| When | Người dùng thêm mục thứ 21. |
| Then | Hệ thống chặn thao tác và nêu giới hạn 20. |
| And | Hai mươi mục hiện có không bị thay đổi. |

## AC-AUT-006-03: Kiểm tra tên mục 30 và 31 ký tự

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang cấu hình một mục menu. |
| When | Người dùng lần lượt nhập tên 30 ký tự và 31 ký tự. |
| Then | Tên 30 ký tự được chấp nhận; tên 31 ký tự bị chặn. |
| And | Hệ thống chỉ rõ giới hạn tại trường tên. |

## AC-AUT-006-04: Ưu tiên menu riêng

| Mục | Nội dung |
| --- | --- |
| Given | Khách có một menu tùy chỉnh hợp lệ đã được gán. |
| When | Khách mở lại hội thoại sau khi menu mặc định được cập nhật. |
| Then | Hệ thống tiếp tục hiển thị menu riêng của khách. |
| And | Khách không bị chuyển về menu mặc định. |

## AC-AUT-006-05: Không chuyển menu khi hành động chính lỗi

| Mục | Nội dung |
| --- | --- |
| Given | Một mục được cấu hình hành động chính và chuyển menu sau khi bấm. |
| When | Khách bấm mục và hành động chính trả lỗi. |
| Then | Hệ thống không chuyển khách sang menu đích. |
| And | Lỗi của hành động chính được ghi nhận. |

## AC-AUT-006-06: Bản nháp không ảnh hưởng khách

| Mục | Nội dung |
| --- | --- |
| Given | Menu mặc định đang có một bản áp dụng và một bản nháp mới. |
| When | Người dùng chỉ lưu bản nháp. |
| Then | Khách tiếp tục thấy bản đã áp dụng. |
| And | Bản nháp được giữ để chỉnh sửa hoặc đồng bộ sau. |

