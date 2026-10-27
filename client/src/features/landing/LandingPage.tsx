import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_SERVICES } from '../../services/mockData';
import { 
  BookOpen, 
  Bot, 
  Briefcase, 
  Library, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  TrendingUp, 
  GraduationCap, 
  Compass,
  Star,
  Landmark,
  MapPin
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Landmark className="w-6 h-6 text-amber-500" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-blue-600" />;
      case 'Bot': return <Bot className="w-6 h-6 text-emerald-600" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-orange-500" />;
      case 'Library': return <Library className="w-6 h-6 text-purple-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-rose-600" />;
      default: return <Compass className="w-6 h-6 text-blue-600" />;
    }
  };

  const filteredServices = selectedCategory === 'all' 
    ? MOCK_SERVICES 
    : MOCK_SERVICES.filter(s => s.category === selectedCategory);

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('open-bka-chat'));
  };

  const pillars = [
    {
      year: 'Truyền Thống Tự Hào',
      title: 'Đầu Tàu Kỹ Thuật Phía Nam',
      desc: 'Cái nôi đào tạo kỹ sư hàng đầu cả nước, cung ứng nguồn nhân lực kỹ thuật chất lượng cao cho vùng kinh tế trọng điểm phía Nam.',
      icon: GraduationCap,
      color: 'from-blue-600 to-indigo-700'
    },
    {
      year: 'Đổi Mới Sáng Tạo',
      title: 'Đại Học Nghiên Cứu ĐHQG-HCM',
      desc: 'Dẫn đầu về các công bố khoa học quốc tế, kiểm định chất lượng ABET, AUN-QA và hệ sinh thái đổi mới sáng tạo.',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600'
    },
    {
      year: 'Quỹ BKA Fund',
      title: 'Bảo Lãnh Vay & Đồng Hành',
      desc: 'Bảo lãnh tín dụng học tập, hỗ trợ bù 100% lãi suất và xét tài trợ nợ gốc cho sinh viên vượt khó học giỏi.',
      icon: Landmark,
      color: 'from-red-600 to-rose-700'
    },
    {
      year: 'Kỷ Nguyên Số',
      title: 'Hệ Sinh Thái BKA.ai',
      desc: 'Nền tảng dịch vụ số thông minh, tích hợp trợ lý AI 24/7 hỗ trợ toàn diện người học và cán bộ quản trị.',
      icon: Bot,
      color: 'from-emerald-600 to-teal-700'
    }
  ];

  const testimonials = [
    {
      quote: "Bách Khoa đã trao cho tôi tư duy kỹ thuật sắc bén. Tham gia đóng góp Quỹ BKA Fund là lời tri ân thiết thực nhất để tiếp sức cho các bạn sinh viên vượt qua khó khăn học phí.",
      author: "Kỹ sư Nguyễn Thành Nam",
      role: "Cựu SV K1996 - Khoa KH&KT Máy tính",
      rating: 5
    },
    {
      quote: "Chính sách Bảo lãnh vay BKA Fund với lãi suất 0% giúp em hoàn toàn yên tâm theo đuổi đồ án tốt nghiệp Kỹ sư Cơ điện tử mà không còn áp lực tài chính đè nặng lên gia đình.",
      author: "Phạm Thị Thùy Dung",
      role: "Sinh viên K2021 - Khoa Cơ khí (CS1 Lý Thường Kiệt)",
      rating: 5
    },
    {
      quote: "Hệ thống BKA.ai mang lại trải nghiệm số liền mạch cho nhà trường, giúp thẩm định hồ sơ bảo lãnh vay và kết nối gia sư nhanh chóng, minh bạch.",
      author: "TS. Trần Quản Trị",
      role: "Cán bộ Quản lý Đào tạo ĐHBK ĐHQG-HCM",
      rating: 5
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#002244] via-[#003366] to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 shadow-2xl">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Trường Đại học Bách Khoa - ĐHQG TP.HCM • Cơ sở 1: 268 Lý Thường Kiệt, P. Diên Hồng</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Cổng Dịch Vụ Số <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                BKA.ai Bách Khoa
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-blue-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Nền tảng hợp nhất kết nối toàn diện cộng đồng cựu sinh viên, giảng viên và sinh viên Trường Đại học Bách Khoa - ĐHQG TP.HCM. Đồng hành tiếp sức tài chính với Quỹ BKA Fund và phát triển năng lực học thuật.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link 
                to="/fund" 
                className="btn bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none btn-md sm:btn-lg rounded-2xl gap-2 shadow-lg shadow-orange-950/30 font-bold transition-transform active:scale-95"
              >
                <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Khám phá Quỹ BKA Fund</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              
              <Link 
                to="/tutor" 
                className="btn bg-white/10 hover:bg-white/20 text-white border border-white/25 btn-md sm:btn-lg rounded-2xl gap-2 font-semibold backdrop-blur-sm transition-colors"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                <span>Gia sư Sinh viên</span>
              </Link>

              <button 
                onClick={handleOpenChat}
                className="btn btn-ghost text-blue-200 hover:text-white hover:bg-white/10 btn-md sm:btn-lg rounded-2xl gap-2 font-medium"
              >
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                <span>Hỏi Trợ lý AI</span>
              </button>
            </div>

            {/* Quick Badges below CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-blue-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bảo lãnh vay không thế chấp</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Hỗ trợ 100% lãi suất</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Minh bạch tài chính</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Metrics Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Cộng Đồng BKA 2026</h3>
                    <p className="text-[11px] text-blue-200">Đại học Bách Khoa ĐHQG-HCM</p>
                  </div>
                </div>
                <span className="badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  LIVE
                </span>
              </div>

              {/* 4 Stats Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">52.8 Tỷ</div>
                  <div className="text-xs text-blue-100 font-semibold">Quy mô Quỹ BKA</div>
                  <div className="text-[10px] text-blue-200/80">Mục tiêu 70 Tỷ VNĐ</div>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-white">1.450+</div>
                  <div className="text-xs text-blue-100 font-semibold">Sinh viên bảo lãnh</div>
                  <div className="text-[10px] text-blue-200/80">Lãi suất 0%</div>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">11 Khoa</div>
                  <div className="text-xs text-blue-100 font-semibold">ĐHBK ĐHQG-HCM</div>
                  <div className="text-[10px] text-blue-200/80">Tiếp nhận hồ sơ</div>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-white">85+</div>
                  <div className="text-xs text-blue-100 font-semibold">Doanh nghiệp Cựu SV</div>
                  <div className="text-[10px] text-blue-200/80">Tài trợ nguồn quỹ</div>
                </div>
              </div>

              {/* Mini Notice / Progress */}
              <div className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs text-blue-100 leading-snug">
                  Tiếp nhận hồ sơ bảo lãnh vay trực tiếp tại <strong>268 Lý Thường Kiệt, P. Diên Hồng</strong> và trực tuyến 24/7.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section with Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#003366] text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Phân Hệ Chức Năng</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Danh Mục Dịch Vụ Số BKA.ai
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Trải nghiệm các phân hệ cốt lõi được tối ưu hóa toàn diện phục vụ cho học tập, đời sống và kết nối mạng lưới cựu sinh viên Trường ĐH Bách Khoa - ĐHQG TP.HCM.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'Tất cả dịch vụ' },
            { id: 'community', label: '🌟 Quỹ BKA Fund & Bảo lãnh vay' },
            { id: 'academic', label: '📚 Gia sư & Thư viện số' },
            { id: 'career', label: '💼 Việc làm & Doanh nghiệp' },
            { id: 'core', label: '🛡️ Trợ lý AI & Quản trị' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#003366] text-white shadow-md shadow-blue-950/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            return (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getServiceIcon(service.icon)}
                    </div>
                    {service.badge && (
                      <span className="badge bg-amber-100 text-amber-800 border-none font-bold text-xs py-2 px-3">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#003366] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  {service.route === '#chat' ? (
                    <button 
                      onClick={handleOpenChat}
                      className="btn bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border-emerald-200 hover:border-none w-full rounded-2xl gap-2 font-bold text-xs sm:text-sm transition-all"
                    >
                      <span>Trò chuyện cùng AI</span>
                      <Bot className="w-4 h-4 text-emerald-500 group-hover:text-white" />
                    </button>
                  ) : (
                    <Link 
                      to={service.route} 
                      className="btn bg-slate-100 hover:bg-[#003366] text-slate-800 hover:text-white border-slate-200 hover:border-none w-full rounded-2xl gap-2 font-bold text-xs sm:text-sm transition-all"
                    >
                      <span>Truy cập phân hệ</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="bg-white py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="badge bg-blue-100 text-[#003366] text-xs font-bold uppercase tracking-wider px-3 py-1">
              Trường ĐH Bách Khoa - ĐHQG TP.HCM
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              4 Trụ Cột Tự Hào Bách Khoa
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Kiến tạo tương lai kỹ thuật cùng cộng đồng cựu sinh viên và sinh viên ĐHBK ĐHQG-HCM.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all space-y-4"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                      {pillar.year}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials / Community Voices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="badge bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1">
            Kết nối thế hệ
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tiếng Nói Từ Cộng Đồng Bách Khoa TP.HCM
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Cảm nhận và chia sẻ từ cựu sinh viên, giảng viên và sinh viên đang theo học tại 268 Lý Thường Kiệt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#003366] to-blue-700 flex items-center justify-center font-bold text-white text-xs shadow-inner">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900">{t.author}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-950 via-[#003366] to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-5 text-center sm:text-left">
            <span className="badge bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider px-3 py-1">
              Hành động ngay hôm nay
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              Cùng Trường ĐH Bách Khoa - ĐHQG TP.HCM tiếp sức các thế hệ kỹ sư tương lai!
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Dù bạn là cựu sinh viên thành đạt, doanh nghiệp đối tác hay bạn sinh viên trẻ đầy khát vọng — BKA.ai luôn sẵn sàng kết nối và đồng hành cùng bạn.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <Link 
                to="/fund"
                className="btn bg-amber-500 hover:bg-amber-600 text-slate-950 border-none rounded-2xl font-bold btn-md gap-2 shadow-lg"
              >
                <Landmark className="w-4 h-4" />
                <span>Khám phá Quỹ BKA Fund</span>
              </Link>
              <Link 
                to="/tutor"
                className="btn bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-2xl font-bold btn-md gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Khám phá Đội ngũ Gia sư</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
