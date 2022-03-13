import React, {memo, useCallback, useEffect, useState} from 'react';
import {Input} from '../index';
import {AiOutlineCheck, AiOutlineClose, AiOutlineDelete} from 'react-icons/ai';
import {ComponentDispatch, Todo as TodoType} from '../../types';
import {ActionKind} from '../../contexts/Todos/types';
import cn from 'classnames/bind';
import s from './Todo.module.css';

interface Props extends TodoType {
    dispatch: ComponentDispatch;
}

function Todo({
    id,
    title: todoTitle,
    description: todoDescription,
    isComplete,
    dispatch
}: Props) {
    const [title, setTitle] = useState(todoTitle);
    const [description, setDescription] = useState(todoDescription);
    const [isNeedUpdate, setIsNeedUpdate] = useState(false);

    useEffect(() => {
        if (isNeedUpdate) {
            if (title !== todoTitle || description !== todoDescription) {
                if (!title || /^\s*$/.test(title)) {
                    setTitle(todoTitle);
                } else {
                    dispatch({
                        type: ActionKind.UpdateTodo, payload: {
                            todoId: id,
                            newTitle: title,
                            newDescription: description
                        }
                    });
                }
            }
            setIsNeedUpdate(false);
        }
    }, [description, dispatch, id, isNeedUpdate, title, todoDescription, todoTitle])

    const handleUpdateTodo = useCallback(() => {
        setIsNeedUpdate(true);
    }, [])

    const handleCompleteTodo = () => {
        if (dispatch) {
            dispatch({type: ActionKind.CompleteTodo, payload: id})
        }
    }

    const handleRemoveTodo = () => {
        if (dispatch) {
            dispatch({type: ActionKind.RemoveTodo, payload: id})
        }
    }

    return (
        <div className={cn(s.todo, {[s.complete]: isComplete})}>
            <div className={s.value}>
                <Input
                    type="todo"
                    value={title}
                    onChange={setTitle}
                    placeholder="Update todo"
                    onBlur={handleUpdateTodo}
                />
                <Input
                    type="todo"
                    value={description}
                    onChange={setDescription}
                    placeholder="Update todo description"
                    onBlur={handleUpdateTodo}
                />
            </div>
            <div className={s.icons}>
                {isComplete ? (
                    <AiOutlineClose className={s.completeIcon} onClick={handleCompleteTodo} />
                ) : (
                    <AiOutlineCheck className={s.completeIcon} onClick={handleCompleteTodo} />
                )}
                <AiOutlineDelete className={s.deleteIcon} onClick={handleRemoveTodo} />
            </div>
        </div>
    );
}

export default memo(Todo);