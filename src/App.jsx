import { useState, useContext } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { AuthContext } from './context/auth.context'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import AmazonPage from './pages/amazonPages/AmazonPage'

function App() {

  const { user, isLoggedIn } = useContext(AuthContext)

  const LoggedIn = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
  }

  const NotLoggedIn = () => {
    return !isLoggedIn ? <Outlet /> : <Navigate to='/' />
  }

  return (
    <div>
      <Navbar />

      <Routes>

        <Route path='/' element={<HomePage />} />

        <Route element={<NotLoggedIn />}>

              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />

            </Route>

            <Route element={<LoggedIn />}>

              <Route path='/logout' />

            </Route>

            <Route path='/amazon' element={<AmazonPage />} />


      </Routes>
    </div>
  )
}

export default App
