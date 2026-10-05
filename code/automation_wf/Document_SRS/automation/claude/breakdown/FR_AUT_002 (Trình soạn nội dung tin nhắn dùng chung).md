# FR-AUT-002: Trình soạn nội dung tin nhắn dùng chung

| Mục | Nội dung |
|---|---|
| Mục đích | Cung cấp một trình soạn duy nhất cho nội dung tin nhắn được dùng bởi FAQ, Tin nhắn mở đầu, Tin nhắn mặc định, Từ khóa và bước Tin nhắn của Kịch bản chăm sóc. |
| Trong phạm vi | Soạn văn bản; thêm media/template; chèn biến; quản lý nút và trả lời nhanh qua FR-AUT-003; tạo nhiều bước; chọn bước tiếp theo; ghi chú nội bộ; Mobile Preview; Xem thử; validation nội dung. |
| Ngoài phạm vi | Không quyết định khi nào tin được gửi, ai nhận tin, trạng thái publish hoặc thống kê. Các nghiệp vụ đó thuộc FR gọi trình soạn. |
| Đối tượng liên quan | Admin; Quản lý; dịch vụ media; dịch vụ template. |
| Pre-conditions | Một FR nghiệp vụ đã mở trình soạn với `ownerType`, `ownerId` và quyền chỉnh sửa. |
| Điều kiện kích hoạt | Người dùng chọn tạo/sửa nội dung tin nhắn từ một FR nghiệp vụ. |
| Luồng xử lý chính | 1. Hệ thống nạp bản nội dung của owner.<br>2. Người dùng chọn bước và nhập văn bản.<br>3. Người dùng thêm, sửa, xóa hoặc sắp xếp các khối nội dung.<br>4. Người dùng thêm nút/trả lời nhanh bằng FR-AUT-003.<br>5. Người dùng tạo bước mới hoặc chọn bước tiếp theo.<br>6. Preview cập nhật từ state đang soạn.<br>7. `Xem thử` mô phỏng luồng nhưng không gửi tin thật.<br>8. Khi người dùng xác nhận, trình soạn trả về một content graph hợp lệ cho FR gọi. |
| Ngoại lệ | AF-1: Văn bản hoặc tiêu đề vượt giới hạn → chặn ký tự thêm và hiển thị counter tối đa.<br>AF-2: Bước không có nội dung → đánh dấu bước và không trả kết quả hợp lệ.<br>AF-3: Media/reference hỏng → đánh dấu đúng khối.<br>AF-4: Liên kết bước tạo vòng lặp không được phép → từ chối lựa chọn.<br>AF-5: Rời trình soạn khi có thay đổi → hỏi xác nhận. |
| Kết quả | Trả về content graph hợp lệ; việc lưu nháp/xuất bản do FR-AUT-004 và FR nghiệp vụ quyết định. |
| Dữ liệu sở hữu | Cấu trúc dùng chung `contentGraph`, `steps`, `blocks`, `nextStepId`, `internalNote`; không sở hữu trạng thái publish của owner. |
| Giao diện | Cột bước; vùng soạn; bộ đếm ký tự; thư viện khối; nút/trả lời nhanh; bước tiếp theo; ghi chú; Mobile Preview; `Xem thử`. |
| Quy tắc nghiệp vụ | `BR-AUT-002-01`, `BR-AUT-002-02`, `BR-AUT-002-03`, `BR-AUT-002-04`, `BR-AUT-002-05` |
| Tiêu chí chấp nhận | `AC-AUT-002-01`, `AC-AUT-002-02`, `AC-AUT-002-03`, `AC-AUT-002-04`, `AC-AUT-002-05` |
| Yêu cầu phi chức năng | Preview phản hồi dưới 50 ms cho thay đổi text; upload an toàn; không mất state khi validation lỗi; hỗ trợ bàn phím. |
| Dependency | FR-AUT-003 cho nút/action; được FR-AUT-008, 010, 012, 016 và 018 sử dụng. |

