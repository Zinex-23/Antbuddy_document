# Phần Mẫu (Template)

Tài liệu đặc tả chức năng cho phần **Mẫu**. Đây là nhóm chức năng độc lập, ngang hàng với nhóm Tự động hóa (FR-AUT), dùng mã **FR-TPL**.

---

## 1. Tổng quan

### 1.1. Mục đích

Mẫu là gói cấu hình Tự động hóa được dựng sẵn, gồm các mục như Menu chính, Câu hỏi thường gặp, Tin nhắn mở đầu, Tin nhắn mặc định, Từ khóa, Kịch bản chăm sóc và Quy luật. Người dùng áp dụng mẫu vào một hoặc nhiều trang (kênh) để khởi tạo nhanh cấu hình, thay vì tạo thủ công từng mục.

Nguyên tắc chung:
- Áp dụng mẫu tạo ra **bản sao độc lập** tại trang đích. Sửa mẫu về sau không tự cập nhật sang các trang đã áp dụng.
- Áp dụng mẫu **không gửi tin nhắn nào cho khách hàng** và không ghi đè cấu hình đang chạy. Cấu hình mới được nạp ở dạng bản nháp hoặc tắt; người dùng chủ động xuất bản hoặc bật từng mục.

### 1.2. Phân loại mẫu

**Mẫu hệ thống (Built-in)**
- **Nguồn:** Do AntBot cung cấp.
- **Hiển thị:** Tab "Mẫu sẵn có (Hệ thống)", thẻ mẫu có nhãn "MẪU HỆ THỐNG".
- **Thao tác cho phép:** Xem trước, Sử dụng mẫu.
- **Giới hạn:** Chỉ đọc — không sửa nội dung, không ngừng sử dụng. Để tùy biến, người dùng phải tạo Mẫu của tôi riêng.

**Mẫu của tôi**
- **Nguồn:** Do người dùng tạo từ cấu hình hiện có của một trang.
- **Hiển thị:** Tab "Mẫu của tôi", thẻ mẫu có nhãn "MẪU CỦA TÔI".
- **Thao tác cho phép:** Xem trước, Chỉnh sửa, Ngừng sử dụng, Mở lại, Sử dụng mẫu.

### 1.3. Thuật ngữ

| Thuật ngữ | Ý nghĩa |
|---|---|
| Mục cấu hình | Một thành phần trong mẫu, ví dụ Menu mặc định, một câu hỏi thường gặp, một từ khóa. |
| Mẫu gốc | Mẫu được dùng làm nguồn của một mẫu. Với Mẫu hệ thống, mẫu gốc là chính nó. Với Mẫu của tôi, mẫu gốc là mẫu mà trang nguồn đã áp dụng gần nhất; nếu không xác định được thì hiển thị "Chưa xác định". |
| Trang nguồn | Trang mà người dùng lấy cấu hình để tạo Mẫu của tôi. |
| Trang đích | Trang nhận cấu hình khi áp dụng mẫu. |
| Kế hoạch áp dụng | Bảng liệt kê từng mục trong mẫu và quyết định xử lý của mục đó trên trang đích. |
| Quyết định | Cách xử lý một mục khi áp dụng: Thêm mới, Cập nhật hoặc Giữ nguyên. |

### 1.4. Trạng thái các mục sau khi áp dụng mẫu

Khi áp dụng mẫu thành công, **toàn bộ mục được nạp ở trạng thái an toàn** — chưa phục vụ khách hàng và không ghi đè cấu hình đang chạy. Người dùng phải chủ động kiểm tra nội dung và kích hoạt từng mục.

**Menu chính** *(FR-AUT-001)*
- **Trạng thái sau áp dụng:** Bản nháp (`DRAFT`) — nội dung mẫu được ghi vào bản nháp của menu, menu đang phục vụ khách hàng không thay đổi.
- **Để phục vụ khách hàng:** Mở màn chỉnh sửa menu, kiểm tra nội dung, bấm **"Xuất bản"** để đồng bộ lên kênh.
- *Lưu ý: Menu mặc định hiện đang chạy vẫn hoạt động bình thường cho đến khi bản mới được xuất bản.*

**Câu hỏi thường gặp** *(FR-AUT-002)*
- **Trạng thái sau áp dụng:** Bản nháp (`DRAFT`) — danh sách câu hỏi chưa hiển thị với khách hàng.
- **Để phục vụ khách hàng:** Kiểm tra nội dung từng câu hỏi, bấm **"Xuất bản"**.

**Tin nhắn mở đầu** *(FR-AUT-003)*
- **Trạng thái sau áp dụng:** Đã tắt (`INACTIVE`) — nội dung được nạp nhưng chưa gửi cho khách hàng mới nhắn tin.
- **Để phục vụ khách hàng:** Kiểm tra nội dung, bật công tắc **"Kích hoạt"**.

**Tin nhắn mặc định** *(FR-AUT-004)*
- **Trạng thái sau áp dụng:** Đã tắt (`INACTIVE`) — nội dung được nạp nhưng chưa gửi khi bot không hiểu yêu cầu. Ngoài ra, công tắc **"Đặt làm mặc định"** cũng đang tắt, nghĩa là tin nhắn này chưa được chỉ định thay thế tin nhắn mặc định hiện tại.
- **Để phục vụ khách hàng:** Bật **"Kích hoạt"** và bật **"Đặt làm mặc định"**. Cần bật cả hai — thiếu một thì tin nhắn vẫn không hoạt động.

**Từ khóa** *(FR-AUT-005)*
- **Trạng thái sau áp dụng:** Đã tắt (`INACTIVE`) — các từ khóa được nạp nhưng chưa kích hoạt, bot sẽ không phản hồi theo từ khóa.
- **Để phục vụ khách hàng:** Xem lại danh sách từ khóa, bật công tắc **"Kích hoạt"** cho từng từ khóa cần dùng.

**Kịch bản chăm sóc (Sequence)** *(FR-AUT-006)*
- **Trạng thái sau áp dụng:** Toàn bộ bước đã tắt (`INACTIVE`) — chưa tự động gửi tin nhắn chăm sóc cho khách hàng nào.
- **Để phục vụ khách hàng:** Vào chỉnh sửa kịch bản, kiểm tra nội dung và thời gian gửi từng bước, bật **"Kích hoạt"** từng bước theo thứ tự.

**Quy luật tự động (Rule)** *(FR-AUT-007)*
- **Trạng thái sau áp dụng:** Đã tắt (`INACTIVE`) — điều kiện trigger chưa được theo dõi, action chưa chạy.
- **Để phục vụ khách hàng:** Kiểm tra điều kiện và hành động của quy luật, bật công tắc **"Kích hoạt"**.

