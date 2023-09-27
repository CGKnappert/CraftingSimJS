import React, { Component }  from 'react';
import './craftsolver.css';
import { connect } from 'react-redux';
import CrafterSolver from '../../code/solveCraft.js'
const debug = 1;


class CraftSolver extends Component {
  constructor(props) {
      super(props);
      this.state = {
        newMacro: []
      }
  }
  
  componentDidMount = () => {
    this.solver = new CrafterSolver(this.props.Craftsmanship + this.props.meal.Craftsmanship + this.props.tincture.Craftsmanship, this.props.Control + this.props.meal.Control + this.props.tincture.Control, this.props.CP + this.props.meal.CP + this.props.tincture.CP, this.props.recipe, []);
  
    // Populate Recipe Stats
    if (debug) console.log("Set name: " + this.solver.craftSim.recipeName);
    const nameHeader = document.querySelector('.craftstats-container-recipe-name');
    nameHeader.innerHTML = ('<h3>Recipe name: ' + (this.solver.craftSim.recipeName) + '</h3>');
    if (debug) console.log("Set durability: " + this.solver.craftSim.recipeDurability);
    const durabilityHeader = document.querySelector('.craftstats-container-recipe-durability');
    durabilityHeader.innerHTML = ('<h3>Recipe durability: ' + (this.solver.craftSim.recipeDurability) + '</h3>');
    if (debug) console.log("Set difficulty: " + this.solver.craftSim.difficulty);
    const progressHeader = document.querySelector('.craftstats-container-recipe-progress');
    progressHeader.innerHTML = ('<h3>Recipe difficulty: ' + (this.solver.craftSim.difficulty) + '</h3>');
    if (debug) console.log("Set quality: " + this.solver.craftSim.recipeQuality);
    const qualityHeader = document.querySelector('.craftstats-container-recipe-quality');
    qualityHeader.innerHTML = ('<h3>Recipe quality: ' + (this.solver.craftSim.recipeQuality) + '</h3>');
  }

  componentDidUpdate = () => {
    if (this.solver.craftSim.recipeName !== "" && this.props.recipe !== undefined && this.props.recipe !== "") {
          this.solver.craftSim.setRecipe(this.props.recipe);
          if (debug) console.log("Set solver recipe: " + this.props.recipe);
    }
    
    if (debug) console.log("Set best quality: " + this.solver.bestQuality);
    const bestHeader = document.querySelector('.craftstats-container-best-quality');
    bestHeader.innerHTML = ('<h3>Best quality: ' + (this.solver.bestQuality) + '</h3>');
  }

  arrayToMacro = (array) => {
    let jsonString = require('../../JSON/CraftAction.json');

    if (!array || array.length === 0) return;

    let macroStringTemp = "";
    for (let step of array) {
        for (let action of jsonString) {
            if (action["Name"] === step) {
                if ((action["ActionCategory"] !== undefined && action["ActionCategory"] !== null)) {
                    macroStringTemp += `/ac ${step} <wait.2>\n`;
                }
                else {
                    macroStringTemp += `/ac "${step}" <wait.3>\n`;
                }
            }
        }
    }
    return macroStringTemp
  }

  solve = () => {
    this.setState({newMacro: this.solver.solve()});
    this.forceUpdate();
  }

  render() {
    return (
      <div className='craft-solver'>
        <h1>Solver</h1>
        <div className='craftstats-container-recipe'>
          <div className='craftstats-container-recipe-header'>
            <h1>Recipe</h1>
          </div>
          <div className='craftstats-container-recipe-content'>
            <div className='craftstats-container-recipe-name'/>
            <div className='craftstats-container-recipe-durability'/>
            <div className='craftstats-container-recipe-progress'/>
            <div className='craftstats-container-recipe-quality'/>
            <div className='craftstats-container-best-quality'/>
          </div>
        </div>
        <div className="craft-solver-solve">
          {/* <h1>Coming Soon!</h1> */}
          <button className='craft-solver-solve-button' onClick={this.solve}>Solve</button>
          <textarea className='craft-solver-macro-string' id="exportedMacro" cols="15" type="string" value={this.arrayToMacro(this.state.newMacro)} readOnly={true} />    
        </div>    
      </div>
    )
  }
}


const mapStateToFunction = state => {
  return {
    Craftsmanship: state.Craftsmanship,
    Control: state.Control,
    CP: state.CP,
    macro: state.macro,
    tincture: state.tincture,
    meal: state.meal,
    recipe: state.recipe
  }
}


export default connect(mapStateToFunction)(CraftSolver);
