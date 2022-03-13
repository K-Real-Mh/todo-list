import {Action} from "./contexts/Todos/types";

export type InputType = 'form' | 'todo';

export interface Todo {
    id: number,
    title: string,
    description: string,
    isComplete: boolean,
}

export type TodoList = Todo[];

export type ComponentDispatch = (action: Action) => void;
