import {combineReducers} from '@reduxjs/toolkit'
import {AnswerState} from "../misc/types";
import answerSlice from "./answerSlice";

const rootReducer = combineReducers({
    answerSlice,
})

export type RootState = AnswerState

export default rootReducer