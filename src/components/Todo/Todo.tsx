import React, {useCallback, useState} from 'react';
import {Input} from '../index';
import {AiOutlineCheck, AiOutlineClose, AiOutlineDelete} from "react-icons/ai";
import {FunctionTodo, Todo as TodoType, UpdateTodo} from '../../types';
import cn from 'classnames/bind';
import s from './Todo.module.css';

interface Props extends TodoType {
    completeTodo: FunctionTodo;
    removeTodo: FunctionTodo;
    updateTodo: UpdateTodo;
}

function Todo({
    id,
    title: todoTitle,
    description: todoDescription,
    isComplete,
    completeTodo,
    removeTodo,
    updateTodo
}: Props) {
    const [title, setTitle] = useState(todoTitle);
    const [description, setDescription] = useState(todoDescription);

    const handleUpdateTodo = useCallback(() => {
        if (title !== todoTitle || description !== todoDescription) {
            updateTodo(id, title, description);
        }
    }, [title, todoTitle, description, todoDescription, updateTodo, id])

    return (
        <li className={cn(s.todo, {[s.complete]: isComplete})}>
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
                    <AiOutlineClose className={s.completeIcon} onClick={() => completeTodo(id)} />
                ) : (
                    <AiOutlineCheck className={s.completeIcon} onClick={() => completeTodo(id)} />
                )}
                <AiOutlineDelete className={s.deleteIcon} onClick={() => removeTodo(id)} />
            </div>
        </li>
    );
}

export default Todo;