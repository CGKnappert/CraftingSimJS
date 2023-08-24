import React, { Component } from 'react';
import bunnyLogo from '../../assets/Just Bun.png'
import './navbar.css';
import { resetCrafterStats, setRecipe } from '../../context/index'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, NavLink, Routes, Link } from 'react-router-dom'
import { CraftingSimulatorPage, CraftStats, CraftSolver } from '../../pages';


class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Router>
      <div className="stickysim">
        <div className="stickysim__navbar">
          <div className="stickysim__navbar-links">
            <div className="stickysim__navbar-links_logo">
                <NavLink to="/" alt="bunnyLogo"><img className='bunnyLogo' src={bunnyLogo}/></NavLink>
            </div>
                <nav>
            <div className="stickysim__navbar-links_container">
	  	  	        <div className="stickysim__navbar-links_items"><Link to="/">Simulator</Link></div>
	  	  	        <div className="stickysim__navbar-links_items"><Link to="/statistics">Statistics</Link></div>
	  	  	        <div className="stickysim__navbar-links_items"><Link to="/solver">Solver</Link></div>
            </div>
                </nav>
            {/* <div className='stickysim__navbar-sign'>
            </div> */}
            <div className="stickysim__navbar-header">
              <h1 className='gradient__text'>FFXIV Crafting Simulator</h1>
            </div>
          </div>
        </div>
        <div className="stickysim-body">
          <Routes>
              <Route exact path="/" element={<CraftingSimulatorPage />} />
              <Route path="/statistics" element={<CraftStats />} />
              <Route path="/solver" element={<CraftSolver />} />
          </Routes>
        </div>
      </div>
      </Router>
    )
  }
}

// const mapStateToFunction = state => {
//   return {
//     recipe: state.recipe,
//     macro: state.macro,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     resetCrafterStats: () => dispatch(resetCrafterStats()),
//     setRecipe: () => dispatch(setRecipe())
//   }
// }

// export default connect(mapStateToFunction, mapDispatchToProps)(Navbar);
export default (Navbar);
