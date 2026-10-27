export type UserRole = 'guest' | 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  route: string;
  category: 'core' | 'community' | 'academic' | 'career';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
}

export interface Donor {
  id: string;
  name: string;
  classGroup: string;
  amount: string;
  amountNumber: number;
  message: string;
  time: string;
  tier?: 'kimcuong' | 'vang' | 'bac' | 'dong';
}

export interface LoanGuaranteeApplication {
  id: string;
  studentName: string;
  studentId: string; // MSSV (ví dụ: 2213456)
  cohort: string; // K2021, K2022, K2023, K2024, K2025
  faculty: string; // Khoa trực thuộc ĐHBK ĐHQG-HCM
  school?: string; // Tương thích ngược
  gpa: number;
  email?: string;
  phone?: string;
  loanAmount: string; // Số tiền đề xuất vay bảo lãnh (15.000.000 VNĐ)
  requestedAmount: string; // Tương thích ngược
  loanPurpose: string; // Đóng học phí, sinh hoạt phí, máy tính đồ án...
  partnerBank: string; // Ngân hàng CSXH, Vietcombank ĐHQG-HCM, BIDV...
  loanTerm: string; // 12 tháng, 24 tháng, 36 tháng, Sau khi tốt nghiệp
  supportType?: string; // Bảo lãnh tín dụng + Hoàn bù lãi suất 100%
  circumstance: string; // Hoàn cảnh khó khăn & kế hoạch học tập
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'need_info';
  note?: string;
  fileName?: string;
}

// Backward compatibility alias
export type ScholarshipApplication = LoanGuaranteeApplication;

export interface Tutor {
  id: string;
  name: string;
  major: string;
  classGroup: string;
  gpa: number;
  rating: number;
  reviewsCount: number;
  subjects: string[];
  price: string;
  experience: string;
  verified: boolean;
  avatar: string;
  status?: 'active' | 'pending';
}

export interface TutorBooking {
  id: string;
  tutorId: string;
  tutorName: string;
  studentName: string;
  studentPhone: string;
  studentId?: string;
  subject: string;
  note: string;
  createdTime: string;
  status: 'pending' | 'confirmed';
}
