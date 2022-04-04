import React, { Component, useState, useContext } from 'react';
import './craftingsim.css';
import Asyncstorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';


class CraftingSim extends Component {
  constructor(props) {
      super(props);
      this.state = {
        craftActions: [],
        // currMacro: props.currMacro,
        currBuffs: {},
        currDurability: 0,
        currProgress: 0,
        currQuality: 0,
        currCP: 0,
        mealBonusCraftsmanship: 0,
        mealBonusControl: 0,
        mealBonusCP: 0,
        // craftSim: props.craftSim,
        // recipe: props.currRecipe,
        craftsmanshipStat: 2000,
        controlStat: 2000,
        cpStat: 500,
        currMeal: {},
        currTinct: {},
        mealArray: [],
        tinctureArray: [],
        isMealHQ: false,
        isTinctureHQ: false,
        isMealActive: false,
        isTinctureActive: false
      }; 
  }

  componentDidMount = () =>  {
    this._isMounted = true;
    // this.loadData();
    const actions = require('../../JSON/CraftAction.json');
    this.setState({ craftActions: actions })
    this.props.craftSim.setRecipe(this.props.currRecipe);

    let mealsTemp = require('../../JSON/Meals.json');
    let allMealsVerifiedTemp = [];
    for (const meal of mealsTemp.Results) {
        try {
            if (meal.Bonuses.hasOwnProperty("Craftsmanship") || meal.Bonuses.hasOwnProperty("Control") || meal.Bonuses.hasOwnProperty("CP")) {
              allMealsVerifiedTemp.push(meal);
            }
        }
        catch {
        }
    }

    this.setState( {
      mealArray: allMealsVerifiedTemp
    })

    var input = document.getElementById("mealInput");
    input.onfocus = () => {
        if (input.value === 'Select a meal') {
            input.value = '';
        }
        this.setState({isMealActive : true});
      }

      input.onblur = () => {
        if (input.value === '') {
            input.value = 'Select a meal';
        }
        this.setState({isMealActive : false});
      }
      
    this.simulatorUpdate();
  }
  
  componentWillUnmount = () =>  {
    this._isMounted = false;
  }
  componentDidUpdate = () => {
    // this.simulatorUpdate();
  }

  loadData = async () => {
    try {
      if (this._isMounted) {
        const craftsmanshipStat = await Asyncstorage.getItem('craftsmanshipStat')
        const controlStat = await Asyncstorage.getItem('controlStat')
        const cpStat = await Asyncstorage.getItem('cpStat')
        const currRecipe = await Asyncstorage.getItem('currRecipe')
        const currMeal = await Asyncstorage.getItem('currMeal')
        const currMacro = await Asyncstorage.getItem('currMacro')

        if (craftsmanshipStat !== null) {
          this.setState({ craftsmanshipStat: craftsmanshipStat })
        }
        if (controlStat !== null) {
          this.setState({ controlStat: controlStat })
        }
        if (cpStat !== null) {
          this.setState({ cpStat: cpStat })
        }
        if (currRecipe !== null) {
          // this.setState({ cpStat: cpStat })
        }
        if (currMacro !== null) {
          // this.setState({ currMacro: JSON.parse(currMacro) })
        }
        if (currMeal !== null) {
          this.setState({ currMeal: JSON.parse(currMeal) })
          let mealInput = document.getElementById("mealInput");

          this.setState( {isMealHQ: !this.state.isMealHQ,
            mealBonusCraftsmanship: (this.state.currMeal.Bonuses.Craftsmanship !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Craftsmanship.MaxHQ : this.state.currMeal.Bonuses.Craftsmanship.Max) : 0,
            mealBonusControl: (this.state.currMeal.Bonuses.Control !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Control.MaxHQ : this.state.currMeal.Bonuses.Control.Max) : 0,
            mealBonusCP: (this.state.currMeal.Bonuses.CP !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.CP.MaxHQ : this.state.currMeal.Bonuses.CP.Max) : 0
          } );

          this.updateMeal(JSON.parse(currMeal).Name);
        }
      }
    }
    catch (err) {
      console.log("loadData: " + err)
    }
    // this.props.craftSim.updateCrafterStats(parseInt(this.state.craftsmanshipStat) + parseInt(this.state.mealBonusCraftsmanship), parseInt(this.state.controlStat) + parseInt(this.state.mealBonusControl), parseInt(this.state.cpStat) + parseInt(this.state.mealBonusCP), 90, 0);
    this.simulatorUpdate();
  }

