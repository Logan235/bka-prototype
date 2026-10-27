import React, { useState } from "react";
import {
  Heart,
  QrCode,
  Sparkles,
  Award,
  CheckCircle2,
  Search,
  UploadCloud,
  ShieldCheck,
  Building2,
  Copy,
  Check,
  Landmark,
  Percent,
  FileCheck,
  Info
} from "lucide-react";
import type { Donor, LoanGuaranteeApplication } from "../../types";
import { 
  getStoredDonors, 
  saveStoredDonors, 
  getStoredScholarships, 
  saveStoredScholarships,
  HCMUT_FACULTIES 
} from "../../services/mockData";

export const FundPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donate' | 'loan_guarantee'>('donate');
  
  // ================= Donation Form States =================
  const [selectedAmount, setSelectedAmount] = useState<string>("1000000");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donationTarget, setDonationTarget] = useState<string>("loan_guarantee");
  const [donorName, setDonorName] = useState<string>("");
  const [classGroup, setClassGroup] = useState<string>("Cựu sinh viên K2000 - K2015");
  const [message, setMessage] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);
  const [donors, setDonors] = useState<Donor[]>(() => getStoredDonors());
  const [searchDonor, setSearchDonor] = useState<string>("");
  const [donorFilter, setDonorFilter] = useState<string>("all");
  const [copiedBank, setCopiedBank] = useState<boolean>(false);
  const [donateSuccess, setDonateSuccess] = useState<boolean>(false);

  // ================= Loan Guarantee Form States =================
  const [studentName, setStudentName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [cohort, setCohort] = useState<string>("K2023");
  const [faculty, setFaculty] = useState<string>(HCMUT_FACULTIES[0]);
  const [gpa, setGpa] = useState<string>("3.45");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loanAmount, setLoanAmount] = useState<string>("15.000.000 VNĐ");
  const [customLoanAmount, setCustomLoanAmount] = useState<string>("");
  const [loanPurpose, setLoanPurpose] = useState<string>("Đóng học phí kỳ tới");
  const [partnerBank, setPartnerBank] = useState<string>("Gói tín dụng sinh viên ĐHQG-HCM (Vietcombank)");
  const [loanTerm, setLoanTerm] = useState<string>("24 tháng (Bắt đầu trả sau khi tốt nghiệp)");
  const [circumstanceType, setCircumstanceType] = useState<string>("Hộ cận nghèo / Gia đình khó khăn");
  const [circumstance, setCircumstance] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [applySuccess, setApplySuccess] = useState<boolean>(false);
  const [createdReceiptCode, setCreatedReceiptCode] = useState<string>("");

  const finalDonationAmount = selectedAmount === "custom" ? customAmount : selectedAmount;
  const finalLoanAmountStr = loanAmount === "custom" ? `${parseInt(customLoanAmount || "0", 10).toLocaleString('vi-VN')} VNĐ` : loanAmount;

  // Donation Submission
  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() && !isAnonymous) return;
    setShowQR(true);
  };

  const handleConfirmTransfer = () => {
    const amtNum = parseInt(finalDonationAmount || "0", 10);
    const displayName = isAnonymous ? "Nhà hảo tâm Bách Khoa ẩn danh" : donorName;
    
    let tier: 'kimcuong' | 'vang' | 'bac' | 'dong' = 'dong';
    if (amtNum >= 100000000) tier = 'kimcuong';
    else if (amtNum >= 30000000) tier = 'vang';
    else if (amtNum >= 10000000) tier = 'bac';

    const newDonor: Donor = {
      id: 'd-' + Date.now(),
      name: displayName,
      classGroup: isAnonymous ? 'Người Bách Khoa' : classGroup,
      amount: amtNum.toLocaleString("vi-VN") + " VNĐ",
      amountNumber: amtNum,
      message: message || "Đồng hành cùng Quỹ BKA Fund - Trường ĐH Bách Khoa ĐHQG-HCM tiếp sức sinh viên.",
      time: "Vừa xong",
      tier
    };

    const updated = [newDonor, ...donors];
    setDonors(updated);
    saveStoredDonors(updated);
    setShowQR(false);
    setDonateSuccess(true);
    setDonorName("");
    setMessage("");
    setTimeout(() => setDonateSuccess(false), 6000);
  };

  const handleCopySTK = () => {
    navigator.clipboard.writeText("0281957268");
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  // Fake file upload handler
  const handleFakeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setUploadProgress(20);
      const timer = setInterval(() => {
        setUploadProgress((p) => {
          if (p >= 100) {
            clearInterval(timer);
            return 100;
          }
          return p + 25;
        });
      }, 120);
    }
  };

  // Loan Guarantee Submission
  const handleApplyLoanGuarantee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentId.trim() || !circumstance.trim() || !agreeTerms) return;

    const receiptId = `BKAL-2026-${Math.floor(100 + Math.random() * 900)}`;
    setCreatedReceiptCode(receiptId);

    const newApp: LoanGuaranteeApplication = {
      id: receiptId,
      studentName,
      studentId,
      cohort,
      faculty,
      school: faculty,
      gpa: parseFloat(gpa) || 3.0,
      email: email || `${studentId}@hcmut.edu.vn`,
      phone: phone || 'Chưa cung cấp',
      loanAmount: finalLoanAmountStr,
      requestedAmount: finalLoanAmountStr,
      loanPurpose,
      partnerBank,
      loanTerm,
      supportType: 'Bảo lãnh tín dụng + Hoàn bù lãi suất 100% từ Quỹ BKA',
      circumstance: `[${circumstanceType}] ${circumstance}`,
      appliedDate: new Date().toLocaleDateString('vi-VN'),
      status: 'pending',
      fileName: uploadedFileName || 'Ho_so_de_nghi_bao_lanh_vay.pdf',
      note: 'Hồ sơ sinh viên nộp qua cổng trực tuyến BKA.ai (CS1 268 Lý Thường Kiệt)',
    };

    const currentScholarships = getStoredScholarships();
    const updatedList = [newApp, ...currentScholarships];
    saveStoredScholarships(updatedList);

    setApplySuccess(true);
    setStudentName("");
    setStudentId("");
    setEmail("");
    setPhone("");
    setCircumstance("");
    setUploadedFileName("");
    setUploadProgress(0);
    setAgreeTerms(false);
  };

  const filteredDonors = donors.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchDonor.toLowerCase()) ||
      item.classGroup.toLowerCase().includes(searchDonor.toLowerCase());

    if (donorFilter === 'all') return matchesSearch;
    if (donorFilter === 'enterprise') return matchesSearch && item.classGroup.includes('Doanh nghiệp');
    if (donorFilter === 'alumni') return matchesSearch && (item.classGroup.includes('Cựu') || item.classGroup.includes('K'));
    if (donorFilter === 'faculty') return matchesSearch && (item.classGroup.includes('Cán bộ') || item.classGroup.includes('Giảng viên'));
    return matchesSearch;
  });

  return (
    <div className="space-y-10 sm:space-y-12 pb-20">
      {/* Campaign Banner Section */}
      <section className="bg-gradient-to-r from-[#002244] via-[#003366] to-[#0f172a] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Trường Đại học Bách Khoa - ĐHQG TP.HCM • Cơ sở 1: 268 Lý Thường Kiệt, P. Diên Hồng</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Quỹ <span className="text-amber-400">BKA Fund</span>: Đóng Góp & Bảo Lãnh Vay
            </h1>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
              Chương trình bảo trợ tài chính bền vững của Trường ĐH Bách Khoa - ĐHQG TP.HCM. Huy động nguồn lực xã hội hóa để <strong>bảo lãnh tín dụng học tập</strong>, hỗ trợ <strong>lãi suất 0%</strong> và đồng hành cùng sinh viên vượt khó vươn lên thành tài.
            </p>

            {/* Target Progress Bar */}
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 space-y-3">
              <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm font-semibold gap-2">
                <div>
                  <span>Quy mô Quỹ huy động: </span>
                  <strong className="text-amber-400 text-base sm:text-lg">52.800.000.000 VNĐ</strong>
                </div>
                <div className="text-blue-200">
                  Mục tiêu Quỹ: <strong className="text-white">70 Tỷ VNĐ (75.4%)</strong>
                </div>
              </div>
              <div className="w-full bg-black/40 rounded-full h-3.5 p-0.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-inner"
                  style={{ width: '75.4%' }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-blue-200">
                <span>Khởi động niên khóa: 2026</span>
                <span>Đã bảo lãnh cho hơn 1.450 sinh viên</span>
                <span>Mục tiêu: Đạt 70 Tỷ VNĐ</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-center space-y-1.5">
              <Landmark className="w-7 h-7 text-amber-400 mx-auto" />
              <div className="text-2xl sm:text-3xl font-black text-white">1.450+</div>
              <div className="text-xs text-blue-200 font-medium">Sinh viên được bảo lãnh vay</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-center space-y-1.5">
              <Percent className="w-7 h-7 text-emerald-400 mx-auto" />
              <div className="text-2xl sm:text-3xl font-black text-white">0% Lãi</div>
              <div className="text-xs text-blue-200 font-medium">BKA Fund hỗ trợ bù 100% lãi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-center space-y-1.5">
              <Building2 className="w-7 h-7 text-amber-400 mx-auto" />
              <div className="text-2xl sm:text-3xl font-black text-white">85+</div>
              <div className="text-xs text-blue-200 font-medium">Doanh nghiệp & Cựu SV tài trợ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 text-center space-y-1.5">
              <ShieldCheck className="w-7 h-7 text-sky-400 mx-auto" />
              <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
              <div className="text-xs text-blue-200 font-medium">Minh bạch & Trực tuyến</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Controller */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-slate-200 gap-4 sm:gap-8 justify-center sm:justify-start">
          <button
            onClick={() => setActiveTab('donate')}
            className={`pb-3 sm:pb-4 text-sm sm:text-base font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'donate'
                ? 'text-[#003366]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Heart className={`w-5 h-5 ${activeTab === 'donate' ? 'text-red-600 fill-red-600' : ''}`} />
            <span>Đóng góp Quỹ BKA Fund</span>
            {activeTab === 'donate' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('loan_guarantee')}
            className={`pb-3 sm:pb-4 text-sm sm:text-base font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'loan_guarantee'
                ? 'text-[#003366]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Landmark className={`w-5 h-5 ${activeTab === 'loan_guarantee' ? 'text-[#003366]' : ''}`} />
            <span>Đăng ký bảo lãnh vay BKA</span>
            <span className="badge badge-sm bg-blue-100 text-[#003366] border-none font-bold">Dành cho SV Bách Khoa</span>
            {activeTab === 'loan_guarantee' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#003366] rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* ================= TAB 1: ĐÓNG GÓP QUỸ BKA FUND ================= */}
      {activeTab === 'donate' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Donation Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold mb-2">
                <Heart className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                <span>Cựu sinh viên, Doanh nghiệp & Giảng viên</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
                <span>Đóng Góp Xây Dựng Quỹ BKA Fund</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Nguồn lực của Quý anh chị sẽ được chuyển trực tiếp vào tài khoản Quỹ Phát triển Trường Đại học Bách Khoa - ĐHQG TP.HCM, dùng để <strong>bảo lãnh vay vốn học tập</strong> và <strong>tài trợ bù lãi suất 100%</strong> cho sinh viên.
              </p>
            </div>

            {donateSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 animate-in fade-in duration-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong>Ghi nhận đóng góp thành công!</strong> Cảm ơn nghĩa cử cao đẹp của bạn hướng về thế hệ kỹ sư tương lai Trường Đại học Bách Khoa - ĐHQG TP.HCM.
                </div>
              </div>
            )}

            <form onSubmit={handleDonateSubmit} className="space-y-5">
              {/* Preset Amounts */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">
                  Chọn mức đóng góp (VNĐ):
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {[
                    { value: "500000", label: "500.000đ" },
                    { value: "1000000", label: "1.000.000đ" },
                    { value: "5000000", label: "5.000.000đ" },
                    { value: "10000000", label: "10.000.000đ" },
                    { value: "50000000", label: "50.000.000đ" },
                    { value: "custom", label: "Con số khác" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setSelectedAmount(item.value)}
                      className={`btn btn-sm sm:btn-md text-xs sm:text-sm font-bold rounded-2xl border transition-all ${
                        selectedAmount === item.value
                          ? "bg-red-700 text-white border-red-700 shadow-md"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {selectedAmount === "custom" && (
                <div className="space-y-1 animate-in fade-in duration-200">
                  <label className="block text-xs font-semibold text-slate-700">
                    Nhập số tiền khác (VNĐ):
                  </label>
                  <input
                    type="number"
                    placeholder="Ví dụ: 2000000"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                    required
                  />
                </div>
              )}

              {/* Target Purpose Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                  Mục tiêu tài trợ ưu tiên:
                </label>
                <select
                  value={donationTarget}
                  onChange={(e) => setDonationTarget(e.target.value)}
                  className="select select-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 focus:bg-white focus:text-slate-900"
                >
                  <option value="loan_guarantee">Quỹ bảo lãnh vay vốn học tập & Bù lãi suất 0%</option>
                  <option value="tuition_relief">Hỗ trợ trả nợ gốc cho sinh viên đạt GPA Xuất sắc</option>
                  <option value="emergency_aid">Quỹ cứu trợ khẩn cấp sinh viên biến cố tai nạn/gia cảnh</option>
                  <option value="general_fund">Đóng góp phát triển chung Quỹ BKA Fund</option>
                </select>
              </div>

              {/* Donor Name & Affiliation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                    Họ và tên nhà tài trợ / Doanh nghiệp:
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    placeholder="Ví dụ: Nguyễn Văn Hùng"
                    value={isAnonymous ? "Nhà hảo tâm Bách Khoa ẩn danh" : donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900 disabled:bg-slate-100"
                    required={!isAnonymous}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                    Khóa / Khoa / Đơn vị tại ĐHBK ĐHQG-HCM:
                  </label>
                  <select
                    value={classGroup}
                    disabled={isAnonymous}
                    onChange={(e) => setClassGroup(e.target.value)}
                    className="select select-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 focus:bg-white focus:text-slate-900 disabled:bg-slate-100"
                  >
                    <option value="Cựu sinh viên K1975 - K1999">Cựu sinh viên (K1975 - K1999)</option>
                    <option value="Cựu sinh viên K2000 - K2015">Cựu sinh viên (K2000 - K2015)</option>
                    <option value="Cựu sinh viên K2016 - K2024">Cựu sinh viên (K2016 - K2024)</option>
                    <option value="Cán bộ Giảng viên ĐHBK ĐHQG-HCM">Cán bộ / Giảng viên Bách Khoa TP.HCM</option>
                    <option value="Doanh nghiệp Cựu SV BKA">Doanh nghiệp Cựu sinh viên BKA</option>
                    <option value="Doanh nghiệp Đối tác ĐHQG-HCM">Doanh nghiệp / Tập đoàn Đối tác</option>
                  </select>
                </div>
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="checkbox checkbox-sm checkbox-primary rounded-lg border-slate-300"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-slate-600 select-none cursor-pointer">
                  Ủng hộ ẩn danh (Tên sẽ hiển thị là "Nhà hảo tâm Bách Khoa ẩn danh")
                </label>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                  Lời nhắn gửi động viên các bạn sinh viên Bách Khoa:
                </label>
                <textarea
                  rows={3}
                  placeholder="Gửi lời chúc, kinh nghiệm hoặc niềm tin tới thế hệ kỹ sư Bách Khoa tương lai..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="textarea textarea-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={!isAnonymous && !donorName.trim()}
                className="btn bg-red-700 hover:bg-red-800 text-white w-full rounded-2xl border-none btn-md sm:btn-lg gap-2 text-sm sm:text-base font-bold shadow-lg shadow-red-950/20 transition-transform active:scale-98"
              >
                <QrCode className="w-5 h-5" />
                <span>Tạo Mã VietQR Đóng Góp Ngay</span>
              </button>
            </form>
          </div>

          {/* Leaderboard Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>🏆 Bảng Vinh Danh BKA Fund</span>
                </h3>
                <p className="text-xs text-slate-500">Cập nhật trực tiếp từ hệ thống đối soát</p>
              </div>
              <span className="badge bg-amber-100 text-amber-800 font-bold text-xs py-2 px-3 rounded-xl border border-amber-300">
                {donors.length} Nhà hảo tâm
              </span>
            </div>

            {/* Search & Filter */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc khóa, khoa..."
                  value={searchDonor}
                  onChange={(e) => setSearchDonor(e.target.value)}
                  className="input input-sm input-bordered w-full pl-9 rounded-xl text-xs bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                />
              </div>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'enterprise', label: 'Doanh nghiệp' },
                  { id: 'alumni', label: 'Cựu SV BKA' },
                  { id: 'faculty', label: 'Cán bộ GV' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setDonorFilter(f.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      donorFilter === f.id
                        ? 'bg-[#003366] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Donors List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {filteredDonors.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        {item.name}
                        {item.tier === 'kimcuong' && <span title="Tài trợ Kim Cương">💎</span>}
                        {item.tier === 'vang' && <span title="Tài trợ Vàng">🥇</span>}
                        {item.tier === 'bac' && <span title="Tài trợ Bạc">🥈</span>}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.classGroup} • {item.time}
                      </div>
                    </div>
                    <span className="badge bg-red-100 text-red-700 border-red-200 font-extrabold text-xs py-1.5 px-2.5 rounded-lg shrink-0">
                      {item.amount}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 italic bg-white p-2.5 rounded-xl border border-slate-200/80 leading-relaxed">
                    "{item.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: ĐĂNG KÝ BẢO LÃNH VAY BKA ================= */}
      {activeTab === 'loan_guarantee' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Policy Overview Header */}
          <div className="bg-gradient-to-r from-blue-900 to-[#003366] text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Chính sách Bảo lãnh Tín dụng Đào tạo Bách Khoa</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Chương Trình Bảo Lãnh Vay Học Tập BKA Fund
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-3xl">
              Dành riêng cho sinh viên <strong>Trường Đại học Bách Khoa - ĐHQG TP.HCM</strong> có hoàn cảnh khó khăn hoặc cần hỗ trợ tài chính để trang trải học phí, đồ án tốt nghiệp và sinh hoạt phí. Quỹ BKA Fund đứng ra <strong>bảo lãnh tín chấp</strong> với ngân hàng liên kết, hỗ trợ <strong>bù lãi suất 0%</strong> trong suốt thời gian học tập.
            </p>

            {/* 3 Pillars of Loan Guarantee */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
                <div className="font-bold text-sm text-amber-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> 1. Không thế chấp tài sản
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  Được Quỹ BKA Fund cấp Thư bảo lãnh tín nhiệm dựa trên kết quả học tập tại ĐHBK ĐHQG-HCM.
                </p>
              </div>
              <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
                <div className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
                  <Percent className="w-4 h-4" /> 2. Lãi suất 0% trong khóa học
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  Quỹ BKA Fund thanh toán 100% phần lãi suất phát sinh trực tiếp cho Ngân hàng đối tác.
                </p>
              </div>
              <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15">
                <div className="font-bold text-sm text-sky-300 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> 3. Xét tài trợ nợ gốc
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  Sinh viên tốt nghiệp loại Giỏi/Xuất sắc được Quỹ xem xét tài trợ thanh toán thay 30% - 100% nợ gốc.
                </p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-4">
              <span className="badge bg-blue-100 text-[#003366] text-xs font-bold uppercase tracking-wider px-3 py-1 mb-2">
                Hồ sơ điện tử sinh viên
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Landmark className="w-6 h-6 text-[#003366]" />
                <span>Biểu Mẫu Đăng Ký Bảo Lãnh Vay Học Tập BKA</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Vui lòng điền đầy đủ và trung thực các thông tin dưới đây. Hội đồng thẩm định Quỹ BKA (Phòng CTSV, Cơ sở 1: 268 Lý Thường Kiệt, P. Diên Hồng) sẽ phản hồi kết quả trong vòng 3-5 ngày làm việc.
              </p>
            </div>

            {applySuccess && (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center gap-2.5 font-black text-lg text-emerald-800">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span>Đăng ký bảo lãnh vay thành công!</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-200 text-xs sm:text-sm space-y-1.5 text-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Mã biên nhận hồ sơ:</span>
                    <strong className="text-base text-[#003366] font-mono">{createdReceiptCode}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Trạng thái hiện tại:</span>
                    <span className="badge bg-amber-100 text-amber-800 font-bold border-none">Đang tiếp nhận & Thẩm định</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Địa điểm đối chiếu gốc:</span>
                    <span>Văn phòng Quỹ BKA - Cơ sở 1: 268 Lý Thường Kiệt, P. Diên Hồng</span>
                  </div>
                </div>
                <p className="text-xs text-emerald-700">
                  Hồ sơ của bạn đã được chuyển tới Ban Thư ký Quỹ BKA Fund. Bạn có thể sử dụng vai trò <strong>Admin</strong> trên thanh menu để kiểm tra tiến trình thẩm định và cấp Thư bảo lãnh vay.
                </p>
              </div>
            )}

            <form onSubmit={handleApplyLoanGuarantee} className="space-y-8">
              {/* PHẦN 1: THÔNG TIN SINH VIÊN */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-black text-[#003366] uppercase tracking-wider border-l-4 border-[#003366] pl-2.5">
                  <span>1. Thông tin Sinh viên Bách Khoa TP.HCM</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Họ và tên sinh viên <span className="text-red-500">*</span>:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn Bách"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mã số sinh viên (MSSV) <span className="text-red-500">*</span>:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 2213456"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
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
                      value={cohort}
                      onChange={(e) => setCohort(e.target.value)}
                      className="select select-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 focus:bg-white focus:text-slate-900"
                    >
                      <option value="K2021">K2021 (Năm 4 - Chuẩn bị tốt nghiệp)</option>
                      <option value="K2022">K2022 (Năm 3)</option>
                      <option value="K2023">K2023 (Năm 2)</option>
                      <option value="K2024">K2024 (Năm 1)</option>
                      <option value="K2025">K2025 (Tân sinh viên)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Khoa trực thuộc (ĐHBK ĐHQG-HCM):
                    </label>
                    <select
                      value={faculty}
                      onChange={(e) => setFaculty(e.target.value)}
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
                      min="0"
                      max="4.0"
                      placeholder="Ví dụ: 3.45"
                      value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                      className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email sinh viên (@hcmut.edu.vn):
                    </label>
                    <input
                      type="email"
                      placeholder="Ví dụ: bach.nguyen221@hcmut.edu.vn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Số điện thoại liên hệ cá nhân:
                    </label>
                    <input
                      type="tel"
                      placeholder="Ví dụ: 0912345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* PHẦN 2: THÔNG TIN KHOẢN VAY ĐỀ XUẤT BẢO LÃNH */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-black text-[#003366] uppercase tracking-wider border-l-4 border-[#003366] pl-2.5">
                  <span>2. Nhu cầu vay vốn & Gói bảo lãnh đề xuất</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Số tiền đề xuất bảo lãnh vay:
                    </label>
                    <select
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="select select-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 focus:bg-white focus:text-slate-900"
                    >
                      <option value="10.000.000 VNĐ">10.000.000 VNĐ (Gói 1 học kỳ cơ bản)</option>
                      <option value="15.000.000 VNĐ">15.000.000 VNĐ (Gói học phí tiêu chuẩn)</option>
                      <option value="20.000.000 VNĐ">20.000.000 VNĐ (Gói học phí + Chi phí học tập)</option>
                      <option value="25.000.000 VNĐ">25.000.000 VNĐ (Gói đồ án & thí nghiệm)</option>
                      <option value="30.000.000 VNĐ">30.000.000 VNĐ (Gói năm học)</option>
                      <option value="custom">Nhập số tiền khác...</option>
                    </select>
                  </div>

                  {loanAmount === 'custom' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Nhập số tiền vay đề xuất (VNĐ):
                      </label>
                      <input
                        type="number"
                        placeholder="Ví dụ: 18000000"
                        value={customLoanAmount}
                        onChange={(e) => setCustomLoanAmount(e.target.value)}
                        className="input input-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mục đích vay vốn học tập:
                    </label>
                    <select
                      value={loanPurpose}
                      onChange={(e) => setLoanPurpose(e.target.value)}
                      className="select select-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 focus:bg-white focus:text-slate-900"
                    >
                      <option value="Đóng học phí kỳ tới">Đóng học phí học kỳ chính quy</option>
                      <option value="Trang trải chi phí sinh hoạt & giáo trình">Trang trải sinh hoạt phí & tài liệu học tập</option>
                      <option value="Chi phí linh kiện, thiết bị làm đồ án tốt nghiệp">Chi phí linh kiện, vật tư làm đồ án tốt nghiệp</option>
                      <option value="Mua máy tính xách tay phục vụ học tập kỹ thuật">Mua máy tính xách tay / thiết bị học tập</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Ngân hàng liên kết đề xuất giải ngân:
                    </label>
                    <select
                      value={partnerBank}
                      onChange={(e) => setPartnerBank(e.target.value)}
                      className="select select-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 focus:bg-white focus:text-slate-900"
                    >
                      <option value="Gói tín dụng sinh viên ĐHQG-HCM (Vietcombank)">Gói tín dụng sinh viên ĐHQG-HCM (Vietcombank)</option>
                      <option value="Ngân hàng Chính sách Xã hội Chi nhánh TP.HCM">Ngân hàng Chính sách Xã hội Chi nhánh TP.HCM</option>
                      <option value="BIDV - Chi nhánh Đông Sài Gòn">BIDV - Chi nhánh Đông Sài Gòn</option>
                      <option value="Agribank - Chi nhánh Chợ Lớn">Agribank - Chi nhánh Chợ Lớn</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Thời hạn vay mong muốn:
                    </label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className="select select-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 focus:bg-white focus:text-slate-900"
                    >
                      <option value="12 tháng (Trả gốc cuối kỳ)">12 tháng (Trả gốc cuối kỳ)</option>
                      <option value="24 tháng (Bắt đầu trả sau khi tốt nghiệp)">24 tháng (Bắt đầu trả sau khi tốt nghiệp)</option>
                      <option value="36 tháng (Trả góp theo kỳ lương kỹ sư)">36 tháng (Trả góp theo kỳ lương kỹ sư)</option>
                      <option value="Sau khi có việc làm chính thức">Sau khi có việc làm chính thức (Tối đa 5 năm)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* PHẦN 3: HOÀN CẢNH GIA ĐÌNH & LÝ DO CẦN BẢO LÃNH */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-black text-[#003366] uppercase tracking-wider border-l-4 border-[#003366] pl-2.5">
                  <span>3. Hoàn cảnh gia đình & Kế hoạch hoàn trả</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Đối tượng hoàn cảnh sinh viên:
                  </label>
                  <select
                    value={circumstanceType}
                    onChange={(e) => setCircumstanceType(e.target.value)}
                    className="select select-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 focus:bg-white focus:text-slate-900"
                  >
                    <option value="Hộ nghèo / Hộ cận nghèo chuẩn nhà nước">Hộ nghèo / Hộ cận nghèo chuẩn nhà nước</option>
                    <option value="Gia đình khó khăn đột xuất do thiên tai / dịch bệnh">Gia đình khó khăn đột xuất do biến cố / thiên tai</option>
                    <option value="Gia đình có người thân ốm đau nặng / bệnh hiểm nghèo">Gia đình có người thân ốm đau nặng / viện phí cao</option>
                    <option value="Sinh viên mồ côi / tự lập mưu sinh">Sinh viên mồ côi / tự lập tự trang trải</option>
                    <option value="Gia đình chính sách / Thương binh liệt sĩ">Gia đình chính sách / Thương binh liệt sĩ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mô tả cụ thể hoàn cảnh & Cam kết học tập, kế hoạch hoàn trả <span className="text-red-500">*</span>:
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Trình bày chi tiết lý do em cần bảo lãnh khoản vay này, tình hình thu nhập gia đình và dự kiến kế hoạch học tập, hoàn trả sau khi tốt nghiệp..."
                    value={circumstance}
                    onChange={(e) => setCircumstance(e.target.value)}
                    className="textarea textarea-bordered w-full rounded-2xl text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
                    required
                  ></textarea>
                </div>
              </div>

              {/* PHẦN 4: MINH CHỨNG HỒ SƠ */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-sm font-black text-[#003366] uppercase tracking-wider border-l-4 border-[#003366] pl-2.5">
                  <span>4. Tải lên Minh chứng Hồ sơ</span>
                </div>

                <div className="p-5 border-2 border-dashed border-slate-300 rounded-3xl text-center hover:border-[#003366] transition-colors bg-slate-50/50">
                  <UploadCloud className="w-9 h-9 text-[#003366] mx-auto mb-2" />
                  <div className="text-xs sm:text-sm font-bold text-slate-800">
                    Kéo thả hoặc nhấp để chọn file đính kèm
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Đính kèm file PDF/ZIP (Thẻ SV, Bảng điểm MyBK, Đơn xin bảo lãnh, Sổ hộ nghèo hoặc giấy xác nhận địa phương)
                  </p>
                  
                  <input
                    type="file"
                    id="loanProofFile"
                    onChange={handleFakeFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="loanProofFile"
                    className="btn btn-sm bg-[#003366] hover:bg-blue-900 text-white rounded-xl mt-3 font-semibold text-xs border-none cursor-pointer"
                  >
                    Chọn tệp từ thiết bị
                  </label>

                  {uploadedFileName && (
                    <div className="mt-4 max-w-sm mx-auto bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 text-left">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 truncate flex items-center gap-1.5">
                          <FileCheck className="w-4 h-4 text-emerald-600" />
                          {uploadedFileName}
                        </span>
                        <span className="text-[10px] text-slate-500">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* PHẦN 5: CAM KẾT & GỬI ĐƠN */}
              <div className="pt-2 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-[#003366]" /> Cam kết trách nhiệm của người học Bách Khoa:
                  </div>
                  <p className="leading-relaxed">
                    Em xin cam kết toàn bộ thông tin kê khai trên là hoàn toàn chính xác. Khi được Quỹ BKA Fund phê duyệt cấp Thư bảo lãnh tín dụng, em cam kết duy trì kết quả học tập từ trung bình khá trở lên, sử dụng nguồn vốn đúng mục đích học phí/đồ án và nghiêm túc thực hiện nghĩa vụ hoàn trả nợ gốc cho Ngân hàng đúng kỳ hạn sau khi tốt nghiệp.
                  </p>
                  <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="checkbox checkbox-sm checkbox-primary rounded-lg border-slate-300"
                      required
                    />
                    <span className="font-bold text-slate-900">
                      Tôi đã đọc, hiểu rõ và đồng ý với mọi điều khoản bảo lãnh vay của Quỹ BKA Fund.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!agreeTerms || !studentName.trim() || !studentId.trim() || !circumstance.trim()}
                  className="btn bg-[#003366] hover:bg-blue-900 text-white w-full rounded-2xl border-none btn-md sm:btn-lg gap-2 text-sm sm:text-base font-bold shadow-lg shadow-blue-950/20 transition-transform active:scale-98 disabled:bg-slate-300 disabled:text-slate-500"
                >
                  <FileCheck className="w-5 h-5" />
                  <span>Nộp Hồ Sơ Đăng Ký Bảo Lãnh Vay BKA</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR VietQR Modal Popup */}
      {showQR && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                  BKA
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base">Mã QR Đóng Góp Quỹ BKA</h3>
                  <p className="text-[10px] text-slate-500">Đại học Bách Khoa - ĐHQG TP.HCM</p>
                </div>
              </div>
              <button
                onClick={() => setShowQR(false)}
                className="btn btn-ghost btn-xs btn-circle text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-3">
              <div className="w-56 h-56 mx-auto bg-white p-3 rounded-2xl shadow-inner border border-slate-200 flex flex-col items-center justify-center relative group">
                {/* Simulated VietQR */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BKAFUND_DONATE_${finalDonationAmount}_${encodeURIComponent(donorName || 'ANONYMOUS')}`}
                  alt="VietQR BKA Fund"
                  className="w-48 h-48 object-contain"
                />
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-slate-500">Số tiền ủng hộ:</div>
                <div className="text-xl font-black text-red-700">
                  {parseInt(finalDonationAmount || "0", 10).toLocaleString("vi-VN")} VNĐ
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Đơn vị tiếp nhận:</span>
                <strong className="text-slate-900 text-right">Quỹ Phát triển ĐH Bách Khoa ĐHQG-HCM</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Số tài khoản:</span>
                <div className="flex items-center gap-1.5">
                  <strong className="text-[#003366] font-mono text-sm">0281957268</strong>
                  <button
                    onClick={handleCopySTK}
                    className="btn btn-ghost btn-xs p-1 h-auto text-blue-600 hover:text-blue-800"
                    title="Sao chép số tài khoản"
                  >
                    {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Ngân hàng:</span>
                <span className="text-slate-800 font-semibold">Vietcombank - CN TP.HCM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Nội dung:</span>
                <span className="font-mono font-bold text-slate-800">
                  BKAFUND {donorName.replace(/\s+/g, '').toUpperCase() || 'ANON'}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowQR(false)}
                className="btn btn-outline flex-1 rounded-xl text-xs font-semibold"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handleConfirmTransfer}
                className="btn bg-red-700 hover:bg-red-800 text-white flex-1 rounded-xl text-xs font-bold border-none shadow-md shadow-red-900/20"
              >
                Xác nhận đã chuyển
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
