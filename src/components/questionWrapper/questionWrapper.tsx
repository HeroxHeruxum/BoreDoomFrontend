import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./questionWrapper.scss";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {Question, QuestionType} from "../../misc/types";
import {ReducerState} from "../../reducer";
import {updateAnswer} from "./questionWrapperActions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Button} from "../button/button";
import {QuestionContent} from "../questionContent/questionContent";
import {Visible} from "../visible/visible";
import { useHistory } from "react-router";


export function QuestionWrapper() {
    const answers = useSelector((state: ReducerState) => {
        return state.questions.answers
    });

    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState<Question[]>([]);
    
    const mockData = useMemo(() => {
        const mockQuestion: Question = {
            id: 1,
            text: "Da ging etwas schief",
            type: "SINGLE_CHOICE",
            choices: [{id: 1, value: "Der Server ist tot"}, {id: 2, value: "Und immernoch tot"}]
        };
        return [mockQuestion, {...mockQuestion, id: 2}, {...mockQuestion, id: 3, type: "MULTIPLE_CHOICE"}]
    }, []);

    const showNotification = useCallback((message: string) => {
        toast.error(message)
    }, []);

    useEffect(() => {
        //setFetchedData(mockData)
        setIsLoading(true);
        axios.get<[]>("http://localhost:8082/question")
            .then(response => {
                setIsLoading(false);
                setFetchedData(response.data)
            })
            .catch(error => {
                setIsLoading(false);
                showNotification(`Fehler bei der Datenbeschaffung: ${error.toString()}`)
            });
    }, [setIsLoading, setFetchedData, showNotification]);

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

    const dispatch = useDispatch();
    const updateAnswerFn = useCallback((questionId: number, choiceId: number) => {
        dispatch(updateAnswer({
            questionId,
            questionType: activeQuestion.type as QuestionType,
            choiceId
        }))
    }, [activeQuestion, dispatch]);

    const activeAnswer = useMemo(() => {
        return answers.find(answer => answer.questionId === activeQuestion.id)
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

    const history = useHistory();
    return (
        <div>
            <ToastContainer/>
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
                    <div className="questionWrapper">
                        <div className="questionContentAndNavigation">
                            <div className={`questionNavigation ${disableArrowLeft ? "disabled" : ""}`}
                                 onClick={decreaseQuestionIndex}>
                                <ArrowBackIosIcon/>
                            </div>
                            <div className="questionContent">
                                <QuestionContent question={activeQuestion}
                                                 answer={activeAnswer}
                                                 updateAnswer={updateAnswerFn}/>
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