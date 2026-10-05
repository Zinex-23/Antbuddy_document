# Danh mục Acceptance Criteria Automation

## Quy ước

- Mỗi AC dùng cấu trúc GIVEN - WHEN - THEN và có thể chuyển trực tiếp thành test case.
- AC chỉ kiểm thử phạm vi của FR Owner; kiểm thử tích hợp được dẫn chiếu bằng Dependency.
- Kết quả THEN phải tuân theo BR cùng số thứ tự của FR tương ứng.

## FR-AUT-001: Phạm vi trang và phân quyền

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-001-01 | GIVEN người dùng đã đăng nhập và mở Automation; WHEN chưa chọn trang; THEN Chỉ tải dữ liệu Automation sau khi có `activePageId` hợp lệ. |
| AC-AUT-001-02 | GIVEN người dùng đã đăng nhập và mở Automation; WHEN người dùng mở hoặc thao tác trên trang; THEN Người dùng chỉ được xem hoặc sửa theo quyền trên trang đang chọn. |
| AC-AUT-001-03 | GIVEN người dùng đã đăng nhập và mở Automation; WHEN trang đang chọn mất kết nối; THEN Trang mất kết nối phải được hiển thị trạng thái và chặn thao tác cần connector. |
| AC-AUT-001-04 | GIVEN người dùng đã đăng nhập và mở Automation; WHEN người dùng đổi sang trang khác khi có thay đổi chưa lưu; THEN Đổi trang khi có dữ liệu chưa lưu phải yêu cầu người dùng xác nhận. |

## FR-AUT-002: Trình soạn nội dung tin nhắn

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-002-01 | GIVEN người dùng có quyền chỉnh sửa và đang mở trình soạn; WHEN người dùng lưu một bước nội dung; THEN Mỗi bước phải có ít nhất một block nội dung hợp lệ. |
| AC-AUT-002-02 | GIVEN người dùng có quyền chỉnh sửa và đang mở trình soạn; WHEN người dùng liên kết bước tiếp theo; THEN Liên kết `nextStepId` phải trỏ đến bước tồn tại và không tạo vòng lặp ngoài quy tắc cho phép. |
| AC-AUT-002-03 | GIVEN người dùng có quyền chỉnh sửa và đang mở trình soạn; WHEN người dùng thêm media, template hoặc biến; THEN Media, template và biến phải tương thích với capability của kênh. |
| AC-AUT-002-04 | GIVEN người dùng có quyền chỉnh sửa và đang mở trình soạn; WHEN người dùng thêm nút hoặc trả lời nhanh; THEN Nút và trả lời nhanh phải dùng schema action do FR-AUT-003 cung cấp. |
| AC-AUT-002-05 | GIVEN người dùng có quyền chỉnh sửa và đang mở trình soạn; WHEN người dùng chọn Xem thử; THEN Preview phải phản ánh bản nháp hiện tại nhưng không tạo event gửi thật. |

## FR-AUT-003: Nút và hành động dùng chung

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-003-01 | GIVEN popup cấu hình action đang mở; WHEN người dùng chọn action cho nút; THEN Mỗi nút chỉ có một action chính. |
| AC-AUT-003-02 | GIVEN popup cấu hình action đang mở; WHEN người dùng lưu action; THEN Các trường target bắt buộc được xác định theo loại action. |
| AC-AUT-003-03 | GIVEN popup cấu hình action đang mở; WHEN kênh không hỗ trợ một loại action; THEN Action không được hỗ trợ bởi kênh phải bị ẩn hoặc vô hiệu hóa có giải thích. |
| AC-AUT-003-04 | GIVEN popup cấu hình action đang mở; WHEN người dùng đổi loại action; THEN Thay đổi loại action phải xóa các trường không còn thuộc schema mới. |
| AC-AUT-003-05 | GIVEN popup cấu hình action đang mở; WHEN người dùng thêm action bổ sung; THEN Action bổ sung chỉ được lưu khi thỏa điều kiện của nghiệp vụ gọi. |

## FR-AUT-004: Bản nháp và xuất bản

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-004-01 | GIVEN người dùng đang chỉnh sửa một cấu hình Automation; WHEN người dùng thay đổi và lưu nháp; THEN Chỉnh sửa chỉ tác động bản nháp cho đến khi xuất bản thành công. |
| AC-AUT-004-02 | GIVEN người dùng đang chỉnh sửa một cấu hình Automation; WHEN người dùng chọn Xuất bản với dữ liệu lỗi; THEN Chỉ cấu hình vượt qua toàn bộ validation mới được xuất bản. |
| AC-AUT-004-03 | GIVEN người dùng đang chỉnh sửa một cấu hình Automation; WHEN xuất bản hoàn tất; THEN Mỗi lần xuất bản thành công phải tạo phiên bản có thể truy vết. |
| AC-AUT-004-04 | GIVEN người dùng đang chỉnh sửa một cấu hình Automation; WHEN dữ liệu trên máy chủ đã có phiên bản mới hơn; THEN Xung đột phiên bản phải được phát hiện trước khi ghi đè. |
| AC-AUT-004-05 | GIVEN người dùng đang chỉnh sửa một cấu hình Automation; WHEN đồng bộ connector thất bại; THEN Lỗi đồng bộ connector không được làm mất bản nháp và phải cho phép retry an toàn. |

## FR-AUT-005: Danh mục Menu chính

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-005-01 | GIVEN người dùng có quyền quản lý Menu chính trên trang đang chọn; WHEN người dùng tải hoặc tạo danh mục menu; THEN Mỗi trang có đúng một Menu mặc định; Menu tùy chỉnh có tên phân biệt theo quy tắc hệ thống. |
| AC-AUT-005-02 | GIVEN người dùng có quyền quản lý Menu chính trên trang đang chọn; WHEN người dùng yêu cầu xóa Menu mặc định; THEN Không cho xóa Menu mặc định. |
| AC-AUT-005-03 | GIVEN người dùng có quyền quản lý Menu chính trên trang đang chọn; WHEN người dùng xóa Menu tùy chỉnh đang được gán; THEN Không cho xóa Menu tùy chỉnh đang còn được gán nếu chưa xử lý fallback. |
| AC-AUT-005-04 | GIVEN người dùng có quyền quản lý Menu chính trên trang đang chọn; WHEN người dùng nhân bản một menu; THEN Nhân bản menu chỉ sao chép cấu hình, không sao chép assignment hoặc analytics. |

## FR-AUT-006: Cấu trúc Menu chính

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-006-01 | GIVEN người dùng đang chỉnh sửa một menu; WHEN menu đã có 20 mục và người dùng thêm mục; THEN Một menu có tối đa 20 mục. |
| AC-AUT-006-02 | GIVEN người dùng đang chỉnh sửa một menu; WHEN người dùng lưu tiêu đề mục; THEN Tiêu đề mục menu là bắt buộc và tối đa 30 ký tự. |
| AC-AUT-006-03 | GIVEN người dùng đang chỉnh sửa một menu; WHEN người dùng xuất bản menu có mục thiếu action; THEN Mỗi mục phải có action hợp lệ trước khi publish. |
| AC-AUT-006-04 | GIVEN người dùng đang chỉnh sửa một menu; WHEN người dùng thay đổi thứ tự và lưu; THEN Thứ tự hiển thị phải theo thứ tự người dùng đã lưu. |
| AC-AUT-006-05 | GIVEN người dùng đang chỉnh sửa một menu; WHEN người dùng chọn menu đích cho thao tác chuyển menu; THEN Chuyển menu chỉ được trỏ tới Menu tùy chỉnh hợp lệ của cùng trang. |

## FR-AUT-007: Phân phối Menu chính

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-007-01 | GIVEN khách hàng tương tác với trang có cấu hình menu; WHEN khách không có assignment hợp lệ mở menu; THEN Khách không có assignment hợp lệ phải nhìn thấy Menu mặc định. |
| AC-AUT-007-02 | GIVEN khách hàng tương tác với trang có cấu hình menu; WHEN hệ thống tạo hoặc cập nhật assignment; THEN Assignment Menu tùy chỉnh chỉ áp dụng trong cùng trang. |
| AC-AUT-007-03 | GIVEN khách hàng tương tác với trang có cấu hình menu; WHEN hệ thống nhận lại cùng một click; THEN Mỗi click chỉ được thực thi một lần theo khóa idempotency. |
| AC-AUT-007-04 | GIVEN khách hàng tương tác với trang có cấu hình menu; WHEN menu đang được gán không còn hợp lệ; THEN Khi menu được gán không còn hợp lệ, hệ thống phải fallback và ghi nhận nguyên nhân. |

