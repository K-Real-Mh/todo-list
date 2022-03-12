import React, {useState} from 'react';
import {Input} from '../index';
import {Todo} from '../../types';
import s from './Form.module.css';


interface Props {
    onSubmit: (todo: Todo) => void;
}

function Form({onSubmit}: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();

        if (!title || /^\s*$/.test(title)) {
            return;
        }

        onSubmit({
            id: Date.now() + Math.random(),
            title,
            description,
            isComplete: false
        })

        setTitle('');
        setDescription('');
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