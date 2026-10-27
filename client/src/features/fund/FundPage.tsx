import { useState } from "react";
import {
  Heart,
  QrCode,
  Sparkles,
  Award,
  Users,
  HandHeart,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface Donor {
  id: string;
  name: string;
  classGroup: string;
  amount: string;
  message: string;
  time: string;
}

const MOCK_DONORS: Donor[] = [
  {
    id: "1",
    name: "Nguyễn Văn Hùng",
    classGroup: "Cựu SV K35 - CNTT",
    amount: "50.000.000 VNĐ",
    message: "Tự hào Bách Khoa! Chúc nhà trường phát triển rực rỡ.",
    time: "10 phút trước",
  },
  {
    id: "2",
    name: "Công ty Cổ phần BK Tech",
    classGroup: "Doanh nghiệp Đối tác",
    amount: "200.000.000 VNĐ",
    message: "Đồng hành cùng sự nghiệp đào tạo tài năng Bách Khoa.",
    time: "1 giờ trước",
  },
  {
    id: "3",
    name: "Trần Thị Thu Hà",
    classGroup: "Cựu SV K48 - ĐTVT",
    amount: "10.000.000 VNĐ",
    message: "Dành tặng các em sinh viên giàu nghị lực vươn lên.",
    time: "3 giờ trước",
  },
];

export const FundPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<string>("1000000");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [classGroup, setClassGroup] = useState<string>("Cựu sinh viên K46-K60");
  const [message, setMessage] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const [donors, setDonors] = useState<Donor[]>(MOCK_DONORS);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const finalAmount =
    selectedAmount === "custom" ? customAmount : selectedAmount;

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) return;
    setShowQR(true);
  };

  const handleConfirm = () => {
    const newDonor: Donor = {
      id: Date.now().toString(),
      name: donorName,
      classGroup,
      amount: parseInt(finalAmount || "0").toLocaleString("vi-VN") + " VNĐ",
      message: message || "Chúc mừng Kỷ niệm 70 năm thành lập ĐHBK Hà Nội!",
      time: "Vừa xong",
    };
    setDonors([newDonor, ...donors]);
    setShowQR(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="space-y-10 pb-16">
      <section className="bg-gradient-to-r from-red-950 via-primary to-blue-950 text-white py-12 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/25 border border-accent/40 text-accent text-xs font-bold uppercase">
              <Sparkles className="w-4 h-4" /> Kỷ niệm 70 năm Bách Khoa (1956 -
              2027)
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Quỹ Học Bổng <span className="text-accent">BKA 70 Năm</span>
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              Quỹ vinh danh tài năng và hỗ trợ sinh viên Bách Khoa có hoàn cảnh
              khó khăn vươn lên trong học tập.
            </p>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/25 space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span>
                  Đã quyên góp:{" "}
                  <strong className="text-accent text-base">48.5 tỷ VNĐ</strong>
                </span>
                <span className="text-blue-200">Mục tiêu: 70 tỷ VNĐ</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 to-accent h-full w-[69.2%] shadow-inner"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 text-center space-y-1">
              <Award className="w-6 h-6 text-accent mx-auto" />
              <div className="text-xl font-black text-white">1.200+</div>
              <div className="text-xs text-blue-200">Suất học bổng trao</div>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 text-center space-y-1">
              <Users className="w-6 h-6 text-accent mx-auto" />
              <div className="text-xl font-black text-white">50+</div>
              <div className="text-xs text-blue-200">
                Doanh nghiệp đồng hành
              </div>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 text-center space-y-1">
              <Heart className="w-6 h-6 text-accent mx-auto" />
              <div className="text-xl font-black text-white">100%</div>
              <div className="text-xs text-blue-200">Minh bạch tài chính</div>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 text-center space-y-1">
              <HandHeart className="w-6 h-6 text-accent mx-auto" />
              <div className="text-xl font-black text-white">24/7</div>
              <div className="text-xs text-blue-200">
                Cổng tiếp nhận trực tuyến
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-5">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Heart className="w-5 h-5 text-red-600 fill-red-600" /> Đóng Góp Quỹ
            Học Bổng
          </h2>

          {isSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-sm flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>
                Cảm ơn bạn! Thông tin đóng góp đã được ghi nhận thành công.
              </span>
            </div>
          )}

          <form onSubmit={handleDonate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mức đóng góp (VNĐ):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "500000", label: "500.000đ" },
                  { value: "1000000", label: "1.000.000đ" },
                  { value: "5000000", label: "5.000.000đ" },
                  { value: "10000000", label: "10.000.000đ" },
                  { value: "50000000", label: "50.000.000đ" },
                  { value: "custom", label: "Khác" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setSelectedAmount(item.value)}
                    className={
                      "btn btn-sm text-xs font-semibold rounded-xl border " +
                      (selectedAmount === item.value
                        ? "bg-red-700 text-white border-red-700 shadow-sm"
                        : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200")
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {selectedAmount === "custom" && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Nhập số tiền khác (VNĐ):
                </label>
                <input
                  type="number"
                  placeholder="Ví dụ: 2000000"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="input input-sm input-bordered w-full rounded-xl"
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Họ và tên nhà tài trợ:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="input input-sm input-bordered w-full rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Vai trò / Khóa:
                </label>
                <select
                  value={classGroup}
                  onChange={(e) => setClassGroup(e.target.value)}
                  className="select select-sm select-bordered w-full rounded-xl"
                >
                  <option value="Cựu sinh viên K30-K45">
                    Cựu sinh viên (K30 - K45)
                  </option>
                  <option value="Cựu sinh viên K46-K60">
                    Cựu sinh viên (K46 - K60)
                  </option>
                  <option value="Cựu sinh viên K61-K68">
                    Cựu sinh viên (K61 - K68)
                  </option>
                  <option value="Giảng viên / Cán bộ">
                    Giảng viên / Cán bộ
                  </option>
                  <option value="Doanh nghiệp / Đối tác">
                    Doanh nghiệp / Đối tác
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Lời chúc Kỷ niệm 70 năm:
              </label>
              <textarea
                rows={2}
                placeholder="Gửi lời chúc đến nhà trường..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="textarea textarea-sm textarea-bordered w-full rounded-xl"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={!donorName.trim()}
              className="btn bg-red-700 hover:bg-red-800 text-white w-full rounded-xl border-none gap-2"
            >
              <QrCode className="w-4 h-4" /> Tạo Mã QR Đóng Góp Ngay
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
            <span>🏆 Bảng Vinh Danh</span>
            <span className="badge badge-accent text-xs font-bold">
              Mới nhất
            </span>
          </h3>
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {donors.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-sm text-slate-900">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.classGroup} • {item.time}
                    </div>
                  </div>
                  <span className="badge bg-red-100 text-red-700 border-red-200 font-extrabold text-xs">
                    {item.amount}
                  </span>
                </div>
                <p className="text-xs text-slate-600 italic bg-white p-2 rounded-xl border border-slate-200">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showQR && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 text-center shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">
              Mã VietQR Mô Phỏng
            </h3>
            <div className="bg-slate-100 p-5 rounded-2xl inline-block border border-slate-200">
              <QrCode className="w-32 h-32 text-red-700 mx-auto" />
              <div className="text-[10px] font-bold text-slate-500 mt-1">
                BKA.AI FUND - 2026
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl text-left text-xs space-y-1 border border-blue-100">
              <div>
                <strong>Số tiền:</strong>{" "}
                <span className="text-red-700 font-bold">
                  {parseInt(finalAmount || "0").toLocaleString("vi-VN")} VNĐ
                </span>
              </div>
              <div>
                <strong>Nhà tài trợ:</strong> {donorName}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowQR(false)}
                className="btn btn-ghost btn-sm flex-1 rounded-xl"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                className="btn bg-red-700 text-white btn-sm flex-1 rounded-xl gap-1"
              >
                Xác nhận chuyển khoản <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
