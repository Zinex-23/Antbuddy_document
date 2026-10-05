# BỘ TÀI LIỆU ĐẶC TẢ CHỨC NĂNG HỆ THỐNG AUTOMATION (TỰ ĐỘNG HÓA)

Tài liệu này được phân rã theo **Năng lực nghiệp vụ cốt lõi (Capability/Feature-Driven)**, làm cơ sở kiến trúc để đội ngũ sản phẩm phát triển các màn hình, luồng nghiệp vụ (Workflow) và hệ thống Backend/Bot hoàn chỉnh.

---

## 1. Bản đồ Năng lực Hệ thống (Functional Architecture)

Hệ thống Automation không phân chia theo từng nút bấm hay màn hình lẻ, mà được tổ chức thành **6 Miền Năng lực Nghiệp vụ** độc lập và bổ trợ cho nhau:

```
Tài liệu Chức năng Automation
├── [00_TONG_QUAN_VA_DIEU_PHOI.md]                     --> Kiến trúc tổng thể, Quản lý Trang & Pipeline Điều phối
├── [FR_AUT_001_BIEN_TAP_NOI_DUNG_VA_HANH_DONG.md]     --> FR-AUT-001: Trình soạn tin đồ thị, Nút bấm & Catalog Hành động
├── [FR_AUT_002_DIEU_HUONG_KHUNG_CHAT.md]              --> FR-AUT-002: Menu cố định & Nút gợi ý FAQ trên khung chat
├── [FR_AUT_003_DINH_TUYEN_PHAN_HOI_TIN_NHAN.md]       --> FR-AUT-003: Định tuyến tin nhắn (Từ khóa, Lời chào, Fallback)
├── [FR_AUT_004_KICH_BAN_CHAM_SOC.md]                  --> FR-AUT-004: Nuôi dưỡng khách theo lịch (Drip Sequence)
├── [FR_AUT_005_QUY_LUAT_TU_DONG.md]                   --> FR-AUT-005: Bộ máy Quy luật tự động (Rule Engine ECA)
└── [FR_AUT_006_DO_LUONG_HIEU_QUA.md]                  --> FR-AUT-006: Đo lường & Báo cáo chuyển đổi
```

---

## 2. Ma trận Quan hệ giữa Tính năng Nghiệp vụ và Màn hình Giao diện

Bảng dưới đây giải thích cách ánh xạ giữa **Miền Tính Năng cốt lõi trong tài liệu** sang **Giao diện thanh tác vụ (Taskbar / Sidebar)** mà người dùng nhìn thấy:

| Mục trên Sidebar | Miền Tính Năng chịu trách nhiệm chính | Tài liệu đặc tả tương ứng |
|---|---|---|
| **Menu chính** | Giao diện điều hướng cố định trên khung chat của kênh | `FR_AUT_002_DIEU_HUONG_KHUNG_CHAT.md` |
| **Câu hỏi thường gặp** | Nút bấm gợi ý bắt đầu trò chuyện (Conversation Starters) | `FR_AUT_002_DIEU_HUONG_KHUNG_CHAT.md` |
| **Tin nhắn mở đầu** | Định tuyến kích hoạt lời chào khi bắt đầu phiên mới | `FR_AUT_003_DINH_TUYEN_PHAN_HOI_TIN_NHAN.md` |
| **Tin nhắn mặc định** | Xử lý dự phòng (Fallback) khi bot không nhận diện được ý định | `FR_AUT_003_DINH_TUYEN_PHAN_HOI_TIN_NHAN.md` |
| **Từ khoá** | Bộ so khớp từ khóa và phản hồi theo mẫu | `FR_AUT_003_DINH_TUYEN_PHAN_HOI_TIN_NHAN.md` |
| **Kịch bản chăm sóc** | Kịch bản tự động gửi tin nhắn/hành động theo lịch trình | `FR_AUT_004_KICH_BAN_CHAM_SOC.md` |
| **Quy luật** | Bộ máy tự động hóa theo sự kiện (Event-Condition-Action) | `FR_AUT_005_QUY_LUAT_TU_DONG.md` |
| *(Dùng chung mọi nơi)* | Bộ máy soạn thảo nội dung tin nhắn, nút bấm, catalog hành động | `FR_AUT_001_BIEN_TAP_NOI_DUNG_VA_HANH_DONG.md` |
| *(Dùng chung mọi nơi)* | Đo lường số người dùng, tỷ lệ đọc, click, để lại SĐT | `FR_AUT_006_DO_LUONG_HIEU_QUA.md` |

