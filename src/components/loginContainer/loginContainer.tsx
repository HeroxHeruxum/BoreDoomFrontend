import React, {useCallback, useMemo, useState} from "react";
import "./loginContainer.scss";
import {Visible} from "../visible/visible";
import {Button} from "../button/button";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {LoginContainerProps} from "../../misc/types";


export function LoginContainer(props: LoginContainerProps) {

    const showNotification = useCallback((message: string) => {
        toast.error(message)
    }, [toast]);

    /**
     * Here we set up the sate of  this component. There is the possibility to use a global state with an library
     * (redux) However this often leads to a total Reload of the website, which might end up unfavourable.
     * Its also often smoother and  more readable when we use the local state with a HOC and LOC structure.
     */

    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const {isRegister} = props;

    const history = useHistory();
    const loginHeader = useMemo(() => {
        return isRegister ? "Registrierung" : "Anmeldung";
    }, [isRegister]);

    const buttonTitle = useMemo(() => {
        return isRegister ? "Registrieren" : "Anmelden";
    }, [isRegister]);


    /**
     * This function handles the rest calls for our login/register components.
     * For that we use the library axios. Axios works really well with typescript.
     * Instead of just logging Our Errors we try to make them visible via the
     * react-toastify library.
     */

    const onClickButton = () => {
        if (isRegister) {
            if ((email === "") || (password === "") || (username === "")) {
                showNotification("nicht alle Felder ausgefüllt")
            } else if (password !== confirmPassword) {
                showNotification("Passwörter ungleich")
            } else {
                axios.post("http://localhost:8082/register", {username: username, email: email, password: password})
                    .then(() => {
                            history.push("/login")
                        }
                    )
                    .catch((e) => {
                        showNotification(e.response.data)
                    })
            }
        } else {
            if ((username === "") || (password === "")) {
                showNotification("nicht alle Felder ausgefüllt")
            } else {
                axios.post("http://localhost:8082/login", {username: username, password: password})
                    .then(() => {
                        history.push("/")
                    })
                    .catch((e) => {
                        showNotification(e.response.data)
                    })
            }
        }
    }

    /**
     * This component makes use of the React component <Visible/> this component enables
     * to control the visibility of its children props. This way you can reduce duplicated code and
     * places where u might end up to adjust things in case of a change; We Control this with the isRegister prop
     */

    return (
        <div className="loginContainer">
            <div className="loginHeader">
                {loginHeader}
            </div>
            <div className="loginInputWrapper">
                <div className="loginInputHeader">
                    Benutzername
                </div>
                <input className="loginInput" type="text"
                       autoFocus={true} onChange={(e) => {
                    setUsername(e.target.value)
                }}/>
            </div>
            <Visible if={isRegister}>
                <div className="loginInputWrapper">
                    <div className="loginInputHeader">
                        E-Mail-Adresse
                    </div>
                    <input className="loginInput" type="email"
                           onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                </div>
            </Visible>
            <div className="loginInputWrapper">
                <div className="loginInputHeader">
                    Passwort
                </div>
                <input className="loginInput" type="password" onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
            </div>
            <Visible if={isRegister}>
                <div className="loginInputWrapper">
                    <div className="loginInputHeader">
                        Passwort bestätigen
                    </div>
                    <input className="loginInput" type="password" onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}/>
                </div>
            </Visible>
            <ToastContainer/>
            <div className="loginButtonWrapper">
                <Button type="standard" title={buttonTitle}
                        onClick={onClickButton}/>
                <Visible if={!isRegister}>
                    <a className="registerLink" href="/register">
                        Registrieren
                    </a>
                </Visible>
                <Visible if={isRegister}>
                    <a className="registerLink" href="/login">
                        Zurück zum Login
                    </a>
                </Visible>
            </div>
        </div>
    )
}