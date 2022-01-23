import React, { ChangeEvent, useCallback } from 'react';
import { AddIteamForm } from './AddIteamForm';
import { FilterValueType } from './App';
import { Button } from './Button';
import { EditableSpan } from './EditableSpan';
import { TasksType } from './Reducers/TaskReducers';
import { Task } from './Task';

export type TodolistPropsType = {
    title: string
    todolistID: string
    filter: FilterValueType
    tasks: Array<TasksType>
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValueType) => void
    changeStatus: (Todolistid: string, id: string, isDone: boolean) => void
    removeTodoList: (todolistID: string) => void
    changeValueInTL: (Todolistid: string, titleInSpan: string) => void
    changeValueInTask: (Todolistid: string, id: string, titleInSpan : string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    let tasksForTDList = props.tasks

    if (props.filter === "active") {
        tasksForTDList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTDList = props.tasks.filter(t => t.isDone === true)
    }

    const addTaskHandler = useCallback((title: string) => { props.addTask(props.todolistID, title) }, [props.addTask, props.todolistID]);
    const changeFilterHandler = useCallback((value: FilterValueType) => { props.changeFilter(props.todolistID, value) }, [props.changeFilter, props.todolistID])
    const onChangeTitleInTL = useCallback((titleInSpan: string) => { props.changeValueInTL(props.todolistID, titleInSpan) }, [props.changeValueInTL, props.todolistID])
    const removeTodoListHandler = useCallback(() => { props.removeTodoList(props.todolistID) }, [props.removeTodoList, props.todolistID])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChangeTitle={(titleInSpan: string) => { onChangeTitleInTL(titleInSpan) }} />
                <Button class={''} title={'Remove'} onClick={removeTodoListHandler} />
            </h3>
            <div>
                <AddIteamForm addIteam={addTaskHandler} />
            </div>
            <ul>
                {
                    tasksForTDList.map(t => <Task key={t.id}
                        task={t}
                        todolistID={props.todolistID}
                        changeValueInTask={props.changeValueInTask}
                        changeStatus={props.changeStatus}
                        removeTask={props.removeTask} />)
                }
            </ul>
            <div>
                <Button class={props.filter === "all" ? 'filterClass' : ""}
                    title='All' onClick={() => { changeFilterHandler("all") }} />
                <Button class={props.filter === "active" ? 'filterClass' : ""}
                    title='Active' onClick={() => { changeFilterHandler("active") }} />
                <Button class={props.filter === "completed" ? 'filterClass' : ""}
                    title='Completed' onClick={() => { changeFilterHandler("completed") }} />
            </div>
        </div>
    )
})






