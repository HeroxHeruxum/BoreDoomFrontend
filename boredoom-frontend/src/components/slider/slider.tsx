import React, {useState} from "react"
import './slider.scss'
import {StandardSlide} from "./sliderContent/sliderTypes/standardSlide";
import {Answers, FetchedQuestions} from "../../misc/types";
import {MultiSelectSlide} from "./sliderContent/sliderTypes/multiselectSlide";
import {InputSlide} from "./sliderContent/sliderTypes/inputSlide";

/**
 * This classe is a Higher Order Component, wich controls the State of the slide-Lower-Order-Components.
 * Also it contains the rest Call handling for this part of the page. The state is manipulated by
 * handler functions, which we can pass on to the Lower-Order-Components to control the state of the
 * Higher Order Component within the Lower Order Components.
 * @constructor
 */

export function Slider(): JSX.Element {
    //initiation of the state
    const [count, setCount] = useState(1)
    const [fetchedData, setFetchedData] = useState(null)
    const [error, setError] = useState(null)
    const [questionCount, setQuestionCount] = useState(8)
    const [answer, setAnswer] = useState({})

    const mockData: FetchedQuestions = {
        id: 1,
        text: "Frage aller Fragen?",
        type: "Slider",
        choices: ['Antwort1', 'Antwort2', 'Antwort3']
    }

    //Handler-functions
    const countChangeHandler = (newCount: number) => {
        setCount(newCount)
    }
    const answerHandler = (newAnswers: Answers): void => {
        setAnswer(newAnswers)
    }

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
                <MultiSelectSlide currentCount={count}
                                  countChangeHandler={countChangeHandler}
                                  fetchedData={mockData}
                                  questionCount={8}
                                  answerHandler={answerHandler}/>
            );
        }
        if (type === "Slider") {
            return (
                <InputSlide
                    currentCount={count}
                    countChangeHandler={countChangeHandler}
                    fetchedData={mockData}
                    questionCount={8}
                    answerHandler={answerHandler}
                />
            )
        }
        return (
            <StandardSlide
                currentCount={count}
                countChangeHandler={countChangeHandler}
                fetchedData={mockData}
                questionCount={8}
                answerHandler={answerHandler}
            />
        )
    }

    return (
        getComponent(mockData.type)
    );
}