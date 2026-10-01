# FR-AUT-001: Menu chính

## PHẦN 1: BẢNG SO SÁNH KHÁC BIỆT (BẢN CŨ vs BẢN MỚI TỪ THIẾT KẾ UI)

| STT | Hạng mục | Bản cũ (Sơ khai) | Bản mới (Chuẩn hóa theo Thiết kế UI) | Giá trị kỹ thuật & Dev cần lưu ý |
| --- | --- | --- | --- | --- |
| 1 | Phân loại menu | Nêu Menu mặc định và Menu tùy chỉnh nhưng chưa mô tả cách trình bày. | Màn hình tổng quan tách thành khối `Menu mặc định` và khối `Menu tùy chỉnh`. Menu mặc định có `Chỉnh sửa`; Menu tùy chỉnh có `Tạo mới` và danh sách menu. | Dùng `mode` để phân biệt `DEFAULT` và `USER_LEVEL`. Mỗi kênh chỉ có một Menu mặc định; Menu mặc định không có thao tác xóa. |
| 2 | Mô tả phạm vi áp dụng | Menu tùy chỉnh được gán riêng cho từng người dùng. | UI ghi rõ `Menu điều hướng mặc định cho người dùng chưa được chuyển sang menu khác.` và `Menu thay thế, được áp dụng cho từng người dùng qua hành động chuyển menu.` | Lưu quan hệ gán menu theo `customer_id`; khi không có gán hợp lệ thì dùng Menu mặc định. |
| 3 | Thao tác Menu tùy chỉnh | Chỉ nêu tạo Menu tùy chỉnh. | Mỗi dòng Menu tùy chỉnh có `Chỉnh sửa` và menu ngữ cảnh gồm `Đổi tên`, `Nhân bản`, `Xóa`. | Nhân bản phải tạo ID mới và trạng thái nháp. Xóa phải xử lý người dùng và tham chiếu đang dùng menu. |
| 4 | Danh sách mục menu | Nêu tối đa 20 mục nhưng chưa có counter và sắp xếp. | Màn hình chỉnh sửa hiển thị tiêu đề `CÁC MỤC MENU`, counter dạng `3/20 mục`, nút `Thêm mục menu` và tay nắm kéo thả từng mục. | Mảng `items` có tối đa 20 phần tử; `order` liên tục và được cập nhật sau kéo thả hoặc xóa. |
| 5 | Tên hiển thị | Nêu tiêu đề nút tối đa 30 ký tự. | Popup `Hiệu chỉnh nút` có label `Tên hiển thị`, counter `N/30` và placeholder `Nhập tên mục...`. | Bắt buộc sau khi trim; `maxlength` bằng 30; lỗi rỗng là `Tên hiển thị là bắt buộc.`. |
| 6 | Hành động khi bấm | Liệt kê bốn hành động nhưng chưa mô tả input động. | Bộ chọn có bốn lựa chọn: `Tạo tin nhắn mới` với mô tả `Soạn nội dung phản hồi mới`; `Chọn luồng tin nhắn` với mô tả `Bắt đầu với một luồng có sẵn`; `Nhận thông báo` với mô tả `Đăng ký nhận thông báo Opt-in`; `Mở trang web` với mô tả `Mở một liên kết bên ngoài`. | Chuẩn hóa enum `NEW_MESSAGE`, `MESSAGE_FLOW`, `OPT_IN`, `OPEN_URL`; chỉ payload tương ứng với loại hành động được phép có giá trị. |
| 7 | Validation nội dung | Chỉ nêu đánh dấu đỏ trường thiếu. | Với `Tạo tin nhắn mới`, UI hiển thị label `Nội dung tin nhắn tự động`, placeholder `Nhập nội dung phản hồi...`; trạng thái lỗi có viền đỏ và câu `Nội dung tin nhắn là bắt buộc.`. | Validation phải chạy khi chỉnh sửa và trước khi lưu hoặc xuất bản; giữ nguyên dữ liệu người dùng đã nhập khi có lỗi. |
| 8 | Chuyển menu sau khi nhấn | Bản cũ chỉ nhắc hành động chuyển menu ở mức tổng quát. | Popup có toggle `Chuyển menu sau khi nhấn` và mô tả `Tùy chọn này chỉ thay đổi menu của người dùng vừa thực hiện thao tác.`. Khi bật, hiển thị trường `Menu đích`. | `shouldSwitchMenu = true` bắt buộc có `targetMenuId` trỏ đến menu đã xuất bản và cùng kênh. |
| 9 | Xem trước | Chỉ nêu Mobile Preview thời gian thực. | Khối `Xem trước` hiển thị tên menu đang chọn và mô phỏng menu ở đáy khung chat; ví dụ thiết kế gồm `Xem sản phẩm`, `Bảng giá mới nhất`, `Liên hệ tư vấn`. | Preview lấy trực tiếp từ state nháp và cập nhật khi đổi tên, thêm, xóa hoặc sắp xếp; không cần chờ lưu API. |
| 10 | Thống kê | Chưa có. | Khối `Thống kê [Tên menu]` hiển thị số người dùng cùng các chỉ số `Thành công`, `Đã đọc`, `Đã click`, `Thất bại`, `KH để lại SĐT`. | API thống kê phải nhận `channelId` và `menuId`; số liệu thay đổi theo menu đang được chọn. |
| 11 | Lưu và xuất bản | Chỉ có hành động `Xuất bản`. | Trạng thái màn hình chỉnh sửa phân biệt bản nháp, thay đổi chưa lưu và đã xuất bản; có `Lưu nháp` và `Xuất bản`. Popup mục menu có nút `Lưu` và thao tác xóa mục. | Lưu mục chỉ cập nhật state nháp. `Lưu nháp` ghi cấu hình nhưng không đổi bản đang phục vụ. `Xuất bản` mới kích hoạt và đồng bộ kênh. |
| 12 | Chọn kênh | Pre-condition chỉ nói kênh hoạt động. | Giao diện có bộ chọn trang hoặc kênh và thể hiện trạng thái kết nối. | Mọi menu, preview, thống kê và thao tác lưu phải được phân vùng theo `channel_id`; chặn xuất bản nếu kênh mất kết nối. |

