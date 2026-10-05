# FR-AUT-002: Câu hỏi thường gặp (FAQ Chips)

| Mục | Nội dung |
|---|---|
| **Mô tả** | Cung cấp các nút bấm gợi ý câu hỏi nổi bật khi khách hàng vừa mở khung chat fanpage lần đầu (Conversation Starters):<br>- Mỗi fanpage được tạo tối đa **4 câu hỏi gợi ý** (ví dụ: "Báo giá sản phẩm", "Địa chỉ cửa hàng ở đâu?", "Xem khuyến mãi").<br>- Mỗi câu hỏi gồm: Nội dung câu hỏi (≤ 80 ký tự), 1 hành động chính khi bấm (gửi tin, chạy flow) và các hành động chạy kèm (như tự động gắn thẻ khách hàng).<br>- Đồng bộ trực tiếp lên khung chat của Facebook Messenger / Zalo OA. |
| **Đối tượng liên quan** | Admin, Quản lý shop |
| **Pre-conditions** | Fanpage đã kết nối và đang hoạt động. |
| **Điều kiện kích hoạt** | Vào mục: Tự động hóa ➔ Câu hỏi thường gặp. |
| **Luồng xử lý chính** | **1. Xem danh sách**: Hệ thống hiển thị tối đa 4 câu hỏi hiện có và khung xem trước (Mobile Preview).<br>**2. Thêm câu hỏi**: Bấm "Thêm mới" ➔ Nhập câu hỏi (≤ 80 ký tự).<br>**3. Chọn việc khi khách bấm**: Chọn 1 trong các việc: Soạn tin nhắn trả lời ngay, hoặc Chọn một kịch bản bot có sẵn.<br>**4. Thêm việc chạy kèm (nếu cần)**: Bấm "Thêm hành động" để chọn việc chạy ngầm (ví dụ: Tự động gắn tag `Hoi_Bao_Gia`).<br>**5. Lưu & Xuất bản**: Bấm "Lưu" ➔ Bấm "Xuất bản" để đẩy cấu hình lên Facebook/Zalo. |
| **Post-condition** | 4 nút gợi ý xuất hiện trên khung chat khi khách hàng mới mở inbox trang. |
| **Luồng thay thế** | - **AF-1 (Đủ 4 câu hỏi)**: Danh sách đã có đủ 4 câu ➔ Ẩn nút "Thêm mới"; xóa bớt 1 câu thì nút hiện lại.<br>- **AF-2 (Khách bấm nút FAQ)**: Khách bấm câu hỏi ➔ Bot trả lời đúng nội dung đã cài; **tuyệt đối không kích hoạt bộ lọc Từ khóa và không gửi tin mặc định (Fallback)**.<br>- **AF-3 (Xóa câu hỏi)**: Bấm icon thùng rác ➔ Xác nhận xóa ➔ Câu hỏi biến mất khỏi danh sách và Preview ngay lập tức. |
| **Sub-flow** | - **SF-01 (Hành động chạy kèm)**: Chạy tuần tự ngay sau khi gửi tin trả lời (ví dụ: Gửi bảng giá xong ➔ Gắn tag `Quan_Tam_Gia` vào khách hàng).<br>- **SF-02 (Kéo thả thứ tự)**: Kéo thả các dòng câu hỏi để đổi thứ tự xuất hiện trên khung chat. |
| **Giao diện hệ thống** | - Màn hình chính: Danh sách 4 câu hỏi, nút Thêm mới (ẩn khi đủ 4), nút Xuất bản, trạng thái đồng bộ, Mobile Preview.<br>- Popup sửa câu hỏi: Ô nhập câu hỏi (n/80 ký tự), chọn hành động chính, danh sách hành động chạy kèm, nút Xóa và nút Lưu. |
| **Yêu cầu phi chức năng** | - Xuất bản sang API kênh chat trong ≤ 3 giây.<br>- Preview cập nhật ngay lập tức khi đổi nội dung. |
| **AC tương ứng** | - **AC-01**: Thêm đủ 4 câu hỏi ➔ Nút Thêm mới tự động ẩn đi.<br>- **AC-02**: Nhập câu hỏi > 80 ký tự ➔ Chặn không cho gõ thêm.<br>- **AC-03**: Khách bấm câu hỏi "Báo giá" ➔ Bot gửi bảng giá; không chạy quét từ khóa "báo giá", không gửi tin nhắn mặc định.<br>- **AC-04**: Xuất bản lỗi mạng ➔ Dữ liệu nháp giữ nguyên, hiện thông báo thử lại. |
| **BR tương ứng** | - **BR-01**: Tối đa 4 câu hỏi gợi ý cho mỗi fanpage; câu hỏi tối đa 80 ký tự.<br>- **BR-02**: Câu hỏi không được trùng lặp nội dung trong cùng 1 trang.<br>- **BR-03**: Lượt bấm câu hỏi FAQ được ưu tiên xử lý, không chạy các bộ lọc tin nhắn thường. |
