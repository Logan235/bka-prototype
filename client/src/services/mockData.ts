import type { User, ServiceItem, Donor, LoanGuaranteeApplication, Tutor } from '../types';

export const HCMUT_FACULTIES = [
  'Khoa Khoa học & Kỹ thuật Máy tính',
  'Khoa Điện - Điện tử',
  'Khoa Cơ khí',
  'Khoa Kỹ thuật Hóa học',
  'Khoa Kỹ thuật Xây dựng',
  'Khoa Quản lý Công nghiệp',
  'Khoa Khoa học Ứng dụng',
  'Khoa Môi trường và Tài nguyên',
  'Khoa Công nghệ Vật liệu',
  'Khoa Kỹ thuật Giao thông',
  'Khoa Kỹ thuật Địa chất & Dầu khí',
];

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
    email: 'bach.nguyen221@hcmut.edu.vn',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bach',
  },
  admin: {
    id: 'u-2',
    name: 'Ban Thư Ký Quỹ BKA',
    email: 'bkafund@hcmut.edu.vn',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
};

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Quỹ BKA Fund - Bảo lãnh vay & Đóng góp',
    description: 'Chương trình Đóng góp xã hội hoá và Đăng ký bảo lãnh vay học tập ưu đãi (lãi suất 0% do Quỹ hỗ trợ) cho SV Bách Khoa ĐHQG-HCM.',
    icon: 'Award',
    badge: 'Bảo lãnh vay BKA',
    route: '/fund',
    category: 'community',
  },
  {
    id: 'srv-2',
    title: 'Gia sư Sinh viên Bách Khoa',
    description: 'Kết nối gia sư giỏi là sinh viên xuất sắc, thủ khoa hỗ trợ ôn thi các môn đại cương (Giải tích, Đại số, Vật lý) và đồ án kỹ thuật.',
    icon: 'BookOpen',
    badge: 'GPA 3.6+',
    route: '/tutor',
    category: 'academic',
  },
  {
    id: 'srv-3',
    title: 'Trợ lý AI BKA.ai (24/7)',
    description: 'Giải đáp tức thời quy chế đào tạo tín chỉ OISP/chính quy, thủ tục hành chính một cửa và chính sách bảo lãnh vay bằng AI.',
    icon: 'Bot',
    badge: 'AI Trực Tuyến',
    route: '#chat',
    category: 'core',
  },
  {
    id: 'srv-4',
    title: 'Việc làm & Ngày hội Doanh nghiệp',
    description: 'Cơ hội thực tập kỹ sư, tuyển dụng tại các tập đoàn công nghệ hàng đầu hợp tác cùng ĐHBK ĐHQG-HCM (Intel, Bosch, Renesas, FPT).',
    icon: 'Briefcase',
    badge: 'Tuyển dụng',
    route: '/career',
    category: 'career',
  },
  {
    id: 'srv-5',
    title: 'Thư viện số Bách Khoa',
    description: 'Học liệu số, giáo trình Bách Khoa chính thống, đồ án tốt nghiệp và hệ thống tài liệu IEEE, Scopus tại CS1 Lý Thường Kiệt & CS2 Dĩ An.',
    icon: 'Library',
    route: '/library',
    category: 'academic',
  },
  {
    id: 'srv-6',
    title: 'Cổng Quản trị Hệ thống (Admin)',
    description: 'Dành riêng cho Ban thư ký & Hội đồng: Thẩm định hồ sơ bảo lãnh vay BKA Fund, phê duyệt gia sư và kiểm soát minh bạch nguồn quỹ.',
    icon: 'ShieldCheck',
    badge: 'Phân quyền',
    route: '/admin',
    category: 'core',
  },
];

