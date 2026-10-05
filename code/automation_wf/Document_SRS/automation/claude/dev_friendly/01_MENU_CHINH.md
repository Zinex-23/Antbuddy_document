# FR-01: Menu Chính (Persistent Menu & Custom Menus)

## 1. Tổng quan tính năng (What & Why)
Tính năng **Menu chính** cho phép doanh nghiệp cấu hình thanh menu điều hướng cố định nằm ở góc dưới khung chat (Messenger, Zalo...). Menu giúp khách hàng nhanh chóng tra cứu dịch vụ, xem giỏ hàng, nhận khuyến mãi hoặc gọi nhân viên mà không cần gõ phím.

### Phân loại Menu
1. **Menu mặc định**: Mỗi trang có **duy nhất 1 Menu mặc định**. Tất cả khách hàng mới vào chat sẽ nhìn thấy menu này. Không được xóa hoặc đổi tên.
2. **Menu tùy chỉnh**: Doanh nghiệp có thể tạo nhiều Menu tùy chỉnh (ví dụ: Menu khách VIP, Menu khách đã mua hàng, Menu sự kiện). Khách hàng chỉ thấy menu tùy chỉnh khi được hệ thống gán hoặc chuyển sang menu đó.

---

## 2. Giao diện & Luồng người dùng (Admin Workflow)

### Màn hình 1: Danh sách Menu
- **Thẻ Menu mặc định**: Hiển thị tên, trạng thái áp dụng và nút `Chỉnh sửa`.
- **Thẻ Menu tùy chỉnh**: Có nút `Tạo mới` (click vào sẽ tạo menu trống với tên tự sinh `Menu tùy chỉnh N`).
- **Danh sách Menu tùy chỉnh**: Mỗi dòng gồm:
  - Tên menu (click để xem Preview & Thống kê bên phải).
  - Trạng thái: `Đã áp dụng`, `Đang đồng bộ`, `Đồng bộ thất bại` (kèm nút `Thử lại`).
  - Nút `Chỉnh sửa`.
  - Nút menu ba chấm `...`: `Đổi tên`, `Nhân bản`, `Xóa`.
- **Khung Preview & Thống kê (bên phải)**: Khi click vào bất kỳ menu nào, cột bên phải lập tức hiển thị Mobile Preview và số liệu đo lường của menu đó (chỉ xem, không chuyển trang).

### Màn hình 2: Chỉnh sửa Menu
- **Thanh tiêu đề**: Nút `Quay lại`, ô sửa Tên menu (tối đa 50 ký tự, không áp dụng cho Menu mặc định), nút `Lưu` hoặc `Xuất bản`.
- **Danh sách "Các mục menu"**:
  - Bộ đếm số lượng: `N/20` mục.
  - Danh sách nút có hỗ trợ kéo thả (drag & drop) để thay đổi thứ tự.
  - Nút `Thêm mục menu` (bị disable khi đã đủ 20 mục).
- **Popup "Hiệu chỉnh nút"**:
  - `Tên hiển thị`: Bắt buộc, tối đa 30 ký tự, có bộ đếm ký tự `N/30`.
  - `Hành động khi bấm`: Chọn 1 trong 4 loại:
    1. *Tạo tin nhắn mới*: Nhập nội dung text tự động bot sẽ gửi lại.
    2. *Chọn luồng tin nhắn*: Chọn 1 kịch bản bot flow có sẵn của trang.
    3. *Nhận thông báo (Opt-in)*: Gửi yêu cầu đăng ký nhận tin định kỳ.
    4. *Mở trang web*: Nhập URL (bắt buộc `http://` hoặc `https://`, max 2048 ký tự).
  - `Chuyển menu sau khi nhấn`: Công tắc Bật/Tắt.
    - Khi Bật: Hiển thị dropdown `Menu đích` (bắt buộc chọn). Danh sách gồm Menu mặc định và các menu tùy chỉnh khác cùng trang (loại trừ chính menu đang sửa).
  - Nút `Xóa nút` (icon thùng rác) và nút `Lưu`.

---

## 3. Luồng xử lý Runtime (Backend & Kênh Chat)

### Luồng 1: Khách hàng mở khung chat
1. Hệ thống tìm xem khách hàng này (`customerId`) có bản ghi gán menu (`customerMenuAssignment`) hợp lệ hay không.
2. Nếu có: Tải `menuId` tùy chỉnh đã gán.
3. Nếu không có (hoặc menu đã gán bị xóa): Tự động hiển thị `Menu mặc định`.

### Luồng 2: Khách hàng bấm một mục menu (Postback / Click Event)
1. Kênh gửi webhook về kèm `customerId`, `pageId`, `menuItemId`, `eventId`.
2. **Kiểm tra chống lặp (Idempotency)**: Nếu `eventId` đã được xử lý trong vòng 60 giây qua, hệ thống trả HTTP 200 và bỏ qua.
3. **Thực thi Action chính**:
   - Nếu là `OPEN_URL`: Trình duyệt client tự mở link.
   - Nếu là `SEND_MESSAGE` / `FLOW` / `OPT_IN`: Hệ thống gửi gói tin phản hồi tương ứng.
