export type InputType = 'form' | 'todo';

export interface Todo {
    id: number,
    title: string,
    description: string,
    isComplete: boolean,
}

export type FunctionTodo = (id: Todo['id']) => void;