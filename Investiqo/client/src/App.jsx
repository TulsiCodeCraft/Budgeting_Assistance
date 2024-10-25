import {BrowserRouter , Routes, Route} from "react-router-dom";
import Landingpage from './pages/landingpage';
import BudgetManager from './pages/Dashboard/BudgetManager';
import FinancialGoals from './pages/Dashboard/FinancialGoals';
import FinancialInsights from './pages/Dashboard/FinancialInsights';
import React from 'react'
import DashboardLayout from './pages/Dashboard/dashboard'




import LandingPage from './pages/landingpage'
import DebtManager from './pages/Dashboard/DebtManager';


function App() {
  return (


    <>
      <BrowserRouter>
        <Routes>
          {/* landing page */}
          <Route path="/" element={<Landingpage/>} /> 
          <Route path="/dashboard-screen" element={<DashboardLayout />} />
          <Route path="/Budget-manager" element={<BudgetManager/>} /> 
          <Route path="/financial-goals" element={<FinancialGoals/>} /> 
          <Route path="/financial-insights" element={<FinancialInsights/>} />
          <Route path="/debt-manager" element={<DebtManager/>} /> 




        </Routes>   
      </BrowserRouter>
    </>
  );
      


   




  
}

export default App;
