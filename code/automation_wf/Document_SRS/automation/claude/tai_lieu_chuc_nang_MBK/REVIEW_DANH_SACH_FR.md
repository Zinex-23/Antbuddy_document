# BẢN REVIEW CHI TIẾT DANH SÁCH 13 FR TỪ ĐỒNG NGHIỆP (MBK)

> **Tài liệu tham chiếu**: Danh sách 13 FR do bạn của bạn đề xuất cho module Automation:
> - `FR-AUT-001`: Chỉnh sửa menu mặc định
> - `FR-AUT-002`: Thêm mới menu
> - `FR-AUT-003`: Tạo mới câu hỏi thường gặp
> - `FR-AUT-004`: Chỉnh sửa câu hỏi thường gặp
> - `FR-AUT-005`: Tạo mới Tin nhắn mở đầu
> - `FR-AUT-006`: Chỉnh sửa Tin nhắn mở đầu
> - `FR-AUT-007`: Tạo mới tin nhắn mặc định
> - `FR-AUT-008`: Chỉnh sửa tin nhắn mặc định
> - `FR-AUT-009`: Tạo mới từ khóa
> - `FR-AUT-010`: Xem danh sách từ khóa
> - `FR-AUT-011`: Chỉnh sửa từ khóa
> - `FR-AUT-012`: Kịch bản chăm sóc
> - `FR-AUT-013`: Thêm mới quy luật

---

## 1. Đánh giá Tổng quan về Cách Phân Rã Này

Cách tiếp cận của bạn bạn là **"Screen/Action-Based Breakdown" (Phân rã theo từng nút bấm/thao tác CRUD trên màn hình)**. 

### Ưu điểm:
1. **Dễ hiểu theo góc nhìn người dùng cuối (User Flow)**: Nhìn vào là biết ngay admin sẽ bấm nút gì trên thanh công cụ.
2. **Dễ viết Test Case thủ công cho QA**: Tester có thể viết riêng kịch bản test cho form Tạo mới và form Chỉnh sửa.
3. **Phân biệt đúng Menu mặc định vs Menu tùy chỉnh (FR-001 vs FR-002)**: Menu mặc định không bao giờ có nút "Tạo mới" hay "Xóa" (mỗi page chỉ có đúng 1 menu mặc định), nên việc tách FR-001 là hoàn toàn chính xác.

---

## 2. Các Điểm Bất Cập Cốt Tử & Rủi Ro Lớn (Cần Sửa Gấp)

Tuy nhiên, nếu dùng nguyên văn 13 FR này để làm tài liệu đặc tả kỹ thuật (SRS) giao cho Dev và QA, hệ thống sẽ gặp **5 vấn đề nghiêm trọng**:

---

### Vấn đề 1: Nhầm lẫn bản chất giữa "Tạo mới" và "Chỉnh sửa" ở Tin mở đầu & Tin mặc định
- **Thực tế hệ thống**: Mỗi trang **chỉ có duy nhất 1 Tin nhắn mở đầu** và **1 Tin nhắn mặc định**.
- Khi trang mới kết nối, nó ở trạng thái rỗng (`EMPTY_STATE`). Khi người dùng bấm "Tạo mới" lần đầu hay bấm "Chỉnh sửa" lần sau, hệ thống **mở ra cùng 1 màn hình Editor y hệt nhau**, cùng 1 cấu trúc lưu trữ và cùng 1 logic validation!
- **Hậu quả**: Viết `FR-005: Tạo mới` và `FR-006: Chỉnh sửa` riêng sẽ làm 2 file bị **trùng lặp nội dung đến 95%**. Sau này khi đổi quy tắc (ví dụ: giới hạn văn bản từ 640 thành 1000 ký tự), BA phải nhớ sửa ở cả 2 file, rất dễ bị lệch spec.
- 👉 **Khắc phục**: Gộp thành 1 FR: *"Quản lý & Cấu hình Tin nhắn mở đầu"* (trong đó có nhánh luồng từ Empty State và nhánh luồng Chỉnh sửa). Tương tự cho Tin nhắn mặc định.

