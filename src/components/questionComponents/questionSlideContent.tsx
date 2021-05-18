import React from "react";
import "./questionSlideContent.scss";
import {slideProps} from "../../misc/types";

/**
 *This is a Lower Order Component for {questionSlideContainer.tsx}
 */


export function QuestionSlideContent(props: slideProps): JSX.Element {
    return (
        <div>
            <h1 className={'h1style'}>Frage Nummer: {props.currentCount}</h1>
            <div className={'FragenContainer'}>
                <h2>{props.fetchedData.text}</h2>
                {props.content}
                {props.navBar}
            </div>
        </div>
    );
}