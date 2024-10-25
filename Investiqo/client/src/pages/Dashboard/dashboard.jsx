import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Home, FileText, Book, TrendingUp, User, Bell, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop';

const quizData = [
    { name: 'Quiz 1', score: 80 },
    { name: 'Quiz 2', score: 65 },
    { name: 'Quiz 3', score: 90 },
    { name: 'Quiz 4', score: 75 },
  ];
  
  const mockInterviewData = [
    { name: 'Interview 1', score: 70 },
    { name: 'Interview 2', score: 75 },
    { name: 'Interview 3', score: 85 },
    { name: 'Interview 4', score: 80 },
  ];
  
  const skillsData = [
    { name: 'React', value: 80 },
    { name: 'Node.js', value: 65 },
    { name: 'Python', value: 75 },
    { name: 'SQL', value: 70 },
  ];
  
  const learningProgressData = [
    { name: 'Week 1', progress: 20 },
    { name: 'Week 2', progress: 35 },
    { name: 'Week 3', progress: 50 },
    { name: 'Week 4', progress: 70 },
    { name: 'Week 5', progress: 85 },
    { name: 'Week 6', progress: 95 },
  ];
  
  const performanceData = [
    { subject: 'Coding', A: 120, B: 110, fullMark: 150 },
    { subject: 'System Design', A: 98, B: 130, fullMark: 150 },
    { subject: 'Algorithms', A: 86, B: 130, fullMark: 150 },
    { subject: 'Databases', A: 99, B: 100, fullMark: 150 },
    { subject: 'Networking', A: 85, B: 90, fullMark: 150 },
    { subject: 'Security', A: 65, B: 85, fullMark: 150 },
  ];
  


const Navbar = () => {
  <ScrollToTop/>
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
    <div className="flex items-end space-x-4">
      <div className="text-2xl font-extrabold text-left text-purple-600">
        <Link to="/">
          Interwin
        </Link>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <Bell className="w-6 h-6 text-gray-600 hover:text-indigo-600 cursor-pointer" />
      <Settings className="w-6 h-6 text-gray-600 hover:text-indigo-600 cursor-pointer" />
      <div className="relative">
        <img src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20image-rendering%3D%22optimizeQuality%22%20shape-rendering%3D%22geometricPrecision%22%20text-rendering%3D%22geometricPrecision%22%20viewBox%3D%220%200%20850%20850%22%3E%3Ccircle%20cx%3D%22425%22%20cy%3D%22425%22%20r%3D%22425%22%20fill%3D%22%234a7b5d%22%2F%3E%3Cpath%20fill%3D%22%23ffd8c4%22%20d%3D%22M482%20469c-3%2C0%20-6%2C-3%20-6%2C-6l0%20-2%20-51%20118%20-47%20-117%200%201c0%2C3%20-2%2C6%20-6%2C6%20-3%2C0%20-6%2C-3%20-6%2C-6l0%20-34c0%2C-2%202%2C-4%204%2C-5%202%2C-1%204%2C-1%206%2C0%2015%2C12%2033%2C18%2051%2C18%2019%2C0%2037%2C-6%2052%2C-18%201%2C-1%204%2C-1%206%2C0%202%2C1%203%2C3%203%2C5l0%2034c0%2C3%20-2%2C6%20-6%2C6z%22%2F%3E%3Cpath%20fill%3D%22%23ffe1d2%22%20d%3D%22M428%20453c-23%2C0%20-45%2C-7%20-62%2C-21%20-16%2C-13%20-28%2C-31%20-33%2C-50l-6%200c-3%2C0%20-6%2C-3%20-6%2C-6l0%20-35c0%2C-4%203%2C-6%206%2C-6l2%200%200%20-16c0%2C-3%203%2C-6%206%2C-6%20-2%2C-25%20-6%2C-121%2048%2C-101%2036%2C15%2053%2C4%2064%2C-3%207%2C-4%2012%2C-7%2017%2C-2%2014%2C14%2046%2C62%2046%2C62l0%200%209%2044c0%2C0%201%2C0%201%2C0%204%2C0%206%2C2%206%2C6l0%2016%203%200c3%2C0%206%2C2%206%2C6l0%2035c0%2C3%20-3%2C6%20-6%2C6l-6%200c-6%2C19%20-17%2C37%20-33%2C50%20-18%2C14%20-40%2C21%20-62%2C21z%22%2F%3E%3Cpath%20fill%3D%22%236a4322%22%20d%3D%22M520%20325c-2%2C0%20-5%2C-2%20-6%2C-4%20-9%2C-42%20-40%2C-78%20-72%2C-85%20-21%2C-4%20-39%2C4%20-54%2C24%20-1%2C2%20-4%2C3%20-6%2C2%20-3%2C-1%20-5%2C-3%20-5%2C-6l0%20-17c-4%2C3%20-10%2C8%20-15%2C14%20-15%2C17%20-22%2C39%20-21%2C65%201%2C4%20-2%2C6%20-5%2C7%20-3%2C0%20-6%2C-3%20-7%2C-6%200%2C-8%200%2C-16%201%2C-23%200%2C-1%200%2C-1%200%2C-1l4%20-65%20-13%200c-2%2C0%20-4%2C-2%20-5%2C-3%20-1%2C-2%20-1%2C-5%200%2C-6%2016%2C-28%2036%2C-45%2060%2C-50%2032%2C-7%2060%2C8%2069%2C14%208%2C-3%2032%2C-8%2052%2C5%2016%2C9%2025%2C26%2028%2C50%200%2C0%200%2C0%200%2C1l1%2078c0%2C0%200%2C0%200%2C0%200%2C3%20-2%2C5%20-4%2C6%20-1%2C0%20-1%2C0%20-2%2C0z%22%2F%3E%3Cpath%20fill%3D%22%23e0a99c%22%20d%3D%22M586%20681l-322%200c-10%2C0%20-19%2C-8%20-19%2C-19l0%20-93c0%2C-62%2051%2C-112%20113%2C-112%2045%2C0%2091%2C0%20134%2C0%2062%2C0%20113%2C50%20113%2C112l0%2093c0%2C11%20-9%2C19%20-19%2C19z%22%2F%3E%3Cpath%20fill%3D%22%23c48f83%22%20d%3D%22M535%20681l-12%200%200-95c0-4%203-6%206-6%203%200%206%202%206%206l0%2095zm-208%200l-12%200%200-95c0-4%203-6%206-6%203%200%206%202%206%206l0%2095zM364%20457c41%200%2082%200%20122%200%200%200%200%200-1%201l-57%20139c-1%202-3%203-5%203%200%200%200%200%200%200-3%200-5-1-6-4l-53-138c0-1%200-1%200-1z%22%2F%3E%3C%2Fsvg%3E" alt="Profile" className="w-8 h-8 rounded-full cursor-pointer" />
      </div>
    </div>
  </nav>
);
};


