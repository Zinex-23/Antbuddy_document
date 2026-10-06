# FR-AUT-021: Đăng ký và hủy theo dõi kịch bản

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép đưa khách vào một kịch bản chăm sóc, theo dõi tiến trình và dừng khi không còn phù hợp. |
| Đối tượng liên quan | **Người quản trị hoặc nhân viên:** đăng ký và hủy theo quyền.<br>**Khách hàng:** tham gia kịch bản.<br>**Hệ thống:** lưu tiến trình và lịch thực hiện. |
| Pre-conditions | Khách, kịch bản và kênh còn hiệu lực; kịch bản đang bật; người hoặc chức năng yêu cầu có quyền. |
| Điều kiện kích hoạt | Người dùng hoặc một quy luật yêu cầu đăng ký hoặc hủy kịch bản. |
| Luồng xử lý chính | 1. Hệ thống kiểm tra khách và kịch bản.<br>2. Hệ thống kiểm tra khách đã tham gia hay chưa.<br>3. Nếu hợp lệ, hệ thống tạo tiến trình theo phiên bản hiện tại.<br>4. Hệ thống lập lịch các bước từ FR-AUT-020.<br>5. Khi có yêu cầu hủy, hệ thống dừng các bước chưa chạy.<br>6. Hệ thống lưu lý do và lịch sử thay đổi. |
| Post-condition | Khách có một tiến trình rõ trạng thái hoặc đã được dừng; lịch chưa chạy được cập nhật phù hợp. |
| Luồng thay thế | - Đăng ký lại khi đang tham gia: không tạo tiến trình trùng.<br>- Kịch bản tắt hoặc chưa hoàn tất: từ chối đăng ký.<br>- Hủy tiến trình đã kết thúc: không thay đổi dữ liệu.<br>- Khách hoặc kênh không còn hiệu lực: dừng an toàn và ghi lý do. |
| Sub-flow | **Không hỗ trợ Tạm dừng/Tiếp tục trong phiên bản này.** Trạng thái tiến trình gồm Đang chạy, Hoàn thành, Đã hủy và Thất bại.<br>**Đăng ký lặp:** khách đang chạy thì giữ tiến trình cũ và không tính lại lịch.<br>**Đăng ký lại:** sau Hoàn thành, Đã hủy hoặc Thất bại sẽ tạo tiến trình mới từ bước đầu, dùng phiên bản hiện hành và tính lịch lại từ thời điểm đăng ký lại.<br>**Kịch bản bị tắt:** khách đang chạy tiếp tục; chỉ khách mới bị chặn. |
| Giao diện hệ thống | Danh sách khách đang tham gia; trạng thái và bước hiện tại; nút đăng ký hoặc hủy; lịch sử thay đổi. |
| Yêu cầu phi chức năng | Yêu cầu lặp không tạo tiến trình trùng; lịch đã tạo không bị mất khi hệ thống gián đoạn; chỉ người có quyền được thay đổi tiến trình. |
| AC tương ứng | - **AC-AUT-021-01:** Khách hợp lệ được đăng ký vào đúng phiên bản kịch bản.<br>- **AC-AUT-021-02:** Đăng ký lặp không tạo tiến trình thứ hai.<br>- **AC-AUT-021-03:** Hủy theo dõi ngăn các bước chưa chạy.<br>- **AC-AUT-021-04:** Mọi thay đổi trạng thái có thời gian, người hoặc nguồn thực hiện và lý do. |
| BR tương ứng | - **BR-AUT-021-01:** Mỗi khách có tối đa một tiến trình đang hoạt động cho cùng kịch bản; đăng ký lặp không tính lại lịch.<br>- **BR-AUT-021-02:** Chỉ kịch bản đang bật và hoàn tất mới nhận khách mới; tắt không dừng tiến trình cũ.<br>- **BR-AUT-021-03:** Không hỗ trợ Tạm dừng/Tiếp tục; đăng ký lại sau trạng thái cuối bắt đầu từ đầu theo phiên bản hiện hành.<br>- **BR-AUT-021-04:** Khách giữ phiên bản tại thời điểm đăng ký; hủy không xóa lịch sử đã thực hiện. |
