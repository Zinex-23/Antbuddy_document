# BR-AUT-018 — Tự động xử lý tin nhắn khớp Từ khóa

> FR tham chiếu: FR-AUT-018

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-018-01 | Mỗi tin có tối đa một quy tắc Từ khóa được chọn. |
| BR-AUT-018-02 | Chỉ quy tắc đang bật, đầy đủ, đúng kênh và đúng phạm vi được xét. |
| BR-AUT-018-03 | Khi nhiều quy tắc khớp, quy tắc đứng cao nhất trong danh sách được chọn; không có ưu tiên ngầm theo kiểu khớp. |
| BR-AUT-018-04 | Sau khi đã chọn quy tắc, phản hồi lỗi chỉ được thử lại trên chính quy tắc đó; không xét quy tắc thấp hơn và không gửi phản hồi mặc định cho cùng tin. |
| BR-AUT-018-05 | Không có quy tắc khớp thì tin được chuyển sang AI/NLU rồi phản hồi mặc định theo thứ tự. |
| BR-AUT-018-06 | Tin do bot/automation hoặc tin đang thuộc phiên Thu thập thông tin không được xử lý tại đây. |
| BR-AUT-018-07 | **[CẦN XÁC NHẬN]** Nếu quy tắc ưu tiên đã khớp nhưng không đủ tần suất: kết thúc xử lý Từ khóa và chuyển AI, hay xét quy tắc thấp hơn, hay coi tin đã được xử lý? |

