# Báo cáo review AC và BR

> Ngày review: 09/10/2026  
> Phạm vi: FR-AUT-001 đến FR-AUT-030

## 1. Kết quả tổng hợp

- Đã đọc và review: **30/30 FR**.
- Đã tạo mới: **30 tài liệu AC** với **181 AC** và **30 tài liệu BR** với **207 BR**.
- Danh sách FR chỉ giữ mã và tên; toàn bộ nội dung AC/BR được tách sang thư mục riêng.
- Mỗi AC là một tình huống độc lập, trình bày đúng bốn mục **Given – When – Then – And**.
- Có **28 BR cần xác nhận** thuộc 22 FR. Các nội dung này không được chuyển thành AC khẳng định hành vi.

## 2. Nguồn đối chiếu

1. Bộ 30 FR, `README.md` và `CAN_XAC_NHAN.md` trong thư mục `FR_RUT_GON_30`.
2. Tài liệu nguồn `code/automation_wf/Document_SRS/flow/[AntBuddy] SRS AntBot v1.3.pdf`.
3. Checklist review AC/BR do người dùng đính kèm ngày 09/10/2026.

Các số liệu và hành vi đã có căn cứ được đưa thẳng vào AC/BR. Nội dung chưa được nguồn định nghĩa hoặc có nguồn mâu thuẫn được giữ ở BR với nhãn **[CẦN XÁC NHẬN]**.

## 3. Chi tiết theo FR

| FR | AC/BR đã tạo | Nội dung chính |
| --- | --- | --- |
| FR-AUT-001 | 8 AC / 8 BR | Ngưỡng văn bản 1.200/1.201 và 640/641; giới hạn tệp 5 MB/25 MB; kênh có giới hạn thấp hơn được ưu tiên. |
| FR-AUT-002 | 6 AC / 5 BR | Tối đa 3 nút; tên nút 20/21 ký tự; thêm nút khi văn bản vượt 640 ký tự; phân biệt sự kiện lặp và lượt bấm mới. |
| FR-AUT-003 | 6 AC / 6 BR | Tối đa 13 lựa chọn; tên 20/21 ký tự; lựa chọn đầu tiên, hết hiệu lực, sai tin nhắn và sự kiện lặp. |
| FR-AUT-004 | 6 AC / 5 BR | Tối đa 30 bước; số lần chạy bước 5/6; bước chờ; phân biệt chuyển tiếp, nhánh điều kiện và kết thúc. |
| FR-AUT-005 | 5 AC / 6 BR | Tách Xem trước, Xem thử và Gửi thử; Xem thử không thay đổi dữ liệu hoặc thống kê thật. |
| FR-AUT-006 | 6 AC / 6 BR | Menu 20/21 mục; tên 30/31 ký tự; giữ menu riêng; chỉ chuyển menu sau khi hành động chính thành công. |
| FR-AUT-007 | 6 AC / 7 BR | Xóa menu đang dùng; gán lại cùng menu; thay thế menu cũ; bảo toàn tham chiếu và lịch sử. |
| FR-AUT-008 | 6 AC / 6 BR | Chặn menu rỗng; bảo vệ bản đang áp dụng và bản nháp mới; thử lại không tạo tác động trùng. |
| FR-AUT-009 | 6 AC / 6 BR | Giới hạn 4/5 câu hỏi và 45/46 ký tự; xuất bản rỗng; lỗi xuất bản giữ bản cũ. |
| FR-AUT-010 | 4 AC / 7 BR | Phản hồi chính lỗi thì dừng; lượt chọn FAQ không dò Từ khóa; chống xử lý lặp. Không tạo AC cho chính sách lỗi bổ sung còn mâu thuẫn. |
| FR-AUT-011 | 6 AC / 6 BR | Tắt không xóa nội dung; bật lại cần cấu hình hợp lệ; chặn sai kênh và luồng tham chiếu đã xóa. |
| FR-AUT-012 | 6 AC / 6 BR | Phân biệt sự kiện lặp, Get Started mới và khách quay lại; tin đầu tiên tiếp tục được xử lý. |
| FR-AUT-013 | 7 AC / 8 BR | Khoảng nghỉ mặc định 24 giờ; độ trễ mặc định 0; kiểm biên 1 phút–30 ngày và 0–24 giờ. |
| FR-AUT-014 | 6 AC / 7 BR | Hai tin đồng thời; chỉ bắt đầu khoảng nghỉ khi gửi thành công; lớp ưu tiên đã xử lý thì không gửi mặc định. |
| FR-AUT-015 | 6 AC / 8 BR | Các cách so khớp; đúng nguồn tin; sửa quy tắc không đặt lại lịch sử; độ trễ tối đa 24 giờ. |
| FR-AUT-016 | 5 AC / 5 BR | Quy tắc tắt không được chọn; xóa vẫn giữ thống kê; thao tác hàng loạt và thứ tự ưu tiên. |
| FR-AUT-017 | 6 AC / 8 BR | CSV UTF-8; ngưỡng 10 MB và 10.000 dòng; lỗi theo dòng; thiếu phản hồi thì nhập ở trạng thái chưa hoàn tất. |
| FR-AUT-018 | 6 AC / 7 BR | Chọn đúng quy tắc ưu tiên; lỗi không rơi xuống quy tắc thấp hơn; thử lại không trùng; không khớp thì chuyển lớp sau. |
| FR-AUT-019 | 5 AC / 5 BR | Chặn xóa khi còn tiến trình; tắt chặn đăng ký mới; giữ lịch sử; bản sao không mang khách và kết quả. |
| FR-AUT-020 | 6 AC / 7 BR | “Sau X” tính từ lúc đăng ký; dời ngoài khung; bỏ mốc đã qua; xét điều kiện khi đến hạn. |
| FR-AUT-021 | 6 AC / 6 BR | Đăng ký lặp giữ tiến trình; đăng ký lại tạo tiến trình mới; kịch bản tắt vẫn cho hủy; giữ lịch sử. |
| FR-AUT-022 | 7 AC / 9 BR | Tối đa 3 lần thử; lỗi vĩnh viễn không thử; xử lý lỗi cuối theo loại bước; tôn trọng điều kiện gửi của kênh. |
| FR-AUT-023 | 5 AC / 6 BR | Xóa ngăn lần chạy mới và giữ lịch sử; bản sao ở trạng thái tắt; cấu hình thiếu không thể bật. |
| FR-AUT-024 | 6 AC / 7 BR | Nhiều sự kiện dùng HOẶC; điều kiện Tất cả/Bất kỳ; phép so sánh theo kiểu dữ liệu; Trống/Không trống không cần giá trị. |
| FR-AUT-025 | 6 AC / 9 BR | Ghi nhận Chỉ 1 lần trước hành động đầu; lỗi không tạo lần chạy mới; thử lại không lặp hành động đã thành công. |
| FR-AUT-026 | 6 AC / 8 BR | Nhiều quy luật chạy tuần tự; hành động sau quyết định trạng thái cuối; lỗi không chặn quy luật kế; chống vòng lặp 5/6 cấp. |
| FR-AUT-027 | 6 AC / 7 BR | Gắn nhãn đã có và gỡ nhãn chưa có là thao tác không đổi dữ liệu; yêu cầu đồng thời không tạo quan hệ trùng. |
| FR-AUT-028 | 8 AC / 9 BR | Sai lần 1–2 và lần 3; nhánh thất bại; Bỏ qua và `/huy`; Menu/FAQ; lỗi lưu tạm thời; thời hạn 24 giờ. |
| FR-AUT-029 | 6 AC / 8 BR | Kiểm nguồn và kiểu dữ liệu; cập nhật nhiều trường tuần tự; Chỉ khi trống; chính sách lỗi thuộc chức năng gọi. |
| FR-AUT-030 | 7 AC / 9 BR | Phân biệt số khách/số lượt; chống trùng; màn hình và tệp xuất; loại dữ liệu thử; tách trạng thái gửi. |

