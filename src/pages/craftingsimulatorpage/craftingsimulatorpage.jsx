import React, { Component } from 'react';
import { CraftingSim, RecipeSelector } from '../../containers';
import CrafterSim from '../../code/craftingSim.js'
import Asyncstorage from '@react-native-async-storage/async-storage';



class CraftingSimulatorPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    componentDidMount = () =>  {
        this._isMounted = true;
        // this.loadData();
    }
  
    componentWillUnmount = () =>  {
      this._isMounted = false;
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
                <RecipeSelector setRecipeFunction={ this.props.setRecipeFunction }  />
                <CraftingSim setMacroFunction={ this.props.setMacroFunction }  currMacro={ this.props.currMacro } craftSim={ this.props.craftSim } />
            </div>
        )
    }
}

export default CraftingSimulatorPage