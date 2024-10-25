import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Bell, Trash2 } from 'lucide-react';
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [swipedNotificationId, setSwipedNotificationId] = useState(null);
  const [hoveredNotificationId, setHoveredNotificationId] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Budget Alert",
      message: "You've reached 80% of your monthly budget limit. Consider reviewing your expenses.",
      time: "2 hours ago",
      isRead: false,
      type: "warning"
    },
    {
      id: 2,
      title: "New Savings Goal Achieved! 🎉",
      message: "Congratulations! You've reached your savings goal of $1,000 for 'Vacation Fund'",
      time: "1 day ago",
      isRead: false,
      type: "success"
    },
    {
      id: 3,
      title: "Bill Payment Reminder",
      message: "Your utility bill payment of $85.50 is due in 3 days. Set up auto-pay to never miss a deadline.",
      time: "2 days ago",
      isRead: true,
      type: "info"
    },
    {
      id: 4,
      title: "Investment Opportunity",
      message: "Based on your profile, we've identified a new low-risk investment opportunity.",
      time: "3 days ago",
      isRead: true,
      type: "info"
    }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resources = [
    { title: 'Blog', href: '#' },
    { title: 'Guides', href: '#' },
    { title: 'Help Center', href: '#' },
    { title: 'Community', href: '#' }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id, e) => {
    if (e) {
      e.stopPropagation();
    }
    setNotifications(notifications.filter(notif => notif.id !== id));
    setSwipedNotificationId(null);
    setHoveredNotificationId(null);
  };

  const handleTouchStart = (e, id) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e, id) => {
    setTouchEnd(e.targetTouches[0].clientX);
    const diff = touchStart - e.targetTouches[0].clientX;
    if (diff > 0 && diff < 200) {
      setSwipedNotificationId(id);
    } else {
      setSwipedNotificationId(null);
    }
  };

  const handleTouchEnd = (id) => {
    if (!touchStart || !touchEnd) return;
    const diff = touchStart - touchEnd;
    if (diff > 100) {
      deleteNotification(id);
    } else {
      setSwipedNotificationId(null);
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };
  

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`font-bold text-2xl ${isScrolled ? 'text-orange-500' : 'text-white'}`}>
                <img className='w-56 flex justify-center' src={logo} alt="" />
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className={`transition-colors hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                Features
              </a>
              <div className="relative">
                <button
                  className={`flex items-center space-x-1 transition-colors hover:text-orange-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                  onMouseEnter={() => setActiveDropdown('resources')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span>Resources</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === 'resources' && (
                  <div
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                    onMouseEnter={() => setActiveDropdown('resources')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {resources.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <a href="#" className={`transition-colors hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}>
                Pricing
              </a>
              
              <button 
                className="relative"
                onClick={() => setIsNotificationOpen(true)}
              >
                <Bell className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-orange-500 transition-colors`} />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              <button className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                Sign In
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button 
                className="relative"
                onClick={() => setIsNotificationOpen(true)}
              >
                <Bell className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-orange-500 transition-colors`} />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (
                  <X className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <a href="#" className="block py-2 text-gray-700 hover:text-orange-500">Features</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-orange-500">Resources</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-orange-500">Pricing</a>
              <button className="mt-4 w-full px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                Sign In
              </button>
            </div>
          )}
        </div>
      </nav>

      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
          isNotificationOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsNotificationOpen(false)}
      >
        <div 
          className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform ${
            isNotificationOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-500 mt-1">{unreadCount} unread messages</p>
              </div>
              <button 
                onClick={() => setIsNotificationOpen(false)}
                className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm font-medium text-orange-500 hover:text-orange-600 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="overflow-y-auto h-[calc(100vh-140px)] pb-6">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Bell className="w-12 h-12 mb-4 text-gray-300" />
                <p className="text-lg font-medium">No notifications</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className="relative overflow-hidden group"
                    onTouchStart={(e) => handleTouchStart(e, notification.id)}
                    onTouchMove={(e) => handleTouchMove(e, notification.id)}
                    onTouchEnd={() => handleTouchEnd(notification.id)}
                    onMouseEnter={() => setHoveredNotificationId(notification.id)}
                    onMouseLeave={() => setHoveredNotificationId(null)}
                  >
                    {/* Swipe delete button for mobile */}
                    <div
                      className={`absolute right-0 top-0 h-full flex items-center bg-red-500 transition-transform ${
                        swipedNotificationId === notification.id ? 'translate-x-0' : 'translate-x-full'
                      }`}
                    >
                      <button 
                        className="px-6 h-full flex items-center text-white"
                        onClick={(e) => deleteNotification(notification.id, e)}
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div
                      className={`p-4 border-l-4 transition-all cursor-pointer ${
                        getNotificationColor(notification.type)
                      } ${!notification.isRead ? 'border-l-orange-500' : ''} relative`}
                      style={{
                        transform: swipedNotificationId === notification.id ? 'translateX(-100px)' : 'translateX(0)',
                        transition: 'transform 0.3s ease'
                      }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {/* Desktop delete button */}
                      <button
                        className={`absolute right-2 top-2 p-2 rounded-full bg-red-100 text-red-500 
                          hover:bg-red-200 transition-opacity duration-200 opacity-0 
                          group-hover:opacity-100 focus:opacity-100`}
                        onClick={(e) => deleteNotification(notification.id, e)}
                        aria-label="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-start justify-between pr-8">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                        </div>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;