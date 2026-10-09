# AC-AUT-013 — Cấu hình phản hồi mặc định

> FR tham chiếu: FR-AUT-013

## AC-AUT-013-01: Lưu cấu hình hợp lệ

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng chọn một luồng hợp lệ và các thiết lập trong giới hạn. |
| When | Người dùng lưu và bật phản hồi mặc định. |
| Then | Hệ thống áp dụng cấu hình cho đúng kênh. |
| And | AI, nếu có, chỉ xuất hiện dưới dạng bước trong luồng. |

## AC-AUT-013-02: Chấp nhận khoảng nghỉ tối thiểu

| Mục | Nội dung |
| --- | --- |
| Given | Cấu hình có khoảng nghỉ đúng 1 phút. |
| When | Người dùng lưu. |
| Then | Hệ thống chấp nhận giá trị. |
| And | Giá trị được hiển thị đúng đơn vị phút. |

## AC-AUT-013-03: Chặn khoảng nghỉ dưới ngưỡng

| Mục | Nội dung |
| --- | --- |
| Given | Cấu hình có khoảng nghỉ nhỏ hơn 1 phút. |
| When | Người dùng lưu. |
| Then | Hệ thống chặn lưu và nêu phạm vi hợp lệ. |
| And | Cấu hình đang áp dụng không bị thay đổi. |

## AC-AUT-013-04: Chấp nhận và chặn ngưỡng tối đa khoảng nghỉ

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang cấu hình khoảng nghỉ. |
| When | Người dùng lần lượt lưu giá trị 30 ngày và lớn hơn 30 ngày. |
| Then | Giá trị 30 ngày được chấp nhận; giá trị vượt 30 ngày bị chặn. |
| And | Hệ thống chỉ rõ giới hạn tại trường khoảng nghỉ. |

## AC-AUT-013-05: Kiểm tra độ trễ 0 và 24 giờ

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang cấu hình độ trễ. |
| When | Người dùng lần lượt lưu 0 và 24 giờ. |
| Then | Cả hai giá trị được chấp nhận. |
| And | Giá trị 0 được hiển thị là gửi ngay. |

## AC-AUT-013-06: Chặn độ trễ vượt 24 giờ

| Mục | Nội dung |
| --- | --- |
| Given | Cấu hình có độ trễ lớn hơn 24 giờ. |
| When | Người dùng lưu. |
| Then | Hệ thống chặn lưu và nêu giới hạn. |
| And | Cấu hình hợp lệ gần nhất được giữ. |

## AC-AUT-013-07: Áp dụng giá trị mặc định

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng tạo cấu hình mới và không thay đổi các giá trị mặc định. |
| When | Hệ thống hiển thị biểu mẫu. |
| Then | Khoảng nghỉ hiển thị 24 giờ và độ trễ hiển thị 0. |
| And | Người dùng nhìn thấy rõ đơn vị và ý nghĩa gửi ngay. |

