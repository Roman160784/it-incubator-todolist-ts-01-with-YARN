import React, { ChangeEvent, useState } from 'react';

type EditableSpanType = {
title: string
onChangeTitle : (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState("")

    const activEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const disActivEditMode = () => {
        if(title.trim() !== "") {
            setEditMode(false)
            props.onChangeTitle(title)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    return (
        editMode
            ? <input type="text" value={title} onBlur={disActivEditMode}  onChange={onChangeHandler} autoFocus />
            : <span onDoubleClick={activEditMode}>{props.title}</span>
    )
}