import { combineReducers, createStore } from "redux";
import { TaskReducer } from "../Reducers/TaskReducers";
import { TodolistReducer } from "../Reducers/TodolistReducers";

let rootReducer = combineReducers({
   tasks : TaskReducer,
   todolist : TodolistReducer,
})

export type rootReducerType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)