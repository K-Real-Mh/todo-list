import React, {useCallback, useContext, useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {Form, Todo} from '../index';
import {store} from '../../contexts/Todos/store';
import {Action, ActionKind} from '../../contexts/Todos/types';
import s from './TodoList.module.css';

function TodoList() {
    const [state, setState] = useState<Action>();
    const globalState = useContext(store);
    const {value: todos, dispatch: globalDispatch} = globalState;

    const dispatch = useCallback((action: Action) => {
        setState(action);
    }, [])

    useEffect(() => {
        if (state && globalDispatch) {
            globalDispatch(state);
        }
    }, [globalDispatch, state])

    const handleOnDragEnd = (result: DropResult): void => {
        if (globalDispatch) {
            globalDispatch({type: ActionKind.DragTodo, payload: result});
        }
    }

    return (
        <>
            <h1 className={s.title}>Tell me about your plans</h1>
            <Form dispatch={dispatch}/>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <ul className={s.todoList} {...provided.droppableProps} ref={provided.innerRef}>
                            {todos.map((todo, index) => (
                                <Draggable key={todo.id} draggableId={`${todo.id}`} index={index}>
                                    {(provided) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Todo
                                                id={todo.id}
                                                title={todo.title}
                                                isComplete={todo.isComplete}
                                                description={todo.description}
                                                dispatch={dispatch}
                                            />
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
}

export default TodoList;