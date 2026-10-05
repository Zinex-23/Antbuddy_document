# FR-AUT-003: Cấu hình nút và hành động dùng chung

| Mục | Nội dung |
|---|---|
| Mục đích | Cung cấp một popup và một action catalog thống nhất cho nút menu, FAQ, nút tin nhắn, trả lời nhanh, bước Hành động và Quy luật. |
| Trong phạm vi | Tiêu đề nút; chọn đúng một action; render trường theo action; validation target; action bổ sung; kiểm tra capability kênh; trả payload action cho FR gọi. |
| Ngoài phạm vi | Không gửi tin, chạy flow, đổi menu hay cập nhật khách ngay trong màn cấu hình. Runtime do FR nghiệp vụ tương ứng sở hữu. |
| Đối tượng liên quan | Admin; Quản lý; action catalog; dịch vụ Flow, Opt-in, Tag, Customer Field, POS và BizAI. |
| Pre-conditions | FR gọi cung cấp `ownerType`, trang, danh sách action được phép và payload hiện tại. |
| Điều kiện kích hoạt | Người dùng thêm hoặc sửa một nút/action. |
| Luồng xử lý chính | 1. Popup tải danh mục action được phép cho owner và kênh.<br>2. Người dùng nhập tiêu đề nếu owner yêu cầu.<br>3. Chọn một action; hệ thống chỉ hiển thị trường của action đó.<br>4. Người dùng nhập/chọn target.<br>5. Có thể thêm action bổ sung nếu owner hỗ trợ.<br>6. Bấm `Lưu`; hệ thống validate và trả payload chuẩn hóa cho FR gọi. |
| Ngoại lệ | AF-1: Thiếu tiêu đề/action/target → báo lỗi tại trường, popup không đóng.<br>AF-2: Action không được kênh hỗ trợ → không cho chọn và nêu lý do.<br>AF-3: Target đã xóa/inactive → đánh dấu cần cấu hình lại.<br>AF-4: Đổi action → không validate và không lưu field của action cũ.<br>AF-5: Đóng popup có dirty state → xác nhận bỏ thay đổi. |
| Kết quả | FR gọi nhận `actionPayload` hợp lệ và độc lập với UI popup. |
| Dữ liệu sở hữu | Schema action dùng chung và metadata catalog; không sở hữu record nút/action của từng nghiệp vụ. |
| Giao diện | Popup `Hiệu chỉnh nút` hoặc `Thêm hành động`; tiêu đề/counter; danh sách action; form động; action bổ sung; `Hủy`, `Lưu`, xóa. |
| Quy tắc nghiệp vụ | `BR-AUT-003-01`, `BR-AUT-003-02`, `BR-AUT-003-03`, `BR-AUT-003-04`, `BR-AUT-003-05` |
| Tiêu chí chấp nhận | `AC-AUT-003-01`, `AC-AUT-003-02`, `AC-AUT-003-03`, `AC-AUT-003-04`, `AC-AUT-003-05` |
| Yêu cầu phi chức năng | Catalog tải dưới 1,5 giây P95; schema có version; kiểm tra quyền target; lỗi truy vết được. |
| Dependency | FR-AUT-001 cung cấp page context; được FR-AUT-006, 008, 010, 012, 016, 018 và 020 sử dụng. |

