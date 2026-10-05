# FR-00: Nền Tảng Kỹ Thuật Dùng Chung (Shared Foundation)

Tài liệu này gom 4 thành phần hạ tầng dùng chung mà mọi tính năng Automation đều dựa vào:
1. **Bộ chọn Trang & Phân quyền** (Page Context & Permissions)
2. **Trình soạn thảo Tin nhắn Đồ thị** (Shared Message Composer Graph)
3. **Danh mục Nút & Hành động** (Common Action Catalog & Payloads)
4. **Vòng đời Lưu nháp & Xuất bản** (Draft, Publish & Versioning Lifecycle)

---

## 1. Bộ chọn Trang & Phân quyền (Page Context & RBAC)

Mọi màn hình trong AntBot Automation đều bắt buộc chạy trong ngữ cảnh của một trang cụ thể (`activePageId`).

### Luồng xử lý kỹ thuật (Frontend & API)
- Khi người dùng truy cập bất kỳ trang nào của Automation, Frontend kiểm tra `activePageId` trong Session / LocalStorage / URL query.
- Nếu chưa có: Mở popup/dropdown `Chọn trang quản lý`.
- Danh sách trang trả về gồm: `pageId`, `pageName`, `avatarUrl`, `channelType` (Facebook, Zalo, Instagram...), `connectionStatus` (CONNECTED, DISCONNECTED), `userRole` (ADMIN, MANAGER, VIEWER).
- **Quyền hạn (RBAC)**:
  - `VIEWER`: Chỉ được xem dữ liệu (Read-only), ẩn hoặc disable toàn bộ nút Lưu, Thêm mới, Xóa, Bật/Tắt công tắc, Xuất bản.
  - `ADMIN / MANAGER`: Có toàn quyền thao tác.
- **Trạng thái mất kết nối (`DISCONNECTED`)**:
  - Cho phép xem dữ liệu đã lưu trong hệ thống.
  - Chặn các thao tác cần gọi sang Kênh đối tác (Meta/Zalo API) kèm cảnh báo: *"Trang đã mất kết nối. Vui lòng kết nối lại để xuất bản."*
- **Cảnh báo dữ liệu chưa lưu**: Khi đổi trang nếu màn hình đang có dữ liệu chưa lưu (`isDirty == true`), hiển thị Confirm Modal: *"Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời đi?"*.

---

## 2. Trình soạn thảo Tin nhắn Đồ thị (Message Composer Graph)

Trình soạn thảo được nhúng dùng chung tại: **FAQ, Tin nhắn mở đầu, Tin nhắn mặc định, Từ khóa, Bước gửi tin của Kịch bản chăm sóc**.

### Cấu trúc dữ liệu `ContentGraph` (JSON Schema)
```json
{
  "graphId": "graph_123456",
  "steps": [
    {
      "stepId": "step_01",
      "stepName": "Nội dung chào mừng",
      "messageType": "WITHIN_24H", // "WITHIN_24H" hoặc "OUTSIDE_24H"
      "internalNote": "Ghi chú nội bộ cho admin",
      "blocks": [
        {
          "blockId": "blk_01",
          "type": "TEXT", // TEXT, IMAGE, IMAGE_GROUP, CAROUSEL, TEMPLATE, VIDEO, AUDIO
          "text": "Chào mừng bạn {customer_name} đến với cửa hàng!",
          "buttons": [
            {
              "buttonId": "btn_01",
              "title": "Xem sản phẩm", // Max 20 ký tự
              "action": {
                "actionType": "OPEN_URL",
                "targetUrl": "https://antbuddy.com/shop"
              }
            }
          ],
          "quickReplies": [
            {
              "title": "Tư vấn ngay", // Max 20 ký tự
              "action": {
                "actionType": "FLOW",
                "flowId": "flow_tuvan_01"
              }
            }
          ]
        }
      ],
      "nextStepId": "step_02" // ID bước tiếp theo, hoặc null/END
    }
  ]
}
```

