import * as actionTypes from "./actionTypes"
import {Answer, AnswerAction, DispatchType,} from "../misc/types";

export function setStoreAnswers(answers: Answer[]) {
    const action: AnswerAction = {
        type: actionTypes.SET_ANSWERS,
        answers: answers,
    }
    return (dispatch: DispatchType) => {
        dispatch(action)
    }
}

