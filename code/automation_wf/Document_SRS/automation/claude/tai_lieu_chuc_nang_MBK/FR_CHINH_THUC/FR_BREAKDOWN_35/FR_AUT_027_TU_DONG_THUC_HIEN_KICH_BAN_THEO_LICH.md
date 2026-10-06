# FR-AUT-027: Tự động thực hiện kịch bản theo lịch

| Mục | Nội dung |
| --- | --- |
| Mô tả | Tự động thực hiện từng bước của Kịch bản chăm sóc khi đến hạn, kiểm tra trạng thái/điều kiện, xử lý ngoài giờ và lỗi gửi, rồi lên lịch bước tiếp theo. |
| Đối tượng liên quan | **Khách hàng:** nhận tin hoặc tác động.<br>**Hệ thống:** lập lịch, kiểm tra và thực hiện.<br>**Người quản trị:** theo dõi lịch sử và lỗi. |
| Pre-conditions | Khách có tiến trình đang hoạt động; bước và phiên bản hợp lệ; lịch đến hạn; kênh hoạt động; bot không bị chặn bởi chính sách. |
| Điều kiện kích hoạt | Một công việc bước đến thời điểm thực hiện. |
| Luồng xử lý chính | 1. Hệ thống nhận công việc và loại công việc lặp.<br>2. Hệ thống kiểm tra tiến trình còn hoạt động, bước bật, điều kiện và khung giờ.<br>3. Nếu đủ điều kiện, hệ thống gửi tin hoặc gọi hành động của chức năng sở hữu.<br>4. Hệ thống lưu kết quả và trạng thái giao tin nếu có.<br>5. Hệ thống tính/lên lịch bước tiếp theo hoặc đánh dấu hoàn thành khi hết bước. |
| Post-condition | Bước có kết quả thành công, bỏ qua hoặc thất bại kèm lý do; tiến trình chuyển đúng bước/trạng thái. |
| Luồng thay thế | - Bước tắt/điều kiện không đạt: bỏ qua và không tính là đã nhận.<br>- Ngoài giờ: dời hoặc bỏ theo thiết lập tại FR-AUT-024.<br>- Tiến trình đã hủy/tạm dừng: không tác động.<br>- Lỗi tạm: thử lại theo chính sách nhưng không gửi trùng.<br>- Lỗi vĩnh viễn: tiếp tục hoặc dừng tiến trình theo cấu hình.<br>- Kênh không xác nhận: kiểm tra kết quả trước khi thử lại. |
| Sub-flow | **Chống trùng:** mỗi bước + tiến trình chỉ có một tác động logic.<br>**Thứ tự:** bước cùng lịch thực hiện theo thứ tự đã lưu.<br>**[Cần xác nhận]**: chính sách tiếp tục/dừng khi lỗi, số lần thử, xử lý ngoài giờ.<br>**Thống kê:** chuyển kết quả cho FR-AUT-035. |
| Giao diện hệ thống | Lịch sử theo khách/bước với thời điểm dự kiến/thực tế, trạng thái, số lần thử và lý do; bộ lọc lỗi; nút thử lại thủ công theo quyền. |
| Yêu cầu phi chức năng | Công việc bền vững; sai lệch lịch trong ±60 giây; cùng công việc không tạo tác động trùng; lỗi và hàng chờ phải quan sát được; dữ liệu nhạy cảm được che. |
| AC tương ứng | - **AC-AUT-027-01:** Bước đến hạn và đủ điều kiện thực hiện đúng một lần.<br>- **AC-AUT-027-02:** Tiến trình hủy/tạm dừng không thực hiện bước chưa chạy.<br>- **AC-AUT-027-03:** Điều kiện không đạt hoặc ngoài giờ được xử lý đúng chính sách và ghi lý do.<br>- **AC-AUT-027-04:** Giao lại cùng công việc hoặc thử lại không tạo tin/hành động logic thứ hai. |
| BR tương ứng | - **BR-AUT-027-01:** Mỗi bước của một tiến trình chỉ tạo tối đa một tác động logic.<br>- **BR-AUT-027-02:** Trạng thái tiến trình được kiểm tra lại ngay trước tác động.<br>- **BR-AUT-027-03:** Chỉ kết quả thành công theo chính sách mới cho phép chuyển bước tiếp theo; bỏ qua/lỗi tuân cấu hình công khai.<br>- **BR-AUT-027-04:** Không gửi bù cho bước tắt/bị bỏ qua trừ khi có thao tác riêng được phê duyệt. |
