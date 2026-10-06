# FR-AUT-026: Đăng ký và hủy theo dõi kịch bản

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép đăng ký khách vào Kịch bản chăm sóc, xem trạng thái, tạm dừng/tiếp tục nếu được hỗ trợ, hủy theo dõi và đăng ký lại. Nguồn đăng ký có thể là Quy luật, luồng hoặc thao tác được hỗ trợ. |
| Đối tượng liên quan | **Người quản trị/nhân viên:** thao tác nếu có quyền.<br>**Luồng/Quy luật:** yêu cầu đăng ký/hủy.<br>**Khách hàng:** tham gia hoặc dừng kịch bản.<br>**Hệ thống:** duy trì một tiến trình hợp lệ. |
| Pre-conditions | Khách và kịch bản cùng kênh; kịch bản hoàn chỉnh và đang bật cho đăng ký mới; nguồn yêu cầu có quyền. |
| Điều kiện kích hoạt | Một hành động yêu cầu đăng ký, tạm dừng, tiếp tục, hủy hoặc đăng ký lại khách. |
| Luồng xử lý chính | 1. Hệ thống kiểm tra khách, kịch bản và nguồn yêu cầu.<br>2. Nếu khách chưa tham gia, hệ thống tạo tiến trình gắn phiên bản hiện tại.<br>3. Hệ thống tính lịch bước đầu theo thiết lập tại FR-AUT-024.<br>4. Khi hủy, hệ thống đổi trạng thái và ngăn bước chưa thực hiện.<br>5. Khi đăng ký lại, hệ thống áp dụng chính sách đã xác nhận và tạo/tiếp tục tiến trình phù hợp.<br>6. Mọi thay đổi lưu nguồn và lý do. |
| Post-condition | Khách có trạng thái tham gia rõ ràng và lịch tương ứng; yêu cầu lặp không tạo tiến trình thứ hai ngoài quy tắc đăng ký lại. |
| Luồng thay thế | - Đăng ký khi đang hoạt động: trả tiến trình hiện tại, không đặt lại lịch.<br>- Kịch bản tắt/lỗi/sai kênh: từ chối, giữ trạng thái cũ.<br>- Hủy khi không tham gia: trả thành công không thay đổi.<br>- Công việc đang chạy khi hủy: kiểm tra lại trạng thái trước tác động.<br>- Đăng ký lại sau hoàn thành/hủy: xử lý theo quyết định sản phẩm. |
| Sub-flow | **[Cần xác nhận]**: vòng đời Tạm dừng/Tiếp tục/Hủy/Hoàn thành; tiếp tục giữ hay tính lại lịch; đăng ký lại từ đầu hay tiếp tục; tắt/xóa kịch bản ảnh hưởng khách hiện tại.<br>**Phiên bản:** khách giữ bản lúc đăng ký.<br>**Lịch sử:** lưu mọi lần tham gia và kết thúc. |
| Giao diện hệ thống | Danh sách khách tham gia; trạng thái; phiên bản; bước hiện tại; lịch tiếp theo; nguồn đăng ký; nút tạm dừng/tiếp tục/hủy/đăng ký lại theo quyền; cửa sổ ảnh hưởng. |
| Yêu cầu phi chức năng | Đọc-sau-ghi nhất quán; thao tác lặp không tạo tiến trình trùng; dữ liệu khách được phân quyền; lịch hủy không được thực hiện sau khi trạng thái cập nhật. |
| AC tương ứng | - **AC-AUT-026-01:** Đăng ký hợp lệ tạo một tiến trình, ghim phiên bản và lịch bước đầu.<br>- **AC-AUT-026-02:** Đăng ký lặp khi đang hoạt động không tạo tiến trình thứ hai hoặc đặt lại lịch.<br>- **AC-AUT-026-03:** Hủy trước thời điểm đến hạn ngăn mọi bước còn lại.<br>- **AC-AUT-026-04:** Kịch bản sai kênh/tắt/lỗi bị từ chối và không làm mất tiến trình cũ. |
| BR tương ứng | - **BR-AUT-026-01:** Mỗi khách có tối đa một tiến trình đang hoạt động trong cùng kịch bản.<br>- **BR-AUT-026-02:** Tiến trình ghim phiên bản tại lúc đăng ký.<br>- **BR-AUT-026-03:** Hủy phải ngăn công việc chưa tác động nhưng không hoàn tác bước đã hoàn tất.<br>- **BR-AUT-026-04:** Đăng ký lại và tiếp tục chỉ thực hiện theo chính sách hiển thị đã được xác nhận. |
