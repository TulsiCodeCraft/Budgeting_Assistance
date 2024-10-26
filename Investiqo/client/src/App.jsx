
import Landingpage from './pages/landingpage';
import BudgetManager from './pages/Dashboard/BudgetManager';
import FinancialGoals from './pages/Dashboard/FinancialGoals';
import FinancialInsights from './pages/Dashboard/FinancialInsights';

import ExpenseTracker from './pages/Dashboard/ExpenseTracker';
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';






import DashboardLayout from './pages/Dashboard/DashboardScreen';












import DebtManager from './pages/Dashboard/DebtManager';

function App() {
  return (
   
      <BrowserRouter>
       


       <Routes>

        {/* Dashboard Layout with nested routes */}
        <Route path="/dashboard-screen" element={<DashboardLayout />}>
          <Route path="budget-manager" element={<BudgetManager />} />
          <Route path="financial-goals" element={<FinancialGoals />} />
          <Route path="financial-insights" element={<FinancialInsights />} />
          <Route path="debt-manager" element={<DebtManager />} />
          <Route path="expense-tracker" element={<ExpenseTracker />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;