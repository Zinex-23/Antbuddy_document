# AntBot — Đặc tả chức năng Mẫu cấu hình

**Phạm vi:** FR-TPL-001 đến FR-TPL-009  
**Phiên bản:** 1.1  
**Ngày rà soát:** 30/09/2026

Mẫu là snapshot cấu hình có phiên bản để tái sử dụng trong cùng tổ chức. Mẫu không mang trạng thái `Published/Active` từ Page nguồn sang Page đích. Sau khi áp dụng, cấu hình mới luôn ở `Draft/Inactive` cho đến khi người có quyền chủ động xuất bản hoặc kích hoạt.

Luồng tổng quát: **chọn nguồn → chọn nội dung → kiểm tra dependency → tạo phiên bản READY → xem trước tác động → áp dụng Draft/Inactive → kiểm tra → Publish/Activate**.

## 1. Functional Requirements (FR)

### 1.1. FR-TPL-001: Xem và quản lý danh sách mẫu

| Thuộc tính | Nội dung |
|---|---|
| **Mô tả** | Cho phép người dùng xem, tìm kiếm, lọc và quản lý các Mẫu cấu hình AntBot trong tổ chức. Mẫu là gói cấu hình tái sử dụng; Mẫu không phải tin nhắn gửi khách và không tự tác động đến bất kỳ Page nào. |
| **Đối tượng liên quan** | Admin/Quản lý AntBot; Chủ sở hữu Mẫu; người được cấp quyền Xem, Áp dụng, Sao chép hoặc Quản lý phiên bản. |
| **Pre-conditions** | Người dùng đã đăng nhập, thuộc tổ chức và có ít nhất quyền Xem Mẫu. |
| **Điều kiện kích hoạt** | Người dùng mở AntBot → Mẫu cấu hình. |
| **Luồng xử lý chính** | 1. Hệ thống hiển thị hai phạm vi: Mẫu hệ thống và Mẫu của tổ chức/người dùng.<br>2. Mỗi Mẫu hiển thị: tên, mô tả, phiên bản hiện hành, trang/kênh nguồn, chủ sở hữu, thời điểm cập nhật, trạng thái và số lần áp dụng.<br>3. Người dùng tìm theo tên/mô tả; lọc theo trạng thái, kênh nguồn, trang nguồn và chủ sở hữu.<br>4. Người dùng mở Xem nội dung để kiểm tra manifest, dependency, phiên bản và lịch sử áp dụng.<br>5. Hệ thống hiển thị đúng hành động theo quyền: Tạo mẫu, Tạo phiên bản, Áp dụng, Sao chép, Lưu trữ, Khôi phục hoặc Xóa bản nháp chưa từng dùng.<br>6. Mẫu ở trạng thái Lưu trữ chỉ được xem lịch sử/khôi phục, không được áp dụng mới. |
| **Post-condition** | Danh sách/chi tiết Mẫu được hiển thị theo đúng tổ chức và quyền. Việc xem không thay đổi Mẫu hoặc cấu hình Page. |
| **Luồng thay thế** | AF-1: Chưa có Mẫu → hiển thị empty state và CTA Tạo mẫu.<br>AF-2: Không có kết quả → giữ nguyên bộ lọc, hiển thị No result và nút Xóa bộ lọc.<br>AF-3: Mất quyền trong lúc mở → trả Access denied, không để lộ manifest qua UI/API.<br>AF-4: Dữ liệu danh sách lỗi → hiển thị trạng thái lỗi có Retry; không hiển thị dữ liệu cache của tổ chức khác. |
| **Sub-flow** | SF-1: Xem nội dung và dependency theo FR-TPL-004. SF-2: Phiên bản/lịch sử theo FR-TPL-009. |
| **Giao diện hệ thống** | UI-TPL-01 Danh sách Mẫu; UI-TPL-02 Chi tiết Mẫu; có Loading, Empty, No result, Error và phân trang. |
| **Yêu cầu phi chức năng** | NFR-TPL-01: tải danh sách ≤ 3 giây P95 với 1.000 Mẫu/tổ chức. NFR-TPL-02: phân quyền phía server, tenant isolation và audit. NFR-TPL-03: tìm kiếm không phân biệt hoa/thường và khoảng trắng thừa. |
| **AC tương ứng** | `AC-TPL-001-01`, `AC-TPL-001-02`, `AC-TPL-001-03` |
| **BR tương ứng** | `BR-TPL-001`, `BR-TPL-002`, `BR-TPL-003`, `BR-TPL-004` |

### 1.2. FR-TPL-002: Tạo mẫu từ trang nguồn

