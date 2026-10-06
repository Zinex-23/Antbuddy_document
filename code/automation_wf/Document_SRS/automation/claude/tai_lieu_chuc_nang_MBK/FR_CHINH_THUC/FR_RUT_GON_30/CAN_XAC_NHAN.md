# Kết quả đóng các nội dung cần xác nhận

## Thông tin ghi nhận

- **Trạng thái:** Đã đóng 16/16 nội dung và đã cập nhật trực tiếp vào FR, AC, BR liên quan.
- **Người chốt baseline:** Chủ tài liệu/PO AntBuddy theo yêu cầu tại phiên làm việc này; chưa cung cấp họ tên để ghi vào tài liệu.
- **Người biên tập:** BA/Codex.
- **Ngày ghi nhận:** 06/10/2026.
- **Nguyên tắc:** Giới hạn thấp hơn do kênh chat công bố luôn được ưu tiên. Nội dung Botcake không công bố công khai được ghi rõ là **Quyết định baseline AntBuddy**, không trình bày như một tính năng đã được Botcake xác nhận.

## Phân loại evidence

- **Đối chiếu trực tiếp:** tài liệu nguồn nêu đúng hành vi hoặc con số.
- **Kết hợp:** ghép hành vi Botcake với phạm vi SRS/UI AntBuddy.
- **Quyết định baseline:** phương án sản phẩm được chốt để tài liệu có thể triển khai; nguồn công khai không có con số hoặc không định nghĩa tình huống này.

## Kết quả quyết định

