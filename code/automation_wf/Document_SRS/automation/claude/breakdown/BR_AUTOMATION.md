# Danh mục Business Rule Automation

## Quy ước

- Mỗi BR chỉ thuộc một FR Owner.
- FR khác chỉ tham chiếu mã BR, không sao chép nội dung.
- Trạng thái đề xuất dùng cho quản lý thay đổi: `Draft`, `Approved`, `Deprecated`.

## FR-AUT-001: Phạm vi trang và phân quyền

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-001-01 | Chỉ tải dữ liệu Automation sau khi có `activePageId` hợp lệ. |
| BR-AUT-001-02 | Người dùng chỉ được xem hoặc sửa theo quyền trên trang đang chọn. |
| BR-AUT-001-03 | Trang mất kết nối phải được hiển thị trạng thái và chặn thao tác cần connector. |
| BR-AUT-001-04 | Đổi trang khi có dữ liệu chưa lưu phải yêu cầu người dùng xác nhận. |

## FR-AUT-002: Trình soạn nội dung tin nhắn

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-002-01 | Mỗi bước phải có ít nhất một block nội dung hợp lệ. |
| BR-AUT-002-02 | Liên kết `nextStepId` phải trỏ đến bước tồn tại và không tạo vòng lặp ngoài quy tắc cho phép. |
| BR-AUT-002-03 | Media, template và biến phải tương thích với capability của kênh. |
| BR-AUT-002-04 | Nút và trả lời nhanh phải dùng schema action do FR-AUT-003 cung cấp. |
| BR-AUT-002-05 | Preview phải phản ánh bản nháp hiện tại nhưng không tạo event gửi thật. |

## FR-AUT-003: Nút và hành động dùng chung

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-003-01 | Mỗi nút chỉ có một action chính. |
| BR-AUT-003-02 | Các trường target bắt buộc được xác định theo loại action. |
| BR-AUT-003-03 | Action không được hỗ trợ bởi kênh phải bị ẩn hoặc vô hiệu hóa có giải thích. |
| BR-AUT-003-04 | Thay đổi loại action phải xóa các trường không còn thuộc schema mới. |
| BR-AUT-003-05 | Action bổ sung chỉ được lưu khi thỏa điều kiện của nghiệp vụ gọi. |

## FR-AUT-004: Bản nháp và xuất bản

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-004-01 | Chỉnh sửa chỉ tác động bản nháp cho đến khi xuất bản thành công. |
| BR-AUT-004-02 | Chỉ cấu hình vượt qua toàn bộ validation mới được xuất bản. |
| BR-AUT-004-03 | Mỗi lần xuất bản thành công phải tạo phiên bản có thể truy vết. |
| BR-AUT-004-04 | Xung đột phiên bản phải được phát hiện trước khi ghi đè. |
| BR-AUT-004-05 | Lỗi đồng bộ connector không được làm mất bản nháp và phải cho phép retry an toàn. |

## FR-AUT-005: Danh mục Menu chính

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-005-01 | Mỗi trang có đúng một Menu mặc định; Menu tùy chỉnh có tên phân biệt theo quy tắc hệ thống. |
| BR-AUT-005-02 | Không cho xóa Menu mặc định. |
| BR-AUT-005-03 | Không cho xóa Menu tùy chỉnh đang còn được gán nếu chưa xử lý fallback. |
| BR-AUT-005-04 | Nhân bản menu chỉ sao chép cấu hình, không sao chép assignment hoặc analytics. |

## FR-AUT-006: Cấu trúc Menu chính

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-006-01 | Một menu có tối đa 20 mục. |
| BR-AUT-006-02 | Tiêu đề mục menu là bắt buộc và tối đa 30 ký tự. |
| BR-AUT-006-03 | Mỗi mục phải có action hợp lệ trước khi publish. |
| BR-AUT-006-04 | Thứ tự hiển thị phải theo thứ tự người dùng đã lưu. |
| BR-AUT-006-05 | Chuyển menu chỉ được trỏ tới Menu tùy chỉnh hợp lệ của cùng trang. |

