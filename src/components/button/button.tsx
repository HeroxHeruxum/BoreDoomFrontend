import React from "react";
import "./button.scss";
import {ButtonProps} from "../../misc/types";

export function Button(props: ButtonProps) {
    const {type, disabled, title, onClick} = props;

    return (
        <button className={`button ${type}Button ${disabled ? "disabled" : ""}`} onClick={onClick} disabled={disabled}>
            {title}
        </button>
    )
}