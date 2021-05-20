import "./header.scss";
import { Button } from "../button/button";


export function Header() {

    return (
        <div className="header">
            <div className="headerLeft">
                <a className="headerLogoLink" href="/">
                    {/*<img className="headerLogo" src={...}/>*/}
                    <div style={{fontSize: "30px", color: "#FFFFFF", textDecoration: "none"}}>BoreDoom</div>
                </a>
                <Button type="header" title="Fragenkatalog" href={"/questions"}/>
                <Button type="header" title="Glückstreffer" href={"/luckystrike"}/>
                <Button type="header" title="Merkliste" href={"/bookmarks"}/>
            </div>
            <div className="headerRight">
                <Button type="header" title="Anmelden" href={"/login"}/>
            </div>
        </div>
    );
}