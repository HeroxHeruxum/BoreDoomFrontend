import axios from "axios";
import {Question, QuestionType} from "../../misc/types";
import {State} from "../../reducer";
import {showNotification} from "../notification/notificationActions";
import {ThunkAction} from "redux-thunk";


function setIsLoading(isLoading: boolean) {
    return {
        type: "SET_ISLOADING_QUESTIONS",
        payload: isLoading
    }
}

function setQuestions(questions: Question[]) {
    return {
        type: "SET_QUESTIONS",
        payload: questions
    }
}

export function updateAnswer(payload: {questionId: number, questionType: QuestionType, choiceId: number}) {
    return {
        type: "UPDATE_ANSWER",
        payload
    }
}


export function fetchQuestions(): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any) => {
        try {
            dispatch(setIsLoading(true));
            const response = await axios.get<[]>("http://localhost:8082/question");
            dispatch(setQuestions(response.data));
            dispatch(setIsLoading(false))
        } catch {
            showNotification("activity", "Beschaffen der Daten");
            dispatch(setIsLoading(false))
        }
    }
}