// import { type } from 'os';
import React from 'react';
import './App.css';
import ToDoList from './ToDoList'


export type TaskType = {
title: string
isDone: boolean
id: number
}

function App() {

const todoListTitle_1: string = 'What I learn'
const todoListTitle_2: string = 'What I have'
const todoListTitle_3: string = 'What I have to buy'

const task_1: Array<TaskType> =[
    {id: 1, title:'HTML', isDone: true},
    {id: 2, title:'CSS', isDone: true},
    {id: 3, title:'REACT', isDone: false},
]
const task_2: Array<TaskType> =[
    {id: 4, title:'Fish', isDone: true},
    {id: 5, title:'Beef', isDone: true},
    {id: 6, title:'Butter', isDone: true},
]
const task_3: Array<TaskType> =[
    {id: 7, title:'Water', isDone: true},
    {id: 8, title:'Juice', isDone: false},
    {id: 9, title:'Cheese', isDone: true},
]

    return (
       <div className='App'>
<ToDoList title={todoListTitle_1} tasks={task_1}/>
<ToDoList title={todoListTitle_2} tasks={task_2}/>
<ToDoList title={todoListTitle_2} tasks={task_3}/>
       </div>
    );
}

export default App;
