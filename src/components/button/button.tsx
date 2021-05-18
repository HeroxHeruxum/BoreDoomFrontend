import React from "react";
import "./button.scss";


type ButtonType = "standard" | "header";

interface ButtonProps {
    type: ButtonType,
    disabled?: boolean,
    title: string | JSX.Element,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function Button(props: ButtonProps) {
    const {type, disabled, title, onClick} = props;

    return (
        <button className={`button ${type}Button ${disabled ? "disabled" : ""}`} onClick={onClick} disabled={disabled}>
            {title}
        </button>
    )
}