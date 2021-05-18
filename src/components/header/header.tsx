import "./header.scss";
import { useCallback } from "react";
import { Button } from "../button/button";
import { useHistory } from "react-router-dom";
import React from "react";


export function Header() {
    let history = useHistory();
    const getOnClickMenuButton = useCallback((subPath: string) => () => {
        history.push(`/${subPath}`);
    }, [history]);

    return (
        <div className="header">
            <div className="headerLeft">
                {/*<img className="headerLogo" src={...}/>*/}
                <div style={{fontSize: "30px", marginRight: "18px", cursor: "pointer"}}>BoreDoom</div>
                <Button type="header" title="Fragenkatalog" onClick={getOnClickMenuButton("questions")}/>
                <Button type="header" title="Glückstreffer" onClick={getOnClickMenuButton("luckystrike")}/>
                <Button type="header" title="Merkliste" onClick={getOnClickMenuButton("bookmark" +
                    "s")}/>
                <Button type="header" title="Kontakt" onClick={getOnClickMenuButton("contact")}/>
            </div>
            <div className="headerRight">
                <Button type="header" title="Anmelden" onClick={getOnClickMenuButton("login")}/>
            </div>
        </div>
    );
}