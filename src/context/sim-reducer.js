import { SET_RECIPE, SET_MACRO, SET_MEAL, SET_TINCTURE, SET_CRAFTER } from './sim-actions';

const initialState = {
  recipe: "",
  macro: [],
  crafter: {
    Level: 90,
    Craftsmanship: 1000,
    Control: 1000,
    CP: 500,
    Specialist: false
  },
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
    case SET_CRAFTER:
      return {
        ...state,
        crafter: {
          Level: action.Level,
          Craftsmanship: action.Craftsmanship,
          Control: action.Control,
          CP: action.CP,
          Specialist: action.Specialist
        }
      }
    case SET_MEAL:
      return {
        ...state,
        meal: {
          Craftsmanship: action.Craftsmanship,
          Control: action.Control,
          CP: action.CP
        }
      }
    case SET_TINCTURE:
      return {
        ...state,
        tincture: {
          Craftsmanship: action.Craftsmanship,
          Control: action.Control,
          CP: action.CP
        }
      }
    default:
      return state;
  }

};

export default reducerFunction;