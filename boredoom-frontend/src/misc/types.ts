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
    countChangeHandler: (count: number) => void
    fetchedData: FetchedQuestions
    questionCount: number
    answerHandler: (answers: Answers)=> void
}