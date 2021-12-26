import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type EditableSpanType = {
    title: string
    onChangeTitle: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    const[title, setTitle] = useState('')
    const [editMode, setEditmode] = useState<boolean> (false)

    const activeEditMode = () => {
        setEditmode(true)
        setTitle(props.title)
    }
    const activeViewMode = () => {
        setEditmode(false)
        props.onChangeTitle(title)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)} 

    return  editMode
        ? <input value={title} onBlur={activeViewMode} onChange={onChangeHandler} autoFocus/>
       : <span onDoubleClick={activeEditMode} >{props.title}</span>
    
}