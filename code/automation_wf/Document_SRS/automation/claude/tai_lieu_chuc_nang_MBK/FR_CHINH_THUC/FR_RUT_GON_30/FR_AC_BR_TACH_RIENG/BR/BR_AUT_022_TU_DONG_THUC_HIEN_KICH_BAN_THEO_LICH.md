# BR-AUT-022 — Tự động thực hiện kịch bản theo lịch

> FR tham chiếu: FR-AUT-022

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-022-01 | Chỉ tiến trình đang hoạt động, đúng phiên bản, bước còn bật và hợp lệ mới được thực hiện. |
| BR-AUT-022-02 | Điều kiện được kiểm tra khi bước đến hạn; không đạt thì bỏ qua bước và tiếp tục lịch sau. |
| BR-AUT-022-03 | Lỗi tạm thời được thử lại tối đa 3 lần; lỗi vĩnh viễn không được thử lại. |
| BR-AUT-022-04 | Sau lỗi cuối, bước Tin nhắn tiếp tục lịch sau; bước Hành động dừng tiến trình; lỗi khách chặn hoặc từ chối nhận tin hủy tiến trình. |
| BR-AUT-022-05 | Một bước của một tiến trình chỉ có một kết quả cuối; nhận lại cùng công việc không tạo tác động trùng. |
| BR-AUT-022-06 | Ngoài khung gửi phải dời tới đầu khung hợp lệ, không tự bỏ bước. |
| BR-AUT-022-07 | Trước mỗi lần gửi, hệ thống phải kiểm tra điều kiện gửi hiện hành do kênh đích công bố; nếu không đạt thì không gửi. Không mặc định mọi kênh dùng cùng cửa sổ 24 giờ. |
| BR-AUT-022-08 | **[CẦN XÁC NHẬN]** Các mốc 1, 5, 15 phút được tính từ lần lỗi đầu hay lần thử ngay trước đó? |
| BR-AUT-022-09 | **[CẦN XÁC NHẬN]** Nếu thời điểm thử lại rơi ngoài khung gửi: dời từng lần thử vào đầu khung hay vẫn thử theo mốc thời gian đã tính? |
