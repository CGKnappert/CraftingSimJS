import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { simStore } from './context/sim-store';

// const store = configureStore();

ReactDOM.render(
    <Provider store={simStore}>
        <App />
    </Provider>
, document.getElementById('root'));