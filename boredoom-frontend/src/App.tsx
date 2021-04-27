import React from 'react';
import {MainPage} from "./Pages/MainPage";
import {createBrowserHistory} from 'history';
import {Router, Route, Switch} from 'react-router'
import {QuestionPage} from "./Pages/QuestionPage";
import {BrowserRouter} from "react-router-dom";

const history = createBrowserHistory();

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} render={()=><MainPage history={history}/>}/>
                <Route path={'/fragenkatalog'} render={() => <QuestionPage/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
