import React, {useContext} from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {Form, Todo} from '../index';
import {store} from '../../contexts/Todos/store';
import {ActionKind} from '../../contexts/Todos/types';
import s from './TodoList.module.css';

function TodoList() {
    const globalState = useContext(store);
    const {value: todos, dispatch} = globalState;

    const handleOnDragEnd = (result: DropResult): void => {
        if (dispatch) {
            dispatch({type: ActionKind.DragTodo, payload: result});
        }
    }

    return (
        <>
            <h1 className={s.title}>Tell me about your plans</h1>
            <Form/>
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