| Thuộc tính | Nội dung |
|---|---|
| **Mô tả** | Cho phép người dùng khởi tạo Mẫu từ cấu hình hiện có của một Page nguồn. Page nguồn chỉ được đọc; thao tác tạo Mẫu không sửa hoặc xuất bản cấu hình nguồn. |
| **Đối tượng liên quan** | Admin/Quản lý AntBot có quyền Tạo Mẫu và quyền đọc cấu hình Page nguồn. |
| **Pre-conditions** | Page nguồn thuộc cùng tổ chức, đã kết nối và người dùng có quyền đọc cấu hình Page. |
| **Điều kiện kích hoạt** | Tại danh sách Mẫu, người dùng bấm Tạo mẫu. |
| **Luồng xử lý chính** | 1. Hệ thống mở wizard và yêu cầu chọn đúng một Page nguồn.<br>2. Hiển thị tên Page, kênh, trạng thái kết nối và thời điểm cấu hình được đọc gần nhất.<br>3. Người dùng nhập tên Mẫu bắt buộc (1–100 ký tự) và mô tả không bắt buộc (tối đa 500 ký tự).<br>4. Hệ thống chuẩn hóa tên bằng trim/collapse khoảng trắng và so sánh không phân biệt hoa thường trong tổ chức.<br>5. Khi thông tin hợp lệ, hệ thống tạo/lưu Mẫu DRAFT và chuyển sang bước Chọn nội dung.<br>6. Page nguồn và các Page khác không thay đổi. |
| **Post-condition** | Có Mẫu DRAFT gắn với Page/kênh nguồn, người tạo và thời điểm khởi tạo; chưa có cấu hình nào được áp dụng sang Page đích. |
| **Luồng thay thế** | AF-1: Page mất kết nối hoặc người dùng mất quyền → chặn tiếp tục, nêu rõ lý do.<br>AF-2: Tên rỗng/trùng/quá dài → lỗi inline, giữ dữ liệu đã nhập.<br>AF-3: Page không có cấu hình thuộc phạm vi hỗ trợ → cho xem empty state nhưng không cho hoàn tất Mẫu rỗng.<br>AF-4: Đổi Page nguồn sau khi đã chọn nội dung → yêu cầu xác nhận; nếu đồng ý thì xóa toàn bộ lựa chọn/dependency cũ. |
| **Sub-flow** | SF-1: Chọn nội dung theo FR-TPL-003. SF-2: Tự lưu bản nháp khi chuyển bước hoặc đóng wizard. |
| **Giao diện hệ thống** | UI-TPL-03 Wizard bước 1 — Trang nguồn & thông tin Mẫu; lỗi hiển thị cạnh đúng trường. |
| **Yêu cầu phi chức năng** | NFR-TPL-02: xác thực quyền tại server và audit người tạo. NFR-TPL-04: lưu DRAFT ≤ 2 giây P95; chống double-submit. |
| **AC tương ứng** | `AC-TPL-002-01`, `AC-TPL-002-02`, `AC-TPL-002-03` |
| **BR tương ứng** | `BR-TPL-005`, `BR-TPL-006`, `BR-TPL-007`, `BR-TPL-008` |

### 1.3. FR-TPL-003: Chọn thành phần và phạm vi đóng gói

| Thuộc tính | Nội dung |
|---|---|
| **Mô tả** | Cho phép người dùng chọn chính xác các cấu hình cần đóng gói. Hệ thống không mặc định sao chép toàn bộ Automation của Page nguồn. |
| **Đối tượng liên quan** | Admin/Quản lý AntBot; dịch vụ đọc cấu hình Page nguồn. |
| **Pre-conditions** | Mẫu DRAFT có Page nguồn hợp lệ; người dùng có quyền đọc từng cấu hình được chọn. |
| **Điều kiện kích hoạt** | Người dùng vào bước Chọn nội dung hoặc chỉnh sửa manifest của Mẫu DRAFT. |
| **Luồng xử lý chính** | 1. Hệ thống liệt kê theo nhóm: Menu, FAQ, Tin nhắn mở đầu, Tin nhắn mặc định, Từ khóa, Luồng tin nhắn, Kịch bản chăm sóc và Quy luật.<br>2. Thẻ, Trường tùy chỉnh, Opt-in, media và tài nguyên liên quan chỉ xuất hiện khi một cấu hình tham chiếu đến chúng.<br>3. Ban đầu không tự chọn tất cả; người dùng chọn từng mục, chọn cả nhóm hoặc bỏ chọn.<br>4. Panel manifest cập nhật ngay số lượng và tên mục đã chọn theo từng nhóm.<br>5. Hệ thống ghi nhận quan hệ tham chiếu để kiểm tra tại FR-TPL-004.<br>6. Người dùng lưu lựa chọn vào DRAFT; bản chụp nội dung chỉ được cố định khi hoàn tất phiên bản. |
| **Post-condition** | DRAFT lưu danh sách mục đã chọn; Page nguồn không thay đổi và chưa có Page đích nào bị ghi dữ liệu. |
| **Luồng thay thế** | AF-1: Bỏ mục đang là dependency bắt buộc → đánh dấu mục phụ thuộc lỗi và chặn hoàn tất.<br>AF-2: Cấu hình nguồn thay đổi/xóa trong lúc chọn → báo stale data và yêu cầu tải lại trước khi lưu.<br>AF-3: Mục ngoài phạm vi hoặc chứa secret/token → vô hiệu hóa và giải thích.<br>AF-4: Người dùng không còn quyền đọc một mục → bỏ mục khỏi lựa chọn và ghi audit. |
| **Sub-flow** | SF-1: Chọn tất cả/bỏ chọn tất cả chỉ tác động các mục người dùng có quyền. SF-2: Kiểm tra dependency theo FR-TPL-004. |
| **Giao diện hệ thống** | UI-TPL-04 Bộ chọn nội dung hai cột; UI-TPL-05 Manifest cập nhật thời gian thực. |
| **Yêu cầu phi chức năng** | NFR-TPL-04: lưu lựa chọn ≤ 2 giây P95. NFR-TPL-02: chỉ trả dữ liệu người dùng được phép đọc. NFR-TPL-05: hỗ trợ tối thiểu 500 thành phần mà không khóa UI quá 100 ms. |
| **AC tương ứng** | `AC-TPL-003-01`, `AC-TPL-003-02`, `AC-TPL-003-03` |
| **BR tương ứng** | `BR-TPL-009`, `BR-TPL-010`, `BR-TPL-011` |

