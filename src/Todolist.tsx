
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { AddIteamForm } from './AddIteamForm';
import { FilterValueType } from './App';
import { Button } from './Button';
import { EditableSpan } from './EditableSpan';
import { Input } from './Input';

type TodolistType = {
    title: string
    TodolistID: string
    filter: FilterValueType
    tasks: Array<TasksType>
    removeTodolist: (TodolistID: string) => void
    addTask: (TodolistID: string, title: string) => void
    removeTask: (TodolistID: string, id: string) => void
    changeTitleInTL: (TodolistID: string, newTitle: string) => void
    changeFilter: (TodolistID: string, value: FilterValueType) => void
    changeStatus: (TodolistID: string, id: string, isDone: boolean) => void
    changeTaskTitle: (TodolistID: string, newTitle: string, id: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistType) => {

    const removeTodolistHandler = () => {props.removeTodolist(props.TodolistID) } 
    const addTaskHandler = (title: string) => {props.addTask( props.TodolistID, title) } 
    const removeTaskHandler = (id: string) => { props.removeTask(props.TodolistID, id) }
    const changeFilterHandler = (value: FilterValueType) => { props.changeFilter(props.TodolistID, value) }
    const changeTitleInTLHandler = (newTitle:string) => {props.changeTitleInTL(props.TodolistID, newTitle) }
    const changeTaskTitleHandler = (newTitle:string, id: string) => {props.changeTaskTitle(props.TodolistID, newTitle, id) }

    return (
        <div>
            <h3>    
            <EditableSpan title={props.title} onChangeTitle={changeTitleInTLHandler}/>
            <Button title="Remove Todolist" class="" clickCalback={removeTodolistHandler} />
            </h3>
            <AddIteamForm  picValue={addTaskHandler}/>
            <ul>
                {props.tasks.map(t => {
                    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(props.TodolistID, t.id, newIsDoneValue)
                    }

                    return <li key={t.id} className={t.isDone ? "isDoneClass" : ""}><input type="checkbox" 
                    onChange={changeStatusHandler} checked={t.isDone} />
                        <EditableSpan title={t.title} onChangeTitle={(newTitle:string) => {changeTaskTitleHandler(newTitle, t.id)}}/>
                        <Button title="Remove Task" class="" clickCalback={() => removeTaskHandler(t.id)} />
                    </li>
                })}
            </ul>
            <div>
                <Button title="ALL" class={props.filter === "all" ? "actitveClass" : ""}
                    clickCalback={() => changeFilterHandler("all")} />
                <Button title="ACTIVE" class={props.filter === "active" ? "actitveClass" : ""}
                    clickCalback={() => changeFilterHandler("active")} />
                <Button title="COMPLETED" class={props.filter === "completed" ? "actitveClass" : ""}
                    clickCalback={() => changeFilterHandler("completed")} />
            </div>
        </div>
    )
}





