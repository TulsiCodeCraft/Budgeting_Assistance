import React, { useState } from 'react';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Card component with improved styling
const Card = ({ children }) => (
  <div className="rounded-lg border border-gray-200 bg-white text-gray-800 shadow-md p-6">
    {children}
  </div>
);

// CardHeader component
const CardHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-orange-100 to-orange-50 rounded-t-lg">
    {children}
  </div>
);

// CardTitle component
const CardTitle = ({ children }) => (
  <h2 className="text-xl font-bold text-gray-800">{children}</h2>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ease-in-out h-10 px-4 py-2';
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-md hover:shadow-lg',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-md hover:shadow-lg', // New danger variant
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

// Usage in DebtManager component
<Button variant="danger" onClick={() => handleDeleteDebt(debt.id)}>
  Delete
</Button>

// Input component with Tailwind styling for consistent look
const Input = ({ type = 'text', ...props }) => (
  <input
    className="border border-gray-300 focus:border-orange-500 focus:ring-orange-500 p-2 rounded-md w-full outline-none transition-all duration-300"
    type={type}
    {...props}
  />
);

// DebtManager component
const DebtManager = () => {
  const [debts, setDebts] = useState([]);
  const [newDebt, setNewDebt] = useState({
    type: '',
    amount: '',
    interestRate: '',
    dueDate: '',
  });

  const handleAddDebt = () => {
    if (!newDebt.type || !newDebt.amount || !newDebt.dueDate) {
      toast.error('Please fill in all required fields!', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const debt = { ...newDebt, id: Date.now(), amount: Number(newDebt.amount) };
    setDebts([...debts, debt]);
    setNewDebt({ type: '', amount: '', interestRate: '', dueDate: '' });
    toast.success('New debt added successfully!', { position: 'top-right', autoClose: 3000 });
  };

  const handleDeleteDebt = (id) => {
    setDebts(debts.filter((debt) => debt.id !== id));
    toast.info('Debt deleted', { position: 'top-right', autoClose: 3000 });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>Financial Goals</CardTitle>
        </CardHeader>
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Debt Management</h1>
        <div className="space-y-4">
          {debts.map((debt) => (
            <div
              key={debt.id}
              className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm mb-4"
            >
              <h3 className="font-semibold text-lg">{debt.type}</h3>
              <p>Amount: ${debt.amount}</p>
              <p>Interest Rate: {debt.interestRate}%</p>
              <p>Due Date: {new Date(debt.dueDate).toLocaleDateString()}</p>
              <Button variant="danger" onClick={() => handleDeleteDebt(debt.id)}>
                Delete
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-3 mt-6">
          <Input
            placeholder="Debt Type"
            value={newDebt.type}
            onChange={(e) => setNewDebt({ ...newDebt, type: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={newDebt.amount}
            onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Interest Rate"
            value={newDebt.interestRate}
            onChange={(e) => setNewDebt({ ...newDebt, interestRate: e.target.value })}
          />
          <Input
            type="date"
            value={newDebt.dueDate}
            onChange={(e) => setNewDebt({ ...newDebt, dueDate: e.target.value })}
          />
          <Button onClick={handleAddDebt}>Add Debt</Button>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button variant="generate" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Generate Personalized Plan
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DebtManager;
