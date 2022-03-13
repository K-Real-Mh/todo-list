import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {StateProvider} from './contexts/Todos/store';

ReactDOM.render(
    <React.StrictMode>
        <StateProvider>
            <App/>
        </StateProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