> **Trường hợp mục cần cấu hình lại:** Nếu mục có tham chiếu tới nhóm nhân viên, kết nối API, lịch hoặc tài khoản bên ngoài, hệ thống đánh dấu mục đó **"Cần cấu hình lại"** và khóa ở trạng thái tắt cho đến khi người dùng điền đủ thông tin. Xem chi tiết tại SF-04 của FR-TPL-002.

### 1.5. Dữ liệu không đóng gói vào mẫu

- Token truy cập, API key, webhook secret và mọi thông tin kết nối.
- Mã định danh thật của trang nguồn, nhân viên, nhóm xử lý, khách hàng.
- Dữ liệu hội thoại, đơn hàng, tồn kho, bảng giá thật.
- Dữ liệu huấn luyện NLU.
- Danh sách khách hàng đang đăng ký kịch bản chăm sóc và trạng thái của họ.
- Số liệu thống kê, lịch sử chạy và audit log của trang nguồn.

### 1.6. Danh sách chức năng

| Mã | Tên chức năng |
|---|---|
| FR-TPL-001 | Danh sách và xem trước mẫu |
| FR-TPL-002 | Áp dụng mẫu vào trang |
| FR-TPL-003 | Quản lý Mẫu của tôi |

---

## 2. FR-TPL-001: Danh sách và xem trước mẫu

| Mục | Nội dung |
|---|---|
| **Mô tả** | Cho phép người dùng xem danh sách các mẫu Tự động hóa, tìm kiếm, lọc, xem trước nội dung mẫu, và chọn mẫu để áp dụng hoặc quản lý.<br>Danh sách chia hai tab:<br>- **Mẫu sẵn có (Hệ thống)**: mẫu do AntBot cung cấp, chỉ đọc.<br>- **Mẫu của tôi**: mẫu do người dùng tạo.<br>Xem danh sách và xem trước không làm thay đổi cấu hình của bất kỳ trang nào. |
| **Đối tượng liên quan** | Admin/Quản lý |
| **Pre-conditions** | Người dùng đã đăng nhập và có quyền truy cập AntBot. |
| **Điều kiện kích hoạt** | Người dùng vào AntBot → Mẫu. |
| **Luồng xử lý chính** | 1. Hệ thống hiển thị màn Mẫu gồm: tiêu đề "Mẫu"; ô tìm kiếm "Tìm mẫu Automation..."; nút "Tạo mẫu"; hai tab "Mẫu sẵn có (Hệ thống)" và "Mẫu của tôi" kèm số lượng mẫu của từng tab; bộ lọc "Trạng thái" và "Kênh"; danh sách thẻ mẫu của tab đang chọn. Mặc định mở tab "Mẫu sẵn có (Hệ thống)", hai bộ lọc ở "Tất cả".<br>2. Người dùng chuyển tab. Hệ thống tải danh sách của tab đó và đặt ô tìm kiếm cùng hai bộ lọc về mặc định.<br>3. Người dùng nhập từ khóa vào ô tìm kiếm hoặc chọn bộ lọc. Danh sách lọc theo thời gian thực, các điều kiện kết hợp với nhau (SF-03).<br>4. Mỗi thẻ mẫu hiển thị thông tin và các nút thao tác (SF-01).<br>5. Người dùng bấm "Xem trước" để xem nội dung mẫu (SF-02).<br>6. Người dùng bấm "Sử dụng mẫu" để áp dụng mẫu vào trang (FR-TPL-002), hoặc bấm "Tạo mẫu", "Chỉnh sửa", "Ngừng sử dụng" để quản lý Mẫu của tôi (FR-TPL-003). |
| **Post-condition** | - Danh sách hiển thị đúng các mẫu theo tab, tìm kiếm và bộ lọc đã chọn.<br>- Cấu hình của mọi trang không thay đổi. |
| **Luồng thay thế** | **AF-1: Tab chưa có mẫu.** Tab "Mẫu của tôi" chưa có mẫu nào: hệ thống hiển thị thông báo "Bạn chưa có mẫu nào" và nút "Tạo mẫu".<br>**AF-2: Không có kết quả.** Tìm kiếm hoặc lọc không ra mẫu nào: hệ thống hiển thị thông báo "Không tìm thấy mẫu phù hợp".<br>**AF-3: Mẫu đã ngừng sử dụng.** Thẻ hiển thị nhãn "Ngừng sử dụng" và nút "Sử dụng mẫu" bị vô hiệu hóa.<br>**AF-4: Tải danh sách thất bại.** Hệ thống hiển thị thông báo lỗi kèm nút "Thử lại". |
| **Sub-flow** | **SF-01: Thẻ mẫu.** Mỗi thẻ gồm:<br>- Biểu tượng mẫu và nhãn loại ("MẪU HỆ THỐNG" hoặc "MẪU CỦA TÔI").<br>- Tên mẫu.<br>- Dòng phụ: tên các trang đang dùng mẫu, hoặc "Chưa có trang sử dụng".<br>- Mô tả ngắn.<br>- Dòng "Mẫu gốc".<br>- Dòng số liệu: số mục menu, số câu hỏi, số từ khóa, số trang đang dùng (BR-03, BR-04).<br>- Nút thao tác: Mẫu hệ thống có "Xem trước", "Sử dụng mẫu"; Mẫu của tôi có "Xem trước", "Chỉnh sửa", "Ngừng sử dụng", "Sử dụng mẫu".<br><br>**SF-02: Xem trước mẫu.** Popup chỉ đọc hiển thị: tên, mô tả, kênh hỗ trợ, danh sách các mục trong mẫu nhóm theo loại (Menu chính, Câu hỏi thường gặp, Tin nhắn mở đầu, Tin nhắn mặc định, Từ khóa, Kịch bản chăm sóc, Quy luật). Bấm vào một mục để xem nội dung chỉ đọc của mục đó. Popup có nút "Sử dụng mẫu" và nút đóng.<br><br>**SF-03: Tìm kiếm và bộ lọc.**<br>- Tìm kiếm theo tên và mô tả mẫu, không phân biệt hoa thường.<br>- Bộ lọc "Trạng thái": Tất cả; Đang được dùng (có ít nhất một trang đang dùng); Chưa được dùng; Ngừng sử dụng (chỉ ở tab "Mẫu của tôi").<br>- Bộ lọc "Kênh": Tất cả hoặc một kênh (Facebook, Instagram, Zalo OA, Telegram, WhatsApp); lọc ra các mẫu hỗ trợ kênh đó. |
| **Giao diện hệ thống** | Tham chiếu: UI-XX (Màn Mẫu).<br>**Màn: Mẫu.** Tiêu đề; ô tìm kiếm; nút "Tạo mẫu"; hai tab kèm số lượng; hai bộ lọc; lưới thẻ mẫu (SF-01).<br>**Popup: Xem trước mẫu.** Xem SF-02. |
| **Yêu cầu phi chức năng** | NFR-02 (phản hồi lưu), NFR-07 (phân quyền, audit log). |
| **AC tương ứng** | **AC-01:** Khi mở màn Mẫu, tab "Mẫu sẵn có (Hệ thống)" được chọn mặc định và số lượng trên từng tab đúng với số mẫu của tab đó.<br>**AC-02:** Mỗi thẻ hiển thị đủ: nhãn loại, tên, dòng phụ, mô tả, mẫu gốc, số liệu và các nút thao tác đúng theo loại mẫu.<br>**AC-03:** Thẻ Mẫu hệ thống chỉ có nút "Xem trước" và "Sử dụng mẫu"; thẻ Mẫu của tôi có đủ bốn nút.<br>**AC-04:** Khi nhập từ khóa, danh sách lọc theo thời gian thực theo tên và mô tả.<br>**AC-05:** Khi chọn bộ lọc "Trạng thái" hoặc "Kênh", danh sách chỉ còn các mẫu thỏa điều kiện và kết hợp đúng với từ khóa tìm kiếm.<br>**AC-06:** Khi chuyển tab, ô tìm kiếm và hai bộ lọc về mặc định.<br>**AC-07:** Khi tab "Mẫu của tôi" chưa có mẫu, hệ thống hiển thị thông báo và nút "Tạo mẫu".<br>**AC-08:** Khi không có kết quả, hệ thống hiển thị "Không tìm thấy mẫu phù hợp".<br>**AC-09:** Mẫu đã ngừng sử dụng hiển thị nhãn "Ngừng sử dụng" và nút "Sử dụng mẫu" bị vô hiệu hóa.<br>**AC-10:** Bấm "Xem trước" mở popup chỉ đọc và không thay đổi bất kỳ cấu hình nào của trang. |
| **BR tương ứng** | **BR-01:** Mẫu hệ thống chỉ đọc; người dùng không sửa được bản gốc.<br>**BR-02:** Mẫu của tôi chỉ hiển thị và thao tác được bởi người đã tạo mẫu đó.<br>**BR-03:** "Số trang đang dùng" là số trang đã áp dụng mẫu thành công và vẫn còn kết nối. Dòng phụ liệt kê tên các trang này, rút gọn khi quá dài.<br>**BR-04:** Số mục menu là tổng số nút của các menu trong mẫu; số câu hỏi là số câu hỏi thường gặp; số từ khóa là số từ khóa trong mẫu.<br>**BR-05:** Số lượng trên tab không thay đổi theo tìm kiếm và bộ lọc.<br>**BR-06:** Mẫu ngừng sử dụng vẫn hiển thị trong danh sách nhưng không được áp dụng mới.<br>**BR-07:** Thứ tự hiển thị: Mẫu hệ thống theo thứ tự do AntBot cấu hình; Mẫu của tôi theo thời gian tạo, mẫu mới nhất ở đầu. |