### 1.4. FR-TPL-004: Kiểm tra phụ thuộc và xem nội dung mẫu

| Thuộc tính | Nội dung |
|---|---|
| **Mô tả** | Cho phép kiểm tra manifest và đồ thị phụ thuộc trước khi hoàn tất Mẫu. Xem nội dung là xem cấu hình tĩnh, không phải chạy thử chatbot. |
| **Đối tượng liên quan** | Admin/Quản lý AntBot; dịch vụ kiểm tra tham chiếu và capability. |
| **Pre-conditions** | Mẫu DRAFT có ít nhất một thành phần được chọn. |
| **Điều kiện kích hoạt** | Người dùng bấm Kiểm tra liên kết hoặc thay đổi lựa chọn ở FR-TPL-003. |
| **Luồng xử lý chính** | 1. Hiển thị manifest theo nhóm, số lượng và chi tiết từng mục.<br>2. Dựng đồ thị tham chiếu cho Menu/FAQ/Keyword/Rule/Sequence/Flow và tài nguyên phụ thuộc.<br>3. Phân loại dependency: bắt buộc, có thể ánh xạ ở Page đích hoặc không được phép đóng gói.<br>4. Với dependency thiếu, hiển thị đường dẫn tham chiếu và cho chọn “Thêm vào Mẫu” hoặc “Bỏ mục phụ thuộc”; không tự thêm âm thầm.<br>5. Chặn Hoàn tất nếu còn broken reference, mục nguồn đã bị xóa hoặc dependency không được xử lý.<br>6. Khi hợp lệ, lưu manifest/dependency graph cùng content hash của bản chụp. |
| **Post-condition** | Manifest phản ánh đúng snapshot; Mẫu chỉ chuyển bước khi đồ thị dependency khép kín hoặc có kế hoạch ánh xạ hợp lệ. |
| **Luồng thay thế** | AF-1: Dependency có thể dùng tài nguyên sẵn có ở đích → giữ logical key và yêu cầu ánh xạ tại FR-TPL-006.<br>AF-2: Có vòng tham chiếu hợp lệ → lưu graph nhưng vẫn áp dụng loop guard runtime.<br>AF-3: Nguồn đổi sau khi kiểm tra → đánh dấu snapshot stale; người dùng chọn Chụp lại hoặc giữ snapshot cũ có version rõ ràng.<br>AF-4: Media đã hết hạn/không truy cập được → chặn phiên bản READY. |
| **Sub-flow** | SF-1: Xuất manifest và danh sách dependency lỗi cho kiểm toán nội bộ. |
| **Giao diện hệ thống** | UI-TPL-05 Manifest; UI-TPL-06 Dependency checker với đường dẫn From → Needs → Resolution. |
| **Yêu cầu phi chức năng** | NFR-TPL-06: kiểm tra ≤ 10 giây P95 với 500 node/2.000 edge. NFR-TPL-02: audit mọi quyết định thêm/bỏ dependency. |
| **AC tương ứng** | `AC-TPL-004-01`, `AC-TPL-004-02`, `AC-TPL-004-03` |
| **BR tương ứng** | `BR-TPL-012`, `BR-TPL-013`, `BR-TPL-014` |

### 1.5. FR-TPL-005: Hoàn tất phiên bản và phân quyền sử dụng

| Thuộc tính | Nội dung |
|---|---|
| **Mô tả** | Hoàn tất một phiên bản Mẫu bất biến và cấu hình quyền xem, áp dụng, sao chép hoặc tạo phiên bản mới trong tổ chức. |
| **Đối tượng liên quan** | Chủ sở hữu Mẫu; Admin/Quản lý AntBot; người/nhóm được cấp quyền. |
| **Pre-conditions** | DRAFT có manifest hợp lệ, dependency không còn lỗi chặn và người dùng có quyền Hoàn tất. |
| **Điều kiện kích hoạt** | Người dùng bấm Hoàn tất tạo mẫu. |
| **Luồng xử lý chính** | 1. Hệ thống hiển thị lại tên, mô tả, nguồn, manifest, dependency và cảnh báo dữ liệu nhạy cảm.<br>2. Người dùng chọn phạm vi: riêng tư hoặc chia sẻ cho người/nhóm trong cùng tổ chức.<br>3. Cấp độc lập các quyền View, Apply, Copy và Create version; chủ sở hữu/Admin luôn có quyền quản trị theo policy tổ chức.<br>4. Hệ thống chụp snapshot bất biến, tạo version number tăng dần và chuyển phiên bản sang READY.<br>5. Trạng thái runtime của nguồn (Published/Active) không được kích hoạt theo Mẫu; đây chỉ là metadata tham khảo nếu cần audit.<br>6. Hoàn tất Mẫu không tự áp dụng lên Page nào. |
| **Post-condition** | Có phiên bản READY bất biến và ACL rõ ràng; không thay đổi Page nguồn/đích. |
| **Luồng thay thế** | AF-1: Cấp quyền cho người ngoài tổ chức → từ chối.<br>AF-2: Quyền/nguồn thay đổi trước khi hoàn tất → chặn và chạy kiểm tra lại.<br>AF-3: Link nội bộ được mở bởi người không có quyền → Access denied; link không thay thế ACL.<br>AF-4: Trùng thao tác hoàn tất → idempotency bảo đảm chỉ tạo một version. |
| **Sub-flow** | SF-1: Thu hồi quyền không đảo ngược cấu hình đã áp dụng trước đó. |
| **Giao diện hệ thống** | UI-TPL-07 Review & Complete; UI-TPL-08 Quản lý quyền. |
| **Yêu cầu phi chức năng** | NFR-TPL-02: ACL bắt buộc phía server và audit. NFR-TPL-07: snapshot mã hóa khi lưu; không lộ nội dung qua URL chia sẻ. |
| **AC tương ứng** | `AC-TPL-005-01`, `AC-TPL-005-02`, `AC-TPL-005-03` |
| **BR tương ứng** | `BR-TPL-015`, `BR-TPL-016`, `BR-TPL-017` |

### 1.6. FR-TPL-006: Chọn trang đích và xem trước tác động

| Thuộc tính | Nội dung |
|---|---|
| **Mô tả** | Cho phép chọn Page đích và tạo kế hoạch áp dụng trước khi ghi dữ liệu. Màn so sánh thể hiện “Hiện tại trên Page” và “Kết quả dự kiến sau áp dụng”, không coi trạng thái runtime trong snapshot là trạng thái của Mẫu. |
| **Đối tượng liên quan** | Người có quyền Apply Mẫu và quyền ghi cấu hình trên từng Page đích. |
| **Pre-conditions** | Phiên bản Mẫu READY; Page đích cùng tổ chức, đã kết nối và người dùng có quyền ghi. |
| **Điều kiện kích hoạt** | Người dùng bấm Sử dụng/Áp dụng mẫu. |
| **Luồng xử lý chính** | 1. Người dùng chọn một hoặc nhiều Page đích; Page thuộc nhóm đồng bộ phải được nhận diện đúng scope cấu hình dùng chung.<br>2. Hệ thống đọc capability của từng kênh và snapshot hiện tại của từng Page/scope.<br>3. Với mỗi mục, hệ thống xác định đề xuất: KEEP (không ghi), REUSE (ánh xạ tài nguyên tương thích sẵn có), CREATE, UPDATE_AS_DRAFT hoặc UNSUPPORTED.<br>4. Người dùng mở nút View để so sánh chi tiết nội dung hiện tại với nội dung/kết quả dự kiến.<br>5. Cột hiện tại hiển thị trạng thái thật Published/Draft/Active/Inactive; cột Mẫu ghi “Sẽ tạo/cập nhật dưới dạng Draft/Inactive”, không hiển thị nhầm trạng thái nguồn.<br>6. Thay thế Menu mặc định hoặc cấu hình đang chạy phải được chọn rõ và xác nhận; mặc định là KEEP.<br>7. Hệ thống kiểm tra dependency sau từng quyết định và lập kế hoạch riêng cho từng Page; chưa ghi dữ liệu. |
| **Post-condition** | Mỗi Page/scope có application plan kèm snapshot revision, quyết định xung đột và cảnh báo; cấu hình thực tế chưa đổi. |
| **Luồng thay thế** | AF-1: Kênh không hỗ trợ mục → UNSUPPORTED và chặn mục phụ thuộc nếu gây broken reference.<br>AF-2: Mất quyền/mất kết nối → loại Page khỏi kế hoạch, không ảnh hưởng Page khác.<br>AF-3: Page thuộc nhóm auto-sync → cảnh báo phạm vi ảnh hưởng toàn nhóm và dùng group scope.<br>AF-4: Mẫu Archived hoặc version không còn Apply permission → chặn mở/xác nhận kế hoạch. |
| **Sub-flow** | SF-1: View comparison cho từng mục. SF-2: Chọn quyết định xung đột và ánh xạ dependency. |
| **Giao diện hệ thống** | UI-TPL-09 Chọn Page đích; UI-TPL-10 Application plan; UI-TPL-11 Compare current vs expected. |
| **Yêu cầu phi chức năng** | NFR-TPL-06: phân tích một Page ≤ 10 giây P95 với 500 mục. NFR-TPL-02: quyền ghi kiểm tra phía server. NFR-TPL-08: compare phải accessible bằng chuột và bàn phím. |
| **AC tương ứng** | `AC-TPL-006-01`, `AC-TPL-006-02`, `AC-TPL-006-03`, `AC-TPL-006-04` |
| **BR tương ứng** | `BR-TPL-018`, `BR-TPL-019`, `BR-TPL-020`, `BR-TPL-021` |

