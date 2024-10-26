import React, { useState, useEffect } from 'react';
import { ArrowRight, BarChart2, CheckCircle, Lock, PlayCircle } from 'lucide-react';
import Navbar from './Navbar';
import { Wallet, Target, BookOpen, PiggyBank, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
const LandingPage = () => {
  const [activeStat, setActiveStat] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  const features = [
    {
      icon: <PiggyBank className="w-10 h-10 text-orange-500" />,
      title: "Budget Manager",
      desc: "Create and manage custom budgets with smart allocation suggestions and real-time spending insights",
      gradient: "from-orange-500/10 to-orange-50",
      url: "/budget-manager"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-orange-500" />,
      title: "Expense Tracker",
      desc: "Monitor daily expenses, categorize transactions automatically, and get spending pattern analysis",
      gradient: "from-orange-400/10 to-orange-50",
      url: "/expense-tracker"
    },
    {
      icon: <BookOpen className="w-10 h-10 text-orange-500" />,
      title: "Financial Insights",
      desc: "Access personalized financial lessons, interactive tutorials, and expert-curated content",
      gradient: "from-orange-300/10 to-orange-50",
      url: "/financial-insights"
    },
    {
      icon: <Target className="w-10 h-10 text-orange-500" />,
      title: "Financial Goals",
      desc: "Set and track custom financial goals with milestone tracking and achievement rewards",
      gradient: "from-orange-500/10 to-orange-50",
      url: "/financial-goals"
    },
    {
      icon: <DollarSign className="w-10 h-10 text-orange-500" />,
      title: "Debt Manager",
      desc: "Track and optimize debt repayment with smart strategies and progress visualization",
      gradient: "from-orange-400/10 to-orange-50",
      url: "/debt-manager"
    },
    {
      icon: <Clock className="w-10 h-10 text-orange-500" />,
      title: "Bill Reminders",
      desc: "Never miss a payment with smart bill tracking and automated payment reminders",
      gradient: "from-orange-300/10 to-orange-50",
      url: "#"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="relative px-4 pt-32 pb-20 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="mb-6 text-5xl font-bold text-white">
              Take Charge of Your Finances with AI-Powered Budgeting
            </h1>
            <p className="mb-8 text-xl text-white/90">
              Track expenses, set goals, get personalized tips, and master your money all in one place.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button className="px-8 py-4 text-lg font-semibold text-orange-600 bg-white rounded-full hover:bg-orange-50 transition-all transform hover:scale-105 hover:shadow-lg flex items-center">
                Get Started for Free
                <ArrowRight className="ml-2" />
              </button>
              <button className="flex items-center px-6 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white/10 transition-all">
                <PlayCircle className="mr-2" />
                Watch Demo
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { number: "50K+", label: "Active Users" },
              { number: "$2M+", label: "Money Saved" },
              { number: "4.9/5", label: "User Rating" }
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-white/10 backdrop-blur-lg rounded-lg cursor-pointer transform transition-all hover:scale-105"
                onMouseEnter={() => setActiveStat(index)}
                onMouseLeave={() => setActiveStat(null)}
              >
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24 bg-gradient-to-b from-orange-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Powerful Financial Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to take control of your finances and achieve your financial goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.url}
              className="relative group block"
            >
              {/* Card */}
              <div className="h-full p-8 rounded-2xl bg-white border border-orange-100 shadow-sm 
                           transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                           cursor-pointer">
                {/* Icon Container */}
                <div className={`w-16 h-16 mb-6 rounded-xl flex items-center justify-center 
                              bg-gradient-to-br ${feature.gradient}
                              transform transition-transform group-hover:scale-110`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>

                {/* Subtle arrow indicator */}
                <div className="absolute bottom-8 right-8 opacity-0 transform translate-x-2 
                              transition-all duration-300 group-hover:opacity-100 
                              group-hover:translate-x-0">
                  <svg 
                    className="w-6 h-6 text-orange-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl transition-opacity duration-300 
                              opacity-0 group-hover:opacity-100
                              bg-gradient-to-br from-orange-500/5 to-transparent 
                              pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900">
            How It Works
          </h2>
          <div className="relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-orange-200"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                { step: "1", title: "Sign Up", desc: "Answer a few questions to personalize your experience" },
                { step: "2", title: "Track Expenses", desc: "Input your expenses or link your account for real-time tracking" },
                { step: "3", title: "Set Goals", desc: "Define short-term and long-term goals and let the app guide you" },
                { step: "4", title: "Get Insights", desc: "Receive AI-powered insights and tips to improve your habits" }
              ].map((step, index) => (
                <div key={index} className="relative p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-6 flex items-center justify-center w-12 h-12 text-xl font-bold text-white bg-orange-500 rounded-full border-4 border-white shadow-lg">
                    {step.step}
                  </div>
                  <div className="mt-8">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Hover Cards */}
      <section id="benefits" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-12 text-4xl font-bold text-center text-gray-900">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <BarChart2 className="w-8 h-8 text-orange-500" />, title: "User-Friendly Interface", desc: "Simple, intuitive design that anyone can use" },
              { icon: <Lock className="w-8 h-8 text-orange-500" />, title: "Privacy & Security", desc: "Your data is protected with industry-standard encryption" },
              { icon: <CheckCircle className="w-8 h-8 text-orange-500" />, title: "AI-Powered Personalization", desc: "Tips and insights tailored to your financial habits" }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="group p-8 rounded-xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-orange-100 group-hover:bg-orange-500 transition-colors duration-300">
                    {React.cloneElement(benefit.icon, {
                      className: "w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300"
                    })}
                  </div>
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="px-4 py-20 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="mb-8 text-xl text-white/90">
            Join thousands of users who are already managing their money smarter.
          </p>
          <button className="px-8 py-4 text-lg font-semibold text-orange-600 bg-white rounded-full hover:bg-orange-50 transition-all transform hover:scale-105 hover:shadow-lg flex items-center mx-auto">
            Start Your Journey Today
            <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          {/* Footer Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-orange-500">FinanceAI</h3>
              <p className="text-gray-400">Making financial freedom accessible to everyone through AI-powered insights.</p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 rounded-full hover:bg-orange-500/10 transition-colors group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-orange-500/10 transition-colors group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-orange-500/10 transition-colors group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Stay Updated</h4>
              <p className="text-gray-400">Subscribe to our newsletter for tips and updates.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 flex-grow"
                />
                <button className="px-4 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 FinanceAI. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;