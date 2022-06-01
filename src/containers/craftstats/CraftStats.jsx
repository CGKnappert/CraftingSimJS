'use strict';

import React from 'react';
import './craftstats.css';
import { connect } from 'react-redux';
import * as Chart from 'chart.js';

class CraftStats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      crafterSim: props.craftSim,
      macroResults: [],
      boxPlot: {}
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    console.log(this.props.currMacro);

    for (let i = 0; i < 1000; i++) {
      this.state.macroResults.push(this.props.craftSim.executeMacro(this.props.currMacro, false, false));
      // console.log(this.state.macroResults);
    }
    // this.loadData();
    this.aggregateResultsData();
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  // loadData = async () => {
  //   try {
  //     if (this._isMounted) {
  //       // const craftsmanshipStat = await Asyncstorage.getItem('craftsmanshipStat')

  //       // if (craftsmanshipStat !== null) {
  //       //   this.setState({ craftsmanshipStat: craftsmanshipStat })
  //       // }
  //       }
  //     }
  //   catch (err) {
  //     console.log("loadData: " + err)
  //   }
  // }

  aggregateResultsData = () => {
    this.state.macroResults.sort();
    const mean = (this.state.macroResults.reduce((sum, a) => sum + a, 0) / this.state.macroResults.length);
    let summation = 0;
    for (const result in this.state.macroResults) {
      summation += (result - mean) * (result - mean);
    }
    const stdDev = Math.sqrt(summation / this.state.macroResults.length);

    // this.state.boxPlot = {
    //   y: this.state.macroResults,
    //   boxpoints: 'all',
    //   jitter: 0.0,
    //   pointpos: -1.8,
    //   type: 'Box Plot Styling Mean and Standard Deviation'
    // }


    let allRecipesTemp = require('../../JSON/CraftRecipe.json');

    const data = {
      labels: ['Test'],
      datasets: [{
        label: 'Quality',
        data: [18, 12, 6, 9, 12, 3, 9],
        backgroundColor: 'rgba(255, 26, 104, 0.2)',
        borderColor: 'rgba(255, 26, 104, 1)',
        borderWidth: 1
      }]
    };

    const config = {
      type: 'boxplot',
      data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const ctx = document.getElementById("boxplot");
    // Chart.register(...registerables);
    new Chart(ctx, config);
  }

  render() {
    return (
      <div className="craftstats-container">
        <h1>Craft Stats</h1>
        {this.props.currMacro !== undefined &&
          <div className="craftstats-macro">
            {this.props.currMacro
              .map((Name, index, arr) => <img key={index} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} />)}
          </div>
        }
        <div className="craftstats-distribution-graph-container">

          <div className="craftstats-distribution-graph-text">
            <canvas id="boxplot" width="400" height="400"></canvas>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToFunction = state => {
  return {
    recipe: state.recipe,
    macro: state.macro
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // setRecipe: (recipe) => dispatch(setRecipe(recipe))
  }
}

export default connect(mapStateToFunction, mapDispatchToProps)(CraftStats);