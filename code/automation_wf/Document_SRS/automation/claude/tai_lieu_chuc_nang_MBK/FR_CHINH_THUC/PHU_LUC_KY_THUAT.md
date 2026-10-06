# Phụ lục kỹ thuật Automation

Tài liệu này giữ các chi tiết triển khai đã được tách khỏi bảng FR để tài liệu nghiệp vụ dễ đọc. Các tên cấu trúc, sự kiện và cơ chế dưới đây là yêu cầu/đề xuất kỹ thuật của Antbot, không phải bằng chứng rằng Botcake đang triển khai giống hệt. Các điểm chưa được Product phê duyệt vẫn phải đối chiếu [Danh sách cần xác nhận](CAN_XAC_NHAN.md).

## Nguyên tắc dùng chung

- Mọi dữ liệu phải có `tenantId` và `channelId`; API và truy vấn phải ngăn đọc/ghi chéo doanh nghiệp hoặc kênh.
- Các quyền nền tảng gồm `VIEW_AUTOMATION`, `MANAGE_AUTOMATION`, `PUBLISH_AUTOMATION`, `VIEW_ANALYTICS`, `EXPORT_ANALYTICS`. UI có thể ẩn/khóa thao tác nhưng API luôn phải kiểm tra lại.
- Cấu hình có `DRAFT` và `PUBLISHED`; runtime chỉ đọc snapshot `PUBLISHED`. `ACTIVE/INACTIVE` là trạng thái chạy.
- Mọi lệnh ghi dùng `requestId`/idempotency key để chống xử lý trùng và `version` để phát hiện ghi đè đồng thời. Tạo, sửa, xóa, publish, bật/tắt, reset và export có audit log.
- `ContentRef` là tham chiếu nội dung do Composer/Flow quản lý. `ActionRef` có dạng `{type, targetId?, parameters?}` và owner của đối tượng đích kiểm tra tính hợp lệ.
- Sự kiện khách hàng chuẩn: `CustomerEvent {eventId, eventType, tenantId, channelId, customerId, occurredAt, source, correlationId, payload}`. `correlationId` liên kết các bước cùng một lần xử lý; `causationId` liên kết nguyên nhân trực tiếp.
- Tham chiếu bị xóa/ngừng hoạt động làm consumer chuyển `NEEDS_RECONFIGURATION`; hệ thống không tự chọn đối tượng thay thế.
- Preview/test dùng môi trường hoặc cờ riêng, không phát event/fact production.

## FR-AUT-001 — Menu mặc định

- Dữ liệu: `DefaultMenu {id, tenantId, channelId, draftVersion, publishedVersion?, syncStatus, items[]}`; `MenuItem {id, title, order, actionRef}`. Unique key `(tenantId, channelId)` bảo đảm mỗi kênh một cấu hình.
- Giới hạn item/title lấy từ `channelCapabilities`, không hard-code chung.
- Publish tạo snapshot bất biến, sync connector; chỉ chuyển `PUBLISHED` và phát `default_menu.published` khi sync thành công. Retry dùng lại snapshot/request ID.
- Resolver hỏi FR-AUT-002 trước; không có assignment hợp lệ mới trả Menu mặc định published. Có thể cache nhưng phải bảo đảm không trả phiên bản chưa sync.
- Click xác thực item thuộc published version, phát `menu.clicked` và `action.requested`; chống trùng bằng `eventId`.

## FR-AUT-002 — Menu tùy chỉnh

- Dữ liệu: `CustomMenu {id, channelId, name, versions, status, items[]}` và `CustomerMenuAssignment {customerId, channelId, menuId, assignedAt, source, correlationId}`.
- Unique constraint bảo đảm tối đa một assignment hiệu lực trên `customerId + channelId`.
- `assignMenu` thực hiện atomic upsert; `unassignMenu` xóa assignment. Cùng `requestId` không tạo audit/event lần hai. Phát `customer_menu.assigned` hoặc `customer_menu.unassigned` sau commit.
- Xóa menu chạy transaction/job: gỡ assignment, archive menu và đánh dấu consumer `NEEDS_RECONFIGURATION`. Job lớn có checkpoint, retry và báo cáo.
- Resolver p95 ≤ 100 ms từ cache; cần invalidation để bảo đảm read-after-write sau gán/gỡ.

## FR-AUT-003 — Câu hỏi thường gặp

- Owner quản lý `FAQItem`, thứ tự và click event; số lượng/độ dài lấy từ capability của kênh.
- Publish tạo snapshot và sync connector; chỉ activate sau khi sync thành công.
- Click phát `faq.clicked` và `action.requested`; structured payload không đi qua Keyword matcher. Chống replay bằng `eventId`.
- Payload không thuộc published version hiện tại được ghi stale/security log và không chạy action. Target hỏng sau publish ghi `FAILED_TARGET`.

## FR-AUT-004 — Tin nhắn mở đầu

