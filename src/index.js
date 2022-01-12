import React from "react";
import ReactDOM  from "react-dom";
//component
import App from './routes/App.jsx';
//react-router
//redux
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import initialState from './initialState';
import reducer from './reducers/reducer'
//redux-thunk
import thunk from "redux-thunk";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__) || compose;

const store = createStore(
    reducer,
    initialState,
    // applyMiddleware(thunk),
    composeEnhancers()
);



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
