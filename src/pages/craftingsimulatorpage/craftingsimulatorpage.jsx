import React, { Component } from 'react';
import './craftingsimulatorpage.css';
import { CraftingSim, RecipeSelector } from '../../containers';
import Asyncstorage from '@react-native-async-storage/async-storage';
import RecipeDropDownList from '../../containers/recipedropdown/RecipeDropdown'
import MealsNTincture from '../../containers/mealsntincture/MealsNTincture'
import ClassSelector from '../../containers/classselector/classSelector'
import images from './crafters.js';



class CraftingSimulatorPage extends Component {
    constructor(props) {
        super(props);
        //TODO: Fix into state
        this.classImages = images;
        this.state = { 
            selected: []
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
                    <CraftingSim setMacroFunction={ this.props.setMacroFunction }  currMacro={ this.props.currMacro } craftSim={ this.props.craftSim } />
                </div>
                <div className='stickysim__crafter-meals-and-tincture'>
                    <MealsNTincture/>
                </div>
                <div className='stickysim__macro-state'>
                </div>
                <div className='stickysim__current-buffs'>
                </div>
                <div className='stickysim__current-macro'>
                </div>
                <div className='stickysim__crafter-actions'>
                </div>
            </div>
        )
    }
}

export default CraftingSimulatorPage