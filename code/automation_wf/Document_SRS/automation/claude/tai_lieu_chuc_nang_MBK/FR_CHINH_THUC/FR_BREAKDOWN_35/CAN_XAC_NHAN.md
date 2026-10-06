# Danh sách nội dung cần nghiệp vụ/sản phẩm xác nhận

| Mã | FR liên quan | Nội dung cần quyết định | Ảnh hưởng |
| --- | --- | --- | --- |
| CONF-001 | 001–003 | Giới hạn văn bản 640/1.200 ký tự, tối đa 3 nút và 13 trả lời nhanh có áp dụng mọi kênh hay chỉ Messenger? | Quyết định cách kiểm tra dữ liệu, hiển thị bộ đếm và khả năng tái sử dụng trình biên soạn. |
| CONF-002 | 002 | Danh mục hành động nút chính thức và thông tin bắt buộc của từng hành động? | Cần để hoàn tất giao diện, quy tắc kiểm tra và tiêu chí nghiệm thu chi tiết. |
| CONF-003 | 004 | Các loại bước được hỗ trợ và vòng lặp có giới hạn có được phép không? | Quyết định màn hình tạo luồng, điều kiện chuyển bước và cách ngăn luồng chạy lặp vô hạn. |
| CONF-004 | 006–007 | Menu có tối đa 20 mục không; hỗ trợ hành động/chuyển menu nào và thứ tự thực hiện? | Ảnh hưởng kiểm tra dữ liệu và xử lý khi khách bấm. |
| CONF-005 | 010 | Xuất bản menu rỗng là gỡ menu hay bị chặn? | Ảnh hưởng luồng xóa nội dung đang áp dụng. |
| CONF-006 | 011–012 | Câu hỏi thường gặp có tối đa 4 câu, mỗi câu tối đa 45 ký tự, xuất hiện ở đâu và danh sách rỗng có gỡ toàn bộ câu hỏi không? | Quyết định giao diện và hành vi trên từng nền tảng. |
| CONF-007 | 012 | “Tạo tin nhắn mới” hay chọn khối có sẵn; hỗ trợ những hành động bổ sung nào và xử lý ra sao khi một hành động lỗi? | Quyết định phạm vi phản hồi cho Câu hỏi thường gặp. |
| CONF-008 | 014 | Công tắc Tin nhắn mở đầu có hiệu lực ngay hay chỉ sau khi lưu/áp dụng? | Tránh giao diện hiển thị khác với trạng thái hệ thống đang thực hiện. |
| CONF-009 | 015 | Định nghĩa phiên mới, xử lý tin đầu tiên và quy tắc gửi lại lời chào? | Quyết định ai nhận lời chào và chống trùng. |
| CONF-010 | 016–017 | Tin nhắn mặc định được gửi khi AI không tìm được câu trả lời, được gửi theo chu kỳ khi khách quay lại, hay hỗ trợ cả hai trường hợp? | Đây là khác biệt lớn giữa danh sách FR của Antbot và tài liệu Botcake. |
| CONF-011 | 016 | Dùng luồng nhiều bước, trợ lý AI hay cả hai; ý nghĩa công tắc “Mặc định”; giới hạn tần suất và độ trễ là gì? | Quyết định màn hình cấu hình và thứ tự xử lý. |
| CONF-012 | 017 | Thứ tự Thu thập → Từ khóa → AI → phản hồi mặc định và thời điểm bắt đầu khoảng nghỉ? | Quyết định phản hồi duy nhất cho mỗi tin khách. |
| CONF-013 | 018 | Hỗ trợ những kiểu khớp và loại nội dung nào; phạm vi “Cho trang” gồm tin của nhân viên hay cả tin của bot? | Mặc định an toàn trong tài liệu là loại trừ tin do bot hoặc chức năng tự động hóa gửi. |
| CONF-014 | 018 | “Một lần” tính theo khách + quy tắc, khách + phiên hay phạm vi khác? | Quyết định cách lưu và đặt lại tần suất. |
| CONF-015 | 021 | Hỗ trợ tệp CSV, Excel hay cả hai; gồm những cột nào; giới hạn dung lượng/số dòng và trạng thái sau khi nhập là gì? | Cần để hoàn tất chức năng nhập tệp. |
| CONF-016 | 022 | Quy tắc được chọn chỉ dựa trên thứ tự danh sách hay còn ưu tiên theo kiểu khớp; nếu quy tắc được chọn gặp lỗi thì có xét quy tắc tiếp theo không? | Quyết định tính ổn định của phản hồi. |
| CONF-017 | 023–027 | Xóa/tắt kịch bản ảnh hưởng khách hiện tại thế nào? | Quyết định hủy lịch và trải nghiệm khách. |
| CONF-018 | 024 | Danh sách đầy đủ các hành động được phép dùng trong bước chăm sóc là gì? | Quyết định phạm vi màn hình cấu hình và chức năng nào chịu trách nhiệm thực hiện từng hành động. |
| CONF-019 | 024 | “Sau X” tính từ đâu; ngoài giờ dời hay bỏ; xử lý việc đổi giờ mùa hè và mốc đã qua? | Quyết định toàn bộ lịch chạy. |
| CONF-020 | 026 | Tạm dừng/tiếp tục/hủy/đăng ký lại giữ hay tính lại lịch? | Quyết định vòng đời khách tham gia. |
| CONF-021 | 027 | Chính sách tiếp tục/dừng, số lần thử và lỗi vĩnh viễn? | Quyết định chuyển bước và tránh gửi trùng. |
| CONF-022 | 029 | Danh mục sự kiện và phép so sánh gồm những gì; nhiều sự kiện được kết hợp ra sao; điều kiện thuộc từng sự kiện hay toàn quy luật? | Quyết định phần KHI và NẾU của quy luật. |
| CONF-023 | 030 | Danh mục hành động, tần suất và thời điểm ghi nhận “đã chạy một lần” là gì? | Quyết định phần THÌ của quy luật và cách ngăn chạy lại. |
| CONF-024 | 031 | Nhiều quy luật cùng khớp chạy song song hay tuần tự; xung đột và giới hạn độ sâu? | Liên quan trực tiếp chống vòng lặp và kết quả cuối. |
| CONF-025 | 033 | Đây là biểu mẫu độc lập hay chỉ là một khối trong luồng; xử lý thế nào khi khách bấm Menu/Câu hỏi thường gặp hoặc nhập lệnh hủy; thời gian chờ và số lần thử lại mặc định là bao nhiêu? | Quyết định ưu tiên nhận câu trả lời. |
| CONF-026 | 034 | Chức năng chỉ cập nhật một trường hay còn bao gồm ánh xạ nhiều trường, xử lý hàng loạt và tích hợp nâng cao? | Quyết định giữ chung hay tách thêm FR đồng bộ dữ liệu. |

## Cách đóng mục xác nhận

Mỗi quyết định cần ghi phương án, người phê duyệt, ngày và nguồn khảo sát hoặc thiết kế giao diện nếu có. Sau đó cập nhật đồng thời FR liên quan, AC, BR và xóa nhãn **[Cần xác nhận]** tương ứng.