| Mã cũ | FR đã cập nhật | Kết luận áp dụng trong SRS | Evidence và mức đối chiếu |
| --- | --- | --- | --- |
| CONF-001 | 001–003 | Văn bản tối đa **1.200 ký tự** nếu không có nút và **640 ký tự** nếu có nút. Ảnh tối đa **5 MB**; video, âm thanh và tệp khác **25 MB/tệp**. Mỗi tin tối đa **3 nút** và **13 trả lời nhanh**; tiêu đề tối đa **20 ký tự**. Thêm nút vào văn bản trên 640 ký tự bị chặn cho tới khi rút gọn. | **Đối chiếu trực tiếp:** [INT-01], [INT-02] nêu 1.200/640, 3 nút, 13 trả lời nhanh, 20 ký tự và 13 hành động. [BOT-01] xác nhận 1.200 ký tự, 3 nút, ảnh 5 MB và tệp 25 MB. |
| CONF-002 | 004 | Hỗ trợ **5 loại bước**: Tin nhắn, AI, Hành động, Smart Delay và Điều kiện. Một luồng tối đa **30 bước**. Cho phép quay lại bước cũ nếu có đường thoát; một bước chỉ chạy tối đa **5 lần/lượt chạy**, lần 6 dừng và ghi lỗi. | **Kết hợp:** 5 loại bước từ thiết kế được ghi tại [INT-01], [INT-02]; [BOT-05] xác nhận AI dùng trong luồng. Giới hạn 30 bước/5 lần lấy từ baseline nội bộ [INT-04]. |
| CONF-003 | 006–008 | Mỗi kênh có **1 menu mặc định**, không giới hạn nghiệp vụ số menu tùy chỉnh. Mỗi menu tối đa **20 mục**, tên mục tối đa **30 ký tự**. Có 4 hành động: Tạo tin mới, Chọn luồng, Opt-in, Mở trang web; có thể chuyển menu sau khi hành động chính thành công. **Không cho áp dụng menu rỗng**; menu tùy chỉnh bị gỡ/xóa thì khách về menu mặc định. | **Kết hợp:** [BOT-02] xác nhận tối đa 20 mục và cơ chế áp dụng menu; [INT-01], [INT-02], [INT-03] xác nhận 1 menu mặc định, nhiều menu tùy chỉnh, 4 hành động và tên 30 ký tự. Chặn menu rỗng là **Quyết định baseline** để tránh vô tình gỡ menu đang dùng. |
| CONF-004 | 009–010 | Tối đa **4 câu hỏi**, mỗi câu **45 ký tự**, hiển thị dưới dạng gợi ý khi khách mở hội thoại lần đầu. Phản hồi chính gồm Tạo tin mới, Chọn luồng hoặc Opt-in. Hành động bổ sung gồm Gắn/Gỡ nhãn, cập nhật một trường, đăng ký/hủy kịch bản và chuyển menu. Cho phép xuất bản danh sách rỗng để gỡ toàn bộ FAQ sau bước xác nhận. | **Đối chiếu trực tiếp** cho 4 câu, 45 ký tự và 3 phản hồi chính tại [INT-01], [INT-02]. Danh mục hành động bổ sung và gỡ FAQ bằng danh sách rỗng là **Quyết định baseline** vì Botcake public docs không nêu chi tiết. |
| CONF-005 | 012 | Không dùng timeout để tạo “phiên mới”. Lời chào chạy khi có sự kiện **Bắt đầu/Get Started**; nếu kênh không có sự kiện này thì dùng tin đầu tiên của khách chưa từng tương tác. Quay lại sau im lặng không gửi lại lời chào. Tin đầu tiên vẫn tiếp tục qua Thu thập thông tin → Từ khóa → AI → Mặc định. | **Kết hợp:** [BOT-04] xác nhận lời chào khi khách bấm Start; [INT-01], [INT-02] chỉ mô tả “phiên mới” nhưng chưa định nghĩa. Quy tắc fallback và không dùng timeout là **Quyết định baseline**. |
| CONF-006 | 013–014 | Phản hồi mặc định luôn dùng **một luồng tin nhắn**; AI, nếu cần, là một bước trong luồng. Chức năng chỉ chạy khi Thu thập thông tin, Từ khóa và AI/NLU đều không xử lý được. Chu kỳ chỉ chống gửi lặp, không tự gửi vì khách quay lại. Tùy chọn: Không giới hạn, Chỉ 1 lần hoặc mỗi X phút/giờ/ngày; X từ **1 phút đến 30 ngày**, mặc định **24 giờ**; độ trễ tối đa **24 giờ**. | **Kết hợp:** [BOT-03] xác nhận tin mặc định có chu kỳ và ví dụ 24 giờ; [BOT-05] xác nhận AI là khối trong luồng; [INT-01], [INT-02] xác nhận thứ tự Từ khóa → NLU → Mặc định. Mức 30 ngày/24 giờ là **Quyết định baseline**. |
| CONF-007 | 014 | Thứ tự chính thức: lượt bấm **Menu/FAQ xử lý riêng**; với văn bản là **Thu thập thông tin → Từ khóa → AI/NLU → Phản hồi mặc định**. Tin do bot, automation hoặc nhân viên gửi không đi vào nhánh khách hàng. | **Kết hợp:** thứ tự Từ khóa → NLU → Mặc định và tách Menu/FAQ có tại [INT-01], [INT-02]; ưu tiên Thu thập thông tin là baseline điều phối để một tin không bị nhiều chức năng cùng xử lý. |
| CONF-008 | 015 | Cách khớp gồm: Có chứa; Có chứa và không chứa; chứa ít nhất một/tất cả cụm; Nội dung là từ khóa/sticker/ảnh/video/âm thanh/đánh giá; có số điện thoại/email/sản phẩm POS; Bắt đầu bằng. **Cho khách hàng** chỉ xét tin khách; **Cho trang** chỉ xét tin nhân viên; bot/automation bị loại. “Chỉ 1 lần” tính theo khách + quy tắc trong suốt vòng đời. Độ trễ tối đa **24 giờ**. | **Đối chiếu trực tiếp** về nhóm cách khớp, hai phạm vi và tùy chọn tần suất/độ trễ tại [INT-01], [INT-02]. Phạm vi vòng đời và trần 24 giờ là **Quyết định baseline**. |
| CONF-009 | 017 | Hỗ trợ **XLSX** và **CSV UTF-8**, tối đa **10 MB** và **10.000 dòng dữ liệu/tệp**. Mẫu có 11 cột: Phạm vi, Cách khớp, Nội dung 1, Nội dung 2, Loại nội dung, ID luồng phản hồi, Tần suất, Giá trị tần suất, Độ trễ, Đơn vị độ trễ, Trạng thái. Ba cột đầu luôn bắt buộc; quy tắc thiếu phản hồi phải ở trạng thái tắt. | [INT-01], [INT-02] chỉ xác nhận có import từng dòng hợp lệ và báo lỗi, đồng thời ghi rõ định dạng/giới hạn chưa được định nghĩa. Toàn bộ định dạng, cột và giới hạn ở đây là **Quyết định baseline AntBuddy**. |
| CONF-010 | 018 | Khi nhiều quy tắc khớp, chọn quy tắc đang bật đứng cao nhất trong danh sách; không có ưu tiên ngầm theo kiểu khớp. Sau khi chọn, nếu phản hồi lỗi thì chỉ thử lại chính phản hồi đó; **không xét quy tắc tiếp theo** và không gửi phản hồi mặc định cho cùng tin. | **Đối chiếu trực tiếp** về “quy tắc đầu tiên theo danh sách” tại [INT-01], [INT-02]. Không chuyển sang quy tắc khác khi lỗi là **Quyết định baseline** để tránh hai phản hồi khác nghĩa cho một tin. |
| CONF-011 | 019–022 | Tắt kịch bản chỉ chặn đăng ký mới; khách đang tham gia tiếp tục theo phiên bản cũ. Không cho xóa nếu còn tiến trình hoạt động. Không hỗ trợ Tạm dừng/Tiếp tục ở phiên bản này. Đăng ký lặp khi đang chạy không tạo tiến trình mới; đăng ký lại sau trạng thái cuối bắt đầu từ bước đầu, dùng bản hiện hành và tính lịch lại. | [BOT-06] xác nhận kịch bản chạy theo thời gian từ lúc khách được đăng ký. Phiên bản và trạng thái có nền tại [INT-01], [INT-02]; vòng đời tắt/xóa/đăng ký lại là **Quyết định baseline**. |
| CONF-012 | 020 | Bước gồm Tin nhắn hoặc Hành động. Hành động: Gắn/Gỡ nhãn, cập nhật một trường, đăng ký/hủy kịch bản, chuyển menu, bật/tắt bot. “Sau X” tính từ **thời điểm đăng ký kịch bản**. Khung mặc định **08:30–18:00** theo múi giờ IANA của kênh; ngoài khung dời tới đầu khung gần nhất; mốc cố định đã qua thì bỏ qua. | **Đối chiếu trực tiếp:** [BOT-06] nêu rõ “Sau X” tính từ lúc đăng ký; [INT-01], [INT-02] xác nhận bước Tin nhắn/Hành động và ví dụ nhãn/trường. Khung 08:30–18:00 lấy từ baseline nội bộ [INT-04]; danh mục đầy đủ và DST là **Quyết định baseline**. |
| CONF-013 | 022 | Lỗi tạm thời thử lại tối đa **3 lần**, sau **1, 5, 15 phút**; lỗi vĩnh viễn không thử. Sau lỗi cuối: bước Tin nhắn tiếp tục bước kế; lỗi khách chặn/từ chối nhận tin hủy tiến trình; bước Hành động dừng tiến trình ở Thất bại. Điều kiện không đạt thì bỏ qua và tiếp tục. | [INT-01], [INT-02] xác nhận cần xử lý lỗi nhưng không có con số. Số lần, lịch retry và quy tắc tiếp tục/dừng là **Quyết định baseline AntBuddy**. |
| CONF-014 | 024–026 | Có 8 sự kiện, 8 hành động như ghi tại FR-024/025; nhiều sự kiện kết hợp HOẶC, điều kiện trong sự kiện dùng Tất cả/Bất kỳ. Tần suất chỉ gồm Luôn thực hiện hoặc Chỉ 1 lần. Nhiều quy luật chạy tuần tự theo thứ tự danh sách; hành động sau quyết định trạng thái cuối khi xung đột. Cùng quy luật không tự chạy lại trong một chuỗi; tối đa **5 cấp** phát sinh. | [BOT-07] xác nhận cấu trúc điều kiện + hành động và ví dụ khách mới đăng ký kịch bản. [INT-01], [INT-02] xác nhận hai tần suất và hành động tuần tự. Danh mục hoàn chỉnh, thứ tự liên quy luật và xung đột là **Quyết định baseline**; độ sâu 5 lấy từ [INT-04]. |
| CONF-015 | 028 | Hỗ trợ 3 kiểu nhập: Văn bản, Email, Số điện thoại. Tối đa **3 lần sai**, chờ tối đa **24 giờ**. Nút Bỏ qua chỉ có tác dụng nếu được cấu hình; lệnh chính xác **/huy** kết thúc phiên. Menu/FAQ vẫn chạy hành động, không tính là trả lời sai và phiên tiếp tục chờ. Trong lúc chờ, Từ khóa/AI/Mặc định không xử lý cùng tin. | **Đối chiếu trực tiếp:** [BOT-01] xác nhận 3 kiểu dữ liệu, kiểm tra email/điện thoại và nút Skip. Số lần, timeout, /huy và cách xử lý Menu/FAQ là **Quyết định baseline**. |
| CONF-016 | 029 | Mỗi hành động cập nhật **một trường**; nhiều trường dùng nhiều hành động tuần tự. Có 2 cách ghi: **Ghi đè** và **Chỉ khi trống**. Nguồn giá trị có thể là giá trị cố định, biến khách/sự kiện hoặc kết quả từ Thu thập thông tin, AI, API. | [BOT-08] xác nhận ánh xạ từng thành phần vào Custom Field; [BOT-09] xác nhận API có thể ánh xạ nhiều giá trị vào nhiều field. Một trường/hành động và hai cách ghi là **Quyết định baseline** để dễ truy vết và retry. |

