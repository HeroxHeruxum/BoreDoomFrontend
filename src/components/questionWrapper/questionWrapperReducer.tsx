import {ActionType, Answer} from "../../misc/types";


export type QuestionState = {
    answers: Answer[]
}

const defaultState: QuestionState = {
    answers: []
}

export const questionReducer = (state = defaultState, {type, payload}: ActionType) => {
    switch (type) {
       case "UPDATE_ANSWER": {
           let updatedAnswer: Answer = {questionId: payload.questionId, choices: []};
           const otherAnswers = state.answers.filter(answer => {
                if (answer.questionId === payload.questionId) {
                    updatedAnswer = answer
                }
                return answer.questionId !== payload.questionId
            });
            switch (payload.questionType) {
                case "SINGLE_CHOICE":
                    updatedAnswer = {
                        ...updatedAnswer,
                        choices: [payload.choiceId]
                    };
                    break;
                case "MULTIPLE_CHOICE":
                    let choices = [];
                    if (updatedAnswer.choices.includes(payload.choiceId)) {
                        choices = updatedAnswer.choices.filter(id => id !== payload.choiceId)
                    } else {
                        choices = [...updatedAnswer.choices, payload.choiceId]
                    }
                    updatedAnswer = {
                        ...updatedAnswer,
                        choices
                    };
                    break;
            }

            return {
                ...state,
                answers: [...otherAnswers, updatedAnswer]
            }
       }
       case "LOCATION_CHANGE": {
            if (payload.location.includes("results")) {
                return state
            } else {
                return defaultState
            }
       }
       default: {
            return state
       }
    }
 }