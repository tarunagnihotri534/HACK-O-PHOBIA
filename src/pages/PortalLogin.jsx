import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, IdCard, Lock, ArrowRight, UserPlus, User } from 'lucide-react';

const portalTitles = {
  student: { heading: 'Student Login', sub: 'Login with your UID and Password' },
  lms:     { heading: 'LMS Login',     sub: 'Login with your UID / EmployeeID' },
  staff:   { heading: 'Staff Login',   sub: 'Login with your Employee Code' },
};

const PortalLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const portal = searchParams.get('portal') || 'student';
  const { heading, sub } = portalTitles[portal] || portalTitles.student;

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [loginData, setLoginData] = useState({ uid: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', uid: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.uid || !loginData.password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    if (portal === 'student') {
      navigate('/student-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.uid || !signupData.password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setMode('login');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #dce8f5 0%, #e8d8f0 50%, #f5dce8 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
        style={{ padding: '40px 36px 36px' }}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-3">
            <GraduationCap size={36} className="text-[#e20000]" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{heading}</h2>
          <p className="text-sm text-gray-400 mt-0.5">{sub}</p>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          {['login', 'signup'].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all duration-300 capitalize ${
                mode === m
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {m === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-red-500 mb-3 text-center">{error}</p>
        )}

        {/* Forms */}
        <AnimatePresence mode="wait">
          {mode === 'login' ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              {/* UID */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-red-400 transition-colors">
                <IdCard size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="University ID"
                  value={loginData.uid}
                  onChange={(e) => setLoginData({ ...loginData, uid: e.target.value })}
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Password */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-red-400 transition-colors">
                <Lock size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#e20000] hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 mt-2"
              >
                Login <ArrowRight size={16} />
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSignup}
              className="space-y-4"
            >
              {/* Full Name */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-red-400 transition-colors">
                <User size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* UID */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-red-400 transition-colors">
                <IdCard size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="University ID"
                  value={signupData.uid}
                  onChange={(e) => setSignupData({ ...signupData, uid: e.target.value })}
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Password */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-red-400 transition-colors">
                <Lock size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#e20000] hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 mt-2"
              >
                Sign Up <UserPlus size={16} />
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Back link */}
        <p className="text-center text-xs text-gray-400 mt-5">
          <button
            onClick={() => navigate('/')}
            className="hover:text-gray-600 underline underline-offset-2 transition-colors"
          >
            ← Back to portal selection
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default PortalLogin;
