# Danh mục Business Rules Automation — bản tinh gọn

> Đây là nguồn BR chính thức của bộ 30 FR. Mỗi BR chỉ được định nghĩa một lần và có thể áp dụng cho nhiều FR. Các điểm từng để mở đã được chốt trong QUYET_DINH_VA_NGUON.md.

| Mã BR | Quy tắc nghiệp vụ | FR tương ứng | AC tương ứng |
| --- | --- | --- | --- |
| BR-AUT-001 | Nếu kênh chat có giới hạn hoặc chính sách chặt hơn AntBuddy thì áp dụng quy định của kênh đó. | FR-AUT-001–003, 006–012, 022, 030 | AC-AUT-001–003, 006–012, 022, 030 |
| BR-AUT-002 | Mỗi khối văn bản tối đa 1.200 ký tự khi không có nút và 640 ký tự khi có nút. Giới hạn được kiểm tra sau khi thay biến; hệ thống không tự cắt nội dung. Mỗi tệp đính kèm tối đa 25 MB. | FR-AUT-001 | AC-AUT-001 |
| BR-AUT-003 | Một bước tin nhắn phải có ít nhất một khối hợp lệ. Biến phải còn hiệu lực, đúng phạm vi; tệp không an toàn hoặc loại nội dung kênh không hỗ trợ bị chặn. | FR-AUT-001, 011, 013 | AC-AUT-001, 011, 013 |
| BR-AUT-004 | Mỗi tin nhắn có tối đa 3 nút; tên nút bắt buộc, tối đa 20 ký tự; mỗi nút có đúng một hành động hợp lệ. | FR-AUT-002 | AC-AUT-002 |
| BR-AUT-005 | Mỗi tin nhắn có tối đa 11 trả lời nhanh; tên bắt buộc, tối đa 20 ký tự và không được trùng trong cùng tin nhắn. | FR-AUT-003 | AC-AUT-003 |
| BR-AUT-006 | Tên dùng để kiểm tra trùng được bỏ khoảng trắng đầu/cuối, gộp nhiều khoảng trắng và không phân biệt hoa thường. Quy tắc này áp dụng cho trả lời nhanh, menu, FAQ, kịch bản và quy luật trong đúng phạm vi của chúng. | FR-AUT-003, 007, 009, 019, 023 | AC-AUT-003, 007, 009, 019, 023 |
| BR-AUT-007 | Trả lời nhanh chỉ có hiệu lực với tin đã tạo ra nó; chỉ lượt chọn hợp lệ đầu tiên được xử lý. | FR-AUT-003 | AC-AUT-003 |
| BR-AUT-008 | Mỗi luồng có đúng một bước bắt đầu, tối đa 30 bước và chỉ dùng các loại Tin nhắn, AI, Hành động, Smart Delay, Điều kiện. | FR-AUT-004 | AC-AUT-004 |
| BR-AUT-009 | Bước thường phải có bước đích; nhánh Điều kiện phải có điều kiện và bước đích; điểm kết thúc không cần bước tiếp. Liên kết quay lại phải có đường thoát và một bước không chạy quá 5 lần trong một lượt. | FR-AUT-004 | AC-AUT-004 |
| BR-AUT-010 | Tham chiếu đến luồng, menu, nhãn, trường dữ liệu hoặc đối tượng khác phải còn hiệu lực và đúng kênh/phạm vi. Khi đối tượng đích bị xóa, cấu hình liên quan chuyển sang Cần cấu hình lại và không tạo lượt chạy mới. | FR-AUT-002–004, 006–029 | AC-AUT-002–004, 006–029 |
| BR-AUT-011 | Xem trước và Xem thử dùng đúng bản nháp đã chọn, chỉ dùng dữ liệu mô phỏng, không đổi dữ liệu khách và không tính thống kê thật. Gửi thử chỉ gửi nội dung đến tài khoản thử; hành động dữ liệu vẫn mô phỏng và được ghi ở nhật ký thử riêng. | FR-AUT-005, 030 | AC-AUT-005, 030 |
| BR-AUT-012 | Cùng một mã sự kiện hoặc mã yêu cầu chỉ được xử lý một lần; lần nhận lặp dùng lại kết quả cũ, không chạy hành động và không tăng thống kê. | FR-AUT-002, 003, 008, 010, 012, 017, 022, 026, 030 | AC-AUT-002, 003, 008, 010, 012, 017, 022, 026, 030 |
| BR-AUT-013 | Mọi thay đổi dữ liệu thật phải lưu người/nguồn thực hiện và thời gian; thay đổi trường dữ liệu phải lưu cả giá trị trước và sau. | FR-AUT-021, 027, 029 | AC-AUT-021, 027, 029 |
| BR-AUT-014 | Tắt hoặc xóa cấu hình ngăn lượt chạy mới, không xóa lịch sử và không hoàn tác hành động đã hoàn tất. Công việc đang chờ được tiếp tục hoặc hủy theo quy tắc riêng của từng chức năng. | FR-AUT-011, 013, 016, 019, 023 | AC-AUT-011, 013, 016, 019, 023 |
| BR-AUT-015 | Khi sao chép, hệ thống tạo mã mới và chỉ sao chép cấu hình. Bản sao không mang khách, tiến trình, lịch sử hay thống kê; menu ở bản nháp và quy luật ở trạng thái tắt. | FR-AUT-007, 019, 023 | AC-AUT-007, 019, 023 |
| BR-AUT-016 | Mỗi kênh có đúng một menu mặc định và menu này không được xóa. Mọi menu có từ 1 đến 20 mục. | FR-AUT-006–008 | AC-AUT-006–008 |
| BR-AUT-017 | Mỗi mục menu có tên bắt buộc, tối đa 30 ký tự, một vị trí và đúng một hành động. URL phải bắt đầu bằng http:// hoặc https://. | FR-AUT-006, 007 | AC-AUT-006, 007 |
| BR-AUT-018 | Menu riêng hợp lệ của khách được ưu tiên hơn menu mặc định. Mỗi khách chỉ có một menu riêng trên một kênh; gán menu mới thay menu cũ, xóa menu riêng đưa khách về menu mặc định. | FR-AUT-006, 007 | AC-AUT-006, 007 |
| BR-AUT-019 | Chỉ menu đã áp dụng, cùng kênh và còn hiệu lực mới được gán hoặc chuyển. Chuyển menu diễn ra khi hệ thống đã chấp nhận lượt bấm/hành động chính; không chờ trình duyệt xác nhận trang web đã mở. | FR-AUT-006, 007 | AC-AUT-006, 007 |
| BR-AUT-020 | Mỗi lần đồng bộ menu gắn với một phiên bản cố định. Chỉ xác nhận thành công từ kênh mới đổi bản đang áp dụng; thử lại dùng đúng phiên bản lỗi và phải kiểm tra kết quả cũ nếu trạng thái chưa rõ. | FR-AUT-008 | AC-AUT-008 |
| BR-AUT-021 | Mỗi kênh có tối đa 4 câu hỏi gợi ý; mỗi câu tối đa 45 ký tự và phải có phản hồi hợp lệ trước khi xuất bản. | FR-AUT-009, 010 | AC-AUT-009, 010 |
| BR-AUT-022 | Sửa bản nháp không ảnh hưởng danh sách khách đang thấy. Xuất bản lỗi giữ bản cũ; xuất bản danh sách rỗng là gỡ toàn bộ và phải được xác nhận. | FR-AUT-009 | AC-AUT-009 |
| BR-AUT-023 | Mỗi câu hỏi có một phản hồi chính: tin nhắn mới, luồng có sẵn hoặc thông báo. Phản hồi chính phải được hệ thống chấp nhận trước khi chạy hành động bổ sung. | FR-AUT-010 | AC-AUT-010 |
| BR-AUT-024 | Hành động bổ sung của FAQ chạy tuần tự. Nếu một hành động lỗi, hệ thống ghi lỗi, không hoàn tác phần đã xong và tiếp tục các hành động còn lại. Khởi chạy luồng được tính thành công khi yêu cầu được chấp nhận và bước đầu đã được xếp lịch. | FR-AUT-010 | AC-AUT-010 |
| BR-AUT-025 | Lượt chọn FAQ là sự kiện có cấu trúc, không được dò như tin Từ khóa. | FR-AUT-010, 018 | AC-AUT-010, 018 |
| BR-AUT-026 | Mỗi kênh chỉ có một cấu hình Tin nhắn mở đầu đang áp dụng; chỉ nội dung đầy đủ, đúng kênh và tuân quy tắc trình biên soạn mới được bật. | FR-AUT-011 | AC-AUT-011 |
| BR-AUT-027 | Tin nhắn mở đầu chạy khi kênh phát sự kiện Bắt đầu/Get Started; chỉ dùng tin đầu tiên của khách mới khi kênh không có sự kiện này. Khách quay lại không tự nhận lại lời chào. | FR-AUT-012 | AC-AUT-012 |
| BR-AUT-028 | Trước khi gửi lời chào hoặc phản hồi đang chờ, hệ thống kiểm tra lại cấu hình, trạng thái bot và việc nhân viên tiếp quản; không còn đủ điều kiện thì hủy và ghi lý do. | FR-AUT-012, 014 | AC-AUT-012, 014 |
| BR-AUT-029 | Mỗi kênh có một cấu hình phản hồi mặc định. Tần suất gồm Không giới hạn, Chỉ một lần, hoặc mỗi X phút/giờ/ngày; X lần lượt trong khoảng 1–1.440, 1–720 và 1–30; độ trễ tối đa 24 giờ. | FR-AUT-013 | AC-AUT-013 |
| BR-AUT-030 | Thứ tự xử lý tin khách là: Thu thập thông tin → Từ khóa → AI/NLU → phản hồi mặc định. Tin bot, automation hoặc nhân viên không kích hoạt phản hồi mặc định. | FR-AUT-014, 018, 028 | AC-AUT-014, 018, 028 |
| BR-AUT-031 | Phản hồi mặc định đang chờ bị hủy nếu trước giờ gửi tin đã được Từ khóa, AI hoặc nhân viên xử lý. Chỉ gửi thành công mới bắt đầu khoảng nghỉ. | FR-AUT-014 | AC-AUT-014 |
| BR-AUT-032 | Lịch sử Chỉ một lần của phản hồi mặc định gắn với khách + kênh và không bị đặt lại khi sửa, tắt hoặc bật cấu hình. | FR-AUT-013, 014 | AC-AUT-013, 014 |
| BR-AUT-033 | Quy tắc Từ khóa hỗ trợ các cách khớp đã công bố của Botcake, phạm vi Cho khách/Cho trang và một phản hồi hợp lệ. Văn bản được bỏ khoảng trắng thừa và không phân biệt hoa thường. | FR-AUT-015 | AC-AUT-015 |
| BR-AUT-034 | Hai quy tắc Từ khóa là trùng khi có cùng kênh, phạm vi nguồn, cách khớp và tập từ khóa đã chuẩn hóa; thứ tự từ trong một tập không tạo quy tắc mới. | FR-AUT-015, 017 | AC-AUT-015, 017 |
| BR-AUT-035 | Tần suất Từ khóa gồm Không giới hạn, Chỉ một lần hoặc mỗi X phút/giờ/ngày với cùng khoảng X tại BR-AUT-029. Độ trễ tối đa 24 giờ; sửa quy tắc không xóa lịch sử Chỉ một lần. | FR-AUT-015 | AC-AUT-015 |
| BR-AUT-036 | Chỉ quy tắc đầy đủ mới được bật. Quy tắc tắt không được dò; thứ tự trong danh sách là ưu tiên chính thức. Thao tác hàng loạt báo kết quả riêng từng mục. | FR-AUT-016 | AC-AUT-016 |
| BR-AUT-037 | Tệp nhập Từ khóa là XLSX hoặc CSV UTF-8, tối đa 10 MB và 10.000 dòng, theo đúng 11 cột mẫu. Mỗi dòng dùng cùng kiểm tra như nhập tay; dòng lỗi bị bỏ, dòng hợp lệ vẫn được nhập và có báo cáo. | FR-AUT-017 | AC-AUT-017 |
| BR-AUT-038 | Khi nhập dữ liệu trùng, người dùng chọn Bỏ qua hoặc Cập nhật cho toàn bộ lần nhập. Cập nhật chỉ ghi các cột cấu hình có trong tệp, giữ mã quy tắc, lịch sử tần suất và thống kê; dòng thiếu phản hồi được lưu ở trạng thái tắt. | FR-AUT-017 | AC-AUT-017 |
| BR-AUT-039 | Khi xử lý tin, hệ thống xét theo thứ tự và chọn quy tắc đầu tiên đang bật, đầy đủ, đúng kênh/phạm vi và còn đủ tần suất. Quy tắc khớp nhưng hết tần suất bị bỏ qua để xét quy tắc kế tiếp; mỗi tin chỉ chọn một quy tắc. | FR-AUT-018 | AC-AUT-018 |
| BR-AUT-040 | Khi đã chọn quy tắc Từ khóa, lỗi chỉ được thử lại trên quy tắc đó; không xét quy tắc thấp hơn và không gửi phản hồi mặc định cho cùng tin. Nếu không có quy tắc đủ điều kiện, tin đi tiếp sang AI rồi phản hồi mặc định. | FR-AUT-018 | AC-AUT-018 |
| BR-AUT-041 | Tên kịch bản chăm sóc phải duy nhất; kịch bản chỉ được bật khi có ít nhất một bước hợp lệ. Tắt kịch bản ngăn đăng ký mới nhưng không dừng khách đang tham gia. | FR-AUT-019 | AC-AUT-019 |
| BR-AUT-042 | Mỗi bước chăm sóc có đúng một loại và một thời điểm. Mốc Sau X tính từ lúc khách đăng ký kịch bản; mốc cố định đã qua được bỏ qua. | FR-AUT-020 | AC-AUT-020 |
| BR-AUT-043 | Lịch dùng múi giờ của kênh, nếu thiếu thì dùng múi giờ doanh nghiệp; khung gửi mặc định 08:30–18:00. Mốc ngoài khung được dời tới đầu khung kế tiếp; giờ không tồn tại do DST được dời tới giờ hợp lệ, giờ lặp chỉ chạy một lần. | FR-AUT-020, 022 | AC-AUT-020, 022 |
| BR-AUT-044 | Khách giữ phiên bản kịch bản tại lúc đăng ký. Sửa hoặc tắt một bước chỉ áp dụng cho phiên bản mới; muốn dừng khách cũ phải hủy tiến trình của họ. | FR-AUT-019–022 | AC-AUT-019–022 |
| BR-AUT-045 | Mỗi khách có tối đa một tiến trình đang hoạt động cho cùng kịch bản. Đăng ký lặp giữ lịch cũ; đăng ký lại sau Hoàn thành, Đã hủy hoặc Thất bại tạo tiến trình mới từ đầu theo phiên bản hiện hành. | FR-AUT-021 | AC-AUT-021 |
| BR-AUT-046 | Chỉ kịch bản đang bật, hoàn tất mới nhận khách mới. Kịch bản tắt vẫn cho hủy; hủy ngăn bước chưa chạy và giữ lịch sử. Không có Tạm dừng/Tiếp tục. | FR-AUT-021 | AC-AUT-021 |
| BR-AUT-047 | Khi bước đến hạn, hệ thống kiểm tra lại tiến trình, phiên bản, điều kiện và chính sách gửi của kênh. Điều kiện không đạt thì bỏ qua bước và tiếp tục lịch sau. | FR-AUT-022 | AC-AUT-022 |
| BR-AUT-048 | Lỗi tạm thời của bước được thử lại tối đa 3 lần, sau 1, 5 và 15 phút tính từ lần lỗi ngay trước. Nếu rơi ngoài khung gửi thì dời đến đầu khung kế tiếp và chưa tính một lần thử. Lỗi vĩnh viễn không thử lại. | FR-AUT-022 | AC-AUT-022 |
| BR-AUT-049 | Sau lỗi cuối: bước Tin nhắn tiếp tục lịch sau; bước Hành động dừng tiến trình; khách chặn hoặc từ chối nhận tin làm hủy tiến trình. | FR-AUT-022 | AC-AUT-022 |
| BR-AUT-050 | Tên quy luật phải duy nhất; chỉ quy luật có ít nhất một sự kiện và một hành động hợp lệ mới được bật. Bản sao luôn ở trạng thái tắt. | FR-AUT-023 | AC-AUT-023 |
| BR-AUT-051 | Nhiều sự kiện trong một quy luật kết hợp theo HOẶC. Điều kiện của từng sự kiện phải chọn Tất cả hoặc Bất kỳ, dùng phép so sánh đúng kiểu dữ liệu; Trống/Không trống không cần giá trị so sánh. | FR-AUT-024 | AC-AUT-024 |
| BR-AUT-052 | Khi nhận sự kiện, hệ thống chốt danh sách quy luật, thứ tự và phiên bản sẽ xử lý. Trước mỗi quy luật, điều kiện được đánh giá lại bằng dữ liệu mới nhất đã được các quy luật trước lưu thành công. | FR-AUT-024, 026 | AC-AUT-024, 026 |
| BR-AUT-053 | Hành động trong một quy luật chạy tuần tự theo thứ tự đã lưu. Xung đột có thể nhận biết trong cùng quy luật phải được cảnh báo và chặn bật; mỗi hành động cập nhật dữ liệu chỉ ghi một trường. | FR-AUT-025 | AC-AUT-025 |
| BR-AUT-054 | Tần suất quy luật gồm Luôn thực hiện hoặc Chỉ một lần theo khách + quy luật. Chỉ một lần được giữ chỗ khi tạo lượt chạy hợp lệ; lỗi sau đó không cho sự kiện mới tạo thêm lượt. | FR-AUT-025 | AC-AUT-025 |
| BR-AUT-055 | Hành động quy luật lỗi tạm thời được thử lại tối đa 3 lần sau 1, 5 và 15 phút từ lần lỗi trước; chỉ chạy lại hành động lỗi. Sau lỗi cuối, dừng hành động còn lại và không hoàn tác phần đã xong. | FR-AUT-025 | AC-AUT-025 |
| BR-AUT-056 | Các quy luật cùng khớp chạy tuần tự theo thứ tự đã chốt. Quy luật sau thấy dữ liệu quy luật trước đã lưu; lần ghi sau quyết định trạng thái cuối. Lỗi một quy luật không chặn quy luật kế tiếp. | FR-AUT-026 | AC-AUT-026 |
| BR-AUT-057 | Cùng một quy luật không chạy lại trong cùng chuỗi nguyên nhân; chuỗi sự kiện phát sinh tối đa 5 cấp, cấp 6 bị chặn và ghi log. | FR-AUT-026 | AC-AUT-026 |
| BR-AUT-058 | Chỉ nhãn có sẵn, còn hiệu lực, đúng phạm vi mới được gắn/gỡ; hành động này không tự tạo, đổi tên hoặc xóa danh mục nhãn. | FR-AUT-027 | AC-AUT-027 |
| BR-AUT-059 | Gắn nhãn đã có hoặc gỡ nhãn chưa có trả thành công nhưng không đổi dữ liệu và không phát sự kiện Gắn/Gỡ nhãn. Thay đổi thật mới lưu lịch sử và phát sự kiện; yêu cầu đồng thời không được tạo trùng quan hệ. | FR-AUT-027 | AC-AUT-027 |
| BR-AUT-060 | Mỗi phiên Thu thập thông tin chỉ chờ một câu trả lời Văn bản, Email hoặc Số điện thoại. Chỉ giá trị hợp lệ mới được lưu; sau 3 lần sai chuyển nhánh thất bại hoặc kết thúc nếu không có nhánh. | FR-AUT-028 | AC-AUT-028 |
| BR-AUT-061 | Khi đang chờ, tin văn bản được Thu thập thông tin xử lý trước Từ khóa/AI/phản hồi mặc định. Menu và FAQ không phải câu trả lời; /huy kết thúc phiên, Bỏ qua chỉ dùng khi đã cấu hình. | FR-AUT-028 | AC-AUT-028 |
| BR-AUT-062 | Thời hạn 24 giờ bắt đầu khi gửi câu hỏi và được tính lại khi khách gửi câu trả lời văn bản hợp lệ hoặc không hợp lệ; Menu/FAQ không đặt lại thời hạn. Lỗi lưu tạm thời giữ câu trả lời hợp lệ để thử lại, không bắt khách nhập lại. | FR-AUT-028 | AC-AUT-028 |
| BR-AUT-063 | Mỗi hành động cập nhật đúng một trường còn hiệu lực và cho phép ghi. Giá trị có thể là hằng số, biến khách/sự kiện hoặc kết quả Thu thập thông tin/AI/API, phải đúng kiểu dữ liệu; hỗ trợ Ghi đè và Chỉ khi trống. | FR-AUT-029 | AC-AUT-029 |
| BR-AUT-064 | Trống gồm chưa có dữ liệu, chuỗi rỗng hoặc chỉ có khoảng trắng, và danh sách rỗng; số 0, false và ngày hợp lệ không phải trống. Ghi lại đúng giá trị hiện tại trả thành công nhưng không tạo lịch sử hay sự kiện thay đổi. | FR-AUT-029 | AC-AUT-029 |
| BR-AUT-065 | Thống kê chính thức gồm Khách duy nhất, Lượt kích hoạt, Đã gửi, Đã nhận, Đã đọc, Lượt bấm, Hành động thành công/thất bại và Hoàn thành/Hủy. Tỷ lệ dùng đúng mẫu số của trạng thái trước; dữ liệu trùng và dữ liệu thử bị loại. Màn hình và tệp xuất dùng cùng bộ lọc, mốc dữ liệu và múi giờ kênh/doanh nghiệp; dữ liệu cập nhật chậm nhất 15 phút và phải tách theo doanh nghiệp, kênh, nguồn, phiên bản. | FR-AUT-030 | AC-AUT-030 |

## Công thức thống kê tại BR-AUT-065

| Chỉ số | Cách tính |
| --- | --- |
| Khách duy nhất | Số mã khách khác nhau trong phạm vi bộ lọc. |
| Lượt kích hoạt | Số sự kiện hợp lệ sau khi loại mã trùng. |
| Tỷ lệ nhận | Đã nhận / Đã gửi được kênh chấp nhận. |
| Tỷ lệ đọc | Đã đọc / Đã nhận. Chỉ hiển thị khi kênh cung cấp trạng thái đọc. |
| Tỷ lệ bấm | Số khách có ít nhất một lượt bấm / số khách đã nhận. Chỉ hiển thị khi kênh cung cấp lượt bấm. |
| Tỷ lệ thành công | Hành động thành công / tổng hành động đã có kết quả thành công hoặc thất bại. |