  updateCrafterCraftsmanshipStat = async (event) =>  {
    this.setState({ craftsmanshipStat: event.target.value })
    this.props.craftSim.updateCrafterCraftsmanshipStat(event.target.value);
    this.simulatorUpdate();
    try {
      await Asyncstorage.setItem('craftsmanshipStat', event.target.value)
    }
    catch (err) {
      console.log("updateCrafterCraftsmanshipStat: " + err)
    }
  }

  updateCrafterControlStat = async (event) =>  {
    this.setState({ controlStat: event.target.value })
    this.props.craftSim.updateCrafterControlStat(event.target.value);
    this.simulatorUpdate();
    try {
      await Asyncstorage.setItem('controlStat', event.target.value)
    }
    catch (err) {
      console.log("updateCrafterControlStat: " + err)
    }
  }

  updateCrafterCPStat = async (event) =>  {
    this.setState({ cpStat: event.target.value })
    this.props.craftSim.updateCrafterCPStat(event.target.value);
    this.simulatorUpdate();
    try {
      await Asyncstorage.setItem('cpStat', event.target.value)
    }
    catch (err) {
      console.log("updateCrafterCPStat: " + err)
    }
  }

  toggleMealHQ = () => {
    this.setState( {isMealHQ: !this.state.isMealHQ,
      mealBonusCraftsmanship: (this.state.currMeal.Bonuses.Craftsmanship !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Craftsmanship.MaxHQ : this.state.currMeal.Bonuses.Craftsmanship.Max) : 0,
      mealBonusControl: (this.state.currMeal.Bonuses.Control !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Control.MaxHQ : this.state.currMeal.Bonuses.Control.Max) : 0,
      mealBonusCP: (this.state.currMeal.Bonuses.CP !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.CP.MaxHQ : this.state.currMeal.Bonuses.CP.Max) : 0
    } );
    this.props.craftSim.updateCrafterStats(parseInt(this.state.craftsmanshipStat) + parseInt((this.state.currMeal.Bonuses.Craftsmanship !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Craftsmanship.MaxHQ : this.state.currMeal.Bonuses.Craftsmanship.Max) : 0), 
      parseInt(this.state.controlStat) + parseInt((this.state.currMeal.Bonuses.Control !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.Control.MaxHQ : this.state.currMeal.Bonuses.Control.Max) : 0), 
      parseInt(this.state.cpStat) + parseInt((this.state.currMeal.Bonuses.CP !== undefined) ? (!this.state.isMealHQ ? this.state.currMeal.Bonuses.CP.MaxHQ : this.state.currMeal.Bonuses.CP.Max) : 0), 90, 0);
    this.simulatorUpdate();
    // try {
    //   await Asyncstorage.setItem('mealHQ', !this.state.isMealHQ)
    // }
    // catch (err) {
    //   console.log("toggleMealHQ: " + err)
    // }
  }

  clearMealSearch = () => {
      let mealInput = document.getElementById("mealInput");
      mealInput.value = '';       
      this.setState( {isMealActive: true,
        currMeal: null,
        mealBonusCraftsmanship: 0,
        mealBonusControl: 0,
        mealBonusCP: 0
      } );
  }

  clearTinctureSearch = () => {
      let tinctureInput = document.getElementById("tinctureInput");
      tinctureInput.value = '';
      this.setState( {isTinctureActive: true} );
  }

