import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './pages/landingpage';
import BudgetManager from './pages/Dashboard/BudgetManager';
import FinancialGoals from './pages/Dashboard/FinancialGoals';
import FinancialInsights from './pages/Dashboard/FinancialInsights';
import React from 'react';
import DashboardLayout from './pages/Dashboard/DashboardScreen';
import DebtManager from './pages/Dashboard/DebtManager';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landingpage />} />

        {/* Dashboard Layout with nested routes */}
        <Route path="/dashboard-screen" element={<DashboardLayout />}>
          <Route path="budget-manager" element={<BudgetManager />} />
          <Route path="finanacial-goals" element={<FinancialGoals />} />
          <Route path="financial-insights" element={<FinancialInsights />} />
          <Route path="debt-manager" element={<DebtManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;