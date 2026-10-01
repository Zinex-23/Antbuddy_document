# AntBot — Đặc tả Mẫu hệ thống theo lĩnh vực

**Phạm vi:** Mẫu Shop Online và Mẫu Bất động sản  
**Loại mẫu:** Built-in/System Template  
**Phiên bản:** 1.0  
**Ngày:** 30/09/2026  
**Tài liệu liên quan:** `AntBot_Template_FR_001_009.md`

## 1. Nguyên tắc chung

Hai mẫu trong tài liệu này là gói cấu hình khởi tạo nhanh. Mẫu cung cấp cấu trúc hội thoại và logic nghiệp vụ tham khảo, không chứa dữ liệu thật của doanh nghiệp và không tự kích hoạt sau khi áp dụng.

### 1.1. Trạng thái và cách áp dụng

- Mẫu hệ thống ở trạng thái `READY`, chỉ đọc và không thể sửa trực tiếp.
- Người dùng có thể áp dụng mẫu hoặc sao chép thành Mẫu của tôi để tùy biến.
- Sau khi áp dụng:
  - Menu, FAQ và nội dung tin nhắn ở trạng thái `DRAFT`.
  - Welcome Message, Default Message, Keyword, Sequence và Rule ở trạng thái `INACTIVE`.
  - Cấu hình Published/Active hiện tại của Page tiếp tục phục vụ khách cho đến khi người dùng chủ động xuất bản hoặc kích hoạt cấu hình mới.
- Giá, tồn kho, dự án, chính sách và lịch trống phải lấy từ dữ liệu được ánh xạ tại Page đích. Không dùng dữ liệu minh họa để trả lời khách thật.

### 1.2. Quy ước định danh

Các mã như `FLOW_SHOP_ORDER` hoặc `FIELD_RE_BUDGET` là logical key trong Mẫu. Khi áp dụng, hệ thống phải tạo hoặc tái sử dụng tài nguyên tương thích tại Page đích và ánh xạ sang ID đích.

| Loại | Quy ước | Ví dụ |
|---|---|---|
| Menu | `MENU_<DOMAIN>_<PURPOSE>` | `MENU_SHOP_DEFAULT` |
| FAQ | `FAQ_<DOMAIN>_<PURPOSE>` | `FAQ_SHOP_SHIPPING` |
| Flow | `FLOW_<DOMAIN>_<PURPOSE>` | `FLOW_RE_BOOK_VIEWING` |
| Keyword | `KW_<DOMAIN>_<PURPOSE>` | `KW_SHOP_ORDER_STATUS` |
| Sequence | `SEQ_<DOMAIN>_<PURPOSE>` | `SEQ_RE_LEAD_NURTURE` |
| Rule | `RULE_<DOMAIN>_<PURPOSE>` | `RULE_RE_HOT_LEAD` |
| Tag | `TAG_<DOMAIN>_<PURPOSE>` | `TAG_SHOP_CART_INTENT` |
| Custom field | `FIELD_<DOMAIN>_<PURPOSE>` | `FIELD_RE_BUDGET` |

### 1.3. Dữ liệu tuyệt đối không đóng gói

- Access token, API key, webhook secret và credential kết nối.
- ID thật của Page nguồn, nhân viên, nhóm xử lý hoặc khách hàng.
- Dữ liệu hội thoại, đơn hàng, tồn kho, bảng giá hoặc danh sách dự án thật.
- Dữ liệu huấn luyện NLU, kỹ năng mặc định của Page và báo cáo lịch sử.

---

## 2. Mẫu hệ thống — Shop Online

### 2.1. Thông tin mẫu

| Thuộc tính | Giá trị |
|---|---|
| Mã mẫu | `TPL-SYS-SHOP-ONLINE` |
| Tên hiển thị | Shop Online |
| Mục tiêu | Hỗ trợ khách tìm sản phẩm, xem khuyến mãi, tạo yêu cầu đặt hàng, tra cứu đơn và chuyển tư vấn viên khi cần. |
| Đối tượng phù hợp | Shop thời trang, mỹ phẩm, đồ gia dụng, thực phẩm đóng gói và cửa hàng bán lẻ có danh mục sản phẩm. |
| Kênh ưu tiên | Facebook Messenger, Instagram và Zalo OA nếu connector hỗ trợ thành phần tương ứng. |
| Không bao gồm | Thanh toán trực tiếp, tự xác nhận tồn kho, tự cam kết thời gian giao hàng hoặc tự phê duyệt đổi trả. |

### 2.2. Kết quả nghiệp vụ mong đợi

1. Khách có thể tự tìm nhóm sản phẩm và gửi nhu cầu mua hàng.
2. Bot chỉ hiển thị giá, tồn kho và khuyến mãi từ nguồn dữ liệu đã được cấu hình.
3. Khách có thể tra cứu đơn khi cung cấp mã đơn và thông tin xác minh hợp lệ.
4. Yêu cầu cần tư vấn được chuyển tới đúng hàng đợi bán hàng.
5. Bot không tạo đơn chính thức hoặc xác nhận thanh toán nếu chưa tích hợp hệ thống đơn hàng.

### 2.3. Thông tin phải cấu hình trước khi xuất bản

