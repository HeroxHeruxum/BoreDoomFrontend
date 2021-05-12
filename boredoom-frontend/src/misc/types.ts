export type FetchedQuestions = {
    id:number
    text:string
    type:string
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
    backArrowFunction: ()=> void,
    forwardArrowFunction: ()=> void,
    middleButtonFunction: ()=> void,
    middleButtonCaption: string
}
