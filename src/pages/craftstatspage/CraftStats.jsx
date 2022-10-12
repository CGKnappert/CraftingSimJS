import React from 'react';
import './craftstats.css';
import { simulateMacro } from '../../context/index'
import { connect } from 'react-redux';
// import * as Chart from 'chart.js';

class CraftStats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      macroResults: [],
      currRecipe: '',
      currMacro: [],
      boxPlot: {},
      maxQuality: 0
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    if (this.props.macro && this.props.recipe) {
      this.runMacroResults();
    }
    this.props.simulateMacro();
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  componentDidUpdate = () => {
    if (this.props.macro && this.state.currMacro !== this.props.macro) {
      this.setState( { currMacro: this.props.macro } );
      console.log("Update macro: " + this.props.macro);
      this.runMacroResults();
      //load macro?
    }

    console.log(this.props.recipe, this.state.currRecipe);
    if (this.props.recipe && this.state.currRecipe !== this.props.recipe) {
      this.setState( { currRecipe: this.props.recipe } );
      console.log("Update recipe: " + this.props.recipe);
      this.loadRecipe();
      this.props.simulateMacro();
    }
    // if (this.props.simulatedMacro === [] && this.props.recipe) {
    if (this.props.recipe) {
      console.log(this.props.simulatedMacro);
      console.log(this.props.recipe);
      // this.props.simulateMacro();
    }
  }

  runMacroResults = () => {
    // this.props.simulateMacro();
    console.log(this.props.simulatedMacro);

    this.aggregateResultsData();

    try {
      const Quality100Header = document.querySelector('.craftstats-distribution-graph-X-axis-text-100');
      Quality100Header.innerHTML = (this.state.tempMaxQuality + ' Quality');

      const Quality50Header = document.querySelector('.craftstats-distribution-graph-X-axis-text-50');
      Quality50Header.innerHTML = ((this.state.tempMaxQuality / 2) + ' Quality');

    } catch (error) {
      console.log("Not rendered yet: " + error);
    }
  }

  loadRecipe = () => {
    try {
      const durabilityHeader = document.querySelector('.craftstats-container-recipe-durability');
      durabilityHeader.innerHTML = ('<h3>Recipe durability: ' + (this.props.macroState.durability) + '</h3>');

      const progressHeader = document.querySelector('.craftstats-container-recipe-progress');
      progressHeader.innerHTML = ('<h3>Recipe difficulty: ' + (this.props.macroState.recipeDifficulty) + '</h3>');

      const qualityHeader = document.querySelector('.craftstats-container-recipe-quality');
      qualityHeader.innerHTML = ('<h3>Recipe quality: ' + (this.props.macroState.recipeQuality) + '</h3>');
    } catch (error) {
      console.log("Not rendered yet: " + error);
    }
  }

  aggregateResultsData = () => {
    var simResults = this.props.simulatedMacro;
    let tempMaxQuality = 0;

    simResults.sort();
    const mean = (simResults.reduce((sum, a) => sum + a.quality, 0) / simResults.length);
    console.log(mean)
    let summation = 0;
    for (const result in simResults) {
      summation += (simResults[result].quality - mean) * (simResults[result].quality - mean);
      console.log(simResults[result].quality)
      if (tempMaxQuality < simResults[result].quality) tempMaxQuality = simResults[result].quality;
    }

    this.setState( {maxQuality: tempMaxQuality} )

    const stdDev = Math.sqrt(summation / simResults.length);

    console.log(tempMaxQuality, stdDev)
    // this.state.boxPlot = {
    //   y: this.state.macroResults,
    //   boxpoints: 'all',
    //   jitter: 0.0,
    //   pointpos: -1.8,
    //   type: 'Box Plot Styling Mean and Standard Deviation'
    // }


    // let allRecipesTemp = require('../../JSON/CraftRecipe.json');

    // const data = {
    //   labels: ['Test'],
    //   datasets: [{
    //     label: 'Quality',
    //     data: [18, 12, 6, 9, 12, 3, 9],
    //     backgroundColor: 'rgba(255, 26, 104, 0.2)',
    //     borderColor: 'rgba(255, 26, 104, 1)',
    //     borderWidth: 1
    //   }]
    // };

    // const config = {
    //   type: 'boxplot',
    //   data,
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // };

    // const ctx = document.getElementById("boxplot");
    // Chart.register(...registerables);
    // new Chart(ctx, config);
  }

  render() {
    return (
      <div className="craftstats-container">
      <div className='craftstats-container-recipe'>
        <h1>Recipe Stats</h1>
        <div className='craftstats-container-recipe-durability'/>
        <div className='craftstats-container-recipe-progress'/>
        <div className='craftstats-container-recipe-quality'/>
        
      </div>
        <div className='craftstats-container-craft'>
        <h1>Craft Stats</h1>
        {this.props.macro !== undefined &&
          <div className="craftstats-macro">
            {this.props.macro
              .map((Name, index, arr) => <img key={index} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} />)}
          </div>
        }
        </div>
        <div className="craftstats-distribution-graph-container">

          <div className="craftstats-distribution-graph-bar craftstats-distribution-graph-bar-recipe"/>
          <div className="craftstats-distribution-graph-bar craftstats-distribution-graph-bar-0"/>
          <div className="craftstats-distribution-graph-bar craftstats-distribution-graph-bar-50"/>
          <div className="craftstats-distribution-graph-bar craftstats-distribution-graph-bar-100"/>

          <div className="craftstats-distribution-graph-X-axis"/>
          <div className="craftstats-distribution-graph-X-axis-text craftstats-distribution-graph-X-axis-text-recipe"> 100% Recipe </div>
          <div className="craftstats-distribution-graph-X-axis-text craftstats-distribution-graph-X-axis-text-0"> 0 Quality </div>
          <div className="craftstats-distribution-graph-X-axis-text craftstats-distribution-graph-X-axis-text-50"> 50 Quality </div>
          <div className="craftstats-distribution-graph-X-axis-text craftstats-distribution-graph-X-axis-text-100"> 100 Quality </div>

          <div className="craftstats-distribution-graph-box"/>
          <div className="craftstats-distribution-graph-whisker-left-X"/>
          <div className="craftstats-distribution-graph-whisker-right-X"/>
          <div className="craftstats-distribution-graph-whisker-left-Y"/>
          <div className="craftstats-distribution-graph-whisker-right-Y"/>
        </div>
      </div>
    )
  }
}


const mapStateToFunction = state => {
  return {
    craftSim: state.craftSim,
    recipe: state.recipe,
    macro: state.macro,
    simulatedMacro: state.simulatedMacro,
    macroState: state.macroState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    simulateMacro: () => dispatch(simulateMacro())
  }
}

export default connect(mapStateToFunction, mapDispatchToProps)(CraftStats);