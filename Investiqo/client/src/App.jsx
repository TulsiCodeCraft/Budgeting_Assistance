import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './pages/landingpage';
import BudgetManager from './pages/Dashboard/BudgetManager';
import FinancialGoals from './pages/Dashboard/FinancialGoals';
import FinancialInsights from './pages/Dashboard/FinancialInsights';
import React from 'react'
import DashboardLayout from './pages/Dashboard/DashboardScreen'










function App() {
  return (


    <>
      <Router>
        <Routes>
          {/* landing page */}
          <Route path="/" element={<Landingpage/>} /> 
          <Route path="/dashboard-screen" element={<DashboardLayout />} />
          <Route path="/budget" element={<BudgetManager/>} /> 
          <Route path="/goals" element={<FinancialGoals/>} /> 
          <Route path="/insights" element={<FinancialInsights/>} /> 
          <Route path="/expenses" element={<FinancialInsights/>} /> 
          <Route path="/debt" element={<FinancialInsights/>} /> 



        </Routes>   
      </Router>
    </>
  );
      


   




  
}

export default App;
