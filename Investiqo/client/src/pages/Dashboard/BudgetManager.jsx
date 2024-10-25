import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { 
  LayoutDashboard,
  Wallet,
  Target,
  Receipt,
  BookOpen,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  PiggyBank,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component definitions (Card, CardHeader, etc. remain the same as in your original code)
// ... (Keep all your existing component definitions)

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: 'Budget Planner', icon: <Wallet className="w-5 h-5" />, path: '/budget' },
    { title: 'Financial Goals', icon: <Target className="w-5 h-5" />, path: '/goals' },
    { title: 'Expense Tracking', icon: <Receipt className="w-5 h-5" />, path: '/expenses' },
    { title: 'Financial Insights', icon: <BookOpen className="w-5 h-5" />, path: '/insights' },
    { title: 'Debt Management', icon: <CreditCard className="w-5 h-5" />, path: '/debt' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r transition-all duration-300 ease-in-out`}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {!isCollapsed && (
            <span className="text-xl font-semibold text-orange-600">FinanceHelper</span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors
                ${location.pathname === item.path 
                  ? 'bg-orange-500 text-white' 
                  : 'hover:bg-orange-100 text-gray-700'}`}
            >
              {item.icon}
              {!isCollapsed && (
                <span className="ml-3">{item.title}</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.path === location.pathname)?.title || 'Dashboard'}
            </h1>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

const BudgetManagerPage = () => {
  // Your existing BudgetManager component state and logic here
  const [budget, setBudget] = useState({
    income: 0,
    fixedExpenses: {},
    variableExpenses: {},
  });

  const [aiPlan, setAiPlan] = useState(null);
  // ... (rest of your existing BudgetManager state and functions)

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto">
        <ToastContainer />
        <Card>
          {/* Your existing BudgetManager JSX here */}
          {/* ... */}
          <CardHeader>
          <CardTitle>Smart Budget Planner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Monthly Income</label>
              <Input
                type="number"
                placeholder="Enter your monthly income"
                value={budget.income || ''}
                onChange={handleIncomeChange}
                className="w-full"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-orange-800">Fixed Expenses</h3>
              <div className="grid grid-cols-2 gap-4">
                {expenseFields.fixed.map(field => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-2 text-gray-700">{field}</label>
                    <Input
                      type="number"
                      placeholder={`Enter ${field.toLowerCase()}`}
                      value={budget.fixedExpenses[field] || ''}
                      onChange={(e) => handleExpenseChange('fixed', field, e.target.value)}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-orange-800">Variable Expenses</h3>
              <div className="grid grid-cols-2 gap-4">
                {expenseFields.variable.map(field => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-2 text-gray-700">{field}</label>
                    <Input
                      type="number"
                      placeholder={`Enter ${field.toLowerCase()}`}
                      value={budget.variableExpenses[field] || ''}
                      onChange={(e) => handleExpenseChange('variable', field, e.target.value)}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Alert>
              <AlertDescription>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-orange-800">Monthly Summary:</p>
                    <p>Total Income: ${budget.income}</p>
                    <p>Total Expenses: ${totalExpenses}</p>
                    <p className={`font-bold ${remaining >= 0 ? 'text-orange-600' : 'text-red-600'}`}>
                      Remaining: ${remaining}
                    </p>
                  </div>
                  <div className="w-32 h-32">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            <div className="flex justify-center gap-4">
              <Button 
                variant="generate" 
                className="flex gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generate Personalized Plan
              </Button>
              <Button
                variant="primary"
                onClick={handleReset}
                className="flex gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                Reset
              </Button>
            </div>

            {aiPlan && (
              <div className="mt-8 bg-orange-50 rounded-lg p-6 border border-orange-200">
                <h3 className="text-xl font-semibold text-orange-800 mb-4">Your Personalized Budget Plan</h3>
                <p className="text-gray-700 mb-4">{aiPlan.summary}</p>
                
                <h4 className="font-medium text-orange-700 mb-2">Recommendations:</h4>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  {aiPlan.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-700">{rec}</li>
                  ))}
                </ul>
                
                <h4 className="font-medium text-orange-700 mb-2">Smart Tips:</h4>
                <ul className="list-disc list-inside space-y-2">
                  {aiPlan.tips.map((tip, index) => (
                    <li key={index} className="text-gray-700">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BudgetManagerPage;