## FR-AUT-007: Phân phối Menu chính

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-007-01 | Khách không có assignment hợp lệ phải nhìn thấy Menu mặc định. |
| BR-AUT-007-02 | Assignment Menu tùy chỉnh chỉ áp dụng trong cùng trang. |
| BR-AUT-007-03 | Mỗi click chỉ được thực thi một lần theo khóa idempotency. |
| BR-AUT-007-04 | Khi menu được gán không còn hợp lệ, hệ thống phải fallback và ghi nhận nguyên nhân. |

## FR-AUT-008: Quản lý FAQ

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-008-01 | Mỗi trang có tối đa 4 câu hỏi FAQ đang cấu hình. |
| BR-AUT-008-02 | Nội dung câu hỏi là bắt buộc và không được chỉ gồm khoảng trắng. |
| BR-AUT-008-03 | Mỗi câu hỏi phải có action chính hợp lệ trước khi publish. |
| BR-AUT-008-04 | Thứ tự FAQ trên kênh phải theo thứ tự đã lưu. |

## FR-AUT-009: Runtime FAQ

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-009-01 | Chỉ FAQ của phiên bản published được hiển thị. |
| BR-AUT-009-02 | FAQ phải được hiển thị đúng thứ tự cấu hình. |
| BR-AUT-009-03 | Một click FAQ chỉ được chạy action một lần. |
| BR-AUT-009-04 | Event hiển thị, click và kết quả action phải được ghi theo FAQ và trang. |

## FR-AUT-010: Cấu hình Tin nhắn mở đầu

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-010-01 | Mỗi trang chỉ có một cấu hình Tin nhắn mở đầu có hiệu lực. |
| BR-AUT-010-02 | Chỉ được bật khi có content graph hợp lệ. |
| BR-AUT-010-03 | Tắt cấu hình không được xóa bản nháp hoặc lịch sử phiên bản. |
| BR-AUT-010-04 | Publish phải dùng lifecycle của FR-AUT-004. |

## FR-AUT-011: Runtime Tin nhắn mở đầu

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-011-01 | Tin nhắn chỉ được gửi khi bắt đầu phiên hội thoại mới theo định nghĩa hệ thống. |
| BR-AUT-011-02 | Mỗi phiên chỉ được gửi Tin nhắn mở đầu một lần. |
| BR-AUT-011-03 | Chỉ dùng cấu hình đang bật và published. |
| BR-AUT-011-04 | Kết quả gửi và tương tác phải được ghi theo phiên, bước và trang. |

## FR-AUT-012: Cấu hình Tin nhắn mặc định

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-012-01 | Mỗi trang chỉ có một cấu hình fallback có hiệu lực. |
| BR-AUT-012-02 | Chỉ được bật khi content graph và tần suất hợp lệ. |
| BR-AUT-012-03 | Cờ mặc định và trạng thái bật phải được lưu độc lập theo schema. |
| BR-AUT-012-04 | Publish phải dùng lifecycle của FR-AUT-004. |

## FR-AUT-013: Runtime Tin nhắn mặc định

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-013-01 | Chỉ kích hoạt sau khi các bộ xử lý ưu tiên cao hơn không xử lý tin đến. |
| BR-AUT-013-02 | Tần suất gửi phải tuân theo cấu hình của khách và trang. |
| BR-AUT-013-03 | Bước gửi phải phù hợp với cửa sổ nhắn tin của kênh. |
| BR-AUT-013-04 | Mỗi lần đánh giá và gửi phải được ghi nhận để thống kê và chống lặp. |

## FR-AUT-014: Danh mục và nhập Từ khóa

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-014-01 | Từ khóa phải thuộc đúng một hướng xử lý: Cho khách hàng hoặc Cho trang. |
| BR-AUT-014-02 | File import phải được kiểm tra định dạng và báo lỗi theo dòng. |
| BR-AUT-014-03 | Thao tác hàng loạt chỉ áp dụng cho các bản ghi người dùng đã chọn và có quyền. |
| BR-AUT-014-04 | Thứ tự ưu tiên phải duy nhất và được lưu ổn định trong từng phạm vi. |

