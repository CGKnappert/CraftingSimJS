import { SET_RECIPE, SET_MACRO, SET_MEAL, SET_TINCTURE, SET_CRAFTER_CRAFTSMANSHIP, SET_CRAFTER_CONTROL, SET_CRAFTER_CP, SET_CRAFTER_LEVEL, SET_CRAFTER_SPECIALIST, ADD_MACRO_ACTION, REMOVE_MACRO_ACTION } from './sim-actions';
import { createStore, applyMiddleware, compose } from "redux";
import reducerFunction from "./sim-reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export function setRecipe(recipe) {
    console.log("index: " + recipe);
    return {
        type: SET_RECIPE,
        recipe: recipe
    }
}

export function setMacro(macro) {
    console.log("Index: " + macro)
    return {
        type: SET_MACRO,
        macro: macro
    }
}

export function setMeal(meal) {
    console.log("Index: " + meal)
    return {
        type: SET_MEAL,
        Craftsmanship: meal.Craftsmanship,
        Control: meal.Control,
        CP: meal.CP
    }
}

export function setTincture(tincture) {
    console.log("Index: " + tincture)
    return {
        type: SET_TINCTURE,
        Craftsmanship: tincture.Craftsmanship,
        Control: tincture.Control,
        CP: tincture.CP
    }
}

export function setCrafterCraftsmanship(Craftsmanship) {
    console.log("Index: " + Craftsmanship)
    return {
        type: SET_CRAFTER_CRAFTSMANSHIP,
        Craftsmanship: Craftsmanship
    }
}

export function setCrafterControl(Control) {
    console.log("Index: " + Control)
    return {
        type: SET_CRAFTER_CONTROL,
        Control: Control
    }
}

export function setCrafterCP(CP) {
    console.log("Index: " + CP)
    return {
        type: SET_CRAFTER_CP,
        CP: CP
    }
}

export function addMacroAction(action) {
    console.log("Index: " + action)
    return {
        type: ADD_MACRO_ACTION,
        action: action
    }
}

export function removeMacroAction(position) {
    console.log("Index: " + position)
    return {
        type: REMOVE_MACRO_ACTION,
        position: position
    }
}