| Logical key | Bắt buộc | Kiểu | Mô tả và validation |
|---|---:|---|---|
| `SHOP_NAME` | Có | Text | Tên cửa hàng, 1–80 ký tự. |
| `SHOP_CATALOG_URL` | Có | HTTPS URL | Trang danh mục hoặc website bán hàng. Chỉ chấp nhận `https://`. |
| `SHOP_HOTLINE` | Có | Text | Số điện thoại hoặc đầu mối hỗ trợ. |
| `SHOP_WORKING_HOURS` | Có | Text | Giờ làm việc và múi giờ của Page. |
| `SHOP_SALES_QUEUE` | Có | Queue/Skill mapping | Hàng đợi nhận yêu cầu tư vấn hoặc đặt hàng. |
| `SHOP_ORDER_LOOKUP_CONNECTION` | Không | API connection | Kết nối tra cứu đơn. Nếu không có, Flow chuyển sang hỗ trợ thủ công. |
| `SHOP_PROMOTION_SOURCE` | Không | URL/API/Flow mapping | Nguồn khuyến mãi hiện hành. Không có thì ẩn mục khuyến mãi hoặc chuyển tư vấn viên. |
| `SHOP_RETURN_POLICY_URL` | Không | HTTPS URL | Chính sách đổi trả của shop. |

Không cho Publish nếu thiếu `SHOP_NAME`, `SHOP_CATALOG_URL`, `SHOP_HOTLINE`, `SHOP_WORKING_HOURS` hoặc `SHOP_SALES_QUEUE`.

### 2.4. Manifest của mẫu

| Nhóm cấu hình | Số lượng | Logical key |
|---|---:|---|
| Menu mặc định | 1 | `MENU_SHOP_DEFAULT` |
| FAQ | 4 | `FAQ_SHOP_SHIPPING`, `FAQ_SHOP_PAYMENT`, `FAQ_SHOP_RETURN`, `FAQ_SHOP_CONTACT` |
| Welcome Message | 1 | `MSG_SHOP_WELCOME` |
| Default Message | 1 | `MSG_SHOP_FALLBACK` |
| Keyword Rule | 6 | `KW_SHOP_PRODUCT`, `KW_SHOP_PROMOTION`, `KW_SHOP_ORDER`, `KW_SHOP_ORDER_STATUS`, `KW_SHOP_RETURN`, `KW_SHOP_AGENT` |
| Message Flow | 6 | `FLOW_SHOP_PRODUCT`, `FLOW_SHOP_PROMOTION`, `FLOW_SHOP_ORDER`, `FLOW_SHOP_ORDER_STATUS`, `FLOW_SHOP_RETURN`, `FLOW_SHOP_AGENT` |
| Sequence | 1 | `SEQ_SHOP_FOLLOW_UP` |
| Automation Rule | 3 | `RULE_SHOP_CART_INTENT`, `RULE_SHOP_AGENT_REQUEST`, `RULE_SHOP_FOLLOW_UP_STOP` |
| Tag | 3 | `TAG_SHOP_PRODUCT_INTEREST`, `TAG_SHOP_CART_INTENT`, `TAG_SHOP_AGENT_NEEDED` |
| Custom field | 5 | `FIELD_SHOP_CATEGORY`, `FIELD_SHOP_PRODUCT`, `FIELD_SHOP_QUANTITY`, `FIELD_SHOP_ORDER_ID`, `FIELD_SHOP_CONTACT` |

### 2.5. Welcome Message và Default Message

#### Welcome Message — `MSG_SHOP_WELCOME`

```text
Xin chào {{customer.first_name|Quý khách}} 👋
Chào mừng bạn đến với {{SHOP_NAME}}. Bạn muốn tìm sản phẩm, xem ưu đãi hay cần hỗ trợ đơn hàng?
```

Quick replies:

1. `Xem sản phẩm` → `FLOW_SHOP_PRODUCT`
2. `Khuyến mãi` → `FLOW_SHOP_PROMOTION`
3. `Tra cứu đơn` → `FLOW_SHOP_ORDER_STATUS`
4. `Gặp tư vấn viên` → `FLOW_SHOP_AGENT`

#### Default Message — `MSG_SHOP_FALLBACK`

```text
Mình chưa hiểu chính xác yêu cầu của bạn. Bạn có thể chọn một nội dung bên dưới hoặc để lại thông tin để nhân viên {{SHOP_NAME}} hỗ trợ nhé.
```

Quick replies:

- `Xem sản phẩm` → `FLOW_SHOP_PRODUCT`
- `Tra cứu đơn` → `FLOW_SHOP_ORDER_STATUS`
- `Gặp tư vấn viên` → `FLOW_SHOP_AGENT`

Frequency cap mặc định: tối đa một lần trong 24 giờ cho cùng khách/Page. Nếu fallback đang tắt hoặc lỗi, chuyển `SHOP_SALES_QUEUE` mà không gửi nội dung rỗng.

### 2.6. Menu mặc định — `MENU_SHOP_DEFAULT`

| Thứ tự | Tiêu đề | Hành động | Đích |
|---:|---|---|---|
| 1 | Xem sản phẩm | Start Flow | `FLOW_SHOP_PRODUCT` |
| 2 | Khuyến mãi hôm nay | Start Flow | `FLOW_SHOP_PROMOTION` |
| 3 | Đặt hàng | Start Flow | `FLOW_SHOP_ORDER` |
| 4 | Tra cứu đơn hàng | Start Flow | `FLOW_SHOP_ORDER_STATUS` |
| 5 | Hỗ trợ tư vấn | Transfer Inbox | `SHOP_SALES_QUEUE` qua `FLOW_SHOP_AGENT` |

Các tiêu đề không vượt quá 30 ký tự. Khi Page đích đã có Menu mặc định, application plan mặc định chọn `KEEP`; người dùng phải chủ động chọn `UPDATE_AS_DRAFT` nếu muốn thay thế.

### 2.7. FAQ

