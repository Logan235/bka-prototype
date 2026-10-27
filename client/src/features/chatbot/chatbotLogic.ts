import type { ChatMessage } from '../../types';

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: 'Xin chào! Tôi là Trợ lý AI BKA.ai. Tôi có thể hỗ trợ bạn thông tin về Quỹ Học bổng 70 năm, Gia sư Bách Khoa hoặc thủ tục hành chính. Bạn muốn tìm hiểu vấn đề gì?',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    options: [
      { label: '🌟 Quỹ học bổng 70 năm', action: 'fund_info' },
      { label: '📚 Tìm gia sư đại cương', action: 'tutor_info' },
      { label: '📝 Thủ tục xin bảng điểm', action: 'admin_info' },
    ],
  },
];

export const getBotResponse = (actionOrText: string): ChatMessage => {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  switch (actionOrText) {
    case 'fund_info':
      return {
        id: 'msg-' + Date.now(),
        sender: 'bot',
        text: 'Quỹ Học bổng 70 năm (1956 - 2027) là sáng kiến tri ân trường cũ, hỗ trợ sinh viên có hoàn cảnh khó khăn vươn lên trong học tập. Bạn có thể truy cập phân hệ "Quỹ 70 Năm" trên thanh menu để đóng góp hoặc nộp hồ sơ nhận học bổng.',
        timestamp: time,
        options: [
          { label: '💰 Đóng góp Quỹ ngay', action: 'go_fund' },
          { label: '🔙 Quay lại menu chính', action: 'reset' },
        ],
      };
    case 'tutor_info':
      return {
        id: 'msg-' + Date.now(),
        sender: 'bot',
        text: 'Phân hệ Gia sư Bách Khoa kết nối sinh viên giỏi (GPA từ 3.2 trở lên) hỗ trợ ôn thi các môn Giải tích, Đại số tuyến tính, Vật lý đại cương. Bạn có muốn tìm gia sư hoặc đăng ký làm gia sư không?',
        timestamp: time,
        options: [
          { label: '🔍 Tìm gia sư ngay', action: 'go_tutor' },
          { label: '🔙 Quay lại menu chính', action: 'reset' },
        ],
      };
    case 'admin_info':
      return {
        id: 'msg-' + Date.now(),
        sender: 'bot',
        text: 'Các thủ tục hành chính như xin bảng điểm, giấy xác nhận sinh viên hiện được số hóa 100% qua Cổng một cửa điện tử. Sinh viên vui lòng đăng nhập bằng tài khoản Student để thực hiện.',
        timestamp: time,
        options: [
          { label: '🔙 Quay lại menu chính', action: 'reset' },
        ],
      };
    case 'go_fund':
      window.location.href = '/fund';
      return {
        id: 'msg-' + Date.now(),
        sender: 'bot',
        text: 'Đang chuyển hướng bạn đến trang Quỹ Học bổng 70 năm...',
        timestamp: time,
      };
    case 'go_tutor':
      window.location.href = '/tutor';
      return {
        id: 'msg-' + Date.now(),
        sender: 'bot',
        text: 'Đang chuyển hướng bạn đến trang Gia sư Bách Khoa...',
        timestamp: time,
      };
    case 'reset':
    default:
      return {
        id: 'msg-' + Date.now(),
        sender: 'bot',
        text: 'Tôi có thể giúp gì thêm cho bạn trong hệ sinh thái BKA.ai?',
        timestamp: time,
        options: [
          { label: '🌟 Quỹ học bổng 70 năm', action: 'fund_info' },
          { label: '📚 Tìm gia sư đại cương', action: 'tutor_info' },
          { label: '📝 Thủ tục xin bảng điểm', action: 'admin_info' },
        ],
      };
  }
};
