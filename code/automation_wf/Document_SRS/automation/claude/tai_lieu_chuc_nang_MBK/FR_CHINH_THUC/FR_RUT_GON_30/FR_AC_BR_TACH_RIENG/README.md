# Bộ FR – AC – BR tách riêng

> Ngày cập nhật: 09/10/2026.

## Bộ nên dùng

- FR/DANH_SACH_FR_CHUAN_HOA.md: danh sách 30 FR và liên kết.
- AC_CHUAN_HOA/: đúng 30 AC, mỗi FR có một AC end-to-end theo Given/When/Then/And.
- BR_CHUAN_HOA/DANH_MUC_BR_AUT.md: 65 BR dùng chung, không lặp theo từng FR.
- BR_CHUAN_HOA/QUYET_DINH_VA_NGUON.md: quyết định đã chốt, nguồn Botcake/SRS và phần nào là baseline BA.

## Bộ lưu lịch sử

- AC/ và BR/ là bản cũ, chỉ dùng đối chiếu; không dùng làm nguồn nghiệm thu mới.

## Nguyên tắc

- Một quy tắc chỉ được định nghĩa một lần trong danh mục BR.
- Một FR có đúng một AC, nhưng AC có thể kiểm chứng nhiều BR.
- Cột FR của BR ghi toàn bộ phạm vi áp dụng; cột AC chỉ ghi tiêu chí kiểm chứng trực tiếp, nên số mã ở hai cột có thể khác nhau.
- Khi kênh chat có giới hạn thấp hơn, luôn áp dụng giới hạn của kênh.
- Không còn điểm mở trong bộ chuẩn hóa; thay đổi mới phải cập nhật đồng thời quyết định, BR và AC liên quan.
