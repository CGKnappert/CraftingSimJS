import React from 'react';
import './craftstats.css';
import { connect } from 'react-redux';

class CraftStats extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
        crafterSim: props.craftSim,
        macro: props.currMacro,
        macroResults: [],
        boxPlot: {}
      }; 
}

componentDidMount = () =>  {
  this._isMounted = true;
  console.log(this.props.craftSim.macro);
  console.log(this.state.macro);
  console.log(this.props.currMacro);

  for (let i = 0; i < 1000; i++) {
    this.state.macroResults.push(this.props.craftSim.executeMacro());
    // console.log(this.state.macroResults);
  }
  this.loadData();
  // this.aggregateResultsData();
}

componentWillUnmount = () =>  {
  this._isMounted = false;
}

loadData = async () => {
  try {
    if (this._isMounted) {
      // const craftsmanshipStat = await Asyncstorage.getItem('craftsmanshipStat')

      // if (craftsmanshipStat !== null) {
      //   this.setState({ craftsmanshipStat: craftsmanshipStat })
      // }
      }
    }
  catch (err) {
    console.log("loadData: " + err)
  }
}

aggregateResultsData = () => {
  this.state.macroResults.sort();
  const mean = (this.state.macroResults.reduce((sum, a) => sum + a, 0) / this.state.macroResults.length);
  let summation = 0;
  for (const result in this.state.macroResults) {
    summation += (result - mean) * (result - mean);
  }
  const stdDev = Math.sqrt(summation / this.state.macroResults.length); 

  this.state.boxPlot = {
    y: this.state.macroResults,
    boxpoints: 'all',
    jitter: 0.0,
    pointpos: -1.8,
    type: 'Box Plot Styling Mean and Standard Deviation'
  }
}

render() {
    return (
      <div className="craftstats-container">
        <h1>Craft Stats</h1>
        {this.props.currMacro !== undefined &&
          <div className="craftstats-macro">
            { this.props.currMacro
              .map((Name, index, arr) => <img key={index} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} /> )}
          </div>
        }
        <div className="craftstats-distribution-graph-container">

          <div className="craftstats-distribution-graph-text">

          </div>
        </div>
      </div>
    )
  }
}


const mapStateToFunction = state => {
  return {
      recipe: state.recipe
  }
}

const mapDispatchToProps = dispatch => {
  return {
      // setRecipe: (recipe) => dispatch(setRecipe(recipe))
  }
}

export default connect(mapStateToFunction, mapDispatchToProps)(CraftStats);