import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'

function App({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default App
