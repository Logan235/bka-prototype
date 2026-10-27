import type { ChatMessage } from '../../types';

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: 'Xin chào! Tôi là Trợ lý AI BKA.ai thuộc Trường Đại học Bách Khoa - ĐHQG TP.HCM. Tôi có thể hỗ trợ bạn thông tin về Quỹ BKA Fund (Đóng góp & Đăng ký bảo lãnh vay học tập 0% lãi suất), Gia sư Bách Khoa hoặc thủ tục hành chính tại 268 Lý Thường Kiệt. Bạn muốn tìm hiểu vấn đề gì?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    options: [
      { label: '🌟 Quỹ BKA Fund (Bảo lãnh vay & Đóng góp)', action: 'fund_info' },
      { label: '📚 Tìm gia sư Bách Khoa', action: 'tutor_info' },
      { label: '📝 Thủ tục một cửa sinh viên', action: 'admin_info' },
    ],
  },
];

export const getBotResponse = (actionOrText: string): ChatMessage => {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const lower = actionOrText.toLowerCase();

  if (actionOrText === 'fund_info' || lower.includes('quỹ') || lower.includes('bảo lãnh') || lower.includes('vay') || lower.includes('học bổng') || lower.includes('đóng góp')) {
    return {
      id: 'msg-' + Date.now(),
      sender: 'bot',
      text: 'Quỹ BKA Fund của Trường Đại học Bách Khoa - ĐHQG TP.HCM có 2 phân hệ trọng tâm:\n\n1. Tab Đóng góp: Dành cho Cựu sinh viên, Giảng viên và Doanh nghiệp tài trợ nguồn lực.\n2. Tab Đăng ký Bảo lãnh vay BKA: Dành cho sinh viên Bách Khoa cần vốn đóng học phí, làm đồ án tốt nghiệp với chính sách bảo lãnh không thế chấp và bù lãi suất 0% từ Quỹ.\n\nBạn có muốn chuyển sang trang Quỹ BKA Fund ngay bây giờ không?',
      timestamp: time,
      options: [
        { label: '🏦 Truy cập Quỹ BKA Fund ngay', action: 'go_fund' },
        { label: '🔙 Quay lại menu chính', action: 'reset' },
      ],
    };
  }

  if (actionOrText === 'tutor_info' || lower.includes('gia sư') || lower.includes('kèm') || lower.includes('giải tích')) {
    return {
      id: 'msg-' + Date.now(),
      sender: 'bot',
      text: 'Phân hệ Gia sư Bách Khoa kết nối sinh viên giỏi (GPA từ 3.2 trở lên, xác thực MyBK) hỗ trợ ôn thi các môn Giải tích 1 & 2, Đại số tuyến tính, Vật lý, Cấu trúc dữ liệu tại Thư viện CS1 (268 Lý Thường Kiệt), CS2 Dĩ An hoặc Online.',
      timestamp: time,
      options: [
        { label: '🔍 Tìm gia sư ngay', action: 'go_tutor' },
        { label: '🔙 Quay lại menu chính', action: 'reset' },
      ],
    };
  }

  if (actionOrText === 'admin_info' || lower.includes('thủ tục') || lower.includes('bảng điểm') || lower.includes('giấy xác nhận')) {
    return {
      id: 'msg-' + Date.now(),
      sender: 'bot',
      text: 'Các thủ tục hành chính như xin bảng điểm MyBK, giấy xác nhận sinh viên vay vốn ngân hàng hiện được số hóa 100% qua Cổng dịch vụ trực tuyến hoặc tiếp nhận tại Phòng Đào tạo / CTSV (Cơ sở 1: 268 Lý Thường Kiệt, P. Diên Hồng).',
      timestamp: time,
      options: [
        { label: '🔙 Quay lại menu chính', action: 'reset' },
      ],
    };
  }

  if (actionOrText === 'go_fund') {
    window.location.href = '/fund';
    return {
      id: 'msg-' + Date.now(),
      sender: 'bot',
      text: 'Đang chuyển hướng bạn đến trang Quỹ BKA Fund (Đóng góp & Bảo lãnh vay)...',
      timestamp: time,
    };
  }

  if (actionOrText === 'go_tutor') {
    window.location.href = '/tutor';
    return {
      id: 'msg-' + Date.now(),
      sender: 'bot',
      text: 'Đang chuyển hướng bạn đến trang Gia sư Sinh viên Bách Khoa TP.HCM...',
      timestamp: time,
    };
  }

  return {
    id: 'msg-' + Date.now(),
    sender: 'bot',
    text: 'Tôi có thể hỗ trợ gì thêm cho bạn trong hệ sinh thái BKA.ai - Trường ĐH Bách Khoa - ĐHQG TP.HCM?',
    timestamp: time,
    options: [
      { label: '🌟 Quỹ BKA Fund (Bảo lãnh vay & Đóng góp)', action: 'fund_info' },
      { label: '📚 Tìm gia sư Bách Khoa', action: 'tutor_info' },
      { label: '📝 Thủ tục một cửa sinh viên', action: 'admin_info' },
    ],
  };
};
