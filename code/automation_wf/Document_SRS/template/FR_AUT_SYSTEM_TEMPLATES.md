# ĐẶC TẢ MẪU AUTOMATION

## 1. Mục đích

Mẫu Automation là gói cấu hình chatbot đã được dựng sẵn. Người dùng chọn Mẫu phù hợp, sao chép tài nguyên vào Page, chỉnh sửa thông tin đặc thù của doanh nghiệp, kiểm tra và chủ động kích hoạt.

Mẫu giúp người dùng không phải tạo thủ công từng Menu, tin nhắn, từ khóa, luồng và quy luật từ đầu.

---

## 2. Phân loại Mẫu

| Loại | Mô tả |
| --- | --- |
| Mẫu sẵn có | Do hệ thống cung cấp. Người dùng được xem và sử dụng nhưng không sửa bản gốc. |
| Mẫu của tôi | Do người dùng tạo từ cấu hình của một Page để tái sử dụng cho Page khác. |

Khi sử dụng Mẫu, hệ thống tạo bản sao độc lập tại Page đích. Việc sửa Mẫu gốc không tự cập nhật các Page đã sử dụng Mẫu.

---

## 3. Cấu trúc của Mẫu

```text
Mẫu
├── Thông tin Mẫu
├── Danh sách tài nguyên
├── Nội dung cấu hình của tài nguyên
├── Quan hệ tham chiếu giữa tài nguyên
├── Trường cần người dùng tùy chỉnh
└── Tài nguyên phụ thuộc cần tạo hoặc ánh xạ
```

### 3.1. Thông tin Mẫu

| Trường | Mô tả |
| --- | --- |
| Mã Mẫu | Định danh duy nhất. |
| Tên Mẫu | Tên hiển thị trong danh sách. |
| Mô tả | Mục tiêu sử dụng của Mẫu. |
| Loại Mẫu | Mẫu sẵn có hoặc Mẫu của tôi. |
| Phiên bản | Phiên bản snapshot của tài nguyên. |
| Kênh hỗ trợ | Các kênh có thể áp dụng Mẫu. |
| Danh sách tài nguyên | Các tài nguyên được đóng gói trong Mẫu. |
| Trường tùy chỉnh | Các giá trị người dùng phải hoặc nên thay đổi. |
| Trạng thái | `DRAFT`, `READY` hoặc `ARCHIVED`. |

### 3.2. Tài nguyên được đóng gói

| Tài nguyên | Nội dung được lưu trong Mẫu |
| --- | --- |
| Menu chính | Tên Menu, các mục Menu, thứ tự và hành động khi bấm. |
| Câu hỏi thường gặp | Câu hỏi, thứ tự, hành động chính và hành động bổ sung. |
| Tin nhắn mở đầu | Các bước, nội dung, media, nút, trả lời nhanh và bước tiếp theo. |
| Tin nhắn mặc định | Các bước fallback, nội dung, nút, trả lời nhanh và giới hạn gửi. |
| Từ khóa | Từ khóa gồm/loại trừ, chế độ khớp, độ ưu tiên và phản hồi. |
| Luồng tin nhắn | Các bước nội dung, nút và liên kết chuyển bước. |
| Kịch bản chăm sóc | Các bước gửi/hành động, thời gian chờ và điều kiện gửi. |
| Quy luật | Sự kiện kích hoạt, điều kiện, hành động và tần suất thực hiện. |

Mỗi Mẫu chỉ đóng gói các tài nguyên cần thiết cho mục tiêu của Mẫu; không bắt buộc phải có đủ mọi loại tài nguyên.

### 3.3. Tài nguyên phụ thuộc

| Tài nguyên | Cách xử lý khi áp dụng Mẫu |
| --- | --- |
| Thẻ khách hàng | Tạo mới hoặc ánh xạ với Thẻ có sẵn tại Page đích. |
| Trường thông tin tùy chỉnh | Tạo mới hoặc ánh xạ với trường có sẵn. |
| Media | Sao chép tài nguyên hợp lệ sang phạm vi của Page đích. |
| Opt-in | Ánh xạ lại topic/ID theo kênh đích. |
| Webform | Sao chép cấu trúc trường, không sao chép dữ liệu đã thu thập. |
| Nhóm nhân viên | Yêu cầu người dùng chọn nhóm tại Page đích. |
| API, lịch, catalog hoặc kho mã | Yêu cầu chọn kết nối tại Page đích; không sao chép credential. |

### 3.4. Dữ liệu không được đóng gói

- Access token, API key, webhook secret và credential.
- ID Page, khách hàng, hội thoại, nhân viên hoặc nhóm xử lý của Page nguồn.
- Dữ liệu khách hàng đã nhập.
- Đơn hàng, lịch hẹn, danh mục sản phẩm và mã giảm giá thật.
- Thống kê, lịch sử gửi, execution log và audit log.
- Trạng thái tham gia Kịch bản chăm sóc của khách hàng.

---

