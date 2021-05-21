import * as actionTypes from "./actionTypes"
import {AnswerAction, AnswerState} from "../misc/types";

const initialState: AnswerState = {
    answers: []
}

const reducer = (
    state: AnswerState = initialState,
    action: AnswerAction
): AnswerState => {
    switch (action.type) {
        case actionTypes.SET_ANSWERS:
            console.error("bin im reducer")
            console.error(action.answers)
            return {...state, answers: action.answers}
    }

        return state
}

export default reducer
