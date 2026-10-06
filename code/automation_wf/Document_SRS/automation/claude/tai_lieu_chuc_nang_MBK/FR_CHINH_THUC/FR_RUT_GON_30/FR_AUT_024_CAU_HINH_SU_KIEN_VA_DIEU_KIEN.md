# FR-AUT-024: Cấu hình sự kiện và điều kiện

| Mục | Nội dung |
| --- | --- |
| Mô tả | Cho phép xác định khi nào một quy luật được kiểm tra và khách nào đủ điều kiện để chạy. |
| Đối tượng liên quan | **Người quản trị:** chọn sự kiện và điều kiện.<br>**Hệ thống:** tiếp nhận sự kiện và kiểm tra dữ liệu khách. |
| Pre-conditions | Quy luật đã tồn tại; người dùng có quyền; sự kiện và các trường điều kiện còn được hỗ trợ. |
| Điều kiện kích hoạt | Người dùng mở phần **Khi nào** hoặc **Điều kiện** của một quy luật. |
| Luồng xử lý chính | 1. Người dùng chọn một hoặc nhiều sự kiện.<br>2. Người dùng nhập thông tin mà sự kiện yêu cầu.<br>3. Người dùng thêm các điều kiện về khách hoặc hội thoại.<br>4. Người dùng chọn cần đạt tất cả hay chỉ một điều kiện.<br>5. Hệ thống kiểm tra dữ liệu và hiển thị ví dụ.<br>6. Người dùng lưu cấu hình. |
| Post-condition | Quy luật có sự kiện và điều kiện rõ ràng, sẵn sàng cho FR-AUT-026 kiểm tra. |
| Luồng thay thế | - Thiếu thông tin của sự kiện: không cho lưu hoàn tất.<br>- Trường điều kiện bị xóa: hiển thị **Cần cấu hình lại**.<br>- Điều kiện mâu thuẫn: cảnh báo và chặn bật.<br>- Sự kiện không thuộc đúng kênh: không cho chọn. |
| Sub-flow | **8 sự kiện:** Khách đăng ký mới/tin đầu tiên, Khách gửi tin, Khách bấm nút/Menu/FAQ, Gắn nhãn, Gỡ nhãn, Trường khách hàng thay đổi, Đăng ký kịch bản và Kịch bản kết thúc/hủy.<br>**Phép so sánh:** Bằng/Khác, Có chứa/Không chứa, Trống/Không trống, Lớn hơn/Lớn hơn hoặc bằng/Nhỏ hơn/Nhỏ hơn hoặc bằng và Trước/Sau; hệ thống chỉ hiện phép phù hợp kiểu dữ liệu.<br>**Kết hợp:** nhiều sự kiện dùng quan hệ **HOẶC**; các điều kiện lọc trong từng sự kiện dùng **Tất cả** hoặc **Bất kỳ**. Dữ liệu khách được đọc tại thời điểm sự kiện. |
| Giao diện hệ thống | Danh sách sự kiện; các trường theo sự kiện; bộ tạo điều kiện; lựa chọn Tất cả hoặc Bất kỳ; ví dụ kết quả; thông báo lỗi. |
| Yêu cầu phi chức năng | Dữ liệu nhạy cảm được che theo quyền; cấu trúc sự kiện có phiên bản; dữ liệu lỗi không được làm chạy hành động. |
| AC tương ứng | - **AC-AUT-024-01:** Chọn sự kiện hiển thị đúng thông tin cần nhập.<br>- **AC-AUT-024-02:** Điều kiện Tất cả và Bất kỳ cho kết quả đúng với dữ liệu mẫu.<br>- **AC-AUT-024-03:** Trường bị xóa làm quy luật hiển thị **Cần cấu hình lại**.<br>- **AC-AUT-024-04:** Cấu hình thiếu hoặc mâu thuẫn không thể bật. |
| BR tương ứng | - **BR-AUT-024-01:** Mỗi quy luật phải có ít nhất một trong 8 sự kiện đã công bố; nhiều sự kiện kết hợp theo **HOẶC**.<br>- **BR-AUT-024-02:** Điều kiện phải nêu rõ trường, phép so sánh và giá trị; chỉ dùng phép phù hợp kiểu dữ liệu.<br>- **BR-AUT-024-03:** Nhóm lọc trong một sự kiện phải chọn rõ **Tất cả** hoặc **Bất kỳ** và dùng dữ liệu khách tại thời điểm sự kiện.<br>- **BR-AUT-024-04:** Sự kiện lỗi hoặc sai phạm vi không được kích hoạt hành động. |
