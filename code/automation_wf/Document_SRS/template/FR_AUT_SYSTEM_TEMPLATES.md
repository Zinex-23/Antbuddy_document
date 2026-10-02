# FR-AUT-SYSTEM-TEMPLATES: Mẫu Automation Hệ Thống

**Phạm vi:** Đặc tả chức năng Mẫu sẵn có (Built-in / System Templates)
**Phiên bản:** 2.0
**Ngày cập nhật:** 02/10/2026
**Tài liệu liên quan:** `AntBot_Template_FR_001_009.md`, `AntBot_Builtin_Template_Spec.md`

---

## 1. Tổng quan

### 1.1. Mục đích

Mẫu Automation là gói cấu hình chatbot đã được dựng sẵn, cho phép người dùng khởi tạo nhanh một hệ thống hội thoại hoàn chỉnh mà không cần xây dựng thủ công từng thành phần (Menu, Tin nhắn, Từ khóa, Luồng, Kịch bản, Quy luật).

Người dùng chọn Mẫu phù hợp → xem trước nội dung → chọn Page đích → hệ thống tạo bản sao độc lập tại Page đích → người dùng tùy chỉnh thông tin doanh nghiệp → kiểm tra dependency → chủ động Publish/Activate.

### 1.2. Phân loại Mẫu

| Loại | Mô tả | Quyền chỉnh sửa |
|---|---|---|
| **Mẫu hệ thống** (Built-in) | Do AntBot cung cấp, đại diện cho các lĩnh vực phổ biến. | Chỉ đọc. Người dùng không sửa bản gốc; phải Sao chép thành Mẫu của tổ chức để tùy biến. |
| **Mẫu của tổ chức** | Do người dùng tạo từ cấu hình Page hoặc sao chép từ Mẫu hệ thống. | Chủ sở hữu và người có quyền mới được sửa. |

**Quy tắc quan trọng:** Khi áp dụng Mẫu, hệ thống tạo bản sao độc lập tại Page đích với ID mới. Việc sửa Mẫu gốc sau đó **không** tự cập nhật sang các Page đã áp dụng.

### 1.3. Danh mục Mẫu hệ thống hiện có

| Mã Mẫu | Tên hiển thị | Lĩnh vực | Trạng thái |
|---|---|---|---|
| `TPL-SYS-SHOP-ONLINE` | Shop Online 🛍️ | Thương mại điện tử / Bán lẻ | `READY` |
| `TPL-SYS-REAL-ESTATE` | Bất động sản 🏢 | Tư vấn dự án & Đặt lịch | `READY` |
| `TPL-SYS-COSMETICS` | Cửa hàng mỹ phẩm 💄 | Làm đẹp & Chăm sóc da | `READY` |

---

## 2. Cấu trúc một Mẫu hệ thống

### 2.1. Metadata Mẫu

| Trường | Bắt buộc | Mô tả |
|---|:---:|---|
| Mã Mẫu | Có | Định danh duy nhất, dạng `TPL-SYS-<DOMAIN>`. |
| Tên hiển thị | Có | Tên ngắn trong danh sách, tối đa 100 ký tự. |
| Mô tả | Có | Mục tiêu và đối tượng phù hợp của Mẫu. |
| Symbol / Icon | Không | Emoji hoặc icon đại diện trong danh sách. |
| Phiên bản | Có | Snapshot phiên bản, bất biến sau khi `READY`. |
| Kênh ưu tiên | Có | Kênh được thiết kế và kiểm thử. |
| Trạng thái | Có | `DRAFT`, `READY` hoặc `ARCHIVED`. |
| Logical key config | Có | Danh sách biến cần cấu hình trước khi xuất bản. |

### 2.2. Thành phần được đóng gói

Mỗi Mẫu chỉ chứa các thành phần cần thiết cho mục tiêu của nó; không bắt buộc phải có đủ mọi loại.

| Thành phần | Nội dung lưu trong Mẫu |
|---|---|
| **Menu chính** | Tên Menu, danh sách mục, thứ tự, loại hành động và đích của từng mục. |
| **Câu hỏi thường gặp (FAQ)** | Câu hỏi hiển thị, phản hồi/hành động và thứ tự. |
| **Tin nhắn mở đầu (Welcome Message)** | Các bước, nội dung, nút, Quick Replies và bước tiếp theo. |
| **Tin nhắn mặc định (Default Message)** | Các bước fallback, nội dung, Quick Replies và frequency cap. |
| **Từ khóa (Keyword)** | Từ khóa include/exclude, chế độ khớp, độ ưu tiên và flow đích. |
| **Luồng tin nhắn (Message Flow)** | Các bước, nội dung, nút, điều kiện phân nhánh và liên kết bước. |
| **Kịch bản chăm sóc (Sequence)** | Các bước gửi, delay/trigger time, điều kiện và điều kiện dừng. |
| **Quy luật (Automation Rule)** | Trigger, điều kiện, danh sách action theo thứ tự và idempotency key. |
| **Thẻ (Tag)** | Logical key; hệ thống tạo mới hoặc ánh xạ Tag tương thích ở Page đích. |
| **Trường tùy chỉnh (Custom Field)** | Logical key; hệ thống tạo mới hoặc ánh xạ trường tương thích ở Page đích. |

### 2.3. Quy ước định danh logical key

Các mã trong Mẫu là **logical key** — định danh ngữ nghĩa trong phạm vi Mẫu. Khi áp dụng, hệ thống tạo ID thực tại Page đích và ánh xạ toàn bộ tham chiếu.

| Loại | Quy ước | Ví dụ |
|---|---|---|
| Menu | `MENU_<DOMAIN>_<PURPOSE>` | `MENU_SHOP_DEFAULT` |
| FAQ | `FAQ_<DOMAIN>_<PURPOSE>` | `FAQ_SHOP_SHIPPING` |
| Flow | `FLOW_<DOMAIN>_<PURPOSE>` | `FLOW_RE_BOOK_VIEWING` |
| Keyword | `KW_<DOMAIN>_<PURPOSE>` | `KW_SHOP_ORDER_STATUS` |
| Sequence | `SEQ_<DOMAIN>_<PURPOSE>` | `SEQ_RE_LEAD_NURTURE` |
| Rule | `RULE_<DOMAIN>_<PURPOSE>` | `RULE_SHOP_CART_INTENT` |
| Tag | `TAG_<DOMAIN>_<PURPOSE>` | `TAG_SHOP_CART_INTENT` |
| Custom field | `FIELD_<DOMAIN>_<PURPOSE>` | `FIELD_RE_BUDGET` |

### 2.4. Dữ liệu tuyệt đối không đóng gói

- Access token, API key, webhook secret và mọi loại credential kết nối.
- ID thật của Page nguồn, nhân viên, nhóm xử lý hoặc khách hàng.
- Dữ liệu hội thoại, đơn hàng, tồn kho, bảng giá thật hoặc danh sách dự án thật.
- Dữ liệu huấn luyện NLU, kỹ năng mặc định Page và báo cáo lịch sử chạy.
- Trạng thái tham gia Kịch bản chăm sóc của khách hàng.
- Thống kê, execution log và audit log của Page nguồn.

---

## 3. Luồng sử dụng Mẫu hệ thống

### 3.1. Xem Mẫu (không thay đổi cấu hình)

