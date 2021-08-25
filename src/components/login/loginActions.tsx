import axios from "axios";
import {State} from "../../reducer";
import {showNotification} from "../notification/notificationActions";
import {changeLocation} from "../button/buttonActions";
import {ThunkAction} from "redux-thunk";


export function setLoggedInUsername(loggedInUsername: string) {
    return {
        type: "SET_LOGGEDIN_USERNAME",
        payload: loggedInUsername
    }
}

export function setUsername(username: string) {
    return {
        type: "SET_USERNAME",
        payload: username
    }
}

export function setEmail(email: string) {
    return {
        type: "SET_EMAIL",
        payload: email
    }
}

export function setPassword(password: string) {
    return {
        type: "SET_PASSWORD",
        payload: password
    }
}

export function setConfirmPassword(password: string) {
    return {
        type: "SET_CONFIRM_PASSWORD",
        payload: password
    }
}


export function registerUser(history: any): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any, getState: () => State) => {
        try {
            const {username, email, password, confirmPassword} = getState().login;
            if ((username === "") || (email === "") || (password === "")) {
                showNotification("message", "Felder sind nicht alle ausgefüllt.")
            } else if (password !== confirmPassword) {
                showNotification("message", "Passwörter stimmen nicht überein.")
            } else {
                await axios.post("http://localhost:8082/register", {username, email, password});
                history.push("/login");
                dispatch(changeLocation("/"))
            }
        } catch (error) {
            const errorMessage = error.response?.data;
            const existingUser = errorMessage === "User already exists";
            if (existingUser) {
                showNotification("message", "Benutzername ist bereits vergeben.")
            } else {
                showNotification("activity", "Registrieren")
            }
        }
    }
}

export function loginUser(history: any): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any, getState: () => State) => {
        try {
            const {username, password} = getState().login;
            if ((username === "") || (password === "")) {
                showNotification("message", "Felder sind nicht alle ausgefüllt.")
            } else {
                await axios.post("http://localhost:8082/login", {username, password});
                dispatch(setLoggedInUsername(username));
                history.push("/");
              //  dispatch(changeLocation("/"))
            }
        } catch (error) {
            const errorMessage = error.response?.data;
            const wrongUser = errorMessage === "Username does not exist";
            const wrongPassword = errorMessage === "Invalid password";
            if (wrongUser || wrongPassword) {
                showNotification("message", "Benutzername oder Passwort ist falsch.")
            } else {
                showNotification("activity", "Anmelden")
            }
        }
    }
}

export function logoutUser(): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any) => {
        try {
            await axios.get<[]>("http://localhost:8082/logout");
            dispatch(setLoggedInUsername(""))
        } catch {
            showNotification("activity", "Abmelden")
        }
    }
}

export function fetchIsLoggedIn(): ThunkAction<Promise<any>, State, any, any> {
    return async (dispatch: any) => {
        try {
            const response = await axios.get<[]>("http://localhost:8082/isAuthenticated");
            if (response.data.toString() !== "true") {
                dispatch(setLoggedInUsername(""))
            }
        } catch {
            dispatch(setLoggedInUsername(""))
        }
    }
}