## PHẦN 2: BẢNG ĐẶC TẢ CHI TIẾT THEO CHUẨN SRS ANTBUDDY

| Mục | Nội dung |
| --- | --- |
| Mã chức năng | `FR-AUT-001` - Menu chính |
| Mô tả | Cho phép Admin hoặc Quản lý tạo, chỉnh sửa, xem trước, lưu nháp và xuất bản menu điều hướng của một kênh chat. Hệ thống quản lý một Menu mặc định cho người dùng chưa được chuyển menu và nhiều Menu tùy chỉnh có thể gán theo từng người dùng. Phạm vi gồm quản lý menu, quản lý mục menu, cấu hình hành động, chuyển menu sau khi nhấn, xem trước và thống kê theo menu. |
| Đối tượng liên quan | `Admin`: toàn quyền xem, tạo, sửa, nhân bản, xóa, lưu nháp và xuất bản.<br>`Quản lý`: thực hiện các thao tác khi có quyền quản lý Automation.<br>`Viewer` nếu hệ thống có vai trò này: chỉ xem danh sách, preview và thống kê; không được thay đổi dữ liệu.<br>Dịch vụ liên quan: dịch vụ kênh chat, dịch vụ luồng tin nhắn, Opt-in, thống kê và audit log. |
| Pre-conditions | 1. Người dùng đã đăng nhập.<br>2. Người dùng thuộc đúng tenant và có quyền xem chức năng Menu chính.<br>3. Trang hoặc kênh đã được chọn.<br>4. Kênh đã kết nối và đang hoạt động để xuất bản; khi mất kết nối vẫn có thể xem dữ liệu đã lưu nhưng không được xuất bản.<br>5. Danh sách luồng tin nhắn, mẫu Opt-in và menu đích đã được tải khi cần cấu hình hành động tương ứng. |
| Điều kiện kích hoạt | Người dùng vào AntBot → Tự động hóa → Menu chính. Từ màn hình tổng quan, người dùng chọn `Chỉnh sửa` ở Menu mặc định hoặc Menu tùy chỉnh, hoặc chọn `Tạo mới`. |
| Luồng xử lý chính (Main Flow) | 1. Hệ thống tải Menu mặc định, danh sách Menu tùy chỉnh, menu đang được chọn, Mobile Preview và thống kê của trang hoặc kênh.<br>2. Hệ thống hiển thị khối `Menu mặc định`, khối `Menu tùy chỉnh`, khối `Xem trước` và khối `Thống kê [Tên menu]`.<br>3. Người dùng bấm `Chỉnh sửa` ở Menu mặc định hoặc một Menu tùy chỉnh. Hệ thống mở màn hình chỉnh sửa và tải các mục theo đúng thứ tự.<br>4. Trường hợp tạo Menu tùy chỉnh, người dùng bấm `Tạo mới` → hệ thống mở dialog `Tạo menu tùy chỉnh` → người dùng nhập `Tên Menu` → bấm `Tạo menu` → hệ thống tạo bản nháp rỗng.<br>5. Màn hình chỉnh sửa hiển thị `CÁC MỤC MENU`, counter `N/20 mục`, nút `Thêm mục menu` và Mobile Preview.<br>6. Người dùng bấm `Thêm mục menu` hoặc chọn một mục có sẵn. Hệ thống mở popup `Hiệu chỉnh nút`.<br>7. Người dùng nhập `Tên hiển thị`. Hệ thống cập nhật counter `N/30` và Mobile Preview theo thời gian thực.<br>8. Người dùng chọn một trong bốn hành động tại `Hành động khi bấm`.<br>9. Hệ thống hiển thị trường cấu hình tương ứng: nội dung phản hồi, luồng đang hoạt động, mẫu Opt-in hoặc URL.<br>10. Nếu cần, người dùng bật `Chuyển menu sau khi nhấn` → hệ thống hiển thị `Menu đích` → người dùng chọn một menu đã xuất bản.<br>11. Người dùng bấm `Lưu` trong popup. Hệ thống kiểm tra mục hiện tại; nếu hợp lệ thì cập nhật state nháp, đóng popup và cập nhật danh sách cùng Mobile Preview. Thao tác này chưa làm thay đổi menu đang phục vụ khách hàng.<br>12. Người dùng có thể kéo thả các mục. Hệ thống cập nhật `order` và Mobile Preview ngay lập tức.<br>13. Người dùng bấm `Lưu nháp`. Hệ thống lưu cấu hình ở trạng thái `DRAFT`; phiên bản đang hoạt động không đổi.<br>14. Người dùng bấm `Xuất bản`. Hệ thống kiểm tra toàn bộ menu, quyền và kết nối kênh.<br>15. Nếu hợp lệ, hệ thống tạo phiên bản xuất bản, đồng bộ đúng kênh, cập nhật trạng thái `PUBLISHED` và ghi audit log.<br>16. Hệ thống tải lại trạng thái, danh sách và Mobile Preview của phiên bản vừa xuất bản. |
| Post-condition | 1. Khi lưu nháp thành công, cấu hình mới tồn tại ở trạng thái `DRAFT`; phiên bản đang hoạt động không đổi.<br>2. Khi xuất bản thành công, menu có trạng thái `PUBLISHED`, được gắn với đúng kênh và có phiên bản mới.<br>3. Preview và thống kê tiếp tục tham chiếu đúng menu đang chọn.<br>4. Các thay đổi tạo, sửa, nhân bản, xóa và xuất bản được ghi audit log. |
| Luồng thay thế & Xử lý ngoại lệ (Alternative/Exception Flows) | `AF-1 - Đạt 20 mục`: Khi menu có 20 mục, hệ thống hiển thị `20/20 mục`, vô hiệu hóa `Thêm mục menu`; nếu vẫn nhận yêu cầu thêm từ API thì trả lỗi giới hạn.<br><br>`AF-2 - Tên hiển thị rỗng`: Hiển thị viền đỏ và `Tên hiển thị là bắt buộc.`, chặn lưu mục.<br><br>`AF-3 - Tên vượt giới hạn`: Input không nhận quá 30 ký tự; counter tối đa là `30/30`.<br><br>`AF-4 - Nội dung tin nhắn rỗng`: Với `Tạo tin nhắn mới`, hiển thị viền đỏ và `Nội dung tin nhắn là bắt buộc.`, chặn lưu.<br><br>`AF-5 - Cấu hình hành động không hợp lệ`: Luồng không hoạt động hiển thị `Vui lòng chọn một luồng đang hoạt động.`; thiếu mẫu Opt-in hiển thị `Vui lòng chọn mẫu Opt-in.`; URL không bắt đầu bằng `http://` hoặc `https://` hiển thị `URL phải bắt đầu bằng http:// hoặc https://.`.<br><br>`AF-6 - Menu đích không hợp lệ`: Khi toggle đã bật nhưng chưa chọn menu đích hợp lệ, hiển thị `Vui lòng chọn một menu đã xuất bản.`, chặn lưu hoặc xuất bản.<br><br>`AF-7 - Kênh mất kết nối`: Giữ dữ liệu nháp, vô hiệu hóa xuất bản và thông báo cần kết nối lại kênh.<br><br>`AF-8 - Liên kết hỏng`: Nếu luồng, mẫu Opt-in hoặc menu đích đã bị xóa hoặc ngừng hoạt động, đánh dấu trường tương ứng là không hợp lệ và chặn xuất bản đến khi người dùng chọn lại.<br><br>`AF-9 - Lưu hoặc đồng bộ thất bại`: Giữ nguyên state và dữ liệu nhập, không đánh dấu đã lưu hoặc đã xuất bản, cho phép thử lại.<br><br>`AF-10 - Rời trang khi có thay đổi chưa lưu`: Hiển thị cảnh báo xác nhận. Chỉ rời trang khi người dùng xác nhận bỏ thay đổi.<br><br>`AF-11 - Xung đột phiên bản`: Nếu `version` phía máy chủ đã thay đổi, trả lỗi conflict; không ghi đè âm thầm và yêu cầu tải lại dữ liệu mới nhất.<br><br>`AF-12 - Không đủ quyền`: API trả lỗi forbidden; UI không hiển thị hoặc vô hiệu hóa thao tác ghi dữ liệu. |
| Sub-flows (Các luồng con) | `SF-1 - Tạo Menu tùy chỉnh`: Chọn `Tạo mới` → mở dialog `Tạo menu tùy chỉnh` → nhập `Tên Menu` qua placeholder `Ví dụ: Menu đặt lịch` → chọn `Tạo menu` → tạo menu nháp rỗng.<br><br>`SF-2 - Đổi tên`: Mở menu ngữ cảnh → chọn `Đổi tên` → cập nhật tên trong bản nháp → cập nhật danh sách và Mobile Preview.<br><br>`SF-3 - Nhân bản`: Chọn `Nhân bản` → sao chép toàn bộ mục và cấu hình bằng ID mới → tạo menu ở trạng thái `DRAFT`; không sao chép quan hệ gán người dùng.<br><br>`SF-4 - Xóa Menu tùy chỉnh`: Chọn `Xóa` → hiển thị dialog `Xóa menu?` → thông báo người dùng đang áp dụng menu sẽ chuyển về Menu mặc định → khi xác nhận, gỡ tham chiếu và quan hệ gán rồi xóa. Menu mặc định không được xóa.<br><br>`SF-5 - Xóa mục`: Từ popup chọn thao tác xóa → hiển thị dialog `Xóa mục menu?` → khi xác nhận, xóa khỏi bản nháp, đánh lại thứ tự và cập nhật Mobile Preview. Phiên bản đang hoạt động chỉ đổi sau khi xuất bản.<br><br>`SF-6 - Sắp xếp`: Kéo mục đến vị trí mới → cập nhật thứ tự trong state, danh sách và Mobile Preview → đánh dấu menu có thay đổi chưa lưu.<br><br>`SF-7 - Cấu hình hành động`: `NEW_MESSAGE` nhập nội dung; `MESSAGE_FLOW` chọn luồng đang hoạt động; `OPT_IN` chọn mẫu Opt-in; `OPEN_URL` nhập đường dẫn và tùy chọn mở tab mới.<br><br>`SF-8 - Thống kê`: Khi chọn menu khác, gọi lại thống kê theo `menuId` và hiển thị số người dùng, Thành công, Đã đọc, Đã click, Thất bại, KH để lại SĐT. |
| Giao diện hệ thống (UI / Layout Structure) | `Màn 1 - Danh sách menu`: bộ chọn trang quản lý; thẻ `Menu mặc định`; thẻ `Menu tùy chỉnh`; danh sách Menu tùy chỉnh gồm tên, `Chỉnh sửa` và menu ngữ cảnh; khối `Xem trước`; khối thống kê của menu đang chọn.<br><br>`Màn 2 - Chỉnh sửa menu`: `Quay lại`; tên menu; trạng thái `Có thay đổi chưa lưu`, `Bản nháp đã lưu` hoặc `Đã xuất bản`; `Lưu nháp`; `Xuất bản`; vùng `CÁC MỤC MENU` với counter `N/20 mục`; danh sách kéo thả; `Thêm mục menu`; Mobile Preview.<br><br>`Popup - Hiệu chỉnh nút`: header `Hiệu chỉnh nút` và nút đóng; body gồm `Tên hiển thị`, counter `N/30`, placeholder `Nhập tên mục...`, `Hành động khi bấm`, trường cấu hình động, toggle `Chuyển menu sau khi nhấn`, trường `Menu đích` khi bật; footer gồm thao tác xóa và `Lưu`.<br><br>`Dialog quản lý menu`: `Tạo menu tùy chỉnh` hoặc `Đổi tên menu`; trường `Tên Menu`; placeholder `Ví dụ: Menu đặt lịch`; các nút `Hủy` và nút xác nhận.<br><br>`Dialog xóa`: `Xóa menu?` hoặc `Xóa mục menu?`; nội dung cảnh báo; `Hủy` và nút xác nhận xóa.<br><br>`Khung thống kê`: số người dùng; `Thành công`; `Đã đọc`; `Đã click`; `Thất bại`; `KH để lại SĐT`. |
| Yêu cầu phi chức năng (NFR) | `NFR-AUT-001 - Hiệu năng UI`: cập nhật counter, trạng thái trường, sắp xếp và preview trong dưới 50 ms ở phía client trong điều kiện thiết bị mục tiêu.<br>`NFR-AUT-002 - Thời gian lưu`: API lưu nháp hoặc xuất bản phản hồi trong dưới 1,5 giây ở percentile 95, không tính thời gian chờ hệ thống kênh bên thứ ba nếu xử lý bất đồng bộ.<br>`NFR-AUT-003 - Phân quyền`: kiểm tra quyền ở cả UI và API; dữ liệu phải được cô lập theo tenant và kênh.<br>`NFR-AUT-004 - Audit log`: ghi người thao tác, tenant, kênh, menu, hành động, thời điểm, version cũ và version mới cho thao tác tạo, sửa, nhân bản, xóa và xuất bản.<br>`NFR-AUT-005 - Tính nhất quán`: lưu và xuất bản phải idempotent theo request ID; dùng version để ngăn ghi đè đồng thời.<br>`NFR-AUT-006 - Khả dụng`: lỗi mạng không làm mất dữ liệu đang nhập; người dùng có thể thử lại.<br>`NFR-AUT-007 - Khả năng truy cập`: mọi trường có label, trạng thái lỗi được công bố cho công nghệ hỗ trợ và mọi thao tác chính có thể dùng bằng bàn phím. |
| Quy tắc nghiệp vụ (BR tương ứng) | `BR-AUT-001`: Mỗi kênh có đúng một Menu mặc định và có thể có nhiều Menu tùy chỉnh.<br>`BR-AUT-002`: Mỗi menu có tối đa 20 mục; counter hiển thị `N/20 mục`.<br>`BR-AUT-003`: `Tên hiển thị` bắt buộc, được trim trước khi lưu và dài tối đa 30 ký tự; counter hiển thị `N/30`.<br>`BR-AUT-004`: Mỗi mục có đúng một trong bốn loại hành động: `NEW_MESSAGE`, `MESSAGE_FLOW`, `OPT_IN`, `OPEN_URL`.<br>`BR-AUT-005`: Dữ liệu action bắt buộc phải phù hợp loại hành động. Luồng phải đang hoạt động; mẫu Opt-in phải tồn tại; URL phải bắt đầu bằng `http://` hoặc `https://`.<br>`BR-AUT-006`: Khi `shouldSwitchMenu = true`, `targetMenuId` bắt buộc trỏ tới menu đã xuất bản thuộc cùng tenant và kênh. Hành động chính được thực hiện trước, sau đó mới đổi menu cho đúng người dùng đã nhấn.<br>`BR-AUT-007`: Thứ tự hiển thị tăng dần theo `order`; không được trùng hoặc bỏ khoảng sau khi lưu.<br>`BR-AUT-008`: Menu tùy chỉnh được ưu tiên khi người dùng có quan hệ gán hợp lệ; nếu không, dùng Menu mặc định đã xuất bản.<br>`BR-AUT-009`: Xóa Menu tùy chỉnh phải gỡ quan hệ gán và đưa người dùng về Menu mặc định. Không cho xóa Menu mặc định.<br>`BR-AUT-010`: Nhân bản sao chép cấu hình nhưng tạo ID mới, trạng thái `DRAFT` và không sao chép quan hệ gán người dùng hoặc số liệu thống kê.<br>`BR-AUT-011`: Mobile Preview dùng state nháp; khách hàng thực tế chỉ nhận thay đổi sau khi xuất bản thành công.<br>`BR-AUT-012`: Chỉ menu hợp lệ và kênh đang kết nối mới được xuất bản. |
| Tiêu chí chấp nhận (AC tương ứng) | `AC-AUT-001-01`: GIVEN người dùng có quyền và đã chọn kênh WHEN mở `Menu chính` THEN hiển thị Menu mặc định, danh sách Menu tùy chỉnh, Xem trước và thống kê của menu đang chọn.<br><br>`AC-AUT-001-02`: GIVEN màn hình chỉnh sửa có 3 mục WHEN tải xong THEN hiển thị `3/20 mục` và Mobile Preview theo đúng thứ tự ba mục.<br><br>`AC-AUT-001-03`: GIVEN popup `Hiệu chỉnh nút` đang mở WHEN nhập tên mục THEN counter cập nhật `N/30` và Mobile Preview cập nhật mà không cần gọi API lưu.<br><br>`AC-AUT-001-04`: GIVEN tên đã có 30 ký tự WHEN nhập thêm THEN input không nhận ký tự thứ 31 và counter giữ `30/30`.<br><br>`AC-AUT-001-05`: GIVEN `Tạo tin nhắn mới` được chọn WHEN nội dung rỗng và người dùng bấm `Lưu` THEN textarea có viền đỏ, hiển thị đúng `Nội dung tin nhắn là bắt buộc.` và popup không đóng.<br><br>`AC-AUT-001-06`: GIVEN bộ chọn hành động được mở WHEN hiển thị THEN có đúng bốn lựa chọn và mô tả như thiết kế.<br><br>`AC-AUT-001-07`: GIVEN `Chuyển menu sau khi nhấn` đang tắt WHEN bật toggle THEN hiển thị `Menu đích`; nếu chưa chọn menu hợp lệ thì hiển thị `Vui lòng chọn một menu đã xuất bản.` và chặn lưu.<br><br>`AC-AUT-001-08`: GIVEN menu có dưới 20 mục WHEN chọn `Thêm mục menu` THEN tạo mục nháp mới, mở `Hiệu chỉnh nút` và tăng counter một đơn vị.<br><br>`AC-AUT-001-09`: GIVEN menu đã có 20 mục WHEN mở màn hình chỉnh sửa THEN hiển thị `20/20 mục` và vô hiệu hóa `Thêm mục menu`.<br><br>`AC-AUT-001-10`: GIVEN menu có các mục A, B, C WHEN kéo C lên đầu THEN state, danh sách và Mobile Preview đều có thứ tự C, A, B.<br><br>`AC-AUT-001-11`: GIVEN một Menu tùy chỉnh WHEN mở menu ngữ cảnh THEN hiển thị đúng `Đổi tên`, `Nhân bản`, `Xóa`.<br><br>`AC-AUT-001-12`: GIVEN Menu tùy chỉnh có cấu hình hợp lệ WHEN chọn `Nhân bản` THEN tạo menu mới với ID mới, đầy đủ mục, trạng thái `DRAFT` và không có quan hệ gán người dùng.<br><br>`AC-AUT-001-13`: GIVEN có người dùng đang được gán Menu tùy chỉnh WHEN xác nhận xóa menu THEN menu bị xóa, quan hệ gán bị gỡ và người dùng sử dụng Menu mặc định.<br><br>`AC-AUT-001-14`: GIVEN có thay đổi hợp lệ WHEN chọn `Lưu nháp` THEN bản nháp được lưu nhưng phiên bản đang phục vụ khách hàng không đổi.<br><br>`AC-AUT-001-15`: GIVEN menu hợp lệ, người dùng có quyền và kênh đang kết nối WHEN chọn `Xuất bản` THEN tạo phiên bản xuất bản, đồng bộ đúng kênh, cập nhật trạng thái và ghi audit log.<br><br>`AC-AUT-001-16`: GIVEN kênh mất kết nối WHEN người dùng định xuất bản THEN hệ thống chặn xuất bản, giữ dữ liệu nháp và hướng dẫn kết nối lại.<br><br>`AC-AUT-001-17`: GIVEN có thay đổi chưa lưu WHEN người dùng bấm `Quay lại` hoặc rời trang THEN hệ thống hiển thị cảnh báo xác nhận và không tự bỏ dữ liệu.<br><br>`AC-AUT-001-18`: GIVEN action tham chiếu flow, mẫu Opt-in hoặc menu đích không còn hợp lệ WHEN người dùng xuất bản THEN hệ thống đánh dấu đúng trường lỗi và chặn xuất bản.<br><br>`AC-AUT-001-19`: GIVEN người dùng không có quyền quản lý Automation WHEN mở Menu chính THEN chỉ được xem dữ liệu và không thể tạo, sửa, xóa, lưu nháp hoặc xuất bản. |

