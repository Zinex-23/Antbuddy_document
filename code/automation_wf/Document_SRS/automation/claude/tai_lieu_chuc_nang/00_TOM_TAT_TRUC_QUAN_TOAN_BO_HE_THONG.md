# BẢN TÓM TẮT TRỰC QUAN HỆ THỐNG AUTOMATION ANTBUTDY (CHUẨN 100% SRS)

> **Căn cứ nghiệp vụ xác thực (Evidence)**:
> - Nguồn tài liệu gốc: `[AntBuddy] SRS AntBot v1.3` (mục 2.2 Luồng C)
> - Đặc tả đã kiểm chứng: [AntBuddy_Automation_FR_AUT_001_007_Verified.md](file:///home/zinex/WORK/AntBuddy/code/automation_wf/AntBuddy_Automation_FR_AUT_001_007_Verified.md)
> - Tài liệu cập nhật UI: [Document_SRS/automation/FR_AUT_001(updated).md](file:///home/zinex/WORK/AntBuddy/code/automation_wf/Document_SRS/automation/FR_AUT_001%28updated%29.md)

---

## 1. Bản Đồ Tổng Thể: Đúng 7 Chức Năng Chính Thức của Module Automation

Trong hệ thống AntBuddy, module Automation có **đúng 7 chức năng chính thức (từ FR-AUT-001 đến FR-AUT-007)**, tương ứng 7 mục trên thanh menu:

```
                          MODULE AUTOMATION (ANTBOT)
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
[GIAO DIỆN KHUNG CHAT]       [PHẢN HỒI TIN NHẮN ĐẾN]       [TỰ ĐỘNG HÓA CHUYÊN SÂU]
  ├─ FR-AUT-001: Menu chính    ├─ FR-AUT-003: Tin mở đầu    ├─ FR-AUT-006: Kịch bản chăm sóc
  └─ FR-AUT-002: FAQ           ├─ FR-AUT-004: Tin mặc định  └─ FR-AUT-007: Quy luật
                               └─ FR-AUT-005: Từ khóa
                                      │
         ┌────────────────────────────┴────────────────────────────┐
         ▼                                                         ▼
[HẠ TẦNG DÙNG CHUNG CỦA AUTOMATION]                     [NGOÀI PHẠM VI AUTOMATION]
  • Quản lý Trang (activePageId) & Kết nối               • Quản lý Luồng Bot: Thuộc FR-BOT / Flow
  • Trình soạn tin & 4 Action chuẩn                      • Chia tin cho nhân viên: Thuộc Luồng phân phối
  • Vòng đời DRAFT / PUBLISHED / ACTIVE                  • Quản lý Mẫu cấu hình: Thuộc FR-TPL
  • Khung thống kê 6 chỉ số trên từng màn
```

---

## 2. Bảng Tra Cứu "10 Giây" Cho 7 Chức Năng Chính

*(Bảng tóm tắt này giúp bạn nắm được bản chất của cả 7 chức năng trong 1 phút)*

| Mã FR | Tên Chức Năng | Route URL | Vai trò trong hệ thống | Quy tắc nghiệp vụ cốt lõi đã chốt trong SRS |
|---|---|---|---|---|
| **FR-AUT-001** | **Menu chính** | `/automation/main-menu` | Tạo thanh menu điều hướng cố định góc dưới khung chat | Mỗi trang có 1 Menu mặc định (không được xóa) + nhiều Menu tùy chỉnh; tối đa 20 mục/menu; có tùy chọn "Chuyển menu sau khi nhấn". |
| **FR-AUT-002** | **Câu hỏi thường gặp** | `/automation/faq` | Tạo các nút bấm gợi ý nổi bật khi khách mở chat | Tối đa 4 câu hỏi; gắn 1 hành động khi bấm; bấm FAQ không kích hoạt từ khóa và không gửi tin mặc định. |
| **FR-AUT-003** | **Tin nhắn mở đầu** | `/automation/welcome-message` | Gửi lời chào tự động khi bắt đầu một phiên mới | Chỉ gửi khi là New Session VÀ công tắc đang BẬT; mỗi phiên gửi tối đa 1 lần; không làm mất tin nhắn đầu tiên của khách. |
| **FR-AUT-004** | **Tin nhắn mặc định** | `/automation/default-message` | Phản hồi dự phòng khi bot không hiểu ý định của khách | Kích hoạt khi không khớp từ khóa và NLU không hiểu; sau khi gửi fallback thì chuyển session về kỹ năng mặc định/hàng đợi. |
| **FR-AUT-005** | **Từ khóa** | `/automation/keywords` | Phản hồi tức thì khi khách gõ đúng từ khóa cài đặt | Khớp từ khóa ➔ Chạy phản hồi gán kèm; nếu trùng nhiều từ khóa thì luật active có ưu tiên cao nhất thắng. |
| **FR-AUT-006** | **Kịch bản chăm sóc** | `/automation/sequences` | Chuỗi tin nhắn gửi theo lịch hẹn (sau X giờ/ngày) | Chạy theo Timezone của Trang; mỗi khách chỉ có 1 enrollment đang chạy trên 1 sequence; hỗ trợ hủy các bước chưa đến hạn. |
| **FR-AUT-007** | **Quy luật** | `/automation/rules` | Tự động hóa dạng: Khi có Sự kiện ➔ Đủ Điều kiện ➔ Chạy Hành động | Điều kiện hỗ trợ ALL/ANY; Action chạy tuần tự; có kiểm tra cooldown và idempotency để chống lặp. |

---

## 3. Bảng Quyết Định Runtime Khi Khách Nhắn Tin (Trích Mục 5.5 SRS Verified)

Khi khách hàng nhắn tin hoặc tương tác, hệ thống AntBuddy xử lý theo đúng bảng quyết định đã được kiểm chứng sau:

| Tình huống thực tế | Hành vi xử lý của hệ thống AntBot | Trạng thái kết thúc |
|---|---|---|
| **Session mới, Tin mở đầu hợp lệ** | Gửi Welcome, nạp Menu & FAQ đã xuất bản, sau đó xử lý tiếp nội dung text của tin đầu tiên. | Chờ khách tương tác tiếp (`WAITING_FOR_CUSTOMER`). |
| **Session mới, Tin mở đầu tắt/lỗi** | Bỏ qua Welcome, vẫn nạp Menu/FAQ và xử lý tin nhắn bình thường. | Không bị chặn. |
| **Khách có `assignedMenuId` hợp lệ** | Hiển thị Menu tùy chỉnh đã gán cho khách đó. | `WAITING_FOR_CUSTOMER`. |
| **Khách chưa được gán menu (hoặc menu gán bị lỗi)** | Hiển thị Menu mặc định của trang. | `WAITING_FOR_CUSTOMER`. |
| **Khách gửi text khớp Từ khóa** | Luật có độ ưu tiên cao nhất thắng ➔ Chạy phản hồi của luật đó. | Dừng xét các bước sau. |
| **Khách gửi text không khớp Từ khóa, NLU hiểu** | Chạy intent/skill routing của bot. | Chuyển luồng hoặc chờ tiếp. |
| **Khách gửi text NLU không hiểu / không có model** | Kích hoạt **Tin nhắn mặc định (Default Message)**, sau đó chuyển về kỹ năng mặc định (`defaultSkillId`) hoặc hàng đợi. | `ROUTED_TO_AGENT` hoặc `QUEUED`. |
| **Tin nhắn mặc định đang TẮT hoặc lỗi** | Không gửi nội dung; ghi log sự kiện nội bộ và chuyển về kỹ năng mặc định/hàng đợi. | `ROUTED_TO_AGENT` hoặc `QUEUED`. |
| **Kịch bản chăm sóc có bước bị Tắt/Lỗi** | Bỏ qua bước lỗi (`SKIPPED`); tính lịch hẹn cho bước tiếp theo. | Enrollment không bị treo. |

---

## 4. Các Thành Phần Dùng Chung Trong Hệ Thống (Shared Elements)

Theo đặc tả của AntBuddy, cả 7 chức năng trên đều chia sẻ chung các thành phần kỹ thuật sau:

1. **Danh mục 4 Hành động chuẩn (`Action Type`)**:
   - `NEW_MESSAGE`: Tạo tin nhắn phản hồi mới.
   - `MESSAGE_FLOW`: Bắt đầu với một luồng bot có sẵn.
   - `OPT_IN`: Đăng ký nhận thông báo Opt-in của kênh.
   - `OPEN_URL`: Mở một liên kết web bên ngoài.
2. **Khung Đo lường Thống kê (Metrics Widget)**:
   - Hiển thị trên Menu chính, Tin mở đầu, Tin mặc định: *Số người dùng, Thành công, Đã đọc, Đã click, Thất bại, KH để lại SĐT*.
3. **Vòng đời Cấu hình**:
   - Menu, FAQ, Welcome, Default Message: Quản lý theo `DRAFT` (Lưu nháp) ➔ `PUBLISHED` (Xuất bản lên kênh).
   - Keyword, Sequence, Rule: Quản lý theo công tắc `ACTIVE` (Đang bật) / `INACTIVE` (Đang tắt).