export const INITIAL_DONORS: Donor[] = [
  {
    id: 'd-1',
    name: 'CLB Doanh nhân Cựu sinh viên Bách Khoa (BKA Alumni)',
    classGroup: 'Doanh nghiệp Cựu SV Bách Khoa ĐHQG-HCM',
    amount: '350.000.000 VNĐ',
    amountNumber: 350000000,
    message: 'Tài trợ nguồn quỹ bảo lãnh vay và bù 100% lãi suất cho đàn em khó khăn yên tâm hoàn thành đồ án kỹ sư.',
    time: '25 phút trước',
    tier: 'kimcuong',
  },
  {
    id: 'd-2',
    name: 'Kỹ sư Nguyễn Thành Nam',
    classGroup: 'Cựu SV K1996 - Khoa KH&KT Máy tính',
    amount: '60.000.000 VNĐ',
    amountNumber: 60000000,
    message: 'Đồng hành cùng Quỹ BKA Fund tại 268 Lý Thường Kiệt, chắp cánh cho các bạn sinh viên vượt khó học giỏi.',
    time: '1 giờ trước',
    tier: 'vang',
  },
  {
    id: 'd-3',
    name: 'Tập thể Cựu SV Khoa Điện - Điện tử Khóa 2002',
    classGroup: 'Cựu SV K2002 - Điện Điện tử',
    amount: '40.000.000 VNĐ',
    amountNumber: 40000000,
    message: 'Tri ân thầy cô Trường ĐH Bách Khoa - ĐHQG TP.HCM. Mong các em vững tin học tập và sáng tạo.',
    time: '3 giờ trước',
    tier: 'vang',
  },
  {
    id: 'd-4',
    name: 'ThS. Lê Hoàng Phương',
    classGroup: 'Cán bộ Giảng viên Khoa Cơ khí (CS1 Lý Thường Kiệt)',
    amount: '15.000.000 VNĐ',
    amountNumber: 15000000,
    message: 'Góp thêm nguồn lực cùng Quỹ bảo lãnh tín dụng học phí cho sinh viên ngành kỹ thuật.',
    time: '5 giờ trước',
    tier: 'bac',
  },
  {
    id: 'd-5',
    name: 'KTS. Trần Hải Đăng',
    classGroup: 'Cựu SV K2012 - Kỹ thuật Xây dựng',
    amount: '10.000.000 VNĐ',
    amountNumber: 10000000,
    message: 'Luôn tự hào là sinh viên Bách Khoa TP.HCM. Chúc Quỹ ngày càng lan tỏa mạnh mẽ.',
    time: '8 giờ trước',
    tier: 'bac',
  },
  {
    id: 'd-6',
    name: 'Công ty Công nghệ Sài Gòn Hi-Tech',
    classGroup: 'Doanh nghiệp Đối tác ĐHQG-HCM',
    amount: '100.000.000 VNĐ',
    amountNumber: 100000000,
    message: 'Cam kết tiếp nhận kỹ sư thực tập và tài trợ nguồn quỹ bảo lãnh vay tín dụng đào tạo BKA.',
    time: 'Hôm qua',
    tier: 'kimcuong',
  },
];

