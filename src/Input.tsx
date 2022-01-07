import React, { ChangeEvent, KeyboardEvent } from 'react';

type InputType = {
    title: string
    class: string
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPressHandler: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = (props: InputType) => {
    return (
        <input type="text" value={props.title}
            onChange={props.onChangeHandler}
            onKeyPress={props.onKeyPressHandler} />
    )
}