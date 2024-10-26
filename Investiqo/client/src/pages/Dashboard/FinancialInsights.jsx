import React, { useState } from 'react';
import { BookOpen, Lightbulb, CreditCard, ChevronRight, ThumbsUp, ThumbsDown, Clock, BarChart } from 'lucide-react';

const InsightCard = ({ title, children, icon: Icon }) => (
  <div className="p-5 border border-orange-200 rounded-xl bg-white hover:shadow-lg transition-all duration-300">
    <div className="flex items-start gap-4">
      <div className="p-2.5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm">
        <Icon className="w-6 h-6 text-orange-500" />
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
        {children}
      </div>
    </div>
  </div>
);

const TabButton = ({ active, children, onClick }) => (
  <button
    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
      active
        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
        : 'text-gray-600 hover:bg-orange-50'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Badge = ({ children, variant = 'default' }) => (
  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
    variant === 'beginner' ? 'bg-green-100 text-green-700' :
    variant === 'intermediate' ? 'bg-orange-100 text-orange-700' :
    variant === 'advanced' ? 'bg-red-100 text-red-700' :
    'bg-gray-100 text-gray-700'
  }`}>
    {children}
  </span>
);

const FinancialInsights = () => {
  const [insights] = useState([
    {
      id: 1,
      type: 'tip',
      title: 'Reduce Your Utility Costs',
      content: 'Based on your recent spending, switching to LED bulbs could save you ₹200/month on electricity.',
      liked: false,
      impact: 'High Impact'
    },
    {
      id: 2,
      type: 'education',
      title: 'Understanding Credit Scores',
      content: 'Your credit score impacts loan interest rates. Learn how to improve it.',
      link: 'Read more',
      liked: false,
      impact: 'Medium Impact'
    },
    {
      id: 3,
      type: 'product',
      title: 'High-Yield Savings Account',
      content: 'Based on your savings pattern, you could earn 2.5% more by switching to this account.',
      details: {
        pros: ['Higher interest rate', 'No minimum balance', 'Zero fees'],
        cons: ['Online only', 'Limited withdrawals']
      },
      impact: 'High Impact'
    }
  ]);

  const [resources] = useState([
    {
      title: 'Budgeting Basics',
      type: 'Article',
      duration: '5 min read',
      difficulty: 'Beginner',
      icon: BarChart
    },
    {
      title: 'Investment Strategies',
      type: 'Video',
      duration: '10 min',
      difficulty: 'Intermediate',
      icon: BookOpen
    },
    {
      title: 'Tax Planning Guide',
      type: 'Guide',
      duration: '15 min read',
      difficulty: 'Advanced',
      icon: CreditCard
    }
  ]);

  const [activeTab, setActiveTab] = useState('insights');

  return (
    <div className="w-full max-w-4xl mx-auto p-6 font-sans">
      <div className="bg-gradient-to-b from-white to-orange-50 border border-orange-200 rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Financial Insights</h2>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-600">Last updated: Today</span>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <TabButton
            active={activeTab === 'insights'}
            onClick={() => setActiveTab('insights')}
          >
            Personalized Insights
          </TabButton>
          <TabButton
            active={activeTab === 'resources'}
            onClick={() => setActiveTab('resources')}
          >
            Learning Resources
          </TabButton>
        </div>

        {activeTab === 'insights' ? (
          <div className="space-y-6">
            {insights.map(insight => (
              <InsightCard
                key={insight.id}
                title={insight.title}
                icon={
                  insight.type === 'tip'
                    ? Lightbulb
                    : insight.type === 'education'
                    ? BookOpen
                    : CreditCard
                }
              >
                <div className="mb-2">
                  <Badge variant={
                    insight.impact === 'High Impact' ? 'advanced' :
                    insight.impact === 'Medium Impact' ? 'intermediate' : 'beginner'
                  }>
                    {insight.impact}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{insight.content}</p>
                
                {insight.type === 'product' && (
                  <div className="mt-4 bg-orange-50 rounded-xl p-4 space-y-3">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-800 mb-2">Pros:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {insight.details.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-orange-400 rounded-full" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-800 mb-2">Cons:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {insight.details.cons.map((con, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-3">
                    <button className="p-2 hover:bg-orange-100 rounded-lg transition-colors duration-200 border border-orange-200">
                      <ThumbsUp className="w-4 h-4 text-orange-500" />
                    </button>
                    <button className="p-2 hover:bg-orange-100 rounded-lg transition-colors duration-200 border border-orange-200">
                      <ThumbsDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  {insight.link && (
                    <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200">
                      {insight.link}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </InsightCard>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, idx) => (
              <div
                key={idx}
                className="p-5 border border-orange-200 rounded-xl bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                    <resource.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <Badge>{resource.type}</Badge>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-200">
                  {resource.title}
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{resource.duration}</span>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <Badge variant={
                    resource.difficulty === 'Beginner' ? 'beginner' :
                    resource.difficulty === 'Intermediate' ? 'intermediate' : 'advanced'
                  }>
                    {resource.difficulty}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialInsights;