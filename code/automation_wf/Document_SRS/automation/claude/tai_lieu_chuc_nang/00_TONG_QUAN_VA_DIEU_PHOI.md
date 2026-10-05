# 00. TỔNG QUAN HỆ THỐNG & ĐIỀU PHỐI TIN NHẮN (SYSTEM OVERVIEW & ROUTER PIPELINE)

---

## 1. Mục đích nghiệp vụ

Hệ thống **Automation (Tự động hóa chăm sóc khách hàng)** của AntBuddy là bộ máy thông minh giúp doanh nghiệp:
- Tự động tiếp đón, hướng dẫn và phân luồng khách hàng 24/7 ngay khi họ nhắn tin vào các kênh (Facebook Messenger, Zalo OA, Instagram...).
- Giảm tải cho nhân viên trực chat đối với các câu hỏi lặp lại.
- Tự động nuôi dưỡng khách hàng theo lịch trình (Drip Campaign) và kích hoạt các phản ứng tức thì khi dữ liệu khách thay đổi (Event-Driven Rules).

Tài liệu này đặc tả **Ngữ cảnh vận hành chung (Quản lý Trang, Phân quyền)** và **Trục điều phối tin nhắn trung tâm (Inbound Message Pipeline Router)** – trái tim quyết định hành vi phản hồi của toàn bộ hệ thống.

---

## 2. Quản lý Ngữ cảnh Trang & Phân quyền (Page Context & RBAC)

Mọi cấu hình và dữ liệu trong Automation đều gắn liền với một Trang (Kênh kết nối) cụ thể. Hệ thống cô lập dữ liệu hoàn toàn giữa các trang.

### 2.1 Quản lý Trang (`activePageId`)
- **Nhận diện trang**: Khi người dùng vào bất kỳ màn hình nào thuộc Automation, hệ thống phải xác định được `activePageId`. Nếu chưa chọn, hệ thống hiển thị danh sách trang để người dùng chọn trước.
- **Trạng thái kết nối của trang**:
  - `CONNECTED` (Đang kết nối): Cho phép xem, chỉnh sửa, lưu nháp và xuất bản dữ liệu lên kênh đối tác.
  - `DISCONNECTED` (Mất kết nối / Hết hạn token): Cho phép xem và lưu nháp trong cơ sở dữ liệu nội bộ; **chặn các thao tác gọi sang API đối tác (Xuất bản/Đồng bộ)** kèm cảnh báo rõ ràng: *"Trang đã mất kết nối với kênh chat. Vui lòng kết nối lại để áp dụng cấu hình."*
- **Cảnh báo thay đổi chưa lưu**: Khi người dùng đang chỉnh sửa dữ liệu mà chuyển sang trang khác, hệ thống phải hiển thị hộp thoại xác nhận hủy bỏ thay đổi trước khi chuyển trang.

### 2.2 Phân quyền người dùng (RBAC)
- **Quản trị viên (ADMIN / MANAGER)**: Có toàn quyền tạo mới, chỉnh sửa, xóa, lưu nháp, xuất bản và bật/tắt các luồng tự động.
- **Nhân viên chỉ xem (VIEWER)**: Chỉ xem được cấu hình và báo cáo thống kê; toàn bộ nút Lưu, Xóa, Bật/Tắt công tắc và Xuất bản đều bị ẩn hoặc vô hiệu hóa (Disabled).

---

## 3. Quản lý Phiên hội thoại (Session Lifecycle)

Hệ thống quản lý trạng thái tương tác của từng khách hàng thông qua khái niệm **Phiên hội thoại (Session)**:

1. **Bắt đầu một phiên mới (`NEW_SESSION`)**:
   - Khách hàng lần đầu tiên nhắn tin vào trang.
   - Hoặc khách hàng nhắn lại sau khi phiên trước đó đã kết thúc (Thời gian không có tương tác vượt quá ngưỡng quy định, mặc định là 24 giờ).
2. **Phiên đang diễn ra (`ACTIVE_SESSION`)**:
   - Khách hàng đang tiếp tục nhắn tin qua lại với bot hoặc nhân viên.
   - Cửa sổ tương tác 24 giờ được làm mới mỗi khi khách hàng gửi một tin nhắn mới.
3. **Kết thúc phiên (`SESSION_CLOSED`)**:
   - Khi hết thời gian chờ (Session Timeout).
   - Hoặc khi nhân viên trực chat chủ động bấm nút "Đóng hội thoại".

---

## 4. Trục Điều Phối Tin Nhắn Trung Tâm (Inbound Message Pipeline Router)

Khi khách hàng gửi một tin nhắn hoặc bấm một nút trên khung chat, webhook từ kênh (Facebook/Zalo) sẽ bắn về hệ thống. Bộ định tuyến sẽ xử lý theo **7 bước ưu tiên nghiêm ngặt**:

