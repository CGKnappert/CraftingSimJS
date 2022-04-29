import { createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import reducerFunction from "./sim-reducer";

export const simStore = createStore(
    reducerFunction,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)