## Danh mục nguồn

### Nguồn nội bộ

- **[INT-01]** [SRS_Automation_18FR.docx](../driver/SRS_Automation_18FR.docx) — tài liệu SRS 18 FR.
- **[INT-02]** [Review_SRS_Automation_18FR.xlsx](../driver/Review_SRS_Automation_18FR.xlsx) — review và trích evidence theo từng FR.
- **[INT-03]** [FR_AUT_001(updated).md](../../../../FR_AUT_001(updated).md) — đặc tả UI Menu đã cập nhật.
- **[INT-04]** [Bảng tổng hợp 15 tính năng](../../v2_reviewed/BANG_THONG_KE_15_TINH_NANG.md) — baseline nội bộ về giới hạn luồng, giờ chăm sóc và chống lặp.

### Nguồn Botcake chính thức

- **[BOT-01]** [Các thành phần trong thiết lập tin nhắn](https://docs.pancake.biz/botcake/st-f6/st-p1/st-s1?lang=vi) — giới hạn văn bản/nút/tệp và khối Input.
- **[BOT-02]** [Menu mặc định](https://docs.pancake.biz/botcake/st-f3/st-p4/st-s1/st-ss1?lang=vi) — giới hạn 20 mục và cách áp dụng menu.
- **[BOT-03]** [Tin nhắn mặc định](https://docs.pancake.biz/botcake/st-f3/st-p4/st-s4?lang=vi) — đối tượng nhận, chu kỳ và ví dụ 24 giờ.
- **[BOT-04]** [Onboarding Botcake](https://docs.pancake.biz/botcake/st-f4/st-p5/st-s1/st-ss7?lang=vi) — lời chào khi khách bấm Start và hành vi automation cơ bản.
- **[BOT-05]** [Sử dụng AI trong luồng tin nhắn](https://docs.pancake.biz/botcake/st-f4/st-p5/st-s1/st-ss3?lang=vi) — AI là khối trong luồng và luồng được gắn vào automation.
- **[BOT-06]** [Kịch bản chăm sóc](https://docs.pancake.biz/docs/botcake/30/82/48) — loại bước và mốc “Sau X” từ lúc đăng ký.
- **[BOT-07]** [Quy luật](https://docs.pancake.biz/botcake/st-f3/st-p4/st-s7?lang=vi) — cấu trúc điều kiện/hành động và ví dụ đăng ký kịch bản.
- **[BOT-08]** [Webform và Custom Field](https://docs.pancake.biz/botcake/st-f5/st-p12?lang=vi) — ánh xạ thành phần nhập vào trường khách hàng.
- **[BOT-09]** [JSON API trong luồng](https://docs.pancake.biz/botcake/st-f3/st-p3/st-s2?lang=vi) — ánh xạ nhiều giá trị phản hồi API vào nhiều Custom Field.

> Tất cả nguồn web được đối chiếu ngày 06/10/2026. Nếu Botcake hoặc chính sách kênh thay đổi giới hạn, cần cập nhật bảng quyết định và các BR tương ứng theo cùng một phiên bản.
