import React from 'react';
import './craftstats.css';
import Plot from 'react-plotly.js';

class CraftStats extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
        crafterSim: props.craftSim,
        macro: props.currMacro,
        macroResults: []
      }; 
}

componentDidMount = () =>  {
  this._isMounted = true;

  for (let i = 0; i < 1000; i++) {
    this.state.macroResults.push(this.props.craftSim.executeMacro());
  }
  this.loadData();
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
  const mean = (this.state.macroResults.reduce((sum, a) => sum + a, 0) / this.state.macroResults.length());
  const summation = 0;
  for (const result in this.state.macroResults) {
    summation += (result - mean) * (result - mean);
  }
  const stdDev = Math.sqrt(summation / this.state.macroResults.length()); 
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

        </div>
      </div>
    )
  }
}

export default CraftStats