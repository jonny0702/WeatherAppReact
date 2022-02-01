import React from 'react';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import Main from '../containers/Main';
import NotFound from '../containers/NotFound';

const App = () =>(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Main}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default App;