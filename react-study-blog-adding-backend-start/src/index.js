import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';


import { postsReducer } from './store/reducers/postsReducer';

import './index.css';
import App from './App';


const store = createStore(postsReducer, composeWithDevTools());
const app = (
    <Provider store = {store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
