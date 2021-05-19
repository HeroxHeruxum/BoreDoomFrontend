import "./loginContainer.scss";
import {useCallback, useMemo, useState} from "react";
import {Visible} from "../visible/visible";
import {Button} from "../button/button";
import axios from "axios";


interface LoginContainerProps {
    register: boolean
}

export function LoginContainer(props: LoginContainerProps) {


    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const {register} = props;
    const error = "todo";

    const loginHeader = useMemo(() => {
        return register ? "Registrierung" : "Anmeldung";
    }, [register]);
    const buttonTitle = useMemo(() => {
        return register ? "Registrieren" : "Anmelden";
    }, [register]);
    const onClickButton = useCallback(() => {
        if (register) {
            if ((email === "") || (password === "") || (username === "")) {
                console.log("nicht alle Felder ausgefüllt")
            } else if (password !== confirmPassword) {
                console.log("passwörterungleich")
            } else {
                axios.post("http://localhost:8082/register", {username: username, email: email, password: password})
                    .catch((e) => {
                        console.error(e)
                    })
            }
        } else {
            if ((email === "") || (password === "")) {
                console.log("nicht alle Felder ausgefüllt")
            } else {
                axios.post("http://localhost:8082/login", {username: username, password: password})
                    .catch((e) => {
                        console.log(e)
                    })
            }
        }
    }, [confirmPassword, password, email, username])

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
            <div className="loginErrors">
                {error}
            </div>
            <div className="loginButtonWrapper">
                <Button type="standard" title={buttonTitle}
                        onClick={onClickButton}/>
                <Visible if={!register}>
                    <a className="registerLink" href="/register">
                        Registrieren
                    </a>
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