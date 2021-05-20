import React from "react";
import "./imprint.scss";
import { Button } from "../button/button";


export function Imprint(): JSX.Element {
    return (
        <div className="imprint">
            <Button type="link" title="Impressum" href="/imprint"/>
        </div>
    );
}