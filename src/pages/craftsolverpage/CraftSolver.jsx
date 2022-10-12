import React, { Component }  from 'react';
import './craftsolver.css';
import { connect } from 'react-redux';
import CrafterSolver from '../../code/solveCraft.js'


class CraftSolver extends Component {
  constructor(props) {
      super(props);
      this.state = {
        newMacro: []
      }
}
  
  componentDidMount = () => {
    console.log(this.props.recipe);
    this.solver = new CrafterSolver(this.props.Craftsmanship + this.props.meal.Craftsmanship + this.props.tincture.Craftsmanship, this.props.Control + this.props.meal.Control + this.props.tincture.Control, this.props.CP + this.props.meal.CP + this.props.tincture.CP, this.props.recipe, []);
}

  solve = () => {
    this.setState({newMacro: this.solver.solveProgress()});
    this.forceUpdate();
  }

  render() {
    return (
      <div className='craft-solver'>
        <h1>Solver</h1>
        <div className="craft-solver-solve">
          <button className='craft-solver-solve-button' onClick={this.solve}>Solve</button>
        </div>
        <div className='craft-solver-macro-string'>
          {JSON.stringify(this.state.newMacro)}
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
