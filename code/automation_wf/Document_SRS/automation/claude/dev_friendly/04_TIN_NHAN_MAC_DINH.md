# FR-04: Tin Nhắn Mặc Định (Default Fallback Message)

## 1. Tổng quan tính năng (What & Why)
**Tin nhắn mặc định** (Default Fallback Message) đóng vai trò là "lưới an toàn" (safety net) của hệ thống bot. Khi khách hàng gửi tin nhắn vào Fanpage mà:
- Không khớp bất kỳ **Từ khóa** nào,
- Không phải tương tác bấm nút **Menu** hay **FAQ**,
- Không nằm trong luồng xử lý của **Quy luật tự động**,
- Chưa có nhân viên tư vấn tiếp nhận trực tiếp,

Hệ thống sẽ tự động gửi Tin nhắn mặc định (ví dụ: *"Cảm ơn bạn đã nhắn tin. Hiện tại đội ngũ hỗ trợ đang bận, chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất..."*).

---

## 2. Giao diện & Luồng người dùng (Admin Workflow)

### Màn hình Chi tiết Tin nhắn mặc định
- **Công tắc "Kích hoạt"**: Gạt bật/tắt tính năng fallback của trang.
- **Tùy chọn Tần suất hiển thị**:
  - Thiết lập thời gian giới hạn gửi lại cho cùng một khách hàng (ví dụ: *Chỉ gửi 1 lần mỗi 24 giờ* hoặc *Mỗi khi khách nhắn tin mà bot không hiểu*).
  - Giúp tránh tình trạng bot spam liên tục tin nhắn fallback khi khách chat nhiều câu hỏi không khớp từ khóa.
- **Nút "Chỉnh sửa"**: Mở màn hình soạn thảo luồng tin nhắn fallback.
- **Cột các bước & Khung xem nội dung**: Cho phép xem trước các bước trong luồng tin nhắn mặc định.
- **Khu vực Thống kê**: Hiển thị số lượt gửi, tỷ lệ đọc, tỷ lệ bấm nút phản hồi và số lượng khách hàng để lại số điện thoại.

### Màn hình Soạn thảo Tin nhắn mặc định
- Dùng chung bộ soạn thảo đồ thị tin nhắn (**Message Composer Graph**):
  - Hỗ trợ phân loại tin nhắn: *Trong khoảng 24 giờ* hoặc *Ngoài khoảng 24 giờ*.
  - Soạn văn bản (tối đa 640 ký tự), chèn biến `{customer_name}`, chèn emoji.
  - Thêm khối nội dung: Hình ảnh, Video, Carousel sản phẩm...
  - Nút bấm và câu trả lời nhanh (tiêu đề max 20 ký tự).
  - Liên kết bước tiếp theo (`nextStepId`).
  - Mobile Preview thời gian thực.

---

## 3. Luồng xử lý Runtime (Backend & Kênh Chat)

Tin nhắn mặc định nằm ở **vị trí cuối cùng** của bộ định tuyến tin nhắn (Inbound Router):

```
[Tin nhắn từ khách hàng đến]
             │
             ▼
[1. Kiểm tra các bộ xử lý ưu tiên]
      ├─ Khách bấm Nút Menu / FAQ?               ──> Đã xử lý (STOP)
      ├─ Khách đang trong bước chờ của Kịch bản?  ──> Đã xử lý (STOP)
      ├─ Khớp Quy luật tự động (Rule Engine)?    ──> Đã xử lý (STOP)
      ├─ Khớp Từ khóa tự động (Keyword Match)?   ──> Đã xử lý (STOP)
      └─ Là tin nhắn đầu tiên của Phiên mới?     ──> Welcome xử lý (STOP)
             │ (Tất cả đều KHÔNG xử lý)
             ▼
[2. Kích hoạt Fallback Orchestrator]
      ├─ Công tắc "Kích hoạt" đang TẮT?          ──> Bỏ qua (STOP)
      ├─ Kiểm tra tần suất (Frequency Check):
      │    Khách đã nhận Fallback trong 24h qua? ──> Bỏ qua (STOP - Chống Spam)
      └─ Đủ điều kiện gửi
             │
             ▼
[3. Gửi Tin nhắn mặc định]
      ├─ Chọn bước gửi phù hợp với Cửa sổ 24 giờ của kênh
      ├─ Gửi gói tin sang Kênh chat (Meta / Zalo)
      ├─ Cập nhật mốc thời gian: `lastFallbackSentAt = NOW`
      └─ Ghi nhận log & cập nhật số liệu thống kê
```

