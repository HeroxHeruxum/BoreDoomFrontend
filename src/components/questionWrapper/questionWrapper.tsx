import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./questionWrapper.scss";
import {QuestionType} from "../../misc/types";
import {State} from "../../reducer";
import {fetchQuestions, updateAnswer} from "./questionWrapperActions";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {Button} from "../button/button";
import {QuestionContent} from "../questionContent/questionContent";
import {Visible} from "../visible/visible";


export function QuestionWrapper() {
    const {isLoading, questions, answers} = useSelector((state: State) => ({
        isLoading: state.questions.isLoading,
        questions: state.questions.questions,
        answers: state.questions.answers
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch]);


    const numberOfQuestions = useMemo(() => questions.length, [questions]);
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
        return questions[questionIndex]
    }, [questions, questionIndex]);
    const activeAnswer = useMemo(() => {
        return answers.find(answer => answer.questionId === activeQuestion.id)
    }, [answers, activeQuestion]);

    const updateAnswerFn = useCallback((questionId: number, choiceId: number) => {
        dispatch(updateAnswer({
            questionId,
            questionType: activeQuestion.type as QuestionType,
            choiceId
        }))
    }, [activeQuestion, dispatch]);

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
        <div className="questions">
            <Visible if={isLoading}>
                <p className="loading">
                    lädt Fragen...
                </p>
            </Visible>
            <Visible if={!isLoading}>
                <Visible if={questions.length === 0}>
                    <p className="noResults">
                        keine Fragen gefunden
                    </p>
                </Visible>
                <Visible if={questions.length > 0}>
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