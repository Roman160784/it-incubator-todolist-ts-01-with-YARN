import {combineReducers, createStore} from "redux";
import { TasksReducers } from "../Reducers/TasksReducers";
import { TodolistReducers } from "../Reducers/TodolistReducers";

let rootReducer=combineReducers({
    tasks:TasksReducers,
    todolist: TodolistReducers
})

export type rootReducerType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)