### 1.7. FR-TPL-007: Áp dụng mẫu vào trang đích

| Thuộc tính | Nội dung |
|---|---|
| **Mô tả** | Thực thi application plan đã xác nhận, tạo ID riêng tại Page đích và nối lại toàn bộ tham chiếu mà không kích hoạt cấu hình mới. |
| **Đối tượng liên quan** | Người có quyền Apply; dịch vụ sao chép cấu hình, transaction, capability và audit. |
| **Pre-conditions** | Plan FR-TPL-006 hợp lệ; Mẫu READY; quyền, kết nối và revision Page vẫn còn hiệu lực. |
| **Điều kiện kích hoạt** | Người dùng xác nhận kế hoạch và bấm Áp dụng. |
| **Luồng xử lý chính** | 1. Kiểm tra lại Mẫu, quyền, capability, kết nối và revision của từng Page/scope ngay trước khi chạy.<br>2. Tạo idempotency key cho mỗi Template version + target scope + request.<br>3. Tạo backup/transaction boundary; xử lý theo dependency order: resource nền → media/message/flow → menu/FAQ/keyword/sequence/rule.<br>4. Mỗi mục CREATE có ID mới tại đích; REUSE dùng ID đích; toàn bộ reference được remap sang ID đích.<br>5. UPDATE_AS_DRAFT chỉ cập nhật bản nháp/version mới, không ghi đè bản Published đang phục vụ khách.<br>6. Menu/FAQ/message ở Draft; Keyword/Sequence/Rule và Welcome/Default Message ở Inactive sau áp dụng.<br>7. Ghi Application Run và kết quả từng mục; hiển thị liên kết mở cấu hình đích. |
| **Post-condition** | Page thành công có cấu hình/link đúng ở trạng thái an toàn. Page nguồn, Template snapshot và hội thoại đang chạy không đổi. |
| **Luồng thay thế** | AF-1: Revision đích đổi sau preview → dừng Page đó và yêu cầu preview lại.<br>AF-2: Lỗi giữa chừng → rollback toàn bộ thay đổi của target scope; Page khác đã thành công không bị rollback.<br>AF-3: Request trùng/retry → trả lại kết quả cũ, không tạo bản sao thứ hai.<br>AF-4: Dependency remap thất bại → đánh dấu FAILED, rollback và ghi đường dẫn reference lỗi.<br>AF-5: Page thuộc group auto-sync → ghi đúng group scope một lần, không tạo cấu hình Page riêng bị che khuất. |
| **Sub-flow** | SF-1: Application Run lưu created/reused/kept/updated/skipped/failed, ID mapping, người chạy và thời gian. |
| **Giao diện hệ thống** | UI-TPL-12 Tiến trình và kết quả áp dụng theo Page/scope; không cho double-click tạo request trùng. |
| **Yêu cầu phi chức năng** | NFR-TPL-09: nguyên tử trên từng target scope hoặc rollback tương đương. NFR-TPL-10: idempotent retry. NFR-TPL-02: audit đầy đủ, không log secret. |
| **AC tương ứng** | `AC-TPL-007-01`, `AC-TPL-007-02`, `AC-TPL-007-03`, `AC-TPL-007-04` |
| **BR tương ứng** | `BR-TPL-022`, `BR-TPL-023`, `BR-TPL-024`, `BR-TPL-025`, `BR-TPL-026` |

### 1.8. FR-TPL-008: Kiểm tra và xuất bản cấu hình sau áp dụng

| Thuộc tính | Nội dung |
|---|---|
| **Mô tả** | Cho phép kiểm tra và chủ động Publish/Activate từng cấu hình sau khi áp dụng Mẫu. Chỉ bước này mới làm cấu hình tác động tới khách hàng. |
| **Đối tượng liên quan** | Người có quyền Publish/Activate trên Page đích. |
| **Pre-conditions** | Application Run thành công hoặc có các mục thành công độc lập; cấu hình mới ở Draft/Inactive. |
| **Điều kiện kích hoạt** | Từ kết quả áp dụng hoặc lịch sử Run, người dùng bấm Mở cấu hình/Checklist xuất bản. |
| **Luồng xử lý chính** | 1. Hiển thị checklist các mục vừa áp dụng, trạng thái hiện tại và dependency.<br>2. Chạy validation nội dung bắt buộc, reference, channel capability và xung đột trigger.<br>3. Người dùng chọn từng mục cần Publish/Activate; hệ thống hiển thị phạm vi ảnh hưởng.<br>4. Publish theo dependency order; chỉ mục được chọn và hợp lệ mới hoạt động.<br>5. Cập nhật Application Run với kết quả publish từng mục, người thực hiện và thời gian.<br>6. Các mục không chọn hoặc lỗi vẫn Draft/Inactive và không tác động khách. |
| **Post-condition** | Chỉ cấu hình Publish/Active thành công mới phục vụ khách; phần còn lại an toàn ở Draft/Inactive. |
| **Luồng thay thế** | AF-1: Connector từ chối publish → giữ Draft/Inactive, hiển thị lỗi và Retry.<br>AF-2: Thiếu dependency/xung đột → chặn nhóm liên quan, không kích hoạt một phần gây broken flow.<br>AF-3: Rời màn hình → tiếp tục checklist từ Application Run.<br>AF-4: Chọn khôi phục trước publish → phục hồi backup của FR-TPL-007 và đóng Run là ROLLED_BACK. |
| **Sub-flow** | SF-1: Test sandbox bằng tài khoản kiểm thử; không dùng khách thật nếu chưa có quyền. SF-2: Khôi phục backup trước publish. |
| **Giao diện hệ thống** | UI-TPL-13 Post-apply checklist; UI-TPL-14 Publish result và Activity log. |
| **Yêu cầu phi chức năng** | NFR-TPL-02: quyền/audit. NFR-TPL-11: lỗi publish không kích hoạt cấu hình lỗi; thông báo kết quả trong ≤ 5 giây sau phản hồi connector. |
| **AC tương ứng** | `AC-TPL-008-01`, `AC-TPL-008-02`, `AC-TPL-008-03` |
| **BR tương ứng** | `BR-TPL-027`, `BR-TPL-028`, `BR-TPL-029` |

