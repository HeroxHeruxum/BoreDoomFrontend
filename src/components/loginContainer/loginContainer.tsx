import React, {useMemo, useState} from "react";
import "./loginContainer.scss";
import {Visible} from "../visible/visible";
import {Button} from "../button/button";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface LoginContainerProps {
    register: boolean
}

export function LoginContainer(props: LoginContainerProps) {

    const notify = (error: any) => {
        toast.error(error)
    }

    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const {register} = props;

    const history = useHistory();
    const loginHeader = useMemo(() => {
        return register ? "Registrierung" : "Anmeldung";
    }, [register]);

    const buttonTitle = useMemo(() => {
        return register ? "Registrieren" : "Anmelden";
    }, [register]);

    const onClickButton = () => {
        if (register) {
            if ((email === "") || (password === "") || (username === "")) {
                notify("nicht alle Felder ausgefüllt")
            } else if (password !== confirmPassword) {
                notify("passwörterungleich")
            } else {
                axios.post("http://localhost:8082/register", {username: username, email: email, password: password})
                    .catch((e) => {
                        notify(e.toString())
                    })
                    .finally(() => {
                            history.push("/login")
                        }
                    )
            }
        } else {
            if ((username === "") || (password === "")) {
                notify("nicht alle Felder ausgefüllt")
            } else {
                axios.post("http://localhost:8082/login", {username: username, password: password})
                    .then(() => {
                        history.push("/")
                    })
                    .catch((e) => {
                        notify(e.response.data)
                    })
            }
        }
    }

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
                       autoFocus={register} onChange={(e) => {
                    setUsername(e.target.value)
                }}/>
            </div>
            <Visible if={register}>
                <div className="loginInputWrapper">
                    <div className="loginInputHeader">
                        E-Mail-Adresse
                    </div>
                    <input className="loginInput" type="email"
                           autoFocus={!register} onChange={(e) => {
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
            <Visible if={register}>
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
                <Visible if={!register}>
                    <Button type="link" title="Registrieren"
                            onClick={() => history.push("/register")}/>
                </Visible>
                <Visible if={register}>
                    <a className="registerLink" href="/login">
                        Bereits registreiert? gehe zum Login!
                    </a>
                </Visible>
            </div>
        </div>
    )
}