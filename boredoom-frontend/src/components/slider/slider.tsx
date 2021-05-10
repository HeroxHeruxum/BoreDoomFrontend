import React, {useState} from "react"
import './slider.scss'
import {StandardSlide} from "./sliderContent/sliderTypes/standardSlide";
import {FetchedQuestions} from "../../misc/types";

/**
 * Diese Klasse ist eine Higher Order Component, welche Den State für den Fragenslider beinhaltet.
 * Ebenso ist sie für das Fetchen der Daten verantwortlich! Der State wird über handlerfunktionen
 * manipuliert, diese werden in die Lower Order Components übergeben um ihnen die manipulation des
 * States zu ermöglichen.
 * @constructor
 */

export function Slider(): JSX.Element {
    //Konfiguartion des States
    const [count, setCount] = useState(1)
    const [fetchedData, setFetchedData] = useState(null)
    const [error, setError] = useState(null)

    const mockData: FetchedQuestions = {
        id:1,
        text: "Frage aller Fragen?",
        type: "Einfachauswahl",
        choices: ['Antwort1','Antwort2','Antwort3']
    }

    //Handler-Funktionene
    const countChangeHandler =(newCount: number) =>{
        setCount(newCount)
    }

    //Daten-Fetch
    const getData = (id: string) => {
        fetch("server/question/" + count)
            .then(res => res.json())
            .then((data) => {
                setFetchedData(data)
            }, (error) => {
                setError(error)
            })
    }

    //Logik zum Entscheiden welche Art der Frage geladen wird
    const getComponent = (type: string): JSX.Element => {
        if (type === "Mehrfachauswahl") {
            return (
                <>
                </>
            );
        }
        if (type === "Slider") {
            return (
                <>
                </>
            )
        }
        return (
            <StandardSlide currentCount={count} countChangeHandler={countChangeHandler} fetchedData={mockData}/>
        )
    }

    return (
        getComponent(mockData.type)
        );
}