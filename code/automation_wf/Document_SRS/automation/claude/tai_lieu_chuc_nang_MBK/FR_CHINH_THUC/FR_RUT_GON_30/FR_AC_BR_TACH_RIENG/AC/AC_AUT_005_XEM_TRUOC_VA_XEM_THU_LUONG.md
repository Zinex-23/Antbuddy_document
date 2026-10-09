# AC-AUT-005 — Xem trước và xem thử luồng

> FR tham chiếu: FR-AUT-005

## AC-AUT-005-01: Xem trước đúng bản nháp

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng đã chọn một bản nháp có nhiều khối nội dung. |
| When | Người dùng mở Xem trước. |
| Then | Hệ thống hiển thị đúng nội dung và thứ tự của bản nháp. |
| And | Không có hành động hoặc thay đổi dữ liệu thật. |

## AC-AUT-005-02: Xem thử đúng nhánh

| Mục | Nội dung |
| --- | --- |
| Given | Luồng có các nhánh theo nút hoặc câu trả lời. |
| When | Người dùng tương tác trong Xem thử. |
| Then | Hệ thống đi đúng nhánh theo cấu hình. |
| And | Tên bước và lịch sử đường đi được hiển thị. |

## AC-AUT-005-03: Mô phỏng hành động dữ liệu

| Mục | Nội dung |
| --- | --- |
| Given | Luồng thử có hành động gắn nhãn, cập nhật trường hoặc đăng ký kịch bản. |
| When | Người dùng chạy qua các bước đó trong Xem thử. |
| Then | Hệ thống chỉ hiển thị kết quả mô phỏng. |
| And | Hồ sơ khách, nhãn và tiến trình thật không thay đổi. |

## AC-AUT-005-04: Không ghi thống kê thật

| Mục | Nội dung |
| --- | --- |
| Given | Một phiên Xem thử được hoàn thành với nhiều tương tác. |
| When | Người dùng mở thống kê thật. |
| Then | Dữ liệu phiên thử không xuất hiện. |
| And | Các chỉ số thật giữ nguyên. |

## AC-AUT-005-05: Hiển thị bước lỗi

| Mục | Nội dung |
| --- | --- |
| Given | Bản nháp có một bước thiếu cấu hình. |
| When | Người dùng chạy Xem thử tới bước đó. |
| Then | Hệ thống dừng tại bước lỗi và nêu nguyên nhân. |
| And | Phiên thử không làm hỏng hoặc sửa bản nháp. |