---

## 3. FR-TPL-002: Áp dụng mẫu vào trang

| Mục | Nội dung |
|---|---|
| **Mô tả** | Cho phép người dùng áp dụng một mẫu vào một hoặc nhiều trang đích. Trước khi áp dụng, hệ thống lập kế hoạch áp dụng cho từng trang, cho phép người dùng xem chi tiết, so sánh với cấu hình hiện tại và chọn quyết định cho từng mục (Thêm mới, Cập nhật, Giữ nguyên).<br>Áp dụng mẫu tạo bản sao độc lập tại trang đích, nạp ở dạng bản nháp hoặc tắt (mục 1.4), không ghi đè cấu hình đang chạy và không gửi tin nhắn cho khách hàng. |
| **Đối tượng liên quan** | Admin/Quản lý |
| **Pre-conditions** | - Người dùng đã đăng nhập.<br>- Mẫu đang ở trạng thái sử dụng được (không phải "Ngừng sử dụng").<br>- Có ít nhất một trang đã kết nối, đang hoạt động và người dùng có quyền cấu hình AntBot trên trang đó. |
| **Điều kiện kích hoạt** | Người dùng bấm "Sử dụng mẫu" trên thẻ mẫu hoặc trong popup xem trước (FR-TPL-001). |
| **Luồng xử lý chính** | **A. Chọn trang đích**<br>1. Hệ thống mở popup "Áp dụng Mẫu: [tên mẫu]" với mô tả "Tùy chỉnh quyết định cho từng mục hoặc xem chi tiết trước khi áp dụng" và mục "Chọn trang đích".<br>2. Người dùng mở danh sách trang, chọn một hoặc nhiều trang. Mỗi dòng gồm avatar, tên trang, mã định danh và kênh; trang không đủ điều kiện bị vô hiệu hóa kèm lý do (SF-01).<br><br>**B. Xem và chỉnh kế hoạch áp dụng**<br>3. Sau khi chọn trang, hệ thống đối chiếu mẫu với cấu hình hiện tại của trang đích và hiển thị bảng kế hoạch gồm ba cột: MỤC CẤU HÌNH, PHÂN LOẠI, QUYẾT ĐỊNH; mỗi dòng có nút xem chi tiết. Quyết định mặc định theo SF-02.<br>4. Người dùng đổi quyết định của từng mục bằng danh sách chọn ở cột QUYẾT ĐỊNH.<br>5. Người dùng bấm nút xem chi tiết để mở màn "Chi tiết cấu hình" so sánh bản hiện tại của trang với bản trong mẫu, có thể đổi quyết định ngay tại đó, rồi bấm "Quay lại danh sách áp dụng" (SF-03).<br><br>**C. Xác nhận và thực thi**<br>6. Người dùng tick ô xác nhận: "Tôi xác nhận kế hoạch áp dụng này và đồng ý nạp cấu hình mới dưới dạng Bản nháp / Tắt."<br>7. Nút "Xác nhận áp dụng" chỉ khả dụng khi đã tick ô xác nhận và có ít nhất một mục có quyết định khác "Giữ nguyên". Nút "Hủy" đóng popup mà không thay đổi gì.<br>8. Người dùng bấm "Xác nhận áp dụng". Hệ thống kiểm tra lại cấu hình trang đích (AF-5) rồi thực thi áp dụng theo từng trang (SF-04).<br>9. Hệ thống hiển thị kết quả áp dụng theo từng trang (SF-05). |
| **Post-condition** | - Với mỗi trang áp dụng thành công: các mục có quyết định Thêm mới hoặc Cập nhật được ghi vào trang đích với mã định danh riêng của trang, ở trạng thái theo mục 1.4. Các mục Giữ nguyên không thay đổi.<br>- Cấu hình đang chạy với khách hàng không thay đổi; không có tin nhắn nào được gửi cho khách hàng.<br>- Số trang đang dùng của mẫu tăng và tên trang xuất hiện trên thẻ mẫu.<br>- Thay đổi của mẫu về sau không tự cập nhật sang trang đã áp dụng.<br>- Việc áp dụng được ghi audit log: người thực hiện, thời gian, mẫu, trang đích, quyết định và kết quả từng mục. |
| **Luồng thay thế** | **AF-1: Chưa chọn trang.** Hệ thống chưa hiển thị bảng kế hoạch và nút "Xác nhận áp dụng" bị vô hiệu hóa.<br>**AF-2: Không có trang đủ điều kiện.** Hệ thống hiển thị thông báo "Chưa có trang nào đủ điều kiện để áp dụng mẫu này".<br>**AF-3: Mục không được kênh của trang hỗ trợ.** Dòng hiển thị "Không hỗ trợ", quyết định bị khóa ở "Giữ nguyên" và có chú thích lý do.<br>**AF-4: Vượt giới hạn của chức năng đích.** Khi "Thêm mới" làm trang vượt giới hạn tối đa (ví dụ câu hỏi thường gặp tối đa 4, menu tối đa 20 mục): lựa chọn "Thêm mới" bị vô hiệu hóa kèm chú thích "Đã đủ số lượng tối đa".<br>**AF-5: Cấu hình trang thay đổi sau khi lập kế hoạch.** Khi bấm "Xác nhận áp dụng", nếu cấu hình trang đích đã thay đổi so với lúc lập kế hoạch: hệ thống không thực thi, thông báo và yêu cầu làm mới kế hoạch.<br>**AF-6: Áp dụng thất bại ở một trang.** Hệ thống hoàn tác toàn bộ thay đổi của trang đó; các trang khác đã thành công không bị ảnh hưởng. Kết quả hiển thị trang lỗi kèm lý do và nút "Thử lại" cho riêng trang đó.<br>**AF-7: Bấm xác nhận nhiều lần hoặc gửi lại yêu cầu.** Hệ thống chỉ thực hiện một lần áp dụng; các yêu cầu lặp nhận lại kết quả của lần đầu.<br>**AF-8: Mẫu bị ngừng sử dụng khi popup đang mở.** Hệ thống chặn "Xác nhận áp dụng" và thông báo mẫu không còn khả dụng.<br>**AF-9: Trang mất kết nối hoặc người dùng mất quyền khi đang áp dụng.** Trang đó được xử lý như AF-6. |
| **Sub-flow** | **SF-01: Chọn trang đích.**<br>- Danh sách trang cho phép chọn nhiều trang bằng ô chọn.<br>- Trang chỉ chọn được khi: kết nối đang hoạt động, người dùng có quyền cấu hình AntBot trên trang, kênh của trang nằm trong các kênh mẫu hỗ trợ. Trang không đạt bị vô hiệu hóa kèm lý do.<br>- Khi chọn nhiều trang, bảng kế hoạch hiển thị theo từng trang (chuyển qua lại bằng danh sách trang đã chọn ở đầu bảng); mỗi trang có quyết định riêng. Một lần "Xác nhận áp dụng" áp dụng cho tất cả trang đã chọn.<br><br>**SF-02: Ghép mục và quyết định mặc định.**<br>Hệ thống ghép từng mục của mẫu với mục của trang đích theo bảng sau:<br>- Menu mặc định: menu mặc định của trang (mỗi trang có một).<br>- Menu tùy chỉnh: theo tên menu.<br>- Câu hỏi thường gặp: theo nội dung câu hỏi.<br>- Tin nhắn mở đầu, Tin nhắn mặc định: mỗi trang có một.<br>- Từ khóa: cùng tab (Cho khách hàng hoặc Cho trang), cùng phạm vi và cùng nội dung.<br>- Kịch bản chăm sóc: theo tên kịch bản.<br>- Quy luật: theo tên quy tắc.<br><br>Quyết định cho phép và mặc định:<br>- Mục chưa ghép được với mục nào của trang: chọn "Thêm mới" (mặc định) hoặc "Giữ nguyên" (không thêm).<br>- Mục đã ghép được: chọn "Cập nhật" hoặc "Giữ nguyên". Mặc định là "Giữ nguyên" nếu mục của trang đang chạy với khách hàng (menu đã đồng bộ lên kênh, câu hỏi đã xuất bản, các mục đang bật); ngược lại mặc định là "Cập nhật".<br>- "Cập nhật" chỉ chọn được khi không làm thay đổi ngay cấu hình đang chạy: với Menu chính, nội dung mẫu được ghi ở trạng thái "Đã lưu", chưa đồng bộ; với Câu hỏi thường gặp, ghi vào bản nháp; với các loại còn lại, chỉ khi mục của trang đang tắt. Nếu không thỏa, "Cập nhật" bị vô hiệu hóa kèm chú thích.<br><br>**SF-03: Chi tiết cấu hình.** Màn so sánh gồm:<br>- Tiêu đề "Chi tiết cấu hình" và mô tả "So sánh nội dung giữa bản hiện tại trên trang và bản trong gói mẫu".<br>- Dòng nhãn loại mục và tên mục.<br>- Hai khung cạnh nhau: "Bản hiện tại trên: [tên trang]" (nhãn "HIỆN CÓ TRÊN TRANG") và "Bản trong Gói Mẫu: [tên mẫu]" (nhãn "NỘI DUNG MẪU"). Nội dung hiển thị theo loại mục (ví dụ với menu: tên menu, danh sách nút bấm và hành động của từng nút, trạng thái). Mục chưa có trên trang thì khung bên trái hiển thị "Chưa có trên trang".<br>- Mục "Quyết định xử lý cho mục này" với danh sách chọn như bảng kế hoạch.<br>- Nút "Quay lại danh sách áp dụng".<br><br>**SF-04: Thực thi áp dụng.**<br>- Mỗi trang đích được xử lý độc lập trong một lần xử lý riêng; lỗi ở bất kỳ mục nào thì hoàn tác toàn bộ thay đổi của trang đó.<br>- Thứ tự xử lý: đối tượng nền (thẻ, trường thông tin) → nội dung tin nhắn và luồng → Menu chính, Câu hỏi thường gặp, Từ khóa → Kịch bản chăm sóc, Quy luật.<br>- Mục Thêm mới được cấp mã định danh mới tại trang đích. Các tham chiếu giữa các mục trong mẫu (nút menu trỏ tới luồng, quy tắc trỏ tới thẻ hoặc kịch bản...) được trỏ sang mục tương ứng tại trang đích.<br>- Thẻ và trường thông tin được tham chiếu: ghép theo tên với thẻ, trường đã có trên trang đích; chưa có thì tạo mới.<br>- Hình ảnh, video, tệp trong nội dung được sao chép sang phạm vi của trang đích.<br>- Đối tượng không sao chép được theo mục 1.5 (nhóm nhân viên, kết nối API, lịch, tài khoản): để trống; mục tham chiếu tới chúng được đánh dấu "Cần cấu hình lại" và luôn ở trạng thái tắt cho đến khi người dùng cấu hình.<br><br>**SF-05: Kết quả áp dụng.** Popup kết quả hiển thị theo từng trang: trạng thái (thành công, thành công có mục cần cấu hình lại, thất bại), số mục Thêm mới, Cập nhật, Giữ nguyên, Cần cấu hình lại, và danh sách mục cần người dùng xử lý tiếp theo mục 1.4. Mỗi mục trong danh sách có liên kết tới chức năng tương ứng. |
| **Giao diện hệ thống** | Tham chiếu: UI-XX (Áp dụng mẫu).<br>**Popup: Áp dụng Mẫu.** Tiêu đề "Áp dụng Mẫu: [tên mẫu]" và mô tả; mục "Chọn trang đích" (danh sách trang có ô chọn); bảng kế hoạch (MỤC CẤU HÌNH, PHÂN LOẠI, QUYẾT ĐỊNH, nút xem chi tiết); ô xác nhận; nút "Hủy", nút "Xác nhận áp dụng".<br>**Màn: Chi tiết cấu hình.** Xem SF-03.<br>**Popup: Kết quả áp dụng.** Xem SF-05. |
| **Yêu cầu phi chức năng** | NFR-02 (phản hồi lưu), NFR-07 (phân quyền, audit log). |
| **AC tương ứng** | **AC-01:** Khi bấm "Sử dụng mẫu", popup "Áp dụng Mẫu" mở ra với mục "Chọn trang đích"; chưa chọn trang thì chưa có bảng kế hoạch và nút "Xác nhận áp dụng" bị vô hiệu hóa.<br>**AC-02:** Trang mất kết nối, trang người dùng không có quyền, trang có kênh mẫu không hỗ trợ bị vô hiệu hóa trong danh sách kèm lý do.<br>**AC-03:** Sau khi chọn trang, bảng kế hoạch liệt kê đầy đủ các mục của mẫu kèm phân loại và quyết định mặc định đúng theo SF-02.<br>**AC-04:** Mục đã ghép với mục đang chạy với khách hàng có quyết định mặc định "Giữ nguyên"; mục đã ghép với mục ở trạng thái bản nháp hoặc tắt có quyết định mặc định "Cập nhật".<br>**AC-05:** Với mục "Cập nhật" không thỏa điều kiện không ghi đè cấu hình đang chạy, lựa chọn "Cập nhật" bị vô hiệu hóa kèm chú thích.<br>**AC-06:** Khi câu hỏi thường gặp của trang đã đủ 4 và mẫu có câu hỏi chưa ghép được, lựa chọn "Thêm mới" của câu hỏi đó bị vô hiệu hóa.<br>**AC-07:** Bấm nút xem chi tiết mở màn "Chi tiết cấu hình" hiển thị đúng hai khung so sánh; đổi quyết định tại đây thì bảng kế hoạch cập nhật theo khi quay lại.<br>**AC-08:** Nút "Xác nhận áp dụng" chỉ khả dụng khi đã tick ô xác nhận và có ít nhất một mục khác "Giữ nguyên".<br>**AC-09:** Sau khi áp dụng thành công, các mục Thêm mới và Cập nhật nằm ở đúng trạng thái theo mục 1.4 và không có tin nhắn nào được gửi cho khách hàng.<br>**AC-10:** Cấu hình đang chạy với khách hàng của trang đích (menu đã đồng bộ, câu hỏi đã xuất bản, mục đang bật) không thay đổi sau khi áp dụng.<br>**AC-11:** Các mục Thêm mới có mã định danh mới tại trang đích; mọi tham chiếu giữa các mục trỏ về mục tại trang đích, không trỏ về trang nguồn hay mẫu.<br>**AC-12:** Thẻ và trường thông tin được tham chiếu được ghép theo tên với thẻ, trường đã có hoặc tạo mới nếu chưa có.<br>**AC-13:** Mục tham chiếu nhóm nhân viên, kết nối API hoặc lịch được đánh dấu "Cần cấu hình lại", ở trạng thái tắt và không bật được.<br>**AC-14:** Khi chọn nhiều trang, mỗi trang có kế hoạch và quyết định riêng; một lần xác nhận áp dụng cho tất cả.<br>**AC-15:** Khi một trang áp dụng thất bại, toàn bộ thay đổi của trang đó được hoàn tác; các trang khác không bị ảnh hưởng và trang lỗi có nút "Thử lại".<br>**AC-16:** Bấm "Xác nhận áp dụng" nhiều lần hoặc gửi lại yêu cầu chỉ tạo một lần áp dụng, không sinh mục trùng.<br>**AC-17:** Khi cấu hình trang đích đã thay đổi sau lúc lập kế hoạch, hệ thống không thực thi và yêu cầu làm mới kế hoạch.<br>**AC-18:** Thay đổi mẫu sau khi áp dụng không làm thay đổi cấu hình của trang đã áp dụng.<br>**AC-19:** Bấm "Hủy" đóng popup và không thay đổi gì trên bất kỳ trang nào.<br>**AC-20:** Sau khi áp dụng, popup kết quả hiển thị đúng số mục theo từng quyết định cho từng trang, và thao tác áp dụng được ghi audit log. |
| **BR tương ứng** | **BR-01:** Người dùng chọn một hoặc nhiều trang đích; trang chỉ chọn được khi kết nối hoạt động, người dùng có quyền cấu hình AntBot trên trang và kênh được mẫu hỗ trợ.<br>**BR-02:** Áp dụng mẫu tạo bản sao độc lập tại trang đích; thay đổi của mẫu không lan sang trang đã áp dụng.<br>**BR-03:** Quyết định của mỗi mục là Thêm mới, Cập nhật hoặc Giữ nguyên; quyết định mặc định và điều kiện cho phép theo SF-02.<br>**BR-04:** Không ghi đè cấu hình đang chạy với khách hàng. Cập nhật chỉ ghi vào bản nháp, trạng thái "Đã lưu" chưa đồng bộ, hoặc mục đang tắt.<br>**BR-05:** Sau khi áp dụng, các mục ở trạng thái theo mục 1.4 và không gửi tin nhắn cho khách hàng; người dùng chủ động xuất bản hoặc bật từng mục.<br>**BR-06:** Chỉ xác nhận áp dụng khi đã tick ô xác nhận và có ít nhất một mục khác "Giữ nguyên".<br>**BR-07:** Mỗi trang đích được xử lý độc lập; lỗi ở trang nào thì chỉ hoàn tác trang đó.<br>**BR-08:** Một yêu cầu xác nhận chỉ tạo một lần áp dụng; yêu cầu lặp không tạo mục trùng.<br>**BR-09:** Không sao chép các dữ liệu nêu tại mục 1.5 sang trang đích.<br>**BR-10:** Mục không được kênh của trang hỗ trợ hiển thị "Không hỗ trợ" và bị khóa ở "Giữ nguyên".<br>**BR-11:** Mục tham chiếu tới đối tượng không sao chép được phải đánh dấu "Cần cấu hình lại" và luôn tắt cho đến khi cấu hình.<br>**BR-12:** Mẫu "Ngừng sử dụng" không áp dụng mới được.<br>**BR-13:** Mọi lần áp dụng được ghi audit log. |

