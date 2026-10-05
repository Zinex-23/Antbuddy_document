# Bộ đặc tả chức năng Automation chính thức

> Phiên bản: 1.0  
> Ngày hoàn thiện: 05/10/2026  
> Phạm vi: 12 chức năng Automation

## 1. Mục tiêu

Bộ tài liệu này là nguồn tham chiếu thống nhất cho BA, Product, UI/UX, Developer và QA. Mỗi năng lực chỉ có một FR sở hữu; FR khác chỉ tham chiếu bằng ID, event hoặc command, không định nghĩa lại nghiệp vụ.

## 2. Danh mục FR

Mỗi file FR dùng thống nhất một bảng hai cột `Mục | Nội dung` với đúng 12 dòng: Mô tả, Đối tượng liên quan, Pre-conditions, Điều kiện kích hoạt, Luồng xử lý chính, Post-condition, Luồng thay thế, Sub-flow, Giao diện hệ thống, Yêu cầu phi chức năng, AC tương ứng và BR tương ứng.

| Mã | Chức năng | Trách nhiệm chính | Tài liệu |
| --- | --- | --- | --- |
| FR-AUT-001 | Menu mặc định | Menu fallback duy nhất của mỗi kênh | [Chi tiết](FR_AUT_001_MENU_MAC_DINH.md) |
| FR-AUT-002 | Menu tùy chỉnh | Danh mục menu riêng và quan hệ gán menu cho khách | [Chi tiết](FR_AUT_002_MENU_TUY_CHINH.md) |
| FR-AUT-003 | Câu hỏi thường gặp | Danh sách câu hỏi gợi ý và xử lý khi bấm | [Chi tiết](FR_AUT_003_CAU_HOI_THUONG_GAP.md) |
| FR-AUT-004 | Tin nhắn mở đầu | Cấu hình và gửi lời chào đầu phiên | [Chi tiết](FR_AUT_004_TIN_NHAN_MO_DAU.md) |
| FR-AUT-005 | Từ khóa | Danh mục, biểu thức khớp và phản hồi từ khóa | [Chi tiết](FR_AUT_005_TU_KHOA.md) |
| FR-AUT-006 | Quản lý nhãn | Từ điển nhãn và quan hệ nhãn–khách hàng | [Chi tiết](FR_AUT_006_QUAN_LY_NHAN.md) |
| FR-AUT-007 | Kịch bản chăm sóc | Chuỗi bước, ghi danh và lập lịch thực thi | [Chi tiết](FR_AUT_007_KICH_BAN_CHAM_SOC.md) |
| FR-AUT-008 | Quy tắc | Trigger–Condition–Action và nhật ký thực thi | [Chi tiết](FR_AUT_008_QUY_TAC.md) |
| FR-AUT-009 | Tự động cập nhật User Field | Job ánh xạ nguồn dữ liệu sang User Field | [Chi tiết](FR_AUT_009_TU_DONG_CAP_NHAT_USER_FIELD.md) |
| FR-AUT-010 | Thu thập thông tin khách hàng | Phiên hỏi–đáp, validate và lưu câu trả lời | [Chi tiết](FR_AUT_010_THU_THAP_THONG_TIN_KHACH_HANG.md) |
| FR-AUT-011 | Thống kê | Tiêu chuẩn metric, ghi nhận event, truy vấn và xuất báo cáo | [Chi tiết](FR_AUT_011_THONG_KE.md) |
| FR-AUT-012 | Tin nhắn mặc định | Phản hồi fallback cuối cùng và cooldown chống spam | [Chi tiết](FR_AUT_012_TIN_NHAN_MAC_DINH.md) |

Xem [Ma trận phạm vi](SCOPE_MATRIX.md) khi một yêu cầu có vẻ thuộc nhiều FR.

## 3. Nền tảng dùng chung

### 3.1 Phân vùng và phân quyền

- Mọi dữ liệu nghiệp vụ thuộc một `tenantId` và `channelId`; không được đọc/ghi chéo tenant hoặc kênh.
- Quyền tối thiểu: `VIEW_AUTOMATION`, `MANAGE_AUTOMATION`, `PUBLISH_AUTOMATION`, `VIEW_ANALYTICS`, `EXPORT_ANALYTICS`.
- UI ẩn hoặc khóa thao tác không đủ quyền; API luôn kiểm tra lại.
- Xuất bản/gửi tin phải kiểm tra `channelCapabilities`; không giả định mọi kênh có cùng giới hạn.

### 3.2 Vòng đời cấu hình

- Cấu hình có phiên bản `DRAFT` và `PUBLISHED`; runtime chỉ đọc bản `PUBLISHED`.
- `ACTIVE/INACTIVE` là trạng thái chạy; chỉ bật được cấu hình đã hợp lệ.
- Mọi lệnh ghi có `requestId` để idempotency và `version` để chống ghi đè đồng thời.
- Tạo, sửa, xóa, publish, bật/tắt, reset và export phải có audit log.

### 3.3 Contract dùng chung

- `ContentRef`: tham chiếu nội dung do Composer/Flow quản lý. Các FR này không định nghĩa lại editor tin nhắn.
- `ActionRef`: `{type, targetId?, parameters?}`; owner của đối tượng đích kiểm tra tính hợp lệ.
- `CustomerEvent`: `{eventId, eventType, tenantId, channelId, customerId, occurredAt, source, correlationId, payload}`.
- Tham chiếu bị xóa/ngừng hoạt động làm consumer chuyển sang `NEEDS_RECONFIGURATION`; không tự chọn đối tượng thay thế.

## 4. Điều phối runtime

### 4.1 Tin nhắn khách gửi

1. Nếu hội thoại đang do nhân viên tiếp quản hoặc bot bị tạm dừng: Automation không phản hồi.
2. Nếu khách đang có phiên Thu thập thông tin chờ trả lời: FR-AUT-010 nhận tin nhắn; Từ khóa không xử lý cùng tin.
3. Nếu không: FR-AUT-005 đánh giá Từ khóa và chọn tối đa một winner.
4. Nếu không có winner: chuyển NLU/kỹ năng bot.
5. Nếu NLU/kỹ năng cũng không xử lý: Router phát `message.unhandled`; FR-AUT-012 quyết định gửi Fallback theo cooldown.
6. Event nghiệp vụ phát sinh được FR-AUT-008 lắng nghe; metric được FR-AUT-011 ghi nhận bất đồng bộ.

Tin nhắn mở đầu là event đầu phiên, không phải fallback và không tranh winner với Từ khóa.

### 4.2 Khách bấm Menu/FAQ

1. Hệ thống xác thực payload, kênh, khách và phiên bản đã publish.
2. Owner Menu/FAQ phát `action.requested`; Action Dispatcher thực thi action đích.
3. Payload click không được quét lại như tin nhắn tự do bởi FR-AUT-005.
4. FR-AUT-011 ghi nhận click theo `customerId + sourceId + publishedVersion`.

### 4.3 Event dữ liệu

- FR-AUT-006 sở hữu thao tác gắn/gỡ nhãn.
- FR-AUT-009 sở hữu job tính/ánh xạ và ghi User Field.
- FR-AUT-010 sở hữu phiên thu thập; khi câu trả lời hợp lệ, nó gọi command ghi field một lần.
- FR-AUT-008 chỉ điều phối command; không tự cài logic ghi nhãn/User Field/kịch bản.

## 5. Definition of Done chung

Một FR chỉ hoàn tất khi: luồng chính và ngoại lệ được triển khai; AC có test; phân quyền và cô lập tenant/kênh được test; event/command có idempotency; audit log đủ; preview/test không sinh tác động thật hoặc metric thật; lỗi connector không làm mất bản nháp.
