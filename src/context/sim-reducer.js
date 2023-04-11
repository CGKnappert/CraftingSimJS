import { SET_RECIPE, SET_MACRO, SIMULATE_MACRO, SET_MEAL, SET_TINCTURE, RESET_CRAFTER_STATS, SET_CRAFTER_CRAFTSMANSHIP, SET_CRAFTER_CONTROL, SET_CRAFTER_CP, SET_CRAFTER_LEVEL, SET_CRAFTER_SPECIALIST, ADD_MACRO_ACTION, REMOVE_MACRO_ACTION } from './sim-actions';


const consoleLog = 1;

const initialState = {
  recipe: "",
  macro: [],
  simulatedMacro: [],
  Level: 90,
  Craftsmanship: 2000,
  Control: 2000,
  CP: 500,
  Specialist: false,
  Buffs: [],
  meal: {
    Name: "",
    Craftsmanship: 0,
    Control: 0,
    CP: 0,
    LevelItem: 0
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
    recipeDurability: 0,
    progress: 0,
    recipeDifficulty: 0,
    quality: 0,
    recipeQuality: 0,
    currCP: 0
  }
};

const reducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPE:
      // craftSim.setRecipe(action.recipe);
      if (consoleLog) {console.log("SET_RECIPE: " + action.recipe)}
      return {
        ...state,
        recipe: action.recipe,
        // macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_MACRO:
      if (consoleLog) {console.log("SET_MACRO: " + action.macro)}
      return {
        ...state,
        macro: action.macro,
        // macroState: craftSim.executeMacro(state.macro, true, false)
      }
    case SIMULATE_MACRO:
      if (consoleLog) {console.log("SIMULATE_MACRO")}
      console.log(state.macro);
      // craftSim.printCrafter();
      let macroResults = [];
      // if (state.macro !== []) {
      //   for (let i = 0; i < 10; i++) {
      //     macroResults.push(craftSim.executeMacro(state.macro, true, false));
      //   }
      // }
      return {
        ...state,
        simulatedMacro: macroResults
      }
    case RESET_CRAFTER_STATS:
      if (consoleLog) {console.log("RESET_CRAFTER_STATS")}
      if (consoleLog) {console.log("Reset Control to: " + (state.Craftsmanship + state.tincture.Craftsmanship + state.meal.Craftsmanship))}
      // craftSim.updateCrafterCraftsmanshipStat(state.Craftsmanship + state.tincture.Craftsmanship + state.meal.Craftsmanship);
      if (consoleLog) {console.log("Reset Control to: " + (state.Control + state.tincture.Control + state.meal.Control))}
      // craftSim.updateCrafterControlStat(state.Control + state.tincture.Control + state.meal.Control);
      if (consoleLog) {console.log("Reset Control to: " + (state.CP + state.tincture.CP + state.meal.CP))}
      // craftSim.updateCrafterCPStat(state.CP + state.tincture.CP + state.meal.CP);
      return {
        ...state
      }
    case SET_CRAFTER_CRAFTSMANSHIP:
      if (consoleLog) {console.log("SET_CRAFTER_CRAFTSMANSHIP: " + action.Craftsmanship)}
      // craftSim.updateCrafterCraftsmanshipStat(parseInt(action.Craftsmanship) + state.tincture.Craftsmanship + state.meal.Craftsmanship);
      return {
        ...state,
        Craftsmanship: parseInt(action.Craftsmanship),
        // macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_CRAFTER_CONTROL:
      if (consoleLog) {console.log("SET_CRAFTER_CONTROL: " + action.Control)}
      // craftSim.updateCrafterControlStat(parseInt(action.Control) + state.tincture.Control + state.meal.Control);
      return {
        ...state,
        Control: parseInt(action.Control),
        // macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_CRAFTER_CP:
      if (consoleLog) {console.log("SET_CRAFTER_CP: " + action.CP)}
      // craftSim.updateCrafterCPStat(parseInt(action.CP) + state.tincture.CP + state.meal.CP);
      return {
        ...state,
        CP: parseInt(action.CP),
        // macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_CRAFTER_LEVEL:
      if (consoleLog) {console.log("SET_CRAFTER_LEVEL: " + action.Level)}
      return {
        ...state,
        Level: parseInt(action.Level),
        // macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_CRAFTER_SPECIALIST:
      if (consoleLog) {console.log("SET_CRAFTER_SPECIALIST: " + action.Specialist)}
      return {
        ...state,
        Specialist: action.Specialist,
        // macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_MEAL:
      if (consoleLog) {console.log(action)}
      // craftSim.updateCrafterStats(
      //   state.Craftsmanship + action.Craftsmanship + state.tincture.Craftsmanship,
      //   state.Control + action.Control + state.tincture.Control,
      //   state.CP + action.CP + state.tincture.CP,
      //   90, 
      //   0
      // )
      return {
        ...state,
        meal: {
          Name: (action.Name),
          Craftsmanship: parseInt(action.Craftsmanship),
          Control: parseInt(action.Control),
          CP: parseInt(action.CP),
          LevelItem: parseInt(action.LevelItem)
        },
        // macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case SET_TINCTURE:
      if (consoleLog) {console.log("SET_TINCTURE: " + action.Name)}
      // craftSim.updateCrafterStats(
      //   state.Craftsmanship + state.meal.Craftsmanship + action.Craftsmanship,
      //   state.Control + state.meal.Control + action.Control,
      //   state.CP + state.meal.CP + action.CP,
      //   90, 
      //   0
      // )
      return {
        ...state,
        tincture: {
          Name: action.Name,
          Craftsmanship: parseInt(action.Craftsmanship),
          Control: parseInt(action.Control),
          CP: parseInt(action.CP)
        },
        // macroState: craftSim.executeMacro(state.macro, false, false)
      }
    case ADD_MACRO_ACTION:
      if (consoleLog) {console.log("ADD_MACRO_ACTION: " + action.action)}
      return {
        ...state,
        macro: [...state.macro, action.action],
        // macroState: craftSim.executeMacro([...state.macro, action.action], false, false)
      }
    case REMOVE_MACRO_ACTION:
      if (consoleLog) {console.log("REMOVE_MACRO_ACTION: " + action.action)}
      return {
        ...state,
        macro: [
          ...state.macro.slice(0, action.position),
          ...state.macro.slice(action.position + 1)
        ],
        // macroState: craftSim.executeMacro([
        //   ...state.macro.slice(0, action.position),
        //   ...state.macro.slice(action.position + 1)
        // ], false, false)
      }
    default:
      return state;
  }

};

export default reducerFunction;