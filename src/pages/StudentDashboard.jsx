import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, LayoutDashboard, BookOpen, CalendarCheck,
  CalendarDays, User, LogOut, Bell, ChevronRight,
  TrendingUp, Award, Clock, CheckCircle2, XCircle,
  Trophy, Mic2, Laptop, Palette, FlaskConical, Music,
  FileText, Download, Eye, Search, Filter,
  Scroll, BadgeCheck, Receipt, FileCheck, ShieldCheck, BookMarked
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const student = {
  name: 'Tarun Kumar Agnihotri',
  uid: '25BCS' + '10478',          // Update with full UID when visible
  branch: 'B.Tech – Computer Science & Engineering',
  semester: '4th Semester',
  section: 'K23EW',
  batch: '2022–2026',
  cgpa: '8.74',
  avatar: 'T',
  fatherName: 'Sanjeev Kumar Agnihotri',
  motherName: 'Khushbu Agnihotri',
  phone: '9369803059',
  address: 'Azad Nagar, Hardoi, Uttar Pradesh – 241001',
  state: 'Uttar Pradesh',
};

const subjects = [
  { code: 'CSE-301', name: 'Data Structures & Algorithms', internal: 28, external: 62, total: 90, max: 100, grade: 'A+' },
  { code: 'CSE-302', name: 'Operating Systems',            internal: 24, external: 55, total: 79, max: 100, grade: 'A'  },
  { code: 'CSE-303', name: 'Database Management Systems',  internal: 26, external: 58, total: 84, max: 100, grade: 'A+' },
  { code: 'MTH-201', name: 'Discrete Mathematics',         internal: 22, external: 48, total: 70, max: 100, grade: 'B+' },
  { code: 'CSE-304', name: 'Computer Networks',            internal: 25, external: 60, total: 85, max: 100, grade: 'A+' },
  { code: 'CSE-305', name: 'Software Engineering',         internal: 27, external: 56, total: 83, max: 100, grade: 'A'  },
];

const attendance = [
  { code: 'CSE-301', name: 'DSA',              total: 42, attended: 39 },
  { code: 'CSE-302', name: 'OS',               total: 38, attended: 32 },
  { code: 'CSE-303', name: 'DBMS',             total: 40, attended: 38 },
  { code: 'MTH-201', name: 'Discrete Maths',   total: 35, attended: 28 },
  { code: 'CSE-304', name: 'Networks',          total: 42, attended: 40 },
  { code: 'CSE-305', name: 'Software Engg.',    total: 36, attended: 34 },
];

const events = [
  { id: 1, title: 'Hackathon – HACK O PHOBIA 3.0', date: 'Mar 22, 2026', time: '9:00 AM', venue: 'CU Tech Hub', icon: Laptop,   color: '#6366f1', tag: 'Technical'   },
  { id: 2, title: 'Annual Cultural Fest – UTSAV',   date: 'Apr 5, 2026',  time: '6:00 PM', venue: 'CU Amphitheatre', icon: Music,    color: '#ec4899', tag: 'Cultural'    },
  { id: 3, title: 'Science & Innovation Expo',       date: 'Apr 12, 2026', time: '10:00 AM',venue: 'CU Exhibition Hall', icon: FlaskConical,color:'#f59e0b', tag: 'Science'     },
  { id: 4, title: 'TEDx Chandigarh University',      date: 'Apr 20, 2026', time: '11:00 AM',venue: 'CU Auditorium', icon: Mic2, color: '#e20000',   tag: 'Talk'        },
  { id: 5, title: 'Inter-University Sports Meet',    date: 'May 3, 2026',  time: '8:00 AM', venue: 'CU Sports Complex', icon: Trophy,   color: '#10b981', tag: 'Sports'      },
  { id: 6, title: 'Art & Design Exhibition',         date: 'May 10, 2026', time: '2:00 PM', venue: 'CU Gallery', icon: Palette,    color: '#8b5cf6', tag: 'Arts'        },
];

