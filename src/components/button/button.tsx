import React, { useCallback, useMemo } from "react";
import "./button.scss";
import {ButtonProps} from "../../misc/types";


export function Button(props: ButtonProps) {
    const {type, disabled, title, href, onClick} = props;

    const actualHref = useMemo(() => {
        return !disabled ? href : undefined
    }, [disabled, href]);
    const actualOnClick = useCallback((event) => {
        return !disabled && onClick?.(event)
    }, [disabled, onClick]);

    return (
        <a className={`button ${type}Button ${disabled ? "disabled" : ""}`}
           href={actualHref} onClick={actualOnClick}>
            {title}
        </a>
    )
}