# TÀI LIỆU CHỨC NĂNG AUTOMATION — Phiên bản V2 (Đã Review)

> **Trạng thái:** ✅ Đã review toàn bộ 15 FR. Loại bỏ 2 FR sai phạm vi, thay bằng 2 FR đúng.  
> **Ngày cập nhật:** 2026-10-05  
> **Người review:** Antigravity + Zinex  

---

## Tại sao có phiên bản V2?

Trong V1, FR-006 và FR-007 được lấy cảm hứng từ **Botcake** nhưng vô tình đưa vào 2 tính năng **quản lý bình luận bài post Facebook** — không thuộc phạm vi messaging bot:

| FR cũ (V1 — Sai phạm vi) | FR mới (V2 — Đúng phạm vi) |
|---|---|
| FR-006: Tự động trả lời comment bài post | ✅ FR-006: Luồng hội thoại (Flow Builder) |
| FR-007: Ẩn comment chứa SĐT | ✅ FR-007: Quản lý thẻ nhãn khách hàng |

**Lý do:** AntBuddy Automation xử lý sự kiện trên **Messaging Webhook** (khách nhắn tin). Comment bài post chạy trên **Comment Webhook** — 2 luồng hoàn toàn tách biệt, khác API, khác database, khác nghiệp vụ.

---

## Danh mục 15 FR (Phiên bản V2 — Đã xác nhận đúng phạm vi)

| Mã | Tên chức năng | Nhóm | File chi tiết |
|---|---|---|---|
| **FR-001** | Menu chính (Persistent Menu) | Điều hướng | [FR_AUT_001](../FR_AUT_001_MENU_CHINH.md) |
| **FR-002** | Câu hỏi gợi ý (FAQ Chips) | Điều hướng | [FR_AUT_002](../FR_AUT_002_CAU_HOI_THUONG_GAP.md) |
| **FR-003** | Lời chào khách mới (Welcome Message) | Phản hồi tự động | [FR_AUT_003](../FR_AUT_003_LOI_CHAO_KHACH_MOI.md) |
| **FR-004** | Tin khi bot không hiểu (Fallback) | Phản hồi tự động | [FR_AUT_004](../FR_AUT_004_TIN_NHAN_MAC_DINH_FALLBACK.md) |
| **FR-005** | Bắt từ khóa trả lời (Keyword Reply) | Phản hồi tự động | [FR_AUT_005](../FR_AUT_005_BAT_TU_KHOA_TRA_LOI.md) |
| **FR-006** | Luồng hội thoại (Flow Builder) ✅ **Mới** | Kịch bản | [FR_AUT_006](../FR_AUT_006_LUONG_HOI_THOAI.md) |
| **FR-007** | Quản lý thẻ nhãn (Customer Tagging) ✅ **Mới** | CRM | [FR_AUT_007](../FR_AUT_007_QUAN_LY_NHAN.md) |
| **FR-008** | Kịch bản chăm sóc theo lịch (Drip) | Kịch bản | [FR_AUT_008](../FR_AUT_008_KICH_BAN_CHAM_SOC_THEO_LICH.md) |
| **FR-009** | Quy luật tự động (Trigger-Action) | Tự động hóa | [FR_AUT_009](../FR_AUT_009_QUY_LUAT_TU_DONG_THEO_SU_KIEN.md) |
| **FR-010** | Soạn tin nhắn & Nút bấm (Composer) | Công cụ dùng chung | [FR_AUT_010](../FR_AUT_010_SOAN_TIN_NHAN_VA_NUT_BAM.md) |
| **FR-011** | Form hỏi đáp lấy SĐT/Email (Lead Form) | Thu thập dữ liệu | [FR_AUT_011](../FR_AUT_011_FORM_THU_THAP_THONG_TIN.md) |
| **FR-012** | Chuyển cho nhân viên (Live Chat Handover) | Vận hành | [FR_AUT_012](../FR_AUT_012_CHUYEN_CHO_NHAN_VIEN.md) |
| **FR-013** | Gửi tin hàng loạt (Broadcast) | Marketing | [FR_AUT_013](../FR_AUT_013_GUI_TIN_NHAN_HANG_LOAT.md) |
| **FR-014** | Xin quyền nhận tin ngoài 24h (Opt-in) | Marketing | [FR_AUT_014](../FR_AUT_014_XIN_QUYEN_NHAN_TIN_OPT_IN.md) |
| **FR-015** | Báo cáo & Đếm số liệu (Analytics) | Đo lường | [FR_AUT_015](../FR_AUT_015_BAO_CAO_VA_SO_LIEU.md) |

---

## Sơ đồ phụ thuộc giữa các FR

```
FR-010 (Composer)
    └─► Dùng bởi: FR-001, 002, 003, 004, 005, 006, 008, 013

FR-007 (Tag)
    └─► Dùng bởi: FR-008 (điều kiện dừng), FR-009 (điều kiện/hành động), FR-013 (bộ lọc)

FR-014 (Opt-in Token)
    └─► Dùng bởi: FR-008 (gửi ngoài 24h), FR-013 (gửi cho tệp opt-in)

FR-006 (Flow)
    └─► Có thể gọi: FR-007 (gắn tag), FR-011 (form lead), FR-012 (handover)

FR-009 (Rule Engine)
    └─► Có thể kích hoạt: FR-006 (chạy flow), FR-007 (gắn tag), FR-008 (enroll drip), FR-012 (handover)

FR-015 (Analytics)
    └─► Đọc số liệu từ: FR-001, 002, 003, 004, 005, 006, 008, 013
```

---

## Nhóm chức năng theo mục đích

### 🟦 Nhóm 1 — Điều hướng trong chat (2 FR)
- **FR-001** Menu chính: Thanh nút ở đáy khung chat
- **FR-002** Câu hỏi gợi ý: Nút nổi khi mở chat lần đầu

### 🟩 Nhóm 2 — Phản hồi tự động khi khách nhắn tin (3 FR)
- **FR-003** Lời chào: Gửi 1 lần khi phiên mới bắt đầu
- **FR-004** Fallback: Gửi khi bot không hiểu (rate limit 15p)
- **FR-005** Từ khóa: Bắt từ trong tin và trả lời đúng mẫu

### 🟨 Nhóm 3 — Kịch bản và luồng hội thoại (3 FR)
- **FR-006** Flow Builder: Hội thoại rẽ nhánh theo lựa chọn
- **FR-008** Drip Sequence: Gửi tin theo mốc thời gian dài hạn
- **FR-009** Rule Engine: Phản ứng tức thì theo sự kiện

### 🟧 Nhóm 4 — Thu thập & Quản lý dữ liệu khách (3 FR)
- **FR-007** Tagging: Phân loại và gắn nhãn khách hàng
- **FR-011** Lead Form: Hỏi đáp lấy SĐT/Email trong chat
- **FR-010** Composer: Soạn tin nhắn và cấu hình nút bấm dùng chung

### 🟥 Nhóm 5 — Marketing & Vận hành (4 FR)
- **FR-012** Handover: Chuyển chat cho nhân viên, bot im lặng
- **FR-013** Broadcast: Bắn tin hàng loạt theo tệp tag
- **FR-014** Opt-in: Xin quyền gửi tin hợp lệ ngoài 24h
- **FR-015** Analytics: Báo cáo theo Unique Customer

---

## Thứ tự ưu tiên xử lý khi khách nhắn tin

```
[Khách gửi tin nhắn]
        │
        ▼
[1] Khách đang trong Form hỏi đáp (FR-011)?
    → Có: Kiểm tra định dạng SĐT/Email → Lưu CRM → Hỏi câu tiếp
        │ Không
        ▼
[2] Khách bấm nút Menu/FAQ (FR-001, 002)?
    → Có: Thực thi hành động của nút đó (không qua các bước dưới)
        │ Không
        ▼
[3] Tin nhắn khớp Từ khóa (FR-005)?
    → Có: Trả lời theo từ khóa
        │ Không
        ▼
[4] Phiên chat mới + Lời chào đang BẬT (FR-003)?
    → Có: Gửi lời chào
        │ Không
        ▼
[5] Fallback đang BẬT + chưa gửi trong X phút (FR-004)?
    → Có: Gửi tin mặc định
        │ Không
        ▼
[Bot im lặng]
```
