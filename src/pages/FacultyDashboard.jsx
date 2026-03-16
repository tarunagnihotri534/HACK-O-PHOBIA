import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, LayoutDashboard, BookOpen, Users,
  CalendarDays, User, LogOut, Bell, Award,
  Cpu, Code2, Network, FlaskConical, BookMarked,
  Clock, CheckCircle2, Mail, Phone, MapPin,
  BadgeCheck, Building2, Star, TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Faculty Data ─────────────────────────────────────────────────────────────
const faculty = {
  name: 'Dr. Vikash Kumar Mishra',
  lCode: 'L100357',
  role: 'IEEE Branch Counselor',
  department: 'School of Computer Science and Engineering',
  phone: '7309222202',
  email: 'vikash.mishra@cumail.in',
  university: 'Chandigarh University',
  state: 'Uttar Pradesh',
  ieeeId: '95676415',
  branchCode: 'STB60237146',
  schoolCode: '60238559',
  avatar: 'V',
  designation: 'Associate Professor',
  experience: '12 Years',
  specialization: 'Machine Learning & AI',
};

const courses = [
  { code: 'CSE-301', name: 'Data Structures & Algorithms',   section: 'K23EW', students: 62, schedule: 'Mon/Wed/Fri 9:00 AM',  room: 'LT-204' },
  { code: 'CSE-401', name: 'Machine Learning',                section: 'K23FW', students: 55, schedule: 'Tue/Thu 11:00 AM',     room: 'LT-301' },
  { code: 'CSE-302', name: 'Operating Systems',               section: 'K23GW', students: 58, schedule: 'Mon/Wed 2:00 PM',      room: 'LT-107' },
  { code: 'CSE-501', name: 'Deep Learning & Neural Networks', section: 'K23HW', students: 45, schedule: 'Fri 3:00 PM',           room: 'LT-205' },
];

const recentStudents = [
  { name: 'Tarun Kumar Agnihotri', uid: '25BCS10478', course: 'CSE-301', cgpa: '8.74', status: 'Active' },
  { name: 'Priya Sharma',          uid: '25BCS10231', course: 'CSE-401', cgpa: '9.10', status: 'Active' },
  { name: 'Rahul Verma',           uid: '25BCS10089', course: 'CSE-301', cgpa: '7.82', status: 'Active' },
  { name: 'Sneha Gupta',           uid: '25BCS10567', course: 'CSE-302', cgpa: '8.45', status: 'Active' },
  { name: 'Amit Rajput',           uid: '25BCS10344', course: 'CSE-501', cgpa: '9.30', status: 'Active' },
];

const schedule = [
  { day: 'Monday',    slots: ['CSE-301 – 9:00 AM (LT-204)', 'CSE-302 – 2:00 PM (LT-107)'] },
  { day: 'Tuesday',   slots: ['CSE-401 – 11:00 AM (LT-301)'] },
  { day: 'Wednesday', slots: ['CSE-301 – 9:00 AM (LT-204)', 'CSE-302 – 2:00 PM (LT-107)'] },
  { day: 'Thursday',  slots: ['CSE-401 – 11:00 AM (LT-301)'] },
  { day: 'Friday',    slots: ['CSE-301 – 9:00 AM (LT-204)', 'CSE-501 – 3:00 PM (LT-205)'] },
];

// ─── Sidebar nav ─────────────────────────────────────────────────────────────
const navItems = [
  { id: 'overview',  label: 'Overview',    icon: LayoutDashboard },
  { id: 'courses',   label: 'My Courses',  icon: BookOpen        },
  { id: 'students',  label: 'Students',    icon: Users           },
  { id: 'schedule',  label: 'Schedule',    icon: CalendarDays    },
  { id: 'profile',   label: 'My Profile',  icon: User            },
];

