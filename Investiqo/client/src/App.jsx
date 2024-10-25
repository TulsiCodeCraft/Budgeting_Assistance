import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landingpage from './pages/landingpage';
import BudgetManager from './pages/Dashboard/BudgetManager';
import FinancialGoals from './pages/Dashboard/FinancialGoals';
import FinancialInsights from './pages/Dashboard/FinancialInsights';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* landing page */}
          <Route path="/" element={<Landingpage/>} /> 

          <Route path="/Budget" element={<BudgetManager/>} /> 
          <Route path="/FinancialGoals" element={<FinancialGoals/>} /> 
          <Route path="/FinicialInsights" element={<FinancialInsights/>} /> 



        </Routes>   
      </Router>
    </>
  );
}

export default App;
