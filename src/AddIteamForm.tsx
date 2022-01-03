import React, { ChangeEvent, useState, KeyboardEvent} from 'react';
import { Button } from './Button';
import { Input } from './Input';

type AddIteamFormType = {
    picValue: ( title: string) => void
}



export const AddIteamForm = (props: AddIteamFormType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.picValue(title)
            setTitle("")
        } else {
            setError("Incorrect VALUE!!!")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const onChangeValueInTile = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }


return(
<div>
                <Input value={title} onChangeCallBack={onChangeValueInTile} onPresCallBack={onKeyPressHandler} />
                <Button title="+" class="" clickCalback={addTask} />
                {error && <div className='errorClass'>{error}</div>}
            </div>
)
}