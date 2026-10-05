# FR-06: Kịch Bản Chăm Sóc (Drip / Sequence Messaging)

## 1. Tổng quan tính năng (What & Why)
**Kịch bản chăm sóc** (Drip Sequence) cho phép doanh nghiệp thiết lập một chuỗi tin nhắn và hành động tự động gửi đến khách hàng theo một lịch trình thời gian định sẵn (ví dụ: *Gửi lời chào ngay sau khi đăng ký -> Chờ 2 ngày gửi mã giảm giá 10% -> Chờ 5 ngày nhắc nhở dùng mã*).

Tính năng này giúp nuôi dưỡng khách hàng tiềm năng (Lead Nurturing), tăng tỷ lệ quay lại mua hàng và tự động hóa quy trình chăm sóc sau bán (Post-purchase).

---

## 2. Giao diện & Luồng người dùng (Admin Workflow)

### Màn hình 1: Danh mục Kịch bản
- **Danh sách kịch bản**: Hiển thị tên kịch bản, số lượng bước, số khách hàng đang tham gia (`Active Enrollments`), trạng thái Bật/Tắt.
- **Thao tác nhanh**:
  - `Tạo mới`: Tạo kịch bản rỗng.
  - `Chỉnh sửa`: Chuyển sang màn hình biên tập bước.
  - `Sao chép`: Nhân bản cấu trúc các bước sang một kịch bản mới (không copy khách đang chạy và không copy thống kê).
  - `Xóa`: Yêu cầu xác nhận; **chặn xóa nếu kịch bản đang có khách hàng đang chạy dở**.
  - `Theo dõi vận hành`: Mở màn hình xem danh sách khách hàng đang tham gia.

### Màn hình 2: Biên tập các bước trong Kịch bản
- **Thêm và sắp xếp bước**:
  - Mỗi bước có số thứ tự liên tục `1, 2, 3...` và hỗ trợ kéo thả đổi vị trí.
- **Loại bước (Step Type)**:
  1. **Bước Gửi tin nhắn**: Soạn thảo nội dung qua Message Composer (Văn bản 640 ký tự, hình ảnh, video, nút bấm).
  2. **Bước Hành động (Action Step)**: Gắn thẻ khách hàng, phân bổ cho nhân viên phụ trách, cập nhật trường thông tin CRM.
- **Cấu hình Thời gian chờ (Delay)**:
  - Thiết lập khoảng thời gian chờ trước khi bước này được kích hoạt kể từ bước trước đó (ví dụ: *Chờ 30 phút*, *Chờ 1 ngày*, *Gửi vào lúc 09:00 sáng ngày hôm sau*).

### Màn hình 3: Theo dõi Vận hành & Khách hàng tham gia
- Bộ lọc theo Trạng thái: `Đang chạy (In Progress)`, `Đã hoàn tất (Completed)`, `Đã dừng/Hủy (Cancelled)`, `Thất bại (Failed)`.
- Bảng danh sách: Tên khách hàng, Thời điểm tham gia, Bước hiện tại đang chạy, Thời điểm dự kiến chạy bước tiếp theo, Lịch sử các bước đã gửi thành công.

---

## 3. Luồng xử lý Runtime (Backend Scheduler & Worker)

```
[Khách hàng được Đăng ký vào Kịch bản (Enrollment Trigger)]
                        │
                        ▼
[1. Kiểm tra chống đăng ký trùng]
      ├─ Khách đã có lượt chạy đang Active trong kịch bản này?
      │     └─ Bỏ qua (hoặc Xử lý theo policy đăng ký trùng)
      └─ Thỏa mãn ──> Tạo bản ghi Enrollment mới
                        │
                        ▼
[2. Cố định Phiên bản Kịch bản (Version Snapshot)]
      └─ Gắn `sequenceVersion = currentPublishedVersion`
         (Đảm bảo admin sửa kịch bản sau này không làm hỏng lượt chạy hiện tại!)
                        │
                        ▼
[3. Xác định Bước đầu tiên (Step 1)]
      ├─ Nếu Delay = 0 ──> Đưa vào hàng đợi thực thi ngay (Immediate Execution)
      └─ Nếu Delay > 0 ──> Đặt lịch Job (Scheduled Job: `runAt = NOW + Delay`)
                        │
                        ▼
[4. Worker Thực thi Bước khi đến hạn (Run At)]
      ├─ Kiểm tra điều kiện: Khách còn đủ điều kiện? Trang còn kết nối?
      ├─ Gửi tin nhắn / Chạy hành động của bước
      ├─ Ghi nhận log: `deliveryResult = SUCCESS`
      ├─ Còn bước tiếp theo (Step N+1)?
      │     ├─ CÓ  ──> Lập lịch Job cho Step N+1 theo Delay của bước đó
      │     └─ HẾT ──> Chốt trạng thái Enrollment = COMPLETED
      └─ Gặp lỗi tạm thời (Network timeout)?
            └─ Retry an toàn với Exponential Backoff (KHÔNG gửi lặp bước đã xong!)
```

---

## 4. Mô hình Dữ liệu (Database Schema / DTO)

### Bảng `sequences` (Metadata Kịch bản)
```typescript
interface Sequence {
  id: string; // UUID
  pageId: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  version: number;
  steps: SequenceStep[];
  updatedAt: Date;
}

interface SequenceStep {
  stepId: string;
  order: number; // 1, 2, 3...
  type: 'MESSAGE' | 'ACTION';
  delay: {
    amount: number;
    unit: 'MINUTES' | 'HOURS' | 'DAYS';
    sendAtSpecificTime?: string; // Ví dụ: "09:00"
  };
  contentRef?: any; // Message graph payload
  actionRef?: any; // Action catalog payload
}
```

### Bảng `sequence_enrollments` (Quản lý lượt chạy của khách)
```typescript
interface SequenceEnrollment {
  id: string; // UUID
  sequenceId: string;
  sequenceVersion: number; // Version snapshot cố định
  customerId: string;
  pageId: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'FAILED';
  currentStepOrder: number;
  nextRunAt: Date | null;
  enrolledAt: Date;
  completedAt: Date | null;
}
```

---

## 5. Quy tắc nghiệp vụ & Xử lý ngoại lệ (Business Rules & Edge Cases)

| Mã BR | Tình huống | Quy tắc xử lý |
|---|---|---|
| **BR-01** | Chặn xóa kịch bản đang chạy | Nếu kịch bản có ít nhất 1 khách hàng ở trạng thái `IN_PROGRESS`, hệ thống **chặn nút Xóa** kèm thông báo: *"Không thể xóa kịch bản đang có X khách hàng tham gia. Vui lòng dừng kịch bản hoặc chờ hoàn tất."* |
| **BR-02** | Cố định Version (Snapshot Isolation) | Khi khách hàng tham gia kịch bản ở Version 1, toàn bộ hành trình của khách sẽ chạy theo đúng Version 1. Việc người quản trị thêm/sửa/xóa bước ở Version 2 chỉ áp dụng cho khách hàng mới đăng ký sau đó. |
| **BR-03** | Khách hàng chặn Fanpage | Nếu trong quá trình gửi một bước, Kênh chat trả về lỗi khách hàng đã chặn (Block) tin nhắn hoặc hủy đăng ký, hệ thống lập tức chuyển trạng thái Enrollment thành `CANCELLED` kèm lý do, không tiếp tục lập lịch các bước sau. |
| **BR-04** | Thứ tự bước liên tục | Các bước trong kịch bản phải có thứ tự liên tục `1, 2, 3...`. Khi xóa một bước ở giữa (ví dụ xóa bước 2 trong chuỗi 1-2-3), hệ thống tự động đánh lại số thứ tự bước 3 thành bước 2. |
| **BR-05** | Retry an toàn (Idempotent Retry) | Nếu một bước gặp sự cố mạng (API timeout), cơ chế Retry chỉ được thực thi lại chính bước đó. Tuyệt đối không bao giờ gửi lại các bước đã thành công trước đó. |

---

## 6. Checklist kiểm thử cho Developer (Self-Test Scenarios)

- [ ] **Tạo chuỗi 3 bước**:
  - Bước 1 (Gửi ngay): Tin nhắn chào mừng.
  - Bước 2 (Chờ 5 phút): Gắn thẻ "Khách tiềm năng".
  - Bước 3 (Chờ 10 phút): Gửi mã khuyến mãi.
- [ ] **Đăng ký khách hàng**: Đưa 1 khách hàng test vào kịch bản -> Xác nhận khách nhận Bước 1 ngay lập tức.
- [ ] **Kiểm tra Scheduler**: Chờ đủ 5 phút -> Kiểm tra hệ thống tự động chạy Bước 2 (gắn thẻ trong CRM) và lập lịch đúng thời gian cho Bước 3.
- [ ] **Chặn đăng ký trùng**: Khi khách đang ở Bước 2, gửi yêu cầu đăng ký lại khách vào kịch bản -> Kiểm tra hệ thống nhận diện khách đang chạy và không tạo 2 lịch gửi chồng chéo.
- [ ] **Chặn xóa kịch bản**: Đang có khách chạy dở, bấm `Xóa kịch bản` -> Hệ thống hiển thị cảnh báo đỏ và không cho xóa.
