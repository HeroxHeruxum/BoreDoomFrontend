import React from 'react';
import {useHistory} from "react-router-dom";
import "./MainPageCss.css"


export function MainPage() {
    let history = useHistory();
    return (
        <>
            <header>
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
                <button
                    className={'startButton'}
                    onClick={() => {
                        history.push("/fragen")
                    }}
                >
                    Start
                </button>

            </div>
            <div>
                <div className={'StickyFooterContainer'}/>
                <div className={'StickyFooter'}>
                    <h2>IMPRESSUM!</h2>
                </div>
            </div>
            </body>
        </>
    );
}