## PHẦN 3: ĐẶC TẢ DỮ LIỆU PAYLOAD CHO DEVELOPER (DATA SCHEMA / CONTRACT)

### 3.1 Payload lưu nháp hoặc xuất bản

```json
{
  "requestId": "req_01J9AUT001",
  "tenantId": "tenant_antbuddy",
  "channelId": "channel_fb_001",
  "menuId": "menu_product_001",
  "mode": "USER_LEVEL",
  "name": "Menu sản phẩm",
  "status": "DRAFT",
  "version": 7,
  "items": [
    {
      "id": "menu_item_001",
      "order": 1,
      "title": "Xem sản phẩm",
      "action": {
        "type": "NEW_MESSAGE",
        "text": "AntBuddy cung cấp Chatbot AI đa kênh và CRM tích hợp."
      },
      "shouldSwitchMenu": false,
      "targetMenuId": null
    },
    {
      "id": "menu_item_002",
      "order": 2,
      "title": "Bảng giá mới nhất",
      "action": {
        "type": "OPEN_URL",
        "url": "https://antbuddy.com/pricing",
        "openInNewTab": true
      },
      "shouldSwitchMenu": false,
      "targetMenuId": null
    },
    {
      "id": "menu_item_003",
      "order": 3,
      "title": "Liên hệ tư vấn",
      "action": {
        "type": "MESSAGE_FLOW",
        "messageFlowId": "flow_consulting_001"
      },
      "shouldSwitchMenu": true,
      "targetMenuId": "menu_support_001"
    }
  ]
}
```

