import React from 'react';
import "../mainPage/mainPage.scss"
import {Header} from "../../components/header/header";
import {Impressum} from "../../components/impressum/impressum";


export function QuestionPage(): JSX.Element {
    return (
        <>
            <header>
                <Header/>
            </header>
            <body>
            <Impressum/>
            </body>
        </>
    );
}