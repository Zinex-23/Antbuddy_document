# Bộ yêu cầu chức năng Automation hội thoại Antbot

> Phiên bản biên tập nghiệp vụ: 1.1<br>
> Ngày cập nhật: 06/10/2026<br>
> Phạm vi: 12 chức năng Automation

## 1. Mục đích

Bộ tài liệu mô tả người dùng có thể cấu hình gì, hệ thống xử lý hội thoại ra sao, khách hàng nhận được gì và điều kiện nào được xem là hoàn thành đúng. Tài liệu dành cho Product, BA, UI/UX, QA, quản lý và đội phát triển.

Các yêu cầu được nghiên cứu từ Botcake nhưng không mặc định mọi nội dung là hành vi đã được Botcake xác minh. Điểm chưa đủ căn cứ được đánh dấu **[Cần xác nhận]** và tổng hợp tại [Danh sách cần xác nhận](CAN_XAC_NHAN.md). Chi tiết triển khai dành cho đội kỹ thuật nằm tại [Phụ lục kỹ thuật](PHU_LUC_KY_THUAT.md).

Mười hai FR là mười hai phạm vi nghiệp vụ, không mặc định là mười hai mục menu trên giao diện.

## 2. Danh sách chức năng

| Mã | Chức năng | Người dùng nhận được gì | Tài liệu |
| --- | --- | --- | --- |
| FR-AUT-001 | Menu mặc định | Một menu điều hướng dùng khi khách không có menu riêng | [Chi tiết](FR_AUT_001_MENU_MAC_DINH.md) |
| FR-AUT-002 | Menu tùy chỉnh | Menu riêng có thể gán/gỡ cho từng khách | [Chi tiết](FR_AUT_002_MENU_TUY_CHINH.md) |
| FR-AUT-003 | Câu hỏi thường gặp | Danh sách câu hỏi gợi ý để khách bấm | [Chi tiết](FR_AUT_003_CAU_HOI_THUONG_GAP.md) |
| FR-AUT-004 | Tin nhắn mở đầu | Lời chào khi một phiên đủ điều kiện bắt đầu | [Chi tiết](FR_AUT_004_TIN_NHAN_MO_DAU.md) |
| FR-AUT-005 | Từ khóa | Một phản hồi phù hợp với từ/cụm từ khách gửi | [Chi tiết](FR_AUT_005_TU_KHOA.md) |
| FR-AUT-006 | Quản lý nhãn | Danh mục nhãn và khả năng gắn/gỡ nhãn cho khách | [Chi tiết](FR_AUT_006_QUAN_LY_NHAN.md) |
| FR-AUT-007 | Kịch bản chăm sóc | Chuỗi bước được thực hiện theo thời gian cho khách đã đăng ký | [Chi tiết](FR_AUT_007_KICH_BAN_CHAM_SOC.md) |
| FR-AUT-008 | Quy tắc | Tự động hóa theo KHI – NẾU – THÌ | [Chi tiết](FR_AUT_008_QUY_TAC.md) |
| FR-AUT-009 | Tự động cập nhật User Field | Cập nhật trường thông tin mở rộng trong hồ sơ khách | [Chi tiết](FR_AUT_009_TU_DONG_CAP_NHAT_USER_FIELD.md) |
| FR-AUT-010 | Thu thập thông tin khách hàng | Hỏi, kiểm tra, lưu câu trả lời và chuyển câu tiếp theo | [Chi tiết](FR_AUT_010_THU_THAP_THONG_TIN_KHACH_HANG.md) |
| FR-AUT-011 | Thống kê | Báo cáo số khách, lần gửi, nhận, đọc, bấm, chuyển đổi và lỗi | [Chi tiết](FR_AUT_011_THONG_KE.md) |
| FR-AUT-012 | Tin nhắn mặc định | Phản hồi dự phòng khi không chức năng nào xử lý tin nhắn | [Chi tiết](FR_AUT_012_TIN_NHAN_MAC_DINH.md) |

Xem [Ma trận phạm vi](SCOPE_MATRIX.md) khi một công việc liên quan nhiều chức năng.

## 3. Quan hệ giữa các chức năng

- Menu mặc định là phương án hiển thị khi khách không có Menu tùy chỉnh hợp lệ.
- Menu và FAQ chuyển lựa chọn của khách đến hành động đã cấu hình; chúng không tự thực hiện thay chức năng đích.
- Thu thập thông tin nhận câu trả lời trước Từ khóa và yêu cầu Cập nhật User Field lưu giá trị hợp lệ.
- Quy tắc quyết định khi nào gọi các hành động như đổi menu, gắn nhãn, đăng ký kịch bản hoặc cập nhật trường. Chức năng sở hữu dữ liệu thực hiện thay đổi.
- Kịch bản chăm sóc thực hiện nhiều bước theo thời gian sau khi khách được đăng ký.
- Thống kê chỉ tiếp nhận kết quả; không sửa dữ liệu nghiệp vụ của chức năng nguồn.

## 4. Bản nháp, xuất bản và kích hoạt

- **Bản nháp** là nội dung đang chỉnh sửa. Lưu bản nháp không thay đổi điều khách đang thấy hoặc luồng đang chạy.
- **Xuất bản** là tạo một phiên bản đủ điều kiện để áp dụng. Nếu cần đồng bộ với nền tảng, bản mới chỉ được dùng sau khi đồng bộ thành công.
- **Kích hoạt** là cho phép bản đã xuất bản tham gia xử lý thực tế. Một số chức năng có thể xuất bản nhưng vẫn đang tắt.
- Luồng đang chạy giữ phiên bản đã bắt đầu, trừ khi tài liệu của chức năng nêu một thao tác chuyển phiên bản riêng.
- Xem trước và thử nghiệm không gửi thật, không thay đổi dữ liệu thật và không tạo số liệu báo cáo thật.

## 5. Thứ tự xử lý hội thoại

Thứ tự đang được tài liệu sử dụng và cần Product xác nhận toàn bộ tại `CONF-009`:

1. Nếu nhân viên đang tiếp quản hoặc bot bị tạm dừng, Automation không tự phản hồi.
2. Nếu khách đang trong phiên Thu thập thông tin chờ câu trả lời, FR-AUT-010 nhận tin; Từ khóa không xử lý cùng tin.
3. Nếu không, FR-AUT-005 kiểm tra Từ khóa và chọn tối đa một quy tắc.
4. Nếu không có từ khóa phù hợp, tin được chuyển tới AI/kỹ năng bot.
5. Nếu vẫn không được xử lý, FR-AUT-012 quyết định gửi phản hồi dự phòng theo khoảng nghỉ.
6. Quy tắc có thể phản ứng với sự kiện nghiệp vụ phát sinh; Thống kê ghi nhận kết quả mà không làm chậm luồng chính.

Tin nhắn mở đầu là phản ứng với việc bắt đầu phiên, không phải phản hồi khi bot không hiểu. Lựa chọn từ Menu/FAQ là dữ liệu có cấu trúc và không được dò lại như tin nhắn tự nhập.

## 6. Nguyên tắc chung để nghiệm thu

Một chức năng chỉ hoàn thành khi luồng chính và ngoại lệ đã được kiểm thử; mọi AC có kết quả rõ ràng; quyền và việc tách dữ liệu giữa doanh nghiệp/kênh được kiểm thử; cùng một yêu cầu không tạo tác động trùng; lịch sử thao tác đủ để truy vết; xem trước không tạo tác động thật; và lỗi kết nối không làm mất bản nháp.