---

## 4. FR-TPL-003: Quản lý Mẫu của tôi

| Mục | Nội dung |
|---|---|
| **Mô tả** | Cho phép người dùng tạo mẫu từ cấu hình hiện có của một trang, chỉnh sửa thông tin và danh sách mục của mẫu, và ngừng sử dụng mẫu. Chức năng chỉ áp dụng cho Mẫu của tôi; Mẫu hệ thống chỉ đọc.<br>Mẫu là ảnh chụp cấu hình tại thời điểm tạo hoặc làm mới; thay đổi của trang nguồn về sau không tự cập nhật vào mẫu. |
| **Đối tượng liên quan** | Admin/Quản lý |
| **Pre-conditions** | - Người dùng đã đăng nhập.<br>- Với "Tạo mẫu": có ít nhất một trang mà người dùng có quyền cấu hình AntBot và trang có ít nhất một mục cấu hình hoàn tất. |
| **Điều kiện kích hoạt** | Người dùng bấm "Tạo mẫu", hoặc "Chỉnh sửa", "Ngừng sử dụng" trên thẻ trong tab "Mẫu của tôi" (FR-TPL-001). |
| **Luồng xử lý chính** | **A. Tạo mẫu**<br>1. Người dùng bấm "Tạo mẫu". Hệ thống mở màn "Tạo mẫu" gồm: Tên mẫu (bắt buộc, tối đa 100 ký tự), Mô tả (bắt buộc, tối đa 300 ký tự), Trang nguồn (chọn một trang), và danh sách mục cấu hình của trang nguồn (SF-01).<br>2. Người dùng chọn trang nguồn. Hệ thống tải các mục cấu hình của trang, mặc định chọn tất cả mục hợp lệ.<br>3. Người dùng bỏ chọn hoặc chọn thêm các mục cần đưa vào mẫu.<br>4. Người dùng bấm "Lưu". Hệ thống kiểm tra dữ liệu (AF-1 đến AF-3), tạo mẫu theo SF-02 và đóng màn.<br>5. Mẫu mới xuất hiện ở đầu tab "Mẫu của tôi", ở trạng thái sử dụng được.<br><br>**B. Chỉnh sửa mẫu**<br>6. Người dùng bấm "Chỉnh sửa" trên thẻ. Hệ thống mở màn "Chỉnh sửa mẫu" gồm tên, mô tả, danh sách mục hiện có trong mẫu và nút "Làm mới từ trang nguồn".<br>7. Người dùng sửa tên, mô tả; bỏ mục khỏi mẫu; hoặc bấm "Làm mới từ trang nguồn" để lấy lại nội dung các mục từ cấu hình hiện tại của trang nguồn và chọn lại tập mục.<br>8. Người dùng bấm "Lưu". Hệ thống kiểm tra dữ liệu và cập nhật mẫu.<br><br>**C. Ngừng sử dụng và mở lại**<br>9. Người dùng bấm "Ngừng sử dụng". Hệ thống hiển thị hộp thoại xác nhận, nêu số trang đang dùng mẫu.<br>10. Sau khi xác nhận, mẫu chuyển sang "Ngừng sử dụng": thẻ hiển thị nhãn "Ngừng sử dụng", nút "Sử dụng mẫu" bị vô hiệu hóa, nút "Ngừng sử dụng" đổi thành "Mở lại".<br>11. Người dùng bấm "Mở lại" để mẫu trở lại trạng thái sử dụng được. |
| **Post-condition** | - Mẫu được tạo, cập nhật hoặc đổi trạng thái đúng theo thao tác.<br>- Các trang đã áp dụng mẫu không bị ảnh hưởng bởi việc chỉnh sửa hay ngừng sử dụng mẫu.<br>- Các thao tác tạo, chỉnh sửa, ngừng sử dụng, mở lại được ghi audit log. |
| **Luồng thay thế** | **AF-1: Tên hoặc mô tả không hợp lệ.** Để trống, vượt độ dài, hoặc tên trùng với Mẫu của tôi khác (không phân biệt hoa thường, bỏ khoảng trắng đầu cuối): hệ thống viền đỏ trường lỗi, báo lỗi dưới trường và không lưu.<br>**AF-2: Chưa chọn trang nguồn hoặc chưa chọn mục nào.** Hệ thống chặn lưu và báo lỗi.<br>**AF-3: Trang nguồn không có mục hợp lệ.** Hệ thống hiển thị thông báo "Trang chưa có cấu hình hoàn tất để tạo mẫu" và chặn lưu.<br>**AF-4: Lưu thất bại do lỗi hệ thống.** Hệ thống hiển thị thông báo lỗi, giữ nguyên dữ liệu đang nhập để thử lại.<br>**AF-5: Trang nguồn không còn tồn tại hoặc mất quyền.** Nút "Làm mới từ trang nguồn" bị vô hiệu hóa kèm chú thích; người dùng vẫn sửa được tên, mô tả và bỏ mục.<br>**AF-6: Thoát khi có thay đổi chưa lưu.** Hệ thống hiển thị hộp thoại xác nhận bỏ thay đổi. |
| **Sub-flow** | **SF-01: Chọn mục đưa vào mẫu.** Các mục của trang nguồn được nhóm theo loại (Menu chính, Câu hỏi thường gặp, Tin nhắn mở đầu, Tin nhắn mặc định, Từ khóa, Kịch bản chăm sóc, Quy luật), mỗi nhóm có ô chọn cả nhóm và mỗi mục có ô chọn riêng. Mục ở trạng thái "Chưa hoàn tất" hoặc "Cần cấu hình lại" bị vô hiệu hóa kèm lý do. Mẫu phải có ít nhất một mục.<br><br>**SF-02: Nội dung ghi vào mẫu.**<br>- Ghi nội dung và cấu hình của các mục đã chọn tại thời điểm lưu.<br>- Không ghi các dữ liệu nêu tại mục 1.5.<br>- Thẻ và trường thông tin được tham chiếu ghi theo tên.<br>- Tham chiếu tới nhóm nhân viên, kết nối ngoài, tài khoản được ghi là chỗ trống để người dùng cấu hình khi áp dụng.<br>- Xác định "Mẫu gốc" theo mục 1.3. |
| **Giao diện hệ thống** | Tham chiếu: UI-XX (Quản lý Mẫu của tôi).<br>**Màn: Tạo mẫu.** Tên mẫu; Mô tả; Trang nguồn; danh sách mục theo nhóm; nút "Hủy", nút "Lưu".<br>**Màn: Chỉnh sửa mẫu.** Tên; mô tả; danh sách mục trong mẫu; nút "Làm mới từ trang nguồn"; nút "Hủy", nút "Lưu".<br>**Hộp thoại: Ngừng sử dụng.** Nội dung xác nhận kèm số trang đang dùng mẫu. |
| **Yêu cầu phi chức năng** | NFR-02 (phản hồi lưu), NFR-07 (phân quyền, audit log). |
| **AC tương ứng** | **AC-01:** Bấm "Tạo mẫu" mở màn tạo mẫu; sau khi chọn trang nguồn, danh sách mục của trang hiển thị theo nhóm và mặc định chọn các mục hợp lệ.<br>**AC-02:** Mục "Chưa hoàn tất" hoặc "Cần cấu hình lại" bị vô hiệu hóa kèm lý do.<br>**AC-03:** Khi tên trống, vượt 100 ký tự hoặc trùng, hoặc mô tả trống, bấm "Lưu" bị chặn và báo lỗi tại trường.<br>**AC-04:** Khi chưa chọn mục nào, bấm "Lưu" bị chặn.<br>**AC-05:** Sau khi lưu hợp lệ, mẫu xuất hiện ở đầu tab "Mẫu của tôi" kèm "Mẫu gốc" đúng.<br>**AC-06:** Mẫu mới tạo không chứa token, mã định danh thật của trang, dữ liệu khách hàng, thống kê hay lịch sử chạy.<br>**AC-07:** Chỉnh sửa tên, mô tả hoặc bỏ mục rồi lưu thì thẻ mẫu cập nhật tương ứng.<br>**AC-08:** "Làm mới từ trang nguồn" lấy lại nội dung các mục từ cấu hình hiện tại của trang nguồn.<br>**AC-09:** Thay đổi trang nguồn sau khi tạo mẫu không làm thay đổi mẫu cho đến khi người dùng "Làm mới từ trang nguồn" và lưu.<br>**AC-10:** Chỉnh sửa mẫu không làm thay đổi cấu hình của các trang đã áp dụng mẫu.<br>**AC-11:** Bấm "Ngừng sử dụng" hiển thị hộp thoại xác nhận nêu số trang đang dùng; sau khi xác nhận, thẻ có nhãn "Ngừng sử dụng" và "Sử dụng mẫu" bị vô hiệu hóa; các trang đã áp dụng không thay đổi.<br>**AC-12:** Bấm "Mở lại" đưa mẫu về trạng thái sử dụng được.<br>**AC-13:** Mẫu hệ thống không có nút "Chỉnh sửa" và "Ngừng sử dụng".<br>**AC-14:** Thoát màn lúc còn thay đổi chưa lưu thì hiển thị hộp thoại xác nhận bỏ thay đổi. |
| **BR tương ứng** | **BR-01:** Chỉ Mẫu của tôi mới tạo, chỉnh sửa, ngừng sử dụng, mở lại được; Mẫu hệ thống chỉ đọc.<br>**BR-02:** Tên mẫu bắt buộc, tối đa 100 ký tự, không trùng trong Mẫu của tôi (không phân biệt hoa thường, bỏ khoảng trắng đầu cuối). Mô tả bắt buộc, tối đa 300 ký tự.<br>**BR-03:** Mẫu phải có ít nhất một mục. Mục "Chưa hoàn tất" hoặc "Cần cấu hình lại" không đưa vào mẫu được.<br>**BR-04:** Mẫu là ảnh chụp tại thời điểm tạo hoặc làm mới; thay đổi của trang nguồn không tự cập nhật vào mẫu.<br>**BR-05:** Không đóng gói các dữ liệu nêu tại mục 1.5.<br>**BR-06:** Ngừng sử dụng chỉ chặn áp dụng mới, không ảnh hưởng trang đã áp dụng.<br>**BR-07:** Người dùng cần có quyền cấu hình AntBot trên trang nguồn mới tạo hoặc làm mới mẫu từ trang đó.<br>**BR-08:** Mọi thao tác trên Mẫu của tôi được ghi audit log. |

