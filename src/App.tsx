import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v1 } from 'uuid';
import { AddIteamForm } from './AddIteamForm';
import './App.css';
import { addTaskAC, addTaskTLAC, changeStatusAC, changeTitleInTaskAC, deleteTaskLAC, removeTaskAC, TasksReducers } from './Reducers/TasksReducers';
import {TodolistReducers, changeFilterAC, changeValueInTitleAC, addTodolistAC, removeTodolistAC,} from './Reducers/TodolistReducers';
import { TasksType, Todolist } from './Todolist';
import {rootReducerType} from './store/store'

export type FilterValueType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksMainType = {
    [key: string] : Array<TasksType>
}

function App() {

    let todolists = useSelector <rootReducerType, Array<TodolistsType>>(state => state.todolist)
    let tasks = useSelector <rootReducerType, TasksMainType> (state => state.tasks)

    let dispatch = useDispatch();
    
    const removeTask = (TodolistID: string, id: string) => {
        dispatch(removeTaskAC(TodolistID, id))
    }

    const addTask = (TodolistID: string, title: string) => {
        dispatch(addTaskAC(TodolistID, title))
    }

    const changeFilter = (TodolistID: string, value: FilterValueType) => {
        dispatch(changeFilterAC(TodolistID, value))
    }

    const changeStatus = (TodolistID: string, isDone: boolean, id: string) => {
        dispatch(changeStatusAC(TodolistID, isDone, id))
    }

    const removeTodolist = (TodolistID : string) => {
        dispatch(removeTodolistAC(TodolistID))
        dispatch(deleteTaskLAC(TodolistID)) 
    }

    const addTodolist = (title: string) => {
        let newID = v1() 
        dispatch(addTodolistAC(title, newID))
        dispatch(addTaskTLAC(newID)) 
    }

    const changeTitleInTask = (TodolistID : string, id: string, title: string) => {
        dispatch(changeTitleInTaskAC(TodolistID, id, title))
    }

    const changeTitleInTDlist = (TodolistID : string, title: string) => {
        dispatch(changeValueInTitleAC(TodolistID, title))
    }

    return (
        <div className="App">
           <AddIteamForm adIteam={addTodolist}/>
            {todolists?.map(tl => 
            {
                let tasksForTL = tasks[tl.id]
                if(tl.filter === "active"){
                    tasksForTL = tasks[tl.id].filter(t => t.isDone === false)
                }
                if(tl.filter === "completed"){
                    tasksForTL = tasks[tl.id].filter(t => t.isDone === true)
                }
            
                return <Todolist title={tl.title}
                key={tl.id}
                TodolistID={tl.id}
                filter={tl.filter} 
                tasks={tasksForTL}
                addTask={addTask}
                removeTask={removeTask} 
                changeStatus={changeStatus}
                changeFilter={changeFilter}
                removeTodolist={removeTodolist} 
                changeTitleInTask={changeTitleInTask}
                changeTitleInTDlist={changeTitleInTDlist}
                />
            })
            }
           
        </div>
    );
}

export default App;

