import React from 'react';
import App from './App';
import { TaskType } from './App'
import { FilterValueType } from './App'

type PropsTupe = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: 'all' | 'active' | 'completed') => void
}

function ToDoList(props: PropsTupe) {

    const tasksJSX = props.tasks.map(task =>
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
            <button onClick={() => { props.removeTask(task.id) }}>X</button>
        </li>

    )

    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={()=> { props.changeFilter('all') } }>All</button>
                <button onClick={()=> { props.changeFilter('active') }}>Active</button>
                <button onClick={()=> { props.changeFilter('completed') }}>Completed</button>
            </div>
        </div>

    );
}

export default ToDoList;