# AC-AUT-020 — Cấu hình bước và lịch chăm sóc

> FR tham chiếu: FR-AUT-020

## AC-AUT-020-01: Tính Sau X từ lúc đăng ký

| Mục | Nội dung |
| --- | --- |
| Given | Khách đăng ký kịch bản tại thời điểm T0 và bước có lịch Sau X. |
| When | Hệ thống tính thời điểm bước. |
| Then | Thời điểm dự kiến bằng T0 cộng X. |
| And | Thời điểm không phụ thuộc lúc bước trước hoàn thành. |

## AC-AUT-020-02: Dời bước ngoài khung gửi

| Mục | Nội dung |
| --- | --- |
| Given | Bước đến hạn ngoài khung 08:30–18:00 theo múi giờ kênh. |
| When | Hệ thống lập lịch thực hiện. |
| Then | Bước được dời tới đầu khung hợp lệ gần nhất. |
| And | Bước không bị bỏ qua chỉ vì đến hạn ngoài khung. |

## AC-AUT-020-03: Bỏ qua mốc cố định đã qua

| Mục | Nội dung |
| --- | --- |
| Given | Khách đăng ký sau ngày giờ cố định của một bước. |
| When | Hệ thống lập lịch tiến trình. |
| Then | Bước đó được đánh dấu Bỏ qua với lý do mốc đã qua. |
| And | Các bước khác tiếp tục theo quy tắc của chúng. |

## AC-AUT-020-04: Kiểm tra điều kiện khi đến hạn

| Mục | Nội dung |
| --- | --- |
| Given | Bước có điều kiện dựa trên dữ liệu khách. |
| When | Bước đến thời điểm thực hiện. |
| Then | Hệ thống đọc dữ liệu và đánh giá điều kiện tại thời điểm đó. |
| And | Chỉ khách đạt điều kiện mới nhận tác động. |

## AC-AUT-020-05: Giữ lịch của phiên bản cũ

| Mục | Nội dung |
| --- | --- |
| Given | Khách đang chạy phiên bản A và người dùng lưu phiên bản B có lịch khác. |
| When | Hệ thống tiếp tục tiến trình của khách cũ. |
| Then | Khách cũ dùng lịch của phiên bản A. |
| And | Khách đăng ký mới dùng phiên bản B. |

## AC-AUT-020-06: Xử lý giờ mùa hè

| Mục | Nội dung |
| --- | --- |
| Given | Múi giờ kênh có thời điểm không tồn tại hoặc bị lặp do đổi giờ mùa hè. |
| When | Hệ thống tính lịch bước rơi vào thời điểm đó. |
| Then | Giờ không tồn tại được dời tới thời điểm hợp lệ tiếp theo; giờ lặp chỉ tạo một lần chạy. |
| And | Lịch sử ghi thời điểm thực tế và múi giờ. |

