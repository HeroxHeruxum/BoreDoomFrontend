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
    id: number,
    selectedChoices: Array<string>
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

export type Result = {
    id: number,
    mediaType: "MOVIE" | "BOOK",
    imgUrl: string,
    producerUrl: string,
    title: string,
    genre: string
}

export type LoginContainerProps = {
    isRegister: boolean
}