import { v1 } from "uuid";
import { addTodolistACType, removeTodoListACType} from "./TodolistReducers";


export type TasksMainType = {
    [key: string]: Array<TasksType>
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
let initialState: TasksMainType = {
    // [TodolistID1]:
    //     [{ id: v1(), title: "React", isDone: false },
    //     { id: v1(), title: "Redux", isDone: false },
    //     { id: v1(), title: "HTML", isDone: true },
    //     { id: v1(), title: "CSS", isDone: false },],
    // [TodolistID2]:
    //     [{ id: v1(), title: "Bread", isDone: false },
    //     { id: v1(), title: "Sugar", isDone: false },
    //     { id: v1(), title: "Milk", isDone: true },
    //     { id: v1(), title: "Drink", isDone: false },],
}

export const TaskReducer = (state : TasksMainType = initialState, action : mainActionsType) :TasksMainType => {
    switch (action.type) {
        case "REMOVE-TASK" : {
            return {...state,[action.payload.todolistID] : state[action.payload.todolistID].filter(t => t.id !== action.payload.id)}
        }
        case "ADD-TASK" : {
            return {...state, [action.payload.todolistID] 
                : [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistID] ] }
        }
        case "CHANGE-STATUS" : {
            return {...state, [action.payload.todolistID] 
                : state[action.payload.todolistID].map(t => t.id === action.payload.id 
                    ? {...t, isDone: action.payload.isDone} : t)}
        }
        case "CHANGE-VALUE-IN-TASK-TITLE" : {
            return {...state, [action.payload.Todolistid] 
                : state[action.payload.Todolistid].map(t => t.id === action.payload.id 
                    ? {...t, title : action.payload.titleInSpan} : t)}
        }
        case "REMOVE-TODOLIST" : {
            let copy = {...state}
            delete copy[action.payload.Todolistid]
            console.log(copy);
            
            return copy
        }
        case "ADD-TODOLIST" : {
            return {...state, [action.payload.todolistID] : []}
        }

        default: return state
    }
}

export type mainActionsType = removeTaskACType | addTaskkACType | changeStatusACType 
| changeValueInTaskType | removeTodoListACType | addTodolistACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskkACType = ReturnType<typeof addTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type changeValueInTaskType = ReturnType<typeof changeValueInTaskAC>



export const removeTaskAC = (todolistID: string, id: string) => {
    return{
     type : "REMOVE-TASK",
     payload: {
        todolistID, id,
     }
    } as const
}

export const addTaskAC = (todolistID: string, title: string) => {
    return{
     type : "ADD-TASK",
     payload: {
        todolistID, title,
     }
    } as const
}

export const changeStatusAC = (todolistID: string, id: string, isDone: boolean ) => {
    return{
     type : "CHANGE-STATUS",
     payload: {
        todolistID, id, isDone
     }
    } as const
}

export const changeValueInTaskAC = (Todolistid: string, titleInSpan : string, id: string) => {
    return{
     type : "CHANGE-VALUE-IN-TASK-TITLE",
     payload: {
        Todolistid, titleInSpan, id, 
     }
    } as const
}

