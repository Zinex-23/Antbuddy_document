# AC-AUT-023 — Quản lý quy luật tự động

> FR tham chiếu: FR-AUT-023

## AC-AUT-023-01: Không bật quy luật thiếu cấu hình

| Mục | Nội dung |
| --- | --- |
| Given | Quy luật thiếu sự kiện hoặc không có hành động hợp lệ. |
| When | Người dùng bật quy luật. |
| Then | Hệ thống từ chối bật. |
| And | Phần cấu hình thiếu được chỉ rõ. |

## AC-AUT-023-02: Sao chép ở trạng thái tắt

| Mục | Nội dung |
| --- | --- |
| Given | Quy luật nguồn có lịch sử thực hiện và khách đã đạt tần suất Chỉ 1 lần. |
| When | Người dùng sao chép quy luật. |
| Then | Hệ thống tạo bản sao ở trạng thái tắt. |
| And | Bản sao không mang lịch sử thực hiện hoặc tần suất của nguồn. |

## AC-AUT-023-03: Tắt ngăn sự kiện mới

| Mục | Nội dung |
| --- | --- |
| Given | Quy luật đang bật. |
| When | Người dùng tắt quy luật rồi hệ thống nhận sự kiện mới. |
| Then | Quy luật không tạo lần chạy mới. |
| And | Lịch sử cũ vẫn được giữ. |

## AC-AUT-023-04: Xóa ngăn lần chạy mới và giữ lịch sử

| Mục | Nội dung |
| --- | --- |
| Given | Quy luật có lịch sử và không còn thao tác chỉnh sửa chưa lưu. |
| When | Người dùng xác nhận xóa. |
| Then | Hệ thống không cho quy luật xử lý sự kiện mới. |
| And | Số liệu và lịch sử cũ vẫn truy vết được. |

## AC-AUT-023-05: Lần chạy đã bắt đầu được hoàn tất

| Mục | Nội dung |
| --- | --- |
| Given | Một lần chạy đã bắt đầu trước thời điểm quy luật bị tắt hoặc xóa. |
| When | Hệ thống tiếp tục xử lý lần chạy đó. |
| Then | Lần chạy dùng phiên bản đã chốt tại lúc bắt đầu. |
| And | Không lần chạy mới nào được tạo sau thời điểm tắt hoặc xóa. |

