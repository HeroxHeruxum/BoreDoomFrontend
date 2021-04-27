import React from 'react';
import {CustomButton} from "./CustomButton";
import {History} from "history";

interface HeaderProps {
    history: History;
}

export function GeneralHeader(props:HeaderProps): JSX.Element {

    return (
        <div style={{backgroundColor: "#273661", width: "100%", top: 0, display: "inline-flex"}}>
            <div style={{left: "0px"}}>
                <CustomButton text={<h2>BoreDoom</h2>}/>
            </div>
            <div style={{position: "absolute", right: "0px"}}>

                <CustomButton text="Fragenkatalog" clickHandler={() => {
                    props.history.push('/fragenkatalog')
                }}/>
                <CustomButton text="Glückstreffer" clickHandler={() => {
                    props.history.push('/glueckstreffer')
                }}/>
                <CustomButton text="Merkliste" clickHandler={() => {
                    props.history.push('/merkliste')
                }}/>
                <CustomButton text="Login" clickHandler={() => {
                    props.history.push('/login')
                }}/>
            </div>
        </div>
    );
}
