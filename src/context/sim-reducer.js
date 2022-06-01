import CrafterSim from '../code/craftingSim.js'
import { SET_RECIPE, SET_MACRO, SET_MEAL, SET_TINCTURE, SET_CRAFTER_CRAFTSMANSHIP, SET_CRAFTER_CONTROL, SET_CRAFTER_CP, SET_CRAFTER_LEVEL, SET_CRAFTER_SPECIALIST, ADD_MACRO_ACTION, REMOVE_MACRO_ACTION } from './sim-actions';

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

craftSim.updateCrafterStats(
  initialState.Craftsmanship + initialState.meal.Craftsmanship + initialState.tincture.Craftsmanship,
  initialState.Control + initialState.meal.Control + initialState.tincture.Control,
  initialState.CP + initialState.meal.CP + initialState.tincture.CP,
  90, 
  0
)

const reducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPE:
      craftSim.setRecipe(action.recipe)
      return {
        ...state,
        recipe: action.recipe,
        macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_MACRO:
      return {
        ...state,
        macro: action.macro,
        macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_CRAFTER_CRAFTSMANSHIP:
      craftSim.updateCrafterCraftsmanshipStat(parseInt(action.Craftsmanship) + state.tincture.Craftsmanship + state.meal.Craftsmanship);
      return {
        ...state,
        Craftsmanship: parseInt(action.Craftsmanship),
        macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_CRAFTER_CONTROL:
      craftSim.updateCrafterControlStat(parseInt(action.Control) + state.tincture.Control + state.meal.Control);
      return {
        ...state,
        Control: parseInt(action.Control),
        macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_CRAFTER_CP:
      craftSim.updateCrafterCPStat(parseInt(action.CP) + state.tincture.CP + state.meal.CP);
      return {
        ...state,
        CP: parseInt(action.CP),
        macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_CRAFTER_LEVEL:
      return {
        ...state,
        Level: parseInt(action.Level),
        macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_CRAFTER_SPECIALIST:
      return {
        ...state,
        Specialist: action.Specialist,
        macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_MEAL:
      craftSim.updateCrafterStats(
        state.Craftsmanship + action.Craftsmanship + state.tincture.Craftsmanship,
        state.Control + action.Control + state.tincture.Control,
        state.CP + action.CP + state.tincture.CP,
        90, 
        0
      )
      return {
        ...state,
        meal: {
          Craftsmanship: parseInt(action.Craftsmanship),
          Control: parseInt(action.Control),
          CP: parseInt(action.CP),
          LevelItem: parseInt(action.LevelItem)
        },
        macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_TINCTURE:
      craftSim.updateCrafterStats(
        state.Craftsmanship + state.meal.Craftsmanship + action.Craftsmanship,
        state.Control + state.meal.Control + action.Control,
        state.CP + state.meal.CP + action.CP,
        90, 
        0
      )
      return {
        ...state,
        tincture: {
          Craftsmanship: parseInt(action.Craftsmanship),
          Control: parseInt(action.Control),
          CP: parseInt(action.CP)
        },
        macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case ADD_MACRO_ACTION:
      return {
        ...state,
        macro: [...state.macro, action.action],
        macroState: craftSim.executeMacro([...state.macro, action.action], false, false)
      }
    case REMOVE_MACRO_ACTION:
      return {
        ...state,
        macro: [
          ...state.macro.slice(0, action.position),
          ...state.macro.slice(action.position + 1)
        ],
        macroState: craftSim.executeMacro([
          ...state.macro.slice(0, action.position),
          ...state.macro.slice(action.position + 1)
        ], false, false)
      }
    default:
      return state;
  }

};

export default reducerFunction;