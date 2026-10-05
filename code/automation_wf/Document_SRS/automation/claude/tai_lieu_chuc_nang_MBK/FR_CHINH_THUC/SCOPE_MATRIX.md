# Ma trận sở hữu phạm vi

## 1. Owner theo năng lực

| Năng lực/dữ liệu | FR Owner | Consumer | Ranh giới không được vượt |
| --- | --- | --- | --- |
| Menu fallback duy nhất, item của Menu mặc định và publish | FR-001 | FR-002, 008 | Không quản lý gán menu riêng hoặc item của Menu tùy chỉnh |
| Catalog Menu tùy chỉnh, item của Menu tùy chỉnh, customer–menu assignment | FR-002 | FR-008 | Không sửa Menu mặc định; chỉ dùng chung contract item/action |
| FAQ item, thứ tự, click | FR-003 | FR-011 | Không xử lý text tự do |
| Cấu hình và send-attempt đầu phiên | FR-004 | FR-011 | Không định nghĩa session vòng đời khác |
| Keyword catalog, matcher, winner, response | FR-005 | FR-008, 011 | Không xử lý câu trả lời form |
| Tag catalog, membership, add/remove command | FR-006 | FR-007, 008, 011 | Không sở hữu User Field |
| Sequence, step, enrollment, schedule | FR-007 | FR-008, 011 | Không sở hữu action đích |
| Rule, trigger, condition, action orchestration | FR-008 | FR-011 | Không định nghĩa lại nghiệp vụ action |
| Update job, mapping, transform, field-write result | FR-009 | FR-008, 010, 011 | Không quản lý hội thoại hỏi–đáp |
| Form, question, capture session, validation | FR-010 | FR-008, 011 | Không quản lý schema User Field |
| Metric dictionary, fact, aggregation, export | FR-011 | Tất cả FR chỉ phát event | Không thay đổi dữ liệu nghiệp vụ nguồn |
| Fallback config, cooldown reservation và delivery attempt | FR-012 | FR-011 | Chỉ chạy với `message.unhandled`; không thay Keyword, NLU hoặc Form |

## 2. Phân biệt các cặp dễ chồng lấn

| Cặp | Quyết định phân ranh |
| --- | --- |
| Menu mặc định / Menu tùy chỉnh | FR-001 sở hữu fallback singleton. FR-002 sở hữu catalog menu riêng và assignment. Resolver ưu tiên assignment hợp lệ, nếu không thì trả Menu mặc định. |
| Từ khóa / Thu thập thông tin | Khi capture session đang `WAITING`, FR-010 độc quyền nhận tin nhắn; FR-005 không match cùng input. |
| Quy tắc / Tự động cập nhật User Field | FR-008 quyết định khi nào gọi action. FR-009 quyết định map/transform/validate/write và xử lý xung đột. |
| Thu thập thông tin / User Field | FR-010 thu và validate câu trả lời theo câu hỏi; sau đó gọi command do FR-009 cung cấp. |
| Nhãn / User Field | Nhãn là membership nhiều–nhiều dùng phân nhóm. User Field là giá trị có kiểu theo schema. Không dùng nhãn thay field hoặc ngược lại. |
| Kịch bản / Quy tắc | Kịch bản thực thi nhiều bước theo timeline sau ghi danh. Quy tắc phản ứng event và điều phối action tức thời. |
| Thống kê / FR nguồn | FR nguồn phát event bất biến. FR-011 định nghĩa cách khử trùng, attribution và hiển thị; không ghi ngược vào FR nguồn. |
| Từ khóa / Tin nhắn mặc định | FR-005 chọn winner trước. FR-012 chỉ nhận `message.unhandled` sau khi Keyword, NLU và handler ưu tiên đều không xử lý. |

## 3. Quy tắc tiếp nhận yêu cầu mới

1. Xác định dữ liệu hoặc state bị thay đổi.
2. Chọn đúng Owner theo bảng trên.
3. BR và AC chính chỉ viết tại Owner; Consumer ghi dependency/input/output.
4. Nếu một transaction chạm nhiều Owner, dùng command/event và `correlationId`, không truy cập trực tiếp bảng dữ liệu của nhau.
5. Năng lực mới không khớp Owner nào phải tạo FR mới, không nhét vào FR gần tên nhất.
