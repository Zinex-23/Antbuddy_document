# AC-AUT-014 — Tự động phản hồi khi bot không hiểu

> FR tham chiếu: FR-AUT-014

## AC-AUT-014-01: Không gửi khi lớp ưu tiên đã xử lý

| Mục | Nội dung |
| --- | --- |
| Given | Tin khách đã được Thu thập thông tin, Từ khóa hoặc AI/NLU xử lý. |
| When | Hệ thống đi tới bước kiểm tra phản hồi mặc định. |
| Then | Hệ thống không gửi phản hồi mặc định. |
| And | Lý do bỏ qua được ghi đúng lớp đã xử lý. |

## AC-AUT-014-02: Chỉ gửi một lần cho hai tin đồng thời

| Mục | Nội dung |
| --- | --- |
| Given | Khách ngoài khoảng nghỉ và tần suất không cho phép hai lần gửi. |
| When | Hai tin chưa được lớp ưu tiên xử lý đến gần như đồng thời. |
| Then | Hệ thống chỉ tạo một lần gửi phản hồi mặc định. |
| And | Tin còn lại được ghi nhận là không đủ điều kiện tần suất. |

## AC-AUT-014-03: Gửi thất bại không bắt đầu khoảng nghỉ

| Mục | Nội dung |
| --- | --- |
| Given | Khách đủ điều kiện nhận phản hồi mặc định. |
| When | Kênh trả kết quả gửi thất bại. |
| Then | Hệ thống không ghi thời điểm bắt đầu khoảng nghỉ. |
| And | Lần xử lý sau vẫn đánh giá theo lần gửi thành công gần nhất. |

## AC-AUT-014-04: Gửi thành công bắt đầu khoảng nghỉ

| Mục | Nội dung |
| --- | --- |
| Given | Khách đủ điều kiện và kênh xác nhận gửi thành công. |
| When | Hệ thống hoàn tất lần gửi. |
| Then | Khoảng nghỉ bắt đầu tại thời điểm xác nhận thành công. |
| And | Lịch sử lưu đúng khách và kênh. |

## AC-AUT-014-05: Không xử lý tin từ nguồn bị loại

| Mục | Nội dung |
| --- | --- |
| Given | Tin do bot, automation hoặc nhân viên gửi. |
| When | Hệ thống nhận tin. |
| Then | Hệ thống không kích hoạt phản hồi mặc định. |
| And | Không có lần gửi hoặc thống kê phản hồi mới. |

## AC-AUT-014-06: Kiểm tra lại điều kiện trước gửi trễ

| Mục | Nội dung |
| --- | --- |
| Given | Một phản hồi mặc định đã được xếp lịch với độ trễ. |
| When | Đến thời điểm gửi, cấu hình đã tắt, bot tạm dừng hoặc nhân viên đã tiếp quản. |
| Then | Hệ thống không gửi phản hồi. |
| And | Lý do hủy được ghi nhận. |

