import React from 'react';
import {Todo, TodoList} from '../../types';
import {DropResult} from 'react-beautiful-dnd';

export enum ActionKind {
    CreateTodo = 'CREATE_TODO',
    UpdateTodo = 'UPDATE_TODO',
    RemoveTodo = 'REMOVE_TODO',
    CompleteTodo = 'COMPLETE_TODO',
    DragTodo = 'DRAG_TODO',
}

export interface CreateTodoAction {
    type: ActionKind.CreateTodo,
    payload: Todo
}

export interface UpdateTodoAction  {
    type: ActionKind.UpdateTodo,
    payload: {
        todoId: number,
        newTitle: string,
        newDescription: string,
    }
}

export interface RemoveOrCompleteTodoAction {
    type: ActionKind.RemoveTodo | ActionKind.CompleteTodo,
    payload: Todo['id'],
}

export interface DragTodoAction {
    type: ActionKind.DragTodo,
    payload: DropResult,
}

export type Action = CreateTodoAction | UpdateTodoAction | RemoveOrCompleteTodoAction | DragTodoAction;

export interface State {
    value: TodoList;
    dispatch?: React.Dispatch<Action>;
}