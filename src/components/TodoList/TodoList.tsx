import React, {useCallback, useState} from 'react';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
import {FunctionTodo, Todo as TodoType, TodoList as TodoListType, UpdateTodo} from '../../types';
import {Form, Todo} from '../index';
import s from './TodoList.module.css';

function TodoList() {
    const [todos, setTodos] = useState<TodoListType>([]);

    const addTodo = (todo: TodoType): void => {
        const newTodos = [...todos, todo];

        setTodos(newTodos);
    };

    const updateTodo = useCallback<UpdateTodo>((todoId, newTitle, newDescription) => {
        if (!newTitle || /^\s*$/.test(newTitle)) {
            return;
        }

        const newValue = {
            title: newTitle,
            description: newDescription,
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? {...item, ...newValue} : item)));

    }, []);

    const removeTodo = useCallback<FunctionTodo>((id) => {
        const removedArr = [...todos].filter(todo => todo.id !== id);
        
        setTodos(removedArr);
    }, [todos])

    const completeTodo = useCallback<FunctionTodo>((id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        })
        
        setTodos(updatedTodos);
    }, [todos])

    const handleOnDragEnd = (result: DropResult): void => {
        if (!result.destination) return;

        const sortedTodos = [...todos];
        const [reorderedTodo] = sortedTodos.splice(result.source.index, 1);
        sortedTodos.splice(result.destination.index, 0, reorderedTodo);

        setTodos(sortedTodos);
    }


    return (
        <>
            <h1 className={s.title}>Tell me about your plans</h1>
            <Form onSubmit={addTodo} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <ul className={s.todoList} {...provided.droppableProps} ref={provided.innerRef}>
                            {todos.map((todo, index) => (
                                <Draggable key={todo.id} draggableId={`${todo.id}`} index={index}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Todo
                                                id={todo.id}
                                                title={todo.title}
                                                isComplete={todo.isComplete}
                                                description={todo.description}
                                                completeTodo={completeTodo}
                                                removeTodo={removeTodo}
                                                updateTodo={updateTodo}
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