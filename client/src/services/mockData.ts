import type { User, ServiceItem } from '../types';

export const MOCK_USERS: Record<'guest' | 'student' | 'admin', User> = {
  guest: {
    id: 'u-0',
    name: 'Khách tham quan',
    email: 'guest@bka.ai',
    role: 'guest',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
  },
  student: {
    id: 'u-1',
    name: 'Nguyễn Văn Bách',
    email: 'bach.nv@sis.hust.edu.vn',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bach',
  },
  admin: {
    id: 'u-2',
    name: 'TS. Trần Quản Trị',
    email: 'admin.bka@hust.edu.vn',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
};

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Quỹ Học bổng 70 Năm',
    description: 'Đóng góp, tra cứu và nhận hỗ trợ từ quỹ học bổng cựu sinh viên Bách Khoa hướng tới kỷ niệm 70 năm.',
    icon: 'Award',
    badge: 'Hot 2026',
    route: '/fund',
    category: 'community',
  },
  {
    id: 'srv-2',
    title: 'Gia sư sinh viên & Học tập',
    description: 'Kết nối gia sư giỏi là sinh viên xuất sắc hỗ trợ ôn thi các môn đại cương và chuyên ngành.',
    icon: 'BookOpen',
    badge: 'Phổ biến',
    route: '/tutor',
    category: 'academic',
  },
  {
    id: 'srv-3',
    title: 'Trợ lý AI BKA.ai',
    description: 'Hỏi đáp tự động 24/7 về thủ tục hành chính, quy chế đào tạo và thông tin sự kiện nhà trường.',
    icon: 'Bot',
    badge: 'AI 24/7',
    route: '#chat',
    category: 'core',
  },
  {
    id: 'srv-4',
    title: 'Việc làm & Kết nối doanh nghiệp',
    description: 'Cơ hội thực tập, việc làm kỹ sư tại các tập đoàn công nghệ hàng đầu đối tác của trường.',
    icon: 'Briefcase',
    route: '/career',
    category: 'career',
  },
  {
    id: 'srv-5',
    title: 'Th thư viện số & Nghiên cứu',
    description: 'Kho tài liệu số, giáo trình và bài báo khoa học phục vụ nghiên cứu của giảng viên và sinh viên.',
    icon: 'Library',
    route: '/library',
    category: 'academic',
  },
  {
    id: 'srv-6',
    title: 'Quản trị hệ thống (Admin)',
    description: 'Duyệt hồ sơ quỹ, quản lý gia sư và thống kê số liệu hoạt động cộng đồng dành cho quản trị viên.',
    icon: 'ShieldCheck',
    badge: 'Admin Only',
    route: '/admin',
    category: 'core',
  },
];
