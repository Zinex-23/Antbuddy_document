# AC-AUT-016 — Quản lý trạng thái và ưu tiên Từ khóa

> FR tham chiếu: FR-AUT-016

## AC-AUT-016-01: Quy tắc tắt không được chọn

| Mục | Nội dung |
| --- | --- |
| Given | Một quy tắc khớp nội dung nhưng đang tắt. |
| When | Hệ thống xử lý tin mới. |
| Then | Quy tắc tắt không nằm trong danh sách được xét. |
| And | Hệ thống tiếp tục với quy tắc hợp lệ khác hoặc lớp tiếp theo. |

## AC-AUT-016-02: Không bật quy tắc chưa hoàn tất

| Mục | Nội dung |
| --- | --- |
| Given | Quy tắc thiếu phản hồi hoặc cần cấu hình lại. |
| When | Người dùng bật riêng lẻ hoặc qua thao tác hàng loạt. |
| Then | Hệ thống giữ quy tắc ở trạng thái tắt. |
| And | Kết quả nêu rõ lý do không thể bật. |

## AC-AUT-016-03: Xóa giữ thống kê cũ

| Mục | Nội dung |
| --- | --- |
| Given | Quy tắc đã có lịch sử và thống kê. |
| When | Người dùng xác nhận xóa quy tắc. |
| Then | Quy tắc không còn được dùng cho tin mới. |
| And | Số liệu lịch sử vẫn có thể truy vết. |

## AC-AUT-016-04: Đổi thứ tự thay đổi quy tắc được chọn

| Mục | Nội dung |
| --- | --- |
| Given | Hai quy tắc đang bật cùng khớp một tin. |
| When | Người dùng đổi thứ tự và hệ thống xử lý một tin mới cùng nội dung. |
| Then | Quy tắc đứng cao hơn theo thứ tự mới được chọn. |
| And | Tin đã xử lý trước đó không bị chạy lại. |

## AC-AUT-016-05: Báo kết quả thao tác hàng loạt

| Mục | Nội dung |
| --- | --- |
| Given | Danh sách chọn gồm quy tắc đầy đủ và chưa hoàn tất. |
| When | Người dùng bật hàng loạt. |
| Then | Hệ thống chỉ bật các quy tắc đủ điều kiện. |
| And | Kết quả phân biệt mục thành công, bị bỏ qua và lý do. |

