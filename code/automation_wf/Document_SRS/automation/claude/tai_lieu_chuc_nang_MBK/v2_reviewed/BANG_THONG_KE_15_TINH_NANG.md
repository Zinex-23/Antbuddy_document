# BẢNG THỐNG KÊ 15 TÍNH NĂNG AUTOMATION — Phiên bản V2

> ✅ Đã review và xác nhận đúng phạm vi. Đọc hiểu trong 3 phút.

---

## 1. Bảng tra cứu nhanh 15 tính năng

| Mã | Tên tính năng | Bot làm gì? | Khi nào kích hoạt? | Dev cần nhớ khi code |
|---|---|---|---|---|
| **FR-001** | **Menu chính** | Thanh nút cố định ở đáy khung chat | Khách mở chat | Tối đa 20 nút. 1 Menu mặc định (không xóa). Nút có thể đổi menu cho riêng từng khách. |
| **FR-002** | **Câu hỏi gợi ý (FAQ)** | Các nút câu hỏi nổi lên khi mở chat lần đầu | Khách mở chat lần đầu | Tối đa 4 nút, 80 ký tự/nút. Bấm FAQ **không** qua từ khóa, **không** gửi fallback. |
| **FR-003** | **Lời chào khách mới** | Bot gửi câu chào khi phiên chat mới bắt đầu | Câu đầu tiên trong phiên mới | Gửi đúng 1 lần/phiên. Nếu câu đầu khớp từ khóa → ưu tiên từ khóa, không chào đè. |
| **FR-004** | **Tin khi bot không hiểu** | Gửi tin hướng dẫn khi bot bí | Khách gõ câu lạ bot không nhận ra | Rate limit: gửi tối đa 1 lần trong X phút (mặc định 15p), không spam khách. |
| **FR-005** | **Bắt từ khóa trả lời** | Khách gõ từ → Bot trả lời theo mẫu cài sẵn | Tin nhắn có chứa từ khóa đang BẬT | Ưu tiên: Khớp chính xác > Chứa từ; Từ dài > Từ ngắn. Không phân biệt hoa thường. |
| **FR-006** | **Luồng hội thoại** | Dẫn khách đi từng bước, rẽ nhánh theo nút bấm | Khách bấm nút gắn "Chạy Flow" | Khác Drip (lịch) và Rules (sự kiện). Tối đa 30 bước/Flow. Ngắt vòng lặp ở cấp 5. |
| **FR-007** | **Quản lý thẻ nhãn** | Gắn nhãn phân loại khách (VIP, Đã mua...) | Bot gắn khi chạy Flow/Rules; Admin gắn thủ công | Tag là nền tảng cho Broadcast (FR-013), Drip (FR-008) và Rules (FR-009). Max 50 tag/khách. |
| **FR-008** | **Kịch bản chăm sóc** | Gửi tin sau 1 ngày, 3 ngày, 7 ngày... | Khách được đưa vào kịch bản | Chỉ gửi 08:30–18:00, dời sang sáng nếu đến hạn ban đêm. Dừng khi khách có tag điều kiện thoát. |
| **FR-009** | **Quy luật tự động** | KHI sự kiện A → NẾU điều kiện B → THÌ làm C | Phát sinh sự kiện hệ thống phù hợp | Chạy tức thì trong ~100ms. Ngắt chuỗi kích hoạt chéo ở cấp 5 chống vòng lặp. |
| **FR-010** | **Soạn tin & Nút bấm** | Trình soạn tin dùng chung cho toàn bộ hệ thống | Mọi FR cần soạn nội dung | **Shared component** — không phải màn hình riêng. Chữ ≤ 640 ký tự, nút ≤ 20 ký tự, carousel ≤ 10 thẻ. |
| **FR-011** | **Form hỏi đáp lấy SĐT** | Bot hỏi từng câu: Tên → SĐT → Email | Khi Flow chạy đến bước "Thu thập thông tin" | Validate SĐT (10 số, đầu 03/05/07/08/09). Sai 3 lần → dừng, chuyển nhân viên. |
| **FR-012** | **Chuyển cho nhân viên** | Bot im lặng, chuyển sang người thật chat | Khách bấm "Gặp nhân viên" | Gán `isBotMuted = true` → tắt toàn bộ từ khóa, lời chào, fallback. Nhân viên bấm đóng → bot bật lại. |
| **FR-013** | **Gửi tin hàng loạt** | Bắn tin khuyến mãi đến tệp khách cũ | Admin tạo chiến dịch Broadcast | Lọc theo tag. Gửi tối đa 20 tin/giây (rate limit). Tuân thủ chính sách 24h Facebook. |
| **FR-014** | **Xin quyền Opt-in** | Xin phép khách để gửi tin hợp lệ ngoài 24h | Khách bấm nút đăng ký nhận tin | Token hợp lệ → được gửi tin định kỳ (Weekly/Monthly) mà không vi phạm chính sách Meta. |
| **FR-015** | **Báo cáo & Số liệu** | Thống kê số lượt gửi, đọc, bấm nút | Khách tương tác thật | Đếm theo Unique Customer (1 người bấm 10 lần = 1 click). Preview không sinh số liệu. |

---

## 2. Phân nhóm theo mục đích

