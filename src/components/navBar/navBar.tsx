import React from "react";
import {Button} from "../button/button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import {navBarProps} from "../../misc/types";
import './navBar.scss'

export function NavBar(props: navBarProps): JSX.Element {

    return (
        <div className={'ButtonContainer'}>
            <Button type={"header"} title={<ArrowBackIosIcon/>} onClick={() => {
                props.backArrowFunction()
            }}/>
            <Button type={"header"} title={props.middleButtonCaption} onClick={() => {
                props.middleButtonFunction()
            }}/>
            <Button type={"header"} title={<ArrowForwardIosIcon/>} onClick={() => {
                props.forwardArrowFunction()
            }}/>
        </div>
    )
}