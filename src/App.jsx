import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import PortalLogin from './pages/PortalLogin';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/portal" element={<PortalLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
