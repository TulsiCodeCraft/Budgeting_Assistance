import React, { useState } from 'react';
import { Target, Plus, Trash2, ArrowRight, PiggyBank, Calendar, TrendingUp } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ children, className = '' }) => (
  <div className={`rounded-xl border bg-white text-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 p-8 bg-gradient-to-r from-orange-500/10 to-orange-400/5 rounded-t-xl border-b border-orange-100">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <div className="flex items-center gap-3">
    <TrendingUp className="w-8 h-8 text-orange-500" />
    <h3 className="text-3xl font-bold leading-none tracking-tight text-orange-950 font-['Poppins']">
      {children}
    </h3>
  </div>
);

const CardContent = ({ children }) => (
  <div className="p-8 pt-6">{children}</div>
);

const Input = ({ label, type = 'text', className = '', ...props }) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <input
      type={type}
      className={`flex h-11 w-full rounded-lg border-2 border-orange-100 bg-white px-4 py-2 text-sm
      transition-all duration-200 ease-in-out
      focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none
      placeholder:text-gray-400 ${className}`}
      {...props}
    />
  </div>
);

const Select = ({ label, className = '', ...props }) => (
  <div className="space-y-2">
    {label && (
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <select
      className={`flex h-11 w-full rounded-lg border-2 border-orange-100 bg-white px-4 py-2 text-sm
      transition-all duration-200 ease-in-out
      focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none ${className}`}
      {...props}
    />
  </div>
);

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ease-in-out h-11 px-6 py-2';
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 active:from-orange-700 active:to-orange-800 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30',
    secondary: 'bg-white text-orange-700 border-2 border-orange-100 hover:bg-orange-50 hover:border-orange-200 active:bg-orange-100',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30'
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
  <div className="w-full bg-orange-100 rounded-full h-3">
    <div
      className="bg-gradient-to-r from-orange-500 to-orange-400 h-3 rounded-full transition-all duration-500 relative"
      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
    >
      {progress >= 100 && (
        <span className="absolute inset-0 animate-pulse bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" />
      )}
    </div>
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
    <div className="w-full max-w-5xl mx-auto p-6 font-['Inter']">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>Financial Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-orange-950">Active Goals</h3>
                <Button
                  variant="primary"
                  onClick={() => setShowNewGoalForm(true)}
                  className="flex gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Goal
                </Button>
              </div>

              <div className="grid gap-6">
                {goals.map(goal => (
                  <div
                    key={goal.id}
                    className="p-6 border-2 border-orange-100 rounded-xl bg-gradient-to-r from-orange-50/50 to-white hover:from-orange-100/50 hover:to-white transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-xl font-semibold text-orange-950 mb-1">
                          {goal.name}
                        </h4>
                        <p className="text-sm text-gray-600">{goal.description}</p>
                      </div>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="h-9 px-3"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700">
                            Progress: ₹{goal.current.toLocaleString()} of ₹{goal.target.toLocaleString()}
                          </span>
                          <span className="font-medium text-orange-600">
                            {Math.round((goal.current / goal.target) * 100)}%
                          </span>
                        </div>
                        <ProgressBar progress={(goal.current / goal.target) * 100} />
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <Input
                          type="number"
                          placeholder="Update progress"
                          value={goal.current}
                          onChange={(e) => handleUpdateProgress(goal.id, e.target.value)}
                          className="max-w-[200px]"
                        />
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-orange-50 px-4 py-2 rounded-lg">
                          <Calendar className="w-4 h-4 text-orange-500" />
                          <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-orange-50 px-4 py-2 rounded-lg">
                          <Target className="w-4 h-4 text-orange-500" />
                          <span>{goal.type === 'long-term' ? 'Long-term' : 'Short-term'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {goals.length === 0 && (
                  <div className="text-center py-12 text-gray-500 bg-orange-50/50 rounded-xl border-2 border-dashed border-orange-200">
                    <PiggyBank className="w-12 h-12 mx-auto mb-4 text-orange-300" />
                    <p className="text-lg">No active goals. Add a new goal to get started!</p>
                  </div>
                )}
              </div>
            </div>

            {showNewGoalForm && (
              <div className="border-t-2 border-orange-100 pt-8">
                <h3 className="text-xl font-semibold text-orange-950 mb-6">Create New Goal</h3>
                <div className="grid grid-cols-2 gap-6">
                  <Input
                    label="Goal Name"
                    placeholder="Enter goal name"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  />
                  <Input
                    label="Target Amount"
                    type="number"
                    placeholder="Enter target amount"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  />
                  <Input
                    label="Current Progress"
                    type="number"
                    placeholder="Enter current amount"
                    value={newGoal.current}
                    onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                  />
                  <Input
                    label="Deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  />
                  <Select
                    label="Goal Type"
                    value={newGoal.type}
                    onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
                  >
                    <option value="short-term">Short-term</option>
                    <option value="long-term">Long-term</option>
                  </Select>
                  <Input
                    label="Description"
                    placeholder="Enter goal description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-8">
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