```
┌─────────────────────────────────────────────────────────┐
│  ĐIỀU HƯỚNG           FR-001 Menu chính                 │
│  (Navigation)         FR-002 Câu hỏi gợi ý (FAQ)        │
├─────────────────────────────────────────────────────────┤
│  PHẢN HỒI TỰ ĐỘNG    FR-003 Lời chào khách mới          │
│  (Auto Reply)         FR-004 Tin khi bot không hiểu     │
│                       FR-005 Bắt từ khóa trả lời        │
├─────────────────────────────────────────────────────────┤
│  KỊCH BẢN & LUỒNG    FR-006 Luồng hội thoại (Flow)      │
│  (Flows & Drip)       FR-008 Kịch bản chăm sóc theo lịch│
│                       FR-009 Quy luật tự động (Rules)   │
├─────────────────────────────────────────────────────────┤
│  DỮ LIỆU & CÔNG CỤ   FR-007 Quản lý thẻ nhãn (Tag)     │
│  (Data & Tools)       FR-010 Soạn tin nhắn [SHARED]     │
│                       FR-011 Form thu thập SĐT/Email    │
├─────────────────────────────────────────────────────────┤
│  MARKETING & VẬN HÀNH FR-012 Chuyển cho nhân viên       │
│  (Ops & Marketing)    FR-013 Gửi tin hàng loạt          │
│                       FR-014 Xin quyền Opt-in           │
│                       FR-015 Báo cáo & Số liệu          │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Thứ tự ưu tiên xử lý khi khách nhắn tin

```
[Khách gửi tin nhắn vào hộp thư Messenger/Zalo]
        │
        ▼
[1] Bot có bị Mute (FR-012)? → Có: Bot im lặng hoàn toàn
        │ Không
        ▼
[2] Khách đang chờ trả lời Form (FR-011)? → Có: Validate SĐT/Email → Lưu CRM → Hỏi tiếp
        │ Không
        ▼
[3] Khách bấm nút Menu/FAQ (FR-001, 002)? → Có: Chạy hành động nút đó
        │ Không
        ▼
[4] Tin nhắn khớp Từ khóa BẬT (FR-005)? → Có: Trả lời ngay theo từ khóa
        │ Không
        ▼
[5] Phiên mới + Lời chào đang BẬT (FR-003)? → Có: Gửi lời chào
        │ Không
        ▼
[6] Fallback đang BẬT + chưa gửi trong X phút (FR-004)? → Có: Gửi tin mặc định
        │ Không
        ▼
[Bot im lặng — không làm gì]
```

**Lưu ý quan trọng cho dev Backend:**
- Bước [1] (Mute) phải kiểm tra trước tất cả — không thể bỏ sót
- Bước [2] (Form) phải kiểm tra trước Từ khóa vì khách đang nhập SĐT có thể gõ số trùng với từ khóa
- Bước [3] (nút bấm) thường đến từ postback event, khác với text message event — cần phân biệt loại event

---

## 4. Ma trận phụ thuộc giữa các FR

| FR | Phụ thuộc vào | Được dùng bởi |
|---|---|---|
| FR-001 (Menu) | FR-010 (Composer) | FR-015 (Analytics) |
| FR-002 (FAQ) | FR-010 (Composer) | FR-015 (Analytics) |
| FR-003 (Lời chào) | FR-010 (Composer) | FR-015 (Analytics) |
| FR-004 (Fallback) | FR-010 (Composer) | FR-015 (Analytics) |
| FR-005 (Từ khóa) | FR-010 (Composer) | FR-015 (Analytics) |
| FR-006 (Flow) | FR-010 (Composer), FR-011 (Form), FR-012 (Handover) | FR-001, 009 (khi gọi Flow) |
| **FR-007 (Tag)** | — | **FR-008, 009, 013** (dùng tag làm bộ lọc/điều kiện) |
| FR-008 (Drip) | FR-007 (Tag), FR-010 (Composer), FR-014 (Opt-in token) | FR-009 (khi Enroll) |
| FR-009 (Rules) | FR-007 (Tag) | FR-006, 007, 008, 012 |
| **FR-010 (Composer)** | — | **FR-001, 002, 003, 004, 005, 006, 008, 013** |
| FR-011 (Form) | — | FR-006 (là 1 bước trong Flow) |
| FR-012 (Handover) | — | FR-006, 009 (có thể kích hoạt) |
| FR-013 (Broadcast) | **FR-007 (Tag)**, FR-010 (Composer), FR-014 (Opt-in token) | FR-015 (Analytics) |
| FR-014 (Opt-in) | — | FR-008, 013 (gửi ngoài 24h) |
| FR-015 (Analytics) | — | — (điểm cuối, không có FR nào phụ thuộc) |

---

## 5. Những điểm dễ nhầm lẫn nhất

| Nhầm lẫn hay gặp | Thực tế đúng |
|---|---|
| FR-006 Flow và FR-008 Drip là 1 thứ | Flow = rẽ nhánh theo tương tác tức thì. Drip = gửi theo lịch thời gian dài hạn |
| FR-009 Rules có thể thay Flow | Rules phản ứng theo sự kiện hệ thống (tag thêm, SĐT cập nhật). Flow là kịch bản hội thoại theo lượt bấm của khách |
| FR-013 Broadcast gửi được cho tất cả khách | Chỉ gửi được cho khách trong 24h (tin thường) hoặc khách có Opt-in token FR-014 (ngoài 24h) |
| FR-011 Form là tính năng độc lập | Form là 1 bước **trong** Flow (FR-006), không tự chạy một mình |
| Preview trên Mobile Preview tính vào số liệu FR-015 | Preview **không bao giờ** được tính vào số liệu thật |
| Bot vẫn trả lời khi đang có nhân viên chat | Khi `isBotMuted = true`, bot im lặng hoàn toàn — FR-003, 004, 005 đều bị tắt với khách đó |