1. Người dùng mở **AntBot → Mẫu cấu hình → tab Mẫu hệ thống**.
2. Hệ thống hiển thị danh sách Mẫu với symbol, tên, mô tả, kênh ưu tiên và trạng thái.
3. Người dùng tìm kiếm/lọc và chọn xem chi tiết một Mẫu.
4. Hệ thống hiển thị:
   - Tên, mô tả và kênh ưu tiên.
   - Manifest đầy đủ (tên và số lượng từng nhóm thành phần).
   - Nội dung xem trước từng thành phần (read-only).
   - Danh sách logical key config bắt buộc và tùy chọn.
   - Dependency graph và tài nguyên cần ánh xạ ở Page đích.
5. Xem Mẫu không tạo hoặc thay đổi bất kỳ cấu hình nào trên Page.

### 3.2. Áp dụng Mẫu vào Page đích

```
Chọn Mẫu → "Sử dụng mẫu" → Chọn Page đích
→ Phân tích & tạo Application Plan
→ Người dùng xem xét, ánh xạ dependency, xác nhận xung đột
→ Xác nhận → Thực thi → Mở checklist kiểm tra & xuất bản
```

**Bước 1 — Chọn Page đích:**
- Người dùng chọn một hoặc nhiều Page trong tổ chức.
- Hệ thống kiểm tra: quyền ghi của người dùng, trạng thái kết nối kênh và khả năng hỗ trợ thành phần của kênh.

**Bước 2 — Application Plan:**

Với mỗi thành phần trong Mẫu, hệ thống xác định quyết định:

| Quyết định | Ý nghĩa |
|---|---|
| `CREATE` | Thành phần chưa có ở Page đích → tạo mới với ID riêng. |
| `REUSE` | Tài nguyên tương thích đã có ở đích → ánh xạ, không tạo bản sao. |
| `UPDATE_AS_DRAFT` | Cập nhật nháp của thành phần hiện có; bản Published không bị ghi đè. |
| `KEEP` | Giữ nguyên cấu hình hiện tại của Page (mặc định cho thành phần đang Published). |
| `UNSUPPORTED` | Kênh không hỗ trợ thành phần → cảnh báo, không tạo; kiểm tra broken dependency. |

**Bước 3 — Xử lý xung đột:**

| Tình huống | Xử lý mặc định |
|---|---|
| Page chưa có thành phần tương ứng | `CREATE`. |
| Page đã có Menu mặc định Published | `KEEP`; người dùng chọn `UPDATE_AS_DRAFT` nếu muốn thay thế. |
| Tên trùng với thành phần hiện có | Đổi tên bản sao hoặc cho người dùng chọn `REUSE`. |
| Thành phần đang Published/Active | Không ghi đè nếu chưa xác nhận rõ ràng. |
| Kênh không hỗ trợ | `UNSUPPORTED`; nhánh fallback sang nhân viên vẫn phải hợp lệ. |

**Bước 4 — Ánh xạ dependency:**
- **Tag, Custom Field:** tạo mới hoặc ánh xạ với tài nguyên tương thích đã có.
- **Nhóm nhân viên / Queue:** người dùng chọn nhóm tại Page đích.
- **API connection, Lịch, Catalog:** người dùng chọn kết nối; không sao chép credential.
- **Media:** sao chép sang phạm vi Page đích nếu hợp lệ.
- **Privacy Notice URL:** xác nhận URL hợp lệ của tổ chức/Page đích.

**Bước 5 — Thực thi:**

1. Hệ thống tạo `idempotency key` cho mỗi cặp (Template version + target scope + request).
2. Tạo transaction boundary theo từng Page đích riêng biệt.
3. Xử lý theo thứ tự dependency: tài nguyên nền (Tag, Field, Media) → nội dung (Message, Flow) → điều hướng (Menu, FAQ, Keyword) → tự động (Sequence, Rule).
4. Mỗi thành phần `CREATE` được cấp ID mới; toàn bộ tham chiếu nội bộ được remap sang ID đích.
5. Ghi Application Run: kết quả từng mục (created/reused/kept/updated/skipped/failed), ID mapping, người thực hiện và thời gian.

**Bước 6 — Trạng thái sau khi áp dụng:**

| Thành phần | Trạng thái |
|---|---|
| Menu, FAQ, Luồng tin nhắn | `DRAFT` |
| Tin nhắn mở đầu, Tin nhắn mặc định | `INACTIVE` |
| Từ khóa | `INACTIVE` |
| Kịch bản chăm sóc | `INACTIVE` |
| Quy luật | `INACTIVE` |

> **Quan trọng:** Bấm "Sử dụng mẫu" **không** phát sinh tin nhắn tới khách hàng. Cấu hình Published cũ của Page tiếp tục phục vụ khách cho đến khi người dùng chủ động Publish/Activate.

### 3.3. Kiểm tra, tùy chỉnh và phát hành

Sau khi áp dụng, hệ thống mở **checklist xuất bản** gồm tất cả thành phần vừa tạo. Người dùng phải:

1. Rà soát và thay thế toàn bộ thông tin minh họa bằng dữ liệu thật của doanh nghiệp:
   - Tên doanh nghiệp, cách xưng hô và thông tin liên hệ.
   - Nội dung tin nhắn, Menu, FAQ và CTA.
   - Sản phẩm/dự án/dịch vụ, chính sách và bảng giá.
   - Hotline, URL, địa chỉ và giờ làm việc.
   - Từ khóa và thời gian gửi Kịch bản chăm sóc.
   - Thẻ, Trường thông tin và ánh xạ nhóm nhân viên.
   - Kết nối API, lịch, catalog hoặc nguồn dữ liệu mà Mẫu tham chiếu.
2. Xử lý hết lỗi và cảnh báo dependency còn thiếu.
3. Chủ động bấm **Publish** (Menu, FAQ, Flow) hoặc **Activate** (Keyword, Sequence, Rule) từng thành phần.

Hệ thống **chặn Publish/Activate** nếu còn trường logical key bắt buộc chưa điền hoặc dependency chưa hợp lệ.

---

## 4. Mẫu hệ thống — Shop Online

### 4.1. Thông tin Mẫu

| Thuộc tính | Giá trị |
|---|---|
| Mã Mẫu | `TPL-SYS-SHOP-ONLINE` |
| Tên hiển thị | Shop Online 🛍️ |
| Mục tiêu | Hỗ trợ khách tìm sản phẩm, xem khuyến mãi, tạo yêu cầu đặt hàng, tra cứu đơn và chuyển tư vấn viên khi cần. |
| Đối tượng phù hợp | Shop thời trang, mỹ phẩm, đồ gia dụng, thực phẩm đóng gói và cửa hàng bán lẻ có danh mục sản phẩm. |
| Kênh ưu tiên | Facebook Messenger, Instagram, Zalo OA (theo capability connector). |
| Không bao gồm | Thanh toán trực tiếp, tự xác nhận tồn kho, tự cam kết thời gian giao hàng hoặc tự phê duyệt đổi trả. |

### 4.2. Kết quả nghiệp vụ mong đợi

1. Khách tự tìm nhóm sản phẩm và gửi nhu cầu mua hàng.
2. Bot chỉ hiển thị giá, tồn kho và khuyến mãi từ nguồn dữ liệu đã cấu hình — không tự bịa thông tin.
3. Khách tra cứu đơn khi cung cấp mã đơn và thông tin xác minh hợp lệ.
4. Yêu cầu tư vấn được chuyển tới đúng hàng đợi bán hàng.
5. Bot không tạo đơn chính thức hoặc xác nhận thanh toán nếu chưa tích hợp hệ thống đơn hàng.

### 4.3. Logical key config phải cấu hình trước khi xuất bản

