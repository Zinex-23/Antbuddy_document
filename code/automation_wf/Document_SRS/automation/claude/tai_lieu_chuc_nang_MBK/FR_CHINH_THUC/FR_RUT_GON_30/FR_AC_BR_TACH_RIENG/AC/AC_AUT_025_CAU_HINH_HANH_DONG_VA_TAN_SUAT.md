# AC-AUT-025 — Cấu hình hành động và tần suất

> FR tham chiếu: FR-AUT-025

## AC-AUT-025-01: Chọn đúng danh mục hành động

| Mục | Nội dung |
| --- | --- |
| Given | Quy luật đã tồn tại. |
| When | Người dùng thêm một hành động. |
| Then | Hệ thống chỉ cho chọn trong 8 hành động được công bố. |
| And | Trường bắt buộc thay đổi đúng theo loại hành động. |

## AC-AUT-025-02: Ghi nhận Chỉ 1 lần trước hành động đầu

| Mục | Nội dung |
| --- | --- |
| Given | Quy luật Chỉ 1 lần đã đủ điều kiện chạy cho khách. |
| When | Hệ thống tạo lần chạy hợp lệ. |
| Then | Lịch sử Chỉ 1 lần được ghi trước hành động đầu tiên. |
| And | Sự kiện mới của cùng khách không tạo lần chạy thứ hai. |

## AC-AUT-025-03: Lỗi không cho sự kiện khác chạy lại

| Mục | Nội dung |
| --- | --- |
| Given | Lần chạy Chỉ 1 lần đã được ghi nhưng một hành động bị lỗi. |
| When | Một sự kiện mới cùng quy luật phát sinh cho khách. |
| Then | Hệ thống không tạo lần chạy mới. |
| And | Người dùng chỉ có thể thử lại lần chạy cũ. |

## AC-AUT-025-04: Thử lại không lặp hành động đã thành công

| Mục | Nội dung |
| --- | --- |
| Given | Chuỗi có hành động 1 thành công và hành động 2 lỗi tạm thời. |
| When | Hệ thống thử lại. |
| Then | Hệ thống chỉ thử lại hành động 2. |
| And | Hành động 1 không tạo tác động lần hai. |

## AC-AUT-025-05: Chặn xung đột trong cùng quy luật

| Mục | Nội dung |
| --- | --- |
| Given | Hai hành động trong cùng quy luật tạo xung đột có thể xác định trước. |
| When | Người dùng bật quy luật. |
| Then | Hệ thống cảnh báo và chặn bật. |
| And | Người dùng phải sửa danh sách hành động trước khi tiếp tục. |

## AC-AUT-025-06: Dừng chuỗi sau lỗi cuối

| Mục | Nội dung |
| --- | --- |
| Given | Một hành động tiếp tục lỗi sau đủ số lần thử lại. |
| When | Hệ thống chốt lỗi cuối. |
| Then | Các hành động còn lại trong quy luật không được chạy. |
| And | Hành động đã thành công trước đó không bị hoàn tác. |

