import React, { ChangeEvent, KeyboardEvent } from 'react';

type InputType = {
    value: string
    onChangeCallBack: (e: ChangeEvent<HTMLInputElement>) => void
    onPresCallBack: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = (props: InputType) => {
    return (
        <input type="text" value={props.value}
            onKeyPress={props.onPresCallBack}
            onChange={props.onChangeCallBack} />
    )
}