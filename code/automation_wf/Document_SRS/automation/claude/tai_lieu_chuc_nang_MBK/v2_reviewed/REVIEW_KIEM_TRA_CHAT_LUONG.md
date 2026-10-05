# REVIEW TOÀN BỘ 15 FR AUTOMATION — Báo cáo kiểm tra chất lượng

> **Mục tiêu review:** Kiểm tra từng FR có đúng phạm vi messaging bot, đủ thông tin, không mâu thuẫn lẫn nhau và không bịa số liệu không có căn cứ.

---

## Kết quả tổng quan

| Hạng mục | Kết quả |
|---|---|
| Tổng số FR | 15 |
| FR đúng phạm vi và hợp lệ | 15 ✅ |
| FR sai phạm vi đã loại bỏ | 2 ❌ (FR-006 cũ, FR-007 cũ) |
| FR thay thế đúng phạm vi | 2 ✅ (FR-006 mới, FR-007 mới) |
| FR có số liệu bịa / không có căn cứ | 0 |
| FR mâu thuẫn logic với nhau | 0 (sau khi chỉnh) |
| FR thiếu thông tin quan trọng | 3 (xem chi tiết bên dưới) |

---

## Chi tiết review từng FR

### FR-001: Menu chính ✅ Hợp lệ
- **Phạm vi:** Đúng — thuộc messaging bot (Persistent Menu là tính năng của Messenger API)
- **Tham chiếu thực tế:** Khớp hoàn toàn với `FR_AUT_001(updated).md` gốc của AntBuddy
- **Điểm cần bổ sung:** `BR-02` ghi "Menu mặc định cấm đổi tên" nhưng trong file gốc updated không thấy ràng buộc này — nên xác nhận lại với team trước khi đưa vào AC.
- **Kết luận:** ✅ Dùng được

### FR-002: Câu hỏi gợi ý (FAQ) ✅ Hợp lệ
- **Phạm vi:** Đúng — Conversation Starters là tính năng Messenger API
- **Điểm tốt:** Mô tả rõ ràng "bấm FAQ không kích hoạt từ khóa, không gửi Fallback" — logic này quan trọng, dev dễ bỏ qua
- **Điểm cần kiểm tra:** Giới hạn 4 câu hỏi và 80 ký tự/câu — cần xác nhận với Facebook API docs vì con số này có thể thay đổi theo phiên bản
- **Kết luận:** ✅ Dùng được, cần verify giới hạn 80 ký tự với API thực tế

### FR-003: Lời chào khách mới ✅ Hợp lệ
- **Phạm vi:** Đúng — Welcome message khi phiên chat mới
- **Logic đúng:** Mô tả rõ "Từ khóa thắng Lời chào" khi câu đầu tiên khớp từ khóa
- **Điểm tốt:** Sub-flow SF-01 định nghĩa "Phiên mới = lần đầu tiên HOẶC sau 24h không tương tác" — rõ ràng, dev biết điều kiện check
- **Kết luận:** ✅ Hợp lệ

### FR-004: Tin mặc định Fallback ✅ Hợp lệ
- **Phạm vi:** Đúng — Fallback reply là tính năng core của mọi bot
- **Logic đúng:** Rate Limiting 15 phút chống spam là đúng và cần thiết
- **Điểm tốt:** SF-01 mô tả cụ thể cách lưu `last_fallback_time` — dev biết cần cache cái gì
- **Kết luận:** ✅ Hợp lệ

### FR-005: Bắt từ khóa trả lời ✅ Hợp lệ
- **Phạm vi:** Đúng — Keyword matching là core feature của messaging bot
- **Logic đúng:** "Từ dài thắng từ ngắn" + "Khớp chính xác thắng Chứa từ" — priority rõ ràng
- **Điểm cần bổ sung nhỏ:** Chưa đề cập xử lý khi khách gõ có dấu/không dấu (ví dụ: "gia" vs "giá") — nên thêm vào SF-01 hoặc BR
- **Kết luận:** ✅ Hợp lệ, nên bổ sung rule xử lý dấu/không dấu tiếng Việt

