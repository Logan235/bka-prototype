{/* Top Announcement Bar */}
<div className="bg-gradient-to-r from-red-900 via-red-800 to-blue-900 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner">
  <span className="badge badge-error badge-sm animate-pulse text-[10px] font-bold">HOT 2026</span>
  <span>Chào mừng kỷ niệm 70 năm thành lập Đại học Bách khoa Hà Nội (1956 - 2027) — Khát vọng vươn tầm quốc tế!</span>
</div>

import React from 'react';
import { useAuth } from '../features/auth/authContext';
import { Shield, UserCheck, UserX, MessageSquare, Bell, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  const { currentUser, currentRole, switchRole } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-primary/95 backdrop-blur-md text-primary-content shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-accent to-amber-500 flex items-center justify-center font-extrabold text-xl text-white shadow-md">
            BKA
          </div>
          <div>
            <a href="/" className="text-xl font-extrabold tracking-tight hover:opacity-90 flex items-center gap-1.5">
              BKA.ai 
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent font-bold border border-accent/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> MVP 2026
              </span>
            </a>
            <p className="text-[11px] text-blue-200 hidden sm:block tracking-wide">Cổng Dịch vụ Số Cộng đồng Bách Khoa (1956 - 2027)</p>
            {/* Mega Menu / Quick Navigation Sub-bar */}
            <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 bg-base-200/60 border-t border-base-300/50 text-xs font-medium text-base-content/80 overflow-x-auto">
              <span className="text-red-700 font-bold flex items-center gap-1 cursor-pointer hover:underline">
                <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" /> Phân hệ 70 năm
              </span>
              <span className="cursor-pointer hover:text-red-600 transition-colors">Đào tạo & Khảo thí</span>
              <span className="cursor-pointer hover:text-red-600 transition-colors">Nghiên cứu khoa học</span>
              <span className="cursor-pointer hover:text-red-600 transition-colors">Cổng cựu sinh viên</span>
              <span className="cursor-pointer hover:text-red-600 transition-colors">Đời sống sinh viên</span>
              <span className="cursor-pointer hover:text-red-600 transition-colors">Thư viện số</span>
              <span className="cursor-pointer hover:text-red-600 transition-colors">Hành chính một cửa</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
          <a href="/" className="hover:text-accent transition-colors py-2 border-b-2 border-transparent hover:border-accent">Trang chủ</a>
          <a href="/fund" className="hover:text-accent transition-colors py-2 border-b-2 border-transparent hover:border-accent">Quỹ 70 Năm</a>
          <a href="/tutor" className="hover:text-accent transition-colors py-2 border-b-2 border-transparent hover:border-accent">Gia sư Bách Khoa</a>
          {currentRole === 'admin' && (
            <a href="/admin" className="hover:text-accent transition-colors text-accent font-semibold flex items-center gap-1.5 py-2">
              <Shield className="w-4 h-4" /> Quản trị Admin
            </a>
          )}
        </nav>

        {/* Right Actions & Mock Auth switcher */}
        <div className="flex items-center space-x-3">
          {/* Notification Bell */}
          <button className="btn btn-ghost btn-sm btn-square text-white hover:bg-white/10 relative hidden sm:flex" title="Thông báo hệ thống">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          </button>

          <button
            onClick={onOpenChat}
            className="btn btn-sm bg-accent hover:bg-accent/90 text-white border-none gap-2 shadow-md hover:scale-105 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Trợ lý AI</span>
          </button>

          {/* Role Switcher Dropdown (Mock Auth) */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 px-3 py-1.5 rounded-xl">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-6 h-6 rounded-full bg-white shadow-inner" />
              <div className="text-left hidden lg:block">
                <div className="text-xs font-bold leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-blue-200 capitalize">Vai trò: {currentRole}</div>
              </div>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-56 text-neutral border border-base-300 mt-2">
              <li className="menu-title text-[11px] font-bold text-gray-400 px-3 py-1 tracking-wider">MOCK AUTH (CHUYỂN VAI TRÒ):</li>
              <li>
                <button 
                  className={`flex items-center justify-between rounded-xl py-2.5 ${currentRole === 'guest' ? 'active font-bold bg-base-200 text-primary' : ''}`}
                  onClick={() => switchRole('guest')}
                >
                  <span className="flex items-center gap-2.5"><UserX className="w-4 h-4 text-gray-400" /> Guest (Khách)</span>
                  {currentRole === 'guest' && <span className="badge badge-sm badge-accent">Active</span>}
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center justify-between rounded-xl py-2.5 ${currentRole === 'student' ? 'active font-bold bg-base-200 text-primary' : ''}`}
                  onClick={() => switchRole('student')}
                >
                  <span className="flex items-center gap-2.5"><UserCheck className="w-4 h-4 text-primary" /> Student (Sinh viên)</span>
                  {currentRole === 'student' && <span className="badge badge-sm badge-accent">Active</span>}
                </button>
              </li>
              <li>
                <button 
                  className={`flex items-center justify-between rounded-xl py-2.5 ${currentRole === 'admin' ? 'active font-bold bg-base-200 text-primary' : ''}`}
                  onClick={() => switchRole('admin')}
                >
                  <span className="flex items-center gap-2.5"><Shield className="w-4 h-4 text-accent" /> Admin (Quản trị)</span>
                  {currentRole === 'admin' && <span className="badge badge-sm badge-accent">Active</span>}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

