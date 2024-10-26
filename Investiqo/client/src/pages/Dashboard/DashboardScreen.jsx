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
  Menu,
  Bell,
  Search,
  Settings,
  User,
  LogOut,
} from 'lucide-react';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { 
      title: 'Budget Planner', 
      icon: <Wallet size={20} />, 
      path: 'budget-manager',
      gradientClasses: 'from-orange-300 via-orange-400 to-orange-500'
    },
    { 
      title: 'Financial Goals', 
      icon: <Target size={20} />, 
      path: 'financial-goals',
      gradientClasses: 'from-orange-400 via-orange-500 to-orange-600'
    },
    { 
      title: 'Expense Tracking', 
      icon: <Receipt size={20} />, 
      path: 'expense-tracker',
      gradientClasses: 'from-orange-500 via-orange-600 to-orange-700'
    },
    { 
      title: 'Financial Insights', 
      icon: <BookOpen size={20} />, 
      path: 'financial-insights',
      gradientClasses: 'from-orange-600 via-orange-700 to-orange-800'
    },
    { 
      title: 'Debt Management', 
      icon: <CreditCard size={20} />, 
      path: 'debt-manager',
      gradientClasses: 'from-orange-700 via-orange-800 to-orange-900'
    },
  ];

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const getCurrentPageTitle = () => {
    const currentMenuItem = menuItems.find(item => location.pathname.endsWith(item.path));
    if (!currentMenuItem) {
      return {
        title: 'Dashboard',
        gradientClasses: 'from-orange-300 via-orange-500 to-orange-700'
      };
    }
    return currentMenuItem;
  };

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
              to={item.path}
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
        {/* Enhanced Header with Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left side - Gradient Title */}
            <div className="flex items-center">
              <h2 className={`text-3xl font-bold bg-gradient-to-r ${getCurrentPageTitle().gradientClasses} bg-clip-text text-transparent`}>
                {getCurrentPageTitle().title}
              </h2>
            </div>

            {/* Right side - Navigation Items */}
            <div className="flex items-center space-x-6">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none ml-2 w-48"
                />
              </div>

              {/* Notifications */}
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Settings */}
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings size={20} className="text-gray-600" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">John Doe</p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                    <Link to="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <User size={16} className="mr-2" />
                      Profile Settings
                    </Link>
                    <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;