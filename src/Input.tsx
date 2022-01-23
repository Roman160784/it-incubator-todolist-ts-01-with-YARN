import React, { ChangeEvent, KeyboardEvent } from 'react';

type InputType = {
value: string
onChange: (e: ChangeEvent<HTMLInputElement>) => void
onClick : (e: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = React.memo((props: InputType) => {
    return (
        <input value={props.value} 
        type="text" 
        onChange={props.onChange} 
        onKeyPress={props.onClick}
        />
    )
})