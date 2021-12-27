import React from 'react';
import { TasksStateType } from '../App';


export const TasksReducer = (state : TasksStateType, action: allTasksType) : TasksStateType => {
switch(action.type) {
case "CHANGE-STATUS" : {
   return {...state, 
    [action.payload.Todolistid]: state[action.payload.Todolistid].map(t => t.id === action.payload.id ? {...t, isDone: action.payload.isDone} : t)
    // state[action.payload.Todolistid]: state[action.payload.Todolistid].map(t => t.id === action.payload.id ? {...t, action.payload.isDone} : t)
}
    // return state
}
case "REMOVE-TASK" : {
  return  {...state,[action.payload.Todolistid] : state[action.payload.Todolistid].filter(t => t.id !== action.payload.id)}
}

case "TEST-TASK" : {
    return  {...action.payload.tasks}
}
case "ADD-TASK" : {
    return { 
        ...state, 
        [action.payload.Todolistid]: [
            {
                id: action.payload.newTaskId,
                title: action.payload.title,
                isDone: false,
            }, ...state[action.payload.Todolistid]
        ]
        // {id: action.payload.Todolistid, title: action.payload.title, isDone: false }}
}}
case "ADD-TODOLIST1" : {
    
    return { ...state, 
        [action.payload.id]: []
        // {id: action.payload.Todolistid, title: action.payload.title, isDone: false }}
}
}
default: return state
}
}


type allTasksType = changeStatusACType | removeTaskACType | addTaskACType | teskACType | addTodolistACType

type changeStatusACType = ReturnType <typeof changeStatusAC>
type removeTaskACType = ReturnType <typeof removeTaskAC>
type addTaskACType = ReturnType <typeof addTaskAC>
type teskACType = ReturnType<typeof testAC>
type addTodolistACType = ReturnType<typeof addTodolistAC1>



export const addTodolistAC1 = (title: string, id: string) => {
    return {
        type : "ADD-TODOLIST1",
        payload: {
            title: title, 
            id: id
        }
    } as const
    };
export const changeStatusAC = (Todolistid: string, id: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS",
        payload: {
            Todolistid : Todolistid,
            id : id,
            isDone : isDone,
        }
    }as const
}

export const removeTaskAC = (Todolistid: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            Todolistid : Todolistid,
            id : id,
            
        }
    }as const
}
export const addTaskAC = (Todolistid: string, title: string, newTaskId:string) => {
    return {
        type: "ADD-TASK",
        payload: {
            Todolistid : Todolistid,
            title : title,
            newTaskId: newTaskId
        }
    }as const
}
export const testAC = (tasks: TasksStateType) => {
    return {
        type: "TEST-TASK",
        payload: {
            tasks: tasks
        }
    }as const
}