## FR-AUT-015: Điều kiện khớp Từ khóa

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-015-01 | Biểu thức phải có ít nhất một giá trị khớp hợp lệ. |
| BR-AUT-015-02 | Giá trị phải được normalize nhất quán trước khi lưu và so khớp. |
| BR-AUT-015-03 | Toán tử và nhóm điều kiện phải đúng kiểu dữ liệu được hỗ trợ. |
| BR-AUT-015-04 | Preview kiểm tra khớp phải dùng cùng logic với runtime. |

## FR-AUT-016: Phản hồi Từ khóa

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-016-01 | Từ khóa chỉ được bật khi biểu thức và response đều hợp lệ. |
| BR-AUT-016-02 | Khi nhiều từ khóa khớp, chỉ từ khóa có ưu tiên cao nhất được chọn theo thứ tự đã lưu. |
| BR-AUT-016-03 | Response phải dùng content graph hợp lệ của FR-AUT-002. |
| BR-AUT-016-04 | Match, từ khóa thắng và kết quả gửi phải được ghi để truy vết. |

## FR-AUT-017: Danh mục Kịch bản chăm sóc

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-017-01 | Tên kịch bản là bắt buộc và tuân theo quy tắc duy nhất của trang. |
| BR-AUT-017-02 | Chỉ kịch bản có cấu hình bước hợp lệ mới được bật. |
| BR-AUT-017-03 | Không xóa kịch bản đang có enrollment hoạt động. |
| BR-AUT-017-04 | Sao chép chỉ sao chép cấu hình, không sao chép enrollment hoặc analytics. |

## FR-AUT-018: Bước Kịch bản chăm sóc

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-018-01 | Mỗi bước phải có loại, thứ tự và cấu hình bắt buộc tương ứng. |
| BR-AUT-018-02 | Thời gian chờ phải nằm trong giới hạn được hệ thống hỗ trợ. |
| BR-AUT-018-03 | Thứ tự bước phải liên tục và duy nhất trong kịch bản. |
| BR-AUT-018-04 | Nội dung và action phải tuân theo contract của FR-AUT-002 và FR-AUT-003. |
| BR-AUT-018-05 | Xóa hoặc sửa bước không được tự ý thay đổi enrollment đang chạy ngoài chính sách phiên bản. |

## FR-AUT-019: Runtime Kịch bản chăm sóc

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-019-01 | Một yêu cầu đăng ký phải có khóa chống trùng. |
| BR-AUT-019-02 | Mỗi enrollment phải cố định phiên bản cấu hình dùng để chạy. |
| BR-AUT-019-03 | Bước chỉ được gửi khi đến hạn và khách vẫn đủ điều kiện. |
| BR-AUT-019-04 | Retry không được gửi lặp bước đã thành công. |
| BR-AUT-019-05 | Mọi chuyển trạng thái enrollment và step phải có lịch sử truy vết. |

## FR-AUT-020: Cấu hình Quy luật tự động

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-020-01 | Mỗi quy luật phải có đúng một trigger hợp lệ. |
| BR-AUT-020-02 | Cây điều kiện phải hợp lệ về toán tử, kiểu dữ liệu và cấu trúc. |
| BR-AUT-020-03 | Quy luật phải có ít nhất một action hợp lệ trước khi bật. |
| BR-AUT-020-04 | Thứ tự action phải được lưu và dùng làm thứ tự thực thi. |
| BR-AUT-020-05 | Tài nguyên tham chiếu không tồn tại phải làm cấu hình mất hiệu lực cho đến khi sửa. |

## FR-AUT-021: Runtime Quy luật tự động

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-021-01 | Mỗi event chỉ được xử lý một lần theo idempotency key. |
| BR-AUT-021-02 | Một lần chạy phải cố định phiên bản quy luật trước khi đánh giá. |
| BR-AUT-021-03 | Chỉ chạy action khi trigger và toàn bộ cây điều kiện cần thiết thỏa mãn. |
| BR-AUT-021-04 | Action phải chạy theo thứ tự và chính sách dừng hoặc tiếp tục đã cấu hình. |
| BR-AUT-021-05 | Retry không được lặp lại action đã hoàn tất thành công. |


