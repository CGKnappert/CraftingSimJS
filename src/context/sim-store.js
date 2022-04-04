import { createStore } from "redux";
import SimReducer from "./sim-reducer";

export const simStore = createStore(
    SimReducer
)

