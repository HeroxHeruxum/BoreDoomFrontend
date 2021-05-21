import {MouseEvent} from "react";


type Choice = {
    id: number,
    value: string
}

export type Question = {
    id: number,
    type: string,
    text: string,
    choices: Array<Choice>
}

export type Answer = {
    questionId: number,
    choices: Array<number>
}

export type Media = {
    id: number,
    mediaType: string,
    imageUrl: string,
    name: string,
    description: string,
    producerUrl: string
}

export type ButtonType = "standard" | "header" | "link";

export type ButtonProps = {
    type: ButtonType,
    disabled?: boolean,
    title: string | JSX.Element,
    href?: string,
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}
export type LoginContainerProps ={
    isRegister:boolean
}

export type AnswerState ={
    answers: Answer[]
}
export type AnswerAction ={
    type: string
    answers: Answer[]
}

export type DispatchType = (args: AnswerAction) => AnswerAction
