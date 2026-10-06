# Bộ yêu cầu chức năng Automation — 30 FR

> Ngày tạo: 06/10/2026<br>
> Trạng thái: Bản biên tập để bộ phận nghiệp vụ/sản phẩm xác nhận

## Mục đích

Bộ tài liệu gồm 30 FR theo năng lực cấu hình và vận hành. Năm mã FR-AUT-008, 009, 013, 019 và 025 đã được loại bỏ; nội dung cần giữ đã được nhập vào FR-AUT-006/007, 011, 018 và 024. Các mã còn lại được giữ nguyên để không làm mất khả năng truy vết.

Mỗi FR sử dụng đúng 12 mục: Mô tả, Đối tượng liên quan, Pre-conditions, Điều kiện kích hoạt, Luồng xử lý chính, Post-condition, Luồng thay thế, Sub-flow, Giao diện hệ thống, Yêu cầu phi chức năng, AC tương ứng và BR tương ứng.

Nội dung được tổng hợp từ bộ 12 FR, tài liệu `driver/SRS_Automation_18FR.docx` và báo cáo review đi kèm. Nội dung chưa đủ căn cứ được đánh dấu **[Cần xác nhận]** và tổng hợp tại [Danh sách cần xác nhận](CAN_XAC_NHAN.md).

## Danh mục FR