## FR-AUT-008: Quản lý FAQ

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-008-01 | GIVEN người dùng đang cấu hình FAQ của một trang; WHEN đã có 4 câu hỏi và người dùng thêm câu hỏi; THEN Mỗi trang có tối đa 4 câu hỏi FAQ đang cấu hình. |
| AC-AUT-008-02 | GIVEN người dùng đang cấu hình FAQ của một trang; WHEN người dùng lưu câu hỏi; THEN Nội dung câu hỏi là bắt buộc và không được chỉ gồm khoảng trắng. |
| AC-AUT-008-03 | GIVEN người dùng đang cấu hình FAQ của một trang; WHEN người dùng xuất bản FAQ thiếu action; THEN Mỗi câu hỏi phải có action chính hợp lệ trước khi publish. |
| AC-AUT-008-04 | GIVEN người dùng đang cấu hình FAQ của một trang; WHEN người dùng thay đổi thứ tự FAQ và lưu; THEN Thứ tự FAQ trên kênh phải theo thứ tự đã lưu. |

## FR-AUT-009: Runtime FAQ

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-009-01 | GIVEN khách hàng mở hoặc tương tác với FAQ trên kênh; WHEN hệ thống tải FAQ để hiển thị; THEN Chỉ FAQ của phiên bản published được hiển thị. |
| AC-AUT-009-02 | GIVEN khách hàng mở hoặc tương tác với FAQ trên kênh; WHEN danh sách FAQ được hiển thị; THEN FAQ phải được hiển thị đúng thứ tự cấu hình. |
| AC-AUT-009-03 | GIVEN khách hàng mở hoặc tương tác với FAQ trên kênh; WHEN hệ thống nhận lại cùng một click FAQ; THEN Một click FAQ chỉ được chạy action một lần. |
| AC-AUT-009-04 | GIVEN khách hàng mở hoặc tương tác với FAQ trên kênh; WHEN khách xem hoặc bấm FAQ; THEN Event hiển thị, click và kết quả action phải được ghi theo FAQ và trang. |

## FR-AUT-010: Cấu hình Tin nhắn mở đầu

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-010-01 | GIVEN người dùng có quyền cấu hình Tin nhắn mở đầu; WHEN người dùng mở cấu hình của trang; THEN Mỗi trang chỉ có một cấu hình Tin nhắn mở đầu có hiệu lực. |
| AC-AUT-010-02 | GIVEN người dùng có quyền cấu hình Tin nhắn mở đầu; WHEN người dùng bật cấu hình chưa có nội dung hợp lệ; THEN Chỉ được bật khi có content graph hợp lệ. |
| AC-AUT-010-03 | GIVEN người dùng có quyền cấu hình Tin nhắn mở đầu; WHEN người dùng tắt cấu hình; THEN Tắt cấu hình không được xóa bản nháp hoặc lịch sử phiên bản. |
| AC-AUT-010-04 | GIVEN người dùng có quyền cấu hình Tin nhắn mở đầu; WHEN người dùng xuất bản cấu hình; THEN Publish phải dùng lifecycle của FR-AUT-004. |