4. **Xử lý Chuyển menu (nếu có bật)**:
   - Chỉ chuyển menu khi Action chính kích hoạt thành công.
   - Cập nhật bản ghi `customerMenuAssignment` của khách hàng đó sang `targetMenuId`.
   - Gọi API kênh để cập nhật persistent menu mới cho riêng khách hàng đó.
5. **Ghi nhận sự kiện đo lường**: Tăng đếm `clickCount` của mục menu và `readCount`.

---

## 4. Mô hình Dữ liệu (Database Schema / DTO)

### Bảng `menus` (Metadata Menu)
```typescript
interface Menu {
  id: string; // UUID
  pageId: string; // ID trang
  type: 'DEFAULT' | 'CUSTOM';
  name: string; // Tối đa 50 ký tự
  version: number; // Tự tăng khi publish
  publishStatus: 'DRAFT' | 'PUBLISHING' | 'PUBLISHED' | 'FAILED';
  createdAt: Date;
  updatedAt: Date;
}
```

### Bảng `menu_items` (Các nút trong menu)
```typescript
interface MenuItem {
  id: string; // UUID
  menuId: string;
  title: string; // Tối đa 30 ký tự
  order: number; // Thứ tự hiển thị 1, 2, 3... (max 20)
  actionType: 'SEND_MESSAGE' | 'FLOW' | 'OPT_IN' | 'OPEN_URL';
  actionPayload: Record<string, any>; // Lưu text, flowId hoặc url
  shouldSwitchMenu: boolean; // Có chuyển menu không
  targetMenuId?: string | null; // Menu đích nếu shouldSwitchMenu = true
}
```

### Bảng `customer_menu_assignments` (Gán menu cho từng khách)
```typescript
interface CustomerMenuAssignment {
  customerId: string;
  pageId: string;
  menuId: string; // Trỏ tới menu tùy chỉnh đang áp dụng
  assignedAt: Date;
}
```

---

## 5. Quy tắc nghiệp vụ & Xử lý ngoại lệ (Business Rules & Edge Cases)

| Mã BR | Tình huống | Quy tắc xử lý của hệ thống |
|---|---|---|
| **BR-01** | Giới hạn số nút | Mỗi menu có tối đa 20 mục. Đủ 20 mục thì nút thêm bị khóa. |
| **BR-02** | Xóa Menu mặc định | Không cho phép xóa hoặc đổi tên Menu mặc định trong bất kỳ trường hợp nào. |
| **BR-03** | Xóa Menu tùy chỉnh | Hiển thị hộp thoại cảnh báo: "Có X khách hàng đang dùng và Y nút đang trỏ tới menu này". Khi bấm Xóa: (1) Khách hàng tự động quay về Menu mặc định; (2) Các nút ở menu khác đang trỏ tới menu này tự động tắt công tắc chuyển menu. |
| **BR-04** | Trùng tên menu | Tên menu tùy chỉnh không được trùng nhau trong cùng một trang (không phân biệt hoa thường, tự động trim khoảng trắng). |
| **BR-05** | Nhân bản menu | Tạo bản sao chứa toàn bộ các nút và action của menu gốc. Tên tự đặt: `[Tên gốc] (bản sao)`. Không sao chép danh sách khách hàng đang gán và không sao chép dữ liệu thống kê. |
| **BR-06** | Mất mạng khi Publish | Nếu gọi API kênh đối tác thất bại: Dữ liệu đã lưu trong hệ thống vẫn giữ nguyên; trạng thái hiển thị `Đồng bộ thất bại` kèm nút `Thử lại`. Khách hàng trên kênh tiếp tục thấy phiên bản menu thành công gần nhất. |

---

## 6. Checklist kiểm thử cho Developer (Self-Test Scenarios)

- [ ] **Tạo menu**: Bấm `Tạo mới`, nhập tên menu, lưu thành công. Menu xuất hiện ở danh sách.
- [ ] **Thêm tối đa 20 nút**: Thêm lần lượt đến nút thứ 20. Xác nhận nút `Thêm mục menu` chuyển sang trạng thái disable và hiển thị cảnh báo.
- [ ] **Validation popup nút**: Để trống tên nút hoặc để trống URL khi chọn `Mở trang web` -> Bấm Lưu -> Hệ thống báo đỏ trường lỗi, popup không đóng.
- [ ] **Sắp xếp kéo thả**: Đổi vị trí nút 1 và nút 3 -> Bấm Lưu -> Tải lại trang thấy thứ tự được giữ nguyên.
- [ ] **Chuyển menu**: Tạo Menu B. Vào Menu A, tạo nút "Sang Menu B" bật chuyển menu tới Menu B. Dùng tài khoản test bấm nút -> Khung chat chuyển sang Menu B thành công.
- [ ] **Xóa menu đang được liên kết**: Xóa Menu B -> Kiểm tra nút ở Menu A tự động tắt công tắc chuyển menu mà không bị crash.