| Logical key | Câu hỏi hiển thị | Phản hồi/Hành động |
|---|---|---|
| `FAQ_SHOP_SHIPPING` | Phí và thời gian giao hàng? | Gửi nội dung cấu hình theo khu vực; nếu chưa cấu hình thì chuyển `FLOW_SHOP_AGENT`. Không cam kết ngày giao khi chưa có dữ liệu vận chuyển. |
| `FAQ_SHOP_PAYMENT` | Shop hỗ trợ thanh toán nào? | Hiển thị danh sách phương thức do Page cấu hình; không yêu cầu khách gửi số thẻ hoặc OTP trong chat. |
| `FAQ_SHOP_RETURN` | Chính sách đổi trả? | Mở `SHOP_RETURN_POLICY_URL` hoặc chạy `FLOW_SHOP_RETURN`. |
| `FAQ_SHOP_CONTACT` | Liên hệ với shop thế nào? | Hiển thị `SHOP_HOTLINE`, `SHOP_WORKING_HOURS` và nút chuyển `SHOP_SALES_QUEUE`. |

Nếu kênh không hỗ trợ FAQ button, application plan đánh dấu `UNSUPPORTED`; các Flow liên quan vẫn có thể được dùng từ Menu/Keyword.

### 2.8. Keyword Rules

| Logical key | Include terms gợi ý | Exclude terms | Priority | Đích |
|---|---|---|---:|---|
| `KW_SHOP_AGENT` | nhân viên, tư vấn viên, gặp người thật, hỗ trợ trực tiếp | tuyển dụng | 1 | `FLOW_SHOP_AGENT` |
| `KW_SHOP_ORDER_STATUS` | tra đơn, đơn của tôi, đơn tới đâu, mã vận đơn | đặt đơn, mua hàng | 2 | `FLOW_SHOP_ORDER_STATUS` |
| `KW_SHOP_RETURN` | đổi trả, hoàn hàng, trả hàng, sản phẩm lỗi | đổi địa chỉ | 3 | `FLOW_SHOP_RETURN` |
| `KW_SHOP_ORDER` | đặt hàng, mua hàng, chốt đơn | hủy đơn, tra đơn | 4 | `FLOW_SHOP_ORDER` |
| `KW_SHOP_PROMOTION` | khuyến mãi, giảm giá, voucher, ưu đãi | tuyển dụng | 5 | `FLOW_SHOP_PROMOTION` |
| `KW_SHOP_PRODUCT` | sản phẩm, mẫu mới, còn hàng, giá bao nhiêu | tra đơn | 6 | `FLOW_SHOP_PRODUCT` |

Matcher chuẩn hóa Unicode, hoa/thường và khoảng trắng. Khi nhiều rule cùng khớp, số priority nhỏ hơn được xử lý trước.

### 2.9. Message Flows

#### `FLOW_SHOP_PRODUCT` — Tìm sản phẩm

| Bước | Xử lý | Kết quả |
|---:|---|---|
| 1 | Hỏi nhóm sản phẩm khách quan tâm. | Ghi `FIELD_SHOP_CATEGORY`. |
| 2 | Nếu có catalog integration, truy vấn danh mục; nếu không, mở `SHOP_CATALOG_URL`. | Không tự tạo tên/giá/tồn kho. |
| 3 | Khách chọn sản phẩm hoặc nhập nhu cầu. | Ghi `FIELD_SHOP_PRODUCT`; thêm `TAG_SHOP_PRODUCT_INTEREST`. |
| 4 | Hỏi tiếp `Đặt hàng`, `Xem thêm` hoặc `Gặp tư vấn viên`. | Điều hướng sang Flow tương ứng. |

#### `FLOW_SHOP_PROMOTION` — Xem khuyến mãi

| Bước | Xử lý | Kết quả |
|---:|---|---|
| 1 | Đọc `SHOP_PROMOTION_SOURCE`. | Chỉ hiển thị chương trình còn hiệu lực. |
| 2 | Nếu nguồn chưa cấu hình hoặc lỗi. | Thông báo chưa thể kiểm tra và chuyển `FLOW_SHOP_AGENT`; không bịa ưu đãi. |
| 3 | Khách chọn ưu đãi. | Điều hướng `FLOW_SHOP_PRODUCT` hoặc `FLOW_SHOP_ORDER`. |

#### `FLOW_SHOP_ORDER` — Tạo yêu cầu đặt hàng

| Bước | Xử lý | Validation |
|---:|---|---|
| 1 | Thu thập sản phẩm/biến thể. | `FIELD_SHOP_PRODUCT` bắt buộc. |
| 2 | Thu thập số lượng. | Số nguyên từ 1 đến giới hạn Page cấu hình. |
| 3 | Thu thập tên và thông tin liên hệ. | `FIELD_SHOP_CONTACT` bắt buộc; masking trong log. |
| 4 | Hiển thị tóm tắt để khách xác nhận. | Không hiển thị giá cuối cùng nếu chưa lấy được từ hệ thống bán hàng. |
| 5 | Tạo lead/yêu cầu tư vấn và thêm `TAG_SHOP_CART_INTENT`. | Chuyển `SHOP_SALES_QUEUE`. Chỉ tạo đơn chính thức nếu có API được cấu hình và khách xác nhận. |

#### `FLOW_SHOP_ORDER_STATUS` — Tra cứu đơn

| Bước | Xử lý | Nhánh lỗi/an toàn |
|---:|---|---|
| 1 | Yêu cầu mã đơn. | Ghi `FIELD_SHOP_ORDER_ID`; không log toàn bộ dữ liệu nhạy cảm. |
| 2 | Thực hiện bước xác minh theo chính sách shop. | Không trả dữ liệu đơn nếu xác minh thất bại. |
| 3 | Nếu có `SHOP_ORDER_LOOKUP_CONNECTION`, gọi API tra cứu. | Timeout/lỗi → không đoán trạng thái, chuyển nhân viên. |
| 4 | Nếu chưa tích hợp API. | Tạo yêu cầu cho `SHOP_SALES_QUEUE`, kèm mã đơn đã che bớt. |

#### `FLOW_SHOP_RETURN` — Đổi trả

