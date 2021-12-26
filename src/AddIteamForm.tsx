import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';


type AddIteamFormPropsType ={
    addIteam: ( title: string) => void
}

export const AddIteamForm = (props: AddIteamFormPropsType) => {
    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState("")

    const onChangeTaskValueHandler = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value) }
    const onkeyPresHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addIteam( title)
            setTitle("")
        } else {
            setError("Icorrect Value")
        }
    }
return (
    <div>
    <Input class="input" value={title} callBackChange={onChangeTaskValueHandler} callBackPress={onkeyPresHandler} />
    <Button class="button" title="+" callBack={addTask} />
    {error && <div className='error'>{error}</div>}
</div>
)
}