import { v1 } from 'uuid'
import {  FilterValueType,  } from '../App'
import { TasksMainType } from './TaskReducers'
// import { todolistID1, todolistID2 } from './TodolistReducers'

let initialState : TasksMainType = {
    // [todolistID1]: [
    //     { id: v1(), title: "HTML", isDone: true },
    //     { id: v1(), title: "CSS", isDone: false },
    //     { id: v1(), title: "REACT", isDone: false },
    //     { id: v1(), title: "REDUX", isDone: false },],
    // [todolistID2]: [
    //     { id: v1(), title: "Milk", isDone: true },
    //     { id: v1(), title: "SUGAR", isDone: false },
    //     { id: v1(), title: "MEAT", isDone: false },
    //     { id: v1(), title: "JUICE", isDone: false },],
}

export const TasksReducers = (state: TasksMainType = initialState, action: mainActionTaskType): TasksMainType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return { ...state, [action.payload.TodolistID]: state[action.payload.TodolistID].filter(t => t.id !== action.payload.id) }
        }
        case "CHANGE-STATUS": {
            return {
                ...state, [action.payload.TodolistID]
                    : state[action.payload.TodolistID].map(t => t.id === action.payload.id
                        ? { ...t, isDone: action.payload.isDone } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.payload.TodolistID]
                    : state[action.payload.TodolistID].map(t => t.id === action.payload.id
                        ? { ...t, title: action.payload.title } : t)
            }
        }
        case "ADD-TASK": {
            return {...state,[action.payload.TodolistID] 
                : [{ id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.TodolistID]]}   
        }
        case "ADD-TASK-FOR-TL": {
            return {...state, [action.payload.id] : []}   
        }
        case "DELETE-TASK-IN-TL": {
            let copyState = {...state} 
            delete copyState[action.payload.TodolistID]
            return copyState  
             
        }

        default: return state
    }
}

type mainActionTaskType = removeTaskACType | changeStatusACType | changeTitleInTaskACType | addTaskACACType | addTaskTLACType | deleteTaskLACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type changeTitleInTaskACType = ReturnType<typeof changeTitleInTaskAC>
type addTaskACACType = ReturnType<typeof addTaskAC>
type addTaskTLACType = ReturnType<typeof addTaskTLAC>
type deleteTaskLACType = ReturnType<typeof deleteTaskLAC>



export const removeTaskAC = (TodolistID: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            TodolistID, id
        }
    } as const
}

export const changeStatusAC = (TodolistID: string, isDone: boolean, id: string) => {
    return {
        type: "CHANGE-STATUS",
        payload: {
            TodolistID, isDone, id
        }
    } as const
}

export const changeTitleInTaskAC = (TodolistID : string, id: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            TodolistID, title, id
        }
    } as const
}

export const addTaskAC = (TodolistID: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            TodolistID, title
        }
    } as const
}
export const addTaskTLAC = ( id: string) => {
    return {
        type: "ADD-TASK-FOR-TL",
        payload: {
            id
        }
    } as const
}
export const deleteTaskLAC = ( TodolistID: string) => {
    return {
        type: "DELETE-TASK-IN-TL",
        payload: {
            TodolistID
        }
    } as const
}