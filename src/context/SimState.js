import React, { useReducer } from "react";
import simReducer from './sim-reducer';
import { SET_RECIPE } from './sim-actions';


const SimState = (props) => {

    let allRecipesTemp = require('../JSON/CraftRecipe.json');
    let allRecipesVerifiedTemp = [];
    for (const recipe of allRecipesTemp) {
        try {
             if (recipe.RecipeLevelTable.ClassJobLevel > 0 && allRecipesVerifiedTemp) {
                allRecipesVerifiedTemp.push(recipe);
             }
        }
        catch {
        }
    }
    console.log("running SimState load");
    allRecipesVerifiedTemp = [...new Map(allRecipesVerifiedTemp.map(item => [item.Name, item])).values()];
    
    const initialState = {recipe: "",
        simulator: {},
        allRecipes: allRecipesVerifiedTemp
    };
    
    const [state, dispatch] = useReducer(simReducer, initialState);

    const SetRecipe = (recipe) => {
        console.log("SimState" + recipe);
        dispatch({
            type: SET_RECIPE,
            payload: recipe
        })
    }
    
    const SetSimulator = (simulator) => {
        dispatch({
            type: 'te',
            payload: simulator
        })
    }

    return ( <div></div>
    //   <SimContext.Provider value={{
    //     recipe: state.recipe,
    //     simulator: state.simulator,
    //     SetRecipe,
    //     SetSimulator
    //   }}>{props.children}</SimContext.Provider>
    )
}

export default SimState;