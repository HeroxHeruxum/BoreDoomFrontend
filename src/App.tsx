import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {Notification} from "./components/notification/notification";
import {MainPage} from "./pages/mainPage/mainPage";
import {QuestionPage} from "./pages/questionPage/questionPage";
import {MediaPage} from "./pages/mediaPage/mediaPage";
import {LuckyStrikePage} from "./pages/luckyStrikePage/luckyStrikePage";
import {LoginPage} from "./pages/loginPage/loginPage";
import {ImprintPage} from "./pages/imprintPage/imprintPage";


function App() {
    return (
        <BrowserRouter>
            <Notification/>
            <Switch>
                <Route exact path={"/"} render={() => <MainPage/>}/>
                <Route exact path={"/questions"} render={()=> <QuestionPage/>}/>
                <Route exact path={"/results"} render={props => <MediaPage {...props}/>}/>
                <Route exact path={"/luckystrike"} render={() => <LuckyStrikePage/>}/>
                <Route exact path={"/bookmarks"} render={props => <MediaPage {...props}/>}/>
                <Route exact path={"/login"} render={props => <LoginPage {...props}/>}/>
                <Route exact path={"/register"} render={props => <LoginPage {...props}/>}/>
                <Route exact path={"/imprint"} render={() => <ImprintPage/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
