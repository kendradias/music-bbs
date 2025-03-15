import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'
import Search from '../pages/Search'
import ThreadBoard from '../pages/ThreadBoard'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App><Home /></App>} />
        <Route path="/about" element={<App><About /></App>} />
        <Route path="/search" element={<App><Search /></App>} />
        <Route path="/threads" element={<App><ThreadBoard /></App>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
