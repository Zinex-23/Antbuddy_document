# BR-AUT-014 — Tự động phản hồi khi bot không hiểu

> FR tham chiếu: FR-AUT-014

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-014-01 | Thứ tự xử lý văn bản là Thu thập thông tin, Từ khóa, AI/NLU rồi phản hồi mặc định; lượt bấm Menu/FAQ được xử lý riêng. |
| BR-AUT-014-02 | Tin đã được một lớp ưu tiên xử lý không được nhận phản hồi mặc định. |
| BR-AUT-014-03 | Khoảng nghỉ được tính theo khách và kênh từ lần gửi phản hồi mặc định thành công gần nhất; gửi thất bại không bắt đầu khoảng nghỉ. |
| BR-AUT-014-04 | Hai tin đồng thời không được tạo hai lần gửi nếu tần suất cấu hình chỉ cho phép một lần. |
| BR-AUT-014-05 | Ngay trước khi gửi trễ, hệ thống phải kiểm tra lại cấu hình đang bật, bot không tạm dừng, hội thoại chưa được nhân viên tiếp quản và khách vẫn đủ điều kiện. |
| BR-AUT-014-06 | Tin từ bot, automation hoặc nhân viên không kích hoạt phản hồi mặc định. |
| BR-AUT-014-07 | **[CẦN XÁC NHẬN]** Nếu tin đã xếp lịch phản hồi mặc định nhưng sau đó được Từ khóa, AI hoặc nhân viên xử lý trước giờ gửi: hủy phản hồi chờ hay vẫn gửi? |

