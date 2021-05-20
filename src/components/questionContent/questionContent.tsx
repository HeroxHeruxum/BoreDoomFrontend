import React, { useCallback, useMemo } from "react";
import "./questionContent.scss";
import {Answer, Question} from "../../misc/types";


interface QuestionContentProps {
    question: Question,
    answer?: Answer,
    updateAnswer: (id: number, selectedChoice: string) => void
}

export function QuestionContent(props: QuestionContentProps) {
    const {question: {id, type, text, choices}, answer, updateAnswer} = props;

    const getIsChecked = useCallback((a: string) => {
        return answer?.selectedChoices.includes(a)
    }, [answer]);

    const singleSelectComponent = useMemo(() => {
        return <div className="selectionWrapper">
            {choices.map(answer => {
                return <div className="selection"
                            onClick={() => updateAnswer(id, answer)}>
                    <input className="inputButton" type="radio"
                           name={`question${id}`} value={answer}
                           checked={getIsChecked(answer)}/>
                    <div className="customRadio">
                        <div className="checkmark"/>
                    </div>
                    {answer}
                </div>
            })}
        </div>
    }, [id, choices, updateAnswer, getIsChecked]);

    const multiSelectComponent = useMemo(() => {
        return <div className="selectionWrapper">
            {choices.map(answer => {
                return <div className="selection"
                            onClick={() => updateAnswer(id, answer)}>
                    <input className="inputButton" type="checkbox"
                           name={`question${id}`} value={answer}
                           checked={getIsChecked(answer)}/>
                    <div className="customCheckbox">
                        <div className="checkmark"/>
                    </div>
                    {answer}
                </div>
            })}
        </div>
    }, [id, choices, updateAnswer, getIsChecked]);

    const answerComponent = useMemo(() => {
        switch (type) {
            case "Einfachauswahl":
                return singleSelectComponent
            case "Mehrfachauswahl":
                return multiSelectComponent
            default:
                return null
        }
    }, [type, singleSelectComponent, multiSelectComponent]);

    return (
        <div className="questionContent">
            <div className="questionText">
                {text}
            </div>
            <div className="questionAnswers">
                {answerComponent}
            </div>
        </div>
    );
}