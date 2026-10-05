# BẢNG TỔNG HỢP 15 TÍNH NĂNG AUTOMATION (ĐỌC HIỂU TRONG 3 PHÚT)

> **Mục tiêu**: Tóm tắt toàn bộ 15 tính năng tự động hóa bằng ngôn ngữ **dễ hiểu, thực tế, bớt lý thuyết hàn lâm**, giúp cả BA, Dev và Tester đọc là hiểu ngay cách làm.

---

## 1. Bảng Tra Cứu Nhanh 15 Tính Năng

| Mã | Tên Tính Năng | Nói Đơn Giản Là Làm Gì? | Bot Chạy Khi Nào? | Dev Cần Nhớ Gì Khi Code? |
|---|---|---|---|---|
| **FR-001** | **Menu chính** | Thanh menu bấm góc dưới khung chat | Khách mở khung chat Messenger/Zalo | Tối đa 20 nút. Có 1 Menu mặc định (không được xóa) + nhiều Menu riêng cho từng khách. Nút có thể đổi menu khách. |
| **FR-002** | **Câu hỏi gợi ý (FAQ)** | Các nút câu hỏi nổi lên khi mở chat | Khách mở chat lần đầu | Tối đa 4 nút. Bấm nút nào bot trả lời câu đó. Bấm nút FAQ không chạy từ khóa, không gửi tin mặc định. |
| **FR-003** | **Lời chào khách mới** | Bot gửi lời chào khi khách mở phiên chat | Khách nhắn tin câu đầu tiên (phiên mới) | Chỉ gửi đúng 1 lần/phiên. Nếu câu đầu tiên của khách đã khớp Từ khóa thì bot trả lời Từ khóa, không chào đè. |
| **FR-004** | **Tin khi bot không hiểu** | Gửi tin xin lỗi/hướng dẫn khi bot bí | Khách nói câu lạ bot không hiểu | Có bộ chặn spam (Rate limit 15 phút): khách nhắn 5 câu bot không hiểu liên tiếp thì bot chỉ gửi tin này đúng 1 lần. |
| **FR-005** | **Bắt từ khóa trả lời** | Khách gõ từ khóa ➔ trả lời theo mẫu | Khách gõ đúng từ (giá, tư vấn, shop ở đâu) | Hỗ trợ: Khớp chính xác (`EXACT`) hoặc Chứa từ (`CONTAINS`). Từ khóa dài hơn được ưu tiên hơn từ khóa ngắn. |
| **FR-006** | **Luồng hội thoại (Flow Builder)** | Tạo kịch bản hội thoại nhiều bước, có rẽ nhánh theo lựa chọn khách | Khách bấm nút Menu / nút trong tin nhắn gắn action "Chạy Flow" | **Khác Kịch bản chăm sóc**: Flow rẽ nhánh tức thì theo lựa chọn; Kịch bản chăm sóc gửi tin theo thời gian. Tối đa 30 bước/Flow. Vòng lặp bị ngắt ở cấp 5. |
| **FR-007** | **Quản lý thẻ nhãn (Customer Tagging)** | Gắn nhãn phân loại khách (VIP, Đã mua, Quan tâm...) để lọc và phân khúc | Bot tự gắn khi chạy Flow/Quy luật; Admin gắn thủ công | Tag dùng làm bộ lọc cho Broadcast (FR-013) và điều kiện cho Quy luật (FR-009). Tối đa 50 tag/khách. Xóa tag cần xác nhận vì ảnh hưởng toàn bộ khách đang có tag đó. |
| **FR-008** | **Kịch bản nuôi dưỡng (Drip)** | Gửi tin sau 1 ngày, 3 ngày, 7 ngày... | Khách được đưa vào kịch bản (Enroll) | Chỉ gửi từ 08:30 đến 18:00 (đến hạn ban đêm thì dời sang sáng hôm sau). Khách đã mua hàng thì tự động dừng kịch bản. |
| **FR-009** | **Quy luật tự động (Rules)** | Nếu có sự kiện A ➔ Tự động làm việc B | Dữ liệu khách đổi (để lại SĐT, bấm nút) | Chạy tức thì: KHI có sự kiện ➔ NẾU đúng điều kiện ➔ THÌ chạy hành động. Giới hạn ngắt ở cấp 5 chống lặp vô tận. |
| **FR-010** | **Soạn tin nhắn & Nút bấm** | Trình soạn nội dung dùng chung | Mọi nơi cần gửi tin nhắn hoặc gắn nút | Chữ tối đa 640 ký tự; Nút tối đa 20 ký tự. Có 8 loại hành động: gửi tin, chạy flow, mở link, gắn thẻ, đổi menu... |
| **FR-011** | **Form hỏi đáp lấy SĐT/Email** | Bot hỏi từng câu: Tên ➔ SĐT ➔ Email | Khi chạy luồng kịch bản thu thập Lead | Tự kiểm tra đúng định dạng SĐT. Nhập sai bắt nhập lại (tối đa 3 lần). Đúng thì tự động lưu vào hồ sơ khách hàng. |
| **FR-012** | **Chuyển cho nhân viên** | Chuyển sang người thật chat, bot im lặng | Khách bấm "Gặp nhân viên" hoặc bot bí | Gán cờ `isBotMuted = true` để bot không nói chen vào nhân viên. Nhân viên bấm "Đóng chat" thì bot tự bật lại. |
| **FR-013** | **Gửi tin nhắn hàng loạt** | Bắn tin nhắn ưu đãi đến tệp khách cũ | Admin bấm gửi chiến dịch Broadcast | Lọc khách theo thẻ tag (ví dụ: tag `Da_Mua_Hang`). Phải kiểm tra gửi trong 24h hoặc gửi qua tin Zalo ZNS có phí. |
| **FR-014** | **Xin quyền nhận tin (Opt-in)** | Xin phép khách gửi tin khuyến mãi | Khách bấm nút nhận tin ưu đãi | Khách bấm đồng ý ➔ Lưu token. Nhờ có token này mới được gửi tin ngoài 24h hợp lệ mà không bị Facebook khóa page. |
| **FR-015** | **Báo cáo & Đếm số liệu** | Thống kê hiệu quả chuyển đổi | Khách tương tác thật trên fanpage | Đếm theo khách hàng duy nhất (1 người bấm nút 10 lần chỉ tính 1 click). Khung xem thử (Preview) không sinh số liệu. |

