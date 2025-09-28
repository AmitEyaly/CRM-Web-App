// import { useState } from 'react'
import './App.css'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import ViewComp from './ViewComp'
import AvaleComp from './AvaleComp'
import PricingComp from './PricingComp'
import EventDetComp from './EventDetComp'
import RegisterComp from './RegisterComp'
import LoginComp from './LoginComp'
import ReservationsComp from './ReservationsComp'
import OperationsComp from './OperationsComp'
import EmployesComp from './EmployesComp'
import UserProfileComp from './UserProfileComp'
import ClientsComp from './ClientsComp'

function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<ViewComp />}/>
        <Route path="/register" element={<RegisterComp />}/>
        <Route path="/login" element={<LoginComp />}/>
        <Route path ="/emploies" element={<EmployesComp/>}/>
        <Route path="/avalable" element={<AvaleComp />}/>
        <Route path="/pricing" element={<PricingComp />}/> 
        <Route path="/eventDetails" element={<EventDetComp />}/>
        <Route path="/reservations" element={<ReservationsComp />}/> 
        <Route path="/operations" element={<OperationsComp />}/>
        <Route path="/user" element={<UserProfileComp />}/>
        <Route path="/clients" element={<ClientsComp />}/>
      </Routes>
     </Router>
    
    </>
  )
}

export default App