### 1.9. FR-TPL-009: Phiên bản, lịch sử áp dụng và vòng đời mẫu

| Thuộc tính | Nội dung |
|---|---|
| **Mô tả** | Cho phép truy vết phiên bản, Application Run, kết quả publish; tạo phiên bản mới, lưu trữ hoặc khôi phục Mẫu. |
| **Đối tượng liên quan** | Chủ sở hữu Mẫu; Admin/Quản lý AntBot; người có quyền Create version/Audit. |
| **Pre-conditions** | Mẫu tồn tại và người dùng có quyền tương ứng. |
| **Điều kiện kích hoạt** | Mở Chi tiết Mẫu → Phiên bản/Lịch sử hoặc chọn Tạo phiên bản mới/Lưu trữ/Khôi phục. |
| **Luồng xử lý chính** | 1. Hiển thị version number, source snapshot time, content hash, người tạo, manifest và diff với phiên bản trước.<br>2. Muốn thay đổi READY phải tạo DRAFT version mới; version cũ giữ nguyên.<br>3. Lịch sử Run hiển thị version, target scope, plan decision, ID mapping, kết quả apply/publish/rollback, người thực hiện và thời gian.<br>4. Lưu trữ Mẫu ngăn Apply mới nhưng không xóa cấu hình đã triển khai.<br>5. Khôi phục Mẫu cho phép Apply lại version READY hiện hành theo quyền.<br>6. Thay đổi Mẫu/Page nguồn không tự cập nhật các Page đã áp dụng. |
| **Post-condition** | Mọi lần áp dụng có thể truy vết đến version và kết quả; Page đã áp dụng không tự đổi theo version mới. |
| **Luồng thay thế** | AF-1: Page nguồn bị xóa/mất quyền → vẫn xem snapshot theo ACL Mẫu, không thể chụp lại nguồn.<br>AF-2: Mẫu đang được dùng → Archive chỉ chặn Run mới, không xóa dữ liệu đích.<br>AF-3: Apply version Archived → chặn cả UI/API.<br>AF-4: Xóa Mẫu → chỉ cho xóa DRAFT chưa có Run; Mẫu có history dùng Archive. |
| **Sub-flow** | SF-1: Export audit nếu role được phép. SF-2: Mở lại post-apply checklist từ một Run. |
| **Giao diện hệ thống** | UI-TPL-15 Version history/diff; UI-TPL-16 Application Run history; UI-TPL-02 Detail. |
| **Yêu cầu phi chức năng** | NFR-TPL-02: audit append-only và quyền xem. NFR-TPL-12: snapshot READY/content hash không thay đổi. NFR-TPL-13: lịch sử giữ theo retention policy tổ chức. |
| **AC tương ứng** | `AC-TPL-009-01`, `AC-TPL-009-02`, `AC-TPL-009-03`, `AC-TPL-009-04` |
| **BR tương ứng** | `BR-TPL-030`, `BR-TPL-031`, `BR-TPL-032`, `BR-TPL-033` |

## 2. Acceptance Criteria (AC)

Các AC dưới đây là tiêu chí nghiệm thu chi tiết và có thể chuyển trực tiếp thành test case.

### 2.1. AC cho FR-TPL-001 — Xem và quản lý danh sách mẫu

| Mã AC | Nội dung chi tiết |
|---|---|
| `AC-TPL-001-01` | Given có Mẫu Active/Archived; When lọc Archived; Then chỉ hiện Mẫu Archived và nút Áp dụng bị khóa |
| `AC-TPL-001-02` | Given người dùng chỉ có quyền Xem; When mở chi tiết; Then xem được manifest nhưng không có hành động Áp dụng/Sửa |
| `AC-TPL-001-03` | Given không có kết quả; When xóa bộ lọc; Then danh sách mặc định được phục hồi mà không tải lại trang |

