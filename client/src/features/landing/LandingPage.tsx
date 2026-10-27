import { MOCK_SERVICES } from '../../services/mockData';
import { Award, BookOpen, Bot, Briefcase, Library, ShieldCheck, ArrowRight, CheckCircle2, Users } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-8 h-8 text-accent" />;
      case 'BookOpen': return <BookOpen className="w-8 h-8 text-primary" />;
      case 'Bot': return <Bot className="w-8 h-8 text-secondary" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8 text-accent" />;
      case 'Library': return <Library className="w-8 h-8 text-primary" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-accent" />;
      default: return <Award className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-[#002244] to-neutral text-white py-24 px-4 overflow-hidden shadow-xl">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider">
              <span>🎉 Kỷ niệm 70 năm thành lập (1956 - 2027)</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Cổng Dịch vụ Số <span className="text-accent">BKA.ai</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Nền tảng số kết nối toàn diện cộng đồng cựu sinh viên, giảng viên và sinh viên Đại học Bách khoa Hà Nội.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <a href="/fund" className="btn bg-accent hover:bg-accent/90 text-white border-none btn-lg gap-2 shadow-lg">
                Đóng góp Quỹ 70 Năm <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/tutor" className="btn bg-white/10 hover:bg-white/20 text-white border border-white/35 btn-lg">
                Tìm Gia sư Sinh viên
              </a>
            </div>
          </div>
          <div className="bg-white/15 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-accent flex items-center gap-2">
              <Users className="w-6 h-6" /> Thống kê Cộng đồng BKA.ai
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="text-3xl font-extrabold text-white">70+</div>
                <div className="text-xs text-blue-200 mt-1">Năm truyền thống</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="text-3xl font-extrabold text-accent">250K+</div>
                <div className="text-xs text-blue-200 mt-1">Cựu sinh viên</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-blue-200 pt-2 border-t border-white/10">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>MVP 2026 - Polytechnic Ecosystem</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-primary">Danh mục Dịch vụ Cộng đồng</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trải nghiệm các phân hệ cốt lõi được số hóa toàn diện phục vụ cho học tập và kết nối mạng lưới cựu sinh viên.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_SERVICES.map((service) => (
            <div key={service.id} className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
              <div className="card-body space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-base-200 shadow-inner">
                    {getServiceIcon(service.icon)}
                  </div>
                  {service.badge && (
                    <span className="badge badge-accent font-semibold text-xs py-2 px-3">
                      {service.badge}
                    </span>
                  )}
                </div>
                <h3 className="card-title text-xl font-bold text-primary">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </div>
              <div className="px-6 pb-6 pt-0">
                <a href={service.route} className="btn bg-primary hover:bg-primary-focus text-white border-none w-full gap-2">
                  Truy cập phân hệ <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
