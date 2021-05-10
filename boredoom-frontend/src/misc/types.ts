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