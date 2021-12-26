import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from './Button'
import { Input } from './Input'
import { FilterValueType } from './App'
import { AddIteamForm } from './AddIteamForm';
import { EditableSpan } from './EditableSpan';



type TodolistType = {
    title: string
    tasks: Array<TasksType>
    filter: FilterValueType
    Todolistid: string
    removeTask: (Todolistid: string, id: string) => void
    filtringTasks: (Todolistid: string, value: FilterValueType) => void
    addTask: (Todolistid: string, title: string) => void
    changeStatus: (Todolistid: string, id: string, isDone: boolean) => void
    removeTodolist: (Todolistid: string) => void
    chengeValueSpan: (Todolistid: string, newValue: string, id: string) => void
    changeValueInTitle: (id: string, newValue: string) => void
}

export type TasksType = {
    id: string
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistType) => {

    const removeTaskHandler = (id: string) => { props.removeTask(props.Todolistid, id) }
    const FilterHandler = (value: FilterValueType) => { props.filtringTasks(props.Todolistid,value) }
    const removeTodolistHandler = () => {props.removeTodolist(props.Todolistid)}
    const addTaskHandler = (title: string) => {props.addTask(props.Todolistid, title)}
    const changeValueInSpan = (newValue: string, id:string) => {props.chengeValueSpan(props.Todolistid, newValue, id)}
    const changeValueInTitleHandler = (newValue: string) => {props.changeValueInTitle(props.Todolistid, newValue)}

    return (
        <div>
            <h3>
            <EditableSpan title={props.title} onChangeTitle={changeValueInTitleHandler}/>
            <Button class="button" title="REMOVE TODOLIST" callBack={removeTodolistHandler} />
            </h3>
            
            <AddIteamForm 
            addIteam={addTaskHandler}
            />
            <ul>
                {
                    props.tasks.map(task => {
                        const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newTasksStatus = e.currentTarget.checked
                            props.changeStatus(props.Todolistid, task.id, newTasksStatus)
                        }

                        return <li key={task.id} className={task.isDone ? "isDone" : ""}>
                            <input type="checkbox" onChange={changeTasksStatus} checked={task.isDone} />
                            <EditableSpan title={task.title} onChangeTitle={(newValue) => changeValueInSpan(newValue, task.id)}/>
                            <Button class="button" title="REMOVE TASK" callBack={() => { removeTaskHandler(task.id) }} />
                        </li>
                    })
                }
            </ul>
            <div>
                <Button class={props.filter === "all" ? "active" : ""} title="ALL" callBack={() => { FilterHandler("all") }} />
                <Button class={props.filter === "active" ? "active" : ""} title="ACTIVE" callBack={() => { FilterHandler("active") }} />
                <Button class={props.filter === "completed" ? "active" : ""} title="COMPLETED" callBack={() => { FilterHandler("completed") }} />
            </div>
        </div>
    )
}

