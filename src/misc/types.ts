export type ActionType = {
    type: string,
    payload: any
}

export type ButtonType = "standard" | "logo" | "header" | "link";

export type QuestionType = "SINGLE_CHOICE" | "MULTIPLE_CHOICE";

export type Question = {
    id: number,
    type: string,
    text: string,
    choices: Array<Choice>
}

type Choice = {
    id: number,
    value: string
}

export type Answer = {
    questionId: number,
    choices: Array<number>
}

export type MediaObject = {
    id: number,
    mediaType: string,
    imageUrl: string,
    name: string,
    description: string,
    producerUrl: string
}