import { v1 } from "uuid"
import { FilterValueType } from "../App"


export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

// export const TodolistID1 = v1()
// export const TodolistID2 = v1()

let initialState : Array<TodolistsType> = [
    // { id: TodolistID1, title: "What to Learn", filter: "all" },
    // { id: TodolistID2, title: "What to Buy", filter: "all" },
]

export const TodolistReducer = (state : Array<TodolistsType> = initialState, action : mainActionsType) :Array<TodolistsType> => {
switch (action.type) {
    case "CHANGE-FITER-TL": {
        return state.map(tl => tl.id === action.payload.todolistID ? {...tl, filter: action.payload.value} : tl)
    }
    case "CHANGE-VALUE-TL": {
        return state.map(tl => tl.id === action.payload.Todolistid ? {...tl, title: action.payload.titleInSpan} : tl)
    }
    case "ADD-TODOLIST": {
        return [{id: action.payload.todolistID, title: action.payload.title, filter: "all"}, ...state]
    }
    case "REMOVE-TODOLIST": {
        return state.filter(tl => tl.id !== action.payload.Todolistid)
    }
    default: return state
}
}


export type mainActionsType = changeFilterACType | changeValueInTLACType | addTodolistACType | removeTodoListACType

type changeFilterACType = ReturnType<typeof changeFilterAC>
type changeValueInTLACType = ReturnType<typeof changeValueInTLAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type removeTodoListACType = ReturnType<typeof removeTodoListAC>

export const changeFilterAC = (todolistID: string, value: FilterValueType) => {
    return{
     type : "CHANGE-FITER-TL",
     payload: {
        todolistID, value,
     }
    } as const
}

export const changeValueInTLAC = (Todolistid: string, titleInSpan : string) => {
    return{
     type : "CHANGE-VALUE-TL",
     payload: {
        Todolistid, titleInSpan,
     }
    } as const
}
export const addTodolistAC = ( title: string) => {
    return{
     type : "ADD-TODOLIST",
     payload: {
        todolistID: v1(), title,
     }
    } as const
}
export const removeTodoListAC = (Todolistid: string) => {
    return{
     type : "REMOVE-TODOLIST",
     payload: {
        Todolistid,
     }
    } as const
}