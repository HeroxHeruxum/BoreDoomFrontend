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


const getMockData = () => {
    const mockQuestion: Question = {
        id: 1,
        text: "Da ging etwas schief",
        type: "SINGLE_CHOICE",
        choices: [{id: 1, value: "Der Server ist tot"}, {id: 2, value: "Und immernoch tot"}]
    };
    return [mockQuestion, {...mockQuestion, id: 2}, {...mockQuestion, id: 3, type: "MULTIPLE_CHOICE"}]
}

export function fetchQuestions(): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any) => {
        //dispatch(setQuestions(getMockData()))
        dispatch(setIsLoading(true));
        axios.get<[]>("http://localhost:8082/question")
            .then(response => {
                dispatch(setQuestions(response.data));
                dispatch(setIsLoading(false))
            })
            .catch(() => {
                showNotification("activity", "Beschaffen der Daten");
                dispatch(setIsLoading(false))
            })
    }
}