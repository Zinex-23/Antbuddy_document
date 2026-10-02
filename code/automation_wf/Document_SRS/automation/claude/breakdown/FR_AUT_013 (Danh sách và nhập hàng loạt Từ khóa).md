# FR-AUT-013: Danh sách và nhập hàng loạt Từ khóa

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-005: Thiết lập từ khóa`. |
| Mô tả | Quản lý danh sách từ khóa theo hai phạm vi `Cho khách hàng` và `Cho trang`, gồm tìm kiếm, empty state, import, chọn hàng loạt, bật tắt và sắp xếp ưu tiên. |
| Đối tượng liên quan | Admin; Quản lý có quyền cấu hình AntBot. |
| Pre-conditions | Người dùng đã đăng nhập; trang đã chọn; có quyền đọc hoặc ghi từ khóa. |
| Điều kiện kích hoạt | AntBot → Tự động hóa → Từ khóa. |
| Luồng xử lý chính | 1. Hệ thống hiển thị hai tab, mặc định `Cho khách hàng`.<br>2. Tải danh sách, thứ tự và trạng thái riêng của tab.<br>3. Người dùng tìm kiếm theo nội dung hoặc phản hồi.<br>4. Chọn một hoặc nhiều dòng để bật hoặc tắt hàng loạt.<br>5. Kéo thả dòng để đổi ưu tiên trong tab.<br>6. Bấm `Tải lên`, chọn file hợp lệ, xem preview kết quả và xác nhận import.<br>7. Dòng import hợp lệ được tạo; dòng lỗi được báo chi tiết.<br>8. Người dùng có thể mở tạo hoặc sửa keyword qua FR-AUT-014. |
| Luồng thay thế và ngoại lệ | AF-1: Tab rỗng → hiển thị empty state và `Thêm mới`.<br>AF-2: Tìm kiếm không có kết quả → hiển thị trạng thái không tìm thấy, không thay đổi dữ liệu.<br>AF-3: File sai định dạng, vượt 5 MB hoặc quá 1.000 dòng → từ chối trước import.<br>AF-4: Một phần dòng lỗi → không tạo dòng lỗi; cho tải báo cáo lỗi; xử lý dòng hợp lệ theo lựa chọn xác nhận.<br>AF-5: Bulk action lỗi một phần → hiển thị từng kết quả, không báo thành công toàn bộ.<br>AF-6: Đổi tab không làm mất filter hoặc state chưa lưu ngoài chính sách đã định. |
| Post-condition | Danh sách và ưu tiên của đúng trang, đúng tab được cập nhật; không ảnh hưởng tab còn lại. |
| Giao diện hệ thống | Hai tab; tìm kiếm; `Tải lên`; `Thêm mới`; bảng có drag handle, checkbox, `Kích hoạt`, nội dung, phạm vi, phản hồi, lượt khớp và menu dòng; thanh bulk action; phân trang nếu cần. |
| Quy tắc nghiệp vụ | `BR-AUT-013-01`, `BR-AUT-013-02`, `BR-AUT-013-03`, `BR-AUT-013-04`, `BR-AUT-013-05` |
| Yêu cầu phi chức năng | Tìm kiếm debounce; danh sách 1.000 dòng vẫn tương tác được; import có progress và báo lỗi theo dòng; audit bulk operation. |
| Tiêu chí chấp nhận | `AC-AUT-013-01`, `AC-AUT-013-02`, `AC-AUT-013-03`, `AC-AUT-013-04`, `AC-AUT-013-05`, `AC-AUT-013-06` |
| Dependency | FR-AUT-014; FR-AUT-015. |

