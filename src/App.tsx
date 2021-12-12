import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import {TaskType} from './Todolist'

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType ={
    [key: string] : Array<TaskType>
}

function App() {

    let todolistID1=v1();
    let todolistID2=v1();
    
    let [todolists, setTodolists] = useState <Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    
    let [tasks, setTasks] = useState({
        [todolistID1]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });
    


    function removeTask( TodolistId: string, id: string) {
        // let filteredTasks = tasks.filter(t => t.id != id);
        setTasks({...tasks,[TodolistId] : tasks[TodolistId].filter(t => t.id != id)});
    }

    function addTask(TodolistId: string, title: string) {
         let newTask = { id: v1(), title: title, isDone: false };
         setTasks({...tasks,[TodolistId] : [newTask,...tasks[TodolistId] ]})
        // setTasks(newTasks);
    }

    function changeStatus(TodolistId: string, taskId: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }

        setTasks({...tasks,[TodolistId] : tasks[TodolistId].map(m => m.id === taskId? {...m,isDone} : m) });
    }

    function changeFilter(TodolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(m => TodolistId === m.id ? {...m, filter : value} : m))
    }

     
    const removeTodolist = (TodolistId: string) => {
        setTodolists(todolists.filter(f => f.id !== TodolistId))
        delete tasks [TodolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(m => {
                let tasksForTodolist = tasks[m.id];
                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={m.id}
                        TodolistId = {m.id}
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={m.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}

        </div>
    );
}

export default App;