## FR-AUT-011: Runtime Tin nhắn mở đầu

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-011-01 | GIVEN khách hàng bắt đầu tương tác với trang; WHEN hệ thống xác định một phiên hội thoại mới; THEN Tin nhắn chỉ được gửi khi bắt đầu phiên hội thoại mới theo định nghĩa hệ thống. |
| AC-AUT-011-02 | GIVEN khách hàng bắt đầu tương tác với trang; WHEN hệ thống nhận nhiều trigger trong cùng phiên; THEN Mỗi phiên chỉ được gửi Tin nhắn mở đầu một lần. |
| AC-AUT-011-03 | GIVEN khách hàng bắt đầu tương tác với trang; WHEN cấu hình chỉ là bản nháp hoặc đang tắt; THEN Chỉ dùng cấu hình đang bật và published. |
| AC-AUT-011-04 | GIVEN khách hàng bắt đầu tương tác với trang; WHEN hệ thống gửi tin và khách tương tác; THEN Kết quả gửi và tương tác phải được ghi theo phiên, bước và trang. |

## FR-AUT-012: Cấu hình Tin nhắn mặc định

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-012-01 | GIVEN người dùng có quyền cấu hình Tin nhắn mặc định; WHEN người dùng mở cấu hình của trang; THEN Mỗi trang chỉ có một cấu hình fallback có hiệu lực. |
| AC-AUT-012-02 | GIVEN người dùng có quyền cấu hình Tin nhắn mặc định; WHEN người dùng bật cấu hình có dữ liệu lỗi; THEN Chỉ được bật khi content graph và tần suất hợp lệ. |
| AC-AUT-012-03 | GIVEN người dùng có quyền cấu hình Tin nhắn mặc định; WHEN người dùng lưu trạng thái cấu hình; THEN Cờ mặc định và trạng thái bật phải được lưu độc lập theo schema. |
| AC-AUT-012-04 | GIVEN người dùng có quyền cấu hình Tin nhắn mặc định; WHEN người dùng xuất bản cấu hình; THEN Publish phải dùng lifecycle của FR-AUT-004. |

## FR-AUT-013: Runtime Tin nhắn mặc định

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-013-01 | GIVEN hệ thống nhận một tin nhắn đến từ khách; WHEN một bộ xử lý ưu tiên cao hơn đã xử lý tin; THEN Chỉ kích hoạt sau khi các bộ xử lý ưu tiên cao hơn không xử lý tin đến. |
| AC-AUT-013-02 | GIVEN hệ thống nhận một tin nhắn đến từ khách; WHEN fallback được xem xét cho khách; THEN Tần suất gửi phải tuân theo cấu hình của khách và trang. |
| AC-AUT-013-03 | GIVEN hệ thống nhận một tin nhắn đến từ khách; WHEN hệ thống chuẩn bị gửi fallback; THEN Bước gửi phải phù hợp với cửa sổ nhắn tin của kênh. |
| AC-AUT-013-04 | GIVEN hệ thống nhận một tin nhắn đến từ khách; WHEN hệ thống đánh giá hoặc gửi fallback; THEN Mỗi lần đánh giá và gửi phải được ghi nhận để thống kê và chống lặp. |

## FR-AUT-014: Danh mục và nhập Từ khóa

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-014-01 | GIVEN người dùng có quyền quản lý Từ khóa; WHEN người dùng tạo hoặc import từ khóa; THEN Từ khóa phải thuộc đúng một hướng xử lý: Cho khách hàng hoặc Cho trang. |
| AC-AUT-014-02 | GIVEN người dùng có quyền quản lý Từ khóa; WHEN người dùng tải file import; THEN File import phải được kiểm tra định dạng và báo lỗi theo dòng. |
| AC-AUT-014-03 | GIVEN người dùng có quyền quản lý Từ khóa; WHEN người dùng chạy thao tác hàng loạt; THEN Thao tác hàng loạt chỉ áp dụng cho các bản ghi người dùng đã chọn và có quyền. |
| AC-AUT-014-04 | GIVEN người dùng có quyền quản lý Từ khóa; WHEN người dùng sắp xếp và lưu danh sách; THEN Thứ tự ưu tiên phải duy nhất và được lưu ổn định trong từng phạm vi. |