1. Hiển thị chính sách từ `SHOP_RETURN_POLICY_URL` nếu có.
2. Thu thập mã đơn và lý do đổi trả.
3. Không tự phê duyệt hoàn tiền hoặc đổi trả.
4. Tạo ticket/chuyển `SHOP_SALES_QUEUE` để xác minh.

#### `FLOW_SHOP_AGENT` — Gặp tư vấn viên

1. Hỏi ngắn gọn nhu cầu và thông tin liên hệ nếu chưa có.
2. Thêm `TAG_SHOP_AGENT_NEEDED`.
3. Chuyển `SHOP_SALES_QUEUE` trong giờ làm việc.
4. Ngoài giờ làm việc, thông báo `SHOP_WORKING_HOURS`, ghi nhận yêu cầu và không hứa thời gian phản hồi cụ thể nếu chưa cấu hình SLA.

### 2.10. Sequence — `SEQ_SHOP_FOLLOW_UP`

Chỉ ghi danh khi khách đã đồng ý nhận tiếp thông tin và connector cho phép gửi trong thời điểm tương ứng.

| Bước | Delay | Điều kiện trước khi gửi | Nội dung/Hành động |
|---:|---|---|---|
| 1 | 30 phút | Có `TAG_SHOP_CART_INTENT`; chưa tạo đơn; chưa chuyển agent thành công. | Hỏi khách có cần hỗ trợ chọn sản phẩm hoặc hoàn tất yêu cầu không. |
| 2 | 20 giờ | Vẫn chưa tạo đơn; session/capability cho phép. | Gửi một lời nhắc cuối và nút `Gặp tư vấn viên`. |
| 3 | Sau bước 2 | Luôn chạy. | Kết thúc enrollment; không tự lặp lại. |

Hủy Sequence ngay khi có một trong các sự kiện: đơn được tạo, khách từ chối nhận tin, khách yêu cầu dừng, agent tiếp nhận hoặc Page mất quyền gửi.

### 2.11. Automation Rules

| Logical key | Trigger | Condition | Actions theo thứ tự |
|---|---|---|---|
| `RULE_SHOP_CART_INTENT` | Hoàn tất bước xác nhận trong `FLOW_SHOP_ORDER` | Có sản phẩm, số lượng và liên hệ; chưa có đơn | Thêm `TAG_SHOP_CART_INTENT` → tạo lead/ticket → nếu có consent thì ghi danh `SEQ_SHOP_FOLLOW_UP` → chuyển `SHOP_SALES_QUEUE`. |
| `RULE_SHOP_AGENT_REQUEST` | Thêm `TAG_SHOP_AGENT_NEEDED` | Chưa có agent phụ trách | Chuyển `SHOP_SALES_QUEUE` → ghi log routing. |
| `RULE_SHOP_FOLLOW_UP_STOP` | Nhận sự kiện Order Created hoặc Opt-out | Có enrollment đang hoạt động | Hủy `SEQ_SHOP_FOLLOW_UP` → gỡ `TAG_SHOP_CART_INTENT`. |

Rules có idempotency key theo event/customer/Page, chống tự kích hoạt lại và mặc định `INACTIVE` sau khi áp dụng.

### 2.12. Dependency bắt buộc

```text
MENU_SHOP_DEFAULT
├── FLOW_SHOP_PRODUCT ── TAG_SHOP_PRODUCT_INTEREST
├── FLOW_SHOP_PROMOTION ── SHOP_PROMOTION_SOURCE (optional)
├── FLOW_SHOP_ORDER ── FIELD_SHOP_PRODUCT/QUANTITY/CONTACT
│   └── TAG_SHOP_CART_INTENT ── RULE_SHOP_CART_INTENT ── SEQ_SHOP_FOLLOW_UP
├── FLOW_SHOP_ORDER_STATUS ── FIELD_SHOP_ORDER_ID
│   └── SHOP_ORDER_LOOKUP_CONNECTION (optional, otherwise manual handoff)
└── FLOW_SHOP_AGENT ── TAG_SHOP_AGENT_NEEDED ── SHOP_SALES_QUEUE
```

Thiếu `SHOP_SALES_QUEUE` là lỗi chặn. Thiếu integration tùy chọn không làm gãy Mẫu nếu nhánh chuyển nhân viên vẫn hợp lệ.

### 2.13. Acceptance Criteria của Mẫu Shop Online

| Mã | Tiêu chí |
|---|---|
| `AC-SHOP-01` | Khi áp dụng Mẫu vào Page mới, toàn bộ thành phần được tạo ở Draft/Inactive và không gửi tin cho khách trước khi Publish/Activate. |
| `AC-SHOP-02` | Khi khách chọn Xem sản phẩm, bot không tự tạo giá hoặc tồn kho nếu chưa có catalog integration. |
| `AC-SHOP-03` | Khi tra cứu đơn thất bại hoặc chưa tích hợp API, bot chuyển xử lý thủ công và không tiết lộ dữ liệu đơn. |
| `AC-SHOP-04` | Khi khách yêu cầu nhân viên, yêu cầu được chuyển đúng `SHOP_SALES_QUEUE` và không tiếp tục fallback lặp lại. |
| `AC-SHOP-05` | Khi khách tạo đơn hoặc opt-out, Sequence follow-up đang hoạt động bị hủy và không gửi bước tiếp theo. |
| `AC-SHOP-06` | Khi Page đích không hỗ trợ FAQ, application plan báo `UNSUPPORTED` cho FAQ nhưng vẫn giữ được Flow hợp lệ từ Menu/Keyword. |
| `AC-SHOP-07` | Không thể Publish nếu thiếu biến bắt buộc hoặc còn reference trỏ về ID của Page nguồn. |

---

## 3. Mẫu hệ thống — Bất động sản

### 3.1. Thông tin mẫu