---

## 4. Mô hình Dữ liệu (Database Schema / DTO)

### Bảng `default_message_configs`
```typescript
interface DefaultMessageConfig {
  id: string; // UUID
  pageId: string; // ID trang
  enabled: boolean; // Bật / Tắt fallback
  isDefault: boolean; // Cờ đánh dấu cấu hình mặc định
  frequencyHours: number; // Tần suất chặn lặp (mặc định: 24 giờ)
  version: number;
  contentGraph: {
    startStepId: string;
    steps: any[];
  };
  updatedAt: Date;
}
```

### Bảng `customer_fallback_logs` (Theo dõi tần suất gửi của khách)
```typescript
interface CustomerFallbackLog {
  customerId: string;
  pageId: string;
  lastSentAt: Date; // Mốc thời gian gần nhất khách nhận tin nhắn mặc định
  totalSentCount: number;
}
```

---

## 5. Quy tắc nghiệp vụ & Xử lý ngoại lệ (Business Rules & Edge Cases)

| Mã BR | Tình huống | Quy tắc xử lý |
|---|---|---|
| **BR-01** | Ưu tiên thấp nhất | Tin nhắn mặc định **chỉ được kích hoạt** khi toàn bộ các bộ xử lý ưu tiên cao hơn (Menu, FAQ, Sequence, Rule, Keyword, Welcome) không nhận xử lý tin nhắn. |
| **BR-02** | Chống Spam (Tần suất) | Mặc định hệ thống giới hạn: Mỗi khách hàng chỉ nhận tối đa 1 lần tin nhắn mặc định trong vòng 24 giờ. Nếu khách tiếp tục nhắn các câu không hiểu, bot sẽ im lặng để tránh gây khó chịu cho khách. |
| **BR-03** | Độc lập Schema | Trạng thái `enabled` (Kích hoạt) và cờ `isDefault` được quản lý độc lập. Việc bật/tắt không làm mất cấu hình nội dung đã soạn. |
| **BR-04** | Cửa sổ tin nhắn 24h | Nếu khách nhắn tin ngoài cửa sổ 24h của Facebook/Zalo, hệ thống chỉ gửi các bước có cấu hình `OUTSIDE_24H` (có gắn Message Tag hợp lệ theo chính sách của Meta). Nếu không có bước phù hợp, hệ thống bỏ qua an toàn và ghi log nguyên nhân. |
| **BR-05** | Idempotency Gửi tin | Mỗi lần gửi tin nhắn mặc định đều tạo một `deliveryId` duy nhất. Nếu API của kênh bị timeout và trigger retry, hệ thống không gửi lặp lần 2 cho cùng một tin nhắn của khách. |

---

## 6. Checklist kiểm thử cho Developer (Self-Test Scenarios)

- [ ] **Kích hoạt khi không hiểu**: Cấu hình tin nhắn mặc định. Dùng tài khoản test gửi chuỗi ký tự ngẫu nhiên `"xyz12345abc"` không có trong từ khóa -> Khách nhận được tin nhắn mặc định.
- [ ] **Chặn kích hoạt khi có từ khóa**: Tạo từ khóa `"báo giá"`. Gửi tin `"Tôi cần báo giá"` -> Khách nhận phản hồi từ khóa, **không** nhận tin nhắn mặc định.
- [ ] **Kiểm tra giới hạn tần suất 24h**:
  - Gửi tin không hiểu lần 1: Nhận tin nhắn mặc định.
  - Gửi tiếp tin không hiểu lần 2 (ngay sau đó 1 phút): Bot **không** gửi lại tin nhắn mặc định.
- [ ] **Tắt tính năng**: Gạt công tắc `Kích hoạt` sang Tắt. Gửi tin nhắn không hiểu -> Bot không gửi tin gì cả.
- [ ] **Bảo toàn dữ liệu**: Bật/tắt công tắc nhiều lần -> Vào màn Chỉnh sửa kiểm tra toàn bộ khối nội dung, văn bản và nút bấm vẫn nguyên vẹn 100%.
