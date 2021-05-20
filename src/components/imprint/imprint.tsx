import React from "react";
import "./imprint.scss";
import {Button} from "../button/button";


export function Imprint() {
    return (
        <div className="imprint">
            <Button type="link" title="Impressum" href="/imprint"/>
        </div>
    );
}