import React from 'react';
import "../mainPage/mainPage.scss"
import {Header} from "../../components/header/header";
import {Impressum} from "../../components/impressum/impressum";
import {QuestionSlideContainer} from "../../components/questionComponents/questionSlideContainer";


export function QuestionPage(): JSX.Element {
    return (
        <>
            <header>
                <Header/>
            </header>
            <body>
            <QuestionSlideContainer/>
            <Impressum/>
            </body>
        </>
    );
}