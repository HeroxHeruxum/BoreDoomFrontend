import React, {useState} from "react"
import './questionSlideContainer.scss'
import {QuestionSlideContent} from "./questionSlideContent";
import {FetchedQuestions} from "../../misc/types";
import {NavBar} from "../navBar/navBar";

/**
 * This class is the data and logic container for the QuestionSlideContainer Component, here we make
 * all tasks that cpntain datahandling and logic. So the questionSlideContainer.tsx file only hast to arrange the content.
 *
 * @constructor
 */

export function QuestionSlideContainer(): JSX.Element {
    const mockData: FetchedQuestions = {
        id: 1,
        text: "Frage aller Fragen?",
        type: "Mehrfachauswahl",
        choices: ['Antwort1', 'Antwort2', 'Antwort3']
    }
    //initiation of the state
    const [count, setCount] = useState(1)
    const [fetchedData, setFetchedData] = useState(mockData)
    const [error, setError] = useState(null)
    const [questionCount, setQuestionCount] = useState(8)
    const [answer, setAnswer] = useState({})

    //data-fetch
    const getData = (id: string) => {
        fetch("server/question/" + count)
            .then(res => res.json())
            .then((data) => {
                setFetchedData(data)
            }, (error) => {
                setError(error)
            })
    }

    //logic to differ between different question types
    const getComponent = (type: string): JSX.Element => {
        if (type === "Mehrfachauswahl") {
            return (
                <QuestionSlideContent currentCount={count}
                                      fetchedData={mockData}
                                      navBar={returnNavRow()}
                                      content={returnMultiselect()}

                />
            );
        }
        if (type === "QuestionSlideContainer") {
            return (
                <QuestionSlideContent
                    currentCount={count}
                    fetchedData={mockData}
                    navBar={returnNavRow()}
                    content={<></>}
                />
            )
        }
        return (
            <QuestionSlideContent
                currentCount={count}
                fetchedData={mockData}
                navBar={returnNavRow()}
                content={returnSingleSelect()}
            />
        )
    }

    const returnSingleSelect = (): JSX.Element => {
        return (
            <div className={'RadioGroup'}>
                {fetchedData.choices.map(answer => (
                    //Here we map the amount of choices to a radio Button
                    <>
                        <input type="radio"
                               value={answer}
                               name="question"
                        />
                        {answer}
                        <br/>
                    </>))}
            </div>
        )
    }

    const returnMultiselect = (): JSX.Element => {
        return (
            <div className={'RadioGroup'}>
                {fetchedData.choices.map(answer => (
                    //Here we map the amount of choices to a radio Button
                    <>
                        <input type="radio"
                               value={answer}
                               name={answer}
                        />
                        {answer}
                        <br/>
                    </>))}
            </div>
        )
    }


    const increaseCount = (): void => {
        if (count < questionCount) {
            setCount(count + 1)
        }
    }
    const decreaseCount = (): void => {
        //if to prevent a question number of 0
        if (count > 1) {
            setCount(count - 1)
        } else {
            setCount(1)
        }
    }

    const setNewAnswer = (): void => {
        setAnswer({id: 1, selectedChoices: []})
    }

    const returnNavRow = (): JSX.Element => {
        return (
            <NavBar backArrowFunction={decreaseCount}
                    forwardArrowFunction={increaseCount}
                    middleButtonFunction={setNewAnswer}
                    middleButtonCaption={"Speichern"}/>
        )

    }

    return (
        getComponent(mockData.type)
    );
}