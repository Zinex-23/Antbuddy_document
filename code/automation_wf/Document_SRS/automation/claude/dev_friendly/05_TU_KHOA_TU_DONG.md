# FR-05: Từ Khóa Tự Động (Keyword Auto-Reply)

## 1. Tổng quan tính năng (What & Why)
Tính năng **Từ khóa tự động** cho phép hệ thống tự động "bắt" các từ ngữ hoặc câu hỏi phổ biến mà khách hàng nhắn vào Fanpage (ví dụ: *"giá bao nhiêu"*, *"địa chỉ"*, *"ship cod"*, *"khuyến mãi"*) và gửi ngay câu trả lời tương ứng mà không cần nhân viên hỗ trợ.

Hệ thống hỗ trợ cơ chế so khớp thông minh (Chứa từ, Chính xác, Bắt đầu/Kết thúc...), sắp xếp độ ưu tiên theo thứ tự kéo thả, và hỗ trợ import hàng loạt từ file Excel.

---

## 2. Giao diện & Luồng người dùng (Admin Workflow)

### Màn hình 1: Danh mục Từ khóa
- **Hai Tab phân loại**:
  - `Cho khách hàng`: Bắt từ khóa trong tin nhắn do khách hàng gửi đến.
  - `Cho trang`: Bắt từ khóa trong các tương tác/bình luận hướng về phía trang.
- **Thanh công cụ**:
  - Ô tìm kiếm từ khóa theo tên hoặc cụm từ.
  - Nút `Tải lên` (Import file Excel/CSV): Mở popup tải file mẫu, upload và xem kết quả kiểm tra từng dòng (dòng nào lỗi format báo chi tiết).
  - Nút `Thêm mới`: Mở popup cấu hình biểu thức từ khóa.
- **Bảng danh sách từ khóa**:
  - Hỗ trợ **kéo thả** (Drag handle) để thay đổi **Độ ưu tiên** (Từ khóa ở trên cùng có độ ưu tiên cao nhất khi có nhiều từ khóa cùng khớp).
  - Checkbox chọn từng dòng hoặc chọn tất cả -> Hiển thị thanh thao tác hàng loạt (**Bulk Bar**): *Bật hàng loạt*, *Tắt hàng loạt*, *Xóa hàng loạt*.
  - Các cột: Độ ưu tiên, Tên/Cụm từ khóa, Loại so khớp, Nội dung phản hồi, Lượt khớp, Công tắc Bật/Tắt, Menu ba chấm (Sửa, Xóa).

### Màn hình 2: Cấu hình Điều kiện so khớp (Popup / Drawer)
1. **Phạm vi so khớp**: Chọn phạm vi kiểm tra trong tin nhắn.
2. **Các nhóm điều kiện**:
   - `Chứa từ`: Tin nhắn có chứa bất kỳ từ nào trong danh sách.
   - `Không chứa từ`: Tin nhắn không được chứa các từ này (phủ định).
   - `Bắt đầu bằng`: Tin nhắn phải bắt đầu bằng cụm từ này.
   - `Kết thúc bằng`: Tin nhắn phải kết thúc bằng cụm từ này.
   - `Chính xác`: Toàn bộ tin nhắn phải khớp chính xác 100% với cụm từ.
3. **Quy tắc logic**:
   - **Quan hệ OR**: Các từ cách nhau bởi dấu phẩy hoặc phím Enter trong cùng một ô (Khớp từ A **HOẶC** từ B).
   - **Quan hệ AND**: Giữa các ô điều kiện khác nhau (Phải *Chứa từ A* **VÀ** *Không chứa từ B*).
4. **Cấu hình Câu trả lời (Response)**:
   - Dùng trình soạn thảo tin nhắn (**Message Composer**) để soạn câu trả lời (Text, ảnh, video, nút bấm, gọi bot flow...).

---

## 3. Luồng xử lý Runtime (Backend & Matcher Engine)

Khi khách hàng nhắn một tin đến, Matcher Engine xử lý theo các bước:

```
[Tin nhắn từ khách đến (Inbound Message)]
                   │
                   ▼
[1. Chuẩn hóa chuỗi (Text Normalization)]
      ├─ Trim bỏ khoảng trắng đầu/cuối và khoảng trắng thừa ở giữa
      └─ Chuyển về chữ thường (lowercase) & chuẩn hóa Unicode NFC
                   │
                   ▼
[2. Tải danh sách Từ khóa Active theo thứ tự ưu tiên (Order)]
      └─ SELECT * FROM keywords WHERE pageId = ? AND enabled = true ORDER BY priority ASC
                   │
                   ▼
[3. So khớp từng từ khóa từ trên xuống dưới]
      ├─ Đánh giá biểu thức (AND giữa các ô, OR trong từng ô)
      ├─ Khớp từ khóa đầu tiên (Winner Keyword)?
      │     ├─ DỪNG so khớp các từ khóa phía dưới! (Single Winner Principle)
      │     ├─ Gửi câu trả lời của từ khóa thắng cuộc
      │     └─ Tăng đếm: `matchCount = matchCount + 1`
      └─ Không khớp ──> Chuyển sang từ khóa tiếp theo trong danh sách
```

---

## 4. Mô hình Dữ liệu (Database Schema / DTO)

### Bảng `keywords`
```typescript
interface Keyword {
  id: string; // UUID
  pageId: string;
  direction: 'INBOUND_CUSTOMER' | 'PAGE_ACTION'; // Cho khách hoặc Cho trang
  priority: number; // 1, 2, 3... (Số càng nhỏ ưu tiên càng cao)
  enabled: boolean;
  completionStatus: 'COMPLETE' | 'NEEDS_CONFIG'; // Đã đủ câu trả lời hay chưa
  matchExpression: {
    containsAny?: string[]; // Quan hệ OR
    notContainsAny?: string[];
    startsWithAny?: string[];
    endsWithAny?: string[];
    exactMatch?: string[];
  };
  responseRef: {
    type: 'MESSAGE_GRAPH' | 'FLOW';
    payloadId: string;
  };
  matchCount: number; // Lượt khớp thành công
  updatedAt: Date;
}
```

---

## 5. Quy tắc nghiệp vụ & Xử lý ngoại lệ (Business Rules & Edge Cases)

| Mã BR | Tình huống | Quy tắc xử lý |
|---|---|---|
| **BR-01** | Xung đột nhiều từ khóa khớp | **Chỉ từ khóa có độ ưu tiên cao nhất thắng (Winner-take-all)**. Nếu khách nhắn *"Tư vấn giá"* và khớp cả từ khóa *"giá"* (ưu tiên 1) lẫn *"tư vấn"* (ưu tiên 2), hệ thống CHỈ chạy từ khóa *"giá"*, không gửi 2 tin nhắn phản hồi cùng lúc. |
| **BR-02** | Điều kiện rỗng | Biểu thức từ khóa bắt buộc phải có ít nhất một giá trị so khớp hợp lệ. Không cho phép lưu biểu thức rỗng. |
| **BR-03** | Bật từ khóa chưa có câu trả lời | Từ khóa chỉ được phép gạt Bật công tắc hoạt động khi: Biểu thức hợp lệ **VÀ** đã cấu hình nội dung câu trả lời hợp lệ. Nếu thiếu câu trả lời, hệ thống chặn bật và đánh dấu `Cần cấu hình lại`. |
| **BR-04** | Import file lỗi một phần | Khi import file Excel 100 dòng, nếu có 5 dòng sai format, hệ thống **vẫn import thành công 95 dòng hợp lệ**, đồng thời xuất thông báo hoặc file log ghi rõ: *"Lỗi tại dòng 12, 45, 67: Thiếu từ khóa bắt buộc"*. |
| **BR-05** | Chuẩn hóa Unicode tiếng Việt | Hệ thống tự động xử lý các biến thể tiếng Việt (ví dụ dấu tổ hợp và dấu dựng sẵn) để đảm bảo khách gõ kiểu gì cũng so khớp chính xác. |

---

## 6. Checklist kiểm thử cho Developer (Self-Test Scenarios)

- [ ] **Khớp biểu thức CHỨA**: Cấu hình từ khóa chứa `giá, bao nhiêu`. Khách nhắn `"Cho em hỏi giá váy này bao nhiêu ạ"` -> Bot nhận diện khớp và gửi câu trả lời.
- [ ] **Khớp biểu thức PHỦ ĐỊNH (Không chứa)**: Cấu hình chứa `địa chỉ`, không chứa `cũ`.
  - Khách nhắn `"Cho xin địa chỉ"` -> Bot trả lời.
  - Khách nhắn `"Địa chỉ cũ còn mở cửa không"` -> Bot **không** trả lời.
- [ ] **Độ ưu tiên (Drag & drop)**:
  - Tạo Từ khóa A (vị trí 1): `"son"`
  - Tạo Từ khóa B (vị trí 2): `"son dưỡng"`
  - Khách nhắn `"Tôi muốn mua son dưỡng"` -> Bot chỉ kích hoạt Từ khóa A.
  - Kéo Từ khóa B lên vị trí 1 -> Khách nhắn lại -> Bot kích hoạt Từ khóa B.
- [ ] **Import Excel**: Upload file test gồm 5 dòng đúng và 1 dòng để trống từ khóa -> Kiểm tra hệ thống nhận 5 dòng và báo lỗi dòng thứ 6.
- [ ] **Thao tác hàng loạt (Bulk Action)**: Tích chọn 3 từ khóa -> Bấm `Tắt hàng loạt` -> Cả 3 từ khóa chuyển sang trạng thái Tắt và không bắt tin nhắn nữa.
