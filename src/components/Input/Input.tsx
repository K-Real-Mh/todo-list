import React, {memo, useEffect, useRef} from 'react';
import cn from 'classnames/bind';
import {InputType} from "../../types";
import s from './Input.module.css';

interface Props {
    type: InputType;
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    autoFocus?: boolean;
    placeholder?: string;
    name?: string
}

function Input({type, value, onChange, onBlur, autoFocus, placeholder, name}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autoFocus) {
            inputRef.current?.focus();
        }
    }, [autoFocus]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value);
    }

    return (
        <input
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            name={name}
            ref={inputRef}
            className={cn(s.input, {[s.inputTodo]: type === 'todo'})}
            onBlur={onBlur}
        />
    );
}

export default memo(Input);