---

## 5. Phụ lục

### Phụ lục A. Mẫu hệ thống hiện có

---

#### A.1. Shop Online 🛍️

**Mục tiêu:** Hỗ trợ khách tìm sản phẩm, xem khuyến mãi, tạo yêu cầu đặt hàng, tra cứu đơn và chuyển tư vấn viên khi cần.

**Phù hợp với:** Shop thời trang, mỹ phẩm, đồ gia dụng, thực phẩm đóng gói và cửa hàng bán lẻ có danh mục sản phẩm.

**Không bao gồm:** Thanh toán trực tiếp trong chat, tự xác nhận tồn kho, tự cam kết thời gian giao hàng hoặc tự phê duyệt đổi trả.

**Thành phần có trong mẫu:**

| Loại | Số lượng | Nội dung |
|---|:---:|---|
| Menu chính | 1 | Xem sản phẩm, Khuyến mãi hôm nay, Đặt hàng, Tra cứu đơn hàng, Hỗ trợ tư vấn |
| Câu hỏi thường gặp | 4 | Phí & thời gian giao hàng; Phương thức thanh toán; Chính sách đổi trả; Liên hệ shop |
| Tin nhắn mở đầu | 1 | Chào khách, giới thiệu tên shop và hiển thị 4 lựa chọn nhanh |
| Tin nhắn mặc định | 1 | Thông báo chưa hiểu yêu cầu, hiển thị lại các lựa chọn chính |
| Từ khóa | 6 | Sản phẩm; Khuyến mãi; Đặt hàng; Tra cứu đơn; Đổi trả; Gặp tư vấn viên |
| Luồng tin nhắn | 6 | Tìm sản phẩm; Xem khuyến mãi; Tạo yêu cầu đặt hàng; Tra cứu đơn; Đổi trả; Gặp tư vấn viên |
| Kịch bản chăm sóc | 1 | Nhắc khách có nhu cầu đặt hàng nhưng chưa hoàn tất (2 bước, 30 phút và 20 giờ) |
| Quy luật tự động | 3 | Gắn thẻ khi đặt hàng; Chuyển nhân viên khi yêu cầu; Dừng kịch bản khi đơn hoàn tất |
| Thẻ | 3 | Quan tâm sản phẩm; Có ý định đặt hàng; Cần tư vấn viên |
| Trường thông tin | 5 | Nhóm sản phẩm; Sản phẩm quan tâm; Số lượng; Mã đơn hàng; Thông tin liên hệ |

