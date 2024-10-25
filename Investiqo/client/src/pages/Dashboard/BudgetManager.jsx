import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DollarSign, PiggyBank, Target, ChartPie, AlertCircle, Sparkles } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component definitions with enhanced styling
const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg border bg-white text-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-orange-100 to-orange-50 rounded-t-lg">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-2xl font-semibold leading-none tracking-tight text-orange-800 font-['Poppins']">
    {children}
  </h3>
);

const CardContent = ({ children }) => (
  <div className="p-6 pt-0">{children}</div>
);

const Input = ({ type = 'text', className = '', ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-orange-200 bg-white px-3 py-2 text-sm 
    transition-all duration-200 ease-in-out
    focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none
    placeholder:text-gray-400 ${className}`}
    {...props}
  />
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ease-in-out h-10 px-4 py-2';
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-md hover:shadow-lg',
    generate: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-0'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Alert = ({ children, className = '' }) => (
  <div className={`relative w-full rounded-lg border border-orange-200 bg-orange-50 p-4 ${className}`}>
    {children}
  </div>
);

const AlertDescription = ({ children }) => (
  <div className="text-sm [&_p]:leading-relaxed text-gray-700">{children}</div>
);

const BudgetManager = () => {
  const [budget, setBudget] = useState({
    income: 0,
    fixedExpenses: {},
    variableExpenses: {},
  });

  const [aiPlan, setAiPlan] = useState(null);

  const [expenseFields] = useState({
    fixed: ['Rent', 'Utilities', 'Insurance', 'Loans'],
    variable: ['Groceries', 'Entertainment', 'Shopping', 'Transportation']
  });

  const calculateTotalExpenses = () => {
    const fixedTotal = Object.values(budget.fixedExpenses).reduce((acc, val) => acc + (Number(val) || 0), 0);
    const variableTotal = Object.values(budget.variableExpenses).reduce((acc, val) => acc + (Number(val) || 0), 0);
    return { fixedTotal, variableTotal };
  };

  const handleIncomeChange = (e) => {
    setBudget({ ...budget, income: Number(e.target.value) });
  };

  const handleExpenseChange = (type, field, value) => {
    const newBudget = {
      ...budget,
      [`${type}Expenses`]: {
        ...budget[`${type}Expenses`],
        [field]: Number(value)
      }
    };
    setBudget(newBudget);
    
    // Check if total expenses exceed income
    const { fixedTotal, variableTotal } = calculateTotalExpenses();
    const totalExpenses = fixedTotal + variableTotal;
    if (totalExpenses > budget.income && budget.income > 0) {
      toast.error('Warning: Your expenses exceed your budget!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };



  const handleReset = () => {
    setBudget({
      income: 0,
      fixedExpenses: {},
      variableExpenses: {},
    });
    setAiPlan(null);
  };

  const { fixedTotal, variableTotal } = calculateTotalExpenses();
  const totalExpenses = fixedTotal + variableTotal;
  const remaining = budget.income - totalExpenses;

  const pieData = [
    { name: 'Fixed Expenses', value: fixedTotal, color: '#f97316' },
    { name: 'Variable Expenses', value: variableTotal, color: '#fb923c' },
    { name: 'Remaining', value: remaining > 0 ? remaining : 0, color: '#fdba74' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-['Inter']">
      <ToastContainer />
      <Card>
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
  );
};

export default BudgetManager;