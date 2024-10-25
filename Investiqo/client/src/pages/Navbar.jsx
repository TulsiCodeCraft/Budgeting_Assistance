import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from "../assets/images/logo.png"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className={`font-bold text-2xl ${isScrolled ? 'text-orange-500' : 'text-white'}`}>
              <img className='w-56  flex justify-center' src={logo} alt="" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className={`transition-colors hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
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
            <a 
              href="#" 
              className={`transition-colors hover:text-orange-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Pricing
            </a>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <a href="#" className="block py-2 text-gray-700 hover:text-orange-500">
              Features
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-orange-500">
              Resources
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-orange-500">
              Pricing
            </a>
            <button className="mt-4 w-full px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;