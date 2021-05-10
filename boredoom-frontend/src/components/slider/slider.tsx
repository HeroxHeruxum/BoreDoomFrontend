import React, {useEffect, useState} from "react"
import './slider.scss'
import {Button} from "../button/button";

export function Slider(): JSX.Element {
    const [count, setCount] = useState(1)
    const [fetchedData, setFetchedData] = useState(null)
    const [error, setError] = useState(null)

    const getData = (id: string) => {
        fetch("server/question/" + count)
            .then(res => res.json())
            .then((data) => {
                setFetchedData(data)
            }, (error) => {
                setError(error)
            })
    }

    return (
        <div>
            <h2>Frage Nr {count}</h2>
            <input type="radio" value="Male" name="gender" /> Male
            <input type="radio" value="Female" name="gender" /> Female
            <input type="radio" value="Other" name="fragen" /> Other
            <Button type={"standard"} title={"Speichern"} onClick={() => {
                setCount(count + 1)
            }}/>
        </div>
    );
}