| Logical key | Bắt buộc | Kiểu | Mô tả và validation |
|---|:---:|---|---|
| `SHOP_NAME` | Có | Text | Tên cửa hàng, 1–80 ký tự. |
| `SHOP_CATALOG_URL` | Có | HTTPS URL | Trang danh mục hoặc website bán hàng. Chỉ chấp nhận `https://`. |
| `SHOP_HOTLINE` | Có | Text | Số điện thoại hoặc đầu mối hỗ trợ. |
| `SHOP_WORKING_HOURS` | Có | Text | Giờ làm việc và múi giờ của Page. |
| `SHOP_SALES_QUEUE` | Có | Queue mapping | Hàng đợi nhận yêu cầu tư vấn hoặc đặt hàng. |
| `SHOP_ORDER_LOOKUP_CONNECTION` | Không | API connection | Kết nối tra cứu đơn. Nếu không có, Flow chuyển sang hỗ trợ thủ công. |
| `SHOP_PROMOTION_SOURCE` | Không | URL/API/Flow | Nguồn khuyến mãi hiện hành. Không có thì ẩn mục khuyến mãi hoặc chuyển tư vấn viên. |
| `SHOP_RETURN_POLICY_URL` | Không | HTTPS URL | Chính sách đổi trả của shop. |

> Không cho Publish nếu thiếu bất kỳ trường bắt buộc nào ở trên.

### 4.4. Manifest

| Nhóm | Số lượng | Logical key |
|---|:---:|---|
| Menu mặc định | 1 | `MENU_SHOP_DEFAULT` |
| FAQ | 4 | `FAQ_SHOP_SHIPPING`, `FAQ_SHOP_PAYMENT`, `FAQ_SHOP_RETURN`, `FAQ_SHOP_CONTACT` |
| Welcome Message | 1 | `MSG_SHOP_WELCOME` |
| Default Message | 1 | `MSG_SHOP_FALLBACK` |
| Keyword | 6 | `KW_SHOP_PRODUCT`, `KW_SHOP_PROMOTION`, `KW_SHOP_ORDER`, `KW_SHOP_ORDER_STATUS`, `KW_SHOP_RETURN`, `KW_SHOP_AGENT` |
| Message Flow | 6 | `FLOW_SHOP_PRODUCT`, `FLOW_SHOP_PROMOTION`, `FLOW_SHOP_ORDER`, `FLOW_SHOP_ORDER_STATUS`, `FLOW_SHOP_RETURN`, `FLOW_SHOP_AGENT` |
| Sequence | 1 | `SEQ_SHOP_FOLLOW_UP` |
| Automation Rule | 3 | `RULE_SHOP_CART_INTENT`, `RULE_SHOP_AGENT_REQUEST`, `RULE_SHOP_FOLLOW_UP_STOP` |
| Tag | 3 | `TAG_SHOP_PRODUCT_INTEREST`, `TAG_SHOP_CART_INTENT`, `TAG_SHOP_AGENT_NEEDED` |
| Custom Field | 5 | `FIELD_SHOP_CATEGORY`, `FIELD_SHOP_PRODUCT`, `FIELD_SHOP_QUANTITY`, `FIELD_SHOP_ORDER_ID`, `FIELD_SHOP_CONTACT` |

### 4.5. Welcome Message — `MSG_SHOP_WELCOME`

```
Xin chào {{customer.first_name|Quý khách}} 👋
Chào mừng bạn đến với {{SHOP_NAME}}. Bạn muốn tìm sản phẩm, xem ưu đãi hay cần hỗ trợ đơn hàng?
```

Quick replies:
1. `Xem sản phẩm` → `FLOW_SHOP_PRODUCT`
2. `Khuyến mãi` → `FLOW_SHOP_PROMOTION`
3. `Tra cứu đơn` → `FLOW_SHOP_ORDER_STATUS`
4. `Gặp tư vấn viên` → `FLOW_SHOP_AGENT`

### 4.6. Default Message — `MSG_SHOP_FALLBACK`

```
Mình chưa hiểu chính xác yêu cầu của bạn. Bạn có thể chọn một nội dung bên dưới hoặc để lại thông tin để nhân viên {{SHOP_NAME}} hỗ trợ nhé.
```

Quick replies: `Xem sản phẩm` → `FLOW_SHOP_PRODUCT` | `Tra cứu đơn` → `FLOW_SHOP_ORDER_STATUS` | `Gặp tư vấn viên` → `FLOW_SHOP_AGENT`

Frequency cap mặc định: tối đa 1 lần trong 24 giờ cho cùng khách/Page. Nếu fallback đang tắt hoặc lỗi, chuyển `SHOP_SALES_QUEUE` mà không gửi nội dung rỗng.

### 4.7. Menu mặc định — `MENU_SHOP_DEFAULT`

| Thứ tự | Tiêu đề (tối đa 30 ký tự) | Hành động | Đích |
|:---:|---|---|---|
| 1 | Xem sản phẩm | Start Flow | `FLOW_SHOP_PRODUCT` |
| 2 | Khuyến mãi hôm nay | Start Flow | `FLOW_SHOP_PROMOTION` |
| 3 | Đặt hàng | Start Flow | `FLOW_SHOP_ORDER` |
| 4 | Tra cứu đơn hàng | Start Flow | `FLOW_SHOP_ORDER_STATUS` |
| 5 | Hỗ trợ tư vấn | Transfer Inbox | `SHOP_SALES_QUEUE` qua `FLOW_SHOP_AGENT` |

Khi Page đích đã có Menu mặc định Published, quyết định mặc định là `KEEP`. Người dùng phải chủ động chọn `UPDATE_AS_DRAFT` nếu muốn thay thế.

### 4.8. FAQ

| Logical key | Câu hỏi hiển thị | Phản hồi / Hành động |
|---|---|---|
| `FAQ_SHOP_SHIPPING` | Phí và thời gian giao hàng? | Hiển thị nội dung theo khu vực đã cấu hình; nếu chưa cấu hình thì chuyển `FLOW_SHOP_AGENT`. Không cam kết ngày giao khi chưa có dữ liệu vận chuyển. |
| `FAQ_SHOP_PAYMENT` | Shop hỗ trợ thanh toán nào? | Hiển thị danh sách phương thức Page đã cấu hình; không yêu cầu khách gửi số thẻ hoặc OTP trong chat. |
| `FAQ_SHOP_RETURN` | Chính sách đổi trả? | Mở `SHOP_RETURN_POLICY_URL` nếu có, hoặc chạy `FLOW_SHOP_RETURN`. |
| `FAQ_SHOP_CONTACT` | Liên hệ với shop thế nào? | Hiển thị `SHOP_HOTLINE`, `SHOP_WORKING_HOURS` và nút chuyển `SHOP_SALES_QUEUE`. |

Nếu kênh không hỗ trợ FAQ button, Application Plan đánh dấu `UNSUPPORTED` cho nhóm này; các Flow liên quan vẫn khả dụng từ Menu và Keyword.

### 4.9. Keyword Rules

