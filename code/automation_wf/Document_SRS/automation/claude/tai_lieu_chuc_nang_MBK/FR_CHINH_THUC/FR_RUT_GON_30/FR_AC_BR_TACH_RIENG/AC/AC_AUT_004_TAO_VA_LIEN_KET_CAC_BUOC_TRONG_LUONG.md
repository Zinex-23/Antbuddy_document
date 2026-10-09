# AC-AUT-004 — Tạo và liên kết các bước trong luồng

> FR tham chiếu: FR-AUT-004

## AC-AUT-004-01: Lưu luồng 30 bước

| Mục | Nội dung |
| --- | --- |
| Given | Luồng có một bước bắt đầu và 29 bước hợp lệ. |
| When | Người dùng thêm bước thứ 30 và lưu. |
| Then | Hệ thống chấp nhận luồng. |
| And | Mọi liên kết hợp lệ vẫn được giữ. |

## AC-AUT-004-02: Chặn bước thứ 31

| Mục | Nội dung |
| --- | --- |
| Given | Luồng đã có 30 bước. |
| When | Người dùng thêm bước thứ 31. |
| Then | Hệ thống chặn thao tác và nêu giới hạn 30 bước. |
| And | Ba mươi bước hiện có không bị thay đổi. |

## AC-AUT-004-03: Cho phép lần chạy thứ năm

| Mục | Nội dung |
| --- | --- |
| Given | Một bước trong liên kết quay lại đã chạy 4 lần trong cùng lượt chạy. |
| When | Luồng quay lại bước đó lần thứ 5. |
| Then | Hệ thống cho phép bước thực hiện. |
| And | Bộ đếm vòng lặp ghi nhận lần thứ 5. |

## AC-AUT-004-04: Dừng ở lần chạy thứ sáu

| Mục | Nội dung |
| --- | --- |
| Given | Một bước đã chạy đủ 5 lần trong cùng lượt chạy. |
| When | Luồng yêu cầu chạy bước đó lần thứ 6. |
| Then | Hệ thống dừng luồng và ghi lỗi vòng lặp. |
| And | Không có bước sau nào được tự động thực hiện. |

## AC-AUT-004-05: Bước chờ khách không tự chuyển

| Mục | Nội dung |
| --- | --- |
| Given | Luồng đang ở bước chờ khách và chưa có tương tác phù hợp. |
| When | Thời gian xử lý nội bộ kết thúc. |
| Then | Hệ thống vẫn giữ trạng thái chờ. |
| And | Bước tiếp theo chưa được thực hiện. |

## AC-AUT-004-06: Phân biệt đường nối và điểm kết thúc

| Mục | Nội dung |
| --- | --- |
| Given | Luồng có đường chuyển tiếp thường, nhánh Điều kiện và điểm kết thúc. |
| When | Người dùng lưu luồng. |
| Then | Đường thường cần bước đích; nhánh Điều kiện cần điều kiện và bước đích; điểm kết thúc được phép không có đích. |
| And | Hệ thống chỉ báo lỗi đúng thành phần còn thiếu. |

