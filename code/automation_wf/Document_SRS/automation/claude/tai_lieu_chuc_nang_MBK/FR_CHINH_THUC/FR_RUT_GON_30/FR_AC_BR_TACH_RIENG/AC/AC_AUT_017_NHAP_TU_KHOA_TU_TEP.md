# AC-AUT-017 — Nhập Từ khóa từ tệp

> FR tham chiếu: FR-AUT-017

## AC-AUT-017-01: Chấp nhận tệp tại giới hạn

| Mục | Nội dung |
| --- | --- |
| Given | Tệp XLSX hoặc CSV UTF-8 đúng cấu trúc, đúng 10 MB và có đúng 10.000 dòng dữ liệu. |
| When | Người dùng tải tệp lên. |
| Then | Hệ thống tiếp nhận và kiểm tra từng dòng. |
| And | Kết quả xem trước hiển thị trước khi xác nhận nhập. |

## AC-AUT-017-02: Từ chối tệp vượt giới hạn

| Mục | Nội dung |
| --- | --- |
| Given | Tệp vượt 10 MB hoặc vượt 10.000 dòng dữ liệu. |
| When | Người dùng tải tệp lên. |
| Then | Hệ thống từ chối toàn bộ tệp và nêu giới hạn bị vượt. |
| And | Không quy tắc nào được tạo. |

## AC-AUT-017-03: Từ chối CSV không đúng UTF-8 hoặc sai cấu trúc

| Mục | Nội dung |
| --- | --- |
| Given | Tệp CSV sai mã hóa hoặc thiếu/sai cột mẫu. |
| When | Người dùng tải tệp lên. |
| Then | Hệ thống từ chối tệp và nêu lỗi cấu trúc hoặc mã hóa. |
| And | Không dữ liệu một phần nào được nhập. |

## AC-AUT-017-04: Không nhập dòng lỗi

| Mục | Nội dung |
| --- | --- |
| Given | Tệp có cả dòng hợp lệ và dòng sai dữ liệu. |
| When | Người dùng xác nhận nhập. |
| Then | Hệ thống chỉ tạo hoặc cập nhật các dòng hợp lệ. |
| And | Báo cáo ghi đúng số dòng, cột và lý do của từng dòng lỗi. |

## AC-AUT-017-05: Thiếu phản hồi luôn ở trạng thái tắt

| Mục | Nội dung |
| --- | --- |
| Given | Một dòng có điều kiện hợp lệ nhưng thiếu ID luồng phản hồi và yêu cầu trạng thái bật. |
| When | Người dùng nhập tệp. |
| Then | Hệ thống tạo quy tắc ở trạng thái tắt và Chưa hoàn tất. |
| And | Báo cáo nêu rõ phản hồi còn thiếu. |

## AC-AUT-017-06: Không tạo trùng khi nhận lại yêu cầu

| Mục | Nội dung |
| --- | --- |
| Given | Một yêu cầu nhập đã có kết quả cuối. |
| When | Hệ thống nhận lại cùng mã yêu cầu. |
| Then | Hệ thống trả kết quả lần đầu. |
| And | Không quy tắc nào được tạo hoặc cập nhật thêm. |