### FR-006: Luồng hội thoại (Flow Builder) ✅ Hợp lệ (mới thay thế)
- **Phạm vi:** Đúng — Flow là tính năng messaging bot thuần túy
- **Logic đúng:** Phân biệt rõ Flow (tức thì theo tương tác) vs Drip (theo lịch) vs Rules (theo sự kiện)
- **Điểm cần làm rõ:** Khi khách đang ở giữa một Flow mà gõ từ khóa, thứ tự ưu tiên là gì? Hiện tại AF-2 ghi "tạm dừng Flow và chuyển sang so khớp Từ khóa" — cần đồng bộ với FR-005 và sơ đồ luồng ưu tiên
- **Kết luận:** ✅ Hợp lệ, cần đồng bộ thứ tự ưu tiên với FR-005

### FR-007: Quản lý thẻ nhãn ✅ Hợp lệ (mới thay thế)
- **Phạm vi:** Đúng — Tagging là CRM feature, diễn ra trong messaging context
- **Điểm tốt:** Làm rõ Tag là nền tảng cho FR-008, 009, 013 — quan hệ phụ thuộc rõ ràng
- **Điểm cần bổ sung:** Chưa đề cập giới hạn tổng số tag trong hệ thống (chỉ có giới hạn 50 tag/khách). Nên thêm giới hạn tổng tag của 1 fanpage (ví dụ: tối đa 200 tag)
- **Kết luận:** ✅ Hợp lệ

### FR-008: Kịch bản chăm sóc theo lịch ✅ Hợp lệ
- **Phạm vi:** Đúng — Drip Sequence là tính năng messaging automation
- **Logic đúng:** Giờ gửi 08:30–18:00, dời lịch nếu ban đêm, dừng khi có tag — cụ thể và rõ ràng
- **Điểm cần kiểm tra:** BR-01 ghi "mỗi khách chỉ 1 tiến trình trên cùng 1 kịch bản" — nhưng nếu có 2 kịch bản khác nhau, khách có thể chạy 2 cùng lúc không? Nên ghi rõ
- **Kết luận:** ✅ Hợp lệ, cần làm rõ trường hợp nhiều kịch bản song song

### FR-009: Quy luật tự động ✅ Hợp lệ
- **Phạm vi:** Đúng — Rule/Trigger engine là tính năng automation
- **Logic đúng:** KHI/NẾU/THÌ, ngắt cấp 5 chống vòng lặp
- **Điểm tốt nhất trong bộ FR:** Ví dụ minh họa thực tế, dễ hiểu
- **Kết luận:** ✅ Hợp lệ

### FR-010: Soạn tin nhắn & Nút bấm ✅ Hợp lệ
- **Phạm vi:** Đúng — Message Composer là công cụ dùng chung nội bộ
- **Lưu ý quan trọng:** FR-010 là **thành phần dùng chung**, không phải tính năng độc lập với người dùng. Nên ghi rõ là "Thư viện/Công cụ nội bộ" để dev không nhầm đây là một màn hình riêng cho user
- **Điểm cần chỉnh:** Điều kiện kích hoạt hiện ghi "Mở từ bất kỳ tính năng" — nên liệt kê cụ thể FR nào gọi đến
- **Kết luận:** ✅ Hợp lệ, nên đánh nhãn rõ là "Shared Component"

### FR-011: Form hỏi đáp thu thập SĐT ✅ Hợp lệ
- **Phạm vi:** Đúng — In-chat lead collection, diễn ra hoàn toàn trong tin nhắn
- **Logic đúng:** BR-02 ghi "Trong lúc chờ trả lời form, từ khóa bị khóa" — quan trọng, dev hay quên
- **Điểm tốt:** SF-01 mô tả cụ thể bộ lọc SĐT Việt Nam (03, 05, 07, 08, 09)
- **Điểm cần thêm:** Cần kết nối rõ hơn: FR-011 là một **bước trong FR-006 (Flow)**. Hiện tại ghi "Điều kiện kích hoạt: Khi chạy luồng kịch bản" — nên link cụ thể sang FR-006
- **Kết luận:** ✅ Hợp lệ

