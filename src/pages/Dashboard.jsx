import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Zap, Award, Clock, ArrowUpRight } from 'lucide-react';

const StatCard = ({ icon, label, value, trend }) => (
  <div className="glass p-6 rounded-2xl border border-white/10">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
        {icon}
      </div>
      <span className="flex items-center text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full">
        <ArrowUpRight size={14} className="mr-1" /> {trend}
      </span>
    </div>
    <p className="text-gray-400 text-sm mb-1">{label}</p>
    <h3 className="text-3xl font-bold text-white">{value}</h3>
  </div>
);

const Dashboard = () => {
  return (
    <div className="pt-24 min-h-screen px-6">
      <div className="container mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Participant Dashboard</h1>
          <p className="text-gray-400">Track your progress and competition stats in real-time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<Users size={24} />} label="Total Teams" value="124" trend="12%" />
          <StatCard icon={<Zap size={24} />} label="Projects Submited" value="86" trend="24%" />
          <StatCard icon={<Clock size={24} />} label="Time Remaining" value="32h:45m" trend="Live" />
          <StatCard icon={<Award size={24} />} label="Prize Pool" value="$10,000" trend="Fixed" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass rounded-3xl border border-white/10 p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">Project Analytics</h3>
              <select className="bg-slate-800 border-white/5 text-gray-400 rounded-lg px-4 py-2 text-sm">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 70, 45, 90, 65, 80, 50, 95, 75, 60, 85, 40].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 0.8 }}
                  className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-md opacity-80 hover:opacity-100 transition-opacity"
                ></motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-500 uppercase tracking-widest px-2">
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>00:00</span>
              <span>04:00</span>
            </div>
          </div>

          <div className="glass rounded-3xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { user: "Alex Chen", action: "registered Team 'CyberSass'", time: "2m ago" },
                { user: "Sarah J.", action: "uploaded a new project", time: "15m ago" },
                { user: "Team Alpha", action: "joined the AI track", time: "1h ago" },
                { user: "Marco Rossi", action: "asked a mentor", time: "3h ago" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-sm font-bold text-blue-400 border border-white/5">
                    {item.user[0]}
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm leading-snug">
                      <span className="text-white font-bold">{item.user}</span> {item.action}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
