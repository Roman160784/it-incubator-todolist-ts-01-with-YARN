import React, { ChangeEvent, useCallback } from 'react';
import { Button } from './Button';
import { EditableSpan } from './EditableSpan';
import { TasksType } from './Reducers/TaskReducers';

export type TasksPropsType = {
    task: TasksType
    todolistID: string
    changeValueInTask: (Todolistid: string, id: string, titleInSpan: string) => void
    changeStatus: (Todolistid: string, id: string, isDone: boolean) => void
    removeTask: (todolistID: string, id: string) => void
}

export const Task = React.memo( (props: TasksPropsType) => {

    const removeTaskHandler = useCallback((id: string) => { props.removeTask(props.todolistID, id) }, [props.removeTask, props.todolistID])
    const onChangeTitleInTask = useCallback((titleInSpan: string, id: string,) => 
    { props.changeValueInTask(props.todolistID, titleInSpan, id) }, [props.changeValueInTask, props.todolistID,])

    let changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.todolistID, props.task.id, newIsDoneValue)
    }
    return <li key={props.task.id} className={props.task.isDone ? "isDoneStatus" : ""}>
        <input type="checkbox" onChange={changeStatusHandler} checked={props.task.isDone} />
        <EditableSpan title={props.task.title} onChangeTitle={(titleInSpan: string) => onChangeTitleInTask(titleInSpan, props.task.id)} />
        <Button class="" title={'Remove Task'} onClick={() => removeTaskHandler(props.task.id)} />
    </li>
})