### FR-012: Chuyển cho nhân viên ✅ Hợp lệ
- **Phạm vi:** Đúng — Human Handover Protocol là tính năng messaging bot
- **Logic đúng:** `isBotMuted = true` rõ ràng, Round-robin chia việc, 60 phút tự đóng
- **Điểm tốt nhất:** BR-01 ghi cụ thể "Toàn bộ Từ khóa, Lời chào, Tin mặc định đều bị vô hiệu khi Mute" — dev cần biết rõ cái này
- **Kết luận:** ✅ Hợp lệ

### FR-013: Gửi tin hàng loạt ✅ Hợp lệ
- **Phạm vi:** Đúng — Broadcast là messaging feature (gửi vào hộp thư tin nhắn, không phải bài post)
- **Logic đúng:** Lọc theo tag, tuân thủ 24h, rate limiter 20 tin/giây
- **Điểm cần xem lại:** NFR ghi "50–100 tin/giây" nhưng SF-01 ghi "20 tin/giây" — **mâu thuẫn con số**. Cần thống nhất 1 con số
- **Kết luận:** ⚠️ Cần chỉnh — mâu thuẫn giữa NFR và SF-01 về tốc độ gửi

### FR-014: Xin quyền Opt-in ✅ Hợp lệ
- **Phạm vi:** Đúng — Recurring Notifications Opt-in là tính năng của Messenger API
- **Logic đúng:** Token lưu → dùng cho FR-008 và FR-013 gửi ngoài 24h
- **Điểm tốt:** BR-02 ghi "Nội dung gửi phải đúng với chủ đề khách đồng ý" — ngăn lách luật
- **Điểm cần xem lại:** AF-3 ghi "Mã token hết hạn" nhưng không ghi rõ token hết hạn sau bao lâu — cần xác nhận với Meta API docs
- **Kết luận:** ✅ Hợp lệ, cần verify thời hạn token với Meta docs

### FR-015: Báo cáo & Số liệu ✅ Hợp lệ
- **Phạm vi:** Đúng — Analytics thuộc về hệ thống Automation
- **Logic đúng:** Unique customer, Preview không tính số, nút đặt lại
- **Kết luận:** ✅ Hợp lệ

---

## Danh sách vấn đề cần chỉnh sửa (Action Items)

| # | FR | Vấn đề | Mức độ | Hành động |
|---|---|---|---|---|
| 1 | FR-001 | BR-02: "Menu mặc định cấm đổi tên" chưa có trong tài liệu gốc | ⚠️ Cần xác nhận | Hỏi team product xem có rule này không |
| 2 | FR-005 | Chưa đề cập xử lý dấu/không dấu tiếng Việt | 🔵 Nên có | Thêm vào SF-01 hoặc BR |
| 3 | FR-006 | Khi đang trong Flow mà khách gõ từ khóa, ưu tiên thế nào? | ⚠️ Cần thống nhất | Đồng bộ với FR-005 và sơ đồ luồng |
| 4 | FR-007 | Thiếu giới hạn tổng số tag cho 1 fanpage | 🔵 Nên có | Thêm BR cho số tag tối đa/fanpage |
| 5 | FR-008 | Chưa rõ: Nếu 2 kịch bản khác nhau có chạy song song cho 1 khách không? | ⚠️ Cần làm rõ | Bổ sung BR hoặc note vào mô tả |
| 6 | FR-010 | Nên đánh dấu rõ là "Shared Component" | 🔵 Nên có | Thêm note vào Mô tả |
| 7 | **FR-013** | **Mâu thuẫn tốc độ gửi: NFR ghi 50-100/giây, SF-01 ghi 20/giây** | ❌ **Phải sửa** | Thống nhất 1 con số |
| 8 | FR-014 | Chưa ghi rõ thời hạn token Opt-in | 🔵 Nên có | Tra Meta docs, bổ sung vào SF hoặc BR |

---

## Kết luận

**15 FR đều đúng phạm vi messaging bot** sau khi đã loại FR-006 cũ và FR-007 cũ.  
**Chỉ có 1 lỗi nghiêm trọng** (FR-013: mâu thuẫn con số tốc độ) cần sửa ngay.  
Các điểm còn lại là "nên có" hoặc cần xác nhận thêm với team — không blocking.