| Thuộc tính | Giá trị |
|---|---|
| Mã mẫu | `TPL-SYS-REAL-ESTATE` |
| Tên hiển thị | Bất động sản |
| Mục tiêu | Thu thập nhu cầu, gợi ý dự án phù hợp, cung cấp thông tin giá/chính sách đã được duyệt, đặt lịch tham quan và chuyển chuyên viên. |
| Đối tượng phù hợp | Chủ đầu tư, sàn môi giới, đội bán hàng dự án, đơn vị cho thuê hoặc môi giới nhà ở. |
| Kênh ưu tiên | Facebook Messenger, Instagram và Zalo OA theo capability. |
| Không bao gồm | Tư vấn pháp lý, cam kết lợi nhuận, tự phê duyệt khoản vay, giữ chỗ hoặc nhận tiền cọc trong chat. |

### 3.2. Kết quả nghiệp vụ mong đợi

1. Thu thập đủ loại bất động sản, khu vực, ngân sách, mục đích và thời gian dự kiến.
2. Chỉ gợi ý dự án đang được Page cho phép tư vấn và có dữ liệu hợp lệ.
3. Nhận diện lead có nhu cầu rõ ràng để chuyển chuyên viên phù hợp.
4. Đặt lịch tham quan có xác nhận, chống đặt trùng và hỗ trợ hủy/đổi lịch.
5. Không đưa ra cam kết pháp lý, lợi nhuận hoặc phê duyệt tài chính thay cho đơn vị có thẩm quyền.

### 3.3. Thông tin phải cấu hình trước khi xuất bản

| Logical key | Bắt buộc | Kiểu | Mô tả và validation |
|---|---:|---|---|
| `RE_COMPANY_NAME` | Có | Text | Tên đơn vị tư vấn, 1–100 ký tự. |
| `RE_PROJECT_SOURCE` | Có | API/Data source/Flow mapping | Danh sách dự án đang mở bán/cho thuê và trạng thái hiệu lực. |
| `RE_PRICE_POLICY_SOURCE` | Có | API/Document/URL | Nguồn bảng giá và chính sách có ngày hiệu lực. |
| `RE_SALES_QUEUE` | Có | Queue/Skill mapping | Nhóm chuyên viên nhận lead. |
| `RE_WORKING_HOURS` | Có | Text | Giờ làm việc và múi giờ Page. |
| `RE_BOOKING_CONNECTION` | Không | Calendar/API mapping | Kết nối lịch tham quan. Nếu không có, tạo yêu cầu chờ chuyên viên xác nhận. |
| `RE_PRIVACY_NOTICE_URL` | Có | HTTPS URL | Chính sách xử lý thông tin cá nhân. |
| `RE_HOTLINE` | Có | Text | Đầu mối liên hệ. |

Không cho Publish nếu thiếu nguồn dự án, nguồn giá/chính sách, privacy notice hoặc hàng đợi chuyên viên.

### 3.4. Manifest của mẫu

| Nhóm cấu hình | Số lượng | Logical key |
|---|---:|---|
| Menu mặc định | 1 | `MENU_RE_DEFAULT` |
| FAQ | 4 | `FAQ_RE_PRICE`, `FAQ_RE_LEGAL`, `FAQ_RE_LOAN`, `FAQ_RE_VIEWING` |
| Welcome Message | 1 | `MSG_RE_WELCOME` |
| Default Message | 1 | `MSG_RE_FALLBACK` |
| Keyword Rule | 6 | `KW_RE_PROJECT`, `KW_RE_PRICE`, `KW_RE_VIEWING`, `KW_RE_LOAN`, `KW_RE_LEGAL`, `KW_RE_AGENT` |
| Message Flow | 6 | `FLOW_RE_DISCOVERY`, `FLOW_RE_PROJECT`, `FLOW_RE_PRICE`, `FLOW_RE_BOOK_VIEWING`, `FLOW_RE_FINANCE`, `FLOW_RE_AGENT` |
| Sequence | 2 | `SEQ_RE_LEAD_NURTURE`, `SEQ_RE_VIEWING_REMINDER` |
| Automation Rule | 4 | `RULE_RE_QUALIFY`, `RULE_RE_HOT_LEAD`, `RULE_RE_BOOKING`, `RULE_RE_STOP_NURTURE` |
| Tag | 4 | `TAG_RE_NEW_LEAD`, `TAG_RE_QUALIFIED`, `TAG_RE_HOT_LEAD`, `TAG_RE_VIEWING_BOOKED` |
| Custom field | 9 | `FIELD_RE_PROPERTY_TYPE`, `FIELD_RE_LOCATION`, `FIELD_RE_BUDGET`, `FIELD_RE_PURPOSE`, `FIELD_RE_BEDROOMS`, `FIELD_RE_TIMELINE`, `FIELD_RE_PROJECT`, `FIELD_RE_CONTACT`, `FIELD_RE_VIEWING_TIME` |

### 3.5. Welcome Message và Default Message

#### Welcome Message — `MSG_RE_WELCOME`

```text
Xin chào {{customer.first_name|Anh/Chị}} 👋
{{RE_COMPANY_NAME}} có thể hỗ trợ Anh/Chị tìm dự án, tham khảo giá và chính sách hoặc đặt lịch tham quan. Anh/Chị đang quan tâm nội dung nào?
```

Quick replies:

1. `Tìm bất động sản` → `FLOW_RE_DISCOVERY`
2. `Dự án nổi bật` → `FLOW_RE_PROJECT`
3. `Giá & chính sách` → `FLOW_RE_PRICE`
4. `Đặt lịch tham quan` → `FLOW_RE_BOOK_VIEWING`

#### Default Message — `MSG_RE_FALLBACK`

```text
Mình chưa xác định được nhu cầu của Anh/Chị. Anh/Chị có thể chọn nội dung bên dưới hoặc kết nối với chuyên viên tư vấn.
```

Quick replies:

- `Tìm bất động sản` → `FLOW_RE_DISCOVERY`
- `Đặt lịch tham quan` → `FLOW_RE_BOOK_VIEWING`
- `Gặp chuyên viên` → `FLOW_RE_AGENT`

Frequency cap mặc định: một lần trong 24 giờ cho cùng khách/Page.

### 3.6. Menu mặc định — `MENU_RE_DEFAULT`

| Thứ tự | Tiêu đề | Hành động | Đích |
|---:|---|---|---|
| 1 | Tìm bất động sản | Start Flow | `FLOW_RE_DISCOVERY` |
| 2 | Dự án nổi bật | Start Flow | `FLOW_RE_PROJECT` |
| 3 | Giá & chính sách | Start Flow | `FLOW_RE_PRICE` |
| 4 | Đặt lịch tham quan | Start Flow | `FLOW_RE_BOOK_VIEWING` |
| 5 | Tư vấn chuyên viên | Transfer Inbox | `RE_SALES_QUEUE` qua `FLOW_RE_AGENT` |

### 3.7. FAQ

| Logical key | Câu hỏi hiển thị | Phản hồi/Hành động |
|---|---|---|
| `FAQ_RE_PRICE` | Giá bán hiện tại thế nào? | Chạy `FLOW_RE_PRICE`; bắt buộc hiển thị ngày hiệu lực và nguồn chính sách. |
| `FAQ_RE_LEGAL` | Pháp lý dự án ra sao? | Chỉ hiển thị thông tin đã được phê duyệt từ `RE_PROJECT_SOURCE`; kèm lưu ý liên hệ chuyên viên/đơn vị pháp lý để xác minh. |
| `FAQ_RE_LOAN` | Có hỗ trợ vay không? | Chạy `FLOW_RE_FINANCE`; chỉ cung cấp thông tin tham khảo, không cam kết phê duyệt hoặc lãi suất. |
| `FAQ_RE_VIEWING` | Làm sao đặt lịch xem? | Chạy `FLOW_RE_BOOK_VIEWING`. |

### 3.8. Keyword Rules

| Logical key | Include terms gợi ý | Exclude terms | Priority | Đích |
|---|---|---|---:|---|
| `KW_RE_AGENT` | chuyên viên, tư vấn viên, gọi cho tôi, liên hệ tôi | tuyển dụng | 1 | `FLOW_RE_AGENT` |
| `KW_RE_VIEWING` | xem nhà, xem dự án, tham quan, đặt lịch | xem hình, video | 2 | `FLOW_RE_BOOK_VIEWING` |
| `KW_RE_LEGAL` | pháp lý, sổ hồng, giấy phép, sở hữu | — | 3 | FAQ/`FLOW_RE_AGENT` |
| `KW_RE_LOAN` | vay ngân hàng, trả góp, lãi suất, khoản vay | — | 4 | `FLOW_RE_FINANCE` |
| `KW_RE_PRICE` | giá bán, bảng giá, chiết khấu, chính sách | tuyển dụng | 5 | `FLOW_RE_PRICE` |
| `KW_RE_PROJECT` | dự án, căn hộ, đất nền, nhà phố, biệt thự | — | 6 | `FLOW_RE_DISCOVERY` |

### 3.9. Message Flows

#### `FLOW_RE_DISCOVERY` — Khám phá nhu cầu

| Bước | Câu hỏi/Xử lý | Dữ liệu |
|---:|---|---|
| 1 | Anh/Chị quan tâm căn hộ, nhà phố, biệt thự, đất nền hay thuê? | `FIELD_RE_PROPERTY_TYPE` |
| 2 | Khu vực hoặc dự án mong muốn? | `FIELD_RE_LOCATION` |
| 3 | Khoảng ngân sách dự kiến? | `FIELD_RE_BUDGET`; lưu theo khoảng, không ép cung cấp thu nhập. |
| 4 | Mục đích để ở, đầu tư hay cho thuê? | `FIELD_RE_PURPOSE` |
| 5 | Số phòng ngủ/diện tích mong muốn nếu áp dụng? | `FIELD_RE_BEDROOMS` |
| 6 | Thời gian dự kiến giao dịch? | `FIELD_RE_TIMELINE` |
| 7 | Truy vấn `RE_PROJECT_SOURCE` theo tiêu chí. | Chỉ trả dự án còn hiệu lực; không có kết quả thì chuyển chuyên viên. |
| 8 | Khách chọn dự án. | `FIELD_RE_PROJECT`; chuyển `FLOW_RE_PROJECT` hoặc đặt lịch. |

#### `FLOW_RE_PROJECT` — Thông tin dự án

1. Đọc dự án từ `FIELD_RE_PROJECT` hoặc yêu cầu khách chọn dự án.
2. Hiển thị thông tin đã duyệt: vị trí, loại hình, diện tích, tiến độ, tiện ích và pháp lý.
3. Không tự suy diễn lợi nhuận, thời gian cấp sổ hoặc cam kết bàn giao.
4. Cho chọn `Giá & chính sách`, `Đặt lịch tham quan` hoặc `Gặp chuyên viên`.

#### `FLOW_RE_PRICE` — Giá và chính sách

| Bước | Xử lý | Quy tắc |
|---:|---|---|
| 1 | Xác định dự án/sản phẩm khách quan tâm. | `FIELD_RE_PROJECT` bắt buộc. |
| 2 | Đọc `RE_PRICE_POLICY_SOURCE`. | Hiển thị ngày hiệu lực và ghi rõ giá có thể thay đổi theo căn/thời điểm. |
| 3 | Nếu nguồn lỗi/hết hiệu lực. | Không hiển thị giá cache quá hạn; chuyển `FLOW_RE_AGENT`. |
| 4 | Khách muốn nhận bảng giá chi tiết. | Xin consent và thông tin liên hệ; chuyển chuyên viên. |

