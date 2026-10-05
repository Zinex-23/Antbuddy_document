# FR-AUT-001: Phạm vi trang và phân quyền Automation

| Mục | Nội dung |
|---|---|
| Mục đích | Cung cấp một cách thống nhất để chọn trang/kênh và kiểm tra quyền trước khi người dùng làm việc với bất kỳ chức năng Automation nào. |
| Trong phạm vi | Chọn trang; tìm trang; hiển thị trạng thái kết nối; tải lại dữ liệu theo trang; kiểm tra quyền xem/quản lý; cảnh báo khi đổi trang mà có thay đổi chưa lưu. |
| Ngoài phạm vi | Không quản lý cấu hình Menu, FAQ, Tin nhắn, Từ khóa, Kịch bản hoặc Quy luật. Không quyết định nội dung nào được gửi cho khách. |
| Đối tượng liên quan | Admin; Quản lý; Viewer; dịch vụ phân quyền; dịch vụ kết nối kênh. |
| Pre-conditions | Người dùng đã đăng nhập và thuộc một tenant hợp lệ. |
| Điều kiện kích hoạt | Người dùng mở một màn hình thuộc module Automation hoặc đổi trang đang quản lý. |
| Luồng xử lý chính | 1. Hệ thống tải các trang người dùng được phép truy cập.<br>2. Người dùng mở `Chọn trang quản lý`, tìm và chọn một trang.<br>3. Hệ thống kiểm tra quyền và trạng thái kết nối.<br>4. Hệ thống đặt trang được chọn làm phạm vi hiện tại.<br>5. Màn hình chức năng đang mở tải lại dữ liệu theo `pageId` mới.<br>6. Các thao tác ghi chỉ hiển thị khi người dùng có quyền quản lý. |
| Ngoại lệ | AF-1: Trang mất kết nối → vẫn cho xem dữ liệu đã lưu, chặn thao tác cần đồng bộ kênh.<br>AF-2: Không có quyền xem → không hiển thị trang hoặc trả lỗi forbidden.<br>AF-3: Có thay đổi chưa lưu khi đổi trang → yêu cầu xác nhận bỏ thay đổi.<br>AF-4: Trang bị xóa/ẩn trong lúc sử dụng → đưa người dùng về màn chọn trang. |
| Kết quả | Mọi request Automation sau đó mang đúng `tenantId`, `pageId` và quyền của người dùng. |
| Dữ liệu sở hữu | `activePageId` của phiên làm việc; không sở hữu dữ liệu cấu hình nghiệp vụ. |
| Giao diện | Bộ chọn trang gồm avatar, tên, định danh, kênh và trạng thái kết nối; trang hiện tại có trạng thái được chọn. |
| Quy tắc nghiệp vụ | `BR-AUT-001-01`, `BR-AUT-001-02`, `BR-AUT-001-03`, `BR-AUT-001-04` |
| Tiêu chí chấp nhận | `AC-AUT-001-01`, `AC-AUT-001-02`, `AC-AUT-001-03`, `AC-AUT-001-04` |
| Yêu cầu phi chức năng | Kiểm tra quyền ở cả UI và API; không rò rỉ dữ liệu giữa tenant; đổi trang và tải metadata dưới 1,5 giây P95. |
| Dependency | Được mọi FR-AUT-005 đến FR-AUT-021 sử dụng. |

