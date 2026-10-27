import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Bot, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles,
  ExternalLink,
  Landmark
} from 'lucide-react';

interface FooterProps {
  onOpenChat?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChat }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Intro */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center font-black text-lg text-white shadow-md">
                BKA
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  BKA<span className="text-amber-400">.ai</span>
                </span>
                <span className="block text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Trường ĐH Bách Khoa - ĐHQG TP.HCM
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cổng dịch vụ số kết nối toàn diện cộng đồng Trường Đại học Bách Khoa - ĐHQG TP.HCM. Tiếp sức tài chính với Quỹ BKA Fund (Bảo lãnh vay & Đóng góp), phát triển học thuật cùng Gia sư Bách Khoa và Trợ lý AI.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-amber-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Bản thử nghiệm MVP 2026
            </div>
          </div>

          {/* Col 2: Core Modules */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1.5">
              <span>Phân hệ Cốt lõi (MVP)</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/fund" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Quỹ BKA Fund (Bảo lãnh vay & Đóng góp)</span>
                </Link>
              </li>
              <li>
                <Link to="/tutor" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Gia sư Sinh viên Bách Khoa</span>
                </Link>
              </li>
              <li>
                <button 
                  onClick={onOpenChat}
                  className="hover:text-amber-400 transition-colors flex items-center gap-2 text-left"
                >
                  <Bot className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Trợ lý AI BKA.ai (24/7)</span>
                </button>
              </li>
              <li>
                <Link to="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Khu vực Quản trị Admin</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Contact Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Thông tin Liên hệ
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Cơ sở 1:</strong> 268 Lý Thường Kiệt, phường Diên Hồng.
                  <span className="block text-[11px] text-slate-400 mt-0.5">
                    <strong className="text-slate-200">Cơ sở 2:</strong> Khu đô thị ĐHQG-HCM, TP. Dĩ An, Bình Dương.
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:02838651670" className="hover:text-white transition-colors">(028) 3865 1670 / (028) 3864 7256</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:support@bka.ai" className="hover:text-white transition-colors">support@bka.ai / ctsv@hcmut.edu.vn</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Specs & Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Về Dự án BKA.ai
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Xây dựng phục vụ cộng đồng sinh viên, giảng viên và cựu sinh viên Trường Đại học Bách Khoa - ĐHQG TP.HCM.
            </p>
            <div className="flex flex-col gap-2">
              <a 
                href="https://hcmut.edu.vn" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <span>Cổng thông tin ĐHBK - ĐHQG-HCM</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
              <a 
                href="https://alumni.hcmut.edu.vn" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <span>Mạng lưới Cựu sinh viên BKA Alumni</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            © 2026 Trường Đại học Bách Khoa - ĐHQG TP.HCM — Hệ sinh thái BKA.ai MVP. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Chính sách bảo lãnh vay</span>
            <span className="hover:text-slate-400 cursor-pointer">Điều khoản dịch vụ</span>
            <span className="hover:text-slate-400 cursor-pointer">CS1: 268 Lý Thường Kiệt, P. Diên Hồng</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
