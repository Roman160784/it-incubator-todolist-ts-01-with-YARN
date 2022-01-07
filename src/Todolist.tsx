
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { AddIteamForm } from './AddIteamForm';
import { FilterValueType } from './App';
import { Button } from './Button';
import { EditableSpan } from './EditableSpan';
import { Input } from './Input';

export type TodolistType = {
    TodolistID: string
    title: string
    filter: FilterValueType
    tasks: Array<TasksType>
    removeTodolist: (TodolistID: string) => void
    addTask: (TodolistID: string, title: string) => void
    removeTask: (TodolistID: string, id: string) => void
    changeTitleInTDlist: (TodolistID: string, title: string) => void
    changeFilter: (TodolistID: string, value: FilterValueType) => void
    changeStatus: (TodolistID: string, isDone: boolean, id: string) => void
    changeTitleInTask: (TodolistID: string, id: string, title: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistType) => {

    const removeTodolistHandler = () => { props.removeTodolist(props.TodolistID) }
    const removeTaskHandler = (id: string) => { props.removeTask(props.TodolistID, id) }
    const changeFilterHandler = (value: FilterValueType) => { props.changeFilter(props.TodolistID, value) }
    const AddTasksTitleHandler = (title: string) => { props.addTask(props.TodolistID, title) }
    const edibleSpanTaskHandler = (title: string, id: string) => { props.changeTitleInTask(props.TodolistID, id, title) }
    const changeTitleInTDlist = (title: string) => { props.changeTitleInTDlist(props.TodolistID, title) }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTitleInTDlist} />
                <Button title='Remove TL' class={''} callBack={removeTodolistHandler} />
            </h3>
            <AddIteamForm adIteam={AddTasksTitleHandler} />
            <ul>
                {props.tasks.map(t => {
                    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(props.TodolistID, newIsDoneValue, t.id)
                    }

                    return <li key={t.id} className={t.isDone ? "isDoneClass" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={changeStatusHandler} />
                        <EditableSpan title={t.title} onChange={(title: string) => { edibleSpanTaskHandler(title, t.id) }} />
                        <Button title='REMOVE' class={''} callBack={() => { removeTaskHandler(t.id) }} />
                    </li>
                })
                }
            </ul>
            <div>
                <Button title='ALL' class={props.filter === "all" ? "activeClass" : ""}
                    callBack={() => { changeFilterHandler('all') }} />
                <Button title='ACTIVE' class={props.filter === "active" ? "activeClass" : ""}
                    callBack={() => { changeFilterHandler('active') }} />
                <Button title='COMPLETED' class={props.filter === "completed" ? "activeClass" : ""}
                    callBack={() => { changeFilterHandler('completed') }} />
            </div>
        </div>
    )
}


function title(title: any) {
    throw new Error('Function not implemented.');
}