- Owner quản lý WelcomeConfig và `WelcomeDeliveryAttempt`; unique key logic `(sessionId, publishedVersion)`.
- Trigger nội bộ dự kiến là `conversation.session_started`, nhưng chỉ dùng sau khi Product xác nhận định nghĩa session.
- Trước gửi tạo attempt `PENDING`; callback cập nhật `SENT/DELIVERED/READ/FAILED/SKIPPED`. Retry/reconcile dùng cùng attempt và idempotency key của connector.
- Trạng thái bỏ qua gồm config tắt/chưa publish, sai audience và `SKIPPED_HANDOVER`.
- Trace theo `sessionId`, `eventId`, `correlationId`; không log giá trị cá nhân hóa nhạy cảm.

## FR-AUT-005 — Từ khóa

- Owner dự kiến quản lý `KeywordRule`, matcher, priority và match result. Chỉ rule `PUBLISHED + ENABLED`, đúng kênh/phạm vi và có response target hợp lệ được đưa vào index.
- Chuẩn hóa một lần bằng trim, case-fold và Unicode theo cấu hình.
- Thuật toán đề xuất đang chờ xác nhận: `EXACT > STARTS_WITH > CONTAINS > REGEX`, sau đó priority số nhỏ hơn, pattern dài hơn, cuối cùng `ruleId` tăng dần. Kết quả phải deterministic.
- Nếu hỗ trợ REGEX: compile khi lưu, giới hạn tài nguyên/timeout và chặn catastrophic backtracking.
- Nếu hỗ trợ CSV: parse, preview lỗi theo dòng, lựa chọn skip/update khi trùng; chỉ tạo draft.
- Unique theo `messageId`; phát `keyword.matched` hoặc `keyword.not_matched`. Chỉ winner phát response; các candidate khác không chạy.

## FR-AUT-006 — Quản lý nhãn

- Owner quản lý Tag catalog và membership. Unique tên sau trim/case-fold trong kênh; unique membership `(customerId, tagId)`.
- Public commands: `assignTag`, `removeTag`. Consumer không ghi trực tiếp bảng membership.
- Gắn nhãn đã có/gỡ nhãn không có trả success idempotent nhưng không phát event. Khi thay đổi thật, event `tag.assigned`/`tag.removed` chỉ phát sau transaction commit, kèm actor/source/correlation ID.
- Xóa chuyển Tag sang `DELETING`, job có checkpoint gỡ membership; consumer chuyển `NEEDS_RECONFIGURATION`. Giữ snapshot tên cho audit/analytics.

## FR-AUT-007 — Kịch bản chăm sóc

- Owner quản lý sequence metadata, step, enrollment, schedule và execution. Enrollment ghim `sequenceVersion`.
- `enroll(customerId, sequenceId)` khử trùng theo request ID; unique một enrollment active trên customer + sequence. `unenroll` chuyển `CANCELLED` và hủy scheduled execution chưa claim.
- Scheduled execution unique `(enrollmentId, stepId)`. Worker kiểm tra lại enrollment/step trước tác động và phải idempotent.
- `dueAt` tính theo timezone database và send window; xử lý DST theo timezone. Timing “sau X” chờ Product xác nhận điểm bắt đầu.
- Condition đọc snapshot khách tại due time; không đạt ghi `SKIPPED_CONDITION`. Mốc cố định đã qua ghi `SKIPPED_PAST_DUE`.
- Lỗi tạm retry có backoff; lỗi vĩnh viễn theo `CONTINUE`/`STOP_ENROLLMENT`. Queue bền vững, DLQ và retry quan sát được.

## FR-AUT-008 — Quy tắc

- Owner quản lý Rule, event subscription, condition evaluation, action orchestration và execution log.
- Trigger catalog khai báo event type/schema; action catalog khai báo command, schema tham số, owner và kiểu lỗi.
- Runtime dedupe theo `(ruleId, eventId, publishedVersion)`. Execution/action command mang `executionId`, `actionId`, `correlationId` và idempotency key.
- Action chạy tuần tự theo `CONTINUE` hoặc `STOP`; kết quả cuối `SUCCEEDED/PARTIAL/FAILED/SKIPPED`.
- Event do action sinh ra giữ `correlationId`/`causationId`. Cùng rule không chạy lại trong cùng chain/customer; chặn khi vượt giới hạn độ sâu.
- Event sai schema đưa vào quarantine/DLQ; action timeout phải hỏi owner bằng idempotency key trước retry. Delivery at-least-once yêu cầu consumer idempotent.

## FR-AUT-009 — Tự động cập nhật User Field

