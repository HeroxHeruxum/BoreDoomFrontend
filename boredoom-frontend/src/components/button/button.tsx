import React from "react";
import "./button.scss";


type ButtonType = "standard" | "header";

interface ButtonProps {
    type: ButtonType,
    disabled?: boolean,
    title: string,
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Button(props: ButtonProps) {
    const {type, disabled, title, onClick} = props;

    return (
        <div className={`button ${type}Button ${disabled ? "disabled" : ""}`} onClick={onClick}>
            {title}
        </div>
    )
}