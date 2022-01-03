import { TodolistsType, FilterValueType} from "../App";



export const TodolistReducer = (state: Array<TodolistsType>, action: TodolistActitonsType) :Array<TodolistsType> => {
switch (action.type) {
    case "CHANGE-FILTER" : {
        return state.map(tl => tl.id=== action.payload.TodolistID ? {...tl, filter : action.payload.value} : tl)
    }
    case "CHANGE-TITLE-IN-TL" : {
        return state.map(tl => tl.id === action.payload.TodolistID ? {...tl, title: action.payload.newTitle} : tl)
    }
    case "REMOVE-TODOLIST" : {
        return state.filter(tl => tl.id !== action.payload.TodolistID)
    }
    case "ADD-TODOLIST" : {
        return [{id: action.payload.id, title: action.payload.title, filter: "all"}, ...state]
    }
    default: return state
}
} 


type TodolistActitonsType = changeFilterACType | changeTitleInTlACType | removeTodolistACType | addTodolistACType

type changeFilterACType = ReturnType<typeof changeFilterAC>
type changeTitleInTlACType = ReturnType<typeof changeTitleInTlAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>


export const changeFilterAC = (TodolistID: string, value: FilterValueType) => {
return{
    type : "CHANGE-FILTER",
    payload: {
        TodolistID: TodolistID,
        value: value
    }
} as const
}
export const changeTitleInTlAC = (TodolistID: string, newTitle: string) => {
return{
    type : "CHANGE-TITLE-IN-TL",
    payload: {
        TodolistID: TodolistID,
        newTitle: newTitle
    }
} as const
}
export const removeTodolistAC = (TodolistID: string) => {
return{
    type : "REMOVE-TODOLIST",
    payload: {
        TodolistID: TodolistID,
    }
} as const
}
export const addTodolistAC = (title: string, id: string) => {
return{
    type : "ADD-TODOLIST",
    payload: {
        title: title,
        id: id
    }
} as const
}