## 4. Danh sách cần xác nhận

| FR | Mã BR | Nội dung cần quyết định |
| --- | --- | --- |
| FR-AUT-001 | BR-AUT-001-07 | Giới hạn ký tự tính trên từng khối hay tổng văn bản của một bước. |
| FR-AUT-001 | BR-AUT-001-08 | Cách xử lý khi dữ liệu thật thay biến làm nội dung vượt giới hạn. |
| FR-AUT-003 | BR-AUT-003-06 | Cách chuẩn hóa tên trả lời nhanh khi kiểm trùng. |
| FR-AUT-005 | BR-AUT-005-06 | Gửi thử mô phỏng hay tạo dữ liệu và thống kê thật trên tài khoản thử nghiệm. |
| FR-AUT-006 | BR-AUT-006-06 | Thời điểm được tính là hành động chính thành công, nhất là Mở trang web. |
| FR-AUT-007 | BR-AUT-007-07 | Cách chuẩn hóa tên menu tùy chỉnh khi kiểm trùng. |
| FR-AUT-009 | BR-AUT-009-06 | Cách chuẩn hóa câu hỏi gợi ý khi kiểm trùng. |
| FR-AUT-010 | BR-AUT-010-06 | Chọn luồng thành công khi khởi chạy được chấp nhận hay khi toàn bộ luồng hoàn tất. |
| FR-AUT-010 | BR-AUT-010-07 | Hành động bổ sung lỗi luôn tiếp tục hay xử lý theo cấu hình. |
| FR-AUT-012 | BR-AUT-012-06 | Có kiểm tra lại trạng thái bot/nhân viên trước khi gửi lời chào đang chờ hay không. |
| FR-AUT-013 | BR-AUT-013-08 | Sửa cấu hình có đặt lại lịch sử Chỉ 1 lần hay không. |
| FR-AUT-014 | BR-AUT-014-07 | Có hủy phản hồi mặc định đang chờ khi lớp ưu tiên hoặc nhân viên đã xử lý tin hay không. |
| FR-AUT-015 | BR-AUT-015-07 | Giá trị nhỏ nhất/lớn nhất của X trong tần suất mỗi X phút/giờ/ngày. |
| FR-AUT-015 | BR-AUT-015-08 | Khóa xác định hai quy tắc Từ khóa trùng nhau. |
| FR-AUT-017 | BR-AUT-017-07 | Khóa trùng khi nhập tệp phải dùng định nghĩa được chốt tại FR-AUT-015. |
| FR-AUT-017 | BR-AUT-017-08 | Các cột được cập nhật và cách giữ/đặt lại lịch sử Chỉ 1 lần. |
| FR-AUT-018 | BR-AUT-018-07 | Xử lý khi quy tắc ưu tiên khớp nhưng hết tần suất. |
| FR-AUT-020 | BR-AUT-020-07 | Tắt bước chỉ áp dụng bản mới hay dừng lịch chưa chạy của phiên bản cũ. |
| FR-AUT-022 | BR-AUT-022-08 | Mốc thử lại 1/5/15 phút tính từ lần lỗi đầu hay lần thử trước. |
| FR-AUT-022 | BR-AUT-022-09 | Cách xử lý lần thử lại rơi ngoài khung gửi. |
| FR-AUT-024 | BR-AUT-024-07 | Dùng ảnh chụp dữ liệu tại sự kiện hay đánh giá lại trước từng quy luật. |
| FR-AUT-025 | BR-AUT-025-09 | Khoảng thời gian giữa ba lần thử lại của hành động Quy luật. |
| FR-AUT-026 | BR-AUT-026-07 | Thời điểm cố định thứ tự và phiên bản cấu hình khi danh sách thay đổi trong lúc chạy. |
| FR-AUT-027 | BR-AUT-027-07 | Thao tác không đổi dữ liệu có phát sinh sự kiện Gắn/Gỡ nhãn hay không. |
| FR-AUT-028 | BR-AUT-028-09 | Tương tác nào đặt lại thời hạn 24 giờ, gồm cả Menu/FAQ hay không. |
| FR-AUT-029 | BR-AUT-029-07 | Định nghĩa giá trị trống cho từng kiểu dữ liệu. |
| FR-AUT-029 | BR-AUT-029-08 | Ghi cùng giá trị có phát sinh sự kiện thay đổi trường hay không. |
| FR-AUT-030 | BR-AUT-030-09 | Danh mục/công thức chỉ số, múi giờ chốt ngày và độ trễ cập nhật. |

