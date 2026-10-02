# Danh mục Acceptance Criteria Automation

Các Acceptance Criteria của bộ FR breakdown được quản lý tập trung tại đây. Mỗi FR chỉ tham chiếu mã AC.

| Mã AC | FR áp dụng | Tiêu chí GIVEN - WHEN - THEN |
|---|---|---|
| `AC-AUT-001-01` | `FR-AUT-001` - Danh mục Menu chính | AC-001: GIVEN trang có Menu mặc định và hai Menu tùy chỉnh WHEN mở Menu chính THEN hiển thị đủ ba menu và chọn Menu mặc định. |
| `AC-AUT-001-02` | `FR-AUT-001` - Danh mục Menu chính | AC-002: GIVEN người dùng chọn Menu tùy chỉnh WHEN chọn dòng menu THEN Preview và thống kê đổi theo menu, không mở editor. |
| `AC-AUT-001-03` | `FR-AUT-001` - Danh mục Menu chính | AC-003: GIVEN tên hợp lệ WHEN tạo mới THEN menu nháp xuất hiện đúng trang. |
| `AC-AUT-001-04` | `FR-AUT-001` - Danh mục Menu chính | AC-004: GIVEN menu có ba mục WHEN nhân bản THEN bản sao có ba mục, ID mới, không có assignment. |
| `AC-AUT-001-05` | `FR-AUT-001` - Danh mục Menu chính | AC-005: GIVEN menu đang được khách sử dụng WHEN xác nhận xóa THEN khách fallback về Menu mặc định và tham chiếu bị gỡ. |
| `AC-AUT-001-06` | `FR-AUT-001` - Danh mục Menu chính | AC-006: GIVEN Menu mặc định WHEN mở thao tác THEN không có Đổi tên hoặc Xóa. |
| `AC-AUT-002-01` | `FR-AUT-002` - Biên tập mục Menu chính | AC-001: GIVEN 20 mục WHEN mở editor THEN không thể thêm mục thứ 21. |
| `AC-AUT-002-02` | `FR-AUT-002` - Biên tập mục Menu chính | AC-002: GIVEN popup mở WHEN nhập 31 ký tự THEN chỉ nhận 30 và hiển thị `30/30`. |
| `AC-AUT-002-03` | `FR-AUT-002` - Biên tập mục Menu chính | AC-003: GIVEN action tin nhắn và nội dung rỗng WHEN lưu THEN báo đúng lỗi và popup không đóng. |
| `AC-AUT-002-04` | `FR-AUT-002` - Biên tập mục Menu chính | AC-004: GIVEN bật chuyển menu nhưng chưa chọn target WHEN lưu THEN trường target lỗi. |
| `AC-AUT-002-05` | `FR-AUT-002` - Biên tập mục Menu chính | AC-005: GIVEN A, B, C WHEN kéo C lên đầu THEN state và Preview là C, A, B. |
| `AC-AUT-002-06` | `FR-AUT-002` - Biên tập mục Menu chính | AC-006: GIVEN xác nhận xóa mục WHEN hoàn tất THEN counter giảm một và Preview bỏ mục đó. |
| `AC-AUT-003-01` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | AC-001: GIVEN thay đổi hợp lệ WHEN lưu nháp THEN khách vẫn thấy version cũ. |
| `AC-AUT-003-02` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | AC-002: GIVEN kênh kết nối WHEN publish thành công THEN khách thấy version mới và trạng thái là published. |
| `AC-AUT-003-03` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | AC-003: GIVEN kênh mất kết nối WHEN publish THEN bị chặn nhưng draft còn nguyên. |
| `AC-AUT-003-04` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | AC-004: GIVEN khách có assignment hợp lệ WHEN mở chat THEN thấy Menu tùy chỉnh. |
| `AC-AUT-003-05` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | AC-005: GIVEN assignment hỏng WHEN mở chat THEN assignment bị gỡ và dùng Menu mặc định. |
| `AC-AUT-003-06` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | AC-006: GIVEN khách A click chuyển menu WHEN xử lý THEN chỉ assignment của A thay đổi. |
| `AC-AUT-003-07` | `FR-AUT-003` - Xuất bản, phân phối và thống kê Menu chính | AC-007: GIVEN chọn menu khác WHEN tải thống kê THEN toàn bộ chỉ số đổi theo đúng menu. |
| `AC-AUT-004-01` | `FR-AUT-004` - Quản lý danh sách Câu hỏi thường gặp | AC-001: GIVEN danh sách rỗng WHEN mở trang THEN thấy empty state và `Thêm mới`. |
| `AC-AUT-004-02` | `FR-AUT-004` - Quản lý danh sách Câu hỏi thường gặp | AC-002: GIVEN có 3 câu hỏi WHEN thêm câu hợp lệ THEN danh sách và Preview có 4 câu. |
| `AC-AUT-004-03` | `FR-AUT-004` - Quản lý danh sách Câu hỏi thường gặp | AC-003: GIVEN đủ 4 câu WHEN mở trang THEN không thể thêm câu thứ 5. |
| `AC-AUT-004-04` | `FR-AUT-004` - Quản lý danh sách Câu hỏi thường gặp | AC-004: GIVEN câu hỏi trùng WHEN lưu THEN hiển thị lỗi và không tạo bản ghi. |
| `AC-AUT-004-05` | `FR-AUT-004` - Quản lý danh sách Câu hỏi thường gặp | AC-005: GIVEN xác nhận xóa WHEN hoàn tất THEN câu chỉ bị xóa khỏi draft. |
| `AC-AUT-005-01` | `FR-AUT-005` - Cấu hình hành động Câu hỏi thường gặp | AC-001: GIVEN chưa chọn action WHEN lưu THEN popup không đóng và báo lỗi. |
| `AC-AUT-005-02` | `FR-AUT-005` - Cấu hình hành động Câu hỏi thường gặp | AC-002: GIVEN chọn tạo tin nhắn mới WHEN lưu nội dung hợp lệ THEN câu hỏi tham chiếu đúng nội dung mới. |
| `AC-AUT-005-03` | `FR-AUT-005` - Cấu hình hành động Câu hỏi thường gặp | AC-003: GIVEN chọn khối có sẵn WHEN xác nhận THEN hiển thị đúng target đã chọn. |
| `AC-AUT-005-04` | `FR-AUT-005` - Cấu hình hành động Câu hỏi thường gặp | AC-004: GIVEN đổi action WHEN validate THEN field của action cũ không còn gây lỗi. |
| `AC-AUT-005-05` | `FR-AUT-005` - Cấu hình hành động Câu hỏi thường gặp | AC-005: GIVEN action bổ sung hợp lệ WHEN lưu THEN action được giữ đúng thứ tự. |
| `AC-AUT-006-01` | `FR-AUT-006` - Xuất bản và vận hành Câu hỏi thường gặp | AC-001: GIVEN draft hợp lệ WHEN publish thành công THEN khách thấy danh sách mới. |
| `AC-AUT-006-02` | `FR-AUT-006` - Xuất bản và vận hành Câu hỏi thường gặp | AC-002: GIVEN publish thất bại WHEN hoàn tất THEN khách vẫn thấy version cũ và draft còn nguyên. |
| `AC-AUT-006-03` | `FR-AUT-006` - Xuất bản và vận hành Câu hỏi thường gặp | AC-003: GIVEN không có thay đổi WHEN mở trang THEN nút publish bị vô hiệu hóa. |
| `AC-AUT-006-04` | `FR-AUT-006` - Xuất bản và vận hành Câu hỏi thường gặp | AC-004: GIVEN khách bấm FAQ WHEN action hợp lệ THEN action chính chạy một lần và action bổ sung chạy đúng thứ tự. |
| `AC-AUT-006-05` | `FR-AUT-006` - Xuất bản và vận hành Câu hỏi thường gặp | AC-005: GIVEN đang xem Preview WHEN tương tác THEN không có tin thật hoặc analytics phát sinh. |
| `AC-AUT-007-01` | `FR-AUT-007` - Quản lý Tin nhắn mở đầu | AC-001: GIVEN chưa có cấu hình WHEN mở trang THEN thấy empty state và `Thêm mới`. |
| `AC-AUT-007-02` | `FR-AUT-007` - Quản lý Tin nhắn mở đầu | AC-002: GIVEN cấu hình hợp lệ WHEN bật Kích hoạt THEN trạng thái được lưu. |
| `AC-AUT-007-03` | `FR-AUT-007` - Quản lý Tin nhắn mở đầu | AC-003: GIVEN cấu hình rỗng WHEN bật THEN toggle không bật và có lỗi. |
| `AC-AUT-007-04` | `FR-AUT-007` - Quản lý Tin nhắn mở đầu | AC-004: GIVEN chọn bước B WHEN xem THEN nội dung, thống kê và Preview hiển thị B. |
| `AC-AUT-007-05` | `FR-AUT-007` - Quản lý Tin nhắn mở đầu | AC-005: GIVEN đổi trang WHEN tải xong THEN không hiển thị dữ liệu trang cũ. |
| `AC-AUT-008-01` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | AC-001: GIVEN editor mới WHEN mở THEN có bước đầu tiên và nội dung trống. |
| `AC-AUT-008-02` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | AC-002: GIVEN 640 ký tự WHEN nhập thêm THEN không nhận ký tự thứ 641. |
| `AC-AUT-008-03` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | AC-003: GIVEN bước không nội dung WHEN lưu THEN chặn và focus bước lỗi. |
| `AC-AUT-008-04` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | AC-004: GIVEN liên kết tạo cycle WHEN chọn THEN từ chối và báo lỗi. |
| `AC-AUT-008-05` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | AC-005: GIVEN nội dung đổi WHEN nhập THEN Preview cập nhật ngay. |
| `AC-AUT-008-06` | `FR-AUT-008` - Biên tập luồng Tin nhắn mở đầu | AC-006: GIVEN bấm Xem thử WHEN chạy THEN không gửi tin hoặc tạo thống kê. |
| `AC-AUT-009-01` | `FR-AUT-009` - Gửi và thống kê Tin nhắn mở đầu | AC-001: GIVEN session mới và cấu hình bật WHEN nhận tin đầu THEN gửi bước đầu đúng một lần. |
| `AC-AUT-009-02` | `FR-AUT-009` - Gửi và thống kê Tin nhắn mở đầu | AC-002: GIVEN cùng session WHEN có tin tiếp theo THEN không gửi lại. |
| `AC-AUT-009-03` | `FR-AUT-009` - Gửi và thống kê Tin nhắn mở đầu | AC-003: GIVEN event là click FAQ WHEN xử lý THEN không đồng thời gửi Tin nhắn mở đầu. |
| `AC-AUT-009-04` | `FR-AUT-009` - Gửi và thống kê Tin nhắn mở đầu | AC-004: GIVEN gửi thành công WHEN xem thống kê THEN chỉ số step và tổng tăng đúng. |
| `AC-AUT-009-05` | `FR-AUT-009` - Gửi và thống kê Tin nhắn mở đầu | AC-005: GIVEN Preview WHEN xem THEN không phát sinh thống kê. |
| `AC-AUT-010-01` | `FR-AUT-010` - Quản lý Tin nhắn mặc định | AC-001: GIVEN cấu hình hợp lệ WHEN bật Kích hoạt THEN runtime được bật. |
| `AC-AUT-010-02` | `FR-AUT-010` - Quản lý Tin nhắn mặc định | AC-002: GIVEN cấu hình rỗng WHEN bật THEN toggle giữ tắt và có thông báo. |
| `AC-AUT-010-03` | `FR-AUT-010` - Quản lý Tin nhắn mặc định | AC-003: GIVEN chọn bước WHEN xem THEN thống kê và Preview đổi đúng bước. |
| `AC-AUT-010-04` | `FR-AUT-010` - Quản lý Tin nhắn mặc định | AC-004: GIVEN gạt Kích hoạt WHEN API lỗi THEN UI rollback. |
| `AC-AUT-010-05` | `FR-AUT-010` - Quản lý Tin nhắn mặc định | AC-005: GIVEN đổi trang WHEN tải xong THEN dữ liệu đúng trang mới. |
| `AC-AUT-011-01` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | AC-001: GIVEN 640 ký tự WHEN nhập thêm THEN counter giữ `640/640`. |
| `AC-AUT-011-02` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | AC-002: GIVEN title 20 ký tự WHEN nhập thêm THEN không nhận ký tự thứ 21. |
| `AC-AUT-011-03` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | AC-003: GIVEN bước rỗng WHEN cập nhật THEN bị chặn và đánh dấu. |
| `AC-AUT-011-04` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | AC-004: GIVEN next step tạo cycle WHEN chọn THEN báo lỗi. |
| `AC-AUT-011-05` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | AC-005: GIVEN dữ liệu hợp lệ WHEN cập nhật THEN lưu thành công và Preview phản ánh version mới. |
| `AC-AUT-011-06` | `FR-AUT-011` - Biên tập luồng Tin nhắn mặc định | AC-006: GIVEN Xem thử WHEN chạy THEN không gửi thật. |
| `AC-AUT-012-01` | `FR-AUT-012` - Gửi và thống kê Tin nhắn mặc định | AC-001: GIVEN không match và hai toggle bật WHEN nhận tin THEN gửi bước đầu. |
| `AC-AUT-012-02` | `FR-AUT-012` - Gửi và thống kê Tin nhắn mặc định | AC-002: GIVEN đã nhận trong 24 giờ WHEN có tin mới THEN không gửi lại. |
| `AC-AUT-012-03` | `FR-AUT-012` - Gửi và thống kê Tin nhắn mặc định | AC-003: GIVEN keyword đã xử lý WHEN cùng event THEN default không chạy. |
| `AC-AUT-012-04` | `FR-AUT-012` - Gửi và thống kê Tin nhắn mặc định | AC-004: GIVEN gửi thành công WHEN xem số liệu THEN metric step và tổng tăng đúng. |
| `AC-AUT-012-05` | `FR-AUT-012` - Gửi và thống kê Tin nhắn mặc định | AC-005: GIVEN connector không hỗ trợ outside-24h WHEN chọn bước đó THEN không gửi trái capability. |
| `AC-AUT-013-01` | `FR-AUT-013` - Danh sách và nhập hàng loạt Từ khóa | AC-001: GIVEN tab rỗng WHEN mở THEN thấy empty state đúng tab. |
| `AC-AUT-013-02` | `FR-AUT-013` - Danh sách và nhập hàng loạt Từ khóa | AC-002: GIVEN từ khóa ở hai tab WHEN đổi tab THEN dữ liệu và order không trộn. |
| `AC-AUT-013-03` | `FR-AUT-013` - Danh sách và nhập hàng loạt Từ khóa | AC-003: GIVEN file hợp lệ WHEN import THEN tạo đúng số dòng hợp lệ và báo các dòng lỗi. |
| `AC-AUT-013-04` | `FR-AUT-013` - Danh sách và nhập hàng loạt Từ khóa | AC-004: GIVEN file vượt giới hạn WHEN tải lên THEN bị từ chối trước khi ghi. |
| `AC-AUT-013-05` | `FR-AUT-013` - Danh sách và nhập hàng loạt Từ khóa | AC-005: GIVEN chọn ba dòng WHEN bulk disable THEN chỉ ba dòng chuyển tắt. |
| `AC-AUT-013-06` | `FR-AUT-013` - Danh sách và nhập hàng loạt Từ khóa | AC-006: GIVEN kéo dòng C lên đầu WHEN lưu order THEN runtime ưu tiên C. |
| `AC-AUT-014-01` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | AC-001: GIVEN chọn phạm vi WHEN hiển thị THEN đúng ô và nhãn xuất hiện. |
| `AC-AUT-014-02` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | AC-002: GIVEN `Có chứa` A/B WHEN message chứa B THEN match. |
| `AC-AUT-014-03` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | AC-003: GIVEN `Có chứa A` và `Không chứa B` WHEN message chứa cả A và B THEN không match. |
| `AC-AUT-014-04` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | AC-004: GIVEN exact `Xin chào` WHEN message khác hoa thường và khoảng trắng ngoài THEN vẫn match. |
| `AC-AUT-014-05` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | AC-005: GIVEN thiếu ô bắt buộc WHEN lưu THEN popup không đóng và báo lỗi. |
| `AC-AUT-014-06` | `FR-AUT-014` - Cấu hình và so khớp Từ khóa | AC-006: GIVEN tab Cho trang WHEN inbound message THEN keyword không được xét. |
| `AC-AUT-015-01` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | AC-001: GIVEN keyword chưa có response WHEN bật THEN bị chặn. |
| `AC-AUT-015-02` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | AC-002: GIVEN hai keyword cùng match WHEN xử lý THEN chỉ keyword order cao hơn chạy. |
| `AC-AUT-015-03` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | AC-003: GIVEN keyword active match WHEN xử lý THEN response gửi một lần và lượt khớp tăng một. |
| `AC-AUT-015-04` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | AC-004: GIVEN keyword match WHEN default message cũng đủ điều kiện THEN chỉ keyword response được gửi. |
| `AC-AUT-015-05` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | AC-005: GIVEN target bị xóa WHEN runtime hoặc validate THEN keyword bị đánh dấu cần sửa và không chạy. |
| `AC-AUT-015-06` | `FR-AUT-015` - Phản hồi và vận hành Từ khóa | AC-006: GIVEN Xem thử WHEN chạy THEN không gửi thật hoặc tăng lượt khớp. |
| `AC-AUT-016-01` | `FR-AUT-016` - Danh mục Kịch bản chăm sóc | AC-001: GIVEN không có kịch bản WHEN mở THEN thấy empty state. |
| `AC-AUT-016-02` | `FR-AUT-016` - Danh mục Kịch bản chăm sóc | AC-002: GIVEN tên hợp lệ WHEN tạo THEN kịch bản rỗng được tạo đúng trang. |
| `AC-AUT-016-03` | `FR-AUT-016` - Danh mục Kịch bản chăm sóc | AC-003: GIVEN tên trùng WHEN tạo/đổi tên THEN bị chặn. |
| `AC-AUT-016-04` | `FR-AUT-016` - Danh mục Kịch bản chăm sóc | AC-004: GIVEN kịch bản có bước và subscriber WHEN sao chép THEN bản sao có bước nhưng 0 subscriber và 0 stats. |
| `AC-AUT-016-05` | `FR-AUT-016` - Danh mục Kịch bản chăm sóc | AC-005: GIVEN không có quyền trang đích WHEN sao chép chéo trang THEN bị từ chối. |
| `AC-AUT-016-06` | `FR-AUT-016` - Danh mục Kịch bản chăm sóc | AC-006: GIVEN xác nhận xóa WHEN hoàn tất THEN lịch tương lai của kịch bản bị hủy. |
| `AC-AUT-017-01` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | AC-001: GIVEN chọn Tin nhắn WHEN lưu schedule THEN mở editor Tin nhắn. |
| `AC-AUT-017-02` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | AC-002: GIVEN chọn Hành động WHEN lưu schedule THEN mở action picker. |
| `AC-AUT-017-03` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | AC-003: GIVEN schedule lỗi WHEN lưu THEN popup không đóng. |
| `AC-AUT-017-04` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | AC-004: GIVEN bước chưa hoàn tất WHEN bật THEN bị chặn. |
| `AC-AUT-017-05` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | AC-005: GIVEN sửa offset của bước chưa chạy WHEN lưu THEN job tương lai được tính lại một lần. |
| `AC-AUT-017-06` | `FR-AUT-017` - Cấu hình bước Kịch bản chăm sóc | AC-006: GIVEN xóa bước đã chạy một phần WHEN xác nhận THEN job tương lai bị hủy, lịch sử giữ nguyên. |
| `AC-AUT-018-01` | `FR-AUT-018` - Đăng ký và thực thi Kịch bản chăm sóc | AC-001: GIVEN đăng ký hợp lệ WHEN xử lý THEN tạo đúng một subscription và lịch cho các bước active. |
| `AC-AUT-018-02` | `FR-AUT-018` - Đăng ký và thực thi Kịch bản chăm sóc | AC-002: GIVEN cùng request lặp WHEN xử lý THEN không tạo job trùng. |
| `AC-AUT-018-03` | `FR-AUT-018` - Đăng ký và thực thi Kịch bản chăm sóc | AC-003: GIVEN job đến hạn và filter đạt WHEN chạy THEN thực thi đúng một lần. |
| `AC-AUT-018-04` | `FR-AUT-018` - Đăng ký và thực thi Kịch bản chăm sóc | AC-004: GIVEN bước bị tắt trước giờ chạy WHEN job đến THEN không thực thi. |
| `AC-AUT-018-05` | `FR-AUT-018` - Đăng ký và thực thi Kịch bản chăm sóc | AC-005: GIVEN hủy đăng ký WHEN hoàn tất THEN job tương lai bị hủy, lịch sử giữ nguyên. |
| `AC-AUT-018-06` | `FR-AUT-018` - Đăng ký và thực thi Kịch bản chăm sóc | AC-006: GIVEN execution thành công WHEN xem thống kê THEN Đã gửi và tỷ lệ cập nhật đúng. |
| `AC-AUT-019-01` | `FR-AUT-019` - Danh mục Quy luật | AC-001: GIVEN tên hợp lệ WHEN tạo THEN rule tắt, `Chưa hoàn tất`, mở Chi tiết. |
| `AC-AUT-019-02` | `FR-AUT-019` - Danh mục Quy luật | AC-002: GIVEN tên trùng WHEN tạo THEN bị chặn. |
| `AC-AUT-019-03` | `FR-AUT-019` - Danh mục Quy luật | AC-003: GIVEN rule incomplete WHEN bật THEN toggle giữ tắt và có lỗi. |
| `AC-AUT-019-04` | `FR-AUT-019` - Danh mục Quy luật | AC-004: GIVEN rule complete WHEN bật THEN có hiệu lực với event mới. |
| `AC-AUT-019-05` | `FR-AUT-019` - Danh mục Quy luật | AC-005: GIVEN rule có lịch sử WHEN nhân bản THEN bản sao không có lịch sử và mặc định tắt. |
| `AC-AUT-019-06` | `FR-AUT-019` - Danh mục Quy luật | AC-006: GIVEN xem nhanh WHEN mở THEN summary đúng và dữ liệu không đổi. |
| `AC-AUT-020-01` | `FR-AUT-020` - Cấu hình sự kiện và điều kiện Quy luật | AC-001: GIVEN khung rỗng WHEN xem THEN thấy nút thêm trigger. |
| `AC-AUT-020-02` | `FR-AUT-020` - Cấu hình sự kiện và điều kiện Quy luật | AC-002: GIVEN chọn event Đã gắn Thẻ WHEN thêm THEN hiện trường chọn Thẻ. |
| `AC-AUT-020-03` | `FR-AUT-020` - Cấu hình sự kiện và điều kiện Quy luật | AC-003: GIVEN filter thiếu value WHEN lưu THEN đúng filter bị đánh dấu. |
| `AC-AUT-020-04` | `FR-AUT-020` - Cấu hình sự kiện và điều kiện Quy luật | AC-004: GIVEN hai trigger WHEN event khớp một trigger và filter đạt THEN phần điều kiện đạt. |
| `AC-AUT-020-05` | `FR-AUT-020` - Cấu hình sự kiện và điều kiện Quy luật | AC-005: GIVEN reference bị xóa WHEN validate THEN rule bị gắn cần cấu hình lại và không active. |
| `AC-AUT-020-06` | `FR-AUT-020` - Cấu hình sự kiện và điều kiện Quy luật | AC-006: GIVEN xóa trigger cuối WHEN lưu THEN rule incomplete. |
| `AC-AUT-021-01` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | AC-001: GIVEN không có action WHEN lưu THEN bị chặn. |
| `AC-AUT-021-02` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | AC-002: GIVEN hai action hợp lệ WHEN event match THEN chạy đúng thứ tự. |
| `AC-AUT-021-03` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | AC-003: GIVEN action đầu lỗi với policy dừng WHEN chạy THEN action sau không chạy. |
| `AC-AUT-021-04` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | AC-004: GIVEN frequency một lần đã hoàn tất WHEN event mới của cùng khách đến THEN rule không chạy lại. |
| `AC-AUT-021-05` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | AC-005: GIVEN event lặp WHEN nhận lại THEN không tạo side effect trùng. |
| `AC-AUT-021-06` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | AC-006: GIVEN action tạo event quay lại rule WHEN vượt loop guard THEN chain dừng và có log. |
| `AC-AUT-021-07` | `FR-AUT-021` - Cấu hình hành động và thực thi Quy luật | AC-007: GIVEN reference bị xóa WHEN validate THEN rule tự tắt và hiển thị cần cấu hình lại. |

## Quy ước

- Mã có cấu trúc `AC-AUT-[Mã FR]-[Số thứ tự]`.
- Mỗi AC phải kiểm thử được độc lập và truy vết về đúng một FR chính.
- Khi BR hoặc luồng nghiệp vụ thay đổi, phải cập nhật các AC chịu ảnh hưởng.
