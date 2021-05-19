import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {MainPage} from "./pages/mainPage/mainPage";
import {QuestionPage} from "./pages/questionPage/questionPage";
import {ResultPage} from "./pages/resultPage/resultPage";
import {FavouritesPage} from "./pages/favouritesPage/favouritesPage";
import {LoginPage} from "./pages/loginPage/loginPage";


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/"} render={() => <MainPage/>}/>
                <Route exact path={"/questions"} render={()=> <QuestionPage/>}/>
                <Route exact path={"/results"} render={()=> <ResultPage/>}/>
                <Route exact path={"/bookmarks"} render={()=> <FavouritesPage/>}/>
                <Route exact path={"/login"} render={props => <LoginPage {...props}/>}/>
                <Route exact path={"/register"} render={props => <LoginPage {...props}/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
