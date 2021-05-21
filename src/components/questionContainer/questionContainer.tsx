import React, {useCallback, useEffect, useMemo, useState} from "react";
import "./questionContainer.scss";
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {Answer, Question} from "../../misc/types";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Button} from "../button/button";
import {QuestionContent} from "../questionContent/questionContent";
import { Visible } from "../visible/visible";


export function QuestionContainer() {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedData, setFetchedData] = useState<Question[]>([]);
    
    const showNotification = useCallback((message: string) => {
        toast.error(message)
    }, [toast]);

    useEffect(() => {
        //REST call for fetching questions
        axios.get<[]>("http://localhost:8082/question")
            .then(response => {
                setIsLoading(false);
                setFetchedData(response.data)
            })
            .catch(error => {
                setIsLoading(false);
                showNotification(`Fehler bei der Datenbeschaffung: ${error.toString()}`)
            });
    }, [axios, setIsLoading, setFetchedData, showNotification]);

    const numberOfQuestions = useMemo(() => fetchedData.length, [fetchedData]);
    const [questionIndex, setQuestionIndex] = useState(0);

    const increaseQuestionIndex = useCallback(() => {
        if (questionIndex < numberOfQuestions - 1) {
            setQuestionIndex(questionIndex + 1)
        }
    }, [numberOfQuestions, questionIndex, setQuestionIndex]);

    const decreaseQuestionIndex = useCallback(() => {
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1)
        }
    }, [questionIndex, setQuestionIndex]);

    const activeQuestion = useMemo(() => {
        return fetchedData[questionIndex]
    }, [fetchedData, questionIndex]);

    const toggleValueInArray = useCallback((array: string[], value: string) => {
        if (array.includes(value)) {
            return array.filter(v => v !== value)
        } else {
            return [...array, value]
        }
    }, []);
    const [answers, setAnswers] = useState<Answer[]>([]);

    const updateAnswer = useCallback((id: number, selectedCoice: string) => {
        let updatedAnswer: Answer = {id, selectedChoices: []};
        const otherAnswers = answers.filter(answer => {
            if (answer.id === id) {
                updatedAnswer = answer
            }
            return answer.id !== id
        });
        switch(activeQuestion.type) {
            case "SINGLE_CHOICE":
                updatedAnswer = {
                    ...updatedAnswer,
                    selectedChoices: [selectedCoice]
                };
                break;
            case "MULTIPLE_CHOICE":
                const choices = toggleValueInArray(updatedAnswer.selectedChoices, selectedCoice);
                updatedAnswer = {
                    ...updatedAnswer,
                    selectedChoices: choices
                };
                break;
        }
        setAnswers([...otherAnswers, updatedAnswer])
    }, [activeQuestion, answers, setAnswers, toggleValueInArray]);

    const activeAnswer = useMemo(() => {
        return answers.find(answer => answer.id === activeQuestion.id)
    }, [activeQuestion, answers]);
    
    const disableArrowLeft = useMemo(() => {
        return questionIndex === 0
    }, [questionIndex]);
    const disableArrowLRight = useMemo(() => {
        return questionIndex === numberOfQuestions - 1
    }, [numberOfQuestions, questionIndex]);
    const enableResultButton = useMemo(() => {
        return disableArrowLRight
    }, [disableArrowLRight]);
    const progressPercent = useMemo(() => {
        return `${(questionIndex + 1) / numberOfQuestions * 100}%`
    }, [questionIndex, numberOfQuestions]);

    return (
        <div>
            <Visible if={isLoading}>
                <p className="loading">
                    lädt Fragen...
                </p>
            </Visible>
            <Visible if={!isLoading}>
                <Visible if={fetchedData.length === 0}>
                    <p className="noResults">
                        keine Fragen gefunden
                    </p>
                </Visible>
                <Visible if={fetchedData.length > 0}>
                    <div className="questionContainer">
                        <ToastContainer/>
                        <div className="questionContentAndNavigation">
                            <div className={`questionNavigation ${disableArrowLeft ? "disabled" : ""}`}
                                onClick={decreaseQuestionIndex}>
                                <ArrowBackIosIcon/>
                            </div>
                            <div className="questionContent">
                                <QuestionContent question={activeQuestion}
                                                answer={activeAnswer}
                                                updateAnswer={updateAnswer}/>
                                <div className="resultButtonWrapper">
                                    <Button type="standard" title="Auswertung"
                                            disabled={!enableResultButton}
                                            href="/results"/>
                                </div>
                            </div>
                            <div className={`questionNavigation ${disableArrowLRight ? "disabled" : ""}`}
                                onClick={increaseQuestionIndex}>
                                <ArrowForwardIosIcon/>
                            </div>
                        </div>
                        <div className="questionProgress">
                            <div className="questionProgressBar"
                                style={{width: progressPercent}}/>
                        </div>
                    </div>
                </Visible>
            </Visible>
        </div>
    );
}