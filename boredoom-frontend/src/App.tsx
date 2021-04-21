import React from 'react';
import {MainPage} from "./Pages/MainPage";
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router'

function App() {
    const history = createBrowserHistory();

    return (
        <Router history={ history }>
            <Switch>
                <Route path={"/"} render={() => <MainPage/>}/>
            </Switch>
        </Router>
    );
}

export default App;
