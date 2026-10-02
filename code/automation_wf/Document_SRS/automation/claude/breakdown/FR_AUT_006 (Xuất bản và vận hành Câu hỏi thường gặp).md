# FR-AUT-006: Xuất bản và vận hành Câu hỏi thường gặp

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-002: Câu hỏi thường gặp`. |
| Mô tả | Xuất bản danh sách FAQ, đồng bộ cấu hình lên kênh và xử lý khi khách bấm câu hỏi. Tách biệt bản nháp với bản đang hiển thị cho khách. |
| Đối tượng liên quan | Admin; Quản lý; connector kênh; runtime hội thoại. |
| Pre-conditions | Draft do FR-AUT-004 và FR-AUT-005 tạo; trang có capability hỗ trợ FAQ. |
| Điều kiện kích hoạt | Người dùng bấm `Xuất bản`; khách bấm một câu hỏi đã published. |
| Luồng xử lý chính | 1. Hệ thống validate toàn bộ draft và dependency.<br>2. Nút chuyển sang `Đang xuất bản`; hệ thống tạo version và đồng bộ kênh.<br>3. Khi thành công, version mới thành `Đã xuất bản`; trạng thái dirty được xóa.<br>4. Khách nhìn thấy danh sách câu hỏi theo đúng thứ tự published.<br>5. Khi khách bấm, runtime thực hiện action chính rồi action bổ sung theo cấu hình.<br>6. Hệ thống ghi nhận lượt hiển thị và lượt bấm nếu analytics được bật. |
| Luồng thay thế và ngoại lệ | AF-1: Không có thay đổi → vô hiệu hóa `Xuất bản`.<br>AF-2: Draft có câu hỏi hoặc action lỗi → đánh dấu đúng dòng, chặn publish.<br>AF-3: Kênh mất kết nối hoặc publish lỗi → giữ draft, khách tiếp tục thấy version cũ, cho phép thử lại.<br>AF-4: Reference bị xóa sau publish → không thực hiện action lỗi; ghi log và đánh dấu cấu hình cần sửa.<br>AF-5: Danh sách rỗng được publish chỉ khi chính sách sản phẩm cho phép; kết quả là ẩn FAQ. |
| Post-condition | Version published mới được dùng cho khách; draft lỗi không thay thế version đang chạy; runtime và analytics gắn đúng version. |
| Giao diện hệ thống | Nút `Xuất bản`; trạng thái `Có thay đổi chưa xuất bản`, `Đang xuất bản`, `Đã xuất bản`, `Xuất bản thất bại`; Mobile Preview chỉ mô phỏng. |
| Quy tắc nghiệp vụ | `BR-AUT-006-01`, `BR-AUT-006-02`, `BR-AUT-006-03`, `BR-AUT-006-04`, `BR-AUT-006-05` |
| Yêu cầu phi chức năng | Publish idempotent; phản hồi dưới 1,5 giây P95 hoặc trả job ID; audit log đầy đủ; runtime không thực thi hai lần khi nhận event trùng. |
| Tiêu chí chấp nhận | `AC-AUT-006-01`, `AC-AUT-006-02`, `AC-AUT-006-03`, `AC-AUT-006-04`, `AC-AUT-006-05` |
| Dependency | FR-AUT-004; FR-AUT-005; connector kênh; runtime Automation. |