| Logical key | Include terms gợi ý | Exclude terms | Priority | Đích |
|---|---|---|:---:|---|
| `KW_SHOP_AGENT` | nhân viên, tư vấn viên, gặp người thật, hỗ trợ trực tiếp | tuyển dụng | 1 | `FLOW_SHOP_AGENT` |
| `KW_SHOP_ORDER_STATUS` | tra đơn, đơn của tôi, đơn tới đâu, mã vận đơn | đặt đơn, mua hàng | 2 | `FLOW_SHOP_ORDER_STATUS` |
| `KW_SHOP_RETURN` | đổi trả, hoàn hàng, trả hàng, sản phẩm lỗi | đổi địa chỉ | 3 | `FLOW_SHOP_RETURN` |
| `KW_SHOP_ORDER` | đặt hàng, mua hàng, chốt đơn | hủy đơn, tra đơn | 4 | `FLOW_SHOP_ORDER` |
| `KW_SHOP_PROMOTION` | khuyến mãi, giảm giá, voucher, ưu đãi | tuyển dụng | 5 | `FLOW_SHOP_PROMOTION` |
| `KW_SHOP_PRODUCT` | sản phẩm, mẫu mới, còn hàng, giá bao nhiêu | tra đơn | 6 | `FLOW_SHOP_PRODUCT` |

Matcher chuẩn hóa Unicode, hoa/thường và khoảng trắng. Priority nhỏ hơn được ưu tiên khi nhiều rule cùng khớp.

### 4.10. Message Flows

#### `FLOW_SHOP_PRODUCT` — Tìm sản phẩm

| Bước | Xử lý | Kết quả / Ghi chú |
|:---:|---|---|
| 1 | Hỏi nhóm sản phẩm khách quan tâm. | Ghi `FIELD_SHOP_CATEGORY`. |
| 2 | Nếu có catalog integration: truy vấn danh mục; nếu không: mở `SHOP_CATALOG_URL`. | Không tự tạo tên/giá/tồn kho. |
| 3 | Khách chọn sản phẩm hoặc nhập nhu cầu. | Ghi `FIELD_SHOP_PRODUCT`; thêm `TAG_SHOP_PRODUCT_INTEREST`. |
| 4 | Hỏi tiếp: `Đặt hàng`, `Xem thêm` hoặc `Gặp tư vấn viên`. | Điều hướng sang Flow tương ứng. |

#### `FLOW_SHOP_PROMOTION` — Xem khuyến mãi

| Bước | Xử lý | Kết quả / Ghi chú |
|:---:|---|---|
| 1 | Đọc `SHOP_PROMOTION_SOURCE`. | Chỉ hiển thị chương trình còn hiệu lực. |
| 2 | Nếu nguồn chưa cấu hình hoặc lỗi. | Thông báo chưa thể kiểm tra và chuyển `FLOW_SHOP_AGENT`; tuyệt đối không bịa ưu đãi. |
| 3 | Khách chọn ưu đãi. | Điều hướng sang `FLOW_SHOP_PRODUCT` hoặc `FLOW_SHOP_ORDER`. |

#### `FLOW_SHOP_ORDER` — Tạo yêu cầu đặt hàng

| Bước | Xử lý | Validation |
|:---:|---|---|
| 1 | Thu thập sản phẩm và biến thể. | `FIELD_SHOP_PRODUCT` bắt buộc. |
| 2 | Thu thập số lượng. | Số nguyên từ 1 đến giới hạn Page cấu hình. |
| 3 | Thu thập tên và thông tin liên hệ. | `FIELD_SHOP_CONTACT` bắt buộc; masking dữ liệu nhạy cảm trong log. |
| 4 | Hiển thị tóm tắt để khách xác nhận. | Không hiển thị giá cuối nếu chưa lấy được từ hệ thống bán hàng. |
| 5 | Tạo lead/ticket; thêm `TAG_SHOP_CART_INTENT`. | Chuyển `SHOP_SALES_QUEUE`. Chỉ tạo đơn chính thức khi có API và khách xác nhận. |

#### `FLOW_SHOP_ORDER_STATUS` — Tra cứu đơn

| Bước | Xử lý | Nhánh lỗi / An toàn |
|:---:|---|---|
| 1 | Yêu cầu mã đơn. | Ghi `FIELD_SHOP_ORDER_ID`; không log toàn bộ dữ liệu nhạy cảm. |
| 2 | Bước xác minh theo chính sách shop. | Không trả dữ liệu đơn nếu xác minh thất bại. |
| 3 | Nếu có `SHOP_ORDER_LOOKUP_CONNECTION` → gọi API tra cứu. | Timeout/lỗi → không đoán trạng thái, chuyển nhân viên. |
| 4 | Nếu chưa tích hợp API. | Tạo yêu cầu cho `SHOP_SALES_QUEUE` kèm mã đơn đã che bớt. |

#### `FLOW_SHOP_RETURN` — Đổi trả

1. Hiển thị chính sách từ `SHOP_RETURN_POLICY_URL` nếu đã cấu hình.
2. Thu thập mã đơn và lý do đổi trả.
3. Không tự phê duyệt hoàn tiền hoặc đổi trả.
4. Tạo ticket và chuyển `SHOP_SALES_QUEUE` để xác minh thủ công.

#### `FLOW_SHOP_AGENT` — Gặp tư vấn viên

1. Hỏi ngắn gọn nhu cầu và thông tin liên hệ nếu chưa có.
2. Thêm `TAG_SHOP_AGENT_NEEDED`.
3. Chuyển `SHOP_SALES_QUEUE` trong giờ làm việc.
4. Ngoài giờ: thông báo `SHOP_WORKING_HOURS`, ghi nhận yêu cầu; không hứa thời gian phản hồi cụ thể nếu chưa cấu hình SLA.

### 4.11. Sequence — `SEQ_SHOP_FOLLOW_UP`

Chỉ ghi danh khi khách đã đồng ý nhận tiếp thông tin **và** connector cho phép gửi tại thời điểm đó.

| Bước | Delay | Điều kiện trước khi gửi | Nội dung / Hành động |
|:---:|---|---|---|
| 1 | 30 phút | Có `TAG_SHOP_CART_INTENT`; chưa tạo đơn; chưa chuyển agent thành công. | Hỏi khách có cần hỗ trợ chọn sản phẩm hoặc hoàn tất yêu cầu không. |
| 2 | 20 giờ | Vẫn chưa tạo đơn; capability kênh cho phép. | Gửi lời nhắc cuối và nút `Gặp tư vấn viên`. |
| 3 | Sau bước 2 | Luôn chạy. | Kết thúc enrollment; không tự lặp lại. |

**Điều kiện hủy Sequence ngay lập tức:** đơn được tạo, khách từ chối nhận tin, khách yêu cầu dừng, agent tiếp nhận hoặc Page mất quyền gửi.

### 4.12. Automation Rules

| Logical key | Trigger | Điều kiện | Actions theo thứ tự |
|---|---|---|---|
| `RULE_SHOP_CART_INTENT` | Hoàn tất bước xác nhận trong `FLOW_SHOP_ORDER` | Có sản phẩm, số lượng và liên hệ; chưa có đơn chính thức | Thêm `TAG_SHOP_CART_INTENT` → tạo lead/ticket → nếu có consent thì ghi danh `SEQ_SHOP_FOLLOW_UP` → chuyển `SHOP_SALES_QUEUE`. |
| `RULE_SHOP_AGENT_REQUEST` | Thêm `TAG_SHOP_AGENT_NEEDED` | Chưa có agent phụ trách | Chuyển `SHOP_SALES_QUEUE` → ghi log routing. |
| `RULE_SHOP_FOLLOW_UP_STOP` | Order Created hoặc Opt-out event | Có enrollment đang hoạt động | Hủy `SEQ_SHOP_FOLLOW_UP` → gỡ `TAG_SHOP_CART_INTENT`. |

Rules có idempotency key theo event/customer/Page, chống tự kích hoạt lại và mặc định `INACTIVE` sau khi áp dụng.

### 4.13. Dependency graph

