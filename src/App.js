import React from 'react';
import { Navbar } from './components';
import { Header, CraftingSim, CraftStats, Footer } from './containers';
import './App.css'

const App = () => {
  return (
    <div className="App">
        <div className="gradient__bg">
            <Navbar />
            <Header />
        <CraftingSim />
        <CraftStats />
        <Footer />
        </div>
    </div>
  )
}

export default App
