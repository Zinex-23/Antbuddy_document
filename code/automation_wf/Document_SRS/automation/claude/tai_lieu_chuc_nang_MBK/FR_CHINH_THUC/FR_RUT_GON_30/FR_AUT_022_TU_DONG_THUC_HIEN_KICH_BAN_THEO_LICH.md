# FR-AUT-022: Tự động thực hiện kịch bản theo lịch

| Mục | Nội dung |
| --- | --- |
| Mô tả | Tự động thực hiện từng bước chăm sóc khi đến lịch, sau khi kiểm tra trạng thái và điều kiện của khách. |
| Đối tượng liên quan | **Khách hàng:** nhận tin hoặc tác động.<br>**Hệ thống:** theo dõi lịch, kiểm tra điều kiện và thực hiện bước.<br>**Kênh chat:** gửi và trả kết quả. |
| Pre-conditions | Khách có tiến trình hoạt động tại FR-AUT-021; bước còn bật và hợp lệ; kênh đang hoạt động. |
| Điều kiện kích hoạt | Một bước chăm sóc đến thời điểm thực hiện. |
| Luồng xử lý chính | 1. Hệ thống lấy bước đến hạn.<br>2. Hệ thống kiểm tra tiến trình, phiên bản, điều kiện và khung giờ.<br>3. Nếu đủ điều kiện, hệ thống thực hiện tin nhắn hoặc hành động.<br>4. Hệ thống lưu kết quả.<br>5. Hệ thống lập lịch bước tiếp theo nếu có.<br>6. Hệ thống gửi số liệu cho FR-AUT-030. |
| Post-condition | Bước được đánh dấu thành công, bỏ qua, chờ thử lại hoặc thất bại; tiến trình chuyển tới trạng thái phù hợp. |
| Luồng thay thế | - Điều kiện không đạt: bỏ qua bước và tiếp tục lịch các bước sau.<br>- Ngoài khung giờ: dời tới đầu khung gần nhất.<br>- Lỗi tạm thời: thử lại cùng bước tối đa 3 lần sau 1, 5 và 15 phút.<br>- Lỗi vĩnh viễn: không thử lại.<br>- Tin nhắn thất bại sau lần cuối: đánh dấu lỗi và tiếp tục bước sau; nếu khách chặn kênh hoặc từ chối nhận tin thì hủy tiến trình.<br>- Hành động dữ liệu thất bại sau lần cuối: dừng tiến trình ở trạng thái **Thất bại**.<br>- Tiến trình đã hủy: không thực hiện. |
| Sub-flow | **Chống trùng:** cùng một bước của một tiến trình chỉ tạo một tác động.<br>**Thứ tự:** các bước cùng thời điểm chạy lần lượt theo thứ tự đã lưu.<br>**Thử lại:** chỉ áp dụng cho lỗi tạm thời; trước mỗi lần thử phải kiểm tra bước chưa thành công và tiến trình vẫn đang chạy. |
| Giao diện hệ thống | Không có màn hình cấu hình riêng; lịch sử tiến trình hiển thị bước, thời điểm dự kiến, thời điểm thực tế, kết quả và lý do. |
| Yêu cầu phi chức năng | Lịch không bị mất khi hệ thống gián đoạn; yêu cầu lặp không tạo tác động trùng; lỗi và hàng chờ phải theo dõi được. |
| AC tương ứng | - **AC-AUT-022-01:** Bước đến hạn và đủ điều kiện được thực hiện đúng loại.<br>- **AC-AUT-022-02:** Bước không đủ điều kiện được xử lý đúng quy tắc và có lý do.<br>- **AC-AUT-022-03:** Nhận lại cùng công việc không gửi hoặc cập nhật hai lần.<br>- **AC-AUT-022-04:** Bước lỗi hiển thị trạng thái và số lần thử rõ ràng. |
| BR tương ứng | - **BR-AUT-022-01:** Chỉ tiến trình đang hoạt động và đúng phiên bản mới được thực hiện.<br>- **BR-AUT-022-02:** Điều kiện được kiểm tra khi bước đến hạn; không đạt thì bỏ qua và tiếp tục.<br>- **BR-AUT-022-03:** Lỗi tạm thời được thử lại tối đa 3 lần sau 1, 5 và 15 phút; lỗi vĩnh viễn không thử lại.<br>- **BR-AUT-022-04:** Sau lỗi cuối, bước Tin nhắn tiếp tục lịch sau, bước Hành động dừng tiến trình; lỗi khách chặn/từ chối nhận tin luôn hủy tiến trình.<br>- **BR-AUT-022-05:** Một bước của một tiến trình chỉ có một kết quả cuối cùng; ngoài khung gửi phải dời, không bỏ. |
