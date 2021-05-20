import React, { useMemo } from "react";
import "./questionContent.scss";
import {Question} from "../../misc/types";


interface QuestionContentProps {
    question: Question
    //setAnswer o.Ä.
}

export function QuestionContent(props: QuestionContentProps) {
    const {question} = props;
    
    const getComponent = (): JSX.Element => {
        let content: JSX.Element;
        switch (question.type) {
            case "Mehrfachauswahl":
                content = returnMultiselect();
                break
            case "QuestionSlideContainer":
                content = <div/>;
                break
            default:
                content = returnSingleSelect()
        }
        return content
    }

    const returnSingleSelect = (): JSX.Element => {
        return (
            <div className={"RadioGroup"}>
                {question.choices.map(answer => (
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
            <div className={"RadioGroup"}>
                {question.choices.map(answer => (
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

    return (
        <div className="questionContent">
            <div className="questionText">
                {question.text}
            </div>
            <div className="questionAnswers">
                {getComponent()}
            </div>
        </div>
    );
}