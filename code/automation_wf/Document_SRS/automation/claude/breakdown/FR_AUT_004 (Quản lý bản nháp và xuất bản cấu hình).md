# FR-AUT-004: Quản lý bản nháp và xuất bản cấu hình

| Mục | Nội dung |
|---|---|
| Mục đích | Chuẩn hóa vòng đời cấu hình Automation có bản nháp và bản đang chạy để các FR không tự định nghĩa lại `Lưu nháp`, `Xuất bản`, version và xử lý lỗi. |
| Trong phạm vi | Dirty state; lưu nháp; validation trước publish; version; đồng bộ connector; trạng thái publish; retry; conflict; cảnh báo rời trang; audit. |
| Ngoài phạm vi | Không định nghĩa nội dung cấu hình hợp lệ của từng nghiệp vụ và không thực thi cấu hình khi có event. |
| Đối tượng liên quan | Admin; Quản lý; configuration service; connector; audit service. |
| Pre-conditions | FR nghiệp vụ cung cấp owner, draft payload, hàm validate và quyền publish. |
| Điều kiện kích hoạt | Người dùng thay đổi cấu hình, bấm `Lưu nháp`, `Xuất bản`, `Thử lại` hoặc rời màn hình. |
| Luồng xử lý chính | 1. Thay đổi làm trạng thái thành `Có thay đổi chưa lưu`.<br>2. `Lưu nháp` ghi draft và version nhưng không đổi bản đang chạy.<br>3. `Xuất bản` gọi validation của owner và kiểm tra quyền/kết nối.<br>4. Hệ thống tạo snapshot, đồng bộ connector nếu cần.<br>5. Thành công → snapshot thành published version.<br>6. UI hiển thị `Đã xuất bản`; audit log được ghi.<br>7. Runtime tiếp tục dùng published snapshot cho đến lần publish thành công tiếp theo. |
| Ngoại lệ | AF-1: Validation lỗi → focus lỗi đầu, chặn publish.<br>AF-2: Mất kết nối → cho lưu nháp nhưng chặn publish cần connector.<br>AF-3: Đồng bộ lỗi → giữ draft và published cũ, hiển thị `Xuất bản thất bại` và `Thử lại`.<br>AF-4: Version conflict → không ghi đè; yêu cầu tải lại/merge.<br>AF-5: Rời trang có dirty state → xác nhận bỏ thay đổi.<br>AF-6: Request lặp → idempotency không tạo nhiều version. |
| Kết quả | Draft và published snapshot được quản lý nhất quán; khách chỉ dùng published version. |
| Dữ liệu sở hữu | `draftVersion`, `publishedVersion`, `publishStatus`, `requestId`, audit metadata; không sở hữu payload nghiệp vụ. |
| Giao diện | `Có thay đổi chưa lưu`, `Bản nháp đã lưu`, `Đang xuất bản`, `Đã xuất bản`, `Xuất bản thất bại`; `Lưu nháp`, `Xuất bản`, `Thử lại`. |
| Quy tắc nghiệp vụ | `BR-AUT-004-01`, `BR-AUT-004-02`, `BR-AUT-004-03`, `BR-AUT-004-04`, `BR-AUT-004-05` |
| Tiêu chí chấp nhận | `AC-AUT-004-01`, `AC-AUT-004-02`, `AC-AUT-004-03`, `AC-AUT-004-04`, `AC-AUT-004-05` |
| Yêu cầu phi chức năng | Lưu/publish dưới 1,5 giây P95 hoặc trả job ID; idempotent; optimistic locking; audit đầy đủ; không mất draft khi lỗi. |
| Dependency | FR nghiệp vụ cung cấp validation và payload; connector khi cần đồng bộ. |
