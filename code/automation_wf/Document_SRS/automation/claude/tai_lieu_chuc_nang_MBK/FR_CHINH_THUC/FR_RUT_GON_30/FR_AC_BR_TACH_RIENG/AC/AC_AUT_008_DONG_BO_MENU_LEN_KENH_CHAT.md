# AC-AUT-008 — Đồng bộ menu lên kênh chat

> FR tham chiếu: FR-AUT-008

## AC-AUT-008-01: Chặn menu rỗng

| Mục | Nội dung |
| --- | --- |
| Given | Menu không có mục nào. |
| When | Người dùng chọn Áp dụng. |
| Then | Hệ thống chặn đồng bộ và nêu lỗi menu rỗng. |
| And | Bản đang áp dụng trước đó vẫn được giữ. |

## AC-AUT-008-02: Áp dụng phiên bản thành công

| Mục | Nội dung |
| --- | --- |
| Given | Menu có phiên bản hợp lệ và kênh đang kết nối. |
| When | Kênh xác nhận đồng bộ thành công. |
| Then | Hệ thống đánh dấu đúng phiên bản là đang áp dụng. |
| And | Khách chỉ thấy phiên bản mới sau xác nhận. |

## AC-AUT-008-03: Giữ bản cũ khi đồng bộ lỗi

| Mục | Nội dung |
| --- | --- |
| Given | Khách đang thấy phiên bản A và phiên bản B được gửi lên kênh. |
| When | Kênh báo phiên bản B thất bại. |
| Then | Hệ thống tiếp tục giữ phiên bản A. |
| And | Bản B vẫn sẵn sàng để sửa hoặc thử lại. |

## AC-AUT-008-04: Không để kết quả cũ ghi đè

| Mục | Nội dung |
| --- | --- |
| Given | Phiên bản B đang đồng bộ, sau đó phiên bản C được đồng bộ và áp dụng thành công. |
| When | Xác nhận thành công của phiên bản B đến muộn. |
| Then | Hệ thống không thay phiên bản C bằng B. |
| And | Bản nháp mới hơn, nếu có, không bị mất. |

## AC-AUT-008-05: Thử lại không tạo tác động trùng

| Mục | Nội dung |
| --- | --- |
| Given | Một yêu cầu đồng bộ thất bại hoặc bị nhận lại. |
| When | Người dùng chọn Thử lại hoặc hệ thống nhận lại cùng yêu cầu. |
| Then | Hệ thống dùng đúng phiên bản và không tạo menu trùng. |
| And | Lịch sử liên kết lần thử với yêu cầu ban đầu. |

## AC-AUT-008-06: Kiểm tra lần gửi chưa rõ kết quả

| Mục | Nội dung |
| --- | --- |
| Given | Lần đồng bộ trước đã gửi nhưng chưa có kết quả cuối. |
| When | Người dùng chọn Thử lại. |
| Then | Hệ thống kiểm tra trạng thái lần gửi trước trước khi gửi lại. |
| And | Nếu lần trước đã thành công thì không tạo yêu cầu mới. |

