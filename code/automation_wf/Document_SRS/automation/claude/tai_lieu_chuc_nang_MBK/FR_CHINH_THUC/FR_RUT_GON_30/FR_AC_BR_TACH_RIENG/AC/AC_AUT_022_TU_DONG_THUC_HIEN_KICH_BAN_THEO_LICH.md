# AC-AUT-022 — Tự động thực hiện kịch bản theo lịch

> FR tham chiếu: FR-AUT-022

## AC-AUT-022-01: Thử lại tối đa ba lần

| Mục | Nội dung |
| --- | --- |
| Given | Bước gặp lỗi tạm thời và chưa từng thành công. |
| When | Hệ thống thực hiện cơ chế thử lại. |
| Then | Hệ thống tạo tối đa 3 lần thử lại. |
| And | Trước mỗi lần thử, hệ thống xác nhận tiến trình vẫn đang chạy và bước chưa thành công. |

## AC-AUT-022-02: Không thử lại lỗi vĩnh viễn

| Mục | Nội dung |
| --- | --- |
| Given | Kênh trả về lỗi được phân loại vĩnh viễn. |
| When | Hệ thống xử lý kết quả lỗi. |
| Then | Hệ thống không tạo lần thử lại. |
| And | Bước chuyển trạng thái cuối theo đúng loại bước. |

## AC-AUT-022-03: Tin nhắn lỗi cuối vẫn tiếp tục lịch

| Mục | Nội dung |
| --- | --- |
| Given | Bước Tin nhắn đã thất bại sau lần thử cuối và lỗi không phải khách chặn/từ chối. |
| When | Hệ thống chốt kết quả bước. |
| Then | Bước được đánh dấu Thất bại. |
| And | Tiến trình tiếp tục lịch bước sau. |

## AC-AUT-022-04: Hành động lỗi cuối dừng tiến trình

| Mục | Nội dung |
| --- | --- |
| Given | Bước Hành động dữ liệu thất bại sau lần thử cuối. |
| When | Hệ thống chốt kết quả bước. |
| Then | Tiến trình chuyển sang Thất bại. |
| And | Các bước chưa chạy không được thực hiện. |

## AC-AUT-022-05: Khách chặn hoặc từ chối nhận tin

| Mục | Nội dung |
| --- | --- |
| Given | Kênh trả kết quả khách chặn hoặc từ chối nhận tin. |
| When | Hệ thống xử lý lỗi. |
| Then | Tiến trình bị hủy. |
| And | Không bước chăm sóc còn lại nào được gửi. |

## AC-AUT-022-06: Bỏ qua khi điều kiện không đạt

| Mục | Nội dung |
| --- | --- |
| Given | Bước đến hạn nhưng dữ liệu khách không đạt điều kiện. |
| When | Hệ thống đánh giá điều kiện. |
| Then | Bước được đánh dấu Bỏ qua với lý do. |
| And | Tiến trình tiếp tục theo lịch sau. |

## AC-AUT-022-07: Không tạo tác động trùng

| Mục | Nội dung |
| --- | --- |
| Given | Một công việc thực hiện bước đã có kết quả cuối. |
| When | Hệ thống nhận lại cùng mã công việc. |
| Then | Hệ thống trả kết quả đã có. |
| And | Tin nhắn hoặc hành động không bị thực hiện lần hai. |

