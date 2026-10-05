# FR-02: Câu Hỏi Thường Gặp (FAQ Suggestions)

## 1. Tổng quan tính năng (What & Why)
Tính năng **Câu hỏi thường gặp** (FAQ) cho phép cài đặt các nút câu hỏi gợi ý tự động xuất hiện ngay khi khách hàng mở khung trò chuyện trên Fanpage (ví dụ: *"Bảng giá dịch vụ?", "Địa chỉ cửa hàng ở đâu?", "Tư vấn sản phẩm"*). 

Khách hàng chỉ cần chạm vào câu hỏi có sẵn để nhận câu trả lời ngay lập tức, giảm tối đa thời gian chờ đợi và giảm tải cho nhân viên trực chat.

---

## 2. Giao diện & Luồng người dùng (Admin Workflow)

### Màn hình Chỉnh sửa FAQ
- **Thanh tiêu đề**: Đường dẫn `Câu hỏi thường gặp > Chỉnh sửa`, trạng thái xuất bản (`Bản nháp`, `Đang xuất bản`, `Đã xuất bản`, `Xuất bản thất bại`), nút `Xuất bản` và nút `Thử lại` (nếu lỗi).
- **Danh sách câu hỏi**:
  - Tối đa **4 câu hỏi**.
  - Hiển thị danh sách câu hỏi dạng thẻ hoặc dòng: gồm Nội dung câu hỏi, Tên hành động chính và danh sách Thẻ hành động bổ sung.
  - Bấm vào câu hỏi để mở popup sửa; có nút Xóa câu hỏi (icon thùng rác).
  - Nút `Thêm mới`: Click mở popup thêm câu hỏi (bị ẩn hoặc disable khi đã đủ 4 câu hỏi).
- **Mobile Preview (bên phải)**:
  - Giả lập khung chat với bong bóng chào và các nút câu hỏi gợi ý xếp theo đúng thứ tự 1, 2, 3, 4.
  - Cập nhật tức thời (reactive) khi người dùng nhập câu hỏi hoặc đổi hành động.

### Popup "Hiệu chỉnh nút câu hỏi"
1. **Ô nhập câu hỏi**: Bắt buộc, tối đa 80 ký tự, có bộ đếm ký tự `N/80`.
2. **Hành động chính khi bấm** (Chọn 1 trong 3):
   - **Tạo tin nhắn mới**: Mở trình soạn tin nhắn đồ thị (Message Composer) để soạn câu trả lời (văn bản tối đa 640 ký tự, chèn ảnh, video, nút bấm).
   - **Chọn luồng tin nhắn**: Mở popup chọn kịch bản/khối tin nhắn có sẵn của trang.
   - **Nhận thông báo (Opt-in)**: Gửi lời mời đăng ký nhận thông báo định kỳ.
3. **Mục "Hành động bổ sung"** (Optional):
   - Cho phép thêm nhiều hành động chạy kèm sau khi khách bấm câu hỏi (ví dụ: *Gắn thẻ "Quan tâm bảng giá"*, *Cập nhật trường tiềm năng*).
   - Nút `Thêm hành động` mở catalog hành động dùng chung. Có thể xóa từng hành động bổ sung.
4. **Nút Lưu & Hủy**: Bấm `Lưu` để kiểm tra validation và đưa vào bản nháp.

---

## 3. Luồng xử lý Runtime (Bot & Khách hàng tương tác)

```
[Khách mở khung chat] ──> Hiển thị tối đa 4 nút FAQ (từ bản Published)
                                  │
                                  ▼ (Khách bấm 1 câu hỏi)
               [1. Chặn xung đột Pipeline]
                     └─ Đánh dấu event là FAQ Click 
                     └─ KHÔNG kích hoạt Tin nhắn mở đầu, Từ khóa hay Fallback!
                                  │
                                  ▼
               [2. Chạy Action chính] ──> Gửi câu trả lời / Chạy bot flow
                                  │ (Thành công)
                                  ▼
               [3. Chạy các Action bổ sung theo thứ tự] (Gắn thẻ, CRM...)
                                  │
                                  ▼
               [4. Ghi nhận đo lường] (Tăng click count của FAQ Item)
```

### Xử lý lỗi Action bổ sung
Nếu một hành động bổ sung bị lỗi (ví dụ service CRM tạm gián đoạn), hệ thống **ghi log lỗi và vẫn tiếp tục thực thi các hành động bổ sung còn lại**, không làm gián đoạn câu trả lời của khách.

---

## 4. Mô hình Dữ liệu (Database Schema / DTO)

### Bảng `faq_configs` (Cấu hình FAQ của trang)
```typescript
interface FaqConfig {
  id: string; // UUID
  pageId: string; // ID trang
  version: number; // Tăng dần khi xuất bản
  publishStatus: 'DRAFT' | 'PUBLISHING' | 'PUBLISHED' | 'FAILED';
  items: FaqItem[];
  updatedAt: Date;
}

interface FaqItem {
  id: string; // UUID
  question: string; // Bắt buộc, max 80 chars
  order: number; // 1 đến 4
  primaryAction: {
    type: 'SEND_MESSAGE' | 'FLOW' | 'OPT_IN';
    payload: Record<string, any>; // graphId hoặc flowId
  };
  additionalActions: Array<{
    type: 'ADD_TAG' | 'UPDATE_CUSTOMER_FIELD' | 'REMOVE_TAG';
    payload: Record<string, any>;
  }>;
}
```

---

## 5. Quy tắc nghiệp vụ & Xử lý ngoại lệ (Business Rules & Edge Cases)

| Mã BR | Tình huống | Quy tắc xử lý |
|---|---|---|
| **BR-01** | Giới hạn 4 câu hỏi | Mỗi trang chỉ được tạo tối đa 4 câu hỏi FAQ. Đủ 4 câu thì ẩn nút `Thêm mới`. |
| **BR-02** | Trùng lặp câu hỏi | Không cho phép lưu 2 câu hỏi có nội dung giống nhau trong cùng 1 trang (không phân biệt hoa/thường, trim khoảng trắng thừa). |
| **BR-03** | Khử xung đột Router | Khi khách bấm câu hỏi FAQ, sự kiện này được xếp vào luồng ưu tiên cao. Hệ thống **tuyệt đối không gửi chồng** Tin nhắn mở đầu (Welcome) hay Tin nhắn mặc định (Default fallback) cho cùng lượt tương tác này. |
| **BR-04** | Tài nguyên liên kết bị xóa | Nếu luồng bot flow được liên kết trong câu hỏi bị quản trị viên xóa, câu hỏi sẽ tự động hiển thị nhãn đỏ `Cần cấu hình lại` và **chặn xuất bản** cho đến khi được chọn lại. |
| **BR-05** | Xuất bản danh sách rỗng | Hệ thống cho phép xuất bản khi danh sách có 0 câu hỏi (hiển thị popup xác nhận: *"Bạn có chắc muốn gỡ toàn bộ câu hỏi gợi ý trên Fanpage?"*). Khi xác nhận, hệ thống gọi API kênh để xóa các nút gợi ý. |
| **BR-06** | Idempotency Click | Nếu người dùng click liên tục nhiều lần vào câu hỏi trong 1-2 giây, hệ thống dựa vào `eventId` để chỉ phản hồi đúng 1 lần duy nhất. |

---

## 6. Checklist kiểm thử cho Developer (Self-Test Scenarios)

- [ ] **Thêm tối đa 4 câu hỏi**: Thêm lần lượt 4 câu hỏi. Kiểm tra câu thứ 4 xong thì nút `Thêm mới` biến mất hoặc bị disable.
- [ ] **Validation rỗng**: Bấm `Lưu` trong popup khi ô câu hỏi trống hoặc chưa chọn Action chính -> Báo đỏ trường lỗi, popup không đóng.
- [ ] **Validation ký tự**: Gõ quá 80 ký tự -> Ô nhập chặn ký tự thứ 81.
- [ ] **Action chính & Hành động bổ sung**: Chọn tạo tin nhắn trả lời + thêm hành động bổ sung gắn thẻ "TestTag". Vào chat với tư cách khách hàng bấm câu hỏi -> Nhận đúng tin nhắn trả lời VÀ kiểm tra CRM khách hàng được gắn đúng thẻ "TestTag".
- [ ] **Không gửi chồng tin nhắn khác**: Khi bấm câu hỏi FAQ lúc mới vào fanpage -> Kiểm tra bot chỉ gửi câu trả lời FAQ, KHÔNG gửi tin nhắn chào mừng (Welcome message).
- [ ] **Lỗi đồng bộ**: Ngắt kết nối mạng hoặc cấp sai Page Token rồi bấm `Xuất bản` -> Kiểm tra hệ thống hiển thị trạng thái `Xuất bản thất bại` kèm nút `Thử lại`, dữ liệu soạn thảo không bị mất.
