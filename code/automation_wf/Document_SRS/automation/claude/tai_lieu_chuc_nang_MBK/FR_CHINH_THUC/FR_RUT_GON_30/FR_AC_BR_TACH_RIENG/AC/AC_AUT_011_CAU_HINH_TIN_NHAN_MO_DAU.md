# AC-AUT-011 — Cấu hình tin nhắn mở đầu

> FR tham chiếu: FR-AUT-011

## AC-AUT-011-01: Không bật khi thiếu nội dung

| Mục | Nội dung |
| --- | --- |
| Given | Cấu hình chưa có nội dung hoặc luồng hợp lệ. |
| When | Người dùng bật Tin nhắn mở đầu. |
| Then | Hệ thống từ chối bật và chỉ rõ nội dung còn thiếu. |
| And | Trạng thái đang áp dụng không thay đổi. |

## AC-AUT-011-02: Lưu đúng kênh

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng có quyền và đã chọn kênh A. |
| When | Người dùng lưu nội dung hợp lệ. |
| Then | Hệ thống lưu cấu hình cho kênh A. |
| And | Cấu hình của kênh khác không bị thay đổi. |

## AC-AUT-011-03: Tắt không xóa nội dung

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn mở đầu đang bật và có nội dung hợp lệ. |
| When | Người dùng tắt chức năng. |
| Then | Hệ thống ngừng gửi mới. |
| And | Nội dung đã lưu vẫn còn để chỉnh sửa hoặc bật lại. |

## AC-AUT-011-04: Bật lại bằng cấu hình hợp lệ

| Mục | Nội dung |
| --- | --- |
| Given | Tin nhắn mở đầu đang tắt và nội dung đã lưu vẫn hợp lệ. |
| When | Người dùng bật lại chức năng. |
| Then | Hệ thống áp dụng nội dung đã lưu. |
| And | Không tạo bản nội dung trùng. |

## AC-AUT-011-05: Từ chối nội dung sai kênh

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đang cấu hình kênh A nhưng chọn luồng thuộc kênh B. |
| When | Người dùng lưu hoặc bật chức năng. |
| Then | Hệ thống từ chối áp dụng. |
| And | Cấu hình hợp lệ gần nhất của kênh A được giữ. |

## AC-AUT-011-06: Ngừng gửi khi luồng bị xóa

| Mục | Nội dung |
| --- | --- |
| Given | Cấu hình đang tham chiếu một luồng đã bị xóa. |
| When | Có sự kiện gửi mới. |
| Then | Hệ thống không gửi tin nhắn mở đầu. |
| And | Cấu hình hiển thị Cần cấu hình lại. |

