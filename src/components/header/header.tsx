import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./header.scss";
import axios from "axios";
import {ReducerState} from "../../reducer";
import {setLoggedInUsername} from "../login/loginActions";
import {Visible} from "../visible/visible";
import {Button} from "../button/button";


export function Header() {
    const {isLoggedIn, username} = useSelector((state: ReducerState) => ({
        isLoggedIn: !!state.login.loggedInUsername,
        username: state.login.loggedInUsername
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get<[]>("http://localhost:8082/isAuthenticated")
            .then(response => {
                if (response.data.toString() !== "true") {
                    dispatch(setLoggedInUsername(""))
                }
            })
            .catch(() => dispatch(setLoggedInUsername("")))
    }, [dispatch]);

    const logout = useCallback(() => {
        axios.get<[]>("http://localhost:8082/logout")
            .then(() => dispatch(setLoggedInUsername("")))
            .catch(error => console.log(error))
    }, [dispatch]);

    return (
        <div className="header">
            <div className="headerLeft">
                <Button type="logo" title="BoreDoom" href="/"/>
                <Button type="header" title="Fragen" href="/questions"/>
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
                    <Button type="header" title="Abmelden" href="/" onClick={logout}/>
                </div>
            </Visible>
        </div>
    );
}
