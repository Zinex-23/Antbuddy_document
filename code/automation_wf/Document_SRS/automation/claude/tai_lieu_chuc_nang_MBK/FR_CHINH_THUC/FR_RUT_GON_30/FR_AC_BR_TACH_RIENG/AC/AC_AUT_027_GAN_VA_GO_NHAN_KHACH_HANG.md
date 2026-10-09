# AC-AUT-027 — Gắn và gỡ nhãn khách hàng

> FR tham chiếu: FR-AUT-027

## AC-AUT-027-01: Gắn nhãn hợp lệ

| Mục | Nội dung |
| --- | --- |
| Given | Khách và nhãn cùng phạm vi, nhãn còn hiệu lực và khách chưa có nhãn. |
| When | Hệ thống nhận yêu cầu gắn. |
| Then | Nhãn xuất hiện trên hồ sơ khách. |
| And | Lịch sử lưu nguồn và thời gian thay đổi. |

## AC-AUT-027-02: Gỡ nhãn hợp lệ

| Mục | Nội dung |
| --- | --- |
| Given | Khách đang có nhãn hợp lệ. |
| When | Hệ thống nhận yêu cầu gỡ. |
| Then | Nhãn không còn trên hồ sơ khách. |
| And | Lịch sử lưu nguồn và thời gian thay đổi. |

## AC-AUT-027-03: Gắn nhãn đã có là thành công không đổi dữ liệu

| Mục | Nội dung |
| --- | --- |
| Given | Khách đã có nhãn được yêu cầu gắn. |
| When | Hệ thống nhận lại yêu cầu gắn. |
| Then | Hệ thống trả thành công. |
| And | Không tạo quan hệ nhãn thứ hai. |

## AC-AUT-027-04: Gỡ nhãn chưa có là thành công không đổi dữ liệu

| Mục | Nội dung |
| --- | --- |
| Given | Khách không có nhãn được yêu cầu gỡ. |
| When | Hệ thống nhận yêu cầu gỡ. |
| Then | Hệ thống trả thành công. |
| And | Không có dữ liệu khác trên hồ sơ bị thay đổi. |

## AC-AUT-027-05: Yêu cầu đồng thời không tạo trùng

| Mục | Nội dung |
| --- | --- |
| Given | Hai yêu cầu gắn cùng nhãn cho cùng khách đến đồng thời. |
| When | Hệ thống xử lý cả hai yêu cầu. |
| Then | Khách chỉ có một quan hệ với nhãn. |
| And | Mỗi yêu cầu nhận kết quả rõ ràng. |

## AC-AUT-027-06: Từ chối nhãn không hợp lệ

| Mục | Nội dung |
| --- | --- |
| Given | Nhãn bị xóa, sai phạm vi hoặc người yêu cầu không có quyền. |
| When | Hệ thống nhận yêu cầu gắn hoặc gỡ. |
| Then | Hệ thống từ chối thao tác và nêu lý do. |
| And | Hồ sơ khách không bị thay đổi. |

