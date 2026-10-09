# AC-AUT-029 — Tự động cập nhật thông tin khách hàng

> FR tham chiếu: FR-AUT-029

## AC-AUT-029-01: Ghi từ nguồn được hỗ trợ

| Mục | Nội dung |
| --- | --- |
| Given | Trường đích hợp lệ và nguồn là giá trị cố định, biến hoặc kết quả Thu thập thông tin, AI, API. |
| When | Chức năng gọi yêu cầu cập nhật. |
| Then | Hệ thống đọc đúng nguồn và kiểm tra kiểu dữ liệu. |
| And | Giá trị hợp lệ được ghi vào đúng trường của đúng khách. |

## AC-AUT-029-02: Từ chối sai kiểu dữ liệu

| Mục | Nội dung |
| --- | --- |
| Given | Giá trị nguồn không thể chuyển sang kiểu của trường đích. |
| When | Hệ thống thực hiện cập nhật. |
| Then | Hệ thống từ chối và nêu lỗi kiểu dữ liệu. |
| And | Giá trị cũ của trường được giữ. |

## AC-AUT-029-03: Cập nhật nhiều trường tuần tự

| Mục | Nội dung |
| --- | --- |
| Given | Chức năng gọi cần cập nhật từ hai trường trở lên. |
| When | Hệ thống nhận danh sách nhiều hành động, mỗi hành động một trường. |
| Then | Các hành động được thực hiện tuần tự. |
| And | Kết quả và lịch sử được ghi riêng cho từng trường. |

## AC-AUT-029-04: Chỉ khi trống không ghi đè

| Mục | Nội dung |
| --- | --- |
| Given | Trường đích đang có giá trị và cách ghi là Chỉ khi trống. |
| When | Hệ thống nhận yêu cầu cập nhật. |
| Then | Hệ thống không thay giá trị hiện tại. |
| And | Kết quả nêu rõ yêu cầu bị bỏ qua do trường không trống. |

## AC-AUT-029-05: Ghi đè giá trị hiện tại

| Mục | Nội dung |
| --- | --- |
| Given | Trường đích có giá trị cũ và cách ghi là Ghi đè. |
| When | Hệ thống nhận giá trị mới hợp lệ. |
| Then | Hệ thống thay giá trị cũ bằng giá trị mới. |
| And | Lịch sử lưu giá trị trước, sau, nguồn và thời gian. |

## AC-AUT-029-06: Cùng giá trị không tạo thay đổi trùng

| Mục | Nội dung |
| --- | --- |
| Given | Giá trị mới sau chuẩn hóa giống giá trị hiện tại. |
| When | Hệ thống nhận yêu cầu cập nhật. |
| Then | Hệ thống trả thành công nhưng không ghi thay đổi dữ liệu trùng. |
| And | Giá trị hiện tại được giữ nguyên. |

