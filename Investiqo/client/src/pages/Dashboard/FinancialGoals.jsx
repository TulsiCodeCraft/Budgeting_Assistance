import React, { useState } from 'react';
import { Target, Plus, Trash2, ArrowRight, PiggyBank, Calendar } from 'lucide-react';
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

const Select = ({ className = '', ...props }) => (
  <select
    className={`flex h-10 w-full rounded-md border border-orange-200 bg-white px-3 py-2 text-sm 
    transition-all duration-200 ease-in-out
    focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none ${className}`}
    {...props}
  />
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ease-in-out h-10 px-4 py-2';
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-orange-500 border border-orange-200 hover:bg-orange-50 active:bg-orange-100',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700'
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

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-orange-100 rounded-full h-4">
    <div
      className="bg-gradient-to-r from-orange-500 to-orange-400 h-4 rounded-full transition-all duration-500"
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    />
  </div>
);

const GoalManager = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      target: 10000,
      current: 5000,
      deadline: '2024-12-31',
      type: 'long-term',
      description: 'Build 6 months of living expenses'
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    current: '',
    deadline: '',
    type: 'short-term',
    description: ''
  });

  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) {
      toast.error('Please fill in all required fields!', {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }

    const goal = {
      ...newGoal,
      id: Date.now(),
      current: Number(newGoal.current) || 0,
      target: Number(newGoal.target)
    };

    setGoals([...goals, goal]);
    setNewGoal({
      name: '',
      target: '',
      current: '',
      deadline: '',
      type: 'short-term',
      description: ''
    });
    setShowNewGoalForm(false);
    toast.success('New goal added successfully!', {
      position: "top-right",
      autoClose: 3000
    });
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast.info('Goal deleted', {
      position: "top-right",
      autoClose: 3000
    });
  };

  const handleUpdateProgress = (id, newProgress) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const updatedProgress = Number(newProgress);
        if (updatedProgress > goal.target) {
          toast.warning('Progress cannot exceed the target amount!', {
            position: "top-right",
            autoClose: 3000
          });
          return goal;
        }
        return { ...goal, current: updatedProgress };
      }
      return goal;
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-['Inter']">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>Financial Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Active Goals Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-orange-800">Active Goals</h3>
                <Button
                  variant="primary"
                  onClick={() => setShowNewGoalForm(true)}
                  className="flex gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Goal
                </Button>
              </div>

              {goals.map(goal => (
                <div
                  key={goal.id}
                  className="p-4 border border-orange-200 rounded-lg bg-orange-50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-medium text-orange-800">
                        {goal.name}
                      </h4>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="h-8 px-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress: ₹{goal.current} of ₹{goal.target}</span>
                        <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                      </div>
                      <ProgressBar progress={(goal.current / goal.target) * 100} />
                    </div>

                    <div className="flex gap-4">
                      <Input
                        type="number"
                        placeholder="Update progress"
                        value={goal.current}
                        onChange={(e) => handleUpdateProgress(goal.id, e.target.value)}
                        className="max-w-[200px]"
                      />
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Target className="w-4 h-4" />
                        <span>{goal.type === 'long-term' ? 'Long-term' : 'Short-term'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {goals.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No active goals. Add a new goal to get started!
                </div>
              )}
            </div>

            {/* New Goal Form */}
            {showNewGoalForm && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-orange-800 mb-4">Create New Goal</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Goal Name</label>
                    <Input
                      placeholder="Enter goal name"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Target Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter target amount"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Current Progress</label>
                    <Input
                      type="number"
                      placeholder="Enter current amount"
                      value={newGoal.current}
                      onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Deadline</label>
                    <Input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Goal Type</label>
                    <Select
                      value={newGoal.type}
                      onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
                    >
                      <option value="short-term">Short-term</option>
                      <option value="long-term">Long-term</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
                    <Input
                      placeholder="Enter goal description"
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    variant="secondary"
                    onClick={() => setShowNewGoalForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleAddGoal}
                    className="flex gap-2"
                  >
                    <PiggyBank className="w-4 h-4" />
                    Save Goal
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalManager;