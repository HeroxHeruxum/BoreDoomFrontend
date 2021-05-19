import React, {useEffect, useState} from "react"
import './questionSlideContainer.scss'
import {QuestionSlideContent} from "./questionSlideContent";
import {FetchedQuestions} from "../../misc/types";
import {NavBar} from "../navBar/navBar";
import axios from "axios";

/**
 * This class is the data and logic container for the QuestionSlideContainer Component, here we make
 * all tasks that cpntain datahandling and logic. So the questionSlideContainer.tsx file only hast to arrange the content.
 *
 * @constructor
 */

export function QuestionSlideContainer(): JSX.Element {
    const question1: FetchedQuestions = {
        id: 1,
        text: "Frage aller Fragen?",
        type: "Mehrfachauswahl",
        choices: ['Antwort1', 'Antwort2', 'Antwort3']
    }

    const question2: FetchedQuestions = {
        id: 2,
        text: "Frage aller Fragen?",
        type: "Einfachauswahl",
        choices: ['Antwort1', 'Antwort2', 'Antwort3']
    }

    const question3: FetchedQuestions = {
        id: 3,
        text: "Frage aller Fragen?",
        type: "Slider",
        choices: ['Antwort1', 'Antwort2', 'Antwort3']
    }

    const mockData: Array<FetchedQuestions> =[question1,question2,question3]

    //initiation of the state
    const [count, setCount] = useState(1)
    const [fetchedData, setFetchedData] = useState(mockData)
    const [error, setError] = useState(null)
    const [questionCount, setQuestionCount] = useState(mockData.length)
    const [answer, setAnswer] = useState({})
    const [data,getFetch] = useState({})

    useEffect(()=>{axios
        .get<[]>("http://localhost:8082/question",{withCredentials:true})
        .then(response => {setFetchedData(response.data)})
        .catch((error =>{console.error(error)}));
    },[]);

    //logic to differ between different question types
    const getComponent = (type: string): JSX.Element => {
        if (type === "Mehrfachauswahl") {
            return (
                <QuestionSlideContent currentCount={count}
                                      fetchedData={fetchedData[count-1]}
                                      navBar={returnNavRow()}
                                      content={returnMultiselect()}

                />
            );
        }
        if (type === "QuestionSlideContainer") {
            return (
                <QuestionSlideContent
                    currentCount={count}
                    fetchedData={fetchedData[count-1]}
                    navBar={returnNavRow()}
                    content={<></>}
                />
            )
        }
        return (
            <QuestionSlideContent
                currentCount={count}
                fetchedData={fetchedData[count-1]}
                navBar={returnNavRow()}
                content={returnSingleSelect()}
            />
        )
    }

    const returnSingleSelect = (): JSX.Element => {
        return (
            <div className={'RadioGroup'}>
                {fetchedData[count-1].choices.map(answer => (
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
                {fetchedData[count-1].choices.map(answer => (
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
        setCount(count + 1)

    }
    const decreaseCount = (): void => {
        //if to prevent a question number of 0
        setCount(count - 1)
    }

    const setNewAnswer = (): void => {
        setAnswer({id: 1, selectedChoices: []})
    }

    const returnNavRow = (): JSX.Element => {
        return (
            <NavBar backArrowFunction={decreaseCount}
                    forwardArrowFunction={increaseCount}
                    middleButtonFunction={setNewAnswer}
                    middleButtonCaption={"Speichern"}
                    forwardButtonDisabled={count === questionCount}
                    backwardButtonDisabled={count === 1}
            />
        )

    }

    return (
            getComponent(mockData[count-1].type)
    );
}