## 5. Mâu thuẫn ngoài phạm vi AC/BR không chỉnh trong FR nguồn

| Vị trí | Mâu thuẫn |
| --- | --- |
| FR-AUT-010, Luồng thay thế và Sub-flow | Luồng thay thế nói lỗi hành động bổ sung xử lý theo cấu hình; Sub-flow lại quy định luôn ghi nhận rồi tiếp tục. |
| FR-AUT-020, AC nguồn và Sub-flow/BR nguồn | AC nguồn nói tắt bước ngăn việc chưa chạy; quy tắc phiên bản nói khách đang tham gia giữ cấu hình cũ và thay đổi chỉ áp dụng bản mới. |
| FR-AUT-024 Sub-flow/BR và FR-AUT-026 BR | FR-AUT-024 dùng dữ liệu tại thời điểm sự kiện; FR-AUT-026 nói quy luật sau thấy dữ liệu do quy luật trước cập nhật. |

Các mâu thuẫn trên được phản ánh tại BR-AUT-010-07, BR-AUT-020-07 và BR-AUT-024-07; chưa tạo AC khẳng định phương án nào.

## 6. Kết quả kiểm tra cấu trúc

- Đủ 30 mã FR theo thứ tự FR-AUT-001 đến FR-AUT-030.
- Đủ 30 file AC và 30 file BR; tất cả liên kết trong danh sách FR tồn tại.
- Không trùng mã AC hoặc BR; mã trong từng FR liên tục từ 01.
- Mỗi AC có đủ và chỉ có bốn dòng Given, When, Then, And.
- Không có nhãn **[CẦN XÁC NHẬN]** trong AC.
- Thư mục FR chỉ có danh sách mã và tên, không chứa nội dung FR chi tiết.
- Không sửa bộ 30 FR nguồn và không ghi đè các thay đổi có sẵn của người dùng.