## FR-AUT-015: Điều kiện khớp Từ khóa

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-015-01 | GIVEN người dùng đang cấu hình biểu thức của một từ khóa; WHEN người dùng lưu biểu thức không có giá trị khớp; THEN Biểu thức phải có ít nhất một giá trị khớp hợp lệ. |
| AC-AUT-015-02 | GIVEN người dùng đang cấu hình biểu thức của một từ khóa; WHEN người dùng nhập và lưu giá trị; THEN Giá trị phải được normalize nhất quán trước khi lưu và so khớp. |
| AC-AUT-015-03 | GIVEN người dùng đang cấu hình biểu thức của một từ khóa; WHEN người dùng chọn toán tử hoặc tạo nhóm; THEN Toán tử và nhóm điều kiện phải đúng kiểu dữ liệu được hỗ trợ. |
| AC-AUT-015-04 | GIVEN người dùng đang cấu hình biểu thức của một từ khóa; WHEN người dùng kiểm tra thử một thông điệp; THEN Preview kiểm tra khớp phải dùng cùng logic với runtime. |

## FR-AUT-016: Phản hồi Từ khóa

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-016-01 | GIVEN hệ thống có danh sách từ khóa của trang; WHEN người dùng bật một từ khóa; THEN Từ khóa chỉ được bật khi biểu thức và response đều hợp lệ. |
| AC-AUT-016-02 | GIVEN hệ thống có danh sách từ khóa của trang; WHEN một thông điệp khớp nhiều từ khóa; THEN Khi nhiều từ khóa khớp, chỉ từ khóa có ưu tiên cao nhất được chọn theo thứ tự đã lưu. |
| AC-AUT-016-03 | GIVEN hệ thống có danh sách từ khóa của trang; WHEN hệ thống gửi phản hồi của từ khóa thắng; THEN Response phải dùng content graph hợp lệ của FR-AUT-002. |
| AC-AUT-016-04 | GIVEN hệ thống có danh sách từ khóa của trang; WHEN hệ thống hoàn tất xử lý thông điệp; THEN Match, từ khóa thắng và kết quả gửi phải được ghi để truy vết. |

## FR-AUT-017: Danh mục Kịch bản chăm sóc

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-017-01 | GIVEN người dùng có quyền quản lý Kịch bản chăm sóc; WHEN người dùng tạo hoặc đổi tên kịch bản; THEN Tên kịch bản là bắt buộc và tuân theo quy tắc duy nhất của trang. |
| AC-AUT-017-02 | GIVEN người dùng có quyền quản lý Kịch bản chăm sóc; WHEN người dùng bật kịch bản chưa có bước hợp lệ; THEN Chỉ kịch bản có cấu hình bước hợp lệ mới được bật. |
| AC-AUT-017-03 | GIVEN người dùng có quyền quản lý Kịch bản chăm sóc; WHEN người dùng xóa kịch bản đang có enrollment hoạt động; THEN Không xóa kịch bản đang có enrollment hoạt động. |
| AC-AUT-017-04 | GIVEN người dùng có quyền quản lý Kịch bản chăm sóc; WHEN người dùng sao chép kịch bản; THEN Sao chép chỉ sao chép cấu hình, không sao chép enrollment hoặc analytics. |

## FR-AUT-018: Bước Kịch bản chăm sóc

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-018-01 | GIVEN người dùng đang chỉnh sửa các bước của một kịch bản; WHEN người dùng lưu một bước; THEN Mỗi bước phải có loại, thứ tự và cấu hình bắt buộc tương ứng. |
| AC-AUT-018-02 | GIVEN người dùng đang chỉnh sửa các bước của một kịch bản; WHEN người dùng nhập thời gian chờ; THEN Thời gian chờ phải nằm trong giới hạn được hệ thống hỗ trợ. |
| AC-AUT-018-03 | GIVEN người dùng đang chỉnh sửa các bước của một kịch bản; WHEN người dùng sắp xếp và lưu các bước; THEN Thứ tự bước phải liên tục và duy nhất trong kịch bản. |
| AC-AUT-018-04 | GIVEN người dùng đang chỉnh sửa các bước của một kịch bản; WHEN người dùng gắn nội dung hoặc action; THEN Nội dung và action phải tuân theo contract của FR-AUT-002 và FR-AUT-003. |
| AC-AUT-018-05 | GIVEN người dùng đang chỉnh sửa các bước của một kịch bản; WHEN người dùng sửa hoặc xóa bước của kịch bản đang có lượt chạy; THEN Xóa hoặc sửa bước không được tự ý thay đổi enrollment đang chạy ngoài chính sách phiên bản. |

