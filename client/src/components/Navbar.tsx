import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/authContext';
import { 
  Shield, 
  UserCheck, 
  UserX, 
  MessageSquare, 
  Bell, 
  Sparkles, 
  Menu, 
  X, 
  GraduationCap, 
  HeartHandshake, 
  Home, 
  Check, 
  ChevronDown 
} from 'lucide-react';

interface NavbarProps {
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  const { currentUser, currentRole, switchRole } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navLinks = [
    { name: 'Trang chủ', path: '/', icon: Home },
    { name: 'Quỹ BKA Fund', path: '/fund', icon: HeartHandshake, badge: 'Bảo lãnh vay' },
    { name: 'Gia sư Bách Khoa', path: '/tutor', icon: GraduationCap, badge: 'Mới' },
    ...(currentRole === 'admin' ? [
      { name: 'Quản trị Admin', path: '/admin', icon: Shield, badge: 'Admin' }
    ] : []),
  ];

  const notifications = [
    { id: 1, title: 'Phát động Quỹ BKA Fund', desc: 'Bảo lãnh vay học tập 0% lãi suất & huy động đóng góp cựu sinh viên.', time: '10 phút trước', hot: true },
    { id: 2, title: 'Tuyển 50 Gia sư Bách Khoa TP.HCM', desc: 'Đăng ký hỗ trợ các em tân sinh viên môn Giải tích & Vật lý tại CS1 Lý Thường Kiệt.', time: '2 giờ trước', hot: false },
    { id: 3, title: 'Khai trương Trợ lý AI BKA.ai', desc: 'Trực tuyến 24/7 giải đáp quy chế đào tạo OISP, chính quy và thủ tục bảo lãnh vay.', time: '1 ngày trước', hot: false },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Announcement Bar - Soft pastel style */}
      <div className="bg-slate-900/90 backdrop-blur-sm text-slate-200 text-xs py-1.5 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-400/20 text-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-amber-400/30 shrink-0">
              BKA.AI
            </span>
            <span className="truncate text-[11px] sm:text-xs text-slate-300 font-medium">
              Trường Đại học Bách Khoa - ĐHQG TP.HCM • Cơ sở 1: 268 Lý Thường Kiệt, P. Diên Hồng
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400 shrink-0">
            <span className="flex items-center gap-1 hover:text-slate-200 transition-colors cursor-pointer">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Hệ thống vận hành 24/7
            </span>
            <span>•</span>
            <a href="tel:02838651670" className="hover:text-slate-200 transition-colors">Hotline: (028) 3865 1670</a>
          </div>
        </div>
      </div>

