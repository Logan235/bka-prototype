import { useState } from "react";
import {
  BookOpen,
  Search,
  Star,
  UserCheck,
  Calendar,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface Tutor {
  id: string;
  name: string;
  major: string;
  classGroup: string;
  rating: number;
  reviewsCount: number;
  subjects: string[];
  price: string;
  experience: string;
  verified: boolean;
  avatar: string;
}

const MOCK_TUTORS: Tutor[] = [
  {
    id: "1",
    name: "Đỗ Hoàng Long",
    major: "Khoa học Máy tính & AI",
    classGroup: "K65 - TT.CLC",
    rating: 4.9,
    reviewsCount: 38,
    subjects: [
      "Giải tích 1 & 2",
      "Đại số tuyến tính",
      "Cấu trúc dữ liệu & Giải thuật",
    ],
    price: "150.000đ / buổi",
    experience: "3 năm gia sư, GPA 3.8/4.0",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    name: "Nguyễn Minh Thư",
    major: "Kỹ thuật Viễn thông",
    classGroup: "K66 - ĐTVT",
    rating: 4.8,
    reviewsCount: 24,
    subjects: ["Vật lý đại cương 1 & 2", "Giải tích 1", "Mạch điện tử"],
    price: "120.000đ / buổi",
    experience: "Học bổng KKHT các kỳ, GPA 3.6",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    name: "Phạm Văn Đức",
    major: "Kỹ thuật Điều khiển & Tự động hoá",
    classGroup: "K64 - Điện",
    rating: 5.0,
    reviewsCount: 52,
    subjects: [
      "Lý thuyết điều khiển tự động",
      "Giải tích 2",
      "Đại số tuyến tính",
    ],
    price: "200.000đ / buổi",
    experience: "Thủ khoa đầu vào khoa Điện, Cử nhân xuất sắc",
    verified: true,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
];

export const TutorPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [note, setNote] = useState("");

  const filteredTutors = MOCK_TUTORS.filter((tutor) => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.major.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" ||
      tutor.subjects.some((s) =>
        s.toLowerCase().includes(selectedSubject.toLowerCase()),
      );
    return matchesSearch && matchesSubject;
  });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) return;
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedTutor(null);
      setStudentName("");
      setStudentPhone("");
      setNote("");
    }, 4000);
  };

  return (
    <div className="space-y-10 pb-16">
      <section className="bg-gradient-to-r from-blue-950 via-primary to-red-950 text-white py-12 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/25 border border-accent/40 text-accent text-xs font-bold uppercase">
              <Sparkles className="w-4 h-4" /> Kết nối tri thức Bách Khoa
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Gia Sư Sinh Viên{" "}
              <span className="text-accent">Bách Khoa 24/7</span>
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              Đội ngũ gia sư là các sinh viên xuất sắc, thủ khoa, học bổng
              trường ĐHBK Hà Nội hỗ trợ ôn thi Đại cương và chuyên ngành hiệu
              quả nhất.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span className="text-xs font-semibold">
                  100% Sinh viên BKA xác thực
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 flex items-center gap-2">
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="text-xs font-semibold">
                  Đánh giá uy tín 4.9/5.0
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Search className="w-5 h-5 text-accent" /> Tra cứu nhanh Gia sư
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Tìm theo tên gia sư hoặc chuyên ngành..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-sm input-bordered w-full rounded-xl bg-white/95 text-slate-900 placeholder:text-slate-400"
              />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="select select-sm select-bordered w-full rounded-xl bg-white/95 text-slate-900"
              >
                <option value="all">Tất cả các môn đại cương</option>
                <option value="Giải tích">Giải tích</option>
                <option value="Đại số">Đại số tuyến tính</option>
                <option value="Vật lý">Vật lý đại cương</option>
                <option value="Cấu trúc dữ liệu">
                  Cấu trúc dữ liệu & Giải thuật
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" /> Danh sách Gia sư Tiêu
            biểu ({filteredTutors.length})
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Cập nhật học kỳ 2026.1
          </span>
        </div>

        {isSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm flex items-center gap-3 shadow-sm font-medium">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <strong>Gửi yêu cầu thành công!</strong> Gia sư sẽ liên hệ với bạn
              trong vòng 30 phút qua số điện thoại đã cung cấp.
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={tutor.avatar}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-sm"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 text-base">
                        {tutor.name}
                      </h3>
                      {tutor.verified && (
                        <ShieldCheck className="w-4 h-4 text-primary fill-primary/10" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-primary">
                      {tutor.major}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {tutor.classGroup}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-y border-slate-100">
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{tutor.rating}</span>
                    <span className="text-slate-400 font-normal">
                      ({tutor.reviewsCount} đánh giá)
                    </span>
                  </div>
                  <div className="font-extrabold text-red-700 bg-red-50 px-2.5 py-1 rounded-lg">
                    {tutor.price}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Môn dạy thế mạnh:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tutor.subjects.map((sub, idx) => (
                      <span
                        key={idx}
                        className="badge badge-sm bg-slate-100 text-slate-700 border-none text-[11px] font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  ✨ {tutor.experience}
                </p>
              </div>

              <button
                onClick={() => setSelectedTutor(tutor)}
                className="btn bg-primary hover:bg-primary/90 text-white w-full rounded-xl text-xs font-bold gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" /> Đặt Lịch / Đăng Ký Học
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedTutor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" /> Đăng ký học cùng{" "}
                {selectedTutor.name}
              </h3>
            </div>

            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên sinh viên:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn Nam"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="input input-sm input-bordered w-full rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Số điện thoại liên hệ (Zalo):
                </label>
                <input
                  type="tel"
                  placeholder="Ví dụ: 0987654321"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="input input-sm input-bordered w-full rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ghi chú môn học / Yêu cầu cụ thể:
                </label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Em muốn ôn tập kỹ phần Tích phân phân thức và Phương trình vi phân..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="textarea textarea-sm textarea-bordered w-full rounded-xl"
                ></textarea>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1 text-slate-600 border border-slate-200">
                <div>
                  <strong>Học phí dự kiến:</strong>{" "}
                  <span className="text-red-700 font-bold">
                    {selectedTutor.price}
                  </span>
                </div>
                <div>
                  <strong>Hình thức:</strong> Online hoặc Trực tiếp tại Thư viện
                  Tạ Quang Bửu
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTutor(null)}
                  className="btn btn-ghost btn-sm flex-1 rounded-xl"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="btn bg-primary hover:bg-primary/90 text-white btn-sm flex-1 rounded-xl"
                >
                  Xác nhận Gửi Yêu Cầu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
