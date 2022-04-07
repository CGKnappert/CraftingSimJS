import React, { Component } from 'react';
import './craftingsimulatorpage.css';
import { CrafterActions, CrafterStats } from '../../containers';
import Asyncstorage from '@react-native-async-storage/async-storage';
import RecipeDropDownList from '../../containers/recipedropdown/RecipeDropdown'
import MealsNTincture from '../../containers/mealsntincture/MealsNTincture'
import ClassSelector from '../../containers/classselector/classSelector'
import images from './crafters.js';
import { setMeal, setTincture } from '../../context/index'
import { connect } from 'react-redux';



class CraftingSimulatorPage extends Component {
    constructor(props) {
        super(props);
        //TODO: Fix into state
        this.classImages = images;
        this.state = { 
            selected: [],
            craftActions: [],
            currBuffs: {},
            currDurability: 0,
            currProgress: 0,
            currQuality: 0,
            currCP: 0,
            craftsmanshipStat: 2000,
            controlStat: 2000,
            cpStat: 500
        }
    }

    componentDidMount = () =>  {
        this._isMounted = true;
        // this.loadData();
    }
  
    componentWillUnmount = () =>  {
      this._isMounted = false;
    }

    setToggleClass = (id) => {
      this.classImages[id]["state"] = !this.classImages[id]["state"];
      let newSelected = [];
      this.classImages.forEach(element => {
        if (element["state"]) {
          newSelected.push(element["shortClass"]);
        }
      });
      this.setState({selected: newSelected});
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
  
    // loadData = async () => {
    //     try {
    //         const recipe = await Asyncstorage.getItem('recipe')
    //         if (recipe !== null) {
    //             this.setState({ recipe: recipe });
    //         }
    //     }
    //     catch (err) {
    //         console.log("loadData: " + err)
    //     }
        
    // }

    // setRecipe = async (value) => {
    //     let tempVaue = value;
    //     this.setState( {recipe: tempVaue} );
      
    //     try {
    //         await Asyncstorage.setItem('recipe', tempVaue);
    //     }
    //     catch (err) {
    //         console.log("setRecipe: " + err);
    //     }
    // }

    render() {
        return (
            <div>
                <div className='stickysim__header-content'>
                  <h1 className='gradient__text'>FFXIV Crafting Simulator</h1>
                </div>

                <div className='stickysim__class-selector'>
                    <ClassSelector setToggleClass={ this.setToggleClass } classImages={ this.classImages }  />
                </div>
                <div className='stickysim__recipe-dropdown'>
                  <RecipeDropDownList classFilter={ this.state.selected } currRecipe={ this.props.currRecipe } />
                </div>
                <div className='stickysim__crafter-stats'>
                    <CrafterStats currRecipe={ this.props.currRecipe } />
                </div>
                <div className='stickysim__crafter-meals-and-tincture'>
                    <MealsNTincture simulatorUpdate={ this.simulatorUpdate } />
                </div>
                <div className='stickysim__macro-state'>
                </div>
                <div className='stickysim__current-buffs'>
                </div>
                <div className='stickysim__current-macro'>
                </div>
                <div className='stickysim__crafter-actions'>
                    <CrafterActions setMacroFunction={ this.props.setMacroFunction }  currMacro={ this.props.currMacro } craftSim={ this.props.craftSim } />
                </div>
            </div>
        )
    }
}


const mapStateToFunction = state => {
  return {
      recipe: state.recipe,
      meal: state.meal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMeal: (meal) => dispatch(setMeal(meal)),
    setTincture: (tincture) => dispatch(setTincture(tincture))
  }
}

export default connect(mapStateToFunction, mapDispatchToProps)(CraftingSimulatorPage);