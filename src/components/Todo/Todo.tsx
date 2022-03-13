import React, {useCallback, useContext, useState} from 'react';
import {Input} from '../index';
import {AiOutlineCheck, AiOutlineClose, AiOutlineDelete} from 'react-icons/ai';
import {Todo as TodoType} from '../../types';
import {store} from '../../contexts/Todos/store';
import {ActionKind} from '../../contexts/Todos/types';
import cn from 'classnames/bind';
import s from './Todo.module.css';

function Todo({
    id,
    title: todoTitle,
    description: todoDescription,
    isComplete
}: TodoType) {
    const [title, setTitle] = useState(todoTitle);
    const [description, setDescription] = useState(todoDescription);

    const globalState = useContext(store);
    const { dispatch } = globalState;

    const handleUpdateTodo = useCallback(() => {
        if (
            dispatch
            && (
                title
                || !/^\s*$/.test(title)
                || title !== todoTitle
                || description !== todoDescription
            )
        ) {
            dispatch({
                type: ActionKind.UpdateTodo, payload: {
                    todoId: id,
                    newTitle: title,
                    newDescription: description
                }
            });
        }
    }, [dispatch, title, todoTitle, description, todoDescription, id])

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

export default Todo;