### 2.2. AC cho FR-TPL-002 — Tạo mẫu từ trang nguồn

| Mã AC | Nội dung chi tiết |
|---|---|
| `AC-TPL-002-01` | Given có quyền đọc Page A; When nhập tên hợp lệ; Then tạo DRAFT gắn Page A và không đổi cấu hình Page A/B |
| `AC-TPL-002-02` | Given đã có tên “Chăm sóc VIP”; When nhập “  chăm sóc   vip ”; Then báo trùng tên |
| `AC-TPL-002-03` | Given đã chọn nội dung; When đổi nguồn; Then chỉ xóa lựa chọn sau xác nhận |

### 2.3. AC cho FR-TPL-003 — Chọn thành phần và phạm vi đóng gói

| Mã AC | Nội dung chi tiết |
|---|---|
| `AC-TPL-003-01` | Given Page có 3 Menu, 10 Flow, 5 Tag; When chọn 1 Menu, 2 Flow, 1 Tag; Then manifest chỉ chứa đúng 4 mục đó và dependency được liệt kê riêng |
| `AC-TPL-003-02` | Given chọn riêng Default Message; When hoàn tất lựa chọn; Then Mẫu có thể không chứa Menu/Welcome và preview không lỗi |
| `AC-TPL-003-03` | Given mục chứa access token; Then token không xuất hiện trong manifest hoặc snapshot |

### 2.4. AC cho FR-TPL-004 — Kiểm tra phụ thuộc và xem nội dung mẫu

| Mã AC | Nội dung chi tiết |
|---|---|
| `AC-TPL-004-01` | Given Menu gọi Flow X; When chọn Menu nhưng bỏ X; Then hiển thị đúng đường dẫn và chặn hoàn tất |
| `AC-TPL-004-02` | When bấm Thêm X; Then lỗi biến mất và manifest tăng đúng 1 mục |
| `AC-TPL-004-03` | Given nguồn đổi sau kiểm tra; Then không dùng snapshot mới âm thầm và yêu cầu người dùng quyết định |

### 2.5. AC cho FR-TPL-005 — Hoàn tất phiên bản và phân quyền sử dụng

| Mã AC | Nội dung chi tiết |
|---|---|
| `AC-TPL-005-01` | Given manifest hợp lệ; When hoàn tất; Then tạo đúng một version READY và snapshot không đổi khi nguồn đổi |
| `AC-TPL-005-02` | Given người B chỉ có View; When gọi Apply qua UI/API; Then bị chặn |
| `AC-TPL-005-03` | Given nguồn có Rule Active; When hoàn tất; Then snapshot không mang quyền tự kích hoạt Rule ở đích |

### 2.6. AC cho FR-TPL-006 — Chọn trang đích và xem trước tác động

| Mã AC | Nội dung chi tiết |
|---|---|
| `AC-TPL-006-01` | Given Page có Menu mặc định Published; When mở plan; Then quyết định mặc định KEEP và chưa ghi dữ liệu |
| `AC-TPL-006-02` | When bấm View; Then hiển thị hai cột current/expected và nút không bị disabled/lỗi JS |
| `AC-TPL-006-03` | Given template item có status Draft từ nguồn; Then cột Mẫu ghi “Sẽ áp dụng dạng Draft”, không mô tả đó là trạng thái đang chạy |
| `AC-TPL-006-04` | Given Page thuộc nhóm auto-sync; Then plan nêu rõ toàn nhóm bị ảnh hưởng |

### 2.7. AC cho FR-TPL-007 — Áp dụng mẫu vào trang đích

| Mã AC | Nội dung chi tiết |
|---|---|
| `AC-TPL-007-01` | Given Flow X dùng Tag VIP; When áp dụng vào B; Then Flow B trỏ Tag VIP của B, không trỏ ID nguồn |
| `AC-TPL-007-02` | Given lỗi ở mục giữa; Then không còn dữ liệu áp dụng dở trên target scope |
| `AC-TPL-007-03` | Given gửi lại cùng idempotency key; Then không tăng số mục và trả cùng Run |
| `AC-TPL-007-04` | Given target thuộc auto-sync group; Then cấu hình được đọc thấy khi mở mọi Page thành viên |

### 2.8. AC cho FR-TPL-008 — Kiểm tra và xuất bản cấu hình sau áp dụng

| Mã AC | Nội dung chi tiết |
|---|---|
| `AC-TPL-008-01` | Given Menu Draft và Rule Inactive; When chỉ Publish Menu; Then Menu hoạt động, Rule không chạy |
| `AC-TPL-008-02` | Given connector lỗi; Then giữ trạng thái an toàn và cho Retry |
| `AC-TPL-008-03` | Given chưa publish; When khách tương tác; Then vẫn nhận cấu hình Published cũ |

### 2.9. AC cho FR-TPL-009 — Phiên bản, lịch sử áp dụng và vòng đời mẫu

