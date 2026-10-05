# FR-07: Quy Luật Tự Động (Automation Rule Engine)

## 1. Tổng quan tính năng (What & Why)
**Quy luật tự động** (Automation Rules) là "trái tim" tự động hóa linh hoạt của AntBot, hoạt động theo mô hình chuẩn **ECA (Event - Condition - Action)**:
- **KHI (Trigger / Event)**: Một sự kiện nào đó xảy ra (ví dụ: *Khách hàng để lại số điện thoại trong khung chat*),
- **NẾU (Condition Tree)**: Thỏa mãn các điều kiện lọc (ví dụ: *Khách hàng chưa được gắn thẻ "Đã liên hệ" VÀ là khách hàng mới*),
- **THÌ (Actions)**: Hệ thống tự động thực thi một chuỗi các hành động liên hoàn (ví dụ: *Gắn thẻ "Khách tiềm năng" -> Phân bổ cho nhân viên Sale trực -> Gửi tin nhắn SMS/Zalo cảm ơn*).

---

## 2. Giao diện & Luồng người dùng (Admin Workflow)

### Màn hình 1: Danh sách Quy luật
- **Bảng quản lý**: Hiển thị Tên quy luật, Sự kiện kích hoạt (Trigger), Tóm tắt điều kiện, Số lượng hành động, Công tắc Bật/Tắt, Menu thao tác (`Chỉnh sửa`, `Sao chép`, `Xem lịch sử chạy`, `Xóa`).
- **Thanh tìm kiếm & Bộ lọc**: Lọc theo Trigger, trạng thái Bật/Tắt.
- **Nút "Tạo quy luật mới"**: Mở màn hình thiết lập quy luật.

### Màn hình 2: Thiết lập Quy luật (Rule Builder)
Gồm 3 khối chính được nối với nhau trực quan:

#### Khối 1: Sự kiện kích hoạt (KHI / Trigger)
Người dùng chọn **đúng 1 sự kiện** từ danh sách được hỗ trợ:
- `NEW_MESSAGE`: Khi có tin nhắn mới gửi đến.
- `PHONE_DETECTED`: Khi phát hiện khách để lại số điện thoại trong tin nhắn.
- `TAG_ADDED`: Khi khách hàng được gắn một thẻ mới.
- `BUTTON_CLICKED`: Khi khách bấm một nút cụ thể.
- `NEW_CUSTOMER`: Khi có khách hàng mới lần đầu vào chat.

#### Khối 2: Cây điều kiện (NẾU / Conditions)
- Hỗ trợ xây dựng nhóm điều kiện lồng nhau với toán tử **VÀ (AND)** / **HOẶC (OR)**.
- Mỗi điều kiện gồm: `Trường dữ liệu` + `Toán tử` + `Giá trị so sánh`.
  - Ví dụ: `Thẻ khách hàng` - `Không chứa` - `"Khách VIP"`.
  - Ví dụ: `Kênh gửi` - `Bằng` - `"Facebook Page"`.

#### Khối 3: Chuỗi hành động (THÌ / Actions)
- Danh sách các hành động được thực thi lần lượt từ trên xuống dưới.
- Người dùng bấm `Thêm hành động` để chọn từ **Action Catalog dùng chung** (Gắn thẻ, Gỡ thẻ, Phân bổ nhân viên, Chuyển kịch bản chăm sóc, Cập nhật thông tin, Gửi webhook sang hệ thống ngoài...).
- Có thể **kéo thả** để thay đổi thứ tự thực thi của các hành động.
- Cấu hình chính sách xử lý lỗi: *Dừng quy luật khi có hành động lỗi (Stop on Error)* hoặc *Tiếp tục chạy các hành động tiếp theo (Continue on Error)*.

### Màn hình 3: Lịch sử thực thi (Execution Logs)
- Hiển thị chi tiết từng lần chạy: Thời gian, Sự kiện kích hoạt, Kết quả đánh giá điều kiện (Thỏa mãn / Bỏ qua), Chi tiết từng hành động (Thành công / Thất bại, mã lỗi, thời gian chạy).

---

## 3. Luồng xử lý Runtime (Backend Rule Engine)

```
[Sự kiện phát sinh trong hệ thống (Event Bus / Webhook)]
                         │
                         ▼
[1. Kiểm tra chống xử lý trùng (Idempotency Key)]
      └─ Hash từ `eventId + triggerType`
         (Nếu đã xử lý ──> Trả ACK bỏ qua)
                         │
                         ▼
[2. Tìm các Quy luật Active khớp với Trigger]
      └─ SELECT * FROM rules WHERE trigger = ? AND status = 'ACTIVE'
                         │
                         ▼
[3. Đánh giá Cây điều kiện (Condition Evaluation)]
      ├─ Không thỏa mãn ──> Đánh dấu Log: "SKIPPED - Condition not met" (STOP)
      └─ Thỏa mãn điều kiện
                         │
                         ▼
[4. Chạy chuỗi Hành động tuần tự (Sequential Action Execution)]
      ├─ Action 1 (Ví dụ: Gắn thẻ) ──> Ghi log Action 1: SUCCESS
      ├─ Action 2 (Ví dụ: Phân bổ)  ──> Ghi log Action 2: SUCCESS
      ├─ Action 3 gặp sự cố (API Timeout)?
      │     ├─ Nếu cấu hình "Stop on Error"     ──> Dừng lại, kết thúc lần chạy với FAILED
      │     └─ Nếu cấu hình "Continue on Error" ──> Tiếp tục chạy Action 4
      └─ Cập nhật mốc hoàn tất & Thống kê quy luật
```

