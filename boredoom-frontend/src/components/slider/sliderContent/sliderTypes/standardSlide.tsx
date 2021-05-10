import React from "react";
import {Button} from "../../../button/button";
import "./standardSlide.scss";
import {FetchedQuestions} from "../../../../misc/types";

/**
 * Dies ist eine Lower Order Component zur {slider.tsx}
 */

interface standardSlideProps {
    currentCount: number
    countChangeHandler: (count: number) => void
    fetchedData: FetchedQuestions

}

export function StandardSlide(props: standardSlideProps): JSX.Element {

    const increaseCount = (): void => {
        props.countChangeHandler(props.currentCount + 1)
    }

    return (
        <div>
            <h1>Frage Nummer: {props.currentCount}</h1>

            <div className={'FragenContainer'}>
                <h2>{props.fetchedData.text}</h2>
                <div className={'RadioGroup'}>

                    {props.fetchedData.choices.map(answer => (<><input type="radio" value={answer}
                                                                       name="question"/> {answer}</>))}
                </div>

                <div className={'ButtonContainer'}>
                    <Button type={"standard"} title={"Increase"} onClick={() => {
                        increaseCount()
                    }}/>
                </div>

            </div>
        </div>


    );
}