import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Tofolist';
import { TasksType } from './Tofolist';
import { AddIteamForm } from './AddIteamForm';

export type FilterValueType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string] : Array<TasksType>
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState <Array<TodolistsType>>([
        { id: todolistID1, title: "What to learn", filter: "all" },
        { id: todolistID2, title: "What to buy", filter: "all" }
    ])

    const [tasks, setTasks] = useState <TasksStateType>({
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
        setTasks({...tasks,[Todolistid] : tasks[Todolistid].map(t => t.id === id ? {...t, isDone} : t)})
    }

    const removeTask = (Todolistid: string, id: string) => {
       setTasks({...tasks,[Todolistid] : tasks[Todolistid].filter(t => t.id !== id)})
    }

    const addTask = (Todolistid: string, title: string) => {
      let newTask = { id: v1(), title: title, isDone: false }
      setTasks({...tasks,[Todolistid] : [newTask, ...tasks[Todolistid]]})
    }

    const filtringTasks = (Todolistid: string, value: FilterValueType) => {
        setTodolists(todolists.map(tl => tl.id === Todolistid ? {...tl, filter : value} : tl))
    }

    const removeTodolist = (Todolistid: string) => {
        setTodolists(todolists.filter(tl => tl.id !== Todolistid))
        delete tasks[Todolistid]
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let newTodolist: TodolistsType = { id: v1(), title: title, filter: "all" };
        setTodolists( [newTodolist, ...todolists] )
        setTasks({...tasks,[newTodolist.id] : []})
    }

    const chengeValueSpan = (Todolistid: string, newValue : string, id: string) => {
        let todolistTask = tasks[Todolistid];
        let task = todolistTask.find(t => t.id === id);
        if(task) {
            task.title = newValue
        setTasks({...tasks})

        }
    }
    const changeValueInTitle = (id: string, newValue: string) => {
       const todolist = todolists.find(tl => tl.id === id)
        if(todolist){
            todolist.title = newValue
            setTodolists([...todolists])
        }
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

export default App;
