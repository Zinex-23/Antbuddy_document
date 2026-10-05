# Hướng dẫn Kỹ thuật Module Automation (Dành cho Developer)

Chào mừng bạn đến với bộ tài liệu đặc tả chức năng (FR) được thiết kế riêng cho **Developer (Frontend, Backend, Tester)**. Bộ tài liệu này tổng hợp toàn diện các yêu cầu nghiệp vụ, luồng xử lý, cấu trúc dữ liệu và API contract giúp bạn **đọc là hiểu ngay cách code và cách test**.

---

## 1. Bản đồ tổng thể các Module (Sitemap)

Module Automation được chia thành **7 tính năng nghiệp vụ chính** và **1 nền tảng dùng chung**:

```
automation/
├── [00_NEN_TANG_DUNG_CHUNG.md]  --> Page Context, Message Composer, Action Catalog, Draft/Publish
├── [01_MENU_CHINH.md]           --> Menu mặc định & Menu tùy chỉnh, chuyển menu khách hàng
├── [02_CAU_HOI_THUONG_GAP.md]   --> 4 câu hỏi gợi ý trong khung chat (FAQ Suggestion Buttons)
├── [03_TIN_NHAN_MO_DAU.md]      --> Tin nhắn chào đón khi khách bắt đầu phiên mới (Welcome Message)
├── [04_TIN_NHAN_MAC_DINH.md]    --> Tin nhắn dự phòng khi bot không hiểu (Default Fallback Message)
├── [05_TU_KHOA_TU_DONG.md]      --> Tự động phản hồi theo từ khóa khách chat (Keyword Matcher)
├── [06_KICH_BAN_CHAM_SOC.md]    --> Chuỗi tin nhắn nuôi dưỡng khách hàng theo lịch (Drip Sequence)
└── [07_QUY_LUAT_TU_DONG.md]     --> Bộ máy tự động hóa Event - Condition - Action (Rule Engine)
```

---

## 2. Thứ tự ưu tiên xử lý tin nhắn Inbound (Router Pipeline)

Một trong những câu hỏi cốt lõi của Dev Backend: **"Khi khách gửi tin nhắn vào fanpage, hệ thống kiểm tra và kích hoạt tính năng nào trước?"**

Dưới đây là sơ đồ luồng quyết định (Pipeline Execution Order) chuẩn mực:

```
[Tin nhắn từ khách / Webhook từ Kênh]
                  │
                  ▼
   [1. Deduplication / Idempotency Check] 
         └─ Trùng eventId/messageId? ──> Bỏ qua (ACK 200 OK)
                  │
                  ▼
   [2. Event là Click Nút / Postback?]
         ├─ Khách bấm Nút Menu        ──> Chạy [01_MENU_CHINH] (Action + Switch Menu)
         └─ Khách bấm Câu hỏi FAQ    ──> Chạy [02_CAU_HOI_THUONG_GAP] (Action chính + bổ sung)
                  │ (Nếu là tin nhắn văn bản thông thường)
                  ▼
   [3. Khách đang trong Bước chờ tương tác của Kịch bản?]
         └─ Đang chờ phản hồi của [06_KICH_BAN_CHAM_SOC] ──> Tiếp tục bước kế tiếp
                  │
                  ▼
   [4. Kích hoạt Quy luật tự động (Rule Engine)?]
         └─ Match Trigger "Tin nhắn mới" & Condition của [07_QUY_LUAT_TU_DONG]
                  │
                  ▼
   [5. So khớp Từ khóa (Keyword Matcher)?]
         └─ Khớp từ khóa ưu tiên cao nhất trong [05_TU_KHOA_TU_DONG] ──> Gửi phản hồi
                  │
                  ▼
   [6. Phiên mới chưa gửi Tin nhắn mở đầu?]
         └─ Là tin nhắn đầu tiên của New Session trong [03_TIN_NHAN_MO_DAU] ──> Gửi Welcome Message
                  │
                  ▼
   [7. Fallback cuối cùng: Tin nhắn mặc định]
         └─ Chưa có ai xử lý ──> Kiểm tra tần suất & gửi [04_TIN_NHAN_MAC_DINH]
```

---

## 3. Cấu trúc chuẩn của mỗi tài liệu FR

Mỗi file trong thư mục này được trình bày theo cấu trúc đồng nhất, gồm 6 phần trọng tâm:

1. **Tổng quan nghiệp vụ (What & Why)**: Tính năng làm gì, giải quyết bài toán gì cho user.
2. **Luồng người dùng & Trạng thái màn hình (UI/UX Flow)**: Từng bước click trên UI, quy tắc hiển thị, validation form.
3. **Luồng xử lý Runtime (Backend / Bot Flow)**: Cách bot kích hoạt, định tuyến, gửi tin và ghi log.
4. **Mô hình Dữ liệu (Entity & Schema DTO)**: Mô tả các trường, kiểu dữ liệu, quan hệ và JSON mẫu.
5. **Quy tắc nghiệp vụ & Xử lý ngoại lệ (Business Rules & Edge Cases)**: Ràng buộc số lượng, ký tự, xung đột dữ liệu, lỗi mạng.
6. **Checklist kiểm thử cho Developer (Self-Test Acceptance Criteria)**: Các kịch bản Happy Path và Edge Cases để Dev tự test trước khi bàn giao.

---

## 4. Bảng tra cứu thuật ngữ kỹ thuật

| Thuật ngữ | Ý nghĩa kỹ thuật | Áp dụng tại |
|---|---|---|
| `activePageId` | ID trang/kênh mà người dùng đang thao tác trên giao diện | Tất cả các màn hình |
| `Draft` (Bản nháp) | Bản ghi cấu hình đang chỉnh sửa trong DB, chưa có hiệu lực với khách | Menu, FAQ, Welcome, Default |
| `Published Snapshot` | Bản ghi cấu hình bất biến (immutable snapshot) mà Runtime dùng để chạy | Menu, FAQ, Welcome, Default |
| `Idempotency Key` | Khóa duy nhất (ví dụ UUID hash từ `channel + messageId + timestamp`) để chống xử lý 2 lần | Webhook, Button Click, Enrollment |
| `Content Graph` | Cấu trúc dữ liệu JSON lưu trữ các khối nội dung, nút bấm và liên kết bước | Soạn tin nhắn, FAQ, Welcome, Kịch bản |
| `Action Payload` | Dữ liệu định nghĩa hành động khi bấm nút (Gửi tin, Gắn thẻ, Chạy flow, Mở web...) | Menu, Nút tin nhắn, Rule |
| `24h Messaging Window` | Chính sách cửa sổ tương tác 24 giờ của Meta/Zalo | Gửi tin trong / ngoài 24h |
