import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { ParentAccount, Student, ExamResult } from '../../types/student.types';

// ── Sub-components ──────────────────────────────────────────────────────────

const GradeBadge = ({ grade }: { grade: string }) => {
  const colors: Record<string, string> = {
    'A+': 'bg-green-100 text-green-700 border-green-200',
    'A': 'bg-blue-100 text-blue-700 border-blue-200',
    'B+': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'B': 'bg-orange-100 text-orange-700 border-orange-200',
    'C': 'bg-red-100 text-red-700 border-red-200',
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${colors[grade] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {grade}
    </span>
  );
};

const ResultCard = ({ result }: { result: ExamResult }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="bg-blue-900 text-white px-5 py-3 flex items-center justify-between">
      <div>
        <p className="font-bold text-sm">{result.examName}</p>
        <p className="text-blue-300 text-xs">{result.year}</p>
      </div>
      <div className="text-right">
        <p className="text-yellow-400 text-xl font-black">{result.percentage}%</p>
        {result.rank && <p className="text-blue-300 text-xs">Rank #{result.rank}</p>}
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
            <th className="px-4 py-2 text-left font-semibold">Subject</th>
            <th className="px-4 py-2 text-center font-semibold">Marks</th>
            <th className="px-4 py-2 text-center font-semibold">Grade</th>
          </tr>
        </thead>
        <tbody>
          {result.marks.map((m, i) => (
            <tr key={m.subject} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2.5 text-gray-700 font-medium">{m.subject}</td>
              <td className="px-4 py-2.5 text-center text-gray-800 font-bold">{m.total}</td>
              <td className="px-4 py-2.5 text-center"><GradeBadge grade={m.grade} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const FeeTable = ({ student }: { student: Student }) => {
  const total = student.fees.reduce((s, f) => s + f.amount, 0);
  const paid = student.fees.filter((f) => f.paid).reduce((s, f) => s + f.amount, 0);
  const pending = total - paid;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <p className="font-bold text-blue-950">Fee Statement</p>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${pending > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {pending > 0 ? `₹${pending} Due` : 'All Paid ✓'}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
              <th className="px-4 py-2 text-left font-semibold">Term</th>
              <th className="px-4 py-2 text-right font-semibold">Amount</th>
              <th className="px-4 py-2 text-center font-semibold">Status</th>
              <th className="px-4 py-2 text-center font-semibold">Paid On</th>
            </tr>
          </thead>
          <tbody>
            {student.fees.map((f, i) => (
              <tr key={f.term} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2.5 text-gray-600">{f.term}</td>
                <td className="px-4 py-2.5 text-right font-bold text-gray-800">₹{f.amount.toLocaleString()}</td>
                <td className="px-4 py-2.5 text-center">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${f.paid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {f.paid ? '✓ Paid' : '⚠ Pending'}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-center text-gray-400 text-xs">{f.paidOn ?? '—'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-blue-50">
            <tr>
              <td className="px-4 py-2.5 font-bold text-blue-900">Total</td>
              <td className="px-4 py-2.5 text-right font-black text-blue-900">₹{total.toLocaleString()}</td>
              <td colSpan={2} className="px-4 py-2.5 text-center text-xs text-blue-600 font-semibold">
                Paid: ₹{paid.toLocaleString()} | Pending: ₹{pending.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

const StudentProfile = ({ student }: { student: Student }) => (
  <div className="space-y-5">
    {/* Profile header */}
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-5 text-white flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-yellow-400 flex items-center justify-center text-yellow-400 text-xl font-black shrink-0">
        {student.name.charAt(0)}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-black">{student.name}</h3>
        <p className="text-blue-300 text-sm">{student.class} — Section {student.section}</p>
        <p className="text-blue-400 text-xs mt-0.5">Roll No: {student.rollNo} · DOB: {student.dob}</p>
      </div>
    </div>

    {/* Academic Results */}
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Academic Results</p>
      <div className="space-y-4">
        {student.results.map((r) => (
          <ResultCard key={r.examName} result={r} />
        ))}
      </div>
    </div>

    {/* Fee Details */}
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Fee Details</p>
      <FeeTable student={student} />
    </div>
  </div>
);

// ── Main Dashboard ──────────────────────────────────────────────────────────

import { getStudents } from '../../data/adminStore';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<ParentAccount | null>(null);
  const [activeStudentId, setActiveStudentId] = useState<string>('');

  useEffect(() => {
    const session = sessionStorage.getItem('parentSession');
    if (!session) {
      navigate('/parent-login');
      return;
    }
    const parsed: ParentAccount = JSON.parse(session);
    // Pull the LATEST student data from adminStore so admin edits reflect live
    const allStudents = getStudents();
    const liveStudents = parsed.students.map(sessionStudent => {
      const live = allStudents.find(s => s.id === sessionStudent.id);
      return live ?? sessionStudent; // fallback to session data if not in store
    });
    setAccount({ ...parsed, students: liveStudents });
    setActiveStudentId(liveStudents[0]?.id ?? '');
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('parentSession');
    navigate('/parent-login');
  };

  if (!account) return null;

  const activeStudent = account.students.find((s) => s.id === activeStudentId);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Bar */}
      <div className="bg-blue-900 text-white px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo/logo.jpeg"
            alt="ARG Academy"
            className="w-8 h-8 rounded-full border border-yellow-400 object-cover"
          />
          <div>
            <p className="font-black text-sm">ARG Academy</p>
            <p className="text-blue-300 text-[10px]">Parent Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-yellow-400">{account.parentName}</p>
            <p className="text-blue-300 text-[10px]">{account.mobile}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-black text-blue-950">
            Welcome, {account.parentName.split(' ').slice(1).join(' ')}!
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {account.students.length === 1
              ? 'You have 1 child enrolled at ARG Academy.'
              : `You have ${account.students.length} children enrolled at ARG Academy.`}
          </p>
        </div>

        {/* Student tabs — only show if more than 1 student */}
        {account.students.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {account.students.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveStudentId(s.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeStudentId === s.id
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-900'
                }`}
              >
                {s.name}
                <span className={`ml-2 text-xs ${activeStudentId === s.id ? 'text-blue-300' : 'text-gray-400'}`}>
                  {s.class}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Active Student Profile */}
        {activeStudent && <StudentProfile student={activeStudent} />}

        {/* Back to website */}
        <div className="pt-4 pb-8 text-center">
          <Link to="/" className="text-xs text-gray-400 hover:text-blue-900 transition-colors">
            ← Back to ARG Academy Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
