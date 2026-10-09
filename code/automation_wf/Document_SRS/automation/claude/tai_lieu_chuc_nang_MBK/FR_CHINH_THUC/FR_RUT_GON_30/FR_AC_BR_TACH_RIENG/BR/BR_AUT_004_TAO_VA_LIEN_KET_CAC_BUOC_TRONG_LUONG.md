# BR-AUT-004 — Tạo và liên kết các bước trong luồng

> FR tham chiếu: FR-AUT-004

| Mã BR | Quy tắc nghiệp vụ |
| --- | --- |
| BR-AUT-004-01 | Mỗi luồng có đúng một bước bắt đầu, tối đa 30 bước và chỉ dùng các loại Tin nhắn, AI, Hành động, Smart Delay, Điều kiện. |
| BR-AUT-004-02 | Đường chuyển tiếp thông thường chỉ cần bước đích; nhánh từ bước Điều kiện phải có điều kiện và bước đích; điểm kết thúc không cần bước tiếp theo. |
| BR-AUT-004-03 | Bước chờ khách chỉ được chuyển khi nhận tương tác phù hợp; bước tự chạy chuyển sau khi hoàn thành. |
| BR-AUT-004-04 | Liên kết quay lại phải có đường thoát; mỗi bước được chạy tối đa 5 lần trong một lượt chạy. |
| BR-AUT-004-05 | Bước đích bị xóa làm mọi liên kết tới bước đó chuyển trạng thái Cần cấu hình lại. |

