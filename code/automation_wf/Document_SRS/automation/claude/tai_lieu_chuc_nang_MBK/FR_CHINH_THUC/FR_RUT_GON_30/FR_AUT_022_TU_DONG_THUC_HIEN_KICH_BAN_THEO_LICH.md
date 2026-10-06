# FR-AUT-022: Tự động thực hiện kịch bản theo lịch

| Mục | Nội dung |
| --- | --- |
| Mô tả | Tự động thực hiện từng bước chăm sóc khi đến lịch, sau khi kiểm tra trạng thái và điều kiện của khách. |
| Đối tượng liên quan | **Khách hàng:** nhận tin hoặc tác động.<br>**Hệ thống:** theo dõi lịch, kiểm tra điều kiện và thực hiện bước.<br>**Kênh chat:** gửi và trả kết quả. |
| Pre-conditions | Khách có tiến trình hoạt động tại FR-AUT-021; bước còn bật và hợp lệ; kênh đang hoạt động. |
| Điều kiện kích hoạt | Một bước chăm sóc đến thời điểm thực hiện. |
| Luồng xử lý chính | 1. Hệ thống lấy bước đến hạn.<br>2. Hệ thống kiểm tra tiến trình, phiên bản, điều kiện và khung giờ.<br>3. Nếu đủ điều kiện, hệ thống thực hiện tin nhắn hoặc hành động.<br>4. Hệ thống lưu kết quả.<br>5. Hệ thống lập lịch bước tiếp theo nếu có.<br>6. Hệ thống gửi số liệu cho FR-AUT-030. |
| Post-condition | Bước được đánh dấu thành công, bỏ qua, chờ thử lại hoặc thất bại; tiến trình chuyển tới trạng thái phù hợp. |
| Luồng thay thế | - Điều kiện không đạt: bỏ qua hoặc dừng theo cấu hình.<br>- Ngoài khung giờ: dời hoặc bỏ theo quy tắc đã xác nhận.<br>- Lỗi tạm thời: thử lại trong giới hạn.<br>- Lỗi vĩnh viễn: ghi lỗi và tiếp tục hoặc dừng theo chính sách.<br>- Tiến trình đã hủy: không thực hiện. |
| Sub-flow | **Chống trùng:** cùng một bước của một tiến trình chỉ tạo một tác động.<br>**Thứ tự:** các bước cùng thời điểm chạy theo thứ tự đã lưu.<br>**[Cần xác nhận]**: số lần thử lại và khi nào tiếp tục hoặc dừng sau lỗi. |
| Giao diện hệ thống | Không có màn hình cấu hình riêng; lịch sử tiến trình hiển thị bước, thời điểm dự kiến, thời điểm thực tế, kết quả và lý do. |
| Yêu cầu phi chức năng | Lịch không bị mất khi hệ thống gián đoạn; yêu cầu lặp không tạo tác động trùng; lỗi và hàng chờ phải theo dõi được. |
| AC tương ứng | - **AC-AUT-022-01:** Bước đến hạn và đủ điều kiện được thực hiện đúng loại.<br>- **AC-AUT-022-02:** Bước không đủ điều kiện được xử lý đúng quy tắc và có lý do.<br>- **AC-AUT-022-03:** Nhận lại cùng công việc không gửi hoặc cập nhật hai lần.<br>- **AC-AUT-022-04:** Bước lỗi hiển thị trạng thái và số lần thử rõ ràng. |
| BR tương ứng | - **BR-AUT-022-01:** Chỉ tiến trình đang hoạt động và đúng phiên bản mới được thực hiện.<br>- **BR-AUT-022-02:** Điều kiện được kiểm tra tại thời điểm bước đến hạn.<br>- **BR-AUT-022-03:** Một bước của một tiến trình chỉ có một kết quả cuối cùng.<br>- **BR-AUT-022-04:** Cách xử lý lỗi và ngoài giờ phải theo cấu hình đã công bố. |
