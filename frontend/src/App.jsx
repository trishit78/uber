import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import UserLogin from './pages/userLogin'
import UserSignUp from './pages/UserSignUp'
import DriverLogin from './pages/DriverLogin'
import DriverSignUp from './pages/DriverSignUp'


const App = () => {
  return (
    <div>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/driver-login' element={<DriverLogin />} />
        <Route path='/driver-signup' element={<DriverSignUp />} />
    </Routes>
    </div>
  )
}

export default App