import React from 'react';
import {MainPage} from "./pages/mainPage/mainPage";
import {Route, Switch} from 'react-router'
import {BrowserRouter} from "react-router-dom";
import {QuestionPage} from "./pages/questionPage";

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