  updateMeal = (value) => {
    const newValue = value;
    let mealInput = document.getElementById("mealInput");

    mealInput.value = newValue;
    for (const meal of this.state.mealArray) {
      if (meal.Name === newValue) {
        this.setState( {currMeal: meal,
          mealBonusCraftsmanship: (meal.Bonuses.Craftsmanship !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Craftsmanship.MaxHQ : meal.Bonuses.Craftsmanship.Max) : 0,
          mealBonusControl: (meal.Bonuses.Control !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Control.MaxHQ : meal.Bonuses.Control.Max) : 0,
          mealBonusCP: (meal.Bonuses.CP !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.CP.MaxHQ : meal.Bonuses.CP.Max) : 0
        } );
        // try {
        //   await Asyncstorage.setItem('currMeal', JSON.stringify(meal))
        // }
        // catch (err) {
        //   console.log("toggleMealHQ: " + err)
        // }

        // TODO: Update Lvl and Specialist
        this.props.craftSim.updateCrafterStats(parseInt(this.state.craftsmanshipStat) + parseInt((meal.Bonuses.Craftsmanship !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Craftsmanship.MaxHQ : meal.Bonuses.Craftsmanship.Max) : 0), 
          parseInt(this.state.controlStat) + parseInt((meal.Bonuses.Control !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.Control.MaxHQ : meal.Bonuses.Control.Max) : 0), 
          parseInt(this.state.cpStat) + parseInt((meal.Bonuses.CP !== undefined) ? (this.state.isMealHQ ? meal.Bonuses.CP.MaxHQ : meal.Bonuses.CP.Max) : 0), 90, 0);
        break;
      }
    } 


    this.setState( {isMealActive: false} );
    this.simulatorUpdate();
  }

  updateMealSearch = () => {
    let mealInput = document.getElementById("recipeInput");
    this.setState( {search: mealInput.value} );
  }

  updateTincture = () => {
      let tinctInput = document.getElementById("tinctInput");
      this.setState( {currTinct: tinctInput.value} );
      this.setState( {isTinctActive: false} );
      this.simulatorUpdate();
  }

  simulatorUpdate = () =>  {
    this.props.craftSim.setRecipe(this.props.currRecipe);
    this.props.craftSim.executeMacro(this.props.currMacro, false, false);

    try {
      if (this.props.currRecipe !== "") {
        document.querySelector(".crafting-sim-recipe-icon-img").src = require(`../../assets/RecipeIcons/${ this.props.recipe }.png`);
      }

      const currProgress = document.querySelector('.crafting-sim-progress-bar-current');
      currProgress.style.width = Math.min(((this.props.craftSim.progress / this.props.craftSim.difficulty) * 100), 100)  + '%';
      currProgress.style.opacity = 1;

      const currQuality = document.querySelector('.crafting-sim-quality-bar-current');
      currQuality.style.width = Math.min(((this.props.craftSim.quality / this.props.craftSim.recipeQuality) * 100), 100) + '%';
      currQuality.style.opacity = 1;

      const currCP = document.querySelector('.crafting-sim-CP-bar-current');
      currCP.style.width = Math.min(((this.props.craftSim.CP / this.props.craftSim.maxCP) * 100), 100) + '%';
      currCP.style.opacity = 1;

      const progressHeader = document.querySelector('.crafting-sim-progress-header-right');
      progressHeader.innerHTML = ('<h3>' + (this.props.craftSim.progress) + ' / ' + ((this.props.craftSim.difficulty !== undefined) ? this.props.craftSim.difficulty : 0) + '</h3>');

      const qualityHeader = document.querySelector('.crafting-sim-quality-header-right');
      qualityHeader.innerHTML = ('<h3>' + (this.props.craftSim.quality) + ' / ' + ((this.props.craftSim.recipeQuality !== undefined) ? this.props.craftSim.recipeQuality : 0) + '</h3>');

      const CPHeader = document.querySelector('.crafting-sim-CP-header-right');
      CPHeader.innerHTML = ('<h3>' + (this.props.craftSim.CP) + ' / ' + (this.props.craftSim.maxCP) + '</h3>');

      console.log(this.props.recipe)
      const recipeHeader = document.querySelector('.crafting-sim-recipe-title');
      recipeHeader.innerHTML = ('<h3>Recipe: ' + (this.props.recipe) + '</h3>');
    } catch (error) {
      console.log("Not rendered yet: " + error)
    }
    
    
    this.setState({ currDurability: this.props.craftSim.durability,
      currProgress: this.props.craftSim.progress,
      currQuality: this.props.craftSim.quality,
      currCP: this.props.craftSim.CP,
      currBuffs: this.props.craftSim.activeBuffs
    })
  }
  

  addAction = async (value) =>  {
    let tempMacro = this.props.currMacro;
    tempMacro.push(value);
    this.props.setMacroFunction(tempMacro);
    // this.setState({ currMacro: tempMacro })
    this.simulatorUpdate();
    // try {
    //   await Asyncstorage.setItem('currMacro', JSON.stringify(this.state.currMacro))
    //   console.log("try" + JSON.stringify(this.state.currMacro))
    // }
    // catch (err) {
    //   console.log("currMacro: " + err)
    // }
  }


