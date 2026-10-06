# Ma trận phạm vi chức năng

Ma trận này giúp xác định chức năng nào chịu trách nhiệm khi một yêu cầu liên quan nhiều phần. “Chịu trách nhiệm” nghĩa là chức năng thực sự thay đổi dữ liệu hoặc quyết định nghiệp vụ; “phối hợp” chỉ gửi yêu cầu hoặc dùng kết quả.

| Công việc | Chức năng chịu trách nhiệm | Chức năng phối hợp | Giới hạn phạm vi |
| --- | --- | --- | --- |
| Cấu hình và hiển thị menu dùng khi khách không có menu riêng | FR-AUT-001 | FR-AUT-002, FR-AUT-008 | Không quản lý việc gán Menu tùy chỉnh |
| Quản lý Menu tùy chỉnh và gán/gỡ menu cho khách | FR-AUT-002 | FR-AUT-001, FR-AUT-008 | Không sửa Menu mặc định; tạo menu không tự gán cho khách |
| Quản lý câu hỏi gợi ý và xử lý khi khách bấm | FR-AUT-003 | FR-AUT-011 | Không dò nội dung khách tự nhập |
| Cấu hình và gửi lời chào khi bắt đầu phiên | FR-AUT-004 | FR-AUT-011 | Không định nghĩa toàn bộ vòng đời phiên; không dùng như phản hồi khi bot không hiểu |
| Dò từ khóa, chọn một quy tắc và phản hồi | FR-AUT-005 | FR-AUT-008, FR-AUT-011 | Không xử lý câu trả lời khi FR-AUT-010 đang chờ |
| Tạo nhãn và gắn/gỡ nhãn cho khách | FR-AUT-006 | FR-AUT-007, FR-AUT-008, FR-AUT-011 | Không quản lý User Field; nhãn không tự đăng ký kịch bản nếu không có quy tắc |
| Quản lý chuỗi bước và khách tham gia theo thời gian | FR-AUT-007 | FR-AUT-008, FR-AUT-011 | Không tự sửa dữ liệu của hành động đích |
| Đánh giá KHI – NẾU – THÌ và điều phối hành động | FR-AUT-008 | FR-AUT-001/002/006/007/009/011 | Không tự ghi menu, nhãn, User Field hoặc trạng thái tham gia kịch bản |
| Chuyển đổi và cập nhật User Field | FR-AUT-009 | FR-AUT-008, FR-AUT-010, FR-AUT-011 | Không thiết kế hội thoại hỏi đáp; không tạo định nghĩa trường |
| Hỏi, kiểm tra và ghi nhận câu trả lời | FR-AUT-010 | FR-AUT-005, FR-AUT-009, FR-AUT-011 | Không tự định nghĩa hoặc ghi trực tiếp cấu trúc User Field |
| Định nghĩa chỉ số, tổng hợp và xuất báo cáo | FR-AUT-011 | Tất cả FR cung cấp kết quả | Không thay đổi dữ liệu nghiệp vụ nguồn; “đặt lại” không xóa lịch sử |
| Gửi phản hồi dự phòng và kiểm soát khoảng nghỉ | FR-AUT-012 | FR-AUT-005, FR-AUT-010, AI/kỹ năng, FR-AUT-011 | Chỉ chạy sau khi các chức năng ưu tiên không xử lý; không thay Từ khóa, AI hoặc biểu mẫu |

## Các ranh giới dễ nhầm

| Công việc cần phân biệt | Cách phân định |
| --- | --- |
| Menu mặc định và Menu tùy chỉnh | FR-AUT-002 cung cấp menu riêng nếu khách được gán hợp lệ; nếu không, FR-AUT-001 cung cấp Menu mặc định. |
| Từ khóa và Thu thập thông tin | Khi đang chờ câu trả lời, FR-AUT-010 nhận tin trước; FR-AUT-005 không phản hồi cùng tin. |
| Quy tắc và Cập nhật User Field | FR-AUT-008 quyết định khi nào yêu cầu cập nhật; FR-AUT-009 kiểm tra và ghi giá trị. |
| Thu thập thông tin và User Field | FR-AUT-010 hỏi và kiểm tra câu trả lời; FR-AUT-009 lưu giá trị vào hồ sơ. |
| Nhãn và User Field | Nhãn dùng để phân nhóm và một khách có thể có nhiều nhãn; User Field là một giá trị có kiểu trong hồ sơ. |
| Kịch bản và Quy tắc | Kịch bản chạy nhiều bước theo thời gian sau khi đăng ký; Quy tắc phản ứng với một tình huống và gọi hành động. |
| Số liệu và chức năng nguồn | Chức năng nguồn tạo kết quả; FR-AUT-011 tính và hiển thị nhưng không sửa lại kết quả nguồn. |
| Từ khóa và Tin nhắn mặc định | Từ khóa được kiểm tra trước; phản hồi dự phòng chỉ được xét khi Từ khóa, AI và các chức năng ưu tiên đều không xử lý. |

## Tiếp nhận yêu cầu mới

1. Xác định dữ liệu nào sẽ thay đổi và kết quả người dùng mong đợi.
2. Chọn chức năng chịu trách nhiệm theo bảng trên.
3. Viết quy tắc và tiêu chí nghiệm thu chính tại chức năng chịu trách nhiệm; chức năng phối hợp chỉ mô tả đầu vào, đầu ra và ảnh hưởng.
4. Nếu một yêu cầu chạm nhiều chức năng, mỗi chức năng vẫn tự chịu trách nhiệm với dữ liệu của mình và phải có mã liên kết để truy vết cùng một lần xử lý.
5. Năng lực không thuộc phạm vi nào cần một FR mới, không ghép vào FR chỉ vì tên gần giống.
