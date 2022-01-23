import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

export type AddIteamFormType ={
    addIteam : (title: string) => void
}


export const AddIteamForm = React.memo( (props: AddIteamFormType) => {

    const[title, setTitle] = useState("")
    const [error, setError] = useState <string | null> (null)

    const addTaskHandler = () => {
        setTitle('')
        if(title.trim() !== ""){
        props.addIteam(title)
        }else {
            setError("Incorrect Value")
        }
    }
    
    const onClickInputHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null)
        }
        if(e.key === "Enter"){
            addTaskHandler()
        }
    }
return(<div>
               <Input value={title}  onChange={(e) => {setTitle(e.currentTarget.value)}} onClick={onClickInputHandler}/>
                <Button class="" title={'+'} onClick={addTaskHandler}/>
                { error && <div className='error'>{error}</div>}
                </div>
)
})


