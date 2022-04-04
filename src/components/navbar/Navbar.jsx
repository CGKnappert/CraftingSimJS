import React, { Component } from 'react';
import CrafterSim from '../../code/craftingSim.js'
import bunnyLogo from '../../assets/Bunny Head.png'
import './navbar.css';
import { BrowserRouter as Router, Route, NavLink, Routes, Link } from 'react-router-dom'
import { CraftStats, CraftSolver } from '../../containers';
import { CraftingSimulatorPage } from '../../pages';


class Navbar extends Component {
  constructor(props) {
    super(props);
    let tempSim = new CrafterSim("", 0, 2000, 2000, 500, 90, 0);
    tempSim.loadActions();
    this.state = {
      recipe: "",
      macro: [],
      mainSim: tempSim
    };
  }

  setRecipe = (value) => {
      let tempVaue = value;
      this.setState( {recipe: tempVaue} );
      console.log("Navbar: " + tempVaue);
    
      // try {
      //     await Asyncstorage.setItem('recipe', tempVaue);
      // }
      // catch (err) {
      //     console.log("setRecipe: " + err);
      // }
  }

  setMacro = (value) => {
      let tempVaue = value;
      this.setState( {macro: tempVaue} );
      console.log("Navbar: " + tempVaue);
    
      // try {
      //     await Asyncstorage.setItem('recipe', tempVaue);
      // }
      // catch (err) {
      //     console.log("setRecipe: " + err);
      // }
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
            <Route exact path="/" element={<CraftingSimulatorPage setRecipeFunction={ this.setRecipe } setMacroFunction={ this.setMacro } currRecipe={ this.state.recipe } currMacro={ this.state.macro } craftSim={ this.state.mainSim } />} />
            <Route path="/statistics" element={<CraftStats setRecipeFunction={ this.setRecipe } setMacroFunction={ this.setMacro } currRecipe={ this.state.recipe } currMacro={ this.state.macro } craftSim={ this.state.mainSim } />} />
            <Route path="/solver" element={<CraftSolver />} />
        </Routes>
      </div>
      </Router>
    )
  }
}

export default Navbar