**Thông tin cần tùy chỉnh trước khi xuất bản:**

| Thông tin | Bắt buộc | Mô tả |
|---|:---:|---|
| Tên cửa hàng | ✅ | Tên hiển thị trong tin nhắn chào và fallback. Tối đa 80 ký tự. |
| URL danh mục / website bán hàng | ✅ | Đường dẫn `https://` tới trang sản phẩm. Bot dẫn khách tới đây khi chưa có catalog integration. |
| Hotline / đầu mối hỗ trợ | ✅ | Số điện thoại hoặc tên kênh liên hệ hiển thị khi khách hỏi liên hệ. |
| Giờ làm việc | ✅ | Ví dụ: "8:00–22:00, T2–CN (GMT+7)". Dùng trong luồng gặp tư vấn viên ngoài giờ. |
| Nhóm nhân viên nhận tư vấn / đặt hàng | ✅ | Hàng đợi hoặc nhóm xử lý tại Page đích. |
| Kết nối tra cứu đơn hàng | — | API/integration tra cứu đơn. Nếu để trống, bot chuyển xử lý thủ công thay vì tra cứu tự động. |
| Nguồn khuyến mãi | — | URL, API hoặc luồng lấy danh sách khuyến mãi hiện hành. Nếu để trống, ẩn mục khuyến mãi hoặc chuyển tư vấn viên. |
| URL chính sách đổi trả | — | Đường dẫn `https://` tới trang chính sách. Nếu để trống, bot chạy luồng đổi trả thủ công. |