```
MENU_SHOP_DEFAULT
├── FLOW_SHOP_PRODUCT ── TAG_SHOP_PRODUCT_INTEREST
│                     ── FIELD_SHOP_CATEGORY / FIELD_SHOP_PRODUCT
├── FLOW_SHOP_PROMOTION ── SHOP_PROMOTION_SOURCE (optional; thiếu → chuyển agent)
├── FLOW_SHOP_ORDER ── FIELD_SHOP_PRODUCT / QUANTITY / CONTACT
│                   └── TAG_SHOP_CART_INTENT ── RULE_SHOP_CART_INTENT ── SEQ_SHOP_FOLLOW_UP
├── FLOW_SHOP_ORDER_STATUS ── FIELD_SHOP_ORDER_ID
│                          └── SHOP_ORDER_LOOKUP_CONNECTION (optional → manual fallback)
└── FLOW_SHOP_AGENT ── TAG_SHOP_AGENT_NEEDED
                    └── SHOP_SALES_QUEUE  ← CHẶN PUBLISH nếu thiếu
```

---

## 5. Mẫu hệ thống — Bất động sản

### 5.1. Thông tin Mẫu

| Thuộc tính | Giá trị |
|---|---|
| Mã Mẫu | `TPL-SYS-REAL-ESTATE` |
| Tên hiển thị | Bất động sản 🏢 |
| Mục tiêu | Thu thập nhu cầu, gợi ý dự án phù hợp, cung cấp thông tin giá/chính sách đã được duyệt, đặt lịch tham quan và chuyển chuyên viên. |
| Đối tượng phù hợp | Chủ đầu tư, sàn môi giới, đội bán hàng dự án, đơn vị cho thuê hoặc môi giới nhà ở. |
| Kênh ưu tiên | Facebook Messenger, Instagram, Zalo OA (theo capability connector). |
| Không bao gồm | Tư vấn pháp lý, cam kết lợi nhuận, tự phê duyệt khoản vay, giữ chỗ hoặc nhận tiền cọc trong chat. |

### 5.2. Kết quả nghiệp vụ mong đợi

1. Thu thập đủ: loại bất động sản, khu vực, ngân sách, mục đích và thời gian dự kiến.
2. Chỉ gợi ý dự án đang được Page cho phép tư vấn và có dữ liệu còn hiệu lực.
3. Nhận diện lead có nhu cầu rõ ràng để chuyển chuyên viên phù hợp.
4. Đặt lịch tham quan có xác nhận, chống đặt trùng và hỗ trợ hủy/đổi lịch.
5. Không đưa ra cam kết pháp lý, lợi nhuận hoặc phê duyệt tài chính thay cho đơn vị có thẩm quyền.

### 5.3. Logical key config phải cấu hình trước khi xuất bản

| Logical key | Bắt buộc | Kiểu | Mô tả và validation |
|---|:---:|---|---|
| `RE_COMPANY_NAME` | Có | Text | Tên đơn vị tư vấn, 1–100 ký tự. |
| `RE_PROJECT_SOURCE` | Có | API/Data source | Danh sách dự án đang mở bán/cho thuê và trạng thái hiệu lực. |
| `RE_PRICE_POLICY_SOURCE` | Có | API/Document/URL | Nguồn bảng giá và chính sách có ngày hiệu lực. |
| `RE_SALES_QUEUE` | Có | Queue mapping | Nhóm chuyên viên nhận lead. |
| `RE_WORKING_HOURS` | Có | Text | Giờ làm việc và múi giờ Page. |
| `RE_PRIVACY_NOTICE_URL` | Có | HTTPS URL | Chính sách xử lý thông tin cá nhân của đơn vị. |
| `RE_HOTLINE` | Có | Text | Đầu mối liên hệ chính. |
| `RE_BOOKING_CONNECTION` | Không | Calendar/API | Kết nối lịch tham quan. Nếu không có, tạo yêu cầu chờ chuyên viên xác nhận thủ công. |

> Không cho Publish nếu thiếu bất kỳ trường bắt buộc nào ở trên.

### 5.4. Manifest

| Nhóm | Số lượng | Logical key |
|---|:---:|---|
| Menu mặc định | 1 | `MENU_RE_DEFAULT` |
| FAQ | 4 | `FAQ_RE_PRICE`, `FAQ_RE_LEGAL`, `FAQ_RE_LOAN`, `FAQ_RE_VIEWING` |
| Welcome Message | 1 | `MSG_RE_WELCOME` |
| Default Message | 1 | `MSG_RE_FALLBACK` |
| Keyword | 6 | `KW_RE_PROJECT`, `KW_RE_PRICE`, `KW_RE_VIEWING`, `KW_RE_LOAN`, `KW_RE_LEGAL`, `KW_RE_AGENT` |
| Message Flow | 6 | `FLOW_RE_DISCOVERY`, `FLOW_RE_PROJECT`, `FLOW_RE_PRICE`, `FLOW_RE_BOOK_VIEWING`, `FLOW_RE_FINANCE`, `FLOW_RE_AGENT` |
| Sequence | 2 | `SEQ_RE_LEAD_NURTURE`, `SEQ_RE_VIEWING_REMINDER` |
| Automation Rule | 4 | `RULE_RE_QUALIFY`, `RULE_RE_HOT_LEAD`, `RULE_RE_BOOKING`, `RULE_RE_STOP_NURTURE` |
| Tag | 4 | `TAG_RE_NEW_LEAD`, `TAG_RE_QUALIFIED`, `TAG_RE_HOT_LEAD`, `TAG_RE_VIEWING_BOOKED` |
| Custom Field | 9 | `FIELD_RE_PROPERTY_TYPE`, `FIELD_RE_LOCATION`, `FIELD_RE_BUDGET`, `FIELD_RE_PURPOSE`, `FIELD_RE_BEDROOMS`, `FIELD_RE_TIMELINE`, `FIELD_RE_PROJECT`, `FIELD_RE_CONTACT`, `FIELD_RE_VIEWING_TIME` |

### 5.5. Welcome Message — `MSG_RE_WELCOME`

```
Xin chào {{customer.first_name|Anh/Chị}} 👋
{{RE_COMPANY_NAME}} có thể hỗ trợ Anh/Chị tìm dự án, tham khảo giá và chính sách hoặc đặt lịch tham quan. Anh/Chị đang quan tâm nội dung nào?
```

Quick replies:
1. `Tìm bất động sản` → `FLOW_RE_DISCOVERY`
2. `Dự án nổi bật` → `FLOW_RE_PROJECT`
3. `Giá & chính sách` → `FLOW_RE_PRICE`
4. `Đặt lịch tham quan` → `FLOW_RE_BOOK_VIEWING`

### 5.6. Default Message — `MSG_RE_FALLBACK`

```
Mình chưa xác định được nhu cầu của Anh/Chị. Anh/Chị có thể chọn nội dung bên dưới hoặc kết nối với chuyên viên tư vấn.
```

Quick replies: `Tìm bất động sản` → `FLOW_RE_DISCOVERY` | `Đặt lịch tham quan` → `FLOW_RE_BOOK_VIEWING` | `Gặp chuyên viên` → `FLOW_RE_AGENT`

Frequency cap mặc định: 1 lần trong 24 giờ cho cùng khách/Page.

### 5.7. Menu mặc định — `MENU_RE_DEFAULT`

