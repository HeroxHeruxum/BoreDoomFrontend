import React from 'react';
import "../mainPage/mainPage.scss"
import {Header} from "../../components/header/header";
import {Impressum} from "../../components/impressum/impressum";
import {Slider} from "../../components/slider/slider";


export function QuestionPage(): JSX.Element {
    return (
        <>
            <header>
                <Header/>
            </header>
            <body>
            <Slider/>
            <Impressum/>
            </body>
        </>
    );
}