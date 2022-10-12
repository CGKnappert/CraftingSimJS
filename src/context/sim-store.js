import {createStore, applyMiddleware, compose} from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import reducerFunction from "./sim-reducer";
import CrafterSim from '../code/craftingSim.js'
import thunkMiddleware from 'redux-thunk'

const craftSim = new CrafterSim("", 0, 2000, 2000, 500, 90, 0);
craftSim.loadActions();

const initialState = {
    craftSim: craftSim,
    recipe: "",
    macro: [],
    simulatedMacro: [],
    Level: 90,
    Craftsmanship: 2000,
    Control: 2000,
    CP: 500,
    Specialist: false,
    meal: {
      Name: "",
      Craftsmanship: 0,
      Control: 0,
      CP: 0
    },
    tincture: {
      Name: "",
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

// const savedStore = localStorage.getItem('simState') ? JSON.parse(localStorage.getItem('simState')) : initialState;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducerFunction)


// console.log(JSON.stringify(savedStore));

export const simStore = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware]
  // const middlewares = [thunkMiddleware];
  // const middlewareEnhancer = applyMiddleware(...middlewares);

  // const storeEnhancers = [middlewareEnhancer];

  // const composedEnhancer = compose(...storeEnhancers);

  // const simStore = createStore(
  //   persistedReducer,
  //   savedStore,
  //   composedEnhancer
  // )

  // return simStore;
})

export const persistor = persistStore(simStore);