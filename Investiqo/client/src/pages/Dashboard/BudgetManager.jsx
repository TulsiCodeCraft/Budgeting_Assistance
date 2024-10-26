import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DollarSign, PiggyBank, Target, ChartPie, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border bg-white text-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-500 to-orange-400 rounded-t-xl">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <div className="flex items-center space-x-3">
    <PiggyBank className="w-8 h-8 text-white" />
    <h3 className="text-2xl font-bold leading-none tracking-tight text-white font-['Poppins']">
      {children}
    </h3>
  </div>
);

const CardContent = ({ children }) => (
  <div className="p-8">{children}</div>
);

const Input = ({ type = 'text', className = '', icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && (
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400">
        <Icon className="w-5 h-5" />
      </div>
    )}
    <input
      type={type}
      className={`flex h-12 w-full rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm 
      transition-all duration-200 ease-in-out
      focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none
      placeholder:text-gray-400 ${Icon ? 'pl-10' : ''} ${className}`}
      {...props}
    />
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ease-in-out h-12 px-6 py-2';
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

const ExpenseSection = ({ title, fields, expenses, onExpenseChange, icon: Icon }) => (
  <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100">
    <div className="flex items-center space-x-2 mb-6">
      <Icon className="w-5 h-5 text-orange-500" />
      <h3 className="text-lg font-semibold text-orange-800">{title}</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map(field => (
        <div key={field}>
          <label className="block text-sm font-medium mb-2 text-gray-700">{field}</label>
          <Input
            type="number"
            placeholder={`Enter ${field.toLowerCase()}`}
            value={expenses[field] || ''}
            onChange={(e) => onExpenseChange(field, e.target.value)}
            icon={DollarSign}
            className="w-full"
          />
        </div>
      ))}
    </div>
  </div>
);

const Summary = ({ income, totalExpenses, remaining, pieData }) => (
  <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-200 shadow-inner">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="space-y-3">
        <h4 className="text-xl font-semibold text-orange-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Financial Summary
        </h4>
        <div className="space-y-2">
          <p className="text-gray-700">Total Income: <span className="font-semibold text-orange-600">${income}</span></p>
          <p className="text-gray-700">Total Expenses: <span className="font-semibold text-orange-600">${totalExpenses}</span></p>
          <p className={`font-bold text-lg ${remaining >= 0 ? 'text-orange-600' : 'text-red-600'}`}>
            Remaining: ${remaining}
          </p>
        </div>
      </div>
      <div className="w-40 h-40">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={40}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
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
        className: 'bg-orange-50 border-orange-200',
        progressClassName: 'bg-orange-500',
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
    <div className="w-full max-w-4xl mx-auto p-4 font-['Inter'] bg-orange-50/30 min-h-screen">
      <ToastContainer />
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Smart Budget Planner</CardTitle>
          <div className="flex items-center space-x-2 text-white text-sm">
            <Target className="w-4 h-4" />
            <span>Plan your future</span>
          </div>
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
                icon={DollarSign}
                className="w-full"
              />
            </div>

            <ExpenseSection
              title="Fixed Expenses"
              fields={expenseFields.fixed}
              expenses={budget.fixedExpenses}
              onExpenseChange={(field, value) => handleExpenseChange('fixed', field, value)}
              icon={Target}
            />

            <ExpenseSection
              title="Variable Expenses"
              fields={expenseFields.variable}
              expenses={budget.variableExpenses}
              onExpenseChange={(field, value) => handleExpenseChange('variable', field, value)}
              icon={ChartPie}
            />

            <Summary
              income={budget.income}
              totalExpenses={totalExpenses}
              remaining={remaining}
              pieData={pieData}
            />

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
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Your Personalized Budget Plan
                </h3>
                <p className="text-gray-700 mb-4">{aiPlan.summary}</p>
                
                <h4 className="font-medium text-orange-700 mb-2">Recommendations:</h4>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  {aiPlan.recommendations?.map((rec, index) => (
                    <li key={index} className="text-gray-700">{rec}</li>
                  ))}
                </ul>
                
                <h4 className="font-medium text-orange-700 mb-2">Smart Tips:</h4>
                <ul className="list-disc list-inside space-y-2">
                  {aiPlan.tips?.map((tip, index) => (
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