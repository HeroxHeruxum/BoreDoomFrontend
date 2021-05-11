import React from "react";
import {Button} from "../../../button/button";
import "./standardSlide.scss";
import {FetchedQuestions, slideProps} from "../../../../misc/types";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

/**
 * Dies ist eine Lower Order Component zur {slider.tsx}
 */


export function StandardSlide(props: slideProps): JSX.Element {

    const increaseCount = (): void => {
        if (props.currentCount< props.questionCount){
            props.countChangeHandler(props.currentCount + 1)
        }
    }
    const decreaseCount = (): void => {
        //if abfrage, damit es keine Frage NR 0 gibt
        if(props.currentCount > 1){
            props.countChangeHandler(props.currentCount - 1)
        } else {
            props.countChangeHandler(1)
        }
    }

    const setAnswer =():void =>{
        props.answerHandler({id:1,selectedChoices:[]})
        console.log('Ich funktioniere noch nicht !')
    }

    return (
        <div>
            <h1 className={'h1style'}>Frage Nummer: {props.currentCount}</h1>
            <div className={'FragenContainer'}>
                <h2>{props.fetchedData.text}</h2>
                <div className={'RadioGroup'}>
                    {props.fetchedData.choices.map(answer => (<><input type="radio" value={answer} name="question"/> {answer} <br/> </>))}
                </div>
                <div className={'ButtonContainer'}>
                    <Button type={"header"} title={<ArrowBackIosIcon/>} onClick={() => {
                        decreaseCount()
                    }}/>
                    <Button type={"header"} title={"Speichern"} onClick={() => {
                        setAnswer()
                    }}/>
                    <Button type={"header"} title={<ArrowForwardIosIcon/>} onClick={() => {
                        increaseCount()
                    }}/>
                </div>
            </div>
        </div>
    );
}