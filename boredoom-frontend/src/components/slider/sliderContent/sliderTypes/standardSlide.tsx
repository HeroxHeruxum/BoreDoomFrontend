import React from "react";
import {Button} from "../../../button/button";

/**
 * Dies ist eine Lower Order Component zur {slider.tsx}
 */

interface standardSlideProps {
    currentCount: number
    countChangeHandler: (count: number)=> void

}

export function StandardSlide(props: standardSlideProps):JSX.Element {

    const increaseCount= (): void =>{
        props.countChangeHandler(props.currentCount+1)
    }

    return (
        <div>
        <h2>Frage Nummer: {props.currentCount}</h2>
        <Button type={"standard"} title={"Increase"} onClick={()=>{increaseCount()}}/>
        </div>

);
}