- Owner quản lý `FieldUpdateJob`, mapping, transformation, conflict policy và execution result; schema field thuộc CRM/Profile service.
- Nguồn dự kiến: `EVENT_PAYLOAD`, `CONSTANT`, `EXPRESSION`, `INTEGRATION_RESPONSE`, `CAPTURED_ANSWER`. Phạm vi cần Product xác nhận.
- Pipeline dự kiến: trim, normalize phone/email, parse number/date, map enum, concat, default; không thực thi code tùy ý.
- Empty policy: `SKIP`, `CLEAR`, `USE_DEFAULT`. Conflict policy: `OVERWRITE`, `ONLY_IF_EMPTY`, `KEEP_NEWER`, `REJECT_IF_CHANGED`.
- Transaction policy: `ALL_OR_NOTHING` hoặc `BEST_EFFORT`; command từ Form mặc định all-or-nothing, bulk có thể best-effort.
- Ghi qua API Profile service, không ghi trực tiếp database CRM. Unique xử lý theo idempotency key + customer + job version. `user_field.updated` chỉ phát sau commit và khi old != new.
- Batch có throttling/checkpoint/resume; mỗi customer là một execution. Secret qua secret manager; PII trong log/export được mask hoặc hash theo phân loại.
- Dashboard vận hành cần theo dõi số lần thành công, bỏ qua, thất bại, thử lại và dữ liệu đưa vào DLQ.

## FR-AUT-010 — Thu thập thông tin khách hàng

- Owner quản lý form/question/capture session/attempt; schema và việc ghi field thuộc FR-AUT-009/Profile.
- `startCapture(customerId, formId)` tạo session ghim form version. Unique một capture session `ACTIVE/WAITING` trên customer + channel.
- Chính sách cạnh tranh phiên: `RESUME_EXISTING`, `REJECT`, `CANCEL_AND_RESTART`; mặc định hiện tại là resume cùng form, reject khác form.
- Khi `WAITING`, Router chuyển text/quick reply vào FR-AUT-010 trước Keyword và không fan-out.
- Dedupe theo `messageId`; field-write command mang `captureSessionId` trong correlation chain. Chỉ chuyển câu sau khi write thành công hoặc `SKIPPED` được policy cho phép.
- Timeout tính từ prompt/thao tác cuối, event timeout idempotent. Session kết thúc ở `COMPLETED`, `CANCELLED`, `EXPIRED` hoặc handover; hủy timeout job khi kết thúc.

## FR-AUT-011 — Thống kê

- Ingestion xác thực schema/tenant/channel, loại `PREVIEW/TEST`, dedupe `eventId` và ghi event store bất biến. Event sai schema đưa quarantine/DLQ.
- Processor tạo fact theo metric dictionary. Event đến muộn gắn theo `occurredAt` và timezone kênh. Callback upsert theo event ID/state progression, không hạ trạng thái.
- Unique keys:<br>`targeted_users`: customer + source + version + run.<br>`send_attempts`: delivery attempt ID.<br>`unique_sent/delivered/read/clicked`: customer + source + version.<br>`unique_converted`: customer + source + version + goal.<br>`failed_attempts`: attempt/action execution ID.
- `source` có thể là Menu, FAQ, Welcome, Keyword, Sequence, Rule, User Field Job hoặc Capture Form; không gộp các nguồn khác ngữ nghĩa.
- Attribution: direct correlation trước; nếu không có thì goal + window + model, mặc định đề xuất `LAST_TOUCH`.
- Aggregate eventual-consistent; dashboard/export dùng cùng filter, công thức và freshness watermark. Export lưu `generatedAt`.
- Reset tạo `reportingBaselineAt` theo source/version, không xóa event/fact. Row-level tenant isolation, encryption và audit export/reset.

## FR-AUT-012 — Tin nhắn mặc định

- Owner quản lý `FallbackConfig {tenantId, channelId, enabled, contentRef, cooldownSeconds, versions}`, `FallbackReservation {customerId, channelId, expiresAt, messageId}` và `FallbackAttempt {attemptId, messageId, configVersion, status, reason}`. Config unique tenant + channel.
- Phụ thuộc kỹ thuật: Message Router, NLU/Skill, Composer/Content, Delivery/Connector, Session/Handover state, FR-AUT-005, FR-AUT-010 và FR-AUT-011.
- Trigger kỹ thuật dự kiến `message.unhandled` sau khi mọi handler ưu tiên trả “không xử lý”. Structured click/event nội bộ không tạo trigger.
- Dedupe theo `messageId`. Tạo cooldown reservation nguyên tử trên customer + channel bằng server time/TTL trước khi gửi; skip trong cooldown không gia hạn TTL.
- Attempt bắt đầu `PENDING`; callback cập nhật `SENT/DELIVERED/READ/FAILED`. Retry phải reconcile bằng idempotency key trước khi gửi lại.
- Skip reasons gồm `SKIPPED_CONFIG`, `SKIPPED_COOLDOWN` và các điều kiện handover/capture/policy. Target hỏng làm config `NEEDS_RECONFIGURATION`.
- Queue/attempt bền vững; trace theo `messageId`, `attemptId`, `correlationId`; không log toàn văn tin nhắn ngoài retention policy.
