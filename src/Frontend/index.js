import React from "react";
import ReactDOM  from "react-dom";
// import { Router } from "react-router";
// import {createBrowserHistory} from 'history'
//component
import Main from './containers/Main'

// const history = createBrowserHistory()

ReactDOM.hydrate(
    <>
        <Main />    
    </>,
    document.getElementById('root')
);
