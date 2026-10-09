# AC-AUT-019 — Quản lý kịch bản chăm sóc

> FR tham chiếu: FR-AUT-019

## AC-AUT-019-01: Chặn xóa khi còn tiến trình

| Mục | Nội dung |
| --- | --- |
| Given | Kịch bản còn một hoặc nhiều tiến trình đang hoạt động. |
| When | Người dùng yêu cầu xóa. |
| Then | Hệ thống chặn xóa và nêu lý do. |
| And | Thông báo hiển thị đúng số tiến trình cần xử lý trước. |

## AC-AUT-019-02: Tắt chỉ chặn đăng ký mới

| Mục | Nội dung |
| --- | --- |
| Given | Kịch bản đang có khách tham gia. |
| When | Người dùng tắt kịch bản rồi có yêu cầu đăng ký khách mới. |
| Then | Hệ thống từ chối đăng ký mới. |
| And | Khách đang tham gia tiếp tục theo phiên bản đã đăng ký. |

## AC-AUT-019-03: Xóa khi không còn tiến trình

| Mục | Nội dung |
| --- | --- |
| Given | Kịch bản không còn tiến trình hoạt động. |
| When | Người dùng xác nhận xóa. |
| Then | Hệ thống xóa hoặc ẩn cấu hình khỏi danh sách hoạt động. |
| And | Lịch sử thực hiện vẫn được giữ. |

## AC-AUT-019-04: Sao chép không mang dữ liệu vận hành

| Mục | Nội dung |
| --- | --- |
| Given | Kịch bản nguồn có khách tham gia và kết quả thực hiện. |
| When | Người dùng sao chép kịch bản. |
| Then | Hệ thống tạo kịch bản mới có cùng cấu hình. |
| And | Bản sao không có khách, tiến trình, kết quả hoặc số liệu của nguồn. |

## AC-AUT-019-05: Không bật kịch bản chưa hoàn tất

| Mục | Nội dung |
| --- | --- |
| Given | Kịch bản chưa có bước hợp lệ hoặc còn bước Cần cấu hình lại. |
| When | Người dùng bật kịch bản. |
| Then | Hệ thống từ chối bật. |
| And | Trạng thái và lỗi được hiển thị rõ. |

