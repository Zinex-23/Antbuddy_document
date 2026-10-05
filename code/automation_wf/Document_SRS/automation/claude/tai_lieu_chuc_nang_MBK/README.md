# BỘ ĐẶC TẢ 15 TÍNH NĂNG AUTOMATION THỰC CHIẾN (THAM KHẢO BOTCAKE)

Thư mục này tổng hợp **15 tính năng tự động hóa (Automation)** được xây dựng dựa trên kinh nghiệm thực tế từ các nền tảng chatbot hàng đầu (như Botcake, ManyChat) và đặc tả hệ thống AntBuddy.

Tất cả tài liệu được viết bằng **ngôn ngữ đời thường, gần gũi, dễ hiểu**, loại bỏ các thuật ngữ "hàn lâm / công nghiệp", giúp Developer đọc là biết ngay cần code API gì, Frontend bắt sự kiện gì, và Tester biết kịch bản test ra sao.

---

## 1. Bản Đồ 15 Tính Năng Tự Động Hóa

```
                                  15 TÍNH NĂNG AUTOMATION
                                             │
   ┌──────────────────────┬──────────────────┴────────────────┬──────────────────────┐
   ▼                      ▼                                   ▼                      ▼
[HÚT KHÁCH & ĐIỀU HƯỚNG] [TRẢ LỜI TIN NHẮN TỰ ĐỘNG]        [CHĂM SÓC & TỰ ĐỘNG HÓA]  [VẬN HÀNH & KẾT NỐI]
 01. Menu chính           03. Lời chào khách mới             08. Kịch bản theo lịch   10. Soạn tin & Nút bấm
 02. Câu hỏi gợi ý (FAQ)  04. Tin nhắn khi bot không hiểu    09. Quy luật khi có sự   11. Form thu thập SĐT/Email
 06. Trả lời comment bài  05. Bắt từ khóa trả lời                kiện (Trigger-Action)12. Chuyển cho nhân viên
 07. Ẩn comment chứa SĐT  14. Xin quyền nhận tin (Opt-in)    13. Gửi tin hàng loạt    15. Báo cáo & Đếm số liệu
```

---

## 2. Danh Mục 15 File Chi Tiết

| Mã FR | Tên Tính Năng | Giải Thích Đơn Giản Cho Dev | File Chi Tiết |
|---|---|---|---|
| **FR-AUT-001** | **Menu chính** | Thanh menu bấm góc dưới khung chat (mặc định + menu riêng từng khách) | [FR_AUT_001_MENU_CHINH.md](FR_AUT_001_MENU_CHINH.md) |
| **FR-AUT-002** | **Câu hỏi thường gặp** | 4 nút gợi ý câu hỏi nổi lên khi khách vừa mở khung chat | [FR_AUT_002_CAU_HOI_THUONG_GAP.md](FR_AUT_002_CAU_HOI_THUONG_GAP.md) |
| **FR-AUT-003** | **Lời chào khách mới** | Tự động gửi lời chào khi khách mở phiên chat mới (chỉ chào 1 lần) | [FR_AUT_003_LOI_CHAO_KHACH_MOI.md](FR_AUT_003_LOI_CHAO_KHACH_MOI.md) |
| **FR-AUT-004** | **Tin nhắn khi bot không hiểu** | Khách nói câu lạ bot không hiểu ➔ gửi tin hướng dẫn (có chặn spam 15p) | [FR_AUT_004_TIN_NHAN_MAC_DINH_FALLBACK.md](FR_AUT_004_TIN_NHAN_MAC_DINH_FALLBACK.md) |
| **FR-AUT-005** | **Bắt từ khóa trả lời ngay** | Khách gõ từ khóa (giá, địa chỉ...) ➔ bot trả lời đúng mẫu đã cài | [FR_AUT_005_BAT_TU_KHOA_TRA_LOI.md](FR_AUT_005_BAT_TU_KHOA_TRA_LOI.md) |
| **FR-AUT-006** | **Tự động trả lời bình luận** | Khách comment bài viết ➔ bot tự like, trả lời comment và nhắn tin inbox | [FR_AUT_006_TU_DONG_TRA_LOI_COMMENT.md](FR_AUT_006_TU_DONG_TRA_LOI_COMMENT.md) |
| **FR-AUT-007** | **Tự động ẩn bình luận chứa SĐT** | Tự ẩn comment có SĐT hoặc từ khóa nhạy cảm để chống cướp khách | [FR_AUT_007_AN_COMMENT_CHUA_SDT.md](FR_AUT_007_AN_COMMENT_CHUA_SDT.md) |
| **FR-AUT-008** | **Kịch bản nuôi dưỡng theo lịch** | Tự động gửi tin sau 1 ngày, 3 ngày, 7 ngày...; dừng khi khách đã mua | [FR_AUT_008_KICH_BAN_CHAM_SOC_THEO_LICH.md](FR_AUT_008_KICH_BAN_CHAM_SOC_THEO_LICH.md) |
| **FR-AUT-009** | **Quy luật tự động theo sự kiện** | Khi khách để lại SĐT ➔ tự gắn nhãn VIP, chia cho sale, đổi menu | [FR_AUT_009_QUY_LUAT_TU_DONG_THEO_SU_KIEN.md](FR_AUT_009_QUY_LUAT_TU_DONG_THEO_SU_KIEN.md) |
| **FR-AUT-010** | **Soạn tin nhắn & Cấu hình nút** | Bộ soạn nội dung: chữ, ảnh, carousel trượt, video + nút bấm chuyển tiếp | [FR_AUT_010_SOAN_TIN_NHAN_VA_NUT_BAM.md](FR_AUT_010_SOAN_TIN_NHAN_VA_NUT_BAM.md) |
| **FR-AUT-011** | **Form hỏi đáp lấy SĐT / Email** | Bot hỏi từng câu: Tên ➔ SĐT ➔ Email; kiểm tra đúng số rồi lưu CRM | [FR_AUT_011_FORM_THU_THAP_THONG_TIN.md](FR_AUT_011_FORM_THU_THAP_THONG_TIN.md) |
| **FR-AUT-012** | **Chuyển cuộc chat cho nhân viên** | Chuyển sang người thật chat, bot tự im lặng (Mute) để không nói xen | [FR_AUT_012_CHUYEN_CHO_NHAN_VIEN.md](FR_AUT_012_CHUYEN_CHO_NHAN_VIEN.md) |
| **FR-AUT-013** | **Gửi tin nhắn hàng loạt** | Chọn tệp khách theo thẻ tag ➔ Bắn tin ưu đãi hàng loạt (Broadcast) | [FR_AUT_013_GUI_TIN_NHAN_HANG_LOAT.md](FR_AUT_013_GUI_TIN_NHAN_HANG_LOAT.md) |
| **FR-AUT-014** | **Xin quyền gửi tin ngoài 24h** | Khách bấm nhận tin ưu đãi ➔ Lấy token để gửi tin ngoài 24h hợp lệ | [FR_AUT_014_XIN_QUYEN_NHAN_TIN_OPT_IN.md](FR_AUT_014_XIN_QUYEN_NHAN_TIN_OPT_IN.md) |
| **FR-AUT-015** | **Báo cáo & Đếm số liệu** | Đếm người dùng, số tin gửi thành công, số người đọc, số người click | [FR_AUT_015_BAO_CAO_VA_SO_LIEU.md](FR_AUT_015_BAO_CAO_VA_SO_LIEU.md) |

---

> 👉 **Xem bản tóm tắt nhanh toàn bộ hệ thống trong 1 trang**: [00_BANG_TONG_HOP_15_CHUC_NANG.md](00_BANG_TONG_HOP_15_CHUC_NANG.md)