```
[Sự kiện / Tin nhắn từ Khách hàng]
                 │
                 ▼
 [Bước 1: Chống xử lý trùng lặp (Idempotency Check)]
        └─ Kiểm tra `eventId` hoặc `messageId` trong 60 giây qua
        └─ Nếu đã xử lý ──> Bỏ qua ngay lập tức, trả HTTP 200 OK
                 │
                 ▼
 [Bước 2: Sự kiện Bấm nút tương tác (Postback / Click Event)]
        ├─ Bấm nút trên Menu chính        ──> Thực thi Action của nút & Chuyển menu (nếu có)
        └─ Bấm nút Câu hỏi thường gặp     ──> Thực thi Action chính & Action bổ sung của FAQ
                 │ (Nếu là tin nhắn văn bản thông thường)
                 ▼
 [Bước 3: Khách hàng đang trong bước chờ của Kịch bản chăm sóc?]
        └─ Đang ghi danh và đang dừng ở bước "Chờ phản hồi" ──> Tiếp tục bước kế tiếp của kịch bản
                 │
                 ▼
 [Bước 4: Kích hoạt Quy luật tự động (Rule Engine)?]
        └─ Khớp Trigger "Tin nhắn mới" và thỏa mãn toàn bộ Điều kiện (AND/OR) ──> Chạy danh sách Action
                 │
                 ▼
 [Bước 5: So khớp Từ khóa (Keyword Matcher)?]
        └─ Nội dung tin nhắn khớp với Từ khóa đang bật (ưu tiên từ khóa dài hơn/chính xác hơn) ──> Gửi phản hồi
                 │
                 ▼
 [Bước 6: Có phải Tin nhắn đầu tiên của Phiên mới?]
        └─ Phiên là `NEW_SESSION` VÀ Tin nhắn mở đầu đang ở trạng thái BẬT ──> Gửi Tin nhắn mở đầu
                 │
                 ▼
 [Bước 7: Xử lý Dự phòng Cuối cùng (Default Fallback Message)]
        └─ Không có bất kỳ bộ máy nào phía trên xử lý:
             ├─ Kiểm tra tần suất (Rate Limiting, ví dụ: tối đa 1 lần trong 30 phút).
             ├─ Nếu chưa vượt quá giới hạn ──> Gửi Tin nhắn mặc định.
             └─ Nếu đã vượt quá giới hạn   ──> Bỏ qua (không spam khách).
```

---

## 5. Quy tắc Nghiệp vụ Chung (System Business Rules)

| Mã BR | Quy tắc nghiệp vụ |
|---|---|
| **BR-SYS-01** | **Tính bất biến khi chạy (Snapshot Immutability)**: Khi khách hàng đang tương tác với bot, hệ thống luôn sử dụng bản Snapshot đã xuất bản thành công gần nhất. Việc người quản trị đang lưu nháp cấu hình mới không làm gián đoạn khách hàng. |
| **BR-SYS-02** | **Chống nghẽn / Chống xử lý lặp (Idempotency)**: Mọi webhook từ kênh chat phải được kiểm tra trùng lặp khóa định danh (`channelType + pageId + messageId`) trong bộ đệm nhanh (Redis cache) tối thiểu 60 giây. |
| **BR-SYS-03** | **Không gửi tin nhắn rỗng (Empty Payload Prevention)**: Nếu một luồng được kích hoạt nhưng nội dung tin nhắn bị trống hoặc đối tượng liên kết bị xóa, hệ thống ghi nhận log lỗi nội bộ và bỏ qua, tuyệt đối không gửi tin nhắn rỗng đến khách. |
| **BR-SYS-04** | **Ưu tiên tương tác chủ động của khách**: Lượt bấm nút (Postback) của khách luôn có quyền ưu tiên cao nhất, vượt qua mọi bộ lọc từ khóa hay kịch bản đang chờ. |

---

## 6. Kịch bản Kiểm thử Nghiệm thu (Acceptance Criteria)

- [ ] **AC-SYS-01 (Đổi trang)**: Đổi từ Trang A sang Trang B -> Toàn bộ danh sách và cấu hình tự động tải lại chính xác theo Trang B.
- [ ] **AC-SYS-02 (Cảnh báo mất kết nối)**: Khi trang ở trạng thái `DISCONNECTED`, bấm nút Xuất bản -> Hệ thống báo lỗi và chặn gọi API kênh, không làm mất bản nháp.
- [ ] **AC-SYS-03 (Phân quyền Viewer)**: Đăng nhập tài khoản quyền `VIEWER` -> Toàn bộ nút Thêm, Sửa, Xóa, Xuất bản, Công tắc bật/tắt đều bị vô hiệu hóa.
- [ ] **AC-SYS-04 (Chống lặp tin)**: Bắn 2 webhook cùng một `messageId` trong vòng 1 giây -> Hệ thống chỉ xử lý và gửi phản hồi đúng 1 lần duy nhất.
- [ ] **AC-SYS-05 (Thứ tự ưu tiên)**: Khách gửi tin nhắn chứa từ khóa đúng vào lúc bắt đầu phiên mới -> Hệ thống ưu tiên chạy phản hồi Từ khóa (Bước 5), không gửi đè Tin nhắn mở đầu (Bước 6).
