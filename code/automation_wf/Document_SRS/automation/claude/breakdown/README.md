# Danh mục Functional Requirement Automation sau breakdown

## 1. Mục đích

Thư mục này chứa bộ FR đã được phân rã từ 7 FR tổng hợp `FR-AUT-001` đến `FR-AUT-007`. Mỗi FR mới có một mục tiêu nghiệp vụ chính, có thể được phát triển, kiểm thử và nghiệm thu độc lập nhưng vẫn nêu rõ dependency với các FR liên quan.

Quy ước mã mới: `FR-AUT-xxx`.

Business Rule được quản lý tại [BR_AUTOMATION.md](BR_AUTOMATION.md). Acceptance Criteria được quản lý tại [AC_AUTOMATION.md](AC_AUTOMATION.md). Trong từng FR chỉ lưu mã tham chiếu BR và AC.

## 2. Danh sách FR mới

| Mã mới | Tên file | Nguồn | Phạm vi chính |
|---|---|---|---|
| FR-AUT-001 | `FR_AUT_001 (Danh mục Menu chính).md` | FR-AUT-001 cũ | Xem, tạo, đổi tên, nhân bản và xóa menu |
| FR-AUT-002 | `FR_AUT_002 (Biên tập mục Menu chính).md` | FR-AUT-001 cũ | CRUD, sắp xếp và cấu hình action của mục menu |
| FR-AUT-003 | `FR_AUT_003 (Xuất bản, phân phối và thống kê Menu chính).md` | FR-AUT-001 cũ | Lưu, đồng bộ, gán menu cho khách và thống kê |
| FR-AUT-004 | `FR_AUT_004 (Quản lý danh sách Câu hỏi thường gặp).md` | FR-AUT-002 cũ | Danh sách nháp, thêm, sửa và xóa câu hỏi |
| FR-AUT-005 | `FR_AUT_005 (Cấu hình hành động Câu hỏi thường gặp).md` | FR-AUT-002 cũ | Hành động chính và hành động bổ sung |
| FR-AUT-006 | `FR_AUT_006 (Xuất bản và vận hành Câu hỏi thường gặp).md` | FR-AUT-002 cũ | Publish, hiển thị, runtime và số liệu |
| FR-AUT-007 | `FR_AUT_007 (Quản lý Tin nhắn mở đầu).md` | FR-AUT-003 cũ | Trạng thái rỗng, chi tiết, kích hoạt và chỉnh sửa |
| FR-AUT-008 | `FR_AUT_008 (Biên tập luồng Tin nhắn mở đầu).md` | FR-AUT-003 cũ | Bước, nội dung, nút, trả lời nhanh và preview |
| FR-AUT-009 | `FR_AUT_009 (Gửi và thống kê Tin nhắn mở đầu).md` | FR-AUT-003 cũ | Điều kiện phiên mới, thực thi và thống kê |
| FR-AUT-010 | `FR_AUT_010 (Quản lý Tin nhắn mặc định).md` | FR-AUT-004 cũ | Chi tiết, kích hoạt, mặc định và chỉnh sửa |
| FR-AUT-011 | `FR_AUT_011 (Biên tập luồng Tin nhắn mặc định).md` | FR-AUT-004 cũ | Bước, nội dung, nút, trả lời nhanh và preview |
| FR-AUT-012 | `FR_AUT_012 (Gửi và thống kê Tin nhắn mặc định).md` | FR-AUT-004 cũ | Fallback, giới hạn 24 giờ, thực thi và thống kê |
| FR-AUT-013 | `FR_AUT_013 (Danh sách và nhập hàng loạt Từ khóa).md` | FR-AUT-005 cũ | Tab, tìm kiếm, import, chọn hàng loạt và thứ tự |
| FR-AUT-014 | `FR_AUT_014 (Cấu hình và so khớp Từ khóa).md` | FR-AUT-005 cũ | Phạm vi, biểu thức khớp và độ ưu tiên |
| FR-AUT-015 | `FR_AUT_015 (Phản hồi và vận hành Từ khóa).md` | FR-AUT-005 cũ | Soạn phản hồi, kích hoạt và xử lý runtime |
| FR-AUT-016 | `FR_AUT_016 (Danh mục Kịch bản chăm sóc).md` | FR-AUT-006 cũ | Tạo, tìm kiếm, đổi tên, sao chép và xóa kịch bản |
| FR-AUT-017 | `FR_AUT_017 (Cấu hình bước Kịch bản chăm sóc).md` | FR-AUT-006 cũ | Lịch gửi, điều kiện, bước Tin nhắn và Hành động |
| FR-AUT-018 | `FR_AUT_018 (Đăng ký và thực thi Kịch bản chăm sóc).md` | FR-AUT-006 cũ | Subscription, scheduling, runtime và thống kê |
| FR-AUT-019 | `FR_AUT_019 (Danh mục Quy luật).md` | FR-AUT-007 cũ | Tạo, xem nhanh, đổi tên, sao chép, xóa và bật tắt |
| FR-AUT-020 | `FR_AUT_020 (Cấu hình sự kiện và điều kiện Quy luật).md` | FR-AUT-007 cũ | Trigger, tham số và bộ lọc |
| FR-AUT-021 | `FR_AUT_021 (Cấu hình hành động và thực thi Quy luật).md` | FR-AUT-007 cũ | Action, tần suất, thứ tự và runtime |

## 3. Quy tắc sử dụng

- FR nguồn trong thư mục cha được giữ nguyên để truy vết.
- Dev và QA dùng FR breakdown làm đơn vị triển khai và nghiệm thu.
- Một FR chỉ được đánh dấu hoàn tất khi toàn bộ mã AC mà FR tham chiếu trong `AC_AUTOMATION.md` đạt.
- Các label UI, giới hạn và lỗi phải ưu tiên theo thiết kế được duyệt; khi khác với FR nguồn phải cập nhật cả mapping và FR bị ảnh hưởng.
- Dependency không làm thay đổi phạm vi nghiệm thu của từng FR; dependency chỉ xác định điều kiện tích hợp.
- Nội dung BR và AC không ghi lặp lại trong file FR. Khi cần thay đổi, chỉ cập nhật danh mục tập trung và rà soát các mã tham chiếu.