---

## 2. Khi Khách Nhắn Tin Vào Thì Bot Chạy Cái Gì Trước? (Luồng Điều Phối)

Đây là câu hỏi quan trọng nhất cho Developer Backend. Thứ tự ưu tiên của bot diễn ra như sau:

```
[Khách gửi tin nhắn / Bấm nút]
              │
              ▼
[1. Khách bấm nút Menu hoặc FAQ?] ──(Đúng)──> Chạy hành động của nút đó luôn (Ưu tiên số 1)
              │ (Không)
              ▼
[2. Khách đang trả lời câu hỏi lấy SĐT/Email của Form?] ──(Đúng)──> Kiểm tra đúng số ➔ Lưu CRM ➔ Hỏi câu tiếp
              │ (Không)
              ▼
[3. Khách gõ câu có chứa Từ khóa đã cài?] ──(Đúng)──> Trả lời ngay theo Từ khóa
              │ (Không)
              ▼
[4. Khách mới nhắn tin lần đầu (Phiên mới)?] ──(Đúng)──> Gửi Lời chào mở đầu
              │ (Không)
              ▼
[5. Bot không hiểu khách nói gì?] ──> Kiểm tra: Nếu 15 phút qua chưa gửi tin báo lỗi ➔ Gửi Tin mặc định (Fallback).
```

---

## 3. Phân Biệt Các Tính Năng Hay Bị Nhầm Lẫn

1. **[FR-006] Luồng hội thoại** vs **[FR-008] Kịch bản theo lịch** vs **[FR-009] Quy luật tự động**:
   - *Luồng hội thoại*: Khách **bấm nút** ➔ Bot đi theo đúng nhánh được chọn (tức thì, theo tương tác).
   - *Kịch bản theo lịch*: Bot tự động gửi tin **theo mốc thời gian** (sau 1 ngày, 3 ngày...) dù khách không làm gì.
   - *Quy luật tự động*: Hệ thống phản ứng **tức thì khi có sự kiện hệ thống** (khách vừa để lại SĐT ➔ lập tức gắn tag VIP).

2. **[FR-008] Kịch bản theo lịch** vs **[FR-009] Quy luật tự động**:
   - *Kịch bản theo lịch*: Chạy theo **thời gian dài hạn** (sau 1 ngày gửi tin A, sau 3 ngày gửi mã giảm giá B).
   - *Quy luật*: Chạy **ngay lập tức trong 0.1 giây** khi có sự kiện (khách vừa cho số điện thoại ➔ lập tức gắn tag VIP và chia số cho nhân viên sale gọi điện).

2. **[FR-005] Bắt từ khóa** vs **[FR-011] Form hỏi đáp**:
   - *Từ khóa*: Khách hỏi 1 câu ➔ Bot trả lời 1 câu là xong (hỏi giá ➔ báo giá).
   - *Form hỏi đáp*: Cuộc trò chuyện nhiều bước để xin thông tin (Bot hỏi tên ➔ Khách trả lời ➔ Bot hỏi tiếp SĐT ➔ Khách cho số).

3. **[FR-006] Trả lời comment** vs **[FR-007] Ẩn comment**:
   - *Trả lời comment*: Giữ tương tác công khai và kéo khách vào inbox riêng.
   - *Ẩn comment*: Bảo vệ thông tin khách hàng (SĐT) để đối thủ không nhìn thấy cướp đơn.
