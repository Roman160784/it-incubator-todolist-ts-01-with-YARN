
import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import { AddIteamForm } from './AddIteamForm';
import './App.css';
import { addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, taskAC, taskForTlAC, TaskReducers } from './Reducers/TasksReducers';
import { addTodolistAC, changeFilterAC, changeTitleInTlAC, removeTodolistAC, TodolistReducer } from './Reducers/TodolistReducers';
import { TasksType, Todolist, } from './Todolist';

export type FilterValueType = "all" | "active" | "completed"

export type TasksStateType = {
    [key: string]: Array<TasksType>
}
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    const todolistID1 = v1()
    const todolistID2 = v1()


    const [todolists, todolistsDispatch] = useReducer(TodolistReducer,[ 
        { id: todolistID1, title: "What to learn", filter: "all" },
        { id: todolistID2, title: "What to buy", filter: "all" },
    ])

    const [tasks, tasksDispatch] = useReducer (TaskReducers,{
        [todolistID1]:
            [{ id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: false },
            { id: v1(), title: "REACT", isDone: false },
            { id: v1(), title: "REDUX", isDone: false },],
        [todolistID2]:
            [{ id: v1(), title: "fissh", isDone: true },
            { id: v1(), title: "meat", isDone: false },
            { id: v1(), title: "salo", isDone: false },
            { id: v1(), title: "bread", isDone: false },],
    })

    

    const removeTask = (TodolistID: string, id: string) => {
        tasksDispatch(removeTaskAC(TodolistID, id))
    }

    const addTask = (TodolistID: string, title: string) => {
        tasksDispatch(addTaskAC(TodolistID, title))
        
    }

    const changeStatus = (TodolistID: string, id: string, isDone: boolean) => {
        tasksDispatch(changeStatusAC(TodolistID, id, isDone))
    }

    const changeFilter = (TodolistID: string, value: FilterValueType) => {
        todolistsDispatch(changeFilterAC(TodolistID, value))
    }

    const removeTodolist = (TodolistID: string) => {
        todolistsDispatch(removeTodolistAC(TodolistID)) 
        delete tasks[TodolistID]
        tasksDispatch(taskAC(tasks))
    }

    const addTodolist = (title: string) => {
        let newID = v1()
        todolistsDispatch(addTodolistAC(title, newID))
        tasksDispatch(taskForTlAC(title, newID))
    }

    const changeTaskTitle = (TodolistID: string, newTitle: string, id: string ) => {
        tasksDispatch(changeTaskTitleAC(TodolistID, newTitle, id))
    }

    const changeTitleInTL = (TodolistID: string, newTitle: string) => {
        todolistsDispatch(changeTitleInTlAC(TodolistID, newTitle)) 
    }

    return (
        <div className="App">
            <AddIteamForm  picValue={addTodolist}/>
            {todolists.map(tl => {

                let tasksForTLlist = tasks[tl.id]

                if (tl.filter === "active") {
                    tasksForTLlist = tasks[tl.id].filter(t => t.isDone === false)
                }
                if (tl.filter === "completed") {
                    tasksForTLlist = tasks[tl.id].filter(t => t.isDone === true)
                }

                return (<Todolist title={tl.title}
                    key={tl.id}
                    TodolistID = {tl.id}
                    tasks={tasksForTLlist}
                    filter={tl.filter}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeStatus={changeStatus}
                    changeFilter={changeFilter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTitleInTL={changeTitleInTL}
                    
                />)
            })

            }

        </div>
    );
}

export default App;
