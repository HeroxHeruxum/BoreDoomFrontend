import React, {MouseEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import "./button.scss";
import {ButtonType} from "../../misc/types";
import {changeLocation} from "./buttonActions";


interface ButtonProps {
    type: ButtonType,
    disabled?: boolean,
    title: string | JSX.Element,
    href?: string,
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

export function Button(props: ButtonProps) {
    const {type, disabled, title, href: location, onClick} = props;
    const dispatch = useDispatch();
    const history = useHistory();

    const onClickFn = useCallback((event) => {
        if (!disabled) {
            if (location) {
                history.push(location);
                dispatch(changeLocation(location))
            }
            onClick?.(event)
        }
    }, [disabled, location, onClick, dispatch, history]);

    return (
        <a className={`button ${type}Button ${disabled ? "disabled" : ""}`}
           onClick={onClickFn}>
            {title}
        </a>
    )
}