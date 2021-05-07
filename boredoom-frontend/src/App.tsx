import React from 'react';
import {MainPage} from "./pages/MainPage/MainPage";
import {Route, Switch} from 'react-router'
import {BrowserRouter} from "react-router-dom";
import {QuestionPage} from "./pages/QuestionPage";

function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} render={() => <MainPage/>}/>
                <Route exact path={"/fragenkatalog"} render={()=> <QuestionPage/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
