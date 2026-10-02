# FR-AUT-020: Cấu hình sự kiện và điều kiện Quy luật

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-007: Quy luật`. |
| Mô tả | Cấu hình khung `Áp dụng khi` của một quy luật, gồm một hoặc nhiều sự kiện kích hoạt và bộ lọc gắn riêng với từng sự kiện. |
| Đối tượng liên quan | Admin; Quản lý; event catalog; customer data service. |
| Pre-conditions | Rule tồn tại; người dùng có quyền ghi; event catalog và field metadata đã tải. |
| Điều kiện kích hoạt | Mở Chi tiết rule và bấm `Thêm điều kiện mới` hoặc `Thêm quy tắc mới` trong khung `Áp dụng khi`. |
| Luồng xử lý chính | 1. Hệ thống hiển thị danh mục sự kiện được hỗ trợ.<br>2. Người dùng chọn sự kiện; hệ thống thêm thẻ trigger và các tham số tương ứng.<br>3. Người dùng nhập tham số bắt buộc của trigger.<br>4. Bấm `Thêm điều kiện mới` trong thẻ để thêm filter.<br>5. Chọn field, operator và value; có thể thêm nhiều filter.<br>6. Người dùng thu gọn, mở rộng hoặc xóa trigger/filter.<br>7. Hệ thống lưu state vào rule draft; khi lưu toàn rule, validate mọi trigger và filter. |
| Luồng thay thế và ngoại lệ | AF-1: Không có trigger → rule incomplete, chặn lưu active.<br>AF-2: Trigger thiếu tham số → đánh dấu thẻ và focus trường lỗi.<br>AF-3: Filter thiếu field/operator/value hoặc kiểu value sai → chặn lưu.<br>AF-4: Field/tag/object tham chiếu bị xóa → tự tắt rule, gắn `Cần cấu hình lại`.<br>AF-5: Xóa trigger cuối cùng → cho phép trong draft nhưng rule không thể active.<br>AF-6: Catalog không tải được → giữ state, cho thử lại. |
| Post-condition | Rule draft có ít nhất một trigger hợp lệ khi complete; mỗi filter gắn đúng trigger. |
| Giao diện hệ thống | Khung `Áp dụng khi`; empty state; nút thêm trigger; thẻ trigger; nút thêm filter; field/operator/value; thu gọn; xóa. |
| Quy tắc nghiệp vụ | `BR-AUT-020-01`, `BR-AUT-020-02`, `BR-AUT-020-03`, `BR-AUT-020-04`, `BR-AUT-020-05` |
| Yêu cầu phi chức năng | Catalog cache có version; validate client và server đồng nhất; không lộ custom field ngoài quyền; UI hỗ trợ nhiều trigger mà không khóa quá 100 ms. |
| Tiêu chí chấp nhận | `AC-AUT-020-01`, `AC-AUT-020-02`, `AC-AUT-020-03`, `AC-AUT-020-04`, `AC-AUT-020-05`, `AC-AUT-020-06` |
| Dependency | FR-AUT-019; FR-AUT-021; event catalog; customer field/tag service. |