| Thứ tự | Tiêu đề (tối đa 30 ký tự) | Hành động | Đích |
|:---:|---|---|---|
| 1 | Tìm bất động sản | Start Flow | `FLOW_RE_DISCOVERY` |
| 2 | Dự án nổi bật | Start Flow | `FLOW_RE_PROJECT` |
| 3 | Giá & chính sách | Start Flow | `FLOW_RE_PRICE` |
| 4 | Đặt lịch tham quan | Start Flow | `FLOW_RE_BOOK_VIEWING` |
| 5 | Tư vấn chuyên viên | Transfer Inbox | `RE_SALES_QUEUE` qua `FLOW_RE_AGENT` |

### 5.8. FAQ

| Logical key | Câu hỏi hiển thị | Phản hồi / Hành động |
|---|---|---|
| `FAQ_RE_PRICE` | Giá bán hiện tại thế nào? | Chạy `FLOW_RE_PRICE`; bắt buộc hiển thị ngày hiệu lực và nguồn chính sách. |
| `FAQ_RE_LEGAL` | Pháp lý dự án ra sao? | Chỉ hiển thị thông tin đã duyệt từ `RE_PROJECT_SOURCE`; kèm lưu ý liên hệ chuyên viên pháp lý để xác minh. |
| `FAQ_RE_LOAN` | Có hỗ trợ vay không? | Chạy `FLOW_RE_FINANCE`; chỉ thông tin tham khảo, không cam kết phê duyệt hoặc lãi suất. |
| `FAQ_RE_VIEWING` | Làm sao đặt lịch xem? | Chạy `FLOW_RE_BOOK_VIEWING`. |

### 5.9. Keyword Rules

| Logical key | Include terms gợi ý | Exclude terms | Priority | Đích |
|---|---|---|:---:|---|
| `KW_RE_AGENT` | chuyên viên, tư vấn viên, gọi cho tôi, liên hệ tôi | tuyển dụng | 1 | `FLOW_RE_AGENT` |
| `KW_RE_VIEWING` | xem nhà, xem dự án, tham quan, đặt lịch | xem hình, video | 2 | `FLOW_RE_BOOK_VIEWING` |
| `KW_RE_LEGAL` | pháp lý, sổ hồng, giấy phép, sở hữu | — | 3 | `FAQ_RE_LEGAL` / `FLOW_RE_AGENT` |
| `KW_RE_LOAN` | vay ngân hàng, trả góp, lãi suất, khoản vay | — | 4 | `FLOW_RE_FINANCE` |
| `KW_RE_PRICE` | giá bán, bảng giá, chiết khấu, chính sách | tuyển dụng | 5 | `FLOW_RE_PRICE` |
| `KW_RE_PROJECT` | dự án, căn hộ, đất nền, nhà phố, biệt thự | — | 6 | `FLOW_RE_DISCOVERY` |

### 5.10. Message Flows

#### `FLOW_RE_DISCOVERY` — Khám phá nhu cầu

| Bước | Câu hỏi / Xử lý | Dữ liệu ghi |
|:---:|---|---|
| 1 | Loại bất động sản quan tâm (căn hộ, nhà phố, đất nền, biệt thự, thuê)? | `FIELD_RE_PROPERTY_TYPE` |
| 2 | Khu vực hoặc dự án mong muốn? | `FIELD_RE_LOCATION` |
| 3 | Khoảng ngân sách dự kiến? | `FIELD_RE_BUDGET`; lưu theo khoảng, không ép cung cấp thu nhập. |
| 4 | Mục đích: để ở, đầu tư hay cho thuê? | `FIELD_RE_PURPOSE` |
| 5 | Số phòng ngủ / diện tích mong muốn (nếu áp dụng)? | `FIELD_RE_BEDROOMS` |
| 6 | Thời gian dự kiến giao dịch? | `FIELD_RE_TIMELINE` |
| 7 | Truy vấn `RE_PROJECT_SOURCE` theo tiêu chí đã thu thập. | Chỉ trả dự án còn hiệu lực; không có kết quả → chuyển `FLOW_RE_AGENT`. |
| 8 | Khách chọn dự án. | `FIELD_RE_PROJECT`; điều hướng sang `FLOW_RE_PROJECT` hoặc đặt lịch. |

#### `FLOW_RE_PROJECT` — Thông tin dự án

1. Đọc dự án từ `FIELD_RE_PROJECT` hoặc yêu cầu khách chọn.
2. Hiển thị thông tin đã duyệt: vị trí, loại hình, diện tích, tiến độ, tiện ích và pháp lý.
3. Không tự suy diễn lợi nhuận, thời gian cấp sổ hoặc cam kết bàn giao.
4. Cho chọn: `Giá & chính sách`, `Đặt lịch tham quan` hoặc `Gặp chuyên viên`.

#### `FLOW_RE_PRICE` — Giá và chính sách

| Bước | Xử lý | Quy tắc |
|:---:|---|---|
| 1 | Xác định dự án/sản phẩm khách quan tâm. | `FIELD_RE_PROJECT` bắt buộc. |
| 2 | Đọc `RE_PRICE_POLICY_SOURCE`. | Hiển thị ngày hiệu lực; ghi rõ giá có thể thay đổi theo căn/thời điểm. |
| 3 | Nếu nguồn lỗi hoặc hết hiệu lực. | Không hiển thị giá cache quá hạn; chuyển `FLOW_RE_AGENT`. |
| 4 | Khách muốn bảng giá chi tiết. | Xin consent và thông tin liên hệ; chuyển chuyên viên. |

#### `FLOW_RE_BOOK_VIEWING` — Đặt lịch tham quan

| Bước | Xử lý | Validation |
|:---:|---|---|
| 1 | Chọn dự án / địa điểm. | Phải tồn tại trong `RE_PROJECT_SOURCE`. |
| 2 | Chọn ngày giờ theo timezone Page. | Không nhận thời điểm quá khứ; áp dụng lead time do Page cấu hình. |
| 3 | Hiển thị `RE_PRIVACY_NOTICE_URL` → thu thập thông tin liên hệ sau khi khách đồng ý. | Ghi `FIELD_RE_CONTACT`. |
| 4 | Nếu có `RE_BOOKING_CONNECTION` → kiểm tra slot và tạo lịch tạm. | Dùng idempotency key; không tạo lịch trùng. |
| 5 | Nếu không có calendar integration. | Tạo yêu cầu chờ xác nhận; tuyệt đối không thông báo "đặt lịch thành công". |
| 6 | Gửi tóm tắt và hướng dẫn hủy/đổi lịch. | Ghi `FIELD_RE_VIEWING_TIME`; thêm `TAG_RE_VIEWING_BOOKED` chỉ khi đã xác nhận. |

#### `FLOW_RE_FINANCE` — Thông tin tài chính tham khảo

1. Hỏi dự án và khoảng ngân sách; không yêu cầu số tài khoản, OTP hoặc hồ sơ tín dụng trong chat.
2. Hiển thị chính sách hỗ trợ tài chính đã duyệt và ngày hiệu lực.
3. Mọi ước tính chỉ mang tính tham khảo; ngân hàng/đơn vị tài chính quyết định điều kiện thực tế.
4. Nếu khách muốn tư vấn hồ sơ → xin consent → chuyển `RE_SALES_QUEUE`.

#### `FLOW_RE_AGENT` — Gặp chuyên viên

1. Tóm tắt nhu cầu đã có từ các Custom Field.
2. Nếu thiếu thông tin liên hệ → hiển thị `RE_PRIVACY_NOTICE_URL` và xin consent trước khi thu thập.
3. Chuyển `RE_SALES_QUEUE`, kèm dự án, ngân sách, mục đích và timeline.
4. Ngoài giờ làm việc → thông báo `RE_WORKING_HOURS`; không hứa thời gian gọi lại nếu chưa cấu hình SLA.

