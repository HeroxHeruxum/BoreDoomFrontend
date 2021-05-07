import React from 'react';
import {MainPage} from "./Pages/MainPage";
import {Route, Switch} from 'react-router'
import {BrowserRouter} from "react-router-dom";
import {QuestionPage} from "./Pages/QuestionPage";

function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} render={() => <MainPage/>}/>
                <Route exact path={"/fragen"} render={()=> <QuestionPage/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
