# Báo cáo review AC và BR — bản tinh gọn

> Ngày review: 09/10/2026  
> Phạm vi: FR-AUT-001 đến FR-AUT-030

## Kết quả

| Hạng mục | Bản cũ lưu lịch sử | Bản chuẩn hóa nên dùng |
| --- | ---: | ---: |
| FR | 30 | 30 |
| AC | 181 tình huống trong 30 file | 30 AC trong 30 file — đúng 1 AC/FR |
| BR | 207 BR theo từng FR | 65 BR dùng chung |
| Điểm mở | 28 | 0 |

## Thay đổi chính

- Gộp các BR lặp thành quy tắc dùng chung và bổ sung cột FR/AC tương ứng.
- Viết lại mỗi AC thành một tiêu chí end-to-end có đúng Given, When, Then và And.
- Audit lại traceability hai chiều: 42 BR đặc thù một FR và 23 BR dùng chung cho nhiều FR; cột AC chỉ ghi tiêu chí có bước kiểm chứng trực tiếp.
- Chốt toàn bộ 28 điểm mở bằng tài liệu Botcake, SRS/nội dung nội bộ và baseline BA được ghi rõ nguồn.
- Điều chỉnh giới hạn theo tài liệu Botcake hiện hành: 1.200 ký tự cho khối văn bản không nút, 640 ký tự khi có nút, 3 nút, 11 trả lời nhanh và 25 MB mỗi tệp; giới hạn thấp hơn của kênh luôn được ưu tiên.
- Giữ nguyên hai thư mục AC/ và BR/ để đối chiếu lịch sử.

## Nguồn chính

- SRS AntBot v1.3: dùng mẫu BR dùng chung và AC Given/When/Then/And.
- Tài liệu Botcake chính thức: Message setup, Dynamic block, Keywords, Welcome Message, Default Reply, Sequences, API statistics và Custom Field.
- Đặc tả menu cập nhật và template Automation trong repository.
- Quyết định thiết kế AntBuddy đối với các chi tiết nhà cung cấp không công bố.

Chi tiết từng quyết định và liên kết nguồn nằm tại BR_CHUAN_HOA/QUYET_DINH_VA_NGUON.md.

## Kết quả kiểm tra

- Đủ và liên tục BR-AUT-001 đến BR-AUT-065.
- Đủ AC-AUT-001 đến AC-AUT-030; mỗi file có đúng một bảng Given/When/Then/And.
- Mọi liên kết BR → AC đều có liên kết ngược AC → BR; FR của AC luôn nằm trong phạm vi FR của BR tương ứng.
- Không còn tiêu chí treo trong AC_CHUAN_HOA hoặc BR_CHUAN_HOA.
- Liên kết tới 30 file AC, SRS và đặc tả menu đều tồn tại.
- Bộ cũ vẫn còn đủ 30 file AC và 30 file BR.
