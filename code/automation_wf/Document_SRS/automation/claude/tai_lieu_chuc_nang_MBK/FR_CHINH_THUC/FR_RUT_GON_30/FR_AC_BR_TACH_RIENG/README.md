# Bộ FR – AC – BR tách riêng

> Ngày biên tập: 09/10/2026  
> Nguồn: bộ 30 FR tại thư mục cha, CAN_XAC_NHAN.md, SRS Automation và checklist review đính kèm.

## Cấu trúc

- FR/DANH_SACH_FR.md: chỉ liệt kê mã và tên 30 FR.
- AC/: mỗi FR có một tài liệu Acceptance Criteria riêng.
- BR/: mỗi FR có một tài liệu Business Rules riêng.

## Quy ước AC

Mỗi AC là một tình huống độc lập và luôn có đúng bốn phần:

| Mục | Nội dung |
| --- | --- |
| Given | Điều kiện ban đầu |
| When | Hành động hoặc sự kiện |
| Then | Kết quả chính quan sát được |
| And | Kết quả bổ sung hoặc điều kiện không được vi phạm |

## Quy ước BR

- Giữ các quy tắc có căn cứ từ bộ FR nguồn.
- Nội dung chưa đủ căn cứ được ghi rõ **[CẦN XÁC NHẬN]** và không được dùng để viết AC khẳng định hành vi.
- Không dùng tài liệu này để thay đổi các mục Mô tả, luồng xử lý, giao diện hoặc yêu cầu phi chức năng của FR nguồn.