export const INITIAL_SCHOLARSHIPS: LoanGuaranteeApplication[] = [
  {
    id: 'BKAL-2026-001',
    studentName: 'Trần Minh Tuấn',
    studentId: '2213456',
    cohort: 'K2022',
    faculty: 'Khoa Khoa học & Kỹ thuật Máy tính',
    school: 'Khoa Khoa học & Kỹ thuật Máy tính',
    gpa: 3.65,
    email: 'tuan.tran2213@hcmut.edu.vn',
    phone: '0903124567',
    loanAmount: '15.000.000 VNĐ',
    requestedAmount: '15.000.000 VNĐ',
    loanPurpose: 'Đóng học phí Học kỳ 1 năm học 2026-2027 và trang trải thiết bị thực hành',
    partnerBank: 'Gói tín dụng sinh viên ĐHQG-HCM (Vietcombank)',
    loanTerm: '24 tháng (Trả góp sau khi tốt nghiệp)',
    supportType: 'Bảo lãnh tín dụng + Hoàn bù lãi suất 100% từ BKA Fund',
    circumstance: 'Gia đình thuộc diện cận nghèo tại Quảng Ngãi, bố mất sớm, mẹ làm nông nuôi 3 anh em. Em cần nguồn vốn để tiếp tục học tập và làm đồ án tốt nghiệp.',
    appliedDate: '26/10/2026',
    status: 'pending',
    fileName: 'Don_de_nghi_bao_lanh_vay_TranMinhTuan.pdf',
    note: 'Đã nộp kèm giấy xác nhận hộ cận nghèo địa phương và bảng điểm MyBK đạt GPA 3.65.',
  },
  {
    id: 'BKAL-2026-002',
    studentName: 'Phạm Thị Thùy Dung',
    studentId: '2110987',
    cohort: 'K2021',
    faculty: 'Khoa Cơ khí',
    school: 'Khoa Cơ khí',
    gpa: 3.42,
    email: 'dung.pham2110@hcmut.edu.vn',
    phone: '0918765432',
    loanAmount: '20.000.000 VNĐ',
    requestedAmount: '20.000.000 VNĐ',
    loanPurpose: 'Trang trải chi phí chế tạo mẫu đồ án tốt nghiệp Kỹ sư Cơ điện tử',
    partnerBank: 'Ngân hàng Chính sách Xã hội Chi nhánh TP.HCM',
    loanTerm: '36 tháng',
    supportType: 'Bảo lãnh tín dụng + Hoàn bù lãi suất 100%',
    circumstance: 'Gia đình gặp biến cố kinh tế do ảnh hưởng bão lũ miền Trung, có giấy xác nhận khó khăn của UBND Xã.',
    appliedDate: '25/10/2026',
    status: 'approved',
    fileName: 'Xac_nhan_hoan_canh_Dung_K21.pdf',
    note: 'Hội đồng Quỹ BKA đã phê duyệt cấp Thư bảo lãnh số BKA-BL-2026-089 gửi Ngân hàng CSXH.',
  },
  {
    id: 'BKAL-2026-003',
    studentName: 'Hoàng Quốc Việt',
    studentId: '2314562',
    cohort: 'K2023',
    faculty: 'Khoa Điện - Điện tử',
    school: 'Khoa Điện - Điện tử',
    gpa: 3.15,
    email: 'viet.hoang2314@hcmut.edu.vn',
    phone: '0987332211',
    loanAmount: '12.000.000 VNĐ',
    requestedAmount: '12.000.000 VNĐ',
    loanPurpose: 'Đóng học phí năm 3 và mua linh kiện thí nghiệm vi điều khiển',
    partnerBank: 'BIDV - Chi nhánh Đông Sài Gòn',
    loanTerm: '12 tháng',
    supportType: 'Bảo lãnh tín dụng',
    circumstance: 'Em bị tai nạn giao thông phải phẫu thuật hồi đầu năm, chi phí viện phí lớn khiến gia đình tạm thời kiệt quệ tài chính.',
    appliedDate: '24/10/2026',
    status: 'need_info',
    fileName: 'Ho_so_benh_an_va_vien_phi_Viet.pdf',
    note: 'Cần bổ sung Giấy xác nhận tình trạng sinh viên từ Phòng Đào tạo (Cơ sở 1 Lý Thường Kiệt).',
  },
  {
    id: 'BKAL-2026-004',
    studentName: 'Lê Văn Khải',
    studentId: '2218899',
    cohort: 'K2022',
    faculty: 'Khoa Kỹ thuật Hóa học',
    school: 'Khoa Kỹ thuật Hóa học',
    gpa: 3.82,
    email: 'khai.le2218@hcmut.edu.vn',
    phone: '0976554433',
    loanAmount: '25.000.000 VNĐ',
    requestedAmount: '25.000.000 VNĐ',
    loanPurpose: 'Chi phí sinh hoạt và tham gia nhóm nghiên cứu vật liệu nano y sinh',
    partnerBank: 'Gói tín dụng sinh viên ĐHQG-HCM (Vietcombank)',
    loanTerm: 'Sau khi tốt nghiệp',
    supportType: 'Bảo lãnh tín dụng + Xét giảm nợ gốc theo GPA Xuất sắc',
    circumstance: 'Con thương binh hạng 2, gia đình thuần nông tại Bình Định. Đạt giải Ba Sinh viên Nghiên cứu Khoa học cấp Trường.',
    appliedDate: '23/10/2026',
    status: 'approved',
    fileName: 'Minh_chung_thuong_binh_Khai.pdf',
    note: 'Đã thông qua bảo lãnh và đưa vào diện Quỹ BKA xét tài trợ xóa 50% nợ gốc khi tốt nghiệp loại Giỏi.',
  },
];

export const INITIAL_TUTORS: Tutor[] = [
  {
    id: 't-1',
    name: 'Đỗ Hoàng Long',
    major: 'Khoa học Máy tính',
    classGroup: 'K2021 - Khoa KH&KT Máy tính',
    gpa: 3.85,
    rating: 4.9,
    reviewsCount: 38,
    subjects: ['Giải tích 1 & 2', 'Đại số tuyến tính', 'Cấu trúc dữ liệu & Giải thuật', 'Lập trình C++'],
    price: '150.000đ / buổi',
    experience: '3 năm kinh nghiệm gia sư, trợ giảng bộ môn Khoa học Máy tính tại CS1 Lý Thường Kiệt.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    status: 'active',
  },
  {
    id: 't-2',
    name: 'Nguyễn Minh Thư',
    major: 'Kỹ thuật Điện tử - Viễn thông',
    classGroup: 'K2022 - Khoa Điện Điện tử',
    gpa: 3.72,
    rating: 4.8,
    reviewsCount: 24,
    subjects: ['Vật lý đại cương 1 & 2', 'Giải tích 1', 'Mạch điện tử 1', 'Xác suất thống kê'],
    price: '130.000đ / buổi',
    experience: 'Học bổng Khuyến khích học tập ĐHBK 4 kỳ liên tiếp, nhiệt tình, kèm trực tiếp tại Thư viện CS1 hoặc Online.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    status: 'active',
  },
  {
    id: 't-3',
    name: 'Phạm Văn Đức',
    major: 'Kỹ thuật Cơ điện tử',
    classGroup: 'K2021 - Khoa Cơ khí',
    gpa: 3.91,
    rating: 5.0,
    reviewsCount: 52,
    subjects: ['Lý thuyết điều khiển tự động', 'Giải tích 2', 'Đại số tuyến tính', 'Cơ học kỹ thuật'],
    price: '180.000đ / buổi',
    experience: 'Thủ khoa đầu ra Khoa Cơ khí, giải Nhì Olympic Toán SV toàn quốc, kinh nghiệm luyện đề thi Bách Khoa.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'active',
  },
  {
    id: 't-4',
    name: 'Lê Phương Thảo',
    major: 'Kỹ thuật Hóa học',
    classGroup: 'K2022 - Khoa Kỹ thuật Hóa học',
    gpa: 3.68,
    rating: 4.7,
    reviewsCount: 19,
    subjects: ['Hóa học đại cương', 'Giải tích 1', 'Vật lý đại cương 1', 'Hóa hữu cơ'],
    price: '120.000đ / buổi',
    experience: 'Cựu học sinh chuyên Hóa Lê Hồng Phong, giàu kinh nghiệm trợ giảng môn Hóa đại cương tại ĐHBK.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    status: 'active',
  },
  {
    id: 't-5',
    name: 'Vũ Quốc Khánh',
    major: 'Kỹ thuật Xây dựng',
    classGroup: 'K2022 - Khoa Kỹ thuật Xây dựng',
    gpa: 3.88,
    rating: 4.9,
    reviewsCount: 31,
    subjects: ['Sức bền vật liệu', 'Cơ học kết cấu', 'Giải tích 2', 'Phương pháp tính'],
    price: '160.000đ / buổi',
    experience: 'Giải Nhất Olympic Cơ học Bách Khoa, phương pháp truyền đạt trực quan, dễ hiểu.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'active',
  },
];

// Helper functions with localStorage persistence
export const getStoredDonors = (): Donor[] => {
  try {
    const data = localStorage.getItem('bka_donors');
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_DONORS;
};

export const saveStoredDonors = (donors: Donor[]) => {
  try {
    localStorage.setItem('bka_donors', JSON.stringify(donors));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredScholarships = (): LoanGuaranteeApplication[] => {
  try {
    const data = localStorage.getItem('bka_scholarships');
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_SCHOLARSHIPS;
};

export const saveStoredScholarships = (list: LoanGuaranteeApplication[]) => {
  try {
    localStorage.setItem('bka_scholarships', JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
};

export const getStoredLoans = getStoredScholarships;
export const saveStoredLoans = saveStoredScholarships;

export const getStoredTutors = (): Tutor[] => {
  try {
    const data = localStorage.getItem('bka_tutors');
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return INITIAL_TUTORS;
};

export const saveStoredTutors = (tutors: Tutor[]) => {
  try {
    localStorage.setItem('bka_tutors', JSON.stringify(tutors));
  } catch (e) {
    console.error(e);
  }
};
