import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserRound, GraduationCap, UsersRound, CloudRain, CloudSun, Cloud, Sun } from 'lucide-react';

const LoginCard = ({ icon: Icon, title, description, customIcon, portalKey }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-[28px] p-8 shadow-2xl flex flex-col w-full max-w-[280px] min-h-[420px] relative z-20"
    >
      <div className="mb-4 flex flex-col items-center justify-center h-28">
        {customIcon ? customIcon : <Icon size={72} strokeWidth={1.2} className="text-black" />}
      </div>

      <h3 className="text-[22px] font-bold text-black text-center mb-4">{title}</h3>

      <p className="text-gray-600 text-[14px] leading-[1.4] mb-auto text-left font-medium">
        {description}
      </p>

      <div className="mt-6">
        <button
          onClick={() => navigate(`/portal?portal=${portalKey}`)}
          className="bg-[#e20000] hover:bg-red-700 text-white font-bold py-2.5 px-8 rounded-full transition-colors duration-300 w-max mx-auto block"
        >
          Login Now
        </button>
      </div>
    </motion.div>
  );
};

const LoginPage = () => {
  const loginTypes = [
    {
      icon: UserRound,
      title: "Student/Parent Login",
      portalKey: "student",
      description: "Login with your UID and Password to access your Student Services and Account. The CUIMS will keep a record of your progress and keep you apprised of the latest updates."
    },
    {
      icon: UsersRound,
      title: "Staff Login",
      portalKey: "staff",
      description: "Login using your Employee Code and Password to access your account, keep track of your progress and other official services."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col pt-12">
      {/* Top Section */}
      <div className="flex flex-col items-center justify-center pt-8 pb-32">
        <div className="flex items-center">
          <div className="w-[100px] h-[70px] bg-[#e20000] rounded-[50%] flex items-center justify-center text-white font-bold text-5xl mr-2 shadow-inner shadow-red-900 border-2 border-red-600">
            CU
          </div>
          <div className="flex flex-col">
            <span className="text-[54px] font-black tracking-tighter text-black leading-none uppercase mb-1">IMS</span>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-black leading-none uppercase tracking-[0.2em]">Chandigarh University</span>
              <span className="text-[7.5px] font-bold text-black leading-none uppercase tracking-[0.05em] mt-0.5">Information Management System</span>
            </div>
          </div>
        </div>
      </div>

      {/* Red Background Section with Cards */}
      <div className="relative bg-[#ed1c24] flex-grow">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-6 -translate-y-36">
            {loginTypes.map((type, index) => (
              <LoginCard
                key={index}
                icon={type.icon}
                customIcon={type.customIcon}
                title={type.title}
                description={type.description}
                portalKey={type.portalKey}
              />
            ))}
          </div>

          {/* Weather Section */}
          <div className="pb-16 -mt-20 flex flex-col md:flex-row items-center justify-between text-white max-w-4xl mx-auto w-full">
            <div className="flex items-center space-x-6">
              <div className="text-right leading-tight">
                <div className="text-[15px] font-black">GHARUAN</div>
                <div className="text-[15px] font-black">WEATHER</div>
              </div>
              <CloudSun size={56} strokeWidth={1.5} />
              <div className="leading-tight">
                <div className="text-4xl font-normal">28°C</div>
                <div className="text-[13px] font-medium tracking-wide">few clouds</div>
              </div>
            </div>

            <div className="flex space-x-6 mt-10 md:mt-0 text-[13px] font-medium">
              <div className="flex flex-col items-center">
                <span className="mb-3">Monday</span>
                <CloudRain size={28} strokeWidth={1.5} className="mb-3" />
                <div>29°C <span className="opacity-80">14°C</span></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-3">Tuesday</span>
                <CloudSun size={28} strokeWidth={1.5} className="mb-3 text-white" />
                <div>29°C <span className="opacity-80">12°C</span></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-3">Wednesday</span>
                <Cloud size={28} strokeWidth={1.5} className="mb-3" />
                <div>32°C <span className="opacity-80">18°C</span></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-3">Thursday</span>
                <Cloud size={28} strokeWidth={1.5} className="mb-3" />
                <div>32°C <span className="opacity-80">20°C</span></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-3">Friday</span>
                <CloudRain size={28} strokeWidth={1.5} className="mb-3" />
                <div>25°C <span className="opacity-80">16°C</span></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-3">Saturday</span>
                <Sun size={28} strokeWidth={1.5} className="mb-3" />
                <div>30°C <span className="opacity-80">13°C</span></div>
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-3">Sunday</span>
                <Cloud size={28} strokeWidth={1.5} className="mb-3" />
                <div>31°C <span className="opacity-80">17°C</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
