# AC-AUT-007 — Quản lý menu tùy chỉnh

> FR tham chiếu: FR-AUT-007

## AC-AUT-007-01: Tạo menu hợp lệ

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng có quyền và đã chọn đúng kênh. |
| When | Người dùng tạo menu có tên duy nhất và các mục hợp lệ. |
| Then | Hệ thống lưu menu mới. |
| And | Menu chưa tự động được gán cho khách. |

## AC-AUT-007-02: Xóa menu có khách sử dụng

| Mục | Nội dung |
| --- | --- |
| Given | Menu tùy chỉnh đang được một hoặc nhiều khách sử dụng. |
| When | Người dùng xác nhận xóa menu. |
| Then | Hệ thống gỡ menu khỏi khách và đưa họ về menu mặc định. |
| And | Mọi cấu hình tham chiếu menu bị xóa hiển thị Cần cấu hình lại. |

## AC-AUT-007-03: Gán lại cùng menu

| Mục | Nội dung |
| --- | --- |
| Given | Khách đã được gán menu tùy chỉnh A. |
| When | Người dùng gán lại chính menu A. |
| Then | Hệ thống không tạo quan hệ thứ hai. |
| And | Khách vẫn có đúng một menu riêng. |

## AC-AUT-007-04: Gán menu mới thay menu cũ

| Mục | Nội dung |
| --- | --- |
| Given | Khách đang dùng menu A và menu B cùng kênh đã được áp dụng. |
| When | Người dùng gán menu B cho khách. |
| Then | Menu B thay thế menu A. |
| And | Khách chỉ còn một menu tùy chỉnh trên kênh. |

## AC-AUT-007-05: Sao chép không mang dữ liệu sử dụng

| Mục | Nội dung |
| --- | --- |
| Given | Menu nguồn đang có khách sử dụng và lịch sử hoạt động. |
| When | Người dùng sao chép menu. |
| Then | Hệ thống tạo menu mới có cùng cấu hình. |
| And | Menu mới không có khách được gán và không có kết quả hoạt động của menu nguồn. |

## AC-AUT-007-06: Từ chối menu không hợp lệ

| Mục | Nội dung |
| --- | --- |
| Given | Menu đích là bản nháp, sai kênh hoặc đã bị xóa. |
| When | Người dùng gán menu đó cho khách. |
| Then | Hệ thống từ chối thao tác. |
| And | Menu hiện tại của khách được giữ nguyên. |

