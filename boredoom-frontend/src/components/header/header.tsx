import "./header.scss";
import { useCallback } from "react";
import { Button } from "../button/button";
import { useHistory } from "react-router-dom";


export function Header() {
    let history = useHistory();
    const getOnClickMenuButton = useCallback((subPath: string) => () => {
        history.push(`/${subPath}`);
    }, []);

    return (
        <div className="header">
            <div className="headerLeft">
                {/*<img className="headerLogo" src={...}/>*/}
                <div style={{fontSize: "30px", marginRight: "18px", cursor: "pointer"}}>BoreDoom</div>
                <Button type="header" title="Fragenkatalog" onClick={getOnClickMenuButton("fragenkatalog")}/>
                <Button type="header" title="Glückstreffer" onClick={getOnClickMenuButton("glueckstreffer")}/>
                <Button type="header" title="Merkliste" onClick={getOnClickMenuButton("bookmarks")}/>
                <Button type="header" title="Kontakt" onClick={getOnClickMenuButton("contact")}/>
            </div>
            <div className="headerRight">
                <Button type="header" title="Anmelden" onClick={getOnClickMenuButton("login")}/>
            </div>
        </div>
    )
}