### 3.2 Biến thể action cho Nhận thông báo

```json
{
  "type": "OPT_IN",
  "optInTemplateId": "opt_in_promotion_001"
}
```

### 3.3 Quy ước contract

| Trường | Kiểu | Bắt buộc | Quy tắc |
| --- | --- | --- | --- |
| `requestId` | string | Có | Khóa idempotency cho một yêu cầu ghi. |
| `tenantId` | string | Có | Phải khớp tenant của người dùng đăng nhập. |
| `channelId` | string | Có | Kênh sở hữu menu; phải đang kết nối khi xuất bản. |
| `menuId` | string | Có khi cập nhật | ID duy nhất trong tenant. Server cấp ID khi tạo mới. |
| `mode` | enum | Có | `DEFAULT` hoặc `USER_LEVEL`. Mỗi kênh chỉ có một menu `DEFAULT`. |
| `name` | string | Có với `USER_LEVEL` | Trim trước khi lưu; dài tối đa 60 ký tự. |
| `status` | enum | Có | Client gửi `DRAFT` khi lưu nháp; server đặt `PUBLISHED` sau khi xuất bản thành công. |
| `version` | integer | Có khi cập nhật | Dùng optimistic locking; server tăng sau mỗi lần ghi thành công. |
| `items` | array | Có | Từ 0 đến 20 phần tử ở bản nháp; mỗi phần tử có thứ tự duy nhất. |
| `items[].id` | string | Có khi cập nhật | ID ổn định của mục; server cấp khi tạo mới. |
| `items[].order` | integer | Có | Bắt đầu từ 1, duy nhất và liên tục trong một menu. |
| `items[].title` | string | Có | Từ 1 đến 30 ký tự sau khi trim. |
| `action.type` | enum | Có | `NEW_MESSAGE`, `MESSAGE_FLOW`, `OPT_IN`, `OPEN_URL`. |
| `action.text` | string | Theo điều kiện | Bắt buộc khi `type = NEW_MESSAGE`. |
| `action.messageFlowId` | string | Theo điều kiện | Bắt buộc khi `type = MESSAGE_FLOW`; luồng phải tồn tại và đang hoạt động. |
| `action.optInTemplateId` | string | Theo điều kiện | Bắt buộc khi `type = OPT_IN`; mẫu Opt-in phải tồn tại. |
| `action.url` | string | Theo điều kiện | Bắt buộc khi `type = OPEN_URL`; bắt đầu bằng `http://` hoặc `https://`. |
| `action.openInNewTab` | boolean | Theo điều kiện | Chỉ sử dụng với `OPEN_URL`; mặc định là `true`. |
| `shouldSwitchMenu` | boolean | Có | Mặc định là `false`. |
| `targetMenuId` | string hoặc null | Theo điều kiện | Bắt buộc khi `shouldSwitchMenu = true`; menu đích phải đã xuất bản và cùng kênh. |

Lưu ý: Các ví dụ ID, URL và nội dung trong payload là dữ liệu minh họa kỹ thuật. Label, placeholder, counter, lựa chọn và câu lỗi trong Phần 1 và Phần 2 là các chuỗi đã được chuẩn hóa theo thiết kế UI.
