# AC-AUT-012 — Tự động gửi tin nhắn mở đầu

> FR tham chiếu: FR-AUT-012

## AC-AUT-012-01: Gửi một lần cho sự kiện Get Started

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn mở đầu đang bật và khách phát sinh sự kiện Get Started hợp lệ. |
| When | Hệ thống nhận sự kiện lần đầu. |
| Then | Hệ thống gửi đúng một lời chào. |
| And | Kết quả được ghi theo mã sự kiện. |

## AC-AUT-012-02: Không gửi lại cùng mã sự kiện

| Mục | Nội dung |
| --- | --- |
| Given | Một sự kiện Get Started đã được xử lý. |
| When | Hệ thống nhận lại cùng mã sự kiện. |
| Then | Hệ thống không gửi lời chào lần hai. |
| And | Thống kê không tăng thêm lượt gửi. |

## AC-AUT-012-03: Xử lý sự kiện Get Started mới

| Mục | Nội dung |
| --- | --- |
| Given | Khách đã từng nhận lời chào và kênh phát sinh một sự kiện Get Started mới có mã mới. |
| When | Hệ thống nhận sự kiện mới hợp lệ. |
| Then | Hệ thống xử lý đây là tương tác mới. |
| And | Kết quả không bị nhầm với sự kiện cũ. |

## AC-AUT-012-04: Không gửi vì khách chỉ quay lại

| Mục | Nội dung |
| --- | --- |
| Given | Khách đã từng tương tác và không có sự kiện Get Started mới. |
| When | Khách quay lại sau một khoảng im lặng. |
| Then | Hệ thống không tự gửi lại lời chào. |
| And | Tin khách gửi vẫn được xử lý theo thứ tự ưu tiên. |

## AC-AUT-012-05: Tiếp tục xử lý tin đầu tiên

| Mục | Nội dung |
| --- | --- |
| Given | Kênh không có Get Started và tin đầu tiên của khách được dùng làm sự kiện thay thế. |
| When | Hệ thống gửi lời chào. |
| Then | Tin đầu tiên vẫn được chuyển sang lớp xử lý tiếp theo. |
| And | Tin không bị lời chào tiêu thụ hoặc bỏ mất. |

## AC-AUT-012-06: Không gửi khi bot hoặc hội thoại không đủ điều kiện

| Mục | Nội dung |
| --- | --- |
| Given | Bot đang tạm dừng, cấu hình đã tắt hoặc hội thoại đã được nhân viên tiếp quản. |
| When | Hệ thống nhận sự kiện bắt đầu. |
| Then | Hệ thống không gửi lời chào. |
| And | Lý do bỏ qua được ghi nhận. |

