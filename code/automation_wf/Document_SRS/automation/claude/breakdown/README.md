# Danh mục Functional Requirement Automation

## 1. Cách đọc bộ tài liệu

Bộ tài liệu được chia theo nguyên tắc: một năng lực nghiệp vụ chỉ có một FR sở hữu. FR khác được phép gọi hoặc phụ thuộc vào năng lực đó nhưng không mô tả lại quy tắc xử lý.

Mỗi FR trả lời bốn câu hỏi:

1. FR này giải quyết việc gì?
2. Nội dung nào nằm trong phạm vi?
3. Nội dung nào chắc chắn không nằm trong phạm vi?
4. FR này sở hữu dữ liệu nào?

Chi tiết Business Rule nằm tại [BR_AUTOMATION.md](BR_AUTOMATION.md). Chi tiết Acceptance Criteria nằm tại [AC_AUTOMATION.md](AC_AUTOMATION.md). Trong từng FR chỉ ghi mã tham chiếu.

### Thuật ngữ dùng chung

| Thuật ngữ | Cách hiểu trong bộ tài liệu |
| --- | --- |
| Owner | FR duy nhất chịu trách nhiệm định nghĩa và thay đổi một năng lực hoặc loại dữ liệu |
| Consumer | FR sử dụng kết quả do Owner cung cấp nhưng không định nghĩa lại quy tắc |
| Bản nháp, Draft | Cấu hình đang chỉnh sửa, chưa ảnh hưởng tới khách hàng |
| Bản đã xuất bản, Published | Phiên bản cấu hình mà hệ thống runtime được phép sử dụng |
| Runtime | Xử lý thật khi hệ thống nhận sự kiện hoặc tương tác của khách hàng |
| Action, Hành động | Việc hệ thống thực hiện sau một trigger hoặc thao tác của khách |
| Idempotent, chống xử lý trùng | Cùng một yêu cầu được gửi lại nhưng không tạo thêm kết quả ngoài ý muốn |
| Dependency | FR hoặc dịch vụ phải cung cấp đầu vào để FR hiện tại hoạt động |

## 2. Nhóm FR nền tảng dùng chung

| Mã | Chức năng | Trách nhiệm duy nhất |
| --- | --- | --- |
| FR-AUT-001 | Phạm vi trang và phân quyền Automation | Chọn trang, trạng thái kết nối và quyền truy cập |
| FR-AUT-002 | Trình soạn nội dung tin nhắn dùng chung | Soạn và kiểm tra cấu trúc nội dung tin nhắn |
| FR-AUT-003 | Cấu hình nút và hành động dùng chung | Chuẩn hóa loại action và payload của action |
| FR-AUT-004 | Quản lý bản nháp và xuất bản cấu hình | Vòng đời draft, publish, version và conflict |

## 3. Nhóm FR nghiệp vụ

| Miền nghiệp vụ | Mã | Chức năng | Trách nhiệm duy nhất |
| --- | --- | --- | --- |
| Menu chính | FR-AUT-005 | Danh mục Menu chính | Metadata và CRUD menu |
| Menu chính | FR-AUT-006 | Biên tập cấu trúc Menu chính | Các mục và thứ tự trong menu |
| Menu chính | FR-AUT-007 | Phân phối và đo lường Menu chính | Menu khách nhìn thấy, click và thống kê |
| FAQ | FR-AUT-008 | Quản lý Câu hỏi thường gặp | Cấu hình danh sách FAQ |
| FAQ | FR-AUT-009 | Hiển thị và xử lý Câu hỏi thường gặp | Runtime click và thống kê FAQ |
| Tin nhắn mở đầu | FR-AUT-010 | Cấu hình Tin nhắn mở đầu | Cấu hình nội dung và trạng thái bật |
| Tin nhắn mở đầu | FR-AUT-011 | Gửi và đo lường Tin nhắn mở đầu | Nhận diện phiên mới, gửi và thống kê |
| Tin nhắn mặc định | FR-AUT-012 | Cấu hình Tin nhắn mặc định | Cấu hình fallback và tần suất |
| Tin nhắn mặc định | FR-AUT-013 | Gửi và đo lường Tin nhắn mặc định | Điều phối fallback, gửi và thống kê |
| Từ khóa | FR-AUT-014 | Danh mục và nhập Từ khóa | Metadata, import và thứ tự ưu tiên |
| Từ khóa | FR-AUT-015 | Cấu hình điều kiện khớp Từ khóa | Biểu thức và quy tắc so khớp |
| Từ khóa | FR-AUT-016 | Xử lý phản hồi Từ khóa | Chọn từ khóa thắng, gửi phản hồi và thống kê |
| Kịch bản chăm sóc | FR-AUT-017 | Danh mục Kịch bản chăm sóc | Metadata và CRUD kịch bản |
| Kịch bản chăm sóc | FR-AUT-018 | Cấu hình bước Kịch bản chăm sóc | Cấu trúc, thứ tự và thời gian chờ của bước |
| Kịch bản chăm sóc | FR-AUT-019 | Đăng ký và thực thi Kịch bản chăm sóc | Enrollment, scheduling, gửi và thống kê |
| Quy luật | FR-AUT-020 | Cấu hình Quy luật tự động | CRUD, trigger, điều kiện và action configuration |
| Quy luật | FR-AUT-021 | Thực thi Quy luật tự động | Nhận event, đánh giá và chạy action |

## 4. Quy tắc chống overlap

- Quy tắc soạn nội dung chỉ được định nghĩa tại FR-AUT-002.
- Schema và validation của action chỉ được định nghĩa tại FR-AUT-003.
- Draft, publish, version và cảnh báo rời trang chỉ được định nghĩa tại FR-AUT-004.
- FR cấu hình chỉ tạo hoặc thay đổi cấu hình; không mô tả việc gửi hay thực thi runtime.
- FR runtime chỉ đọc phiên bản cấu hình hợp lệ; không cho phép chỉnh sửa cấu hình.
- Thống kê thuộc FR runtime tạo ra event; màn cấu hình chỉ được đọc số liệu đó.
- Nếu một yêu cầu mới chạm nhiều FR, phải tách thành các phần theo chủ sở hữu trong [SCOPE_MATRIX.md](SCOPE_MATRIX.md), không sao chép cùng một quy tắc vào nhiều file.

## 5. Điều kiện hoàn thành một FR

- Toàn bộ AC được tham chiếu phải đạt.
- Không triển khai nội dung được ghi tại dòng Ngoài phạm vi.
- Dữ liệu ghi mới phải thuộc phần Dữ liệu sở hữu của FR hoặc đi qua contract của FR sở hữu.
- Dependency phải sẵn sàng hoặc được mock bằng contract đã thống nhất.
- Label, giới hạn và thông báo lỗi cụ thể phải theo thiết kế UI đã được duyệt gần nhất.
