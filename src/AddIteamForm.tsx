import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

type AddIteamFormType = {
    adIteam : (title: string) => void
}



export const AddIteamForm = (props: AddIteamFormType) => {

    const [title, setTitle] = useState ('')
    const [error, setError] = useState <string | null> (null)
    
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            addTaskHandler()
        }
    }
    const changeInputValueHandler = ( e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)}

    const addTaskHandler = () => {
        setTitle('')
        if(title.trim() !== "") {
        props.adIteam(title)
    } else {
        setError("Incorrect!!!")
    }
    }

    return(
<div>
                    <Input title={title} class={''} onChangeHandler={changeInputValueHandler} onKeyPressHandler={onKeyPressHandler}/>
                    <Button title= '+' class={''} callBack={addTaskHandler}/>
                    {error && <div className='error'>{error}</div>}
                </div>
    )
}