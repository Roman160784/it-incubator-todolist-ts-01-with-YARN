import React from 'react';
import { isPropertySignature } from 'typescript';

type ButtonType = {
class : string
title: string
onClick : () => void

}

export const Button = React.memo( (props: ButtonType) => {
    return(
        <button className={props.class} onClick={props.onClick}>{props.title}</button>
    )
})