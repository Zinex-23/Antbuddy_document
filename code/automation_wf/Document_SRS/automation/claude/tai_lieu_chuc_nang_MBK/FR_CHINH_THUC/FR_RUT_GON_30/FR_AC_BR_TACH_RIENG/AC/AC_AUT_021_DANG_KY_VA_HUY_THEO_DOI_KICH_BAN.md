# AC-AUT-021 — Đăng ký và hủy theo dõi kịch bản

> FR tham chiếu: FR-AUT-021

## AC-AUT-021-01: Đăng ký khách mới

| Mục | Nội dung |
| --- | --- |
| Given | Khách hợp lệ và kịch bản đang bật, hoàn tất. |
| When | Người dùng hoặc quy luật yêu cầu đăng ký. |
| Then | Hệ thống tạo một tiến trình theo phiên bản hiện hành. |
| And | Lịch được tính từ thời điểm đăng ký. |

## AC-AUT-021-02: Đăng ký lặp giữ tiến trình cũ

| Mục | Nội dung |
| --- | --- |
| Given | Khách đang có tiến trình hoạt động trong kịch bản. |
| When | Hệ thống nhận thêm yêu cầu đăng ký cùng kịch bản. |
| Then | Hệ thống không tạo tiến trình thứ hai. |
| And | Tiến trình, bước hiện tại và lịch cũ được giữ nguyên. |

## AC-AUT-021-03: Đăng ký lại sau trạng thái cuối

| Mục | Nội dung |
| --- | --- |
| Given | Tiến trình trước của khách đã Hoàn thành, Đã hủy hoặc Thất bại. |
| When | Có yêu cầu đăng ký lại vào kịch bản đang bật. |
| Then | Hệ thống tạo tiến trình mới từ bước đầu theo phiên bản hiện hành. |
| And | Lịch mới tính từ thời điểm đăng ký lại. |

## AC-AUT-021-04: Phân biệt đăng ký và hủy khi kịch bản tắt

| Mục | Nội dung |
| --- | --- |
| Given | Kịch bản đã tắt và khách đang có tiến trình hoạt động. |
| When | Hệ thống nhận một yêu cầu đăng ký mới và một yêu cầu hủy tiến trình cũ. |
| Then | Yêu cầu đăng ký mới bị từ chối; yêu cầu hủy được chấp nhận. |
| And | Mỗi yêu cầu có kết quả và lý do riêng. |

## AC-AUT-021-05: Hủy ngăn bước chưa chạy

| Mục | Nội dung |
| --- | --- |
| Given | Khách có tiến trình hoạt động với các bước còn chờ. |
| When | Người dùng hoặc quy luật hủy theo dõi. |
| Then | Hệ thống chuyển tiến trình sang Đã hủy và không chạy các bước còn lại. |
| And | Lịch sử các bước đã thực hiện vẫn được giữ. |

## AC-AUT-021-06: Không hỗ trợ tạm dừng

| Mục | Nội dung |
| --- | --- |
| Given | Khách đang có tiến trình hoạt động. |
| When | Người dùng tìm thao tác Tạm dừng hoặc Tiếp tục. |
| Then | Hệ thống không cung cấp hai thao tác này. |
| And | Các trạng thái chỉ gồm Đang chạy, Hoàn thành, Đã hủy và Thất bại. |

