import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./header.scss";
import {State} from "../../reducer";
import {fetchIsLoggedIn, logoutUser} from "../login/loginActions";
import {Visible} from "../visible/visible";
import {Button} from "../button/button";


export function Header() {
    const {isLoggedIn, username} = useSelector((state: State) => ({
        isLoggedIn: !!state.login.loggedInUsername,
        username: state.login.loggedInUsername
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIsLoggedIn())
    }, [isLoggedIn]);

    return (
        <div className="header">
            {console.error(isLoggedIn, username)}
            <div className="headerLeft">
                <Button type="logo" title="BoreDoom" href="/"/>
                <Button type="header" title="Fragen" href="/questions"/>
                <Button type="header" title="Glückstreffer" href="/luckystrike"/>
                <Button type="header" title="Merkliste" href="/bookmarks"/>
            </div>
            <Visible if={!isLoggedIn}>
                <div className="headerRight">
                    <Button type="header" title="Anmelden" href="/login"/>
                </div>
            </Visible>
            <Visible if={isLoggedIn}>
                <div className="headerRight">
                    <div className="headerUser">
                        Willkommen,<br/>{username}
                    </div>
                    <Button type="header" title="Abmelden" href="/"
                            onClick={() => dispatch(logoutUser())}/>
                </div>
            </Visible>
        </div>
    );
}
