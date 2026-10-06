# FR-AUT-026: Tự động thực hiện quy luật

| Mục | Nội dung |
| --- | --- |
| Mô tả | Tự động kiểm tra các quy luật khi có sự kiện và thực hiện hành động của những quy luật đủ điều kiện. |
| Đối tượng liên quan | **Khách hàng:** là đối tượng được kiểm tra và nhận tác động.<br>**Hệ thống:** nhận sự kiện, chọn quy luật và chạy hành động.<br>**Hệ thống ngoài:** có thể nhận yêu cầu từ một số hành động. |
| Pre-conditions | Quy luật đang bật và hoàn tất; sự kiện đúng phạm vi; dữ liệu cần kiểm tra đã sẵn sàng. |
| Điều kiện kích hoạt | Hệ thống nhận một sự kiện được cấu hình tại FR-AUT-024. |
| Luồng xử lý chính | 1. Hệ thống loại sự kiện lặp.<br>2. Hệ thống tìm các quy luật đang bật và đúng sự kiện.<br>3. Hệ thống kiểm tra điều kiện và tần suất.<br>4. Với quy luật đủ điều kiện, hệ thống thực hiện hành động theo FR-AUT-025.<br>5. Hệ thống lưu kết quả từng hành động.<br>6. Hệ thống gửi số liệu cho FR-AUT-030. |
| Post-condition | Mỗi quy luật có kết quả rõ ràng: thành công, bỏ qua, chờ thử lại hoặc thất bại. |
| Luồng thay thế | - Sự kiện lặp: trả kết quả cũ, không chạy lại.<br>- Quy luật bị tắt trước khi chạy: bỏ qua.<br>- Điều kiện không đạt hoặc vượt tần suất: bỏ qua và ghi lý do.<br>- Hành động lỗi: thử lại, tiếp tục hoặc dừng theo chính sách.<br>- Hành động tạo sự kiện mới: áp dụng cơ chế chống vòng lặp. |
| Sub-flow | **Chống trùng:** cùng sự kiện, quy luật và phiên bản chỉ có một lần thực hiện.<br>**Chống vòng lặp:** cùng quy luật không tự kích hoạt lại trong cùng chuỗi nguyên nhân.<br>**[Cần xác nhận]**: nhiều quy luật cùng khớp chạy song song hay lần lượt; cách xử lý xung đột và giới hạn độ sâu. |
| Giao diện hệ thống | Không có màn hình cấu hình riêng; lịch sử hiển thị sự kiện, quy luật, từng hành động, kết quả, số lần thử và lỗi. |
| Yêu cầu phi chức năng | Sự kiện có thể được nhận lại nhưng không tạo tác động trùng; hàng chờ và lỗi phải theo dõi được; dữ liệu nhạy cảm được bảo vệ. |
| AC tương ứng | - **AC-AUT-026-01:** Sự kiện hợp lệ chỉ chạy các quy luật đang bật và đủ điều kiện.<br>- **AC-AUT-026-02:** Hành động chạy đúng thứ tự và tần suất.<br>- **AC-AUT-026-03:** Sự kiện lặp không tạo tác động trùng.<br>- **AC-AUT-026-04:** Vòng lặp bị chặn và có lý do trong lịch sử. |
| BR tương ứng | - **BR-AUT-026-01:** Mỗi cặp sự kiện, quy luật và phiên bản có tối đa một lần thực hiện.<br>- **BR-AUT-026-02:** Điều kiện và tần suất được kiểm tra trước hành động đầu tiên.<br>- **BR-AUT-026-03:** Hành động dùng đúng phiên bản quy luật tại lúc bắt đầu.<br>- **BR-AUT-026-04:** Hệ thống phải ngăn quy luật tự kích hoạt vô hạn. |
