import React, { useState } from 'react';
import { BookOpen, Lightbulb, CreditCard, ChevronRight, ThumbsUp, ThumbsDown } from 'lucide-react';

const InsightCard = ({ title, children, icon: Icon }) => (
  <div className="p-4 border border-orange-200 rounded-lg bg-orange-50 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-orange-100 rounded-lg">
        <Icon className="w-5 h-5 text-orange-600" />
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-medium text-orange-800 mb-2">{title}</h4>
        {children}
      </div>
    </div>
  </div>
);

const FinancialInsights = () => {
  const [insights] = useState([
    {
      id: 1,
      type: 'tip',
      title: 'Reduce Your Utility Costs',
      content: 'Based on your recent spending, switching to LED bulbs could save you ₹200/month on electricity.',
      liked: false
    },
    {
      id: 2,
      type: 'education',
      title: 'Understanding Credit Scores',
      content: 'Your credit score impacts loan interest rates. Learn how to improve it.',
      link: 'Read more',
      liked: false
    },
    {
      id: 3,
      type: 'product',
      title: 'High-Yield Savings Account',
      content: 'Based on your savings pattern, you could earn 2.5% more by switching to this account.',
      details: {
        pros: ['Higher interest rate', 'No minimum balance', 'Zero fees'],
        cons: ['Online only', 'Limited withdrawals']
      }
    }
  ]);

  const [resources] = useState([
    {
      title: 'Budgeting Basics',
      type: 'Article',
      duration: '5 min read',
      difficulty: 'Beginner'
    },
    {
      title: 'Investment Strategies',
      type: 'Video',
      duration: '10 min',
      difficulty: 'Intermediate'
    },
    {
      title: 'Tax Planning Guide',
      type: 'Guide',
      duration: '15 min read',
      difficulty: 'Advanced'
    }
  ]);

  const [activeTab, setActiveTab] = useState('insights');

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-['Inter']">
      <div className="border border-orange-300 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-orange-700 mb-6">Financial Insights</h2>
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeTab === 'insights'
                ? 'bg-orange-100 text-orange-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('insights')}
          >
            Personalized Insights
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeTab === 'resources'
                ? 'bg-orange-100 text-orange-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('resources')}
          >
            Learning Resources
          </button>
        </div>

        {activeTab === 'insights' ? (
          <div className="space-y-4">
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
                <p className="text-gray-600 text-sm mb-3">{insight.content}</p>
                
                {insight.type === 'product' && (
                  <div className="mt-3 bg-white rounded-lg p-3 space-y-2">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Pros:</h5>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {insight.details.pros.map((pro, idx) => (
                          <li key={idx}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Cons:</h5>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {insight.details.cons.map((con, idx) => (
                          <li key={idx}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-orange-100 rounded-full transition-colors duration-200 border border-orange-200 hover:shadow-lg">
                      <ThumbsUp className="w-4 h-4 text-orange-600" />
                    </button>
                    <button className="p-1 hover:bg-orange-100 rounded-full transition-colors duration-200 border border-orange-200 hover:shadow-lg">
                      <ThumbsDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  {insight.link && (
                    <button className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700">
                      {insight.link}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </InsightCard>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, idx) => (
              <div
                key={idx}
                className="p-4 border border-orange-200 rounded-lg bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <BookOpen className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-orange-600">
                    {resource.type}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">
                  {resource.title}
                </h4>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{resource.duration}</span>
                  <span>•</span>
                  <span>{resource.difficulty}</span>
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
