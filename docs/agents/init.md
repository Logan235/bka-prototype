# TÀI LIỆU ĐỊNH HƯỚNG PHÁT TRIỂN PROTOTYPE BKA.AI (MVP 2026)

**Phiên bản:** 1.0
**Mục tiêu:** Cung cấp hướng dẫn kỹ thuật chi tiết để xây dựng bản Interactive Prototype cho dự án BKA.ai dựa trên hệ sinh thái PNPM + React (Vite) + NestJS + TailwindCSS + DaisyUI.
**Tính chất:** Đây là tài liệu hướng dẫn xây dựng **Prototype**. Trọng tâm là mô phỏng luồng tương tác (UI/UX) và định hình cấu trúc mã nguồn chuẩn bị cho giai đoạn Production.

---

## 1. TỔNG QUAN KIẾN TRÚC HỆ THỐNG (POLYREPO STRATEGY)

Dự án sẽ được tổ chức theo mô hình **Polyrepo** (các repository hoàn toàn độc lập) để đảm bảo tính module và dễ dàng mở rộng, quản lý team sau này.

### Sơ đồ Repository:

1. **`bka-frontend-web`** (React + Vite + Tailwind + DaisyUI): Điểm truy cập duy nhất (Single Point of Entry) cho toàn bộ 3 vai trò (Guest, Student, Admin).
2. **`bka-backend-api`** (NestJS): Core API. Trong bản Prototype, repo này đóng vai trò định hình cấu trúc module và trả về Mock Data. (Chưa kết nối MongoDB thật).
3. **`bka-ai-chatbot-service`** _(Định hướng tương lai)_: Repo độc lập (thường dùng Python/FastAPI) xử lý NLP, RAG. **Lưu ý trong Prototype:** Logic kịch bản cứng (rule-based) của chatbot sẽ được nhúng tạm thời vào `bka-frontend-web` để tiết kiệm thời gian demo.

---

## 2. QUY ĐỊNH KỸ THUẬT: PROTOTYPE vs. PRODUCTION

Để tránh sa đà vào logic phức tạp, đội ngũ phát triển cần tuân thủ nghiêm ngặt ranh giới giữa Prototype và Production như sau:

| Hạng mục kỹ thuật          | Triển khai trong Prototype hiện tại                                                                           | Công cụ chuyên nghiệp khi làm thật (Production)                       |
| :------------------------- | :------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------- |
| **Database**               | Sử dụng Mock Data tĩnh (JSON/Arrays) trực tiếp trong NestJS Services hoặc Frontend state.                     | MongoDB (Mongoose/Prisma).                                            |
| **Xác thực (Auth)**        | Giả lập (Mock State) trên Frontend. Bấm "Đăng nhập" là đổi state sang đã login, cấp role tương ứng.           | JWT (JSON Web Token), Refresh Token, tích hợp BKA SSO (nếu có).       |
| **Xử lý Biểu mẫu (Form)**  | Dùng React state cơ bản, mô phỏng UI tương tác (Next step, báo lỗi cứng, success modal). KHÔNG gửi data thật. | `react-hook-form` kết hợp `zod` hoặc `yup` để validation chặt chẽ.    |
| **Tải file (File Upload)** | Giả lập giao diện chọn file (UI Only), hiện tên file và thanh progress bar giả. KHÔNG lưu file.               | NestJS xử lý Multipart/form-data, đẩy file lên Cloudinary / AWS S3.   |
| **Table & Dashboard**      | Vẽ giao diện bằng thẻ `<table>` DaisyUI hoặc Grid tĩnh cơ bản.                                                | `TanStack Table` (cho danh sách), `Recharts` (cho Dashboard biểu đồ). |
| **Chatbot AI**             | Kịch bản cứng (if-else rule-based), lưu trong 1 file config tại Frontend.                                     | LLM, Langchain, Vector Database qua Repo riêng.                       |

---

## 3. HƯỚNG DẪN XÂY DỰNG FRONTEND (`bka-frontend-web`)

**Tech Stack:** React 18, Vite, TypeScript, TailwindCSS, DaisyUI, React Router v6.

### 3.1. Cấu trúc thư mục (Folder Structure)

Áp dụng Feature-based structure để dễ dàng scale:

```text
src/
├── assets/           # Hình ảnh, fonts, đồ họa (community-cutout.png, logo)
├── components/       # UI Components dùng chung (Button, Modal, Input)
├── config/           # Các config tĩnh (theme, hằng số)
├── features/         # (CỐT LÕI) Chứa logic và UI của từng phân hệ
│   ├── auth/         # Đăng nhập, Đăng ký, BKA ID (SCR-03)
│   ├── chatbot/      # Widget Chatbot và Mock rule-based logic (SCR-02)
│   ├── fund/         # Nộp hồ sơ, tra cứu BKA Fund (SCR-04)
│   ├── tutor/        # Đăng ký, tìm kiếm BKA Gia sư (SCR-05)
│   └── admin/        # Dashboard, Duyệt hồ sơ (SCR-06)
├── layouts/          # Layout bọc ngoài (PublicLayout, AdminLayout)
├── mock-data/        # (Chỉ dùng cho Prototype) Chứa dữ liệu bảng, user giả
├── pages/            # Chứa các trang chính ghép từ features (LandingPage, FundPage)
├── routes/           # Định nghĩa React Router (Single point of entry)
├── App.tsx
└── main.tsx
```
