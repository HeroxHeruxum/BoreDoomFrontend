import {ActionType} from "../../misc/types";


export type LoginState = {
    loggedInUsername: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

const defaultState: LoginState = {
    loggedInUsername: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export const loginReducer = (state = defaultState, {type, payload}: ActionType) => {
    switch (type) {
        case "SET_LOGGEDIN_USERNAME": {
            return {
                ...state,
                loggedInUsername: payload
            }
        }
        case "SET_USERNAME": {
            return {
                ...state,
                username: payload
            }
        }
        case "SET_EMAIL": {
            return {
                ...state,
                email: payload
            }
        }
        case "SET_PASSWORD": {
            return {
                ...state,
                password: payload
            }
        }
        case "SET_CONFIRM_PASSWORD": {
            return {
                ...state,
                confirmPassword: payload
            }
        }
        case "LOCATION_CHANGE": {
            const isLogin = payload.location.includes("login");
            const isRegister = payload.location.includes("register");
            if (isLogin || isRegister) {
                return state
            } else {
                return defaultState
            }
        }
        default: {
            return state
        }
    }
 }