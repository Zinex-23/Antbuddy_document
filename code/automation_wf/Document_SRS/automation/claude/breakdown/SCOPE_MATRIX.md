# Ma trận sở hữu phạm vi Automation

## 1. Mục đích

Ma trận này là nguồn tham chiếu khi một yêu cầu có vẻ thuộc nhiều FR. Mỗi dòng chỉ có một FR Owner. FR Consumer được sử dụng kết quả nhưng không được định nghĩa lại quy tắc của Owner.

| Năng lực hoặc dữ liệu | FR Owner | FR Consumer chính | Ranh giới |
| --- | --- | --- | --- |
| Trang đang chọn, trạng thái kết nối, quyền | FR-AUT-001 | FR-AUT-005 đến FR-AUT-021 | Consumer không tự xây cơ chế chọn trang hoặc kiểm tra quyền riêng |
| Cấu trúc nội dung tin nhắn | FR-AUT-002 | FR-AUT-008, 010, 012, 016, 018 | Consumer chỉ giữ `contentGraphId` hoặc payload theo contract |
| Catalog và schema action | FR-AUT-003 | FR-AUT-006, 008, 018, 020 | Consumer không tự định nghĩa lại loại action và validation target |
| Draft, published version, publish status | FR-AUT-004 | Các FR cấu hình có publish | Consumer cung cấp payload nghiệp vụ; FR-AUT-004 quản lý lifecycle |
| Metadata Menu chính | FR-AUT-005 | FR-AUT-006, 007 | Không chứa menu item hoặc customer assignment |
| Menu item và thứ tự | FR-AUT-006 | FR-AUT-007 | Không xử lý click thực tế |
| Gán menu, click event, số liệu menu | FR-AUT-007 | FR-AUT-005 chỉ đọc thống kê | Không sửa menu metadata hoặc item |
| Cấu hình FAQ | FR-AUT-008 | FR-AUT-009 | Không xử lý tương tác thực tế |
| Tương tác và số liệu FAQ | FR-AUT-009 | FR-AUT-008 chỉ đọc thống kê | Không sửa câu hỏi hoặc action |
| Cấu hình Tin nhắn mở đầu | FR-AUT-010 | FR-AUT-011 | Không xác định session mới |
| Phiên gửi và số liệu Tin nhắn mở đầu | FR-AUT-011 | FR-AUT-010 chỉ đọc thống kê | Không sửa content graph |
| Cấu hình Tin nhắn mặc định | FR-AUT-012 | FR-AUT-013 | Không quyết định fallback tại runtime |
| Phiên gửi và số liệu Tin nhắn mặc định | FR-AUT-013 | FR-AUT-012 chỉ đọc thống kê | Không sửa cấu hình fallback |
| Metadata, import và thứ tự Từ khóa | FR-AUT-014 | FR-AUT-015, 016 | Không chứa logic biểu thức hoặc gửi phản hồi |
| Biểu thức khớp Từ khóa | FR-AUT-015 | FR-AUT-016 | Không quản lý thứ tự và không gửi phản hồi |
| Phản hồi, match event và số liệu Từ khóa | FR-AUT-016 | FR-AUT-014 chỉ đọc trạng thái | Không sửa biểu thức khớp |
| Metadata Kịch bản chăm sóc | FR-AUT-017 | FR-AUT-018, 019 | Không chứa bước hoặc enrollment |
| Bước, thứ tự và thời gian chờ | FR-AUT-018 | FR-AUT-019 | Không lập lịch hay gửi thật |
| Enrollment, scheduled step và execution | FR-AUT-019 | FR-AUT-017 chỉ đọc trạng thái | Không sửa metadata hoặc cấu trúc bước |
| Cấu hình Quy luật | FR-AUT-020 | FR-AUT-021 | Không nhận event hoặc chạy action thật |
| Event, rule execution và action execution | FR-AUT-021 | FR-AUT-020 chỉ đọc lịch sử | Không thay đổi cấu hình quy luật |

## 2. Quy tắc phân loại yêu cầu mới

1. Xác định dữ liệu bị tạo hoặc thay đổi.
2. Tra cột Năng lực hoặc dữ liệu để tìm FR Owner.
3. Ghi xử lý chính và BR tại FR Owner.
4. Tại FR Consumer chỉ ghi dependency, input và output cần dùng.
5. Nếu chưa có Owner phù hợp, tạo FR mới thay vì đưa cùng một xử lý vào nhiều FR.
