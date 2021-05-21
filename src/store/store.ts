import {configureStore} from "@reduxjs/toolkit";
import answerReducer from "./answerReducer";

const store = configureStore(
    {
        reducer: {
        }
    }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch