import React, { ChangeEvent, useState } from 'react';

type EditableSpanType = {
    title: string
    onChangeTitle: (titleInSpan: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
 
    const [titleInSpan, setTitleInSpan] = useState("")
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInSpan(e.currentTarget.value)
    }

    const onDoubleClickHandler = () => {
        setTitleInSpan(props.title)
        setEditMode(true)
    }
    const onBlurHandler = () => {
        setEditMode(false)
        props.onChangeTitle(titleInSpan)
    }


    return (
        editMode
            ? <input type="text" value={titleInSpan} onBlur={onBlurHandler} onChange={onChangeHandler} autoFocus />
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>

    )
})