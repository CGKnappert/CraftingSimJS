import { SET_RECIPE, SET_MACRO, SET_MEAL, SET_TINCTURE, SET_CRAFTER_CRAFTSMANSHIP, SET_CRAFTER_CONTROL, SET_CRAFTER_CP, SET_CRAFTER_LEVEL, SET_CRAFTER_SPECIALIST, ADD_MACRO_ACTION, REMOVE_MACRO_ACTION } from './sim-actions';

const initialState = {
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
    CP: 0
  }
};

const reducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPE:
      return {
        ...state,
        recipe: action.recipe
      }
    case SET_MACRO:
      return {
        ...state,
        macro: action.macro
      }
    case SET_CRAFTER_CRAFTSMANSHIP:
      return {
        ...state,
        Craftsmanship: parseInt(action.Craftsmanship)
      }
    case SET_CRAFTER_CONTROL:
      return {
        ...state,
        Control: parseInt(action.Control)
      }
    case SET_CRAFTER_CP:
      return {
        ...state,
        CP: parseInt(action.CP)
      }
    case SET_CRAFTER_LEVEL:
      return {
        ...state,
        Level: parseInt(action.Level)
      }
    case SET_CRAFTER_SPECIALIST:
      return {
        ...state,
        Specialist: action.Specialist
      }
    case SET_MEAL:
      return {
        ...state,
        meal: {
          Craftsmanship: parseInt(action.Craftsmanship),
          Control: parseInt(action.Control),
          CP: parseInt(action.CP)
        }
      }
    case SET_TINCTURE:
      return {
        ...state,
        tincture: {
          Craftsmanship: parseInt(action.Craftsmanship),
          Control: parseInt(action.Control),
          CP: parseInt(action.CP)
        }
      }
    case ADD_MACRO_ACTION:
      return {
        ...state,
        macro: [...state.macro, action.action]
      }
    case REMOVE_MACRO_ACTION:
      
    console.log(action.position)
      return {
        ...state,
        macro: [
          ...state.macro.slice(0, action.position),
          ...state.macro.slice(action.position + 1)
        ]
      }
    default:
      return state;
  }

};

export default reducerFunction;