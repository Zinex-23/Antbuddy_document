# AC-AUT-007 — Quản lý menu tùy chỉnh

> FR tham chiếu: FR-AUT-007  
> BR kiểm chứng: BR-AUT-006, BR-AUT-010, BR-AUT-014, BR-AUT-015, BR-AUT-016, BR-AUT-017, BR-AUT-018, BR-AUT-019

| Mục | Nội dung |
| --- | --- |
| Given | Người dùng có quyền quản lý menu và kênh đã có menu mặc định. |
| When | Người dùng tạo menu gồm 1–20 mục, tên mục tối đa 30 ký tự và một hành động/mục; sau đó sao chép, áp dụng, gán cho khách rồi xóa menu. |
| Then | Hệ thống tạo menu có tên duy nhất, bản sao có mã mới ở bản nháp, và tại một thời điểm khách chỉ dùng một menu riêng. |
| And | Hệ thống chặn tên trùng sau chuẩn hóa, menu rỗng/quá 20 mục, mục thiếu dữ liệu, URL sai hoặc menu sai kênh/chưa áp dụng; khi menu bị xóa, khách trở về menu mặc định và lịch sử được giữ. |
