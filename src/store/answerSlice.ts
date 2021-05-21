import {createSlice} from '@reduxjs/toolkit'

import {AnswerState} from "../misc/types";
import {RootState} from "./rootReducer";

export const initialState: AnswerState = {
    answers: []
}

const answerSlice = createSlice({
    name: "answers",
    initialState,
    reducers: {
        setAnswer: (state, payload: any) => {
            console.error("I recieved", payload)
            state.answers = payload
        }
    }
})

export const {setAnswer} = answerSlice.actions
export const answersSelector = (state: RootState) => state.answers
export default answerSlice.reducer;