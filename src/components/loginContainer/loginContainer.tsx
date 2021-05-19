import "./loginContainer.scss";
import { useCallback, useMemo } from "react";
import { Visible } from "../visible/visible";
import { Button } from "../button/button";


interface LoginContainerProps {
    register: boolean
}

export function LoginContainer(props: LoginContainerProps) {
    const {register} = props;
    const error = "todo";

    const loginHeader = useMemo(() => {
        return register ? "Registrierung" : "Anmeldung";
    }, [register]);
    const buttonTitle = useMemo(() => {
        return register ? "Registrieren" : "Anmelden";
    }, [register]);
    const onClickButton = useCallback(() => {
        //todo
    }, [])

    return (
        <div className="loginContainer">
            <div className="loginHeader">
                {loginHeader}
            </div>
            <Visible if={register}>
                <div className="loginInputWrapper">
                    <div className="loginInputHeader">
                        Benutzername
                    </div>
                    <input className="loginInput" type="text"
                           autoFocus={register}/>
                </div>
            </Visible>
            <div className="loginInputWrapper">
                <div className="loginInputHeader">
                    E-Mail-Adresse
                </div>
                <input className="loginInput" type="email"
                       autoFocus={!register}/>
            </div>
            <div className="loginInputWrapper">
                <div className="loginInputHeader">
                    Passwort
                </div>
                <input className="loginInput" type="password"/>
            </div>
            <Visible if={register}>
                <div className="loginInputWrapper">
                    <div className="loginInputHeader">
                        Passwort bestätigen
                    </div>
                    <input className="loginInput" type="password"/>
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
            </div>
        </div>
    )
}