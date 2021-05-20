import React from "react";
import "./footer.scss";
import {Button} from "../button/button";


export function Footer() {
    return (
        <div className="footer">
            <Button type="link" title="Impressum" href="/imprint"/>
        </div>
    );
}