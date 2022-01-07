import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type EditableSpanType = {
title : string
onChange : (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState("")

    const activeMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const disactiveMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement> ) => {setTitle(e.currentTarget.value)}

    return  (
        editMode ? <input type="text"  value={title} onChange={onChangeHandler} onBlur={disactiveMode} autoFocus/>
        : <span onDoubleClick= {activeMode}>{props.title}</span>
    )
        
    
}