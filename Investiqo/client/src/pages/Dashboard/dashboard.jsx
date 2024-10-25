import React, { useState } from 'react';
import {
  LayoutDashboard,
  Wallet,
  Target,
  Receipt,
  BookOpen,
  PiggyBank,
  CreditCard,
  BellRing,
  Settings,
  HelpCircle,
  ChevronLeft,
  Menu
} from 'lucide-react';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    
    { title: 'Budget Planner', icon: <Wallet size={20} /> },
    { title: 'Financial Goals', icon: <Target size={20} /> },
    { title: 'Expense Tracking', icon: <Receipt size={20} /> },
    { title: 'Financial Insights', icon: <BookOpen size={20} /> },
    { title: 'Debt Management', icon: <CreditCard size={20} /> },
  
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`${
          isCollapsed ? 'w-20' : 'w-64'
        } bg-gradient-to-b from-orange-600 to-orange-700 text-white transition-all duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-orange-500">
          {!isCollapsed && (
            <h1 className="text-xl font-bold">FinanceHelper</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-orange-500 transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-4 py-3 text-white hover:bg-orange-500 transition-colors"
            >
              <span className="flex items-center justify-center">
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="ml-4">{item.title}</span>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Cards - Replace with actual content */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Monthly Budget</h3>
              <p className="text-gray-600">Track your monthly spending and savings</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Savings Goals</h3>
              <p className="text-gray-600">Monitor your progress towards financial goals</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Transactions</h3>
              <p className="text-gray-600">View your latest financial activities</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;