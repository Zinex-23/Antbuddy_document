# AC-AUT-024 — Cấu hình sự kiện và điều kiện

> FR tham chiếu: FR-AUT-024

## AC-AUT-024-01: Kết hợp nhiều sự kiện theo HOẶC

| Mục | Nội dung |
| --- | --- |
| Given | Quy luật có từ hai sự kiện hợp lệ. |
| When | Một trong các sự kiện phát sinh. |
| Then | Quy luật được đưa vào danh sách đánh giá. |
| And | Không yêu cầu tất cả sự kiện cùng xảy ra. |

## AC-AUT-024-02: Nhóm điều kiện Tất cả

| Mục | Nội dung |
| --- | --- |
| Given | Một sự kiện có nhóm điều kiện ở chế độ Tất cả. |
| When | Dữ liệu chỉ đạt một phần điều kiện rồi đạt toàn bộ điều kiện. |
| Then | Quy luật không đạt ở trường hợp đầu và đạt ở trường hợp sau. |
| And | Kết quả chỉ rõ điều kiện nào không đạt. |

## AC-AUT-024-03: Nhóm điều kiện Bất kỳ

| Mục | Nội dung |
| --- | --- |
| Given | Một sự kiện có nhóm điều kiện ở chế độ Bất kỳ. |
| When | Dữ liệu đạt ít nhất một điều kiện. |
| Then | Nhóm điều kiện được đánh giá đạt. |
| And | Không yêu cầu các điều kiện còn lại cùng đúng. |

## AC-AUT-024-04: Chỉ hiện phép so sánh phù hợp

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng chọn trường văn bản, số và ngày. |
| When | Người dùng mở danh sách phép so sánh. |
| Then | Hệ thống chỉ hiển thị phép phù hợp với từng kiểu. |
| And | Phép không phù hợp không thể được lưu. |

## AC-AUT-024-05: Không yêu cầu giá trị cho Trống/Không trống

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng chọn phép Trống hoặc Không trống. |
| When | Người dùng lưu điều kiện mà không nhập giá trị so sánh. |
| Then | Hệ thống chấp nhận điều kiện. |
| And | Các phép cần giá trị vẫn bị chặn nếu thiếu. |

## AC-AUT-024-06: Xử lý trường bị xóa

| Mục | Nội dung |
| --- | --- |
| Given | Quy luật đang dùng một trường điều kiện đã bị xóa. |
| When | Người dùng mở hoặc bật quy luật. |
| Then | Hệ thống hiển thị Cần cấu hình lại và từ chối bật. |
| And | Không hành động nào được chạy từ cấu hình lỗi. |

