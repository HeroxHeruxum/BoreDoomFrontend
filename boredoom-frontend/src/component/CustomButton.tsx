import Button from "@material-ui/core/Button";
import React from "react";


interface ButtonProps {
    clickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    text:string | JSX.Element;
}

export function CustomButton(props:ButtonProps): JSX.Element {
    return (
        <Button style={{color: "white", height: "50px"}} onClick={props.clickHandler}>
            {props.text}
        </Button>
    );
}