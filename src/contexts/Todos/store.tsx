import React, {createContext, useReducer} from 'react';
import {Action, ActionKind, State} from './types';

const initialState: State = {
    value: [],
};
const store = createContext(initialState);
const {Provider} = store;

function StateProvider({children}: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer((state: State, action: Action) => {
        const {type, payload} = action;

        switch (type) {
            case ActionKind.CreateTodo:
                return {
                    ...state,
                    value: [...state.value, payload]
                }
            case ActionKind.UpdateTodo:
                const newValue = {
                    title: payload.newTitle,
                    description: payload.newDescription,
                };
                const updatedTodos =
                    state.value.map(item => (item.id === payload.todoId ? {...item, ...newValue} : item));

                return {
                    ...state,
                    value: updatedTodos
                }
            case ActionKind.RemoveTodo:
                const removedArr = [...state.value].filter(todo => todo.id !== payload);

                return {
                    ...state,
                    value: removedArr,
                }
            case ActionKind.CompleteTodo:
                const completedTodos = state.value.map(todo => {
                    if (todo.id === payload) {
                        return {...todo, isComplete: !todo.isComplete}
                    }
                    return todo;
                })

                return {
                    ...state,
                    value: completedTodos
                }
            case ActionKind.DragTodo:
                if (!payload.destination)
                    return {
                        ...state,
                    };

                const sortedTodos = [...state.value];
                const [reorderedTodo] = sortedTodos.splice(payload.source.index, 1);
                sortedTodos.splice(payload.destination.index, 0, reorderedTodo);

                return {
                    ...state,
                    value: sortedTodos
                }
            default:
                throw new Error();
        }
    }, initialState);

    return <Provider value={{...state, dispatch}}>{children}</Provider>;
}

export {store, StateProvider}
