import { createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import reducerFunction from "./sim-reducer";
import CrafterSim from '../code/craftingSim.js'

const craftSim = new CrafterSim("", 0, 2000, 2000, 500, 90, 0);
craftSim.loadActions();

const initialState = {
    craftSim: craftSim,
    recipe: "",
    macro: [],
    Level: 90,
    Craftsmanship: 2000,
    Control: 2000,
    CP: 500,
    Specialist: false,
    meal: {
      Craftsmanship: 0,
      Control: 0,
      CP: 0
    },
    tincture: {
      Craftsmanship: 0,
      Control: 0,
      CP: 0,
      LevelItem: 0
    },
    macroState: {
      currBuffs: {},
      durability: 0,
      progress: 0,
      recipeDifficulty: 0,
      quality: 0,
      recipeQuality: 0,
      currCP: 0
    }
  };

const savedStore = localStorage.getItem('simState') ? JSON.parse(localStorage.getItem('simState')) : initialState;

console.log(savedStore);

export const simStore = createStore(
    reducerFunction,
    savedStore,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

simStore.subscribe(() => {
    localStorage.setItem('simState', JSON.stringify(simStore.getState()))
});

// export default simStore;