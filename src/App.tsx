import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist, TasksType  } from './Tofolist';
import { AddIteamForm } from './AddIteamForm';
import {TodolistsReducer, addTodolistAC, removeTodolistAC, filtringTasksAC, changeValueInTitleAC} from './Reducers/TodolistReducer'
import {TasksReducer, changeStatusAC, removeTaskAC, addTaskAC, testAC, addTodolistAC1 } from './Reducers/TaskReducer';

export type FilterValueType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

 export type TasksStateType = { 
    [key: string] : Array<TasksType>
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, todolistsDispatch] = useReducer(TodolistsReducer,[
        { id: todolistID1, title: "What to learn", filter: "all" },
        { id: todolistID2, title: "What to buy", filter: "all" }
    ])

    const [tasks, tasksDispatch] = useReducer(TasksReducer, {
        [todolistID1] :
        [{ id: v1(), title: "HTML", isDone: true },
        { id: v1(), title: "CSS", isDone: false },
        { id: v1(), title: "REACT", isDone: false },
        { id: v1(), title: "REDUX", isDone: false },],
        [todolistID2] :
        [{ id: v1(), title: "Meat", isDone: true },
        { id: v1(), title: "Milk", isDone: false },
        { id: v1(), title: "Salt baccon", isDone: false },
        { id: v1(), title: "Juice", isDone: false },],
    })

    const changeStatus = (Todolistid: string, id: string, isDone: boolean) => {
        tasksDispatch(changeStatusAC(Todolistid, id, isDone ))
        // setTasks({...tasks,[Todolistid] : tasks[Todolistid].map(t => t.id === id ? {...t, isDone} : t)})
    }

    const removeTask = (Todolistid: string, id: string) => {
        tasksDispatch(removeTaskAC(Todolistid, id))
    //    setTasks({...tasks,[Todolistid] : tasks[Todolistid].filter(t => t.id !== id)})
    }
 
    const addTask = (Todolistid: string, title: string) => {
        const newTaskId = v1()
        tasksDispatch(addTaskAC(Todolistid, title, newTaskId))
    //   let newTask = { id: v1(), title: title, isDone: false }
    //   setTasks({...tasks,[Todolistid] : [newTask, ...tasks[Todolistid]]})
    }

    const filtringTasks = (Todolistid: string, value: FilterValueType) => {
        // setTodolists(todolists.map(tl => tl.id === Todolistid ? {...tl, filter : value} : tl))
        todolistsDispatch(filtringTasksAC(Todolistid, value))
    }

    const removeTodolist = (Todolistid: string) => {
        todolistsDispatch(removeTodolistAC(Todolistid))
        // setTodolists(todolists.filter(tl => tl.id !== Todolistid))
        delete tasks[Todolistid]
        tasksDispatch(testAC(tasks))
    }

    const addTodolist = (title: string) => {
        const newId = v1()
        todolistsDispatch(addTodolistAC(title, newId))
        // let newTodolist: TodolistsType = { id: v1(), title: title, filter: "all" };
        // setTodolists( [newTodolist, ...todolists] )
        
        tasksDispatch(addTodolistAC1(title, newId))
    }

    const chengeValueSpan = (Todolistid: string, newValue : string, id: string) => {
        let todolistTask = tasks[Todolistid];
        let task = todolistTask.find(t => t.id === id);
        if(task) {
            task.title = newValue
            tasksDispatch(testAC(tasks))

        }
    }

    const changeValueInTitle = (id: string, newValue: string) => { 
    //    const todolist = todolists.find(tl => tl.id === id)
    //     if(todolist){
    //         todolist.title = newValue 
    //         setTodolists([...todolists])
    //    }
    todolistsDispatch(changeValueInTitleAC(id, newValue))  
    }

    return (
        <div className="App">
            <AddIteamForm 
            addIteam={addTodolist}
            />
            {
                todolists.map( tl => {
                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true)
                    }
                
                   return <Todolist 
                       key={tl.id}
                       Todolistid={tl.id}
                       title={tl.title}
                       tasks={tasksForTodolist}
                       removeTask={removeTask}
                       filtringTasks={filtringTasks}
                       addTask={addTask}
                       changeStatus={changeStatus}
                       removeTodolist={removeTodolist}
                       filter={tl.filter}
                       chengeValueSpan={chengeValueSpan} 
                       changeValueInTitle={changeValueInTitle}              
                       />
            } )
            }
           
        </div>
    );
}

export default App

