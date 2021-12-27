
import React from 'react';
import { v1 } from 'uuid';
import { TaskType } from '../../../src+reducer/src/Todolist';
import {FilterValueType, TodolistsType} from '../App'



export const TodolistsReducer = (state : Array<TodolistsType>, action: allType) : Array<TodolistsType> => {
switch(action.type) {
    case "ADD-TODOLIST" : {
        return [{ id: action.payload.id, title: action.payload.title, filter: "all" }, ...state]
    }
    case "REMOVE-TODOLIST" : {
        return state.filter(tl => tl.id !== action.payload.Todolistid)
    }
    case "CHANGE-FILTER" : {
        return state.map(tl => tl.id === action.payload.Todolistid ? {...tl, filter : action.payload.value} : tl)
    }
    case "CHANGE-TITLE-TL" : {
        return state.map(st => st.id === action.payload.id ? {...st, title : action.payload.newValue} : st)
    //    return {...state, [action.payload.id] : {...state, title: action.payload.newValue}}
    }
    default: return state
}
}

type allType = addTodolistAC | removeTodolistAC | filtringTasksAC | changeValueInTitleACType

type addTodolistAC = ReturnType <typeof addTodolistAC>
type removeTodolistAC = ReturnType <typeof removeTodolistAC>
type filtringTasksAC = ReturnType <typeof filtringTasksAC>
type changeValueInTitleACType = ReturnType <typeof changeValueInTitleAC>

export const addTodolistAC = (title: string, id: string) => {
return {
    type : "ADD-TODOLIST",
    payload: {
        title: title, 
        id: id
    }
} as const
};

export const removeTodolistAC = (Todolistid: string) => {
return {
    type : "REMOVE-TODOLIST",
    payload: {
        Todolistid: Todolistid 
    }
} as const
};

export const filtringTasksAC = (Todolistid: string, value: FilterValueType) => {
return {
    type : "CHANGE-FILTER",
    payload: {
        Todolistid: Todolistid,
        value : value
    }
} as const
};

export const changeValueInTitleAC = (id: string, newValue: string) => {
    return {
        type : "CHANGE-TITLE-TL",
        payload: {
            id:id,
            newValue : newValue
        }
    } as const
    };