const Sidebar = () => {
  const menuItems = [
    { icon: Home, text: 'Mock Interview' },
    { icon: FileText, text: 'Quizzes Attempted' },
    { icon: Book, text: 'History' },
    { icon: TrendingUp, text: 'Analytics' },
    
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-600 to-indigo-800 text-white p-6 fixed left-0 top-0">
      <div className="flex items-center mb-8">
        <img
          src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20image-rendering%3D%22optimizeQuality%22%20shape-rendering%3D%22geometricPrecision%22%20text-rendering%3D%22geometricPrecision%22%20viewBox%3D%220%200%20850%20850%22%3E%3Ccircle%20cx%3D%22425%22%20cy%3D%22425%22%20r%3D%22425%22%20fill%3D%22%234a7b5d%22%2F%3E%3Cpath%20fill%3D%22%23ffd8c4%22%20d%3D%22M482%20469c-3%2C0%20-6%2C-3%20-6%2C-6l0%20-2%20-51%20118%20-47%20-117%200%201c0%2C3%20-2%2C6%20-6%2C6%20-3%2C0%20-6%2C-3%20-6%2C-6l0%20-34c0%2C-2%202%2C-4%204%2C-5%202%2C-1%204%2C-1%206%2C0%2015%2C12%2033%2C18%2051%2C18%2019%2C0%2037%2C-6%2052%2C-18%201%2C-1%204%2C-1%206%2C0%202%2C1%203%2C3%203%2C5l0%2034c0%2C3%20-2%2C6%20-6%2C6z%22%2F%3E%3Cpath%20fill%3D%22%23ffe1d2%22%20d%3D%22M428%20453c-23%2C0%20-45%2C-7%20-62%2C-21%20-16%2C-13%20-28%2C-31%20-33%2C-50l-6%200c-3%2C0%20-6%2C-3%20-6%2C-6l0%20-35c0%2C-4%203%2C-6%206%2C-6l2%200%200%20-16c0%2C-3%203%2C-6%206%2C-6%20-2%2C-25%20-6%2C-121%2048%2C-101%2036%2C15%2053%2C4%2064%2C-3%207%2C-4%2012%2C-7%2017%2C-2%2014%2C14%2046%2C62%2046%2C62l0%200%209%2044c0%2C0%201%2C0%201%2C0%204%2C0%206%2C2%206%2C6l0%2016%203%200c3%2C0%206%2C2%206%2C6l0%2035c0%2C3%20-3%2C6%20-6%2C6l-6%200c-6%2C19%20-17%2C37%20-33%2C50%20-18%2C14%20-40%2C21%20-62%2C21z%22%2F%3E%3Cpath%20fill%3D%22%236a4322%22%20d%3D%22M520%20325c-2%2C0%20-5%2C-2%20-6%2C-4%20-9%2C-42%20-40%2C-78%20-72%2C-85%20-21%2C-4%20-39%2C4%20-54%2C24%20-1%2C2%20-4%2C3%20-6%2C2%20-3%2C-1%20-5%2C-3%20-5%2C-6l0%20-17c-4%2C3%20-10%2C8%20-15%2C14%20-15%2C17%20-22%2C39%20-21%2C65%201%2C4%20-2%2C6%20-5%2C7%20-3%2C0%20-6%2C-3%20-7%2C-6%200%2C-8%200%2C-16%201%2C-23%200%2C-1%200%2C-1%200%2C-1l4%20-65%20-13%200c-2%2C0%20-4%2C-2%20-5%2C-3%20-1%2C-2%20-1%2C-5%200%2C-6%2016%2C-28%2036%2C-45%2060%2C-50%2032%2C-7%2060%2C8%2069%2C14%208%2C-3%2032%2C-8%2052%2C5%2016%2C9%2025%2C26%2028%2C50%200%2C0%200%2C0%200%2C1l1%2078c0%2C0%200%2C0%200%2C0%200%2C3%20-2%2C5%20-4%2C6%20-1%2C0%20-1%2C0%20-2%2C0z%22%2F%3E%3Cpath%20fill%3D%22%23e0a99c%22%20d%3D%22M586%20681l-322%200c-10%2C0%20-19%2C-8%20-19%2C-19l0%20-93c0%2C-62%2051%2C-112%20113%2C-112%2045%2C0%2091%2C0%20134%2C0%2062%2C0%20113%2C50%20113%2C112l0%2093c0%2C11%20-9%2C19%20-19%2C19z%22%2F%3E%3Cpath%20fill%3D%22%23c48f83%22%20d%3D%22M535%20681l-12%200%200-95c0-4%203-6%206-6%203%200%206%202%206%206l0%2095zm-208%200l-12%200%200-95c0-4%203-6%206-6%203%200%206%202%206%206l0%2095zM364%20457c41%200%2082%200%20122%200%200%200%200%200-1%201l-57%20139c-1%202-3%203-5%203%200%200%200%200%200%200-3%200-5-1-6-4l-53-138c0-1%200-1%200-1z%22%2F%3E%3C%2Fsvg%3E"
          alt="name"
          className="w-12 h-12 rounded-full mr-4 border-2 border-white"
        />
        <div>
          <h2 className="font-semibold text-lg">Tulsi Pujari</h2>
          <p className="text-xs text-indigo-200">Student</p>
        </div>
      </div>
      <nav className="space-y-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <item.icon className="w-5 h-5 mr-3 text-indigo-300" />
            <span>{item.text}</span>
          </a>
        ))}
      </nav>
      <div className="absolute bottom-4 left-0 w-full px-6">
        <a href="#" className="flex items-center py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
          <LogOut className="w-5 h-5 mr-3 text-indigo-300" />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Navbar />
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-4xl font-bold mb-8 text-indigo-800">Your Learning Journey</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="Quiz Performance">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quizData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" />
                <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          
          <ChartCard title="Mock Interview Progress">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockInterviewData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" />
                <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          
          <ChartCard title="Skill Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={skillsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8b5cf6" label />
                <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Learning Trajectory">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={learningProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" />
                <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="progress" stroke="#3b82f6" fill="url(#colorProgress)" />
                <defs>
                  <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Performance Overview" className="col-span-1 lg:col-span-2">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="subject" stroke="#4b5563" />
                <PolarRadiusAxis stroke="#4b5563" />
                <Radar name="Your Performance" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Radar name="Class Average" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Legend />
                <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;