| Nhóm chức năng | Mã | Tên đề mục FR | Tài liệu |
| --- | --- | --- | --- |
| Trình biên soạn tin nhắn — dùng chung | FR-AUT-001 | Biên soạn nội dung tin nhắn | [Chi tiết](FR_AUT_001_BIEN_SOAN_NOI_DUNG_TIN_NHAN.md) |
| | FR-AUT-002 | Cấu hình nút trong tin nhắn | [Chi tiết](FR_AUT_002_CAU_HINH_NUT_TRONG_TIN_NHAN.md) |
| | FR-AUT-003 | Cấu hình trả lời nhanh | [Chi tiết](FR_AUT_003_CAU_HINH_TRA_LOI_NHANH.md) |
| | FR-AUT-004 | Tạo và liên kết các bước trong luồng tin nhắn | [Chi tiết](FR_AUT_004_TAO_VA_LIEN_KET_CAC_BUOC_TRONG_LUONG_TIN_NHAN.md) |
| | FR-AUT-005 | Xem trước và xem thử luồng tin nhắn | [Chi tiết](FR_AUT_005_XEM_TRUOC_VA_XEM_THU_LUONG_TIN_NHAN.md) |
| Menu chính | FR-AUT-006 | Cấu hình menu mặc định | [Chi tiết](FR_AUT_006_CAU_HINH_MENU_MAC_DINH.md) |
| | FR-AUT-007 | Tạo và chỉnh sửa menu tùy chỉnh | [Chi tiết](FR_AUT_007_TAO_VA_CHINH_SUA_MENU_TUY_CHINH.md) |
| | FR-AUT-010 | Đồng bộ menu lên kênh chat | [Chi tiết](FR_AUT_010_DONG_BO_MENU_LEN_KENH_CHAT.md) |
| Câu hỏi thường gặp | FR-AUT-011 | Thiết lập câu hỏi gợi ý | [Chi tiết](FR_AUT_011_THIET_LAP_CAU_HOI_GOI_Y.md) |
| | FR-AUT-012 | Cấu hình phản hồi cho câu hỏi gợi ý | [Chi tiết](FR_AUT_012_CAU_HINH_PHAN_HOI_CHO_CAU_HOI_GOI_Y.md) |
| Tin nhắn mở đầu | FR-AUT-014 | Cấu hình tin nhắn mở đầu | [Chi tiết](FR_AUT_014_CAU_HINH_TIN_NHAN_MO_DAU.md) |
| | FR-AUT-015 | Tự động gửi tin nhắn mở đầu | [Chi tiết](FR_AUT_015_TU_DONG_GUI_TIN_NHAN_MO_DAU.md) |
| Tin nhắn mặc định | FR-AUT-016 | Cấu hình phản hồi mặc định | [Chi tiết](FR_AUT_016_CAU_HINH_PHAN_HOI_MAC_DINH.md) |
| | FR-AUT-017 | Tự động phản hồi khi bot không tìm được câu trả lời | [Chi tiết](FR_AUT_017_TU_DONG_PHAN_HOI_KHI_BOT_KHONG_TIM_DUOC_CAU_TRA_LOI.md) |
| Từ khóa | FR-AUT-018 | Thiết lập điều kiện nhận diện tin nhắn | [Chi tiết](FR_AUT_018_THIET_LAP_DIEU_KIEN_NHAN_DIEN_TIN_NHAN.md) |
| | FR-AUT-020 | Quản lý trạng thái và ưu tiên từ khóa | [Chi tiết](FR_AUT_020_QUAN_LY_TRANG_THAI_VA_UU_TIEN_TU_KHOA.md) |
| | FR-AUT-021 | Nhập từ khóa từ tệp | [Chi tiết](FR_AUT_021_NHAP_TU_KHOA_TU_FILE.md) |
| | FR-AUT-022 | Tự động xử lý tin nhắn khớp từ khóa | [Chi tiết](FR_AUT_022_TU_DONG_XU_LY_TIN_NHAN_KHOP_TU_KHOA.md) |
| Kịch bản chăm sóc | FR-AUT-023 | Tạo và quản lý kịch bản chăm sóc | [Chi tiết](FR_AUT_023_TAO_VA_QUAN_LY_KICH_BAN_CHAM_SOC.md) |
| | FR-AUT-024 | Cấu hình các bước chăm sóc | [Chi tiết](FR_AUT_024_CAU_HINH_CAC_BUOC_CHAM_SOC.md) |
| | FR-AUT-026 | Đăng ký và hủy theo dõi kịch bản | [Chi tiết](FR_AUT_026_DANG_KY_VA_HUY_THEO_DOI_KICH_BAN.md) |
| | FR-AUT-027 | Tự động thực hiện kịch bản theo lịch | [Chi tiết](FR_AUT_027_TU_DONG_THUC_HIEN_KICH_BAN_THEO_LICH.md) |
| Quy luật | FR-AUT-028 | Tạo và quản lý quy luật tự động | [Chi tiết](FR_AUT_028_TAO_VA_QUAN_LY_QUY_LUAT_TU_DONG.md) |
| | FR-AUT-029 | Cấu hình sự kiện và điều kiện kích hoạt | [Chi tiết](FR_AUT_029_CAU_HINH_SU_KIEN_VA_DIEU_KIEN_KICH_HOAT.md) |
| | FR-AUT-030 | Cấu hình hành động và tần suất thực hiện | [Chi tiết](FR_AUT_030_CAU_HINH_HANH_DONG_VA_TAN_SUAT_THUC_HIEN.md) |
| | FR-AUT-031 | Tự động thực hiện quy luật khi có sự kiện | [Chi tiết](FR_AUT_031_TU_DONG_THUC_HIEN_QUY_LUAT_KHI_CO_SU_KIEN.md) |
| Khả năng hỗ trợ tự động hóa | FR-AUT-032 | Gắn và gỡ nhãn khách hàng | [Chi tiết](FR_AUT_032_GAN_VA_GO_NHAN_KHACH_HANG.md) |
| | FR-AUT-033 | Thu thập thông tin khách hàng | [Chi tiết](FR_AUT_033_THU_THAP_THONG_TIN_KHACH_HANG.md) |
| | FR-AUT-034 | Tự động cập nhật thông tin khách hàng | [Chi tiết](FR_AUT_034_TU_DONG_CAP_NHAT_THONG_TIN_KHACH_HANG.md) |
| | FR-AUT-035 | Theo dõi thống kê tự động hóa | [Chi tiết](FR_AUT_035_THEO_DOI_THONG_KE_TU_DONG_HOA.md) |

## Nguyên tắc xuyên suốt

- Bản nháp không tác động đến khách cho đến khi được áp dụng hoặc xuất bản thành công.
- Xem trước và xem thử không tạo tác động hoặc số liệu thực tế.
- Tin do bot hoặc chức năng tự động hóa gửi không được quay lại chức năng dò Từ khóa hay phản hồi mặc định.
- Chức năng điều phối chỉ yêu cầu chức năng sở hữu dữ liệu thực hiện thay đổi.
- Cùng một tin nhắn, sự kiện hoặc công việc được nhận lại không tạo tác động logic thứ hai.
- Mọi giới hạn về số lượng và độ dài phải lấy theo khả năng của kênh, trừ khi nghiệp vụ phê duyệt một giới hạn chung cho sản phẩm.
