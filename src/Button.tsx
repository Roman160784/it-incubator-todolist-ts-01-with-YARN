import React from 'react';
import { isPropertySignature } from 'typescript';


type ButtonType = {
    class: string
    title: string
    callBack: () => void
}

export const Button = (props: ButtonType) => {
    return (
        <button className={props.class}
            onClick={props.callBack}>
            {props.title}
        </button>
    )
}