const documents = [
  // Scholarship
  { id: 1,  category: 'Scholarship', title: 'Merit Scholarship Application Form',       desc: 'Apply for merit-based scholarship for Even Semester 2025-26',  icon: Scroll,      color: '#6366f1', status: 'Open',   deadline: 'Mar 31, 2026', size: '245 KB' },
  { id: 2,  category: 'Scholarship', title: 'Sports Scholarship Form',                  desc: 'For students representing CU in inter-university sports events', icon: Scroll,      color: '#6366f1', status: 'Open',   deadline: 'Apr 10, 2026', size: '198 KB' },
  { id: 3,  category: 'Scholarship', title: 'Need-Based Financial Aid Form',            desc: 'Apply for financial assistance based on family income',         icon: Scroll,      color: '#6366f1', status: 'Closed', deadline: 'Feb 15, 2026', size: '312 KB' },
  // Fee
  { id: 4,  category: 'Fee',         title: 'Fee Receipt – Semester 4',                desc: 'Official fee payment receipt for Even Semester 2025-26',        icon: Receipt,     color: '#10b981', status: 'Ready',  deadline: null,            size: '156 KB' },
  { id: 5,  category: 'Fee',         title: 'Fee Receipt – Semester 3',                desc: 'Official fee payment receipt for Odd Semester 2025-26',         icon: Receipt,     color: '#10b981', status: 'Ready',  deadline: null,            size: '148 KB' },
  { id: 6,  category: 'Fee',         title: 'Hostel Fee Receipt',                       desc: 'Hostel accommodation fee for current academic year',            icon: Receipt,     color: '#10b981', status: 'Ready',  deadline: null,            size: '120 KB' },
  // Certificates
  { id: 7,  category: 'Certificate', title: 'Bonafide Certificate',                    desc: 'Confirms enrollment at Chandigarh University',                  icon: BadgeCheck,  color: '#f59e0b', status: 'Ready',  deadline: null,            size: '89 KB'  },
  { id: 8,  category: 'Certificate', title: 'Character Certificate',                   desc: 'Certificate of good conduct issued by the institution',         icon: ShieldCheck, color: '#f59e0b', status: 'Ready',  deadline: null,            size: '92 KB'  },
  { id: 9,  category: 'Certificate', title: 'Migration Certificate',                   desc: 'Required for students transferring from another university',     icon: FileCheck,   color: '#f59e0b', status: 'Apply', deadline: 'Rolling',       size: '—'      },
  // Academic
  { id: 10, category: 'Academic',    title: 'Semester 3 Marksheet',                    desc: 'Official marksheet for Odd Semester 2024-25',                   icon: BookMarked,  color: '#e20000', status: 'Ready',  deadline: null,            size: '210 KB' },
  { id: 11, category: 'Academic',    title: 'Semester 2 Marksheet',                    desc: 'Official marksheet for Even Semester 2023-24',                  icon: BookMarked,  color: '#e20000', status: 'Ready',  deadline: null,            size: '205 KB' },
  { id: 12, category: 'Academic',    title: 'Provisional Degree Form',                 desc: 'Apply for provisional degree certificate upon completion',       icon: FileText,    color: '#e20000', status: 'Locked', deadline: 'Final Yr only', size: '—'      },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const gradeColor = (g) => ({
  'A+': 'text-emerald-600 bg-emerald-50',
  'A':  'text-blue-600 bg-blue-50',
  'B+': 'text-amber-600 bg-amber-50',
  'B':  'text-orange-600 bg-orange-50',
}[g] || 'text-gray-600 bg-gray-100');

const AttBar = ({ pct }) => {
  const color = pct >= 75 ? '#10b981' : pct >= 65 ? '#f59e0b' : '#ef4444';
  return (
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ background: color }}
        className="h-full rounded-full"
      />
    </div>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const navItems = [
  { id: 'overview',    label: 'Overview',     icon: LayoutDashboard },
  { id: 'marks',       label: 'Marks',        icon: BookOpen        },
  { id: 'attendance',  label: 'Attendance',   icon: CalendarCheck   },
  { id: 'documents',   label: 'Documents',    icon: FileText        },
  { id: 'events',      label: 'Events',       icon: CalendarDays    },
  { id: 'profile',     label: 'My Profile',   icon: User            },
];

// ─── Sections ─────────────────────────────────────────────────────────────────
const Overview = () => {
  const avgAtt = Math.round(
    attendance.reduce((s, a) => s + (a.attended / a.total) * 100, 0) / attendance.length
  );
  const avgMarks = Math.round(
    subjects.reduce((s, sub) => s + (sub.total / sub.max) * 100, 0) / subjects.length
  );
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'CGPA',          value: student.cgpa, icon: Award,       color: '#6366f1', bg: '#eef2ff' },
          { label: 'Avg. Marks',    value: `${avgMarks}%`, icon: TrendingUp, color: '#10b981', bg: '#ecfdf5' },
          { label: 'Attendance',    value: `${avgAtt}%`,  icon: CalendarCheck,color:'#f59e0b', bg: '#fffbeb' },
          { label: 'Semester',      value: student.semester.split(' ')[0], icon: Clock, color: '#e20000', bg: '#fff1f2' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <motion.div
            key={label}
            whileHover={{ y: -3 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900">{value}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick marks preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Subject Performance</h3>
        <div className="space-y-3">
          {subjects.map((s) => (
            <div key={s.code} className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-400 w-20 shrink-0">{s.code}</span>
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.total / s.max) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: s.total >= 85 ? '#10b981' : s.total >= 70 ? '#6366f1' : '#f59e0b' }}
                />
              </div>
              <span className="text-sm font-bold text-gray-700 w-10 text-right">{s.total}</span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${gradeColor(s.grade)}`}>{s.grade}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming events mini */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events.slice(0, 3).map((ev) => {
            const Icon = ev.icon;
            return (
              <div key={ev.id} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: ev.color + '18' }}>
                  <Icon size={18} style={{ color: ev.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{ev.title}</p>
                  <p className="text-xs text-gray-400">{ev.date} · {ev.venue}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 shrink-0" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Marks = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="px-6 py-5 border-b border-gray-100">
      <h3 className="font-bold text-gray-800">Marks Card – Semester 4</h3>
      <p className="text-xs text-gray-400 mt-0.5">Internal: 30 max · External: 70 max · Total: 100</p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            {['Subject Code', 'Subject Name', 'Internal', 'External', 'Total', 'Grade'].map((h) => (
              <th key={h} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {subjects.map((s, i) => (
            <motion.tr
              key={s.code}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 font-mono text-xs text-gray-500 font-bold">{s.code}</td>
              <td className="px-6 py-4 font-medium text-gray-800">{s.name}</td>
              <td className="px-6 py-4 text-gray-600">{s.internal}<span className="text-gray-300">/30</span></td>
              <td className="px-6 py-4 text-gray-600">{s.external}<span className="text-gray-300">/70</span></td>
              <td className="px-6 py-4 font-bold text-gray-800">{s.total}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-black ${gradeColor(s.grade)}`}>{s.grade}</span>
              </td>
            </motion.tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50 border-t-2 border-gray-200">
            <td colSpan={4} className="px-6 py-4 font-bold text-gray-700">Aggregate</td>
            <td className="px-6 py-4 font-black text-gray-900">
              {subjects.reduce((s, sub) => s + sub.total, 0)}
              <span className="text-gray-400 font-normal">/{subjects.length * 100}</span>
            </td>
            <td className="px-6 py-4">
              <span className="text-emerald-600 font-black">CGPA {student.cgpa}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);

const Attendance = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: 'Classes Attended', value: attendance.reduce((s, a) => s + a.attended, 0), color: '#10b981', bg: '#ecfdf5' },
        { label: 'Total Classes',    value: attendance.reduce((s, a) => s + a.total, 0),    color: '#6366f1', bg: '#eef2ff' },
        { label: 'Avg Attendance',
          value: `${Math.round(attendance.reduce((s, a) => s + (a.attended / a.total) * 100, 0) / attendance.length)}%`,
          color: '#f59e0b', bg: '#fffbeb' },
      ].map(({ label, value, color, bg }) => (
        <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black shrink-0" style={{ background: bg, color }}>
            {value}
          </div>
          <p className="text-sm font-semibold text-gray-600">{label}</p>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-bold text-gray-800 mb-5">Subject-wise Attendance</h3>
      <div className="space-y-5">
        {attendance.map((a) => {
          const pct = Math.round((a.attended / a.total) * 100);
          const color = pct >= 75 ? '#10b981' : pct >= 65 ? '#f59e0b' : '#ef4444';
          const statusIcon = pct >= 75
            ? <CheckCircle2 size={16} className="text-emerald-500" />
            : <XCircle size={16} className="text-red-400" />;
          return (
            <div key={a.code}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {statusIcon}
                  <span className="text-sm font-semibold text-gray-700">{a.name}</span>
                  <span className="text-xs text-gray-400">{a.code}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{a.attended}/{a.total} classes</span>
                  <span className="font-black text-sm" style={{ color }}>{pct}%</span>
                </div>
              </div>
              <AttBar pct={pct} />
              {pct < 75 && (
                <p className="text-xs text-red-400 mt-1">
                  ⚠ Need {Math.max(0, Math.ceil((0.75 * a.total - a.attended) / 0.25))} more classes to reach 75%
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const Documents = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const categories = ['All', 'Scholarship', 'Fee', 'Certificate', 'Academic'];

  const statusStyle = {
    Open:   { bg: '#ecfdf5', color: '#10b981', label: '● Open'   },
    Ready:  { bg: '#eef2ff', color: '#6366f1', label: '✓ Ready'  },
    Closed: { bg: '#fef2f2', color: '#ef4444', label: '✕ Closed' },
    Apply:  { bg: '#fffbeb', color: '#f59e0b', label: '→ Apply'  },
    Locked: { bg: '#f3f4f6', color: '#9ca3af', label: '🔒 Locked' },
  };

  const filtered = documents.filter(d => {
    const matchCat = filter === 'All' || d.category === filter;
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
                        d.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-5">
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-red-400 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-[#e20000] text-white shadow-md shadow-red-200'
                  : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Open scholarships banner */}
      {filter === 'All' || filter === 'Scholarship' ? (
        <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Scroll size={20} className="text-white" />
            </div>
            <div>
              <p className="font-black text-lg leading-none">Scholarships Open!</p>
              <p className="text-white/70 text-xs mt-0.5">2 scholarships accepting applications. Last date: Apr 10, 2026</p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Document cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-16 text-gray-400">
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No documents found</p>
          </div>
        ) : filtered.map((doc, i) => {
          const Icon = doc.icon;
          const st = statusStyle[doc.status];
          const canDownload = doc.status === 'Ready';
          const canView = doc.status === 'Ready' || doc.status === 'Open';

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: doc.color + '15' }}>
                  <Icon size={22} style={{ color: doc.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-gray-800 leading-snug">{doc.title}</h4>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: st.bg, color: st.color }}>
                      {st.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{doc.desc}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-400">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full font-medium">{doc.category}</span>
                    {doc.deadline && <span>📅 {doc.deadline}</span>}
                    {doc.size !== '—' && <span>📄 {doc.size}</span>}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {canView && (
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={() => alert(`Opening: ${doc.title}`)}
                  >
                    <Eye size={13} /> View
                  </button>
                )}
                {canDownload ? (
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-[#e20000] text-white hover:bg-red-700 transition-colors shadow-sm shadow-red-200"
                    onClick={() => alert(`Downloading: ${doc.title}`)}
                  >
                    <Download size={13} /> Download
                  </button>
                ) : doc.status === 'Open' || doc.status === 'Apply' ? (
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-[#6366f1] text-white hover:bg-indigo-700 transition-colors"
                    onClick={() => alert(`Opening application: ${doc.title}`)}
                  >
                    <FileText size={13} /> Apply Now
                  </button>
                ) : (
                  <button disabled className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-gray-100 text-gray-400 cursor-not-allowed">
                    {doc.status === 'Locked' ? '🔒 Not Available' : '✕ Closed'}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Events = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {events.map((ev, i) => {
      const Icon = ev.icon;
      return (
        <motion.div
          key={ev.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: ev.color + '18' }}>
              <Icon size={24} style={{ color: ev.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: ev.color + '18', color: ev.color }}>
                  {ev.tag}
                </span>
              </div>
              <h4 className="font-bold text-gray-800 leading-snug">{ev.title}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <CalendarDays size={12} /> {ev.date} · {ev.time}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  📍 {ev.venue}
                </p>
              </div>
            </div>
          </div>
          <button
            className="mt-4 w-full py-2 rounded-xl text-xs font-bold transition-all border"
            style={{ borderColor: ev.color, color: ev.color }}
            onMouseEnter={(e) => { e.currentTarget.style.background = ev.color; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = ev.color; }}
          >
            Register / Know More
          </button>
        </motion.div>
      );
    })}
  </div>
);

const Profile = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-white text-4xl font-black shrink-0"
          style={{ background: 'linear-gradient(135deg, #e20000, #ff6b6b)' }}
        >
          {student.avatar}
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">{student.name}</h2>
          <p className="text-gray-500 text-sm mt-1">{student.branch}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {[student.semester, student.section, student.batch, student.state].map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        ['University ID',    student.uid],
        ['Course',           'B.Tech – CSE'],
        ['Semester',         student.semester],
        ['Section',          student.section],
        ['Batch',            student.batch],
        ['CGPA',             student.cgpa],
        ['Father\'s Name',   student.fatherName],
        ['Mother\'s Name',   student.motherName],
        ['Contact',          student.phone],
        ['Address',          student.address],
        ['State',            student.state],
        ['Email',            `tarun.agnihotri@cumail.in`],
      ].map(([label, value]) => (
        <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-sm font-semibold text-gray-800">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const StudentDashboard = () => {
  const [active, setActive] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const componentMap = {
    overview:   Overview,
    marks:      Marks,
    attendance: Attendance,
    documents:  Documents,
    events:     Events,
    profile:    Profile,
  };
  const sectionTitle = {
    overview:   'Overview',
    marks:      'Marks Card',
    attendance: 'Attendance',
    documents:  'Documents & Forms',
    events:     'University Events',
    profile:    'My Profile',
  };
  const ActiveSection = componentMap[active];

  return (
    <div className="flex min-h-screen bg-[#f5f6fa] font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#e20000] flex items-center justify-center">
            <GraduationCap size={22} className="text-white" />
          </div>
          <div>
            <p className="font-black text-gray-900 leading-none">CUIMS</p>
            <p className="text-[10px] text-gray-400 font-medium">Student Portal</p>
          </div>
        </div>

        {/* Student mini profile */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0"
              style={{ background: 'linear-gradient(135deg,#e20000,#ff6b6b)' }}>
              {student.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">{student.name}</p>
              <p className="text-[11px] text-gray-400 truncate">{student.uid}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActive(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                ${active === id
                  ? 'bg-[#e20000] text-white shadow-md shadow-red-200'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6">
          <button
            onClick={() => navigate('/portal?portal=student')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      {/* Backdrop (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
              </svg>
            </button>
            <div>
              <h1 className="font-black text-gray-900 text-lg leading-none">{sectionTitle[active]}</h1>
              <p className="text-xs text-gray-400 mt-0.5">Academic Year 2025–26 · Even Semester</p>
            </div>
          </div>
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e20000] rounded-full"></span>
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ActiveSection />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
