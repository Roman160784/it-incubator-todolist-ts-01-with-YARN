import { v1 } from "uuid";
import { TasksStateType } from "../App";



export const TaskReducers = (state: TasksStateType, action: allTasksActionType): TasksStateType => {
switch(action.type) {
    case "REMOVE-TASK" : {
        return {...state, [action.payload.TodolistID] 
            : state[action.payload.TodolistID].filter(t => t.id !== action.payload.id)}
    }
    case "CHANGE-TASK-TITLE" : {
        return {...state,[action.payload.TodolistID] 
            : state[action.payload.TodolistID].map(t => t.id === action.payload.id 
                ? {...t, title: action.payload.newTitle}: t)}
    }
    case "CHANGE-STATUS" : {
        return {...state,[action.payload.TodolistID]
            : state[action.payload.TodolistID].map(t => t.id === action.payload.id 
                ? {...t, isDone :action.payload.isDone} : t)}
    }
    case "ADD-TASK" : {
        return {...state, [action.payload.TodolistID] 
            : [{id: v1(), title: action.payload.title, isDone: false }, ...state[action.payload.TodolistID] ]}
    }
    case "TASK" : {
        return {...action.payload.tasks}
    }
    case "TASK-FOR-TL" : {
        return {...state,[action.payload.id] : []}
    }
    default: return state
}
}


type allTasksActionType = removeTaskACType | changeTaskTitleACType | changeStatusACType | addTaskACACType | taskACType | taskForTlACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type addTaskACACType = ReturnType<typeof addTaskAC>
type taskACType = ReturnType<typeof taskAC>
type taskForTlACType = ReturnType<typeof taskForTlAC>



export const removeTaskAC = (TodolistID: string, id: string) => {
return {
    type : "REMOVE-TASK",
    payload: {
        TodolistID, id,
    }
}as const
}
export const changeTaskTitleAC = (TodolistID: string, newTitle: string, id: string ) => {
return {
    type : "CHANGE-TASK-TITLE",
    payload: {
        TodolistID, newTitle, id
    }
}as const
}
export const changeStatusAC = (TodolistID: string, id: string, isDone: boolean ) => {
return {
    type : "CHANGE-STATUS",
    payload: {
        TodolistID, id, isDone
    }
}as const
}
export const addTaskAC = (TodolistID: string, title: string ) => {
return {
    type : "ADD-TASK",
    payload: {
        TodolistID, title,
    }
}as const
}
export const taskAC = (tasks : TasksStateType) => {
return {
    type : "TASK",
    payload: {
        tasks
    }
}as const
}
export const taskForTlAC = (title: string, id: string) => {
return {
    type : "TASK-FOR-TL",
    payload: {
        title, id
    }
}as const
}



