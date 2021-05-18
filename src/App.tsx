import React from 'react';
import {MainPage} from "./pages/mainPage/mainPage";
import {Route, Switch} from 'react-router'
import {BrowserRouter} from "react-router-dom";
import {QuestionPage} from "./pages/questionPage/questionPage";
import {ResultPage} from "./pages/resultPage/resultPage";
import {FavouritesPage} from "./pages/favouritesPage/favouritesPage";

function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} render={() => <MainPage/>}/>
                <Route exact path={"/questions"} render={()=> <QuestionPage/>}/>
                <Route exact path={"/results"} render={()=> <ResultPage/>}/>
                <Route exact path={"/bookmarks"} render={()=> <FavouritesPage/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
