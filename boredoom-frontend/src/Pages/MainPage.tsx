import React, {CSSProperties} from 'react';
import {GeneralHeader} from "../component/GeneralHeader";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";


export function MainPage() {
    let history = useHistory();
    let styles: CSSProperties = {
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    }

    let phantom: CSSProperties = {
        display: 'block',
        padding: '20px',
        height: '60px',
        width: '100%',
    }
    return (
        <>
            <header>
                <GeneralHeader/>
            </header>
            <body style={{height:"100%"}}>
            <h2 style={{textAlign: "center"}}>Was ist BoreDoom?</h2>
            <p style={{
                marginRight: "25%",
                marginLeft: "25%"/**,outlineStyle:"solid", outlineColor:"black", outlineWidth:"1px"**/
            }}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua.
                At vero eos et accusam et justo duo dolores et ea rebum.
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua.
                At vero eos et accusam et justo duo dolores et ea rebum.
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
            <div style={{textAlign: "center", paddingTop: "10%"}}>
                <Button
                    style={{backgroundColor: "#273661", color: "white", paddingLeft: "50px", paddingRight: "50px"}}
                    onClick={() => {
                        history.push("/fragen")
                    }}
                >
                    Start
                </Button>

            </div>
            <div>
                <div style={phantom} />
                <div style={styles}>
                    <h2>IMPRESSUM!</h2>
                </div>
            </div>
            </body>
        </>
    );
}