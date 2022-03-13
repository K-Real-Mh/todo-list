import React, {useContext, useState} from 'react';
import {Input} from '../index';
import {store} from '../../contexts/Todos/store';
import {ActionKind} from '../../contexts/Todos/types';
import s from './Form.module.css';

function Form() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const globalState = useContext(store);
    const { dispatch } = globalState;

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();

        if (!title || /^\s*$/.test(title)) {
            return;
        }

        if (dispatch) {
            dispatch({type: ActionKind.CreateTodo, payload: {
                    id: Date.now() + Math.random(),
                    title,
                    description,
                    isComplete: false
                }
            });

            setTitle('');
            setDescription('');
        }
    }

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <Input
                type="form"
                value={title}
                onChange={setTitle}
                name="title"
                placeholder="Add a todo"
                autoFocus
            />
            <Input
                type="form"
                value={description}
                onChange={setDescription}
                name="description"
                placeholder="Todo description"
            />
            <button type="submit" className={s.button}>
                Add todo
            </button>
        </form>
    );
}

export default Form;