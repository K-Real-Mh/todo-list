export type InputType = 'form' | 'todo';

export interface Todo {
    id: number,
    title: string,
    description: string,
    isComplete: boolean,
}

export type TodoList = Todo[];

export type UpdateTodo = (id: Todo['id'], title: Todo['title'], description: Todo['description']) => void;

export type FunctionTodo = (id: Todo['id']) => void;