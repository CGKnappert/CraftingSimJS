import React from 'react';
import './craftstats.css';
import { simulateMacro } from '../../context/index'
import { connect } from 'react-redux';
import CrafterSim from '../../code/craftingSim.js'
const debug = 1;

class CraftStats extends React.Component {

  constructor(props) {
    super(props);
    const craftSimTemp = new CrafterSim("", 0, 2000, 2000, 500, 90, 0);
    craftSimTemp.loadActions();

    this.state = {
      Craftsmanship: 2000,
      Control: 2000,
      CP: 500,
      currMeal: "",
      currTincture: "",
      currRecipe: "",
      currMacro: [],
      craftSim: craftSimTemp,
      macroResults: [],
      maxQuality: 0,
      mean: 0,
      stdDev: 0
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    if (debug) console.log("CraftStatsDidMount")
    
    var rerunSim = false;
    if ((this.props.Craftsmanship && (this.state.Craftsmanship !== this.props.Craftsmanship)) || (this.props.Control && (this.state.Control !== this.props.Control)) || (this.props.CP && (this.state.CP !== this.props.CP))) {
      this.setState( { Craftsmanship: this.props.Craftsmanship,
        Control: this.props.Control,
        CP: this.props.CP } );
      console.log("Update Stats");
      rerunSim = true;
    }
    
    if (this.props.meal && Object.keys(this.props.meal).length !== 0 && this.props.meal.Name !== this.state.currMeal) {
      if (debug) console.log("CraftStats New Meal: " + this.props.meal.Name);
      this.setState( { currMeal: this.props.meal.Name } )
      rerunSim = true;
    }

    if (this.props.tincture && Object.keys(this.props.tincture).length !== 0 && this.props.tincture.Name !== this.state.currTincture) {
      if (debug) console.log("CraftStats New Tincture: " + this.props.tincture.Name);
      this.setState( { currTincture: this.props.tincture.Name } )
      rerunSim = true;
    }

    if (this.props.macro && this.props.macro.length > 0 && this.state.currMacro !== this.props.macro) {
      this.setState( { currMacro: this.props.macro } );
      console.log("Update macro: " + this.props.macro);
      rerunSim = true;
    }

    if (this.props.recipe && this.state.currRecipe !== this.props.recipe) {
      this.setState( { currRecipe: this.props.recipe } );
      console.log("Update recipe: " + this.props.recipe);
      this.state.craftSim.setRecipe(this.props.recipe);
      rerunSim = true;
    }

    if (rerunSim) {
      this.state.craftSim.updateCrafterStats(this.props.Craftsmanship + this.props.meal.Craftsmanship + this.props.tincture.Craftsmanship, this.props.Control + this.props.meal.Control + this.props.tincture.Control, this.props.CP + this.props.meal.CP + this.props.tincture.CP, 90, false)
      this.simulateMacro();
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false;
    if (debug) console.log("CraftStatsWillUnmount")
  }

  componentDidUpdate = () => {
    if (debug) console.log("CraftStatsDidUpdate")
    
    var rerunSim = false;
    if ((this.props.Craftsmanship && (this.state.Craftsmanship !== this.props.Craftsmanship)) || (this.props.Control && (this.state.Control !== this.props.Control)) || (this.props.CP && (this.state.CP !== this.props.CP))) {
      this.setState( { Craftsmanship: this.props.Craftsmanship,
        Control: this.props.Control,
        CP: this.props.CP } );
      console.log("Update Stats");
      rerunSim = true;
    }
    
    if (this.props.meal && Object.keys(this.props.meal).length !== 0 && this.props.meal.Name !== this.state.currMeal) {
      if (debug) console.log("CraftStats New Meal: " + this.props.meal.Name);
      this.setState( { currMeal: this.props.meal.Name } )
      rerunSim = true;
    }

    if (this.props.tincture && Object.keys(this.props.tincture).length !== 0 && this.props.tincture.Name !== this.state.currTincture) {
      if (debug) console.log("CraftStats New Tincture: " + this.props.tincture.Name);
      this.setState( { currTincture: this.props.tincture.Name } )
      rerunSim = true;
    }

    if (this.props.macro && this.props.macro.length > 0 && this.state.currMacro !== this.props.macro) {
      this.setState( { currMacro: this.props.macro } );
      console.log("Update macro: " + this.props.macro);
      rerunSim = true;
    }

    if (this.props.recipe && this.state.currRecipe !== this.props.recipe) {
      this.setState( { currRecipe: this.props.recipe } );
      console.log("Update recipe: " + this.props.recipe);
      this.state.craftSim.setRecipe(this.props.recipe);
      rerunSim = true;
    }

    if (rerunSim) {
      this.state.craftSim.updateCrafterStats(this.props.Craftsmanship + this.props.meal.Craftsmanship + this.props.tincture.Craftsmanship, this.props.Control + this.props.meal.Control + this.props.tincture.Control, this.props.CP + this.props.meal.CP + this.props.tincture.CP, 90, false)
      this.simulateMacro();
    }
  }

  simulateMacro  = () => {
    if (debug) console.log(this.props.macro);
    if (debug) this.state.craftSim.printCrafter();

    let macroResultsTemp = [];
    if (this.props.macro !== []) {
      for (let i = 0; i < 1000; i++) {
        let result = this.state.craftSim.executeMacro(this.props.macro, true, false)
        // if (debug) console.log(result);
        macroResultsTemp.push((result.returnState === 4) ? result.quality : 0);
      }
    }
    if (debug) console.log(macroResultsTemp);
    
    macroResultsTemp.sort((a, b) => a - b);
    const mean = (macroResultsTemp.reduce((sum, a) => sum + a.quality, 0) / macroResultsTemp.length);
    // console.log(mean)
    // let summation = 0;
    // for (const result in macroResultsTemp) {
    //   summation += (macroResultsTemp[result].quality - mean) * (macroResultsTemp[result].quality - mean);
    //   console.log(macroResultsTemp[result].quality)
    //   if (tempMaxQuality < macroResultsTemp[result].quality) tempMaxQuality = macroResultsTemp[result].quality;
    // }

    // const stdDev = Math.floor(Math.sqrt(summation / macroResultsTemp.length));

    // console.log(tempMaxQuality, stdDev)

    this.setState( { macroResults: macroResultsTemp, 
      mean: mean},
      this.drawMacroResults);
  }

  drawMacroResults = () => {
    if (debug) console.log("CraftStats: Draw");

    try {
      if (debug) console.log("Set name: " + this.state.craftSim.recipeName);
      const nameHeader = document.querySelector('.craftstats-container-recipe-name');
      nameHeader.innerHTML = ('<h3>Recipe name: ' + (this.state.craftSim.recipeName) + '</h3>');

      if (debug) console.log("Set durability: " + this.state.craftSim.recipeDurability);
      const durabilityHeader = document.querySelector('.craftstats-container-recipe-durability');
      durabilityHeader.innerHTML = ('<h3>Recipe durability: ' + (this.state.craftSim.recipeDurability) + '</h3>');

      if (debug) console.log("Set difficulty: " + this.state.craftSim.difficulty);
      const progressHeader = document.querySelector('.craftstats-container-recipe-progress');
      progressHeader.innerHTML = ('<h3>Recipe difficulty: ' + (this.state.craftSim.difficulty) + '</h3>');

      if (debug) console.log("Set quality: " + this.state.craftSim.recipeQuality);
      const qualityHeader = document.querySelector('.craftstats-container-recipe-quality');
      qualityHeader.innerHTML = ('<h3>Recipe quality: ' + (this.state.craftSim.recipeQuality) + '</h3>');

      if (debug) console.log("macro Results: " + this.state.macroResults[0]);
      let min = this.state.macroResults[0];
      let max = this.state.macroResults[this.state.macroResults.length - 1];
      let box25 = this.state.macroResults[Math.floor(this.state.macroResults.length / 4)];
      let box75 = this.state.macroResults[Math.floor((this.state.macroResults.length / 4) * 3)];
      let falseMax = (Math.floor(max.toString()[0]) + 1) * (10 ** (max.toString().length - 1));
      if (debug) console.log("macro stats: ", min, max, box25, box75, falseMax);

      const Quality100Header = document.querySelector('.craftstats-distribution-graph-X-axis-text-100');
      Quality100Header.innerHTML = (falseMax + ' Quality');

      const Quality50Header = document.querySelector('.craftstats-distribution-graph-X-axis-text-50');
      Quality50Header.innerHTML = ((Math.floor(falseMax / 2)) + ' Quality');

      const box = document.querySelector('.craftstats-distribution-graph-box');
      box.style.marginLeft = (((box25) / falseMax) * 100) + "%";
      box.style.width = (((box75 - box25) / falseMax) * 100) + "%";

      
      const leftYWhisker = document.querySelector('.craftstats-distribution-graph-whisker-left-Y');
      leftYWhisker.style.marginLeft = (((min) / falseMax) * 100) + "%";
      
      const rightYWhisker = document.querySelector('.craftstats-distribution-graph-whisker-right-Y');
      rightYWhisker.style.marginLeft = ((max / falseMax) * 100) + "%";

      const leftXWhisker = document.querySelector('.craftstats-distribution-graph-whisker-left-X');
      leftXWhisker.style.marginLeft = (((min) / falseMax) * 100) + "%";
      leftXWhisker.style.width = "calc(" + (((box25 - min) / falseMax) * 100) + "%)";
      
      const rightXWhisker = document.querySelector('.craftstats-distribution-graph-whisker-right-X');
      rightXWhisker.style.marginLeft = (((box25) / falseMax) * 100) + (((box75 - box25) / falseMax) * 100) + "%";
      rightXWhisker.style.width = (((max / falseMax) * 100) - ((box75 / falseMax) * 100)) + "%";
      
      const recipeBar = document.querySelector('.craftstats-distribution-graph-bar-recipe');
      recipeBar.style.width = ((this.state.craftSim.recipeQuality / falseMax) * 100) + "%";
      
      const recipeText = document.querySelector('.craftstats-distribution-graph-X-axis-text-recipe');
      recipeText.style.left = ((this.state.craftSim.recipeQuality / falseMax) * 100) + "%";
      
      const leftText = document.querySelector('.craftstats-distribution-graph-whisker-left-text');
      leftText.style.marginLeft = "calc(" + (((min) / falseMax) * 100) + "% - 50px)";
      leftText.innerHTML = (min + ' Quality');
      
      const rightText = document.querySelector('.craftstats-distribution-graph-whisker-right-text');
      rightText.style.marginLeft = "calc(" + ((max / falseMax) * 100) + "% - 50px)";
      rightText.innerHTML = (max + ' Quality');
      
      const boxLeftText = document.querySelector('.craftstats-distribution-graph-whisker-25-text');
      boxLeftText.style.marginLeft = "calc(" + ((box25 / falseMax) * 100) + "% - 50px)";
      boxLeftText.innerHTML = (box25 + ' Quality');
      
      const boxRightText = document.querySelector('.craftstats-distribution-graph-whisker-75-text');
      boxRightText.style.marginLeft = "calc(" + ((box75 / falseMax) * 100) + "% - 50px)";
      boxRightText.innerHTML = (box75 + ' Quality');

      this.forceUpdate();
    } catch (error) {
      console.log("Not rendered yet: " + error);
    }
  }

  render() {
    return (
      <div className="craftstats-container">
        <div className='craftstats-container-recipe'>
          <div className='craftstats-container-recipe-header'>
            <h1>Recipe Stats</h1>
          </div>
          <div className='craftstats-container-recipe-content'>
            <div className='craftstats-container-recipe-name'/>
            <div className='craftstats-container-recipe-durability'/>
            <div className='craftstats-container-recipe-progress'/>
            <div className='craftstats-container-recipe-quality'/>
          </div>
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
          <div className="craftstats-distribution-graph">
            <div className="craftstats-distribution-graph-text craftstats-distribution-graph-whisker-left-text"/>
            <div className="craftstats-distribution-graph-text craftstats-distribution-graph-whisker-right-text"/>
            <div className="craftstats-distribution-graph-text craftstats-distribution-graph-whisker-25-text"/>
            <div className="craftstats-distribution-graph-text craftstats-distribution-graph-whisker-75-text"/>

            <div className="craftstats-distribution-graph-Y-axis"/>
            <div className="craftstats-distribution-graph-bar craftstats-distribution-graph-bar-recipe"/>
            <div className="craftstats-distribution-graph-bar craftstats-distribution-graph-bar-0"/>
            <div className="craftstats-distribution-graph-bar craftstats-distribution-graph-bar-50"/>
            <div className="craftstats-distribution-graph-bar craftstats-distribution-graph-bar-100"/>

            <div className="craftstats-distribution-graph-X-axis"/>
            <div className="craftstats-distribution-graph-X-axis-text craftstats-distribution-graph-X-axis-text-recipe"> 100% Recipe </div>
            <div className="craftstats-distribution-graph-X-axis-text craftstats-distribution-graph-X-axis-text-0"> 0 Quality </div>
            <div className="craftstats-distribution-graph-X-axis-text craftstats-distribution-graph-X-axis-text-50"> 50 Quality </div>
            <div className="craftstats-distribution-graph-X-axis-text craftstats-distribution-graph-X-axis-text-100"> 100 Quality </div>

            <div className="craftstats-distribution-graph-box-and-whiskers">
              <div className="craftstats-distribution-graph-box"/>

              <div className="craftstats-distribution-graph-whisker-left-X"/>
              <div className="craftstats-distribution-graph-whisker-right-X"/>
              <div className="craftstats-distribution-graph-whisker-left-Y"/>
              <div className="craftstats-distribution-graph-whisker-right-Y"/>
            </div>
          </div>
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
    meal: state.meal,
    tincture: state.tincture,
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