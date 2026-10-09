# BR-AUT-010 — Cấu hình phản hồi câu hỏi gợi ý

> FR tham chiếu: FR-AUT-010

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-010-01 | Mỗi câu hỏi có đúng một phản hồi chính: Tạo tin nhắn mới, Chọn luồng tin nhắn hoặc Nhận thông báo. |
| BR-AUT-010-02 | Phản hồi chính phải thành công trước khi bắt đầu hành động bổ sung. |
| BR-AUT-010-03 | Hành động bổ sung chạy tuần tự; lỗi một hành động không hoàn tác hành động đã xong và các hành động sau tiếp tục theo baseline hiện tại. |
| BR-AUT-010-04 | Lượt chọn FAQ được xử lý như sự kiện có cấu trúc, không được dò như tin nhắn Từ khóa. |
| BR-AUT-010-05 | Nhận lại cùng mã sự kiện lựa chọn không được tạo tác động lần hai. |
| BR-AUT-010-06 | **[CẦN XÁC NHẬN]** Với phản hồi Chọn luồng, thành công được tính khi khởi chạy luồng được chấp nhận hay khi toàn bộ luồng hoàn tất? |
| BR-AUT-010-07 | **[CẦN XÁC NHẬN]** Luồng thay thế của FR gốc nói lỗi hành động bổ sung theo cấu hình, trong khi Sub-flow/BR quy định tiếp tục cố định. Chọn một phương án và đồng bộ lại nguồn. |

