import {MouseEvent} from "react";

type Choices ={
    id: number,
    value: string,
}

export type Question = {
    id: number,
    type: string,
    text: string,
    choices: Array<Choices>
}


export type Answer = {
    questionId: number,
    choices: Array<number>
}

export type Media = {
    id: number,
    mediaType: string,
    imgUrl: string,
    title: string,
    genre: string,
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

export type ResultComponentProps = {
    imgUrl: string,
    producerUrl: string,
    title: string,
    genre: string
    functionalButton: JSX.Element
}

export type LoginContainerProps = {
    isRegister: boolean
}

export type AnswerState ={
    answers: Answer[]
}
export type AnswerAction ={
    type: string
    answers: Answer[]
}

export type DispatchType = (args: AnswerAction) => AnswerAction
