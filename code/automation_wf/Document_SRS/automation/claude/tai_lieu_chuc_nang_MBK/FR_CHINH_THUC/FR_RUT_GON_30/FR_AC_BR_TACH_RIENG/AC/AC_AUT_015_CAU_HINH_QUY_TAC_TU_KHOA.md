# AC-AUT-015 — Cấu hình quy tắc Từ khóa

> FR tham chiếu: FR-AUT-015

## AC-AUT-015-01: So khớp Có chứa và loại trừ

| Mục | Nội dung |
| --- | --- |
| Given | Quy tắc Có chứa hoặc Có chứa và không chứa đã được cấu hình. |
| When | Người dùng thử tin đáp ứng và tin vi phạm phần loại trừ. |
| Then | Tin đáp ứng được báo khớp; tin vi phạm được báo không khớp. |
| And | Kết quả thử chỉ rõ điều kiện quyết định. |

## AC-AUT-015-02: So khớp nhiều cụm

| Mục | Nội dung |
| --- | --- |
| Given | Quy tắc yêu cầu ít nhất một cụm hoặc tất cả cụm. |
| When | Người dùng thử các tin chứa một phần và đầy đủ các cụm. |
| Then | Hệ thống áp dụng đúng lựa chọn ít nhất một hoặc tất cả. |
| And | Phản hồi dự kiến được hiển thị khi tin khớp. |

## AC-AUT-015-03: So khớp loại nội dung và dữ liệu nhận diện

| Mục | Nội dung |
| --- | --- |
| Given | Quy tắc dùng loại nội dung hoặc nhận diện số điện thoại, email, sản phẩm POS. |
| When | Người dùng thử dữ liệu đúng và sai loại. |
| Then | Hệ thống chỉ báo khớp cho dữ liệu đáp ứng cách khớp. |
| And | Tin mẫu và xử lý thật dùng cùng kết quả. |

## AC-AUT-015-04: Kiểm tra đúng nguồn tin

| Mục | Nội dung |
| --- | --- |
| Given | Có hai quy tắc tương ứng Cho khách hàng và Cho trang. |
| When | Khách gửi tin rồi nhân viên của trang gửi cùng nội dung. |
| Then | Mỗi tin chỉ được xét trong đúng phạm vi của nó. |
| And | Tin do bot hoặc automation không được xét. |

## AC-AUT-015-05: Sửa không đặt lại Chỉ 1 lần

| Mục | Nội dung |
| --- | --- |
| Given | Khách đã sử dụng một quy tắc có tần suất Chỉ 1 lần. |
| When | Người dùng sửa nội dung quy tắc nhưng không tạo quy tắc mới. |
| Then | Lịch sử Chỉ 1 lần của khách được giữ. |
| And | Quy tắc không gửi lại cho khách đó. |

## AC-AUT-015-06: Kiểm tra độ trễ tối đa

| Mục | Nội dung |
| --- | --- |
| Given | Quy tắc đầy đủ và hợp lệ. |
| When | Người dùng lưu độ trễ đúng 24 giờ rồi lớn hơn 24 giờ. |
| Then | Giá trị 24 giờ được chấp nhận; giá trị vượt ngưỡng bị chặn. |
| And | Hệ thống chỉ rõ lỗi tại trường độ trễ. |

