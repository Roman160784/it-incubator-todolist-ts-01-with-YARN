import { v1 } from 'uuid'
import {TodolistsType, FilterValueType} from '../App'

export const todolistID1 = v1()
export const todolistID2 = v1()

let initialState : Array<TodolistsType> =  [
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
]


export const TodolistReducers = (state: Array<TodolistsType> = initialState, action: mainActionTLType) : Array<TodolistsType> => {
switch (action.type) {
    case "CHANGE-FILTER-TL" : {
       return state.map(tl => tl.id === action.payload.TodolistID ? {...tl, filter: action.payload.value}:tl)
    }
    case "CHANGE-TITLE-IN-TITLE-TL" : {
       return state.map(tl => tl.id === action.payload.Todolistid ? {...tl, title: action.payload.title} : tl) 
    }
    case "ADD-TL" : {
       return [{id: action.payload.id, title: action.payload.title, filter: "all"}, ...state]
    }
    case "REMOVE-TL" : {
       return state.filter(tl => tl.id !== action.payload.TodolistID)
    }
  
    default: return state
}
}

type mainActionTLType = changeFilterACType | changeValueInTitleACType | addTodolistACACType | removeTodolistACType

type changeFilterACType = ReturnType<typeof changeFilterAC>
type changeValueInTitleACType = ReturnType<typeof changeValueInTitleAC>
type addTodolistACACType = ReturnType<typeof addTodolistAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>


export const changeFilterAC = (TodolistID: string, value: FilterValueType) => {
    return  {
        type: "CHANGE-FILTER-TL",
        payload: {
            TodolistID, value  
        }
    }as const
}

export const changeValueInTitleAC = (Todolistid: string, title: string) => {
    return{
        type: "CHANGE-TITLE-IN-TITLE-TL",
        payload: {
            Todolistid : Todolistid,
            title : title
        }
    }as const
}

export const addTodolistAC = (title: string, id: string) => {
    return{
        type: "ADD-TL",
        payload: {
            title, id
        }
    }as const
}

export const removeTodolistAC = (TodolistID : string) => {
    return{
        type: "REMOVE-TL",
        payload: {
            TodolistID
        }
    }as const
}