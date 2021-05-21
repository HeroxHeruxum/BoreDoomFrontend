import * as actionTypes from "./actionTypes"
import {AnswerAction, AnswerState} from "../misc/types";

const initialState: AnswerState = {
    answers: []
}

const answerReducer = (
    state: AnswerState = initialState,
    action: AnswerAction
): AnswerState => {
    switch (action.type) {
        case actionTypes.SET_ANSWERS:
            console.error("bin im answerReducer")
            console.error(action.answers)
            return {...state, answers: action.answers}
    }

        return state
}

export default answerReducer
