import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v1 } from 'uuid';
import { AddIteamForm } from './AddIteamForm';
import './App.css';
import { Todolist, } from './Todolist';
import {rootReducerType} from './store/store'
import { addTaskAC, changeStatusAC, changeValueInTaskAC, removeTaskAC, TasksMainType } from './Reducers/TaskReducers';
import { addTodolistAC, changeFilterAC, changeValueInTLAC, removeTodoListAC, TodolistsType } from './Reducers/TodolistReducers';


export type FilterValueType = "all" | "active" | "completed"

function App() {

    const todolists = useSelector <rootReducerType, Array<TodolistsType>>(state => state.todolist)
    const tasks = useSelector <rootReducerType, TasksMainType> (state => state.tasks)
    let dispatch = useDispatch();
   
    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }, [])

    const addTask = useCallback((todolistID: string, title: string) => {
       dispatch(addTaskAC(todolistID, title))
    }, [])

    const changeFilter = useCallback( (todolistID: string, value: FilterValueType) => {
        dispatch(changeFilterAC(todolistID, value))
    }, [])

    const changeStatus = useCallback( (Todolistid: string, id: string, isDone: boolean) => { 
        dispatch(changeStatusAC(Todolistid, id, isDone))
    }, [])

    const addTodolist = useCallback( ( title: string) => {
       dispatch(addTodolistAC(title))
    }, [])

    const changeValueInTask = useCallback( (Todolistid: string, titleInSpan : string, id: string) => {
        dispatch(changeValueInTaskAC(Todolistid, titleInSpan, id))
    }, [])

    const changeValueInTL = useCallback( (Todolistid: string, titleInSpan : string) => {
       dispatch(changeValueInTLAC(Todolistid, titleInSpan))
    }, [])

    const removeTodoList = useCallback( (Todolistid: string) => {
        dispatch(removeTodoListAC(Todolistid))
    }, [])

    return (
        <div className="App">
            <AddIteamForm addIteam={addTodolist}/>
            {
                todolists.map(tl => {
                    return <Todolist
                        key={tl.id}
                        title={tl.title}
                        todolistID={tl.id}
                        tasks={tasks[tl.id]}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        removeTodoList={removeTodoList}
                        changeValueInTL={changeValueInTL}
                        changeValueInTask={changeValueInTask}
                    />
                })
            }


        </div>
    );
}

export default App;
