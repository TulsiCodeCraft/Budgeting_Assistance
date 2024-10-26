import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, DollarSign, Percent, Calendar } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ children }) => (
  <div className="rounded-2xl border border-gray-100 bg-white text-gray-800 shadow-xl">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-white">{children}</h2>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 ease-in-out px-4 py-3';
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-lg hover:shadow-xl active:shadow-md transform hover:-translate-y-0.5 active:translate-y-0',
    danger: 'bg-white text-red-500 border-2 border-red-500 hover:bg-red-50 active:bg-red-100 transform hover:-translate-y-0.5 active:translate-y-0',
    generate: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-xl hover:shadow-2xl active:shadow-lg transform hover:-translate-y-1 active:translate-y-0 w-full max-w-md'
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

const Input = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        className={`border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 p-3 rounded-xl w-full outline-none transition-all duration-300 ${Icon ? 'pl-11' : ''}`}
        {...props}
      />
    </div>
  </div>
);

const DebtCard = ({ debt, onDelete }) => (
  <div className="group bg-white border-2 border-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="font-bold text-lg text-gray-800">{debt.type}</h3>
        <p className="text-3xl font-bold text-orange-500 mt-2">
          ${Number(debt.amount).toLocaleString()}
        </p>
      </div>
      <Button 
        variant="danger" 
        onClick={() => onDelete(debt.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="bg-orange-50 p-3 rounded-lg">
        <p className="text-sm text-gray-600">Interest Rate</p>
        <p className="text-lg font-semibold text-gray-800">{debt.interestRate}%</p>
      </div>
      <div className="bg-orange-50 p-3 rounded-lg">
        <p className="text-sm text-gray-600">Due Date</p>
        <p className="text-lg font-semibold text-gray-800">
          {new Date(debt.dueDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  </div>
);

const DebtManager = () => {
  const [debts, setDebts] = useState([]);
  const [newDebt, setNewDebt] = useState({
    type: '',
    amount: '',
    interestRate: '',
    dueDate: '',
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddDebt = () => {
    if (!newDebt.type || !newDebt.amount || !newDebt.dueDate) {
      toast.error('Please fill in all required fields!', {
        position: 'top-right',
        autoClose: 3000,
        className: 'bg-white border-l-4 border-red-500'
      });
      return;
    }

    const debt = { ...newDebt, id: Date.now(), amount: Number(newDebt.amount) };
    setDebts([...debts, debt]);
    setNewDebt({ type: '', amount: '', interestRate: '', dueDate: '' });
    setIsAdding(false);
    toast.success('New debt added successfully!', {
      position: 'top-right',
      autoClose: 3000,
      className: 'bg-white border-l-4 border-green-500'
    });
  };

  const handleDeleteDebt = (id) => {
    setDebts(debts.filter((debt) => debt.id !== id));
    toast.info('Debt deleted', {
      position: 'top-right',
      autoClose: 3000,
      className: 'bg-white border-l-4 border-orange-500'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>Debt Management</CardTitle>
          <p className="text-orange-100 mt-2">Track and manage your debts effectively</p>
        </CardHeader>
        
        <div className="p-6">
          {debts.length === 0 && !isAdding ? (
            <div className="text-center py-12">
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No debts added yet</h3>
              <p className="text-gray-600 mb-6">Start by adding your first debt to track</p>
              <Button onClick={() => setIsAdding(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Debt
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 mb-6">
                {debts.map((debt) => (
                  <DebtCard
                    key={debt.id}
                    debt={debt}
                    onDelete={handleDeleteDebt}
                  />
                ))}
              </div>

              {!isAdding && (
                <Button 
                  onClick={() => setIsAdding(true)}
                  className="mb-6"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Debt
                </Button>
              )}
            </>
          )}

          {isAdding && (
            <div className="bg-orange-50 p-6 rounded-xl space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Debt</h3>
              <Input
                icon={DollarSign}
                label="Debt Type"
                placeholder="e.g., Credit Card, Student Loan"
                value={newDebt.type}
                onChange={(e) => setNewDebt({ ...newDebt, type: e.target.value })}
              />
              <Input
                icon={DollarSign}
                label="Amount"
                type="number"
                placeholder="Enter amount"
                value={newDebt.amount}
                onChange={(e) => setNewDebt({ ...newDebt, amount: e.target.value })}
              />
              <Input
                icon={Percent}
                label="Interest Rate"
                type="number"
                placeholder="Enter interest rate"
                value={newDebt.interestRate}
                onChange={(e) => setNewDebt({ ...newDebt, interestRate: e.target.value })}
              />
              <Input
                icon={Calendar}
                label="Due Date"
                type="date"
                value={newDebt.dueDate}
                onChange={(e) => setNewDebt({ ...newDebt, dueDate: e.target.value })}
              />
              <div className="flex gap-3">
                <Button onClick={handleAddDebt} className="flex-1">
                  Add Debt
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => setIsAdding(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {debts.length > 0 && (
            <div className="flex justify-center mt-6">
              <Button variant="generate" className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate Personalized Payment Plan
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DebtManager;