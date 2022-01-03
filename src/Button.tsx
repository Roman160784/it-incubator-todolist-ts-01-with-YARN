
import React from 'react';

type ButtonType = {
title: string    
class: string
clickCalback: () => void
}

export const Button = (props: ButtonType) => {
return(
    <button className={props.class} onClick={props.clickCalback}>{props.title}</button>
)
}