### 5.11. Lead Qualification (nội bộ)

Điểm chỉ dùng để ưu tiên xử lý. Không hiển thị điểm cho khách và không dùng điểm để từ chối phục vụ.

| Tín hiệu | Điểm |
|---|:---:|
| Có loại bất động sản | +1 |
| Có khu vực / dự án | +1 |
| Có khoảng ngân sách | +1 |
| Có timeline ≤ 3 tháng | +2 |
| Yêu cầu gặp chuyên viên | +2 |
| Đặt lịch tham quan đã xác nhận | +3 |

- Tổng ≥ 3: thêm `TAG_RE_QUALIFIED`.
- Tổng ≥ 6 hoặc có lịch xác nhận: thêm `TAG_RE_HOT_LEAD`.
- Thiếu ngân sách không bị coi là spam và không chặn chuyển chuyên viên.

### 5.12. Sequences

#### `SEQ_RE_LEAD_NURTURE` — Chăm sóc lead

Chỉ ghi danh khi khách đã đồng ý nhận thông tin dự án.

| Bước | Delay | Điều kiện | Nội dung / Hành động |
|:---:|---|---|---|
| 1 | 1 ngày | Lead qualified; chưa có lịch; kênh cho phép gửi. | Gửi thông tin dự án đã chọn từ nguồn còn hiệu lực. |
| 2 | 3 ngày | Chưa được agent tiếp nhận; chưa opt-out. | Hỏi nhu cầu nhận bảng giá hoặc đặt lịch. |
| 3 | 7 ngày | Chính sách gửi ngoài 24h và consent còn hiệu lực. | Gửi lời nhắc cuối; sau đó hoàn tất Sequence. |

#### `SEQ_RE_VIEWING_REMINDER` — Nhắc lịch tham quan

| Bước | Thời điểm | Điều kiện | Nội dung / Hành động |
|:---:|---|---|---|
| 1 | Trước lịch 24 giờ | Lịch đã xác nhận và chưa hủy. | Gửi thời gian, địa điểm và nút Xác nhận / Hủy. |
| 2 | Trước lịch 2 giờ | Khách đã xác nhận; kênh cho phép. | Nhắc ngắn và đầu mối liên hệ. |
| 3 | Khi lịch bị hủy/đổi | Có event tương ứng. | Hủy job cũ; chỉ tạo reminder mới sau khi lịch mới được xác nhận. |

### 5.13. Automation Rules

| Logical key | Trigger | Điều kiện | Actions theo thứ tự |
|---|---|---|---|
| `RULE_RE_QUALIFY` | Custom field nhu cầu thay đổi | Điểm qualification ≥ 3 | Thêm `TAG_RE_QUALIFIED` → nếu có consent thì ghi danh `SEQ_RE_LEAD_NURTURE`. |
| `RULE_RE_HOT_LEAD` | Điểm hoặc lịch thay đổi | Điểm ≥ 6 hoặc có lịch xác nhận | Thêm `TAG_RE_HOT_LEAD` → thông báo/chuyển `RE_SALES_QUEUE` → dừng nurture nếu agent tiếp nhận. |
| `RULE_RE_BOOKING` | Lịch tham quan được xác nhận | Có project, contact và viewing time | Thêm `TAG_RE_VIEWING_BOOKED` → ghi danh `SEQ_RE_VIEWING_REMINDER` → thông báo chuyên viên. |
| `RULE_RE_STOP_NURTURE` | Opt-out, agent accepted hoặc giao dịch đóng | Có enrollment đang hoạt động | Hủy `SEQ_RE_LEAD_NURTURE` và các job chưa đến hạn phù hợp. |

### 5.14. Quy tắc an toàn nội dung

- Không dùng các câu khẳng định: "chắc chắn sinh lời", "cam kết lợi nhuận", "pháp lý tuyệt đối", "được duyệt vay".
- Giá và chính sách phải có nguồn và ngày hiệu lực; dữ liệu quá hạn phải bị chặn hoặc gắn cảnh báo rõ.
- Chỉ thu thập thông tin liên hệ sau khi hiển thị privacy notice và có sự đồng ý phù hợp.
- Không yêu cầu khách gửi OTP, mật khẩu, số thẻ, ảnh giấy tờ hoặc hồ sơ tín dụng trong luồng mặc định.
- Yêu cầu tư vấn pháp lý hoặc tài chính chuyên sâu phải chuyển người có thẩm quyền.

### 5.15. Dependency graph

```
MENU_RE_DEFAULT
├── FLOW_RE_DISCOVERY ── RE_PROJECT_SOURCE  ← CHẶN PUBLISH nếu thiếu
│   ├── FIELD_RE_PROPERTY_TYPE / LOCATION / BUDGET / PURPOSE / TIMELINE
│   └── RULE_RE_QUALIFY ── SEQ_RE_LEAD_NURTURE
├── FLOW_RE_PROJECT ── FIELD_RE_PROJECT ── RE_PROJECT_SOURCE
├── FLOW_RE_PRICE ── RE_PRICE_POLICY_SOURCE  ← CHẶN PUBLISH nếu thiếu
├── FLOW_RE_BOOK_VIEWING
│   ├── RE_PRIVACY_NOTICE_URL  ← CHẶN PUBLISH nếu thiếu
│   ├── RE_BOOKING_CONNECTION (optional → nhánh chờ xác nhận thủ công)
│   └── RULE_RE_BOOKING ── SEQ_RE_VIEWING_REMINDER
└── FLOW_RE_AGENT ── RE_SALES_QUEUE  ← CHẶN PUBLISH nếu thiếu
```

---

## 6. Tương thích kênh

| Thành phần | Facebook / Instagram | Zalo OA | Hành vi khi không hỗ trợ |
|---|---|---|---|
| Persistent Menu | Theo capability connector | Theo capability connector | `UNSUPPORTED`; không tạo menu giả. |
| FAQ / Quick Replies | Theo giới hạn connector | Có thể khác hoặc không hỗ trợ | Bỏ UI component; giữ Flow/Keyword nếu độc lập. |
| Welcome Message | Theo sự kiện/kênh | Theo capability connector | Giữ Inactive và hiển thị cảnh báo. |
| Sequence ngoài 24h | Chỉ khi policy và consent cho phép | Theo policy Zalo OA | Không lên lịch bước không hợp lệ. |
| URL button | Chỉ HTTPS | Chỉ HTTPS | Chặn Publish URL không an toàn. |
| API / Calendar lookup | Qua connection đã cấu hình | Qua connection đã cấu hình | Chuyển nhánh xử lý thủ công. |

---

## 7. Business Rules

