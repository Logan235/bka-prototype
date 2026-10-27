import React, { useState } from "react";
import { useAuth } from "../auth/authContext";
import {
  Shield,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  HeartHandshake,
  FileText,
  Download,
  ArrowUpRight,
  UserCheck,
  Landmark,
  Percent
} from "lucide-react";
import type { LoanGuaranteeApplication, Tutor, Donor } from "../../types";
import {
  getStoredScholarships,
  saveStoredScholarships,
  getStoredTutors,
  saveStoredTutors,
  getStoredDonors
} from "../../services/mockData";

export const AdminPage: React.FC = () => {
  const { currentRole, switchRole } = useAuth();
  const [activeTab, setActiveTab] = useState<'loans' | 'tutors' | 'donations'>('loans');
  
  // Data lists
  const [loans, setLoans] = useState<LoanGuaranteeApplication[]>(() => getStoredScholarships());
  const [tutors, setTutors] = useState<Tutor[]>(() => getStoredTutors());
  const [donors] = useState<Donor[]>(() => getStoredDonors());

  // Filter & Search states
  const [searchLoan, setSearchLoan] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<LoanGuaranteeApplication | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateStatus = (id: string, newStatus: LoanGuaranteeApplication['status']) => {
    const updated = loans.map((item) => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });

    setLoans(updated);
    saveStoredScholarships(updated);

    const statusText = 
      newStatus === 'approved' ? 'ĐÃ PHÊ DUYỆT CẤP BẢO LÃNH VAY' :
      newStatus === 'need_info' ? 'YÊU CẦU BỔ SUNG MINH CHỨNG' : 'TỪ CHỐI HỒ SƠ';

    showToast(`Hồ sơ ${id}: ${statusText}`);

    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  const handleToggleTutorStatus = (id: string) => {
    const updated = tutors.map((t) => {
      if (t.id === id) {
        return { ...t, verified: !t.verified };
      }
      return t;
    });
    setTutors(updated);
    saveStoredTutors(updated);
    showToast("Đã cập nhật trạng thái thẩm định gia sư Bách Khoa!");
  };

  const filteredLoans = loans.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchLoan.toLowerCase()) ||
      item.studentId.includes(searchLoan) ||
      (item.faculty || item.school || "").toLowerCase().includes(searchLoan.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: LoanGuaranteeApplication['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đã cấp bảo lãnh
          </span>
        );
      case 'need_info':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Cần bổ sung
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> Từ chối
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Clock className="w-3.5 h-3.5 text-blue-600" /> Chờ thẩm định
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10 pb-20">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Role Notice Banner if not Admin */}
      {currentRole !== 'admin' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <Shield className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <strong className="text-sm sm:text-base font-bold">Chế độ xem trước Admin:</strong>
                <p className="text-xs text-amber-800 mt-0.5">
                  Bạn hiện đang xem với vai trò <span className="capitalize font-bold text-red-700">[{currentRole}]</span>. Nhấn nút bên cạnh để chuyển sang quyền Quản trị viên (Admin) để thẩm định và phê duyệt bảo lãnh vay.
                </p>
              </div>
            </div>
            <button
              onClick={() => switchRole('admin')}
              className="btn btn-sm sm:btn-md bg-[#003366] hover:bg-[#002244] text-white border-none rounded-2xl font-bold px-5 shrink-0 shadow-md"
            >
              Chuyển sang quyền Admin ngay
            </button>
          </div>
        </div>
      )}

      {/* Admin Dashboard Header & KPI Metrics */}
      <section className="bg-gradient-to-r from-[#002244] via-[#003366] to-slate-900 text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wide">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Trường Đại học Bách Khoa - ĐHQG TP.HCM • Ban Thư Ký Quỹ BKA Fund</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2">
                Bảng Điều Khiển Ban Thư Ký & Hội Đồng Thẩm Định
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                Văn phòng Quỹ BKA: Cơ sở 1: 268 Lý Thường Kiệt, Phường Diên Hồng
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold py-2 px-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                Hệ thống thẩm định trực tuyến
              </span>
            </div>
          </div>

          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-200 uppercase">Quy Mô Quỹ BKA Fund</span>
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400">
                  <HeartHandshake className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">52.800.000.000đ</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Đạt 75.4% mục tiêu 70 Tỷ</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-200 uppercase">Hồ Sơ Bảo Lãnh Vay</span>
                <div className="w-8 h-8 rounded-xl bg-sky-400/20 flex items-center justify-center text-sky-400">
                  <Landmark className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{loans.length + 1450} hồ sơ</div>
              <div className="text-[11px] text-blue-200">
                <span>Giải ngân qua Vietcombank & NH CSXH</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-200 uppercase">Bảo Trợ Lãi Suất 0%</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-400">
                  <Percent className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">3.82 Tỷ VNĐ</div>
              <div className="text-[11px] text-emerald-300 font-semibold">
                <span>Quỹ BKA thanh toán bù lãi 100%</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-200 uppercase">Hồ Sơ Chờ Thẩm Định</span>
                <div className="w-8 h-8 rounded-xl bg-rose-400/20 flex items-center justify-center text-rose-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-400">
                {loans.filter(s => s.status === 'pending').length} hồ sơ
              </div>
              <div className="text-[11px] text-blue-200">
                <span>Ưu tiên sinh viên khóa mới</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex border-b border-slate-200 gap-4 sm:gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('loans')}
            className={`pb-3 sm:pb-4 text-xs sm:text-sm font-bold transition-all relative flex items-center gap-2 shrink-0 ${
              activeTab === 'loans'
                ? 'text-[#003366]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Landmark className={`w-4 h-4 ${activeTab === 'loans' ? 'text-[#003366]' : ''}`} />
            <span>Thẩm Định Hồ Sơ Bảo Lãnh Vay BKA ({loans.length})</span>
            {activeTab === 'loans' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#003366] rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('tutors')}
            className={`pb-3 sm:pb-4 text-xs sm:text-sm font-bold transition-all relative flex items-center gap-2 shrink-0 ${
              activeTab === 'tutors'
                ? 'text-[#003366]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck className={`w-4 h-4 ${activeTab === 'tutors' ? 'text-[#003366]' : ''}`} />
            <span>Quản Lý Danh Bạ Gia Sư ({tutors.length})</span>
            {activeTab === 'tutors' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#003366] rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('donations')}
            className={`pb-3 sm:pb-4 text-xs sm:text-sm font-bold transition-all relative flex items-center gap-2 shrink-0 ${
              activeTab === 'donations'
                ? 'text-[#003366]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <HeartHandshake className={`w-4 h-4 ${activeTab === 'donations' ? 'text-[#003366]' : ''}`} />
            <span>Sổ Giao Dịch Đóng Góp Quỹ BKA ({donors.length})</span>
            {activeTab === 'donations' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#003366] rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* Tab 1: Loan Applications Review */}
      {activeTab === 'loans' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Tìm theo tên sinh viên, MSSV hoặc Khoa..."
                value={searchLoan}
                onChange={(e) => setSearchLoan(e.target.value)}
                className="input input-bordered w-full pl-9 rounded-2xl text-xs sm:text-sm bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:bg-white focus:text-slate-900"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Lọc trạng thái:
              </span>
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'pending', label: 'Chờ thẩm định' },
                { id: 'approved', label: 'Đã duyệt bảo lãnh' },
                { id: 'need_info', label: 'Cần bổ sung' },
                { id: 'rejected', label: 'Từ chối' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setStatusFilter(st.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === st.id
                      ? 'bg-[#003366] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Applications Table Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-4">Mã Hồ Sơ</th>
                    <th className="py-4 px-4">Sinh Viên / MSSV</th>
                    <th className="py-4 px-4">Khoa Trực Thuộc</th>
                    <th className="py-4 px-4">GPA</th>
                    <th className="py-4 px-4">Số Tiền Đề Xuất Vay</th>
                    <th className="py-4 px-4">Ngân Hàng Liên Kết</th>
                    <th className="py-4 px-4">Ngày Nộp</th>
                    <th className="py-4 px-4">Trạng Thái</th>
                    <th className="py-4 px-4 text-center">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredLoans.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400">
                        Không tìm thấy hồ sơ nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredLoans.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900 font-mono text-xs">
                          {app.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{app.studentName}</div>
                          <div className="text-[11px] text-slate-500 font-mono">MSSV: {app.studentId} • {app.cohort}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 max-w-[180px] truncate" title={app.faculty || app.school}>
                          {app.faculty || app.school}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#003366]">
                          {app.gpa}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-red-700">
                          {app.loanAmount || app.requestedAmount}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 text-xs max-w-[170px] truncate" title={app.partnerBank}>
                          {app.partnerBank || "Gói tín dụng ĐHQG-HCM"}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 text-xs">
                          {app.appliedDate}
                        </td>
                        <td className="py-3.5 px-4">
                          {getStatusBadge(app.status)}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="btn btn-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 rounded-lg gap-1"
                              title="Xem chi tiết hồ sơ bảo lãnh"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Chi tiết</span>
                            </button>

                            {app.status !== 'approved' && (
                              <button
                                onClick={() => handleUpdateStatus(app.id, 'approved')}
                                className="btn btn-xs bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-lg"
                                title="Phê duyệt cấp Thư bảo lãnh vay BKA"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {app.status !== 'need_info' && (
                              <button
                                onClick={() => handleUpdateStatus(app.id, 'need_info')}
                                className="btn btn-xs bg-amber-500 hover:bg-amber-600 text-white border-none rounded-lg"
                                title="Yêu cầu bổ sung tài liệu"
                              >
                                <AlertCircle className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {app.status !== 'rejected' && (
                              <button
                                onClick={() => handleUpdateStatus(app.id, 'rejected')}
                                className="btn btn-xs bg-rose-600 hover:bg-rose-700 text-white border-none rounded-lg"
                                title="Từ chối hồ sơ"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tutors Management */}
      {activeTab === 'tutors' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Danh Sách Gia Sư Bách Khoa TP.HCM Đang Hoạt Động</h3>
                <p className="text-xs text-slate-500">Xác thực học lực MyBK và phân công kèm cặp tại CS1 Lý Thường Kiệt hoặc CS2 Dĩ An</p>
              </div>
              <span className="badge badge-accent text-xs font-bold">{tutors.length} Gia sư</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor) => (
                <div key={tutor.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={tutor.avatar} alt={tutor.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-1">
                        {tutor.name}
                        {tutor.verified && <Shield className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <div className="text-xs text-slate-500">{tutor.major} • GPA {tutor.gpa}</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/80">
                    <strong>Môn nhận dạy:</strong> {tutor.subjects.join(', ')}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-red-700">{tutor.price}</span>
                    <button
                      onClick={() => handleToggleTutorStatus(tutor.id)}
                      className={`btn btn-xs rounded-lg font-bold ${
                        tutor.verified
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-300'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-300'
                      }`}
                    >
                      {tutor.verified ? 'Đã xác thực MyBK' : 'Chờ kiểm định'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Donations Ledger */}
      {activeTab === 'donations' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Sổ Giao Dịch Đóng Góp Quỹ BKA Fund</h3>
                <p className="text-xs text-slate-500">Sao kê minh bạch nguồn thu tài trợ bảo lãnh vay và bù lãi suất sinh viên</p>
              </div>
              <button 
                onClick={() => showToast("Đã trích xuất file Excel sao kê Quỹ BKA thành công!")}
                className="btn btn-sm bg-[#003366] text-white rounded-xl gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất file Excel sao kê</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full text-xs sm:text-sm">
                <thead className="bg-slate-50 font-bold uppercase text-[11px] text-slate-600">
                  <tr>
                    <th>Mã GD</th>
                    <th>Nhà Hảo Tâm / Tổ Chức</th>
                    <th>Thuộc Khóa / Đơn Vị</th>
                    <th>Số Tiền</th>
                    <th>Thời Gian</th>
                    <th>Lời Chúc / Ghi Chú</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {donors.map((d, idx) => (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="font-mono text-xs text-slate-500">BKA-{202600 + idx}</td>
                      <td className="font-bold text-slate-900">{d.name}</td>
                      <td className="text-slate-600">{d.classGroup}</td>
                      <td className="font-bold text-red-700">{d.amount}</td>
                      <td className="text-slate-500 text-xs">{d.time}</td>
                      <td className="text-xs text-slate-600 italic max-w-xs truncate">{d.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Application Detail Inspection Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="badge badge-sm bg-blue-100 text-[#003366] font-mono font-bold">{selectedApp.id}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Hồ Sơ Đăng Ký Bảo Lãnh Vay BKA</h3>
                <p className="text-xs text-slate-500">Trường Đại học Bách Khoa - ĐHQG TP.HCM (268 Lý Thường Kiệt, P. Diên Hồng)</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="btn btn-sm btn-ghost btn-circle"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="text-slate-500">Họ và tên sinh viên:</div>
                <div className="font-bold text-base text-slate-900">{selectedApp.studentName}</div>
                <div className="text-slate-500 pt-1">MSSV: <strong>{selectedApp.studentId}</strong> ({selectedApp.cohort})</div>
                <div className="text-slate-500">Khoa: <strong>{selectedApp.faculty || selectedApp.school}</strong></div>
                <div className="text-slate-500">Liên hệ: {selectedApp.email} • {selectedApp.phone}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                <div className="text-slate-500">Khoản vay bảo lãnh đề xuất:</div>
                <div className="font-bold text-base text-red-700">{selectedApp.loanAmount || selectedApp.requestedAmount}</div>
                <div className="text-slate-500 pt-1">Ngân hàng: <strong>{selectedApp.partnerBank || "Gói tín dụng ĐHQG-HCM"}</strong></div>
                <div className="text-slate-500">Kỳ hạn vay: <strong>{selectedApp.loanTerm || "24 tháng"}</strong></div>
                <div className="text-slate-500">GPA: <strong className="text-[#003366]">{selectedApp.gpa} / 4.0</strong> • Trạng thái: {getStatusBadge(selectedApp.status)}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Mục đích vay & Hoàn cảnh gia đình:</h4>
              <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 leading-relaxed">
                {selectedApp.circumstance}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Tệp minh chứng hồ sơ:</h4>
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <FileText className="w-4 h-4 text-[#003366]" />
                  <span>{selectedApp.fileName || "Don_de_nghi_bao_lanh_vay.pdf"}</span>
                </div>
                <button 
                  onClick={() => showToast("Đã trích xuất tệp minh chứng về máy kiểm tra!")}
                  className="btn btn-xs bg-white text-[#003366] border-slate-200 rounded-lg gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Tải file</span>
                </button>
              </div>
            </div>

            {selectedApp.note && (
              <div className="text-xs text-slate-500 italic bg-amber-50 p-3 rounded-xl border border-amber-200">
                <strong>Ghi chú Ban Thư ký Quỹ BKA:</strong> {selectedApp.note}
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleUpdateStatus(selectedApp.id, 'approved')}
                className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex-1 font-bold gap-1"
              >
                <Check className="w-4 h-4" />
                <span>Cấp Thư Bảo Lãnh Vay</span>
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedApp.id, 'need_info')}
                className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white rounded-xl flex-1 font-bold gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Yêu Cầu Bổ Sung Minh Chứng</span>
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedApp.id, 'rejected')}
                className="btn btn-sm bg-rose-600 hover:bg-rose-700 text-white rounded-xl flex-1 font-bold gap-1"
              >
                <X className="w-4 h-4" />
                <span>Từ Chối Bảo Lãnh</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