### Các ràng buộc cốt lõi (Dev cần nhớ)
- **Văn bản**: Tối đa 640 ký tự. Hỗ trợ biến thông tin dạng `{customer_name}`, `{customer_phone}`. Nếu khách chưa có dữ liệu, runtime tự thay bằng chuỗi rỗng `""`.
- **Nút bấm (Buttons) & Trả lời nhanh (Quick Replies)**: Tiêu đề tối đa 20 ký tự. Mỗi nút chỉ có 1 Action chính.
- **Mobile Preview**: Mô phỏng hiển thị tin nhắn thời gian thực (re-render reactive khi user gõ phím). Preview hoàn toàn là giả lập, không gọi API kênh chat và không ghi nhận số liệu.
- **Chống lặp vòng (Cycle Detection)**: Khi user liên kết `nextStepId`, hệ thống phải validate kiểm tra không tạo chu trình lặp vô tận (Graph Cycle).

---

## 3. Danh mục Nút & Hành động dùng chung (Action Catalog)

Mọi nơi có nút bấm (Menu, FAQ, Nút trong tin nhắn, Rule Actions) đều sử dụng chung một catalog hành động chuẩn:

| Mã Action (`actionType`) | Ý nghĩa | Các trường bắt buộc (`payload`) | Ghi chú vận hành |
|---|---|---|---|
| `SEND_MESSAGE` | Gửi một bước tin nhắn mới | `contentGraph` hoặc `stepId` | Bot trả lời trực tiếp nội dung vừa soạn |
| `FLOW` | Chạy một kịch bản/luồng có sẵn | `flowId` (UUID) | Gọi chạy bot flow từ bước đầu |
| `OPEN_URL` | Mở liên kết trang web | `url` (http/https, max 2048 ký tự) | Mở trình duyệt ngoài |
| `OPT_IN` | Đăng ký nhận thông báo | (Không có trường bổ sung) | Gửi notification request của kênh |
| `ADD_TAG` | Gắn thẻ khách hàng | `tagIds` (mảng ID thẻ) | Tương tác CRM/Customer Data |
| `REMOVE_TAG` | Gỡ thẻ khách hàng | `tagIds` (mảng ID thẻ) | Tương tác CRM |
| `UPDATE_CUSTOMER_FIELD` | Cập nhật trường thông tin | `fieldKey`, `fieldValue` | Lưu thông tin khách hàng |
| `SWITCH_MENU` | Chuyển menu cho khách hàng | `targetMenuId` | Chỉ dùng riêng cho Menu chính |

**Quy tắc đổi Action**: Khi người dùng đổi từ Action A sang Action B trên UI popup, hệ thống phải **reset toàn bộ payload của Action A**, chỉ validate và lưu payload của Action B.

---

## 4. Vòng đời Bản nháp & Xuất bản (Draft, Publish & Versioning)

Để đảm bảo việc chỉnh sửa của Admin không làm ảnh hưởng đến bot đang tiếp khách, mọi cấu hình đều tuân theo mô hình **Draft - Published Snapshot**.

```
[Chỉnh sửa trên UI] ──> (Bấm "Lưu nháp") ──> [Bản ghi Draft trong DB] (Khách chưa thấy)
                                │
                                ▼ (Bấm "Xuất bản")
                    [1. Validate toàn bộ dữ liệu]
                                │ (Hợp lệ)
                                ▼
                    [2. Tạo Published Snapshot (v1, v2...)]
                                │
                                ▼
                    [3. Đồng bộ lên Kênh API (Meta/Zalo)]
                         ├─ Thành công ──> Trạng thái: "Đã xuất bản" (Khách thấy ngay)
                         └─ Thất bại   ──> Trạng thái: "Xuất bản thất bại" + Nút "Thử lại"
                                           (Khách vẫn thấy Snapshot cũ)
```

### Các trạng thái xuất bản (`publishStatus`)
1. `DRAFT`: Đang có thay đổi chưa xuất bản.
2. `PUBLISHING`: Đang gọi đồng bộ sang kênh chat đối tác.
3. `PUBLISHED`: Đã xuất bản thành công, khách hàng đang tương tác với bản này.
4. `FAILED`: Đồng bộ lỗi (do token kênh hết hạn, lỗi mạng...). Dữ liệu nháp vẫn giữ nguyên 100%, không bị mất; hiển thị nút **"Thử lại"**.

### Cơ chế chống xung đột (Optimistic Locking)
- Mỗi bản ghi có trường `version` (int).
- Khi submit: `PUT /api/v1/automation/...` kèm `currentVersion`.
- Nếu version trong DB lớn hơn `currentVersion` (do người khác đã sửa trước): Backend trả về `HTTP 409 Conflict`. Frontend cảnh báo: *"Dữ liệu đã được cập nhật bởi quản trị viên khác. Vui lòng tải lại trang."*
