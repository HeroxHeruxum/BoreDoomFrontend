import {QuestionType} from "../../misc/types";


export function updateAnswer(payload: {questionId: number, questionType: QuestionType, choiceId: number}) {
    return {
        type: "UPDATE_ANSWER",
        payload
    }
}