---

## 3. Thứ tự ưu tiên điều phối tin nhắn Inbound (Pipeline Router)

Khi khách hàng gửi một tin nhắn hoặc thực hiện một tương tác vào Fanpage/Zalo OA, Backend xử lý theo đúng thứ tự ưu tiên sau:

```
[Tin nhắn / Tương tác từ Khách hàng]
                 │
                 ▼
 [Bước 1: Chống xử lý trùng lặp (Idempotency)] ──(Trùng ID)──> Bỏ qua (Trả 200 OK)
                 │
                 ▼
 [Bước 2: Sự kiện Bấm nút / Click Postback?]
        ├─ Bấm nút Menu chính          ──> Xử lý Action Menu (`02_DIEU_HUONG_TREN_KHUNG_CHAT.md`)
        └─ Bấm nút Câu hỏi thường gặp  ──> Xử lý Action FAQ (`02_DIEU_HUONG_TREN_KHUNG_CHAT.md`)
                 │ (Nếu là tin nhắn thông thường)
                 ▼
 [Bước 3: Khách đang chờ phản hồi trong Kịch bản?]
        └─ Có bước chờ của Kịch bản chăm sóc ──> Tiếp tục bước kế tiếp (`04_KICH_BAN_CHAM_SOC_THEO_THOI_GIAN.md`)
                 │
                 ▼
 [Bước 4: Kích hoạt Quy luật tự động (Rule Engine)?]
        └─ Khớp Trigger & Điều kiện của Quy luật ──> Chạy chuỗi Action (`05_BO_MAY_QUY_LUAT_TU_DONG.md`)
                 │
                 ▼
 [Bước 5: So khớp Từ khóa (Keyword Matcher)?]
        └─ Khớp từ khóa ưu tiên cao nhất ──> Gửi phản hồi (`03_DINH_TUYEN_VA_PHAN_HOI_TIN_NHAN.md`)
                 │
                 ▼
 [Bước 6: Có phải Tin nhắn đầu tiên của Phiên mới?]
        └─ Bắt đầu New Session & Tin mở đầu đang Bật ──> Gửi Lời chào (`03_DINH_TUYEN_VA_PHAN_HOI_TIN_NHAN.md`)
                 │
                 ▼
 [Bước 7: Xử lý dự phòng cuối cùng (Fallback)]
        └─ Chưa có ai xử lý ──> Kiểm tra tần suất & gửi Tin mặc định (`03_DINH_TUYEN_VA_PHAN_HOI_TIN_NHAN.md`)
```

---

## 4. Cấu trúc chuẩn của mỗi tài liệu chức năng

Mỗi tài liệu trong thư mục này được viết bằng tiếng Việt rõ ràng, mạch lạc, bao gồm 5 phần chính:
1. **Mục đích nghiệp vụ (Tại sao cần tính năng này?)**: Trả lời tính năng giải quyết bài toán gì cho doanh nghiệp.
2. **Quy tắc nghiệp vụ cốt lõi (Business Rules)**: Ràng buộc về dữ liệu, điều kiện áp dụng, cơ chế ngoại lệ.
3. **Luồng xử lý (Workflow & Runtime)**: Cách người dùng cấu hình và cách hệ thống tự động chạy ngầm.
4. **Cấu trúc dữ liệu mẫu (Data Schema / JSON Contract)**: Giúp kỹ sư lập trình hiểu ngay cấu trúc dữ liệu lưu trữ.
5. **Kịch bản kiểm thử nghiệm thu (Acceptance Criteria - AC)**: Các tình huống cần kiểm tra để đảm bảo tính năng chạy đúng.
