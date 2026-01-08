import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserLogin from './pages/userLogin'
import UserSignUp from './pages/UserSignUp'
import DriverLogin from './pages/DriverLogin'
import DriverSignUp from './pages/DriverSignUp'
import UserLogout from './pages/Logout'
import DriverHome from './pages/DriverHome'
import AuthWrapper from './utils/authWrapper'
import Riding from './pages/Riding'
import DriverRiding from './pages/DriverRiding'
import Home from './pages/Home2'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
         <Route path='/riding' element={
          <AuthWrapper>
            <Riding />
          </AuthWrapper>
          } />
          <Route path='/driver-riding' element={
            <AuthWrapper>

            <DriverRiding />
            </AuthWrapper>
            
            } />
        <Route path='/driver-login' element={<DriverLogin />} />
        <Route path='/driver-signup' element={<DriverSignUp />} />
        <Route path='/home' element={
          <AuthWrapper>
            <Home />
          </AuthWrapper>
        } />
        <Route path='/user/logout' element={
          <AuthWrapper>
            <UserLogout />
          </AuthWrapper>
        } />

        <Route path='/driver-home' element={
          <AuthWrapper>
            <DriverHome />
          </AuthWrapper>
        } />
    </Routes>
    </div>
  )
}

export default App