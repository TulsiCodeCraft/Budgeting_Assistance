import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  Target,
  Receipt,
  BookOpen,
  CreditCard,
  ChevronLeft,
} from 'lucide-react';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: 'Budget Planner', icon: <Wallet size={20} />, path: 'budget-manager' }, // Removed leading slash
    { title: 'Financial Goals', icon: <Target size={20} />, path: 'financial-goals' }, // Removed leading slash
    { title: 'Expense Tracking', icon: <Receipt size={20} />, path: 'expense-tracker' }, // Check this one too
    { title: 'Financial Insights', icon: <BookOpen size={20} />, path: 'financial-insights' }, // Removed leading slash
    { title: 'Debt Management', icon: <CreditCard size={20} />, path: 'debt-manager' }, // Removed leading slash
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
            <Link
              key={index}
              to={item.path} // This should be relative
              className={`flex items-center px-4 py-3 text-white hover:bg-orange-500 transition-colors ${
                location.pathname.endsWith(item.path) ? 'bg-orange-500' : ''
              }`}
            >
              <span className="flex items-center justify-center">
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="ml-4">{item.title}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => location.pathname.endsWith(item.path))?.title || 'Dashboard'}
            </h2>
          </div>
        </header>

        <main className="p-6">
          <Outlet /> {/* This is crucial for rendering nested routes */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;