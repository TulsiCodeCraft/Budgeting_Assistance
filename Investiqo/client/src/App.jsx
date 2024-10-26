import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './pages/landingpage';
import BudgetManager from './pages/Dashboard/BudgetManager';
import FinancialGoals from './pages/Dashboard/FinancialGoals';
import FinancialInsights from './pages/Dashboard/FinancialInsights';

import ExpenseTracker from './pages/Dashboard/ExpenseTracker';
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';






import DashboardLayout from './pages/Dashboard/DashboardScreen';








import LandingPage from './pages/landingpage'

import React from 'react';
import DashboardLayout from './pages/Dashboard/DashboardScreen';

import DebtManager from './pages/Dashboard/DebtManager';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landingpage />} />



    <>
      <BrowserRouter>
        <Routes>
          {/* landing page */}
          <Route path="/" element={<Landingpage/>} /> 
          <Route path="/dashboard-screen" element={<DashboardLayout />} />

          <Route path="/budget" element={<BudgetManager/>} /> 
          <Route path="/goals" element={<FinancialGoals/>} /> 
          <Route path="/insights" element={<FinancialInsights/>} /> 
         
          <Route path="/debt" element={<FinancialInsights/>} /> 

          <Route path="/Budget" element={<BudgetManager/>} /> 
          <Route path="/FinancialGoals" element={<FinancialGoals/>} /> 
          <Route path="/FinicialInsights" element={<FinancialInsights/>} />
          <Route path="/DebtManeger" element={<DebtManager/>} /> 
          <Route path="/expenses" element={<ExpenseTracker/>} /> 





        </Routes>   
      </BrowserRouter>
    </>
=======
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