---

### Vấn đề 2: Xé vụn bất hợp lý ở phần Từ khóa (CRUD Fragmentation)
- Danh sách tách thành: `FR-009: Tạo mới`, `FR-010: Xem danh sách`, `FR-011: Chỉnh sửa`.
- **Thực tế**: Một tính năng quản lý danh mục (như Từ khóa) gồm: Bảng danh sách + Popup Thêm/Sửa. Popup Thêm và Popup Sửa dùng **chung 1 Form component**, chung bộ kiểm tra kiểu khớp (`EXACT`, `CONTAINS`, `REGEX`), chung trường gán phản hồi.
- Tách làm 3 FR khiến tài liệu bị vụn vặt, người đọc phải nhảy qua lại giữa 3 file chỉ để hiểu 1 màn hình đơn giản.
- 👉 **Khắc phục**: Gom `FR-009, 010, 011` thành 1 FR duy nhất: *"Quản lý Từ khóa tự động"*.

---

### Vấn đề 3: Sự mất cân đối nghiêm trọng (Asymmetry)
- Nhìn vào danh sách có sự chênh lệch rất lớn về độ phức tạp:
  - Những mục đơn giản như Từ khóa thì chẻ làm 3 FR (`FR-009, 010, 011`).
  - Nhưng đến **FR-AUT-012: Kịch bản chăm sóc** (tính năng phức tạp nhất hệ thống với: tạo kịch bản, thêm bước, lập lịch hẹn giờ, khung giờ 08:30-18:00, điều kiện dừng, múi giờ) lại gom tất cả vào **đúng 1 FR duy nhất**!
  - Đến **FR-AUT-013: Thêm mới quy luật**: Chỉ có "Thêm mới", vậy "Xem danh sách quy luật", "Chỉnh sửa quy luật", "Bật/Tắt quy luật" biến đi đâu? Bị bỏ quên hoàn toàn!

---

### Vấn đề 4: RỦI RO LỚN NHẤT — Hoàn toàn bỏ quên "Vận hành Bot (Runtime)"
Cả 13 FR của bạn bạn chỉ mô tả **Giao diện Web của Admin (CRUD Web UI)**. Hoàn toàn không trả lời được các câu hỏi sống còn của Backend:
1. Khi khách gõ tin nhắn vào Fanpage, Từ khóa quét thế nào?
2. Khi khách bắt đầu phiên mới, Lời chào kích hoạt ra sao? Có gửi đè từ khóa không?
3. Khi kịch bản chăm sóc đến hạn gửi lúc 22:00 đêm thì hệ thống xử lý hoãn lịch ra sao?
4. Quy luật tự động bắt sự kiện (Trigger) nào để chạy chuỗi hành động?
5. Nếu bot không hiểu thì Tin mặc định gửi khi nào, kiểm soát tần suất thế nào để không spam khách?
- 👉 Nếu chỉ có 13 FR này, **Dev Backend hoàn toàn không biết code bot như thế nào**!

---

### Vấn đề 5: Bỏ quên các thao tác Hủy/Xóa nguy hiểm (Destructive Actions)
Danh sách chỉ tập trung vào "Tạo mới" và "Chỉnh sửa", nhưng thiếu các quy tắc xử lý khi:
- Xóa một Menu tùy chỉnh đang có 500 khách hàng sử dụng thì khách sẽ thấy menu gì? (SRS quy định: tự động về Menu mặc định).
- Xóa một câu hỏi FAQ hoặc xóa một kịch bản đang có khách chạy thì tiến trình bị hủy thế nào?
- Thao tác Bật/Tắt công tắc trạng thái (`ACTIVE` / `INACTIVE`).

---

## 3. Bảng Đối Chiếu Đề Xuất Cải Tiến (Recommendations)

Dưới đây là 2 phương án bạn có thể lựa chọn:

### Phương án A: Tối ưu và Hoàn thiện danh sách của bạn bạn (Khuyên dùng)
Gom các phần trùng lặp, bổ sung các thao tác bị thiếu và thêm FR về Bot Runtime. Bộ tài liệu sẽ gồm **9 đến 10 FR cực kỳ chuẩn mực và cân đối**:

| Mã FR mới | Tên Chức Năng Đề Xuất | Thay thế cho các FR cũ của bạn bạn | Lý do cải tiến |
|---|---|---|---|
| **FR-AUT-001** | **Cấu hình Menu mặc định** | `FR-AUT-001` | Giữ nguyên. Menu mặc định chỉ có Chỉnh sửa, không có Tạo/Xóa. |
| **FR-AUT-002** | **Quản lý Menu tùy chỉnh** | `FR-AUT-002` | Mở rộng: bao gồm Tạo mới, Sửa, Nhân bản, Xóa và Chuyển menu. |
| **FR-AUT-003** | **Quản lý Câu hỏi thường gặp** | `FR-AUT-003, FR-AUT-004` | Gom Tạo mới & Sửa vào chung 1 form cấu hình; bổ sung xóa FAQ. |
| **FR-AUT-004** | **Cấu hình Tin nhắn mở đầu** | `FR-AUT-005, FR-AUT-006` | Gom Tạo mới & Sửa (vì cùng 1 editor); bổ sung công tắc Kích hoạt. |
| **FR-AUT-005** | **Cấu hình Tin nhắn mặc định** | `FR-AUT-007, FR-AUT-008` | Gom Tạo mới & Sửa; bổ sung cài đặt tần suất gửi tin (Rate limit). |
| **FR-AUT-006** | **Quản lý Từ khóa tự động** | `FR-AUT-009, 010, 011` | Gom Danh sách + Tạo mới + Sửa + Xóa vào 1 module CRUD hoàn chỉnh. |
| **FR-AUT-007** | **Quản lý Kịch bản chăm sóc** | `FR-AUT-012` | Chuẩn hóa: Danh sách, Cấu hình bước, Lập lịch và Điều kiện thoát. |
| **FR-AUT-008** | **Quản lý Quy luật tự động** | `FR-AUT-013` | Bổ sung: Danh sách quy luật, Sửa, Xóa, Bật/Tắt và Chống lặp vô tận. |
| **FR-AUT-009** | **Điều phối Xử lý Tin nhắn (Runtime)** | *(Chưa có trong ds cũ)* | **BẮT BUỘC**: Thứ tự ưu tiên khi khách nhắn: Từ khóa ➔ Welcome ➔ Fallback. |
| **FR-AUT-010** | **Đo lường & Báo cáo số liệu** | *(Chưa có trong ds cũ)* | **BẮT BUỘC**: Thống kê số người dùng, tỷ lệ đọc, click, để lại SĐT. |

---

### Phương án B: Giữ nguyên 13 mã FR của bạn bạn và chuẩn hóa lại nội dung bên trong
Nếu nhóm của bạn đã chốt danh sách mã từ `FR-AUT-001` đến `FR-AUT-013` trên Jira hoặc kế hoạch dự án, tôi sẽ viết đầy đủ 13 file tài liệu theo đúng mã này, nhưng **bổ sung các luồng nghiệp vụ bị thiếu** vào trong từng file:
- `FR-005` (Tạo mới Welcome) và `FR-006` (Sửa Welcome): Làm rõ ngữ cảnh Empty State vs Edit State.
- `FR-012` (Kịch bản): Viết chi tiết toàn bộ chuỗi lập lịch hẹn giờ.
- `FR-013` (Quy luật): Bổ sung cả phần Sửa, Xóa và Vận hành trigger.

---

> **Kết luận tư vấn**: 
> Danh sách của bạn bạn có hướng đi bám sát màn hình rất trực quan cho Tester, nhưng bị **vụn vặt ở phần Từ khóa/Welcome/Default** và **thiếu hẳn phần Bot Runtime**. 
> Bạn nên chọn **Phương án A (10 FR cân đối)** để tài liệu chuyên nghiệp, chuẩn mực và dễ bảo trì nhất!
