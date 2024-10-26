import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Wallet, TrendingUp, PiggyBank, Target, ArrowUp, ArrowDown } from 'lucide-react';

// Custom Card components to replace shadcn/ui
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="border-b border-gray-200 p-6">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-gray-900">
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const ExpenseTracker = () => {
  // Sample data - replace with your actual data
  const weeklyExpenses = [
    { day: 'Mon', amount: 45, category: 'Food' },
    { day: 'Tue', amount: 80, category: 'Shopping' },
    { day: 'Wed', amount: 30, category: 'Transport' },
    { day: 'Thu', amount: 65, category: 'Entertainment' },
    { day: 'Fri', amount: 95, category: 'Food' },
    { day: 'Sat', amount: 120, category: 'Shopping' },
    { day: 'Sun', amount: 55, category: 'Entertainment' },
  ];

  const savingsData = [
    { month: 'Jun', saved: 400 },
    { month: 'Jul', saved: 600 },
    { month: 'Aug', saved: 550 },
    { month: 'Sep', saved: 700 },
    { month: 'Oct', saved: 900 },
  ];

  const expensesByCategory = [
    { name: 'Food', value: 350, color: '#f97316' },
    { name: 'Shopping', value: 450, color: '#fb923c' },
    { name: 'Transport', value: 200, color: '#fdba74' },
    { name: 'Entertainment', value: 300, color: '#ffedd5' },
  ];

  const goalProgress = [
    { name: 'Saved', value: 3000 },
    { name: 'Remaining', value: 2000 },
  ];


  const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">${value}</h3>
            {trend && (
              <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                <span className="ml-1">{trendValue}%</span>
              </div>
            )}
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <Icon size={24} className="text-orange-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full space-y-6 p-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Weekly Spending" 
          value="490" 
          icon={Wallet}
          trend="down"
          trendValue="12"
        />
        <StatCard 
          title="Monthly Savings" 
          value="900" 
          icon={PiggyBank}
          trend="up"
          trendValue="8"
        />
        <StatCard 
          title="Goal Progress" 
          value="3,000" 
          icon={Target}
        />
        <StatCard 
          title="Total Balance" 
          value="5,280" 
          icon={TrendingUp}
          trend="up"
          trendValue="15"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Expenses Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Expense Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={{ fill: '#f97316' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Savings Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={savingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="saved" fill="#f97316">
                    {savingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`#f97316`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expenses by Category Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Savings Goal Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Savings Goal Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={goalProgress}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                    label
                  >
                    <Cell fill="#f97316" />
                    <Cell fill="#fee2e2" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracker;