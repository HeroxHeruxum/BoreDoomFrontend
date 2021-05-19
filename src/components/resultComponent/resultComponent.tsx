import React from "react";
import {ResultComponentProps} from "../../misc/types";
import './resultComponent.scss'

export function ResultComponent(props: ResultComponentProps): JSX.Element {


    return (
        <div className={"container"}>
            <img
                className={"imageClass"}
                src={props.imgUrl}
                alt="new"
            />
            <div>
                <h2 className={"h2Class"}>{props.title}</h2>
                <p>{props.genre}</p>
                <a style={{display: "table-cell"}} href={props.producerUrl} target="_blank">Zum Hersteller</a>
            </div>
            {props.functionalButton}
        </div>
    );

}