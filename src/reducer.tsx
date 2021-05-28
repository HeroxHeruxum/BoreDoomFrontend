import {combineReducers} from "redux";
import {loginReducer, LoginState} from "./components/login/loginReducer";
import {questionReducer, QuestionState} from "./components/questionWrapper/questionWrapperReducer";


export type ReducerState = {
    login: LoginState,
    questions: QuestionState
}

export const reducer = combineReducers<ReducerState>({
    login: loginReducer,
    questions: questionReducer
})