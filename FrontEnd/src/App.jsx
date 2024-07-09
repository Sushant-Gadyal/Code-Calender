import React from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './screen/Home';
import Login from "./screen/Login"
import Register from "./screen/Register"

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
