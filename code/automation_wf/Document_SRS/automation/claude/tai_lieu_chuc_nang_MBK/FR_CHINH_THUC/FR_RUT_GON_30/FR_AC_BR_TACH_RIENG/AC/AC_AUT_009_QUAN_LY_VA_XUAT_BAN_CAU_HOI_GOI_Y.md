# AC-AUT-009 — Quản lý và xuất bản câu hỏi gợi ý

> FR tham chiếu: FR-AUT-009

## AC-AUT-009-01: Lưu bốn câu hỏi

| Mục | Nội dung |
| --- | --- |
| Given | Danh sách đã có 3 câu hỏi hợp lệ. |
| When | Người dùng thêm câu hỏi thứ 4. |
| Then | Hệ thống chấp nhận bản nháp. |
| And | Nút thêm mới không cho tạo câu hỏi thứ 5. |

## AC-AUT-009-02: Chặn câu hỏi thứ năm

| Mục | Nội dung |
| --- | --- |
| Given | Danh sách đã có 4 câu hỏi. |
| When | Người dùng cố thêm câu hỏi thứ 5. |
| Then | Hệ thống chặn thao tác và nêu giới hạn 4. |
| And | Bốn câu hỏi hiện có không bị thay đổi. |

## AC-AUT-009-03: Kiểm tra 45 và 46 ký tự

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang nhập nội dung câu hỏi. |
| When | Người dùng lần lượt nhập 45 ký tự và 46 ký tự. |
| Then | Nội dung 45 ký tự được chấp nhận; 46 ký tự bị chặn. |
| And | Hệ thống chỉ rõ giới hạn tại trường nội dung. |

## AC-AUT-009-04: Gỡ toàn bộ câu hỏi

| Mục | Nội dung |
| --- | --- |
| Given | Bản đang áp dụng có câu hỏi và bản nháp là danh sách rỗng. |
| When | Người dùng xác nhận xuất bản danh sách rỗng và kênh báo thành công. |
| Then | Hệ thống gỡ toàn bộ câu hỏi khỏi kênh. |
| And | Trạng thái xuất bản và lịch sử được cập nhật. |

## AC-AUT-009-05: Không gỡ khi xuất bản danh sách rỗng lỗi

| Mục | Nội dung |
| --- | --- |
| Given | Bản đang áp dụng có câu hỏi và bản nháp là danh sách rỗng. |
| When | Người dùng xác nhận xuất bản nhưng kênh báo lỗi. |
| Then | Hệ thống giữ nguyên danh sách đang áp dụng. |
| And | Bản nháp rỗng được giữ để thử lại. |

## AC-AUT-009-06: Giữ bản cũ khi xuất bản lỗi

| Mục | Nội dung |
| --- | --- |
| Given | Một bản câu hỏi mới đang được xuất bản. |
| When | Kênh trả về thất bại. |
| Then | Khách tiếp tục thấy bản xuất bản thành công gần nhất. |
| And | Lỗi được hiển thị mà không làm mất bản nháp. |

