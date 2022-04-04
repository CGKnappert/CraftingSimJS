import { SET_RECIPE, SET_MACRO, SET_MEAL, SET_TINCTURE, SET_CRAFTER } from './sim-actions';

export function setRecipe (recipe) {
    console.log("index setRecipe: " + recipe)
    return {
        type: SET_RECIPE,
        recipe: recipe
    }
}

export function setMacro (macro) {
    return {
        type: SET_MACRO,
        macro: macro
    }
}

export function setMeal (Craftsmanship, Control, CP) {
    return {
        type: SET_MEAL,
        Craftsmanship: Craftsmanship,
        Control: Control,
        CP: CP
    }
}

export function setTincture (Craftsmanship, Control, CP) {
    return {
        type: SET_TINCTURE,
        Craftsmanship: Craftsmanship,
        Control: Control,
        CP: CP
    }
}

export function setCrafter (Level, Craftsmanship, Control, CP, Specialist) {
    return {
        type: SET_CRAFTER,
        Level: Level,
        Craftsmanship: Craftsmanship,
        Control: Control,
        CP: CP,
        Specialist: Specialist
    }
}