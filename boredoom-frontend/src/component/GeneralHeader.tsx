import React from 'react';
import {useHistory} from "react-router-dom";
import {CustomButton} from "./CustomButton";


export function GeneralHeader(): JSX.Element {
    let history = useHistory();

    return (
        <div style={{backgroundColor: "#273661", width: "100%", top: 0, display: "inline-flex"}}>
            <div style={{left: "0px"}}>
                <CustomButton text={<h2>BoreDoom</h2>}/>
            </div>
            <div style={{position: "absolute", right: "0px"}}>

                <CustomButton text="Fragenkatalog" clickHandler={() => {
                    history.push('/fragenkatalog')
                }}/>
                <CustomButton text="Glückstreffer" clickHandler={() => {
                    history.push('/glueckstreffer')
                }}/>
                <CustomButton text="Merkliste" clickHandler={() => {
                    history.push('/merkliste')
                }}/>
                <CustomButton text="Login" clickHandler={() => {
                    history.push('/login')
                }}/>
            </div>
        </div>
    );
}