## 4. Cách Mẫu hoạt động

### 4.1. Xem Mẫu

1. Người dùng mở tab **Mẫu**.
2. Hệ thống hiển thị **Mẫu sẵn có** và **Mẫu của tôi**.
3. Người dùng tìm kiếm và chọn một Mẫu.
4. Hệ thống hiển thị:
   - tên và mô tả Mẫu;
   - kênh hỗ trợ;
   - danh sách tài nguyên;
   - nội dung xem trước;
   - các trường cần tùy chỉnh;
   - tài nguyên phụ thuộc cần ánh xạ.

Việc xem Mẫu không thay đổi cấu hình của Page.

### 4.2. Sử dụng Mẫu

1. Người dùng bấm **Sử dụng mẫu**.
2. Người dùng chọn Page đích.
3. Hệ thống kiểm tra quyền, trạng thái kết nối và khả năng hỗ trợ của kênh.
4. Hệ thống hiển thị tài nguyên sẽ được tạo, tài nguyên cần ánh xạ và xung đột với cấu hình hiện tại.
5. Người dùng xác nhận áp dụng.
6. Hệ thống tạo bản sao tài nguyên tại Page đích.
7. Hệ thống sinh ID mới và ánh xạ lại toàn bộ tham chiếu.
8. Hệ thống mở checklist để người dùng tùy chỉnh và kiểm tra.

Ví dụ ánh xạ ID:

```text
FLOW_PRODUCT trong Mẫu      → flow_page_123_01 tại Page đích
MENU_DEFAULT trong Mẫu      → menu_page_123_01 tại Page đích
Menu.XemSảnPhẩm.flowId      → flow_page_123_01
```

Tài nguyên tại Page đích không được tiếp tục tham chiếu đến ID trong Mẫu hoặc ID của Page nguồn.

### 4.3. Xử lý xung đột

| Tình huống | Xử lý mặc định |
| --- | --- |
| Page chưa có tài nguyên tương ứng | Tạo tài nguyên mới. |
| Page đã có Menu mặc định | Giữ Menu hiện tại; cho phép chọn thay thế bằng bản nháp hoặc tạo Menu tùy chỉnh. |
| Có tài nguyên trùng tên | Đổi tên bản sao hoặc cho người dùng chọn tái sử dụng tài nguyên hiện có. |
| Tài nguyên hiện tại đang hoạt động | Không ghi đè nếu người dùng chưa xác nhận. |
| Kênh không hỗ trợ tài nguyên | Thông báo không hỗ trợ và kiểm tra các liên kết phụ thuộc. |

### 4.4. Tùy chỉnh và phát hành

Sau khi sao chép, người dùng có thể sửa, thêm hoặc xóa tài nguyên trong bản sao. Hệ thống phải yêu cầu rà soát tối thiểu:

- tên doanh nghiệp và cách xưng hô;
- nội dung tin nhắn, Menu, FAQ và CTA;
- sản phẩm, dịch vụ, dự án hoặc chương trình;
- hotline, URL, địa chỉ và giờ làm việc;
- từ khóa và thời gian gửi;
- Thẻ, trường thông tin và nhóm nhân viên;
- các kết nối API, lịch, catalog hoặc kho mã được Mẫu sử dụng.

Trạng thái sau khi sao chép:

| Tài nguyên | Trạng thái |
| --- | --- |
| Menu, FAQ và Luồng tin nhắn | `DRAFT` |
| Tin nhắn mở đầu và Tin nhắn mặc định | `INACTIVE` |
| Từ khóa | `INACTIVE` |
| Kịch bản chăm sóc | `INACTIVE` |
| Quy luật | `INACTIVE` |

Người dùng phải xem thử, xử lý hết lỗi và chủ động Publish/Activate. Bấm **Sử dụng mẫu** không làm phát sinh tin nhắn tới khách hàng.

---

## 5. Danh mục Mẫu sẵn có

### 5.1. Shop Online

**Mục tiêu:** tạo nhanh cấu hình tư vấn và điều hướng bán hàng.

| Tài nguyên | Nội dung mặc định |
| --- | --- |
| Tin nhắn mở đầu | Lời chào; Xem sản phẩm; Khuyến mãi; Hỏi đơn hàng; Gặp nhân viên. |
| Menu chính | Sản phẩm; Khuyến mãi; Chính sách mua hàng; Liên hệ. |
| FAQ | Giao hàng; Thanh toán; Đổi trả; Thời gian làm việc. |
| Luồng tin nhắn | Tư vấn sản phẩm; Thu thập nhu cầu; Hỏi đơn hàng; Chuyển nhân viên. |
| Từ khóa | Sản phẩm; Giá; Khuyến mãi; Giao hàng; Đổi trả; Nhân viên. |
| Tin nhắn mặc định | Thông báo chưa hiểu và hiển thị lại các lựa chọn chính. |
| Tài nguyên tùy chọn | Kịch bản chăm sóc khách quan tâm; Quy luật gắn Thẻ/chuyển nhân viên. |
| Phụ thuộc | Thẻ quan tâm; Trường liên hệ; URL catalog; Nhóm nhân viên; kết nối sản phẩm/đơn hàng nếu có. |

