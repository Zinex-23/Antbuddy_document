# FR-03: Tin Nhắn Mở Đầu (Welcome Message)

## 1. Tổng quan tính năng (What & Why)
**Tin nhắn mở đầu** (Welcome / Greeting Message) là chuỗi thông điệp tự động gửi đến khách hàng ngay khi họ **bắt đầu một phiên hội thoại mới** với Fanpage. 

Tính năng này giúp doanh nghiệp gửi lời chào thân thiện, giới thiệu chương trình khuyến mãi hiện hành, hướng dẫn khách bấm các nút điều hướng hoặc thu thập thông tin ban đầu một cách tự động 24/7.

---

## 2. Giao diện & Luồng người dùng (Admin Workflow)

### Màn hình 1: Chi tiết Tin nhắn mở đầu
- **Công tắc "Kích hoạt" (Toggle Switch)**:
  - Gạt Bật / Tắt trạng thái hoạt động của tin nhắn mở đầu.
  - **Lưu ý**: Công tắc có hiệu lực tức thì, không cần bấm nút "Lưu".
  - Chặn không cho bật nếu chưa có nội dung tin nhắn hợp lệ.
- **Nút "Chỉnh sửa"**: Bấm vào để chuyển sang Màn hình soạn thảo.
- **Cột danh sách các bước**: Hiển thị bước `BẮT ĐẦU` và các bước tiếp theo. Bấm vào bước nào thì khung bên phải sẽ hiển thị nội dung và số liệu thống kê của bước đó.
- **Khu vực Thống kê**:
  - *Thống kê theo bước*: Số lượng tin đã gửi, Thành công, Đã đọc, Đã click, Chưa thành công, Để lại SĐT.
  - *Thống kê toàn luồng*: Tổng số người dùng tiếp cận và các chỉ số chuyển đổi tổng thể.

### Màn hình 2: Soạn thảo luồng Tin nhắn mở đầu
- **Cột bước bên trái**: Quản lý danh sách các bước. Có nút `Tạo bước tiếp theo` (chọn bước Tin nhắn hoặc bước Hành động).
- **Vùng soạn thảo nội dung (ở giữa)**:
  - *Tên bước*: Cho phép đổi tên để dễ quản lý nội bộ.
  - *Loại tin nhắn*: `Trong khoảng 24 giờ` (tin nhắn tiêu chuẩn) hoặc `Ngoài khoảng 24 giờ` (Message Tag theo chính sách Meta).
  - *Văn bản tin nhắn*: Tối đa 640 ký tự, có bộ đếm `N/640`, hỗ trợ chèn Emoji và biến cá nhân hóa `{customer_name}`.
  - *Thêm khối nội dung*: Hình ảnh, Nhóm ảnh, Video, Bộ sưu tập (Carousel)...
  - *Nút bấm & Trả lời nhanh*: Tiêu đề tối đa 20 ký tự, cấu hình action (gửi bước tiếp theo, gọi flow, mở web, giỏ hàng...).
  - *Chọn bước tiếp theo*: Chọn bước sẽ gửi tiếp theo sau bước này hoặc chọn `Kết thúc`.
  - *Ghi chú nội bộ*: Bật công tắc để ghi chú cho đội ngũ vận hành (khách hàng không nhìn thấy).
- **Cột Mobile Preview & Nút "Xem thử" (bên phải)**:
  - Giả lập trực quan giao diện tin nhắn khách hàng sẽ nhận được.
  - Nút `Xem thử`: Chạy mô phỏng toàn bộ luồng tương tác trên màn hình (không gửi tin thật và không ghi số liệu thống kê).

---

## 3. Luồng xử lý Runtime (Backend & Kích hoạt tin nhắn)

```
[Khách nhắn tin đến Fanpage]
            │
            ▼
[1. Kiểm tra Phiên hội thoại (Session Check)]
      ├─ Khách đã có Session đang hoạt động? ──> Bỏ qua (Không gửi Welcome nữa)
      └─ Khách bắt đầu Phiên mới (New Session)?
            │
            ▼
[2. Kiểm tra điều kiện gửi]
      ├─ Công tắc "Kích hoạt" đang TẮT? ──> Bỏ qua
      ├─ Event bắt đầu bằng Click nút FAQ? ──> Bỏ qua (Ưu tiên FAQ)
      └─ Thỏa mãn điều kiện gửi
            │
            ▼
[3. Thực thi gửi Tin nhắn mở đầu]
      ├─ Gửi bước BẮT ĐẦU (kèm biến thay thế {customer_name})
      ├─ Đánh dấu Session: `welcomeSent = true`
      └─ Lập lịch gửi các bước tiếp theo (nếu có nextStepId)
            │
            ▼
[4. Khóa luồng Fallback]
      └─ Đã gửi Welcome cho tin đầu tiên thì KHÔNG gửi Tin nhắn mặc định nữa!
```

### Định nghĩa Phiên mới (New Session)
Một tin nhắn đến được xem là mở đầu **Phiên mới** khi:
1. Lần đầu tiên khách hàng tương tác với trang.
2. Hoặc tin nhắn gửi đến sau khi phiên trước đó đã hết hạn thời gian im lặng (Idle timeout - ví dụ sau 24h khách không tương tác).

---

## 4. Mô hình Dữ liệu (Database Schema / DTO)

### Bảng `welcome_configs`
```typescript
interface WelcomeConfig {
  id: string; // UUID
  pageId: string; // ID trang
  enabled: boolean; // Trạng thái công tắc Kích hoạt
  version: number;
  contentGraph: {
    startStepId: string;
    steps: WelcomeStep[];
  };
  updatedAt: Date;
}

interface WelcomeStep {
  stepId: string;
  stepName: string;
  messageType: 'WITHIN_24H' | 'OUTSIDE_24H';
  text: string; // Max 640 chars
  blocks: any[]; // Hình ảnh, Video, Carousel...
  buttons: Array<{
    id: string;
    title: string; // Max 20 chars
    actionType: string;
    actionPayload: any;
  }>;
  quickReplies: Array<{
    title: string; // Max 20 chars
    actionType: string;
    actionPayload: any;
  }>;
  nextStepId: string | 'END';
  internalNote?: string;
}
```

---

## 5. Quy tắc nghiệp vụ & Xử lý ngoại lệ (Business Rules & Edge Cases)

| Mã BR | Tình huống | Quy tắc xử lý |
|---|---|---|
| **BR-01** | Giới hạn mỗi trang | Mỗi trang chỉ có **duy nhất 1 cấu hình** Tin nhắn mở đầu. |
| **BR-02** | Giới hạn 1 lần / Phiên | Trong cùng một phiên hội thoại, tin nhắn mở đầu chỉ được gửi **đúng 1 lần duy nhất** dù khách hàng nhắn liên tục nhiều tin. |
| **BR-03** | Khử gửi trùng Fallback | Tin nhắn mở đầu được thiết kế để đón khách. Vì vậy, tin nhắn đầu tiên đã kích hoạt Welcome thì **hệ thống tuyệt đối không gửi kèm Tin nhắn mặc định (Fallback)**. |
| **BR-04** | Kiểm tra vòng lặp bước | Khi người dùng liên kết `Chọn bước tiếp theo`, hệ thống phải chặn không cho chọn chính bước đó và kiểm tra không tạo chu trình lặp vô tận (A -> B -> A). |
| **BR-05** | Biến thông tin rỗng | Nếu nội dung chứa `{customer_phone}` mà hồ sơ khách hàng chưa có số điện thoại, hệ thống tự động thay thế bằng chuỗi rỗng `""` thay vì in ra mã lỗi thô. |
| **BR-06** | Tính tức thời của công tắc | Gạt công tắc `Kích hoạt` sang Tắt sẽ có hiệu lực ngay lập tức với các tin nhắn đến sau đó mà không cần bấm Lưu form. |

---

## 6. Checklist kiểm thử cho Developer (Self-Test Scenarios)

- [ ] **Bật khi rỗng**: Vào trang chưa có nội dung, thử gạt bật `Kích hoạt` -> Hệ thống chặn lại và thông báo: *"Chưa có nội dung tin nhắn mở đầu"*.
- [ ] **Validation 640 ký tự**: Soạn văn bản vượt 640 ký tự -> Ô nhập chặn ký tự thứ 641, counter hiển thị `640/640`.
- [ ] **Validation nút 20 ký tự**: Nhập tên nút quá 20 ký tự -> Chặn không cho nhập tiếp.
- [ ] **Gửi đúng 1 lần / Phiên**: Dùng tài khoản test gửi tin "Hello". Bot gửi tin nhắn mở đầu. Ngay sau đó gửi tiếp "Alo" -> Bot **không** gửi lại tin nhắn mở đầu.
- [ ] **Không gửi trùng Fallback**: Gửi tin "Hi" mở đầu phiên -> Xác nhận chỉ nhận được tin nhắn mở đầu, không bị nhận thêm câu tin nhắn mặc định ("Hiện tại nhân viên đang bận...").
- [ ] **Chống vòng lặp**: Tại Bước 1, chọn bước tiếp theo là Bước 2. Tại Bước 2 chọn bước tiếp theo là Bước 1 -> Bấm Lưu -> Hệ thống báo lỗi phát hiện vòng lặp không hợp lệ.
