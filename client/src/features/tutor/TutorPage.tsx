import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Star,
  UserCheck,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  GraduationCap,
  Filter,
  ArrowRight,
  MapPin,
  Check,
  UserPlus
} from "lucide-react";
import type { Tutor } from "../../types";
import { getStoredTutors, saveStoredTutors, HCMUT_FACULTIES } from "../../services/mockData";

export const TutorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'find' | 'register'>('find');
  const [tutors, setTutors] = useState<Tutor[]>(() => getStoredTutors());

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [sortBy, setSortBy] = useState<'rating' | 'gpa' | 'reviews'>('rating');

  // Booking Modal states
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentId, setStudentId] = useState("");
  const [bookingFormat, setBookingFormat] = useState("cs1_library");
  const [note, setNote] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Tutor Registration Form states
  const [regName, setRegName] = useState("");
  const [regStudentId, setRegStudentId] = useState("");
  const [regMajor, setRegMajor] = useState("Khoa Khoa học & Kỹ thuật Máy tính");
  const [regCohort, setRegCohort] = useState("K2022");
  const [regGpa, setRegGpa] = useState("3.75");
  const [regSubjects, setRegSubjects] = useState("Giải tích 1 & 2, Đại số tuyến tính");
  const [regPrice, setRegPrice] = useState("150.000đ / buổi");
  const [regExp, setRegExp] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  // Filtered and Sorted tutors
  const filteredTutors = tutors
    .filter((tutor) => {
      const matchesSearch =
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.major.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject =
        selectedSubject === "all" ||
        tutor.subjects.some((s) =>
          s.toLowerCase().includes(selectedSubject.toLowerCase())
        );
      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'gpa') return (b.gpa || 0) - (a.gpa || 0);
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return 0;
    });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim() || !selectedTutor) return;

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedTutor(null);
      setStudentName("");
      setStudentPhone("");
      setStudentId("");
      setNote("");
    }, 4500);
  };

  const handleRegisterTutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regStudentId.trim()) return;

    const newTutor: Tutor = {
      id: 't-' + Date.now(),
      name: regName,
      major: regMajor,
      classGroup: `${regCohort} - ${regMajor.replace('Khoa ', '')}`,
      gpa: parseFloat(regGpa) || 3.5,
      rating: 5.0,
      reviewsCount: 1,
      subjects: regSubjects.split(',').map(s => s.trim()).filter(Boolean),
      price: regPrice,
      experience: regExp || "Sinh viên xuất sắc Trường ĐH Bách Khoa - ĐHQG TP.HCM, nhiệt huyết đồng hành cùng đàn em.",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
      status: 'active'
    };

    const updated = [newTutor, ...tutors];
    setTutors(updated);
    saveStoredTutors(updated);

    setRegSuccess(true);
    setRegName("");
    setRegStudentId("");
    setRegExp("");

    setTimeout(() => {
      setRegSuccess(false);
      setActiveTab('find');
    }, 3500);
  };

  return (
    <div className="space-y-10 sm:space-y-12 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#002244] via-[#003366] to-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Cộng Đồng Học Thuật Bách Khoa • ĐHQG TP.HCM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Gia Sư Sinh Viên <br />
              <span className="text-amber-400">Bách Khoa TP.HCM 24/7</span>
            </h1>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
              Đội ngũ gia sư là các bạn sinh viên xuất sắc, thủ khoa các kỳ thi Olympic, GPA 3.5+ trực tiếp kèm cặp, luyện giải đề thi giữa kỳ và cuối kỳ các môn đại cương khó nhằn tại Cơ sở 1: 268 Lý Thường Kiệt hoặc CS2 Dĩ An.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Sinh viên Bách Khoa xác thực MyBK</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 flex items-center gap-2 text-xs">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Đánh giá trung bình 4.9 / 5.0</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>CS1: 268 Lý Thường Kiệt hoặc Online</span>
              </div>
            </div>
          </div>

          {/* Quick Search Preview Widget */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 space-y-4">
            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-white">
              <Search className="w-5 h-5 text-amber-400" />
              <span>Tra cứu nhanh Gia sư</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-blue-100 font-medium mb-1">
                  Nhập tên gia sư hoặc chuyên ngành:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hoàng Long, CNTT, Cơ khí, Điện tử..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full rounded-2xl bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 text-sm focus:bg-white focus:text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs text-blue-100 font-medium mb-1">
                  Chọn môn cần ôn tập:
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="select select-bordered w-full rounded-2xl bg-white text-slate-900 border-slate-300 text-sm focus:bg-white focus:text-slate-900"
                >
                  <option value="all">Tất cả các môn đại cương & chuyên ngành</option>
                  <option value="Giải tích">Giải tích (1, 2, 3)</option>
                  <option value="Đại số">Đại số tuyến tính</option>
                  <option value="Vật lý">Vật lý đại cương (1, 2)</option>
                  <option value="Cấu trúc dữ liệu">Cấu trúc dữ liệu & Giải thuật</option>
                  <option value="Điều khiển">Lý thuyết điều khiển tự động</option>
                  <option value="Hóa học">Hóa học đại cương</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-slate-200 gap-4 sm:gap-8 justify-center sm:justify-start">
          <button
            onClick={() => setActiveTab('find')}
            className={`pb-3 sm:pb-4 text-sm sm:text-base font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'find'
                ? 'text-[#003366]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'find' ? 'text-[#003366]' : ''}`} />
            <span>Danh sách Gia sư Tiêu biểu ({filteredTutors.length})</span>
            {activeTab === 'find' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#003366] rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('register')}
            className={`pb-3 sm:pb-4 text-sm sm:text-base font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'register'
                ? 'text-[#003366]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className={`w-5 h-5 ${activeTab === 'register' ? 'text-amber-600' : ''}`} />
            <span>Đăng ký làm Gia sư Bách Khoa</span>
            <span className="badge badge-sm bg-amber-100 text-amber-800 border-none font-bold">Dành cho SV GPA &gt; 3.2</span>
            {activeTab === 'register' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* Tab 1: Find Tutors */}
      {activeTab === 'find' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Tìm theo tên gia sư, môn học hoặc khoa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-9 rounded-2xl text-xs sm:text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Sắp xếp theo:
              </span>
              {[
                { id: 'rating', label: '⭐ Đánh giá cao nhất' },
                { id: 'gpa', label: '🎓 GPA cao nhất' },
                { id: 'reviews', label: '🔥 Nhiều buổi dạy nhất' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    sortBy === s.id
                      ? 'bg-[#003366] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tutors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Tutor Header */}
                  <div className="flex items-start gap-4">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-14 h-14 rounded-2xl object-cover bg-slate-100 shadow-sm shrink-0 border border-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-base text-slate-900 truncate">
                          {tutor.name}
                        </h4>
                        {tutor.verified && (
                          <span title="Đã xác thực MyBK" className="inline-flex items-center">
                            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{tutor.major}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="badge bg-blue-50 text-[#003366] text-[10px] font-bold border-none">
                          {tutor.classGroup}
                        </span>
                        <span className="badge bg-amber-50 text-amber-700 text-[10px] font-bold border-none">
                          GPA: {tutor.gpa}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{tutor.rating}</span>
                      <span className="text-slate-400 font-normal">({tutor.reviewsCount} đánh giá)</span>
                    </div>
                    <span className="text-slate-500 text-[11px]">CS1 Lý Thường Kiệt / Online</span>
                  </div>

                  {/* Subjects Badges */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Môn nhận kèm:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {tutor.subjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <p className="text-xs text-slate-600 italic bg-blue-50/40 p-3 rounded-2xl border border-blue-100/60 leading-relaxed">
                    "{tutor.experience}"
                  </p>
                </div>

                {/* Footer & CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Học phí:</span>
                    <span className="font-extrabold text-base text-red-700">{tutor.price}</span>
                  </div>
                  <button
                    onClick={() => setSelectedTutor(tutor)}
                    className="btn btn-sm bg-[#003366] hover:bg-blue-900 text-white rounded-xl border-none font-bold text-xs shadow-md"
                  >
                    <span>Đặt Lịch Học</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Register as Tutor */}
      {activeTab === 'register' && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="badge bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 mb-2">
                Dành cho sinh viên Bách Khoa TP.HCM
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-7 h-7 text-amber-600" />
                <span>Đăng Ký Trở Thành Gia Sư Bách Khoa</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Lan tỏa tinh thần "Bách Khoa đồng hành cùng Bách Khoa". Gia sư có cơ hội nhận thù lao xứng đáng, củng cố kiến thức chuyên môn và tích lũy điểm rèn luyện tại Cơ sở 1: 268 Lý Thường Kiệt hoặc CS2 Dĩ An.
              </p>
            </div>

            {regSuccess && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm space-y-1">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Đăng ký hồ sơ gia sư thành công!</span>
                </div>
                <p className="text-xs text-emerald-700 pl-7">
                  Hồ sơ của bạn đã được lưu vào hệ thống và hiển thị ngay trên Danh bạ Gia sư BKA.ai.
                </p>
              </div>
            )}

            <form onSubmit={handleRegisterTutor} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Họ và tên sinh viên:
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Lê Hoàng Nam"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mã số sinh viên (MSSV):
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 2210899"
                    value={regStudentId}
                    onChange={(e) => setRegStudentId(e.target.value)}
                    className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Khóa đào tạo:
                  </label>
                  <select
                    value={regCohort}
                    onChange={(e) => setRegCohort(e.target.value)}
                    className="select select-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 focus:bg-white focus:text-slate-900"
                  >
                    <option value="K2021">K2021 (Năm 4)</option>
                    <option value="K2022">K2022 (Năm 3)</option>
                    <option value="K2023">K2023 (Năm 2)</option>
                    <option value="K2024">K2024 (Năm 1)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Khoa trực thuộc (ĐHBK ĐHQG-HCM):
                  </label>
                  <select
                    value={regMajor}
                    onChange={(e) => setRegMajor(e.target.value)}
                    className="select select-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 focus:bg-white focus:text-slate-900"
                  >
                    {HCMUT_FACULTIES.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Điểm GPA tích lũy:
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="3.0"
                    max="4.0"
                    placeholder="Ví dụ: 3.75"
                    value={regGpa}
                    onChange={(e) => setRegGpa(e.target.value)}
                    className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Các môn nhận dạy (cách nhau bởi dấu phẩy):
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Giải tích 1, Giải tích 2, Đại số tuyến tính, Vật lý 1"
                  value={regSubjects}
                  onChange={(e) => setRegSubjects(e.target.value)}
                  className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mức học phí đề xuất:
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 150.000đ / buổi"
                    value={regPrice}
                    onChange={(e) => setRegPrice(e.target.value)}
                    className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Hình thức dạy:
                  </label>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Linh hoạt Online hoặc CS1 Lý Thường Kiệt / CS2 Dĩ An</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Thành tích nổi bật & kinh nghiệm giảng dạy:
                </label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Học bổng KKHT ĐHBK ĐHQG-HCM 3 kỳ liên tiếp, Giải Nhì Olympic Toán, đã có 2 năm kinh nghiệm gia sư..."
                  value={regExp}
                  onChange={(e) => setRegExp(e.target.value)}
                  className="textarea textarea-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn bg-amber-500 hover:bg-amber-600 text-slate-950 w-full rounded-2xl border-none btn-md sm:btn-lg gap-2 text-sm sm:text-base font-bold shadow-lg shadow-amber-950/20"
              >
                <span>Xác Nhận Đăng Ký Gia Sư</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {selectedTutor && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#003366]" />
                  <span>Đăng ký học cùng {selectedTutor.name}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedTutor.major} • {selectedTutor.classGroup}</p>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-base text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Gửi yêu cầu thành công!</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Gia sư <strong>{selectedTutor.name}</strong> đã nhận được thông tin và sẽ chủ động liên hệ với bạn qua Zalo/SĐT trong vòng 30 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Họ và tên của bạn:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn Nam"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Số điện thoại (Zalo):
                    </label>
                    <input
                      type="tel"
                      placeholder="Ví dụ: 0987654321"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mã số sinh viên (MSSV):
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 2213456"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Địa điểm học mong muốn:
                    </label>
                    <select
                      value={bookingFormat}
                      onChange={(e) => setBookingFormat(e.target.value)}
                      className="select select-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 focus:bg-white focus:text-slate-900"
                    >
                      <option value="cs1_library">Thư viện CS1 (268 Lý Thường Kiệt, P. Diên Hồng)</option>
                      <option value="cs2_library">Thư viện CS2 (Dĩ An, Bình Dương)</option>
                      <option value="online_meet">Google Meet / Teams (Online)</option>
                      <option value="dorm">Ký túc xá Bách Khoa (497 Hòa Hảo / KTX ĐHQG)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Môn học & Nội dung muốn kèm kỹ:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ví dụ: Em muốn ôn tập kỹ phần Tích phân suy rộng và Chuỗi số trong Giải tích 2..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="textarea textarea-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                  ></textarea>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs space-y-1.5 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mức học phí:</span>
                    <strong className="text-red-700 font-bold">{selectedTutor.price}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cam kết chất lượng:</span>
                    <span className="text-emerald-700 font-semibold">Được đổi gia sư nếu không phù hợp</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTutor(null)}
                    className="btn btn-ghost btn-md flex-1 rounded-2xl text-xs font-semibold"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="btn bg-[#003366] hover:bg-[#002244] text-white btn-md flex-1 rounded-2xl text-xs font-bold gap-1 shadow-md shadow-blue-950/20"
                  >
                    <span>Gửi Yêu Cầu Học</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