#### `FLOW_RE_BOOK_VIEWING` — Đặt lịch tham quan

| Bước | Xử lý | Validation |
|---:|---|---|
| 1 | Chọn dự án/địa điểm. | Phải tồn tại trong `RE_PROJECT_SOURCE`. |
| 2 | Chọn ngày giờ mong muốn theo timezone Page. | Không nhận thời điểm quá khứ; áp dụng lead time do Page cấu hình. |
| 3 | Thu thập tên và thông tin liên hệ sau khi hiển thị privacy notice. | Ghi `FIELD_RE_CONTACT` khi khách đồng ý. |
| 4 | Nếu có `RE_BOOKING_CONNECTION`, kiểm tra slot và tạo lịch tạm. | Dùng idempotency key; không tạo lịch trùng. |
| 5 | Nếu không có calendar integration. | Tạo yêu cầu chờ xác nhận; không thông báo “đã đặt lịch thành công”. |
| 6 | Gửi tóm tắt và cách hủy/đổi lịch. | Ghi `FIELD_RE_VIEWING_TIME`; thêm `TAG_RE_VIEWING_BOOKED` chỉ khi đã xác nhận. |

#### `FLOW_RE_FINANCE` — Thông tin tài chính tham khảo

1. Hỏi dự án và khoảng ngân sách, không yêu cầu số tài khoản, OTP hoặc hồ sơ tín dụng trong chat.
2. Hiển thị chính sách hỗ trợ tài chính đã được duyệt và ngày hiệu lực.
3. Mọi ước tính chỉ mang tính tham khảo; ngân hàng/đơn vị tài chính quyết định điều kiện thực tế.
4. Nếu khách muốn tư vấn hồ sơ, chuyển `RE_SALES_QUEUE` sau khi có consent.

#### `FLOW_RE_AGENT` — Gặp chuyên viên

1. Tóm tắt nhu cầu đã có từ các custom field.
2. Nếu thiếu thông tin liên hệ, hiển thị `RE_PRIVACY_NOTICE_URL` và xin consent trước khi thu thập.
3. Chuyển `RE_SALES_QUEUE`, kèm dự án, ngân sách, mục đích và timeline.
4. Ngoài giờ làm việc, thông báo `RE_WORKING_HOURS`; không hứa thời gian gọi lại nếu chưa có SLA.

### 3.10. Lead qualification

Mẫu dùng điểm nội bộ để ưu tiên xử lý, không hiển thị điểm cho khách và không dùng điểm để từ chối phục vụ.

| Tín hiệu | Điểm |
|---|---:|
| Có loại bất động sản | +1 |
| Có khu vực/dự án | +1 |
| Có khoảng ngân sách | +1 |
| Có timeline ≤ 3 tháng | +2 |
| Yêu cầu chuyên viên | +2 |
| Đặt lịch tham quan đã xác nhận | +3 |

- Tổng điểm từ 3: thêm `TAG_RE_QUALIFIED`.
- Tổng điểm từ 6 hoặc có lịch tham quan: thêm `TAG_RE_HOT_LEAD`.
- Thiếu ngân sách không được coi là spam và không chặn chuyển chuyên viên.

### 3.11. Sequences

#### `SEQ_RE_LEAD_NURTURE`

Chỉ ghi danh khi khách đã đồng ý nhận thông tin dự án.

| Bước | Delay | Điều kiện | Nội dung/Hành động |
|---:|---|---|---|
| 1 | 1 ngày | Lead qualified; chưa có lịch; kênh cho phép gửi. | Gửi thông tin dự án đã chọn từ nguồn còn hiệu lực. |
| 2 | 3 ngày | Chưa được agent tiếp nhận; chưa opt-out. | Hỏi nhu cầu nhận bảng giá hoặc đặt lịch. |
| 3 | 7 ngày | Chính sách gửi ngoài 24 giờ và consent còn hiệu lực. | Gửi lời nhắc cuối; sau đó hoàn tất Sequence. |

#### `SEQ_RE_VIEWING_REMINDER`

| Bước | Thời điểm | Điều kiện | Nội dung/Hành động |
|---:|---|---|---|
| 1 | Trước lịch 24 giờ | Lịch đã xác nhận và chưa hủy. | Gửi thời gian, địa điểm và nút Xác nhận/Hủy. |
| 2 | Trước lịch 2 giờ | Khách đã xác nhận; kênh cho phép. | Nhắc lịch ngắn gọn và đầu mối liên hệ. |
| 3 | Khi lịch bị hủy/đổi | Có event tương ứng. | Hủy job cũ; chỉ tạo reminder mới sau khi lịch mới được xác nhận. |

### 3.12. Automation Rules

| Logical key | Trigger | Condition | Actions theo thứ tự |
|---|---|---|---|
| `RULE_RE_QUALIFY` | Custom field nhu cầu thay đổi | Điểm qualification ≥ 3 | Thêm `TAG_RE_QUALIFIED` → nếu có consent thì ghi danh `SEQ_RE_LEAD_NURTURE`. |
| `RULE_RE_HOT_LEAD` | Điểm hoặc lịch thay đổi | Điểm ≥ 6 hoặc có lịch xác nhận | Thêm `TAG_RE_HOT_LEAD` → thông báo/chuyển `RE_SALES_QUEUE` → dừng nurture nếu agent tiếp nhận. |
| `RULE_RE_BOOKING` | Lịch tham quan được xác nhận | Có project, contact và viewing time | Thêm `TAG_RE_VIEWING_BOOKED` → ghi danh `SEQ_RE_VIEWING_REMINDER` → thông báo chuyên viên. |
| `RULE_RE_STOP_NURTURE` | Opt-out, agent accepted hoặc giao dịch đóng | Có enrollment đang hoạt động | Hủy `SEQ_RE_LEAD_NURTURE` và các job chưa đến hạn phù hợp. |

