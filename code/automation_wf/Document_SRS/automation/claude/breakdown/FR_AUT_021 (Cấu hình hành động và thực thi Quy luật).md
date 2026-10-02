# FR-AUT-021: Cấu hình hành động và thực thi Quy luật

| Mục | Nội dung |
|---|---|
| Mã nguồn | Breakdown từ `FR-AUT-007: Quy luật`. |
| Mô tả | Cấu hình khung `Hành động của Bot`, tần suất thực hiện và runtime chạy rule khi trigger/filter đạt. |
| Đối tượng liên quan | Admin; Quản lý; runtime rules engine; các dịch vụ action AntBot, AntBuddy, BizAI và POS. |
| Pre-conditions | Rule và trigger do FR-AUT-019/020 cung cấp; action catalog tải thành công. |
| Điều kiện kích hoạt | Bấm `Thêm hành động`; bấm `Lưu` rule; runtime nhận event phù hợp. |
| Luồng xử lý chính | 1. Mở popup `Thêm hành động` theo nhóm action.<br>2. Người dùng chọn action và nhập tham số bắt buộc.<br>3. Hệ thống thêm thẻ action vào khung; có thể thêm nhiều action và sắp xếp thứ tự.<br>4. Người dùng chọn `Luôn được thực hiện` hoặc `Chỉ thực hiện 1 lần` cho mỗi khách.<br>5. Bấm `Lưu`; hệ thống validate trigger, filter, action và reference; rule complete có thể được bật.<br>6. Runtime nhận event, chọn rule active cùng trang và đánh giá trigger/filter.<br>7. Kiểm tra frequency và loop guard.<br>8. Thực hiện action lần lượt theo thứ tự, ghi kết quả từng action và execution tổng.<br>9. Với `Chỉ thực hiện 1 lần`, ghi dấu hoàn tất theo customer/rule sau execution đáp ứng policy. |
| Luồng thay thế và ngoại lệ | AF-1: Không có action hoặc thiếu tham số → chặn lưu.<br>AF-2: Reference action bị xóa/inactive → tự tắt rule và gắn cần sửa.<br>AF-3: Một action thất bại → ghi lỗi; dừng hoặc tiếp tục theo failure policy đã cấu hình, mặc định dừng để tránh side effect ngoài ý muốn.<br>AF-4: Event do chính rule tạo quay lại → loop guard ngăn recursion vượt ngưỡng.<br>AF-5: Frequency một lần đã thỏa → bỏ qua toàn rule cho customer đó.<br>AF-6: Event trùng → idempotency ngăn chạy action hai lần.<br>AF-7: Lưu lỗi → giữ draft, bản active cũ không đổi. |
| Post-condition | Rule hợp lệ được lưu; runtime thực thi có kiểm soát tần suất, thứ tự, loop và idempotency; có execution log. |
| Giao diện hệ thống | Khung `Hành động của Bot`; empty state; popup action theo nhóm; thẻ action và tham số; sắp xếp/xóa; radio tần suất; `Lưu`; toggle Kích hoạt. |
| Quy tắc nghiệp vụ | `BR-AUT-021-01`, `BR-AUT-021-02`, `BR-AUT-021-03`, `BR-AUT-021-04`, `BR-AUT-021-05`, `BR-AUT-021-06`, `BR-AUT-021-07` |
| Yêu cầu phi chức năng | Runtime quyết định dưới 100 ms P95 trước thời gian action; durable execution log; idempotent; retry có backoff; che dữ liệu nhạy cảm trong log. |
| Tiêu chí chấp nhận | `AC-AUT-021-01`, `AC-AUT-021-02`, `AC-AUT-021-03`, `AC-AUT-021-04`, `AC-AUT-021-05`, `AC-AUT-021-06`, `AC-AUT-021-07` |
| Dependency | FR-AUT-019; FR-AUT-020; shared action catalog; rule engine; audit/execution log. |