---

#### A.2. Bất động sản 🏢

**Mục tiêu:** Thu thập nhu cầu mua/thuê, gợi ý dự án phù hợp, cung cấp giá và chính sách đã được duyệt, đặt lịch tham quan và chuyển chuyên viên.

**Phù hợp với:** Chủ đầu tư, sàn môi giới, đội bán hàng dự án, đơn vị cho thuê hoặc môi giới nhà ở.

**Không bao gồm:** Tư vấn pháp lý, cam kết lợi nhuận, tự phê duyệt khoản vay, giữ chỗ hoặc nhận tiền cọc trong chat.

**Thành phần có trong mẫu:**

| Loại | Số lượng | Nội dung |
|---|:---:|---|
| Menu chính | 1 | Tìm bất động sản, Dự án nổi bật, Giá & chính sách, Đặt lịch tham quan, Tư vấn chuyên viên |
| Câu hỏi thường gặp | 4 | Giá bán hiện tại; Pháp lý dự án; Hỗ trợ vay; Cách đặt lịch xem |
| Tin nhắn mở đầu | 1 | Chào khách, giới thiệu đơn vị và hiển thị 4 lựa chọn nhanh |
| Tin nhắn mặc định | 1 | Thông báo chưa xác định nhu cầu, hiển thị lại các lựa chọn |
| Từ khóa | 6 | Dự án/loại hình; Bảng giá; Đặt lịch xem; Vay ngân hàng; Pháp lý; Gặp chuyên viên |
| Luồng tin nhắn | 6 | Khám phá nhu cầu (8 bước); Thông tin dự án; Giá & chính sách; Đặt lịch tham quan; Tài chính tham khảo; Gặp chuyên viên |
| Kịch bản chăm sóc | 2 | Nuture lead có nhu cầu (3 bước, 1–7 ngày); Nhắc lịch tham quan (trước 24 giờ và 2 giờ) |
| Quy luật tự động | 4 | Chấm điểm lead qualified; Đánh dấu hot lead; Ghi danh nhắc lịch khi đặt lịch thành công; Dừng nuture khi opt-out hoặc agent tiếp nhận |
| Thẻ | 4 | Lead mới; Lead đủ điều kiện; Lead nóng; Đã đặt lịch tham quan |
| Trường thông tin | 9 | Loại BĐS; Khu vực; Ngân sách; Mục đích; Số phòng ngủ; Thời gian dự kiến; Dự án quan tâm; Thông tin liên hệ; Thời gian tham quan |

