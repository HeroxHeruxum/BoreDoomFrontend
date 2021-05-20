import React, {useCallback, useEffect, useMemo, useState} from "react";
import "./questionContainer.scss";
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {Question} from "../../misc/types";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Button} from "../button/button";
import {QuestionContent} from "../questionContent/questionContent";


export function QuestionSlideContainer() {
    const mockData = useMemo(() => {
        const mockQuestion: Question = {
            id: 1,
            text: "Da ging etwas schief",
            type: "Mehrfachauswahl",
            choices: ["Der Server", "ist nicht", "erreichbar"]
        };
        return [mockQuestion, mockQuestion, {...mockQuestion, type: "was sonst noch?"}]
    }, []);
    const [fetchedData, setFetchedData] = useState(mockData);
    
    const showNotification = useCallback((message: string) => {
        toast.error(message)
    }, [toast]);
     useEffect(() => {
        //REST call for fetching questions
        axios.get<[]>("http://localhost:8082/question", {withCredentials: true})
            .then(response => {
                setFetchedData(response.data)
            })
            .catch(error => {
                showNotification("Fehler bei der Datenbeschaffung: "+error.toString())
            });
    }, [axios, setFetchedData, showNotification]);

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


    const [answer, setAnswer] = useState({})
    const saveNewAnswer = (): void => {
        setAnswer({id: 1, selectedChoices: []})
    }

    
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
        <div className="questionContainer">
            <ToastContainer/>
            <div className="questionContentAndNavigation">
                <div className={`questionNavigation ${disableArrowLeft ? "disabled" : ""}`}
                     onClick={decreaseQuestionIndex}>
                    <ArrowBackIosIcon/>
                </div>
                <div className="questionContent">
                    <QuestionContent question={fetchedData[questionIndex]}/>
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
    );
}