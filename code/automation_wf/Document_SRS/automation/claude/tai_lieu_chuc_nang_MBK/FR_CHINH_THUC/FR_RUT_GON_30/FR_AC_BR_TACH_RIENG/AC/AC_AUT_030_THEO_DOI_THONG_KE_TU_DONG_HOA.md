# AC-AUT-030 — Theo dõi thống kê tự động hóa

> FR tham chiếu: FR-AUT-030

## AC-AUT-030-01: Phân biệt số khách và số lượt

| Mục | Nội dung |
| --- | --- |
| Given | Một khách thực hiện nhiều tương tác hợp lệ trong cùng nguồn, phiên bản và phạm vi báo cáo. |
| When | Hệ thống tính thống kê. |
| Then | Số khách chỉ tăng một. |
| And | Số lượt tăng theo số tương tác hợp lệ. |

## AC-AUT-030-02: Sự kiện nhận lại không tăng số liệu

| Mục | Nội dung |
| --- | --- |
| Given | Một tương tác đã được ghi nhận và hệ thống nhận lại cùng mã sự kiện. |
| When | Hệ thống cập nhật thống kê. |
| Then | Số lượt không tăng. |
| And | Số khách và các trạng thái liên quan cũng không tăng trùng. |

## AC-AUT-030-03: Màn hình và tệp xuất nhất quán

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng chọn cùng bộ lọc và cùng mốc dữ liệu. |
| When | Người dùng xem màn hình rồi xuất tệp. |
| Then | Các giá trị trên màn hình và tệp xuất bằng nhau. |
| And | Tên và định nghĩa chỉ số được giữ nhất quán. |

## AC-AUT-030-04: Không tính dữ liệu thử

| Mục | Nội dung |
| --- | --- |
| Given | Có dữ liệu từ Xem trước, Xem thử và dữ liệu hoạt động thật. |
| When | Hệ thống tổng hợp thống kê thật. |
| Then | Dữ liệu thử bị loại. |
| And | Chỉ dữ liệu hoạt động thật xuất hiện trên màn hình và tệp xuất. |

## AC-AUT-030-05: Không gộp trạng thái gửi

| Mục | Nội dung |
| --- | --- |
| Given | Nguồn có kết quả Đã gửi, Đã nhận và Đã đọc. |
| When | Hệ thống hiển thị thống kê. |
| Then | Ba trạng thái được hiển thị riêng. |
| And | Một trạng thái không bị dùng thay cho trạng thái khác. |

## AC-AUT-030-06: Hiển thị chỉ số không được hỗ trợ

| Mục | Nội dung |
| --- | --- |
| Given | Kênh không cung cấp dữ liệu cho một chỉ số. |
| When | Người dùng mở báo cáo có chỉ số đó. |
| Then | Hệ thống hiển thị Không được hỗ trợ thay vì số 0. |
| And | Tệp xuất giữ cùng cách biểu diễn. |

## AC-AUT-030-07: Đặt lại không xóa lịch sử

| Mục | Nội dung |
| --- | --- |
| Given | Báo cáo đã có dữ liệu trước mốc đặt lại. |
| When | Người dùng thực hiện Đặt lại. |
| Then | Hệ thống tạo mốc báo cáo mới. |
| And | Dữ liệu trước mốc vẫn có thể truy vết khi chọn phạm vi phù hợp. |