**Cần tùy chỉnh:** tên shop, nội dung giới thiệu, danh mục sản phẩm, giá/chính sách, hotline, giờ làm việc và nhóm nhận hội thoại.

### 5.2. Bất Động Sản

**Mục tiêu:** giới thiệu dự án, thu thập nhu cầu và chuyển khách cho chuyên viên.

| Tài nguyên | Nội dung mặc định |
| --- | --- |
| Tin nhắn mở đầu | Xem dự án; Giá & chính sách; Đăng ký tư vấn; Đặt lịch tham quan. |
| Menu chính | Dự án; Thông tin dự án; Đặt lịch; Liên hệ chuyên viên. |
| FAQ | Vị trí; Loại hình; Giá tham khảo; Pháp lý; Đặt lịch. |
| Luồng tin nhắn | Chọn dự án/khu vực; Thu thập nhu cầu; Thu thập liên hệ; Đặt lịch; Chuyển chuyên viên. |
| Từ khóa | Dự án; Căn hộ; Đất nền; Giá; Pháp lý; Xem nhà; Tư vấn viên. |
| Tin nhắn mặc định | Hiển thị lại lựa chọn dự án, đặt lịch và gặp chuyên viên. |
| Tài nguyên tùy chọn | Kịch bản gửi thông tin/nhắc lịch; Quy luật gắn Thẻ theo dự án quan tâm. |
| Phụ thuộc | Trường khu vực, loại hình, nhu cầu, liên hệ, thời gian hẹn; URL dự án; nhóm tư vấn. |

**Cần tùy chỉnh:** tên đơn vị, dự án, nội dung/URL dự án, giá/chính sách, hotline, nhóm tư vấn và lịch làm việc.

Mẫu không chứa cơ chế chấm điểm lead, dự án thật, bảng giá thật hoặc lịch hẹn đã xác nhận.



## 6. Business Rules

| Mã | Quy tắc |
| --- | --- |
| `BR-TPL-001` | Mẫu là snapshot tài nguyên có phiên bản, không phải tài nguyên dùng chung đang chạy. |
| `BR-TPL-002` | Mẫu sẵn có chỉ đọc; người dùng chỉ sửa bản sao tại Page đích. |
| `BR-TPL-003` | Áp dụng Mẫu phải tạo ID mới và ánh xạ lại toàn bộ tham chiếu. |
| `BR-TPL-004` | Không sao chép credential, dữ liệu khách hàng, dữ liệu giao dịch hoặc lịch sử chạy. |
| `BR-TPL-005` | Tài nguyên sau khi sao chép phải ở `DRAFT/INACTIVE`. |
| `BR-TPL-006` | Không ghi đè cấu hình đang hoạt động nếu người dùng chưa xác nhận. |
| `BR-TPL-007` | Tài nguyên không được kênh hỗ trợ phải được thông báo rõ. |
| `BR-TPL-008` | Thay đổi Mẫu không tự thay đổi các Page đã áp dụng Mẫu. |
| `BR-TPL-009` | Mọi tham chiếu phải trỏ tới tài nguyên được tạo hoặc ánh xạ hợp lệ tại Page đích. |
| `BR-TPL-010` | Dữ liệu minh họa trong Mẫu không được dùng như dữ liệu kinh doanh thật. |

---

## 7. Acceptance Criteria

| Mã | Tiêu chí chấp nhận |
| --- | --- |
| `AC-TPL-001` | Khi mở tab Mẫu, người dùng thấy Mẫu sẵn có và Mẫu của tôi. |
| `AC-TPL-002` | Catalog hiển thị năm Mẫu: Shop Online, Bất Động Sản, Make appointment, Viral bot và Mã giảm giá. |
| `AC-TPL-003` | Chi tiết Mẫu hiển thị tài nguyên, nội dung xem trước, trường tùy chỉnh và dependency. |
| `AC-TPL-004` | Xem Mẫu không làm thay đổi cấu hình Page. |
| `AC-TPL-005` | Áp dụng Mẫu tạo tài nguyên với ID mới thuộc Page đích. |
| `AC-TPL-006` | Tham chiếu giữa Menu, Flow, Keyword, Sequence và Rule được ánh xạ sang ID tại Page đích. |
| `AC-TPL-007` | Credential và dữ liệu runtime không xuất hiện trong bản sao. |
| `AC-TPL-008` | Cấu hình đang hoạt động không bị thay thế khi người dùng chưa xác nhận. |
| `AC-TPL-009` | Trước khi Publish/Activate, Mẫu không làm phát sinh tin nhắn tới khách hàng. |
| `AC-TPL-010` | Hệ thống chặn phát hành khi còn trường bắt buộc hoặc dependency chưa hợp lệ. |

