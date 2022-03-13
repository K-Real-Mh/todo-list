import React from 'react';
import {TodoList} from './components';
import s from './App.module.css';

function App() {
    return (
        <div className={s.todoApp}>
            <TodoList />
        </div>
    );
}

export default App;
