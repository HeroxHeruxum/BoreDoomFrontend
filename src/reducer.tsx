import {combineReducers} from "redux";
import {loginReducer, LoginState} from "./components/login/loginReducer";
import {questionReducer, QuestionState} from "./components/questionWrapper/questionWrapperReducer";
import {mediaReducer, MediaState} from "./components/media/mediaReducer";


export type State = {
    login: LoginState,
    questions: QuestionState,
    media: MediaState
}

export const reducer = combineReducers<State>({
    login: loginReducer,
    questions: questionReducer,
    media: mediaReducer
})