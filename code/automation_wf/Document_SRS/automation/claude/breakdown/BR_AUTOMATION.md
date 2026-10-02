# Danh mục Business Rule Automation

Các Business Rule của bộ FR breakdown được quản lý tập trung tại đây. Mỗi FR chỉ tham chiếu mã BR.

| Mã BR | FR áp dụng | Nội dung |
|---|---|---|
| `BR-AUT-001-01` | `FR-AUT-001` - Danh mục Menu chính | BR-001: Mỗi trang có đúng một Menu mặc định. |
| `BR-AUT-001-02` | `FR-AUT-001` - Danh mục Menu chính | BR-002: Menu mặc định không được đổi tên hoặc xóa. |
| `BR-AUT-001-03` | `FR-AUT-001` - Danh mục Menu chính | BR-003: Tên Menu tùy chỉnh bắt buộc và duy nhất trong trang sau trim và case-fold. |
| `BR-AUT-001-04` | `FR-AUT-001` - Danh mục Menu chính | BR-004: Nhân bản không sao chép assignment hoặc analytics. |
| `BR-AUT-001-05` | `FR-AUT-001` - Danh mục Menu chính | BR-005: Xóa Menu tùy chỉnh phải fallback khách hàng về Menu mặc định. |
| `BR-AUT-002-01` | `FR-AUT-002` - Biên tập mục Menu chính | BR-001: Tối đa 20 mục mỗi menu. |
| `BR-AUT-002-02` | `FR-AUT-002` - Biên tập mục Menu chính | BR-002: Tên mục bắt buộc, tối đa 30 ký tự. |
| `BR-AUT-002-03` | `FR-AUT-002` - Biên tập mục Menu chính | BR-003: Mỗi mục có đúng một action. |
| `BR-AUT-002-04` | `FR-AUT-002` - Biên tập mục Menu chính | BR-004: Chỉ dữ liệu của action đang chọn được lưu. |
| `BR-AUT-002-05` | `FR-AUT-002` - Biên tập mục Menu chính | BR-005: Target chuyển menu phải cùng trang, đã xuất bản và khác menu nguồn. |
| `BR-AUT-002-06` | `FR-AUT-002` - Biên tập mục Menu chính | BR-006: Action chính chạy thành công trước khi chuyển menu. |
| `BR-AUT-002-07` | `FR-AUT-002` - Biên tập mục Menu chính | BR-007: `order` bắt đầu từ 1, duy nhất và liên tục. |
| `BR-AUT-003-01` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | BR-001: Draft không ảnh hưởng khách hàng. |
| `BR-AUT-003-02` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | BR-002: Chỉ cấu hình hợp lệ trên kênh đang kết nối được publish. |
| `BR-AUT-003-03` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | BR-003: Menu tùy chỉnh hợp lệ ưu tiên hơn Menu mặc định. |
| `BR-AUT-003-04` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | BR-004: Chuyển menu chỉ tác động khách vừa bấm. |
| `BR-AUT-003-05` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | BR-005: Publish phải idempotent và kiểm soát version. |
| `BR-AUT-003-06` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | BR-006: Số liệu được phân vùng theo `channelId` và `menuId`. |
| `BR-AUT-004-01` | `FR-AUT-004` - Quản lý danh sách Câu hỏi thường gặp | BR-001: Tối đa 4 câu hỏi mỗi trang. |
| `BR-AUT-004-02` | `FR-AUT-004` - Quản lý danh sách Câu hỏi thường gặp | BR-002: Nội dung câu hỏi bắt buộc, tối đa 80 ký tự và không trùng. |
| `BR-AUT-004-03` | `FR-AUT-004` - Quản lý danh sách Câu hỏi thường gặp | BR-003: Thứ tự hiển thị là thứ tự trong mảng draft; khi chưa hỗ trợ kéo thả, câu mới thêm ở cuối. |
| `BR-AUT-004-04` | `FR-AUT-004` - Quản lý danh sách Câu hỏi thường gặp | BR-004: Xóa và sửa draft không tác động khách trước khi publish. |
| `BR-AUT-005-01` | `FR-AUT-005` - Cấu hình hành động Câu hỏi thường gặp | BR-001: Mỗi câu hỏi có đúng một action chính. |
| `BR-AUT-005-02` | `FR-AUT-005` - Cấu hình hành động Câu hỏi thường gặp | BR-002: Target phải thuộc cùng tenant và trang, trừ liên kết ngoài được cho phép. |
| `BR-AUT-005-03` | `FR-AUT-005` - Cấu hình hành động Câu hỏi thường gặp | BR-003: Action bổ sung chạy sau action chính theo thứ tự hiển thị. |
| `BR-AUT-005-04` | `FR-AUT-005` - Cấu hình hành động Câu hỏi thường gặp | BR-004: Nếu action chính thất bại, không chạy action bổ sung. |
| `BR-AUT-005-05` | `FR-AUT-005` - Cấu hình hành động Câu hỏi thường gặp | BR-005: Chỉ lưu payload của action đang chọn. |
| `BR-AUT-006-01` | `FR-AUT-006` - Xuất bản và vận hành Câu hỏi thường gặp | BR-001: Chỉ published version hiển thị cho khách. |
| `BR-AUT-006-02` | `FR-AUT-006` - Xuất bản và vận hành Câu hỏi thường gặp | BR-002: Publish là thao tác nguyên tử theo trang. |
| `BR-AUT-006-03` | `FR-AUT-006` - Xuất bản và vận hành Câu hỏi thường gặp | BR-003: Mobile Preview không gửi tin thật hoặc tạo analytics. |
| `BR-AUT-006-04` | `FR-AUT-006` - Xuất bản và vận hành Câu hỏi thường gặp | BR-004: Một lượt bấm FAQ không đồng thời kích hoạt keyword hoặc default message cho cùng event. |
| `BR-AUT-006-05` | `FR-AUT-006` - Xuất bản và vận hành Câu hỏi thường gặp | BR-005: Action runtime dùng snapshot published. |
| `BR-AUT-007-01` | `FR-AUT-007` - Quản lý Tin nhắn mở đầu | BR-001: Mỗi trang có một cấu hình Tin nhắn mở đầu. |
| `BR-AUT-007-02` | `FR-AUT-007` - Quản lý Tin nhắn mở đầu | BR-002: Chỉ cấu hình hợp lệ mới được kích hoạt. |
| `BR-AUT-007-03` | `FR-AUT-007` - Quản lý Tin nhắn mở đầu | BR-003: Chọn bước ở màn Chi tiết chỉ thay đổi ngữ cảnh xem. |
| `BR-AUT-007-04` | `FR-AUT-007` - Quản lý Tin nhắn mở đầu | BR-004: Cấu hình giữa các trang độc lập. |
| `BR-AUT-008-01` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | BR-001: Bước đầu tiên luôn tồn tại. |
| `BR-AUT-008-02` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | BR-002: Mỗi bước phải có ít nhất một nội dung. |
| `BR-AUT-008-03` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | BR-003: Graph không có self-loop hoặc cycle. |
| `BR-AUT-008-04` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | BR-004: Biến thiếu dữ liệu được thay bằng chuỗi rỗng hoặc fallback đã cấu hình. |
| `BR-AUT-008-05` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | BR-005: Ghi chú nội bộ không gửi cho khách. |
| `BR-AUT-008-06` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | BR-006: Preview không gửi thật. |
| `BR-AUT-009-01` | `FR-AUT-009` - Gửi và thống kê Tin nhắn mở đầu | BR-001: Phiên mới là hội thoại đầu tiên hoặc khoảng im lặng đủ ngưỡng cấu hình. |
| `BR-AUT-009-02` | `FR-AUT-009` - Gửi và thống kê Tin nhắn mở đầu | BR-002: Mỗi phiên gửi tối đa một lần. |
| `BR-AUT-009-03` | `FR-AUT-009` - Gửi và thống kê Tin nhắn mở đầu | BR-003: FAQ/keyword hoặc trigger chuyên biệt được ưu tiên theo orchestration, không gửi chồng response. |
| `BR-AUT-009-04` | `FR-AUT-009` - Gửi và thống kê Tin nhắn mở đầu | BR-004: Chỉ event thực mới tạo analytics. |
| `BR-AUT-009-05` | `FR-AUT-009` - Gửi và thống kê Tin nhắn mở đầu | BR-005: Thống kê gắn snapshot version để không đổi lịch sử khi sửa cấu hình. |
| `BR-AUT-010-01` | `FR-AUT-010` - Quản lý Tin nhắn mặc định | BR-001: Mỗi trang có một cấu hình Tin nhắn mặc định. |
| `BR-AUT-010-02` | `FR-AUT-010` - Quản lý Tin nhắn mặc định | BR-002: Kích hoạt có hiệu lực ngay; cờ Mặc định có hiệu lực khi cập nhật editor. |
| `BR-AUT-010-03` | `FR-AUT-010` - Quản lý Tin nhắn mặc định | BR-003: Chỉ cấu hình hợp lệ mới được kích hoạt. |
| `BR-AUT-010-04` | `FR-AUT-010` - Quản lý Tin nhắn mặc định | BR-004: Chọn bước chỉ đổi ngữ cảnh xem. |
| `BR-AUT-011-01` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | BR-001: Bước đầu luôn tồn tại; mỗi bước có ít nhất một nội dung. |
| `BR-AUT-011-02` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | BR-002: Graph không có cycle. |
| `BR-AUT-011-03` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | BR-003: Action chỉ dùng target hợp lệ. |
| `BR-AUT-011-04` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | BR-004: Ghi chú không gửi khách. |
| `BR-AUT-011-05` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | BR-005: Cờ Mặc định lưu cùng cấu hình. |
| `BR-AUT-011-06` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | BR-006: Preview và Xem thử không tạo runtime data. |
| `BR-AUT-012-01` | `FR-AUT-012` - Gửi và thống kê Tin nhắn mặc định | BR-001: Chỉ chạy khi không có automation ưu tiên cao hơn xử lý event. |
| `BR-AUT-012-02` | `FR-AUT-012` - Gửi và thống kê Tin nhắn mặc định | BR-002: Mỗi khách tối đa một lần trong 24 giờ. |
| `BR-AUT-012-03` | `FR-AUT-012` - Gửi và thống kê Tin nhắn mặc định | BR-003: Loại bước phải phù hợp cửa sổ 24 giờ và capability. |
| `BR-AUT-012-04` | `FR-AUT-012` - Gửi và thống kê Tin nhắn mặc định | BR-004: Chỉ gửi thành công mới cập nhật mốc chống gửi lại. |
| `BR-AUT-012-05` | `FR-AUT-012` - Gửi và thống kê Tin nhắn mặc định | BR-005: Analytics đếm khách duy nhất theo định nghĩa metric. |
| `BR-AUT-013-01` | `FR-AUT-013` - Danh sách và nhập hàng loạt Từ khóa | BR-001: Hai tab có danh sách và thứ tự độc lập. |
| `BR-AUT-013-02` | `FR-AUT-013` - Danh sách và nhập hàng loạt Từ khóa | BR-002: Import chỉ nhận `.xlsx` hoặc `.csv`, tối đa 5 MB và 1.000 dòng. |
| `BR-AUT-013-03` | `FR-AUT-013` - Danh sách và nhập hàng loạt Từ khóa | BR-003: Keyword import chưa có phản hồi ở trạng thái chưa hoàn tất và tắt. |
| `BR-AUT-013-04` | `FR-AUT-013` - Danh sách và nhập hàng loạt Từ khóa | BR-004: Bulk action chỉ tác động dòng đang chọn trong tab hiện tại. |
| `BR-AUT-013-05` | `FR-AUT-013` - Danh sách và nhập hàng loạt Từ khóa | BR-005: Ưu tiên tăng dần theo thứ tự danh sách. |
| `BR-AUT-014-01` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | BR-001: Trong một ô, nhiều giá trị kết hợp bằng OR. |
| `BR-AUT-014-02` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | BR-002: Giữa các ô của cùng phạm vi, điều kiện kết hợp bằng AND. |
| `BR-AUT-014-03` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | BR-003: So khớp không phân biệt hoa thường sau chuẩn hóa Unicode và khoảng trắng. |
| `BR-AUT-014-04` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | BR-004: `Có chứa` cần ít nhất một giá trị match; `Không chứa` yêu cầu không giá trị nào match. |
| `BR-AUT-014-05` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | BR-005: `Khớp chính xác` so sánh toàn bộ nội dung đã normalize. |
| `BR-AUT-014-06` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | BR-006: Tab khách chỉ xét inbound; tab trang chỉ xét outbound. |
| `BR-AUT-015-01` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | BR-001: Keyword chỉ chạy khi active và complete. |
| `BR-AUT-015-02` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | BR-002: Order nhỏ hơn có ưu tiên cao hơn. |
| `BR-AUT-015-03` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | BR-003: Một event chỉ chọn tối đa một keyword trong cùng tab. |
| `BR-AUT-015-04` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | BR-004: Keyword response có ưu tiên trước Tin nhắn mặc định. |
| `BR-AUT-015-05` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | BR-005: Preview không tạo side effect. |
| `BR-AUT-015-06` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | BR-006: Lượt khớp gắn keyword version và event duy nhất. |
| `BR-AUT-016-01` | `FR-AUT-016` - Danh mục Kịch bản chăm sóc | BR-001: Tên bắt buộc, tối đa 50 và duy nhất trong trang. |
| `BR-AUT-016-02` | `FR-AUT-016` - Danh mục Kịch bản chăm sóc | BR-002: Bản sao không có subscriber hoặc stats. |
| `BR-AUT-016-03` | `FR-AUT-016` - Danh mục Kịch bản chăm sóc | BR-003: Sao chép chéo trang phải kiểm tra quyền và dependency. |
| `BR-AUT-016-04` | `FR-AUT-016` - Danh mục Kịch bản chăm sóc | BR-004: Xóa không hoàn tác action đã chạy. |
| `BR-AUT-016-05` | `FR-AUT-016` - Danh mục Kịch bản chăm sóc | BR-005: Mỗi kịch bản thuộc đúng một trang. |
| `BR-AUT-017-01` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | BR-001: Mỗi bước thuộc đúng một loại. |
| `BR-AUT-017-02` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | BR-002: Bước mới chưa hoàn tất mặc định tắt. |
| `BR-AUT-017-03` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | BR-003: Bước Hành động có đúng một action. |
| `BR-AUT-017-04` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | BR-004: Các bước sắp xếp theo offset tăng dần; cùng offset theo thời điểm tạo. |
| `BR-AUT-017-05` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | BR-005: Toggle có hiệu lực ngay với job chưa chạy. |
| `BR-AUT-017-06` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | BR-006: Lịch sử đã thực hiện là bất biến. |
| `BR-AUT-018-01` | `FR-AUT-018` - Đăng ký và thực thi Kịch bản chăm sóc | BR-001: Subscription định danh bởi page, customer và sequence. |
| `BR-AUT-018-02` | `FR-AUT-018` - Đăng ký và thực thi Kịch bản chăm sóc | BR-002: Job dựa trên thời điểm đăng ký và schedule bước. |
| `BR-AUT-018-03` | `FR-AUT-018` - Đăng ký và thực thi Kịch bản chăm sóc | BR-003: Chỉ bước active, complete và thỏa filter mới chạy. |
| `BR-AUT-018-04` | `FR-AUT-018` - Đăng ký và thực thi Kịch bản chăm sóc | BR-004: Hủy đăng ký không hoàn tác action đã chạy. |
| `BR-AUT-018-05` | `FR-AUT-018` - Đăng ký và thực thi Kịch bản chăm sóc | BR-005: Thống kê dùng event duy nhất; tỷ lệ có mẫu số là số gửi hợp lệ. |
| `BR-AUT-019-01` | `FR-AUT-019` - Danh mục Quy luật | BR-001: Tên bắt buộc, tối đa 50 và duy nhất trong trang. |
| `BR-AUT-019-02` | `FR-AUT-019` - Danh mục Quy luật | BR-002: Rule mới và bản sao mặc định tắt. |
| `BR-AUT-019-03` | `FR-AUT-019` - Danh mục Quy luật | BR-003: Chỉ rule complete được bật. |
| `BR-AUT-019-04` | `FR-AUT-019` - Danh mục Quy luật | BR-004: Bật/tắt có hiệu lực cho event tương lai. |
| `BR-AUT-019-05` | `FR-AUT-019` - Danh mục Quy luật | BR-005: Xóa/tắt không hoàn tác action đã chạy. |
| `BR-AUT-020-01` | `FR-AUT-020` - Cấu hình sự kiện và điều kiện Quy luật | BR-001: Các trigger trong cùng rule kết hợp bằng OR. |
| `BR-AUT-020-02` | `FR-AUT-020` - Cấu hình sự kiện và điều kiện Quy luật | BR-002: Filter trong một trigger kết hợp theo group operator được cấu hình; mặc định AND. |
| `BR-AUT-020-03` | `FR-AUT-020` - Cấu hình sự kiện và điều kiện Quy luật | BR-003: Filter chỉ được đánh giá khi event khớp trigger cha. |
| `BR-AUT-020-04` | `FR-AUT-020` - Cấu hình sự kiện và điều kiện Quy luật | BR-004: Kiểu operator phải tương thích field type. |
| `BR-AUT-020-05` | `FR-AUT-020` - Cấu hình sự kiện và điều kiện Quy luật | BR-005: Reference phải thuộc cùng tenant và phạm vi trang. |
| `BR-AUT-021-01` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | BR-001: Rule complete có ít nhất một action. |
| `BR-AUT-021-02` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | BR-002: Action chạy tuần tự theo thứ tự hiển thị. |
| `BR-AUT-021-03` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | BR-003: Mặc định dừng khi một action thất bại; policy khác phải khai báo rõ. |
| `BR-AUT-021-04` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | BR-004: Frequency một lần định danh theo page, rule và customer. |
| `BR-AUT-021-05` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | BR-005: Execution idempotent theo event và rule version. |
| `BR-AUT-021-06` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | BR-006: Loop guard giới hạn số lần rule chain trong một correlation. |
| `BR-AUT-021-07` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | BR-007: Sửa rule chỉ ảnh hưởng event sau khi lưu/bật version mới. |

## Quy ước

- Mã có cấu trúc `BR-AUT-[Mã FR]-[Số thứ tự]`.
- Khi thay đổi nội dung BR, phải rà lại toàn bộ FR tham chiếu và AC liên quan.
- BR chỉ được xóa khi không còn FR hoặc AC tham chiếu.