### 3.13. Dependency bắt buộc

```text
MENU_RE_DEFAULT
├── FLOW_RE_DISCOVERY ── RE_PROJECT_SOURCE
│   ├── FIELD_RE_PROPERTY_TYPE/LOCATION/BUDGET/PURPOSE/TIMELINE
│   └── RULE_RE_QUALIFY ── SEQ_RE_LEAD_NURTURE
├── FLOW_RE_PROJECT ── FIELD_RE_PROJECT ── RE_PROJECT_SOURCE
├── FLOW_RE_PRICE ── RE_PRICE_POLICY_SOURCE
├── FLOW_RE_BOOK_VIEWING
│   ├── RE_PRIVACY_NOTICE_URL
│   ├── RE_BOOKING_CONNECTION (optional, otherwise pending confirmation)
│   └── RULE_RE_BOOKING ── SEQ_RE_VIEWING_REMINDER
└── FLOW_RE_AGENT ── RE_SALES_QUEUE
```

Nguồn dự án, nguồn giá/chính sách, privacy notice và sales queue là dependency chặn Publish. Calendar integration là tùy chọn vì đã có nhánh chờ xác nhận thủ công.

### 3.14. Quy tắc an toàn và tuân thủ nội dung

- Không dùng các câu khẳng định như “chắc chắn sinh lời”, “cam kết lợi nhuận”, “pháp lý tuyệt đối” hoặc “được duyệt vay”.
- Giá và chính sách phải có nguồn/ngày hiệu lực; dữ liệu quá hạn phải bị chặn hoặc gắn cảnh báo rõ ràng.
- Chỉ thu thập thông tin liên hệ sau khi hiển thị privacy notice và có sự đồng ý phù hợp.
- Không yêu cầu khách gửi OTP, mật khẩu, số thẻ, ảnh giấy tờ tùy thân hoặc hồ sơ tín dụng nhạy cảm trong luồng mặc định.
- Yêu cầu tư vấn pháp lý hoặc tài chính chuyên sâu phải chuyển người có thẩm quyền.

### 3.15. Acceptance Criteria của Mẫu Bất động sản

| Mã | Tiêu chí |
|---|---|
| `AC-RE-01` | Khi khách hoàn tất khám phá nhu cầu, các field loại hình, khu vực, ngân sách, mục đích và timeline được lưu đúng khách/Page. |
| `AC-RE-02` | Bot chỉ gợi ý dự án tồn tại và còn hiệu lực trong `RE_PROJECT_SOURCE`; không tự tạo tên dự án hoặc giá. |
| `AC-RE-03` | Bảng giá/chính sách luôn kèm ngày hiệu lực; nguồn hết hạn hoặc lỗi phải chuyển chuyên viên thay vì dùng dữ liệu không xác minh. |
| `AC-RE-04` | Nếu chưa tích hợp lịch, hệ thống chỉ ghi “yêu cầu chờ xác nhận”, không báo đặt lịch thành công. |
| `AC-RE-05` | Cùng một yêu cầu đặt lịch được retry không tạo nhiều lịch hoặc nhiều enrollment reminder. |
| `AC-RE-06` | Khi khách opt-out, agent tiếp nhận hoặc lịch bị hủy, các bước Sequence chưa đến hạn được hủy đúng phạm vi. |
| `AC-RE-07` | Thiếu ngân sách không chặn khách gặp chuyên viên và không tự gắn nhãn spam. |
| `AC-RE-08` | Sau khi áp dụng Mẫu, mọi Rule/Sequence/Keyword vẫn Inactive cho đến khi người có quyền kích hoạt. |

---

## 4. Ma trận tương thích kênh

| Thành phần | Facebook/Instagram | Zalo OA | Hành vi khi không hỗ trợ |
|---|---|---|---|
| Persistent Menu | Theo capability connector | Theo capability connector | `UNSUPPORTED`; không tạo menu giả. |
| FAQ/Quick replies | Theo giới hạn connector | Có thể khác hoặc không hỗ trợ | Bỏ riêng UI component; giữ Flow/Keyword nếu độc lập. |
| Welcome Message | Theo sự kiện/kênh hỗ trợ | Theo capability connector | Giữ Inactive và cảnh báo. |
| Outside-24h Sequence | Chỉ khi policy và consent cho phép | Theo policy Zalo OA | Không lên lịch bước không hợp lệ. |
| URL button | Chỉ HTTPS | Chỉ HTTPS | Chặn Publish URL không an toàn. |
| API/Calendar lookup | Qua connection được cấu hình | Qua connection được cấu hình | Chuyển nhánh xử lý thủ công. |

## 5. Checklist trước khi phát hành Mẫu hệ thống

- [ ] Tất cả logical key là duy nhất trong từng Mẫu.
- [ ] Không có ID Page nguồn, credential hoặc dữ liệu khách trong snapshot.
- [ ] Mọi Menu/FAQ/Keyword/Rule trỏ tới dependency có trong manifest hoặc có mapping bắt buộc.
- [ ] Tất cả tiêu đề Menu không quá 30 ký tự và FAQ không quá bốn mục.
- [ ] URL bắt buộc dùng HTTPS.
- [ ] Nội dung không chứa giá, tồn kho, dự án hoặc chính sách minh họa có thể bị hiểu là dữ liệu thật.
- [ ] Application plan mặc định `KEEP` đối với cấu hình Published hiện hữu.
- [ ] Thành phần mới sau Apply ở Draft/Inactive.
- [ ] Có nhánh fallback an toàn khi API, calendar hoặc data source không khả dụng.
- [ ] Sequence có consent, frequency cap, điều kiện dừng và kiểm tra capability.
- [ ] Rules có idempotency key, loop guard và thứ tự action rõ ràng.
- [ ] Đã chạy test dependency, channel compatibility, rollback và duplicate request.
