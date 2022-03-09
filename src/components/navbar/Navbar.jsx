import React from 'react';
//import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import logo from '../../assets/Bunny Head.png'
import './navbar.css';

const Navbar = () => {
  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="gpt3__navbar-links_container">
          <p><a href="#simulater">Simulator</a></p>
          <p><a href="#statistics">Statistics</a></p>
          <p><a href="#solver">Solver</a></p>
        </div>
      </div>

      <div className='gpt3__navbar-sign'>
        <p>Sign In</p>
        <button type="button">Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar
