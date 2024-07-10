import React from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './screen/Home';
import Login from "./screen/Login"
import Register from "./screen/Register"
import Dashboard from './screen/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/dashboard" element={<Dashboard/>}/>
          
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