| Mã AC | Nội dung chi tiết |
|---|---|
| `AC-TPL-009-01` | Given B đã áp dụng v1; When tạo v2; Then B vẫn giữ v1 đến khi có Run v2 |
| `AC-TPL-009-02` | Given Mẫu Archived; When Apply qua API; Then bị chặn và không tạo Run |
| `AC-TPL-009-03` | Given Run thành công; Then history truy ra version, target, quyết định, ID mapping và publish result |
| `AC-TPL-009-04` | Given DRAFT chưa từng dùng; Then được xóa; READY/có Run chỉ được Archive |

## 3. Business Rules (BR)

Các BR dưới đây là quy tắc nghiệp vụ bắt buộc áp dụng thống nhất cho UI, API, persistence và runtime.

### 3.1. BR cho FR-TPL-001 — Xem và quản lý danh sách mẫu

| Mã BR | Nội dung chi tiết |
|---|---|
| `BR-TPL-001` | Mẫu thuộc đúng một tổ chức; dữ liệu không được truy cập chéo tenant |
| `BR-TPL-002` | trạng thái Mẫu gồm DRAFT, READY, ARCHIVED |
| `BR-TPL-003` | Mẫu ARCHIVED không thể áp dụng mới |
| `BR-TPL-004` | Mẫu hệ thống chỉ đọc; người dùng phải Sao chép nếu muốn tùy biến |

### 3.2. BR cho FR-TPL-002 — Tạo mẫu từ trang nguồn

| Mã BR | Nội dung chi tiết |
|---|---|
| `BR-TPL-005` | Một phiên bản Mẫu có đúng một Page nguồn |
| `BR-TPL-006` | tên Mẫu duy nhất trong tổ chức sau chuẩn hóa |
| `BR-TPL-007` | không hoàn tất Mẫu rỗng |
| `BR-TPL-008` | tạo Mẫu không thay đổi trạng thái/runtime của Page nguồn |

### 3.3. BR cho FR-TPL-003 — Chọn thành phần và phạm vi đóng gói

| Mã BR | Nội dung chi tiết |
|---|---|
| `BR-TPL-009` | Chỉ đóng gói mục được chọn và dependency đã xác nhận |
| `BR-TPL-010` | không đóng gói NLU/training data, khách hàng/session, phân công agent, default skill, connection credential, webhook secret hoặc báo cáo |
| `BR-TPL-011` | trạng thái Published/Active của nguồn không phải nội dung có thể tái sử dụng |

### 3.4. BR cho FR-TPL-004 — Kiểm tra phụ thuộc và xem nội dung mẫu

| Mã BR | Nội dung chi tiết |
|---|---|
| `BR-TPL-012` | READY không được chứa broken reference |
| `BR-TPL-013` | hệ thống không âm thầm thêm dependency |
| `BR-TPL-014` | mỗi phiên bản lưu immutable snapshot, manifest, dependency graph và content hash |

### 3.5. BR cho FR-TPL-005 — Hoàn tất phiên bản và phân quyền sử dụng

| Mã BR | Nội dung chi tiết |
|---|---|
| `BR-TPL-015` | phiên bản READY bất biến; sửa nội dung phải tạo version mới |
| `BR-TPL-016` | link chia sẻ không thay ACL |
| `BR-TPL-017` | Template status và component runtime status là hai miền trạng thái độc lập |

### 3.6. BR cho FR-TPL-006 — Chọn trang đích và xem trước tác động

| Mã BR | Nội dung chi tiết |
|---|---|
| `BR-TPL-018` | không tự ghi đè cấu hình đang chạy |
| `BR-TPL-019` | mỗi Page có plan riêng |
| `BR-TPL-020` | UNSUPPORTED không được âm thầm chuyển đổi |
| `BR-TPL-021` | trạng thái hiển thị ở phía Mẫu là expected target state, không phải source runtime state |

### 3.7. BR cho FR-TPL-007 — Áp dụng mẫu vào trang đích

| Mã BR | Nội dung chi tiết |
|---|---|
| `BR-TPL-022` | ID và reference phải thuộc target scope |
| `BR-TPL-023` | áp dụng không đồng nghĩa xuất bản/kích hoạt |
| `BR-TPL-024` | transaction tách theo target scope |
| `BR-TPL-025` | retry không nhân đôi |
| `BR-TPL-026` | backup gần nhất phải khôi phục được trước khi publish |

### 3.8. BR cho FR-TPL-008 — Kiểm tra và xuất bản cấu hình sau áp dụng

| Mã BR | Nội dung chi tiết |
|---|---|
| `BR-TPL-027` | Apply và Publish là hai bước tách biệt |
| `BR-TPL-028` | Published version cũ tiếp tục phục vụ đến khi bản mới publish thành công |
| `BR-TPL-029` | không dùng dữ liệu khách thật cho sandbox nếu thiếu quyền |

### 3.9. BR cho FR-TPL-009 — Phiên bản, lịch sử áp dụng và vòng đời mẫu

| Mã BR | Nội dung chi tiết |
|---|---|
| `BR-TPL-030` | READY bất biến; version number tăng tuần tự trong Mẫu |
| `BR-TPL-031` | không tự đồng bộ Template/source → target |
| `BR-TPL-032` | history phải truy vết version và target scope |
| `BR-TPL-033` | chỉ DRAFT chưa có Run được xóa vĩnh viễn |
