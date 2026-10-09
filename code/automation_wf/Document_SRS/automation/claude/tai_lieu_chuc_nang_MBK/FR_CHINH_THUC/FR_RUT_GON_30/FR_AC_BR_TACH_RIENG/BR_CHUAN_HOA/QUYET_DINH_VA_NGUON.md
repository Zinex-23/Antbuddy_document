# Quyết định đã chốt và nguồn đối chiếu

> Ngày chốt baseline: 09/10/2026. Tài liệu này giải quyết toàn bộ điểm mở của bản BR trước. “Đối chiếu nguồn” nghĩa là hành vi có căn cứ trực tiếp/gần trực tiếp; “Baseline BA” là quyết định thiết kế AntBuddy khi tài liệu Botcake và SRS không công bố chi tiết.

## Nguồn

| Mã nguồn | Tài liệu | Nội dung dùng để đối chiếu |
| --- | --- | --- |
| SRC-01 | [Botcake — Các thành phần trong thiết lập tin nhắn](https://docs.pancake.biz/botcake/st-f6/st-p1/st-s1?lang=vi) | Văn bản 1.200 ký tự, 3 nút, tệp đính kèm 25 MB, User Input. |
| SRC-02 | [Botcake — Dynamic block docs](https://docs.pancake.biz/botcake/st-f7/st-p1?lang=en) | 11 trả lời nhanh, hành động nhãn/trường, giới hạn tệp và loại nút. |
| SRC-03 | [Botcake — Keywords](https://docs.pancake.biz/botcake/st-f3/st-p4/st-s5?lang=en) | Các cách khớp; không cho từ khóa rỗng/trùng; quy tắc đứng trước được ưu tiên. |
| SRC-04 | [Botcake — Welcome Message](https://docs.pancake.biz/botcake/st-f3/st-p4/st-s3?lang=en) | Welcome Message chạy khi khách mới bấm Start/Get Started. |
| SRC-05 | [Botcake — Default Reply](https://docs.pancake.biz/botcake/st-f3/st-p4/st-s4?lang=en) | Default Reply cho khách quay lại và có chu kỳ gửi. |
| SRC-06 | [Botcake — Sequences](https://docs.pancake.biz/botcake/st-f3/st-p4/st-s6?lang=en) | Lịch Sau X tính từ lúc khách được đăng ký kịch bản; điều kiện và bật bước gửi. |
| SRC-07 | [Botcake — API Reference](https://docs.pancake.biz/botcake/st-f7/st-p2?lang=en) | Sequence có số gửi, giao, xem, bấm; có lịch sử thao tác khách. |
| SRC-08 | [Botcake — Custom Field](https://docs.pancake.biz/botcake/st-f5/st-p6?lang=en) | Kiểu dữ liệu trường và đồng bộ CRM. |
| SRC-09 | [Botcake — Key components, User Input](https://docs.pancake.biz/botcake/st-f6/st-p1/st-s1?lang=en) | Nhập Văn bản/Email/Số điện thoại, kiểm tra định dạng, Bỏ qua và lưu vào Custom Field. |
| SRC-10 | [SRS AntBot v1.3](../../../../../../../flow/%5BAntBuddy%5D%20SRS%20AntBot%20v1.3.pdf) | Mẫu BR dùng chung ở trang 56–58; mẫu AC Given/When/Then/And ở trang 66–69. |
| SRC-11 | [Đặc tả menu cập nhật](../../../../../../FR_AUT_001%28updated%29.md) | Chuẩn hóa tên, URL http/https, bản sao DRAFT, hành vi bản nháp và xuất bản. |
| SRC-12 | [FR trình biên soạn nguồn](../../FR_AUT_001_BIEN_SOAN_NOI_DUNG_TIN_NHAN.md) và [FR trả lời nhanh nguồn](../../FR_AUT_003_CAU_HINH_TRA_LOI_NHANH.md) | Bản nguồn dùng ảnh 5 MB và 13 trả lời nhanh; dùng để nhận biết khác biệt với Botcake hiện hành. |

## Số liệu đã chọn khi nguồn khác nhau

- Bộ chuẩn hóa dùng 25 MB cho mọi tệp và 11 trả lời nhanh theo tài liệu Botcake hiện hành (SRC-01, SRC-02), thay cho 5 MB và 13 trả lời nhanh ở FR nguồn (SRC-12).
- Đây là baseline theo Botcake mà người dùng yêu cầu ưu tiên đối chiếu. BR-AUT-001 vẫn bảo đảm kênh nào có giới hạn thấp hơn thì dùng giới hạn thấp hơn.
- Mốc 1.200 ký tự không nút và 640 ký tự có nút giữ theo FR nguồn; Botcake công bố khác nhau theo ngôn ngữ/loại thông điệp nên không dùng một con số để vượt quy định kênh.

## Các quyết định

| Điểm mở cũ | Quyết định đã chốt | Căn cứ | BR mới |
| --- | --- | --- | --- |
| BR cũ 021 | Giới hạn chữ tính cho từng khối văn bản được gửi độc lập, không cộng toàn bộ luồng. | SRC-01; đối chiếu nguồn. | BR-AUT-002 |
| BR cũ 022 | Kiểm tra lại sau khi thay biến; vượt giới hạn thì chặn gửi và ghi lỗi, không tự cắt. | SRC-01 và nguyên tắc tránh làm sai nội dung; Baseline BA. | BR-AUT-002 |
| BR cũ 029 | Tên trả lời nhanh trùng sau khi bỏ khoảng trắng đầu/cuối, gộp khoảng trắng và không phân biệt hoa thường. | SRC-03, SRC-11; chuẩn hóa chung. | BR-AUT-006 |
| BR cũ 038 | Gửi thử chuyển nội dung thật đến tài khoản thử, nhưng mô phỏng hành động dữ liệu và tách khỏi thống kê thật. | SRC-09 cho cơ chế Preview; Baseline BA để không làm bẩn dữ liệu thật. | BR-AUT-011 |
| BR cũ 043 | Hành động được tính thành công khi AntBuddy/kênh chấp nhận xử lý. Mở URL không chờ trình duyệt xác nhận; chuyển menu sau khi chấp nhận lượt bấm. | Giới hạn quan sát của nền tảng; Baseline BA. | BR-AUT-019 |
| BR cũ 047 | Tên menu dùng cùng chuẩn bỏ/gộp khoảng trắng và không phân biệt hoa thường. | SRC-11; đối chiếu nguồn nội bộ. | BR-AUT-006 |
| BR cũ 058 | Nội dung FAQ dùng cùng chuẩn tên để phát hiện trùng. | Chuẩn hóa nhất quán; Baseline BA. | BR-AUT-006 |
| BR cũ 063 | Chọn luồng thành công khi yêu cầu khởi chạy được chấp nhận và bước đầu được xếp lịch, không chờ toàn luồng kết thúc. | Đặc tính xử lý bất đồng bộ; Baseline BA. | BR-AUT-024 |
| BR cũ 064 | Khi một hành động FAQ lỗi, các hành động còn lại vẫn tiếp tục; không hoàn tác hành động đã xong. | Tránh bỏ sót hành động bổ sung; Baseline BA. | BR-AUT-024 |
| BR cũ 072 | Kiểm tra lại trạng thái ngay trước khi gửi; cấu hình tắt, bot dừng hoặc nhân viên tiếp quản thì hủy lời chào đang chờ. | SRC-04 và nguyên tắc handover; Baseline BA. | BR-AUT-028 |
| BR cũ 079 | Sửa/tắt/bật phản hồi mặc định không đặt lại lịch sử Chỉ một lần. | SRC-05 xác nhận có chu kỳ; Baseline BA để tránh gửi lại ngoài ý muốn. | BR-AUT-032 |
| BR cũ 086 | Hủy phản hồi mặc định đang chờ nếu Từ khóa, AI hoặc nhân viên đã xử lý trước giờ gửi. | Tránh phản hồi trùng/xung đột; Baseline BA. | BR-AUT-031 |
| BR cũ 093 | X hợp lệ: 1–1.440 phút, 1–720 giờ hoặc 1–30 ngày. | SRC-05 xác nhận có chu kỳ nhưng không công bố ngưỡng; Baseline BA. | BR-AUT-029, 035 |
| BR cũ 094 | Khóa trùng Từ khóa = kênh + phạm vi nguồn + cách khớp + tập từ khóa đã chuẩn hóa. | SRC-03; đối chiếu nguồn và chốt phạm vi. | BR-AUT-034 |
| BR cũ 104 | Nhập file dùng đúng khóa trùng của nhập tay. | Tính nhất quán dữ liệu; Baseline BA. | BR-AUT-034, 038 |
| BR cũ 105 | Cập nhật chỉ ghi cột cấu hình có trong tệp; giữ mã, lịch sử tần suất và thống kê. | Không làm mất dữ liệu vận hành; Baseline BA. | BR-AUT-038 |
| BR cũ 112 | Quy tắc khớp nhưng hết tần suất bị bỏ qua; xét quy tắc đủ điều kiện tiếp theo. | SRC-03 xác nhận ưu tiên danh sách; Baseline BA cho bước lọc tần suất. | BR-AUT-039 |
| BR cũ 122 | Tắt bước chỉ tạo phiên bản mới; khách cũ giữ phiên bản đã đăng ký. Muốn dừng khách cũ phải hủy tiến trình. | SRC-06 và nguyên tắc version pinning; Baseline BA. | BR-AUT-044 |
| BR cũ 134 | Các mốc 1, 5, 15 phút tính từ lần lỗi ngay trước. | Backoff tuần tự; Baseline BA. | BR-AUT-048 |
| BR cũ 135 | Retry ngoài khung gửi được dời tới đầu khung kế tiếp và chưa tiêu tốn lần thử. | Bảo toàn giới hạn kênh và số lần thử; Baseline BA. | BR-AUT-048 |
| BR cũ 145 | Chốt danh sách/thứ tự/phiên bản lúc nhận sự kiện; đọc lại dữ liệu trước từng quy luật để quy luật sau thấy thay đổi đã lưu. | Nhất quán một lượt xử lý và hỗ trợ chuỗi quy luật; Baseline BA. | BR-AUT-052 |
| BR cũ 154 | Retry hành động Quy luật dùng cùng lịch 1, 5, 15 phút, tính từ lần lỗi trước. | Dùng một chuẩn retry dễ vận hành; Baseline BA. | BR-AUT-055 |
| BR cũ 160 | Thứ tự và phiên bản Quy luật được đóng băng khi nhận sự kiện; chỉnh sửa chỉ áp dụng sự kiện mới. | Tránh đổi logic giữa một lượt chạy; Baseline BA. | BR-AUT-052 |
| BR cũ 167 | Gắn nhãn đã có/gỡ nhãn chưa có là thành công không đổi dữ liệu và không phát sự kiện nhãn. | Tránh vòng lặp giả; Baseline BA. | BR-AUT-059 |
| BR cũ 176 | Thời hạn 24 giờ đặt lại khi có câu trả lời văn bản hợp lệ hoặc không hợp lệ; Menu/FAQ không đặt lại. | SRC-09 phân biệt User Input với nút/FAQ; Baseline BA. | BR-AUT-062 |
| BR cũ 182 | Trống = null/chưa có, chuỗi rỗng/chỉ có khoảng trắng hoặc danh sách rỗng; 0, false và ngày hợp lệ không trống. | SRC-08 cho các kiểu dữ liệu; Baseline BA cho cách đánh giá. | BR-AUT-064 |
| BR cũ 183 | Ghi cùng giá trị trả thành công nhưng không tạo lịch sử hay sự kiện thay đổi. | Tránh vòng lặp và thống kê sai; Baseline BA. | BR-AUT-064 |
| BR cũ 190 | Chốt bộ chỉ số, công thức, múi giờ và độ trễ tối đa 15 phút tại BR-AUT-065. | SRC-07 xác nhận các trạng thái thống kê Botcake; công thức và SLA là Baseline BA. | BR-AUT-065 |

## Kết luận sử dụng

- Các quyết định trên đã được đưa trực tiếp vào 65 BR và 30 AC; không còn tiêu chí treo.
- Nếu Product Owner đổi baseline, chỉ sửa BR tương ứng, AC của FR liên quan và dòng quyết định này.
- Các giới hạn phụ thuộc kênh vẫn tuân BR-AUT-001; không được dùng một con số chung để vượt giới hạn của kênh.
