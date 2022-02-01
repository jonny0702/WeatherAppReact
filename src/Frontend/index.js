import React from "react";
import ReactDOM  from "react-dom";
import { Router } from "react-router";
import {createBrowserHistory} from 'history'
//component
import App from './Router/App'
// import Main from './containers/Main.jsx';

const history = createBrowserHistory()

ReactDOM.render(
    <>
        <Router history={history}>
            <App />    
        </Router>
    </>,
    document.getElementById('root')
);
