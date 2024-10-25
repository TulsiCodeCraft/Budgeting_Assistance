import React from 'react'
import DashboardLayout from './pages/Dashboard/dashboard'

import { BrowserRouter, Routes, Route } from 'react-router-dom';




import LandingPage from './pages/landingpage'



function App() {
  

  return (


    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard-screen" element={<DashboardLayout />} />
        </Routes>
      </BrowserRouter>
      </>


   




  )
}

export default App;