      {/* Main Header - Clean Glassmorphism Light Theme (Samsung UI Minimalist) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md text-slate-900 shadow-xs border-b border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#003366] flex items-center justify-center font-black text-lg sm:text-xl text-white shadow-md group-hover:scale-105 transition-transform">
                  BKA
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-[#003366] transition-colors">
                      BKA<span className="text-amber-600">.ai</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-200 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> MVP 2026
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-600 hidden sm:block tracking-wide font-semibold">
                    Trường ĐH Bách Khoa - ĐHQG TP.HCM (268 Lý Thường Kiệt)
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-slate-100 text-[#003366] shadow-2xs font-bold'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-[#003366]' : 'text-slate-500'}`} />
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                        active ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-800'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#003366] rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions & Auth Switcher */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Notification Bell Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="btn btn-ghost btn-sm btn-square text-slate-700 hover:bg-slate-100 hover:text-slate-900 relative rounded-xl"
                  title="Thông báo mới"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                </button>

                {showNotifications && (
                  <div 
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
                      <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <Bell className="w-4 h-4 text-[#003366]" /> Thông báo BKA
                      </span>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
                      >
                        Đóng
                      </button>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-1">
                      {notifications.map((n) => (
                        <div key={n.id} className="py-2.5 px-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                              {n.hot && <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>}
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* AI Chatbot CTA Button */}
              <button
                onClick={onOpenChat}
                className="btn btn-sm bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none gap-1.5 shadow-md hover:shadow-orange-500/30 rounded-xl text-xs font-bold transition-transform active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Trợ lý AI</span>
              </button>

              {/* Role Switcher Dropdown */}
              <div className="dropdown dropdown-end">
                <div 
                  tabIndex={0} 
                  role="button" 
                  className="btn btn-ghost btn-sm flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-6 h-6 rounded-full bg-white shadow-inner shrink-0" 
                  />
                  <div className="text-left hidden lg:block">
                    <div className="text-xs font-bold leading-tight truncate max-w-[110px]">{currentUser.name}</div>
                    <div className="text-[10px] text-amber-300 font-semibold capitalize">
                      Vai trò: {currentRole}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-200 hidden lg:block" />
                </div>
                <ul 
                  tabIndex={0} 
                  className="dropdown-content z-[100] menu p-2 shadow-2xl bg-white rounded-2xl w-64 text-slate-800 border border-slate-200 mt-2 space-y-1"
                >
                  <li className="menu-title text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                    Giả lập vai trò (Mock Auth):
                  </li>
                  <li>
                    <button 
                      className={`flex items-center justify-between rounded-xl py-2 px-3 text-xs ${
                        currentRole === 'guest' ? 'bg-[#003366] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                      onClick={() => switchRole('guest')}
                    >
                      <span className="flex items-center gap-2.5">
                        <UserX className={`w-4 h-4 ${currentRole === 'guest' ? 'text-white' : 'text-slate-400'}`} />
                        <span>Khách (Guest)</span>
                      </span>
                      {currentRole === 'guest' && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`flex items-center justify-between rounded-xl py-2 px-3 text-xs ${
                        currentRole === 'student' ? 'bg-[#003366] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                      onClick={() => switchRole('student')}
                    >
                      <span className="flex items-center gap-2.5">
                        <UserCheck className={`w-4 h-4 ${currentRole === 'student' ? 'text-white' : 'text-blue-600'}`} />
                        <span>Sinh viên (Student)</span>
                      </span>
                      {currentRole === 'student' && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`flex items-center justify-between rounded-xl py-2 px-3 text-xs ${
                        currentRole === 'admin' ? 'bg-[#003366] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                      onClick={() => switchRole('admin')}
                    >
                      <span className="flex items-center gap-2.5">
                        <Shield className={`w-4 h-4 ${currentRole === 'admin' ? 'text-white' : 'text-red-600'}`} />
                        <span>Quản trị viên (Admin)</span>
                      </span>
                      {currentRole === 'admin' && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  </li>
                  <div className="pt-2 border-t border-slate-100 px-3 text-[10px] text-slate-400 italic">
                    Chuyển sang "Admin" để mở trang Quản trị Dashboard.
                  </div>
                </ul>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn btn-ghost btn-sm btn-square text-white hover:bg-white/15 md:hidden rounded-xl"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
            {/* User Info Bar in Mobile Menu */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full bg-white shadow-xs object-cover" />
                <div>
                  <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-[11px] text-[#003366] font-semibold capitalize">Vai trò: {currentRole}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onOpenChat();
                  setMobileMenuOpen(false);
                }}
                className="btn btn-xs bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold border-none rounded-xl gap-1 shadow-xs"
              >
                <Sparkles className="w-3 h-3" />
                Trợ lý AI
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-colors ${
                      active
                        ? 'bg-[#003366] text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-[#003366]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </span>
                    {link.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        active ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Role Switcher in Mobile Drawer */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-500 px-1 uppercase tracking-wider">
                Chọn vai trò thử nghiệm:
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['guest', 'student', 'admin'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => switchRole(role)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                      currentRole === role
                        ? 'bg-[#003366] text-white border-[#003366] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