**Thông tin cần tùy chỉnh trước khi xuất bản:**

| Thông tin | Bắt buộc | Mô tả |
|---|:---:|---|
| Tên đơn vị tư vấn | ✅ | Tên hiển thị trong tin nhắn chào và fallback. Tối đa 100 ký tự. |
| Nguồn danh sách dự án | ✅ | API hoặc data source trả về dự án đang mở bán/cho thuê và trạng thái hiệu lực. Bot chỉ gợi ý dự án từ nguồn này. |
| Nguồn bảng giá & chính sách | ✅ | API, document hoặc URL có ngày hiệu lực. Dữ liệu quá hạn bị chặn, bot chuyển chuyên viên thay vì hiển thị giá cũ. |
| Nhóm chuyên viên nhận lead | ✅ | Hàng đợi hoặc nhóm xử lý tại Page đích. |
| Giờ làm việc | ✅ | Ví dụ: "8:00–20:00, T2–CN (GMT+7)". Dùng trong luồng gặp chuyên viên ngoài giờ. |
| URL chính sách xử lý thông tin cá nhân | ✅ | Đường dẫn `https://` tới privacy notice. Hiển thị trước khi thu thập thông tin liên hệ của khách. |
| Hotline / đầu mối liên hệ | ✅ | Số điện thoại hoặc tên kênh liên hệ hiển thị cho khách. |
| Kết nối lịch tham quan | — | Calendar API để kiểm tra slot và tạo lịch tự động. Nếu để trống, bot tạo yêu cầu chờ chuyên viên xác nhận thủ công — **không** thông báo "đặt lịch thành công" khi chưa xác nhận. |

### Phụ lục B. Nguyên tắc khi soạn nội dung Mẫu hệ thống

Các nguyên tắc dành cho người soạn nội dung mẫu, không phải yêu cầu chức năng:
- Không để dữ liệu minh họa (giá, tồn kho, tên dự án, chính sách) có thể bị hiểu là dữ liệu thật của doanh nghiệp.
- Không đưa ra cam kết về lợi nhuận, pháp lý, phê duyệt vay, giao hàng hay hoàn tiền.
- Không yêu cầu khách hàng gửi mật khẩu, mã OTP, số thẻ hoặc giấy tờ tùy thân trong chat.
- Chỉ thu thập thông tin liên hệ sau khi khách hàng được thông báo và đồng ý.
- Luôn có lối chuyển sang nhân viên khi bot không đủ thông tin để trả lời.
- Đường dẫn trong nút bấm chỉ dùng HTTPS.