  removeAction = async (value) =>  {
    let tempMacro = this.props.currMacro;
    tempMacro.splice(value, 1);
    this.props.setMacroFunction(tempMacro);
    // this.setState({ currMacro: tempMacro })
    this.simulatorUpdate();
    // try {
    //   await Asyncstorage.setItem('currMacro', JSON.stringify(this.state.currMacro))
    //   console.log("try" + JSON.stringify(this.state.currMacro))
    // }
    // catch (err) {
    //   console.log("currMacro: " + err)
    // }
  }


  exportMacro = () =>  {
    this.simulatorUpdate();
  }


  importMacro = (value) =>  {
    this.props.craftSim.reformatMacro(value);
    this.simulatorUpdate();
  }


  render() {
    // TODO: Set states to const before refercning below
    return (
      <div className='crafting-sim-container'>
        <h1>CraftingSim</h1>
        <div className='crafting-sim-stats-and-recipe'>
          <div className='crafting-sim-stats-container'>
            <div className='crafting-sim-crafter-stats-title'><h3>Crafter Stats:</h3></div>
            <div className='crafting-sim-crafter-stats'>
              <label htmlFor="craftsmanship">Craftsmanship: </label>
              <input type="number" className='crafting-sim-crafter-craftsmanship' id="craftsmanship" placeholder="2000" min="1" max ="5000" onChange={ this.updateCrafterCraftsmanshipStat } value={ this.state.craftsmanshipStat } />
              <label htmlFor="control">Control: </label>
              <input type="number" className='crafting-sim-crafter-control' id="control" placeholder="2000" min="1" max ="5000" onChange={ this.updateCrafterControlStat } value={ this.state.controlStat } />
              <label htmlFor="CP">CP: </label>
              <input type="number" className='crafting-sim-crafter-CP' id="CP" placeholder="500" min="1" max ="2000" onChange={ this.updateCrafterCPStat } value={ this.state.cpStat } />
            </div>
          </div>
          <div className='crafting-sim-recipe-container'>
            <div className='crafting-sim-recipe-title'/>
            <div className='crafting-sim-recipe-icon'><img className='crafting-sim-recipe-icon-img' alt='' /></div>
          </div>
        </div>
        <div className="crafting-sim-food-and-tinct-container">
          <div className="crafting-sim-food-container">
            <div className="crafting-sim-meal-dropdown-search-title"><p>Meals</p></div>
            <input className="crafting-sim-meal-dropdown-button" 
                    onChange={ () => this.updateMealSearch() }
                    type="text"
                    name="mealInput"
                    id="mealInput"
                    autoComplete="off"
            />
            <img src={require(`../../assets/HQIcon.png`)} className='crafting-sim-meal-dropdown-hq-icon' alt="mealHQ" onClick={ this.toggleMealHQ } style={this.state.isMealHQ ? {opacity: 1} : {opacity: 0.2}} />
            <img src={require(`../../assets/clear.png`)} className='crafting-sim-meal-dropdown-clear-icon' alt="mealCear" onClick={ this.clearMealSearch }/>
            {this.state.isMealActive &&
              <div className="crafting-sim-meal-dropdown-content">
                {this.state.mealArray
                  // sort by ilvl desc
                  .sort((a, b) => b.LevelItem - a.LevelItem)
                  //Map Name to image and div display
                  .map((x) => (
                    <div 
                      onMouseDown={ this.updateMeal.bind(this, x.Name) }
                      key={ x.Name }
                      className="crafting-sim-meal-dropdown-meal" >
                      <img src={require(`../../assets/Meals/${x.Name}.png`)} className="crafting-sim-meal-dropdown-meal-icon" alt="x.Name" />
                      <div className="crafting-sim-meal-dropdown-meal-name">{x.Name} </div>
                    </div>
                ))}
              </div>
            }
            <div className="crafting-sim-meal-text">
              <div className="crafting-sim-meal-text-craftsmanship">
                Cr: {this.state.mealBonusCraftsmanship}  
              </div>
              <div className="crafting-sim-meal-text-control">
                Co: {this.state.mealBonusControl} 
              </div> 
              <div className="crafting-sim-meal-text-CP">
                CP: {this.state.mealBonusCP} 
              </div>
              <div className="crafting-sim-meal-text-lvl">
                iLvl: {(this.state.currMeal !== null && Object.keys(this.state.currMeal).length > 0 && this.state.currMeal.LevelItem !== undefined) ? this.state.currMeal.LevelItem : 0}
              </div>
            </div>
          </div>
          <div className="crafting-sim-tinct-container">
          </div>
        </div>
        <div className="crafting-sim-status-container">


          <div className="crafting-sim-progress-status">
            <div className="crafting-sim-progress-header">
              <div className="crafting-sim-progress-header-left">
                <h3>Craft Progress </h3>
              </div>
              <div className="crafting-sim-progress-header-right">
              </div>
            </div>
            <div className="crafting-sim-progress-bar-total">
              <div className="crafting-sim-progress-bar-current">
              </div>
            </div>
          </div>

          <div className="crafting-sim-quality-status">
            <div className="crafting-sim-quality-header">
              <div className="crafting-sim-quality-header-left">
                <h3>Craft Quality </h3>
              </div>
              <div className="crafting-sim-quality-header-right">
              </div>
              </div>
            <div className="crafting-sim-quality-bar-total">
              <div className="crafting-sim-quality-bar-current">
              </div>
            </div>
          </div>

          <div className="crafting-sim-CP-status">
            <div className="crafting-sim-CP-header">
              <div className="crafting-sim-progress-header-left">
                <h3>Craft CP </h3>
              </div>
              <div className="crafting-sim-CP-header-right">
              </div>
              </div>
            <div className="crafting-sim-CP-bar-total">
              <div className="crafting-sim-CP-bar-current">
              </div>
            </div>
          </div>

        </div>

        <div className="crafting-sim-buffs-active">
          <div className="crafting-sim-buffs-active-header">
            <h3>Current Buffs</h3>
          </div>
          {Object.keys(this.state.currBuffs).length > 0 && 
          <div className="crafting-sim-buffs-active-image">
            { Object.entries(this.state.currBuffs)
              .filter(([Name]) => (Name !== 'Observe' || Name !== 'Trained Eye'))
              .map(([Name]) => <img key={Name} src={require(`../../assets/Buff Icons/${Name}${(Name === 'Inner Quiet') ? this.state.currBuffs['Inner Quiet'] : ''}.png`)} title={Name} alt={Name} /> )}
          </div>
          }
        </div>
            
        <div className="crafting-sim-macro">
          <div className="crafting-sim-macro-header">
              <div className="crafting-sim-progress-header-left">
                <h3>Macro in progress</h3>
              </div>
              <div className="crafting-sim-CP-header-right">
                <button className='exportMacro' onClick={this.exportMacro}>Export</button>
                <button className='importMacro'onClick={this.importMacro}>Import</button>
              </div>
          </div>
          <div className="crafting-sim-macro-actions">
            { this.props.currMacro
              .map((Name, index, arr) => <img key={index} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.removeAction(index)} /> )}
          </div>
        </div>

        <div className="crafting-sim-actions">

          <div className="crafting-sim-synthesis">
            <h3>Synthesis Actions</h3>
            <div className="crafting-sim-synthesis-actions">
              { this.state.craftActions
                .filter(({Description}) => Description.search('progress') !== -1)
                .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.addAction(Name)} /> )}
            </div>
          </div>
              
          <div className="crafting-sim-quality">
            <h3>Quality Actions</h3>
            <div className="crafting-sim-quality-actions">
              { this.state.craftActions
                .filter(({Description}) => Description.search('quality') !== -1)
                .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.addAction(Name)}  /> )}
            </div>
              
          </div>

          <div className="crafting-sim-buffs">
            <h3>Buff Actions</h3>
            <div className="crafting-sim-buffs-actions">
              { this.state.craftActions
                .filter(({Description}) => (Description.search('progress') === -1 && Description.search('quality') === -1))
                .map(({ Name }) => <img key={Name} src={require(`../../assets/Action Icons/${Name}.png`)} title={Name} alt={Name} onClick={e => this.addAction(Name)}  /> )}
            </div>
              
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

export default connect(mapStateToFunction, mapDispatchToProps)(CraftingSim);
