// import { type } from 'os';
import { type } from 'os';
import React, { useState } from 'react';
import './App.css';
import ToDoList from './ToDoList';

export type FilterValueType = 'all' | 'active' | 'completed' //зачем создавать, если есть в туду листе

export type TaskType = {
    title: string
    isDone: boolean
    id: number
}

function App() {

    const todoListTitle_1: string = 'What I learn'

    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: 'HTML', isDone: true },
        { id: 2, title: 'CSS', isDone: true },
        { id: 3, title: 'REACT', isDone: false },
        { id: 4, title: 'REDUX', isDone: false },
    ])

    function removeTask(taskID: number) {
        setTasks(tasks.filter(task => task.id !== taskID)) 
    }

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all'); //зачем второе all

    function changeFilter(filter: 'all' | 'active' | 'completed') {
        setFilter(filter)
    }

    let tasksForRender = tasks 
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }
    // основное, что видим на странице
    return (
        <div className='App'>
            <ToDoList
                title={todoListTitle_1}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;