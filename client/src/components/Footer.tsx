import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral text-neutral-content py-10 border-t border-neutral/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded bg-accent flex items-center justify-center font-bold text-white">
              BKA
            </div>
            <span className="text-lg font-bold">BKA.ai - Cổng Dịch vụ Số Cộng đồng Bách Khoa</span>
          </div>
          <p className="text-sm text-neutral-content/70">
            Hướng tới kỷ niệm 70 năm thành lập Trường Đại học Bách khoa Hà Nội (1956 - 2027). Nền tảng số kết nối toàn diện cộng đồng cựu sinh viên, giảng viên và sinh viên.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Phân hệ Cốt lõi (MVP 2026)</h3>
          <ul className="space-y-2 text-sm text-neutral-content/80">
            <li><a href="/fund" className="hover:text-accent transition-colors">Quỹ Học bổng 70 Năm</a></li>
            <li><a href="/tutor" className="hover:text-accent transition-colors">Gia sư Sinh viên Bách Khoa</a></li>
            <li><a href="#chat" className="hover:text-accent transition-colors">Trợ lý AI Hỗ trợ 24/7</a></li>
            <li><a href="/admin" className="hover:text-accent transition-colors">Khu vực Quản trị Admin</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-accent mb-4">Thông tin Prototype</h3>
          <p className="text-sm text-neutral-content/70 mb-2">
            Phiên bản Interactive Prototype (UI/UX Mock Data & Rule-based Chatbot).
          </p>
          <p className="text-xs text-neutral-content/50">
            © 2026 BKA.ai Ecosystem. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