| Mã | Quy tắc |
|---|---|
| `BR-TPL-001` | Mẫu hệ thống ở trạng thái `READY`, chỉ đọc. Người dùng không được sửa bản gốc; phải Sao chép nếu muốn tùy biến. |
| `BR-TPL-002` | Mẫu là snapshot có phiên bản, không phải tài nguyên dùng chung đang chạy. |
| `BR-TPL-003` | Áp dụng Mẫu phải tạo ID mới tại Page đích và remap toàn bộ tham chiếu nội bộ. |
| `BR-TPL-004` | Không sao chép credential, dữ liệu khách hàng, dữ liệu giao dịch hoặc lịch sử chạy. |
| `BR-TPL-005` | Thành phần sau khi áp dụng phải ở `DRAFT` (Menu/FAQ/Flow) hoặc `INACTIVE` (tất cả còn lại). |
| `BR-TPL-006` | Không ghi đè cấu hình đang Published/Active nếu người dùng chưa xác nhận rõ ràng. |
| `BR-TPL-007` | Thành phần không được kênh hỗ trợ phải đánh dấu `UNSUPPORTED` và cảnh báo người dùng. |
| `BR-TPL-008` | Thay đổi Mẫu sau khi áp dụng không tự đồng bộ sang các Page đã dùng Mẫu đó. |
| `BR-TPL-009` | Mọi tham chiếu nội bộ phải trỏ về tài nguyên được tạo hoặc ánh xạ hợp lệ tại Page đích. |
| `BR-TPL-010` | Dữ liệu minh họa trong Mẫu không được dùng như dữ liệu kinh doanh thật. |
| `BR-TPL-011` | Chỉ ghi danh Sequence khi có consent của khách và kênh cho phép gửi tại thời điểm đó. |
| `BR-TPL-012` | Rules phải có idempotency key theo event/customer/Page để chống kích hoạt lặp. |
| `BR-TPL-013` | Bấm "Sử dụng mẫu" không làm phát sinh tin nhắn tới khách hàng trước khi Publish/Activate. |
| `BR-TPL-014` | Hệ thống chặn Publish/Activate khi còn logical key bắt buộc chưa điền hoặc dependency chưa hợp lệ. |
| `BR-TPL-015` | Retry áp dụng cùng idempotency key không tạo thêm bản sao mới; trả về kết quả lần áp dụng trước. |
| `BR-TPL-016` | Lỗi giữa chừng phải rollback toàn bộ thay đổi của target scope đó; Page khác đã thành công không bị rollback. |

---

## 8. Acceptance Criteria

### 8.1. Xem Mẫu

| Mã | Tiêu chí |
|---|---|
| `AC-TPL-001` | Khi mở tab Mẫu, người dùng thấy danh sách Mẫu hệ thống và Mẫu của tổ chức với symbol, tên, mô tả và trạng thái. |
| `AC-TPL-002` | Danh sách Mẫu hệ thống hiển thị đúng: Shop Online, Bất động sản, Cửa hàng mỹ phẩm. |
| `AC-TPL-003` | Chi tiết Mẫu hiển thị đầy đủ manifest, nội dung xem trước, danh sách logical key config và dependency. |
| `AC-TPL-004` | Xem Mẫu không tạo hoặc thay đổi bất kỳ cấu hình nào trên Page. |

### 8.2. Áp dụng Mẫu

| Mã | Tiêu chí |
|---|---|
| `AC-TPL-005` | Khi áp dụng, toàn bộ thành phần được tạo tại Page đích với ID mới, ở trạng thái Draft/Inactive và không gửi tin cho khách trước khi Publish/Activate. |
| `AC-TPL-006` | Tham chiếu nội bộ giữa Menu, Flow, Keyword, Sequence và Rule được ánh xạ sang ID tại Page đích; không còn trỏ về ID Page nguồn. |
| `AC-TPL-007` | Credential và dữ liệu runtime không xuất hiện trong bản sao tại Page đích. |
| `AC-TPL-008` | Cấu hình đang Published/Active không bị ghi đè khi người dùng chưa chọn `UPDATE_AS_DRAFT` và xác nhận. |
| `AC-TPL-009` | Retry cùng idempotency key không tạo thêm bản sao mới và trả về kết quả lần áp dụng trước. |
| `AC-TPL-010` | Lỗi giữa chừng rollback toàn bộ thay đổi của target scope; các Page khác đã thành công không bị ảnh hưởng. |

### 8.3. Kiểm tra và phát hành

| Mã | Tiêu chí |
|---|---|
| `AC-TPL-011` | Hệ thống chặn Publish/Activate khi còn logical key bắt buộc chưa điền hoặc dependency chưa hợp lệ. |
| `AC-TPL-012` | Khi Page đích không hỗ trợ FAQ button, Application Plan báo `UNSUPPORTED` cho nhóm FAQ nhưng vẫn giữ Flow hợp lệ từ Menu/Keyword. |
| `AC-TPL-013` | Thay đổi Mẫu hệ thống sau khi một Page đã áp dụng không tự cập nhật cấu hình đã có tại Page đó. |

### 8.4. Shop Online — Acceptance Criteria bổ sung

| Mã | Tiêu chí |
|---|---|
| `AC-SHOP-01` | Khi khách chọn Xem sản phẩm, bot không tự tạo tên/giá/tồn kho nếu chưa có catalog integration. |
| `AC-SHOP-02` | Khi tra cứu đơn thất bại hoặc chưa tích hợp API, bot chuyển xử lý thủ công và không tiết lộ dữ liệu đơn. |
| `AC-SHOP-03` | Khi khách tạo đơn hoặc opt-out, Sequence follow-up đang hoạt động bị hủy và không gửi bước tiếp theo. |
| `AC-SHOP-04` | Khi khách yêu cầu nhân viên, yêu cầu được chuyển đúng `SHOP_SALES_QUEUE` và không tiếp tục fallback lặp lại. |

### 8.5. Bất động sản — Acceptance Criteria bổ sung

| Mã | Tiêu chí |
|---|---|
| `AC-RE-01` | Bot chỉ gợi ý dự án tồn tại và còn hiệu lực trong `RE_PROJECT_SOURCE`; không tự tạo tên dự án hoặc giá. |
| `AC-RE-02` | Bảng giá/chính sách luôn kèm ngày hiệu lực; nguồn hết hạn hoặc lỗi phải chuyển chuyên viên, không dùng dữ liệu không xác minh. |
| `AC-RE-03` | Nếu chưa tích hợp lịch, hệ thống chỉ ghi "yêu cầu chờ xác nhận", không báo đặt lịch thành công. |
| `AC-RE-04` | Cùng một yêu cầu đặt lịch được retry không tạo nhiều lịch hoặc nhiều enrollment reminder. |
| `AC-RE-05` | Khi khách opt-out, agent tiếp nhận hoặc lịch bị hủy, các bước Sequence chưa đến hạn được hủy đúng phạm vi. |
| `AC-RE-06` | Thiếu ngân sách không chặn khách gặp chuyên viên và không tự gắn nhãn spam. |

---

## 9. Checklist trước khi phát hành Mẫu hệ thống (dành cho team vận hành)

- [ ] Tất cả logical key là duy nhất trong từng Mẫu.
- [ ] Không có ID Page nguồn, credential hoặc dữ liệu khách trong snapshot.
- [ ] Mọi Menu/FAQ/Keyword/Rule trỏ tới dependency có trong manifest hoặc có mapping bắt buộc.
- [ ] Tất cả tiêu đề Menu không quá 30 ký tự.
- [ ] URL bắt buộc dùng HTTPS.
- [ ] Nội dung không chứa giá, tồn kho, dự án hoặc chính sách minh họa có thể bị hiểu là dữ liệu thật.
- [ ] Application Plan mặc định `KEEP` đối với cấu hình Published hiện hữu.
- [ ] Thành phần mới sau Apply ở Draft/Inactive.
- [ ] Có nhánh fallback an toàn khi API, calendar hoặc data source không khả dụng.
- [ ] Sequence có consent check, frequency cap, điều kiện dừng và kiểm tra capability kênh.
- [ ] Rules có idempotency key, loop guard và thứ tự action rõ ràng.
- [ ] Đã kiểm thử: dependency, channel compatibility, rollback và duplicate request.
