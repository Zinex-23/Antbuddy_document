# AC-AUT-018 — Tự động xử lý tin nhắn khớp Từ khóa

> FR tham chiếu: FR-AUT-018

## AC-AUT-018-01: Chọn quy tắc duy nhất

| Mục | Nội dung |
| --- | --- |
| Given | Một tin chỉ khớp một quy tắc đang bật và đủ tần suất. |
| When | Hệ thống xử lý tin. |
| Then | Hệ thống chọn đúng quy tắc đó. |
| And | Phản hồi được tạo tối đa một lần. |

## AC-AUT-018-02: Chọn quy tắc ưu tiên

| Mục | Nội dung |
| --- | --- |
| Given | Một tin khớp nhiều quy tắc đang bật. |
| When | Hệ thống xử lý theo danh sách hiện hành. |
| Then | Quy tắc đứng cao nhất được chọn. |
| And | Kiểu khớp không tạo ưu tiên ngầm khác. |

## AC-AUT-018-03: Không dùng quy tắc thấp hơn khi phản hồi lỗi

| Mục | Nội dung |
| --- | --- |
| Given | Quy tắc ưu tiên đã được chọn và phản hồi của nó lỗi. |
| When | Hệ thống xử lý lỗi hoặc thử lại. |
| Then | Hệ thống chỉ giữ phản hồi đã chọn. |
| And | Không quy tắc thấp hơn và không phản hồi mặc định nào chạy cho cùng tin. |

## AC-AUT-018-04: Thử lại không tạo tác động trùng

| Mục | Nội dung |
| --- | --- |
| Given | Phản hồi của quy tắc đã chọn đang được thử lại. |
| When | Kết quả cũ đến muộn hoặc yêu cầu thử lại bị nhận lặp. |
| Then | Hệ thống chỉ ghi một kết quả cuối cho phản hồi đã chọn. |
| And | Hành động đã thành công không bị thực hiện lại. |

## AC-AUT-018-05: Chuyển lớp khi không có quy tắc khớp

| Mục | Nội dung |
| --- | --- |
| Given | Không quy tắc đang bật nào khớp tin. |
| When | Hệ thống hoàn tất dò Từ khóa. |
| Then | Tin được chuyển sang AI/NLU. |
| And | Chỉ khi AI/NLU không xử lý thì mới xét phản hồi mặc định. |

## AC-AUT-018-06: Không xử lý tin thuộc phiên thu thập

| Mục | Nội dung |
| --- | --- |
| Given | Khách đang có phiên Thu thập thông tin chờ câu trả lời. |
| When | Khách gửi một tin đồng thời khớp Từ khóa. |
| Then | FR-AUT-028 nhận tin trước. |
| And | FR-AUT-018 không gửi phản hồi Từ khóa. |

