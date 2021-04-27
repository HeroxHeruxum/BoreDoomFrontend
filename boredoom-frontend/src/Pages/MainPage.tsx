import React from 'react';
import {GeneralHeader} from "../component/GeneralHeader";
import {History} from "history";

interface MainPageProps {
    history: History
}

export function MainPage(props:MainPageProps){
    return(
        <header>
            <GeneralHeader history={props.history}/>
        </header>
    );
}