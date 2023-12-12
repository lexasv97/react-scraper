import { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import {Routes, Route} from 'react-router-dom'

function App() {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