// ─── Sections ─────────────────────────────────────────────────────────────────
const Overview = () => (
  <div className="space-y-6">
    {/* Stat cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Courses',       value: courses.length,                                          icon: BookOpen,    color: '#6366f1', bg: '#eef2ff' },
        { label: 'Total Students',value: courses.reduce((s, c) => s + c.students, 0),             icon: Users,       color: '#10b981', bg: '#ecfdf5' },
        { label: 'IEEE Member',   value: 'Active',                                                icon: BadgeCheck,  color: '#f59e0b', bg: '#fffbeb' },
        { label: 'Experience',    value: faculty.experience,                                      icon: TrendingUp,  color: '#e20000', bg: '#fff1f2' },
      ].map(({ label, value, icon: Icon, color, bg }) => (
        <motion.div key={label} whileHover={{ y: -3 }} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: bg }}>
            <Icon size={20} style={{ color }} />
          </div>
          <p className="text-2xl font-black text-gray-900">{value}</p>
          <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
        </motion.div>
      ))}
    </div>

    {/* IEEE Banner */}
    <div className="bg-gradient-to-r from-[#00629B] to-[#0085CA] rounded-2xl p-6 text-white">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <Award size={28} className="text-white" />
        </div>
        <div>
          <p className="font-black text-xl leading-none">IEEE Branch Counselor</p>
          <p className="text-white/70 text-sm mt-1">Chandigarh University – Uttar Pradesh Branch</p>
          <div className="flex flex-wrap gap-3 mt-3 text-xs font-bold">
            <span className="bg-white/20 px-3 py-1 rounded-full">ID: {faculty.ieeeId}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Branch: {faculty.branchCode}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">School: {faculty.schoolCode}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Today's classes */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-bold text-gray-800 mb-4">Today's Classes</h3>
      <div className="space-y-3">
        {courses.slice(0, 3).map((c) => (
          <div key={c.code} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <BookOpen size={18} className="text-indigo-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800">{c.name}</p>
              <p className="text-xs text-gray-400">{c.schedule} · {c.room} · {c.section}</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{c.students} students</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Courses = () => (
  <div className="space-y-4">
    {courses.map((c, i) => (
      <motion.div
        key={c.code}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
              <Cpu size={22} className="text-indigo-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-gray-400">{c.code}</span>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{c.section}</span>
              </div>
              <h3 className="font-bold text-gray-800 mt-0.5">{c.name}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Clock size={11} /> {c.schedule}</span>
                <span className="flex items-center gap-1"><Building2 size={11} /> {c.room}</span>
                <span className="flex items-center gap-1"><Users size={11} /> {c.students} Students</span>
              </div>
            </div>
          </div>
          <button className="shrink-0 bg-[#e20000] hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors">
            Manage
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

const Students = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-gray-800">Enrolled Students</h3>
        <p className="text-xs text-gray-400 mt-0.5">Total: {courses.reduce((s, c) => s + c.students, 0)} students across all courses</p>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            {['Student', 'UID', 'Course', 'CGPA', 'Status'].map((h) => (
              <th key={h} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {recentStudents.map((s, i) => (
            <motion.tr
              key={s.uid}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                    style={{ background: 'linear-gradient(135deg,#e20000,#ff6b6b)' }}>
                    {s.name[0]}
                  </div>
                  <span className="font-semibold text-gray-800">{s.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-mono text-xs text-gray-500 font-bold">{s.uid}</td>
              <td className="px-6 py-4 text-gray-600">{s.course}</td>
              <td className="px-6 py-4 font-bold text-gray-800">{s.cgpa}</td>
              <td className="px-6 py-4">
                <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full">{s.status}</span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Schedule = () => (
  <div className="space-y-4">
    {schedule.map((day, i) => (
      <motion.div
        key={day.day}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.07 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
      >
        <div className="flex items-start gap-4">
          <div className="w-20 shrink-0">
            <p className="text-sm font-black text-gray-800">{day.day}</p>
          </div>
          <div className="flex-1 space-y-2">
            {day.slots.map((slot) => (
              <div key={slot} className="flex items-center gap-3 bg-indigo-50 rounded-xl px-4 py-2.5">
                <CheckCircle2 size={15} className="text-indigo-400 shrink-0" />
                <span className="text-sm font-semibold text-indigo-700">{slot}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const Profile = () => (
  <div className="space-y-6">
    {/* Header card */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-white text-4xl font-black shrink-0"
          style={{ background: 'linear-gradient(135deg, #00629B, #0085CA)' }}
        >
          {faculty.avatar}
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">{faculty.name}</h2>
          <p className="text-gray-500 text-sm mt-1">{faculty.department}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {[faculty.role, faculty.designation, faculty.specialization, faculty.state].map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Detail grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        ['L-Code',         faculty.lCode],
        ['Designation',    faculty.designation],
        ['Department',     faculty.department],
        ['Specialization', faculty.specialization],
        ['Experience',     faculty.experience],
        ['University',     faculty.university],
        ['State',          faculty.state],
        ['Contact',        faculty.phone],
        ['Email',          faculty.email],
        ['IEEE Member ID', faculty.ieeeId],
        ['Branch Code',    faculty.branchCode],
        ['School Code',    faculty.schoolCode],
      ].map(([label, value]) => (
        <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-sm font-semibold text-gray-800">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const FacultyDashboard = () => {
  const [active, setActive] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const componentMap = {
    overview: Overview,
    courses:  Courses,
    students: Students,
    schedule: Schedule,
    profile:  Profile,
  };
  const sectionTitle = {
    overview: 'Overview',
    courses:  'My Courses',
    students: 'Students',
    schedule: 'Weekly Schedule',
    profile:  'My Profile',
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
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#00629B' }}>
            <GraduationCap size={22} className="text-white" />
          </div>
          <div>
            <p className="font-black text-gray-900 leading-none">CUIMS</p>
            <p className="text-[10px] text-gray-400 font-medium">Faculty Portal</p>
          </div>
        </div>

        {/* Faculty mini profile */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0"
              style={{ background: 'linear-gradient(135deg,#00629B,#0085CA)' }}>
              {faculty.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">{faculty.name}</p>
              <p className="text-[11px] text-gray-400 truncate">{faculty.lCode}</p>
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
                  ? 'text-white shadow-md'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
              style={active === id ? { background: '#00629B' } : {}}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6">
          <button
            onClick={() => navigate('/portal?portal=staff')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      {/* Backdrop mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
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
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#00629B' }}></span>
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

export default FacultyDashboard;
