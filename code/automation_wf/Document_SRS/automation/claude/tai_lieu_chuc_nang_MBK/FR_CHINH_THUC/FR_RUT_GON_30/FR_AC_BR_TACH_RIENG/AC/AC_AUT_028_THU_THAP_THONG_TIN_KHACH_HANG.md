# AC-AUT-028 — Thu thập thông tin khách hàng

> FR tham chiếu: FR-AUT-028

## AC-AUT-028-01: Lưu câu trả lời hợp lệ

| Mục | Nội dung |
| --- | --- |
| Given | Phiên đang chờ Văn bản, Email hoặc Số điện thoại và khách trả lời đúng định dạng. |
| When | Hệ thống nhận câu trả lời. |
| Then | Giá trị được chuyển cho FR-AUT-029 lưu. |
| And | Chỉ sau khi lưu thành công hệ thống mới chuyển bước. |

## AC-AUT-028-02: Sai lần một và hai

| Mục | Nội dung |
| --- | --- |
| Given | Phiên đang chờ và khách chưa vượt giới hạn sai. |
| When | Khách gửi câu trả lời sai ở lần 1 hoặc lần 2. |
| Then | Hệ thống không lưu giá trị và hướng dẫn nhập lại. |
| And | Phiên tiếp tục chờ cùng câu hỏi. |

## AC-AUT-028-03: Sai lần thứ ba

| Mục | Nội dung |
| --- | --- |
| Given | Khách đã có 2 câu trả lời sai trong phiên. |
| When | Khách gửi câu trả lời sai lần thứ 3. |
| Then | Hệ thống không lưu giá trị và chuyển nhánh thất bại. |
| And | Nếu không có nhánh thất bại thì phiên kết thúc và giải phóng hội thoại. |

## AC-AUT-028-04: Bỏ qua theo cấu hình

| Mục | Nội dung |
| --- | --- |
| Given | Câu hỏi cho phép hoặc không cho phép Bỏ qua. |
| When | Khách bấm Bỏ qua. |
| Then | Hệ thống chỉ chuyển bước khi cấu hình cho phép. |
| And | Nếu không cho phép, phiên tiếp tục chờ và nêu lý do. |

## AC-AUT-028-05: Hủy phiên bằng lệnh chính xác

| Mục | Nội dung |
| --- | --- |
| Given | Phiên đang chờ câu trả lời. |
| When | Khách gửi đúng lệnh /huy. |
| Then | Hệ thống kết thúc toàn bộ phiên. |
| And | Giá trị chưa hợp lệ không được lưu và tin sau được giải phóng. |

## AC-AUT-028-06: Menu/FAQ không tính là câu trả lời sai

| Mục | Nội dung |
| --- | --- |
| Given | Phiên đang chờ và khách bấm Menu hoặc FAQ. |
| When | Hệ thống xử lý lượt bấm. |
| Then | Hành động Menu/FAQ được chạy nhưng số lần sai không tăng. |
| And | Lượt bấm không bị lưu vào trường và phiên vẫn chờ. |

## AC-AUT-028-07: Không yêu cầu nhập lại khi lưu lỗi tạm thời

| Mục | Nội dung |
| --- | --- |
| Given | Câu trả lời đã hợp lệ nhưng thao tác lưu gặp lỗi tạm thời. |
| When | Hệ thống xử lý lỗi lưu. |
| Then | Hệ thống giữ câu trả lời và thử lưu lại. |
| And | Khách không bị yêu cầu nhập lại ngay. |

## AC-AUT-028-08: Hết thời gian chờ

| Mục | Nội dung |
| --- | --- |
| Given | Phiên chưa hoàn thành và đạt mốc hết hạn 24 giờ theo mốc đang áp dụng. |
| When | Hệ thống xử lý hết hạn. |
| Then | Phiên chuyển nhánh thất bại hoặc kết thúc nếu không có nhánh. |
| And | Tin mới sau đó không còn bị phiên cũ giữ. |

