import React, { ChangeEvent, KeyboardEvent } from 'react';

type InputType = {
    callBackPress: (e: KeyboardEvent<HTMLInputElement>) => void
    callBackChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    class: string
}

export const Input = (props: InputType) => {
    return (
        <input type="text" className={props.class}
            onChange={props.callBackChange}
            onKeyPress={props.callBackPress}
            value={props.value} />
    )
}