## FR-AUT-019: Runtime Kịch bản chăm sóc

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-019-01 | GIVEN kịch bản đang bật và có cấu hình hợp lệ; WHEN hệ thống nhận yêu cầu đăng ký khách; THEN Một yêu cầu đăng ký phải có khóa chống trùng. |
| AC-AUT-019-02 | GIVEN kịch bản đang bật và có cấu hình hợp lệ; WHEN một enrollment được tạo; THEN Mỗi enrollment phải cố định phiên bản cấu hình dùng để chạy. |
| AC-AUT-019-03 | GIVEN kịch bản đang bật và có cấu hình hợp lệ; WHEN đến hạn chạy một bước; THEN Bước chỉ được gửi khi đến hạn và khách vẫn đủ điều kiện. |
| AC-AUT-019-04 | GIVEN kịch bản đang bật và có cấu hình hợp lệ; WHEN một bước thất bại tạm thời và được retry; THEN Retry không được gửi lặp bước đã thành công. |
| AC-AUT-019-05 | GIVEN kịch bản đang bật và có cấu hình hợp lệ; WHEN enrollment hoặc step thay đổi trạng thái; THEN Mọi chuyển trạng thái enrollment và step phải có lịch sử truy vết. |

## FR-AUT-020: Cấu hình Quy luật tự động

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-020-01 | GIVEN người dùng đang tạo hoặc chỉnh sửa một quy luật; WHEN người dùng lưu trigger; THEN Mỗi quy luật phải có đúng một trigger hợp lệ. |
| AC-AUT-020-02 | GIVEN người dùng đang tạo hoặc chỉnh sửa một quy luật; WHEN người dùng lưu cây điều kiện; THEN Cây điều kiện phải hợp lệ về toán tử, kiểu dữ liệu và cấu trúc. |
| AC-AUT-020-03 | GIVEN người dùng đang tạo hoặc chỉnh sửa một quy luật; WHEN người dùng bật quy luật; THEN Quy luật phải có ít nhất một action hợp lệ trước khi bật. |
| AC-AUT-020-04 | GIVEN người dùng đang tạo hoặc chỉnh sửa một quy luật; WHEN người dùng sắp xếp và lưu action; THEN Thứ tự action phải được lưu và dùng làm thứ tự thực thi. |
| AC-AUT-020-05 | GIVEN người dùng đang tạo hoặc chỉnh sửa một quy luật; WHEN một tài nguyên được tham chiếu không còn tồn tại; THEN Tài nguyên tham chiếu không tồn tại phải làm cấu hình mất hiệu lực cho đến khi sửa. |

## FR-AUT-021: Runtime Quy luật tự động

| Mã AC | Kịch bản GIVEN - WHEN - THEN |
| --- | --- |
| AC-AUT-021-01 | GIVEN hệ thống nhận event thuộc loại được hỗ trợ; WHEN hệ thống nhận lại event có cùng idempotency key; THEN Mỗi event chỉ được xử lý một lần theo idempotency key. |
| AC-AUT-021-02 | GIVEN hệ thống nhận event thuộc loại được hỗ trợ; WHEN hệ thống bắt đầu một lần chạy quy luật; THEN Một lần chạy phải cố định phiên bản quy luật trước khi đánh giá. |
| AC-AUT-021-03 | GIVEN hệ thống nhận event thuộc loại được hỗ trợ; WHEN hệ thống chuẩn bị chạy action; THEN Chỉ chạy action khi trigger và toàn bộ cây điều kiện cần thiết thỏa mãn. |
| AC-AUT-021-04 | GIVEN hệ thống nhận event thuộc loại được hỗ trợ; WHEN hệ thống chạy danh sách action; THEN Action phải chạy theo thứ tự và chính sách dừng hoặc tiếp tục đã cấu hình. |
| AC-AUT-021-05 | GIVEN hệ thống nhận event thuộc loại được hỗ trợ; WHEN một action thất bại tạm thời và được retry; THEN Retry không được lặp lại action đã hoàn tất thành công. |


