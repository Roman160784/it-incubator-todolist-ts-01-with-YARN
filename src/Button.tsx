import React from 'react';

type ButtonType = {
    title: string
    class: string
    callBack: () => void
}

export const Button = (props: ButtonType) => {
   return <button className={props.class} onClick={props.callBack}>{props.title}</button>
}