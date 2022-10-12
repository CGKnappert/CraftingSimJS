import React, { Component } from 'react';
import bunnyLogo from '../../assets/Bunny Head.png'
import './navbar.css';
import { resetCrafterStats, setRecipe } from '../../context/index'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, NavLink, Routes, Link } from 'react-router-dom'
import { CraftingSimulatorPage, CraftStats, CraftSolver } from '../../pages';


class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    console.log("NavBar");
    console.log(this.props.recipe);
    let tempRecipe = this.props.recipe;
    if (tempRecipe) {
      console.log(tempRecipe);
      console.log(this.props.macro);
      // this.props.setRecipe(tempRecipe);
      // this.props.resetCrafterStats();
      // this.forceUpdate();
    }
  }
  
  render() {
    return (
      <Router>
      <div className="stickysim__navbar">
        <div className="stickysim__navbar-links">
          <div className="stickysim__navbar-links_logo">
              <NavLink to="/" src={bunnyLogo} alt="bunnyLogo"></NavLink>
          </div>
              <nav>
          <div className="stickysim__navbar-links_container">
	  		        <div className="stickysim__navbar-links_items"><Link to="/">Simulator</Link></div>
	  		        <div className="stickysim__navbar-links_items"><Link to="/statistics">Statistics</Link></div>
	  		        <div className="stickysim__navbar-links_items"><Link to="/solver">Solver</Link></div>
          </div>
              </nav>
          <div className='stickysim__navbar-sign'>
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
      </Router>
    )
  }
}

const mapStateToFunction = state => {
  return {
    recipe: state.recipe,
    macro: state.macro,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetCrafterStats: () => dispatch(resetCrafterStats()),
    setRecipe: () => dispatch(setRecipe())
  }
}

export default connect(mapStateToFunction, mapDispatchToProps)(Navbar);