---

## 4. Mô hình Dữ liệu (Database Schema / DTO)

### Bảng `rules`
```typescript
interface AutomationRule {
  id: string; // UUID
  pageId: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  version: number;
  trigger: {
    type: 'NEW_MESSAGE' | 'PHONE_DETECTED' | 'TAG_ADDED' | 'BUTTON_CLICKED';
    config?: Record<string, any>;
  };
  conditionTree: {
    logic: 'AND' | 'OR';
    conditions: Array<{
      field: string;
      operator: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'NOT_CONTAINS' | 'IS_EMPTY' | 'IS_NOT_EMPTY';
      value: any;
    }>;
  };
  actions: Array<{
    id: string;
    order: number;
    actionType: string;
    actionPayload: Record<string, any>;
    onErrorPolicy: 'STOP' | 'CONTINUE';
  }>;
  updatedAt: Date;
}
```

### Bảng `rule_execution_logs` (Lịch sử chạy chi tiết)
```typescript
interface RuleExecutionLog {
  id: string; // UUID
  ruleId: string;
  ruleVersion: number;
  eventId: string;
  status: 'SUCCESS' | 'FAILED' | 'SKIPPED';
  startedAt: Date;
  finishedAt: Date;
  actionResults: Array<{
    actionType: string;
    status: 'SUCCESS' | 'FAILED';
    durationMs: number;
    errorMessage?: string;
  }>;
}
```

---

## 5. Quy tắc nghiệp vụ & Xử lý ngoại lệ (Business Rules & Edge Cases)

| Mã BR | Tình huống | Quy tắc xử lý |
|---|---|---|
| **BR-01** | Đúng 1 Trigger | Mỗi quy luật bắt buộc phải có **đúng 1 sự kiện kích hoạt (Trigger)**. Không hỗ trợ quy luật đa trigger trên cùng 1 cấu hình. |
| **BR-02** | Toàn vẹn tham chiếu | Nếu một Thẻ hoặc Kịch bản chăm sóc được liên kết trong Action bị người dùng xóa ở module khác, quy luật sẽ tự động chuyển trạng thái cảnh báo `Cần cấu hình lại` và tạm thời không chạy action đó. |
| **BR-03** | Bảo toàn thứ tự thực thi | Danh sách hành động bắt buộc phải chạy theo đúng số thứ tự `1, 2, 3...` đã lưu. Hành động trước phải hoàn tất mới chạy tiếp hành động sau (đồng bộ tuần tự). |
| **BR-04** | Tránh vòng lặp vô tận (Infinite Loop Protection) | Khi Action của Quy luật phát sinh một Event mới (ví dụ: Quy luật A gắn thẻ -> Sự kiện gắn thẻ lại trigger Quy luật B -> Quy luật B lại kích hoạt ngược lại Quy luật A), hệ thống giới hạn **độ sâu tối đa (Max Execution Depth = 5)**. Vượt quá 5 tầng sẽ tự động ngắt và báo lỗi vòng lặp. |
| **BR-05** | Retry an toàn | Khi một Action thất bại và được retry, hệ thống ghi nhận trạng thái của từng action con để **tuyệt đối không chạy lặp lại các Action đã chạy thành công trước đó**. |

---

## 6. Checklist kiểm thử cho Developer (Self-Test Scenarios)

- [ ] **Tạo quy luật chuẩn**:
  - Trigger: `Phát hiện số điện thoại trong tin nhắn`.
  - Điều kiện: `Kênh` bằng `"Facebook"`.
  - Hành động 1: Gắn thẻ `"Có SĐT"`.
  - Hành động 2: Gửi tin nhắn phản hồi `"Cảm ơn bạn, tư vấn viên sẽ gọi lại qua số này"`.
- [ ] **Thử nghiệm Happy Path**: Dùng tài khoản test chat `"Số điện thoại của mình là 0912345678"` -> Xác nhận bot nhận diện đúng SĐT, gắn thẻ thành công vào CRM và gửi tin nhắn phản hồi.
- [ ] **Thử nghiệm Điều kiện sai**: Cấu hình điều kiện chỉ áp dụng cho kênh Zalo. Chat trên Facebook -> Kiểm tra log ghi nhận trạng thái `SKIPPED - Điều kiện không thỏa mãn` và không chạy action.
- [ ] **Kiểm tra thứ tự Action**: Đặt Action 1 trước Action 2. Vào màn hình Lịch sử chạy -> Xác nhận timestamp và log của Action 1 luôn hoàn tất trước Action 2.
- [ ] **Chính sách lỗi (Continue on Error)**: Đặt Action 1 bị lỗi mạng, Action 2 bình thường. Chọn chính sách "Tiếp tục khi lỗi" -> Xác nhận Action 2 vẫn được thực thi và log hiển thị Action 1 Failed, Action 2 Success.
