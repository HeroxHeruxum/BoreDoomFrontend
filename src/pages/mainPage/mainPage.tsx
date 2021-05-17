import React from 'react';
import {useHistory} from "react-router-dom";
import "./mainPage.scss"
import {Header} from "../../components/header/header";
import {Button} from "../../components/button/button";
import {Impressum} from "../../components/impressum/impressum";


export function MainPage() {
    let history = useHistory();
    return (
        <>
            <header>
                <Header/>
            </header>
            <body className={'MainPageBody'}>
            <h2 className={'Centered'}>Was ist BoreDoom?</h2>
            <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua.
                At vero eos et accusam et justo duo dolores et ea rebum.
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua.
                At vero eos et accusam et justo duo dolores et ea rebum.
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
            <div className={'StartButtonContainer'}>
                <Button
                    title={"Start"}
                    type={"standard"}
                    onClick={() => {
                        history.push("/questions")
                    }}
                />
            </div>
            <Impressum/>
            </body>
        </>
    );
}