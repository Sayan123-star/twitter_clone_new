

import { applyMiddleware, createStore } from "redux";
import { combineReducer } from "./combineReducer";
import { thunk } from "redux-thunk";


const middleware =[thunk]
export const store = createStore(
    combineReducer,applyMiddleware(...middleware)
)