import {MouseEvent} from "react";

export type FetchedQuestions = {
    id: number
    text: string
    type: string
    choices: Array<string>
}

export type Answers = {
    id: number
    selectedChoices: Array<string>
}

export type slideProps = {
    currentCount: number
    fetchedData: FetchedQuestions
    navBar: JSX.Element
    content: JSX.Element
}

export type navBarProps = {
    backArrowFunction: () => void,
    forwardArrowFunction: () => void,
    middleButtonFunction: () => void,
    middleButtonCaption: string,
    forwardButtonDisabled: boolean,
    backwardButtonDisabled: boolean,
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

export type Media = {
    id: number,
    mediaType: string,
    imgUrl: string,
    title: string,
    genre: string,
    producerUrl: string
}