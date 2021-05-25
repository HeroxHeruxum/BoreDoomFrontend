import React, {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import "./login.scss";
import axios from "axios";
import {ReducerState} from "../../reducer";
import {setConfirmPassword, setEmail, setLoggedInUsername, setPassword, setUsername} from "./loginActions";
import {showNotification} from "../notification/notificationActions";
import {changeLocation} from "../button/buttonActions";
import {Visible} from "../visible/visible";
import {Button} from "../button/button";


interface LoginProps {
    isRegisterView: boolean
}

export function Login(props: LoginProps) {
    const {isRegisterView} = props;

    /**
     * Here we set up the sate of  this component. There is the possibility to use a global state with an library
     * (redux) However this often leads to a total Reload of the website, which might end up unfavourable.
     * Its also often smoother and  more readable when we use the local state with a HOC and LOC structure.
     */

    const {username, email, password, confirmPassword} = useSelector((state: ReducerState) => ({
        username: state.login.username,
        email: state.login.email,
        password: state.login.password,
        confirmPassword: state.login.confirmPassword
    }));
    const dispatch = useDispatch();
    const history = useHistory();

    const loginHeader = useMemo(() => {
        return isRegisterView ? "Registrierung" : "Anmeldung";
    }, [isRegisterView]);

    const buttonTitle = useMemo(() => {
        return isRegisterView ? "Registrieren" : "Anmelden";
    }, [isRegisterView]);


    /**
     * This function handles the rest calls for our login/register components.
     * For that we use the library axios. Axios works really well with typescript.
     * Instead of just logging Our Errors we try to make them visible via the
     * react-toastify library.
     */

    const onClickButton = useCallback(() => {
        if (isRegisterView) {
            if ((username === "") || (email === "") || (password === "")) {
                showNotification("message", "Felder sind nicht alle ausgefüllt.")
            } else if (password !== confirmPassword) {
                showNotification("message", "Passwörter stimmen nicht überein.")
            } else {
                axios.post("http://localhost:8082/register", {username, email: email, password: password})
                    .then(() => {
                            history.push("/login");
                            dispatch(changeLocation("/"))
                        }
                    )
                    .catch(error => {
                        const errorMessage = error.response?.data;
                        const existingUser = errorMessage === "User already exists";
                        if (existingUser) {
                            showNotification("message", "Benutzername ist bereits vergeben.")
                        } else {
                            showNotification("activity", "Registrieren")
                        }
                    })
            }
        } else {
            if ((username === "") || (password === "")) {
                showNotification("message", "Felder sind nicht alle ausgefüllt.")
            } else {
                axios.post("http://localhost:8082/login", {username, password})
                    .then(() => {
                        dispatch(setLoggedInUsername(username));
                        history.push("/");
                        dispatch(changeLocation("/"))
                    })
                    .catch(error => {
                        const errorMessage = error.response?.data;
                        const wrongUser = errorMessage === "Username does not exist";
                        const wrongPassword = errorMessage === "Invalid password";
                        if (wrongUser || wrongPassword) {
                            showNotification("message", "Benutzername oder Passwort ist falsch.")
                        } else {
                            showNotification("activity", "Anmelden")
                        }
                    })
            }
        }
    }, [isRegisterView, username, email, password, confirmPassword, dispatch, history]);

    /**
     * This component makes use of the React component <Visible/> this component enables
     * to control the visibility of its children props. This way you can reduce duplicated code and
     * places where u might end up to adjust things in case of a change; We Control this with the isRegisterView prop
     */

    return (
        <div className="login">
            <div className="loginHeader">
                {loginHeader}
            </div>
            <div className="loginInputWrapper">
                <div className="loginInputHeader">
                    Benutzername
                </div>
                <input className="loginInput" type="text"
                       value={username} autoFocus={true}
                       onChange={e => dispatch(setUsername(e.target.value))}/>
            </div>
            <Visible if={isRegisterView}>
                <div className="loginInputWrapper">
                    <div className="loginInputHeader">
                        E-Mail-Adresse
                    </div>
                    <input className="loginInput" type="email" value={email}
                           onChange={e => dispatch(setEmail(e.target.value))}/>
                </div>
            </Visible>
            <div className="loginInputWrapper">
                <div className="loginInputHeader">
                    Passwort
                </div>
                <input className="loginInput" type="password" value={password}
                       onChange={e => dispatch(setPassword(e.target.value))}/>
            </div>
            <Visible if={isRegisterView}>
                <div className="loginInputWrapper">
                    <div className="loginInputHeader">
                        Passwort bestätigen
                    </div>
                    <input className="loginInput" type="password"
                           value={confirmPassword}
                           onChange={e => dispatch(setConfirmPassword(e.target.value))}/>
                </div>
            </Visible>
            <div className="loginButtonWrapper">
                <Button type="standard" title={buttonTitle}
                        onClick={onClickButton}/>
                <Visible if={!isRegisterView}>
                    <div className="registerLink">
                        <Button type="link" title="Registrieren"
                                href="/register"/>
                    </div>
                </Visible>
                <Visible if={isRegisterView}>
                    <div className="registerLink">
                        <Button type="link" title="Zurück zum Login"
                                href="/login"/>
                    </div>
                </Visible>
            </div>
        </div>
    )
}