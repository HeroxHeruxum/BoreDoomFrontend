import "./header.scss";
import React, {useCallback, useEffect, useState} from "react";
import {Button} from "../button/button";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {Visible} from "../visible/visible";


export function Header() {
    let history = useHistory();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios
            .get<[]>("http://localhost:8082/isAuthenticated")
            .then(response => {
                let result = (response.data.toString() === "true")
                setIsAuthenticated(result)
            })
            .catch((error => {
                console.log(error)
            }));
    }, []);

    const logOut = useCallback(() => {
        axios
            .get<[]>("http://localhost:8082/logout")
            .then(() => history.push("/"))
            .catch((error => {
                console.log(error)
            }));
    }, [isAuthenticated]);

    const getOnClickMenuButton = useCallback((subPath: string) => () => {
        history.push(`/${subPath}`);
    }, [history]);


    return (
        <div className="header">
            <div className="headerLeft">
                <a className="headerLogoLink" href="/">
                    {/*<img className="headerLogo" src={...}/>*/}
                    <div style={{fontSize: "30px", color: "#FFFFFF", textDecoration: "none"}}>BoreDoom</div>
                </a>
                <Button type="header" title="Fragenkatalog" onClick={getOnClickMenuButton("questions")}/>
                <Button type="header" title="Glückstreffer" onClick={getOnClickMenuButton("luckystrike")}/>
                <Button type="header" title="Merkliste" onClick={getOnClickMenuButton("bookmarks")}/>
            </div>
            <Visible if={!isAuthenticated}>
                <div className="headerRight">
                    <Button type="header" title="Anmelden" onClick={getOnClickMenuButton("login")}/>
                </div>
            </Visible>
            <Visible if={isAuthenticated}>
                <div className="headerRight">
                    <Button type="header" title="Log Out" onClick={logOut}/>
                </div>
            </Visible>
        </div>
    );
}
