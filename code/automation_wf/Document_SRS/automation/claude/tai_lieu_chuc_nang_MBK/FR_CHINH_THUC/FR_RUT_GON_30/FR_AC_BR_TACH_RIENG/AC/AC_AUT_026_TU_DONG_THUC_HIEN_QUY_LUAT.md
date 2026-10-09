# AC-AUT-026 — Tự động thực hiện quy luật

> FR tham chiếu: FR-AUT-026

## AC-AUT-026-01: Chạy nhiều quy luật đúng thứ tự

| Mục | Nội dung |
| --- | --- |
| Given | Một sự kiện khớp nhiều quy luật đang bật và đủ điều kiện. |
| When | Hệ thống bắt đầu xử lý. |
| Then | Các quy luật chạy tuần tự theo thứ tự ưu tiên. |
| And | Không có hai quy luật trong cùng danh sách chạy song song. |

## AC-AUT-026-02: Hành động sau quyết định trạng thái cuối

| Mục | Nội dung |
| --- | --- |
| Given | Hai quy luật tuần tự cập nhật cùng trường, menu, trạng thái bot hoặc nhãn. |
| When | Cả hai quy luật hoàn tất. |
| Then | Trạng thái cuối là kết quả của hành động chạy sau. |
| And | Lịch sử vẫn lưu kết quả riêng của từng hành động. |

## AC-AUT-026-03: Lỗi một quy luật không chặn quy luật sau

| Mục | Nội dung |
| --- | --- |
| Given | Quy luật A lỗi và quy luật B đứng sau vẫn đủ điều kiện. |
| When | Hệ thống chốt lỗi của A. |
| Then | Hệ thống tiếp tục đánh giá và chạy B. |
| And | Lịch sử phân biệt kết quả của A và B. |

## AC-AUT-026-04: Không tự chạy lại trong chuỗi

| Mục | Nội dung |
| --- | --- |
| Given | Một hành động của quy luật tạo sự kiện có thể kích hoạt lại chính quy luật đó. |
| When | Hệ thống xử lý sự kiện phát sinh trong cùng chuỗi nguyên nhân. |
| Then | Hệ thống chặn lần chạy lại của chính quy luật. |
| And | Lý do chống vòng lặp được ghi nhận. |

## AC-AUT-026-05: Chặn cấp phát sinh thứ sáu

| Mục | Nội dung |
| --- | --- |
| Given | Chuỗi hành động đã phát sinh sự kiện tới đủ 5 cấp. |
| When | Một hành động cố tạo cấp thứ 6. |
| Then | Hệ thống chặn cấp thứ 6. |
| And | Các kết quả đã hoàn thành ở 5 cấp trước không bị hoàn tác. |

## AC-AUT-026-06: Không chạy lại sự kiện lặp

| Mục | Nội dung |
| --- | --- |
| Given | Một sự kiện đã có kết quả theo quy luật và phiên bản. |
| When | Hệ thống nhận lại cùng mã sự kiện. |
| Then | Hệ thống trả kết quả đã có. |
| And | Không hành động nào bị thực hiện lần hai. |

