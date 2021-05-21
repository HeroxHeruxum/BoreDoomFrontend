import {Answer, AnswerState,} from "../misc/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AnswerState = {
    answers: []
}

export const setNewStoreAnswers = createSlice({
    name: "answers",
    initialState,
    reducers: {
        addAnswers: (state, action: PayloadAction<Answer[]>) => {
            state.answers = action.payload
        }
    }
})


export const {addAnswers} = setNewStoreAnswers.actions
export default setNewStoreAnswers.reducer